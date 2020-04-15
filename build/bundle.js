/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/public/js";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/react/simple/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/react/simple/client.js":
/*!************************************!*\
  !*** ./src/react/simple/client.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/mockeryjones/experimental/simple-app-server/src/react/simple/client.js: Unexpected token (17:4)\\n\\n\\u001b[0m \\u001b[90m 15 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 16 | \\u001b[39m  \\u001b[36mreturn\\u001b[39m (\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 17 | \\u001b[39m    \\u001b[33m<\\u001b[39m\\u001b[33mThemeProvider\\u001b[39m theme\\u001b[33m=\\u001b[39m{theme}\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m    \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 18 | \\u001b[39m      {\\u001b[90m/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */\\u001b[39m}\\u001b[0m\\n\\u001b[0m \\u001b[90m 19 | \\u001b[39m      \\u001b[33m<\\u001b[39m\\u001b[33mCssBaseline\\u001b[39m \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 20 | \\u001b[39m      \\u001b[33m<\\u001b[39m\\u001b[33mApp\\u001b[39m \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n    at Parser.raise (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:7017:17)\\n    at Parser.unexpected (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:8395:16)\\n    at Parser.parseExprAtom (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9673:20)\\n    at Parser.parseExprSubscripts (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9259:23)\\n    at Parser.parseMaybeUnary (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9239:21)\\n    at Parser.parseExprOps (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9109:23)\\n    at Parser.parseMaybeConditional (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9082:23)\\n    at Parser.parseMaybeAssign (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9037:21)\\n    at Parser.parseParenAndDistinguishExpression (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9814:28)\\n    at Parser.parseExprAtom (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9594:21)\\n    at Parser.parseExprSubscripts (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9259:23)\\n    at Parser.parseMaybeUnary (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9239:21)\\n    at Parser.parseExprOps (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9109:23)\\n    at Parser.parseMaybeConditional (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9082:23)\\n    at Parser.parseMaybeAssign (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:9037:21)\\n    at Parser.parseExpression (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:8989:23)\\n    at Parser.parseReturnStatement (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:11057:28)\\n    at Parser.parseStatementContent (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:10738:21)\\n    at Parser.parseStatement (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:10690:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:11264:25)\\n    at Parser.parseBlockBody (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:11251:10)\\n    at Parser.parseBlock (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:11235:10)\\n    at Parser.parseFunctionBody (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:10252:24)\\n    at Parser.parseFunctionBodyAndFinish (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:10222:10)\\n    at /Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:11394:12\\n    at Parser.withTopicForbiddingContext (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:10565:14)\\n    at Parser.parseFunction (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:11393:10)\\n    at Parser.parseFunctionStatement (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:11036:17)\\n    at Parser.parseStatementContent (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:10728:21)\\n    at Parser.parseStatement (/Users/mockeryjones/experimental/simple-app-server/node_modules/@babel/parser/lib/index.js:10690:17)\");\n\n//# sourceURL=webpack:///./src/react/simple/client.js?");

/***/ })

/******/ });