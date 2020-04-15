import mongoose from 'mongoose';
import models from './models.js';
import logger from '../util/logger';
import cryptor from '../util/cryptor';

mongoose.connect('mongodb://localhost/simple_app_db',  { useNewUrlParser: true } );

const _validateUserInputPreEcncrypt = (model, instance, errs, ignoreEmpty) => {
  let schemaObj = model.schema.obj;
  for(let param in schemaObj) {
    if(schemaObj[param].inputValidate) {
      if(instance[param] !== undefined && instance[param].length !== 0) {
        if(schemaObj[param].inputValidate.validator(instance[param]) === false) {
          errs.push({'type': 'input', 'field': param, 'message': schemaObj[param].inputValidate.message()});
        }
      } else {
        if(ignoreEmpty !== true) {
          if(schemaObj[param].inputValidate.validator(instance[param]) === false) {
            errs.push({'type': 'input', 'field': param, 'message': schemaObj[param].inputValidate.message()});
          }
        }
      }
    }
  }
  return errs;
};
const _validateUniques = (model, instance, errs, cb) => {
  let query = model.find();
  let queryOrs = [];
  let params = _fillModelParams(model, instance);
  let uniqueParams = params.filter((item) => {
    return item.prevent_dup === true;
  });
  if(uniqueParams.length === 0) {
    _validateSchema(instance, errs, cb);
  } else {
    uniqueParams.forEach((item) => {
      queryOrs.push(JSON.parse('{"' + item.name +'": "' + item.value +'"}'));
    });
    query.or(queryOrs).exec(function(err, result) {
      if(err) {
        logger.log({level: 'error', 'message': 'query failed validating uniques for' + model.modelName, error:err});
        errs.push({'type': 'server', 'message':'error validating uniques for' + model.modelName});
      } else {
        console.log('result');
        console.log(result);
        console.log(instance);

        if(result.length === 1 && String(result[0]._id) === String(instance._id)) {
          console.log('validating schema for update');
          _validateSchema(model, instance, errs, cb);
          return;
        }

        if(result.length !== 0) {
          uniqueParams.forEach((item) => {
            let field = item.name;
            let value = item.value;
            result.forEach((data) => {
              if(data[field] === item.value) {
                errs.push({'type': 'input', 'field': item.name, 'message': item.label + ' already exists'});
              }
            });
          });
        }
      }
      console.log('validating schema for create');
      _validateSchema(model, instance, errs, cb);
    });
  }
};
const _validateSchema= (model, instance, errs, cb) => {
  var schemaValidation = new model(instance).validateSync();
  if(schemaValidation !== undefined && schemaValidation.errors !== undefined) {
    errs.push({'type': 'input', 'field': 'schema', 'message':'schema validation errors found', errors: schemaValidation.errors});
  }
  cb(instance, errs);
};
const _getParameters = (model) => {
  var params = [];
  var instanceModel = model;
  for (var key in  model.schema.obj) {
    params.push({name: key, type: model.schema.paths[key].instance, required: model.schema.paths[key].isRequired, label:model.schema.obj[key].label, display: model.schema.obj[key].display, input: model.schema.obj[key].input, validate: model.schema.obj[key].inputValidate, prevent_dup: model.schema.obj[key].prevent_dup, encrypt: model.schema.obj[key].encrypt})
  };

  return params
};
const _fillModelParams = (model, instance, errors) => {
  var params = [];
  var instanceModel = model;
  for (var key in  model.schema.obj) {
    let param = {name: key, value: instance[key], type: model.schema.paths[key].instance, required: model.schema.paths[key].isRequired, label:model.schema.obj[key].label, display: model.schema.obj[key].display, input: model.schema.obj[key].input, validate: model.schema.obj[key].inputValidate, prevent_dup: model.schema.obj[key].prevent_dup, encrypt: model.schema.obj[key].encrypt }
    if(errors) {
      param = _getErrorMsgs(key, param, errors)
    }
    params.push(param);
  };

  return params;
};
const _getByParameters = (model, query, errs, cb) => {
  console.log('in gbp');
  model.find(query).exec((err, result) => {
    if(err) {
      logger.log({level: 'error', 'message': 'error in find ' + model.modelName, 'error': err});
      errs.push({'type': 'server', 'message':'error in find ' + model.modelName, 'error': err});
    }
    console.log(result);
    console.log('calling cb');
    console.log(cb);
    cb(result, err);
  });
};
const _getAll = (model, errs, cb) => {
  model.find().exec((err, result) => {
    if(err) {
      console.log('HAS ERR');
      logger.log({level: 'error', 'message': 'error in find ' + model.modelName, 'error': err});
      errs.push({'type': 'server', 'message':'error in find ' + model.modelName, 'error': err});
    }

    cb(result, err);
  });
};
const _getErrorMsgs = (key, record, errors) => {
   for( var e in errors) {
     if(errors[e].field === key) {
       record.error = errors[e].message;
     }
     if(errors[e].field === 'schema') {
      if(errors[e].errors[key]) {
        record.error = errors[e].errors[key].message;
      }
     }
   }
   return record;
};
const _dataProtect = (model, instance) => {
  let parameters = _getParameters(model);

  parameters.forEach((param) => {
    if(param.encrypt === true) {
      instance[param.name] = cryptor().encrypt(instance[param.name])
    }
  });

  return instance;
};

const modeler = () => {

  return {
    getModel: (name) => {
      for(let model in models) {
        if (model === name) {
          return models[model];
        }
      }
      return null;
    },
    validateForCreate: (model, instance, errs, cb) => {
      if(!errs) {
        errs = [];
      }
      errs = _validateUserInputPreEcncrypt(model, instance, errs);
      if(errs.length > 0) {
        cb(instance, errs);
        return;
      }
      instance = _dataProtect(model, instance);

      _validateUniques(model,instance, errs, cb);
    },
    createRecord: (model, instance, errs, cb) => {
      var newInstance = new model(instance);
      newInstance.save(function(err, model) {
        if(err) {
          logger.log({level: 'error', 'message': 'create ' + model.modelName + 'model failed', error:err});
          errs.push({'type': 'server', 'message':'error creating  ' + model.modelName + ' model'});
        }
        cb(model, errs);
      });
    },
    getParameters: (model) => { return _getParameters(model); },
    getFilledParameters: (model, instance, errs) => { return _fillModelParams(model, instance, errs); },
    getByParameters: (model, query, errs, cb) => {
      _getByParameters(model, query, errs, cb)
    },
    getAll: (model, errs, cb) => {
      console.log('getAll');
      _getAll(model, errs, cb);
    },
    validateForUpdate: (model, instance, errs, cb) => {
      console.log('in validateForUpdate');
      if(!instance._id) {
        errs.push({'type': 'server', 'message':' no id provided in ' + model.modelName + ' model update request'});
        cb(instance, errs);
      }

      //setting empty values allowed here,  anything empty will simply be ignored.
      //updates only sent fields
      errs = _validateUserInputPreEcncrypt(model, instance, errs, true);
      if(errs.length > 0) {
        cb(instance, errs);
        return;
      }

      _getByParameters(model, {'_id': instance._id }, errs, function(result, err) {
        if(err) {
          logger.log({level: 'error', 'message':'error validating update for  ' + model.modelName + ' id ' + instance._id, error:err});
          errs.push({'type': 'server', 'message':'error validating update for  ' + model.modelName + ' id ' + instance._id});
        } else {
          if(result.length !== 1) {
            errs.push({'type': 'server', 'message':'error validating update for  ' + model.modelName + ' id ' + instance._id + '(more than on instance found)'});
          } else {
            let update = result[0];
            let schemaObj = model.schema.obj;
            logger.log({level: 'info', 'message':'in validating update for  ' + model.modelName + ' id ' + instance._id, instance: instance, model: update, schema: schemaObj});

            let updateValues = {_id: instance._id};
            console.log('instance is');
            console.log(instance);
            console.log(schemaObj);
            for(let key in instance) {


              if(schemaObj[key] === undefined) {
                console.log(key + 'passing by')
                continue;
              }

              console.log('encrypt?');
              console.log(schemaObj[key].encrypt);

              if(schemaObj[key].encrypt === true && (instance[key].length > 0)) {
                console.log('encrypting');
                updateValues[key] = cryptor().encrypt(instance[key]);
              }

              console.log('displayed?');
              console.log(schemaObj[key].display);
              if(schemaObj[key].display === false && (instance[key].length === 0)) {
                console.log('getting hidden field from existing record');
                updateValues[key] = update[key];
              }

              console.log('required?');
              console.log(schemaObj[key].required);
              if(schemaObj[key].required && (instance[key].length === 0)) {
                console.log('getting required field from existing record');
                updateValues[key] = update[key];
              }

              console.log(key + 'is unencrypted and not empty?');
              if(schemaObj[key].encrypt !== true && instance[key].length > 0) {
                console.log('populated field from input');
                updateValues[key] = instance[key];
              }


            }

            logger.log({level: 'info', 'message':'in validating update for  ' + model.modelName + ' id ' + instance._id,  model: update, updates: updateValues, instance:instance, errs:errs});

            if(errs.length > 0) {
              cb(updateValues, errs);
              return;
            }

            //errs.push({'type': 'server', 'message':'passed validated update for  ' + model.modelName + ' id ' + instance._id + ' update call not ready'});
            //cb(updateValues, errs);
            console.log('validating uniques');
            _validateUniques(model,updateValues, errs, cb);
          }
        }
      });


    },
    updateRecord: (model, instance, errs, cb) => {
      model.updateOne({_id: instance_id}, instance, function(err, result) {
        if(err) {
          logger.log({level: 'error', 'message': 'create ' + model.modelName + 'model failed', error:err});
          errs.push({'type': 'server', 'message':'error creating  ' + model.modelName + ' model'});
        }
        cb(result, errs);
      });
    },
    updateByParameter: (model, query, change, errs, cb) => {
      model.updateMany(query, change, function(err, result) {
        if(err) {
          logger.log({level: 'error', 'message': 'create ' + model.modelName + 'model failed', error:err});
          errs.push({'type': 'server', 'message':'error creating  ' + model.modelName + ' model'});
        }
        cb(result, errs);
      });
    },
    deleteRecordById: (model, id, errs, cb) => {
      model.deleteOne({_id: id}, function(err, result) {
        if(err) {
          logger.log({level: 'error', 'message': 'create ' + model.modelName + 'model failed', error:err});
          errs.push({'type': 'server', 'message':'error creating  ' + model.modelName + ' model'});
        }
        cb(result, errs);
      });
    },
    deleteRecordByParameter: (model, query, errs, cb) => {
      model.deleteMany(query, function(err, result) {
        if(err) {
          logger.log({level: 'error', 'message': 'create ' + model.modelName + 'model failed', error:err});
          errs.push({'type': 'server', 'message':'error creating  ' + model.modelName + ' model'});
        }
        cb(result, errs);
      });
    },
    getServerErrors: (errs) => {
      return errs.filter((item) => {
        return item.type === 'server';
      });
    }
  }

};

export default modeler();



