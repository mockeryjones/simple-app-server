import express from 'express';
import logger from '../util/logger';
import modeler from '../models/modeler.js';

var router = express.Router();

//RENDERED ROUTES
router.get('/:model', function(req, res, next) {
    let modelname = req.params.model;
    let model = modeler.getModel(modelname);

    if(model === null) {
      res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
      return;
    }

    var params = modeler.getParameters(model);
    logger.log({level: 'info', 'message': 'getParameters', model: params });
    res.render('model-input', {layout: 'basic', 'model': params, form: {method: 'post', action: '/model/' + modelname +'/create'} });
});
router.get('/:model/create', function(req, res, next) {
    let modelname = req.params.model;
    let model = modeler.getModel(modelname);

    if(model === null) {
      res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
      return;
    }

    var params = modeler.getParameters(model);
    logger.log({level: 'info', 'message': 'getParameters', model: params });
    res.render('model-input', {layout: 'basic', 'model': params, form: {method: 'post', action: '/model/' + modelname +'/create'} });
});
router.get('/:model/display/:modelId', function(req, res, next) {
  let modelname = req.params.model;
  let modelId = req.params.modelId;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
    return;
  }

  modeler.getByParameters(model, {'_id': modelId }, [], function(result, err) {
    console.log('calledback');
    if(err) {
      console.log('found err');
      res.render('error', {layout: 'basic', error:err });
    } else {
      console.log(result);
      let filled = modeler.getFilledParameters(model, result[0]);
      res.render('model-display', {layout: 'basic', 'model': {'_id': modelId }, params: filled, modelname: modelname});
    }
  });
});
router.get('/:model/edit/:modelId', function(req, res, next) {
  let modelname = req.params.model;
  let modelId = req.params.modelId;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
    return;
  }

  modeler.getByParameters(model, {'_id': modelId }, [], function(result, err) {
    if(err) {
      res.render('error', {layout: 'basic', error:err });
    } else {
      let filled = modeler.getFilledParameters(model, result[0]);
      res.render('model-edit', {layout: 'basic', 'model': filled, form: {method: 'post', action: '/model/' + modelname + '/edit/' + modelId} });
    }
  });
});

router.get('/:model/list', function(req, res, next) {
  let modelname = req.params.model;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
    return;
  }

  modeler.getAll(model, [], (result, err) => {
    console.log('got here');
    console.log(err);
    if(err) {
      res.render('error', {layout: 'basic', error:err });
    } else {

      let list  = []
      console.log(result);
      result.forEach((item, idx) => {
        let filled = modeler.getFilledParameters(model, item);
        list.push({'params': filled, modelname: modelname, id: item._id, modelname: modelname});
      });
      res.render('model-list', {layout: 'basic', 'models': list});;
    }
  });


});
/*
router.get('/:model/search', function(req, res, next) {
  //TODO list search page
});
*/
router.post('/:model/create', function(req, res, next) {
  let modelname = req.params.model;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
    return;
  }

  var modelInfo = req.body; //Get the parsed information

  modeler.validateForCreate(model, modelInfo, [], function(data, errs) {
    if(!errs || errs.length === 0) {
      modeler.createRecord(model, modelInfo, [], function(instance, instance_errs) {
        if(!instance_errs || instance_errs.length === 0 ) {
          modelInfo._id = instance._id;
          modelInfo._v = instance._v;
          let filled = modeler.getFilledParameters(model, modelInfo)
          res.render('model-display', {layout: 'basic', 'model': modelInfo, params: filled, modelname: modelname});
        } else {
          let serverErrors = modeler.getServerErrors(instance_errs);
          let filled = modeler.getFilledParameters(model, modelInfo);
          res.render('model-input', {layout: 'basic', form: {method: 'post', action: '/model/' + modelname + '/create', errors: serverErrs}, model: filled });
        }
      })
    } else {
      console.log(errs);
      let serverErrors = modeler.getServerErrors(errs);
      console.log(serverErrors);
      let filled = modeler.getFilledParameters(model, modelInfo, errs);
      res.render('model-input', {layout: 'basic', 'model': filled, form: {method: 'post', action: '/model/' + modelname + '/create', errors: serverErrors}});
    }
  });

});
router.post('/:model/edit/:modelId', function(req, res, next) {
  logger.log({level: 'info', 'message':'in post route /model/:model/edit/:modelId  /' +  req.params.model + '/' +  req.params.modelId});
  let modelname = req.params.model;
  let modelId = req.params.modelId;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.render('error', {layout: 'basic', error: modelname  + ' is not a valid model'});
    return;
  }

  var modelInfo = req.body; //Get the parsed information
  modelInfo._id = modelId;

  modeler.validateForUpdate(model, modelInfo, [], function(data, errs) {
    if(!errs || errs.length === 0) {
      modeler.updateRecord(model, data, [], function(instance, instance_errs) {
        if(!instance_errs || instance_errs.length === 0 ) {
          modelInfo._id = instance._id;
          modelInfo._v = instance._v;
          res.render('model-display', {layout: 'basic', 'model': modelInfo});
        } else {
          let serverErrs = modeler.getServerErrors(errs);
          let filled = modeler.getFilledParameters(model, modelInfo);
          res.render('model-edit', {layout: 'basic', form: {method: 'post', action: '/model/' + modelname + '/edit/' + modelId, errors: serverErrs}, model:filled});
        }
      })
    } else {
      let serverErrs = modeler.getServerErrors(errs);
      let filled = modeler.getFilledParameters(model, modelInfo, errs);
      res.render('model-edit', {layout: 'basic', form: {method: 'post', action: '/model/' + modelname + '/edit/' + modelId, errors: serverErrs}, model:filled});
    }
  });

});
/*
router.post('/:model/search', function(req, res, next) {
  //TODO return model list filtered by posted name value pairs
});
*/

/*JSON ROUTES
router.get('/:model/list/json', function(req, res, next) {
  //return a list of json models
});
router.post('/:model/search/json', function(req, res, next) {
  //return a list of json models
});
router.get('/:model/json/:modelId', function(req, res, next) {
  //return a model instance in json format
});
router.put('/:model', function(req, res, next) {
  let modelname = req.params.model;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.status(404).send('Not found');
    next();
    return;
  }

  var modelInfo = req.body; //Get the parsed information

  modeler.validateForUpdate(model, modelInfo, [], function(data, errs) {
    if(!errs || errs.length === 0) {
      modeler.UpdateRecord(model, modelInfo, [], function(instance, instance_errs) {
        if(!instance_errs || instance_errs.length === 0 ) {
          modelInfo._id = instance._id;
          modelInfo._v = instance._v;
          res.send({result: 'success', model: modelInfo});
        } else {
          let filled = modeler.getFilledParameters(model, modelInfo);
          res.send({result: 'fail', model: filled} });
        }
      })
    } else {
      let filled = modeler.getFilledParameters(model, modelInfo, errs);
      res.send({result: 'fail', model: filled} });
    }
  });

});
router.delete('/:model', function(req, res, next) {
  let modelname = req.params.model;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.status(404).send('Not found');
    next();
    return;
  }

  var modelInfo = req.body; //Get the parsed information

  modeler.validateForDelete(model, modelInfo, [], function(data, errs) {
    if(!errs || errs.length === 0) {
      modeler.deleteRecord(model, modelInfo, [], function(instance, instance_errs) {
        if(!instance_errs || instance_errs.length === 0 ) {
          res.send({result: 'success'});
        } else {
          let filled = modeler.getFilledParameters(model, modelInfo);
          res.send({result: 'fail', model: filled} });
        }
      })
    } else {
      let filled = modeler.getFilledParameters(model, modelInfo, errs);
      res.send({result: 'fail', model: filled} });
    }
  });

});
router.post('/:model', function(req, res, next) {
  let modelname = req.params.model;
  let model = modeler.getModel(modelname);

  if(model === null) {
    res.render('err', {layout: 'basic', error: modelname + ' is not a model' });
    next();
    return;
  }

  var modelInfo = req.body; //Get the parsed information

  modeler.validateForCreate(model, modelInfo, [], function(data, errs) {
    if(!errs || errs.length === 0) {
      modeler.createRecord(model, modelInfo, [], function(instance, instance_errs) {
        if(!instance_errs || instance_errs.length === 0 ) {
          modelInfo._id = instance._id;
          modelInfo._v = instance._v;
          res.send({result: 'success', model: modelInfo});
        } else {
          let filled = modeler.getFilledParameters(model, modelInfo);
          res.send({result: 'fail', model: filled});
        }
      })
    } else {
      let filled = modeler.getFilledParameters(model, modelInfo, errs);
      res.send({result: 'fail', model: filled});
    }
  });

});
*/
export default router;