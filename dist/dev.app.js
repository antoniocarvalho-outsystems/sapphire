/*! dev.app.js || Version: 5.1.980001 || Generated: Wed Oct 21 2020 10:18:34 GMT+0100 (Western European Summer Time) */
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "8a192fc5428afdb2c213";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/app.js")(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./components/index.scss */ "./src/components/index.scss");

//Import all JS files
const requireAll = r => r.keys().forEach(r);
requireAll(__webpack_require__("./src/components sync recursive \\.js$"));


/***/ }),

/***/ "./src/components sync recursive \\.js$":
/*!***********************************!*\
  !*** ./src/components sync \.js$ ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./00-settings/config.js": "./src/components/00-settings/config.js",
	"./05-components/layout/layout-base.js": "./src/components/05-components/layout/layout-base.js",
	"./05-components/layout/layout-blank.js": "./src/components/05-components/layout/layout-blank.js",
	"./05-components/layout/layout-popup.js": "./src/components/05-components/layout/layout-popup.js",
	"./05-components/v3-pat/actions-menu/scripts.js": "./src/components/05-components/v3-pat/actions-menu/scripts.js",
	"./05-components/v3-pat/actions-sub-menu/scripts.js": "./src/components/05-components/v3-pat/actions-sub-menu/scripts.js",
	"./05-components/v3-pat/button-link/scripts.js": "./src/components/05-components/v3-pat/button-link/scripts.js",
	"./05-components/v3-pat/card-patient-table/scripts.js": "./src/components/05-components/v3-pat/card-patient-table/scripts.js",
	"./05-components/v3-pat/comp-line/scripts.js": "./src/components/05-components/v3-pat/comp-line/scripts.js",
	"./05-components/v3-pat/country-phone/scripts.js": "./src/components/05-components/v3-pat/country-phone/scripts.js",
	"./05-components/v3-pat/data-tables/scripts.js": "./src/components/05-components/v3-pat/data-tables/scripts.js",
	"./05-components/v3-pat/datetime-range-picker/scripts.js": "./src/components/05-components/v3-pat/datetime-range-picker/scripts.js",
	"./05-components/v3-pat/drag-drop/scripts.js": "./src/components/05-components/v3-pat/drag-drop/scripts.js",
	"./05-components/v3-pat/dropdown-categories/scripts.js": "./src/components/05-components/v3-pat/dropdown-categories/scripts.js",
	"./05-components/v3-pat/dropzone/dropzone.js": "./src/components/05-components/v3-pat/dropzone/dropzone.js",
	"./05-components/v3-pat/expandable-group/scripts.js": "./src/components/05-components/v3-pat/expandable-group/scripts.js",
	"./05-components/v3-pat/expandable-link/scripts.js": "./src/components/05-components/v3-pat/expandable-link/scripts.js",
	"./05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js": "./src/components/05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js",
	"./05-components/v3-pat/generic-gallery/scripts.js": "./src/components/05-components/v3-pat/generic-gallery/scripts.js",
	"./05-components/v3-pat/generic-grid/scripts.js": "./src/components/05-components/v3-pat/generic-grid/scripts.js",
	"./05-components/v3-pat/horizontal-toolbar/scripts.js": "./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js",
	"./05-components/v3-pat/hour-picker/scripts.js": "./src/components/05-components/v3-pat/hour-picker/scripts.js",
	"./05-components/v3-pat/input-lasa/scripts.js": "./src/components/05-components/v3-pat/input-lasa/scripts.js",
	"./05-components/v3-pat/input-with-clear/scripts.js": "./src/components/05-components/v3-pat/input-with-clear/scripts.js",
	"./05-components/v3-pat/line-add/scripts.js": "./src/components/05-components/v3-pat/line-add/scripts.js",
	"./05-components/v3-pat/line-card-list/scripts.js": "./src/components/05-components/v3-pat/line-card-list/scripts.js",
	"./05-components/v3-pat/line-details-expand-box/script.js": "./src/components/05-components/v3-pat/line-details-expand-box/script.js",
	"./05-components/v3-pat/location-box/scripts.js": "./src/components/05-components/v3-pat/location-box/scripts.js",
	"./05-components/v3-pat/main-interactive-card/scripts.js": "./src/components/05-components/v3-pat/main-interactive-card/scripts.js",
	"./05-components/v3-pat/menu-bar/scripts.js": "./src/components/05-components/v3-pat/menu-bar/scripts.js",
	"./05-components/v3-pat/multiple-selection-button/scripts.js": "./src/components/05-components/v3-pat/multiple-selection-button/scripts.js",
	"./05-components/v3-pat/panel/confirmation-panel.js": "./src/components/05-components/v3-pat/panel/confirmation-panel.js",
	"./05-components/v3-pat/panel/confirmation-popup.js": "./src/components/05-components/v3-pat/panel/confirmation-popup.js",
	"./05-components/v3-pat/panel/panel-by-id-notify.js": "./src/components/05-components/v3-pat/panel/panel-by-id-notify.js",
	"./05-components/v3-pat/panel/panel-by-id.js": "./src/components/05-components/v3-pat/panel/panel-by-id.js",
	"./05-components/v3-pat/panel/popup-menu.js": "./src/components/05-components/v3-pat/panel/popup-menu.js",
	"./05-components/v3-pat/panel/sapphire-panel.js": "./src/components/05-components/v3-pat/panel/sapphire-panel.js",
	"./05-components/v3-pat/panel/scripts.js": "./src/components/05-components/v3-pat/panel/scripts.js",
	"./05-components/v3-pat/patient-call-cancel/patient-call-cancel-structure.js": "./src/components/05-components/v3-pat/patient-call-cancel/patient-call-cancel-structure.js",
	"./05-components/v3-pat/patient-call-cancel/patient-call-cancel.js": "./src/components/05-components/v3-pat/patient-call-cancel/patient-call-cancel.js",
	"./05-components/v3-pat/person-card/scripts.js": "./src/components/05-components/v3-pat/person-card/scripts.js",
	"./05-components/v3-pat/prescription-card/scripts.js": "./src/components/05-components/v3-pat/prescription-card/scripts.js",
	"./05-components/v3-pat/prescription-expandable/scripts.js": "./src/components/05-components/v3-pat/prescription-expandable/scripts.js",
	"./05-components/v3-pat/sapphire-header/scripts.js": "./src/components/05-components/v3-pat/sapphire-header/scripts.js",
	"./05-components/v3-pat/sapphire-popup/scripts.js": "./src/components/05-components/v3-pat/sapphire-popup/scripts.js",
	"./05-components/v3-pat/sapphire-radio-button/scripts.js": "./src/components/05-components/v3-pat/sapphire-radio-button/scripts.js",
	"./05-components/v3-pat/scales/scale-main-structure.js": "./src/components/05-components/v3-pat/scales/scale-main-structure.js",
	"./05-components/v3-pat/scales/toggle-item-control.js": "./src/components/05-components/v3-pat/scales/toggle-item-control.js",
	"./05-components/v3-pat/search-and-select/select-ssd.js": "./src/components/05-components/v3-pat/search-and-select/select-ssd.js",
	"./05-components/v3-pat/search-and-select/ssd-search.js": "./src/components/05-components/v3-pat/search-and-select/ssd-search.js",
	"./05-components/v3-pat/searchable-client-side/scripts.js": "./src/components/05-components/v3-pat/searchable-client-side/scripts.js",
	"./05-components/v3-pat/section-expandable-custom/scripts.js": "./src/components/05-components/v3-pat/section-expandable-custom/scripts.js",
	"./05-components/v3-pat/section-expandable-inside/scripts.js": "./src/components/05-components/v3-pat/section-expandable-inside/scripts.js",
	"./05-components/v3-pat/select-system/scripts.js": "./src/components/05-components/v3-pat/select-system/scripts.js",
	"./05-components/v3-pat/shift-container/scripts.js": "./src/components/05-components/v3-pat/shift-container/scripts.js",
	"./05-components/v3-pat/side-menu/scripts.js": "./src/components/05-components/v3-pat/side-menu/scripts.js",
	"./05-components/v3-pat/sidebar/sidebar-structure.js": "./src/components/05-components/v3-pat/sidebar/sidebar-structure.js",
	"./05-components/v3-pat/spinner-horizontal/scripts.js": "./src/components/05-components/v3-pat/spinner-horizontal/scripts.js",
	"./05-components/v3-pat/spinner-vertical/scripts.js": "./src/components/05-components/v3-pat/spinner-vertical/scripts.js",
	"./05-components/v3-pat/split-button/scripts.js": "./src/components/05-components/v3-pat/split-button/scripts.js",
	"./05-components/v3-pat/ssd-component-block/scripts.js": "./src/components/05-components/v3-pat/ssd-component-block/scripts.js",
	"./05-components/v3-pat/ssd-list-line/scripts.js": "./src/components/05-components/v3-pat/ssd-list-line/scripts.js",
	"./05-components/v3-pat/tabs-extended/scripts.js": "./src/components/05-components/v3-pat/tabs-extended/scripts.js",
	"./05-components/v3-pat/tabular-list/scripts.js": "./src/components/05-components/v3-pat/tabular-list/scripts.js",
	"./05-components/v3-pat/tabular-scroll/scripts.js": "./src/components/05-components/v3-pat/tabular-scroll/scripts.js",
	"./05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js": "./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js",
	"./05-components/v3-pat/truncated-content/scripts.js": "./src/components/05-components/v3-pat/truncated-content/scripts.js",
	"./05-components/v3-pat/vertical-carrousel/scripts.js": "./src/components/05-components/v3-pat/vertical-carrousel/scripts.js",
	"./globals.js": "./src/components/globals.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/components sync recursive \\.js$";

/***/ }),

/***/ "./src/components/00-settings/config.js":
/*!**********************************************!*\
  !*** ./src/components/00-settings/config.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

SapphireWidgets = window.SapphireWidgets = window.SapphireWidgets || {};


/***/ }),

/***/ "./src/components/05-components/layout/layout-base.js":
/*!************************************************************!*\
  !*** ./src/components/05-components/layout/layout-base.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LayoutBase */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		window[config.widgetId] = new LayoutBase(config);
		SapphireWidgets.LayoutBase.widgetId = config.widgetId;
	};

	var openSidebarIframe = function(duration) {
		window[SapphireWidgets.LayoutBase.widgetId].openSidebarIframe(duration);
	};

	var closeSidebarIframe = function(duration) {
		window[SapphireWidgets.LayoutBase.widgetId].closeSidebarIframe(duration);
	};

	var scrollToElement = function($element) {
		var $targetElement = $element;

		if (!!$targetElement.length) {
			var scrollToOffsetInterval;

			scrollToOffsetInterval = setInterval(function() {
				if (window[SapphireWidgets.LayoutBase.widgetId].getThresholds().secondaryThreshold > 0) {
					clearInterval(scrollToOffsetInterval);

					var targetElementOffsetTop = $targetElement.offset().top;
					var discount;

					if (!!$('.LayoutBase-emergency').text()) {
						if ($('.LayoutBase-secondary').hasClass('isFixed')) {
							targetElementOffsetTop += 150;
						} else {
							targetElementOffsetTop += 80;
						}
						discount = 390;
					} else {
						if ($('.LayoutBase-secondary').hasClass('isFixed')) {
							targetElementOffsetTop += 80;
						} else {
							targetElementOffsetTop += 20;
						}
						discount = 100;
					}

					$('body, html').scrollTop(targetElementOffsetTop - discount);
				}
			}, 250);
		}
	};

	var LayoutBase = function(config) {
		var _this = this;
		this.layoutBaseRedrawTimer = 0;
		this.hasHeader = config.hasHeader;
		this.isExpandable = config.isExpandable;
		this.isTopWindow = window.top === window.self ? true : false;
		this.$widget = $('#' + config.widgetId);
		this.$wrapper = this.$widget.find('.LayoutBase-Wrapper');
		this.$spacer = this.$widget.find('.LayoutBase-spacer');
		this.$mainMenu = this.$widget.find('.LayoutBase-MainMenu');
		this.$header = this.$widget.find('.LayoutBase-header');
		this.$headerBody = this.$widget.find('.SapphireHeader-body');
		this.$primaryMenu = this.$widget.find('.LayoutBase-primary-menu');
		this.$emergency = this.$widget.find('.LayoutBase-emergency');
		this.$secondary = this.$widget.find('.LayoutBase-secondary');
		this.$secondaryMenu = this.$widget.find('.LayoutBase-secondary-menu');
		this.$iframeSidebar = this.$widget.find('.LayoutBase-iframesidebar');
		this.$headerAdditionalContent = this.$widget.find('.SapphireHeader-additional-content');
		this.$topfixedContent = this.$widget.find('.LayoutBase-topfixedcontent');
		this.$bottomfixedContent = this.$widget.find('.LayoutBase-bottomfixedcontent');
		this.$mainContent = this.$widget.find('.LayoutBase-MainContent');
		this.extraPaddingEmergency = 0;
		this.extraPaddingSecondary = 0;
		this.setupWindowEvents();
		this.$iframeSidebar.append('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');

		$(function() {
			$('body').addClass('LayoutBase');
			if (_this.isTopWindow) {
				$('body').css('overflow-y', 'scroll');
			}
		});

		$(window).load(function() {
			$('body').click();
			$(window).scroll();
		});
	};

	LayoutBase.prototype.setupWindowEvents = function() {
		var _this = this;
		var cursorPositon = 0;

		$(window).resize(function() {
			_this.updateThresholds();
			_this.handleOptionalContainers();
			_this.handleLayoutTopPadding();
			_this.handleLayoutBottomPadding();
		});

		$(window).scroll(function() {
			var newPosition = $(window).scrollTop();

			window.clearTimeout(_this.layoutBaseRedrawTimer);
			_this.layoutBaseRedrawTimer = window.setTimeout(function() {
				_this.updateThresholds();
				_this.handleOptionalContainers();
				_this.handleLayoutTopPadding();
				_this.handleLayoutBottomPadding();
				_this.handleManageQueueCard(cursorPositon, newPosition);
				cursorPositon = newPosition;
			}, 100);
		});
	};

	LayoutBase.prototype.handleOptionalContainers = function() {
		var scrollTop = $(window).scrollTop();

		if (this.$emergency.length === 1) {
			if (scrollTop + this.contentThreshold > this.emergencyThreshold) {
				this.$emergency.addClass('isFixed');
				this.$emergency.css({
					top: this.contentThreshold,
					width: this.$header.width(),
				});
				this.extraPaddingEmergency = this.$emergency.outerHeight(true);
			} else {
				this.$emergency.removeClass('isFixed');
				this.$emergency.css({
					top: 'auto',
					width: '100%',
				});
				this.extraPaddingEmergency = 0;
			}
		}

		if (this.$secondary.length === 1 && this.$secondary.text().length > 0) {
			const eventToolbar = new CustomEvent('ToolbarFixed');
			const hasClass = this.$secondary.hasClass('isFixed');

			if (this.$secondaryMenu.text().length === 0) {
				this.$secondary.addClass('noToolbar');
			}

			if (scrollTop + this.contentThreshold + (this.$emergency.outerHeight(true) || 0) > this.secondaryThreshold) {
				this.$secondary.addClass('isFixed').css({
					top: this.contentThreshold + (this.$emergency.outerHeight(true) || 0),
					width: this.$header.width(),
				});
				this.$secondary
					.find('.Button.Second, .Button.Third, .Button.Link')
					.not('.Panel .Button.Small, .Panel .Button.Third')
					.addClass('Small');
				if (this.$secondary.find('.Toolbar').length === 1) {
					var targetToolbarWidth = $('.SapphireHeader').outerWidth(true) * 0.66;
					this.$secondary.find('.Toolbar').width(targetToolbarWidth);
				}
				if (this.$secondaryMenu.text().length === 0) {
					this.$secondary.addClass('noToolbar');
				}
				this.$primaryMenu.css('opacity', 0);
				this.extraPaddingSecondary = this.$secondary.outerHeight(true);

				if (!hasClass) window.dispatchEvent(eventToolbar);

				// //
				// var currentHeight = $('body')[0].scrollHeight;
				// var compensation = this.referenceHeight - currentHeight;

				// if (compensation <= 0) {
				// 	// this.$layoutBaseContent.css('padding-bottom', '');
				// } else {
				// 	this.$layoutBaseContent.css('padding-bottom', compensation);
				// }
			} else {
				// this.$layoutBaseContent.css('padding-bottom', '');

				this.$secondary.removeClass('isFixed').css({
					top: 'auto',
					width: '100%',
				});
				this.$secondary.find('.Button.Second, .Button.Third, .Button.Link').removeClass('Small');
				this.$primaryMenu.css('opacity', 1);
				this.$secondary.css({
					height: 'unset',
				});
				this.$secondary.find('.Toolbar').css('width', '100%');
				this.extraPaddingSecondary = 0;

				window.dispatchEvent(eventToolbar);
			}

			if (this.$secondaryMenu.text().length > 0) {
				this.$widget.find('.ClinicianWorkArea-columns-big').css('margin-top', 'unset');
			} else {
				this.$widget.find('.ClinicianWorkArea-columns-big').css('margin-top', -this.$secondary.outerHeight(true));
				this.$secondaryMenu.css('background-color', 'transparent');
			}
		}
	};

	LayoutBase.prototype.handleLayoutTopPadding = function() {
		var paddingTop = this.contentThreshold + this.extraPaddingEmergency + this.extraPaddingSecondary;
		this.$spacer.stop().animate(
			{
				height: paddingTop,
			},
			0,
			'linear'
		);
		if (this.$topfixedContent.length === 1) {
			this.$topfixedContent.css({
				width: $('.LayoutBase-MainContent').width(),
				top: this.topfixedContentThreshold + 'px',
			});
		}
	};

	LayoutBase.prototype.handleLayoutBottomPadding = function() {
		if (this.$bottomfixedContent.length === 1) {
			if ($('body')[0].scrollHeight > $('body').height()) {
				var bottomFixedHeight = this.$bottomfixedContent.outerHeight(true);
				this.$wrapper.addClass('hasFixedBottom').css('padding-bottom', bottomFixedHeight + 'px');
				this.$bottomfixedContent.css({
					width: $('.LayoutBase-MainContent').outerWidth(true),
				});
			} else {
				this.$wrapper.removeClass('hasFixedBottom').css('padding-bottom', '');
				this.$bottomfixedContent.css({
					width: '',
				});
			}
		}
	};

	LayoutBase.prototype.updateThresholds = function() {
		var mainMenuHeight = this.$mainMenu.outerHeight(true) || 0;
		var headerBodyHeight = this.$headerBody.outerHeight(true) || this.$header.outerHeight(true) || 0;
		var topfixedContentHeight = this.$topfixedContent.outerHeight(true) || 0;
		var primaryMenuHeight = this.$primaryMenu.outerHeight(true) || 0;
		var emergencyHeight = this.$emergency.outerHeight(true) || 0;
		this.topfixedContentThreshold = mainMenuHeight + headerBodyHeight;
		this.contentThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight;
		this.emergencyThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight + primaryMenuHeight;
		this.secondaryThreshold =
			mainMenuHeight + headerBodyHeight + topfixedContentHeight + primaryMenuHeight + emergencyHeight;
	};

	LayoutBase.prototype.getThresholds = function() {
		return {
			topfixedContentThreshold: this.topfixedContentThreshold,
			contentThreshold: this.contentThreshold,
			emergencyThreshold: this.emergencyThreshold,
			secondaryThreshold: this.secondaryThreshold,
		};
	};

	LayoutBase.prototype.openSidebarIframe = function(duration_in) {
		var duration = duration_in >= 0 ? duration_in : 100;
		this.$iframeSidebar.animate(
			{
				width: '100%',
			},
			duration
		);
		$('body')
			.css('overflow-y', 'scroll')
			.click();
	};

	LayoutBase.prototype.closeSidebarIframe = function(duration_in) {
		var duration = duration_in >= 0 ? duration_in : 100;
		var targetWidth = this.isExpandable ? 40 : 262;
		this.$iframeSidebar.animate(
			{
				width: targetWidth,
			},
			duration
		);
		$('body').css('overflow-y', 'scroll');
	};

	LayoutBase.prototype.handleManageQueueCard = function(cursorPositon, newPosition) {
		const $manageQueue = $('.ManageQueueContainer');

		if ($manageQueue.length) {
			if (newPosition > cursorPositon) {
				$manageQueue.addClass('ManageQueueContainer--closed');
			} else if (newPosition < cursorPositon) {
				$manageQueue.removeClass('ManageQueueContainer--closed');
			}
		}
	};

	SapphireWidgets.LayoutBase = {
		create,
		closeSidebarIframe,
		openSidebarIframe,
		scrollToElement,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/layout/layout-blank.js":
/*!*************************************************************!*\
  !*** ./src/components/05-components/layout/layout-blank.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LayoutBlank */
$(function () {
	if (window.frameElement) {
		if (!!$(this.frameElement).closest('.MainInteractiveCard').length) {
			$('.LayoutBlank.Page').addClass('MainInteractiveCard');
		}
	}
});

/***/ }),

/***/ "./src/components/05-components/layout/layout-popup.js":
/*!*************************************************************!*\
  !*** ./src/components/05-components/layout/layout-popup.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LayoutPopup */
(function($, window, document, SapphireWidgets) {
	var popupWidth;
	var popupMinWidth;
	var popupHeight;
	var popupMinHeight;
	var popupMaxHeight;
	var popupWidthPercentage;
	var layoutPopupResizeTimer;

	var $popup = $('.LayoutPopup');
	var $osPopup = window.parent.$('.os-internal-Popup.os-internal-ui-dialog');
	var $osPopupContent = window.parent.$('.os-internal-ui-dialog-content.os-internal-ui-widget-content');
	var $overlay = window.parent.$('.os-internal-ui-widget-overlay');
	var popupSize;

	const BODY_PADDING_TOP_BOTTOM = 60;

	const create = function(config) {
		SapphireWidgets.LayoutPopup.config = config;
		popupSize = SapphireWidgets.LayoutPopup.config.PopupSize;

		$(function() {
			$('body').addClass('LayoutPopup'); // because datetimerangepicker is attached to body

			if (SapphireWidgets.LayoutPopup.config.isTouch) {
				$popup.addClass('isTouch');
				$('body').addClass('isTouch'); // because select2 is attached to body
			}

			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation, index) {
					redrawDialogWindow();
				});
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: false,
			});

			$('body').css('visibility', 'hidden');
		});

		$(window).load(function() {
			$(this.frameElement).css({
				width: '100%',
				height: '100%',
			});

			setTimeout(function() {
				resizeDialog();
				resizeContent();
				$('body').css('visibility', 'visible');
			}, 150);

			osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.LayoutPopup.redrawDialogWindow);
		});

		$(window.parent)
			.off('resize.LayoutPopup')
			.on('resize.LayoutPopup', function() {
				redrawDialogWindow();
			});
	};

	const redrawDialogWindow = function() {
		clearTimeout(layoutPopupResizeTimer);
		layoutPopupResizeTimer = setTimeout(function() {
			resizeDialog();
			resizeContent();
			$('body').css('visibility', 'visible');
		}, 300);
	};

	const resizeDialog = function() {
		if (SapphireWidgets.LayoutPopup.config.hasClose) {
			window.parent.$('.os-internal-ui-dialog-titlebar').show();

			if (window.top._iframePopup != undefined || false) {
				const $closeButton = window.parent.$('.os-internal-ui-dialog-titlebar-close');

				$closeButton.removeAttr('href');
				$closeButton.off('click').on('click', () => window.top._iframePopup.SapphireWidgets.SapphirePopup.close());
			}
		}

		if (window.top.$('body').hasClass('LayoutBase')) {
			window.top.$('body').css({
				overflowY: 'hidden',
			});
		}

		$overlay.width('100%');

		calcWidthPercentage(popupSize, $osPopupContent);

		$osPopup.css({
			left: 'unset',
			top: 'unset',
			height: 'auto',
			minWidth: popupMinWidth + 'px',
			width: popupWidth + 'px',
		});
	};

	const resizeContent = function() {
		var $body = $('.LayoutPopup__body__content');
		var contentScrollTop = $body.scrollTop();

		if (popupSize === 'Small' && $('.daterangepicker:visible').length > 0) {
			// skip the reset of .LayoutPopup__body__content
		} else {
			$body.css({
				height: 'auto',
			});
		}

		var headerHeight = $('.LayoutPopup__header').innerHeight() || 0;
		var introHeight = $('.LayoutPopup__intro').innerHeight() || 0;
		var bodyHeight = $('.LayoutPopup__body__content')[0].scrollHeight || 0;
		var footerHeight = $('.LayoutPopup__footer').innerHeight() || 0;
		var contentHeight = headerHeight + introHeight + bodyHeight + footerHeight + BODY_PADDING_TOP_BOTTOM;
		var dialogHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();
		const windowHeight = $(window.parent).height();

		if (popupSize === 'Small') {
			var parentHeight = $(window.parent).height();

			if (contentHeight > parentHeight) {
				$osPopupContent.height(parentHeight - 70);
				$body.height($osPopupContent.height() - BODY_PADDING_TOP_BOTTOM);
			} else {
				$osPopupContent.height(contentHeight);
			}
		} else {
			if (contentHeight < dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - BODY_PADDING_TOP_BOTTOM;
				$body.height(forcedBodyHeight);
			} else if (contentHeight < dialogHeight) {
				$osPopupContent.height(contentHeight);
				if (contentHeight < popupMinHeight) {
					var diference = popupMinHeight - contentHeight;
					$body.height(bodyHeight + diference);
				}
			} else if (contentHeight >= dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - BODY_PADDING_TOP_BOTTOM;
				$body.height(forcedBodyHeight);
			} else if (contentHeight >= dialogHeight) {
				if (contentHeight > popupMaxHeight) {
					$osPopupContent.height(popupMaxHeight);
					var forcedBodyHeight = popupMaxHeight - headerHeight - introHeight - footerHeight - BODY_PADDING_TOP_BOTTOM;
					$body.height(forcedBodyHeight);
				} else {
					$osPopupContent.height(contentHeight);
				}
			} else {
				console.warn('Unexpected combination...');
			}
		}

		// Handle when DateTimeRangePicker is opened
		var dateRangePicker = $('.daterangepicker:visible');
		if (dateRangePicker.length === 1) {
			if (dateRangePicker[0].getBoundingClientRect().bottom > dialogHeight) {
				var difference = dateRangePicker[0].getBoundingClientRect().bottom - dialogHeight;
				var bodyHeight = $('.LayoutPopup__body__content').outerHeight(true);

				$('.LayoutPopup__body__content').height(bodyHeight + difference + BODY_PADDING_TOP_BOTTOM);
				$osPopupContent.height($('body')[0].scrollHeight);

				const popupTotalHeight = $osPopupContent.height();
				const newContentHeight = $('.LayoutPopup__body').outerHeight(true) + headerHeight + introHeight + footerHeight;

				if (windowHeight < 720) {
					const coords = dateRangePicker[0].getBoundingClientRect();
					var point = window.parent.scrollY + coords.top - coords.height;
					dateRangePicker.addClass('drop-up').css('top', point);
				} else if (windowHeight < 980 && newContentHeight > popupTotalHeight) {
					$osPopupContent.css({
						maxHeight: newContentHeight + 'px',
					});
				}
			}
		}

		$body.scrollTop(contentScrollTop);
	};

	const increaseHeight = function(diference) {
		$osPopupContent.height($osPopupContent.height() + diference);
	};

	const scrollToElement = function($element) {
		var $targetElement = $element;
		if (!!$targetElement.length) {
			var scrollToOffsetInterval;
			scrollToOffsetInterval = setInterval(function() {
				clearInterval(scrollToOffsetInterval);
				var headerHeight = $('.LayoutPopup__header').outerHeight(true) || 0;
				var introHeight = $('.LayoutPopup__intro').outerHeight(true) || 0;
				var currentBodyScroll = $('.LayoutPopup__body__content')[0].scrollTop || 0;
				var targetElementOffsetTop = $targetElement.offset().top - headerHeight - introHeight + currentBodyScroll - 20;
				$('.LayoutPopup__body__content').scrollTop(targetElementOffsetTop);
			}, 250);
		}
	};

	const calcWidthPercentage = () => {
		const windowHeight = $(window.parent).height();
		const windowWidth = $(window.parent).width();

		if (popupSize === 'Small') {
			let percentage = 0.33;

			if (windowWidth <= 1024) percentage = 0.5;
			else if (windowWidth > 1024 && windowWidth <= 1440) percentage = 0.4;

			popupWidth = parseInt(windowWidth * percentage);
			popupMinWidth = 400;
		} else if (popupSize === 'Medium') {
			if (windowWidth <= 1024) popupWidthPercentage = 0.8;
			else {
				switch (SapphireWidgets.LayoutPopup.config.PopupWidth) {
					case 'XSmall':
						popupMinWidth = 200;
						popupWidthPercentage = 0.2;
						break;
					case 'Small':
						popupMinWidth = 300;
						popupWidthPercentage = 0.3;
						break;
					case 'Medium':
						popupMinWidth = 700;
						popupWidthPercentage = 0.6;
						break;
					default:
						popupMinWidth = 700;
						popupWidthPercentage = 0.7;
				}

				popupWidthPercentage = SapphireWidgets.LayoutPopup.config.isTouch ? 0.8 : popupWidthPercentage;
			}

			popupWidth = parseInt(windowWidth * popupWidthPercentage);
			popupMinHeight = 100;
			popupMaxHeight = SapphireWidgets.LayoutPopup.config.isTouch
				? parseInt(windowHeight * 0.9)
				: parseInt(windowHeight * 0.7);

			if (SapphireWidgets.LayoutPopup.config.isFixedHeight) popupHeight = popupMaxHeight;
			else popupHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();

			$osPopupContent.css({
				maxHeight: popupMaxHeight + 'px',
				minHeight: popupMinHeight + 'px',
				height: popupHeight + 'px',
			});
		} else if (popupSize === 'Large') {
			popupMinWidth = parseInt(windowWidth * 0.8);
			popupMaxHeight = parseInt(windowHeight * 0.9);
		}
	};

	SapphireWidgets.LayoutPopup = {
		create,
		resizeDialog,
		resizeContent,
		increaseHeight,
		redrawDialogWindow,
		scrollToElement,
	};
})(jQuery, window, document, SapphireWidgets);

$(window).unload(function() {
	if (!!$('.LayoutPopup').length) {
		window.top.$('body').css({
			overflowY: 'scroll',
		});
	}
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/actions-menu/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/actions-menu/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ActionsMenu */
(function ($, window, SapphireWidgets) {
	var create = function (config) {
		var $triggerElement = $('#' + config.triggerElement);
		var $contentElement = $('#' + config.contentElement);

		if ($contentElement.text().length < 1) {
			$triggerElement.hide();
		}

		$(function () {
			// inside a document ready due to sapphire popup binded events
			window.setTimeout(function () {
				var position = config.position;
				if (config.locale === 'AR') {
					switch (config.position) {
						case 'right':
							position = 'left';
							break;
						case 'left':
							position = 'right';
							break;
						case 'bottom-left':
							position = 'bottom-right';
							break;
						case 'bottom-right':
							position = 'bottom-left';
							break;
						case 'top-left':
							position = 'top-right';
							break;
						case 'top-right':
							position = 'top-left';
							break;
					}
				}
				$triggerElement.tooltipster({
					content: $('<section/>').append($contentElement.clone(true)),
					trigger: config.triggerEvent,
					position: position,
					maxWidth: config.maxWidth,
					theme: 'tooltipster-location--' +
						config.location +
						' ActionsMenu-tooltip Padding--' +
						config.padding +
						' Border--' +
						config.border,
				});
				$contentElement.remove();
			}, 500);
		});
	};

	SapphireWidgets.ActionsMenu = {
		create
	};
})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/actions-sub-menu/scripts.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/actions-sub-menu/scripts.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ActionsSubMenu - @Deprecated */
SapphireWidgets.ActionsSubMenu = function(IconId) {
	if ($('.PatientHeaderActions__subMenu').hasClass('SubMenuBlock')) {
		$('.PatientHeaderActions__subMenu').removeClass('SubMenuBlock');
	} else {
		$(IconId)
			.parent()
			.siblings()
			.find('.PatientHeaderActions__subMenu')
			.addClass('SubMenuBlock');
	}
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/button-link/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/button-link/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ButtonLink */
(function($, window, SapphireWidgets) {
	const create = config => {
		$(document).ready(function() {
			const $widget = $(`#${config.widgetId} .ButtonClick`);

			$widget.off('click').on('click', function(e) {
				const _target = $(e.target);

				if (_target.closest('.ButtonClick.click').length == 0) {
					$('.ButtonClick.click').removeClass('click');
					$(this).addClass('click');
				}
			});
		});
	};

	SapphireWidgets.ButtonLink = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/card-patient-table/scripts.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/card-patient-table/scripts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component CardPatientTable */
(function($, window, SapphireWidgets) {
	const create = config => {
		$(document).ready(function() {
			$('.CardPatientInfo div a').click(function() {
				$(this).addClass('Bold');
				$(this)
					.parent()
					.siblings('.ThemeGrid_Width2')
					.find('a')
					.removeClass('Bold');
				$(this)
					.parent()
					.parent()
					.siblings()
					.children()
					.find('a')
					.removeClass('Bold');
			});
		});
	};

	SapphireWidgets.CardPatientTable = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/comp-line/scripts.js":
/*!******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/comp-line/scripts.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component CompLine */
(function($, window, SapphireWidgets) {
	function SectionCompline() {
		var that = this;

		// Object to save stats
		var previewstat = [];

		var transitionEvent = SilkUI.whichTransitionEvent();
		// set click events
		function clickEvents(ob) {
			// store querys in a single var
			var holder = $(ob).closest('.CompLine');
			var Section = $(ob).closest('.CompLineExpandable');
			var SectionContent = Section.children('.CompLine_Expand');

			// get id
			var id = holder.attr('id');

			var tempHeight = 0;

			// has class expanded
			if (Section.hasClass('expanded')) {
				// Calc and set a fixed height, during this process, transitions are disabled
				SectionContent.addClass('noTransition');
				SectionContent.height(SectionContent.height());
				SectionContent[0].offsetHeight; // hack to force a repaint
				SectionContent.removeClass('noTransition');

				// Collapse content
				SectionContent.height(0);
				Section.removeClass('expanded');
				SectionContent.css('overflow', 'hidden');

				// Remove class, set height and save state
				previewstat[id]['client'] = false;

				if (holder.hasClass('notRenderInteractions')) {
					holder.find('.CompLine-toggle-interactions').trigger('click');
				}
			} else {
				// Calc and set a fixed height
				SectionContent.height('auto');
				tempHeight = SectionContent.height();
				SectionContent.height(0);
				SectionContent.height(tempHeight);
				SectionContent.css('overflow', 'hidden');

				// remove class, set height and save state
				Section.addClass('expanded');
				previewstat[id]['client'] = true;

				if ($('.Page').hasClass('ie8') || $('.Page').hasClass('ie9')) {
					SectionContent.height('auto');
					SectionContent.css('overflow', 'visible');
				}

				// add event transition end to overflow:visible for tooltips and dropdowns issues
				SectionContent.on(transitionEvent, function() {
					if (Section.hasClass('expanded')) {
						SectionContent.css('overflow', 'visible');
						SectionContent.addClass('noTransition');
						SectionContent.height('auto');
						SectionContent[0].offsetHeight; // hack to force a repaint
						SectionContent.removeClass('noTransition');
					}
				});

				if (holder.hasClass('notRenderInteractions')) {
					holder.find('.CompLine-toggle-interactions').trigger('click');
				}
			}
		}

		// ajax refres function
		that.ajaxRefresh = function() {
			// remove click events
			$('.CompLine_headLine').off();

			// add stop prepagation
			$('.CompLine_headLine input, .CompLine_headLine select, .CompLine_headLine a').click(function(event) {
				event.stopPropagation();
			});

			// add new click events
			$('.CompLine__expandIcon').unbind('click');
			$('.CompLine__expandIcon').on('click', function() {
				clickEvents(this.parentElement);
			});

			// each all sections
			$('.CompLineExpandable').each(function() {
				// if new SectionExpandable then add to previewstat array
				if (
					previewstat[
						$(this)
							.closest('.CompLine')
							.attr('id')
					] == null
				) {
					// add stat on array
					var stat = false;
					// if open
					if ($(this).hasClass('expanded')) {
						stat = true;
					}
					// add row
					previewstat[
						$(this)
							.closest('.CompLine')
							.attr('id')
					] = {
						client: stat,
						server: stat,
					};
				}

				// curent state (ajax state x initial state)
				var curState = false;

				// check if start expandable
				if ($(this).hasClass('expanded')) {
					curState = true;
				}

				// check if ajax != initial server
				if (
					curState !=
					previewstat[
						$(this)
							.closest('.CompLine')
							.attr('id')
					]['server']
				) {
					// curstate
					previewstat[
						$(this)
							.closest('.CompLine')
							.attr('id')
					]['client'] = curState;
					previewstat[
						$(this)
							.closest('.CompLine')
							.attr('id')
					]['server'] = curState;
				} else {
					// has class expanded
					if (
						previewstat[
							$(this)
								.closest('.CompLine')
								.attr('id')
						]['client'] == false &&
						$(this).hasClass('expanded')
					) {
						$(this).removeClass('expanded');
						$(this)
							.children('.CompLine_Expand')
							.height(0);
					} else if (
						previewstat[
							$(this)
								.closest('.CompLine')
								.attr('id')
						]['client'] == true &&
						!$(this).hasClass('expanded')
					) {
						$(this).addClass('expanded');
					}
				}
			});
		};

		// set events
		that.init = function() {
			// each all sections to create array stat
			$('.CompLineExpandable').each(function() {
				// add stat on array
				var stat = false;

				// if open
				if ($(this).hasClass('expanded')) {
					stat = true;
				}

				// add row
				previewstat[
					$(this)
						.closest('.CompLine')
						.attr('id')
				] = {
					client: stat,
					server: stat,
				};
			});

			// add click events
			$('.CompLine__expandIcon').unbind('click');
			$('.CompLine__expandIcon').on('click', function() {
				clickEvents(this.parentElement);
			});

			// add stop prepagation
			$('.CompLine_headLine input, .CompLine_headLine select, .CompLine_headLine a').click(function(event) {
				event.stopPropagation();
			});

			// remove unecessary behaviors

			// event ajax
			osAjaxBackend.BindAfterAjaxRequest(that.ajaxRefresh);
		};
	}

	const create = () => {
		SilkUI.SectionExpandable = new SectionCompline();
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on Sapphirev2_Patters/CompLine');
	};

	SapphireWidgets.CompLine = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/country-phone/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/country-phone/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component CountryPhone */
(function ($, window, SapphireWidgets) {
	const create = config => {
		const $element = document.querySelector(`#${config.widgetId}`);

		const countryPhoneInput = window.intlTelInput($element, {
			initialCountry: config.initialCountry,
			preferredCountries: config.preferredCountries,
			separateDialCode: config.separateDialCode,
			nationalMode: config.nationalMode,
			autoPlaceholder: config.autoPlaceholder ? 'polite' : false,
			formatOnDisplay: false,
			utilsScript: '/V3_Pat/js/utils.js',
		});
	};

	SapphireWidgets.CountryPhone = {
		create
	};

})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/data-tables/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/data-tables/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
	class DataTables {
		constructor(config) {
			this.config = config;
			this.$widget = $(`#${config.widgetId}`);
			this.$table = this.$widget.find('table');
			this.$table.addClass('cell-border compact');
			this.onInit();
		}

		onInit() {
			this.options = {
				...this.config,
				fixedColumns: true,
				info: false,
				ordering: false,
				paging: false,
				scrollCollapse: true,
				scrollX: true,
				searching: false,
			};

			$(() => {
				this.$table.DataTable(this.options);
			});
		}
	}

	const create = config => (window[config.widgetId] = new DataTables(config));

	SapphireWidgets.DataTables = {
		create,
	};
})();


/***/ }),

/***/ "./src/components/05-components/v3-pat/datetime-range-picker/scripts.js":
/*!******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/datetime-range-picker/scripts.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component DateTimeRangePicker */
(function($, window, document, SapphireWidgets) {
	var allDateTimeRangePickers = [];

	var create = function(config) {
		for (var i = 0; i < allDateTimeRangePickers.length; i++) {
			if (allDateTimeRangePickers[i].config.widgetId === config.widgetId) {
				allDateTimeRangePickers.splice(i, 1);
			}
		}
		window[config.widgetId] = new DateTimeRangePicker(config);
		allDateTimeRangePickers.push(window[config.widgetId]);
	};

	var DateTimeRangePicker = function(config) {
		this.config = config;
		this.currentLocale = config.currentLocale;

		this.$widget = $('#' + config.widgetId);
		this.$widget.addClass('DateTimeRangePicker');
		this.$clear = this.$widget.find('.DateTimeRangePicker-clear');
		this.$label = this.$widget.find('.DateTimeRangePicker-label');

		this.isEmptyHour = false;

		if (this.config.attachToInput) {
			this.$widget.addClass('attachedInput');
			this.$input = this.$widget.find('.DateTimeRangePicker-placeholder input[type="text"]');
			this.$displayed = this.$widget.find('.DateTimeRangePicker-displayed input[type="text"]');
			if (!this.config.allowsTyping) {
				this.$displayed.prop('readonly', true);
			}
		} else {
			this.$input = $('#' + config.inputId);
			if (!this.config.allowsTyping) {
				this.$input.prop('readonly', true);
			}
		}

		if (this.currentLocale === 'AR') {
			moment.locale('ar-kw');
		}

		var options = {};
		options.startDate = config.startDate;
		options.singleDatePicker = config.singleDatePicker;
		options.autoApply = config.autoApply;
		options.autoUpdateInput = config.autoUpdateInput;
		options.timePicker = config.timePicker;
		options.timePicker24Hour = config.timePicker24Hour;
		options.timePickerIncrement = config.timePickerIncrement;
		options.showDropdowns = config.hasDropdowns;
		options.drops = config.drops;
		options.opens = config.opens;

		var stringConnection = '[, at]';

		if (config.timePicker) {
			if (this.config.attachToInput) {
				this.$displayed.prop('placeholder', 'DD-MM-YYYY HH:MM');
			} else {
				this.$input.prop('placeholder', 'DD-MM-YYYY HH:MM');
			}
			if (options.timePicker24Hour) {
				this.config.formatInput = 'DD-MM-YYYY HH:mm';
				this.config.formatLabel = this.config.hasYearWhenText
					? 'D MMM YYYY' + stringConnection + ' HH:mm'
					: 'D MMM' + stringConnection + ' HH:mm';
			} else {
				this.config.formatInput = 'DD-MM-YYYY hh:mm A';
				this.config.formatLabel = this.config.hasYearWhenText
					? 'D MMM YYYY' + stringConnection + ' hh:mm A'
					: 'D MMM' + stringConnection + ' hh:mm A';
			}
		} else {
			this.$widget.addClass('onlyDate');
			if (this.config.attachToInput) {
				this.$displayed.prop('placeholder', 'DD-MM-YYYY');
			} else {
				this.$input.prop('placeholder', 'DD-MM-YYYY');
			}
			this.config.formatInput = 'DD-MM-YYYY';
			this.config.formatLabel = this.config.hasYearWhenText ? 'D MMM YYYY' : 'D MMM';
		}

		if (!config.singleDatePicker) {
			this.$widget.addClass('rangeDates');
		}

		this.config.formatLabel = this.config.hasWeekDayNameWhenText
			? 'ddd[, ]' + this.config.formatLabel
			: this.config.formatLabel;

		options.locale = {
			direction: config.currentLocale === 'AR' ? 'rtl' : 'ltr',
			format: this.config.formatInput,
			cancelLabel: 'Cancel',
			applyLabel: 'Apply',
		};

		if (config.hasTextTrigger) {
			this.$widget.addClass('textTrigger');
		}

		if (config.endDate && config.endDate !== '01-01-1900 00:00:00') {
			options.endDate = config.endDate;
		}
		if (config.maxDate && config.maxDate !== '01-01-1900 00:00:00') {
			options.maxDate = config.maxDate;
		}
		if (config.minDate && config.minDate !== '01-01-1900 00:00:00') {
			options.minDate = config.minDate;
		}

		if (config.DisabledWeekDays) {
			var disabledWeekDays = config.DisabledWeekDays.split(',');
			options.isInvalidDate = function(date) {
				return disabledWeekDays.includes(
					moment(date)
						.day()
						.toString()
				);
			};
		}

		this.$input.daterangepicker(options, function(startDate, endDate, label) {
			// after a selection is made
		});

		// now we have a proper instance
		this.picker = this.$input.data('daterangepicker');

		this.$calendar = $(this.picker.container);

		if (!!this.config.cssClass) {
			this.$calendar.addClass(this.config.cssClass);
		}

		this.$timeHolder = this.$calendar.find('.calendar-time');
		this.$buttonsHolder = this.$calendar.find('.drp-buttons');

		if (this.config.autoApply) {
			this.$buttonsHolder.hide();
		}

		if (config.isEmptyStartDate) {
			this.clear(false);
		} else if (config.isEmptyStartHour) {
			this.isEmptyHour = true;
			this.updateLabeling();
		} else {
			this.updateLabeling();
		}

		if (config.enabled) {
			this.nativeEvents();
			this.customEvents();
		} else {
			this.$clear.hide();
			this.$input.off('click focus keydown keyup');
		}

		if (this.config.attachToInput) {
			this.handleCustomValidation();
		}
	};

	DateTimeRangePicker.prototype.handleCustomValidation = function() {
		var errorMessage = this.$input.next().text();
		if (!!errorMessage.length) {
			this.$displayed.addClass('Not_Valid');
			this.$displayed
				.next()
				.show()
				.text(errorMessage);
		} else {
			this.$displayed.removeClass('Not_Valid');
			this.$displayed.next().hide();
		}
	};

	DateTimeRangePicker.prototype.nativeEvents = function() {
		var _this = this;
		this.$input.on('showCalendar.daterangepicker', function(event, picker) {
			if (_this.config.hasGoToday) {
				_this.$calendar
					.find('.calendar-table thead tr')
					.eq(0)
					.after(
						'<tr><td colspan="7" class="DateTimeRangePicker-calendar-gotoday">' +
							_this.config.goTodayLabel +
							'</td></tr>'
					);
				if (_this.config.drops === 'up') {
					_this.$calendar.css('top', _this.$calendar.offset().top - 24);
				}
			}
			_this.handleViewportPosition();

			if (!_this.config.singleDatePicker) {
				$('.drp-selected').each(function() {
					let text = $(this).text();
					text = text.replace(/-/gi, '·');

					$(this).text(text);
				});
			}
		});
		this.$input.on('show.daterangepicker', function(event, picker) {
			if (_this.config.timePicker && _this.config.hasClearHour) {
				_this.$calendar.find('.calendar-time').append('<span class="DateTimeRangePicker-calendar-clear"></span>');
				if (_this.isEmptyHour) {
					_this.$timeHolder.css('opacity', 0.5);
					_this.$calendar.find('.DateTimeRangePicker-calendar-clear').addClass('disabled');
				} else {
					_this.$timeHolder.css('opacity', 1);
					_this.$calendar.find('.DateTimeRangePicker-calendar-clear').removeClass('disabled');
				}
			}
			_this.handleViewportPosition();
			SapphireWidgets.DateTimeRangePicker.openedWidgetId = _this.config.widgetId;
		});
		this.$input.on('hide.daterangepicker', function(event, picker) {
			_this.$calendar.find('.DateTimeRangePicker-calendar-clear').remove();
			_this.updateParentIframe();
		});
		this.$input.on('cancel.daterangepicker', function(event, picker) {});
		this.$input.on('outsideClick.daterangepicker', function(event, picker) {});
		this.$input.on('timechanged.daterangepicker', function(event, picker) {
			_this.isEmptyHour = false;
			_this.$timeHolder.css('opacity', 1);
			if (_this.config.hasClearHour) {
				_this.$calendar.find('.calendar-time').append('<span class="DateTimeRangePicker-calendar-clear"></span>');
			}
			if (_this.config.autoApply) {
				_this.$clear.removeClass('disabled');
				_this.updateLabeling();
				_this.sendNotification();
			}
		});
		this.$input.on('clickDate.daterangepicker', function(event, picker) {
			if (_this.config.autoApply) {
				_this.$clear.removeClass('disabled');
				_this.updateLabeling();
				_this.sendNotification();
			}
		});
		this.$input.on('apply.daterangepicker', function(event, picker) {
			_this.$clear.removeClass('disabled');
			_this.updateLabeling();
			_this.sendNotification();
		});
	};

	DateTimeRangePicker.prototype.customEvents = function() {
		var _this = this;
		this.$label.off('click').on('click', function(event) {
			_this.picker.toggle();
		});
		this.$clear.off('click').on('click', function(event) {
			_this.clear();
			_this.picker.hide();
		});
		this.$calendar.on('click', '.DateTimeRangePicker-calendar-clear', function() {
			if (_this.config.timePicker24Hour) {
				_this.$calendar
					.find('.hourselect')
					.val('0')
					.trigger('change');
			} else {
				_this.$calendar
					.find('.hourselect')
					.val('12')
					.trigger('change');
			}
			_this.$calendar
				.find('.minuteselect')
				.val('0')
				.trigger('change');
			_this.$calendar
				.find('.ampmselect')
				.val('AM')
				.trigger('change');
			_this.isEmptyHour = true;
			_this.$timeHolder.css('opacity', 0.5);
			_this.$calendar.find('.DateTimeRangePicker-calendar-clear').addClass('disabled');
		});
		this.$calendar.on('click', '.DateTimeRangePicker-calendar-gotoday', function() {
			_this.picker.setStartDate(moment());
			_this.picker.setEndDate(moment());
			_this.picker.hide();
			if (!_this.config.autoUpdateInput || _this.config.hasTextTrigger || _this.config.attachToInput) {
				_this.updateLabeling();
			}
			_this.sendNotification();
		});
		if (this.config.attachToInput) {
			this.$displayed.on('click focus', function() {
				_this.$input.trigger('click');
			});
			this.$displayed.on('keyup', function(evt) {
				_this.$input.val(_this.$displayed.val()).trigger('keyup');
			});

			this.$displayed.on('keydown', function(evt) {
				_this.$input.val(_this.$displayed.val()).trigger('keydown');
			});

			if (this.config.attachToInput && this.config.allowsTyping) {
				this.$input.on('keyup', function(evt) {
					_this.$displayed.val(_this.$input.val());
				});
			}
		} else {
			this.$input.on('click', function() {
				window.setTimeout(function() {
					_this.updateParentIframe();
				}, 50);
			});
		}
	};

	DateTimeRangePicker.prototype.updateLabeling = function() {
		var labelMask = this.config.formatLabel;
		var inputMask = this.config.formatInput;
		if (moment(this.picker.startDate).isSame(moment(), 'day')) {
			if (labelMask.includes('D MMM YYYY')) {
				labelMask = labelMask.replace('D MMM YYYY', '[Today]');
			} else if (labelMask.includes('D MMM')) {
				labelMask = labelMask.replace('D MMM', '[Today]');
			} else {
				console.log('Something wrong with the labelMask', labelMask);
			}
		}
		if (this.isEmptyHour) {
			labelMask = labelMask.replace('hh:mm A', '[--:--]').replace('HH:mm', '[--:--]');
			inputMask = inputMask.replace('hh:mm A', '[--:--]').replace('HH:mm', '[--:--]');
			if (this.config.hasTextTrigger) {
				this.$label.html(this.picker.startDate.format(labelMask));
				if (this.config.timePicker) {
					this.$input.val(this.picker.startDate.format('DD-MM-YYYY [00:00:00]'));
				} else {
					this.$input.val(this.picker.startDate.format('DD-MM-YYYY'));
				}
			} else {
				this.$input.val(this.picker.startDate.format('DD-MM-YYYY [00:00:00]'));
				if (this.config.attachToInput) {
					this.$displayed.val(this.picker.startDate.format(inputMask));
				}
			}
		} else {
			if (this.config.hasTextTrigger) {
				this.$label.html(this.picker.startDate.format(labelMask));
				if (this.config.timePicker) {
					this.$input.val(this.picker.startDate.format('DD-MM-YYYY HH:mm:ss'));
				} else {
					this.$input.val(this.picker.startDate.format('DD-MM-YYYY'));
				}
			} else {
				if (this.config.attachToInput) {
					if (this.config.singleDatePicker) {
						this.$displayed.val(this.picker.startDate.format(this.config.formatInput));

						if (this.config.timePicker) {
							this.$input.val(this.picker.startDate.format('DD-MM-YYYY HH:mm:ss'));
						} else {
							this.$input.val(this.picker.startDate.format('DD-MM-YYYY'));
						}
					} else {
						let startDate = this.picker.startDate.format(this.config.formatInput);
						let endDate = this.picker.endDate.format(this.config.formatInput);

						this.$displayed.val(`${startDate}  ·  ${endDate}`);

						if (this.config.timePicker) {
							startDate = this.picker.startDate.format('DD-MM-YYYY HH:mm:ss');
							endDate = this.picker.endDate.format('DD-MM-YYYY HH:mm:ss');
						} else {
							startDate = this.picker.startDate.format('DD-MM-YYYY');
							endDate = this.picker.endDate.format('DD-MM-YYYY');
						}

						this.$input.val(`${startDate}  ·  ${endDate}`);
					}
				} else {
					if (this.config.singleDatePicker) {
						this.$input.val(this.picker.startDate.format(this.config.formatInput));
					} else {
						let startDate = this.picker.startDate.format(this.config.formatInput);
						let endDate = this.picker.endDate.format(this.config.formatInput);

						this.$input.val(`${startDate}  ·  ${endDate}`);
					}
				}
			}
		}
	};

	DateTimeRangePicker.prototype.handleViewportPosition = function() {
		if (
			window.frameElement &&
			($(window.frameElement.parentElement).hasClass('tooltipster-content') ||
				$(window.frameElement.parentElement).hasClass('os-internal-ui-dialog-content'))
		) {
			return;
		}

		if (!this.isInViewport()) {
			var coords = this.$calendar[0].getBoundingClientRect();
			if (this.$calendar.hasClass('drop-up') && this.$calendar[0].getBoundingClientRect().top < 0) {
				var point = window.scrollY + coords.bottom + this.$input.height() + 7;
				this.$calendar
					.removeClass('drop-up')
					.addClass('drop-down')
					.css('top', point);
			} else if (
				!this.$calendar.hasClass('drop-up') &&
				this.$calendar[0].getBoundingClientRect().bottom > (window.innerHeight || document.documentElement.clientHeight)
			) {
				var point = window.scrollY + coords.top - coords.height - this.$input.height() - 7;
				this.$calendar.addClass('drop-up').css('top', point);
			}
		}
	};

	DateTimeRangePicker.prototype.isInViewport = function() {
		var bounding = this.$calendar[0].getBoundingClientRect();
		return (
			bounding.top >= 0 && bounding.bottom <= (window.innerHeight + 5 || document.documentElement.clientHeight + 5)
		);
	};

	DateTimeRangePicker.prototype.clear = function(sendNotification) {
		this.picker.setStartDate(moment());
		this.picker.setEndDate(moment());
		this.isEmptyHour = false;
		this.$clear.addClass('disabled');
		if (this.config.hasTextTrigger) {
			this.$label.html('-- -- --');
		} else {
			this.$input.val('');
			if (this.config.attachToInput) {
				this.$displayed.val('');
			}
		}
		if (sendNotification || sendNotification == undefined) {
			this.sendNotification(false);
		}
	};

	DateTimeRangePicker.prototype.show = function() {
		this.picker.show();
	};

	DateTimeRangePicker.prototype.hide = function() {
		this.picker.hide();
	};

	DateTimeRangePicker.prototype.cancel = function() {
		this.picker.clickCancel();
	};

	DateTimeRangePicker.prototype.sendNotification = function(sendDate) {
		if (this.$widget.hasClass('attachedInput')) {
			this.$input.trigger('change');
			return false;
		}
		if (sendDate || sendDate == undefined) {
			if (this.isEmptyHour) {
				OsNotifyWidget(
					this.config.dateTimeRangePickerFakeNotifyId,
					this.picker.startDate.format('DD-MM-YYYY [00:00:00]') + '|' + this.isEmptyHour
				);
			} else {
				if (this.config.timePicker) {
					OsNotifyWidget(
						this.config.dateTimeRangePickerFakeNotifyId,
						this.picker.startDate.format('DD-MM-YYYY HH:mm:ss') + '|' + this.isEmptyHour
					);
				} else {
					OsNotifyWidget(
						this.config.dateTimeRangePickerFakeNotifyId,
						this.picker.startDate.format('DD-MM-YYYY') + '|' + this.isEmptyHour
					);
				}
			}
		} else {
			OsNotifyWidget(this.config.dateTimeRangePickerFakeNotifyId, 'null|true');
		}
	};

	DateTimeRangePicker.prototype.updateParentIframe = function() {
		if (typeof SapphireWidgets.ResizeParentIframe === 'object') {
			SapphireWidgets.ResizeParentIframe.resize();
		}
		if ($('.Page.LayoutPopup').length === 1) {
			SapphireWidgets.LayoutPopup.redrawDialogWindow();
		}
	};

	SapphireWidgets.DateTimeRangePicker = {
		create: create,
		all: function() {
			return allDateTimeRangePickers;
		},
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/drag-drop/scripts.js":
/*!******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/drag-drop/scripts.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component DragDropArea */
(function($, window, document, SapphireWidgets) {
	var dragDropAreaWidget;

	var create = function(config) {
		window[config.dragDropAreaId] = new DragDropArea(config);
		dragDropAreaWidget = window[config.dragDropAreaId];

		$(window).load(function() {
			osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.DragDropArea.refreshDragDrop);
		});
	};

	var refreshDragDrop = function() {
		dragDropAreaWidget.setupDraggable();
		dragDropAreaWidget.setupDroppable();
	};

	var DragDropArea = function(config) {
		var _this = this;
		this.config = config;
		this.$area = $('#' + config.dragDropAreaId);
		this.$area.css('display', 'block');
		this.skin = config.skin;
		this.fakeNotifyWidgetId = config.fakeNotifyWidgetId;
		this.setupDroppable();
		if (config.sortable) {
			this.setupSortable();
		}
		this.setupDraggable();
		this.attachEvents();
		this.$area.find('.DragDrop-droppable').each(function() {
			_this.handleDroppable($(this));
		});
	};

	DragDropArea.prototype.setupDraggable = function() {
		this.$area.find('.DragDrop-draggable').draggable({
			disabled: this.config.disabled,
			containment: this.$area,
			scope: this.config.dragDropAreaId,
			delay: 0,
			scroll: true,
			revert: 'invalid',
			revertDuration: 0,
			connectToSortable: '.DragDrop-droppable',
			stop: function(event, ui) {},
		});
	};

	DragDropArea.prototype.setupDroppable = function() {
		var _this = this;
		this.$area.find('.DragDrop-droppable').droppable({
			hoverClass: 'hovered',
			addClasses: true,
			disabled: this.config.disabled,
			scope: this.config.dragDropAreaId,
			tolerance: 'pointer',
			drop: function(event, ui) {
				if (_this.skin === 'Teams') {
					$(ui.draggable).hide();
					OsNotifyWidget(
						$(event.target).data('fakenotify'),
						ui.draggable.data('itemtype') + '|' + ui.draggable.data('itemid')
					);
				} else {
					OsNotifyWidget(
						$(event.target).data('fakenotify'),
						_this.$area.find('.DragDrop-draggable-placeholder').index() + '|' + ui.draggable.data('itemid')
					);
				}
			},
		});
	};

	DragDropArea.prototype.setupSortable = function() {
		this.$area.find('.DragDrop-droppable').sortable({
			disabled: this.config.disabled,
			forcePlaceholderSize: true,
			containment: this.$area,
			tolerance: 'pointer',
			revert: 200,
			items: '.DragDrop-droppable-items .DragDrop-draggable',
			placeholder: 'DragDrop-draggable-placeholder',
		});
	};

	DragDropArea.prototype.attachEvents = function() {
		var _this = this;
		this.$area.on('click', '.DragDrop-draggable', function(evt) {
			evt.stopPropagation();
			var $draggable = $(evt.currentTarget);
			$draggable.find('.DragDrop-draggable-select-action a').trigger('click');
			var $droppable = $draggable.closest('.DragDrop-droppable');
			if ($droppable.hasClass('allowMultiple')) {
				var $checkbox = $draggable.find('input[type="checkbox"]');
				if ($checkbox.prop('checked')) {
					$checkbox.prop('checked', false);
					$draggable.removeClass('selected');
				} else {
					$checkbox.prop('checked', true);
					$draggable.addClass('selected');
				}
				_this.handleDroppable($droppable);
			}
		});
		this.$area.on('click', '.DragDrop-draggable-select-action a', function(evt) {
			evt.stopPropagation();
		});
	};

	DragDropArea.prototype.handleDroppable = function($droppable) {
		if ($droppable.hasClass('allowMultiple')) {
			var $actions = $droppable.find('.DragDrop-droppable-intro');
			var chkSelected = $droppable.find('input[type="checkbox"]:checked').length;
			if (chkSelected > 0) {
				$actions.find('a, button').attr('disabled', false);
			} else {
				$actions.find('a, button').attr('disabled', true);
			}
		} else {
			$droppable.find('input[type="checkbox"]').prop('disabled', true);
		}
	};

	SapphireWidgets.DragDropArea = {
		create: create,
		refreshDragDrop: refreshDragDrop,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/dropdown-categories/scripts.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/dropdown-categories/scripts.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component DropdownCategories */
(function ($, window, SapphireWidgets) {
	function optGroupSetValue(selectId, inputBoxId, buttonId) {
		var v = document.getElementById(selectId).value;
		$('#' + inputBoxId).val(v);
		$('#' + selectId + ' option[selected]').removeAttr('selected');

		if (v > -1) {
			$('#' + selectId + ' option[value="' + v + '"]').attr('selected', 'selected');
		}

		$('#' + buttonId).click();
		$('#s2id_' + selectId).removeClass('select2-container-active');
	}

	function OsCustomValidatorOptGroup(a, b) {
		var _e = $('#' + a.controltovalidate);
		var isValid = _e.find('option[selected]').length;
		var hasSibling_MandatorySelect2 = _e.prev('div.select2-container.Mandatory').length;

		if (hasSibling_MandatorySelect2) {
			if (isValid) {
				_e.prev('div.select2-container.Mandatory').removeClass('Not_Valid');
			} else {
				_e.prev('div.select2-container.Mandatory').addClass('Not_Valid');
			}
		}

		return isValid;
	}

	function addOptGroupValidator(optGroupElementId) {
		OsPage_Validators.push({
			controltovalidate: optGroupElementId,
			enabled: true,
			errormessage: 'Required field!',
			evaluationfunction: 'SapphireWidgets.DropdownCategories.OsCustomValidatorOptGroup',
			initialvalue: '',
			isvalid: true,
		});
	}

	SapphireWidgets.DropdownCategories = {
		optGroupSetValue,
		OsCustomValidatorOptGroup,
		addOptGroupValidator,
	};
})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/dropzone/dropzone.js":
/*!******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/dropzone/dropzone.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component Dropzone */
(function($, window, document, SapphireWidgets) {
	const create = function(config) {
		$(document).ready(function() {
			bindEvents(config);

			window.Dropzone.autoDiscover = false;

			const myDropzone = new window.Dropzone(config.hiddenInputContainer, {
				...config,
				init: function() {
					let prevFile;

					const filesList = config.filesList ? config.filesList.split(',') : [];

					for (const item of filesList) {
						const mockFile = { name: item, size: 12345678 };

						this.emit('addedfile', mockFile);
						this.emit('complete', mockFile);
						this.files.push(mockFile);

						$(`${config.hiddenInputContainer} .dz-filename`).attr('title', item);

						prevFile = mockFile;
					}

					if (+config.maxFiles === 1 && config.isReplacePrevious) {
						this.on('addedfile', function() {
							if (prevFile !== undefined) {
								this.removeFile(prevFile);
							}
						});
					}

					const $notifyInput = $(`#${config.notifyInputId}`);

					this.on('success', function(file, responseText) {
						prevFile = file;

						$(`#${config.notifyInputId} .dz-filename`).attr('title', file.name);
						$notifyInput.val(responseText);
						$notifyInput.change();
					});

					this.on('error', function(file, responseText) {
						prevFile = file;

						$notifyInput.val(responseText);
						$notifyInput.change();
					});
				},
			});
		});
	};

	const bindEvents = function(config) {
		$(`#${config.widgetId} .UploadMessageClass`).on('click', () => {
			$(`#${config.widgetId} .dz-clickable`).click();
		});
	};

	SapphireWidgets.Dropzone = { create };
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/expandable-group/scripts.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/expandable-group/scripts.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ExpandableGroup */
(function($, window, document, SapphireWidgets) {
	var allExpandableGroups = [];

	var create = function(config) {
		for (var i = 0; i < allExpandableGroups.length; i++) {
			if (allExpandableGroups[i].config.widgetId === config.widgetId) {
				allExpandableGroups.splice(i, 1);
			}
		}
		window[config.widgetId] = new ExpandableGroup(config);
		allExpandableGroups.push(window[config.widgetId]);

		$(window).load(function() {
			osAjaxBackend.BindAfterAjaxRequest(function() {
				var allExpandableGroups = SapphireWidgets.ExpandableGroup.all();
				allExpandableGroups.forEach(function(element) {
					SapphireWidgets.ExpandableGroup.create(element.config);
				});
			});
		});
	};

	var ExpandableGroup = function(config) {
		var _this = this;
		this.config = config;
		this.$widget = $('#' + this.config.widgetId);
		this.$items = this.$widget.find('.ExpandableGroupItem');
		this.$items.each(function() {
			window[$(this).attr('id')] = new ExpandableGroupItem($(this), _this);
		});
	};

	var ExpandableGroupItem = function($item, group) {
		var _this = this;
		this.group = group;
		this.$widget = $item;
		this.$content = this.$widget.find('.ExpandableGroupItem-content');
		this.$widget.off('click').on('click', '.ExpandableGroupItem-header', function() {
			if (_this.$widget.hasClass('isOpen')) {
				_this.close();
			} else {
				_this.group.closeAll();
				_this.open();
			}
			if (SapphireWidgets.ResizeParentIframe) {
				SapphireWidgets.ResizeParentIframe.resize();
			}
		});
	};

	ExpandableGroup.prototype.closeAll = function() {
		this.$items.each(function() {
			window[$(this).attr('id')].close();
		});
	};

	ExpandableGroupItem.prototype.open = function() {
		this.$widget.addClass('isOpen');
	};

	ExpandableGroupItem.prototype.close = function() {
		this.$widget.removeClass('isOpen');
	};

	SapphireWidgets.ExpandableGroup = {
		create: create,
		all: function() {
			return allExpandableGroups;
		},
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/expandable-link/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/expandable-link/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ExpandableLink */
(function($, window, SapphireWidgets) {
	const create = widgetID => {
		const $elementWrapper = $(`#${widgetID}`);

		if ($elementWrapper.parent('.ExpandableList').hasClass('HideWhenEmpty')) {
			const text = $elementWrapper.find('.ExpandableLink__Content').text();

			if (text.length === 0) $elementWrapper.parent('.ExpandableList').hide();
		}

		bindEvents(widgetID);
	};

	const bindEvents = widgetID => {
		$(`#${widgetID} .ExpandableLink__Header`).click(() => openClose(`#${widgetID}`));
	};

	const openClose = elementID => $(elementID).toggleClass('ExpandableLink--expanded');

	SapphireWidgets.ExpandableLink = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js":
/*!********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component FullScreenTabsWrapper */
SapphireWidgets.FullScreenTabsWrapper = () => {
	$(document).ready(function() {
		$('.TabWrapper').click(function() {
			const $wrapper = $(this).closest('.FullScreenTabsWrapper__Tabs');
			$wrapper.find('*').removeClass('Active');

			$(this).addClass('Active');
		});
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/generic-gallery/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/generic-gallery/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component GenericGallery */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		window[config.widgetId] = new GenericGallery(config);
	};

	var GenericGallery = function(config) {
		this.config = config;
		this.$widget = $('#' + this.config.widgetId).css('display', 'block');
		this.equalHeight = this.config.equalHeight;
		if (
			this.$widget.find('> .GenericGallery-content > span').length === 1 &&
			this.$widget.find('.GenericGallery-content > span').hasClass('ListRecords')
		) {
			this.$gallery = this.$widget.find('> .GenericGallery-content > span.ListRecords');
		} else {
			this.$gallery = this.$widget.find('> .GenericGallery-content');
		}

		this.$gallery.css({
			display: 'grid',
			gridTemplateColumns: 'repeat(' + this.config.columnSizing + ', minmax(' + this.config.columnMinWidth + ', 1fr))',
		});

		this.$galleryItems = this.$gallery.children();
		this.$galleryItems.each(function() {
			if (!$(this).hasClass('GenericGallery-item')) {
				$(this).wrap('<div class="GenericGallery-item"></div>');
			}
		});
	};

	SapphireWidgets.GenericGallery = {
		create: create,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/generic-grid/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/generic-grid/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component GenericGrid */
(function ($, window, document, SapphireWidgets) {
	var allGenericGrids = [];

	var create = function (config) {
		window[config.widgetId] = new GenericGrid(config);
		allGenericGrids.push(window[config.widgetId]);
	};

	var GenericGrid = function (config) {
		var _this = this;
		this.config = config;
		console.log(this.config);
	};

	SapphireWidgets.GenericGrid = {
		create: create,
	};

})(jQuery, window, document, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component HorizontalToolbar */
(function($, window, SapphireWidgets) {
	const create = config => {
		const $widget = $('#' + config.widgetId);

		$(document).ready(() => init($widget, config));

		if (config.isArrowNavigation) {
			$(window).load(() => {
				const $itemWrapper = $widget.find('.MenuItemWrapper.Active');
				if ($itemWrapper.length) {
					$itemWrapper[0].scrollIntoView({
						behavior: 'auto',
						block: 'end',
					});
				}
			});
		}
	};

	const init = ($widget, config) => {
		if (config.isArrowNavigation) {
			handleArrows($widget);

			const $toolbarItems = $widget.find('.Toolbar__Items');
			const $listItems = $widget.find('.Toolbar__Items .ListRecords');
			const $btnRight = $widget.find('.Toolbar__rightBtn');
			const $btnLeft = $widget.find('.Toolbar__leftBtn');

			$toolbarItems.scroll(() => handleArrows($widget));

			$btnRight.click(function() {
				var currentScroll = $toolbarItems.scrollLeft();
				var maxScrolll = $listItems.width() - $toolbarItems.width();
				var sideWidth = maxScrolll - 50;
				$toolbarItems.scrollLeft(currentScroll + 50);

				if (currentScroll == sideWidth) $btnRight.addClass('Disabled');
				if (currentScroll != 50) $btnLeft.removeClass('Disabled');
			});

			$btnLeft.click(function() {
				var currentScroll = $toolbarItems.scrollLeft();
				var maxScrolll = $listItems.width() - $toolbarItems.width();
				var sideWidth = maxScrolll - 50;
				$toolbarItems.scrollLeft(currentScroll - 50);

				if (currentScroll != sideWidth) $btnRight.removeClass('Disabled');
				if (currentScroll == 50) $btnLeft.addClass('Disabled');
			});

			$(window).on('resize.toolbar', () => handleArrows($widget));
		} else {
			handleResize($widget);
			bindEventsClick($widget);

			$(window).on('resize.toolbar', () => handleResize($widget));

			window.addEventListener('ToolbarFixed', () => handleResize($widget), false);
		}
	};

	handleArrows = $widget => {
		const $toolbarItems = $widget.find('.Toolbar__Items');
		const $listItems = $widget.find('.Toolbar__Items .ListRecords');
		const $btnRight = $widget.find('.Toolbar__rightBtn');
		const $btnLeft = $widget.find('.Toolbar__leftBtn');

		let currentScroll = $toolbarItems.scrollLeft();
		let menuWidth = $listItems.width();
		let externalWidth = $toolbarItems.width();
		var maxScrolll = menuWidth - externalWidth;

		if (externalWidth > menuWidth) {
			$btnLeft.hide();
			$btnRight.hide();

			$widget.find('.Toolbar_container').addClass('Toolbar_container--noarrows');
		} else {
			$btnLeft.show();
			$btnRight.show();

			$widget.find('.Toolbar_container').removeClass('Toolbar_container--noarrows');
		}

		if (currentScroll === 0) $btnLeft.addClass('Disabled');
		else $btnLeft.removeClass('Disabled');

		if (currentScroll >= maxScrolll) $btnRight.addClass('Disabled');
		else $btnRight.removeClass('Disabled');
	};

	handleResize = $widget => {
		let itemsTotal = 0;
		let hasItemsHidden = false;

		const $listItems = $widget.find('.Toolbar__Items .ListRecords');
		$listItems.find('> a[ui]').css('display', 'none');

		const menuWidth = $widget.find('.Toolbar__Items').outerWidth(true);

		$listItems.find('a[ui]').each(function() {
			itemsTotal += parseInt($(this).outerWidth(true), 10);

			if (itemsTotal + 90 < menuWidth) {
				$(this).css('display', 'block');
			} else {
				hasItemsHidden = true;

				return false;
			}
		});

		if (hasItemsHidden && !$listItems.find('.Toolbar__MoreOptions').length) {
			$widget
				.find('.Toolbar__MoreOptions')
				.clone()
				.css('display', 'block')
				.appendTo($listItems);

			hasItemsHidden = false;
		}

		const $optionsList = $widget.find('.Toolbar__Items .Toolbar__MoreOptionsList');

		$listItems.find('.Toolbar__MoreOptions').css('display', $optionsList.length ? 'block' : 'none');

		const $hiddenItems = $listItems.find('> a[ui]').filter(function() {
			return $(this).css('display') == 'none';
		});

		$optionsList.empty();

		const hasNotificationHidden = $hiddenItems.find('.MenuItemWrapper_Badge:not(:empty)').length !== 0;
		const $trigger = $widget.find('.Toolbar__Items .Toolbar__MoreOptionsIcon');

		if (hasNotificationHidden) $trigger.addClass('Toolbar__MoreOptionsIcon--notification');
		else $trigger.removeClass('Toolbar__MoreOptionsIcon--notification');

		$hiddenItems
			.clone()
			.css('display', 'block')
			.appendTo($optionsList);
	};

	bindEventsClick = $widget => {
		const $moreOptions = $widget.find('.Toolbar__Items .Toolbar__MoreOptions');
		const $trigger = $widget.find('.Toolbar__Items .Toolbar__MoreOptionsIcon');
		const $optionsList = $widget.find('.Toolbar__MoreOptionsList');

		$trigger.on('click', event => {
			$moreOptions.toggleClass('Toolbar__MoreOptions--open');
			event.stopPropagation();
		});

		$optionsList.on('mousewheel', event => {
			event.stopPropagation();
		});

		$('body').on('mouseup', event => {
			const $target = $(event.target).parents();

			if (!$target.andSelf().is($moreOptions)) {
				$moreOptions.removeClass('Toolbar__MoreOptions--open');
			}
		});
	};

	SapphireWidgets.HorizontalToolbar = {
		create,
	};
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/hour-picker/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/hour-picker/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component HourPicker */
(function($, window, SapphireWidgets) {
	class HourPicker {
		constructor(config) {
			// Options used by jQuery Timerpicker (External Lib)
			this.options = {
				...config,
			};

			SapphireWidgets.HourPicker.allIntances.push(config.widgetId);

			this.onComponentInit();
		}

		isComponentValid() {
			let valid = true;
			let message = `Component HourPicker (${this.options.widgetId}):`;
			let errors = '';

			if (this.$model.length && this.$model.length > 1) {
				errors = `${errors} - Needs one - and just one - Input element.`;
				valid = false;
			}

			if (!this.$model.length && this.$component.find('.HourPicker__Placeholder input').length) {
				errors = `${errors}\n - The Input element must be of type Text.`;
				valid = false;
			}

			if (!valid) console.error(`${message} ${errors}`);

			return valid;
		}

		setComponentPosition() {
			const $widget = $('.ui-timepicker-container');
			const labelLeft = this.$label.offset().left;
			const labelWidth = this.$label.width();
			const labelOuterWidth = this.$label.outerWidth();
			const widgetOuterWidth = $widget.outerWidth();
			const widgetMinWidth = +$widget.css('min-width').replace('px', '');
			const isOutsideWindow =
				labelLeft + labelOuterWidth > $(window).scrollLeft() + $(window).width() - widgetOuterWidth;

			$widget.css({
				left: () => {
					let value = labelLeft - (widgetMinWidth - labelWidth) / 2;

					if (isOutsideWindow) value = labelLeft + labelWidth - widgetOuterWidth;
					else if (value < 0) value = labelLeft;

					return value;
				},
			});
		}

		setElementClass(selector, className) {
			return className ? $(selector).addClass(className) : false;
		}

		defineTimeFormat() {
			let format = [];
			let amPm = '';

			format.push(this.options.is24hFormat ? 'HH' : 'hh');
			if (this.options.showMinutes) format.push('mm');
			if (this.options.showSeconds) format.push('ss');
			if (!this.options.is24hFormat) amPm = ' p';

			return `${format.join(':')}${amPm}`;
		}

		convertTime12to24(value) {
			const [time, modifier] = value.split(' ');
			let [hours, minutes = '00', seconds = '00'] = time.split(':');

			if (hours === '12') hours = '00';
			if (modifier === 'PM') hours = parseInt(hours, 10) + 12;

			return `${hours}:${minutes}:${seconds}`;
		}

		convertTimeFormatToMask(value = '') {
			return value.replace(/[a-zA-Z]+/g, '--');
		}

		onChangeEvent(value = '') {
			let model = '01-01-1900 00:00:00'; //i.e. null
			let label = this.convertTimeFormatToMask(this.options.timeFormat);

			if (value && !!value.trim()) {
				model = this.options.is24hFormat ? value : this.convertTime12to24(value);
				label = value;
			}

			if (this.options.isNotifyEnabled) OsNotifyWidget(this.options.hourPickerFakeNotifyId, model);
			if (this.options.isTextTriggerable) this.$label.text(label);

			this.$model.val(model);
			this.$model.change();

			return;
		}

		onComponentInit() {
			this.$component = $(`#${this.options.widgetId}`);
			this.$model = this.$component.find('.HourPicker__Placeholder input[type="text"]');
			this.$input = this.$component.find('.HourPicker__Displayed .HourPicker__InputValue');
			this.$element = this.$input;

			this.options.timeFormat = this.defineTimeFormat();

			if (!this.isComponentValid()) return;
			else {
				const $container = this.$component.find('div.HourPicker');

				if (this.options.isTextTriggerable) {
					$container.addClass('HourPicker--textTrigger');

					this.$label = $container.find('.HourPicker__Displayed .HourPicker__LabelValue');
					this.$element = this.$label;

					this.$label.text(this.convertTimeFormatToMask(this.options.timeFormat));

					this.$label.on('click', () => {
						this.$label.timepicker().open();

						this.setComponentPosition();
					});
				}

				if (this.options.isClearable) {
					this.$buttonClear = $container.find('.HourPicker__Displayed .HourPicker__ButtonClear');

					this.$buttonClear.on('click', () => {
						this.$input.val('');
						this.onChangeEvent();
					});
				}

				this.$element.timepicker({
					...this.options,
					change: time => this.onChangeEvent(time ? $().timepicker.formatTime(this.options.timeFormat, time) : null),
				});

				this.setElementClass('.ui-timepicker-container', this.options.currentLocale === 'AR' ? 'rtl' : 'ltr');

				this.$input.prop('readonly', !this.options.isTypeEnabled);
				this.$input.prop('placeholder', this.options.timeFormat);
			}
		}
	}

	const create = config => {
		window[config.widgetId] = new HourPicker(config);
	};

	SapphireWidgets.HourPicker = {
		create,
		allIntances: [],
	};
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/input-lasa/scripts.js":
/*!*******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/input-lasa/scripts.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component InputLASA */
(function() {
	var setupInput = function(config) {
		$('body').off('click', '#' + config.labelId);
		$('body').off('blur change input', '#' + config.inputId);

		$('#' + config.inputId).css('width', '100%');
		$('#' + config.labelId).css('width', '100%');

		$('#' + config.inputId).hide();
		$('#' + config.labelId).show();

		SapphireWidgets.MarkWordsFromList.handlePrompt(config);

		$('body').on('click', '#' + config.labelId, function() {
			$('#' + config.labelId).hide();
			$('#' + config.inputId).show();
			$('#' + config.inputId).focus();
		});

		$('body').on('blur', '#' + config.inputId, function() {
			SapphireWidgets.MarkWordsFromList.handlePrompt(config);
			$('#' + config.inputId).hide();
			$('#' + config.labelId).show();
			window.setTimeout(function() {
				SapphireWidgets.MarkWordsFromList.handlePrompt(config);
				SapphireWidgets.MarkWordsFromList.applyMarking({ target: config.labelId });
			}, 250);
		});

		$('body').on('change input', '#' + config.inputId, function() {
			$('#' + config.labelId).text($('#' + config.inputId).val());
			window.setTimeout(function() {
				SapphireWidgets.MarkWordsFromList.applyMarking({ target: 'page' });
			}, 250);
		});
	};

	var handlePrompt = function(config) {
		if (!$('#' + config.inputId).val().length) {
			$('#' + config.labelId)
				.text($('#' + config.inputId).prop('placeholder'))
				.css('color', '#999');
		} else {
			$('#' + config.labelId)
				.text($('#' + config.inputId).val())
				.css('color', '');
		}
	};

	SapphireWidgets.MarkWordsFromList = SapphireWidgets.MarkWordsFromList = SapphireWidgets.MarkWordsFromList || {};
	SapphireWidgets.MarkWordsFromList.setupInput = setupInput;
	SapphireWidgets.MarkWordsFromList.handlePrompt = handlePrompt;
})();


/***/ }),

/***/ "./src/components/05-components/v3-pat/input-with-clear/scripts.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/input-with-clear/scripts.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {

  class InputWithClear {

    constructor(config) {
      this.config = config;
      this.$widget = $(`#${config.widgetId}`);
      this.$input = this.$widget.find('input[type]');
      this.$clear = this.$widget.find('.InputWithClear-clear');
      this.$notifyLink = this.$widget.find('.InputWithClear-notify-link');
      this.$widgetShield = this.$widget.find('.InputWithClear--shield');
      this.onInit();
    }

    onInit() {
      this.$input.on('focus', () => {
        this.$clear.show();
      });
      this.$input.on('blur', () => {
        if (this.$input.val() === '') {
          window.setTimeout(() => {
            if ($('.daterangepicker:visible').length === 1) {
              return false;
            }
            this.$clear.hide();
            this.$notifyLink.trigger('click');
          }, 100);
        };
      });
      this.$clear.on('click', () => {
        this.$input.val('');
        this.$clear.hide();
        this.$notifyLink.trigger('click');
      });
      if (this.config.hasShield) {
        window.setTimeout(() => {
          this.$widgetShield.hide();
        }, this.config.shieldTimeout);
        if (this.config.shieldTimeout > 0) {
          this.$widgetShield.on('click', () => {
            this.$clear.hide();
          });
        }
      }
    }
  }

  const create = config => (window[config.widgetId] = new InputWithClear(config));

  SapphireWidgets.InputWithClear = {
    create
  };

})();

/***/ }),

/***/ "./src/components/05-components/v3-pat/line-add/scripts.js":
/*!*****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/line-add/scripts.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LineAdd */
(function($, window, SapphireWidgets) {
	const create = function(config) {
		$(window).load(function() {
			setWidth(config.widgetId);
			SapphireWidgets.LineAdd.widgetId = config.widgetId;

			osAjaxBackend.BindAfterAjaxRequest(() => setWidth(config.widgetId));
		});

		$(window).on('resize.LineAdd', () => setWidth(config.widgetId));
	};

	const setWidth = function(widgetId) {
		window.setTimeout(function() {
			const $widget = $(`#${widgetId || SapphireWidgets.LineAdd.widgetId}`);
			const widths = [];

			for (i = 1; i < 8; i++) {
				let maxWidthContent = Math.max.apply(
					null,
					$widget
						.find('.lacol' + i)
						.map(function() {
							return $(this).width();
						})
						.get()
				);

				widths.push(maxWidthContent);
				$widget.find('.lacol' + i).width(maxWidthContent);
			}
		}, 100);
	};

	SapphireWidgets.LineAdd = { create, setWidth };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/line-card-list/scripts.js":
/*!***********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/line-card-list/scripts.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LineCardList */
(function($, window, SapphireWidgets) {
	const create = config => {
		$(document).ready(function() {
			const $component = $(`#${config.widgetId}`);
			const $card = $component.find('.LineCardList');
			const $checkBox = $component.find('.LineCardList_checkbox label');

			$card.click(function() {
				$(this).toggleClass('active');

				$card.not(this).removeClass('active');

				$card
					.not(this)
					.find('.LineCardList_checkbox input[type=checkbox]')
					.prop('checked', false);

				if ($(this).hasClass('active')) {
					$(this)
						.find('.LineCardList_checkbox input[type=checkbox]')
						.prop('checked', true);
				} else {
					$(this)
						.find('.LineCardList_checkbox input[type=checkbox]')
						.prop('checked', false);
				}
			});

			$checkBox.click(function() {
				$card
					.not(this)
					.closest('.LineCardList')
					.removeClass('active');

				$(this)
					.closest('.LineCardList')
					.toggleClass('active');
			});
		});
	};

	SapphireWidgets.LineCardList = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/line-details-expand-box/script.js":
/*!*******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/line-details-expand-box/script.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LineDetailsExpandBox */
(function($, window, SapphireWidgets) {
	const init = config => {
		$(`#${config.widgetId} + .LineDetailsExpandBox_action`).click(event => {
			event.stopPropagation();
		});
	};

	const create = config => $(document).ready(() => init(config));

	SapphireWidgets.LineDetailsExpandBox = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/location-box/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/location-box/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LocationBox */
SapphireWidgets.LocationBox = function(widgetId) {
	const $component = $(`#${widgetId}`);

	if ($component.hasClass('On')) {
		$('.DisableRoom').each(function() {
			$(this)
				.removeClass('Off')
				.removeClass('On');
			$(this)
				.parent('.RoomBox')
				.css({
					opacity: '1',
				})
				.removeClass('Selected');
		});
	} else {
		$component
			.addClass('On')
			.removeClass('Off')
			.parent('.RoomBox')
			.css({
				opacity: '1',
			})
			.addClass('Selected');

		$('.DisableRoom:not(#' + widgetId + ')').each(function() {
			$(this).addClass('Off');
			$(this).removeClass('On');
		});

		$('.DisableRoom.Off')
			.parent('.RoomBox')
			.css({
				opacity: '0.50',
			})
			.removeClass('Selected');
	}
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/main-interactive-card/scripts.js":
/*!******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/main-interactive-card/scripts.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component MainInteractiveCard */
(function ($, window, document, SapphireWidgets) {
	var allMainInteractiveCards = [];
	var defaultDuration = 300;

	var create = function (config) {
		for (var i = 0; i < allMainInteractiveCards.length; i++) {
			if (allMainInteractiveCards[i].config.widgetId === config.widgetId) {
				allMainInteractiveCards.splice(i, 1);
			}
		}
		window[config.widgetId] = new MainInteractiveCard(config);
		allMainInteractiveCards.push(window[config.widgetId]);

		if (!!!SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded && !!osAjaxBackend) {
			osAjaxBackend.BindAfterAjaxRequest(function () {
				var allMainInteractiveCards = SapphireWidgets.MainInteractiveCard.all();
				allMainInteractiveCards.forEach(function (element) {
					element.handleHeaderWithAbsoluteButtons();
				});
			});
			SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded = true;
		}
	};

	var MainInteractiveCard = function (config) {
		var _this = this;
		this.config = config;
		this.isLockedOnClose = false;
		this.isOpen = config.isOpen;
		this.isEnabled = config.isEnabled;
		this.isSelectable = config.isSelectable;
		this.allowOpening = config.allowOpening;
		this.gradientWhenOpen = config.gradientWhenOpen;
		this.allowMultipleOpen = config.allowMultipleOpen;
		this.emitNotifyOnOpen = config.emitNotifyOnOpen;
		this.hideActionsOnOpen = config.hideActionsOnOpen;
		this.hideCaptionOnOpen = config.hideCaptionOnOpen;
		this.hideTitleOnOpen = config.hideTitleOnOpen;
		this.hideSubTitleOnOpen = config.hideSubTitleOnOpen;
		this.headerHeightWhenOpen = config.headerHeightWhenOpen;
		this.MainInteractiveCardFakeNotifyId = config.mainInteractiveCardFakeNotifyId;

		this.$widget = $('#' + config.widgetId);
		this.$widget.css('display', 'block');
		this.$card = this.$widget.find('> .MainInteractiveCard');
		this.$header = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header');
		this.$headerText = this.$header.find('.MainInteractiveCard-header-text');
		this.$body = this.$widget.find('> .MainInteractiveCard > div > .MainInteractiveCard-body');
		this.$actions = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-actions');
		this.$caption = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-text-caption');
		this.$title = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-text-title');
		this.$subTitle = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-text-subtitle');
		this.$selectTrigger = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header > .MainInteractiveCard-header-selectable > .MainInteractiveCard-header-selectable-trigger');
		this.$selectPlaceholder = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header .MainInteractiveCard-header-selectable-placeholder');
		this.$triggerPlaceholder = this.$widget.find('> .MainInteractiveCard > .MainInteractiveCard-header-triggerAction-placeholder');

		if (this.$triggerPlaceholder.find('a').length === 1) {
			this.$trigger = this.$triggerPlaceholder.find('a');
		}

		if (this.isOpen) {
			this.open(false, -1);
			this.$card.addClass('forceOpen');
		}

		this.$card.addClass(this.headerHeightWhenOpen + 'Header');

		if (this.allowOpening) {
			this.$card.addClass('allowOpening');
		}

		if (this.gradientWhenOpen) {
			this.$card.addClass('gradientWhenOpen');
		}

		this.attachEvents();

		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation, index) {
				_this.handleHeaderWithAbsoluteButtons();
			});
		});

		observer.observe(document.getElementById(config.widgetId), {
			childList: true,
			subtree: true,
			attributes: false,
		});
	};

	MainInteractiveCard.prototype.handleHeaderWithAbsoluteButtons = function () {
		var _this = this;
		if (!!this.$body.find('> div .MainInteractiveCard-absolute-actions').length && this.isOpen) {
			var absoluteActionsWidth = Math.max.apply(Math, this.$body.find('> div .MainInteractiveCard-absolute-actions').map(function () {
				return $(this).outerWidth(true);
			}).get());
			var headerMaxWidth = this.$header.width() - absoluteActionsWidth;
			if (headerMaxWidth > 10) {
				this.$headerText.css({
					maxWidth: headerMaxWidth + 'px'
				});
			}
			this.$body.find('> div .MainInteractiveCard-absolute-actions .MainInteractiveCard--close').off('click').on('click', function (e) {
				e.preventDefault();
				_this.close();
			});
		} else {
			this.$headerText.css({
				maxWidth: '99%'
			});
		}
	};

	MainInteractiveCard.prototype.attachEvents = function () {
		var _this = this;
		this.$header.find('.MainInteractiveCard--open:not([disabled])').off('click').on('click', function (e) {
			e.preventDefault();
			_this.open(true);
		});
		this.$header.find('.MainInteractiveCard--close').off('click').on('click', function (e) {
			e.preventDefault();
			_this.close();
		});
		if (this.allowOpening) {
			this.$headerText.off('click').on('click', function (evt) {
				if ($(evt.target).hasClass('Button')) {
					// the user clicked on a Button inside the header, nothing to do here
				} else {
					if (_this.isOpen) {
						if (_this.$widget.find('iframe').length === 1) {
							// do not close when and iframe exists
						} else if (
							_this.$actions.find('a').length > 0 &&
							_this.$actions.find('.MainInteractiveCard--close').length > 0
						) {
							// do not close when the card has actions
						} else {
							_this.close();
						}
					} else {
						_this.open(true);
					}
				}
			});
		}
		if (this.isSelectable) {
			this.$selectTrigger.off('click').on('click', function (e) {
				if (_this.$selectPlaceholder.find('a').length === 1) {
					_this.$selectPlaceholder.find('a').click();
				} else {
					console.warn('You need 1 link in this placeholder.');
				}
			});
		}
	};

	MainInteractiveCard.prototype.open = function (sendNotify, duration) {
		var duration = duration || defaultDuration;
		this.isOpen = true;
		this.$card.addClass('isOpen');
		if (this.hideActionsOnOpen) {
			this.$actions.css('display', 'none');
		}
		if (this.hideTitleOnOpen) {
			this.$title.css('display', 'none');
		}
		if (this.hideSubTitleOnOpen) {
			this.$subTitle.css('display', 'none');
		}
		if (this.hideCaptionOnOpen) {
			this.$caption.css('display', 'none');
		}
		if (this.emitNotifyOnOpen) {
			if (sendNotify) {
				OsNotifyWidget(this.MainInteractiveCardFakeNotifyId, 'open');
			}
			this.$body.css('display', 'block');
		} else if (this.$trigger) {
			this.$trigger.click();
			this.$body.css('display', 'block');
		} else {
			if (duration > 0) {
				this.$body.slideDown(duration);
			} else {
				this.$body.css('display', 'block');
			}
		}
		if (this.$widget.find('iframe').length === 1 && !this.$widget.find('iframe').hasClass('cke_wysiwyg_frame')) {
			var iframeContents = this.$widget.find('iframe').contents();
			iframeContents.find('.MainInteractiveCard-iframe-actions').css('visibility', 'visible');
		} else {
			this.handleHeaderWithAbsoluteButtons();
		}
		if (!this.allowMultipleOpen) {
			allMainInteractiveCards.forEach(item => (item !== this && item.allowOpening ? item.close(duration) : null));
		}
	};

	MainInteractiveCard.prototype.close = function (duration) {
		var self = this;
		var duration = duration || defaultDuration;
		this.isOpen = false;
		this.$card.removeClass('isOpen');
		if (this.$widget.find('iframe').length === 1 && !this.$widget.find('iframe').hasClass('cke_wysiwyg_frame')) {
			this.$widget.find('iframe').find('.MainInteractiveCard-iframe-actions').css('visibility', 'hidden');
		}
		this.$body.slideUp(duration, function () {
			if (self.$card.hasClass('forceOpen')) {
				self.$card.removeClass('forceOpen');
			}
		});
		if (this.hideActionsOnOpen) {
			this.$actions.show();
		}
		if (this.hideTitleOnOpen) {
			this.$title.css('display', 'block');
		}
		if (this.hideSubTitleOnOpen) {
			this.$subTitle.css('display', 'block');
		}
		if (this.hideCaptionOnOpen) {
			this.$caption.css('display', 'block');
		}
		this.$headerText.css({
			maxWidth: this.$header.width() - this.$actions.width() + 'px'
		});
	};

	MainInteractiveCard.prototype.isOpen = function () {
		return this.isOpen;
	};

	SapphireWidgets.MainInteractiveCard = {
		create: create,
		all: function () {
			return allMainInteractiveCards;
		},
	};
})(jQuery, window, document, SapphireWidgets);

$(window).load(function () {
	if (!!$('.MainInteractiveCard').length) {
		if (!!!SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded) {
			osAjaxBackend.BindAfterAjaxRequest(function () {
				var allMainInteractiveCards = SapphireWidgets.MainInteractiveCard.all();
				allMainInteractiveCards.forEach(function (element) {
					element.handleHeaderWithAbsoluteButtons();
				});
			});
			SapphireWidgets.MainInteractiveCard.afterAjaxRequestBinded = true;
		}
	}

	setTimeout(function () {
		var allMainInteractiveCards = SapphireWidgets.MainInteractiveCard.all();
		allMainInteractiveCards.forEach(function (element) {
			element.handleHeaderWithAbsoluteButtons();
		});
	}, 1000);

});

/***/ }),

/***/ "./src/components/05-components/v3-pat/menu-bar/scripts.js":
/*!*****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/menu-bar/scripts.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component MenuBar */
SapphireWidgets.MenuBar = function(config) {
	$(function() {
		var $menuWidget = $('#' + config.menuWidget);

		var menuResider = function() {
			var navWidth = 0;
			var availabeEspace = $menuWidget.find('.Menubar_item').width();

			$menuWidget.find('.Menubar_item .MenuItem').each(function() {
				navWidth += $(this).outerWidth(true);
			});

			if (navWidth > availabeEspace) {
				var lastItem = $menuWidget.find('.Menubar_item .MenuItem').last();
				lastItem.attr('data-width', lastItem.outerWidth(true));
				lastItem.prependTo($menuWidget.find('.Menubar__extraContainer'));
				menuResider();
			} else {
				var firstMoreElement = $menuWidget.find('.Menubar__extraContainer .MenuItem').first();
				if (navWidth + firstMoreElement.data('width') < availabeEspace) {
					firstMoreElement.insertAfter($menuWidget.find('.Menubar_item .MenuItem').last());
					menuResider();
				}
			}

			if (!$menuWidget.find('.Menubar__extraContainer').is(':empty')) {
				$menuWidget.find('.Menubar_extraItem').addClass('show');
			} else {
				$menuWidget.find('.Menubar_extraItem').removeClass('show');
			}
		};

		$menuWidget.find('.MenuItem').click(function() {
			if (
				!$(this)
					.parent()
					.hasClass('Menubar__extraContainer')
			) {
				if (!$(this).hasClass('active') && !$(this).hasClass('activeIndicator')) {
					$(this).addClass('active');
					$menuWidget.find('.activeIndicator').addClass('shadow');
					$(this)
						.find('.MenuItem_subItems')
						.toggleClass('show');
				} else if (!$(this).hasClass('active') && $(this).hasClass('activeIndicator')) {
					$(this).addClass('active');
					$(this)
						.find('.MenuItem_subItems')
						.toggleClass('show');
				}
			} else {
				$(this)
					.find('.MenuItem_subItems')
					.toggleClass('show');
			}
		});

		$menuWidget.find('.Menubar_extraItem .icon').click(function() {
			$menuWidget.find('.Menubar__extraContainer ').toggleClass('show');
		});

		$(document).mouseup(e => {
			var $menu = $menuWidget.find('.MenuItem.active');
			var $moreOptions = $menuWidget.find('.Menubar_extraItem');

			// if the target of the click isn't the menu or a descendant of the menu
			if ($menu.length > 0) {
				if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
					$menu.find('.MenuItem_subItems').removeClass('show');
					$('.activeIndicator').removeClass('shadow');
					$menuWidget.find('.MenuItem.active').removeClass('active');
				}
			}

			if (!$moreOptions.is(e.target) && $moreOptions.has(e.target).length === 0) {
				$moreOptions.find('.Menubar__extraContainer').removeClass('show');
				$('.activeIndicator').removeClass('shadow');
			}
		});

		$(window).on('resize load', function() {
			menuResider();
		});
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/multiple-selection-button/scripts.js":
/*!**********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/multiple-selection-button/scripts.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component MultipleSelectionButton */
SapphireWidgets.MultipleSelectionButton = function(WrapperId) {
	var $widget = $(WrapperId);
	var $control = $widget.find('input[type="checkbox"]');

	if ($(WrapperId + ' input[type="checkbox"]').is(':disabled')) {
		$(WrapperId).addClass('disabled');
	} else {
		$(WrapperId).removeClass('disabled');
	}

	if ($(WrapperId + ' input[type="checkbox"]').is(':checked')) {
		$(WrapperId).addClass('active');
	} else {
		$(WrapperId).removeClass('active');
	}

	$widget.find('input[type="checkbox"]').change(function() {
		if ($(this).is(':checked')) {
			$(this)
				.parent()
				.parent()
				.addClass('active');
		} else {
			$(this)
				.parent()
				.parent()
				.removeClass('active');
		}
	});

	$widget.find('.MultipleSelectionButton-label').click(function() {
		// $control.prop("checked", !$control.prop("checked"));
		$control[0].click();
		setTimeout(function() {
			if ($control.is(':checked')) {
				$widget.addClass('active');
			} else {
				$widget.removeClass('active');
			}
		}, 10);
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/confirmation-panel.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/confirmation-panel.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ConfirmationPanel3Options ConfirmationPanel same javascript code*/

SapphireWidgets.ConfirmationPanel = {
	isAnyPanelOpened: function() {
		return $('body').hasClass('PanelOpened') && $('.PanelContainer:visible').length;
	},

	togglePanel: function(PanelId) {
		if (!OsValidatorOnSubmit()) return;

		if (!SapphireWidgets.ConfirmationPanel.isAnyPanelOpened()) {
			$('body').addClass('PanelOpened');
			$('#' + PanelId).fadeIn(140);

			setTimeout(function() {
				$('#' + PanelId)
					.find('.PanelContainer')
					.slideToggle(150);
			}, 100);
		}
	},

	closePanel: function(PanelId) {
		$('body').removeClass('PanelOpened');
		$('#' + PanelId).fadeOut(140);

		setTimeout(function() {
			$('#' + PanelId)
				.find('.PanelContainer')
				.slideUp(150);
		}, 100);
	},

	setPanelBehavior: function() {
		$('.Panel[panel-trigger-elementid]').each(function() {
			var this_panel = $(this);
			$('#' + this_panel.attr('panel-trigger-elementid') + '')
				.off('click')
				.on('click', function() {
					SapphireWidgets.ConfirmationPanel.togglePanel(this_panel.attr('id'));
					return false;
				});
		});
	},
};

$(document).ready(function() {
	SapphireWidgets.ConfirmationPanel.setPanelBehavior();
	if (osAjaxBackend.EventHandlers.AfterAjaxRequest.toString().indexOf('setPanelBehavior') == -1) {
		osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.ConfirmationPanel.setPanelBehavior);
	}
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/confirmation-popup.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/confirmation-popup.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ConfirmationPopup */
var _isInIframe = window.frameElement != undefined || false;
SapphireWidgets.ConfirmationPopup = {
	isAnyConfirmationOpened: function () {
		if (_isInIframe) {
			return window.top.$('body').hasClass('confirmation-opened') && window.top.$('.confirm-container:visible').length;
		} else {
			return $('body').hasClass('confirmation-opened') && $('.confirm-container:visible').length;
		}
	},

	toggleConfirm: function (_id, _question, _message, _notifyId, _HasNotifyOnCancel) {
		if (!OsValidatorOnSubmit()) return;

		if (!this.isAnyConfirmationOpened()) {
			var _body = $('body');
			var _bodyJS = document.body;
			if (_isInIframe) {
				_body = window.top.$('body');
				_bodyJS = window.top.document.body;
			}

			_body.addClass('confirmation-opened');

			var _confirmId = 'confirm_' + _id;

			var _container = document.createElement('DIV');
			_container.setAttribute('id', _confirmId);
			_container.setAttribute('class', 'confirm confirm-wb');
			_container.setAttribute('confirm-trigger-elementid', _id);

			var _background = document.createElement('DIV');
			_background.setAttribute('class', 'confirm-background confirm-wb');
			_background.setAttribute('id', 'bg_' + _confirmId);
			_container.appendChild(_background);

			var _confirm = document.createElement('DIV');
			_confirm.setAttribute('class', 'confirm-container confirm-wb');
			_container.appendChild(_confirm);

			var _confirmTitle = document.createElement('DIV');
			_confirmTitle.setAttribute('class', 'confirm-title');
			var _title = document.createTextNode(_question);
			_confirmTitle.appendChild(_title);
			_confirm.appendChild(_confirmTitle);

			var _confirmMsg = document.createElement('DIV');
			_confirmMsg.setAttribute('class', 'confirm-message');

			_confirmMsg.innerHTML = _message; /* Set HTML to render the message HTML tags, similar to the Escape Content set as No. */
			_confirm.appendChild(_confirmMsg);

			var _confirmActions = document.createElement('DIV');
			_confirmActions.setAttribute('class', 'confirm-actions');
			_confirm.appendChild(_confirmActions);

			var _noBtnLnk = document.createElement('A');
			_noBtnLnk.setAttribute('class', 'Button Third MultiMarginRight10');
			_noBtnLnk.setAttribute('cancel-button', 'cancel-button');
			_noBtnLnk.setAttribute('ui', 'ConfirmNo1');
			if (_HasNotifyOnCancel == 'True') {
				if (_isInIframe) {
					_noBtnLnk.setAttribute(
						'onclick',
						'document.getElementById("' + 'iframe_' + _id + '").contentWindow.OsNotifyWidget("' + _notifyId + '","CANCEL"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' + _confirmId + '");'
					);
				} else {
					_noBtnLnk.setAttribute(
						'onclick',
						'OsNotifyWidget("' + _notifyId + '","CANCEL"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' + _confirmId + '");'
					);
				}
			} else {
				if (_isInIframe) {
					_noBtnLnk.setAttribute(
						'onclick',
						'SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' + _confirmId + '");'
					);
				} else {
					_noBtnLnk.setAttribute(
						'onclick',
						'SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' + _confirmId + '");'
					);
				}
			}

			var _noBtn = document.createTextNode('No');
			_noBtnLnk.appendChild(_noBtn);
			_confirmActions.appendChild(_noBtnLnk);

			var _yesBtnLnk = document.createElement('A');
			_yesBtnLnk.setAttribute('class', 'Button SetAsValid Is_Default');
			_yesBtnLnk.setAttribute('cancel-button', '');
			_yesBtnLnk.setAttribute('ui', 'ConfirmYes1');

			if (_isInIframe) {
				_yesBtnLnk.setAttribute(
					'onclick',
					'document.getElementById("' + 'iframe_' + _id + '").contentWindow.OsNotifyWidget("' + _notifyId + '","OK"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' + _confirmId + '");'
				);
			} else {
				_yesBtnLnk.setAttribute(
					'onclick',
					'OsNotifyWidget("' + _notifyId + '","OK"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' + _confirmId + '");'
				);
			}
			var _yesBtn = document.createTextNode('Yes');
			_yesBtnLnk.appendChild(_yesBtn);
			_confirmActions.appendChild(_yesBtnLnk);

			_confirm.appendChild(_confirmActions);

			_container.appendChild(_confirm);

			_bodyJS.appendChild(_container);

			if (_isInIframe) {
				window.top.$('#bg_' + _confirmId).fadeIn(140);
				setTimeout(function () {
					window.top.$('#' + _confirmId).find('.confirm-container').slideToggle(150);
					window.top.$('#' + _confirmId + ' [cancel-button]').focus();
				}, 100);
			} else {
				$('#bg_' + _confirmId).fadeIn(140);
				setTimeout(function () {
					$('#' + _confirmId).find('.confirm-container').slideToggle(150);
					$('#' + _confirmId + ' [cancel-button]').focus();
				}, 100);
			}
		}
	},

	closeConfirmPopup: function (_confirmId) {
		$('body').removeClass('confirmation-opened');
		$('body').css('overflow-y', 'scroll');
		$('#bg_' + _confirmId).fadeOut(140);

		setTimeout(function () {
			$('#' + _confirmId).find('.confirm-container').slideUp(150);
			$('#' + _confirmId).remove();
		}, 100);
	},

	create: function (_id, _question, _message, _notifyId, _HasNotifyOnCancel) {
		$(document).ready(function () {
			$('#' + _id).off('click').on('click', function () {
				SapphireWidgets.ConfirmationPopup.toggleConfirm(_id, _question, _message, _notifyId, _HasNotifyOnCancel);
				if (_isInIframe) {
					window.frameElement.setAttribute('menu-id', _id);
					window.frameElement.setAttribute('id', 'iframe_' + _id);
				}
				return false;
			});
		});
	},
};

/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/panel-by-id-notify.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/panel-by-id-notify.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PanelByIDNotify */
var panelNotifyWidget;
SapphireWidgets.PanelByIdNotify = {
	isAnyPanelOpenedDeprecated: function() {
		return $('body').hasClass('PanelOpened');
	},
	togglePanelByNotify: function(Id) {
		if (!isAnyPanelOpenedDeprecated()) {
			$('body').addClass('PanelOpened');
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.fadeIn(140);

			try {
				if (justDragged == false) {
					$('.PanelContainer')
						.css('margin-left', panelMarginLeft)
						.css('left', panelLeft)
						.addClass(panelArrowClass);
				}
			} catch (e) {
				console.log(e);
			}

			setTimeout(function() {
				$('#' + Id)
					.parents('.ToggleButton')
					.parent()
					.children('.Panel')
					.children('.PanelContainer')
					.slideDown(150);
			}, 100);
		} else {
			$('body').removeClass('PanelOpened');
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.fadeOut(140);
			setTimeout(function() {
				$('#' + Id)
					.parents('.ToggleButton')
					.parent()
					.children('.Panel')
					.children('.PanelContainer')
					.slideUp(150);
			}, 100);
		}
	},
	togglePanelNotifyById: function(Id) {
		$('body').toggleClass('PanelOpened');
		$('#' + Id)
			.parents('.ToggleButton')
			.parent()
			.children('.Panel')
			.fadeToggle(140);

		panelNotifyWidget = $('#' + Id)
			.parents('.ToggleButton')
			.attr('NotifyId');

		setTimeout(function() {
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.children('.PanelContainer')
				.slideToggle(150);
		}, 100);
	},
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/panel-by-id.js":
/*!******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/panel-by-id.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PanelByID */
SapphireWidgets.PanelById = {
	isAnyPanelOpenedDeprecated: function() {
		return $('body').hasClass('PanelOpened');
	},

	toggleButton: function(id) {
		const $toggleButton = $(`#${id}`).parents('.ToggleButton').length
			? $(`#${id}`).parents('.ToggleButton')
			: $(`#${id}`);

		$toggleButton.click();
	},

	togglePanelById: function(Id) {
		const $toggleButton = $(`#${Id}`).parents('.ToggleButton');
		const $panel = $toggleButton.parent().children('.Panel');
		const $panelContainer = $panel.children('.PanelContainer');
		const $panelBackground = $panel.children('.PanelBackground');

		if (!this.isAnyPanelOpenedDeprecated()) {
			$('body').addClass('PanelOpened');
			$('body').css('overflow-y', 'hidden');

			$panel.show();
			$panelContainer.slideDown(200);

			try {
				if (typeof justDragged !== 'undefined') {
					if (justDragged == false) {
						$('.PanelByIdNew_PanelContainer')
							.css('margin-left', panelMarginLeft)
							.css('left', panelLeft)
							.addClass(panelArrowClass);
					}
				}
			} catch (e) {
				console.log(e);
			}

			setTimeout(function() {
				$panelBackground.fadeIn(80);

				$toggleButton.click();
			}, 50);
		} else {
			$panelContainer.slideUp(200);

			$panelBackground.fadeOut(80, () => {
				$toggleButton.click();

				$('body').css('overflow-y', 'scroll');
				$('body').removeClass('PanelOpened');

				$panel.hide();
			});
		}
	},
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/popup-menu.js":
/*!*****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/popup-menu.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PopUpMenu */
SapphireWidgets.PopUpMenu = {
	menuPosition: function(id, Context, Locale) {
		/* Hide any other menus on page and set button as collapsed. */
		$('.popup-menu:visible').hide();

		//var _this = $(this);
		var _this = $('#' + id);
		var Xx = 0;
		var Yy = 0;
		var Ww = 0;
		var Hh = 0;

		_this.children('.button-expand:visible').hide();

		/* Get the menu element. */
		var _el = _this.next('.popup-menu');

		/* Display the menu. */
		_el.show();

		/* Set button collapse. */
		_this.children('.button-collapse').show();

		/* Get the dimensions of the button. */
		buttonHh = _this.outerHeight();
		buttonWw = _this.outerWidth();

		var buttonY = _this.position().top + buttonHh + 10;
		var buttonX = _this.offset().left;
		//var buttonX = _this.position().left;

		/* Get the distance of menu button and the parent element */
		var popupParentXx = _this.offset().left - _this.position().left;

		var popupXx = _el.offset().left;
		var popupWw = _el.outerWidth();

		Xx = Math.abs(buttonX - $('body').scrollLeft() - popupParentXx);
		Yy = Math.abs(buttonHh - buttonY - $('body').scrollTop());

		if (Locale != 'AR') {
			/* Check if clicked position plus the popup width exceed the window width. */
			if (buttonX + popupWw - $('body').scrollLeft() > $(Context).width()) {
				Xx = buttonX - popupWw - $('body').scrollLeft() - popupParentXx + buttonWw;
				//Xx = ($(window).width() - popupWw) - $('body').scrollLeft();
			}
		}

		/* Set menu position. */
		_el.css({
			left: Xx + 'px',
			top: buttonY + 'px',
		});

		/* Refresh value */
		popupXx = _el.offset().left;

		var _balloonEl = _el.children('.popup-menu-balloon');

		var _balloonXx = _balloonEl.offset().left;
		var _balloonWw = _balloonEl.outerWidth();
		var _balloonPosXx = Math.abs(buttonX - Xx - popupParentXx);

		/* Is the balloon icon positioned out of the popup menu? */
		if (_balloonPosXx + Xx + _balloonWw > Xx + popupWw) {
			_balloonPosXx = _balloonPosXx - _balloonWw;
		}

		/* Set position of the balloon effect. */
		_balloonEl.css('left', _balloonPosXx + 'px');
	},
	menuEvents: function(Context, Locale) {
		$('.popup-button')
			.off('click')
			.on('click', function(e) {
				var id = $(this).attr('id');
				SapphireWidgets.PopUpMenu.menuPosition(id, Context, Locale);

				/*e.stopPropagation();*/

				/* Prevent link submission */
				return false;
			});

		/* v *** Hide popup when click outside *** v */
		function PMClickOutside(event) {
			if (event.hasOwnProperty('target')) {
				var target = $(event.target);
				/*if ((target.parents().index($('a[sapphirehospital], .HospitalPopUp')) == -1)) {}*/
				if (
					!$(event.target).closest(
						'.popup-button, .popup-menu, .os-internal-ui-autocomplete, .os-internal-ui-menu-item, .os-internal-ui-corner-all, ui-autocomplete-item'
					).length
				) {
					$('.popup-menu:visible').hide();
					$('.button-collapse:visible').hide();
					$('.button-expand').show();
				}
			}
		}

		var _PMIsDrag = false;
		var _PMIsClick = false;
		$(document).on('touchstart', function(event) {
			_PMIsDrag = false;
			_PMIsClick = true;
		});
		$(document).on('touchmove', function(event) {
			_PMIsDrag = true;
		});
		$(document).on('click', function(event) {
			PMClickOutside(event);
			_PMIsDrag = false;
			_PMIsClick = false;
		});
		$(document).on('touchend', function(event) {
			if (!_PMIsDrag && _PMIsClick) {
				PMClickOutside(event);
			}
			_PMIsDrag = false;
			_PMIsClick = false;
		});

		$('.button-collapse').on('click', function(event) {
			$('body').trigger('click');
			return false;
		});
		/* ^ *** Hide popup when click outside *** ^ */
	},
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/sapphire-panel.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/sapphire-panel.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SapphirePanel */
SapphireWidgets.SapphirePanel = {
	checkOpenPanel: function() {
		return $('body').hasClass('SapphirePanelOpen') && $('.SapphirePanel_Container:visible').length;
	},

	toggleSapphirePanel: function(PanelId) {
		if (!OsValidatorOnSubmit()) {
			return;
		}

		if (!SapphireWidgets.SapphirePanel.checkOpenPanel()) {
			$('body').addClass('SapphirePanelOpen');
			$('#' + PanelId).fadeIn(140);

			setTimeout(function() {
				$('#' + PanelId)
					.find('.SapphirePanel_Container')
					.slideToggle(150);
			}, 100);
		}
	},

	closeSapphirePanel: function(PanelId) {
		$('body').removeClass('SapphirePanelOpen');
		$('#' + PanelId).fadeOut(140);

		setTimeout(function() {
			$('#' + PanelId)
				.find('.SapphirePanel_Container')
				.slideUp(150);
		}, 100);
	},

	setPanelBehavior: function() {
		$('.Panel[panel-trigger-elementid]').each(function() {
			var this_panel = $(this);
			$('#' + this_panel.attr('panel-trigger-elementid') + '')
				.off('click')
				.on('click', function() {
					SapphireWidgets.SapphirePanel.toggleSapphirePanel(this_panel.attr('id'));
					return false;
				});
		});
	},
};

$(document).ready(function() {
	SapphireWidgets.SapphirePanel.setPanelBehavior();

	if (osAjaxBackend.EventHandlers.AfterAjaxRequest.toString().indexOf('setPanelBehavior') == -1) {
		osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.SapphirePanel.setPanelBehavior);
	}
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/scripts.js":
/*!**************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/scripts.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./confirmation-panel */ "./src/components/05-components/v3-pat/panel/confirmation-panel.js");
__webpack_require__(/*! ./panel-by-id */ "./src/components/05-components/v3-pat/panel/panel-by-id.js");
//require('./panel-by-id-notify');
__webpack_require__(/*! ./popup-menu */ "./src/components/05-components/v3-pat/panel/popup-menu.js");
__webpack_require__(/*! ./sapphire-panel */ "./src/components/05-components/v3-pat/panel/sapphire-panel.js");



/***/ }),

/***/ "./src/components/05-components/v3-pat/patient-call-cancel/patient-call-cancel-structure.js":
/*!**************************************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/patient-call-cancel/patient-call-cancel-structure.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PatientCallCancelStructure */
(function($, window, document, SapphireWidgets) {
	const create = function(config) {
		const $widget = $('#' + config.widgetId).find('.PatientCallCancelStructure');
		const $listQueueWrapper = $widget.find('.PatientCallCancelStructure__ListQueues');
		const $dropdown = $listQueueWrapper.find('.InlineDropdown_label');

		$listQueueWrapper.on('click', event => {
			if (!$dropdown.length) return;
			event.stopPropagation();

			$widget.toggleClass('PatientCallCancelStructure--active');

			$(document).on('click.PatientCallCancelStructure', () => {
				$widget.removeClass('PatientCallCancelStructure--active');
				$(document).off('click.PatientCallCancelStructure');
			});

			$dropdown.trigger('click');
			event.preventDefault();
		});
	};

	SapphireWidgets.PatientCallCancelStructure = { create };
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/patient-call-cancel/patient-call-cancel.js":
/*!****************************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/patient-call-cancel/patient-call-cancel.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PatientCallCancel */
(function($, window, document, SapphireWidgets) {
	const create = function(config) {
		const $widget = $('#' + config.widgetId);
		const $countdown = $widget.find('[ui=data-counter]');
		let $callButton = $widget.find('[ui=data-button-call]');
		let $cancelButton = $widget.find('[ui=data-button-cancel]');
		const $otherContent = $widget.find('.PatientCallCancel__Other');

		let interval;
		let timeCounter;

		const callPatient = function($widget) {
			toggleCallingState();

			if (config.showCountdown) $countdown.text(config.txtCallingIn + ' ' + config.timeToCancel);
			else $countdown.text(config.txtCallingIn);

			startCounter();
		};

		const toggleCallingState = () => {
			$widget.toggleClass('CallingPatient');
			$countdown.text(config.txtCallPatient);
		};

		const setInitialState = () => {
			$widget.removeClass('CallingPatient');
			$callButton.show();
			$otherContent.show();
		};

		const startCounter = () => {
			timeCounter = config.timeToCancel;
			interval = window.setInterval(updateCounter, 1000);
		};

		const updateCounter = () => {
			timeCounter--;

			if (timeCounter === 0) {
				clearInterval(interval);
				OsNotifyWidget(config.patientCallFakeNotifyId, '');

				setInitialState();
			}

			if (config.showCountdown) $countdown.text(config.txtCallingIn + ' ' + timeCounter);
			else $countdown.text(config.txtCallingIn);
		};

		if (config.startCounting) callPatient($widget);

		$callButton.on('click', () => {
			if ($widget.hasClass('CallingPatient')) return;

			callPatient($widget);

			$callButton.hide();
			$otherContent.hide();
		});

		$cancelButton.on('click', event => {
			timeCounter = config.timeToCancel;
			$countdown.text(timeCounter);
			clearInterval(interval);

			toggleCallingState();

			$callButton.show();
			$otherContent.show();
		});
	};

	SapphireWidgets.PatientCallCancel = { create };
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/person-card/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/person-card/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PersonCard */
$(document).ready(function() {
	var PersonCardEvent = function() {
		$('.IsExpandable .PersonCard__title, .IsExpandable .PersonCard__content')
			.off('click')
			.on('click', function() {
				$header = $(this).closest('.PersonCard_header');
				$content = $header.next();
				if ($content.children().length > 0) {
					$content.slideToggle(500);
					if ($('.PersonCard.IsOpen').length > 0) {
						$(this)
							.closest('.PersonCard')
							.removeClass('IsOpen');
					} else {
						$(this)
							.closest('.PersonCard')
							.addClass('IsOpen');
					}
				}
			});
	};

	$('.StopPropagation').click(function(event) {
		event.stopPropagation();
	});

	PersonCardEvent();

	osAjaxBackend.BindAfterAjaxRequest(PersonCardEvent);
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/prescription-card/scripts.js":
/*!**************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/prescription-card/scripts.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PrescriptionCard */
(function($, window, SapphireWidgets) {
	const create = config => {
		$(`#${config.widgetId}`).click(() => {
			showMore($(`#${config.widgetId}`));
		});
	};

	const showMore = element => {
		const parents = element.parents('.PrescriptionCard');

		if (parents.find('.ExpanDiv').hasClass('IsOpen')) {
			parents.find('.ExpanDiv').removeClass('IsOpen');

			element.text('See More');
		} else {
			parents.find('.ExpanDiv').addClass('IsOpen');

			element.text('See Less');
		}
	};

	SapphireWidgets.PrescriptionCard = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/prescription-expandable/scripts.js":
/*!********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/prescription-expandable/scripts.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PrescriptionExpandable */
(function($, window, SapphireWidgets) {
	const PrescriptionExpandable = function(config) {
		const widgetId = config.widgetId;
		const previewstat = [];
		const transitionEvent = SilkUI.whichTransitionEvent();

		const $elementWrapper = $(`#${config.widgetId}`);

		const clickEvents = ob => {
			if ($(ob).hasClass('PrescriptionExpandable_header__LinksDiv')) {
				var Section = $(ob)
					.parent()
					.parent()
					.parent();
			} else {
				var Section = $(ob).parent();
			}

			var SectionContent = Section.children('.PrescriptionExpandable_content');

			// get id
			var id = Section.attr('id');

			var tempHeight = 0;

			// has class expanded
			if (Section.hasClass('expanded')) {
				// Calc and set a fixed height, during this process, transitions are disabled
				SectionContent.addClass('noTransition');
				SectionContent.height(SectionContent.height());
				SectionContent[0].offsetHeight; // hack to force a repaint
				SectionContent.removeClass('noTransition');

				// Collapse content
				SectionContent.height(0);
				Section.removeClass('expanded');
				SectionContent.css('overflow', 'hidden');

				// Remove class, set height and save state
				previewstat[id]['client'] = false;
			} else {
				// Calc and set a fixed height
				SectionContent.height('auto');
				tempHeight = SectionContent.height();
				SectionContent.height(0);
				SectionContent.height(tempHeight);
				SectionContent.css('overflow', 'hidden');

				// remove class, set height and save state
				Section.addClass('expanded');
				previewstat[id]['client'] = true;

				// add event transition end to overflow:visible for tooltips and dropdowns issues
				SectionContent.on(transitionEvent, function() {
					if (Section.hasClass('expanded')) {
						SectionContent.css('overflow', 'visible');
						SectionContent.addClass('noTransition');
						SectionContent.height('auto');
						SectionContent[0].offsetHeight; // hack to force a repaint
						SectionContent.removeClass('noTransition');
					}
				});
			}
		};

		this.init = () => {
			const $header = $elementWrapper.find('.PrescriptionExpandable_header');
			const $links = $header.find('.PrescriptionExpandable_header__LinksDiv');

			// Create array stat
			$('.SectionPrescriptionExpandableArea').each(() => {
				const stat = $header.hasClass('expanded') ? true : false;
				previewstat[widgetId] = { client: stat, server: stat };
			});

			if ($header.hasClass('NotExpandable')) {
				$header.on('click', e => e.preventDefault());
			} else if ($header.hasClass('isLinkEpandableClick')) {
				$links.on('click', e => clickEvents($links));
			} else {
				$header.on('click', e => clickEvents($header));
			}

			const elements =
				'.PrescriptionExpandable_header input, .PrescriptionExpandable_header select, .PrescriptionExpandable_header a';
			$(elements).click(function(event) {
				event.stopPropagation();
			});

			osAjaxBackend.BindAfterAjaxRequest(ajaxRefresh);
		};

		const ajaxRefresh = function(event) {
			// remove click events
			//$('.PrescriptionExpandable_header').off();

			// add stop prepagation
			$(
				'.PrescriptionExpandable_header input, .PrescriptionExpandable_header select, .PrescriptionExpandable_header a'
			).click(function(event) {
				event.stopPropagation();
			});

			// each all sections
			$('.SectionPrescriptionExpandableArea').each(function() {
				// if new SectionExpandable then add to previewstat array
				if (previewstat[$(this).attr('id')] == null) {
					// add stat on array
					var stat = false;
					// if open
					if ($(this).hasClass('expanded')) {
						stat = true;
					}
					// add row
					previewstat[$(this).attr('id')] = { client: stat, server: stat };
				}

				// curent state (ajax state x initial state)
				var curState = false;

				// check if start expandable
				if ($(this).hasClass('expanded')) {
					curState = true;
				}

				// check if ajax != initial server
				if (curState != previewstat[$(this).attr('id')]['server']) {
					// curstate
					previewstat[$(this).attr('id')]['client'] = curState;
					previewstat[$(this).attr('id')]['server'] = curState;
				} else {
					// has class expanded
					if (previewstat[$(this).attr('id')]['client'] == false && $(this).hasClass('expanded')) {
						$(this).removeClass('expanded');
						$(this)
							.children('.PrescriptionExpandable_content')
							.height(0);
					} else if (previewstat[$(this).attr('id')]['client'] == true && !$(this).hasClass('expanded')) {
						$(this).addClass('expanded');
					}
				}
			});
		};
	};

	const create = config => {
		SilkUI.SectionExpandable = new PrescriptionExpandable(config);
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on WebPatterns/Content/SectionExpandable');
	};

	SapphireWidgets.PrescriptionExpandable = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/sapphire-header/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/sapphire-header/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SapphireHeader */
(function ($, window, document, SapphireWidgets) {
	var create = function (config) {
		window[config.widgetId] = new SapphireHeader(config);
		SapphireWidgets.SapphireHeader.widgetId = config.widgetId;
	};

	var handleDemographics = function () {
		window[SapphireWidgets.SapphireHeader.widgetId].handleDemographics();
	};

	var SapphireHeader = function (config) {
		var _this = this;
		this.config = config;
		this.isConfidential = config.isConfidential;
		this.$widget = $('#' + config.widgetId);
		this.$widget.css({
			display: 'block'
		});
		this.$header = this.$widget.find('.SapphireHeader');
		this.$demographic = this.$widget.find('.SapphireHeader-demographics');
		this.$information = this.$widget.find('.SapphireHeader-information');
		this.$additionalTrigger = this.$widget.find('.SapphireHeader-additional-trigger');
		this.$additionalContent = this.$widget.find('.SapphireHeader-additional-content');

		this.handleResize();
		this.attachEvents();

		if (this.$information.text() === '') {
			this.$information.hide();
		}

	};

	SapphireHeader.prototype.getConfig = function () {
		return this.config;
	};

	SapphireHeader.prototype.handleResize = function () {
		var _this = this;
		$(window).resize(function () {
			_this.handleDemographics();
		});
	};

	SapphireHeader.prototype.attachEvents = function () {
		var _this = this;
		this.$additionalTrigger.on('click', function () {
			if (_this.$header.hasClass('isOpen')) {
				_this.$header.removeClass('isOpen');
			} else {
				_this.$header.addClass('isOpen');
			}
		});
	};

	SapphireHeader.prototype.handleDemographics = function () {
		var _this = this;
		this.$demographic.find('.Demographic-item').css('display', 'none');
		this.$additionalTrigger.hide();
		this.$additionalContent.empty();
		var demographicWidth = this.$demographic.outerWidth(true);
		var itemsTotal = 0;
		this.$demographic.find('.Demographic-item').each(function (index) {
			itemsTotal += parseInt($(this).outerWidth(true), 10);
			if (itemsTotal + 60 < demographicWidth) {
				$(this).css('display', 'inline-block');
			} else {
				$(this).clone().css('display', 'inline-block').appendTo(_this.$additionalContent);
				_this.$additionalTrigger.show();
			}
		});
		if (this.$additionalContent.find('.Demographic-item').length === 0) {
			this.$header.removeClass('isOpen');
		}
	};

	SapphireHeader.prototype.showAdditional = function () {
		return this.$header.addClass('isOpen');
	};

	SapphireHeader.prototype.hideAdditional = function () {
		return this.$header.removeClass('isOpen');
	};

	SapphireWidgets.SapphireHeader = {
		create: create,
		handleDemographics: handleDemographics,
	};

})(jQuery, window, document, SapphireWidgets);

$(window).load(function () {
	if (!!SapphireWidgets.SapphireHeader.widgetId) {
		window[SapphireWidgets.SapphireHeader.widgetId].handleDemographics();
	}
	if (!!$('.SapphireHeader-demographics').length) {
		osAjaxBackend.BindAfterAjaxRequest(function () {
			window[SapphireWidgets.SapphireHeader.widgetId].handleDemographics();
		});
	}
});

/***/ }),

/***/ "./src/components/05-components/v3-pat/sapphire-popup/scripts.js":
/*!***********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/sapphire-popup/scripts.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SapphirePopup */
var RichWidgets_Popup_Editor_notifyWidget;

(function($, window, SapphireWidgets) {
	// Check if the widget is loaded inside an iFrame
	let isInsideIframe = window.frameElement != undefined || false;

	// Constants
	const POPUP_INITIAL_WIDTH = 300;
	const POPUP_INITIAL_HEIGHT = 100;
	const POPUP_WINDOW_INDEX = 4010;
	const POPUP_CLOSING_TAG = 'closing';
	const POPUP_CLOSING_VALUE = 'true';

	let POPUP_NOTIFY_WIDGET;
	let POPUP_PARENT_URL;

	const create = config => {
		if (config.ignoreIframe) isInsideIframe = false;

		$().ready(function($) {
			const _id = config.linkId;
			const linkQuery = `#${config.linkId}`;
			let linkWidget;

			try {
				linkWidget = $(linkQuery).get(0);
			} catch (e) {}

			if (typeof linkWidget == 'undefined') {
				//Case the widget is inexistent or invisible, it will show no errors.
				return;
			}

			POPUP_PARENT_URL = config.parentUrl;

			const linkResult = getLinkHREF(linkWidget);
			const linkHref = linkResult[0];
			const isAButton = linkResult[1];

			if (typeof linkHref == 'undefined' || linkHref == '' || linkHref == '#' || linkHref.indexOf('javascript:') == 0) {
				try {
					window.OsHandleException(
						new Error('Popup link id must be the id of a Link or Button Widget with Method Navigate.'),
						outsystems.osErrorCodes.SystemJavascriptError,
						'Popup_Editor'
					);
				} catch (e) {}

				return;
			}

			// Remove the existing on-click event
			if (isAButton) {
				linkWidget.setAttribute(
					'onclick',
					linkWidget
						.getAttribute('onclick')
						.toString()
						.replace('window.location.href=', 'return false;window.location.href=')
				);
			}

			// If there's a confirmation message, store in an attribute the result
			if (linkWidget.getAttribute('onclick') != null) {
				linkWidget.setAttribute(
					'onclick',
					linkWidget
						.getAttribute('onclick')
						.toString()
						.replace(
							'if( ret != true )',
							"$('" + linkQuery + "').get(0).setAttribute('confirmed', ret); if( ret != true )"
						)
				);
			}

			const clickHandler = function(event) {
				// The clickHandler event is registered in osjs and $ for compatibillity reasons, they must not run both for the same click.
				// Variable is set to false in resize function.
				if ($.data(event.target, 'os-internal-processing') == true) {
					return false;
				} else {
					$.data(event.target, 'os-internal-processing', true);
				}

				// Check if the clicked link is disabled
				if (linkWidget.getAttribute('disabled') != null) {
					var linkDisabled = linkWidget
						.getAttribute('disabled')
						.toString()
						.toLowerCase();

					if (linkDisabled == 'disabled' || linkDisabled.indexOf('true') != -1) {
						return false;
					}
				}

				if (linkWidget.getAttribute('confirmed') == 'false') return false;
				if (OsIsIE()) osFocusBackend.ClearFocusedElement();

				let popupDiv;
				let pleaseWaitDiv;

				const waitText = `<div style="margin-top: 36px;">${config.loadingMessage}</div>`;
				const imgHTML = '<div class="lds-ring"><div></div></div>';
				const loadingElement = `<div class="LayoutPopup-loading">${imgHTML} ${waitText}</div>`;
				const iFrameElement = `<iframe id="iframe_${_id}" width="100%" scrolling="no" height="100%" frameborder="0" src="javascript:void(0);"/>`;

				if (isInsideIframe) {
					let _div = document.createElement('DIV');
					_div.setAttribute('style', 'text-align: center; display: none;');
					_div.setAttribute('id', 'window_' + _id);
					window.top.document.body.appendChild(_div);

					popupDiv = window.top.$('#window_' + _id);
					popupDiv.append(iFrameElement);

					pleaseWaitDiv = popupDiv.prepend(loadingElement);
				} else {
					popupDiv = $("<div style='text-align: center; display: none;'></div>").appendTo('body');
					popupDiv.append(iFrameElement);

					pleaseWaitDiv = popupDiv.prepend(loadingElement);
				}

				const loadTargetPage = function() {
					if (isInsideIframe) {
						window.top.POPUP_NOTIFY_WIDGET = config.notifyId;
						// Create a reference to the iframe object on the document parent
						window.top._iframePopup = window.frameElement.contentWindow;
					} else {
						window.top._iframePopup = window;
					}

					POPUP_NOTIFY_WIDGET = config.notifyId;
					RichWidgets_Popup_Editor_notifyWidget = config.notifyId;
					window.top._iframePopup.RichWidgets_Popup_Editor_notifyWidget = config.notifyId;

					// Load target page
					const ohref = getLinkHREF(linkWidget)[0];
					const rhref = ohref.replace(/(\?|&)_=.*?(&|$)/, '$1_=' + +new Date().now + '$2');
					const xhref = rhref + (rhref == ohref ? (rhref.indexOf('?') >= 0 ? '&' : '?') + '_=' + +new Date() : '');

					popupDiv.find('iframe').attr('src', xhref);

					(function(popupDiv) {
						popupDiv.find('iframe').load(function() {
							// After loading try to resize
							resize(popupDiv, _id, config.setWidth, config.setHeight, true, event);
						});
					})(popupDiv);

					popupDiv = null;
					pleaseWaitDiv = null;
				};

				openPopup(popupDiv, pleaseWaitDiv, loadTargetPage, event, config);

				return false;
			};

			$(linkQuery).click(clickHandler);
		});
	};

	const resize = (divToPopup, _id, setWidth, setHeight, recenter, event) => {
		// Code to support old resize method Popup_Window_resize(setWidth, setHeight, recenter)
		if (typeof recenter == 'undefined') {
			recenter = setHeight;
			setHeight = setWidth;
			setWidth = divToPopup;

			if (isInsideIframe) {
				divToPopup = window.top.$('.os-internal-ui-dialog-content');
			} else {
				divToPopup = $('.os-internal-ui-dialog-content');
			}
		}

		// Resize must bail out immediately if the popup is marked as closing, and not start the animation.
		if ($.data(divToPopup.get(0), POPUP_CLOSING_TAG) == POPUP_CLOSING_VALUE) {
			return false;
		}

		let documentServer;
		let frameObj = divToPopup.find('iframe')[0];

		if (typeof frameObj == 'undefined') {
			frameObj = window.top.$('#iframe_' + _id)[0];
		}

		if (isInsideIframe) {
			documentServer = window.top.document.location.href.replace(/(https?:\/\/[^\/]*).*/, '$1');
		} else {
			documentServer = document.location.href.replace(/(https?:\/\/[^\/]*).*/, '$1');
		}

		if (typeof frameObj != 'undefined') {
			const frameServer = frameObj.src.replace(/(https?:\/\/[^\/]*).*/, '$1');
			const sameOrigin = frameServer.toLowerCase() == documentServer.toLowerCase() || frameServer.indexOf('http') != 0;

			if (!sameOrigin && (setWidth == -1 || setHeight == -1)) {
				throw new Error('A Popup with a screen from a different server (or https) needs explicict width, height set.');
			}

			if (sameOrigin) {
				if (frameObj.contentDocument !== null || frameObj.contentWindow !== null) {
					var innerDoc = frameObj.contentDocument ? frameObj.contentDocument : frameObj.contentWindow.document;
					if (innerDoc.documentElement.scrollHeight == 0)
						// Strangely this event is also triggered on close
						return false;
				}
			}

			let oldHeight;
			if (isInsideIframe) {
				oldHeight = window.top
					.$(divToPopup)
					.parents('.os-internal-Popup')
					.outerHeight();
			} else {
				oldHeight = $(divToPopup)
					.parents('.os-internal-Popup')
					.outerHeight();
			}

			let width = setWidth == -1 ? $(innerDoc).width() : setWidth;
			let height = setHeight == -1 ? $(innerDoc).height() : setHeight;

			var titleHeight;
			if (isInsideIframe) {
				titleHeight = window.top.$('.os-internal-ui-dialog-titlebar').height();
			} else {
				titleHeight = $('.os-internal-ui-dialog-titlebar').height();
			}

			// Verify if the parent window width is less than the pop-up window, if so set the responsive class on the iframe body (for responsive themes)
			if (window.innerWidth < width) {
				// only set the class if the origin is the same
				if (sameOrigin) {
					$(innerDoc)
						.find('body')
						.addClass('Responsive');
					width = window.innerWidth - 20; // 10px "padding" effect, to keep the popup look and feel on top of content
				}
			}

			// Fix issues with scrollbars
			if (setHeight == -1) {
				// IE7 needs a little more space to remove the scrollbars
				if ($.browser.msie) height = height + 1;
			} else {
				//when explicitly setting the height
				if (sameOrigin) innerDoc.body.style.height = 'auto';
			}

			if (isInsideIframe) {
				window.top.$(divToPopup).height(height);
			} else {
				$(divToPopup).height(height);
			}

			//Hide ECT
			if (isInsideIframe) {
				window.top
					.$(innerDoc)
					.find('.ECT_FeedbackContainer')
					.hide();
				var divPopupOuterWindow = window.top.$(divToPopup).parents('.os-internal-Popup');
			} else {
				$(innerDoc)
					.find('.ECT_FeedbackContainer')
					.hide();
				var divPopupOuterWindow = $(divToPopup).parents('.os-internal-Popup');
			}

			var animateFinal = {};

			if (setHeight == -1) {
				var oldTop = parseInt(divPopupOuterWindow.css('top'));
				if (recenter) animateFinal.top = Math.max(20, oldTop + (oldHeight - (height + titleHeight)) / 2);
				animateFinal.height = height + titleHeight;
			}

			if (setWidth == -1) {
				var oldLeft = parseInt(divPopupOuterWindow.css('left'));
				if (recenter) animateFinal.left = oldLeft + (divPopupOuterWindow.width() - width) / 2;
				animateFinal.width = width;
			}

			if (
				divPopupOuterWindow.width() == animateFinal.width &&
				divPopupOuterWindow.height() == animateFinal.height - ($.browser.msie ? 1 : 0)
			) {
				$('.os-internal-ui-dialog-content>.LayoutPopup-loading').hide();
				$(divToPopup).height(height - ($.browser.msie ? 1 : 0)); // restore size
				return true; // nothing to do...
			}

			// hide content in first resize - readjustments will not flickr
			if (divPopupOuterWindow.width() == POPUP_INITIAL_WIDTH && divPopupOuterWindow.height() == POPUP_INITIAL_HEIGHT) {
				$(frameObj).height(0);
			}

			var onAnimationComplete = function() {
				setTimeout(function() {
					if (isInsideIframe) {
						window.top.$('.os-internal-ui-dialog-titlebar-close-no-title').css('display', 'block');
						window.top
							.$(divToPopup)
							.find('iframe')
							.height('100%')
							.width(animateFinal.width);
					} else {
						$('.os-internal-ui-dialog-titlebar-close-no-title').css('display', 'block');
						$(divToPopup)
							.find('iframe')
							.height('100%')
							.width(animateFinal.width);
					}
				}, 13);
			};

			var divPleaseWait;
			if (isInsideIframe) {
				divPleaseWait = window.top.$('.os-internal-ui-dialog-content>.LayoutPopup-loading');
			} else {
				divPleaseWait = $('.os-internal-ui-dialog-content>.LayoutPopup-loading');
			}

			divPleaseWait.hide();

			if (setHeight == -1 || setWidth == -1) {
				divPopupOuterWindow.animate(animateFinal, {
					duration: 200,
					complete: onAnimationComplete,
				});
			} else {
				onAnimationComplete();
			}
			innerDoc = null;
			divPopupOuterWindow = null;
			if (isInsideIframe) {
				window.top.$.data(event.target, 'os-internal-processing', false);
			} else {
				$.data(event.target, 'os-internal-processing', false);
			}
			return true;
		}
	};

	const close = () => {
		let popupToClose;
		let popupContainer;

		if (isInsideIframe) {
			popupToClose = window.top.$('.os-internal-ui-dialog-content');
			popupContainer = window.top.$('.SapphirePopup');
		} else {
			popupToClose = $('.os-internal-ui-dialog-content');
			popupContainer = $('.SapphirePopup');
		}

		popupToClose.data(POPUP_CLOSING_TAG, POPUP_CLOSING_VALUE);

		setTimeout(function() {
			popupToClose.dialog('close');

			popupToClose.remove();
			popupContainer.remove();
		}, 0);
	};

	const getLinkHREF = widget => {
		let linkHref;
		let isAButton = false;

		try {
			//Checks if the id is from a link or not
			linkHref = $(widget).attr('href');

			//Tests for visibility/existence
			if (typeof linkHref == 'undefined') {
				const onClick = widget.getAttribute('onclick');

				if (typeof onClick != 'undefined') {
					isAButton = true;

					if (onClick != null) {
						let hrefMatch;

						if ((hrefMatch = onClick.toString().match(/href='([^']*)'/)) != null) {
							linkHref = hrefMatch[1];
						}
					}
				}
			}
		} catch (e) {}

		return [linkHref, isAButton];
	};

	const openPopup = (divToPopup, divPleaseWait, loadTargetPage, event, config) => {
		// Destroy any previous dialog
		close(null);

		if (isInsideIframe) {
			const $jParent = window.top.jQuery;
			$jParent('.os-internal-Popup').remove();
		}

		// If any close is pending, schedule to execute itself asynchronously exit
		// If no close is pending, continue with open operation
		let closingPopups;

		if (isInsideIframe) closingPopups = window.top.$('.os-internal-ui-dialog-content');
		else closingPopups = $('.os-internal-ui-dialog-content');

		for (var i = 0; i < closingPopups.length; i++) {
			if ($.data(closingPopups.get(i), POPUP_CLOSING_TAG) == POPUP_CLOSING_VALUE) {
				setTimeout(function() {
					openPopup(divToPopup, divPleaseWait, loadTargetPage, event, config);
				}, 13);

				return false;
			}
		}

		let _dialog;

		if (isInsideIframe) {
			const popupContainer = document.createElement('DIV');
			popupContainer.setAttribute('class', 'SapphirePopup');

			window.top.document.body.appendChild(popupContainer);

			_dialog = window.top.jQuery(divToPopup);
		} else {
			$('<div class="SapphirePopup"></div>').appendTo('body');

			_dialog = $(divToPopup);
		}

		$(divPleaseWait).show();

		if ($('.ISidebar').length) window.parent.SapphireWidgets.LayoutBase.openSidebarIframe(0);

		_dialog.show().dialog({
			appendTo: '.SapphirePopup',
			dialogClass: 'os-internal-Popup',
			resizable: false,
			autoResize: false,
			closeOnEscape: !config.hideCloseButton,
			bgiframe: true,
			draggable: false,
			autoOpen: true,
			title: config.setTitle,
			modal: !(config.useModal === false),
			height: config.setHeight == -1 ? POPUP_INITIAL_HEIGHT : config.setHeight,
			position: 'center',
			width: config.setWidth == -1 ? POPUP_INITIAL_WIDTH : config.setWidth,
			zIndex: POPUP_WINDOW_INDEX,
			close: function() {
				// If the popup is closed before it is resized (ESC) we need to set the processing event to false.
				$.data(event.target, 'os-internal-processing', false);

				_dialog.find('iframe').unbind('load');
				_dialog.find('iframe').attr('src', 'about:blank');

				setTimeout(function() {
					_dialog.find('iframe').empty();
					_dialog.empty();
				}, 13);
			},
		});

		_dialog.find('iframe').height(0);
		_dialog.parents('.os-internal-ui-dialog').dropShadow();

		if (config.CssClasses !== ' ') {
			if (isInsideIframe) window.top.$('.os-internal-ui-dialog').addClass(config.CssClasses);
			else $('.os-internal-ui-dialog').addClass(config.CssClasses);
		}

		loadTargetPage();
	};

	SapphireWidgets.SapphirePopup = { create, close, resize };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/sapphire-radio-button/scripts.js":
/*!******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/sapphire-radio-button/scripts.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SapphireRadioButton */
SapphireWidgets.SapphireRadioButton = widgetId => {
	var $widget = $('#' + widgetId);
	var $control = $widget.find('input[type="radio"]');
	var name = $control.prop('name');

	$control.click(function() {
		$widget.removeClass('active');
		$('input[type="radio"][name="' + name + '"]').each(function() {
			$(this)
				.closest('.ButtonRadioInp')
				.removeClass('active');
		});
		if ($(this).is(':checked')) {
			$widget.addClass('active');
		} else {
			$widget.removeClass('active');
		}
	});

	$widget.find('.ButtonRadioInp_radioText').click(function() {
		if (
			$(this)
				.closest('.ButtonRadioInp')
				.hasClass('disabled')
		) {
			return false;
		}
		$control.trigger('click');
		$control.trigger('click');
		if ($control.is(':checked')) {
			$widget.addClass('active');
		} else {
			$widget.removeClass('active');
		}
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/scales/scale-main-structure.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/scales/scale-main-structure.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ScaleMainStructure */
(function($, window, SapphireWidgets) {
	const create = config => {
		$(document).ready(function() {
			setupScale();
			bindClicks();

			osAjaxBackend.BindAfterAjaxRequest(function() {
				setTimeout(function() {
					bindClicks();
				}, 1000);
			});
		});
	};

	ScaleCount = conf => {
		$(function() {
			var CardScale = conf.IsCardScale;
			var RulerScale = conf.IsRulerScale;
			var MultipleScale = conf.IsMultipleScale;
			var $totalPlace = $('.ScaleMainStructure_footerResult .Heading2');
			var totalCardScale = 0;
			var totalMultipleScale = 0;
			var totalRulerScale = 0;

			var ScaleTypeCard = function() {
				var totalSelected = $('.ScaleList.CardScale').find('.ScaleCard.active').length;
				var totalNumber = 0;
				$(".ScaleList.CardScale:not('.isTitle')").each(function() {
					if ($(this).find('.ScaleCard').length > 0) {
						totalNumber += 1;
					}
				});

				if (totalNumber === totalSelected) {
					var total = [];
					var inputValue = '';
					var $scaleRow = $('.ScaleList.CardScale:not(.isTitle)');
					$scaleRow.each(function() {
						inputValue = $(this)
							.find('.ScaleCard.active')
							.data('value');
						$(this)
							.find('.ScaleList_inputValue input')
							.val(inputValue);
					});

					$('.ScaleList.CardScale .ScaleCard.active').each(function() {
						total.push($(this).data('value'));
					});
					var finalTotal = eval(total.join('+'));
					return finalTotal;
				}
			};

			var ScaleTypeRuler = function() {
				var activeRulerValue = '';
				var $activeRuler = $('.RulerScale_number.active');
				if ($activeRuler.length > 0) {
					var activeRulerValue = $('.RulerScale_number.active')
						.closest('.RulerScale')
						.data().value;
					$('.ScaleList.Ruler')
						.find('.ScaleList_inputValue input')
						.val(activeRulerValue);

					return activeRulerValue;
				}
				return activeRulerValue;
			};

			var ScaleTypeMultiple = function() {
				var numberofCols = $('.ScaleList.MultipleScale')
					.first()
					.find('.ButtonGroupScale').length;
				var numberofRows = $('.ButtonGroupScale').closest('.ScaleList.MultipleScale:not(.isTitle):not(.isSubtotal)')
					.length;
				var total = [];
				var i = 0;
				var j = 0;
				var countActive = 0;
				var countallActiveCols = 0;
				var totalOfItems = numberofCols * numberofRows;
				var totalScore = [];

				for (i = 0; i < numberofCols; i++) {
					for (j = 0; j < numberofRows; j++) {
						var ScaleListSelected = document.querySelectorAll(
							'.ScaleList.MultipleScale:not(.isTitle):not(.isSubtotal)'
						)[j];
						var ButtonScaleSelected = ScaleListSelected.querySelectorAll('.ButtonGroupScale')[i];

						if (ButtonScaleSelected.querySelectorAll('.ButtonGroup_button.active').length > 0) {
							var ScaleValue = ButtonScaleSelected.querySelectorAll('.active')[0].innerText;
							total.push(parseInt(ScaleValue));
							totalScore.push(parseInt(ScaleValue));
							countActive = countActive + 1;
						}
					}
					if ($('.ScaleList.MultipleScale.isSubtotal').length > 0) {
						if (countActive === numberofRows) {
							var subTotal = eval(total.join('+'));
							var subtotalScale = document.querySelectorAll('.ScaleList.MultipleScale.isSubtotal .ButtonGroupScale')[i];
							subtotalScale.innerText = subTotal;
							countallActiveCols = countallActiveCols + 1;
						}
					}
					countActive = 0;
					total = [];
				}

				if (document.querySelectorAll('.ButtonGroup_button.active').length === totalOfItems) {
					var i = 0;
					var j = 0;
					for (i = 0; i < numberofRows; i++) {
						var ScaleListRow = $('.ScaleList.MultipleScale:not(.isTitle):not(.isSubttotal)')[i];
						var $ScaleListInput = $(ScaleListRow).find('.ScaleList_inputValue input');
						var valuesSelected = '';
						for (j = 0; j < numberofCols; j++) {
							var ActiveButton = $(ScaleListRow).find('.ButtonGroup_button.active')[j];
							var ActiveValue = ActiveButton.innerText;
							//valuesSelected=valuesSelected+','+ActiveValue;
							if (j === numberofCols - 1) {
								valuesSelected += ActiveValue;
							} else {
								valuesSelected += ActiveValue + ',';
							}
						}
						$ScaleListInput.val(valuesSelected);
					}
					var getTotal = eval(totalScore.join('+'));
					return getTotal;
				}
			};

			var TotalCalc = function() {
				if (CardScale === true) {
					totalCardScale = ScaleTypeCard();
				}
				if (RulerScale === true) {
					totalRulerScale = ScaleTypeRuler();
				}
				if (MultipleScale === true) {
					totalMultipleScale = ScaleTypeMultiple();
				}
				if (!isNaN(totalMultipleScale) && !isNaN(totalCardScale) && !isNaN(totalRulerScale)) {
					var totalAbsoluteScore = totalCardScale + totalMultipleScale + totalRulerScale;
					var totalAbsoluteLabel = totalAbsoluteScore > 11 ? ' (High)' : ' (Low)';

					$('.ScaleMainStructure_totalScore.Heading2').text(totalAbsoluteScore + totalAbsoluteLabel);

					if ($('.ScaleMainStructure_hiddingLink a').length > 0) {
						$('.ScaleMainStructure_hiddingLink a').click();
					}
				}
			};

			if (CardScale === true) {
				$('.ScaleCard').click(function() {
					if (!$(this).hasClass('disabled')) {
						$parentScaleCard = $(this).closest('.ScaleList.CardScale');
						$parentScaleCard.find('.ScaleCard').removeClass('active');
						$(this).addClass('active');
						TotalCalc();
					}
				});
				TotalCalc();
			}

			if (RulerScale === true) {
				$('.RulerScale').click(function() {
					if ($(this).find('.viewmode').length === 0) {
						var $rulerScaleList = $(this).closest('.ScaleList.Ruler');
						$rulerScaleList.find('.RulerScale_number').removeClass('active');
						$(this)
							.find('.RulerScale_number')
							.addClass('active');
						TotalCalc();
					}
				});
				TotalCalc();
			}

			if (MultipleScale === true) {
				var counter;
				var ScaleListTitle = document.querySelector('.ScaleList.MultipleScale.isTitle');
				var ScaleListSubTotal = document.querySelector('.ScaleList.MultipleScale.isSubtotal');
				var ScaleList = document.querySelector('.ScaleList.MultipleScale:not(.isTitle):not(.isSubtotal)');

				$('.ButtonGroupScale')
					.closest('.ScaleList.MultipleScale:nth-child(2n)')
					.addClass('EvenLine');
				var numberOfGroupScale = ScaleList.querySelectorAll('.ButtonGroupScale').length;

				$('.ScaleList.MultipleScale.isSubtotal .ButtonGroupScale').text(0);
				// Check if Multiple Scale Title exists then adjust title width
				if ($('.ScaleList.MultipleScale.isTitle').length > 0) {
					for (counter = 0; counter < numberOfGroupScale; counter++) {
						var ScaleListWidth = ScaleList.querySelectorAll('.ButtonGroupScale')[counter].offsetWidth;
						ScaleListTitle.querySelectorAll('.ButtonGroupScale')[counter].style.width = ScaleListWidth + 'px';
						ScaleListSubTotal.querySelectorAll('.ButtonGroupScale')[counter].style.width = ScaleListWidth + 'px';
					}
				}

				$('.ButtonGroup_button').click(function() {
					TotalCalc();
				});
				TotalCalc();
			}
		});
	};

	setupScale = () => {
		var IsCardScale;
		var IsRulerScale;
		var IsMultipleScale;

		$('.ScaleCard').length > 0 ? (IsCardScale = true) : (IsCardScale = false);
		$('.ButtonGroupScale').length > 0 ? (IsMultipleScale = true) : (IsMultipleScale = false);
		$('.RulerScale').length > 0 ? (IsRulerScale = true) : (IsRulerScale = false);

		setTimeout(function() {
			ScaleCount({
				IsCardScale: IsCardScale,
				IsRulerScale: IsRulerScale,
				IsMultipleScale: IsMultipleScale,
			});
		}, 500);

		if ($('.ScaleMainStructure_options .ToggleItemControl').length > 0) {
			$('.ScaleMainStructure_options .ToggleItemControl').click(function() {
				$('.ScaleMainStructure_totalScore.Heading2').text('');
			});
		}
	};

	resetScales = () => {
		$('.ScaleMainStructure_content').css('visibility', 'hidden');
		$('.ScaleMainStructure_options .ToggleItemControl').addClass('disabled');
		setTimeout(function() {
			$('.ScaleMainStructure_totalScore.Heading2').text('');
			setupScale();
		}, 600);
		setTimeout(function() {
			$('.ScaleMainStructure_content').css('visibility', 'visible');
			$('.ScaleMainStructure_options .ToggleItemControl').removeClass('disabled');
		}, 1000);
	};

	bindClicks = () => {
		if ($('.ScaleMainStructure_options .ToggleItemControl ').length > 0) {
			$('.ScaleMainStructure')
				.off('click')
				.on('click', '.ToggleItemControl', function() {
					resetScales();
				});
		}

		if ($('.Navigation_control').length > 0) {
			$('.Navigation_right').click(function() {
				if (
					!$(this)
						.find('a')[0]
						.hasAttribute('disabled')
				) {
					resetScales();
				}
			});

			$('.Navigation_left').click(function() {
				if (
					!$(this)
						.find('a')[0]
						.hasAttribute('disabled')
				) {
					resetScales();
				}
			});
		}
	};

	SapphireWidgets.ScaleMainStructure = { create };
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/scales/toggle-item-control.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/scales/toggle-item-control.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ToggleItemControl */
SapphireWidgets.ToggleItemControl = () => {
	$(document).ready(function() {
		$('.ToggleItemControl input[type="radio"]').each(function() {
			if ($(this).is(':checked')) {
				$(this)
					.parent()
					.parent()
					.addClass('active');
			}
		});

		$('.ToggleItemControl')
			.off('click')
			.on('click', function() {
				$('.ToggleItemControl').removeClass('active');
				$(this)
					.find('input[type="radio"]')
					.not(':checked')
					.prop('checked', true)
					.click();
				if (
					$(this)
						.find('input[type="radio"]')
						.is(':checked')
				) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			});

		osAjaxBackend.BindAfterAjaxRequest(function() {
			$('.ToggleItemControl input[type="radio"]').each(function() {
				if ($(this).is(':checked')) {
					$(this)
						.parent()
						.parent()
						.addClass('active');
				}
			});

			$('.ToggleItemControl')
				.off('click')
				.on('click', function() {
					$('.ToggleItemControl').removeClass('active');

					if (
						$(this)
							.find('input[type="radio"]')
							.is(':checked')
					) {
						$(this).addClass('active');
					} else {
						$(this).removeClass('active');
					}
				});
		});
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/search-and-select/select-ssd.js":
/*!*****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/search-and-select/select-ssd.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var SearchSelectDefine = (window.SearchSelectDefine = window.SearchSelectDefine || {});

SapphireWidgets.SelectSSD = function SSDSelectSetup(config) {
	$(function() {
		var $SSDselectId = $('#' + config.SSDSelectId);
		var isMultiple = config.isMultiple;

		var $ComponentSSD = $SSDselectId.closest('.SearchSD');
		var $ComponentSSDinput = $ComponentSSD.find('.SearchSD___input input');
		var Componentinputlength = $ComponentSSDinput.val().length;

		if (Componentinputlength > 0) {
			$SSDselectId.find('.SelectSD__contentTitle').highlight($ComponentSSDinput.val(), {
				className: 'SelectSD-searched-term',
				caseSensitive: false,
				wordsOnly: false,
			});
		}

		var OpenConfirmPopup = function($SSDselectId) {
			$ComponentSSD = $SSDselectId.closest('.SearchSD');
			$PopupID = $ComponentSSD.siblings('.SSDPopupWrapper');

			$PopupID.fadeIn('fast', function() {
				$ComponentSSD.addClass('Dont_Close');
				$PopupID
					.find('.SSDpopupOk')
					.off('click')
					.on('click', function() {
						$PopupID.fadeOut('fast', function() {
							$SSDselectId.find('.SelectSD__starTrigger > a').click();
							setTimeout($ComponentSSD.removeClass('Dont_Close'), 500);
						});
					});

				$PopupID
					.find('.SSDpopupCancel')
					.off('click')
					.on('click', function() {
						$PopupID.fadeOut('fast', function() {
							setTimeout($ComponentSSD.removeClass('Dont_Close'), 500);
						});
					});
			});
		};

		var SSDCheckBoxSelect = function($widgetId) {
			var checkBoxCount = 0;
			if (isMultiple === 'True') {
				checkBoxCount = $widgetId
					.closest('.SearchSD.showFavorite')
					.find('.SelectSD__multiple > input[type="checkbox"]:checked').length;

				$allListcard = $widgetId.closest('.SearchSD_content');

				if (checkBoxCount > 0) {
					$widgetId.closest('.SearchSD.showFavorite').addClass('MultiSelectActive');
					$widgetId.closest('.SearchSD_content .SelectSD').each(function() {
						$(this)
							.find('.SelectSD_contentWrapper')
							.off('click');
						$(this)
							.find('.SelectSD_actionLink')
							.off('click');
					});
				} else {
					$widgetId.closest('.SearchSD.showFavorite').removeClass('MultiSelectActive');
					$widgetId.closest('.SearchSD_content .SelectSD ').each(function() {
						$(this)
							.find('.SelectSD_contentWrapper')
							.on('click', function(e) {
								$(this)
									.find('.LineActionLINK > a')
									.click();
							});
						$(this)
							.find('.SelectSD_actionLink')
							.on('click', function(e) {
								$(this)
									.find('.LineActionLINK > a')
									.click();
							});
					});
				}
			}
		};

		if (isMultiple === 'True') {
			$SSDselectId.find('.SelectSD__multiple > input').click(function() {
				SSDCheckBoxSelect($SSDselectId);
			});
		}

		$SSDselectId.find('.SelectSD__starLink').on('click', function(e) {
			if (!$SSDselectId.find('.SelectSD .SelectSD__starWrapper').hasClass('starDisabled')) {
				if ($SSDselectId.find('.SelectSD .SelectSD__starWrapper').hasClass('starSelected')) {
					OpenConfirmPopup($SSDselectId);
				} else {
					$SSDselectId.find('.SelectSD__starTrigger > a').click();
				}
			}
		});

		$SSDselectId.find('.SelectSD_contentWrapper').on('click', function(e) {
			$ComponentSSD = $SSDselectId.closest('.SearchSD');
			$SSDselectId.find('.LineActionLINK > a').click();
			if (!$ComponentSSD.hasClass('MultiSelectActive')) {
				SearchSelectDefine.SSDSearch.returnToSearch($SSDselectId.closest('.SearchSD'));
				SearchSelectDefine.SSDSearch.closeSSD($SSDselectId.closest('.SearchSD'));
			}
		});

		$SSDselectId.find('.SelectSD_actionLink').on('click', function(e) {
			$ComponentSSD = $SSDselectId.closest('.SearchSD');
			$SSDselectId.find('.LineActionLINK > a').click();
			if (!$ComponentSSD.hasClass('MultiSelectActive')) {
				SearchSelectDefine.SSDSearch.returnToSearch($SSDselectId.closest('.SearchSD'));
				SearchSelectDefine.SSDSearch.closeSSD($SSDselectId.closest('.SearchSD'));
			}
		});
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/search-and-select/ssd-search.js":
/*!*****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/search-and-select/ssd-search.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var SearchSelectDefine = (window.SearchSelectDefine = window.SearchSelectDefine || {});

SapphireWidgets.SSDSearch = function SSDsearchSetup(config) {
	$(function() {
		var $SSDwidget = $('#' + config.SSDWidgetId); // SSDComponent map not used again
		var $SSDComponent = $SSDwidget.find('.SearchSD'); // SSDSearch Component id for use in the function and manipulate classes
		var $SSDComponentContent = $SSDComponent.find('.SearchSD_content'); // SSDcomponent content
		var hasClone = config.HasClone; // HasClone variable input parameter value
		var hasFavorite = config.HasFavorite; // HasFavorite variable input parameter value
		var showClones = config.ShowClones; // ShowClones variable input parameter value
		var letterLimit = config.LimitLetter; // Number of letter to enter before trigger the search action
		var hasShield = config.HasShield;
		var shieldTimeout = config.ShieldTimeout;
		var $widgetShield = $SSDComponent.find('.SearchSD--shield');
		var searchTriggerTimer;
		const $SSDClearButton = $SSDComponent.find('.SearchSD___remove');
		const $SSDInputElement = $SSDComponent.find('.SearchSD___input input');

		var executeSearch = function() {
			clearTimeout(searchTriggerTimer);
			searchTriggerTimer = setTimeout(function() {
				TriggerSearch($SSDComponent);
			}, 700);
		};

		if (hasShield) {
			window.setTimeout(function() {
				$widgetShield.hide();
			}, shieldTimeout);
		}

		/*  Returns a function, that, as long as it continues to be invoked, will not
		 *   be triggered. The function will be called after it stops being called for
		 *   N milliseconds. If `immediate` is passed, trigger the function on the
		 *   leading edge, instead of the trailing.
		 */
		var debounce = function(func, wait, immediate) {
			var timeout;
			return function executedFunction() {
				var context = this;
				var args = arguments;

				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};

				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};

		/****
		 *   Reset Search UI to the initial state
		 */
		var resetUI = function($SSDComponent) {
			$SSDComponent.find('.SearchSD__inputWrapper').show();
			$SSDComponent.find('.SearchSD_search_favoriteLink').hide();
			$SSDComponent.find('.SearchSD___goToFavorite').hide();
			$SSDComponent.find('.SearchSD__FavoriteCounter').hide();
			$SSDComponent.find('.SearchSD__FavoriteActions').hide();
			$SSDComponent.find('.SearchSD__FavoriteRemove').hide();
			$SSDComponent.find('.SearchSD__cloneWrapper').hide();
			$SSDComponent.find('.SearchSD__inputWrapper .SearchSD__return').hide();

			if ($SSDInputElement.val().trim() === '') {
				$SSDComponent.find('.SearchSD___remove').hide();
			}

			$SSDComponent.removeClass('showFavorite');
			$SSDComponent.removeClass('showClone');
		};

		/*
		 *
		 *  Go to Favorites UI
		 *  --  rest SSDcomponent
		 *  --  show Favorite features
		 *  --  remove class showClone if component have that class
		 *  --  add class showFavorite to have component control
		 *  --  addClass Open with slide
		 */
		var goToFavorites = function($SSDComponent) {
			resetUI($SSDComponent);

			$SSDComponent.find('.SearchSD___input input').val('');
			$SSDComponent.removeClass('Open');
			$SSDComponent.find('.SearchSD__return').hide();
			$SSDComponent.find('.SearchSD__inputWrapper').hide();
			if ($SSDComponent.hasClass('showClone')) {
				$SSDComponent.removeClass('showClone');
			}
			$SSDComponent.find('.SearchSD__FavoriteCounter').show();
			$SSDComponent.find('.SearchSD_search_favoriteLink ').show();
			$SSDComponent.find('.SearchSD__FavoriteRemove ').show();
			$SSDComponent.find('.SearchSD__FavoriteActions').show();
			$SSDComponent.addClass('showFavorite');
			$SSDComponent.find('.SelectSD.hasFavorite > a').focus();
			$SSDComponent.addClass('Open');

			// loading show hide list
			$SSDComponent.find('.SearchSD_contentList').hide();
			$SSDComponent.find('.SearchSD__loading').show();
			if ($SSDComponent.find('.SearchSD_showMore a').length > 0) {
				$SSDComponent.find('.SearchSD_showMore').hide();
			}
		};

		/**************
		 *
		 *  Go to Clone UI
		 *  --  remove class Open
		 *  -- Add ShowClone class
		 *  -- SlideDown effect and add Open Class
		 */
		var goToClone = function($SSDComponent) {
			// loading show hide list
			$SSDComponent.find('.SearchSD_contentList').hide();
			$SSDComponent.find('.SearchSD__loading').show();
			if ($SSDComponent.find('.SearchSD_showMore a').length > 0) {
				$SSDComponent.find('.SearchSD_showMore').hide();
			}

			$SSDComponent.find('.SearchSD___input input').val('');
			$SSDComponent.removeClass('Open');

			if (!$SSDComponent.hasClass('showClone')) {
				$SSDComponent.addClass('showClone');
			}
			$SSDComponent.addClass('Open');
		};

		/*
		 * Return to search from favorite or clone
		 */
		var returnToSearch = function($SSDComponent) {
			// loading show hide list
			$SSDComponent.find('.SearchSD_contentList').hide();
			$SSDComponent.find('.SearchSD__loading').show();
			if ($SSDComponent.find('.SearchSD_showMore a').length > 0) {
				$SSDComponent.find('.SearchSD_showMore').hide();
			}

			resetUI($SSDComponent);
			$SSDComponent.removeClass('showClone');
			$SSDComponent.removeClass('showFavorite');
			$SSDComponent.removeClass('Open');

			$SSDComponent.find('.SearchSD__inputWrapper .SearchSD__return').hide();

			if ($SSDComponent.hasClass('hasClone')) {
				$SSDComponent.addClass('hasClone');
				$SSDComponent.find('.SearchSD__cloneWrapper').show();
			}
			if ($SSDComponent.hasClass('hasFavorite')) {
				$SSDComponent.addClass('hasFavorite');
				$SSDComponent.find('.SearchSD_search_favoriteLink').show();
			}
		};

		/*
		 *   SSDClear closes SSDSearch container
		 *   and clear ssd filter input
		 */
		var ssdClear = function($SSDComponent) {
			$SSDComponent.removeClass('Open');
			$SSDComponent.find('.SearchSD___input input').val('');
		};

		/*
		 *   CloseSSD closes SSDSearch container
		 *   must remove hightlightSelection done by keyboard navigation
		 */
		var closeSSD = function($SSDComponent) {
			$SSDComponent.removeClass('Open');
			$SSDComponentContent.slideUp('250');
			$SSDComponent.find('.selected').removeClass('.selected');
		};

		/*
		 *   Add Open class to SSDComponent
		 *   if SSDComponent has class Open then focus
		 *   makes open effect, check the characters inside the input to filter
		 */
		var ssdFocus = function($SSDComponent) {
			if (!$SSDComponent.hasClass('Open')) {
				// loading show hide list
				$SSDComponent.find('.SearchSD_contentList').hide();
				$SSDComponent.find('.SearchSD__loading').show();
				if ($SSDComponent.find('.SearchSD_showMore a').length > 0) {
					$SSDComponent.find('.SearchSD_showMore').hide();
				}

				$SSDComponent.removeClass('Open');
				$SSDComponent.removeClass('.showClone');
				$SSDComponent.removeClass('.showFavorite');

				if (!$SSDComponent.hasClass('Open')) {
					$SSDComponent.find('.SearchLinkInput a').click();
					$SSDComponent.addClass('Open');
				}
			}
		};

		/*
		 *   When clicking clicking outside the component
		 *   the SSD must close and return to initial state
		 */
		var ClickOut = function(e, $SSDComponent) {
			if (!$SSDComponent.is(e.target) && $SSDComponent.has(e.target).length === 0) {
				returnToSearch($SSDComponent);
			}
		};

		/*
		 *   Triggers the link to initialize
		 *   the database search based on current length of the string inserted on the input
		 */
		var TriggerSearch = function($SSDComponent) {
			var currentWord = $SSDComponent.find('.SearchSD___input input').val();
			var currentCount = currentWord.length;
			if (currentCount >= letterLimit || currentCount === 0) {
				$SSDComponent.find('.SearchLinkInput > a').click();
			}
		};

		/*
		 *   Removes all favorite checked boxes
		 *   and ends MultipleSelect
		 */
		var MultiUncheck = function($SSDComponent) {
			$checkBoxes = $SSDComponent.parent().find('.SelectSD__multiple > input[type="checkbox"]');
			$SSDComponent.removeClass('MultiSelectActive');

			$SSDComponent
				.parent()
				.find('.SelectSD__multiple > input[type="checkbox"]')
				.each(function() {
					$(this).prop('checked', false);
				});
		};

		/*
		 *   KeyBoard events up down and enter if not filter
		 */
		var keyboardEvents = function(e, $SSDComponent) {
			if ($SSDComponent.hasClass('Open')) {
				var currentSelected = $SSDComponentContent.find('.ListRecords > span.selected'); // Current selectable item
				var $firstSelect = $SSDComponentContent.find('.ListRecords > span:first-child'); // First selectable item
				var $lastSelect = $SSDComponentContent.find('.ListRecords > span:last-child'); // Last selectable item
				var countSelected = currentSelected.length; // Number of selected item

				if (e.which == 38) {
					// if key pressed is up arrow
					if (countSelected === 0) {
						currentSelected = $lastSelect;
						$lastSelect.addClass('selected');
					} else {
						currentSelected.removeClass('selected');
						next = currentSelected.prev();

						if (next.length > 0) {
							currentSelected = next.addClass('selected');
						} else {
							currentSelected = currentSelected.last().addClass('selected');
						}
					}
				} else if (e.which == 40) {
					// if key pressed is down arrow
					if (countSelected === 0) {
						$firstSelect.addClass('selected');
					} else {
						next = currentSelected.next();
						currentSelected.removeClass('selected');

						if (next.length > 0) {
							currentSelected = next.addClass('selected');
						} else {
							currentSelected = currentSelected.eq(0).addClass('selected');
						}
					}
				} else if (e.which == 13) {
					// if key pressed is enter
					if (countSelected > 0) {
						e.preventDefault();
						currentSelected.find('.SelectSD .SelectSD_actionLink').click();
						return true;
					} else if ($SSDComponent.find('SearchSD___input input').is(':active') && countSelected === 0) {
						e.preventDefault();
						return true;
					}
				} else {
					executeSearch();
				}
			}
		};

		/*
		 *   The first step is to reset the seetings to default
		 */
		resetUI($SSDComponent);

		/*
		 *  Remove autoComplete from search input
		 */
		$SSDComponent.find('.SearchSD___input input').attr('autocomplete', 'off');

		/*
		 *   If SSD has Clone and the clone list is visible
		 *   onclick "Clone previous medication" then
		 *   remove Open and show items to clone list
		 */
		if (hasClone === 'True') {
			$SSDComponent.addClass('hasClone');
			$SSDComponent.find('.SearchSD__cloneWrapper').show();
		}

		if (hasFavorite === 'True') {
			$SSDComponent.addClass('hasFavorite');
			$SSDComponent.find('.SearchSD_search_favoriteLink').show();
		}

		if ((hasClone === 'True') & (showClones === 'True')) {
			$SSDComponent.find('.SearchSD_cloneWrapper').click(function() {
				$SSDComponent.addClass('Open');
			});
		}

		$SSDComponent.find('.SearchSD__FavoriteRemove').click(function() {
			ssdClear($SSDComponent);
			returnToSearch($SSDComponent);
			debounce(TriggerSearch($SSDComponent), 550);
			debounce($SSDComponent.find('.SearchSD___input input').focus(), 560);
		});

		$SSDComponent.find('.SearchSD__cloneWrapper').click(function() {
			goToClone($SSDComponent);
			$SSDComponent.find('.SearchSD___goToClone > a').click();
		});

		$SSDComponent.find('.SearchSD__inputWrapper').click(function() {
			if ($SSDComponent.hasClass('showClone')) {
				returnToSearch($SSDComponent);
			}
		});

		$SSDComponent.find('.SearchSD__FavoriteActionsCancel').click(function() {
			MultiUncheck($SSDComponent);
		});

		$SSDComponent.find('.SearchSD___input input').focus(function() {
			debounce(ssdFocus($SSDComponent), 600);
		});

		$('body').mouseup(function(e) {
			ClickOut(e, $SSDComponent);
		});
		/*
		 *   KeyBoard events on key press
		 */
		$SSDComponent
			.find('.SearchSD___input input')
			.add($SSDComponent.find('.SelectSD_actionLink'))
			.on('keyup', function(e) {
				if (!e.which != 13) {
					keyboardEvents(e, $SSDComponent);
				}

				if ($SSDInputElement.val().trim() === '') {
					$SSDClearButton.animate({ opacity: 'hide' }, 300);
				} else {
					$SSDClearButton.animate({ opacity: 'show' }, 300);
				}
			});

		/*
		 *   Prevent form submission on enter,
		 *   instead go to keyboard events to trigger
		 *   the selection
		 */
		$($SSDComponent).on('keydown', function(e) {
			if (e.which == 13) {
				keyboardEvents(e, $SSDComponent);
			}
		});

		$SSDComponent.find('.SearchSD___remove').click(function() {
			ssdClear($SSDComponent);
			debounce(returnToSearch($SSDComponent), 600);
		});

		$SSDComponent.find('.SearchSD_search_favoriteLink').click(function() {
			ssdClear($SSDComponent);
			goToFavorites($SSDComponent);
			$SSDComponent.find('.SearchSD___goToFavorite > a').click();
		});

		$SSDComponent.find('.SearchSD__FavoriteActionsAdd > a').click(function() {
			debounce(TriggerSearch($SSDComponent), 200);
			debounce(returnToSearch($SSDComponent), 350);
		});

		/*
		 *   On Ajax Request hide loading div if the SSD is open then show the
		 *   ListRecords
		 */
		osAjaxBackend.BindAfterAjaxRequest(function() {
			if ($SSDComponent.hasClass('Open')) {
				$SSDComponent.find('.SearchSD__loading').hide();
				$SSDComponentContent.slideDown('1000', function() {
					$SSDComponent.find('.SearchSD_contentList').show();
					if ($SSDComponent.find('.SearchSD_showMore a').length > 0) {
						$SSDComponent.find('.SearchSD_showMore').show();
					}
				});
			}
		});

		$('form').append('<input type="submit" name="ssdInput" onclick="return false;"  style="display:none;" />');

		window.SearchSelectDefine.SSDSearch = {
			returnToSearch: returnToSearch,
			resetUI: resetUI,
			closeSSD: closeSSD,
			ssdFocus: ssdFocus,
			TriggerSearch: TriggerSearch,
			ssdClear: ssdClear,
		};
	});
};
// Added to close the select list if we click the prescription Iframe;
window.addEventListener('DOMContentLoaded', event => {
	var rootElement = document.querySelector('body');
	rootElement.addEventListener(
		'click',
		function(event) {
			document.querySelector("iframe[src*='Prescriptions_CW']") &&
				document
					.querySelector("iframe[src*='Prescriptions_CW']")
					.contentWindow.document.addEventListener('click', e => {
						e.stopPropagation();
						document.querySelector('.SearchSD').classList.remove('Open');
						var allInput = document.querySelector('.SearchSD___input').children;
						for (const element in allInput) {
							return allInput[element].value != undefined ? (allInput[element].value = '') : null;
						}
					});
		},
		true
	);
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/searchable-client-side/scripts.js":
/*!*******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/searchable-client-side/scripts.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SearchClientSide */

(function ($, window, SapphireWidgets) {

  class SearchClientSide {

    constructor(config) {
      this.options = {
        ...config,
      };

      this.onComponentInit();

      $(window).load(() => {
        osAjaxBackend.BindAfterAjaxRequest(() => {
          setTimeout(() => {
            $('#' + this.options.inputId).trigger('change');
          }, 200);
        });
      });

    }

    onComponentInit() {
      $('#' + this.options.inputId).on('change keydown paste input', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        } else {
          this.searchClientSide(this.options.inputId, this.options.searchableElementSelector);
        }
      });
    }

    searchClientSide(inputId, selector) {
      if ($('#' + inputId).is(':visible')) {
        var searchText = osjs('#' + inputId).val().toLowerCase();
        var searchCounter = 0;
        var selecion = osjs(selector);
        selecion.removeClass('searchNotFound');
        selecion.removeClass('searchFound');
        selecion.unhighlight();
        if (searchText.length > 1) {
          selecion.each(function () {
            if (this.innerText.trim().toLowerCase().indexOf(searchText) > -1) {
              osjs(this).addClass('searchFound');
              searchCounter++;
              osjs(this).highlight(searchText);
            } else {
              osjs(this).addClass('searchNotFound');
            }
          });
        }
      }
    }

  }

  const create = config => (window[config.widgetId] = new SearchClientSide(config));

  SapphireWidgets.SearchClientSide = {
    create,
  };

})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/section-expandable-custom/scripts.js":
/*!**********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/section-expandable-custom/scripts.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SectionExpandable */
(function ($, window, SapphireWidgets) {

	function SectionExpandableCustom() {
		var that = this;

		// Object to save stats
		var previewstat = [];

		var transitionEvent = SilkUI.whichTransitionEvent();
		// set click events
		function clickEvents(ob) {
			// store querys in a single var
			var Section = $(ob).parent();
			var SectionContent = Section.children('.SectionExpandableCustom_content');

			// get id
			var id = Section.attr('id');

			var tempHeight = 0;

			// has class expanded
			if (Section.hasClass('expanded')) {
				// Calc and set a fixed height, during this process, transitions are disabled
				SectionContent.addClass('noTransition');
				SectionContent.height(SectionContent.height());
				SectionContent[0].offsetHeight; // hack to force a repaint
				SectionContent.removeClass('noTransition');

				// Collapse content
				SectionContent.height(0);
				Section.removeClass('expanded');
				SectionContent.css('overflow', 'hidden');

				// Remove class, set height and save state
				previewstat[id]['client'] = false;
			} else {
				// Calc and set a fixed height
				SectionContent.height('auto');
				tempHeight = SectionContent.height();
				SectionContent.height(0);
				SectionContent.height(tempHeight);
				SectionContent.css('overflow', 'hidden');

				// remove class, set height and save state
				Section.addClass('expanded');
				previewstat[id]['client'] = true;

				if ($('.Page').hasClass('ie8') || $('.Page').hasClass('ie9')) {
					SectionContent.height('auto');
					SectionContent.css('overflow', 'visible');
				}

				// add event transition end to overflow:visible for tooltips and dropdowns issues
				SectionContent.on(transitionEvent, function () {
					if (Section.hasClass('expanded')) {
						SectionContent.css('overflow', 'visible');
						SectionContent.addClass('noTransition');
						SectionContent.height('auto');
						SectionContent[0].offsetHeight; // hack to force a repaint
						SectionContent.removeClass('noTransition');
					}
				});
			}
		}

		// ajax refres function
		that.ajaxRefresh = function () {
			// remove click events
			$('.SectionExpandable_headerCustom').off();

			// add stop prepagation
			$('.SectionExpandable_headerCustom input, .SectionExpandable_headerCustom select, .SectionExpandable_headerCustom a').click(function (event) {
				event.stopPropagation();
			});

			// add new click events
			$('.SectionExpandable_headerCustom').on('click', function () {
				clickEvents(this);
			});

			// each all sections
			$('.SectionExpandableCustom').each(function () {
				// if new SectionExpandable then add to previewstat array
				if (previewstat[$(this).attr('id')] == null) {
					// add stat on array
					var stat = false;
					// if open
					if ($(this).hasClass('expanded')) {
						stat = true;
					}
					// add row
					previewstat[$(this).attr('id')] = {
						client: stat,
						server: stat,
					};
				}

				// curent state (ajax state x initial state)
				var curState = false;

				// check if start expandable
				if ($(this).hasClass('expanded')) {
					curState = true;
				}

				// check if ajax != initial server
				if (curState != previewstat[$(this).attr('id')]['server']) {
					// curstate
					previewstat[$(this).attr('id')]['client'] = curState;
					previewstat[$(this).attr('id')]['server'] = curState;
				} else {
					// has class expanded
					if (previewstat[$(this).attr('id')]['client'] == false && $(this).hasClass('expanded')) {
						$(this).removeClass('expanded');
						$(this)
							.children('.SectionExpandableCustom_content')
							.height(0);
					} else if (previewstat[$(this).attr('id')]['client'] == true && !$(this).hasClass('expanded')) {
						$(this).addClass('expanded');
					}
				}
			});
		};

		// set events
		that.init = function () {
			// each all sections to create array stat
			$('.SectionExpandableCustom').each(function () {
				// add stat on array
				var stat = false;

				// if open
				if ($(this).hasClass('expanded')) {
					stat = true;
				}

				// add row
				previewstat[$(this).attr('id')] = {
					client: stat,
					server: stat,
				};

				if ($(this).hasClass('HideWhenEmpty') && $(this).find('.SectionExpandableCustom_content').text().length === 0) {
					$(this).hide();
				}

				// hack to display a message when SectionExpandableCustom has no child items
				var isEmpty = true;
				$(this).find('.SectionExpandableCustom_content div, .SectionExpandableCustom_content span').not('.SectionExpandableCustom_content--empty').each(function () {
					if ($(this).text().length > 0) {
						isEmpty = false;
						return false;
					}
				});
				if (!isEmpty) {
					$(this).find('.SectionExpandableCustom_content--empty').css({
						display: 'none',
					});
				}



				var $expandableInstance = $(this);
				var $toggler = $(this).find('> .SectionExpandable_headerCustom .SectionExpandable-toggler');
				if ($toggler.length === 1) {
					var $togglerState = false;
					$toggler.find('[data-labelvalue]').text($toggler.find('[data-labelshow]').data('labelshow'));
					$toggler.off('click').on('click', function (evt) {
						evt.stopPropagation();
						$togglerState = !$togglerState;
						if ($togglerState) {
							$expandableInstance.find('.SectionExpandable-toggled').show();
							$toggler.find('[data-labelvalue]').text($toggler.find('[data-labelhide]').data('labelhide'));
						} else {
							$expandableInstance.find('.SectionExpandable-toggled').hide();
							$toggler.find('[data-labelvalue]').text($toggler.find('[data-labelshow]').data('labelshow'));
						}
					});
				}








			});

			// add click events
			$('.SectionExpandable_headerCustom').off("click").on('click', function () {
				clickEvents(this);
			});

			// add stop prepagation
			$('.SectionExpandable_headerCustom input, .SectionExpandable_headerCustom select, .SectionExpandable_headerCustom a').click(function (event) {
				event.stopPropagation();
			});

			// event ajax
			osAjaxBackend.BindAfterAjaxRequest(that.ajaxRefresh);
		};
	}

	const create = () => {
		SilkUI.SectionExpandable = new SectionExpandableCustom();
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on SilkUIFramework/Content/SectionExpandable');
	};

	SapphireWidgets.SectionExpandable = {
		create,
	};

})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/section-expandable-inside/scripts.js":
/*!**********************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/section-expandable-inside/scripts.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SectionExpandableInside */
(function($, window, SapphireWidgets) {
	function SectionExpandableInside() {
		var that = this;

		// Object to save stats
		var previewstat = [];

		var transitionEvent = SilkUI.whichTransitionEvent();
		// set click events
		function clickEvents(ob) {
			// store querys in a single var
			var Section = $(ob).parent();
			var SectionContent = Section.children('.SectionExpandableInside_content');

			// get id
			var id = Section.attr('id');

			var tempHeight = 0;

			// has class expanded
			if (Section.hasClass('expanded')) {
				// Calc and set a fixed height, during this process, transitions are disabled
				SectionContent.addClass('noTransition');
				SectionContent.height(SectionContent.height());
				SectionContent[0].offsetHeight; // hack to force a repaint
				SectionContent.removeClass('noTransition');

				// Collapse content
				SectionContent.height(0);
				Section.removeClass('expanded');
				SectionContent.css('overflow', 'hidden');

				// Remove class, set height and save state
				previewstat[id]['client'] = false;
			} else {
				// Calc and set a fixed height
				SectionContent.height('auto');
				// tempHeight = SectionContent.height();
				// SectionContent.height(0);
				// SectionContent.height(tempHeight);
				SectionContent.css('overflow', 'hidden');

				// remove class, set height and save state
				Section.addClass('expanded');
				previewstat[id]['client'] = true;

				// add event transition end to overflow:visible for tooltips and dropdowns issues
				SectionContent.on(transitionEvent, function() {
					if (Section.hasClass('expanded')) {
						SectionContent.css('overflow', 'visible');
						SectionContent.addClass('noTransition');
						SectionContent.height('auto');
						SectionContent[0].offsetHeight; // hack to force a repaint
						SectionContent.removeClass('noTransition');
					}
				});
			}
		}

		// ajax refres function
		that.ajaxRefresh = function() {
			// remove click events
			$('.SectionExpandableInside .SectionExpandableInside_header').off();

			// add stop prepagation
			$(
				'.SectionExpandableInside .SectionExpandableInside_header input, .SectionExpandableInside .SectionExpandableInside_header select, .SectionExpandableInside .SectionExpandableInside_header a'
			).click(function(event) {
				event.stopPropagation();
			});

			// add new click events
			$('.SectionExpandableInside .SectionExpandableInside_header').on('click', function() {
				clickEvents(this);
			});

			// each all sections
			$('.SectionExpandableInside').each(function() {
				// if new SectionExpandable then add to previewstat array
				if (previewstat[$(this).attr('id')] == null) {
					// add stat on array
					var stat = false;
					// if open
					if ($(this).hasClass('expanded')) {
						stat = true;
					}
					// add row
					previewstat[$(this).attr('id')] = { client: stat, server: stat };
				}

				// curent state (ajax state x initial state)
				var curState = false;

				// check if start expandable
				if ($(this).hasClass('expanded')) {
					curState = true;
				}

				// check if ajax != initial server
				if (curState != previewstat[$(this).attr('id')]['server']) {
					// curstate
					previewstat[$(this).attr('id')]['client'] = curState;
					previewstat[$(this).attr('id')]['server'] = curState;
				} else {
					// has class expanded
					if (previewstat[$(this).attr('id')]['client'] == false && $(this).hasClass('expanded')) {
						$(this).removeClass('expanded');
						$(this)
							.children('.SectionExpandableInside_content')
							.height(0);
					} else if (previewstat[$(this).attr('id')]['client'] == true && !$(this).hasClass('expanded')) {
						$(this).addClass('expanded');
					}
				}
			});
		};

		// set events
		that.init = function() {
			// each all sections to create array stat
			$('.SectionExpandableInside').each(function() {
				// add stat on array
				var stat = false;

				// if open
				if ($(this).hasClass('expanded')) {
					stat = true;
				}

				// add row
				previewstat[$(this).attr('id')] = { client: stat, server: stat };
			});

			// add click events
			$('.SectionExpandableInside .SectionExpandableInside_header')
				.off('click')
				.on('click', function() {
					clickEvents(this);
				});

			// add stop prepagation
			$(
				'.SectionExpandableInside .SectionExpandableInside_header input, .SectionExpandableInside .SectionExpandableInside_header select, .SectionExpandableInside .SectionExpandableInside_header a'
			).click(function(event) {
				event.stopPropagation();
			});

			// event ajax
			osAjaxBackend.BindAfterAjaxRequest(that.ajaxRefresh);
		};
	}

	const setOpenCloseClass = id => {
		id.click(function() {
			if (id.parent().hasClass('expanded')) {
				$(this)
					.find('.HeaderIcon')
					.removeClass('open');
				$(this)
					.find('.HeaderIcon')
					.addClass('closed');
			} else {
				$(this)
					.find('.HeaderIcon')
					.removeClass('closed');
				$(this)
					.find('.HeaderIcon')
					.addClass('open');
			}
		});
	};

	const create = () => {
		SilkUI.SectionExpandable = new SectionExpandableInside();
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on SilkUIFramework/Content/SectionExpandable');
	};

	SapphireWidgets.SectionExpandableInside = {
		create,
		setOpenCloseClass,
	};
})(jQuery, window, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/select-system/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/select-system/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SelectSystem */
SapphireWidgets.SelectSystem = config => {
	$(function() {
		var WidgetId = config.WidgetId; //Combo Box Id to be used.
		var Class = config.Class; //All Combo boxes with this class will be be transformed.
		var NoResultsText = config.NoResultsText; //Text to display when there are no results.
		var inputType = config.InpuType; //Options: FIlters, Dropdown, Select2
		var Prompt = config.Prompt; //Prompt in search
		var Select2Type = config.SelectType; // Type of select2 configuration
		var HasSearch = config.HasSearch; // has search
		var OnSelectingJS = config.OnSelectingJS;
		var OnUnSelectingJS = config.OnUnSelectingJS;
		var MaximumLength = config.MaximumLength;
		var SelectedValue = config.SelectedValue;
		var allowClear = config.allowClear;
		//  Select2 Ajax Configuration
		var AjaxURL = config.AjaxURL;
		var AjaxDelay = config.AjaxDelay;
		var PaginationSize = config.PaginationSize;
		var MinimumInputLenght = config.MinimumInputLenght;
		var SearchTerm = config.SearchTerm;
		var SearchExtraParam1 = config.SearchExtraParam1;
		var PageTerm = config.PageTerm;
		var AmountPage = config.PageAmount;
		var isMultiple = config.isMultiple;
		var Select2Options = {};
		var $WidgetIdentifier;

		if (config.locale === 'AR' || config.locale === 'FA') {
			Select2Options.dir = 'rtl';
		}

		Select2Options.theme = 'default SelectSystem';

		/*  
          Change select2 search display 
              -Multiple Select2 search UI like Single Select2
      */
		$.fn.select2.amd.define(
			'SearchLikeSingle',
			[
				'select2/utils',
				'select2/dropdown',
				'select2/dropdown/attachBody',
				'select2/dropdown/attachContainer',
				'select2/dropdown/search',
				'select2/dropdown/minimumResultsForSearch',
			],
			function(Utils, Dropdown, AttachBody, AttachContainer, Search, minimumResultsForSearch) {
				let dropdownSearch = Utils.Decorate(Dropdown, Search);
				dropdownSearch.prototype.render = function() {
					var $rendered = Dropdown.prototype.render.call(this);
					// Add ability for a placeholder in the search box
					let placeholder = this.options.get('placeholderForSearch') || '';
					var $search = $(
						'<span class="select2-search select2-search--dropdown">' +
							'<input class="select2-search__field" placeholder="' +
							placeholder +
							'" type="search"' +
							' tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off"' +
							' spellcheck="false" role="textbox" />' +
							'</span>'
					);

					this.$searchContainer = $search;
					this.$search = $search.find('input');
					$search.addClass('MultipleSelect');

					$rendered.prepend($search);
					$search.parent().addClass('MultipleSelect');
					return $rendered;
				};

				// Decorate the dropdown+search with the containers
				let adapter = Utils.Decorate(dropdownSearch, AttachContainer);
				adapter = Utils.Decorate(adapter, AttachBody);

				return adapter;
			}
		);

		/**
		 * Default Configuration needed to associate the widget to the select2 plugin
		 */
		if (WidgetId === '' && Class != '') {
			$WidgetIdentifier = $('.' + Class);
		} else {
			$WidgetIdentifier = $('#' + WidgetId);
		}
		Select2Options.containerCssClass = 'select-hide ' + inputType;

		//  Select2Options.dropdownParent= $('#'+ParentDiv);

		var formatResult = function(result) {
			var $selectedOptionsValue = $WidgetIdentifier.find(':selected');
			var selectedOptions = $selectedOptionsValue.length;
			var totalOptions = $WidgetIdentifier.find('option').length;
			var selectAllOpt = $WidgetIdentifier.find('option:first-child:selected').length;
			var activeValues = '';
			var allOptExceptAll = $WidgetIdentifier.find(':selected:not(".SelectedAll")').length;
			var $allOptExceptAllObj = $WidgetIdentifier.find(':selected:not(".SelectedAll")');

			if (selectedOptions === totalOptions) {
				if (totalOptions - 1 > 3) {
					return 'All Selected';
				} else {
					$allOptExceptAllObj.each(function() {
						activeValues = activeValues + ' ' + $(this)[0].innerText;
					});
					activeValues = activeValues.replace(/,\s*$/, '');
					return activeValues;
				}
			} else {
				var totalopt = totalOptions - 1;
				if (selectedOptions > 3) {
					return selectedOptions + ' of ' + totalopt + ' selected';
				} else {
					if (selectedOptions > 0) {
						$selectedOptionsValue.each(function() {
							activeValues = activeValues + ' ' + $(this)[0].innerText + ', ';
						});
						activeValues = activeValues.replace(/,\s*$/, '');
						return activeValues;
					} else {
						return 'Select an option';
					}
				}
			}
		};

		if (NoResultsText != '') {
			Select2Options.formatNoMatches = function() {
				return NoResultsText;
			};
		}

		if (inputType != '') {
			Select2Options.dropdownCssClass = inputType;
		}

		if (allowClear === 'True') {
			Select2Options.allowClear = true;
		}

		if (MaximumLength != '') {
			Select2Options.maximumInputLength = MaximumLength;
		}

		if (Prompt != '') {
			Select2Options.placeholder = Prompt;
		} else {
			Select2Options.placeholder = {
				id: '-1', // the value of the option
				text: 'Select an option',
			};
		}

		if (Select2Type === '3') {
			// Select2 Ajax
			Select2Options = {};

			if (config.locale === 'AR' || config.locale === 'FA') {
				Select2Options.dir = 'rtl';
			}

			Select2Options.allowClear = false;

			Select2Options.templateSelection = function(repo) {
				if (!repo.element) {
					return Prompt;
				}

				return repo.full_name || repo.text;
			};

			Select2Options.templateResult = function(repo) {
				if (repo.loading) {
					return repo.text;
				}
				var markup = '<div class=""Clearfix"">' + '<div class=""ThemeGrid_Width12"">' + repo.text + '</div>';
				if (repo.description) {
					markup += '<div class=""OSAutoMarginTop"">' + repo.description + '</div>';
				}
				markup += '</div>';
				return markup;
			};

			(Select2Options.ajax = {
				url: AjaxURL,
				dataType: 'json',
				delay: AjaxDelay,
				data: function(params) {
					var Select2AjaxOpt = {};
					var SplitParameter = SearchExtraParam1.split(',');
					Select2AjaxOpt.SearchParameter = params.term;
					Select2AjaxOpt.Page = params.page || 1;
					Select2AjaxOpt.PageAmount = AmountPage;

					SplitParameter.forEach(function(el) {
						var splitText = el.split(':');
						Select2AjaxOpt[splitText[0]] = splitText[1];
					});

					return Select2AjaxOpt;
				},
				processResults: function(data, params) {
					params.page = params.page || 1;

					return {
						results: data.items,
						pagination: {
							more: params.page * PaginationSize < data.total_count,
						},
					};
				},
				cache: true,
			}),
				(Select2Options.minimumInputLength = MinimumInputLenght);

			Select2Options.escapeMarkup = function(markup) {
				return markup;
			};

			if (config.isMultiple) {
				Select2Options.multiple = true;
				Select2Options.containerCssClass = 'Select2Ajax Multiple';
				Select2Options.dropdownCssClass = 'Select2Ajax Multiple';
			} else {
				Select2Options.multiple = false;
				Select2Options.containerCssClass = 'Select2Ajax';
				Select2Options.dropdownCssClass = 'Select2Ajax';
			}

			if (SelectedValue !== '') {
				try {
					const data = JSON.parse(SelectedValue);
					const option = new Option(data.Value, data.Id, true, true);

					$WidgetIdentifier.append(option).trigger('change');
				} catch (error) {
					console.error(`Component SelectSystem (${WidgetId}): SelectedValue must be a valid JSON!`);
				}
			}

			Select2Options.minimumResultsForSearch = 0;
			Select2Options.tags = config.HasTags;
			Select2Options.closeOnselect = true;
		}

		if (Select2Type === '2') {
			//Select2 with CheckBox

			var isAllSelected = false;
			if ($WidgetIdentifier[0].options.length === $WidgetIdentifier[0].selectedOptions.length) {
				isAllSelected = true;
			}

			if (WidgetId != '') {
				option = new Option('Select All', 'All', true, isAllSelected);
				$WidgetIdentifier.prepend(option);
				$WidgetIdentifier.find('option:first-child').addClass('SelectedAll');
			}
			Select2Options.multiple = true;
			Select2Options.closeOnSelect = false;
			Select2Options.allowHtml = false;
			Select2Options.tags = false;

			if (HasSearch === 'True') {
				Select2Options.dropdownAdapter = $.fn.select2.amd.require('SearchLikeSingle');
			} else {
				Select2Options.minimumResultsForSearch = -1;
			}

			Select2Options.containerCssClass = 'MultipleSelect';
			Select2Options.dropdownCssClass = 'MultipleSelect';
			Select2Options.templateSelection = formatResult;
		}

		if (Select2Type === '6') {
			// Select2 HtmlOptions
			Select2Options = {};
			if (config.locale === 'AR' || config.locale === 'FA') {
				Select2Options.dir = 'rtl';
			}

			var dataHtmlOption = [];
			$WidgetIdentifier.find('option').each(function(key, value) {
				var optionObject = {
					id: $(this).val(),
					text: $(this).text(),
					html: $(this).text(),
				};
				dataHtmlOption.push(optionObject);
			});

			Select2Options.containerCssClass = 'customSelect';
			Select2Options.dropdownCssClass = 'dropdownCustom';
			Select2Options.data = dataHtmlOption;
			Select2Options.escapeMarkup = function(markup) {
				return markup;
			};

			if (SelectedValue != '') {
				$WidgetIdentifier.val(SelectedValue).trigger('change');
			} else {
				$WidgetIdentifier.val('').trigger('change');
			}
		}

		if (Select2Type === '1') {
			// Select2 TagCustom
			Select2Options.tags = true;
			Select2Options.containerCssClass = 'tagCustom';
			Select2Options.dropdownCssClass = 'tagCustom';
			Select2Options.TokenSeparatos = [',', ' '];
			Select2Options.createSearchChoice = function(term, data) {
				if (
					$(data).filter(function() {
						return this.text.localeCompare(term) === 0;
					}).length === 0
				) {
					return {
						id: term,
						text: term,
					};
				}
			};
		}

		if (Select2Type === '5') {
			// Select2 TagMultiple
			Select2Options.tags = true;
			Select2Options.containerCssClass = 'tagSystem';
			Select2Options.dropdownCssClass = 'tagSystem';
			Select2Options.createTag = function(params) {
				var term = $.trim(params.term);
				if (term === '') {
					return null;
				}
				return {
					id: '#' + term,
					text: term,
					newTag: true, // add additional parameters
				};
			};
		}

		if (HasSearch === 'False') {
			Select2Options.minimumResultsForSearch = -1;
		}

		if (OnUnSelectingJS != '' || OnSelectingJS != '') {
			$WidgetIdentifier
				.select2(Select2Options)
				.on('select2:unselecting', function(e) {
					$(this).data('unselecting', true);
					OnUnSelectingJS;
				})
				.on('select:selecting', function(e) {
					OnSelectingJS;
				})
				.on('select:opening', function(e) {
					if ($(this).data('unselecting')) {
						$(this).removeData('unselecting');
						e.preventDefault();
					}
				})
				.on('select:open', function(evt) {
					evt.preventDefault();
				})
				.on('select2:close', function(evt) {
					evt.preventDefault();
				});
		} else {
			if (Select2Type === '2') {
				$WidgetIdentifier.select2(Select2Options);
				var idwidget = '#' + WidgetId;

				$WidgetIdentifier.on('select2:select', function(e) {
					UnselectedId = e.params.data.id;
					if (UnselectedId === 'All') {
						var selectedItems = [];
						var allOptions = $(idwidget + ' option');
						allOptions.each(function() {
							selectedItems.push($(this).val());
						});
						$WidgetIdentifier.select2('destroy');
						$WidgetIdentifier.val(selectedItems).trigger('change');
						$WidgetIdentifier.select2(Select2Options);
						$WidgetIdentifier.select2('open');
					} else {
						var selectedOptions = $WidgetIdentifier.find('option:selected').length;
						var totalOptions = $WidgetIdentifier.find('option').length;
						if (selectedOptions === totalOptions - 1 && $(idwidget + ' >  option:selected:first-child').length === 0) {
							var selectedItems = [];
							var allOptions = $(idwidget + ' option');
							allOptions.each(function() {
								selectedItems.push($(this).val());
							});
							$WidgetIdentifier.select2('destroy');
							$WidgetIdentifier.val(selectedItems).trigger('change');
							$WidgetIdentifier.select2(Select2Options);
							$WidgetIdentifier.select2('open');
						}
					}
				});

				$WidgetIdentifier.on('select2:unselect', function(e) {
					UnselectedId = e.params.data.id;
					if (UnselectedId === 'All') {
						$(idwidget + ' > option').removeAttr('selected');
						$WidgetIdentifier.select2('destroy');
						$WidgetIdentifier.select2(Select2Options);
						$WidgetIdentifier.select2('open');
						$(idwidget)
							.val('')
							.trigger('change');
						//$(idwidget +' > option').attr('selected', "selected");
					} else {
						$(idwidget + ' > option:first-child').removeAttr('selected');
						$WidgetIdentifier.select2(Select2Options);
						$WidgetIdentifier.select2('open');
					}
				});
			} else {
				$WidgetIdentifier.select2(Select2Options);
			}
		}
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/shift-container/scripts.js":
/*!************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/shift-container/scripts.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ShiftContainer */
(function ($, window, document, SapphireWidgets) {

	let shiftTimelineResizeTimer;
	let $shiftContainerId = $();

	const create = shiftContainerId => {

		// $('.ShiftCard_timeLine').css('visibility', 'hidden');

		$('.ShiftExpandable_container .ActionsMenu ').css('display', 'none');

		$shiftContainerId = $(shiftContainerId);

		hasScrollBar();
		handleShiftTable();

		// setTimeout(function () {
		// 	$('.ShiftCard_timeLine').css('visibility', 'visible');
		// 	$('.ShiftExpandable_container .ActionsMenu ').css('display', 'block');
		// }, 1500);

		$('.ShiftExpandable__arrow').off('mousedown').on('mousedown', function () {
			setTimeout(function () {
				redrawShiftTimeline();
			}, 1500);
		});

	};

	const handleShiftTable = () => {
		$('.ShiftExpandable').each(function (index, el) {
			var $elFlag = $(this).parent().find('.FlagLine');
			var $elFlagTime = $(this).parent().find('.FlagLine_time');
			var $columnFlag = $elFlag.data('column');
			var $minutesFlag = $elFlag.data('minutes');
			var $slots = $(this).closest('.ShiftContainer').find('.ShiftContainer_header').find('.ShiftCellContent');
			var $slotWidth = Math.round($slots.eq(0).width());
			var minutesPosition = ($minutesFlag * $slotWidth) / 60;

			// handle current time flog horizontal positioning
			var slotsPosition = [];
			$slots.each(function (index, el) {
				slotsPosition.push($(this).position().left);
			});
			$elFlag.css('left', slotsPosition[$columnFlag - 1] + minutesPosition);
			$elFlag.css('display', 'block');
			if ($columnFlag === $slots.length) {
				$elFlagTime.css({
					right: '1px',
					left: 'auto',
				});
			}

			// handle cells that might span over several slots
			$(this).find('.ShiftCard').each(function (index, elRow) {
				var rowHasSpannedCell = false;
				$(elRow).find('.ShiftCellContent').each(function (index, elCell) {
					var colspan = $(elCell).data('colspan');
					if (colspan === slotsPosition.length || rowHasSpannedCell) {
						$(elCell).css({
							display: 'inline-block',
							flex: '1 1 auto',
						});
					} else if (colspan > 1) {
						rowHasSpannedCell = true;
						$(elCell).css({
							display: 'inline-block',
							flex: 'none',
							width: +(slotsPosition[colspan] - slotsPosition[0]) + 'px',
						});
					}
				});
			});

			// handle horizontal scroll behavior
			if (el.scrollWidth > el.clientWidth) {
				$(el).width(el.scrollWidth);
				$(this).closest('.ShiftContainer').find('.ShiftContainer_header').width(el.scrollWidth);
			} else {
				$(el).width('auto');
				$(this).closest('.ShiftContainer').find('.ShiftContainer_header').width('auto');
			}
		});
	};

	const hasScrollBar = () => {
		var $ScrollableDiv = $shiftContainerId.find('.ShiftExpandable_container');
		if ($shiftContainerId.find('.ShiftExpandable_container').length > 0) {
			if ($ScrollableDiv.get(0).scrollHeight > $ScrollableDiv.height()) {
				var $lastCell = $shiftContainerId.find('.IsTimer:last-child');
				$lastCell.css('padding-right', '7px');
			}
		}
	};

	const redrawShiftTimeline = () => {
		clearTimeout(shiftTimelineResizeTimer);
		shiftTimelineResizeTimer = setTimeout(function () {
			hasScrollBar();
			handleShiftTable();
		}, 400);
	};

	const checkScroll = () => {
		var hContent = $('.Content').height();
		var hWindow = $(window).height();

		if (hContent > hWindow) redrawShiftTimeline();
	};

	SapphireWidgets.ShiftContainer = {
		create,
		checkScroll,
		redrawShiftTimeline
	};
})(jQuery, window, document, SapphireWidgets);


$(window).off('resize.GenericGallery').on('resize.GenericGallery', function () {

	$('.ShiftCard_timeLine').css('visibility', 'hidden');
	$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');

	SapphireWidgets.ShiftContainer.redrawShiftTimeline();

	osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.ShiftContainer.redrawShiftTimeline);

	setTimeout(SapphireWidgets.ShiftContainer.checkScroll, 1000);

	setTimeout(function () {
		$('.ShiftCard_timeLine').css('visibility', 'visible');
		$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
	}, 1500);

});

$(window).load(function () {
	if (!!$('.ShiftContainer').length) {

		$('.ShiftCard_timeLine').css('visibility', 'hidden');
		$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');

		setTimeout(function () {
			SapphireWidgets.ShiftContainer.redrawShiftTimeline();
		}, 400);

		setTimeout(SapphireWidgets.ShiftContainer.checkScroll, 500);

		setTimeout(function () {
			$('.ShiftCard_timeLine').css('visibility', 'visible');
			$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
		}, 600);

		$('.navigation-control-item').off('click').on('click', function () {
			$('.ShiftCard_timeLine').css('visibility', 'hidden');
			$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');
		});

		//Verify the scroll if tooltip opened
		$('.ShiftExpandable_container').on('scroll', function () {
			if ($('.tooltipster-base').is(':visible')) {
				$('.tooltipster-base').css('visibility', 'hidden');
			}
		});

		osAjaxBackend.BindAfterAjaxRequest(function () {

			setTimeout(function () {
				SapphireWidgets.ShiftContainer.redrawShiftTimeline();
			}, 400);

			setTimeout(SapphireWidgets.ShiftContainer.checkScroll, 500);

			setTimeout(function () {
				$('.ShiftCard_timeLine').css('visibility', 'visible');
				$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
			}, 600);

			// SapphireWidgets.ShiftContainer.redrawShiftTimeline;

		});

	}
});

/***/ }),

/***/ "./src/components/05-components/v3-pat/side-menu/scripts.js":
/*!******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/side-menu/scripts.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SideMenuStructure */
(function ($, window, SapphireWidgets) {
	class SideMenu {
		constructor(config) {
			this.options = {
				...config
			};

			this.onComponentInit();
		}

		setMainMenuWidth() {
			$(document).ready(() => {
				const $sideBarIframe = $('.LayoutBase-iframesidebar.notExpandable');
				const $layoutHasTabs = $('.LayoutBase--withTabs');

				if ($sideBarIframe.length && !$layoutHasTabs.length) {
					const $mainMenu = $('.LayoutBase-MainMenu');
					$mainMenu.css({
						width: 'calc(100% - 262px)'
					});
				}
			});
		}

		openCloseMenu(toOpen) {
			if (toOpen) {
				this.$component.addClass('SideMenu--open');

				$('.LayoutBase-iframesidebar').css({
					zIndex: 0
				});
			} else {
				this.$component.removeClass('SideMenu--open');

				$('.LayoutBase-iframesidebar').css({
					zIndex: 70
				});
			}
		}

		onComponentInit() {
			this.setMainMenuWidth();

			this.$component = $(`#${this.options.widgetId}`);
			this.$trigger = this.$component.find('.SideMenu__Trigger');
			this.$shield = this.$component.find('.SideMenu__Shield');
			this.$closeButton = this.$component.find('.SideMenu__MenuClose');
			this.$tabItem = this.$component.find('.SideMenu__TabItems .MenuItem');
			this.$menuItem = this.$component.find('.SideMenu__MenuItems .MenuItem');
			this.$subItem = this.$component.find('.SideMenu__MenuItems .MenuItem_subItems');


			this.$iframeContainer = this.$component.find('.iframeContainer');
			this.$iframeContainer.append('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
			this.$iframeContainer.find('iframe').load(() => {
				this.$iframeContainer.find('.lds-ring').fadeOut();
			});


			this.$trigger.on('click', () => this.openCloseMenu(true));
			this.$shield.on('click', () => this.openCloseMenu(false));
			this.$closeButton.on('click', () => this.openCloseMenu(false));

			this.$tabItem.on('click', event => {
				const $target = $(event.currentTarget);
				const $link = $target.find('.MenuItem_label a');

				if ($link.length) $link.get(0).click();
			});

			this.$menuItem.on('click', event => {
				if (event.target !== event.currentTarget) return;

				const $target = $(event.currentTarget);
				const $subItems = $target.find('.MenuItem_subItems');
				const $link = $target.find('.MenuItem_label a');

				if ($link.length) $link.get(0).click();

				this.$component
					.find('.SideMenu__MenuItems .active')
					.not($target)
					.removeClass('active');

				this.$component
					.find('.SideMenu__MenuItems .show')
					.not($target)
					.removeClass('show');

				$target.toggleClass('active');
				$subItems.toggleClass('show');
			});

			this.$subItem.on('click', event => event.stopPropagation());

			this.$component
				.find('.SideMenu__TabItems > div:empty')
				.parent()
				.hide();
		}
	}

	const create = config => (window[config.widgetId] = new SideMenu(config));

	SapphireWidgets.SideMenu = {
		create
	};

})(jQuery, window, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/sidebar/sidebar-structure.js":
/*!**************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/sidebar/sidebar-structure.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component ISidebar */
(function ($, window, document, SapphireWidgets) {
	var create = function (config) {
		window[config.widgetId] = new Sidebar(config);
		SapphireWidgets.Sidebar.widgetId = config.widgetId;
	};

	var close = function () {
		window[SapphireWidgets.Sidebar.widgetId].close();
	};

	var Sidebar = function (config) {
		var _this = this;
		this.isExpandable = config.isExpandable;
		this.$widget = $('#' + config.widgetId);
		this.$sidebar = this.$widget.find('.ISidebar');
		this.$sidebarMenu = this.$widget.find('.ISidebar-menu');
		this.$sidebarMenuItem = this.$widget.find('.SidebarMenuItem');
		this.$sidebarShield = this.$widget.find('.ISidebar-shield');
		this.$sidebarContent = this.$widget.find('.ISidebar-content');
		this.$sidebarContent.find('> div').each(function () {
			if ($(this).hasClass('PH') && $(this).text() === '') {
				$(this).remove();
			}
		});
		this.attachEvents();
		if (!this.isExpandable) {
			this.openMenuItem(0);
		}
		$(function () {
			window.parent.$('.LayoutBase-iframesidebar .lds-ring').fadeOut();
			if (!this.isExpandable) {
				$('input[type="text"]:visible').eq(0).focus();
			}
		});
		$(window).unload(function () {
			window.parent.$('.LayoutBase-iframesidebar .lds-ring').fadeOut();
		});
	};

	Sidebar.prototype.attachEvents = function () {
		var _this = this;
		this.$sidebarMenu.on('click', function (evt) {
			evt.stopPropagation();
			if (!_this.$sidebar.hasClass('open')) {
				_this.openMenuItem(0);
			}
		});
		this.$sidebarMenuItem.on('click', function () {
			var selectedPosition = $(this).index();
			_this.openMenuItem(selectedPosition);
		});
		this.$sidebarShield.on('click', function () {
			_this.close();
		});
		this.$sidebar.on('click', '.SearchSideBarFields .ButtonGroup_button:first-child', function () {
			_this.$sidebar.find('.FieldsSlider').addClass('Tab1').removeClass('Tab2');
			_this.setFieldFocus(_this.$sidebarContent.find('.TextInput:visible').eq(0));
		});
		this.$sidebar.on('click', '.SearchSideBarFields .ButtonGroup_button:last-child', function () {
			_this.$sidebar.find('.FieldsSlider').addClass('Tab2').removeClass('Tab1');
			_this.setFieldFocus(_this.$sidebarContent.find('.TextInput:visible').eq(0));
		});
	};

	Sidebar.prototype.openMenuItem = function (selectedPosition) {
		var _this = this;
		this.$sidebar.find('.SidebarMenuItem').removeClass('active').eq(selectedPosition).addClass('active');
		this.$sidebar.find('.ISidebar-content > .ISidebar-content-panel').hide().eq(selectedPosition).show();
		this.$sidebar.addClass('open');
		if (window.parent.length && this.isExpandable) {
			window.parent.SapphireWidgets.LayoutBase.openSidebarIframe(0);
		}
		if (this.$sidebarContent.find('.TextInput:visible').length > 0) {
			this.setFieldFocus(this.$sidebarContent.find('.TextInput:visible').eq(0));
		}
		if (window.parent.$('.select2-container--open').length) {
			window.parent.$('.select2-hidden-accessible').select2('close');
		}
	};

	Sidebar.prototype.setFieldFocus = function ($input) {
		window.setTimeout(function () {
			$input.click().select();
		}, 250);
	};

	Sidebar.prototype.close = function () {
		var _this = this;
		if (window.parent.length) {
			window.parent.SapphireWidgets.LayoutBase.closeSidebarIframe(0);
		}
		if (this.isExpandable) {
			this.$sidebar.removeClass('open');
			this.$sidebar.find('.SidebarMenuItem').removeClass('active');
			this.$sidebar.find('.ISidebar-content > .ISidebar-content-panel').hide();
		}
	};

	SapphireWidgets.Sidebar = {
		create: create,
		close: close,
	};
})(jQuery, window, document, SapphireWidgets);

/***/ }),

/***/ "./src/components/05-components/v3-pat/spinner-horizontal/scripts.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/spinner-horizontal/scripts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SpinnerHorizontal */
SapphireWidgets.SpinnerHorizontal = {
	create: config => {
		const $input = $(`#${config.widgetId} input`);

		$input.on('input', function() {
			const val = Math.abs(parseInt(this.value, 10) || +config.minValue);
			this.value = val > +config.maxValue ? +config.maxValue : val;
		});
	},
	increment: function(elementId, minValue, maxValue, triggerOnChange) {
		var _element = $(elementId)
			.find('input[type="number"]')
			.first();
		if (_element.val() == undefined || _element.val() == '' || isNaN(parseFloat(_element.val()))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
		} else {
			if (parseFloat(_element.val()) < maxValue) {
				_element.val(parseFloat(_element.val()) + 1);
				if (triggerOnChange) {
					_element.trigger('change');
				}
				$(elementId)
					.find('a.Minus')
					.removeAttr('disabled');
			}
			if (parseFloat(_element.val()) >= maxValue) {
				$(elementId)
					.find('a.Plus')
					.attr('disabled', 'disabled');
			}
		}
	},
	decrement: function(elementId, minValue, triggerOnChange) {
		var _element = $(elementId)
			.find('input[type="number"]')
			.first();
		if (_element.val() == undefined || _element.val() == '' || isNaN(parseFloat(_element.val()))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
		} else {
			if (parseFloat(_element.val()) > minValue) {
				_element.val(parseFloat(_element.val()) - 1);
				if (triggerOnChange) {
					_element.trigger('change');
				}
				$(elementId)
					.find('a.Plus')
					.removeAttr('disabled');
			}
			if (parseFloat(_element.val()) <= minValue) {
				$(elementId)
					.find('a.Minus')
					.attr('disabled', 'disabled');
			}
		}
	},
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/spinner-vertical/scripts.js":
/*!*************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/spinner-vertical/scripts.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SpinnerVertical */
(function($, window, document, SapphireWidgets) {
	const create = function(config) {
		$(document).ready(function() {
			const $minusVertical = $(`#${config.widgetId}`).find('.MinusVertical');
			const $inputSpinner = $(`#${config.widgetId} .SpinnerInputVertical input`);

			$inputSpinner.on('blur keyup input', function(event) {
				const currentInputValue = $inputSpinner.val();

				if (config.numberList && event.type === 'blur') {
					const inputValueInt = parseInt(currentInputValue);
					const arrayToSpin = config.numberList;
					const $errorMessage = $(`#${config.widgetId} .SpinnerErrorMessage`);

					$errorMessage.css('display', arrayToSpin.indexOf(inputValueInt) === -1 ? 'block' : 'none');
				}

				if (currentInputValue < config.minValue) $minusVertical.addClass('DisabledSpin');
				else $minusVertical.removeClass('DisabledSpin');
			});

			if ($inputSpinner.val() <= config.minValue) {
				$minusVertical.addClass('DisabledSpin');
			}

			if (config.numberList && $inputSpinner.val() === '') {
				let currentNumber = 0;
				const arrayToSpin = config.numberList.split(',');

				$inputSpinner.val(arrayToSpin[currentNumber]);
				$minusVertical.addClass('DisabledSpin');
			}

			if (config.isCursorOnFocus) {
				$('body').on('focus', `#${config.inputID} input`, function() {
					var that = this;

					setTimeout(function() {
						that.focus();
						var val = that.value;
						that.value = '';
						that.value = val;
					}, 1);
				});
			}

			if (config.isInputEmpty) {
				$inputSpinner.attr('value', '');
				$minusVertical.addClass('DisabledSpin');
			}
		});
	};

	const increment = (elementId, minValue, maxValue, triggerOnChange, triggerOnInput, listTospin = []) => {
		const $spinner = $(elementId);
		let $input = $spinner.find('input[type="text"], input[type="number"]').first();

		var forceInteger = $(elementId).data('forceinteger') === 'True' ? true : false;
		var currentValue = parseFloat($input.val());
		var incrementUnit = 1;
		var isDecimals = currentValue % 1 != 0;
		var arraytospin = listTospin;

		const $minusVertical = $(elementId).find('.MinusVertical');
		const $plusVertical = $(elementId).find('.PlusVertical');

		$minusVertical.removeClass('DisabledSpin');

		if (arraytospin.length) {
			var currentPosition = arraytospin.indexOf(parseInt($input.val()));
			var maximumToSpin = arraytospin.lastIndexOf(arraytospin.slice(-1)[0]);

			$plusVertical.removeClass('DisabledSpin');

			if (maximumToSpin - 1 === currentPosition) {
				currentPosition = currentPosition + 1;
				$input.val(arraytospin[currentPosition]);

				if (triggerOnChange) $input.trigger('change');
				if (triggerOnInput) $input.trigger('input');
			} else if (maximumToSpin === currentPosition) {
				currentPosition = currentPosition % maximumToSpin;
				$input.val(arraytospin[currentPosition]);

				triggerEvents($input, triggerOnChange, triggerOnInput);
			} else {
				currentPosition = (currentPosition + 1) % maximumToSpin;
				$input.val(arraytospin[currentPosition]);

				triggerEvents($input, triggerOnChange, triggerOnInput);
			}

			if (currentPosition === maximumToSpin) $plusVertical.addClass('DisabledSpin');
			if (currentPosition === 0) $minusVertical.addClass('DisabledSpin');

			$spinner.find('.SpinnerErrorMessage').css('display', 'none');
		} else {
			if (parseFloat(currentValue) < minValue) {
				$minusVertical.addClass('DisabledSpin');
			} else {
				$minusVertical.removeClass('DisabledSpin');
			}

			if (!forceInteger && isDecimals) incrementUnit = parseFloat(0.1);

			if (currentValue === undefined || currentValue === '' || isNaN(parseFloat(currentValue))) {
				$input.val(minValue);

				triggerEvents($input, triggerOnChange, triggerOnInput);
			} else {
				if (parseFloat(currentValue) < maxValue) {
					if (currentValue === 0 && !forceInteger) incrementUnit = parseFloat(0.1);

					$input.val(parseFloat((currentValue + incrementUnit).toFixed(1)));

					triggerEvents($input, triggerOnChange, triggerOnInput);

					$minusVertical.removeAttr('disabled');
				} else {
					$plusVertical.attr('disabled', 'disabled');
				}
			}

			checkDisabledStatus(elementId, parseFloat($input.val()), minValue, maxValue);
		}
	};

	const decrement = (elementId, minValue, maxValue, triggerOnChange, triggerOnInput, listTospin = []) => {
		const $spinner = $(elementId);
		const $input = $spinner.find('input[type="text"], input[type="number"]').first();

		let forceInteger = $(elementId).data('forceinteger') === 'True' ? true : false;
		let currentValue = parseFloat($input.val());
		let incrementUnit = 1;
		let isDecimals = currentValue % 1 != 0;
		let arraytospin = listTospin;

		const $minusVertical = $(elementId).find('.MinusVertical');
		const $plusVertical = $(elementId).find('.PlusVertical');

		if (arraytospin.length) {
			let currentPosition = arraytospin.indexOf(parseInt($input.val()));
			let maximumToSpin = arraytospin.lastIndexOf(arraytospin.slice(-1)[0]);

			currentPosition = (maximumToSpin + currentPosition - 1) % maximumToSpin;

			$plusVertical.removeClass('DisabledSpin');

			if (currentPosition == 0) {
				$minusVertical.addClass('DisabledSpin');
				$input.val(arraytospin[0]);

				triggerEvents($input, triggerOnChange, triggerOnInput);
			} else {
				$minusVertical.removeClass('DisabledSpin');
				$input.val(arraytospin[currentPosition]);

				triggerEvents($input, triggerOnChange, triggerOnInput);
			}

			$spinner.find('.SpinnerErrorMessage').css('display', 'none');
		} else {
			if (!forceInteger && isDecimals) incrementUnit = parseFloat(0.1);

			if (currentValue === undefined || currentValue === '' || isNaN(parseFloat(currentValue))) {
				$input.val(minValue);

				triggerEvents($input, triggerOnChange, triggerOnInput);
			} else {
				if (parseFloat(currentValue) > minValue) {
					if (currentValue === 1 && !forceInteger) incrementUnit = parseFloat(0.1);

					$input.val(parseFloat((currentValue - incrementUnit).toFixed(1)));

					triggerEvents($input, triggerOnChange, triggerOnInput);

					$plusVertical.removeAttr('disabled');
				} else {
					$minusVertical.attr('disabled', 'disabled');
				}
			}

			checkDisabledStatus(elementId, parseFloat($input.val()), minValue, maxValue);
		}
	};

	const triggerEvents = (input, triggerOnChange, triggerOnInput) => {
		if (triggerOnChange) input.trigger('change');
		if (triggerOnInput) input.trigger('input');
	};

	const checkDisabledStatus = (elementId, valueToCheck, minValue, maxValue) => {
		if (valueToCheck <= minValue) {
			$(elementId)
				.find('a.MinusVertical')
				.attr('disabled', 'disabled');
		} else {
			$(elementId)
				.find('a.MinusVertical')
				.removeAttr('disabled');
		}
		if (valueToCheck >= maxValue) {
			$(elementId)
				.find('a.PlusVertical')
				.attr('disabled', 'disabled');
		} else {
			$(elementId)
				.find('a.PlusVertical')
				.removeAttr('disabled');
		}
	};

	SapphireWidgets.SpinnerVertical = {
		create,
		increment,
		decrement,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/split-button/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/split-button/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SplitButton */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		window[config.widgetId] = new SplitButton(config);
	};

	var SplitButton = function(config) {
		var _this = this;
		this.config = config;
		this.$widget = $('#' + this.config.widgetId);
		this.$button = this.$widget.find('.SplitButton-button');
		this.$buttonLink = this.$button.find('> a');
		this.$trigger = this.$widget.find('.SplitButton-trigger');
		this.$actions = this.$widget.find('.SplitButton-actions');
		if (!!this.$actions.text()) {
			this.$widget.find('> .SplitButton').addClass('hasTrigger');
			this.buildActionsTrigger();
		}
	};

	SplitButton.prototype.buildActionsTrigger = function() {
		var _this = this;
		var classList = this.$buttonLink[0].classList.value;
		this.$trigger.addClass(classList);
		$(function() {
			// inside a document ready due to sapphire popup binded events
			if (!_this.$trigger.hasClass('tooltipstered')) {
				_this.$trigger.tooltipster({
					arrow: true,
					content: $('<section/>').append(_this.$actions.clone(true)),
					trigger: _this.config.triggerEvent,
					position: _this.config.position,
					maxWidth: _this.config.maxWidth,
					theme: 'tooltipster-splitbutton Padding-' + _this.config.padding,
				});
				_this.$actions.remove();
			}
		});
	};

	SapphireWidgets.SplitButton = {
		create: create,
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/ssd-component-block/scripts.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/ssd-component-block/scripts.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var milisecondpassed = 0;
var stoptimer = true;
var myTimout  = null;

function onKeydownFunction() {
    milisecondpassed = 0;
  
    stoptimer=true;
    clearInterval(myTimout);
    myTimout = null;
  };
  
  function onKeyUpFunction(elementToClick) {
  stoptimer = false;
  
  if(milisecondpassed == 0 && myTimout==null){
      myTimout = setInterval(
        function() {
          milisecondpassed+=100;
         
          if (milisecondpassed >= 400 && stoptimer==false) {
            milisecondpassed = 0;
            stoptimer=true;
            clearInterval(myTimout);
            myTimout = null;
            elementToClick.click();
          
          }
          else{
            if(stoptimer==true){
            clearInterval(myTimout);
            myTimout = null;
            }
          }
        }, 100);
        if(stoptimer==true){
            clearInterval(myTimout);
            myTimout = null;
        }
    }
    else{
        if(stoptimer==true){
            clearInterval(myTimout);
            myTimout = null;
        }   
    }
};

if(typeof(ssdComponent) === 'undefined') {

    ssdComponent = {
        length: 0,
        numberOfActive: 0,
        isRTL: false,
        id: '',
        toDestroy: false,
        onBlurDestroy: function() {
            if (ssdComponent.id != '') {
                var _ssdComponent = $('#' + ssdComponent.id);
                var _wrapper = $('[data-ssd-placeholder=' + ssdComponent.id + ']');
                if (ssdComponent.toDestroy) {
                    _wrapper.find('.SSDListRefreshHandler').find('a.to-destroy').click();
                    _wrapper.remove();
                }
                else {
                     var _wrapper = $('[data-ssd-placeholder=' + ssdComponent.id + ']');
                    _wrapper.find('input').val('');
                    ssdComponent.blur();
                }
            }
        },
        focus: function(ssdComponentWidget) {
            var _ssdComponentWidget = $(ssdComponentWidget).children('div.SSD-Wrapper:not(.Selected)');
            
            if(!_ssdComponentWidget.length)
                return; //If this SSD-Wrapper is already Selected, return.
            
            if(ssdComponent.numberOfActive)
                ssdComponent.blur(); //Blurs the other focused SSD's.
            
            ssdComponent.numberOfActive++;
            if(!_ssdComponentWidget.parent().hasClass('SSDPopup')){
                _ssdComponentWidget.children('.SSD-Component')
                .css({
                    'width': function() {
                        return $(this).outerWidth();
                    },
                    'top': function() {
                        return this.getBoundingClientRect().top + $(document).scrollTop();
                    },
                    'left': function() {
                        if(ssdComponent.isRTL)
                            return 'auto';
                        return this.getBoundingClientRect().left;
                    },
                    'right': function() {
                        if(ssdComponent.isRTL)
                            return $(window).width() - $(this).outerWidth() - this.getBoundingClientRect().left;
                        return 'auto';
                    }
                })
                .children('.SSD-Bar').css({
                    'width': function() {
                        return $(this).outerWidth();
                    }
                })
                .siblings('.SSD-List').attr('current-focus', 0);
            }
            else{
                _ssdComponentWidget.children('.SSD-Component')
                .css({
                    'width': function() {
                        return $(this).outerWidth();
                    }
                })
                .children('.SSD-Bar').css({
                    'width': function() {
                        return $(this).outerWidth();
                    }
                })
                .siblings('.SSD-List').attr('current-focus', 0);
            }
            
            if(!_ssdComponentWidget.parent().hasClass('SSDPopup')){
                _ssdComponentWidget.closest('form').append(_ssdComponentWidget);
            }
            _ssdComponentWidget.addClass('Positioned');
            
            setTimeout(
                function() {
                    _ssdComponentWidget.addClass('Selected');
                }
                , 1
            );
            
        },
        
        
        
        blur: function() {
            if(!ssdComponent.numberOfActive)
                return;
            
            var _wrapper = $('div.SSD-Wrapper.Positioned.Selected');
            
            _wrapper.each(function() {
                var parent = $('#' + $(this).attr('data-ssd-placeholder'));
                parent.append($(this));
            });
            
            _wrapper.removeClass('Positioned')
            .children('.SSD-Component')
                .css({
                    'width': '',
                    'top': '',
                    'left': '',
                    'right': ''
                })
                .removeClass('Searching Fixed KeyboardNav')
            .children('.SSD-Bar').css({
                'width': ''
            });
                
            setTimeout(
                function() {
                    _wrapper.removeClass('Selected')
                    .find('.SSD-Bar').each(function() {
                        ssdComponent.tabsClear(this);
                    });
                }
                , 1
            );
                
            ssdComponent.numberOfActive--;
            $(".SSD_ListRecords span, .SSD_ListLine.ShowMore, .SSD_DeleteOnBlur").remove();
        },
        resize: function() {
            if(!ssdComponent.numberOfActive)
                return; //If there's no SSD active, there's no need to resize it.
            
            var _ssdWrapper = $('div.SSD-Wrapper.Selected').first();
            var _ssdComponentWidget = $('#' + _ssdWrapper.attr('data-ssd-placeholder'))[0];
            var _ssdComponent = _ssdWrapper.children('.SSD-Component');
            
            if (typeof _ssdComponentWidget.getBoundingClientRect !== "undefined") {
                _ssdComponent.css({
                    'width': function() {
                        return $(_ssdComponentWidget).width();
                    }/*,
                    'top': function() {
                        return _ssdComponentWidget.getBoundingClientRect().top + $(document).scrollTop();
                    },
                    'left': function() {
                        if(ssdComponent.isRTL)
                            return 'auto';
                        return _ssdComponentWidget.getBoundingClientRect().left;
                    },
                    'right': function() {
                        if(ssdComponent.isRTL)
                            return $(window).width() - $(_ssdComponentWidget).outerWidth() - _ssdComponentWidget.getBoundingClientRect().left;
                        return 'auto';
                    }*/
                }).children('.SSD-Bar').css({
                    'width': function() {
                        return $(this).closest('.SSD-Component').innerWidth();
                    }
                });
            }
        },
        tabSelect: function(ssdComponentWidget, ssdBar, selectedTab, isInputEvent) {
            var _selectedTab = $(selectedTab);

            if(ssdComponent.numberOfActive == 0) {
                ssdComponent.focus(ssdComponentWidget);
            }
            
            if(!_selectedTab.is('.Selected')) {
                ssdComponent.tabsClear(ssdBar);
                _selectedTab.addClass('Selected');
            }
            
            ssdComponent.focusSelectedTab(ssdBar,isInputEvent);
        },
        focusSelectedTab: function(ssdBar,isInputEvent) {
            // Selected tab is the Search input?
            if(ssdBar.children('.SearchInput-Container.Selected').length) {
                var elementToClick = ssdBar.siblings('.SSDListRefreshHandler').find('a:not(.to-destroy)');
                
                if(isInputEvent){
                    onKeyUpFunction(elementToClick);
                }
                else{
                    elementToClick.click();
                }
                ssdBar.find('.InputPlaceholder input[type="text"]:not(:focus)').first().select().focus();
                return;
            }
            
            // Selected tab is the Short list?
            if(ssdBar.children('.ShortListSelector-Container.Selected').length) {
                ssdBar.find('.ShortListSelector-Container > a').focus();
                return;
            }
        },
        /*
         * Method being called by user action js_ssdComponent_focusCurrentRow
         */
        focusCurrentRow: function() {
            var _ssdComponent = $('div.SSD-Wrapper.Selected .SSD-Component').first();
            var _ssdList = _ssdComponent.find('.SSD-List');
            var _currentFocus = _ssdList.attr('current-focus');

            _ssdComponent.addClass('KeyboardNav');
            _ssdList.find('span.SSD_ListRecords > span:nth-child(' + _currentFocus + ')').addClass('focus');
        },
        tabsClear: function(ssdBar) {
            $(ssdBar).children().removeClass('Selected');
        },
        searchIcon: function(event) {
            ssdComponent.tabSelect(event.data.ssdComponentWidget, event.data.ssdBar, $(event.data.ssdBar).children('.SearchInput-Container'),false);
        },
        /*
         * @name inputEvent
         * @description 
         */
        inputEvent: function(event) {
            var _inputContainer = $(event.data.input).closest('.SearchInput-Container');
            
            ssdComponent.tabSelect(event.data.ssdComponentWidget, event.data.ssdBar, _inputContainer,true);
            
            if($(event.data.input).val() == '') {
                _inputContainer.closest('.SSD-Component').removeClass('Searching');
            }
            else {
                _inputContainer.closest('.SSD-Component').addClass('Searching');
            }
        },
        keydownEvent: function(event) {
           onKeydownFunction();          
          
        },
        keyboardHandler: function(event) {
            if(event.key == "Shift" || event.key == "Control")
                return;

            var _ssdComponent = $('div.SSD-Wrapper.Selected .SSD-Component').first();
            var _ssdList = _ssdComponent.find('.SSD-List');

            if(event.key == "Enter" && _ssdList.find('.SSD_ListLine.ShowMore.focus').length)
                return;

            if(event.key == "Tab") {
                _ssdComponent.addClass('KeyboardNav');
                return;
            }
            
            if(event.key == "ArrowUp" || event.key == "ArrowDown") {
                var _currentFocus = _ssdList.attr('current-focus');
                var _selectedElement = $(null);
                
                if(_ssdList.find('.SSD_ListLine.ShowMore.focus').length) {
                    _selectedElement = _ssdList.find('.SSD_ListLine.ShowMore.focus');
                }
                else if(_currentFocus > 0) {
                    _selectedElement = _ssdList.find('span.SSD_ListRecords > span:nth-child(' + _currentFocus + ')');
                }
                
                _ssdComponent.addClass('KeyboardNav')
                
                if(event.key == "ArrowUp") {
                    if(_selectedElement.length) {
                        
                        if(_selectedElement.is('.SSD_ListLine.ShowMore.focus')) {
                            _selectedElement.removeClass('focus');
                            _selectedElement = _ssdList.find('span.SSD_ListRecords > span:last-child');
                        }
                        else {
                            _selectedElement = _selectedElement.removeClass('focus').prev();
                        }

                        _currentFocus--;
                    }
                    else {
                        _currentFocus = _ssdList.find('span.SSD_ListRecords > span').length;

                        if(_ssdList.find('.SSD_ListLine.ShowMore').length) {
                            _selectedElement = _ssdList.find('.SSD_ListLine.ShowMore');
                            _currentFocus++;
                        }
                        else {
                            _selectedElement = _ssdList.find('span.SSD_ListRecords > span:last-child');
                        }
                    }
                }
                
                if(event.key == "ArrowDown") {
                    if(_selectedElement.length) {
                        
                        if(_selectedElement.is('.SSD_ListLine.ShowMore.focus')) {
                            _selectedElement.removeClass('focus');
                            _selectedElement = $(null);
                        }
                        else {
                            _selectedElement = _selectedElement.removeClass('focus').next();
                            
                            if(!_selectedElement.length && _ssdList.find('.SSD_ListLine.ShowMore').length) {
                                _selectedElement = _ssdList.find('.SSD_ListLine.ShowMore');
                            }
                        }
                        
                        _currentFocus++;
                    }
                    else {
                        _selectedElement = _ssdList.find('span.SSD_ListRecords > span:first-child');
                        _currentFocus = 1;
                    }
                }
                
                _selectedElement.addClass('focus');
                
                if(!_selectedElement.length) {
                    ssdComponent.focusSelectedTab(_ssdComponent.find('.SSD-Bar'),false);
                    _currentFocus = 0;
                }
                else if (!_selectedElement.find('.SSD_ListLine.Disabled').length){
                    _selectedElement.find('.ExpandControl > a').focus();
                }
                else {
                    _ssdList.find('a.OtherControlLink').focus();
                }
                
                _ssdList.attr('current-focus', _currentFocus);

                return;
            }
            
            ssdComponent.clearKeyboardNavStatus(_ssdComponent);
        },
        clearKeyboardNavStatus: function(ssdComponent) {
            var _ssdComponent = $(ssdComponent);
            var _ssdList = _ssdComponent.find('.SSD-List');

            if(_ssdList.find('.SSD_ListLine.ShowMore.focus').length)
                return;

            _ssdComponent.removeClass('KeyboardNav');
            _ssdList.attr('current-focus', 0)
                .find('span.SSD_ListRecords > span.focus').removeClass('focus')
                .find('.ExpandControl > a').blur();
        },
        scrollHandler: function() {
            var _ssdComponent = $('div.SSD-Wrapper.Selected .SSD-Component').first();
            if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 1024){
                if(_ssdComponent[0].getBoundingClientRect().top > $(".toolbar-wrapper.Fixed").outerHeight()) {
                    _ssdComponent.removeClass('Fixed');
                    return;
                }else{
                    $('.SSD-Wrapper.Selected > .SSD-Component.Fixed > .SSD-Bar').css('top', $(".toolbar-wrapper.Fixed").outerHeight() + 'px'); 
                    
                    
                }
            }else{
                /*Not Mobile apply fixed behaviour*/
                if(_ssdComponent[0].getBoundingClientRect().top > ($('.TopPatientHeader').outerHeight(true) + $('.Header').outerHeight(true) + $(".toolbar-wrapper").outerHeight()+ $('.CTTASLevelAssessmentMainContainer').outerHeight(true) )) {
                    _ssdComponent.removeClass('Fixed');
                    return;
                }else{
                    $('.SSD-Wrapper.Selected > .SSD-Component.Fixed > .SSD-Bar').css('top',($('.TopPatientHeader').outerHeight(true) + $('.Header').outerHeight(true) + $(".toolbar-wrapper").outerHeight() + $('.CTTASLevelAssessmentMainContainer').outerHeight(true)) + 'px'); 
                }
            }


            _ssdComponent.addClass('Fixed');
        },
        destroy: function(_inputId) { /* Used to destroy a specific ssd component by receive the input identifier as parameter and determine the wrapper to remove. */
            $('[data-ssd-placeholder=' + ssdComponent.id + ']').remove();
        },
        init: function(ssdComponentWidget,_toDestroy) {
            ssdComponent.length++;
            ssdComponent.numberOfActive = 0;
            ssdComponent.isRTL = $('html').is('.rtl');
            ssdComponent.toDestroy = _toDestroy;
            if (typeof ssdComponentWidget != 'undefined') {
                ssdComponent.id = $(ssdComponentWidget).attr('id');
            }
            var _ssdComponentWidget = $(ssdComponentWidget);
            var _ssdComponent = _ssdComponentWidget.find('.SSD-Component');
            var _ssdBar = _ssdComponent.children('.SSD-Bar').first();
            var _searchIcon = _ssdBar.find('.SearchIcon').first();
            var _input = _ssdBar.find('input[type="text"]').first();
            var _clearControl = _ssdBar.find('.ClearControl').first();
            
            _searchIcon.off('click').on('click', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar
            }, ssdComponent.searchIcon);
            
            _ssdBar.children('div').off('click').on('click', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar
            }, function(event) {
                ssdComponent.tabSelect(event.data.ssdComponentWidget, event.data.ssdBar, this,false);
            });
            
            _clearControl.off('click').on('click', ssdComponent.onBlurDestroy);
            
            _input.off('keyup').on('keyup', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar,
                input: _input
            }, ssdComponent.inputEvent);
            
            _input.off('keydown').on('keydown', {
                ssdComponentWidget: _ssdComponentWidget,
                ssdBar: _ssdBar,
                input: _input
            }, ssdComponent.keydownEvent);
            
            $(_ssdComponent).off('click').on('click', {
                ssdComponent: _ssdComponent
            }, function(event) {
                ssdComponent.clearKeyboardNavStatus(event.data.ssdComponent);
            });
        }
    }
}

$(document).ready(function() {
    $(window).on('resize', function(event) {
        ssdComponent.resize();
    });
    
    $(document).on('click', function(event) {
        if(!$(event.target).is(':visible')) { /* Clicks on hidden elements are dismissed. */
            return;
        }
        
        var e = $(event.target).closest('.SSD-Component');
        
        if(!e.length) { // User clicked outside the SSD-Component?
            ssdComponent.onBlurDestroy();
        }
    });
    
    $(document).on('keydown', function(event) {
        if(ssdComponent.numberOfActive > 0) {
            if(event.keyCode == "27") { // User hit Escape
                ssdComponent.onBlurDestroy();
            }
            if(event.key == "ArrowUp" || event.key == "ArrowDown") {
                event.preventDefault();
            }
        }
    });
    
    $(document).on('keyup', function(event) {
        if(ssdComponent.numberOfActive > 0) { // If there's an SSD component active, go for Keyboard handler
            ssdComponent.keyboardHandler(event);
        }
    });
    
    $(document).on('scroll', function() {
        if(ssdComponent.numberOfActive > 0) { // If there's an SSD component active, go for scroll handler
            ssdComponent.scrollHandler();
        }
    });
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/ssd-list-line/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/ssd-list-line/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component SSDListLine */
SapphireWidgets.SSDListLine = {
	toggle: (lineId, lineHandler = '') => {
		var _line = $(lineId).is('.SSD_ListLine')
			? $(lineId)
			: $(lineId)
					.children('.SSD_ListLine')
					.first();

		if (!_line.length) return;

		var _expandControl = $('.expand-control-custom-width');

		if (_expandControl.length != 0) {
			_expandControl.removeClass('expand-control-custom-width');
			_expandControl.css('width', '');
		}

		if (!_line.is('.Active')) {
			var _lineHeader = _line
				.closest('div.SelectableList, .SelectableList-ListRecords')
				.find('div.SelectableList-Line.Active')
				.not(_line);

			_lineHeader.find('a[hide-action]').click();
			_lineHeader
				.removeClass('Active')
				.children('span')
				.hide(200);
			_line.addClass('Active');

			if ($(lineHandler).length) {
				$(lineHandler).click();
			}
		} else {
			_line.removeClass('Active');
		}
	},
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/tabs-extended/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/tabs-extended/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TabsExtended */
SapphireWidgets.TabsExtended = function(config) {
	$(document).ready(function() {
		const $component = $(`#${config.widgetId} .Tabs_Extended`);
		const $tabHeader = $component.find('.Tabs_header');
		const $tabContainer = $component.find('.TabsContainer');
		const $tabs = $tabHeader.find('> .Tabs__tab');
		const $tabsEnabled = $tabHeader.find('> .Tabs__tab:not(.disabled)');
		const $tabsInput = $component.find('.Tabs_Input input');

		$tabs.each(function() {
			if ($(this).text() === '') {
				$(this).remove();
			}
		});

		$tabsEnabled.on('click', function() {
			$tabContainer.attr('activetab', $(this).attr('value'));

			$tabsInput.val($(this).attr('value'));
			$tabsInput.change();
		});

		$tabsEnabled.off('mousedown').on('mousedown', function(evt) {
			var $tabsExtended = $(evt.target).closest('.Tabs_Extended');
			$tabsExtended.removeClass('isClosed');
		});

		$('.Tabs_Extended.HideActiveOnClick .Tabs_header')
			.off('mousedown')
			.on('mousedown', '.Tabs__tab.active', function(evt) {
				var $tabsExtended = $(evt.target).closest('.Tabs_Extended');
				var $tabsBody = $tabsExtended.find('.Tabs_body');

				if ($tabsBody.hasClass('Tabs_body--closed')) {
					$tabsBody.removeClass('Tabs_body--closed');
					$tabsExtended.removeClass('isClosed');
				} else {
					$tabsBody.addClass('Tabs_body--closed');
					$tabsExtended.addClass('isClosed');
				}
			});

		$tabHeader.find('.Tabs_Extended--disabled').each(function(index, el) {
			$(el)
				.parent()
				.css('cursor', 'default')
				.off('click');
		});

		$component.each(function(index, el) {
			if ($(el).hasClass('Tabs_Extended--closedonstart')) {
				$(el)
					.find('.Tabs_body')
					.addClass('Tabs_body--closed');
				$(el).addClass('isClosed');
				$(el).removeClass('Tabs_Extended--closedonstart');
			}

			$(el)
				.off('click')
				.on('click', '.Tabs_Extended--close', function(evt) {
					$(evt.target)
						.closest('.Tabs_body')
						.addClass('Tabs_body--closed');
				});
		});

		if (!config.tab1Enabled) $tabHeader.find('> .Tabs__tab[value=1]').addClass('disabled');
		if (!config.tab2Enabled) $tabHeader.find('> .Tabs__tab[value=2]').addClass('disabled');
		if (!config.tab3Enabled) $tabHeader.find('> .Tabs__tab[value=3]').addClass('disabled');
		if (!config.tab4Enabled) $tabHeader.find('> .Tabs__tab[value=4]').addClass('disabled');
		if (!config.tab5Enabled) $tabHeader.find('> .Tabs__tab[value=5]').addClass('disabled');
	});
};


/***/ }),

/***/ "./src/components/05-components/v3-pat/tabular-list/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/tabular-list/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TabularList */
(function($, window, document, SapphireWidgets) {
	var allTabularLists = [];

	var create = function(config) {
		window[config.tabularListId] = new TabularList(config);
		allTabularLists.push(window[config.tabularListId]);

		$(window).load(function() {
			var allTabularLists = SapphireWidgets.TabularList.all();
			allTabularLists.forEach(function(element, i) {
				element.handleTabularListColumns();
				element.handleResponsiveClasses(200);
			});
		});

		$(window).on('resize.tabularlist', function() {
			var allTabularLists = SapphireWidgets.TabularList.all();
			allTabularLists.forEach(function(element, i) {
				element.handleResponsiveClasses(200);
			});
		});
	};

	var TabularList = function(config) {
		var _this = this;
		this.config = config;
		this.tabularListResizeTimer = 0;
		this.$widget = $('#' + config.tabularListId);
		this.$widgetList = this.$widget.find('> .TabularList');
		this.$widget.find('.TabularListRow').each(function(i, row) {
			_this.columnsCount = 0;
			$(row)
				.find('.TabularListRow-values .TabularListRow-item')
				.each(function(i, el) {
					$(el).addClass('TabularListColumn' + (i + 1));
					_this.columnsCount++;
				});
		});
		if (!!config.breakOn) {
			this.breakOnOrder = parseInt(config.breakOn);
		} else {
			this.breakOnOrder = 0;
		}
		this.handleTabularListColumns();
	};

	TabularList.prototype.handleTabularListColumns = function() {
		if (this.config.columnsWidth === 'Auto') {
			if (this.$widgetList.width() > 1) {
				for (i = 1; i <= this.columnsCount; i++) {
					var maxWidthContent = Math.max.apply(
						null,
						this.$widget
							.find('.TabularListColumn' + i)
							.map(function() {
								return $(this).outerWidth(true);
							})
							.get()
					);
					this.$widget.find('.TabularListColumn' + i).width(maxWidthContent);
					this.$widget.find('.TabularListColumn' + i).css('opacity', 1);
				}
			}
		}
		if (!!this.config.propertyMinWidth) {
			this.$widget.find('.TabularListRow-property').css('min-width', convertInCSSValue(this.config.propertyMinWidth));
		}
		if (!!this.config.propertyMaxWidth) {
			this.$widget.find('.TabularListRow-property').css('max-width', convertInCSSValue(this.config.propertyMaxWidth));
		}
		if (!!this.config.actionsMinWidth) {
			this.$widget.find('.TabularListRow-actions').css('min-width', convertInCSSValue(this.config.actionsMinWidth));
		}
		if (!!this.config.actionsMaxWidth) {
			this.$widget.find('.TabularListRow-actions').css('max-width', convertInCSSValue(this.config.actionsMaxWidth));
		}
	};

	TabularList.prototype.handleResponsiveClasses = function(timeout) {
		var _this = this;
		window.clearTimeout(this.tabularListResizeTimer);
		this.tabularListResizeTimer = window.setTimeout(function() {
			_this.$widgetList.removeClass(function(index, className) {
				return (className.match(/(^|\s)screen-\S+/g) || []).join(' ');
			});

			_this.$widgetList.removeClass('isBreaking');

			var widgetWidth = _this.$widgetList.outerWidth(true);
			if (widgetWidth === 0) {
				widgetWidth = _this.$widgetList
					.parents(':visible')
					.eq(0)
					.outerWidth(true);
			}

			if (widgetWidth >= 1900) {
				_this.$widgetList.addClass('screen-DesktopHD');
				if (_this.breakOnOrder >= 6) {
					_this.$widgetList.addClass('isBreaking');
				}
			} else if (widgetWidth >= 1600) {
				_this.$widgetList.addClass('screen-DesktopBig');
				if (_this.breakOnOrder >= 5) {
					_this.$widgetList.addClass('isBreaking');
				}
			} else if (widgetWidth >= 1366) {
				_this.$widgetList.addClass('screen-Desktop');
				if (_this.breakOnOrder >= 4) {
					_this.$widgetList.addClass('isBreaking');
				}
			} else if (widgetWidth >= 1024) {
				_this.$widgetList.addClass('screen-DesktopSmall');
				if (_this.breakOnOrder >= 3) {
					_this.$widgetList.addClass('isBreaking');
				}
			} else if (widgetWidth >= 420) {
				_this.$widgetList.addClass('screen-Tablet');
				if (_this.breakOnOrder >= 2) {
					_this.$widgetList.addClass('isBreaking');
				}
			} else {
				_this.$widgetList.addClass('screen-Phone');
				if (_this.breakOnOrder >= 1) {
					_this.$widgetList.addClass('isBreaking');
				}
			}
		}, timeout);
	};

	SapphireWidgets.TabularList = {
		create: create,
		all: function() {
			return allTabularLists;
		},
	};
})(jQuery, window, document, SapphireWidgets);

function convertInCSSValue(value_in) {
	var returned;
	if (value_in.includes('px') || value_in.includes('%')) {
		returned = value_in;
	} else {
		returned = value_in + 'px';
	}
	return returned;
}


/***/ }),

/***/ "./src/components/05-components/v3-pat/tabular-scroll/scripts.js":
/*!***********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/tabular-scroll/scripts.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TabularScroll */
(function($, window, document, SapphireWidgets) {
	const create = function(config) {
		$(document).ready(function() {
			$('.TabularScroll').each(function(i, el) {
				setupTabularScroll($(el));
			});
		});

		$(window).load(function() {
			osAjaxBackend.BindAfterAjaxRequest(function() {
				$('.TabularScroll').each(function(i, el) {
					setupTabularScroll($(el));
				});
			});
		});

		$(window).on('resize.tabularscroll', function() {
			$('.TabularScroll').each(function(i, el) {
				var $centerTable = $(el).find('.TabularScroll-center-table');
				var tableWidth = $centerTable.find('table').width();
				$(el)
					.find('.TabularScroll-center .TopScrollDragger')
					.width(tableWidth);
				if ($centerTable[0].scrollWidth > $centerTable.width()) {
					$(el)
						.find('.TopScrollWrapper')
						.css('visibility', 'visible');
				} else {
					$(el)
						.find('.TopScrollWrapper')
						.css('visibility', 'hidden');
				}
			});
		});
	};

	const setupTabularScroll = function($tabularScroll) {
		var $topScrollWrapper = $tabularScroll.find('.TopScrollWrapper');
		var $centerTable = $tabularScroll.find('.TabularScroll-center-table');
		$tabularScroll.find('.TopScrollWrapper').scroll(function() {
			$centerTable.scrollLeft($topScrollWrapper.scrollLeft());
		});
		$centerTable.scroll(function() {
			$topScrollWrapper.scrollLeft($centerTable.scrollLeft());
		});
		// similar to Resize
		var tableWidth = $centerTable.find('table').width();
		$tabularScroll.find('.TabularScroll-center .TopScrollDragger').width(tableWidth);
		if ($centerTable[0].scrollWidth > $centerTable.width()) {
			$tabularScroll.find('.TopScrollWrapper').css('visibility', 'visible');
		} else {
			$tabularScroll.find('.TopScrollWrapper').css('visibility', 'hidden');
		}
	};

	SapphireWidgets.TabularScroll = { create };
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js":
/*!**********************************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TriggerIframeTooltip */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		var $elementId = $('#' + config.elementId);

		$elementId.addClass('tooltip');

		if (config.triggerId === 'click') $elementId.addClass('tooltipstered--pointer');

		var extraDataParams = 'data-iframetooltiptriggerid="' + config.elementId + '"';
		var widgetNotifyDiv = $.find('[data-iframetooltiptriggerid="' + config.elementId + '"]');
		if (widgetNotifyDiv.length === 1) {
			extraDataParams += ' data-iframetooltipnotifyid=' + $(widgetNotifyDiv).data('iframetooltipnotifyid');
		}

		$elementId.tooltipster({
			contentAsHTML: true,
			theme: config.theme,
			interactive: true,
			position: config.positionId,
			trigger: config.triggerId,
			minWidth: config.minWidth,
			maxWidth: config.maxWidth,
			zindex: config.zindex,
			content: `<iframe id="tooltipster-frame" data-ui="iframe-tooltip" src="${config.URL}" style="border:none; min-height:${config.minHeight}px; ${extraDataParams}></iframe>`,
			functionReady: function(instance, helper) {
				$(helper).css({ visibility: 'hidden' });

				setTimeout(function() {
					$('.tooltipster-base').css({
						visibility: 'visible',
						minHeight: config.minHeight > 0 ? config.minHeight : 'auto',
					});
				}, 500);

				$('.tooltipster-content').prepend('<div class="TooltipsterLoading"><div class="lds-ring"><div></div></div>');

				const isLeftOrRight = config.positionId === 'left' || config.positionId === 'right';

				// Set a fixed height in order to keep the arrow in the same position
				if (isLeftOrRight) {
					setFixHeight();

					$(window)
						.off('scroll.Tooltip')
						.on('scroll.Tooltip', function() {
							setTimeout(() => {
								setFixHeight();
							}, 500);
						});
				}
			},
			functionAfter: function() {
				$(window).off('scroll.Tooltip');
			},
		});
	};

	const setFixHeight = () => {
		const $arrow = $('.tooltipster-arrow');

		$arrow.height($arrow.height());
	};

	SapphireWidgets.TriggerIframeTooltip = { create };
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/truncated-content/scripts.js":
/*!**************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/truncated-content/scripts.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TruncatedContent */
(function($, window, document, SapphireWidgets) {
	const create = function(config = {}) {
		$(document).ready(function() {
			var $allTruncated = $([]);
			var rootSelector = `#${config.widgetId}`;
			var openerSelector = '.TruncatedContent--all';
			var bodySelector = '.TruncatedContent--body';

			$(rootSelector).each(function() {
				var $el = $(this);
				$allTruncated = $allTruncated.add($el);
				var $elBody = $el.find(bodySelector);
				var maxLines = $el.data('maxlines');
				var lineHeight = window
					.getComputedStyle($el.find('> div')[0])
					.getPropertyValue('line-height')
					.replace('px', '');
				var lineCount = Math.ceil($el.height() / lineHeight);
				if (lineCount > maxLines) {
					$elBody.css({
						maxHeight: lineHeight * maxLines + 'px',
					});
					var sentence = $el.data('additional').replace('{n}', lineCount - maxLines);
					$el.append('<p class="' + openerSelector.replace('.', '') + '">' + sentence + '</p>');
				}
			});

			$(rootSelector).on('click', openerSelector, function() {
				var el = $(this).closest(rootSelector);
				openTruncatedContent(el);
			});

			openTruncatedContent = function(el) {
				$(el)
					.find(bodySelector)
					.css('max-height', 'none');
				$(el)
					.find(openerSelector)
					.css('display', 'none');
			};

			if (window.frameElement && window.frameElement.id === 'tooltipster-frame') {
				$(rootSelector).off('click', openerSelector);
				$(openerSelector).addClass('in-tooltip');
			}
		});
	};

	SapphireWidgets.TruncatedContent = {
		create,
		open: function(el) {
			openTruncatedContent(el);
		},
		openAll: function() {
			$allTruncated.each(function() {
				openTruncatedContent($(this));
			});
		},
	};
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/05-components/v3-pat/vertical-carrousel/scripts.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/vertical-carrousel/scripts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component VerticalCarousel */
(function($, window, document, SapphireWidgets) {
	const create = function() {
		$.fn.verticalCarousel = function(options) {
			var carouselContainerClass = 'VerticalCarousel_Wrapper';
			var carouselGroupClass = 'VerticalCarousel__List';
			var carouselGoUpClass = 'VerticalCarousel___ChangeUp';
			var carouselGoDownClass = 'VerticalCarousel___ChangeDown';

			var defaults = { currentItem: 1, showItems: 1 };
			var options = $.extend(defaults, options);

			var carouselContainer;
			var carouselGroup;
			var carouselUp;
			var carouselDown;
			var totalItems;

			var setContainerHeight = function() {
				var containerHeight = 0;
				var marginTop = 0;
				if (options.showItems == 1) {
					containerHeight = $(' > span > div:nth-child(' + options.currentItem + ')', carouselGroup).outerHeight(true);
				} else {
					for (i = 1; i == options.showItems; i++) {
						containerHeight = containerHeight + $(' > div:nth-child(' + i + ')', carouselGroup).outerHeight(true);
					}
				}
				var nextItem = options.showItems + options.currentItem;
				marginTop = $(' > span > div:nth-child(' + nextItem + ')', carouselGroup).css('marginTop');
				containerHeight = containerHeight - parseInt(marginTop);
				$(carouselContainer).css({ height: containerHeight });
			};

			var setOffset = function() {
				var currentItemOffset = $(' > span > div:nth-child(' + options.currentItem + ')', carouselGroup).offset();

				var carouselGroupOffset = $(carouselGroup).offset();
				var offsetDiff = carouselGroupOffset.top - currentItemOffset.top;

				$('.VerticalCarousel__List .PrescriptionCard').css('background-color', '#DAE0E4');

				$(carouselGroup).css({
					msTransform: 'translateY(calc(36% + ' + offsetDiff + 'px))',
					webkitTransform: 'translateY(calc(36% + ' + offsetDiff + 'px))',
					transform: 'translateY(calc(36% + ' + offsetDiff + 'px))',
				});
				$(' > span > div:nth-child(' + options.currentItem + ')', carouselGroup).css('background-color', '#fff');
			};

			var fetchCard = function() {
				if ($('#' + CardId)) {
					currentItem =
						$('#' + CardId)
							.parent()
							.index() + 1;
				}
			};

			var updateNavigation = function(direction) {
				if (options.currentItem == 1) {
					$(carouselUp).addClass('isDisabled');
				} else if (options.currentItem > 1) {
					$(carouselUp).removeClass('isDisabled');
				}
				if (options.currentItem == totalItems || options.currentItem + options.showItems > totalItems) {
					$(carouselDown).addClass('isDisabled');
				} else if (options.currentItem < totalItems) {
					$(carouselDown).removeClass('isDisabled');
				}
			};

			var moveCarousel = function(direction) {
				if (direction == 'up') {
					options.currentItem = options.currentItem - 1;
				}
				if (direction == 'down') {
					options.currentItem = options.currentItem + 1;
				}
				updateNavigation();
				setContainerHeight();
				setOffset();
			};

			return this.each(function() {
				$(this)
					.find('.' + carouselGroupClass + ', .VerticalCarousel__Controllers')
					.wrapAll('<div class="' + carouselContainerClass + '"></div>');
				carouselContainer = $(this).find('.' + carouselContainerClass);
				carouselGroup = $(this).find('.' + carouselGroupClass);
				carouselUp = $(this).find('.' + carouselGoUpClass);
				carouselDown = $(this).find('.' + carouselGoDownClass);
				totalItems = $('.' + carouselGroupClass + ' > span').children().length;
				updateNavigation();
				setContainerHeight();
				setOffset();
				$(carouselUp).on('click', function(e) {
					if (options.currentItem > 1) {
						moveCarousel('up');
					}
					e.preventDefault();
				});
				$(carouselDown).on('click', function(e) {
					if (options.currentItem + options.showItems <= totalItems) {
						moveCarousel('down');
					}
					e.preventDefault();
				});

				$('.VerticalCarousel.Open').bind('mousewheel', function(e) {
					if (e.originalEvent.wheelDelta / 120 > 0) {
						if (options.currentItem > 1) {
							moveCarousel('up');
						}
						e.preventDefault();
					} else {
						if (options.currentItem + options.showItems <= totalItems) {
							moveCarousel('down');
						}
						e.preventDefault();
					}
				});
			});
		};
	};

	const onOpen = function(cardNumber) {
		$(document).ready(function() {
			$('.VerticalCarousel').verticalCarousel({
				currentItem: cardNumber,
				showItems: 1,
			});

			$('.Page').css('overflow', 'hidden');

			$('.VerticalCarousel___Close').click(function() {
				$('.VerticalCarousel').removeClass('Open');
				$('.Page').css('overflow', 'initial');
			});
		});
	};

	SapphireWidgets.VerticalCarousel = { create, onOpen };
})(jQuery, window, document, SapphireWidgets);


/***/ }),

/***/ "./src/components/globals.js":
/*!***********************************!*\
  !*** ./src/components/globals.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

//SapphireWidgets = window.SapphireWidgets = window.SapphireWidgets || {};


/***/ }),

/***/ "./src/components/index.scss":
/*!***********************************!*\
  !*** ./src/components/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cyBzeW5jIFxcLmpzJCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wMC1zZXR0aW5ncy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLW1lbnUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLXN1Yi1tZW51L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYnV0dG9uLWxpbmsvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jYXJkLXBhdGllbnQtdGFibGUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb3VudHJ5LXBob25lL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZGF0YS10YWJsZXMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcmFnLWRyb3Avc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wZG93bi1jYXRlZ29yaWVzL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZHJvcHpvbmUvZHJvcHpvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1ncm91cC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2V4cGFuZGFibGUtbGluay9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Z1bGxzY3JlZW4tdGFicy13cmFwcGVyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1nYWxsZXJ5L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1ncmlkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaG9yaXpvbnRhbC10b29sYmFyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC1sYXNhL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaW5wdXQtd2l0aC1jbGVhci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtYWRkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbGluZS1jYXJkLWxpc3Qvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWRldGFpbHMtZXhwYW5kLWJveC9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL2NvbmZpcm1hdGlvbi1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC1ub3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcG9wdXAtbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zYXBwaGlyZS1wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhdGllbnQtY2FsbC1jYW5jZWwvcGF0aWVudC1jYWxsLWNhbmNlbC1zdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGF0aWVudC1jYWxsLWNhbmNlbC9wYXRpZW50LWNhbGwtY2FuY2VsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWNhcmQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tZXhwYW5kYWJsZS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLXBvcHVwL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2NhbGVzL3NjYWxlLW1haW4tc3RydWN0dXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NjYWxlcy90b2dnbGUtaXRlbS1jb250cm9sLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaC1hbmQtc2VsZWN0L3NlbGVjdC1zc2QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VhcmNoLWFuZC1zZWxlY3Qvc3NkLXNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWFyY2hhYmxlLWNsaWVudC1zaWRlL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWN1c3RvbS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1pbnNpZGUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWxlY3Qtc3lzdGVtL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2lkZS1tZW51L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2lkZWJhci9zaWRlYmFyLXN0cnVjdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLWhvcml6b250YWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3BsaXQtYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWNvbXBvbmVudC1ibG9jay9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1saXN0LWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJzLWV4dGVuZGVkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFidWxhci1saXN0L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFidWxhci1zY3JvbGwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90cmlnZ2VyLWlmcmFtZS10b29sdGlwL3RyaWdnZXItaWZyYW1lLXRvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdHJ1bmNhdGVkLWNvbnRlbnQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC92ZXJ0aWNhbC1jYXJyb3VzZWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9nbG9iYWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2luZGV4LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRzs7UUFFSDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGtCQUFrQiw4QkFBOEI7UUFDaEQ7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esb0JBQW9CLDJCQUEyQjtRQUMvQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxtQkFBbUIsY0FBYztRQUNqQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLEtBQUs7UUFDckI7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsWUFBWTtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGNBQWMsNEJBQTRCO1FBQzFDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTs7UUFFSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHNCQUFzQjtRQUN2QztRQUNBO1FBQ0E7UUFDQSxRQUFRO1FBQ1I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsVUFBVTtRQUNWO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLGNBQWMsd0NBQXdDO1FBQ3REO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFNBQVM7UUFDVDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGVBQWU7UUFDZjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLHNDQUFzQyx1QkFBdUI7OztRQUc3RDtRQUNBOzs7Ozs7Ozs7Ozs7QUN4eEJBLG1CQUFPLENBQUMsNERBQXlCOztBQUVqQztBQUNBO0FBQ0EsV0FBVyw2REFBOEM7Ozs7Ozs7Ozs7OztBQ0p6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkQ7Ozs7Ozs7Ozs7O0FDMUZBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzVTRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUNQRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDelJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG1DOzs7Ozs7Ozs7OztBQ3hERDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0JBQWdCOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQSwrQkFBK0I7QUFDL0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbEJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUEscUNBQXFDO0FBQ3JDLENBQUM7Ozs7Ozs7Ozs7OztBQ3ZCRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE2QjtBQUM3QixDQUFDOzs7Ozs7Ozs7Ozs7QUM1TkQ7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjs7QUFFOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxtQzs7Ozs7Ozs7Ozs7QUNwQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ2pDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gscUVBQXFFO0FBQ3JFLDJFQUEyRTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQSw2QkFBNkIsVUFBVSxPQUFPLFFBQVE7O0FBRXREO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLFVBQVUsT0FBTyxRQUFRO0FBQ2xEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQSx5QkFBeUIsVUFBVSxPQUFPLFFBQVE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMxZkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ2pJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtQzs7Ozs7Ozs7Ozs7QUMvQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQTtBQUNBOztBQUVBLFdBQVcsNEJBQTRCOztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsZ0NBQWdDLHFCQUFxQjs7QUFFckQ7QUFDQTs7QUFFQSxZQUFZLHFCQUFxQjtBQUNqQztBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxRQUFRLGdCQUFnQjtBQUN4QixTQUFTLGdCQUFnQjtBQUN6QixHQUFHO0FBQ0g7O0FBRUEsNkJBQTZCO0FBQzdCLENBQUM7Ozs7Ozs7Ozs7OztBQy9ERDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsZ0NBQWdDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUN2RUQ7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVM7O0FBRXpDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxTQUFTLHFEQUFxRCxTQUFTO0FBQy9FOztBQUVBOztBQUVBLG1DQUFtQztBQUNuQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNyQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbkNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLDZDOzs7Ozs7Ozs7OztBQ25CRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzNLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0I7QUFDaEU7O0FBRUE7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTs7QUFFQSxnQ0FBZ0MsUUFBUSxHQUFHLE9BQU87O0FBRWxEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsaUJBQWlCLEVBQUUsS0FBSztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLE1BQU0sR0FBRyxRQUFRLEdBQUcsUUFBUTtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ2pLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHlCQUF5QjtBQUM3RSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsaUJBQWlCO0FBQ3JFLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3JERDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxJOzs7Ozs7Ozs7OztBQ3JERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5Qiw2Q0FBNkM7QUFDdEU7O0FBRUEsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSw0QkFBNEI7QUFDNUIsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcENEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQSxpQ0FBaUM7QUFDakMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM0NEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0JBQWdCO0FBQ3hCO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBLHlDQUF5QztBQUN6QyxDQUFDOzs7Ozs7Ozs7Ozs7QUNYRDtBQUNBO0FBQ0EsMEJBQTBCLFNBQVM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRixDQUFDLEU7Ozs7Ozs7Ozs7O0FDclFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUMxQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNuREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQ0FBb0M7QUFDcEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxSEFBcUgsMkVBQTJFO0FBQ2hNO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxvREFBb0QsMkVBQTJFO0FBQy9IO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnSEFBZ0gsMkVBQTJFO0FBQzNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSwrQ0FBK0MsMkVBQTJFO0FBQzFIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSCxFQUFFO0FBQ0YsRTs7Ozs7Ozs7Ozs7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQSw4QkFBOEIsR0FBRztBQUNqQyxXQUFXLEdBQUc7QUFDZCxXQUFXLEdBQUc7O0FBRWQ7QUFDQSxFQUFFOztBQUVGO0FBQ0EsOEJBQThCLEdBQUc7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNyREQsbUJBQU8sQ0FBQywrRkFBc0I7QUFDOUIsbUJBQU8sQ0FBQyxpRkFBZTtBQUN2QjtBQUNBLG1CQUFPLENBQUMsK0VBQWM7QUFDdEIsbUJBQU8sQ0FBQyx1RkFBa0I7Ozs7Ozs7Ozs7Ozs7QUNKMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsK0NBQStDO0FBQy9DLENBQUM7Ozs7Ozs7Ozs7OztBQ3hCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsc0NBQXNDO0FBQ3RDLENBQUM7Ozs7Ozs7Ozs7OztBQzNFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUM5QkQ7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnQkFBZ0I7QUFDeEIsa0JBQWtCLGdCQUFnQjtBQUNsQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdkJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0MsZ0JBQWdCOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixJQUFJOztBQUVKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQztBQUMzQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN4SkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ3JHRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsY0FBYztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1EQUFtRCxJQUFJLHNCQUFzQjtBQUM3RTtBQUNBLCtEQUErRCxRQUFRLEdBQUcsU0FBUztBQUNuRixnREFBZ0QsSUFBSSxvRkFBb0Y7O0FBRXhJO0FBQ0E7QUFDQSxvREFBb0QsZUFBZTtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsa0RBQWtELGVBQWU7QUFDakU7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07O0FBRU47QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsMEJBQTBCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDLENBQUM7Ozs7Ozs7Ozs7OztBQ3plRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGtCQUFrQjtBQUNqQyxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4QkFBOEI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQSx1Q0FBdUM7QUFDdkMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDMVJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDM0RBLHFGQUFxRjs7QUFFckY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ04sSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDekhBLHFGQUFxRjs7QUFFckY7QUFDQTtBQUNBLCtDQUErQztBQUMvQyxtREFBbUQ7QUFDbkQscUVBQXFFO0FBQ3JFLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFDdkMscUNBQXFDO0FBQ3JDLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GO0FBQ3BGLG9GQUFvRjtBQUNwRixrRkFBa0Y7QUFDbEYsK0NBQStDOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRCxLQUFLO0FBQ0wsOEJBQThCLGtCQUFrQjtBQUNoRDtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUgsK0VBQStFLHVCQUF1Qjs7QUFFdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcGNEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxtQzs7Ozs7Ozs7Ozs7QUMvREQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOzs7Ozs7Ozs7QUFTQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxtQzs7Ozs7Ozs7Ozs7QUN0TkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkMsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUN0TEQ7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLDJCQUEyQjtBQUMzQiwyQ0FBMkM7QUFDM0Msa0NBQWtDO0FBQ2xDLDZCQUE2QjtBQUM3QixzQ0FBc0M7QUFDdEMsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCw4Q0FBOEMsU0FBUztBQUN2RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDN2FBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0wsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ3hMRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsbUM7Ozs7Ozs7Ozs7O0FDN0dEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDZDOzs7Ozs7Ozs7OztBQ3ZHRDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0JBQWdCOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRCwrQkFBK0IsZ0JBQWdCOztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQkFBZ0I7O0FBRWpEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsZUFBZTtBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMxTkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM0NEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOzs7O0FBSVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtCOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsOEk7OztBQUdBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlSO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxTQUFTO0FBQ1QscUNBQXFDO0FBQ3JDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBOztBQUVBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7QUMxZkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUMxRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsd0JBQXdCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0M7QUFDbEMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDekREO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLFdBQVcscUJBQXFCLGNBQWMsaUJBQWlCLEdBQUcsR0FBRyxnQkFBZ0I7QUFDaks7QUFDQSxtQkFBbUIsdUJBQXVCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLE9BQU87QUFDUDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUNBQXlDO0FBQ3pDLENBQUM7Ozs7Ozs7Ozs7OztBQ2pFRDtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQSwwQkFBMEIsZ0JBQWdCO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04scURBQXFELEVBQUU7QUFDdkQ7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUM1REQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUEscUNBQXFDO0FBQ3JDLENBQUM7Ozs7Ozs7Ozs7OztBQy9JRDs7Ozs7Ozs7Ozs7O0FDQUEsdUMiLCJmaWxlIjoiZGV2LmFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjhhMTkyZmM1NDI4YWZkYjJjMjEzXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImFwcFwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9hcHAuanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAuanNcIik7XG4iLCJyZXF1aXJlKCcuL2NvbXBvbmVudHMvaW5kZXguc2NzcycpO1xyXG5cclxuLy9JbXBvcnQgYWxsIEpTIGZpbGVzXHJcbmNvbnN0IHJlcXVpcmVBbGwgPSByID0+IHIua2V5cygpLmZvckVhY2gocik7XHJcbnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMnLCB0cnVlLCAvXFwuanMkLykpO1xyXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vMDAtc2V0dGluZ3MvY29uZmlnLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wMC1zZXR0aW5ncy9jb25maWcuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1iYXNlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1tZW51L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1zdWItbWVudS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9idXR0b24tbGluay9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9idXR0b24tbGluay9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9jYXJkLXBhdGllbnQtdGFibGUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvY2FyZC1wYXRpZW50LXRhYmxlL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2NvbXAtbGluZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvY291bnRyeS1waG9uZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb3VudHJ5LXBob25lL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGEtdGFibGVzL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGEtdGFibGVzL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGV0aW1lLXJhbmdlLXBpY2tlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZHJhZy1kcm9wL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RyYWctZHJvcC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wZG93bi1jYXRlZ29yaWVzL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3Bkb3duLWNhdGVnb3JpZXMvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZHJvcHpvbmUvZHJvcHpvbmUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3B6b25lL2Ryb3B6b25lLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9leHBhbmRhYmxlLWdyb3VwL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2V4cGFuZGFibGUtZ3JvdXAvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2V4cGFuZGFibGUtbGluay9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9mdWxsc2NyZWVuLXRhYnMtd3JhcHBlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9mdWxsc2NyZWVuLXRhYnMtd3JhcHBlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1nYWxsZXJ5L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2dlbmVyaWMtZ3JpZC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdyaWQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaG9yaXpvbnRhbC10b29sYmFyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2hvcml6b250YWwtdG9vbGJhci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC1sYXNhL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LWxhc2Evc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaW5wdXQtd2l0aC1jbGVhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC13aXRoLWNsZWFyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtYWRkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtYWRkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtY2FyZC1saXN0L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtY2FyZC1saXN0L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtZGV0YWlscy1leHBhbmQtYm94L3NjcmlwdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbGluZS1kZXRhaWxzLWV4cGFuZC1ib3gvc2NyaXB0LmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9sb2NhdGlvbi1ib3gvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L21haW4taW50ZXJhY3RpdmUtY2FyZC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tYWluLWludGVyYWN0aXZlLWNhcmQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbXVsdGlwbGUtc2VsZWN0aW9uLWJ1dHRvbi9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL2NvbmZpcm1hdGlvbi1wYW5lbC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcG9wdXAuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL2NvbmZpcm1hdGlvbi1wb3B1cC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQtbm90aWZ5LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC1ub3RpZnkuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcG9wdXAtbWVudS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcG9wdXAtbWVudS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2FwcGhpcmUtcGFuZWwuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NhcHBoaXJlLXBhbmVsLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3BhdGllbnQtY2FsbC1jYW5jZWwtc3RydWN0dXJlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3BhdGllbnQtY2FsbC1jYW5jZWwtc3RydWN0dXJlLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3BhdGllbnQtY2FsbC1jYW5jZWwuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhdGllbnQtY2FsbC1jYW5jZWwvcGF0aWVudC1jYWxsLWNhbmNlbC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGVyc29uLWNhcmQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGVyc29uLWNhcmQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWNhcmQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWNhcmQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWV4cGFuZGFibGUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWV4cGFuZGFibGUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtaGVhZGVyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1wb3B1cC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1wb3B1cC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1yYWRpby1idXR0b24vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NjYWxlcy9zY2FsZS1tYWluLXN0cnVjdHVyZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2NhbGVzL3NjYWxlLW1haW4tc3RydWN0dXJlLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zY2FsZXMvdG9nZ2xlLWl0ZW0tY29udHJvbC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2NhbGVzL3RvZ2dsZS1pdGVtLWNvbnRyb2wuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaC1hbmQtc2VsZWN0L3NlbGVjdC1zc2QuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaC1hbmQtc2VsZWN0L3NlbGVjdC1zc2QuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaC1hbmQtc2VsZWN0L3NzZC1zZWFyY2guanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaC1hbmQtc2VsZWN0L3NzZC1zZWFyY2guanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaGFibGUtY2xpZW50LXNpZGUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VhcmNoYWJsZS1jbGllbnQtc2lkZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtY3VzdG9tL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1jdXN0b20vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWluc2lkZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtaW5zaWRlL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlbGVjdC1zeXN0ZW0vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VsZWN0LXN5c3RlbS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zaGlmdC1jb250YWluZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGUtbWVudS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zaWRlLW1lbnUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2lkZWJhci9zaWRlYmFyLXN0cnVjdHVyZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2lkZWJhci9zaWRlYmFyLXN0cnVjdHVyZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci1ob3Jpem9udGFsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItaG9yaXpvbnRhbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItdmVydGljYWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3BsaXQtYnV0dG9uL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwbGl0LWJ1dHRvbi9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtY29tcG9uZW50LWJsb2NrL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1jb21wb25lbnQtYmxvY2svc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWxpc3QtbGluZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtbGlzdC1saW5lL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFicy1leHRlbmRlZC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJ1bGFyLWxpc3Qvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFidWxhci1saXN0L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnVsYXItc2Nyb2xsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnVsYXItc2Nyb2xsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RyaWdnZXItaWZyYW1lLXRvb2x0aXAvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC90cmlnZ2VyLWlmcmFtZS10b29sdGlwLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90cnVuY2F0ZWQtY29udGVudC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90cnVuY2F0ZWQtY29udGVudC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC92ZXJ0aWNhbC1jYXJyb3VzZWwvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdmVydGljYWwtY2Fycm91c2VsL3NjcmlwdHMuanNcIixcblx0XCIuL2dsb2JhbHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2dsb2JhbHMuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvY29tcG9uZW50cyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLmpzJFwiOyIsIlNhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzIHx8IHt9O1xyXG4iLCIvKiBDb21wb25lbnQgTGF5b3V0QmFzZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgTGF5b3V0QmFzZShjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0fTtcclxuXHJcblx0dmFyIG9wZW5TaWRlYmFySWZyYW1lID0gZnVuY3Rpb24oZHVyYXRpb24pIHtcclxuXHRcdHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS53aWRnZXRJZF0ub3BlblNpZGViYXJJZnJhbWUoZHVyYXRpb24pO1xyXG5cdH07XHJcblxyXG5cdHZhciBjbG9zZVNpZGViYXJJZnJhbWUgPSBmdW5jdGlvbihkdXJhdGlvbikge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLndpZGdldElkXS5jbG9zZVNpZGViYXJJZnJhbWUoZHVyYXRpb24pO1xyXG5cdH07XHJcblxyXG5cdHZhciBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbigkZWxlbWVudCkge1xyXG5cdFx0dmFyICR0YXJnZXRFbGVtZW50ID0gJGVsZW1lbnQ7XHJcblxyXG5cdFx0aWYgKCEhJHRhcmdldEVsZW1lbnQubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBzY3JvbGxUb09mZnNldEludGVydmFsO1xyXG5cclxuXHRcdFx0c2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICh3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLmdldFRocmVzaG9sZHMoKS5zZWNvbmRhcnlUaHJlc2hvbGQgPiAwKSB7XHJcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwpO1xyXG5cclxuXHRcdFx0XHRcdHZhciB0YXJnZXRFbGVtZW50T2Zmc2V0VG9wID0gJHRhcmdldEVsZW1lbnQub2Zmc2V0KCkudG9wO1xyXG5cdFx0XHRcdFx0dmFyIGRpc2NvdW50O1xyXG5cclxuXHRcdFx0XHRcdGlmICghISQoJy5MYXlvdXRCYXNlLWVtZXJnZW5jeScpLnRleHQoKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoJCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5JykuaGFzQ2xhc3MoJ2lzRml4ZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gMTUwO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gODA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZGlzY291bnQgPSAzOTA7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAoJCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5JykuaGFzQ2xhc3MoJ2lzRml4ZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gODA7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudE9mZnNldFRvcCArPSAyMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRkaXNjb3VudCA9IDEwMDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQkKCdib2R5LCBodG1sJykuc2Nyb2xsVG9wKHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgLSBkaXNjb3VudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHZhciBMYXlvdXRCYXNlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5sYXlvdXRCYXNlUmVkcmF3VGltZXIgPSAwO1xyXG5cdFx0dGhpcy5oYXNIZWFkZXIgPSBjb25maWcuaGFzSGVhZGVyO1xyXG5cdFx0dGhpcy5pc0V4cGFuZGFibGUgPSBjb25maWcuaXNFeHBhbmRhYmxlO1xyXG5cdFx0dGhpcy5pc1RvcFdpbmRvdyA9IHdpbmRvdy50b3AgPT09IHdpbmRvdy5zZWxmID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xyXG5cdFx0dGhpcy4kd3JhcHBlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1XcmFwcGVyJyk7XHJcblx0XHR0aGlzLiRzcGFjZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2Utc3BhY2VyJyk7XHJcblx0XHR0aGlzLiRtYWluTWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1NYWluTWVudScpO1xyXG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLWhlYWRlcicpO1xyXG5cdFx0dGhpcy4kaGVhZGVyQm9keSA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYm9keScpO1xyXG5cdFx0dGhpcy4kcHJpbWFyeU1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtcHJpbWFyeS1tZW51Jyk7XHJcblx0XHR0aGlzLiRlbWVyZ2VuY3kgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtZW1lcmdlbmN5Jyk7XHJcblx0XHR0aGlzLiRzZWNvbmRhcnkgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5Jyk7XHJcblx0XHR0aGlzLiRzZWNvbmRhcnlNZW51ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXNlY29uZGFyeS1tZW51Jyk7XHJcblx0XHR0aGlzLiRpZnJhbWVTaWRlYmFyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLWlmcmFtZXNpZGViYXInKTtcclxuXHRcdHRoaXMuJGhlYWRlckFkZGl0aW9uYWxDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1hZGRpdGlvbmFsLWNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJHRvcGZpeGVkQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS10b3BmaXhlZGNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJGJvdHRvbWZpeGVkQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1ib3R0b21maXhlZGNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJG1haW5Db250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLU1haW5Db250ZW50Jyk7XHJcblx0XHR0aGlzLmV4dHJhUGFkZGluZ0VtZXJnZW5jeSA9IDA7XHJcblx0XHR0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeSA9IDA7XHJcblx0XHR0aGlzLnNldHVwV2luZG93RXZlbnRzKCk7XHJcblx0XHR0aGlzLiRpZnJhbWVTaWRlYmFyLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxkcy1yaW5nXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nKTtcclxuXHJcblx0XHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ0xheW91dEJhc2UnKTtcclxuXHRcdFx0aWYgKF90aGlzLmlzVG9wV2luZG93KSB7XHJcblx0XHRcdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5jbGljaygpO1xyXG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5zZXR1cFdpbmRvd0V2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBjdXJzb3JQb3NpdG9uID0gMDtcclxuXHJcblx0XHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRfdGhpcy51cGRhdGVUaHJlc2hvbGRzKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycygpO1xyXG5cdFx0XHRfdGhpcy5oYW5kbGVMYXlvdXRUb3BQYWRkaW5nKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBuZXdQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoX3RoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyKTtcclxuXHRcdFx0X3RoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlVGhyZXNob2xkcygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZUxheW91dFRvcFBhZGRpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVMYXlvdXRCb3R0b21QYWRkaW5nKCk7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlTWFuYWdlUXVldWVDYXJkKGN1cnNvclBvc2l0b24sIG5ld1Bvc2l0aW9uKTtcclxuXHRcdFx0XHRjdXJzb3JQb3NpdG9uID0gbmV3UG9zaXRpb247XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVPcHRpb25hbENvbnRhaW5lcnMgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuJGVtZXJnZW5jeS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0aWYgKHNjcm9sbFRvcCArIHRoaXMuY29udGVudFRocmVzaG9sZCA+IHRoaXMuZW1lcmdlbmN5VGhyZXNob2xkKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LmFkZENsYXNzKCdpc0ZpeGVkJyk7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6IHRoaXMuY29udGVudFRocmVzaG9sZCxcclxuXHRcdFx0XHRcdHdpZHRoOiB0aGlzLiRoZWFkZXIud2lkdGgoKSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ0VtZXJnZW5jeSA9IHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kucmVtb3ZlQ2xhc3MoJ2lzRml4ZWQnKTtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ0VtZXJnZW5jeSA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5Lmxlbmd0aCA9PT0gMSAmJiB0aGlzLiRzZWNvbmRhcnkudGV4dCgpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Y29uc3QgZXZlbnRUb29sYmFyID0gbmV3IEN1c3RvbUV2ZW50KCdUb29sYmFyRml4ZWQnKTtcclxuXHRcdFx0Y29uc3QgaGFzQ2xhc3MgPSB0aGlzLiRzZWNvbmRhcnkuaGFzQ2xhc3MoJ2lzRml4ZWQnKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLiRzZWNvbmRhcnlNZW51LnRleHQoKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuYWRkQ2xhc3MoJ25vVG9vbGJhcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2Nyb2xsVG9wICsgdGhpcy5jb250ZW50VGhyZXNob2xkICsgKHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKSB8fCAwKSA+IHRoaXMuc2Vjb25kYXJ5VGhyZXNob2xkKSB7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdpc0ZpeGVkJykuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogdGhpcy5jb250ZW50VGhyZXNob2xkICsgKHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKSB8fCAwKSxcclxuXHRcdFx0XHRcdHdpZHRoOiB0aGlzLiRoZWFkZXIud2lkdGgoKSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnlcclxuXHRcdFx0XHRcdC5maW5kKCcuQnV0dG9uLlNlY29uZCwgLkJ1dHRvbi5UaGlyZCwgLkJ1dHRvbi5MaW5rJylcclxuXHRcdFx0XHRcdC5ub3QoJy5QYW5lbCAuQnV0dG9uLlNtYWxsLCAuUGFuZWwgLkJ1dHRvbi5UaGlyZCcpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ1NtYWxsJyk7XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeS5maW5kKCcuVG9vbGJhcicpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldFRvb2xiYXJXaWR0aCA9ICQoJy5TYXBwaGlyZUhlYWRlcicpLm91dGVyV2lkdGgodHJ1ZSkgKiAwLjY2O1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykud2lkdGgodGFyZ2V0VG9vbGJhcldpZHRoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeU1lbnUudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdub1Rvb2xiYXInKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4kcHJpbWFyeU1lbnUuY3NzKCdvcGFjaXR5JywgMCk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSB0aGlzLiRzZWNvbmRhcnkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG5cdFx0XHRcdGlmICghaGFzQ2xhc3MpIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50VG9vbGJhcik7XHJcblxyXG5cdFx0XHRcdC8vIC8vXHJcblx0XHRcdFx0Ly8gdmFyIGN1cnJlbnRIZWlnaHQgPSAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0XHRcdC8vIHZhciBjb21wZW5zYXRpb24gPSB0aGlzLnJlZmVyZW5jZUhlaWdodCAtIGN1cnJlbnRIZWlnaHQ7XHJcblxyXG5cdFx0XHRcdC8vIGlmIChjb21wZW5zYXRpb24gPD0gMCkge1xyXG5cdFx0XHRcdC8vIFx0Ly8gdGhpcy4kbGF5b3V0QmFzZUNvbnRlbnQuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHRcdFx0XHQvLyB9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIFx0dGhpcy4kbGF5b3V0QmFzZUNvbnRlbnQuY3NzKCdwYWRkaW5nLWJvdHRvbScsIGNvbXBlbnNhdGlvbik7XHJcblx0XHRcdFx0Ly8gfVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIHRoaXMuJGxheW91dEJhc2VDb250ZW50LmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5yZW1vdmVDbGFzcygnaXNGaXhlZCcpLmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5CdXR0b24uU2Vjb25kLCAuQnV0dG9uLlRoaXJkLCAuQnV0dG9uLkxpbmsnKS5yZW1vdmVDbGFzcygnU21hbGwnKTtcclxuXHRcdFx0XHR0aGlzLiRwcmltYXJ5TWVudS5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuY3NzKHtcclxuXHRcdFx0XHRcdGhlaWdodDogJ3Vuc2V0JyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLlRvb2xiYXInKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeSA9IDA7XHJcblxyXG5cdFx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50VG9vbGJhcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLiRzZWNvbmRhcnlNZW51LnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5DbGluaWNpYW5Xb3JrQXJlYS1jb2x1bW5zLWJpZycpLmNzcygnbWFyZ2luLXRvcCcsICd1bnNldCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuQ2xpbmljaWFuV29ya0FyZWEtY29sdW1ucy1iaWcnKS5jc3MoJ21hcmdpbi10b3AnLCAtdGhpcy4kc2Vjb25kYXJ5Lm91dGVySGVpZ2h0KHRydWUpKTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnlNZW51LmNzcygnYmFja2dyb3VuZC1jb2xvcicsICd0cmFuc3BhcmVudCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuaGFuZGxlTGF5b3V0VG9wUGFkZGluZyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHBhZGRpbmdUb3AgPSB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgKyB0aGlzLmV4dHJhUGFkZGluZ0VtZXJnZW5jeSArIHRoaXMuZXh0cmFQYWRkaW5nU2Vjb25kYXJ5O1xyXG5cdFx0dGhpcy4kc3BhY2VyLnN0b3AoKS5hbmltYXRlKFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aGVpZ2h0OiBwYWRkaW5nVG9wLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHQwLFxyXG5cdFx0XHQnbGluZWFyJ1xyXG5cdFx0KTtcclxuXHRcdGlmICh0aGlzLiR0b3BmaXhlZENvbnRlbnQubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHRoaXMuJHRvcGZpeGVkQ29udGVudC5jc3Moe1xyXG5cdFx0XHRcdHdpZHRoOiAkKCcuTGF5b3V0QmFzZS1NYWluQ29udGVudCcpLndpZHRoKCksXHJcblx0XHRcdFx0dG9wOiB0aGlzLnRvcGZpeGVkQ29udGVudFRocmVzaG9sZCArICdweCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLiRib3R0b21maXhlZENvbnRlbnQubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmICgkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0ID4gJCgnYm9keScpLmhlaWdodCgpKSB7XHJcblx0XHRcdFx0dmFyIGJvdHRvbUZpeGVkSGVpZ2h0ID0gdGhpcy4kYm90dG9tZml4ZWRDb250ZW50Lm91dGVySGVpZ2h0KHRydWUpO1xyXG5cdFx0XHRcdHRoaXMuJHdyYXBwZXIuYWRkQ2xhc3MoJ2hhc0ZpeGVkQm90dG9tJykuY3NzKCdwYWRkaW5nLWJvdHRvbScsIGJvdHRvbUZpeGVkSGVpZ2h0ICsgJ3B4Jyk7XHJcblx0XHRcdFx0dGhpcy4kYm90dG9tZml4ZWRDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0XHR3aWR0aDogJCgnLkxheW91dEJhc2UtTWFpbkNvbnRlbnQnKS5vdXRlcldpZHRoKHRydWUpLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2hhc0ZpeGVkQm90dG9tJykuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHRcdFx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRcdHdpZHRoOiAnJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLnVwZGF0ZVRocmVzaG9sZHMgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBtYWluTWVudUhlaWdodCA9IHRoaXMuJG1haW5NZW51Lm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgaGVhZGVyQm9keUhlaWdodCA9IHRoaXMuJGhlYWRlckJvZHkub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgdGhpcy4kaGVhZGVyLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgdG9wZml4ZWRDb250ZW50SGVpZ2h0ID0gdGhpcy4kdG9wZml4ZWRDb250ZW50Lm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgcHJpbWFyeU1lbnVIZWlnaHQgPSB0aGlzLiRwcmltYXJ5TWVudS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIGVtZXJnZW5jeUhlaWdodCA9IHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQ7XHJcblx0XHR0aGlzLmNvbnRlbnRUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQ7XHJcblx0XHR0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCA9IG1haW5NZW51SGVpZ2h0ICsgaGVhZGVyQm9keUhlaWdodCArIHRvcGZpeGVkQ29udGVudEhlaWdodCArIHByaW1hcnlNZW51SGVpZ2h0O1xyXG5cdFx0dGhpcy5zZWNvbmRhcnlUaHJlc2hvbGQgPVxyXG5cdFx0XHRtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQgKyBwcmltYXJ5TWVudUhlaWdodCArIGVtZXJnZW5jeUhlaWdodDtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5nZXRUaHJlc2hvbGRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQ6IHRoaXMudG9wZml4ZWRDb250ZW50VGhyZXNob2xkLFxyXG5cdFx0XHRjb250ZW50VGhyZXNob2xkOiB0aGlzLmNvbnRlbnRUaHJlc2hvbGQsXHJcblx0XHRcdGVtZXJnZW5jeVRocmVzaG9sZDogdGhpcy5lbWVyZ2VuY3lUaHJlc2hvbGQsXHJcblx0XHRcdHNlY29uZGFyeVRocmVzaG9sZDogdGhpcy5zZWNvbmRhcnlUaHJlc2hvbGQsXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLm9wZW5TaWRlYmFySWZyYW1lID0gZnVuY3Rpb24oZHVyYXRpb25faW4pIHtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uX2luID49IDAgPyBkdXJhdGlvbl9pbiA6IDEwMDtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYW5pbWF0ZShcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdH0sXHJcblx0XHRcdGR1cmF0aW9uXHJcblx0XHQpO1xyXG5cdFx0JCgnYm9keScpXHJcblx0XHRcdC5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJylcclxuXHRcdFx0LmNsaWNrKCk7XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuY2xvc2VTaWRlYmFySWZyYW1lID0gZnVuY3Rpb24oZHVyYXRpb25faW4pIHtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uX2luID49IDAgPyBkdXJhdGlvbl9pbiA6IDEwMDtcclxuXHRcdHZhciB0YXJnZXRXaWR0aCA9IHRoaXMuaXNFeHBhbmRhYmxlID8gNDAgOiAyNjI7XHJcblx0XHR0aGlzLiRpZnJhbWVTaWRlYmFyLmFuaW1hdGUoXHJcblx0XHRcdHtcclxuXHRcdFx0XHR3aWR0aDogdGFyZ2V0V2lkdGgsXHJcblx0XHRcdH0sXHJcblx0XHRcdGR1cmF0aW9uXHJcblx0XHQpO1xyXG5cdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVNYW5hZ2VRdWV1ZUNhcmQgPSBmdW5jdGlvbihjdXJzb3JQb3NpdG9uLCBuZXdQb3NpdGlvbikge1xyXG5cdFx0Y29uc3QgJG1hbmFnZVF1ZXVlID0gJCgnLk1hbmFnZVF1ZXVlQ29udGFpbmVyJyk7XHJcblxyXG5cdFx0aWYgKCRtYW5hZ2VRdWV1ZS5sZW5ndGgpIHtcclxuXHRcdFx0aWYgKG5ld1Bvc2l0aW9uID4gY3Vyc29yUG9zaXRvbikge1xyXG5cdFx0XHRcdCRtYW5hZ2VRdWV1ZS5hZGRDbGFzcygnTWFuYWdlUXVldWVDb250YWluZXItLWNsb3NlZCcpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG5ld1Bvc2l0aW9uIDwgY3Vyc29yUG9zaXRvbikge1xyXG5cdFx0XHRcdCRtYW5hZ2VRdWV1ZS5yZW1vdmVDbGFzcygnTWFuYWdlUXVldWVDb250YWluZXItLWNsb3NlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2UgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRjbG9zZVNpZGViYXJJZnJhbWUsXHJcblx0XHRvcGVuU2lkZWJhcklmcmFtZSxcclxuXHRcdHNjcm9sbFRvRWxlbWVudCxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBMYXlvdXRCbGFuayAqL1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAod2luZG93LmZyYW1lRWxlbWVudCkge1xyXG5cdFx0aWYgKCEhJCh0aGlzLmZyYW1lRWxlbWVudCkuY2xvc2VzdCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQnKS5sZW5ndGgpIHtcclxuXHRcdFx0JCgnLkxheW91dEJsYW5rLlBhZ2UnKS5hZGRDbGFzcygnTWFpbkludGVyYWN0aXZlQ2FyZCcpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiLyogQ29tcG9uZW50IExheW91dFBvcHVwICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgcG9wdXBXaWR0aDtcclxuXHR2YXIgcG9wdXBNaW5XaWR0aDtcclxuXHR2YXIgcG9wdXBIZWlnaHQ7XHJcblx0dmFyIHBvcHVwTWluSGVpZ2h0O1xyXG5cdHZhciBwb3B1cE1heEhlaWdodDtcclxuXHR2YXIgcG9wdXBXaWR0aFBlcmNlbnRhZ2U7XHJcblx0dmFyIGxheW91dFBvcHVwUmVzaXplVGltZXI7XHJcblxyXG5cdHZhciAkcG9wdXAgPSAkKCcuTGF5b3V0UG9wdXAnKTtcclxuXHR2YXIgJG9zUG9wdXAgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC1Qb3B1cC5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKTtcclxuXHR2YXIgJG9zUG9wdXBDb250ZW50ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLWNvbnRlbnQub3MtaW50ZXJuYWwtdWktd2lkZ2V0LWNvbnRlbnQnKTtcclxuXHR2YXIgJG92ZXJsYXkgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC11aS13aWRnZXQtb3ZlcmxheScpO1xyXG5cdHZhciBwb3B1cFNpemU7XHJcblxyXG5cdGNvbnN0IEJPRFlfUEFERElOR19UT1BfQk9UVE9NID0gNjA7XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHBvcHVwU2l6ZSA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuUG9wdXBTaXplO1xyXG5cclxuXHRcdCQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnTGF5b3V0UG9wdXAnKTsgLy8gYmVjYXVzZSBkYXRldGltZXJhbmdlcGlja2VyIGlzIGF0dGFjaGVkIHRvIGJvZHlcclxuXHJcblx0XHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2gpIHtcclxuXHRcdFx0XHQkcG9wdXAuYWRkQ2xhc3MoJ2lzVG91Y2gnKTtcclxuXHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2lzVG91Y2gnKTsgLy8gYmVjYXVzZSBzZWxlY3QyIGlzIGF0dGFjaGVkIHRvIGJvZHlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24obXV0YXRpb25zKSB7XHJcblx0XHRcdFx0bXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24sIGluZGV4KSB7XHJcblx0XHRcdFx0XHRyZWRyYXdEaWFsb2dXaW5kb3coKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuXHRcdFx0XHRjaGlsZExpc3Q6IHRydWUsXHJcblx0XHRcdFx0c3VidHJlZTogdHJ1ZSxcclxuXHRcdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkKCdib2R5JykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcy5mcmFtZUVsZW1lbnQpLmNzcyh7XHJcblx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHRoZWlnaHQ6ICcxMDAlJyxcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlc2l6ZURpYWxvZygpO1xyXG5cdFx0XHRcdHJlc2l6ZUNvbnRlbnQoKTtcclxuXHRcdFx0XHQkKCdib2R5JykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0fSwgMTUwKTtcclxuXHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLnJlZHJhd0RpYWxvZ1dpbmRvdyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdy5wYXJlbnQpXHJcblx0XHRcdC5vZmYoJ3Jlc2l6ZS5MYXlvdXRQb3B1cCcpXHJcblx0XHRcdC5vbigncmVzaXplLkxheW91dFBvcHVwJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVkcmF3RGlhbG9nV2luZG93KCk7XHJcblx0XHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlZHJhd0RpYWxvZ1dpbmRvdyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KGxheW91dFBvcHVwUmVzaXplVGltZXIpO1xyXG5cdFx0bGF5b3V0UG9wdXBSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlc2l6ZURpYWxvZygpO1xyXG5cdFx0XHRyZXNpemVDb250ZW50KCk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0fSwgMzAwKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZXNpemVEaWFsb2cgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmhhc0Nsb3NlKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLXVpLWRpYWxvZy10aXRsZWJhcicpLnNob3coKTtcclxuXHJcblx0XHRcdGlmICh3aW5kb3cudG9wLl9pZnJhbWVQb3B1cCAhPSB1bmRlZmluZWQgfHwgZmFsc2UpIHtcclxuXHRcdFx0XHRjb25zdCAkY2xvc2VCdXR0b24gPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctdGl0bGViYXItY2xvc2UnKTtcclxuXHJcblx0XHRcdFx0JGNsb3NlQnV0dG9uLnJlbW92ZUF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHQkY2xvc2VCdXR0b24ub2ZmKCdjbGljaycpLm9uKCdjbGljaycsICgpID0+IHdpbmRvdy50b3AuX2lmcmFtZVBvcHVwLlNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBvcHVwLmNsb3NlKCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdpbmRvdy50b3AuJCgnYm9keScpLmhhc0NsYXNzKCdMYXlvdXRCYXNlJykpIHtcclxuXHRcdFx0d2luZG93LnRvcC4kKCdib2R5JykuY3NzKHtcclxuXHRcdFx0XHRvdmVyZmxvd1k6ICdoaWRkZW4nLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQkb3ZlcmxheS53aWR0aCgnMTAwJScpO1xyXG5cclxuXHRcdGNhbGNXaWR0aFBlcmNlbnRhZ2UocG9wdXBTaXplLCAkb3NQb3B1cENvbnRlbnQpO1xyXG5cclxuXHRcdCRvc1BvcHVwLmNzcyh7XHJcblx0XHRcdGxlZnQ6ICd1bnNldCcsXHJcblx0XHRcdHRvcDogJ3Vuc2V0JyxcclxuXHRcdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRcdG1pbldpZHRoOiBwb3B1cE1pbldpZHRoICsgJ3B4JyxcclxuXHRcdFx0d2lkdGg6IHBvcHVwV2lkdGggKyAncHgnLFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVzaXplQ29udGVudCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRib2R5ID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jyk7XHJcblx0XHR2YXIgY29udGVudFNjcm9sbFRvcCA9ICRib2R5LnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdGlmIChwb3B1cFNpemUgPT09ICdTbWFsbCcgJiYgJCgnLmRhdGVyYW5nZXBpY2tlcjp2aXNpYmxlJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHQvLyBza2lwIHRoZSByZXNldCBvZiAuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCRib2R5LmNzcyh7XHJcblx0XHRcdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBoZWFkZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2hlYWRlcicpLmlubmVySGVpZ2h0KCkgfHwgMDtcclxuXHRcdHZhciBpbnRyb0hlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9faW50cm8nKS5pbm5lckhlaWdodCgpIHx8IDA7XHJcblx0XHR2YXIgYm9keUhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpWzBdLnNjcm9sbEhlaWdodCB8fCAwO1xyXG5cdFx0dmFyIGZvb3RlckhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9fZm9vdGVyJykuaW5uZXJIZWlnaHQoKSB8fCAwO1xyXG5cdFx0dmFyIGNvbnRlbnRIZWlnaHQgPSBoZWFkZXJIZWlnaHQgKyBpbnRyb0hlaWdodCArIGJvZHlIZWlnaHQgKyBmb290ZXJIZWlnaHQgKyBCT0RZX1BBRERJTkdfVE9QX0JPVFRPTTtcclxuXHRcdHZhciBkaWFsb2dIZWlnaHQgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC1Qb3B1cC5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKS5vdXRlckhlaWdodCgpO1xyXG5cdFx0Y29uc3Qgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cucGFyZW50KS5oZWlnaHQoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnKSB7XHJcblx0XHRcdHZhciBwYXJlbnRIZWlnaHQgPSAkKHdpbmRvdy5wYXJlbnQpLmhlaWdodCgpO1xyXG5cclxuXHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPiBwYXJlbnRIZWlnaHQpIHtcclxuXHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KHBhcmVudEhlaWdodCAtIDcwKTtcclxuXHRcdFx0XHQkYm9keS5oZWlnaHQoJG9zUG9wdXBDb250ZW50LmhlaWdodCgpIC0gQk9EWV9QQURESU5HX1RPUF9CT1RUT00pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChjb250ZW50SGVpZ2h0IDwgZGlhbG9nSGVpZ2h0ICYmIFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNGaXhlZEhlaWdodCkge1xyXG5cdFx0XHRcdHZhciBmb3JjZWRCb2R5SGVpZ2h0ID0gZGlhbG9nSGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW50cm9IZWlnaHQgLSBmb290ZXJIZWlnaHQgLSBCT0RZX1BBRERJTkdfVE9QX0JPVFRPTTtcclxuXHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA8IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPCBwb3B1cE1pbkhlaWdodCkge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmVyZW5jZSA9IHBvcHVwTWluSGVpZ2h0IC0gY29udGVudEhlaWdodDtcclxuXHRcdFx0XHRcdCRib2R5LmhlaWdodChib2R5SGVpZ2h0ICsgZGlmZXJlbmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA+PSBkaWFsb2dIZWlnaHQgJiYgU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc0ZpeGVkSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBkaWFsb2dIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCAtIGZvb3RlckhlaWdodCAtIEJPRFlfUEFERElOR19UT1BfQk9UVE9NO1xyXG5cdFx0XHRcdCRib2R5LmhlaWdodChmb3JjZWRCb2R5SGVpZ2h0KTtcclxuXHRcdFx0fSBlbHNlIGlmIChjb250ZW50SGVpZ2h0ID49IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdGlmIChjb250ZW50SGVpZ2h0ID4gcG9wdXBNYXhIZWlnaHQpIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQocG9wdXBNYXhIZWlnaHQpO1xyXG5cdFx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBwb3B1cE1heEhlaWdodCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0IC0gZm9vdGVySGVpZ2h0IC0gQk9EWV9QQURESU5HX1RPUF9CT1RUT007XHJcblx0XHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybignVW5leHBlY3RlZCBjb21iaW5hdGlvbi4uLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSGFuZGxlIHdoZW4gRGF0ZVRpbWVSYW5nZVBpY2tlciBpcyBvcGVuZWRcclxuXHRcdHZhciBkYXRlUmFuZ2VQaWNrZXIgPSAkKCcuZGF0ZXJhbmdlcGlja2VyOnZpc2libGUnKTtcclxuXHRcdGlmIChkYXRlUmFuZ2VQaWNrZXIubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmIChkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gZGlhbG9nSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVuY2UgPSBkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC0gZGlhbG9nSGVpZ2h0O1xyXG5cdFx0XHRcdHZhciBib2R5SGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG5cdFx0XHRcdCQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpLmhlaWdodChib2R5SGVpZ2h0ICsgZGlmZmVyZW5jZSArIEJPRFlfUEFERElOR19UT1BfQk9UVE9NKTtcclxuXHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KCQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQpO1xyXG5cclxuXHRcdFx0XHRjb25zdCBwb3B1cFRvdGFsSGVpZ2h0ID0gJG9zUG9wdXBDb250ZW50LmhlaWdodCgpO1xyXG5cdFx0XHRcdGNvbnN0IG5ld0NvbnRlbnRIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2JvZHknKS5vdXRlckhlaWdodCh0cnVlKSArIGhlYWRlckhlaWdodCArIGludHJvSGVpZ2h0ICsgZm9vdGVySGVpZ2h0O1xyXG5cclxuXHRcdFx0XHRpZiAod2luZG93SGVpZ2h0IDwgNzIwKSB7XHJcblx0XHRcdFx0XHRjb25zdCBjb29yZHMgPSBkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdFx0XHR2YXIgcG9pbnQgPSB3aW5kb3cucGFyZW50LnNjcm9sbFkgKyBjb29yZHMudG9wIC0gY29vcmRzLmhlaWdodDtcclxuXHRcdFx0XHRcdGRhdGVSYW5nZVBpY2tlci5hZGRDbGFzcygnZHJvcC11cCcpLmNzcygndG9wJywgcG9pbnQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAod2luZG93SGVpZ2h0IDwgOTgwICYmIG5ld0NvbnRlbnRIZWlnaHQgPiBwb3B1cFRvdGFsSGVpZ2h0KSB7XHJcblx0XHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRcdFx0bWF4SGVpZ2h0OiBuZXdDb250ZW50SGVpZ2h0ICsgJ3B4JyxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdCRib2R5LnNjcm9sbFRvcChjb250ZW50U2Nyb2xsVG9wKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBpbmNyZWFzZUhlaWdodCA9IGZ1bmN0aW9uKGRpZmVyZW5jZSkge1xyXG5cdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodCgkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KCkgKyBkaWZlcmVuY2UpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHNjcm9sbFRvRWxlbWVudCA9IGZ1bmN0aW9uKCRlbGVtZW50KSB7XHJcblx0XHR2YXIgJHRhcmdldEVsZW1lbnQgPSAkZWxlbWVudDtcclxuXHRcdGlmICghISR0YXJnZXRFbGVtZW50Lmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbDtcclxuXHRcdFx0c2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCk7XHJcblx0XHRcdFx0dmFyIGhlYWRlckhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9faGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdFx0XHR2YXIgaW50cm9IZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2ludHJvJykub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdFx0XHR2YXIgY3VycmVudEJvZHlTY3JvbGwgPSAkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKVswXS5zY3JvbGxUb3AgfHwgMDtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0RWxlbWVudE9mZnNldFRvcCA9ICR0YXJnZXRFbGVtZW50Lm9mZnNldCgpLnRvcCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0ICsgY3VycmVudEJvZHlTY3JvbGwgLSAyMDtcclxuXHRcdFx0XHQkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKS5zY3JvbGxUb3AodGFyZ2V0RWxlbWVudE9mZnNldFRvcCk7XHJcblx0XHRcdH0sIDI1MCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY2FsY1dpZHRoUGVyY2VudGFnZSA9ICgpID0+IHtcclxuXHRcdGNvbnN0IHdpbmRvd0hlaWdodCA9ICQod2luZG93LnBhcmVudCkuaGVpZ2h0KCk7XHJcblx0XHRjb25zdCB3aW5kb3dXaWR0aCA9ICQod2luZG93LnBhcmVudCkud2lkdGgoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnKSB7XHJcblx0XHRcdGxldCBwZXJjZW50YWdlID0gMC4zMztcclxuXHJcblx0XHRcdGlmICh3aW5kb3dXaWR0aCA8PSAxMDI0KSBwZXJjZW50YWdlID0gMC41O1xyXG5cdFx0XHRlbHNlIGlmICh3aW5kb3dXaWR0aCA+IDEwMjQgJiYgd2luZG93V2lkdGggPD0gMTQ0MCkgcGVyY2VudGFnZSA9IDAuNDtcclxuXHJcblx0XHRcdHBvcHVwV2lkdGggPSBwYXJzZUludCh3aW5kb3dXaWR0aCAqIHBlcmNlbnRhZ2UpO1xyXG5cdFx0XHRwb3B1cE1pbldpZHRoID0gNDAwO1xyXG5cdFx0fSBlbHNlIGlmIChwb3B1cFNpemUgPT09ICdNZWRpdW0nKSB7XHJcblx0XHRcdGlmICh3aW5kb3dXaWR0aCA8PSAxMDI0KSBwb3B1cFdpZHRoUGVyY2VudGFnZSA9IDAuODtcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0c3dpdGNoIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLlBvcHVwV2lkdGgpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ1hTbWFsbCc6XHJcblx0XHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSAyMDA7XHJcblx0XHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC4yO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ1NtYWxsJzpcclxuXHRcdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDMwMDtcclxuXHRcdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjM7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnTWVkaXVtJzpcclxuXHRcdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDcwMDtcclxuXHRcdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjY7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDcwMDtcclxuXHRcdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwb3B1cFdpZHRoUGVyY2VudGFnZSA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNUb3VjaCA/IDAuOCA6IHBvcHVwV2lkdGhQZXJjZW50YWdlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwb3B1cFdpZHRoID0gcGFyc2VJbnQod2luZG93V2lkdGggKiBwb3B1cFdpZHRoUGVyY2VudGFnZSk7XHJcblx0XHRcdHBvcHVwTWluSGVpZ2h0ID0gMTAwO1xyXG5cdFx0XHRwb3B1cE1heEhlaWdodCA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNUb3VjaFxyXG5cdFx0XHRcdD8gcGFyc2VJbnQod2luZG93SGVpZ2h0ICogMC45KVxyXG5cdFx0XHRcdDogcGFyc2VJbnQod2luZG93SGVpZ2h0ICogMC43KTtcclxuXHJcblx0XHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzRml4ZWRIZWlnaHQpIHBvcHVwSGVpZ2h0ID0gcG9wdXBNYXhIZWlnaHQ7XHJcblx0XHRcdGVsc2UgcG9wdXBIZWlnaHQgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC1Qb3B1cC5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKS5vdXRlckhlaWdodCgpO1xyXG5cclxuXHRcdFx0JG9zUG9wdXBDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0bWF4SGVpZ2h0OiBwb3B1cE1heEhlaWdodCArICdweCcsXHJcblx0XHRcdFx0bWluSGVpZ2h0OiBwb3B1cE1pbkhlaWdodCArICdweCcsXHJcblx0XHRcdFx0aGVpZ2h0OiBwb3B1cEhlaWdodCArICdweCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIGlmIChwb3B1cFNpemUgPT09ICdMYXJnZScpIHtcclxuXHRcdFx0cG9wdXBNaW5XaWR0aCA9IHBhcnNlSW50KHdpbmRvd1dpZHRoICogMC44KTtcclxuXHRcdFx0cG9wdXBNYXhIZWlnaHQgPSBwYXJzZUludCh3aW5kb3dIZWlnaHQgKiAwLjkpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cCA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHRcdHJlc2l6ZURpYWxvZyxcclxuXHRcdHJlc2l6ZUNvbnRlbnQsXHJcblx0XHRpbmNyZWFzZUhlaWdodCxcclxuXHRcdHJlZHJhd0RpYWxvZ1dpbmRvdyxcclxuXHRcdHNjcm9sbFRvRWxlbWVudCxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcblxyXG4kKHdpbmRvdykudW5sb2FkKGZ1bmN0aW9uKCkge1xyXG5cdGlmICghISQoJy5MYXlvdXRQb3B1cCcpLmxlbmd0aCkge1xyXG5cdFx0d2luZG93LnRvcC4kKCdib2R5JykuY3NzKHtcclxuXHRcdFx0b3ZlcmZsb3dZOiAnc2Nyb2xsJyxcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBBY3Rpb25zTWVudSAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHZhciAkdHJpZ2dlckVsZW1lbnQgPSAkKCcjJyArIGNvbmZpZy50cmlnZ2VyRWxlbWVudCk7XHJcblx0XHR2YXIgJGNvbnRlbnRFbGVtZW50ID0gJCgnIycgKyBjb25maWcuY29udGVudEVsZW1lbnQpO1xyXG5cclxuXHRcdGlmICgkY29udGVudEVsZW1lbnQudGV4dCgpLmxlbmd0aCA8IDEpIHtcclxuXHRcdFx0JHRyaWdnZXJFbGVtZW50LmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gaW5zaWRlIGEgZG9jdW1lbnQgcmVhZHkgZHVlIHRvIHNhcHBoaXJlIHBvcHVwIGJpbmRlZCBldmVudHNcclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuXHRcdFx0XHRpZiAoY29uZmlnLmxvY2FsZSA9PT0gJ0FSJykge1xyXG5cdFx0XHRcdFx0c3dpdGNoIChjb25maWcucG9zaXRpb24pIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2xlZnQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdyaWdodCc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbS1sZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdib3R0b20tcmlnaHQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICdib3R0b20tcmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2JvdHRvbS1sZWZ0JztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAndG9wLWxlZnQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ3RvcC1yaWdodCc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3RvcC1yaWdodCc6XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAndG9wLWxlZnQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkdHJpZ2dlckVsZW1lbnQudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0Y29udGVudDogJCgnPHNlY3Rpb24vPicpLmFwcGVuZCgkY29udGVudEVsZW1lbnQuY2xvbmUodHJ1ZSkpLFxyXG5cdFx0XHRcdFx0dHJpZ2dlcjogY29uZmlnLnRyaWdnZXJFdmVudCxcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcclxuXHRcdFx0XHRcdG1heFdpZHRoOiBjb25maWcubWF4V2lkdGgsXHJcblx0XHRcdFx0XHR0aGVtZTogJ3Rvb2x0aXBzdGVyLWxvY2F0aW9uLS0nICtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLmxvY2F0aW9uICtcclxuXHRcdFx0XHRcdFx0JyBBY3Rpb25zTWVudS10b29sdGlwIFBhZGRpbmctLScgK1xyXG5cdFx0XHRcdFx0XHRjb25maWcucGFkZGluZyArXHJcblx0XHRcdFx0XHRcdCcgQm9yZGVyLS0nICtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLmJvcmRlcixcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkY29udGVudEVsZW1lbnQucmVtb3ZlKCk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuQWN0aW9uc01lbnUgPSB7XHJcblx0XHRjcmVhdGVcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgQWN0aW9uc1N1Yk1lbnUgLSBARGVwcmVjYXRlZCAqL1xyXG5TYXBwaGlyZVdpZGdldHMuQWN0aW9uc1N1Yk1lbnUgPSBmdW5jdGlvbihJY29uSWQpIHtcclxuXHRpZiAoJCgnLlBhdGllbnRIZWFkZXJBY3Rpb25zX19zdWJNZW51JykuaGFzQ2xhc3MoJ1N1Yk1lbnVCbG9jaycpKSB7XHJcblx0XHQkKCcuUGF0aWVudEhlYWRlckFjdGlvbnNfX3N1Yk1lbnUnKS5yZW1vdmVDbGFzcygnU3ViTWVudUJsb2NrJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoSWNvbklkKVxyXG5cdFx0XHQucGFyZW50KClcclxuXHRcdFx0LnNpYmxpbmdzKClcclxuXHRcdFx0LmZpbmQoJy5QYXRpZW50SGVhZGVyQWN0aW9uc19fc3ViTWVudScpXHJcblx0XHRcdC5hZGRDbGFzcygnU3ViTWVudUJsb2NrJyk7XHJcblx0fVxyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgQnV0dG9uTGluayAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4ge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICR3aWRnZXQgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9IC5CdXR0b25DbGlja2ApO1xyXG5cclxuXHRcdFx0JHdpZGdldC5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGNvbnN0IF90YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcblx0XHRcdFx0aWYgKF90YXJnZXQuY2xvc2VzdCgnLkJ1dHRvbkNsaWNrLmNsaWNrJykubGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHRcdCQoJy5CdXR0b25DbGljay5jbGljaycpLnJlbW92ZUNsYXNzKCdjbGljaycpO1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnY2xpY2snKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkJ1dHRvbkxpbmsgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IENhcmRQYXRpZW50VGFibGUgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcuQ2FyZFBhdGllbnRJbmZvIGRpdiBhJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnQm9sZCcpO1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LnNpYmxpbmdzKCcuVGhlbWVHcmlkX1dpZHRoMicpXHJcblx0XHRcdFx0XHQuZmluZCgnYScpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0JvbGQnKTtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LnNpYmxpbmdzKClcclxuXHRcdFx0XHRcdC5jaGlsZHJlbigpXHJcblx0XHRcdFx0XHQuZmluZCgnYScpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0JvbGQnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuQ2FyZFBhdGllbnRUYWJsZSA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgQ29tcExpbmUgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0ZnVuY3Rpb24gU2VjdGlvbkNvbXBsaW5lKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdC8vIE9iamVjdCB0byBzYXZlIHN0YXRzXHJcblx0XHR2YXIgcHJldmlld3N0YXQgPSBbXTtcclxuXHJcblx0XHR2YXIgdHJhbnNpdGlvbkV2ZW50ID0gU2lsa1VJLndoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0XHQvLyBzZXQgY2xpY2sgZXZlbnRzXHJcblx0XHRmdW5jdGlvbiBjbGlja0V2ZW50cyhvYikge1xyXG5cdFx0XHQvLyBzdG9yZSBxdWVyeXMgaW4gYSBzaW5nbGUgdmFyXHJcblx0XHRcdHZhciBob2xkZXIgPSAkKG9iKS5jbG9zZXN0KCcuQ29tcExpbmUnKTtcclxuXHRcdFx0dmFyIFNlY3Rpb24gPSAkKG9iKS5jbG9zZXN0KCcuQ29tcExpbmVFeHBhbmRhYmxlJyk7XHJcblx0XHRcdHZhciBTZWN0aW9uQ29udGVudCA9IFNlY3Rpb24uY2hpbGRyZW4oJy5Db21wTGluZV9FeHBhbmQnKTtcclxuXHJcblx0XHRcdC8vIGdldCBpZFxyXG5cdFx0XHR2YXIgaWQgPSBob2xkZXIuYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGhvbGRlci5oYXNDbGFzcygnbm90UmVuZGVySW50ZXJhY3Rpb25zJykpIHtcclxuXHRcdFx0XHRcdGhvbGRlci5maW5kKCcuQ29tcExpbmUtdG9nZ2xlLWludGVyYWN0aW9ucycpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdHRlbXBIZWlnaHQgPSBTZWN0aW9uQ29udGVudC5oZWlnaHQoKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KHRlbXBIZWlnaHQpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdFNlY3Rpb24uYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGlmICgkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTgnKSB8fCAkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTknKSkge1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGFkZCBldmVudCB0cmFuc2l0aW9uIGVuZCB0byBvdmVyZmxvdzp2aXNpYmxlIGZvciB0b29sdGlwcyBhbmQgZHJvcGRvd25zIGlzc3Vlc1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmIChob2xkZXIuaGFzQ2xhc3MoJ25vdFJlbmRlckludGVyYWN0aW9ucycpKSB7XHJcblx0XHRcdFx0XHRob2xkZXIuZmluZCgnLkNvbXBMaW5lLXRvZ2dsZS1pbnRlcmFjdGlvbnMnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFqYXggcmVmcmVzIGZ1bmN0aW9uXHJcblx0XHR0aGF0LmFqYXhSZWZyZXNoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIHJlbW92ZSBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLkNvbXBMaW5lX2hlYWRMaW5lJykub2ZmKCk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKCcuQ29tcExpbmVfaGVhZExpbmUgaW5wdXQsIC5Db21wTGluZV9oZWFkTGluZSBzZWxlY3QsIC5Db21wTGluZV9oZWFkTGluZSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgbmV3IGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuQ29tcExpbmVfX2V4cGFuZEljb24nKS51bmJpbmQoJ2NsaWNrJyk7XHJcblx0XHRcdCQoJy5Db21wTGluZV9fZXhwYW5kSWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMucGFyZW50RWxlbWVudCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLkNvbXBMaW5lRXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gaWYgbmV3IFNlY3Rpb25FeHBhbmRhYmxlIHRoZW4gYWRkIHRvIHByZXZpZXdzdGF0IGFycmF5XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdFx0XSA9PSBudWxsXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdFx0XSA9IHtcclxuXHRcdFx0XHRcdFx0Y2xpZW50OiBzdGF0LFxyXG5cdFx0XHRcdFx0XHRzZXJ2ZXI6IHN0YXQsXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY3VyZW50IHN0YXRlIChhamF4IHN0YXRlIHggaW5pdGlhbCBzdGF0ZSlcclxuXHRcdFx0XHR2YXIgY3VyU3RhdGUgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgc3RhcnQgZXhwYW5kYWJsZVxyXG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRjdXJTdGF0ZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBhamF4ICE9IGluaXRpYWwgc2VydmVyXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgIT1cclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRcdF1bJ3NlcnZlciddXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHQvLyBjdXJzdGF0ZVxyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdFx0XVsnY2xpZW50J10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRcdF1bJ3NlcnZlciddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XHRcdF1bJ2NsaWVudCddID09IGZhbHNlICYmXHJcblx0XHRcdFx0XHRcdCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJylcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuQ29tcExpbmVfRXhwYW5kJylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcclxuXHRcdFx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdFx0XHRdWydjbGllbnQnXSA9PSB0cnVlICYmXHJcblx0XHRcdFx0XHRcdCEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBzZXQgZXZlbnRzXHJcblx0XHR0aGF0LmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLkNvbXBMaW5lRXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRdID0ge1xyXG5cdFx0XHRcdFx0Y2xpZW50OiBzdGF0LFxyXG5cdFx0XHRcdFx0c2VydmVyOiBzdGF0LFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuQ29tcExpbmVfX2V4cGFuZEljb24nKS51bmJpbmQoJ2NsaWNrJyk7XHJcblx0XHRcdCQoJy5Db21wTGluZV9fZXhwYW5kSWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMucGFyZW50RWxlbWVudCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLkNvbXBMaW5lX2hlYWRMaW5lIGlucHV0LCAuQ29tcExpbmVfaGVhZExpbmUgc2VsZWN0LCAuQ29tcExpbmVfaGVhZExpbmUgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gcmVtb3ZlIHVuZWNlc3NhcnkgYmVoYXZpb3JzXHJcblxyXG5cdFx0XHQvLyBldmVudCBhamF4XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QodGhhdC5hamF4UmVmcmVzaCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y29uc3QgY3JlYXRlID0gKCkgPT4ge1xyXG5cdFx0U2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlID0gbmV3IFNlY3Rpb25Db21wbGluZSgpO1xyXG5cdFx0U2lsa1VJLkV4ZWN1dGUoU2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlLmluaXQsICdFcnJvciBvbiBTYXBwaGlyZXYyX1BhdHRlcnMvQ29tcExpbmUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuQ29tcExpbmUgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IENvdW50cnlQaG9uZSAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdGNvbnN0ICRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29uZmlnLndpZGdldElkfWApO1xyXG5cclxuXHRcdGNvbnN0IGNvdW50cnlQaG9uZUlucHV0ID0gd2luZG93LmludGxUZWxJbnB1dCgkZWxlbWVudCwge1xyXG5cdFx0XHRpbml0aWFsQ291bnRyeTogY29uZmlnLmluaXRpYWxDb3VudHJ5LFxyXG5cdFx0XHRwcmVmZXJyZWRDb3VudHJpZXM6IGNvbmZpZy5wcmVmZXJyZWRDb3VudHJpZXMsXHJcblx0XHRcdHNlcGFyYXRlRGlhbENvZGU6IGNvbmZpZy5zZXBhcmF0ZURpYWxDb2RlLFxyXG5cdFx0XHRuYXRpb25hbE1vZGU6IGNvbmZpZy5uYXRpb25hbE1vZGUsXHJcblx0XHRcdGF1dG9QbGFjZWhvbGRlcjogY29uZmlnLmF1dG9QbGFjZWhvbGRlciA/ICdwb2xpdGUnIDogZmFsc2UsXHJcblx0XHRcdGZvcm1hdE9uRGlzcGxheTogZmFsc2UsXHJcblx0XHRcdHV0aWxzU2NyaXB0OiAnL1YzX1BhdC9qcy91dGlscy5qcycsXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuQ291bnRyeVBob25lID0ge1xyXG5cdFx0Y3JlYXRlXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIihmdW5jdGlvbigpIHtcclxuXHRjbGFzcyBEYXRhVGFibGVzIHtcclxuXHRcdGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG5cdFx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdFx0dGhpcy4kd2lkZ2V0ID0gJChgIyR7Y29uZmlnLndpZGdldElkfWApO1xyXG5cdFx0XHR0aGlzLiR0YWJsZSA9IHRoaXMuJHdpZGdldC5maW5kKCd0YWJsZScpO1xyXG5cdFx0XHR0aGlzLiR0YWJsZS5hZGRDbGFzcygnY2VsbC1ib3JkZXIgY29tcGFjdCcpO1xyXG5cdFx0XHR0aGlzLm9uSW5pdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG9uSW5pdCgpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zID0ge1xyXG5cdFx0XHRcdC4uLnRoaXMuY29uZmlnLFxyXG5cdFx0XHRcdGZpeGVkQ29sdW1uczogdHJ1ZSxcclxuXHRcdFx0XHRpbmZvOiBmYWxzZSxcclxuXHRcdFx0XHRvcmRlcmluZzogZmFsc2UsXHJcblx0XHRcdFx0cGFnaW5nOiBmYWxzZSxcclxuXHRcdFx0XHRzY3JvbGxDb2xsYXBzZTogdHJ1ZSxcclxuXHRcdFx0XHRzY3JvbGxYOiB0cnVlLFxyXG5cdFx0XHRcdHNlYXJjaGluZzogZmFsc2UsXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQkKCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLiR0YWJsZS5EYXRhVGFibGUodGhpcy5vcHRpb25zKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4gKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IERhdGFUYWJsZXMoY29uZmlnKSk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5EYXRhVGFibGVzID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdH07XHJcbn0pKCk7XHJcbiIsIi8qIENvbXBvbmVudCBEYXRlVGltZVJhbmdlUGlja2VyICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgYWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMgPSBbXTtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxEYXRlVGltZVJhbmdlUGlja2Vycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoYWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnNbaV0uY29uZmlnLndpZGdldElkID09PSBjb25maWcud2lkZ2V0SWQpIHtcclxuXHRcdFx0XHRhbGxEYXRlVGltZVJhbmdlUGlja2Vycy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IERhdGVUaW1lUmFuZ2VQaWNrZXIoY29uZmlnKTtcclxuXHRcdGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzLnB1c2god2luZG93W2NvbmZpZy53aWRnZXRJZF0pO1xyXG5cdH07XHJcblxyXG5cdHZhciBEYXRlVGltZVJhbmdlUGlja2VyID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHRoaXMuY3VycmVudExvY2FsZSA9IGNvbmZpZy5jdXJyZW50TG9jYWxlO1xyXG5cclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnRGF0ZVRpbWVSYW5nZVBpY2tlcicpO1xyXG5cdFx0dGhpcy4kY2xlYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2xlYXInKTtcclxuXHRcdHRoaXMuJGxhYmVsID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWxhYmVsJyk7XHJcblxyXG5cdFx0dGhpcy5pc0VtcHR5SG91ciA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnYXR0YWNoZWRJbnB1dCcpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dCA9IHRoaXMuJHdpZGdldC5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1wbGFjZWhvbGRlciBpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItZGlzcGxheWVkIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcblx0XHRcdGlmICghdGhpcy5jb25maWcuYWxsb3dzVHlwaW5nKSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnByb3AoJ3JlYWRvbmx5JywgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGlucHV0ID0gJCgnIycgKyBjb25maWcuaW5wdXRJZCk7XHJcblx0XHRcdGlmICghdGhpcy5jb25maWcuYWxsb3dzVHlwaW5nKSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncmVhZG9ubHknLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmN1cnJlbnRMb2NhbGUgPT09ICdBUicpIHtcclxuXHRcdFx0bW9tZW50LmxvY2FsZSgnYXIta3cnKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgb3B0aW9ucyA9IHt9O1xyXG5cdFx0b3B0aW9ucy5zdGFydERhdGUgPSBjb25maWcuc3RhcnREYXRlO1xyXG5cdFx0b3B0aW9ucy5zaW5nbGVEYXRlUGlja2VyID0gY29uZmlnLnNpbmdsZURhdGVQaWNrZXI7XHJcblx0XHRvcHRpb25zLmF1dG9BcHBseSA9IGNvbmZpZy5hdXRvQXBwbHk7XHJcblx0XHRvcHRpb25zLmF1dG9VcGRhdGVJbnB1dCA9IGNvbmZpZy5hdXRvVXBkYXRlSW5wdXQ7XHJcblx0XHRvcHRpb25zLnRpbWVQaWNrZXIgPSBjb25maWcudGltZVBpY2tlcjtcclxuXHRcdG9wdGlvbnMudGltZVBpY2tlcjI0SG91ciA9IGNvbmZpZy50aW1lUGlja2VyMjRIb3VyO1xyXG5cdFx0b3B0aW9ucy50aW1lUGlja2VySW5jcmVtZW50ID0gY29uZmlnLnRpbWVQaWNrZXJJbmNyZW1lbnQ7XHJcblx0XHRvcHRpb25zLnNob3dEcm9wZG93bnMgPSBjb25maWcuaGFzRHJvcGRvd25zO1xyXG5cdFx0b3B0aW9ucy5kcm9wcyA9IGNvbmZpZy5kcm9wcztcclxuXHRcdG9wdGlvbnMub3BlbnMgPSBjb25maWcub3BlbnM7XHJcblxyXG5cdFx0dmFyIHN0cmluZ0Nvbm5lY3Rpb24gPSAnWywgYXRdJztcclxuXHJcblx0XHRpZiAoY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWSBISDpNTScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVkgSEg6TU0nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAob3B0aW9ucy50aW1lUGlja2VyMjRIb3VyKSB7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0SW5wdXQgPSAnREQtTU0tWVlZWSBISDptbSc7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNZZWFyV2hlblRleHRcclxuXHRcdFx0XHRcdD8gJ0QgTU1NIFlZWVknICsgc3RyaW5nQ29ubmVjdGlvbiArICcgSEg6bW0nXHJcblx0XHRcdFx0XHQ6ICdEIE1NTScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBISDptbSc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0SW5wdXQgPSAnREQtTU0tWVlZWSBoaDptbSBBJztcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1llYXJXaGVuVGV4dFxyXG5cdFx0XHRcdFx0PyAnRCBNTU0gWVlZWScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBoaDptbSBBJ1xyXG5cdFx0XHRcdFx0OiAnRCBNTU0nICsgc3RyaW5nQ29ubmVjdGlvbiArICcgaGg6bW0gQSc7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnb25seURhdGUnKTtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVknKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCA9ICdERC1NTS1ZWVlZJztcclxuXHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNZZWFyV2hlblRleHQgPyAnRCBNTU0gWVlZWScgOiAnRCBNTU0nO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghY29uZmlnLnNpbmdsZURhdGVQaWNrZXIpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmFkZENsYXNzKCdyYW5nZURhdGVzJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNXZWVrRGF5TmFtZVdoZW5UZXh0XHJcblx0XHRcdD8gJ2RkZFssIF0nICsgdGhpcy5jb25maWcuZm9ybWF0TGFiZWxcclxuXHRcdFx0OiB0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbDtcclxuXHJcblx0XHRvcHRpb25zLmxvY2FsZSA9IHtcclxuXHRcdFx0ZGlyZWN0aW9uOiBjb25maWcuY3VycmVudExvY2FsZSA9PT0gJ0FSJyA/ICdydGwnIDogJ2x0cicsXHJcblx0XHRcdGZvcm1hdDogdGhpcy5jb25maWcuZm9ybWF0SW5wdXQsXHJcblx0XHRcdGNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcclxuXHRcdFx0YXBwbHlMYWJlbDogJ0FwcGx5JyxcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5oYXNUZXh0VHJpZ2dlcikge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ3RleHRUcmlnZ2VyJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5lbmREYXRlICYmIGNvbmZpZy5lbmREYXRlICE9PSAnMDEtMDEtMTkwMCAwMDowMDowMCcpIHtcclxuXHRcdFx0b3B0aW9ucy5lbmREYXRlID0gY29uZmlnLmVuZERhdGU7XHJcblx0XHR9XHJcblx0XHRpZiAoY29uZmlnLm1heERhdGUgJiYgY29uZmlnLm1heERhdGUgIT09ICcwMS0wMS0xOTAwIDAwOjAwOjAwJykge1xyXG5cdFx0XHRvcHRpb25zLm1heERhdGUgPSBjb25maWcubWF4RGF0ZTtcclxuXHRcdH1cclxuXHRcdGlmIChjb25maWcubWluRGF0ZSAmJiBjb25maWcubWluRGF0ZSAhPT0gJzAxLTAxLTE5MDAgMDA6MDA6MDAnKSB7XHJcblx0XHRcdG9wdGlvbnMubWluRGF0ZSA9IGNvbmZpZy5taW5EYXRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuRGlzYWJsZWRXZWVrRGF5cykge1xyXG5cdFx0XHR2YXIgZGlzYWJsZWRXZWVrRGF5cyA9IGNvbmZpZy5EaXNhYmxlZFdlZWtEYXlzLnNwbGl0KCcsJyk7XHJcblx0XHRcdG9wdGlvbnMuaXNJbnZhbGlkRGF0ZSA9IGZ1bmN0aW9uKGRhdGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGlzYWJsZWRXZWVrRGF5cy5pbmNsdWRlcyhcclxuXHRcdFx0XHRcdG1vbWVudChkYXRlKVxyXG5cdFx0XHRcdFx0XHQuZGF5KClcclxuXHRcdFx0XHRcdFx0LnRvU3RyaW5nKClcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuJGlucHV0LmRhdGVyYW5nZXBpY2tlcihvcHRpb25zLCBmdW5jdGlvbihzdGFydERhdGUsIGVuZERhdGUsIGxhYmVsKSB7XHJcblx0XHRcdC8vIGFmdGVyIGEgc2VsZWN0aW9uIGlzIG1hZGVcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIG5vdyB3ZSBoYXZlIGEgcHJvcGVyIGluc3RhbmNlXHJcblx0XHR0aGlzLnBpY2tlciA9IHRoaXMuJGlucHV0LmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpO1xyXG5cclxuXHRcdHRoaXMuJGNhbGVuZGFyID0gJCh0aGlzLnBpY2tlci5jb250YWluZXIpO1xyXG5cclxuXHRcdGlmICghIXRoaXMuY29uZmlnLmNzc0NsYXNzKSB7XHJcblx0XHRcdHRoaXMuJGNhbGVuZGFyLmFkZENsYXNzKHRoaXMuY29uZmlnLmNzc0NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiR0aW1lSG9sZGVyID0gdGhpcy4kY2FsZW5kYXIuZmluZCgnLmNhbGVuZGFyLXRpbWUnKTtcclxuXHRcdHRoaXMuJGJ1dHRvbnNIb2xkZXIgPSB0aGlzLiRjYWxlbmRhci5maW5kKCcuZHJwLWJ1dHRvbnMnKTtcclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuYXV0b0FwcGx5KSB7XHJcblx0XHRcdHRoaXMuJGJ1dHRvbnNIb2xkZXIuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuaXNFbXB0eVN0YXJ0RGF0ZSkge1xyXG5cdFx0XHR0aGlzLmNsZWFyKGZhbHNlKTtcclxuXHRcdH0gZWxzZSBpZiAoY29uZmlnLmlzRW1wdHlTdGFydEhvdXIpIHtcclxuXHRcdFx0dGhpcy5pc0VtcHR5SG91ciA9IHRydWU7XHJcblx0XHRcdHRoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29uZmlnLmVuYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5uYXRpdmVFdmVudHMoKTtcclxuXHRcdFx0dGhpcy5jdXN0b21FdmVudHMoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuXHRcdFx0dGhpcy4kaW5wdXQub2ZmKCdjbGljayBmb2N1cyBrZXlkb3duIGtleXVwJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0dGhpcy5oYW5kbGVDdXN0b21WYWxpZGF0aW9uKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuaGFuZGxlQ3VzdG9tVmFsaWRhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGVycm9yTWVzc2FnZSA9IHRoaXMuJGlucHV0Lm5leHQoKS50ZXh0KCk7XHJcblx0XHRpZiAoISFlcnJvck1lc3NhZ2UubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5hZGRDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZFxyXG5cdFx0XHRcdC5uZXh0KClcclxuXHRcdFx0XHQuc2hvdygpXHJcblx0XHRcdFx0LnRleHQoZXJyb3JNZXNzYWdlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5yZW1vdmVDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5uZXh0KCkuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLm5hdGl2ZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdzaG93Q2FsZW5kYXIuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24oZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmhhc0dvVG9kYXkpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdC5maW5kKCcuY2FsZW5kYXItdGFibGUgdGhlYWQgdHInKVxyXG5cdFx0XHRcdFx0LmVxKDApXHJcblx0XHRcdFx0XHQuYWZ0ZXIoXHJcblx0XHRcdFx0XHRcdCc8dHI+PHRkIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJEYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWdvdG9kYXlcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jb25maWcuZ29Ub2RheUxhYmVsICtcclxuXHRcdFx0XHRcdFx0XHQnPC90ZD48L3RyPidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0aWYgKF90aGlzLmNvbmZpZy5kcm9wcyA9PT0gJ3VwJykge1xyXG5cdFx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmNzcygndG9wJywgX3RoaXMuJGNhbGVuZGFyLm9mZnNldCgpLnRvcCAtIDI0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuaGFuZGxlVmlld3BvcnRQb3NpdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKCFfdGhpcy5jb25maWcuc2luZ2xlRGF0ZVBpY2tlcikge1xyXG5cdFx0XHRcdCQoJy5kcnAtc2VsZWN0ZWQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0bGV0IHRleHQgPSAkKHRoaXMpLnRleHQoKTtcclxuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLy0vZ2ksICfCtycpO1xyXG5cclxuXHRcdFx0XHRcdCQodGhpcykudGV4dCh0ZXh0KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignc2hvdy5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcudGltZVBpY2tlciAmJiBfdGhpcy5jb25maWcuaGFzQ2xlYXJIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5jYWxlbmRhci10aW1lJykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cIkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXJcIj48L3NwYW4+Jyk7XHJcblx0XHRcdFx0aWYgKF90aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAwLjUpO1xyXG5cdFx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdF90aGlzLiR0aW1lSG9sZGVyLmNzcygnb3BhY2l0eScsIDEpO1xyXG5cdFx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmhhbmRsZVZpZXdwb3J0UG9zaXRpb24oKTtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLkRhdGVUaW1lUmFuZ2VQaWNrZXIub3BlbmVkV2lkZ2V0SWQgPSBfdGhpcy5jb25maWcud2lkZ2V0SWQ7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdoaWRlLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJykucmVtb3ZlKCk7XHJcblx0XHRcdF90aGlzLnVwZGF0ZVBhcmVudElmcmFtZSgpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignY2FuY2VsLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uKGV2ZW50LCBwaWNrZXIpIHt9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdvdXRzaWRlQ2xpY2suZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24oZXZlbnQsIHBpY2tlcikge30pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ3RpbWVjaGFuZ2VkLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0X3RoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuaGFzQ2xlYXJIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5jYWxlbmRhci10aW1lJykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cIkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXJcIj48L3NwYW4+Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5hdXRvQXBwbHkpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2xlYXIucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5zZW5kTm90aWZpY2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2NsaWNrRGF0ZS5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuYXV0b0FwcGx5KSB7XHJcblx0XHRcdFx0X3RoaXMuJGNsZWFyLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdhcHBseS5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdF90aGlzLiRjbGVhci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY3VzdG9tRXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kbGFiZWwub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdF90aGlzLnBpY2tlci50b2dnbGUoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kY2xlYXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHRcdF90aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGNhbGVuZGFyLm9uKCdjbGljaycsICcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdC5maW5kKCcuaG91cnNlbGVjdCcpXHJcblx0XHRcdFx0XHQudmFsKCcwJylcclxuXHRcdFx0XHRcdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdC5maW5kKCcuaG91cnNlbGVjdCcpXHJcblx0XHRcdFx0XHQudmFsKCcxMicpXHJcblx0XHRcdFx0XHQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0LmZpbmQoJy5taW51dGVzZWxlY3QnKVxyXG5cdFx0XHRcdC52YWwoJzAnKVxyXG5cdFx0XHRcdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0LmZpbmQoJy5hbXBtc2VsZWN0JylcclxuXHRcdFx0XHQudmFsKCdBTScpXHJcblx0XHRcdFx0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRfdGhpcy5pc0VtcHR5SG91ciA9IHRydWU7XHJcblx0XHRcdF90aGlzLiR0aW1lSG9sZGVyLmNzcygnb3BhY2l0eScsIDAuNSk7XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRjYWxlbmRhci5vbignY2xpY2snLCAnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItZ290b2RheScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuc2V0U3RhcnREYXRlKG1vbWVudCgpKTtcclxuXHRcdFx0X3RoaXMucGlja2VyLnNldEVuZERhdGUobW9tZW50KCkpO1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuaGlkZSgpO1xyXG5cdFx0XHRpZiAoIV90aGlzLmNvbmZpZy5hdXRvVXBkYXRlSW5wdXQgfHwgX3RoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyIHx8IF90aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5zZW5kTm90aWZpY2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5vbignY2xpY2sgZm9jdXMnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRfdGhpcy4kaW5wdXQudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5vbigna2V5dXAnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0XHRfdGhpcy4kaW5wdXQudmFsKF90aGlzLiRkaXNwbGF5ZWQudmFsKCkpLnRyaWdnZXIoJ2tleXVwJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZ0KSB7XHJcblx0XHRcdFx0X3RoaXMuJGlucHV0LnZhbChfdGhpcy4kZGlzcGxheWVkLnZhbCgpKS50cmlnZ2VyKCdrZXlkb3duJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQgJiYgdGhpcy5jb25maWcuYWxsb3dzVHlwaW5nKSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24oZXZ0KSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kZGlzcGxheWVkLnZhbChfdGhpcy4kaW5wdXQudmFsKCkpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRpbnB1dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdF90aGlzLnVwZGF0ZVBhcmVudElmcmFtZSgpO1xyXG5cdFx0XHRcdH0sIDUwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUudXBkYXRlTGFiZWxpbmcgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBsYWJlbE1hc2sgPSB0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbDtcclxuXHRcdHZhciBpbnB1dE1hc2sgPSB0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dDtcclxuXHRcdGlmIChtb21lbnQodGhpcy5waWNrZXIuc3RhcnREYXRlKS5pc1NhbWUobW9tZW50KCksICdkYXknKSkge1xyXG5cdFx0XHRpZiAobGFiZWxNYXNrLmluY2x1ZGVzKCdEIE1NTSBZWVlZJykpIHtcclxuXHRcdFx0XHRsYWJlbE1hc2sgPSBsYWJlbE1hc2sucmVwbGFjZSgnRCBNTU0gWVlZWScsICdbVG9kYXldJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAobGFiZWxNYXNrLmluY2x1ZGVzKCdEIE1NTScpKSB7XHJcblx0XHRcdFx0bGFiZWxNYXNrID0gbGFiZWxNYXNrLnJlcGxhY2UoJ0QgTU1NJywgJ1tUb2RheV0nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnU29tZXRoaW5nIHdyb25nIHdpdGggdGhlIGxhYmVsTWFzaycsIGxhYmVsTWFzayk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdGxhYmVsTWFzayA9IGxhYmVsTWFzay5yZXBsYWNlKCdoaDptbSBBJywgJ1stLTotLV0nKS5yZXBsYWNlKCdISDptbScsICdbLS06LS1dJyk7XHJcblx0XHRcdGlucHV0TWFzayA9IGlucHV0TWFzay5yZXBsYWNlKCdoaDptbSBBJywgJ1stLTotLV0nKS5yZXBsYWNlKCdISDptbScsICdbLS06LS1dJyk7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5oYXNUZXh0VHJpZ2dlcikge1xyXG5cdFx0XHRcdHRoaXMuJGxhYmVsLmh0bWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdChsYWJlbE1hc2spKTtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgWzAwOjAwOjAwXScpKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIFswMDowMDowMF0nKSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGRpc3BsYXllZC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdChpbnB1dE1hc2spKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5oYXNUZXh0VHJpZ2dlcikge1xyXG5cdFx0XHRcdHRoaXMuJGxhYmVsLmh0bWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdChsYWJlbE1hc2spKTtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW06c3MnKSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnNpbmdsZURhdGVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLmZvcm1hdElucHV0KSk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJykpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRsZXQgc3RhcnREYXRlID0gdGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCk7XHJcblx0XHRcdFx0XHRcdGxldCBlbmREYXRlID0gdGhpcy5waWNrZXIuZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcuZm9ybWF0SW5wdXQpO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnZhbChgJHtzdGFydERhdGV9ICDCtyAgJHtlbmREYXRlfWApO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRzdGFydERhdGUgPSB0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJyk7XHJcblx0XHRcdFx0XHRcdFx0ZW5kRGF0ZSA9IHRoaXMucGlja2VyLmVuZERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJyk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c3RhcnREYXRlID0gdGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG5cdFx0XHRcdFx0XHRcdGVuZERhdGUgPSB0aGlzLnBpY2tlci5lbmREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoYCR7c3RhcnREYXRlfSAgwrcgICR7ZW5kRGF0ZX1gKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnNpbmdsZURhdGVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcuZm9ybWF0SW5wdXQpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGxldCBzdGFydERhdGUgPSB0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLmZvcm1hdElucHV0KTtcclxuXHRcdFx0XHRcdFx0bGV0IGVuZERhdGUgPSB0aGlzLnBpY2tlci5lbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCk7XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoYCR7c3RhcnREYXRlfSAgwrcgICR7ZW5kRGF0ZX1gKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oYW5kbGVWaWV3cG9ydFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoXHJcblx0XHRcdHdpbmRvdy5mcmFtZUVsZW1lbnQgJiZcclxuXHRcdFx0KCQod2luZG93LmZyYW1lRWxlbWVudC5wYXJlbnRFbGVtZW50KS5oYXNDbGFzcygndG9vbHRpcHN0ZXItY29udGVudCcpIHx8XHJcblx0XHRcdFx0JCh3aW5kb3cuZnJhbWVFbGVtZW50LnBhcmVudEVsZW1lbnQpLmhhc0NsYXNzKCdvcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudCcpKVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaXNJblZpZXdwb3J0KCkpIHtcclxuXHRcdFx0dmFyIGNvb3JkcyA9IHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRpZiAodGhpcy4kY2FsZW5kYXIuaGFzQ2xhc3MoJ2Ryb3AtdXAnKSAmJiB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XHJcblx0XHRcdFx0dmFyIHBvaW50ID0gd2luZG93LnNjcm9sbFkgKyBjb29yZHMuYm90dG9tICsgdGhpcy4kaW5wdXQuaGVpZ2h0KCkgKyA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2Ryb3AtdXAnKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdkcm9wLWRvd24nKVxyXG5cdFx0XHRcdFx0LmNzcygndG9wJywgcG9pbnQpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdCF0aGlzLiRjYWxlbmRhci5oYXNDbGFzcygnZHJvcC11cCcpICYmXHJcblx0XHRcdFx0dGhpcy4kY2FsZW5kYXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHR2YXIgcG9pbnQgPSB3aW5kb3cuc2Nyb2xsWSArIGNvb3Jkcy50b3AgLSBjb29yZHMuaGVpZ2h0IC0gdGhpcy4kaW5wdXQuaGVpZ2h0KCkgLSA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyLmFkZENsYXNzKCdkcm9wLXVwJykuY3NzKCd0b3AnLCBwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5pc0luVmlld3BvcnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBib3VuZGluZyA9IHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0Ym91bmRpbmcudG9wID49IDAgJiYgYm91bmRpbmcuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKyA1IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyA1KVxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKHNlbmROb3RpZmljYXRpb24pIHtcclxuXHRcdHRoaXMucGlja2VyLnNldFN0YXJ0RGF0ZShtb21lbnQoKSk7XHJcblx0XHR0aGlzLnBpY2tlci5zZXRFbmREYXRlKG1vbWVudCgpKTtcclxuXHRcdHRoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHRcdHRoaXMuJGNsZWFyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMuJGxhYmVsLmh0bWwoJy0tIC0tIC0tJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpO1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC52YWwoJycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoc2VuZE5vdGlmaWNhdGlvbiB8fCBzZW5kTm90aWZpY2F0aW9uID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNlbmROb3RpZmljYXRpb24oZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMucGlja2VyLnNob3coKTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnBpY2tlci5jbGlja0NhbmNlbCgpO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihzZW5kRGF0ZSkge1xyXG5cdFx0aWYgKHRoaXMuJHdpZGdldC5oYXNDbGFzcygnYXR0YWNoZWRJbnB1dCcpKSB7XHJcblx0XHRcdHRoaXMuJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoc2VuZERhdGUgfHwgc2VuZERhdGUgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBbMDA6MDA6MDBdJykgKyAnfCcgKyB0aGlzLmlzRW1wdHlIb3VyXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLmRhdGVUaW1lUmFuZ2VQaWNrZXJGYWtlTm90aWZ5SWQsXHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW06c3MnKSArICd8JyArIHRoaXMuaXNFbXB0eUhvdXJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KFxyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykgKyAnfCcgKyB0aGlzLmlzRW1wdHlIb3VyXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0T3NOb3RpZnlXaWRnZXQodGhpcy5jb25maWcuZGF0ZVRpbWVSYW5nZVBpY2tlckZha2VOb3RpZnlJZCwgJ251bGx8dHJ1ZScpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnVwZGF0ZVBhcmVudElmcmFtZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKHR5cGVvZiBTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lLnJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQoJy5QYWdlLkxheW91dFBvcHVwJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5yZWRyYXdEaWFsb2dXaW5kb3coKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRGF0ZVRpbWVSYW5nZVBpY2tlciA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0YWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBEcmFnRHJvcEFyZWEgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBkcmFnRHJvcEFyZWFXaWRnZXQ7XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcuZHJhZ0Ryb3BBcmVhSWRdID0gbmV3IERyYWdEcm9wQXJlYShjb25maWcpO1xyXG5cdFx0ZHJhZ0Ryb3BBcmVhV2lkZ2V0ID0gd2luZG93W2NvbmZpZy5kcmFnRHJvcEFyZWFJZF07XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLkRyYWdEcm9wQXJlYS5yZWZyZXNoRHJhZ0Ryb3ApO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0dmFyIHJlZnJlc2hEcmFnRHJvcCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0ZHJhZ0Ryb3BBcmVhV2lkZ2V0LnNldHVwRHJhZ2dhYmxlKCk7XHJcblx0XHRkcmFnRHJvcEFyZWFXaWRnZXQuc2V0dXBEcm9wcGFibGUoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgRHJhZ0Ryb3BBcmVhID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLiRhcmVhID0gJCgnIycgKyBjb25maWcuZHJhZ0Ryb3BBcmVhSWQpO1xyXG5cdFx0dGhpcy4kYXJlYS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdHRoaXMuc2tpbiA9IGNvbmZpZy5za2luO1xyXG5cdFx0dGhpcy5mYWtlTm90aWZ5V2lkZ2V0SWQgPSBjb25maWcuZmFrZU5vdGlmeVdpZGdldElkO1xyXG5cdFx0dGhpcy5zZXR1cERyb3BwYWJsZSgpO1xyXG5cdFx0aWYgKGNvbmZpZy5zb3J0YWJsZSkge1xyXG5cdFx0XHR0aGlzLnNldHVwU29ydGFibGUoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0dXBEcmFnZ2FibGUoKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblx0XHR0aGlzLiRhcmVhLmZpbmQoJy5EcmFnRHJvcC1kcm9wcGFibGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRfdGhpcy5oYW5kbGVEcm9wcGFibGUoJCh0aGlzKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREcmFnRHJvcEFyZWEucHJvdG90eXBlLnNldHVwRHJhZ2dhYmxlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLiRhcmVhLmZpbmQoJy5EcmFnRHJvcC1kcmFnZ2FibGUnKS5kcmFnZ2FibGUoe1xyXG5cdFx0XHRkaXNhYmxlZDogdGhpcy5jb25maWcuZGlzYWJsZWQsXHJcblx0XHRcdGNvbnRhaW5tZW50OiB0aGlzLiRhcmVhLFxyXG5cdFx0XHRzY29wZTogdGhpcy5jb25maWcuZHJhZ0Ryb3BBcmVhSWQsXHJcblx0XHRcdGRlbGF5OiAwLFxyXG5cdFx0XHRzY3JvbGw6IHRydWUsXHJcblx0XHRcdHJldmVydDogJ2ludmFsaWQnLFxyXG5cdFx0XHRyZXZlcnREdXJhdGlvbjogMCxcclxuXHRcdFx0Y29ubmVjdFRvU29ydGFibGU6ICcuRHJhZ0Ryb3AtZHJvcHBhYmxlJyxcclxuXHRcdFx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7fSxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERyYWdEcm9wQXJlYS5wcm90b3R5cGUuc2V0dXBEcm9wcGFibGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRhcmVhLmZpbmQoJy5EcmFnRHJvcC1kcm9wcGFibGUnKS5kcm9wcGFibGUoe1xyXG5cdFx0XHRob3ZlckNsYXNzOiAnaG92ZXJlZCcsXHJcblx0XHRcdGFkZENsYXNzZXM6IHRydWUsXHJcblx0XHRcdGRpc2FibGVkOiB0aGlzLmNvbmZpZy5kaXNhYmxlZCxcclxuXHRcdFx0c2NvcGU6IHRoaXMuY29uZmlnLmRyYWdEcm9wQXJlYUlkLFxyXG5cdFx0XHR0b2xlcmFuY2U6ICdwb2ludGVyJyxcclxuXHRcdFx0ZHJvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcblx0XHRcdFx0aWYgKF90aGlzLnNraW4gPT09ICdUZWFtcycpIHtcclxuXHRcdFx0XHRcdCQodWkuZHJhZ2dhYmxlKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRPc05vdGlmeVdpZGdldChcclxuXHRcdFx0XHRcdFx0JChldmVudC50YXJnZXQpLmRhdGEoJ2Zha2Vub3RpZnknKSxcclxuXHRcdFx0XHRcdFx0dWkuZHJhZ2dhYmxlLmRhdGEoJ2l0ZW10eXBlJykgKyAnfCcgKyB1aS5kcmFnZ2FibGUuZGF0YSgnaXRlbWlkJylcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KFxyXG5cdFx0XHRcdFx0XHQkKGV2ZW50LnRhcmdldCkuZGF0YSgnZmFrZW5vdGlmeScpLFxyXG5cdFx0XHRcdFx0XHRfdGhpcy4kYXJlYS5maW5kKCcuRHJhZ0Ryb3AtZHJhZ2dhYmxlLXBsYWNlaG9sZGVyJykuaW5kZXgoKSArICd8JyArIHVpLmRyYWdnYWJsZS5kYXRhKCdpdGVtaWQnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREcmFnRHJvcEFyZWEucHJvdG90eXBlLnNldHVwU29ydGFibGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuJGFyZWEuZmluZCgnLkRyYWdEcm9wLWRyb3BwYWJsZScpLnNvcnRhYmxlKHtcclxuXHRcdFx0ZGlzYWJsZWQ6IHRoaXMuY29uZmlnLmRpc2FibGVkLFxyXG5cdFx0XHRmb3JjZVBsYWNlaG9sZGVyU2l6ZTogdHJ1ZSxcclxuXHRcdFx0Y29udGFpbm1lbnQ6IHRoaXMuJGFyZWEsXHJcblx0XHRcdHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG5cdFx0XHRyZXZlcnQ6IDIwMCxcclxuXHRcdFx0aXRlbXM6ICcuRHJhZ0Ryb3AtZHJvcHBhYmxlLWl0ZW1zIC5EcmFnRHJvcC1kcmFnZ2FibGUnLFxyXG5cdFx0XHRwbGFjZWhvbGRlcjogJ0RyYWdEcm9wLWRyYWdnYWJsZS1wbGFjZWhvbGRlcicsXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREcmFnRHJvcEFyZWEucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGFyZWEub24oJ2NsaWNrJywgJy5EcmFnRHJvcC1kcmFnZ2FibGUnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR2YXIgJGRyYWdnYWJsZSA9ICQoZXZ0LmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHQkZHJhZ2dhYmxlLmZpbmQoJy5EcmFnRHJvcC1kcmFnZ2FibGUtc2VsZWN0LWFjdGlvbiBhJykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0dmFyICRkcm9wcGFibGUgPSAkZHJhZ2dhYmxlLmNsb3Nlc3QoJy5EcmFnRHJvcC1kcm9wcGFibGUnKTtcclxuXHRcdFx0aWYgKCRkcm9wcGFibGUuaGFzQ2xhc3MoJ2FsbG93TXVsdGlwbGUnKSkge1xyXG5cdFx0XHRcdHZhciAkY2hlY2tib3ggPSAkZHJhZ2dhYmxlLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG5cdFx0XHRcdGlmICgkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0XHQkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdCRkcmFnZ2FibGUucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHQkZHJhZ2dhYmxlLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVEcm9wcGFibGUoJGRyb3BwYWJsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kYXJlYS5vbignY2xpY2snLCAnLkRyYWdEcm9wLWRyYWdnYWJsZS1zZWxlY3QtYWN0aW9uIGEnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RHJhZ0Ryb3BBcmVhLnByb3RvdHlwZS5oYW5kbGVEcm9wcGFibGUgPSBmdW5jdGlvbigkZHJvcHBhYmxlKSB7XHJcblx0XHRpZiAoJGRyb3BwYWJsZS5oYXNDbGFzcygnYWxsb3dNdWx0aXBsZScpKSB7XHJcblx0XHRcdHZhciAkYWN0aW9ucyA9ICRkcm9wcGFibGUuZmluZCgnLkRyYWdEcm9wLWRyb3BwYWJsZS1pbnRybycpO1xyXG5cdFx0XHR2YXIgY2hrU2VsZWN0ZWQgPSAkZHJvcHBhYmxlLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkJykubGVuZ3RoO1xyXG5cdFx0XHRpZiAoY2hrU2VsZWN0ZWQgPiAwKSB7XHJcblx0XHRcdFx0JGFjdGlvbnMuZmluZCgnYSwgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGFjdGlvbnMuZmluZCgnYSwgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JGRyb3BwYWJsZS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5EcmFnRHJvcEFyZWEgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdHJlZnJlc2hEcmFnRHJvcDogcmVmcmVzaERyYWdEcm9wLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IERyb3Bkb3duQ2F0ZWdvcmllcyAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0ZnVuY3Rpb24gb3B0R3JvdXBTZXRWYWx1ZShzZWxlY3RJZCwgaW5wdXRCb3hJZCwgYnV0dG9uSWQpIHtcclxuXHRcdHZhciB2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0SWQpLnZhbHVlO1xyXG5cdFx0JCgnIycgKyBpbnB1dEJveElkKS52YWwodik7XHJcblx0XHQkKCcjJyArIHNlbGVjdElkICsgJyBvcHRpb25bc2VsZWN0ZWRdJykucmVtb3ZlQXR0cignc2VsZWN0ZWQnKTtcclxuXHJcblx0XHRpZiAodiA+IC0xKSB7XHJcblx0XHRcdCQoJyMnICsgc2VsZWN0SWQgKyAnIG9wdGlvblt2YWx1ZT1cIicgKyB2ICsgJ1wiXScpLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgnIycgKyBidXR0b25JZCkuY2xpY2soKTtcclxuXHRcdCQoJyNzMmlkXycgKyBzZWxlY3RJZCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdDItY29udGFpbmVyLWFjdGl2ZScpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gT3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cChhLCBiKSB7XHJcblx0XHR2YXIgX2UgPSAkKCcjJyArIGEuY29udHJvbHRvdmFsaWRhdGUpO1xyXG5cdFx0dmFyIGlzVmFsaWQgPSBfZS5maW5kKCdvcHRpb25bc2VsZWN0ZWRdJykubGVuZ3RoO1xyXG5cdFx0dmFyIGhhc1NpYmxpbmdfTWFuZGF0b3J5U2VsZWN0MiA9IF9lLnByZXYoJ2Rpdi5zZWxlY3QyLWNvbnRhaW5lci5NYW5kYXRvcnknKS5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKGhhc1NpYmxpbmdfTWFuZGF0b3J5U2VsZWN0Mikge1xyXG5cdFx0XHRpZiAoaXNWYWxpZCkge1xyXG5cdFx0XHRcdF9lLnByZXYoJ2Rpdi5zZWxlY3QyLWNvbnRhaW5lci5NYW5kYXRvcnknKS5yZW1vdmVDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X2UucHJldignZGl2LnNlbGVjdDItY29udGFpbmVyLk1hbmRhdG9yeScpLmFkZENsYXNzKCdOb3RfVmFsaWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYWRkT3B0R3JvdXBWYWxpZGF0b3Iob3B0R3JvdXBFbGVtZW50SWQpIHtcclxuXHRcdE9zUGFnZV9WYWxpZGF0b3JzLnB1c2goe1xyXG5cdFx0XHRjb250cm9sdG92YWxpZGF0ZTogb3B0R3JvdXBFbGVtZW50SWQsXHJcblx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdGVycm9ybWVzc2FnZTogJ1JlcXVpcmVkIGZpZWxkIScsXHJcblx0XHRcdGV2YWx1YXRpb25mdW5jdGlvbjogJ1NhcHBoaXJlV2lkZ2V0cy5Ecm9wZG93bkNhdGVnb3JpZXMuT3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cCcsXHJcblx0XHRcdGluaXRpYWx2YWx1ZTogJycsXHJcblx0XHRcdGlzdmFsaWQ6IHRydWUsXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Ecm9wZG93bkNhdGVnb3JpZXMgPSB7XHJcblx0XHRvcHRHcm91cFNldFZhbHVlLFxyXG5cdFx0T3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cCxcclxuXHRcdGFkZE9wdEdyb3VwVmFsaWRhdG9yLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBEcm9wem9uZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFx0YmluZEV2ZW50cyhjb25maWcpO1xyXG5cclxuXHRcdFx0d2luZG93LkRyb3B6b25lLmF1dG9EaXNjb3ZlciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Y29uc3QgbXlEcm9wem9uZSA9IG5ldyB3aW5kb3cuRHJvcHpvbmUoY29uZmlnLmhpZGRlbklucHV0Q29udGFpbmVyLCB7XHJcblx0XHRcdFx0Li4uY29uZmlnLFxyXG5cdFx0XHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0bGV0IHByZXZGaWxlO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGZpbGVzTGlzdCA9IGNvbmZpZy5maWxlc0xpc3QgPyBjb25maWcuZmlsZXNMaXN0LnNwbGl0KCcsJykgOiBbXTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGl0ZW0gb2YgZmlsZXNMaXN0KSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1vY2tGaWxlID0geyBuYW1lOiBpdGVtLCBzaXplOiAxMjM0NTY3OCB9O1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdhZGRlZGZpbGUnLCBtb2NrRmlsZSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGUnLCBtb2NrRmlsZSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZmlsZXMucHVzaChtb2NrRmlsZSk7XHJcblxyXG5cdFx0XHRcdFx0XHQkKGAke2NvbmZpZy5oaWRkZW5JbnB1dENvbnRhaW5lcn0gLmR6LWZpbGVuYW1lYCkuYXR0cigndGl0bGUnLCBpdGVtKTtcclxuXHJcblx0XHRcdFx0XHRcdHByZXZGaWxlID0gbW9ja0ZpbGU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKCtjb25maWcubWF4RmlsZXMgPT09IDEgJiYgY29uZmlnLmlzUmVwbGFjZVByZXZpb3VzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMub24oJ2FkZGVkZmlsZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwcmV2RmlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUZpbGUocHJldkZpbGUpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgJG5vdGlmeUlucHV0ID0gJChgIyR7Y29uZmlnLm5vdGlmeUlucHV0SWR9YCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGZpbGUsIHJlc3BvbnNlVGV4dCkge1xyXG5cdFx0XHRcdFx0XHRwcmV2RmlsZSA9IGZpbGU7XHJcblxyXG5cdFx0XHRcdFx0XHQkKGAjJHtjb25maWcubm90aWZ5SW5wdXRJZH0gLmR6LWZpbGVuYW1lYCkuYXR0cigndGl0bGUnLCBmaWxlLm5hbWUpO1xyXG5cdFx0XHRcdFx0XHQkbm90aWZ5SW5wdXQudmFsKHJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdCRub3RpZnlJbnB1dC5jaGFuZ2UoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMub24oJ2Vycm9yJywgZnVuY3Rpb24oZmlsZSwgcmVzcG9uc2VUZXh0KSB7XHJcblx0XHRcdFx0XHRcdHByZXZGaWxlID0gZmlsZTtcclxuXHJcblx0XHRcdFx0XHRcdCRub3RpZnlJbnB1dC52YWwocmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFx0JG5vdGlmeUlucHV0LmNoYW5nZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBiaW5kRXZlbnRzID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHQkKGAjJHtjb25maWcud2lkZ2V0SWR9IC5VcGxvYWRNZXNzYWdlQ2xhc3NgKS5vbignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdCQoYCMke2NvbmZpZy53aWRnZXRJZH0gLmR6LWNsaWNrYWJsZWApLmNsaWNrKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRHJvcHpvbmUgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBFeHBhbmRhYmxlR3JvdXAgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBhbGxFeHBhbmRhYmxlR3JvdXBzID0gW107XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRXhwYW5kYWJsZUdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoYWxsRXhwYW5kYWJsZUdyb3Vwc1tpXS5jb25maWcud2lkZ2V0SWQgPT09IGNvbmZpZy53aWRnZXRJZCkge1xyXG5cdFx0XHRcdGFsbEV4cGFuZGFibGVHcm91cHMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBFeHBhbmRhYmxlR3JvdXAoY29uZmlnKTtcclxuXHRcdGFsbEV4cGFuZGFibGVHcm91cHMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGFsbEV4cGFuZGFibGVHcm91cHMgPSBTYXBwaGlyZVdpZGdldHMuRXhwYW5kYWJsZUdyb3VwLmFsbCgpO1xyXG5cdFx0XHRcdGFsbEV4cGFuZGFibGVHcm91cHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuRXhwYW5kYWJsZUdyb3VwLmNyZWF0ZShlbGVtZW50LmNvbmZpZyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0dmFyIEV4cGFuZGFibGVHcm91cCA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRpdGVtcyA9IHRoaXMuJHdpZGdldC5maW5kKCcuRXhwYW5kYWJsZUdyb3VwSXRlbScpO1xyXG5cdFx0dGhpcy4kaXRlbXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0d2luZG93WyQodGhpcykuYXR0cignaWQnKV0gPSBuZXcgRXhwYW5kYWJsZUdyb3VwSXRlbSgkKHRoaXMpLCBfdGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHR2YXIgRXhwYW5kYWJsZUdyb3VwSXRlbSA9IGZ1bmN0aW9uKCRpdGVtLCBncm91cCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuZ3JvdXAgPSBncm91cDtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICRpdGVtO1xyXG5cdFx0dGhpcy4kY29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuRXhwYW5kYWJsZUdyb3VwSXRlbS1jb250ZW50Jyk7XHJcblx0XHR0aGlzLiR3aWRnZXQub2ZmKCdjbGljaycpLm9uKCdjbGljaycsICcuRXhwYW5kYWJsZUdyb3VwSXRlbS1oZWFkZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKF90aGlzLiR3aWRnZXQuaGFzQ2xhc3MoJ2lzT3BlbicpKSB7XHJcblx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRfdGhpcy5ncm91cC5jbG9zZUFsbCgpO1xyXG5cdFx0XHRcdF90aGlzLm9wZW4oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLlJlc2l6ZVBhcmVudElmcmFtZSkge1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5SZXNpemVQYXJlbnRJZnJhbWUucmVzaXplKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdEV4cGFuZGFibGVHcm91cC5wcm90b3R5cGUuY2xvc2VBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuJGl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHdpbmRvd1skKHRoaXMpLmF0dHIoJ2lkJyldLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRFeHBhbmRhYmxlR3JvdXBJdGVtLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdH07XHJcblxyXG5cdEV4cGFuZGFibGVHcm91cEl0ZW0ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLiR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5FeHBhbmRhYmxlR3JvdXAgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBhbGxFeHBhbmRhYmxlR3JvdXBzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBFeHBhbmRhYmxlTGluayAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSB3aWRnZXRJRCA9PiB7XHJcblx0XHRjb25zdCAkZWxlbWVudFdyYXBwZXIgPSAkKGAjJHt3aWRnZXRJRH1gKTtcclxuXHJcblx0XHRpZiAoJGVsZW1lbnRXcmFwcGVyLnBhcmVudCgnLkV4cGFuZGFibGVMaXN0JykuaGFzQ2xhc3MoJ0hpZGVXaGVuRW1wdHknKSkge1xyXG5cdFx0XHRjb25zdCB0ZXh0ID0gJGVsZW1lbnRXcmFwcGVyLmZpbmQoJy5FeHBhbmRhYmxlTGlua19fQ29udGVudCcpLnRleHQoKTtcclxuXHJcblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gMCkgJGVsZW1lbnRXcmFwcGVyLnBhcmVudCgnLkV4cGFuZGFibGVMaXN0JykuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJpbmRFdmVudHMod2lkZ2V0SUQpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGJpbmRFdmVudHMgPSB3aWRnZXRJRCA9PiB7XHJcblx0XHQkKGAjJHt3aWRnZXRJRH0gLkV4cGFuZGFibGVMaW5rX19IZWFkZXJgKS5jbGljaygoKSA9PiBvcGVuQ2xvc2UoYCMke3dpZGdldElEfWApKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBvcGVuQ2xvc2UgPSBlbGVtZW50SUQgPT4gJChlbGVtZW50SUQpLnRvZ2dsZUNsYXNzKCdFeHBhbmRhYmxlTGluay0tZXhwYW5kZWQnKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkV4cGFuZGFibGVMaW5rID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBGdWxsU2NyZWVuVGFic1dyYXBwZXIgKi9cclxuU2FwcGhpcmVXaWRnZXRzLkZ1bGxTY3JlZW5UYWJzV3JhcHBlciA9ICgpID0+IHtcclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQoJy5UYWJXcmFwcGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICR3cmFwcGVyID0gJCh0aGlzKS5jbG9zZXN0KCcuRnVsbFNjcmVlblRhYnNXcmFwcGVyX19UYWJzJyk7XHJcblx0XHRcdCR3cmFwcGVyLmZpbmQoJyonKS5yZW1vdmVDbGFzcygnQWN0aXZlJyk7XHJcblxyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdBY3RpdmUnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgR2VuZXJpY0dhbGxlcnkgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XHJcblx0fTtcclxuXHJcblx0dmFyIEdlbmVyaWNHYWxsZXJ5ID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgdGhpcy5jb25maWcud2lkZ2V0SWQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0dGhpcy5lcXVhbEhlaWdodCA9IHRoaXMuY29uZmlnLmVxdWFsSGVpZ2h0O1xyXG5cdFx0aWYgKFxyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnPiAuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4nKS5sZW5ndGggPT09IDEgJiZcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1jb250ZW50ID4gc3BhbicpLmhhc0NsYXNzKCdMaXN0UmVjb3JkcycpXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy4kZ2FsbGVyeSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5HZW5lcmljR2FsbGVyeS1jb250ZW50ID4gc3Bhbi5MaXN0UmVjb3JkcycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kZ2FsbGVyeSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5HZW5lcmljR2FsbGVyeS1jb250ZW50Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy4kZ2FsbGVyeS5jc3Moe1xyXG5cdFx0XHRkaXNwbGF5OiAnZ3JpZCcsXHJcblx0XHRcdGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoJyArIHRoaXMuY29uZmlnLmNvbHVtblNpemluZyArICcsIG1pbm1heCgnICsgdGhpcy5jb25maWcuY29sdW1uTWluV2lkdGggKyAnLCAxZnIpKScsXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLiRnYWxsZXJ5SXRlbXMgPSB0aGlzLiRnYWxsZXJ5LmNoaWxkcmVuKCk7XHJcblx0XHR0aGlzLiRnYWxsZXJ5SXRlbXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdHZW5lcmljR2FsbGVyeS1pdGVtJykpIHtcclxuXHRcdFx0XHQkKHRoaXMpLndyYXAoJzxkaXYgY2xhc3M9XCJHZW5lcmljR2FsbGVyeS1pdGVtXCI+PC9kaXY+Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5HZW5lcmljR2FsbGVyeSA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IEdlbmVyaWNHcmlkICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGFsbEdlbmVyaWNHcmlkcyA9IFtdO1xyXG5cclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgR2VuZXJpY0dyaWQoY29uZmlnKTtcclxuXHRcdGFsbEdlbmVyaWNHcmlkcy5wdXNoKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgR2VuZXJpY0dyaWQgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLmNvbmZpZyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkdlbmVyaWNHcmlkID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgSG9yaXpvbnRhbFRvb2xiYXIgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdGNvbnN0ICR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoKCkgPT4gaW5pdCgkd2lkZ2V0LCBjb25maWcpKTtcclxuXHJcblx0XHRpZiAoY29uZmlnLmlzQXJyb3dOYXZpZ2F0aW9uKSB7XHJcblx0XHRcdCQod2luZG93KS5sb2FkKCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCAkaXRlbVdyYXBwZXIgPSAkd2lkZ2V0LmZpbmQoJy5NZW51SXRlbVdyYXBwZXIuQWN0aXZlJyk7XHJcblx0XHRcdFx0aWYgKCRpdGVtV3JhcHBlci5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdCRpdGVtV3JhcHBlclswXS5zY3JvbGxJbnRvVmlldyh7XHJcblx0XHRcdFx0XHRcdGJlaGF2aW9yOiAnYXV0bycsXHJcblx0XHRcdFx0XHRcdGJsb2NrOiAnZW5kJyxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaW5pdCA9ICgkd2lkZ2V0LCBjb25maWcpID0+IHtcclxuXHRcdGlmIChjb25maWcuaXNBcnJvd05hdmlnYXRpb24pIHtcclxuXHRcdFx0aGFuZGxlQXJyb3dzKCR3aWRnZXQpO1xyXG5cclxuXHRcdFx0Y29uc3QgJHRvb2xiYXJJdGVtcyA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX0l0ZW1zJyk7XHJcblx0XHRcdGNvbnN0ICRsaXN0SXRlbXMgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcyAuTGlzdFJlY29yZHMnKTtcclxuXHRcdFx0Y29uc3QgJGJ0blJpZ2h0ID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fcmlnaHRCdG4nKTtcclxuXHRcdFx0Y29uc3QgJGJ0bkxlZnQgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19sZWZ0QnRuJyk7XHJcblxyXG5cdFx0XHQkdG9vbGJhckl0ZW1zLnNjcm9sbCgoKSA9PiBoYW5kbGVBcnJvd3MoJHdpZGdldCkpO1xyXG5cclxuXHRcdFx0JGJ0blJpZ2h0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50U2Nyb2xsID0gJHRvb2xiYXJJdGVtcy5zY3JvbGxMZWZ0KCk7XHJcblx0XHRcdFx0dmFyIG1heFNjcm9sbGwgPSAkbGlzdEl0ZW1zLndpZHRoKCkgLSAkdG9vbGJhckl0ZW1zLndpZHRoKCk7XHJcblx0XHRcdFx0dmFyIHNpZGVXaWR0aCA9IG1heFNjcm9sbGwgLSA1MDtcclxuXHRcdFx0XHQkdG9vbGJhckl0ZW1zLnNjcm9sbExlZnQoY3VycmVudFNjcm9sbCArIDUwKTtcclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgPT0gc2lkZVdpZHRoKSAkYnRuUmlnaHQuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgIT0gNTApICRidG5MZWZ0LnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRidG5MZWZ0LmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50U2Nyb2xsID0gJHRvb2xiYXJJdGVtcy5zY3JvbGxMZWZ0KCk7XHJcblx0XHRcdFx0dmFyIG1heFNjcm9sbGwgPSAkbGlzdEl0ZW1zLndpZHRoKCkgLSAkdG9vbGJhckl0ZW1zLndpZHRoKCk7XHJcblx0XHRcdFx0dmFyIHNpZGVXaWR0aCA9IG1heFNjcm9sbGwgLSA1MDtcclxuXHRcdFx0XHQkdG9vbGJhckl0ZW1zLnNjcm9sbExlZnQoY3VycmVudFNjcm9sbCAtIDUwKTtcclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgIT0gc2lkZVdpZHRoKSAkYnRuUmlnaHQucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgPT0gNTApICRidG5MZWZ0LmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCQod2luZG93KS5vbigncmVzaXplLnRvb2xiYXInLCAoKSA9PiBoYW5kbGVBcnJvd3MoJHdpZGdldCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGFuZGxlUmVzaXplKCR3aWRnZXQpO1xyXG5cdFx0XHRiaW5kRXZlbnRzQ2xpY2soJHdpZGdldCk7XHJcblxyXG5cdFx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZS50b29sYmFyJywgKCkgPT4gaGFuZGxlUmVzaXplKCR3aWRnZXQpKTtcclxuXHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdUb29sYmFyRml4ZWQnLCAoKSA9PiBoYW5kbGVSZXNpemUoJHdpZGdldCksIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRoYW5kbGVBcnJvd3MgPSAkd2lkZ2V0ID0+IHtcclxuXHRcdGNvbnN0ICR0b29sYmFySXRlbXMgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcycpO1xyXG5cdFx0Y29uc3QgJGxpc3RJdGVtcyA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX0l0ZW1zIC5MaXN0UmVjb3JkcycpO1xyXG5cdFx0Y29uc3QgJGJ0blJpZ2h0ID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fcmlnaHRCdG4nKTtcclxuXHRcdGNvbnN0ICRidG5MZWZ0ID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fbGVmdEJ0bicpO1xyXG5cclxuXHRcdGxldCBjdXJyZW50U2Nyb2xsID0gJHRvb2xiYXJJdGVtcy5zY3JvbGxMZWZ0KCk7XHJcblx0XHRsZXQgbWVudVdpZHRoID0gJGxpc3RJdGVtcy53aWR0aCgpO1xyXG5cdFx0bGV0IGV4dGVybmFsV2lkdGggPSAkdG9vbGJhckl0ZW1zLndpZHRoKCk7XHJcblx0XHR2YXIgbWF4U2Nyb2xsbCA9IG1lbnVXaWR0aCAtIGV4dGVybmFsV2lkdGg7XHJcblxyXG5cdFx0aWYgKGV4dGVybmFsV2lkdGggPiBtZW51V2lkdGgpIHtcclxuXHRcdFx0JGJ0bkxlZnQuaGlkZSgpO1xyXG5cdFx0XHQkYnRuUmlnaHQuaGlkZSgpO1xyXG5cclxuXHRcdFx0JHdpZGdldC5maW5kKCcuVG9vbGJhcl9jb250YWluZXInKS5hZGRDbGFzcygnVG9vbGJhcl9jb250YWluZXItLW5vYXJyb3dzJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkYnRuTGVmdC5zaG93KCk7XHJcblx0XHRcdCRidG5SaWdodC5zaG93KCk7XHJcblxyXG5cdFx0XHQkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX2NvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdUb29sYmFyX2NvbnRhaW5lci0tbm9hcnJvd3MnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY3VycmVudFNjcm9sbCA9PT0gMCkgJGJ0bkxlZnQuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRlbHNlICRidG5MZWZ0LnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cclxuXHRcdGlmIChjdXJyZW50U2Nyb2xsID49IG1heFNjcm9sbGwpICRidG5SaWdodC5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdGVsc2UgJGJ0blJpZ2h0LnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdH07XHJcblxyXG5cdGhhbmRsZVJlc2l6ZSA9ICR3aWRnZXQgPT4ge1xyXG5cdFx0bGV0IGl0ZW1zVG90YWwgPSAwO1xyXG5cdFx0bGV0IGhhc0l0ZW1zSGlkZGVuID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3QgJGxpc3RJdGVtcyA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX0l0ZW1zIC5MaXN0UmVjb3JkcycpO1xyXG5cdFx0JGxpc3RJdGVtcy5maW5kKCc+IGFbdWldJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcblx0XHRjb25zdCBtZW51V2lkdGggPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcycpLm91dGVyV2lkdGgodHJ1ZSk7XHJcblxyXG5cdFx0JGxpc3RJdGVtcy5maW5kKCdhW3VpXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGl0ZW1zVG90YWwgKz0gcGFyc2VJbnQoJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpLCAxMCk7XHJcblxyXG5cdFx0XHRpZiAoaXRlbXNUb3RhbCArIDkwIDwgbWVudVdpZHRoKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRoYXNJdGVtc0hpZGRlbiA9IHRydWU7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGhhc0l0ZW1zSGlkZGVuICYmICEkbGlzdEl0ZW1zLmZpbmQoJy5Ub29sYmFyX19Nb3JlT3B0aW9ucycpLmxlbmd0aCkge1xyXG5cdFx0XHQkd2lkZ2V0XHJcblx0XHRcdFx0LmZpbmQoJy5Ub29sYmFyX19Nb3JlT3B0aW9ucycpXHJcblx0XHRcdFx0LmNsb25lKClcclxuXHRcdFx0XHQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJylcclxuXHRcdFx0XHQuYXBwZW5kVG8oJGxpc3RJdGVtcyk7XHJcblxyXG5cdFx0XHRoYXNJdGVtc0hpZGRlbiA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0ICRvcHRpb25zTGlzdCA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX0l0ZW1zIC5Ub29sYmFyX19Nb3JlT3B0aW9uc0xpc3QnKTtcclxuXHJcblx0XHQkbGlzdEl0ZW1zLmZpbmQoJy5Ub29sYmFyX19Nb3JlT3B0aW9ucycpLmNzcygnZGlzcGxheScsICRvcHRpb25zTGlzdC5sZW5ndGggPyAnYmxvY2snIDogJ25vbmUnKTtcclxuXHJcblx0XHRjb25zdCAkaGlkZGVuSXRlbXMgPSAkbGlzdEl0ZW1zLmZpbmQoJz4gYVt1aV0nKS5maWx0ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiAkKHRoaXMpLmNzcygnZGlzcGxheScpID09ICdub25lJztcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRvcHRpb25zTGlzdC5lbXB0eSgpO1xyXG5cclxuXHRcdGNvbnN0IGhhc05vdGlmaWNhdGlvbkhpZGRlbiA9ICRoaWRkZW5JdGVtcy5maW5kKCcuTWVudUl0ZW1XcmFwcGVyX0JhZGdlOm5vdCg6ZW1wdHkpJykubGVuZ3RoICE9PSAwO1xyXG5cdFx0Y29uc3QgJHRyaWdnZXIgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcyAuVG9vbGJhcl9fTW9yZU9wdGlvbnNJY29uJyk7XHJcblxyXG5cdFx0aWYgKGhhc05vdGlmaWNhdGlvbkhpZGRlbikgJHRyaWdnZXIuYWRkQ2xhc3MoJ1Rvb2xiYXJfX01vcmVPcHRpb25zSWNvbi0tbm90aWZpY2F0aW9uJyk7XHJcblx0XHRlbHNlICR0cmlnZ2VyLnJlbW92ZUNsYXNzKCdUb29sYmFyX19Nb3JlT3B0aW9uc0ljb24tLW5vdGlmaWNhdGlvbicpO1xyXG5cclxuXHRcdCRoaWRkZW5JdGVtc1xyXG5cdFx0XHQuY2xvbmUoKVxyXG5cdFx0XHQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJylcclxuXHRcdFx0LmFwcGVuZFRvKCRvcHRpb25zTGlzdCk7XHJcblx0fTtcclxuXHJcblx0YmluZEV2ZW50c0NsaWNrID0gJHdpZGdldCA9PiB7XHJcblx0XHRjb25zdCAkbW9yZU9wdGlvbnMgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcyAuVG9vbGJhcl9fTW9yZU9wdGlvbnMnKTtcclxuXHRcdGNvbnN0ICR0cmlnZ2VyID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fSXRlbXMgLlRvb2xiYXJfX01vcmVPcHRpb25zSWNvbicpO1xyXG5cdFx0Y29uc3QgJG9wdGlvbnNMaXN0ID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fTW9yZU9wdGlvbnNMaXN0Jyk7XHJcblxyXG5cdFx0JHRyaWdnZXIub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cdFx0XHQkbW9yZU9wdGlvbnMudG9nZ2xlQ2xhc3MoJ1Rvb2xiYXJfX01vcmVPcHRpb25zLS1vcGVuJyk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JG9wdGlvbnNMaXN0Lm9uKCdtb3VzZXdoZWVsJywgZXZlbnQgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignbW91c2V1cCcsIGV2ZW50ID0+IHtcclxuXHRcdFx0Y29uc3QgJHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCk7XHJcblxyXG5cdFx0XHRpZiAoISR0YXJnZXQuYW5kU2VsZigpLmlzKCRtb3JlT3B0aW9ucykpIHtcclxuXHRcdFx0XHQkbW9yZU9wdGlvbnMucmVtb3ZlQ2xhc3MoJ1Rvb2xiYXJfX01vcmVPcHRpb25zLS1vcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Ib3Jpem9udGFsVG9vbGJhciA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IEhvdXJQaWNrZXIgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y2xhc3MgSG91clBpY2tlciB7XHJcblx0XHRjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuXHRcdFx0Ly8gT3B0aW9ucyB1c2VkIGJ5IGpRdWVyeSBUaW1lcnBpY2tlciAoRXh0ZXJuYWwgTGliKVxyXG5cdFx0XHR0aGlzLm9wdGlvbnMgPSB7XHJcblx0XHRcdFx0Li4uY29uZmlnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLkhvdXJQaWNrZXIuYWxsSW50YW5jZXMucHVzaChjb25maWcud2lkZ2V0SWQpO1xyXG5cclxuXHRcdFx0dGhpcy5vbkNvbXBvbmVudEluaXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpc0NvbXBvbmVudFZhbGlkKCkge1xyXG5cdFx0XHRsZXQgdmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRsZXQgbWVzc2FnZSA9IGBDb21wb25lbnQgSG91clBpY2tlciAoJHt0aGlzLm9wdGlvbnMud2lkZ2V0SWR9KTpgO1xyXG5cdFx0XHRsZXQgZXJyb3JzID0gJyc7XHJcblxyXG5cdFx0XHRpZiAodGhpcy4kbW9kZWwubGVuZ3RoICYmIHRoaXMuJG1vZGVsLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHRlcnJvcnMgPSBgJHtlcnJvcnN9IC0gTmVlZHMgb25lIC0gYW5kIGp1c3Qgb25lIC0gSW5wdXQgZWxlbWVudC5gO1xyXG5cdFx0XHRcdHZhbGlkID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghdGhpcy4kbW9kZWwubGVuZ3RoICYmIHRoaXMuJGNvbXBvbmVudC5maW5kKCcuSG91clBpY2tlcl9fUGxhY2Vob2xkZXIgaW5wdXQnKS5sZW5ndGgpIHtcclxuXHRcdFx0XHRlcnJvcnMgPSBgJHtlcnJvcnN9XFxuIC0gVGhlIElucHV0IGVsZW1lbnQgbXVzdCBiZSBvZiB0eXBlIFRleHQuYDtcclxuXHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXZhbGlkKSBjb25zb2xlLmVycm9yKGAke21lc3NhZ2V9ICR7ZXJyb3JzfWApO1xyXG5cclxuXHRcdFx0cmV0dXJuIHZhbGlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldENvbXBvbmVudFBvc2l0aW9uKCkge1xyXG5cdFx0XHRjb25zdCAkd2lkZ2V0ID0gJCgnLnVpLXRpbWVwaWNrZXItY29udGFpbmVyJyk7XHJcblx0XHRcdGNvbnN0IGxhYmVsTGVmdCA9IHRoaXMuJGxhYmVsLm9mZnNldCgpLmxlZnQ7XHJcblx0XHRcdGNvbnN0IGxhYmVsV2lkdGggPSB0aGlzLiRsYWJlbC53aWR0aCgpO1xyXG5cdFx0XHRjb25zdCBsYWJlbE91dGVyV2lkdGggPSB0aGlzLiRsYWJlbC5vdXRlcldpZHRoKCk7XHJcblx0XHRcdGNvbnN0IHdpZGdldE91dGVyV2lkdGggPSAkd2lkZ2V0Lm91dGVyV2lkdGgoKTtcclxuXHRcdFx0Y29uc3Qgd2lkZ2V0TWluV2lkdGggPSArJHdpZGdldC5jc3MoJ21pbi13aWR0aCcpLnJlcGxhY2UoJ3B4JywgJycpO1xyXG5cdFx0XHRjb25zdCBpc091dHNpZGVXaW5kb3cgPVxyXG5cdFx0XHRcdGxhYmVsTGVmdCArIGxhYmVsT3V0ZXJXaWR0aCA+ICQod2luZG93KS5zY3JvbGxMZWZ0KCkgKyAkKHdpbmRvdykud2lkdGgoKSAtIHdpZGdldE91dGVyV2lkdGg7XHJcblxyXG5cdFx0XHQkd2lkZ2V0LmNzcyh7XHJcblx0XHRcdFx0bGVmdDogKCkgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gbGFiZWxMZWZ0IC0gKHdpZGdldE1pbldpZHRoIC0gbGFiZWxXaWR0aCkgLyAyO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpc091dHNpZGVXaW5kb3cpIHZhbHVlID0gbGFiZWxMZWZ0ICsgbGFiZWxXaWR0aCAtIHdpZGdldE91dGVyV2lkdGg7XHJcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gbGFiZWxMZWZ0O1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRFbGVtZW50Q2xhc3Moc2VsZWN0b3IsIGNsYXNzTmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lID8gJChzZWxlY3RvcikuYWRkQ2xhc3MoY2xhc3NOYW1lKSA6IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlZmluZVRpbWVGb3JtYXQoKSB7XHJcblx0XHRcdGxldCBmb3JtYXQgPSBbXTtcclxuXHRcdFx0bGV0IGFtUG0gPSAnJztcclxuXHJcblx0XHRcdGZvcm1hdC5wdXNoKHRoaXMub3B0aW9ucy5pczI0aEZvcm1hdCA/ICdISCcgOiAnaGgnKTtcclxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5zaG93TWludXRlcykgZm9ybWF0LnB1c2goJ21tJyk7XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuc2hvd1NlY29uZHMpIGZvcm1hdC5wdXNoKCdzcycpO1xyXG5cdFx0XHRpZiAoIXRoaXMub3B0aW9ucy5pczI0aEZvcm1hdCkgYW1QbSA9ICcgcCc7XHJcblxyXG5cdFx0XHRyZXR1cm4gYCR7Zm9ybWF0LmpvaW4oJzonKX0ke2FtUG19YDtcclxuXHRcdH1cclxuXHJcblx0XHRjb252ZXJ0VGltZTEydG8yNCh2YWx1ZSkge1xyXG5cdFx0XHRjb25zdCBbdGltZSwgbW9kaWZpZXJdID0gdmFsdWUuc3BsaXQoJyAnKTtcclxuXHRcdFx0bGV0IFtob3VycywgbWludXRlcyA9ICcwMCcsIHNlY29uZHMgPSAnMDAnXSA9IHRpbWUuc3BsaXQoJzonKTtcclxuXHJcblx0XHRcdGlmIChob3VycyA9PT0gJzEyJykgaG91cnMgPSAnMDAnO1xyXG5cdFx0XHRpZiAobW9kaWZpZXIgPT09ICdQTScpIGhvdXJzID0gcGFyc2VJbnQoaG91cnMsIDEwKSArIDEyO1xyXG5cclxuXHRcdFx0cmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnZlcnRUaW1lRm9ybWF0VG9NYXNrKHZhbHVlID0gJycpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoL1thLXpBLVpdKy9nLCAnLS0nKTtcclxuXHRcdH1cclxuXHJcblx0XHRvbkNoYW5nZUV2ZW50KHZhbHVlID0gJycpIHtcclxuXHRcdFx0bGV0IG1vZGVsID0gJzAxLTAxLTE5MDAgMDA6MDA6MDAnOyAvL2kuZS4gbnVsbFxyXG5cdFx0XHRsZXQgbGFiZWwgPSB0aGlzLmNvbnZlcnRUaW1lRm9ybWF0VG9NYXNrKHRoaXMub3B0aW9ucy50aW1lRm9ybWF0KTtcclxuXHJcblx0XHRcdGlmICh2YWx1ZSAmJiAhIXZhbHVlLnRyaW0oKSkge1xyXG5cdFx0XHRcdG1vZGVsID0gdGhpcy5vcHRpb25zLmlzMjRoRm9ybWF0ID8gdmFsdWUgOiB0aGlzLmNvbnZlcnRUaW1lMTJ0bzI0KHZhbHVlKTtcclxuXHRcdFx0XHRsYWJlbCA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzTm90aWZ5RW5hYmxlZCkgT3NOb3RpZnlXaWRnZXQodGhpcy5vcHRpb25zLmhvdXJQaWNrZXJGYWtlTm90aWZ5SWQsIG1vZGVsKTtcclxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc1RleHRUcmlnZ2VyYWJsZSkgdGhpcy4kbGFiZWwudGV4dChsYWJlbCk7XHJcblxyXG5cdFx0XHR0aGlzLiRtb2RlbC52YWwobW9kZWwpO1xyXG5cdFx0XHR0aGlzLiRtb2RlbC5jaGFuZ2UoKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRvbkNvbXBvbmVudEluaXQoKSB7XHJcblx0XHRcdHRoaXMuJGNvbXBvbmVudCA9ICQoYCMke3RoaXMub3B0aW9ucy53aWRnZXRJZH1gKTtcclxuXHRcdFx0dGhpcy4kbW9kZWwgPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLkhvdXJQaWNrZXJfX1BsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcblx0XHRcdHRoaXMuJGlucHV0ID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5Ib3VyUGlja2VyX19EaXNwbGF5ZWQgLkhvdXJQaWNrZXJfX0lucHV0VmFsdWUnKTtcclxuXHRcdFx0dGhpcy4kZWxlbWVudCA9IHRoaXMuJGlucHV0O1xyXG5cclxuXHRcdFx0dGhpcy5vcHRpb25zLnRpbWVGb3JtYXQgPSB0aGlzLmRlZmluZVRpbWVGb3JtYXQoKTtcclxuXHJcblx0XHRcdGlmICghdGhpcy5pc0NvbXBvbmVudFZhbGlkKCkpIHJldHVybjtcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Y29uc3QgJGNvbnRhaW5lciA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCdkaXYuSG91clBpY2tlcicpO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzVGV4dFRyaWdnZXJhYmxlKSB7XHJcblx0XHRcdFx0XHQkY29udGFpbmVyLmFkZENsYXNzKCdIb3VyUGlja2VyLS10ZXh0VHJpZ2dlcicpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJGxhYmVsID0gJGNvbnRhaW5lci5maW5kKCcuSG91clBpY2tlcl9fRGlzcGxheWVkIC5Ib3VyUGlja2VyX19MYWJlbFZhbHVlJyk7XHJcblx0XHRcdFx0XHR0aGlzLiRlbGVtZW50ID0gdGhpcy4kbGFiZWw7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4kbGFiZWwudGV4dCh0aGlzLmNvbnZlcnRUaW1lRm9ybWF0VG9NYXNrKHRoaXMub3B0aW9ucy50aW1lRm9ybWF0KSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4kbGFiZWwub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLiRsYWJlbC50aW1lcGlja2VyKCkub3BlbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRDb21wb25lbnRQb3NpdGlvbigpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzQ2xlYXJhYmxlKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRidXR0b25DbGVhciA9ICRjb250YWluZXIuZmluZCgnLkhvdXJQaWNrZXJfX0Rpc3BsYXllZCAuSG91clBpY2tlcl9fQnV0dG9uQ2xlYXInKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLiRidXR0b25DbGVhci5vbignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCgnJyk7XHJcblx0XHRcdFx0XHRcdHRoaXMub25DaGFuZ2VFdmVudCgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LnRpbWVwaWNrZXIoe1xyXG5cdFx0XHRcdFx0Li4udGhpcy5vcHRpb25zLFxyXG5cdFx0XHRcdFx0Y2hhbmdlOiB0aW1lID0+IHRoaXMub25DaGFuZ2VFdmVudCh0aW1lID8gJCgpLnRpbWVwaWNrZXIuZm9ybWF0VGltZSh0aGlzLm9wdGlvbnMudGltZUZvcm1hdCwgdGltZSkgOiBudWxsKSxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dGhpcy5zZXRFbGVtZW50Q2xhc3MoJy51aS10aW1lcGlja2VyLWNvbnRhaW5lcicsIHRoaXMub3B0aW9ucy5jdXJyZW50TG9jYWxlID09PSAnQVInID8gJ3J0bCcgOiAnbHRyJyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JywgIXRoaXMub3B0aW9ucy5pc1R5cGVFbmFibGVkKTtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdwbGFjZWhvbGRlcicsIHRoaXMub3B0aW9ucy50aW1lRm9ybWF0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEhvdXJQaWNrZXIoY29uZmlnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuSG91clBpY2tlciA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHRcdGFsbEludGFuY2VzOiBbXSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IElucHV0TEFTQSAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcblx0dmFyIHNldHVwSW5wdXQgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdCQoJ2JvZHknKS5vZmYoJ2NsaWNrJywgJyMnICsgY29uZmlnLmxhYmVsSWQpO1xyXG5cdFx0JCgnYm9keScpLm9mZignYmx1ciBjaGFuZ2UgaW5wdXQnLCAnIycgKyBjb25maWcuaW5wdXRJZCk7XHJcblxyXG5cdFx0JCgnIycgKyBjb25maWcuaW5wdXRJZCkuY3NzKCd3aWR0aCcsICcxMDAlJyk7XHJcblx0XHQkKCcjJyArIGNvbmZpZy5sYWJlbElkKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcclxuXHJcblx0XHQkKCcjJyArIGNvbmZpZy5pbnB1dElkKS5oaWRlKCk7XHJcblx0XHQkKCcjJyArIGNvbmZpZy5sYWJlbElkKS5zaG93KCk7XHJcblxyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLk1hcmtXb3Jkc0Zyb21MaXN0LmhhbmRsZVByb21wdChjb25maWcpO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignY2xpY2snLCAnIycgKyBjb25maWcubGFiZWxJZCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyMnICsgY29uZmlnLmxhYmVsSWQpLmhpZGUoKTtcclxuXHRcdFx0JCgnIycgKyBjb25maWcuaW5wdXRJZCkuc2hvdygpO1xyXG5cdFx0XHQkKCcjJyArIGNvbmZpZy5pbnB1dElkKS5mb2N1cygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdibHVyJywgJyMnICsgY29uZmlnLmlucHV0SWQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFya1dvcmRzRnJvbUxpc3QuaGFuZGxlUHJvbXB0KGNvbmZpZyk7XHJcblx0XHRcdCQoJyMnICsgY29uZmlnLmlucHV0SWQpLmhpZGUoKTtcclxuXHRcdFx0JCgnIycgKyBjb25maWcubGFiZWxJZCkuc2hvdygpO1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFya1dvcmRzRnJvbUxpc3QuaGFuZGxlUHJvbXB0KGNvbmZpZyk7XHJcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLk1hcmtXb3Jkc0Zyb21MaXN0LmFwcGx5TWFya2luZyh7IHRhcmdldDogY29uZmlnLmxhYmVsSWQgfSk7XHJcblx0XHRcdH0sIDI1MCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ2NoYW5nZSBpbnB1dCcsICcjJyArIGNvbmZpZy5pbnB1dElkLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnIycgKyBjb25maWcubGFiZWxJZCkudGV4dCgkKCcjJyArIGNvbmZpZy5pbnB1dElkKS52YWwoKSk7XHJcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5NYXJrV29yZHNGcm9tTGlzdC5hcHBseU1hcmtpbmcoeyB0YXJnZXQ6ICdwYWdlJyB9KTtcclxuXHRcdFx0fSwgMjUwKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHZhciBoYW5kbGVQcm9tcHQgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdGlmICghJCgnIycgKyBjb25maWcuaW5wdXRJZCkudmFsKCkubGVuZ3RoKSB7XHJcblx0XHRcdCQoJyMnICsgY29uZmlnLmxhYmVsSWQpXHJcblx0XHRcdFx0LnRleHQoJCgnIycgKyBjb25maWcuaW5wdXRJZCkucHJvcCgncGxhY2Vob2xkZXInKSlcclxuXHRcdFx0XHQuY3NzKCdjb2xvcicsICcjOTk5Jyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcjJyArIGNvbmZpZy5sYWJlbElkKVxyXG5cdFx0XHRcdC50ZXh0KCQoJyMnICsgY29uZmlnLmlucHV0SWQpLnZhbCgpKVxyXG5cdFx0XHRcdC5jc3MoJ2NvbG9yJywgJycpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5NYXJrV29yZHNGcm9tTGlzdCA9IFNhcHBoaXJlV2lkZ2V0cy5NYXJrV29yZHNGcm9tTGlzdCA9IFNhcHBoaXJlV2lkZ2V0cy5NYXJrV29yZHNGcm9tTGlzdCB8fCB7fTtcclxuXHRTYXBwaGlyZVdpZGdldHMuTWFya1dvcmRzRnJvbUxpc3Quc2V0dXBJbnB1dCA9IHNldHVwSW5wdXQ7XHJcblx0U2FwcGhpcmVXaWRnZXRzLk1hcmtXb3Jkc0Zyb21MaXN0LmhhbmRsZVByb21wdCA9IGhhbmRsZVByb21wdDtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgY2xhc3MgSW5wdXRXaXRoQ2xlYXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgdGhpcy4kd2lkZ2V0ID0gJChgIyR7Y29uZmlnLndpZGdldElkfWApO1xyXG4gICAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJHdpZGdldC5maW5kKCdpbnB1dFt0eXBlXScpO1xyXG4gICAgICB0aGlzLiRjbGVhciA9IHRoaXMuJHdpZGdldC5maW5kKCcuSW5wdXRXaXRoQ2xlYXItY2xlYXInKTtcclxuICAgICAgdGhpcy4kbm90aWZ5TGluayA9IHRoaXMuJHdpZGdldC5maW5kKCcuSW5wdXRXaXRoQ2xlYXItbm90aWZ5LWxpbmsnKTtcclxuICAgICAgdGhpcy4kd2lkZ2V0U2hpZWxkID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JbnB1dFdpdGhDbGVhci0tc2hpZWxkJyk7XHJcbiAgICAgIHRoaXMub25Jbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0KCkge1xyXG4gICAgICB0aGlzLiRpbnB1dC5vbignZm9jdXMnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kY2xlYXIuc2hvdygpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy4kaW5wdXQub24oJ2JsdXInLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuJGlucHV0LnZhbCgpID09PSAnJykge1xyXG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoJCgnLmRhdGVyYW5nZXBpY2tlcjp2aXNpYmxlJykubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuICAgICAgICAgICAgdGhpcy4kbm90aWZ5TGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy4kY2xlYXIub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGlucHV0LnZhbCgnJyk7XHJcbiAgICAgICAgdGhpcy4kY2xlYXIuaGlkZSgpO1xyXG4gICAgICAgIHRoaXMuJG5vdGlmeUxpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5oYXNTaGllbGQpIHtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiR3aWRnZXRTaGllbGQuaGlkZSgpO1xyXG4gICAgICAgIH0sIHRoaXMuY29uZmlnLnNoaWVsZFRpbWVvdXQpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zaGllbGRUaW1lb3V0ID4gMCkge1xyXG4gICAgICAgICAgdGhpcy4kd2lkZ2V0U2hpZWxkLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kY2xlYXIuaGlkZSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjcmVhdGUgPSBjb25maWcgPT4gKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IElucHV0V2l0aENsZWFyKGNvbmZpZykpO1xyXG5cclxuICBTYXBwaGlyZVdpZGdldHMuSW5wdXRXaXRoQ2xlYXIgPSB7XHJcbiAgICBjcmVhdGVcclxuICB9O1xyXG5cclxufSkoKTsiLCIvKiBDb21wb25lbnQgTGluZUFkZCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZXRXaWR0aChjb25maWcud2lkZ2V0SWQpO1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTGluZUFkZC53aWRnZXRJZCA9IGNvbmZpZy53aWRnZXRJZDtcclxuXHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoKCkgPT4gc2V0V2lkdGgoY29uZmlnLndpZGdldElkKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZS5MaW5lQWRkJywgKCkgPT4gc2V0V2lkdGgoY29uZmlnLndpZGdldElkKSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc2V0V2lkdGggPSBmdW5jdGlvbih3aWRnZXRJZCkge1xyXG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICR3aWRnZXQgPSAkKGAjJHt3aWRnZXRJZCB8fCBTYXBwaGlyZVdpZGdldHMuTGluZUFkZC53aWRnZXRJZH1gKTtcclxuXHRcdFx0Y29uc3Qgd2lkdGhzID0gW107XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAxOyBpIDwgODsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IG1heFdpZHRoQ29udGVudCA9IE1hdGgubWF4LmFwcGx5KFxyXG5cdFx0XHRcdFx0bnVsbCxcclxuXHRcdFx0XHRcdCR3aWRnZXRcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5sYWNvbCcgKyBpKVxyXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiAkKHRoaXMpLndpZHRoKCk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5nZXQoKVxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdHdpZHRocy5wdXNoKG1heFdpZHRoQ29udGVudCk7XHJcblx0XHRcdFx0JHdpZGdldC5maW5kKCcubGFjb2wnICsgaSkud2lkdGgobWF4V2lkdGhDb250ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMTAwKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGluZUFkZCA9IHsgY3JlYXRlLCBzZXRXaWR0aCB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IExpbmVDYXJkTGlzdCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4ge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICRjb21wb25lbnQgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9YCk7XHJcblx0XHRcdGNvbnN0ICRjYXJkID0gJGNvbXBvbmVudC5maW5kKCcuTGluZUNhcmRMaXN0Jyk7XHJcblx0XHRcdGNvbnN0ICRjaGVja0JveCA9ICRjb21wb25lbnQuZmluZCgnLkxpbmVDYXJkTGlzdF9jaGVja2JveCBsYWJlbCcpO1xyXG5cclxuXHRcdFx0JGNhcmQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdCRjYXJkLm5vdCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdCRjYXJkXHJcblx0XHRcdFx0XHQubm90KHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLkxpbmVDYXJkTGlzdF9jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcblx0XHRcdFx0XHQucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuTGluZUNhcmRMaXN0X2NoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuXHRcdFx0XHRcdFx0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLkxpbmVDYXJkTGlzdF9jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XScpXHJcblx0XHRcdFx0XHRcdC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkY2hlY2tCb3guY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JGNhcmRcclxuXHRcdFx0XHRcdC5ub3QodGhpcylcclxuXHRcdFx0XHRcdC5jbG9zZXN0KCcuTGluZUNhcmRMaXN0JylcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5jbG9zZXN0KCcuTGluZUNhcmRMaXN0JylcclxuXHRcdFx0XHRcdC50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkxpbmVDYXJkTGlzdCA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgTGluZURldGFpbHNFeHBhbmRCb3ggKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgaW5pdCA9IGNvbmZpZyA9PiB7XHJcblx0XHQkKGAjJHtjb25maWcud2lkZ2V0SWR9ICsgLkxpbmVEZXRhaWxzRXhwYW5kQm94X2FjdGlvbmApLmNsaWNrKGV2ZW50ID0+IHtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4gJChkb2N1bWVudCkucmVhZHkoKCkgPT4gaW5pdChjb25maWcpKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkxpbmVEZXRhaWxzRXhwYW5kQm94ID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBMb2NhdGlvbkJveCAqL1xyXG5TYXBwaGlyZVdpZGdldHMuTG9jYXRpb25Cb3ggPSBmdW5jdGlvbih3aWRnZXRJZCkge1xyXG5cdGNvbnN0ICRjb21wb25lbnQgPSAkKGAjJHt3aWRnZXRJZH1gKTtcclxuXHJcblx0aWYgKCRjb21wb25lbnQuaGFzQ2xhc3MoJ09uJykpIHtcclxuXHRcdCQoJy5EaXNhYmxlUm9vbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ09mZicpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdPbicpO1xyXG5cdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxyXG5cdFx0XHRcdC5jc3Moe1xyXG5cdFx0XHRcdFx0b3BhY2l0eTogJzEnLFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdTZWxlY3RlZCcpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCRjb21wb25lbnRcclxuXHRcdFx0LmFkZENsYXNzKCdPbicpXHJcblx0XHRcdC5yZW1vdmVDbGFzcygnT2ZmJylcclxuXHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxyXG5cdFx0XHQuY3NzKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAnMScsXHJcblx0XHRcdH0pXHJcblx0XHRcdC5hZGRDbGFzcygnU2VsZWN0ZWQnKTtcclxuXHJcblx0XHQkKCcuRGlzYWJsZVJvb206bm90KCMnICsgd2lkZ2V0SWQgKyAnKScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ09mZicpO1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdPbicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLkRpc2FibGVSb29tLk9mZicpXHJcblx0XHRcdC5wYXJlbnQoJy5Sb29tQm94JylcclxuXHRcdFx0LmNzcyh7XHJcblx0XHRcdFx0b3BhY2l0eTogJzAuNTAnLFxyXG5cdFx0XHR9KVxyXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcblx0fVxyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgTWFpbkludGVyYWN0aXZlQ2FyZCAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFtdO1xyXG5cdHZhciBkZWZhdWx0RHVyYXRpb24gPSAzMDA7XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChhbGxNYWluSW50ZXJhY3RpdmVDYXJkc1tpXS5jb25maWcud2lkZ2V0SWQgPT09IGNvbmZpZy53aWRnZXRJZCkge1xyXG5cdFx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgTWFpbkludGVyYWN0aXZlQ2FyZChjb25maWcpO1xyXG5cdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblxyXG5cdFx0aWYgKCEhIVNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQgJiYgISFvc0FqYXhCYWNrZW5kKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFsbCgpO1xyXG5cdFx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0dmFyIE1haW5JbnRlcmFjdGl2ZUNhcmQgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmlzTG9ja2VkT25DbG9zZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pc09wZW4gPSBjb25maWcuaXNPcGVuO1xyXG5cdFx0dGhpcy5pc0VuYWJsZWQgPSBjb25maWcuaXNFbmFibGVkO1xyXG5cdFx0dGhpcy5pc1NlbGVjdGFibGUgPSBjb25maWcuaXNTZWxlY3RhYmxlO1xyXG5cdFx0dGhpcy5hbGxvd09wZW5pbmcgPSBjb25maWcuYWxsb3dPcGVuaW5nO1xyXG5cdFx0dGhpcy5ncmFkaWVudFdoZW5PcGVuID0gY29uZmlnLmdyYWRpZW50V2hlbk9wZW47XHJcblx0XHR0aGlzLmFsbG93TXVsdGlwbGVPcGVuID0gY29uZmlnLmFsbG93TXVsdGlwbGVPcGVuO1xyXG5cdFx0dGhpcy5lbWl0Tm90aWZ5T25PcGVuID0gY29uZmlnLmVtaXROb3RpZnlPbk9wZW47XHJcblx0XHR0aGlzLmhpZGVBY3Rpb25zT25PcGVuID0gY29uZmlnLmhpZGVBY3Rpb25zT25PcGVuO1xyXG5cdFx0dGhpcy5oaWRlQ2FwdGlvbk9uT3BlbiA9IGNvbmZpZy5oaWRlQ2FwdGlvbk9uT3BlbjtcclxuXHRcdHRoaXMuaGlkZVRpdGxlT25PcGVuID0gY29uZmlnLmhpZGVUaXRsZU9uT3BlbjtcclxuXHRcdHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuID0gY29uZmlnLmhpZGVTdWJUaXRsZU9uT3BlbjtcclxuXHRcdHRoaXMuaGVhZGVySGVpZ2h0V2hlbk9wZW4gPSBjb25maWcuaGVhZGVySGVpZ2h0V2hlbk9wZW47XHJcblx0XHR0aGlzLk1haW5JbnRlcmFjdGl2ZUNhcmRGYWtlTm90aWZ5SWQgPSBjb25maWcubWFpbkludGVyYWN0aXZlQ2FyZEZha2VOb3RpZnlJZDtcclxuXHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiR3aWRnZXQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR0aGlzLiRjYXJkID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQnKTtcclxuXHRcdHRoaXMuJGhlYWRlciA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyJyk7XHJcblx0XHR0aGlzLiRoZWFkZXJUZXh0ID0gdGhpcy4kaGVhZGVyLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0Jyk7XHJcblx0XHR0aGlzLiRib2R5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiBkaXYgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1ib2R5Jyk7XHJcblx0XHR0aGlzLiRhY3Rpb25zID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLWFjdGlvbnMnKTtcclxuXHRcdHRoaXMuJGNhcHRpb24gPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dC1jYXB0aW9uJyk7XHJcblx0XHR0aGlzLiR0aXRsZSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0LXRpdGxlJyk7XHJcblx0XHR0aGlzLiRzdWJUaXRsZSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0LXN1YnRpdGxlJyk7XHJcblx0XHR0aGlzLiRzZWxlY3RUcmlnZ2VyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItc2VsZWN0YWJsZSA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1zZWxlY3RhYmxlLXRyaWdnZXInKTtcclxuXHRcdHRoaXMuJHNlbGVjdFBsYWNlaG9sZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXNlbGVjdGFibGUtcGxhY2Vob2xkZXInKTtcclxuXHRcdHRoaXMuJHRyaWdnZXJQbGFjZWhvbGRlciA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRyaWdnZXJBY3Rpb24tcGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRpZiAodGhpcy4kdHJpZ2dlclBsYWNlaG9sZGVyLmZpbmQoJ2EnKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0dGhpcy4kdHJpZ2dlciA9IHRoaXMuJHRyaWdnZXJQbGFjZWhvbGRlci5maW5kKCdhJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaXNPcGVuKSB7XHJcblx0XHRcdHRoaXMub3BlbihmYWxzZSwgLTEpO1xyXG5cdFx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdmb3JjZU9wZW4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKHRoaXMuaGVhZGVySGVpZ2h0V2hlbk9wZW4gKyAnSGVhZGVyJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuYWxsb3dPcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2FsbG93T3BlbmluZycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmdyYWRpZW50V2hlbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kY2FyZC5hZGRDbGFzcygnZ3JhZGllbnRXaGVuT3BlbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblxyXG5cdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG5cdFx0XHRtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24sIGluZGV4KSB7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uZmlnLndpZGdldElkKSwge1xyXG5cdFx0XHRjaGlsZExpc3Q6IHRydWUsXHJcblx0XHRcdHN1YnRyZWU6IHRydWUsXHJcblx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRpZiAoISF0aGlzLiRib2R5LmZpbmQoJz4gZGl2IC5NYWluSW50ZXJhY3RpdmVDYXJkLWFic29sdXRlLWFjdGlvbnMnKS5sZW5ndGggJiYgdGhpcy5pc09wZW4pIHtcclxuXHRcdFx0dmFyIGFic29sdXRlQWN0aW9uc1dpZHRoID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgdGhpcy4kYm9keS5maW5kKCc+IGRpdiAuTWFpbkludGVyYWN0aXZlQ2FyZC1hYnNvbHV0ZS1hY3Rpb25zJykubWFwKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xyXG5cdFx0XHR9KS5nZXQoKSk7XHJcblx0XHRcdHZhciBoZWFkZXJNYXhXaWR0aCA9IHRoaXMuJGhlYWRlci53aWR0aCgpIC0gYWJzb2x1dGVBY3Rpb25zV2lkdGg7XHJcblx0XHRcdGlmIChoZWFkZXJNYXhXaWR0aCA+IDEwKSB7XHJcblx0XHRcdFx0dGhpcy4kaGVhZGVyVGV4dC5jc3Moe1xyXG5cdFx0XHRcdFx0bWF4V2lkdGg6IGhlYWRlck1heFdpZHRoICsgJ3B4J1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGJvZHkuZmluZCgnPiBkaXYgLk1haW5JbnRlcmFjdGl2ZUNhcmQtYWJzb2x1dGUtYWN0aW9ucyAuTWFpbkludGVyYWN0aXZlQ2FyZC0tY2xvc2UnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRoZWFkZXJUZXh0LmNzcyh7XHJcblx0XHRcdFx0bWF4V2lkdGg6ICc5OSUnXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRoZWFkZXIuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtLW9wZW46bm90KFtkaXNhYmxlZF0pJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0X3RoaXMub3Blbih0cnVlKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaGVhZGVyLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLS1jbG9zZScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdF90aGlzLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLmFsbG93T3BlbmluZykge1xyXG5cdFx0XHR0aGlzLiRoZWFkZXJUZXh0Lm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRcdFx0aWYgKCQoZXZ0LnRhcmdldCkuaGFzQ2xhc3MoJ0J1dHRvbicpKSB7XHJcblx0XHRcdFx0XHQvLyB0aGUgdXNlciBjbGlja2VkIG9uIGEgQnV0dG9uIGluc2lkZSB0aGUgaGVhZGVyLCBub3RoaW5nIHRvIGRvIGhlcmVcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKF90aGlzLmlzT3Blbikge1xyXG5cdFx0XHRcdFx0XHRpZiAoX3RoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBkbyBub3QgY2xvc2Ugd2hlbiBhbmQgaWZyYW1lIGV4aXN0c1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRcdF90aGlzLiRhY3Rpb25zLmZpbmQoJ2EnKS5sZW5ndGggPiAwICYmXHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuJGFjdGlvbnMuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtLWNsb3NlJykubGVuZ3RoID4gMFxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBkbyBub3QgY2xvc2Ugd2hlbiB0aGUgY2FyZCBoYXMgYWN0aW9uc1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzLmNsb3NlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdF90aGlzLm9wZW4odHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzU2VsZWN0YWJsZSkge1xyXG5cdFx0XHR0aGlzLiRzZWxlY3RUcmlnZ2VyLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdGlmIChfdGhpcy4kc2VsZWN0UGxhY2Vob2xkZXIuZmluZCgnYScpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHNlbGVjdFBsYWNlaG9sZGVyLmZpbmQoJ2EnKS5jbGljaygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ1lvdSBuZWVkIDEgbGluayBpbiB0aGlzIHBsYWNlaG9sZGVyLicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIChzZW5kTm90aWZ5LCBkdXJhdGlvbikge1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgZGVmYXVsdER1cmF0aW9uO1xyXG5cdFx0dGhpcy5pc09wZW4gPSB0cnVlO1xyXG5cdFx0dGhpcy4kY2FyZC5hZGRDbGFzcygnaXNPcGVuJyk7XHJcblx0XHRpZiAodGhpcy5oaWRlQWN0aW9uc09uT3Blbikge1xyXG5cdFx0XHR0aGlzLiRhY3Rpb25zLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlVGl0bGVPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kdGl0bGUuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmhpZGVTdWJUaXRsZU9uT3Blbikge1xyXG5cdFx0XHR0aGlzLiRzdWJUaXRsZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZUNhcHRpb25Pbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kY2FwdGlvbi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZW1pdE5vdGlmeU9uT3Blbikge1xyXG5cdFx0XHRpZiAoc2VuZE5vdGlmeSkge1xyXG5cdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KHRoaXMuTWFpbkludGVyYWN0aXZlQ2FyZEZha2VOb3RpZnlJZCwgJ29wZW4nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLiR0cmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMuJHRyaWdnZXIuY2xpY2soKTtcclxuXHRcdFx0dGhpcy4kYm9keS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChkdXJhdGlvbiA+IDApIHtcclxuXHRcdFx0XHR0aGlzLiRib2R5LnNsaWRlRG93bihkdXJhdGlvbik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kYm9keS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEgJiYgIXRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5oYXNDbGFzcygnY2tlX3d5c2l3eWdfZnJhbWUnKSkge1xyXG5cdFx0XHR2YXIgaWZyYW1lQ29udGVudHMgPSB0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuY29udGVudHMoKTtcclxuXHRcdFx0aWZyYW1lQ29udGVudHMuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtaWZyYW1lLWFjdGlvbnMnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMuYWxsb3dNdWx0aXBsZU9wZW4pIHtcclxuXHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuZm9yRWFjaChpdGVtID0+IChpdGVtICE9PSB0aGlzICYmIGl0ZW0uYWxsb3dPcGVuaW5nID8gaXRlbS5jbG9zZShkdXJhdGlvbikgOiBudWxsKSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uIHx8IGRlZmF1bHREdXJhdGlvbjtcclxuXHRcdHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcblx0XHR0aGlzLiRjYXJkLnJlbW92ZUNsYXNzKCdpc09wZW4nKTtcclxuXHRcdGlmICh0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykubGVuZ3RoID09PSAxICYmICF0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuaGFzQ2xhc3MoJ2NrZV93eXNpd3lnX2ZyYW1lJykpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWlmcmFtZS1hY3Rpb25zJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kYm9keS5zbGlkZVVwKGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChzZWxmLiRjYXJkLmhhc0NsYXNzKCdmb3JjZU9wZW4nKSkge1xyXG5cdFx0XHRcdHNlbGYuJGNhcmQucmVtb3ZlQ2xhc3MoJ2ZvcmNlT3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLmhpZGVBY3Rpb25zT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJGFjdGlvbnMuc2hvdygpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZVRpdGxlT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJHRpdGxlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJHN1YlRpdGxlLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZUNhcHRpb25Pbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kY2FwdGlvbi5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuJGhlYWRlclRleHQuY3NzKHtcclxuXHRcdFx0bWF4V2lkdGg6IHRoaXMuJGhlYWRlci53aWR0aCgpIC0gdGhpcy4kYWN0aW9ucy53aWR0aCgpICsgJ3B4J1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuaXNPcGVuID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaXNPcGVuO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRhbGw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCEhJCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQnKS5sZW5ndGgpIHtcclxuXHRcdGlmICghISFTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hZnRlckFqYXhSZXF1ZXN0QmluZGVkKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFsbCgpO1xyXG5cdFx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFsbCgpO1xyXG5cdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0XHRlbGVtZW50LmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcclxuXHRcdH0pO1xyXG5cdH0sIDEwMDApO1xyXG5cclxufSk7IiwiLyogQ29tcG9uZW50IE1lbnVCYXIgKi9cclxuU2FwcGhpcmVXaWRnZXRzLk1lbnVCYXIgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRtZW51V2lkZ2V0ID0gJCgnIycgKyBjb25maWcubWVudVdpZGdldCk7XHJcblxyXG5cdFx0dmFyIG1lbnVSZXNpZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBuYXZXaWR0aCA9IDA7XHJcblx0XHRcdHZhciBhdmFpbGFiZUVzcGFjZSA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0nKS53aWR0aCgpO1xyXG5cclxuXHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbSAuTWVudUl0ZW0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdG5hdldpZHRoICs9ICQodGhpcykub3V0ZXJXaWR0aCh0cnVlKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAobmF2V2lkdGggPiBhdmFpbGFiZUVzcGFjZSkge1xyXG5cdFx0XHRcdHZhciBsYXN0SXRlbSA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykubGFzdCgpO1xyXG5cdFx0XHRcdGxhc3RJdGVtLmF0dHIoJ2RhdGEtd2lkdGgnLCBsYXN0SXRlbS5vdXRlcldpZHRoKHRydWUpKTtcclxuXHRcdFx0XHRsYXN0SXRlbS5wcmVwZW5kVG8oJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyJykpO1xyXG5cdFx0XHRcdG1lbnVSZXNpZGVyKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGZpcnN0TW9yZUVsZW1lbnQgPSAkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXIgLk1lbnVJdGVtJykuZmlyc3QoKTtcclxuXHRcdFx0XHRpZiAobmF2V2lkdGggKyBmaXJzdE1vcmVFbGVtZW50LmRhdGEoJ3dpZHRoJykgPCBhdmFpbGFiZUVzcGFjZSkge1xyXG5cdFx0XHRcdFx0Zmlyc3RNb3JlRWxlbWVudC5pbnNlcnRBZnRlcigkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9pdGVtIC5NZW51SXRlbScpLmxhc3QoKSk7XHJcblx0XHRcdFx0XHRtZW51UmVzaWRlcigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCEkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKS5pcygnOmVtcHR5JykpIHtcclxuXHRcdFx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9leHRyYUl0ZW0nKS5hZGRDbGFzcygnc2hvdycpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnVJdGVtJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHQhJCh0aGlzKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuaGFzQ2xhc3MoJ01lbnViYXJfX2V4dHJhQ29udGFpbmVyJylcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0aWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlSW5kaWNhdG9yJykpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLmFjdGl2ZUluZGljYXRvcicpLmFkZENsYXNzKCdzaGFkb3cnKTtcclxuXHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5NZW51SXRlbV9zdWJJdGVtcycpXHJcblx0XHRcdFx0XHRcdC50b2dnbGVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpICYmICQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZUluZGljYXRvcicpKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5NZW51SXRlbV9zdWJJdGVtcycpXHJcblx0XHRcdFx0XHRcdC50b2dnbGVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcclxuXHRcdFx0XHRcdC50b2dnbGVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9leHRyYUl0ZW0gLmljb24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyICcpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKGRvY3VtZW50KS5tb3VzZXVwKGUgPT4ge1xyXG5cdFx0XHR2YXIgJG1lbnUgPSAkbWVudVdpZGdldC5maW5kKCcuTWVudUl0ZW0uYWN0aXZlJyk7XHJcblx0XHRcdHZhciAkbW9yZU9wdGlvbnMgPSAkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9leHRyYUl0ZW0nKTtcclxuXHJcblx0XHRcdC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBtZW51IG9yIGEgZGVzY2VuZGFudCBvZiB0aGUgbWVudVxyXG5cdFx0XHRpZiAoJG1lbnUubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdGlmICghJG1lbnUuaXMoZS50YXJnZXQpICYmICRtZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHQkbWVudS5maW5kKCcuTWVudUl0ZW1fc3ViSXRlbXMnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdFx0JCgnLmFjdGl2ZUluZGljYXRvcicpLnJlbW92ZUNsYXNzKCdzaGFkb3cnKTtcclxuXHRcdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoISRtb3JlT3B0aW9ucy5pcyhlLnRhcmdldCkgJiYgJG1vcmVPcHRpb25zLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0JG1vcmVPcHRpb25zLmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0JCgnLmFjdGl2ZUluZGljYXRvcicpLnJlbW92ZUNsYXNzKCdzaGFkb3cnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUgbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRtZW51UmVzaWRlcigpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBNdWx0aXBsZVNlbGVjdGlvbkJ1dHRvbiAqL1xyXG5TYXBwaGlyZVdpZGdldHMuTXVsdGlwbGVTZWxlY3Rpb25CdXR0b24gPSBmdW5jdGlvbihXcmFwcGVySWQpIHtcclxuXHR2YXIgJHdpZGdldCA9ICQoV3JhcHBlcklkKTtcclxuXHR2YXIgJGNvbnRyb2wgPSAkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG5cclxuXHRpZiAoJChXcmFwcGVySWQgKyAnIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmlzKCc6ZGlzYWJsZWQnKSkge1xyXG5cdFx0JChXcmFwcGVySWQpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKFdyYXBwZXJJZCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0fVxyXG5cclxuXHRpZiAoJChXcmFwcGVySWQgKyAnIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHQkKFdyYXBwZXJJZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKFdyYXBwZXJJZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdH1cclxuXHJcblx0JHdpZGdldC5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkd2lkZ2V0LmZpbmQoJy5NdWx0aXBsZVNlbGVjdGlvbkJ1dHRvbi1sYWJlbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gJGNvbnRyb2wucHJvcChcImNoZWNrZWRcIiwgISRjb250cm9sLnByb3AoXCJjaGVja2VkXCIpKTtcclxuXHRcdCRjb250cm9sWzBdLmNsaWNrKCk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoJGNvbnRyb2wuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkd2lkZ2V0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMTApO1xyXG5cdH0pO1xyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgQ29uZmlybWF0aW9uUGFuZWwzT3B0aW9ucyBDb25maXJtYXRpb25QYW5lbCBzYW1lIGphdmFzY3JpcHQgY29kZSovXHJcblxyXG5TYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwgPSB7XHJcblx0aXNBbnlQYW5lbE9wZW5lZDogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdQYW5lbE9wZW5lZCcpICYmICQoJy5QYW5lbENvbnRhaW5lcjp2aXNpYmxlJykubGVuZ3RoO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XHJcblx0XHRpZiAoIU9zVmFsaWRhdG9yT25TdWJtaXQoKSkgcmV0dXJuO1xyXG5cclxuXHRcdGlmICghU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBhbmVsLmlzQW55UGFuZWxPcGVuZWQoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZUluKDE0MCk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyMnICsgUGFuZWxJZClcclxuXHRcdFx0XHRcdC5maW5kKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y2xvc2VQYW5lbDogZnVuY3Rpb24oUGFuZWxJZCkge1xyXG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0JCgnIycgKyBQYW5lbElkKS5mYWRlT3V0KDE0MCk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnIycgKyBQYW5lbElkKVxyXG5cdFx0XHRcdC5maW5kKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdC5zbGlkZVVwKDE1MCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcblxyXG5cdHNldFBhbmVsQmVoYXZpb3I6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLlBhbmVsW3BhbmVsLXRyaWdnZXItZWxlbWVudGlkXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0aGlzX3BhbmVsID0gJCh0aGlzKTtcclxuXHRcdFx0JCgnIycgKyB0aGlzX3BhbmVsLmF0dHIoJ3BhbmVsLXRyaWdnZXItZWxlbWVudGlkJykgKyAnJylcclxuXHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBhbmVsLnRvZ2dsZVBhbmVsKHRoaXNfcGFuZWwuYXR0cignaWQnKSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0U2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBhbmVsLnNldFBhbmVsQmVoYXZpb3IoKTtcclxuXHRpZiAob3NBamF4QmFja2VuZC5FdmVudEhhbmRsZXJzLkFmdGVyQWpheFJlcXVlc3QudG9TdHJpbmcoKS5pbmRleE9mKCdzZXRQYW5lbEJlaGF2aW9yJykgPT0gLTEpIHtcclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBhbmVsLnNldFBhbmVsQmVoYXZpb3IpO1xyXG5cdH1cclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBDb25maXJtYXRpb25Qb3B1cCAqL1xyXG52YXIgX2lzSW5JZnJhbWUgPSB3aW5kb3cuZnJhbWVFbGVtZW50ICE9IHVuZGVmaW5lZCB8fCBmYWxzZTtcclxuU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBvcHVwID0ge1xyXG5cdGlzQW55Q29uZmlybWF0aW9uT3BlbmVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoX2lzSW5JZnJhbWUpIHtcclxuXHRcdFx0cmV0dXJuIHdpbmRvdy50b3AuJCgnYm9keScpLmhhc0NsYXNzKCdjb25maXJtYXRpb24tb3BlbmVkJykgJiYgd2luZG93LnRvcC4kKCcuY29uZmlybS1jb250YWluZXI6dmlzaWJsZScpLmxlbmd0aDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ2NvbmZpcm1hdGlvbi1vcGVuZWQnKSAmJiAkKCcuY29uZmlybS1jb250YWluZXI6dmlzaWJsZScpLmxlbmd0aDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHR0b2dnbGVDb25maXJtOiBmdW5jdGlvbiAoX2lkLCBfcXVlc3Rpb24sIF9tZXNzYWdlLCBfbm90aWZ5SWQsIF9IYXNOb3RpZnlPbkNhbmNlbCkge1xyXG5cdFx0aWYgKCFPc1ZhbGlkYXRvck9uU3VibWl0KCkpIHJldHVybjtcclxuXHJcblx0XHRpZiAoIXRoaXMuaXNBbnlDb25maXJtYXRpb25PcGVuZWQoKSkge1xyXG5cdFx0XHR2YXIgX2JvZHkgPSAkKCdib2R5Jyk7XHJcblx0XHRcdHZhciBfYm9keUpTID0gZG9jdW1lbnQuYm9keTtcclxuXHRcdFx0aWYgKF9pc0luSWZyYW1lKSB7XHJcblx0XHRcdFx0X2JvZHkgPSB3aW5kb3cudG9wLiQoJ2JvZHknKTtcclxuXHRcdFx0XHRfYm9keUpTID0gd2luZG93LnRvcC5kb2N1bWVudC5ib2R5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRfYm9keS5hZGRDbGFzcygnY29uZmlybWF0aW9uLW9wZW5lZCcpO1xyXG5cclxuXHRcdFx0dmFyIF9jb25maXJtSWQgPSAnY29uZmlybV8nICsgX2lkO1xyXG5cclxuXHRcdFx0dmFyIF9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuXHRcdFx0X2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgX2NvbmZpcm1JZCk7XHJcblx0XHRcdF9jb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb25maXJtIGNvbmZpcm0td2InKTtcclxuXHRcdFx0X2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NvbmZpcm0tdHJpZ2dlci1lbGVtZW50aWQnLCBfaWQpO1xyXG5cclxuXHRcdFx0dmFyIF9iYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1iYWNrZ3JvdW5kIGNvbmZpcm0td2InKTtcclxuXHRcdFx0X2JhY2tncm91bmQuc2V0QXR0cmlidXRlKCdpZCcsICdiZ18nICsgX2NvbmZpcm1JZCk7XHJcblx0XHRcdF9jb250YWluZXIuYXBwZW5kQ2hpbGQoX2JhY2tncm91bmQpO1xyXG5cclxuXHRcdFx0dmFyIF9jb25maXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1jb250YWluZXIgY29uZmlybS13YicpO1xyXG5cdFx0XHRfY29udGFpbmVyLmFwcGVuZENoaWxkKF9jb25maXJtKTtcclxuXHJcblx0XHRcdHZhciBfY29uZmlybVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtVGl0bGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb25maXJtLXRpdGxlJyk7XHJcblx0XHRcdHZhciBfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShfcXVlc3Rpb24pO1xyXG5cdFx0XHRfY29uZmlybVRpdGxlLmFwcGVuZENoaWxkKF90aXRsZSk7XHJcblx0XHRcdF9jb25maXJtLmFwcGVuZENoaWxkKF9jb25maXJtVGl0bGUpO1xyXG5cclxuXHRcdFx0dmFyIF9jb25maXJtTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtTXNnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG5cdFx0XHRfY29uZmlybU1zZy5pbm5lckhUTUwgPSBfbWVzc2FnZTsgLyogU2V0IEhUTUwgdG8gcmVuZGVyIHRoZSBtZXNzYWdlIEhUTUwgdGFncywgc2ltaWxhciB0byB0aGUgRXNjYXBlIENvbnRlbnQgc2V0IGFzIE5vLiAqL1xyXG5cdFx0XHRfY29uZmlybS5hcHBlbmRDaGlsZChfY29uZmlybU1zZyk7XHJcblxyXG5cdFx0XHR2YXIgX2NvbmZpcm1BY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtQWN0aW9ucy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbmZpcm0tYWN0aW9ucycpO1xyXG5cdFx0XHRfY29uZmlybS5hcHBlbmRDaGlsZChfY29uZmlybUFjdGlvbnMpO1xyXG5cclxuXHRcdFx0dmFyIF9ub0J0bkxuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnQnV0dG9uIFRoaXJkIE11bHRpTWFyZ2luUmlnaHQxMCcpO1xyXG5cdFx0XHRfbm9CdG5Mbmsuc2V0QXR0cmlidXRlKCdjYW5jZWwtYnV0dG9uJywgJ2NhbmNlbC1idXR0b24nKTtcclxuXHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZSgndWknLCAnQ29uZmlybU5vMScpO1xyXG5cdFx0XHRpZiAoX0hhc05vdGlmeU9uQ2FuY2VsID09ICdUcnVlJykge1xyXG5cdFx0XHRcdGlmIChfaXNJbklmcmFtZSkge1xyXG5cdFx0XHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdFx0J29uY2xpY2snLFxyXG5cdFx0XHRcdFx0XHQnZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCInICsgJ2lmcmFtZV8nICsgX2lkICsgJ1wiKS5jb250ZW50V2luZG93Lk9zTm90aWZ5V2lkZ2V0KFwiJyArIF9ub3RpZnlJZCArICdcIixcIkNBTkNFTFwiKTsgU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBvcHVwLmNsb3NlQ29uZmlybVBvcHVwKFwiJyArIF9jb25maXJtSWQgKyAnXCIpOydcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdF9ub0J0bkxuay5zZXRBdHRyaWJ1dGUoXHJcblx0XHRcdFx0XHRcdCdvbmNsaWNrJyxcclxuXHRcdFx0XHRcdFx0J09zTm90aWZ5V2lkZ2V0KFwiJyArIF9ub3RpZnlJZCArICdcIixcIkNBTkNFTFwiKTsgU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBvcHVwLmNsb3NlQ29uZmlybVBvcHVwKFwiJyArIF9jb25maXJtSWQgKyAnXCIpOydcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChfaXNJbklmcmFtZSkge1xyXG5cdFx0XHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdFx0J29uY2xpY2snLFxyXG5cdFx0XHRcdFx0XHQnU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBvcHVwLmNsb3NlQ29uZmlybVBvcHVwKFwiJyArIF9jb25maXJtSWQgKyAnXCIpOydcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdF9ub0J0bkxuay5zZXRBdHRyaWJ1dGUoXHJcblx0XHRcdFx0XHRcdCdvbmNsaWNrJyxcclxuXHRcdFx0XHRcdFx0J1NhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25Qb3B1cC5jbG9zZUNvbmZpcm1Qb3B1cChcIicgKyBfY29uZmlybUlkICsgJ1wiKTsnXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIF9ub0J0biA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdObycpO1xyXG5cdFx0XHRfbm9CdG5MbmsuYXBwZW5kQ2hpbGQoX25vQnRuKTtcclxuXHRcdFx0X2NvbmZpcm1BY3Rpb25zLmFwcGVuZENoaWxkKF9ub0J0bkxuayk7XHJcblxyXG5cdFx0XHR2YXIgX3llc0J0bkxuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHRcdFx0X3llc0J0bkxuay5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ0J1dHRvbiBTZXRBc1ZhbGlkIElzX0RlZmF1bHQnKTtcclxuXHRcdFx0X3llc0J0bkxuay5zZXRBdHRyaWJ1dGUoJ2NhbmNlbC1idXR0b24nLCAnJyk7XHJcblx0XHRcdF95ZXNCdG5Mbmsuc2V0QXR0cmlidXRlKCd1aScsICdDb25maXJtWWVzMScpO1xyXG5cclxuXHRcdFx0aWYgKF9pc0luSWZyYW1lKSB7XHJcblx0XHRcdFx0X3llc0J0bkxuay5zZXRBdHRyaWJ1dGUoXHJcblx0XHRcdFx0XHQnb25jbGljaycsXHJcblx0XHRcdFx0XHQnZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCInICsgJ2lmcmFtZV8nICsgX2lkICsgJ1wiKS5jb250ZW50V2luZG93Lk9zTm90aWZ5V2lkZ2V0KFwiJyArIF9ub3RpZnlJZCArICdcIixcIk9LXCIpOyBTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUG9wdXAuY2xvc2VDb25maXJtUG9wdXAoXCInICsgX2NvbmZpcm1JZCArICdcIik7J1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3llc0J0bkxuay5zZXRBdHRyaWJ1dGUoXHJcblx0XHRcdFx0XHQnb25jbGljaycsXHJcblx0XHRcdFx0XHQnT3NOb3RpZnlXaWRnZXQoXCInICsgX25vdGlmeUlkICsgJ1wiLFwiT0tcIik7IFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25Qb3B1cC5jbG9zZUNvbmZpcm1Qb3B1cChcIicgKyBfY29uZmlybUlkICsgJ1wiKTsnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgX3llc0J0biA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZZXMnKTtcclxuXHRcdFx0X3llc0J0bkxuay5hcHBlbmRDaGlsZChfeWVzQnRuKTtcclxuXHRcdFx0X2NvbmZpcm1BY3Rpb25zLmFwcGVuZENoaWxkKF95ZXNCdG5MbmspO1xyXG5cclxuXHRcdFx0X2NvbmZpcm0uYXBwZW5kQ2hpbGQoX2NvbmZpcm1BY3Rpb25zKTtcclxuXHJcblx0XHRcdF9jb250YWluZXIuYXBwZW5kQ2hpbGQoX2NvbmZpcm0pO1xyXG5cclxuXHRcdFx0X2JvZHlKUy5hcHBlbmRDaGlsZChfY29udGFpbmVyKTtcclxuXHJcblx0XHRcdGlmIChfaXNJbklmcmFtZSkge1xyXG5cdFx0XHRcdHdpbmRvdy50b3AuJCgnI2JnXycgKyBfY29uZmlybUlkKS5mYWRlSW4oMTQwKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHdpbmRvdy50b3AuJCgnIycgKyBfY29uZmlybUlkKS5maW5kKCcuY29uZmlybS1jb250YWluZXInKS5zbGlkZVRvZ2dsZSgxNTApO1xyXG5cdFx0XHRcdFx0d2luZG93LnRvcC4kKCcjJyArIF9jb25maXJtSWQgKyAnIFtjYW5jZWwtYnV0dG9uXScpLmZvY3VzKCk7XHJcblx0XHRcdFx0fSwgMTAwKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKCcjYmdfJyArIF9jb25maXJtSWQpLmZhZGVJbigxNDApO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0JCgnIycgKyBfY29uZmlybUlkKS5maW5kKCcuY29uZmlybS1jb250YWluZXInKS5zbGlkZVRvZ2dsZSgxNTApO1xyXG5cdFx0XHRcdFx0JCgnIycgKyBfY29uZmlybUlkICsgJyBbY2FuY2VsLWJ1dHRvbl0nKS5mb2N1cygpO1xyXG5cdFx0XHRcdH0sIDEwMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjbG9zZUNvbmZpcm1Qb3B1cDogZnVuY3Rpb24gKF9jb25maXJtSWQpIHtcclxuXHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnY29uZmlybWF0aW9uLW9wZW5lZCcpO1xyXG5cdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHRcdCQoJyNiZ18nICsgX2NvbmZpcm1JZCkuZmFkZU91dCgxNDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCcjJyArIF9jb25maXJtSWQpLmZpbmQoJy5jb25maXJtLWNvbnRhaW5lcicpLnNsaWRlVXAoMTUwKTtcclxuXHRcdFx0JCgnIycgKyBfY29uZmlybUlkKS5yZW1vdmUoKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlOiBmdW5jdGlvbiAoX2lkLCBfcXVlc3Rpb24sIF9tZXNzYWdlLCBfbm90aWZ5SWQsIF9IYXNOb3RpZnlPbkNhbmNlbCkge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCcjJyArIF9pZCkub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUG9wdXAudG9nZ2xlQ29uZmlybShfaWQsIF9xdWVzdGlvbiwgX21lc3NhZ2UsIF9ub3RpZnlJZCwgX0hhc05vdGlmeU9uQ2FuY2VsKTtcclxuXHRcdFx0XHRpZiAoX2lzSW5JZnJhbWUpIHtcclxuXHRcdFx0XHRcdHdpbmRvdy5mcmFtZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZW51LWlkJywgX2lkKTtcclxuXHRcdFx0XHRcdHdpbmRvdy5mcmFtZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdpZnJhbWVfJyArIF9pZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59OyIsIi8qIENvbXBvbmVudCBQYW5lbEJ5SUROb3RpZnkgKi9cclxudmFyIHBhbmVsTm90aWZ5V2lkZ2V0O1xyXG5TYXBwaGlyZVdpZGdldHMuUGFuZWxCeUlkTm90aWZ5ID0ge1xyXG5cdGlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0fSxcclxuXHR0b2dnbGVQYW5lbEJ5Tm90aWZ5OiBmdW5jdGlvbihJZCkge1xyXG5cdFx0aWYgKCFpc0FueVBhbmVsT3BlbmVkRGVwcmVjYXRlZCgpKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5mYWRlSW4oMTQwKTtcclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGp1c3REcmFnZ2VkID09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHQkKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdtYXJnaW4tbGVmdCcsIHBhbmVsTWFyZ2luTGVmdClcclxuXHRcdFx0XHRcdFx0LmNzcygnbGVmdCcsIHBhbmVsTGVmdClcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKHBhbmVsQXJyb3dDbGFzcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bigxNTApO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVPdXQoMTQwKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVVcCgxNTApO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0dG9nZ2xlUGFuZWxOb3RpZnlCeUlkOiBmdW5jdGlvbihJZCkge1xyXG5cdFx0JCgnYm9keScpLnRvZ2dsZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0JCgnIycgKyBJZClcclxuXHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHQucGFyZW50KClcclxuXHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHQuZmFkZVRvZ2dsZSgxNDApO1xyXG5cclxuXHRcdHBhbmVsTm90aWZ5V2lkZ2V0ID0gJCgnIycgKyBJZClcclxuXHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHQuYXR0cignTm90aWZ5SWQnKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdC5zbGlkZVRvZ2dsZSgxNTApO1xyXG5cdFx0fSwgMTAwKTtcclxuXHR9LFxyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgUGFuZWxCeUlEICovXHJcblNhcHBoaXJlV2lkZ2V0cy5QYW5lbEJ5SWQgPSB7XHJcblx0aXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuICQoJ2JvZHknKS5oYXNDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVCdXR0b246IGZ1bmN0aW9uKGlkKSB7XHJcblx0XHRjb25zdCAkdG9nZ2xlQnV0dG9uID0gJChgIyR7aWR9YCkucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpLmxlbmd0aFxyXG5cdFx0XHQ/ICQoYCMke2lkfWApLnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHQ6ICQoYCMke2lkfWApO1xyXG5cclxuXHRcdCR0b2dnbGVCdXR0b24uY2xpY2soKTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVQYW5lbEJ5SWQ6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHRjb25zdCAkdG9nZ2xlQnV0dG9uID0gJChgIyR7SWR9YCkucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpO1xyXG5cdFx0Y29uc3QgJHBhbmVsID0gJHRvZ2dsZUJ1dHRvbi5wYXJlbnQoKS5jaGlsZHJlbignLlBhbmVsJyk7XHJcblx0XHRjb25zdCAkcGFuZWxDb250YWluZXIgPSAkcGFuZWwuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpO1xyXG5cdFx0Y29uc3QgJHBhbmVsQmFja2dyb3VuZCA9ICRwYW5lbC5jaGlsZHJlbignLlBhbmVsQmFja2dyb3VuZCcpO1xyXG5cclxuXHRcdGlmICghdGhpcy5pc0FueVBhbmVsT3BlbmVkRGVwcmVjYXRlZCgpKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdCRwYW5lbC5zaG93KCk7XHJcblx0XHRcdCRwYW5lbENvbnRhaW5lci5zbGlkZURvd24oMjAwKTtcclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBqdXN0RHJhZ2dlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdGlmIChqdXN0RHJhZ2dlZCA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHQkKCcuUGFuZWxCeUlkTmV3X1BhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdtYXJnaW4tbGVmdCcsIHBhbmVsTWFyZ2luTGVmdClcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdsZWZ0JywgcGFuZWxMZWZ0KVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhwYW5lbEFycm93Q2xhc3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRwYW5lbEJhY2tncm91bmQuZmFkZUluKDgwKTtcclxuXHJcblx0XHRcdFx0JHRvZ2dsZUJ1dHRvbi5jbGljaygpO1xyXG5cdFx0XHR9LCA1MCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkcGFuZWxDb250YWluZXIuc2xpZGVVcCgyMDApO1xyXG5cclxuXHRcdFx0JHBhbmVsQmFja2dyb3VuZC5mYWRlT3V0KDgwLCAoKSA9PiB7XHJcblx0XHRcdFx0JHRvZ2dsZUJ1dHRvbi5jbGljaygpO1xyXG5cclxuXHRcdFx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHJcblx0XHRcdFx0JHBhbmVsLmhpZGUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxufTtcclxuIiwiLyogQ29tcG9uZW50IFBvcFVwTWVudSAqL1xyXG5TYXBwaGlyZVdpZGdldHMuUG9wVXBNZW51ID0ge1xyXG5cdG1lbnVQb3NpdGlvbjogZnVuY3Rpb24oaWQsIENvbnRleHQsIExvY2FsZSkge1xyXG5cdFx0LyogSGlkZSBhbnkgb3RoZXIgbWVudXMgb24gcGFnZSBhbmQgc2V0IGJ1dHRvbiBhcyBjb2xsYXBzZWQuICovXHJcblx0XHQkKCcucG9wdXAtbWVudTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cclxuXHRcdC8vdmFyIF90aGlzID0gJCh0aGlzKTtcclxuXHRcdHZhciBfdGhpcyA9ICQoJyMnICsgaWQpO1xyXG5cdFx0dmFyIFh4ID0gMDtcclxuXHRcdHZhciBZeSA9IDA7XHJcblx0XHR2YXIgV3cgPSAwO1xyXG5cdFx0dmFyIEhoID0gMDtcclxuXHJcblx0XHRfdGhpcy5jaGlsZHJlbignLmJ1dHRvbi1leHBhbmQ6dmlzaWJsZScpLmhpZGUoKTtcclxuXHJcblx0XHQvKiBHZXQgdGhlIG1lbnUgZWxlbWVudC4gKi9cclxuXHRcdHZhciBfZWwgPSBfdGhpcy5uZXh0KCcucG9wdXAtbWVudScpO1xyXG5cclxuXHRcdC8qIERpc3BsYXkgdGhlIG1lbnUuICovXHJcblx0XHRfZWwuc2hvdygpO1xyXG5cclxuXHRcdC8qIFNldCBidXR0b24gY29sbGFwc2UuICovXHJcblx0XHRfdGhpcy5jaGlsZHJlbignLmJ1dHRvbi1jb2xsYXBzZScpLnNob3coKTtcclxuXHJcblx0XHQvKiBHZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGJ1dHRvbi4gKi9cclxuXHRcdGJ1dHRvbkhoID0gX3RoaXMub3V0ZXJIZWlnaHQoKTtcclxuXHRcdGJ1dHRvbld3ID0gX3RoaXMub3V0ZXJXaWR0aCgpO1xyXG5cclxuXHRcdHZhciBidXR0b25ZID0gX3RoaXMucG9zaXRpb24oKS50b3AgKyBidXR0b25IaCArIDEwO1xyXG5cdFx0dmFyIGJ1dHRvblggPSBfdGhpcy5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0Ly92YXIgYnV0dG9uWCA9IF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHQvKiBHZXQgdGhlIGRpc3RhbmNlIG9mIG1lbnUgYnV0dG9uIGFuZCB0aGUgcGFyZW50IGVsZW1lbnQgKi9cclxuXHRcdHZhciBwb3B1cFBhcmVudFh4ID0gX3RoaXMub2Zmc2V0KCkubGVmdCAtIF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHR2YXIgcG9wdXBYeCA9IF9lbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIHBvcHVwV3cgPSBfZWwub3V0ZXJXaWR0aCgpO1xyXG5cclxuXHRcdFh4ID0gTWF0aC5hYnMoYnV0dG9uWCAtICQoJ2JvZHknKS5zY3JvbGxMZWZ0KCkgLSBwb3B1cFBhcmVudFh4KTtcclxuXHRcdFl5ID0gTWF0aC5hYnMoYnV0dG9uSGggLSBidXR0b25ZIC0gJCgnYm9keScpLnNjcm9sbFRvcCgpKTtcclxuXHJcblx0XHRpZiAoTG9jYWxlICE9ICdBUicpIHtcclxuXHRcdFx0LyogQ2hlY2sgaWYgY2xpY2tlZCBwb3NpdGlvbiBwbHVzIHRoZSBwb3B1cCB3aWR0aCBleGNlZWQgdGhlIHdpbmRvdyB3aWR0aC4gKi9cclxuXHRcdFx0aWYgKGJ1dHRvblggKyBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSA+ICQoQ29udGV4dCkud2lkdGgoKSkge1xyXG5cdFx0XHRcdFh4ID0gYnV0dG9uWCAtIHBvcHVwV3cgLSAkKCdib2R5Jykuc2Nyb2xsTGVmdCgpIC0gcG9wdXBQYXJlbnRYeCArIGJ1dHRvbld3O1xyXG5cdFx0XHRcdC8vWHggPSAoJCh3aW5kb3cpLndpZHRoKCkgLSBwb3B1cFd3KSAtICQoJ2JvZHknKS5zY3JvbGxMZWZ0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgbWVudSBwb3NpdGlvbi4gKi9cclxuXHRcdF9lbC5jc3Moe1xyXG5cdFx0XHRsZWZ0OiBYeCArICdweCcsXHJcblx0XHRcdHRvcDogYnV0dG9uWSArICdweCcsXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKiBSZWZyZXNoIHZhbHVlICovXHJcblx0XHRwb3B1cFh4ID0gX2VsLm9mZnNldCgpLmxlZnQ7XHJcblxyXG5cdFx0dmFyIF9iYWxsb29uRWwgPSBfZWwuY2hpbGRyZW4oJy5wb3B1cC1tZW51LWJhbGxvb24nKTtcclxuXHJcblx0XHR2YXIgX2JhbGxvb25YeCA9IF9iYWxsb29uRWwub2Zmc2V0KCkubGVmdDtcclxuXHRcdHZhciBfYmFsbG9vbld3ID0gX2JhbGxvb25FbC5vdXRlcldpZHRoKCk7XHJcblx0XHR2YXIgX2JhbGxvb25Qb3NYeCA9IE1hdGguYWJzKGJ1dHRvblggLSBYeCAtIHBvcHVwUGFyZW50WHgpO1xyXG5cclxuXHRcdC8qIElzIHRoZSBiYWxsb29uIGljb24gcG9zaXRpb25lZCBvdXQgb2YgdGhlIHBvcHVwIG1lbnU/ICovXHJcblx0XHRpZiAoX2JhbGxvb25Qb3NYeCArIFh4ICsgX2JhbGxvb25XdyA+IFh4ICsgcG9wdXBXdykge1xyXG5cdFx0XHRfYmFsbG9vblBvc1h4ID0gX2JhbGxvb25Qb3NYeCAtIF9iYWxsb29uV3c7XHJcblx0XHR9XHJcblxyXG5cdFx0LyogU2V0IHBvc2l0aW9uIG9mIHRoZSBiYWxsb29uIGVmZmVjdC4gKi9cclxuXHRcdF9iYWxsb29uRWwuY3NzKCdsZWZ0JywgX2JhbGxvb25Qb3NYeCArICdweCcpO1xyXG5cdH0sXHJcblx0bWVudUV2ZW50czogZnVuY3Rpb24oQ29udGV4dCwgTG9jYWxlKSB7XHJcblx0XHQkKCcucG9wdXAtYnV0dG9uJylcclxuXHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdHZhciBpZCA9ICQodGhpcykuYXR0cignaWQnKTtcclxuXHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuUG9wVXBNZW51Lm1lbnVQb3NpdGlvbihpZCwgQ29udGV4dCwgTG9jYWxlKTtcclxuXHJcblx0XHRcdFx0LyplLnN0b3BQcm9wYWdhdGlvbigpOyovXHJcblxyXG5cdFx0XHRcdC8qIFByZXZlbnQgbGluayBzdWJtaXNzaW9uICovXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHQvKiB2ICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogdiAqL1xyXG5cdFx0ZnVuY3Rpb24gUE1DbGlja091dHNpZGUoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50Lmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0LyppZiAoKHRhcmdldC5wYXJlbnRzKCkuaW5kZXgoJCgnYVtzYXBwaGlyZWhvc3BpdGFsXSwgLkhvc3BpdGFsUG9wVXAnKSkgPT0gLTEpKSB7fSovXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0ISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFxyXG5cdFx0XHRcdFx0XHQnLnBvcHVwLWJ1dHRvbiwgLnBvcHVwLW1lbnUsIC5vcy1pbnRlcm5hbC11aS1hdXRvY29tcGxldGUsIC5vcy1pbnRlcm5hbC11aS1tZW51LWl0ZW0sIC5vcy1pbnRlcm5hbC11aS1jb3JuZXItYWxsLCB1aS1hdXRvY29tcGxldGUtaXRlbSdcclxuXHRcdFx0XHRcdCkubGVuZ3RoXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHQkKCcucG9wdXAtbWVudTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1leHBhbmQnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0dmFyIF9QTUlzQ2xpY2sgPSBmYWxzZTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0X1BNSXNEcmFnID0gZmFsc2U7XHJcblx0XHRcdF9QTUlzQ2xpY2sgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0X1BNSXNEcmFnID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cdFx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0UE1DbGlja091dHNpZGUoZXZlbnQpO1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRpZiAoIV9QTUlzRHJhZyAmJiBfUE1Jc0NsaWNrKSB7XHJcblx0XHRcdFx0UE1DbGlja091dHNpZGUoZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0XHRfUE1Jc0NsaWNrID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0JCgnYm9keScpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdFx0LyogXiAqKiogSGlkZSBwb3B1cCB3aGVuIGNsaWNrIG91dHNpZGUgKioqIF4gKi9cclxuXHR9LFxyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgU2FwcGhpcmVQYW5lbCAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVQYW5lbCA9IHtcclxuXHRjaGVja09wZW5QYW5lbDogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpICYmICQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcjp2aXNpYmxlJykubGVuZ3RoO1xyXG5cdH0sXHJcblxyXG5cdHRvZ2dsZVNhcHBoaXJlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcclxuXHRcdGlmICghT3NWYWxpZGF0b3JPblN1Ym1pdCgpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIVNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLmNoZWNrT3BlblBhbmVsKCkpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xyXG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVJbigxNDApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIFBhbmVsSWQpXHJcblx0XHRcdFx0XHQuZmluZCgnLlNhcHBoaXJlUGFuZWxfQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdC5zbGlkZVRvZ2dsZSgxNTApO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNsb3NlU2FwcGhpcmVQYW5lbDogZnVuY3Rpb24oUGFuZWxJZCkge1xyXG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xyXG5cdFx0JCgnIycgKyBQYW5lbElkKS5mYWRlT3V0KDE0MCk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnIycgKyBQYW5lbElkKVxyXG5cdFx0XHRcdC5maW5kKCcuU2FwcGhpcmVQYW5lbF9Db250YWluZXInKVxyXG5cdFx0XHRcdC5zbGlkZVVwKDE1MCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcblxyXG5cdHNldFBhbmVsQmVoYXZpb3I6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLlBhbmVsW3BhbmVsLXRyaWdnZXItZWxlbWVudGlkXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0aGlzX3BhbmVsID0gJCh0aGlzKTtcclxuXHRcdFx0JCgnIycgKyB0aGlzX3BhbmVsLmF0dHIoJ3BhbmVsLXRyaWdnZXItZWxlbWVudGlkJykgKyAnJylcclxuXHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwudG9nZ2xlU2FwcGhpcmVQYW5lbCh0aGlzX3BhbmVsLmF0dHIoJ2lkJykpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IoKTtcclxuXHJcblx0aWYgKG9zQWpheEJhY2tlbmQuRXZlbnRIYW5kbGVycy5BZnRlckFqYXhSZXF1ZXN0LnRvU3RyaW5nKCkuaW5kZXhPZignc2V0UGFuZWxCZWhhdmlvcicpID09IC0xKSB7XHJcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IpO1xyXG5cdH1cclxufSk7XHJcbiIsInJlcXVpcmUoJy4vY29uZmlybWF0aW9uLXBhbmVsJyk7XHJcbnJlcXVpcmUoJy4vcGFuZWwtYnktaWQnKTtcclxuLy9yZXF1aXJlKCcuL3BhbmVsLWJ5LWlkLW5vdGlmeScpO1xyXG5yZXF1aXJlKCcuL3BvcHVwLW1lbnUnKTtcclxucmVxdWlyZSgnLi9zYXBwaGlyZS1wYW5lbCcpO1xyXG5cclxuIiwiLyogQ29tcG9uZW50IFBhdGllbnRDYWxsQ2FuY2VsU3RydWN0dXJlICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdGNvbnN0ICR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCkuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsU3RydWN0dXJlJyk7XHJcblx0XHRjb25zdCAkbGlzdFF1ZXVlV3JhcHBlciA9ICR3aWRnZXQuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsU3RydWN0dXJlX19MaXN0UXVldWVzJyk7XHJcblx0XHRjb25zdCAkZHJvcGRvd24gPSAkbGlzdFF1ZXVlV3JhcHBlci5maW5kKCcuSW5saW5lRHJvcGRvd25fbGFiZWwnKTtcclxuXHJcblx0XHQkbGlzdFF1ZXVlV3JhcHBlci5vbignY2xpY2snLCBldmVudCA9PiB7XHJcblx0XHRcdGlmICghJGRyb3Bkb3duLmxlbmd0aCkgcmV0dXJuO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRcdCR3aWRnZXQudG9nZ2xlQ2xhc3MoJ1BhdGllbnRDYWxsQ2FuY2VsU3RydWN0dXJlLS1hY3RpdmUnKTtcclxuXHJcblx0XHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljay5QYXRpZW50Q2FsbENhbmNlbFN0cnVjdHVyZScsICgpID0+IHtcclxuXHRcdFx0XHQkd2lkZ2V0LnJlbW92ZUNsYXNzKCdQYXRpZW50Q2FsbENhbmNlbFN0cnVjdHVyZS0tYWN0aXZlJyk7XHJcblx0XHRcdFx0JChkb2N1bWVudCkub2ZmKCdjbGljay5QYXRpZW50Q2FsbENhbmNlbFN0cnVjdHVyZScpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRkcm9wZG93bi50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlBhdGllbnRDYWxsQ2FuY2VsU3RydWN0dXJlID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgUGF0aWVudENhbGxDYW5jZWwgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0Y29uc3QgJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdGNvbnN0ICRjb3VudGRvd24gPSAkd2lkZ2V0LmZpbmQoJ1t1aT1kYXRhLWNvdW50ZXJdJyk7XHJcblx0XHRsZXQgJGNhbGxCdXR0b24gPSAkd2lkZ2V0LmZpbmQoJ1t1aT1kYXRhLWJ1dHRvbi1jYWxsXScpO1xyXG5cdFx0bGV0ICRjYW5jZWxCdXR0b24gPSAkd2lkZ2V0LmZpbmQoJ1t1aT1kYXRhLWJ1dHRvbi1jYW5jZWxdJyk7XHJcblx0XHRjb25zdCAkb3RoZXJDb250ZW50ID0gJHdpZGdldC5maW5kKCcuUGF0aWVudENhbGxDYW5jZWxfX090aGVyJyk7XHJcblxyXG5cdFx0bGV0IGludGVydmFsO1xyXG5cdFx0bGV0IHRpbWVDb3VudGVyO1xyXG5cclxuXHRcdGNvbnN0IGNhbGxQYXRpZW50ID0gZnVuY3Rpb24oJHdpZGdldCkge1xyXG5cdFx0XHR0b2dnbGVDYWxsaW5nU3RhdGUoKTtcclxuXHJcblx0XHRcdGlmIChjb25maWcuc2hvd0NvdW50ZG93bikgJGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4gKyAnICcgKyBjb25maWcudGltZVRvQ2FuY2VsKTtcclxuXHRcdFx0ZWxzZSAkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxpbmdJbik7XHJcblxyXG5cdFx0XHRzdGFydENvdW50ZXIoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Y29uc3QgdG9nZ2xlQ2FsbGluZ1N0YXRlID0gKCkgPT4ge1xyXG5cdFx0XHQkd2lkZ2V0LnRvZ2dsZUNsYXNzKCdDYWxsaW5nUGF0aWVudCcpO1xyXG5cdFx0XHQkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxQYXRpZW50KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Y29uc3Qgc2V0SW5pdGlhbFN0YXRlID0gKCkgPT4ge1xyXG5cdFx0XHQkd2lkZ2V0LnJlbW92ZUNsYXNzKCdDYWxsaW5nUGF0aWVudCcpO1xyXG5cdFx0XHQkY2FsbEJ1dHRvbi5zaG93KCk7XHJcblx0XHRcdCRvdGhlckNvbnRlbnQuc2hvdygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRjb25zdCBzdGFydENvdW50ZXIgPSAoKSA9PiB7XHJcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcclxuXHRcdFx0aW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodXBkYXRlQ291bnRlciwgMTAwMCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGNvbnN0IHVwZGF0ZUNvdW50ZXIgPSAoKSA9PiB7XHJcblx0XHRcdHRpbWVDb3VudGVyLS07XHJcblxyXG5cdFx0XHRpZiAodGltZUNvdW50ZXIgPT09IDApIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcclxuXHRcdFx0XHRPc05vdGlmeVdpZGdldChjb25maWcucGF0aWVudENhbGxGYWtlTm90aWZ5SWQsICcnKTtcclxuXHJcblx0XHRcdFx0c2V0SW5pdGlhbFN0YXRlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb25maWcuc2hvd0NvdW50ZG93bikgJGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4gKyAnICcgKyB0aW1lQ291bnRlcik7XHJcblx0XHRcdGVsc2UgJGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoY29uZmlnLnN0YXJ0Q291bnRpbmcpIGNhbGxQYXRpZW50KCR3aWRnZXQpO1xyXG5cclxuXHRcdCRjYWxsQnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0aWYgKCR3aWRnZXQuaGFzQ2xhc3MoJ0NhbGxpbmdQYXRpZW50JykpIHJldHVybjtcclxuXHJcblx0XHRcdGNhbGxQYXRpZW50KCR3aWRnZXQpO1xyXG5cclxuXHRcdFx0JGNhbGxCdXR0b24uaGlkZSgpO1xyXG5cdFx0XHQkb3RoZXJDb250ZW50LmhpZGUoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRjYW5jZWxCdXR0b24ub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cdFx0XHR0aW1lQ291bnRlciA9IGNvbmZpZy50aW1lVG9DYW5jZWw7XHJcblx0XHRcdCRjb3VudGRvd24udGV4dCh0aW1lQ291bnRlcik7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG5cclxuXHRcdFx0dG9nZ2xlQ2FsbGluZ1N0YXRlKCk7XHJcblxyXG5cdFx0XHQkY2FsbEJ1dHRvbi5zaG93KCk7XHJcblx0XHRcdCRvdGhlckNvbnRlbnQuc2hvdygpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlBhdGllbnRDYWxsQ2FuY2VsID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgUGVyc29uQ2FyZCAqL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHR2YXIgUGVyc29uQ2FyZEV2ZW50ID0gZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuSXNFeHBhbmRhYmxlIC5QZXJzb25DYXJkX190aXRsZSwgLklzRXhwYW5kYWJsZSAuUGVyc29uQ2FyZF9fY29udGVudCcpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRoZWFkZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5QZXJzb25DYXJkX2hlYWRlcicpO1xyXG5cdFx0XHRcdCRjb250ZW50ID0gJGhlYWRlci5uZXh0KCk7XHJcblx0XHRcdFx0aWYgKCRjb250ZW50LmNoaWxkcmVuKCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0JGNvbnRlbnQuc2xpZGVUb2dnbGUoNTAwKTtcclxuXHRcdFx0XHRcdGlmICgkKCcuUGVyc29uQ2FyZC5Jc09wZW4nKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLlBlcnNvbkNhcmQnKVxyXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnSXNPcGVuJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5QZXJzb25DYXJkJylcclxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ0lzT3BlbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0fTtcclxuXHJcblx0JCgnLlN0b3BQcm9wYWdhdGlvbicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHR9KTtcclxuXHJcblx0UGVyc29uQ2FyZEV2ZW50KCk7XHJcblxyXG5cdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoUGVyc29uQ2FyZEV2ZW50KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBQcmVzY3JpcHRpb25DYXJkICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHQkKGAjJHtjb25maWcud2lkZ2V0SWR9YCkuY2xpY2soKCkgPT4ge1xyXG5cdFx0XHRzaG93TW9yZSgkKGAjJHtjb25maWcud2lkZ2V0SWR9YCkpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc2hvd01vcmUgPSBlbGVtZW50ID0+IHtcclxuXHRcdGNvbnN0IHBhcmVudHMgPSBlbGVtZW50LnBhcmVudHMoJy5QcmVzY3JpcHRpb25DYXJkJyk7XHJcblxyXG5cdFx0aWYgKHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykuaGFzQ2xhc3MoJ0lzT3BlbicpKSB7XHJcblx0XHRcdHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykucmVtb3ZlQ2xhc3MoJ0lzT3BlbicpO1xyXG5cclxuXHRcdFx0ZWxlbWVudC50ZXh0KCdTZWUgTW9yZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cGFyZW50cy5maW5kKCcuRXhwYW5EaXYnKS5hZGRDbGFzcygnSXNPcGVuJyk7XHJcblxyXG5cdFx0XHRlbGVtZW50LnRleHQoJ1NlZSBMZXNzJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlByZXNjcmlwdGlvbkNhcmQgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFByZXNjcmlwdGlvbkV4cGFuZGFibGUgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgUHJlc2NyaXB0aW9uRXhwYW5kYWJsZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0Y29uc3Qgd2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0XHRjb25zdCBwcmV2aWV3c3RhdCA9IFtdO1xyXG5cdFx0Y29uc3QgdHJhbnNpdGlvbkV2ZW50ID0gU2lsa1VJLndoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblxyXG5cdFx0Y29uc3QgJGVsZW1lbnRXcmFwcGVyID0gJChgIyR7Y29uZmlnLndpZGdldElkfWApO1xyXG5cclxuXHRcdGNvbnN0IGNsaWNrRXZlbnRzID0gb2IgPT4ge1xyXG5cdFx0XHRpZiAoJChvYikuaGFzQ2xhc3MoJ1ByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyX19MaW5rc0RpdicpKSB7XHJcblx0XHRcdFx0dmFyIFNlY3Rpb24gPSAkKG9iKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5wYXJlbnQoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9jb250ZW50Jyk7XHJcblxyXG5cdFx0XHQvLyBnZXQgaWRcclxuXHRcdFx0dmFyIGlkID0gU2VjdGlvbi5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xyXG5cclxuXHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0LCBkdXJpbmcgdGhpcyBwcm9jZXNzLCB0cmFuc2l0aW9ucyBhcmUgZGlzYWJsZWRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cclxuXHRcdFx0XHQvLyBDb2xsYXBzZSBjb250ZW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdHRlbXBIZWlnaHQgPSBTZWN0aW9uQ29udGVudC5oZWlnaHQoKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KHRlbXBIZWlnaHQpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdFNlY3Rpb24uYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdC8vIGFkZCBldmVudCB0cmFuc2l0aW9uIGVuZCB0byBvdmVyZmxvdzp2aXNpYmxlIGZvciB0b29sdGlwcyBhbmQgZHJvcGRvd25zIGlzc3Vlc1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5pbml0ID0gKCkgPT4ge1xyXG5cdFx0XHRjb25zdCAkaGVhZGVyID0gJGVsZW1lbnRXcmFwcGVyLmZpbmQoJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlcicpO1xyXG5cdFx0XHRjb25zdCAkbGlua3MgPSAkaGVhZGVyLmZpbmQoJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlcl9fTGlua3NEaXYnKTtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSBhcnJheSBzdGF0XHJcblx0XHRcdCQoJy5TZWN0aW9uUHJlc2NyaXB0aW9uRXhwYW5kYWJsZUFyZWEnKS5lYWNoKCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCBzdGF0ID0gJGhlYWRlci5oYXNDbGFzcygnZXhwYW5kZWQnKSA/IHRydWUgOiBmYWxzZTtcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFt3aWRnZXRJZF0gPSB7IGNsaWVudDogc3RhdCwgc2VydmVyOiBzdGF0IH07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKCRoZWFkZXIuaGFzQ2xhc3MoJ05vdEV4cGFuZGFibGUnKSkge1xyXG5cdFx0XHRcdCRoZWFkZXIub24oJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoJ2lzTGlua0VwYW5kYWJsZUNsaWNrJykpIHtcclxuXHRcdFx0XHQkbGlua3Mub24oJ2NsaWNrJywgZSA9PiBjbGlja0V2ZW50cygkbGlua3MpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkaGVhZGVyLm9uKCdjbGljaycsIGUgPT4gY2xpY2tFdmVudHMoJGhlYWRlcikpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBlbGVtZW50cyA9XHJcblx0XHRcdFx0Jy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBpbnB1dCwgLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIHNlbGVjdCwgLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIGEnO1xyXG5cdFx0XHQkKGVsZW1lbnRzKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoYWpheFJlZnJlc2gpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRjb25zdCBhamF4UmVmcmVzaCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdC8vIHJlbW92ZSBjbGljayBldmVudHNcclxuXHRcdFx0Ly8kKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXInKS5vZmYoKTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoXHJcblx0XHRcdFx0Jy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBpbnB1dCwgLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIHNlbGVjdCwgLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIGEnXHJcblx0XHRcdCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9uc1xyXG5cdFx0XHQkKCcuU2VjdGlvblByZXNjcmlwdGlvbkV4cGFuZGFibGVBcmVhJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcclxuXHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2NvbnRlbnQnKVxyXG5cdFx0XHRcdFx0XHRcdC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID09IHRydWUgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4ge1xyXG5cdFx0U2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlID0gbmV3IFByZXNjcmlwdGlvbkV4cGFuZGFibGUoY29uZmlnKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gV2ViUGF0dGVybnMvQ29udGVudC9TZWN0aW9uRXhwYW5kYWJsZScpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBTYXBwaGlyZUhlYWRlciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTYXBwaGlyZUhlYWRlcihjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xyXG5cdH07XHJcblxyXG5cdHZhciBoYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkXS5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgU2FwcGhpcmVIZWFkZXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmlzQ29uZmlkZW50aWFsID0gY29uZmlnLmlzQ29uZmlkZW50aWFsO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xyXG5cdFx0dGhpcy4kd2lkZ2V0LmNzcyh7XHJcblx0XHRcdGRpc3BsYXk6ICdibG9jaydcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlcicpO1xyXG5cdFx0dGhpcy4kZGVtb2dyYXBoaWMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWRlbW9ncmFwaGljcycpO1xyXG5cdFx0dGhpcy4kaW5mb3JtYXRpb24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWluZm9ybWF0aW9uJyk7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC10cmlnZ2VyJyk7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC1jb250ZW50Jyk7XHJcblxyXG5cdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuJGluZm9ybWF0aW9uLnRleHQoKSA9PT0gJycpIHtcclxuXHRcdFx0dGhpcy4kaW5mb3JtYXRpb24uaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlSGVhZGVyLnByb3RvdHlwZS5oYW5kbGVSZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLmhhbmRsZURlbW9ncmFwaGljcygpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChfdGhpcy4kaGVhZGVyLmhhc0NsYXNzKCdpc09wZW4nKSkge1xyXG5cdFx0XHRcdF90aGlzLiRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF90aGlzLiRoZWFkZXIuYWRkQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuaGFuZGxlRGVtb2dyYXBoaWNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGRlbW9ncmFwaGljLmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdHRoaXMuJGFkZGl0aW9uYWxUcmlnZ2VyLmhpZGUoKTtcclxuXHRcdHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmVtcHR5KCk7XHJcblx0XHR2YXIgZGVtb2dyYXBoaWNXaWR0aCA9IHRoaXMuJGRlbW9ncmFwaGljLm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHR2YXIgaXRlbXNUb3RhbCA9IDA7XHJcblx0XHR0aGlzLiRkZW1vZ3JhcGhpYy5maW5kKCcuRGVtb2dyYXBoaWMtaXRlbScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcblx0XHRcdGl0ZW1zVG90YWwgKz0gcGFyc2VJbnQoJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpLCAxMCk7XHJcblx0XHRcdGlmIChpdGVtc1RvdGFsICsgNjAgPCBkZW1vZ3JhcGhpY1dpZHRoKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9uZSgpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKS5hcHBlbmRUbyhfdGhpcy4kYWRkaXRpb25hbENvbnRlbnQpO1xyXG5cdFx0XHRcdF90aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHRoaXMuJGhlYWRlci5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLnNob3dBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5hZGRDbGFzcygnaXNPcGVuJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhpZGVBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRoYW5kbGVEZW1vZ3JhcGhpY3M6IGhhbmRsZURlbW9ncmFwaGljcyxcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdGlmICghIVNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZCkge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZF0uaGFuZGxlRGVtb2dyYXBoaWNzKCk7XHJcblx0fVxyXG5cdGlmICghISQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKS5sZW5ndGgpIHtcclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkXS5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7IiwiLyogQ29tcG9uZW50IFNhcHBoaXJlUG9wdXAgKi9cclxudmFyIFJpY2hXaWRnZXRzX1BvcHVwX0VkaXRvcl9ub3RpZnlXaWRnZXQ7XHJcblxyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHQvLyBDaGVjayBpZiB0aGUgd2lkZ2V0IGlzIGxvYWRlZCBpbnNpZGUgYW4gaUZyYW1lXHJcblx0bGV0IGlzSW5zaWRlSWZyYW1lID0gd2luZG93LmZyYW1lRWxlbWVudCAhPSB1bmRlZmluZWQgfHwgZmFsc2U7XHJcblxyXG5cdC8vIENvbnN0YW50c1xyXG5cdGNvbnN0IFBPUFVQX0lOSVRJQUxfV0lEVEggPSAzMDA7XHJcblx0Y29uc3QgUE9QVVBfSU5JVElBTF9IRUlHSFQgPSAxMDA7XHJcblx0Y29uc3QgUE9QVVBfV0lORE9XX0lOREVYID0gNDAxMDtcclxuXHRjb25zdCBQT1BVUF9DTE9TSU5HX1RBRyA9ICdjbG9zaW5nJztcclxuXHRjb25zdCBQT1BVUF9DTE9TSU5HX1ZBTFVFID0gJ3RydWUnO1xyXG5cclxuXHRsZXQgUE9QVVBfTk9USUZZX1dJREdFVDtcclxuXHRsZXQgUE9QVVBfUEFSRU5UX1VSTDtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdGlmIChjb25maWcuaWdub3JlSWZyYW1lKSBpc0luc2lkZUlmcmFtZSA9IGZhbHNlO1xyXG5cclxuXHRcdCQoKS5yZWFkeShmdW5jdGlvbigkKSB7XHJcblx0XHRcdGNvbnN0IF9pZCA9IGNvbmZpZy5saW5rSWQ7XHJcblx0XHRcdGNvbnN0IGxpbmtRdWVyeSA9IGAjJHtjb25maWcubGlua0lkfWA7XHJcblx0XHRcdGxldCBsaW5rV2lkZ2V0O1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRsaW5rV2lkZ2V0ID0gJChsaW5rUXVlcnkpLmdldCgwKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdGlmICh0eXBlb2YgbGlua1dpZGdldCA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdC8vQ2FzZSB0aGUgd2lkZ2V0IGlzIGluZXhpc3RlbnQgb3IgaW52aXNpYmxlLCBpdCB3aWxsIHNob3cgbm8gZXJyb3JzLlxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0UE9QVVBfUEFSRU5UX1VSTCA9IGNvbmZpZy5wYXJlbnRVcmw7XHJcblxyXG5cdFx0XHRjb25zdCBsaW5rUmVzdWx0ID0gZ2V0TGlua0hSRUYobGlua1dpZGdldCk7XHJcblx0XHRcdGNvbnN0IGxpbmtIcmVmID0gbGlua1Jlc3VsdFswXTtcclxuXHRcdFx0Y29uc3QgaXNBQnV0dG9uID0gbGlua1Jlc3VsdFsxXTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgbGlua0hyZWYgPT0gJ3VuZGVmaW5lZCcgfHwgbGlua0hyZWYgPT0gJycgfHwgbGlua0hyZWYgPT0gJyMnIHx8IGxpbmtIcmVmLmluZGV4T2YoJ2phdmFzY3JpcHQ6JykgPT0gMCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR3aW5kb3cuT3NIYW5kbGVFeGNlcHRpb24oXHJcblx0XHRcdFx0XHRcdG5ldyBFcnJvcignUG9wdXAgbGluayBpZCBtdXN0IGJlIHRoZSBpZCBvZiBhIExpbmsgb3IgQnV0dG9uIFdpZGdldCB3aXRoIE1ldGhvZCBOYXZpZ2F0ZS4nKSxcclxuXHRcdFx0XHRcdFx0b3V0c3lzdGVtcy5vc0Vycm9yQ29kZXMuU3lzdGVtSmF2YXNjcmlwdEVycm9yLFxyXG5cdFx0XHRcdFx0XHQnUG9wdXBfRWRpdG9yJ1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgZXhpc3Rpbmcgb24tY2xpY2sgZXZlbnRcclxuXHRcdFx0aWYgKGlzQUJ1dHRvbikge1xyXG5cdFx0XHRcdGxpbmtXaWRnZXQuc2V0QXR0cmlidXRlKFxyXG5cdFx0XHRcdFx0J29uY2xpY2snLFxyXG5cdFx0XHRcdFx0bGlua1dpZGdldFxyXG5cdFx0XHRcdFx0XHQuZ2V0QXR0cmlidXRlKCdvbmNsaWNrJylcclxuXHRcdFx0XHRcdFx0LnRvU3RyaW5nKClcclxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoJ3dpbmRvdy5sb2NhdGlvbi5ocmVmPScsICdyZXR1cm4gZmFsc2U7d2luZG93LmxvY2F0aW9uLmhyZWY9JylcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiB0aGVyZSdzIGEgY29uZmlybWF0aW9uIG1lc3NhZ2UsIHN0b3JlIGluIGFuIGF0dHJpYnV0ZSB0aGUgcmVzdWx0XHJcblx0XHRcdGlmIChsaW5rV2lkZ2V0LmdldEF0dHJpYnV0ZSgnb25jbGljaycpICE9IG51bGwpIHtcclxuXHRcdFx0XHRsaW5rV2lkZ2V0LnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdCdvbmNsaWNrJyxcclxuXHRcdFx0XHRcdGxpbmtXaWRnZXRcclxuXHRcdFx0XHRcdFx0LmdldEF0dHJpYnV0ZSgnb25jbGljaycpXHJcblx0XHRcdFx0XHRcdC50b1N0cmluZygpXHJcblx0XHRcdFx0XHRcdC5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0XHRcdCdpZiggcmV0ICE9IHRydWUgKScsXHJcblx0XHRcdFx0XHRcdFx0XCIkKCdcIiArIGxpbmtRdWVyeSArIFwiJykuZ2V0KDApLnNldEF0dHJpYnV0ZSgnY29uZmlybWVkJywgcmV0KTsgaWYoIHJldCAhPSB0cnVlIClcIlxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHQvLyBUaGUgY2xpY2tIYW5kbGVyIGV2ZW50IGlzIHJlZ2lzdGVyZWQgaW4gb3NqcyBhbmQgJCBmb3IgY29tcGF0aWJpbGxpdHkgcmVhc29ucywgdGhleSBtdXN0IG5vdCBydW4gYm90aCBmb3IgdGhlIHNhbWUgY2xpY2suXHJcblx0XHRcdFx0Ly8gVmFyaWFibGUgaXMgc2V0IHRvIGZhbHNlIGluIHJlc2l6ZSBmdW5jdGlvbi5cclxuXHRcdFx0XHRpZiAoJC5kYXRhKGV2ZW50LnRhcmdldCwgJ29zLWludGVybmFsLXByb2Nlc3NpbmcnKSA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQuZGF0YShldmVudC50YXJnZXQsICdvcy1pbnRlcm5hbC1wcm9jZXNzaW5nJywgdHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBDaGVjayBpZiB0aGUgY2xpY2tlZCBsaW5rIGlzIGRpc2FibGVkXHJcblx0XHRcdFx0aWYgKGxpbmtXaWRnZXQuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdHZhciBsaW5rRGlzYWJsZWQgPSBsaW5rV2lkZ2V0XHJcblx0XHRcdFx0XHRcdC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcclxuXHRcdFx0XHRcdFx0LnRvU3RyaW5nKClcclxuXHRcdFx0XHRcdFx0LnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGxpbmtEaXNhYmxlZCA9PSAnZGlzYWJsZWQnIHx8IGxpbmtEaXNhYmxlZC5pbmRleE9mKCd0cnVlJykgIT0gLTEpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGxpbmtXaWRnZXQuZ2V0QXR0cmlidXRlKCdjb25maXJtZWQnKSA9PSAnZmFsc2UnKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0aWYgKE9zSXNJRSgpKSBvc0ZvY3VzQmFja2VuZC5DbGVhckZvY3VzZWRFbGVtZW50KCk7XHJcblxyXG5cdFx0XHRcdGxldCBwb3B1cERpdjtcclxuXHRcdFx0XHRsZXQgcGxlYXNlV2FpdERpdjtcclxuXHJcblx0XHRcdFx0Y29uc3Qgd2FpdFRleHQgPSBgPGRpdiBzdHlsZT1cIm1hcmdpbi10b3A6IDM2cHg7XCI+JHtjb25maWcubG9hZGluZ01lc3NhZ2V9PC9kaXY+YDtcclxuXHRcdFx0XHRjb25zdCBpbWdIVE1MID0gJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PC9kaXY+JztcclxuXHRcdFx0XHRjb25zdCBsb2FkaW5nRWxlbWVudCA9IGA8ZGl2IGNsYXNzPVwiTGF5b3V0UG9wdXAtbG9hZGluZ1wiPiR7aW1nSFRNTH0gJHt3YWl0VGV4dH08L2Rpdj5gO1xyXG5cdFx0XHRcdGNvbnN0IGlGcmFtZUVsZW1lbnQgPSBgPGlmcmFtZSBpZD1cImlmcmFtZV8ke19pZH1cIiB3aWR0aD1cIjEwMCVcIiBzY3JvbGxpbmc9XCJub1wiIGhlaWdodD1cIjEwMCVcIiBmcmFtZWJvcmRlcj1cIjBcIiBzcmM9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCIvPmA7XHJcblxyXG5cdFx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdFx0bGV0IF9kaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuXHRcdFx0XHRcdF9kaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsICd0ZXh0LWFsaWduOiBjZW50ZXI7IGRpc3BsYXk6IG5vbmU7Jyk7XHJcblx0XHRcdFx0XHRfZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2luZG93XycgKyBfaWQpO1xyXG5cdFx0XHRcdFx0d2luZG93LnRvcC5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKF9kaXYpO1xyXG5cclxuXHRcdFx0XHRcdHBvcHVwRGl2ID0gd2luZG93LnRvcC4kKCcjd2luZG93XycgKyBfaWQpO1xyXG5cdFx0XHRcdFx0cG9wdXBEaXYuYXBwZW5kKGlGcmFtZUVsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHRcdHBsZWFzZVdhaXREaXYgPSBwb3B1cERpdi5wcmVwZW5kKGxvYWRpbmdFbGVtZW50KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cG9wdXBEaXYgPSAkKFwiPGRpdiBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyBkaXNwbGF5OiBub25lOyc+PC9kaXY+XCIpLmFwcGVuZFRvKCdib2R5Jyk7XHJcblx0XHRcdFx0XHRwb3B1cERpdi5hcHBlbmQoaUZyYW1lRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdFx0cGxlYXNlV2FpdERpdiA9IHBvcHVwRGl2LnByZXBlbmQobG9hZGluZ0VsZW1lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29uc3QgbG9hZFRhcmdldFBhZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cudG9wLlBPUFVQX05PVElGWV9XSURHRVQgPSBjb25maWcubm90aWZ5SWQ7XHJcblx0XHRcdFx0XHRcdC8vIENyZWF0ZSBhIHJlZmVyZW5jZSB0byB0aGUgaWZyYW1lIG9iamVjdCBvbiB0aGUgZG9jdW1lbnQgcGFyZW50XHJcblx0XHRcdFx0XHRcdHdpbmRvdy50b3AuX2lmcmFtZVBvcHVwID0gd2luZG93LmZyYW1lRWxlbWVudC5jb250ZW50V2luZG93O1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0d2luZG93LnRvcC5faWZyYW1lUG9wdXAgPSB3aW5kb3c7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0UE9QVVBfTk9USUZZX1dJREdFVCA9IGNvbmZpZy5ub3RpZnlJZDtcclxuXHRcdFx0XHRcdFJpY2hXaWRnZXRzX1BvcHVwX0VkaXRvcl9ub3RpZnlXaWRnZXQgPSBjb25maWcubm90aWZ5SWQ7XHJcblx0XHRcdFx0XHR3aW5kb3cudG9wLl9pZnJhbWVQb3B1cC5SaWNoV2lkZ2V0c19Qb3B1cF9FZGl0b3Jfbm90aWZ5V2lkZ2V0ID0gY29uZmlnLm5vdGlmeUlkO1xyXG5cclxuXHRcdFx0XHRcdC8vIExvYWQgdGFyZ2V0IHBhZ2VcclxuXHRcdFx0XHRcdGNvbnN0IG9ocmVmID0gZ2V0TGlua0hSRUYobGlua1dpZGdldClbMF07XHJcblx0XHRcdFx0XHRjb25zdCByaHJlZiA9IG9ocmVmLnJlcGxhY2UoLyhcXD98JilfPS4qPygmfCQpLywgJyQxXz0nICsgK25ldyBEYXRlKCkubm93ICsgJyQyJyk7XHJcblx0XHRcdFx0XHRjb25zdCB4aHJlZiA9IHJocmVmICsgKHJocmVmID09IG9ocmVmID8gKHJocmVmLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArICdfPScgKyArbmV3IERhdGUoKSA6ICcnKTtcclxuXHJcblx0XHRcdFx0XHRwb3B1cERpdi5maW5kKCdpZnJhbWUnKS5hdHRyKCdzcmMnLCB4aHJlZik7XHJcblxyXG5cdFx0XHRcdFx0KGZ1bmN0aW9uKHBvcHVwRGl2KSB7XHJcblx0XHRcdFx0XHRcdHBvcHVwRGl2LmZpbmQoJ2lmcmFtZScpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gQWZ0ZXIgbG9hZGluZyB0cnkgdG8gcmVzaXplXHJcblx0XHRcdFx0XHRcdFx0cmVzaXplKHBvcHVwRGl2LCBfaWQsIGNvbmZpZy5zZXRXaWR0aCwgY29uZmlnLnNldEhlaWdodCwgdHJ1ZSwgZXZlbnQpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pKHBvcHVwRGl2KTtcclxuXHJcblx0XHRcdFx0XHRwb3B1cERpdiA9IG51bGw7XHJcblx0XHRcdFx0XHRwbGVhc2VXYWl0RGl2ID0gbnVsbDtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRvcGVuUG9wdXAocG9wdXBEaXYsIHBsZWFzZVdhaXREaXYsIGxvYWRUYXJnZXRQYWdlLCBldmVudCwgY29uZmlnKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0JChsaW5rUXVlcnkpLmNsaWNrKGNsaWNrSGFuZGxlcik7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZXNpemUgPSAoZGl2VG9Qb3B1cCwgX2lkLCBzZXRXaWR0aCwgc2V0SGVpZ2h0LCByZWNlbnRlciwgZXZlbnQpID0+IHtcclxuXHRcdC8vIENvZGUgdG8gc3VwcG9ydCBvbGQgcmVzaXplIG1ldGhvZCBQb3B1cF9XaW5kb3dfcmVzaXplKHNldFdpZHRoLCBzZXRIZWlnaHQsIHJlY2VudGVyKVxyXG5cdFx0aWYgKHR5cGVvZiByZWNlbnRlciA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZWNlbnRlciA9IHNldEhlaWdodDtcclxuXHRcdFx0c2V0SGVpZ2h0ID0gc2V0V2lkdGg7XHJcblx0XHRcdHNldFdpZHRoID0gZGl2VG9Qb3B1cDtcclxuXHJcblx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdGRpdlRvUG9wdXAgPSB3aW5kb3cudG9wLiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGRpdlRvUG9wdXAgPSAkKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLWNvbnRlbnQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlc2l6ZSBtdXN0IGJhaWwgb3V0IGltbWVkaWF0ZWx5IGlmIHRoZSBwb3B1cCBpcyBtYXJrZWQgYXMgY2xvc2luZywgYW5kIG5vdCBzdGFydCB0aGUgYW5pbWF0aW9uLlxyXG5cdFx0aWYgKCQuZGF0YShkaXZUb1BvcHVwLmdldCgwKSwgUE9QVVBfQ0xPU0lOR19UQUcpID09IFBPUFVQX0NMT1NJTkdfVkFMVUUpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBkb2N1bWVudFNlcnZlcjtcclxuXHRcdGxldCBmcmFtZU9iaiA9IGRpdlRvUG9wdXAuZmluZCgnaWZyYW1lJylbMF07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBmcmFtZU9iaiA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRmcmFtZU9iaiA9IHdpbmRvdy50b3AuJCgnI2lmcmFtZV8nICsgX2lkKVswXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaXNJbnNpZGVJZnJhbWUpIHtcclxuXHRcdFx0ZG9jdW1lbnRTZXJ2ZXIgPSB3aW5kb3cudG9wLmRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvKGh0dHBzPzpcXC9cXC9bXlxcL10qKS4qLywgJyQxJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudFNlcnZlciA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvKGh0dHBzPzpcXC9cXC9bXlxcL10qKS4qLywgJyQxJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBmcmFtZU9iaiAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRjb25zdCBmcmFtZVNlcnZlciA9IGZyYW1lT2JqLnNyYy5yZXBsYWNlKC8oaHR0cHM/OlxcL1xcL1teXFwvXSopLiovLCAnJDEnKTtcclxuXHRcdFx0Y29uc3Qgc2FtZU9yaWdpbiA9IGZyYW1lU2VydmVyLnRvTG93ZXJDYXNlKCkgPT0gZG9jdW1lbnRTZXJ2ZXIudG9Mb3dlckNhc2UoKSB8fCBmcmFtZVNlcnZlci5pbmRleE9mKCdodHRwJykgIT0gMDtcclxuXHJcblx0XHRcdGlmICghc2FtZU9yaWdpbiAmJiAoc2V0V2lkdGggPT0gLTEgfHwgc2V0SGVpZ2h0ID09IC0xKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQSBQb3B1cCB3aXRoIGEgc2NyZWVuIGZyb20gYSBkaWZmZXJlbnQgc2VydmVyIChvciBodHRwcykgbmVlZHMgZXhwbGljaWN0IHdpZHRoLCBoZWlnaHQgc2V0LicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2FtZU9yaWdpbikge1xyXG5cdFx0XHRcdGlmIChmcmFtZU9iai5jb250ZW50RG9jdW1lbnQgIT09IG51bGwgfHwgZnJhbWVPYmouY29udGVudFdpbmRvdyAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0dmFyIGlubmVyRG9jID0gZnJhbWVPYmouY29udGVudERvY3VtZW50ID8gZnJhbWVPYmouY29udGVudERvY3VtZW50IDogZnJhbWVPYmouY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuXHRcdFx0XHRcdGlmIChpbm5lckRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID09IDApXHJcblx0XHRcdFx0XHRcdC8vIFN0cmFuZ2VseSB0aGlzIGV2ZW50IGlzIGFsc28gdHJpZ2dlcmVkIG9uIGNsb3NlXHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBvbGRIZWlnaHQ7XHJcblx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdG9sZEhlaWdodCA9IHdpbmRvdy50b3BcclxuXHRcdFx0XHRcdC4kKGRpdlRvUG9wdXApXHJcblx0XHRcdFx0XHQucGFyZW50cygnLm9zLWludGVybmFsLVBvcHVwJylcclxuXHRcdFx0XHRcdC5vdXRlckhlaWdodCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9sZEhlaWdodCA9ICQoZGl2VG9Qb3B1cClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcub3MtaW50ZXJuYWwtUG9wdXAnKVxyXG5cdFx0XHRcdFx0Lm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCB3aWR0aCA9IHNldFdpZHRoID09IC0xID8gJChpbm5lckRvYykud2lkdGgoKSA6IHNldFdpZHRoO1xyXG5cdFx0XHRsZXQgaGVpZ2h0ID0gc2V0SGVpZ2h0ID09IC0xID8gJChpbm5lckRvYykuaGVpZ2h0KCkgOiBzZXRIZWlnaHQ7XHJcblxyXG5cdFx0XHR2YXIgdGl0bGVIZWlnaHQ7XHJcblx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdHRpdGxlSGVpZ2h0ID0gd2luZG93LnRvcC4kKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLXRpdGxlYmFyJykuaGVpZ2h0KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGl0bGVIZWlnaHQgPSAkKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLXRpdGxlYmFyJykuaGVpZ2h0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFZlcmlmeSBpZiB0aGUgcGFyZW50IHdpbmRvdyB3aWR0aCBpcyBsZXNzIHRoYW4gdGhlIHBvcC11cCB3aW5kb3csIGlmIHNvIHNldCB0aGUgcmVzcG9uc2l2ZSBjbGFzcyBvbiB0aGUgaWZyYW1lIGJvZHkgKGZvciByZXNwb25zaXZlIHRoZW1lcylcclxuXHRcdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgd2lkdGgpIHtcclxuXHRcdFx0XHQvLyBvbmx5IHNldCB0aGUgY2xhc3MgaWYgdGhlIG9yaWdpbiBpcyB0aGUgc2FtZVxyXG5cdFx0XHRcdGlmIChzYW1lT3JpZ2luKSB7XHJcblx0XHRcdFx0XHQkKGlubmVyRG9jKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnYm9keScpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnUmVzcG9uc2l2ZScpO1xyXG5cdFx0XHRcdFx0d2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDIwOyAvLyAxMHB4IFwicGFkZGluZ1wiIGVmZmVjdCwgdG8ga2VlcCB0aGUgcG9wdXAgbG9vayBhbmQgZmVlbCBvbiB0b3Agb2YgY29udGVudFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRml4IGlzc3VlcyB3aXRoIHNjcm9sbGJhcnNcclxuXHRcdFx0aWYgKHNldEhlaWdodCA9PSAtMSkge1xyXG5cdFx0XHRcdC8vIElFNyBuZWVkcyBhIGxpdHRsZSBtb3JlIHNwYWNlIHRvIHJlbW92ZSB0aGUgc2Nyb2xsYmFyc1xyXG5cdFx0XHRcdGlmICgkLmJyb3dzZXIubXNpZSkgaGVpZ2h0ID0gaGVpZ2h0ICsgMTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvL3doZW4gZXhwbGljaXRseSBzZXR0aW5nIHRoZSBoZWlnaHRcclxuXHRcdFx0XHRpZiAoc2FtZU9yaWdpbikgaW5uZXJEb2MuYm9keS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdHdpbmRvdy50b3AuJChkaXZUb1BvcHVwKS5oZWlnaHQoaGVpZ2h0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKGRpdlRvUG9wdXApLmhlaWdodChoZWlnaHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL0hpZGUgRUNUXHJcblx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdHdpbmRvdy50b3BcclxuXHRcdFx0XHRcdC4kKGlubmVyRG9jKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5FQ1RfRmVlZGJhY2tDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LmhpZGUoKTtcclxuXHRcdFx0XHR2YXIgZGl2UG9wdXBPdXRlcldpbmRvdyA9IHdpbmRvdy50b3AuJChkaXZUb1BvcHVwKS5wYXJlbnRzKCcub3MtaW50ZXJuYWwtUG9wdXAnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKGlubmVyRG9jKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5FQ1RfRmVlZGJhY2tDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LmhpZGUoKTtcclxuXHRcdFx0XHR2YXIgZGl2UG9wdXBPdXRlcldpbmRvdyA9ICQoZGl2VG9Qb3B1cCkucGFyZW50cygnLm9zLWludGVybmFsLVBvcHVwJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBhbmltYXRlRmluYWwgPSB7fTtcclxuXHJcblx0XHRcdGlmIChzZXRIZWlnaHQgPT0gLTEpIHtcclxuXHRcdFx0XHR2YXIgb2xkVG9wID0gcGFyc2VJbnQoZGl2UG9wdXBPdXRlcldpbmRvdy5jc3MoJ3RvcCcpKTtcclxuXHRcdFx0XHRpZiAocmVjZW50ZXIpIGFuaW1hdGVGaW5hbC50b3AgPSBNYXRoLm1heCgyMCwgb2xkVG9wICsgKG9sZEhlaWdodCAtIChoZWlnaHQgKyB0aXRsZUhlaWdodCkpIC8gMik7XHJcblx0XHRcdFx0YW5pbWF0ZUZpbmFsLmhlaWdodCA9IGhlaWdodCArIHRpdGxlSGVpZ2h0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2V0V2lkdGggPT0gLTEpIHtcclxuXHRcdFx0XHR2YXIgb2xkTGVmdCA9IHBhcnNlSW50KGRpdlBvcHVwT3V0ZXJXaW5kb3cuY3NzKCdsZWZ0JykpO1xyXG5cdFx0XHRcdGlmIChyZWNlbnRlcikgYW5pbWF0ZUZpbmFsLmxlZnQgPSBvbGRMZWZ0ICsgKGRpdlBvcHVwT3V0ZXJXaW5kb3cud2lkdGgoKSAtIHdpZHRoKSAvIDI7XHJcblx0XHRcdFx0YW5pbWF0ZUZpbmFsLndpZHRoID0gd2lkdGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRkaXZQb3B1cE91dGVyV2luZG93LndpZHRoKCkgPT0gYW5pbWF0ZUZpbmFsLndpZHRoICYmXHJcblx0XHRcdFx0ZGl2UG9wdXBPdXRlcldpbmRvdy5oZWlnaHQoKSA9PSBhbmltYXRlRmluYWwuaGVpZ2h0IC0gKCQuYnJvd3Nlci5tc2llID8gMSA6IDApXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdCQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudD4uTGF5b3V0UG9wdXAtbG9hZGluZycpLmhpZGUoKTtcclxuXHRcdFx0XHQkKGRpdlRvUG9wdXApLmhlaWdodChoZWlnaHQgLSAoJC5icm93c2VyLm1zaWUgPyAxIDogMCkpOyAvLyByZXN0b3JlIHNpemVcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gbm90aGluZyB0byBkby4uLlxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBoaWRlIGNvbnRlbnQgaW4gZmlyc3QgcmVzaXplIC0gcmVhZGp1c3RtZW50cyB3aWxsIG5vdCBmbGlja3JcclxuXHRcdFx0aWYgKGRpdlBvcHVwT3V0ZXJXaW5kb3cud2lkdGgoKSA9PSBQT1BVUF9JTklUSUFMX1dJRFRIICYmIGRpdlBvcHVwT3V0ZXJXaW5kb3cuaGVpZ2h0KCkgPT0gUE9QVVBfSU5JVElBTF9IRUlHSFQpIHtcclxuXHRcdFx0XHQkKGZyYW1lT2JqKS5oZWlnaHQoMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBvbkFuaW1hdGlvbkNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cudG9wLiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctdGl0bGViYXItY2xvc2Utbm8tdGl0bGUnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdFx0XHRcdFx0d2luZG93LnRvcFxyXG5cdFx0XHRcdFx0XHRcdC4kKGRpdlRvUG9wdXApXHJcblx0XHRcdFx0XHRcdFx0LmZpbmQoJ2lmcmFtZScpXHJcblx0XHRcdFx0XHRcdFx0LmhlaWdodCgnMTAwJScpXHJcblx0XHRcdFx0XHRcdFx0LndpZHRoKGFuaW1hdGVGaW5hbC53aWR0aCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlLW5vLXRpdGxlJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdFx0XHRcdCQoZGl2VG9Qb3B1cClcclxuXHRcdFx0XHRcdFx0XHQuZmluZCgnaWZyYW1lJylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KCcxMDAlJylcclxuXHRcdFx0XHRcdFx0XHQud2lkdGgoYW5pbWF0ZUZpbmFsLndpZHRoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCAxMyk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgZGl2UGxlYXNlV2FpdDtcclxuXHRcdFx0aWYgKGlzSW5zaWRlSWZyYW1lKSB7XHJcblx0XHRcdFx0ZGl2UGxlYXNlV2FpdCA9IHdpbmRvdy50b3AuJCgnLm9zLWludGVybmFsLXVpLWRpYWxvZy1jb250ZW50Pi5MYXlvdXRQb3B1cC1sb2FkaW5nJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGl2UGxlYXNlV2FpdCA9ICQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudD4uTGF5b3V0UG9wdXAtbG9hZGluZycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkaXZQbGVhc2VXYWl0LmhpZGUoKTtcclxuXHJcblx0XHRcdGlmIChzZXRIZWlnaHQgPT0gLTEgfHwgc2V0V2lkdGggPT0gLTEpIHtcclxuXHRcdFx0XHRkaXZQb3B1cE91dGVyV2luZG93LmFuaW1hdGUoYW5pbWF0ZUZpbmFsLCB7XHJcblx0XHRcdFx0XHRkdXJhdGlvbjogMjAwLFxyXG5cdFx0XHRcdFx0Y29tcGxldGU6IG9uQW5pbWF0aW9uQ29tcGxldGUsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0b25BbmltYXRpb25Db21wbGV0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlubmVyRG9jID0gbnVsbDtcclxuXHRcdFx0ZGl2UG9wdXBPdXRlcldpbmRvdyA9IG51bGw7XHJcblx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRcdHdpbmRvdy50b3AuJC5kYXRhKGV2ZW50LnRhcmdldCwgJ29zLWludGVybmFsLXByb2Nlc3NpbmcnLCBmYWxzZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JC5kYXRhKGV2ZW50LnRhcmdldCwgJ29zLWludGVybmFsLXByb2Nlc3NpbmcnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY2xvc2UgPSAoKSA9PiB7XHJcblx0XHRsZXQgcG9wdXBUb0Nsb3NlO1xyXG5cdFx0bGV0IHBvcHVwQ29udGFpbmVyO1xyXG5cclxuXHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRwb3B1cFRvQ2xvc2UgPSB3aW5kb3cudG9wLiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudCcpO1xyXG5cdFx0XHRwb3B1cENvbnRhaW5lciA9IHdpbmRvdy50b3AuJCgnLlNhcHBoaXJlUG9wdXAnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBvcHVwVG9DbG9zZSA9ICQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudCcpO1xyXG5cdFx0XHRwb3B1cENvbnRhaW5lciA9ICQoJy5TYXBwaGlyZVBvcHVwJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cG9wdXBUb0Nsb3NlLmRhdGEoUE9QVVBfQ0xPU0lOR19UQUcsIFBPUFVQX0NMT1NJTkdfVkFMVUUpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHBvcHVwVG9DbG9zZS5kaWFsb2coJ2Nsb3NlJyk7XHJcblxyXG5cdFx0XHRwb3B1cFRvQ2xvc2UucmVtb3ZlKCk7XHJcblx0XHRcdHBvcHVwQ29udGFpbmVyLnJlbW92ZSgpO1xyXG5cdFx0fSwgMCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgZ2V0TGlua0hSRUYgPSB3aWRnZXQgPT4ge1xyXG5cdFx0bGV0IGxpbmtIcmVmO1xyXG5cdFx0bGV0IGlzQUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vQ2hlY2tzIGlmIHRoZSBpZCBpcyBmcm9tIGEgbGluayBvciBub3RcclxuXHRcdFx0bGlua0hyZWYgPSAkKHdpZGdldCkuYXR0cignaHJlZicpO1xyXG5cclxuXHRcdFx0Ly9UZXN0cyBmb3IgdmlzaWJpbGl0eS9leGlzdGVuY2VcclxuXHRcdFx0aWYgKHR5cGVvZiBsaW5rSHJlZiA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdGNvbnN0IG9uQ2xpY2sgPSB3aWRnZXQuZ2V0QXR0cmlidXRlKCdvbmNsaWNrJyk7XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2Ygb25DbGljayAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0aXNBQnV0dG9uID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRpZiAob25DbGljayAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGxldCBocmVmTWF0Y2g7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoKGhyZWZNYXRjaCA9IG9uQ2xpY2sudG9TdHJpbmcoKS5tYXRjaCgvaHJlZj0nKFteJ10qKScvKSkgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdGxpbmtIcmVmID0gaHJlZk1hdGNoWzFdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHJldHVybiBbbGlua0hyZWYsIGlzQUJ1dHRvbl07XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgb3BlblBvcHVwID0gKGRpdlRvUG9wdXAsIGRpdlBsZWFzZVdhaXQsIGxvYWRUYXJnZXRQYWdlLCBldmVudCwgY29uZmlnKSA9PiB7XHJcblx0XHQvLyBEZXN0cm95IGFueSBwcmV2aW91cyBkaWFsb2dcclxuXHRcdGNsb3NlKG51bGwpO1xyXG5cclxuXHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRjb25zdCAkalBhcmVudCA9IHdpbmRvdy50b3AualF1ZXJ5O1xyXG5cdFx0XHQkalBhcmVudCgnLm9zLWludGVybmFsLVBvcHVwJykucmVtb3ZlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSWYgYW55IGNsb3NlIGlzIHBlbmRpbmcsIHNjaGVkdWxlIHRvIGV4ZWN1dGUgaXRzZWxmIGFzeW5jaHJvbm91c2x5IGV4aXRcclxuXHRcdC8vIElmIG5vIGNsb3NlIGlzIHBlbmRpbmcsIGNvbnRpbnVlIHdpdGggb3BlbiBvcGVyYXRpb25cclxuXHRcdGxldCBjbG9zaW5nUG9wdXBzO1xyXG5cclxuXHRcdGlmIChpc0luc2lkZUlmcmFtZSkgY2xvc2luZ1BvcHVwcyA9IHdpbmRvdy50b3AuJCgnLm9zLWludGVybmFsLXVpLWRpYWxvZy1jb250ZW50Jyk7XHJcblx0XHRlbHNlIGNsb3NpbmdQb3B1cHMgPSAkKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLWNvbnRlbnQnKTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNsb3NpbmdQb3B1cHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKCQuZGF0YShjbG9zaW5nUG9wdXBzLmdldChpKSwgUE9QVVBfQ0xPU0lOR19UQUcpID09IFBPUFVQX0NMT1NJTkdfVkFMVUUpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0b3BlblBvcHVwKGRpdlRvUG9wdXAsIGRpdlBsZWFzZVdhaXQsIGxvYWRUYXJnZXRQYWdlLCBldmVudCwgY29uZmlnKTtcclxuXHRcdFx0XHR9LCAxMyk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBfZGlhbG9nO1xyXG5cclxuXHRcdGlmIChpc0luc2lkZUlmcmFtZSkge1xyXG5cdFx0XHRjb25zdCBwb3B1cENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG5cdFx0XHRwb3B1cENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ1NhcHBoaXJlUG9wdXAnKTtcclxuXHJcblx0XHRcdHdpbmRvdy50b3AuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cENvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRfZGlhbG9nID0gd2luZG93LnRvcC5qUXVlcnkoZGl2VG9Qb3B1cCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCc8ZGl2IGNsYXNzPVwiU2FwcGhpcmVQb3B1cFwiPjwvZGl2PicpLmFwcGVuZFRvKCdib2R5Jyk7XHJcblxyXG5cdFx0XHRfZGlhbG9nID0gJChkaXZUb1BvcHVwKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKGRpdlBsZWFzZVdhaXQpLnNob3coKTtcclxuXHJcblx0XHRpZiAoJCgnLklTaWRlYmFyJykubGVuZ3RoKSB3aW5kb3cucGFyZW50LlNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLm9wZW5TaWRlYmFySWZyYW1lKDApO1xyXG5cclxuXHRcdF9kaWFsb2cuc2hvdygpLmRpYWxvZyh7XHJcblx0XHRcdGFwcGVuZFRvOiAnLlNhcHBoaXJlUG9wdXAnLFxyXG5cdFx0XHRkaWFsb2dDbGFzczogJ29zLWludGVybmFsLVBvcHVwJyxcclxuXHRcdFx0cmVzaXphYmxlOiBmYWxzZSxcclxuXHRcdFx0YXV0b1Jlc2l6ZTogZmFsc2UsXHJcblx0XHRcdGNsb3NlT25Fc2NhcGU6ICFjb25maWcuaGlkZUNsb3NlQnV0dG9uLFxyXG5cdFx0XHRiZ2lmcmFtZTogdHJ1ZSxcclxuXHRcdFx0ZHJhZ2dhYmxlOiBmYWxzZSxcclxuXHRcdFx0YXV0b09wZW46IHRydWUsXHJcblx0XHRcdHRpdGxlOiBjb25maWcuc2V0VGl0bGUsXHJcblx0XHRcdG1vZGFsOiAhKGNvbmZpZy51c2VNb2RhbCA9PT0gZmFsc2UpLFxyXG5cdFx0XHRoZWlnaHQ6IGNvbmZpZy5zZXRIZWlnaHQgPT0gLTEgPyBQT1BVUF9JTklUSUFMX0hFSUdIVCA6IGNvbmZpZy5zZXRIZWlnaHQsXHJcblx0XHRcdHBvc2l0aW9uOiAnY2VudGVyJyxcclxuXHRcdFx0d2lkdGg6IGNvbmZpZy5zZXRXaWR0aCA9PSAtMSA/IFBPUFVQX0lOSVRJQUxfV0lEVEggOiBjb25maWcuc2V0V2lkdGgsXHJcblx0XHRcdHpJbmRleDogUE9QVVBfV0lORE9XX0lOREVYLFxyXG5cdFx0XHRjbG9zZTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gSWYgdGhlIHBvcHVwIGlzIGNsb3NlZCBiZWZvcmUgaXQgaXMgcmVzaXplZCAoRVNDKSB3ZSBuZWVkIHRvIHNldCB0aGUgcHJvY2Vzc2luZyBldmVudCB0byBmYWxzZS5cclxuXHRcdFx0XHQkLmRhdGEoZXZlbnQudGFyZ2V0LCAnb3MtaW50ZXJuYWwtcHJvY2Vzc2luZycsIGZhbHNlKTtcclxuXHJcblx0XHRcdFx0X2RpYWxvZy5maW5kKCdpZnJhbWUnKS51bmJpbmQoJ2xvYWQnKTtcclxuXHRcdFx0XHRfZGlhbG9nLmZpbmQoJ2lmcmFtZScpLmF0dHIoJ3NyYycsICdhYm91dDpibGFuaycpO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0X2RpYWxvZy5maW5kKCdpZnJhbWUnKS5lbXB0eSgpO1xyXG5cdFx0XHRcdFx0X2RpYWxvZy5lbXB0eSgpO1xyXG5cdFx0XHRcdH0sIDEzKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHRcdF9kaWFsb2cuZmluZCgnaWZyYW1lJykuaGVpZ2h0KDApO1xyXG5cdFx0X2RpYWxvZy5wYXJlbnRzKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nJykuZHJvcFNoYWRvdygpO1xyXG5cclxuXHRcdGlmIChjb25maWcuQ3NzQ2xhc3NlcyAhPT0gJyAnKSB7XHJcblx0XHRcdGlmIChpc0luc2lkZUlmcmFtZSkgd2luZG93LnRvcC4kKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nJykuYWRkQ2xhc3MoY29uZmlnLkNzc0NsYXNzZXMpO1xyXG5cdFx0XHRlbHNlICQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKS5hZGRDbGFzcyhjb25maWcuQ3NzQ2xhc3Nlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bG9hZFRhcmdldFBhZ2UoKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVQb3B1cCA9IHsgY3JlYXRlLCBjbG9zZSwgcmVzaXplIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgU2FwcGhpcmVSYWRpb0J1dHRvbiAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVSYWRpb0J1dHRvbiA9IHdpZGdldElkID0+IHtcclxuXHR2YXIgJHdpZGdldCA9ICQoJyMnICsgd2lkZ2V0SWQpO1xyXG5cdHZhciAkY29udHJvbCA9ICR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XHJcblx0dmFyIG5hbWUgPSAkY29udHJvbC5wcm9wKCduYW1lJyk7XHJcblxyXG5cdCRjb250cm9sLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0JHdpZGdldC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQkKCdpbnB1dFt0eXBlPVwicmFkaW9cIl1bbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQuY2xvc2VzdCgnLkJ1dHRvblJhZGlvSW5wJylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkd2lkZ2V0LmZpbmQoJy5CdXR0b25SYWRpb0lucF9yYWRpb1RleHQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdGlmIChcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5jbG9zZXN0KCcuQnV0dG9uUmFkaW9JbnAnKVxyXG5cdFx0XHRcdC5oYXNDbGFzcygnZGlzYWJsZWQnKVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdCRjb250cm9sLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHQkY29udHJvbC50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0aWYgKCRjb250cm9sLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCR3aWRnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JHdpZGdldC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTY2FsZU1haW5TdHJ1Y3R1cmUgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZXR1cFNjYWxlKCk7XHJcblx0XHRcdGJpbmRDbGlja3MoKTtcclxuXHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGJpbmRDbGlja3MoKTtcclxuXHRcdFx0XHR9LCAxMDAwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTY2FsZUNvdW50ID0gY29uZiA9PiB7XHJcblx0XHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgQ2FyZFNjYWxlID0gY29uZi5Jc0NhcmRTY2FsZTtcclxuXHRcdFx0dmFyIFJ1bGVyU2NhbGUgPSBjb25mLklzUnVsZXJTY2FsZTtcclxuXHRcdFx0dmFyIE11bHRpcGxlU2NhbGUgPSBjb25mLklzTXVsdGlwbGVTY2FsZTtcclxuXHRcdFx0dmFyICR0b3RhbFBsYWNlID0gJCgnLlNjYWxlTWFpblN0cnVjdHVyZV9mb290ZXJSZXN1bHQgLkhlYWRpbmcyJyk7XHJcblx0XHRcdHZhciB0b3RhbENhcmRTY2FsZSA9IDA7XHJcblx0XHRcdHZhciB0b3RhbE11bHRpcGxlU2NhbGUgPSAwO1xyXG5cdFx0XHR2YXIgdG90YWxSdWxlclNjYWxlID0gMDtcclxuXHJcblx0XHRcdHZhciBTY2FsZVR5cGVDYXJkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIHRvdGFsU2VsZWN0ZWQgPSAkKCcuU2NhbGVMaXN0LkNhcmRTY2FsZScpLmZpbmQoJy5TY2FsZUNhcmQuYWN0aXZlJykubGVuZ3RoO1xyXG5cdFx0XHRcdHZhciB0b3RhbE51bWJlciA9IDA7XHJcblx0XHRcdFx0JChcIi5TY2FsZUxpc3QuQ2FyZFNjYWxlOm5vdCgnLmlzVGl0bGUnKVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuZmluZCgnLlNjYWxlQ2FyZCcpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0dG90YWxOdW1iZXIgKz0gMTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKHRvdGFsTnVtYmVyID09PSB0b3RhbFNlbGVjdGVkKSB7XHJcblx0XHRcdFx0XHR2YXIgdG90YWwgPSBbXTtcclxuXHRcdFx0XHRcdHZhciBpbnB1dFZhbHVlID0gJyc7XHJcblx0XHRcdFx0XHR2YXIgJHNjYWxlUm93ID0gJCgnLlNjYWxlTGlzdC5DYXJkU2NhbGU6bm90KC5pc1RpdGxlKScpO1xyXG5cdFx0XHRcdFx0JHNjYWxlUm93LmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGlucHV0VmFsdWUgPSAkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmZpbmQoJy5TY2FsZUNhcmQuYWN0aXZlJylcclxuXHRcdFx0XHRcdFx0XHQuZGF0YSgndmFsdWUnKTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuU2NhbGVMaXN0X2lucHV0VmFsdWUgaW5wdXQnKVxyXG5cdFx0XHRcdFx0XHRcdC52YWwoaW5wdXRWYWx1ZSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQkKCcuU2NhbGVMaXN0LkNhcmRTY2FsZSAuU2NhbGVDYXJkLmFjdGl2ZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHRvdGFsLnB1c2goJCh0aGlzKS5kYXRhKCd2YWx1ZScpKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0dmFyIGZpbmFsVG90YWwgPSBldmFsKHRvdGFsLmpvaW4oJysnKSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmluYWxUb3RhbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgU2NhbGVUeXBlUnVsZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgYWN0aXZlUnVsZXJWYWx1ZSA9ICcnO1xyXG5cdFx0XHRcdHZhciAkYWN0aXZlUnVsZXIgPSAkKCcuUnVsZXJTY2FsZV9udW1iZXIuYWN0aXZlJyk7XHJcblx0XHRcdFx0aWYgKCRhY3RpdmVSdWxlci5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHR2YXIgYWN0aXZlUnVsZXJWYWx1ZSA9ICQoJy5SdWxlclNjYWxlX251bWJlci5hY3RpdmUnKVxyXG5cdFx0XHRcdFx0XHQuY2xvc2VzdCgnLlJ1bGVyU2NhbGUnKVxyXG5cdFx0XHRcdFx0XHQuZGF0YSgpLnZhbHVlO1xyXG5cdFx0XHRcdFx0JCgnLlNjYWxlTGlzdC5SdWxlcicpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuU2NhbGVMaXN0X2lucHV0VmFsdWUgaW5wdXQnKVxyXG5cdFx0XHRcdFx0XHQudmFsKGFjdGl2ZVJ1bGVyVmFsdWUpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBhY3RpdmVSdWxlclZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gYWN0aXZlUnVsZXJWYWx1ZTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBTY2FsZVR5cGVNdWx0aXBsZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBudW1iZXJvZkNvbHMgPSAkKCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGUnKVxyXG5cdFx0XHRcdFx0LmZpcnN0KClcclxuXHRcdFx0XHRcdC5maW5kKCcuQnV0dG9uR3JvdXBTY2FsZScpLmxlbmd0aDtcclxuXHRcdFx0XHR2YXIgbnVtYmVyb2ZSb3dzID0gJCgnLkJ1dHRvbkdyb3VwU2NhbGUnKS5jbG9zZXN0KCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGU6bm90KC5pc1RpdGxlKTpub3QoLmlzU3VidG90YWwpJylcclxuXHRcdFx0XHRcdC5sZW5ndGg7XHJcblx0XHRcdFx0dmFyIHRvdGFsID0gW107XHJcblx0XHRcdFx0dmFyIGkgPSAwO1xyXG5cdFx0XHRcdHZhciBqID0gMDtcclxuXHRcdFx0XHR2YXIgY291bnRBY3RpdmUgPSAwO1xyXG5cdFx0XHRcdHZhciBjb3VudGFsbEFjdGl2ZUNvbHMgPSAwO1xyXG5cdFx0XHRcdHZhciB0b3RhbE9mSXRlbXMgPSBudW1iZXJvZkNvbHMgKiBudW1iZXJvZlJvd3M7XHJcblx0XHRcdFx0dmFyIHRvdGFsU2NvcmUgPSBbXTtcclxuXHJcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG51bWJlcm9mQ29sczsgaSsrKSB7XHJcblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbnVtYmVyb2ZSb3dzOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIFNjYWxlTGlzdFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuXHRcdFx0XHRcdFx0XHQnLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlOm5vdCguaXNUaXRsZSk6bm90KC5pc1N1YnRvdGFsKSdcclxuXHRcdFx0XHRcdFx0KVtqXTtcclxuXHRcdFx0XHRcdFx0dmFyIEJ1dHRvblNjYWxlU2VsZWN0ZWQgPSBTY2FsZUxpc3RTZWxlY3RlZC5xdWVyeVNlbGVjdG9yQWxsKCcuQnV0dG9uR3JvdXBTY2FsZScpW2ldO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKEJ1dHRvblNjYWxlU2VsZWN0ZWQucXVlcnlTZWxlY3RvckFsbCgnLkJ1dHRvbkdyb3VwX2J1dHRvbi5hY3RpdmUnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIFNjYWxlVmFsdWUgPSBCdXR0b25TY2FsZVNlbGVjdGVkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKVswXS5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHRcdFx0dG90YWwucHVzaChwYXJzZUludChTY2FsZVZhbHVlKSk7XHJcblx0XHRcdFx0XHRcdFx0dG90YWxTY29yZS5wdXNoKHBhcnNlSW50KFNjYWxlVmFsdWUpKTtcclxuXHRcdFx0XHRcdFx0XHRjb3VudEFjdGl2ZSA9IGNvdW50QWN0aXZlICsgMTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCQoJy5TY2FsZUxpc3QuTXVsdGlwbGVTY2FsZS5pc1N1YnRvdGFsJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoY291bnRBY3RpdmUgPT09IG51bWJlcm9mUm93cykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBzdWJUb3RhbCA9IGV2YWwodG90YWwuam9pbignKycpKTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc3VidG90YWxTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5TY2FsZUxpc3QuTXVsdGlwbGVTY2FsZS5pc1N1YnRvdGFsIC5CdXR0b25Hcm91cFNjYWxlJylbaV07XHJcblx0XHRcdFx0XHRcdFx0c3VidG90YWxTY2FsZS5pbm5lclRleHQgPSBzdWJUb3RhbDtcclxuXHRcdFx0XHRcdFx0XHRjb3VudGFsbEFjdGl2ZUNvbHMgPSBjb3VudGFsbEFjdGl2ZUNvbHMgKyAxO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb3VudEFjdGl2ZSA9IDA7XHJcblx0XHRcdFx0XHR0b3RhbCA9IFtdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5CdXR0b25Hcm91cF9idXR0b24uYWN0aXZlJykubGVuZ3RoID09PSB0b3RhbE9mSXRlbXMpIHtcclxuXHRcdFx0XHRcdHZhciBpID0gMDtcclxuXHRcdFx0XHRcdHZhciBqID0gMDtcclxuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBudW1iZXJvZlJvd3M7IGkrKykge1xyXG5cdFx0XHRcdFx0XHR2YXIgU2NhbGVMaXN0Um93ID0gJCgnLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlOm5vdCguaXNUaXRsZSk6bm90KC5pc1N1YnR0b3RhbCknKVtpXTtcclxuXHRcdFx0XHRcdFx0dmFyICRTY2FsZUxpc3RJbnB1dCA9ICQoU2NhbGVMaXN0Um93KS5maW5kKCcuU2NhbGVMaXN0X2lucHV0VmFsdWUgaW5wdXQnKTtcclxuXHRcdFx0XHRcdFx0dmFyIHZhbHVlc1NlbGVjdGVkID0gJyc7XHJcblx0XHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBudW1iZXJvZkNvbHM7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBBY3RpdmVCdXR0b24gPSAkKFNjYWxlTGlzdFJvdykuZmluZCgnLkJ1dHRvbkdyb3VwX2J1dHRvbi5hY3RpdmUnKVtqXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgQWN0aXZlVmFsdWUgPSBBY3RpdmVCdXR0b24uaW5uZXJUZXh0O1xyXG5cdFx0XHRcdFx0XHRcdC8vdmFsdWVzU2VsZWN0ZWQ9dmFsdWVzU2VsZWN0ZWQrJywnK0FjdGl2ZVZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChqID09PSBudW1iZXJvZkNvbHMgLSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZXNTZWxlY3RlZCArPSBBY3RpdmVWYWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVzU2VsZWN0ZWQgKz0gQWN0aXZlVmFsdWUgKyAnLCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCRTY2FsZUxpc3RJbnB1dC52YWwodmFsdWVzU2VsZWN0ZWQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dmFyIGdldFRvdGFsID0gZXZhbCh0b3RhbFNjb3JlLmpvaW4oJysnKSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0VG90YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIFRvdGFsQ2FsYyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmIChDYXJkU2NhbGUgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdHRvdGFsQ2FyZFNjYWxlID0gU2NhbGVUeXBlQ2FyZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoUnVsZXJTY2FsZSA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0dG90YWxSdWxlclNjYWxlID0gU2NhbGVUeXBlUnVsZXIoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKE11bHRpcGxlU2NhbGUgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdHRvdGFsTXVsdGlwbGVTY2FsZSA9IFNjYWxlVHlwZU11bHRpcGxlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICghaXNOYU4odG90YWxNdWx0aXBsZVNjYWxlKSAmJiAhaXNOYU4odG90YWxDYXJkU2NhbGUpICYmICFpc05hTih0b3RhbFJ1bGVyU2NhbGUpKSB7XHJcblx0XHRcdFx0XHR2YXIgdG90YWxBYnNvbHV0ZVNjb3JlID0gdG90YWxDYXJkU2NhbGUgKyB0b3RhbE11bHRpcGxlU2NhbGUgKyB0b3RhbFJ1bGVyU2NhbGU7XHJcblx0XHRcdFx0XHR2YXIgdG90YWxBYnNvbHV0ZUxhYmVsID0gdG90YWxBYnNvbHV0ZVNjb3JlID4gMTEgPyAnIChIaWdoKScgOiAnIChMb3cpJztcclxuXHJcblx0XHRcdFx0XHQkKCcuU2NhbGVNYWluU3RydWN0dXJlX3RvdGFsU2NvcmUuSGVhZGluZzInKS50ZXh0KHRvdGFsQWJzb2x1dGVTY29yZSArIHRvdGFsQWJzb2x1dGVMYWJlbCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfaGlkZGluZ0xpbmsgYScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV9oaWRkaW5nTGluayBhJykuY2xpY2soKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoQ2FyZFNjYWxlID09PSB0cnVlKSB7XHJcblx0XHRcdFx0JCgnLlNjYWxlQ2FyZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCRwYXJlbnRTY2FsZUNhcmQgPSAkKHRoaXMpLmNsb3Nlc3QoJy5TY2FsZUxpc3QuQ2FyZFNjYWxlJyk7XHJcblx0XHRcdFx0XHRcdCRwYXJlbnRTY2FsZUNhcmQuZmluZCgnLlNjYWxlQ2FyZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdFRvdGFsQ2FsYygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFRvdGFsQ2FsYygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoUnVsZXJTY2FsZSA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdCQoJy5SdWxlclNjYWxlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5maW5kKCcudmlld21vZGUnKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0dmFyICRydWxlclNjYWxlTGlzdCA9ICQodGhpcykuY2xvc2VzdCgnLlNjYWxlTGlzdC5SdWxlcicpO1xyXG5cdFx0XHRcdFx0XHQkcnVsZXJTY2FsZUxpc3QuZmluZCgnLlJ1bGVyU2NhbGVfbnVtYmVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmZpbmQoJy5SdWxlclNjYWxlX251bWJlcicpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0VG90YWxDYWxjKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0VG90YWxDYWxjKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChNdWx0aXBsZVNjYWxlID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dmFyIGNvdW50ZXI7XHJcblx0XHRcdFx0dmFyIFNjYWxlTGlzdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlLmlzVGl0bGUnKTtcclxuXHRcdFx0XHR2YXIgU2NhbGVMaXN0U3ViVG90YWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGUuaXNTdWJ0b3RhbCcpO1xyXG5cdFx0XHRcdHZhciBTY2FsZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGU6bm90KC5pc1RpdGxlKTpub3QoLmlzU3VidG90YWwpJyk7XHJcblxyXG5cdFx0XHRcdCQoJy5CdXR0b25Hcm91cFNjYWxlJylcclxuXHRcdFx0XHRcdC5jbG9zZXN0KCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGU6bnRoLWNoaWxkKDJuKScpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ0V2ZW5MaW5lJyk7XHJcblx0XHRcdFx0dmFyIG51bWJlck9mR3JvdXBTY2FsZSA9IFNjYWxlTGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuQnV0dG9uR3JvdXBTY2FsZScpLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0JCgnLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlLmlzU3VidG90YWwgLkJ1dHRvbkdyb3VwU2NhbGUnKS50ZXh0KDApO1xyXG5cdFx0XHRcdC8vIENoZWNrIGlmIE11bHRpcGxlIFNjYWxlIFRpdGxlIGV4aXN0cyB0aGVuIGFkanVzdCB0aXRsZSB3aWR0aFxyXG5cdFx0XHRcdGlmICgkKCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGUuaXNUaXRsZScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdGZvciAoY291bnRlciA9IDA7IGNvdW50ZXIgPCBudW1iZXJPZkdyb3VwU2NhbGU7IGNvdW50ZXIrKykge1xyXG5cdFx0XHRcdFx0XHR2YXIgU2NhbGVMaXN0V2lkdGggPSBTY2FsZUxpc3QucXVlcnlTZWxlY3RvckFsbCgnLkJ1dHRvbkdyb3VwU2NhbGUnKVtjb3VudGVyXS5vZmZzZXRXaWR0aDtcclxuXHRcdFx0XHRcdFx0U2NhbGVMaXN0VGl0bGUucXVlcnlTZWxlY3RvckFsbCgnLkJ1dHRvbkdyb3VwU2NhbGUnKVtjb3VudGVyXS5zdHlsZS53aWR0aCA9IFNjYWxlTGlzdFdpZHRoICsgJ3B4JztcclxuXHRcdFx0XHRcdFx0U2NhbGVMaXN0U3ViVG90YWwucXVlcnlTZWxlY3RvckFsbCgnLkJ1dHRvbkdyb3VwU2NhbGUnKVtjb3VudGVyXS5zdHlsZS53aWR0aCA9IFNjYWxlTGlzdFdpZHRoICsgJ3B4JztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCQoJy5CdXR0b25Hcm91cF9idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFRvdGFsQ2FsYygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFRvdGFsQ2FsYygpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRzZXR1cFNjYWxlID0gKCkgPT4ge1xyXG5cdFx0dmFyIElzQ2FyZFNjYWxlO1xyXG5cdFx0dmFyIElzUnVsZXJTY2FsZTtcclxuXHRcdHZhciBJc011bHRpcGxlU2NhbGU7XHJcblxyXG5cdFx0JCgnLlNjYWxlQ2FyZCcpLmxlbmd0aCA+IDAgPyAoSXNDYXJkU2NhbGUgPSB0cnVlKSA6IChJc0NhcmRTY2FsZSA9IGZhbHNlKTtcclxuXHRcdCQoJy5CdXR0b25Hcm91cFNjYWxlJykubGVuZ3RoID4gMCA/IChJc011bHRpcGxlU2NhbGUgPSB0cnVlKSA6IChJc011bHRpcGxlU2NhbGUgPSBmYWxzZSk7XHJcblx0XHQkKCcuUnVsZXJTY2FsZScpLmxlbmd0aCA+IDAgPyAoSXNSdWxlclNjYWxlID0gdHJ1ZSkgOiAoSXNSdWxlclNjYWxlID0gZmFsc2UpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFNjYWxlQ291bnQoe1xyXG5cdFx0XHRcdElzQ2FyZFNjYWxlOiBJc0NhcmRTY2FsZSxcclxuXHRcdFx0XHRJc1J1bGVyU2NhbGU6IElzUnVsZXJTY2FsZSxcclxuXHRcdFx0XHRJc011bHRpcGxlU2NhbGU6IElzTXVsdGlwbGVTY2FsZSxcclxuXHRcdFx0fSk7XHJcblx0XHR9LCA1MDApO1xyXG5cclxuXHRcdGlmICgkKCcuU2NhbGVNYWluU3RydWN0dXJlX29wdGlvbnMgLlRvZ2dsZUl0ZW1Db250cm9sJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHQkKCcuU2NhbGVNYWluU3RydWN0dXJlX29wdGlvbnMgLlRvZ2dsZUl0ZW1Db250cm9sJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV90b3RhbFNjb3JlLkhlYWRpbmcyJykudGV4dCgnJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHJlc2V0U2NhbGVzID0gKCkgPT4ge1xyXG5cdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV9jb250ZW50JykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV9vcHRpb25zIC5Ub2dnbGVJdGVtQ29udHJvbCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV90b3RhbFNjb3JlLkhlYWRpbmcyJykudGV4dCgnJyk7XHJcblx0XHRcdHNldHVwU2NhbGUoKTtcclxuXHRcdH0sIDYwMCk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcuU2NhbGVNYWluU3RydWN0dXJlX2NvbnRlbnQnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0XHQkKCcuU2NhbGVNYWluU3RydWN0dXJlX29wdGlvbnMgLlRvZ2dsZUl0ZW1Db250cm9sJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9O1xyXG5cclxuXHRiaW5kQ2xpY2tzID0gKCkgPT4ge1xyXG5cdFx0aWYgKCQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfb3B0aW9ucyAuVG9nZ2xlSXRlbUNvbnRyb2wgJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHQkKCcuU2NhbGVNYWluU3RydWN0dXJlJylcclxuXHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0Lm9uKCdjbGljaycsICcuVG9nZ2xlSXRlbUNvbnRyb2wnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHJlc2V0U2NhbGVzKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCQoJy5OYXZpZ2F0aW9uX2NvbnRyb2wnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdCQoJy5OYXZpZ2F0aW9uX3JpZ2h0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0ISQodGhpcylcclxuXHRcdFx0XHRcdFx0LmZpbmQoJ2EnKVswXVxyXG5cdFx0XHRcdFx0XHQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRyZXNldFNjYWxlcygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkKCcuTmF2aWdhdGlvbl9sZWZ0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0ISQodGhpcylcclxuXHRcdFx0XHRcdFx0LmZpbmQoJ2EnKVswXVxyXG5cdFx0XHRcdFx0XHQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRyZXNldFNjYWxlcygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNjYWxlTWFpblN0cnVjdHVyZSA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgVG9nZ2xlSXRlbUNvbnRyb2wgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlRvZ2dsZUl0ZW1Db250cm9sID0gKCkgPT4ge1xyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLlRvZ2dsZUl0ZW1Db250cm9sIGlucHV0W3R5cGU9XCJyYWRpb1wiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJy5Ub2dnbGVJdGVtQ29udHJvbCcpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJy5Ub2dnbGVJdGVtQ29udHJvbCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJylcclxuXHRcdFx0XHRcdC5ub3QoJzpjaGVja2VkJylcclxuXHRcdFx0XHRcdC5wcm9wKCdjaGVja2VkJywgdHJ1ZSlcclxuXHRcdFx0XHRcdC5jbGljaygpO1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpXHJcblx0XHRcdFx0XHRcdC5pcygnOmNoZWNrZWQnKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLlRvZ2dsZUl0ZW1Db250cm9sIGlucHV0W3R5cGU9XCJyYWRpb1wiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkKCcuVG9nZ2xlSXRlbUNvbnRyb2wnKVxyXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHQkKCcuVG9nZ2xlSXRlbUNvbnRyb2wnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpXHJcblx0XHRcdFx0XHRcdFx0LmlzKCc6Y2hlY2tlZCcpXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG4iLCJ2YXIgU2VhcmNoU2VsZWN0RGVmaW5lID0gKHdpbmRvdy5TZWFyY2hTZWxlY3REZWZpbmUgPSB3aW5kb3cuU2VhcmNoU2VsZWN0RGVmaW5lIHx8IHt9KTtcclxuXHJcblNhcHBoaXJlV2lkZ2V0cy5TZWxlY3RTU0QgPSBmdW5jdGlvbiBTU0RTZWxlY3RTZXR1cChjb25maWcpIHtcclxuXHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyICRTU0RzZWxlY3RJZCA9ICQoJyMnICsgY29uZmlnLlNTRFNlbGVjdElkKTtcclxuXHRcdHZhciBpc011bHRpcGxlID0gY29uZmlnLmlzTXVsdGlwbGU7XHJcblxyXG5cdFx0dmFyICRDb21wb25lbnRTU0QgPSAkU1NEc2VsZWN0SWQuY2xvc2VzdCgnLlNlYXJjaFNEJyk7XHJcblx0XHR2YXIgJENvbXBvbmVudFNTRGlucHV0ID0gJENvbXBvbmVudFNTRC5maW5kKCcuU2VhcmNoU0RfX19pbnB1dCBpbnB1dCcpO1xyXG5cdFx0dmFyIENvbXBvbmVudGlucHV0bGVuZ3RoID0gJENvbXBvbmVudFNTRGlucHV0LnZhbCgpLmxlbmd0aDtcclxuXHJcblx0XHRpZiAoQ29tcG9uZW50aW5wdXRsZW5ndGggPiAwKSB7XHJcblx0XHRcdCRTU0RzZWxlY3RJZC5maW5kKCcuU2VsZWN0U0RfX2NvbnRlbnRUaXRsZScpLmhpZ2hsaWdodCgkQ29tcG9uZW50U1NEaW5wdXQudmFsKCksIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdTZWxlY3RTRC1zZWFyY2hlZC10ZXJtJyxcclxuXHRcdFx0XHRjYXNlU2Vuc2l0aXZlOiBmYWxzZSxcclxuXHRcdFx0XHR3b3Jkc09ubHk6IGZhbHNlLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgT3BlbkNvbmZpcm1Qb3B1cCA9IGZ1bmN0aW9uKCRTU0RzZWxlY3RJZCkge1xyXG5cdFx0XHQkQ29tcG9uZW50U1NEID0gJFNTRHNlbGVjdElkLmNsb3Nlc3QoJy5TZWFyY2hTRCcpO1xyXG5cdFx0XHQkUG9wdXBJRCA9ICRDb21wb25lbnRTU0Quc2libGluZ3MoJy5TU0RQb3B1cFdyYXBwZXInKTtcclxuXHJcblx0XHRcdCRQb3B1cElELmZhZGVJbignZmFzdCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRDb21wb25lbnRTU0QuYWRkQ2xhc3MoJ0RvbnRfQ2xvc2UnKTtcclxuXHRcdFx0XHQkUG9wdXBJRFxyXG5cdFx0XHRcdFx0LmZpbmQoJy5TU0Rwb3B1cE9rJylcclxuXHRcdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JFBvcHVwSUQuZmFkZU91dCgnZmFzdCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdCRTU0RzZWxlY3RJZC5maW5kKCcuU2VsZWN0U0RfX3N0YXJUcmlnZ2VyID4gYScpLmNsaWNrKCk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgkQ29tcG9uZW50U1NELnJlbW92ZUNsYXNzKCdEb250X0Nsb3NlJyksIDUwMCk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdCRQb3B1cElEXHJcblx0XHRcdFx0XHQuZmluZCgnLlNTRHBvcHVwQ2FuY2VsJylcclxuXHRcdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JFBvcHVwSUQuZmFkZU91dCgnZmFzdCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoJENvbXBvbmVudFNTRC5yZW1vdmVDbGFzcygnRG9udF9DbG9zZScpLCA1MDApO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIFNTRENoZWNrQm94U2VsZWN0ID0gZnVuY3Rpb24oJHdpZGdldElkKSB7XHJcblx0XHRcdHZhciBjaGVja0JveENvdW50ID0gMDtcclxuXHRcdFx0aWYgKGlzTXVsdGlwbGUgPT09ICdUcnVlJykge1xyXG5cdFx0XHRcdGNoZWNrQm94Q291bnQgPSAkd2lkZ2V0SWRcclxuXHRcdFx0XHRcdC5jbG9zZXN0KCcuU2VhcmNoU0Quc2hvd0Zhdm9yaXRlJylcclxuXHRcdFx0XHRcdC5maW5kKCcuU2VsZWN0U0RfX211bHRpcGxlID4gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmNoZWNrZWQnKS5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdCRhbGxMaXN0Y2FyZCA9ICR3aWRnZXRJZC5jbG9zZXN0KCcuU2VhcmNoU0RfY29udGVudCcpO1xyXG5cclxuXHRcdFx0XHRpZiAoY2hlY2tCb3hDb3VudCA+IDApIHtcclxuXHRcdFx0XHRcdCR3aWRnZXRJZC5jbG9zZXN0KCcuU2VhcmNoU0Quc2hvd0Zhdm9yaXRlJykuYWRkQ2xhc3MoJ011bHRpU2VsZWN0QWN0aXZlJyk7XHJcblx0XHRcdFx0XHQkd2lkZ2V0SWQuY2xvc2VzdCgnLlNlYXJjaFNEX2NvbnRlbnQgLlNlbGVjdFNEJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuU2VsZWN0U0RfY29udGVudFdyYXBwZXInKVxyXG5cdFx0XHRcdFx0XHRcdC5vZmYoJ2NsaWNrJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuZmluZCgnLlNlbGVjdFNEX2FjdGlvbkxpbmsnKVxyXG5cdFx0XHRcdFx0XHRcdC5vZmYoJ2NsaWNrJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JHdpZGdldElkLmNsb3Nlc3QoJy5TZWFyY2hTRC5zaG93RmF2b3JpdGUnKS5yZW1vdmVDbGFzcygnTXVsdGlTZWxlY3RBY3RpdmUnKTtcclxuXHRcdFx0XHRcdCR3aWRnZXRJZC5jbG9zZXN0KCcuU2VhcmNoU0RfY29udGVudCAuU2VsZWN0U0QgJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuU2VsZWN0U0RfY29udGVudFdyYXBwZXInKVxyXG5cdFx0XHRcdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuTGluZUFjdGlvbkxJTksgPiBhJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmNsaWNrKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuZmluZCgnLlNlbGVjdFNEX2FjdGlvbkxpbmsnKVxyXG5cdFx0XHRcdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuTGluZUFjdGlvbkxJTksgPiBhJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmNsaWNrKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGlzTXVsdGlwbGUgPT09ICdUcnVlJykge1xyXG5cdFx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX19tdWx0aXBsZSA+IGlucHV0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0U1NEQ2hlY2tCb3hTZWxlY3QoJFNTRHNlbGVjdElkKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0JFNTRHNlbGVjdElkLmZpbmQoJy5TZWxlY3RTRF9fc3RhckxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmICghJFNTRHNlbGVjdElkLmZpbmQoJy5TZWxlY3RTRCAuU2VsZWN0U0RfX3N0YXJXcmFwcGVyJykuaGFzQ2xhc3MoJ3N0YXJEaXNhYmxlZCcpKSB7XHJcblx0XHRcdFx0aWYgKCRTU0RzZWxlY3RJZC5maW5kKCcuU2VsZWN0U0QgLlNlbGVjdFNEX19zdGFyV3JhcHBlcicpLmhhc0NsYXNzKCdzdGFyU2VsZWN0ZWQnKSkge1xyXG5cdFx0XHRcdFx0T3BlbkNvbmZpcm1Qb3B1cCgkU1NEc2VsZWN0SWQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX19zdGFyVHJpZ2dlciA+IGEnKS5jbGljaygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JFNTRHNlbGVjdElkLmZpbmQoJy5TZWxlY3RTRF9jb250ZW50V3JhcHBlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0JENvbXBvbmVudFNTRCA9ICRTU0RzZWxlY3RJZC5jbG9zZXN0KCcuU2VhcmNoU0QnKTtcclxuXHRcdFx0JFNTRHNlbGVjdElkLmZpbmQoJy5MaW5lQWN0aW9uTElOSyA+IGEnKS5jbGljaygpO1xyXG5cdFx0XHRpZiAoISRDb21wb25lbnRTU0QuaGFzQ2xhc3MoJ011bHRpU2VsZWN0QWN0aXZlJykpIHtcclxuXHRcdFx0XHRTZWFyY2hTZWxlY3REZWZpbmUuU1NEU2VhcmNoLnJldHVyblRvU2VhcmNoKCRTU0RzZWxlY3RJZC5jbG9zZXN0KCcuU2VhcmNoU0QnKSk7XHJcblx0XHRcdFx0U2VhcmNoU2VsZWN0RGVmaW5lLlNTRFNlYXJjaC5jbG9zZVNTRCgkU1NEc2VsZWN0SWQuY2xvc2VzdCgnLlNlYXJjaFNEJykpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX2FjdGlvbkxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdCRDb21wb25lbnRTU0QgPSAkU1NEc2VsZWN0SWQuY2xvc2VzdCgnLlNlYXJjaFNEJyk7XHJcblx0XHRcdCRTU0RzZWxlY3RJZC5maW5kKCcuTGluZUFjdGlvbkxJTksgPiBhJykuY2xpY2soKTtcclxuXHRcdFx0aWYgKCEkQ29tcG9uZW50U1NELmhhc0NsYXNzKCdNdWx0aVNlbGVjdEFjdGl2ZScpKSB7XHJcblx0XHRcdFx0U2VhcmNoU2VsZWN0RGVmaW5lLlNTRFNlYXJjaC5yZXR1cm5Ub1NlYXJjaCgkU1NEc2VsZWN0SWQuY2xvc2VzdCgnLlNlYXJjaFNEJykpO1xyXG5cdFx0XHRcdFNlYXJjaFNlbGVjdERlZmluZS5TU0RTZWFyY2guY2xvc2VTU0QoJFNTRHNlbGVjdElkLmNsb3Nlc3QoJy5TZWFyY2hTRCcpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcbiIsInZhciBTZWFyY2hTZWxlY3REZWZpbmUgPSAod2luZG93LlNlYXJjaFNlbGVjdERlZmluZSA9IHdpbmRvdy5TZWFyY2hTZWxlY3REZWZpbmUgfHwge30pO1xyXG5cclxuU2FwcGhpcmVXaWRnZXRzLlNTRFNlYXJjaCA9IGZ1bmN0aW9uIFNTRHNlYXJjaFNldHVwKGNvbmZpZykge1xyXG5cdCQoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgJFNTRHdpZGdldCA9ICQoJyMnICsgY29uZmlnLlNTRFdpZGdldElkKTsgLy8gU1NEQ29tcG9uZW50IG1hcCBub3QgdXNlZCBhZ2FpblxyXG5cdFx0dmFyICRTU0RDb21wb25lbnQgPSAkU1NEd2lkZ2V0LmZpbmQoJy5TZWFyY2hTRCcpOyAvLyBTU0RTZWFyY2ggQ29tcG9uZW50IGlkIGZvciB1c2UgaW4gdGhlIGZ1bmN0aW9uIGFuZCBtYW5pcHVsYXRlIGNsYXNzZXNcclxuXHRcdHZhciAkU1NEQ29tcG9uZW50Q29udGVudCA9ICRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX2NvbnRlbnQnKTsgLy8gU1NEY29tcG9uZW50IGNvbnRlbnRcclxuXHRcdHZhciBoYXNDbG9uZSA9IGNvbmZpZy5IYXNDbG9uZTsgLy8gSGFzQ2xvbmUgdmFyaWFibGUgaW5wdXQgcGFyYW1ldGVyIHZhbHVlXHJcblx0XHR2YXIgaGFzRmF2b3JpdGUgPSBjb25maWcuSGFzRmF2b3JpdGU7IC8vIEhhc0Zhdm9yaXRlIHZhcmlhYmxlIGlucHV0IHBhcmFtZXRlciB2YWx1ZVxyXG5cdFx0dmFyIHNob3dDbG9uZXMgPSBjb25maWcuU2hvd0Nsb25lczsgLy8gU2hvd0Nsb25lcyB2YXJpYWJsZSBpbnB1dCBwYXJhbWV0ZXIgdmFsdWVcclxuXHRcdHZhciBsZXR0ZXJMaW1pdCA9IGNvbmZpZy5MaW1pdExldHRlcjsgLy8gTnVtYmVyIG9mIGxldHRlciB0byBlbnRlciBiZWZvcmUgdHJpZ2dlciB0aGUgc2VhcmNoIGFjdGlvblxyXG5cdFx0dmFyIGhhc1NoaWVsZCA9IGNvbmZpZy5IYXNTaGllbGQ7XHJcblx0XHR2YXIgc2hpZWxkVGltZW91dCA9IGNvbmZpZy5TaGllbGRUaW1lb3V0O1xyXG5cdFx0dmFyICR3aWRnZXRTaGllbGQgPSAkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRC0tc2hpZWxkJyk7XHJcblx0XHR2YXIgc2VhcmNoVHJpZ2dlclRpbWVyO1xyXG5cdFx0Y29uc3QgJFNTRENsZWFyQnV0dG9uID0gJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19yZW1vdmUnKTtcclxuXHRcdGNvbnN0ICRTU0RJbnB1dEVsZW1lbnQgPSAkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0Jyk7XHJcblxyXG5cdFx0dmFyIGV4ZWN1dGVTZWFyY2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHNlYXJjaFRyaWdnZXJUaW1lcik7XHJcblx0XHRcdHNlYXJjaFRyaWdnZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0VHJpZ2dlclNlYXJjaCgkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0fSwgNzAwKTtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGhhc1NoaWVsZCkge1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkd2lkZ2V0U2hpZWxkLmhpZGUoKTtcclxuXHRcdFx0fSwgc2hpZWxkVGltZW91dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyogIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcclxuXHRcdCAqICAgYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxyXG5cdFx0ICogICBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcclxuXHRcdCAqICAgbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cclxuXHRcdCAqL1xyXG5cdFx0dmFyIGRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcblx0XHRcdHZhciB0aW1lb3V0O1xyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gZXhlY3V0ZWRGdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY29udGV4dCA9IHRoaXM7XHJcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG5cdFx0XHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdFx0XHRpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xyXG5cdFx0XHRcdGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKioqKlxyXG5cdFx0ICogICBSZXNldCBTZWFyY2ggVUkgdG8gdGhlIGluaXRpYWwgc3RhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHJlc2V0VUkgPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19pbnB1dFdyYXBwZXInKS5zaG93KCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3NlYXJjaF9mYXZvcml0ZUxpbmsnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19fZ29Ub0Zhdm9yaXRlJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVDb3VudGVyJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVBY3Rpb25zJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVSZW1vdmUnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19jbG9uZVdyYXBwZXInKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19pbnB1dFdyYXBwZXIgLlNlYXJjaFNEX19yZXR1cm4nKS5oaWRlKCk7XHJcblxyXG5cdFx0XHRpZiAoJFNTRElucHV0RWxlbWVudC52YWwoKS50cmltKCkgPT09ICcnKSB7XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19yZW1vdmUnKS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ3Nob3dGYXZvcml0ZScpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdzaG93Q2xvbmUnKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqXHJcblx0XHQgKiAgR28gdG8gRmF2b3JpdGVzIFVJXHJcblx0XHQgKiAgLS0gIHJlc3QgU1NEY29tcG9uZW50XHJcblx0XHQgKiAgLS0gIHNob3cgRmF2b3JpdGUgZmVhdHVyZXNcclxuXHRcdCAqICAtLSAgcmVtb3ZlIGNsYXNzIHNob3dDbG9uZSBpZiBjb21wb25lbnQgaGF2ZSB0aGF0IGNsYXNzXHJcblx0XHQgKiAgLS0gIGFkZCBjbGFzcyBzaG93RmF2b3JpdGUgdG8gaGF2ZSBjb21wb25lbnQgY29udHJvbFxyXG5cdFx0ICogIC0tICBhZGRDbGFzcyBPcGVuIHdpdGggc2xpZGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGdvVG9GYXZvcml0ZXMgPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdHJlc2V0VUkoJFNTRENvbXBvbmVudCk7XHJcblxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnT3BlbicpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fcmV0dXJuJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9faW5wdXRXcmFwcGVyJykuaGlkZSgpO1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5oYXNDbGFzcygnc2hvd0Nsb25lJykpIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdzaG93Q2xvbmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVDb3VudGVyJykuc2hvdygpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zZWFyY2hfZmF2b3JpdGVMaW5rICcpLnNob3coKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX0Zhdm9yaXRlUmVtb3ZlICcpLnNob3coKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX0Zhdm9yaXRlQWN0aW9ucycpLnNob3coKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5hZGRDbGFzcygnc2hvd0Zhdm9yaXRlJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlbGVjdFNELmhhc0Zhdm9yaXRlID4gYScpLmZvY3VzKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ09wZW4nKTtcclxuXHJcblx0XHRcdC8vIGxvYWRpbmcgc2hvdyBoaWRlIGxpc3RcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfY29udGVudExpc3QnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19sb2FkaW5nJykuc2hvdygpO1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2hvd01vcmUgYScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZScpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKioqKioqKioqKioqKipcclxuXHRcdCAqXHJcblx0XHQgKiAgR28gdG8gQ2xvbmUgVUlcclxuXHRcdCAqICAtLSAgcmVtb3ZlIGNsYXNzIE9wZW5cclxuXHRcdCAqICAtLSBBZGQgU2hvd0Nsb25lIGNsYXNzXHJcblx0XHQgKiAgLS0gU2xpZGVEb3duIGVmZmVjdCBhbmQgYWRkIE9wZW4gQ2xhc3NcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGdvVG9DbG9uZSA9IGZ1bmN0aW9uKCRTU0RDb21wb25lbnQpIHtcclxuXHRcdFx0Ly8gbG9hZGluZyBzaG93IGhpZGUgbGlzdFxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9jb250ZW50TGlzdCcpLmhpZGUoKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX2xvYWRpbmcnKS5zaG93KCk7XHJcblx0XHRcdGlmICgkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZSBhJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3Nob3dNb3JlJykuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnT3BlbicpO1xyXG5cclxuXHRcdFx0aWYgKCEkU1NEQ29tcG9uZW50Lmhhc0NsYXNzKCdzaG93Q2xvbmUnKSkge1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ3Nob3dDbG9uZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ09wZW4nKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqIFJldHVybiB0byBzZWFyY2ggZnJvbSBmYXZvcml0ZSBvciBjbG9uZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgcmV0dXJuVG9TZWFyY2ggPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdC8vIGxvYWRpbmcgc2hvdyBoaWRlIGxpc3RcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfY29udGVudExpc3QnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19sb2FkaW5nJykuc2hvdygpO1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2hvd01vcmUgYScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZScpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVzZXRVSSgkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnc2hvd0Nsb25lJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ3Nob3dGYXZvcml0ZScpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdPcGVuJyk7XHJcblxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9faW5wdXRXcmFwcGVyIC5TZWFyY2hTRF9fcmV0dXJuJykuaGlkZSgpO1xyXG5cclxuXHRcdFx0aWYgKCRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ2hhc0Nsb25lJykpIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmFkZENsYXNzKCdoYXNDbG9uZScpO1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19jbG9uZVdyYXBwZXInKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ2hhc0Zhdm9yaXRlJykpIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmFkZENsYXNzKCdoYXNGYXZvcml0ZScpO1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3NlYXJjaF9mYXZvcml0ZUxpbmsnKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgU1NEQ2xlYXIgY2xvc2VzIFNTRFNlYXJjaCBjb250YWluZXJcclxuXHRcdCAqICAgYW5kIGNsZWFyIHNzZCBmaWx0ZXIgaW5wdXRcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHNzZENsZWFyID0gZnVuY3Rpb24oJFNTRENvbXBvbmVudCkge1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdPcGVuJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKlxyXG5cdFx0ICogICBDbG9zZVNTRCBjbG9zZXMgU1NEU2VhcmNoIGNvbnRhaW5lclxyXG5cdFx0ICogICBtdXN0IHJlbW92ZSBoaWdodGxpZ2h0U2VsZWN0aW9uIGRvbmUgYnkga2V5Ym9hcmQgbmF2aWdhdGlvblxyXG5cdFx0ICovXHJcblx0XHR2YXIgY2xvc2VTU0QgPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ09wZW4nKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudENvbnRlbnQuc2xpZGVVcCgnMjUwJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJy5zZWxlY3RlZCcpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKlxyXG5cdFx0ICogICBBZGQgT3BlbiBjbGFzcyB0byBTU0RDb21wb25lbnRcclxuXHRcdCAqICAgaWYgU1NEQ29tcG9uZW50IGhhcyBjbGFzcyBPcGVuIHRoZW4gZm9jdXNcclxuXHRcdCAqICAgbWFrZXMgb3BlbiBlZmZlY3QsIGNoZWNrIHRoZSBjaGFyYWN0ZXJzIGluc2lkZSB0aGUgaW5wdXQgdG8gZmlsdGVyXHJcblx0XHQgKi9cclxuXHRcdHZhciBzc2RGb2N1cyA9IGZ1bmN0aW9uKCRTU0RDb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKCEkU1NEQ29tcG9uZW50Lmhhc0NsYXNzKCdPcGVuJykpIHtcclxuXHRcdFx0XHQvLyBsb2FkaW5nIHNob3cgaGlkZSBsaXN0XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfY29udGVudExpc3QnKS5oaWRlKCk7XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX2xvYWRpbmcnKS5zaG93KCk7XHJcblx0XHRcdFx0aWYgKCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3Nob3dNb3JlIGEnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZScpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ09wZW4nKTtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCcuc2hvd0Nsb25lJyk7XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnLnNob3dGYXZvcml0ZScpO1xyXG5cclxuXHRcdFx0XHRpZiAoISRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ09wZW4nKSkge1xyXG5cdFx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoTGlua0lucHV0IGEnKS5jbGljaygpO1xyXG5cdFx0XHRcdFx0JFNTRENvbXBvbmVudC5hZGRDbGFzcygnT3BlbicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKlxyXG5cdFx0ICogICBXaGVuIGNsaWNraW5nIGNsaWNraW5nIG91dHNpZGUgdGhlIGNvbXBvbmVudFxyXG5cdFx0ICogICB0aGUgU1NEIG11c3QgY2xvc2UgYW5kIHJldHVybiB0byBpbml0aWFsIHN0YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBDbGlja091dCA9IGZ1bmN0aW9uKGUsICRTU0RDb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKCEkU1NEQ29tcG9uZW50LmlzKGUudGFyZ2V0KSAmJiAkU1NEQ29tcG9uZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuVG9TZWFyY2goJFNTRENvbXBvbmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgVHJpZ2dlcnMgdGhlIGxpbmsgdG8gaW5pdGlhbGl6ZVxyXG5cdFx0ICogICB0aGUgZGF0YWJhc2Ugc2VhcmNoIGJhc2VkIG9uIGN1cnJlbnQgbGVuZ3RoIG9mIHRoZSBzdHJpbmcgaW5zZXJ0ZWQgb24gdGhlIGlucHV0XHJcblx0XHQgKi9cclxuXHRcdHZhciBUcmlnZ2VyU2VhcmNoID0gZnVuY3Rpb24oJFNTRENvbXBvbmVudCkge1xyXG5cdFx0XHR2YXIgY3VycmVudFdvcmQgPSAkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0JykudmFsKCk7XHJcblx0XHRcdHZhciBjdXJyZW50Q291bnQgPSBjdXJyZW50V29yZC5sZW5ndGg7XHJcblx0XHRcdGlmIChjdXJyZW50Q291bnQgPj0gbGV0dGVyTGltaXQgfHwgY3VycmVudENvdW50ID09PSAwKSB7XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoTGlua0lucHV0ID4gYScpLmNsaWNrKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgUmVtb3ZlcyBhbGwgZmF2b3JpdGUgY2hlY2tlZCBib3hlc1xyXG5cdFx0ICogICBhbmQgZW5kcyBNdWx0aXBsZVNlbGVjdFxyXG5cdFx0ICovXHJcblx0XHR2YXIgTXVsdGlVbmNoZWNrID0gZnVuY3Rpb24oJFNTRENvbXBvbmVudCkge1xyXG5cdFx0XHQkY2hlY2tCb3hlcyA9ICRTU0RDb21wb25lbnQucGFyZW50KCkuZmluZCgnLlNlbGVjdFNEX19tdWx0aXBsZSA+IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdNdWx0aVNlbGVjdEFjdGl2ZScpO1xyXG5cclxuXHRcdFx0JFNTRENvbXBvbmVudFxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5maW5kKCcuU2VsZWN0U0RfX211bHRpcGxlID4gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJylcclxuXHRcdFx0XHQuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgS2V5Qm9hcmQgZXZlbnRzIHVwIGRvd24gYW5kIGVudGVyIGlmIG5vdCBmaWx0ZXJcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGtleWJvYXJkRXZlbnRzID0gZnVuY3Rpb24oZSwgJFNTRENvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5oYXNDbGFzcygnT3BlbicpKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRTZWxlY3RlZCA9ICRTU0RDb21wb25lbnRDb250ZW50LmZpbmQoJy5MaXN0UmVjb3JkcyA+IHNwYW4uc2VsZWN0ZWQnKTsgLy8gQ3VycmVudCBzZWxlY3RhYmxlIGl0ZW1cclxuXHRcdFx0XHR2YXIgJGZpcnN0U2VsZWN0ID0gJFNTRENvbXBvbmVudENvbnRlbnQuZmluZCgnLkxpc3RSZWNvcmRzID4gc3BhbjpmaXJzdC1jaGlsZCcpOyAvLyBGaXJzdCBzZWxlY3RhYmxlIGl0ZW1cclxuXHRcdFx0XHR2YXIgJGxhc3RTZWxlY3QgPSAkU1NEQ29tcG9uZW50Q29udGVudC5maW5kKCcuTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTsgLy8gTGFzdCBzZWxlY3RhYmxlIGl0ZW1cclxuXHRcdFx0XHR2YXIgY291bnRTZWxlY3RlZCA9IGN1cnJlbnRTZWxlY3RlZC5sZW5ndGg7IC8vIE51bWJlciBvZiBzZWxlY3RlZCBpdGVtXHJcblxyXG5cdFx0XHRcdGlmIChlLndoaWNoID09IDM4KSB7XHJcblx0XHRcdFx0XHQvLyBpZiBrZXkgcHJlc3NlZCBpcyB1cCBhcnJvd1xyXG5cdFx0XHRcdFx0aWYgKGNvdW50U2VsZWN0ZWQgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0Y3VycmVudFNlbGVjdGVkID0gJGxhc3RTZWxlY3Q7XHJcblx0XHRcdFx0XHRcdCRsYXN0U2VsZWN0LmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y3VycmVudFNlbGVjdGVkLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHRuZXh0ID0gY3VycmVudFNlbGVjdGVkLnByZXYoKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChuZXh0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQgPSBuZXh0LmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRTZWxlY3RlZCA9IGN1cnJlbnRTZWxlY3RlZC5sYXN0KCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgaWYgKGUud2hpY2ggPT0gNDApIHtcclxuXHRcdFx0XHRcdC8vIGlmIGtleSBwcmVzc2VkIGlzIGRvd24gYXJyb3dcclxuXHRcdFx0XHRcdGlmIChjb3VudFNlbGVjdGVkID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdCRmaXJzdFNlbGVjdC5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdG5leHQgPSBjdXJyZW50U2VsZWN0ZWQubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudFNlbGVjdGVkID0gbmV4dC5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQgPSBjdXJyZW50U2VsZWN0ZWQuZXEoMCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgaWYgKGUud2hpY2ggPT0gMTMpIHtcclxuXHRcdFx0XHRcdC8vIGlmIGtleSBwcmVzc2VkIGlzIGVudGVyXHJcblx0XHRcdFx0XHRpZiAoY291bnRTZWxlY3RlZCA+IDApIHtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQuZmluZCgnLlNlbGVjdFNEIC5TZWxlY3RTRF9hY3Rpb25MaW5rJykuY2xpY2soKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCRTU0RDb21wb25lbnQuZmluZCgnU2VhcmNoU0RfX19pbnB1dCBpbnB1dCcpLmlzKCc6YWN0aXZlJykgJiYgY291bnRTZWxlY3RlZCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRleGVjdXRlU2VhcmNoKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiAgIFRoZSBmaXJzdCBzdGVwIGlzIHRvIHJlc2V0IHRoZSBzZWV0aW5ncyB0byBkZWZhdWx0XHJcblx0XHQgKi9cclxuXHRcdHJlc2V0VUkoJFNTRENvbXBvbmVudCk7XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICBSZW1vdmUgYXV0b0NvbXBsZXRlIGZyb20gc2VhcmNoIGlucHV0XHJcblx0XHQgKi9cclxuXHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKS5hdHRyKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgSWYgU1NEIGhhcyBDbG9uZSBhbmQgdGhlIGNsb25lIGxpc3QgaXMgdmlzaWJsZVxyXG5cdFx0ICogICBvbmNsaWNrIFwiQ2xvbmUgcHJldmlvdXMgbWVkaWNhdGlvblwiIHRoZW5cclxuXHRcdCAqICAgcmVtb3ZlIE9wZW4gYW5kIHNob3cgaXRlbXMgdG8gY2xvbmUgbGlzdFxyXG5cdFx0ICovXHJcblx0XHRpZiAoaGFzQ2xvbmUgPT09ICdUcnVlJykge1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmFkZENsYXNzKCdoYXNDbG9uZScpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fY2xvbmVXcmFwcGVyJykuc2hvdygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoYXNGYXZvcml0ZSA9PT0gJ1RydWUnKSB7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ2hhc0Zhdm9yaXRlJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3NlYXJjaF9mYXZvcml0ZUxpbmsnKS5zaG93KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKChoYXNDbG9uZSA9PT0gJ1RydWUnKSAmIChzaG93Q2xvbmVzID09PSAnVHJ1ZScpKSB7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX2Nsb25lV3JhcHBlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ09wZW4nKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX0Zhdm9yaXRlUmVtb3ZlJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNzZENsZWFyKCRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHRyZXR1cm5Ub1NlYXJjaCgkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0ZGVib3VuY2UoVHJpZ2dlclNlYXJjaCgkU1NEQ29tcG9uZW50KSwgNTUwKTtcclxuXHRcdFx0ZGVib3VuY2UoJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19pbnB1dCBpbnB1dCcpLmZvY3VzKCksIDU2MCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fY2xvbmVXcmFwcGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGdvVG9DbG9uZSgkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19nb1RvQ2xvbmUgPiBhJykuY2xpY2soKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19pbnB1dFdyYXBwZXInKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ3Nob3dDbG9uZScpKSB7XHJcblx0XHRcdFx0cmV0dXJuVG9TZWFyY2goJFNTRENvbXBvbmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19GYXZvcml0ZUFjdGlvbnNDYW5jZWwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0TXVsdGlVbmNoZWNrKCRTU0RDb21wb25lbnQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19pbnB1dCBpbnB1dCcpLmZvY3VzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRkZWJvdW5jZShzc2RGb2N1cygkU1NEQ29tcG9uZW50KSwgNjAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5tb3VzZXVwKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0Q2xpY2tPdXQoZSwgJFNTRENvbXBvbmVudCk7XHJcblx0XHR9KTtcclxuXHRcdC8qXHJcblx0XHQgKiAgIEtleUJvYXJkIGV2ZW50cyBvbiBrZXkgcHJlc3NcclxuXHRcdCAqL1xyXG5cdFx0JFNTRENvbXBvbmVudFxyXG5cdFx0XHQuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKVxyXG5cdFx0XHQuYWRkKCRTU0RDb21wb25lbnQuZmluZCgnLlNlbGVjdFNEX2FjdGlvbkxpbmsnKSlcclxuXHRcdFx0Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRpZiAoIWUud2hpY2ggIT0gMTMpIHtcclxuXHRcdFx0XHRcdGtleWJvYXJkRXZlbnRzKGUsICRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCRTU0RJbnB1dEVsZW1lbnQudmFsKCkudHJpbSgpID09PSAnJykge1xyXG5cdFx0XHRcdFx0JFNTRENsZWFyQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAnaGlkZScgfSwgMzAwKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JFNTRENsZWFyQnV0dG9uLmFuaW1hdGUoeyBvcGFjaXR5OiAnc2hvdycgfSwgMzAwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiAgIFByZXZlbnQgZm9ybSBzdWJtaXNzaW9uIG9uIGVudGVyLFxyXG5cdFx0ICogICBpbnN0ZWFkIGdvIHRvIGtleWJvYXJkIGV2ZW50cyB0byB0cmlnZ2VyXHJcblx0XHQgKiAgIHRoZSBzZWxlY3Rpb25cclxuXHRcdCAqL1xyXG5cdFx0JCgkU1NEQ29tcG9uZW50KS5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYgKGUud2hpY2ggPT0gMTMpIHtcclxuXHRcdFx0XHRrZXlib2FyZEV2ZW50cyhlLCAkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19yZW1vdmUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0c3NkQ2xlYXIoJFNTRENvbXBvbmVudCk7XHJcblx0XHRcdGRlYm91bmNlKHJldHVyblRvU2VhcmNoKCRTU0RDb21wb25lbnQpLCA2MDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2VhcmNoX2Zhdm9yaXRlTGluaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzc2RDbGVhcigkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0Z29Ub0Zhdm9yaXRlcygkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19nb1RvRmF2b3JpdGUgPiBhJykuY2xpY2soKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19GYXZvcml0ZUFjdGlvbnNBZGQgPiBhJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGRlYm91bmNlKFRyaWdnZXJTZWFyY2goJFNTRENvbXBvbmVudCksIDIwMCk7XHJcblx0XHRcdGRlYm91bmNlKHJldHVyblRvU2VhcmNoKCRTU0RDb21wb25lbnQpLCAzNTApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgT24gQWpheCBSZXF1ZXN0IGhpZGUgbG9hZGluZyBkaXYgaWYgdGhlIFNTRCBpcyBvcGVuIHRoZW4gc2hvdyB0aGVcclxuXHRcdCAqICAgTGlzdFJlY29yZHNcclxuXHRcdCAqL1xyXG5cdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ09wZW4nKSkge1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19sb2FkaW5nJykuaGlkZSgpO1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnRDb250ZW50LnNsaWRlRG93bignMTAwMCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfY29udGVudExpc3QnKS5zaG93KCk7XHJcblx0XHRcdFx0XHRpZiAoJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2hvd01vcmUgYScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2hvd01vcmUnKS5zaG93KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJ2Zvcm0nKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgbmFtZT1cInNzZElucHV0XCIgb25jbGljaz1cInJldHVybiBmYWxzZTtcIiAgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCIgLz4nKTtcclxuXHJcblx0XHR3aW5kb3cuU2VhcmNoU2VsZWN0RGVmaW5lLlNTRFNlYXJjaCA9IHtcclxuXHRcdFx0cmV0dXJuVG9TZWFyY2g6IHJldHVyblRvU2VhcmNoLFxyXG5cdFx0XHRyZXNldFVJOiByZXNldFVJLFxyXG5cdFx0XHRjbG9zZVNTRDogY2xvc2VTU0QsXHJcblx0XHRcdHNzZEZvY3VzOiBzc2RGb2N1cyxcclxuXHRcdFx0VHJpZ2dlclNlYXJjaDogVHJpZ2dlclNlYXJjaCxcclxuXHRcdFx0c3NkQ2xlYXI6IHNzZENsZWFyLFxyXG5cdFx0fTtcclxuXHR9KTtcclxufTtcclxuLy8gQWRkZWQgdG8gY2xvc2UgdGhlIHNlbGVjdCBsaXN0IGlmIHdlIGNsaWNrIHRoZSBwcmVzY3JpcHRpb24gSWZyYW1lO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGV2ZW50ID0+IHtcclxuXHR2YXIgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblx0cm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuXHRcdCdjbGljaycsXHJcblx0XHRmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaWZyYW1lW3NyYyo9J1ByZXNjcmlwdGlvbnNfQ1cnXVwiKSAmJlxyXG5cdFx0XHRcdGRvY3VtZW50XHJcblx0XHRcdFx0XHQucXVlcnlTZWxlY3RvcihcImlmcmFtZVtzcmMqPSdQcmVzY3JpcHRpb25zX0NXJ11cIilcclxuXHRcdFx0XHRcdC5jb250ZW50V2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcblx0XHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5TZWFyY2hTRCcpLmNsYXNzTGlzdC5yZW1vdmUoJ09wZW4nKTtcclxuXHRcdFx0XHRcdFx0dmFyIGFsbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLlNlYXJjaFNEX19faW5wdXQnKS5jaGlsZHJlbjtcclxuXHRcdFx0XHRcdFx0Zm9yIChjb25zdCBlbGVtZW50IGluIGFsbElucHV0KSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGFsbElucHV0W2VsZW1lbnRdLnZhbHVlICE9IHVuZGVmaW5lZCA/IChhbGxJbnB1dFtlbGVtZW50XS52YWx1ZSA9ICcnKSA6IG51bGw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRydWVcclxuXHQpO1xyXG59KTtcclxuIiwiLyogQ29tcG9uZW50IFNlYXJjaENsaWVudFNpZGUgKi9cclxuXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcbiAgY2xhc3MgU2VhcmNoQ2xpZW50U2lkZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IHtcclxuICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLm9uQ29tcG9uZW50SW5pdCgpO1xyXG5cclxuICAgICAgJCh3aW5kb3cpLmxvYWQoKCkgPT4ge1xyXG4gICAgICAgIG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoKCkgPT4ge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICQoJyMnICsgdGhpcy5vcHRpb25zLmlucHV0SWQpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uQ29tcG9uZW50SW5pdCgpIHtcclxuICAgICAgJCgnIycgKyB0aGlzLm9wdGlvbnMuaW5wdXRJZCkub24oJ2NoYW5nZSBrZXlkb3duIHBhc3RlIGlucHV0JywgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNlYXJjaENsaWVudFNpZGUodGhpcy5vcHRpb25zLmlucHV0SWQsIHRoaXMub3B0aW9ucy5zZWFyY2hhYmxlRWxlbWVudFNlbGVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaENsaWVudFNpZGUoaW5wdXRJZCwgc2VsZWN0b3IpIHtcclxuICAgICAgaWYgKCQoJyMnICsgaW5wdXRJZCkuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICB2YXIgc2VhcmNoVGV4dCA9IG9zanMoJyMnICsgaW5wdXRJZCkudmFsKCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB2YXIgc2VhcmNoQ291bnRlciA9IDA7XHJcbiAgICAgICAgdmFyIHNlbGVjaW9uID0gb3NqcyhzZWxlY3Rvcik7XHJcbiAgICAgICAgc2VsZWNpb24ucmVtb3ZlQ2xhc3MoJ3NlYXJjaE5vdEZvdW5kJyk7XHJcbiAgICAgICAgc2VsZWNpb24ucmVtb3ZlQ2xhc3MoJ3NlYXJjaEZvdW5kJyk7XHJcbiAgICAgICAgc2VsZWNpb24udW5oaWdobGlnaHQoKTtcclxuICAgICAgICBpZiAoc2VhcmNoVGV4dC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBzZWxlY2lvbi5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5uZXJUZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGV4dCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgIG9zanModGhpcykuYWRkQ2xhc3MoJ3NlYXJjaEZvdW5kJyk7XHJcbiAgICAgICAgICAgICAgc2VhcmNoQ291bnRlcisrO1xyXG4gICAgICAgICAgICAgIG9zanModGhpcykuaGlnaGxpZ2h0KHNlYXJjaFRleHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG9zanModGhpcykuYWRkQ2xhc3MoJ3NlYXJjaE5vdEZvdW5kJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2VhcmNoQ2xpZW50U2lkZShjb25maWcpKTtcclxuXHJcbiAgU2FwcGhpcmVXaWRnZXRzLlNlYXJjaENsaWVudFNpZGUgPSB7XHJcbiAgICBjcmVhdGUsXHJcbiAgfTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBTZWN0aW9uRXhwYW5kYWJsZSAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblxyXG5cdGZ1bmN0aW9uIFNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdC8vIE9iamVjdCB0byBzYXZlIHN0YXRzXHJcblx0XHR2YXIgcHJldmlld3N0YXQgPSBbXTtcclxuXHJcblx0XHR2YXIgdHJhbnNpdGlvbkV2ZW50ID0gU2lsa1VJLndoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0XHQvLyBzZXQgY2xpY2sgZXZlbnRzXHJcblx0XHRmdW5jdGlvbiBjbGlja0V2ZW50cyhvYikge1xyXG5cdFx0XHQvLyBzdG9yZSBxdWVyeXMgaW4gYSBzaW5nbGUgdmFyXHJcblx0XHRcdHZhciBTZWN0aW9uID0gJChvYikucGFyZW50KCk7XHJcblx0XHRcdHZhciBTZWN0aW9uQ29udGVudCA9IFNlY3Rpb24uY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50Jyk7XHJcblxyXG5cdFx0XHQvLyBnZXQgaWRcclxuXHRcdFx0dmFyIGlkID0gU2VjdGlvbi5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xyXG5cclxuXHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0LCBkdXJpbmcgdGhpcyBwcm9jZXNzLCB0cmFuc2l0aW9ucyBhcmUgZGlzYWJsZWRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cclxuXHRcdFx0XHQvLyBDb2xsYXBzZSBjb250ZW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdHRlbXBIZWlnaHQgPSBTZWN0aW9uQ29udGVudC5oZWlnaHQoKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KHRlbXBIZWlnaHQpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdFNlY3Rpb24uYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGlmICgkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTgnKSB8fCAkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTknKSkge1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGFkZCBldmVudCB0cmFuc2l0aW9uIGVuZCB0byBvdmVyZmxvdzp2aXNpYmxlIGZvciB0b29sdGlwcyBhbmQgZHJvcGRvd25zIGlzc3Vlc1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cclxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdC8vIHJlbW92ZSBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbScpLm9mZigpO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gYScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Ly8gaWYgbmV3IFNlY3Rpb25FeHBhbmRhYmxlIHRoZW4gYWRkIHRvIHByZXZpZXdzdGF0IGFycmF5XHJcblx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIGFkZCByb3dcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7XHJcblx0XHRcdFx0XHRcdGNsaWVudDogc3RhdCxcclxuXHRcdFx0XHRcdFx0c2VydmVyOiBzdGF0LFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9ucyB0byBjcmVhdGUgYXJyYXkgc3RhdFxyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b20nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHtcclxuXHRcdFx0XHRcdGNsaWVudDogc3RhdCxcclxuXHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnSGlkZVdoZW5FbXB0eScpICYmICQodGhpcykuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tX2NvbnRlbnQnKS50ZXh0KCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGhhY2sgdG8gZGlzcGxheSBhIG1lc3NhZ2Ugd2hlbiBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSBoYXMgbm8gY2hpbGQgaXRlbXNcclxuXHRcdFx0XHR2YXIgaXNFbXB0eSA9IHRydWU7XHJcblx0XHRcdFx0JCh0aGlzKS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCBkaXYsIC5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50IHNwYW4nKS5ub3QoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50LS1lbXB0eScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykudGV4dCgpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0aXNFbXB0eSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0aWYgKCFpc0VtcHR5KSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50LS1lbXB0eScpLmNzcyh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6ICdub25lJyxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cclxuXHRcdFx0XHR2YXIgJGV4cGFuZGFibGVJbnN0YW5jZSA9ICQodGhpcyk7XHJcblx0XHRcdFx0dmFyICR0b2dnbGVyID0gJCh0aGlzKS5maW5kKCc+IC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gLlNlY3Rpb25FeHBhbmRhYmxlLXRvZ2dsZXInKTtcclxuXHRcdFx0XHRpZiAoJHRvZ2dsZXIubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHR2YXIgJHRvZ2dsZXJTdGF0ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0JHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWx2YWx1ZV0nKS50ZXh0KCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsc2hvd10nKS5kYXRhKCdsYWJlbHNob3cnKSk7XHJcblx0XHRcdFx0XHQkdG9nZ2xlci5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRcdFx0XHRldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdCR0b2dnbGVyU3RhdGUgPSAhJHRvZ2dsZXJTdGF0ZTtcclxuXHRcdFx0XHRcdFx0aWYgKCR0b2dnbGVyU3RhdGUpIHtcclxuXHRcdFx0XHRcdFx0XHQkZXhwYW5kYWJsZUluc3RhbmNlLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVkJykuc2hvdygpO1xyXG5cdFx0XHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbGhpZGVdJykuZGF0YSgnbGFiZWxoaWRlJykpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdCRleHBhbmRhYmxlSW5zdGFuY2UuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlLXRvZ2dsZWQnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdFx0JHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWx2YWx1ZV0nKS50ZXh0KCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsc2hvd10nKS5kYXRhKCdsYWJlbHNob3cnKSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbScpLm9mZihcImNsaWNrXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjbGlja0V2ZW50cyh0aGlzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIGlucHV0LCAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBhJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZXZlbnQgYWpheFxyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KHRoYXQuYWpheFJlZnJlc2gpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcclxuXHRcdFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZSA9IG5ldyBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSgpO1xyXG5cdFx0U2lsa1VJLkV4ZWN1dGUoU2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlLmluaXQsICdFcnJvciBvbiBTaWxrVUlGcmFtZXdvcmsvQ29udGVudC9TZWN0aW9uRXhwYW5kYWJsZScpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TZWN0aW9uRXhwYW5kYWJsZSA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IFNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGZ1bmN0aW9uIFNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlKCkge1xyXG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHRcdC8vIE9iamVjdCB0byBzYXZlIHN0YXRzXHJcblx0XHR2YXIgcHJldmlld3N0YXQgPSBbXTtcclxuXHJcblx0XHR2YXIgdHJhbnNpdGlvbkV2ZW50ID0gU2lsa1VJLndoaWNoVHJhbnNpdGlvbkV2ZW50KCk7XHJcblx0XHQvLyBzZXQgY2xpY2sgZXZlbnRzXHJcblx0XHRmdW5jdGlvbiBjbGlja0V2ZW50cyhvYikge1xyXG5cdFx0XHQvLyBzdG9yZSBxdWVyeXMgaW4gYSBzaW5nbGUgdmFyXHJcblx0XHRcdHZhciBTZWN0aW9uID0gJChvYikucGFyZW50KCk7XHJcblx0XHRcdHZhciBTZWN0aW9uQ29udGVudCA9IFNlY3Rpb24uY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9jb250ZW50Jyk7XHJcblxyXG5cdFx0XHQvLyBnZXQgaWRcclxuXHRcdFx0dmFyIGlkID0gU2VjdGlvbi5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xyXG5cclxuXHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0LCBkdXJpbmcgdGhpcyBwcm9jZXNzLCB0cmFuc2l0aW9ucyBhcmUgZGlzYWJsZWRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cclxuXHRcdFx0XHQvLyBDb2xsYXBzZSBjb250ZW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdC8vIHRlbXBIZWlnaHQgPSBTZWN0aW9uQ29udGVudC5oZWlnaHQoKTtcclxuXHRcdFx0XHQvLyBTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0Ly8gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KHRlbXBIZWlnaHQpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdFNlY3Rpb24uYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdC8vIGFkZCBldmVudCB0cmFuc2l0aW9uIGVuZCB0byBvdmVyZmxvdzp2aXNpYmxlIGZvciB0b29sdGlwcyBhbmQgZHJvcGRvd25zIGlzc3Vlc1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBhamF4IHJlZnJlcyBmdW5jdGlvblxyXG5cdFx0dGhhdC5hamF4UmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJykub2ZmKCk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKFxyXG5cdFx0XHRcdCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgc2VsZWN0LCAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBhJ1xyXG5cdFx0XHQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIG5ldyBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjbGlja0V2ZW50cyh0aGlzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9uc1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxyXG5cdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID0geyBjbGllbnQ6IHN0YXQsIHNlcnZlcjogc3RhdCB9O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY3VyZW50IHN0YXRlIChhamF4IHN0YXRlIHggaW5pdGlhbCBzdGF0ZSlcclxuXHRcdFx0XHR2YXIgY3VyU3RhdGUgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgc3RhcnQgZXhwYW5kYWJsZVxyXG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRjdXJTdGF0ZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBhamF4ICE9IGluaXRpYWwgc2VydmVyXHJcblx0XHRcdFx0aWYgKGN1clN0YXRlICE9IHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ3NlcnZlciddKSB7XHJcblx0XHRcdFx0XHQvLyBjdXJzdGF0ZVxyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ3NlcnZlciddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID09IGZhbHNlICYmICQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbignLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2NvbnRlbnQnKVxyXG5cdFx0XHRcdFx0XHRcdC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID09IHRydWUgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBzZXQgZXZlbnRzXHJcblx0XHR0aGF0LmluaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJylcclxuXHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKFxyXG5cdFx0XHRcdCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgc2VsZWN0LCAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBhJ1xyXG5cdFx0XHQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZXZlbnQgYWpheFxyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KHRoYXQuYWpheFJlZnJlc2gpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IHNldE9wZW5DbG9zZUNsYXNzID0gaWQgPT4ge1xyXG5cdFx0aWQuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmIChpZC5wYXJlbnQoKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuSGVhZGVySWNvbicpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLkhlYWRlckljb24nKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdjbG9zZWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLkhlYWRlckljb24nKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdjbG9zZWQnKTtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLkhlYWRlckljb24nKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdvcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcclxuXHRcdFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZSA9IG5ldyBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSgpO1xyXG5cdFx0U2lsa1VJLkV4ZWN1dGUoU2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlLmluaXQsICdFcnJvciBvbiBTaWxrVUlGcmFtZXdvcmsvQ29udGVudC9TZWN0aW9uRXhwYW5kYWJsZScpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHRcdHNldE9wZW5DbG9zZUNsYXNzLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgU2VsZWN0U3lzdGVtICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TZWxlY3RTeXN0ZW0gPSBjb25maWcgPT4ge1xyXG5cdCQoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgV2lkZ2V0SWQgPSBjb25maWcuV2lkZ2V0SWQ7IC8vQ29tYm8gQm94IElkIHRvIGJlIHVzZWQuXHJcblx0XHR2YXIgQ2xhc3MgPSBjb25maWcuQ2xhc3M7IC8vQWxsIENvbWJvIGJveGVzIHdpdGggdGhpcyBjbGFzcyB3aWxsIGJlIGJlIHRyYW5zZm9ybWVkLlxyXG5cdFx0dmFyIE5vUmVzdWx0c1RleHQgPSBjb25maWcuTm9SZXN1bHRzVGV4dDsgLy9UZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGVyZSBhcmUgbm8gcmVzdWx0cy5cclxuXHRcdHZhciBpbnB1dFR5cGUgPSBjb25maWcuSW5wdVR5cGU7IC8vT3B0aW9uczogRklsdGVycywgRHJvcGRvd24sIFNlbGVjdDJcclxuXHRcdHZhciBQcm9tcHQgPSBjb25maWcuUHJvbXB0OyAvL1Byb21wdCBpbiBzZWFyY2hcclxuXHRcdHZhciBTZWxlY3QyVHlwZSA9IGNvbmZpZy5TZWxlY3RUeXBlOyAvLyBUeXBlIG9mIHNlbGVjdDIgY29uZmlndXJhdGlvblxyXG5cdFx0dmFyIEhhc1NlYXJjaCA9IGNvbmZpZy5IYXNTZWFyY2g7IC8vIGhhcyBzZWFyY2hcclxuXHRcdHZhciBPblNlbGVjdGluZ0pTID0gY29uZmlnLk9uU2VsZWN0aW5nSlM7XHJcblx0XHR2YXIgT25VblNlbGVjdGluZ0pTID0gY29uZmlnLk9uVW5TZWxlY3RpbmdKUztcclxuXHRcdHZhciBNYXhpbXVtTGVuZ3RoID0gY29uZmlnLk1heGltdW1MZW5ndGg7XHJcblx0XHR2YXIgU2VsZWN0ZWRWYWx1ZSA9IGNvbmZpZy5TZWxlY3RlZFZhbHVlO1xyXG5cdFx0dmFyIGFsbG93Q2xlYXIgPSBjb25maWcuYWxsb3dDbGVhcjtcclxuXHRcdC8vICBTZWxlY3QyIEFqYXggQ29uZmlndXJhdGlvblxyXG5cdFx0dmFyIEFqYXhVUkwgPSBjb25maWcuQWpheFVSTDtcclxuXHRcdHZhciBBamF4RGVsYXkgPSBjb25maWcuQWpheERlbGF5O1xyXG5cdFx0dmFyIFBhZ2luYXRpb25TaXplID0gY29uZmlnLlBhZ2luYXRpb25TaXplO1xyXG5cdFx0dmFyIE1pbmltdW1JbnB1dExlbmdodCA9IGNvbmZpZy5NaW5pbXVtSW5wdXRMZW5naHQ7XHJcblx0XHR2YXIgU2VhcmNoVGVybSA9IGNvbmZpZy5TZWFyY2hUZXJtO1xyXG5cdFx0dmFyIFNlYXJjaEV4dHJhUGFyYW0xID0gY29uZmlnLlNlYXJjaEV4dHJhUGFyYW0xO1xyXG5cdFx0dmFyIFBhZ2VUZXJtID0gY29uZmlnLlBhZ2VUZXJtO1xyXG5cdFx0dmFyIEFtb3VudFBhZ2UgPSBjb25maWcuUGFnZUFtb3VudDtcclxuXHRcdHZhciBpc011bHRpcGxlID0gY29uZmlnLmlzTXVsdGlwbGU7XHJcblx0XHR2YXIgU2VsZWN0Mk9wdGlvbnMgPSB7fTtcclxuXHRcdHZhciAkV2lkZ2V0SWRlbnRpZmllcjtcclxuXHJcblx0XHRpZiAoY29uZmlnLmxvY2FsZSA9PT0gJ0FSJyB8fCBjb25maWcubG9jYWxlID09PSAnRkEnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRpciA9ICdydGwnO1xyXG5cdFx0fVxyXG5cclxuXHRcdFNlbGVjdDJPcHRpb25zLnRoZW1lID0gJ2RlZmF1bHQgU2VsZWN0U3lzdGVtJztcclxuXHJcblx0XHQvKiAgXHJcbiAgICAgICAgICBDaGFuZ2Ugc2VsZWN0MiBzZWFyY2ggZGlzcGxheSBcclxuICAgICAgICAgICAgICAtTXVsdGlwbGUgU2VsZWN0MiBzZWFyY2ggVUkgbGlrZSBTaW5nbGUgU2VsZWN0MlxyXG4gICAgICAqL1xyXG5cdFx0JC5mbi5zZWxlY3QyLmFtZC5kZWZpbmUoXHJcblx0XHRcdCdTZWFyY2hMaWtlU2luZ2xlJyxcclxuXHRcdFx0W1xyXG5cdFx0XHRcdCdzZWxlY3QyL3V0aWxzJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bicsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQm9keScsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQ29udGFpbmVyJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bi9zZWFyY2gnLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxcclxuXHRcdFx0XSxcclxuXHRcdFx0ZnVuY3Rpb24oVXRpbHMsIERyb3Bkb3duLCBBdHRhY2hCb2R5LCBBdHRhY2hDb250YWluZXIsIFNlYXJjaCwgbWluaW11bVJlc3VsdHNGb3JTZWFyY2gpIHtcclxuXHRcdFx0XHRsZXQgZHJvcGRvd25TZWFyY2ggPSBVdGlscy5EZWNvcmF0ZShEcm9wZG93biwgU2VhcmNoKTtcclxuXHRcdFx0XHRkcm9wZG93blNlYXJjaC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgJHJlbmRlcmVkID0gRHJvcGRvd24ucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdFx0Ly8gQWRkIGFiaWxpdHkgZm9yIGEgcGxhY2Vob2xkZXIgaW4gdGhlIHNlYXJjaCBib3hcclxuXHRcdFx0XHRcdGxldCBwbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5nZXQoJ3BsYWNlaG9sZGVyRm9yU2VhcmNoJykgfHwgJyc7XHJcblx0XHRcdFx0XHR2YXIgJHNlYXJjaCA9ICQoXHJcblx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VhcmNoIHNlbGVjdDItc2VhcmNoLS1kcm9wZG93blwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdCc8aW5wdXQgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaF9fZmllbGRcIiBwbGFjZWhvbGRlcj1cIicgK1xyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyICtcclxuXHRcdFx0XHRcdFx0XHQnXCIgdHlwZT1cInNlYXJjaFwiJyArXHJcblx0XHRcdFx0XHRcdFx0JyB0YWJpbmRleD1cIi0xXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiJyArXHJcblx0XHRcdFx0XHRcdFx0JyBzcGVsbGNoZWNrPVwiZmFsc2VcIiByb2xlPVwidGV4dGJveFwiIC8+JyArXHJcblx0XHRcdFx0XHRcdFx0Jzwvc3Bhbj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJHNlYXJjaENvbnRhaW5lciA9ICRzZWFyY2g7XHJcblx0XHRcdFx0XHR0aGlzLiRzZWFyY2ggPSAkc2VhcmNoLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHRcdFx0XHQkc2VhcmNoLmFkZENsYXNzKCdNdWx0aXBsZVNlbGVjdCcpO1xyXG5cclxuXHRcdFx0XHRcdCRyZW5kZXJlZC5wcmVwZW5kKCRzZWFyY2gpO1xyXG5cdFx0XHRcdFx0JHNlYXJjaC5wYXJlbnQoKS5hZGRDbGFzcygnTXVsdGlwbGVTZWxlY3QnKTtcclxuXHRcdFx0XHRcdHJldHVybiAkcmVuZGVyZWQ7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gRGVjb3JhdGUgdGhlIGRyb3Bkb3duK3NlYXJjaCB3aXRoIHRoZSBjb250YWluZXJzXHJcblx0XHRcdFx0bGV0IGFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShkcm9wZG93blNlYXJjaCwgQXR0YWNoQ29udGFpbmVyKTtcclxuXHRcdFx0XHRhZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoYWRhcHRlciwgQXR0YWNoQm9keSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBhZGFwdGVyO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmYXVsdCBDb25maWd1cmF0aW9uIG5lZWRlZCB0byBhc3NvY2lhdGUgdGhlIHdpZGdldCB0byB0aGUgc2VsZWN0MiBwbHVnaW5cclxuXHRcdCAqL1xyXG5cdFx0aWYgKFdpZGdldElkID09PSAnJyAmJiBDbGFzcyAhPSAnJykge1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllciA9ICQoJy4nICsgQ2xhc3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JFdpZGdldElkZW50aWZpZXIgPSAkKCcjJyArIFdpZGdldElkKTtcclxuXHRcdH1cclxuXHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3NlbGVjdC1oaWRlICcgKyBpbnB1dFR5cGU7XHJcblxyXG5cdFx0Ly8gIFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duUGFyZW50PSAkKCcjJytQYXJlbnREaXYpO1xyXG5cclxuXHRcdHZhciBmb3JtYXRSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuXHRcdFx0dmFyICRzZWxlY3RlZE9wdGlvbnNWYWx1ZSA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gJHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmxlbmd0aDtcclxuXHRcdFx0dmFyIHRvdGFsT3B0aW9ucyA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbicpLmxlbmd0aDtcclxuXHRcdFx0dmFyIHNlbGVjdEFsbE9wdCA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZDpzZWxlY3RlZCcpLmxlbmd0aDtcclxuXHRcdFx0dmFyIGFjdGl2ZVZhbHVlcyA9ICcnO1xyXG5cdFx0XHR2YXIgYWxsT3B0RXhjZXB0QWxsID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnOnNlbGVjdGVkOm5vdChcIi5TZWxlY3RlZEFsbFwiKScpLmxlbmd0aDtcclxuXHRcdFx0dmFyICRhbGxPcHRFeGNlcHRBbGxPYmogPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCc6c2VsZWN0ZWQ6bm90KFwiLlNlbGVjdGVkQWxsXCIpJyk7XHJcblxyXG5cdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID09PSB0b3RhbE9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAodG90YWxPcHRpb25zIC0gMSA+IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiAnQWxsIFNlbGVjdGVkJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JGFsbE9wdEV4Y2VwdEFsbE9iai5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMgKyAnICcgKyAkKHRoaXMpWzBdLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YWN0aXZlVmFsdWVzID0gYWN0aXZlVmFsdWVzLnJlcGxhY2UoLyxcXHMqJC8sICcnKTtcclxuXHRcdFx0XHRcdHJldHVybiBhY3RpdmVWYWx1ZXM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciB0b3RhbG9wdCA9IHRvdGFsT3B0aW9ucyAtIDE7XHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkT3B0aW9ucyA+IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzZWxlY3RlZE9wdGlvbnMgKyAnIG9mICcgKyB0b3RhbG9wdCArICcgc2VsZWN0ZWQnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID4gMCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZWN0ZWRPcHRpb25zVmFsdWUuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMgKyAnICcgKyAkKHRoaXMpWzBdLmlubmVyVGV4dCArICcsICc7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMucmVwbGFjZSgvLFxccyokLywgJycpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYWN0aXZlVmFsdWVzO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICdTZWxlY3QgYW4gb3B0aW9uJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKE5vUmVzdWx0c1RleHQgIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZm9ybWF0Tm9NYXRjaGVzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIE5vUmVzdWx0c1RleHQ7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlucHV0VHlwZSAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gaW5wdXRUeXBlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhbGxvd0NsZWFyID09PSAnVHJ1ZScpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuYWxsb3dDbGVhciA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE1heGltdW1MZW5ndGggIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMubWF4aW11bUlucHV0TGVuZ3RoID0gTWF4aW11bUxlbmd0aDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoUHJvbXB0ICE9ICcnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnBsYWNlaG9sZGVyID0gUHJvbXB0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMucGxhY2Vob2xkZXIgPSB7XHJcblx0XHRcdFx0aWQ6ICctMScsIC8vIHRoZSB2YWx1ZSBvZiB0aGUgb3B0aW9uXHJcblx0XHRcdFx0dGV4dDogJ1NlbGVjdCBhbiBvcHRpb24nLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzMnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgQWpheFxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cclxuXHRcdFx0aWYgKGNvbmZpZy5sb2NhbGUgPT09ICdBUicgfHwgY29uZmlnLmxvY2FsZSA9PT0gJ0ZBJykge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLmRpciA9ICdydGwnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50ZW1wbGF0ZVNlbGVjdGlvbiA9IGZ1bmN0aW9uKHJlcG8pIHtcclxuXHRcdFx0XHRpZiAoIXJlcG8uZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21wdDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiByZXBvLmZ1bGxfbmFtZSB8fCByZXBvLnRleHQ7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50ZW1wbGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlcG8pIHtcclxuXHRcdFx0XHRpZiAocmVwby5sb2FkaW5nKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVwby50ZXh0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgbWFya3VwID0gJzxkaXYgY2xhc3M9XCJcIkNsZWFyZml4XCJcIj4nICsgJzxkaXYgY2xhc3M9XCJcIlRoZW1lR3JpZF9XaWR0aDEyXCJcIj4nICsgcmVwby50ZXh0ICsgJzwvZGl2Pic7XHJcblx0XHRcdFx0aWYgKHJlcG8uZGVzY3JpcHRpb24pIHtcclxuXHRcdFx0XHRcdG1hcmt1cCArPSAnPGRpdiBjbGFzcz1cIlwiT1NBdXRvTWFyZ2luVG9wXCJcIj4nICsgcmVwby5kZXNjcmlwdGlvbiArICc8L2Rpdj4nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtYXJrdXAgKz0gJzwvZGl2Pic7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdChTZWxlY3QyT3B0aW9ucy5hamF4ID0ge1xyXG5cdFx0XHRcdHVybDogQWpheFVSTCxcclxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRcdGRlbGF5OiBBamF4RGVsYXksXHJcblx0XHRcdFx0ZGF0YTogZnVuY3Rpb24ocGFyYW1zKSB7XHJcblx0XHRcdFx0XHR2YXIgU2VsZWN0MkFqYXhPcHQgPSB7fTtcclxuXHRcdFx0XHRcdHZhciBTcGxpdFBhcmFtZXRlciA9IFNlYXJjaEV4dHJhUGFyYW0xLnNwbGl0KCcsJyk7XHJcblx0XHRcdFx0XHRTZWxlY3QyQWpheE9wdC5TZWFyY2hQYXJhbWV0ZXIgPSBwYXJhbXMudGVybTtcclxuXHRcdFx0XHRcdFNlbGVjdDJBamF4T3B0LlBhZ2UgPSBwYXJhbXMucGFnZSB8fCAxO1xyXG5cdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHQuUGFnZUFtb3VudCA9IEFtb3VudFBhZ2U7XHJcblxyXG5cdFx0XHRcdFx0U3BsaXRQYXJhbWV0ZXIuZm9yRWFjaChmdW5jdGlvbihlbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgc3BsaXRUZXh0ID0gZWwuc3BsaXQoJzonKTtcclxuXHRcdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHRbc3BsaXRUZXh0WzBdXSA9IHNwbGl0VGV4dFsxXTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBTZWxlY3QyQWpheE9wdDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbihkYXRhLCBwYXJhbXMpIHtcclxuXHRcdFx0XHRcdHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHRzOiBkYXRhLml0ZW1zLFxyXG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0bW9yZTogcGFyYW1zLnBhZ2UgKiBQYWdpbmF0aW9uU2l6ZSA8IGRhdGEudG90YWxfY291bnQsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FjaGU6IHRydWUsXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRcdChTZWxlY3QyT3B0aW9ucy5taW5pbXVtSW5wdXRMZW5ndGggPSBNaW5pbXVtSW5wdXRMZW5naHQpO1xyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZXNjYXBlTWFya3VwID0gZnVuY3Rpb24obWFya3VwKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmIChjb25maWcuaXNNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubXVsdGlwbGUgPSBmYWxzZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChTZWxlY3RlZFZhbHVlICE9PSAnJykge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gSlNPTi5wYXJzZShTZWxlY3RlZFZhbHVlKTtcclxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbiA9IG5ldyBPcHRpb24oZGF0YS5WYWx1ZSwgZGF0YS5JZCwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuYXBwZW5kKG9wdGlvbikudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudCBTZWxlY3RTeXN0ZW0gKCR7V2lkZ2V0SWR9KTogU2VsZWN0ZWRWYWx1ZSBtdXN0IGJlIGEgdmFsaWQgSlNPTiFgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gMDtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IGNvbmZpZy5IYXNUYWdzO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jbG9zZU9uc2VsZWN0ID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICcyJykge1xyXG5cdFx0XHQvL1NlbGVjdDIgd2l0aCBDaGVja0JveFxyXG5cclxuXHRcdFx0dmFyIGlzQWxsU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0aWYgKCRXaWRnZXRJZGVudGlmaWVyWzBdLm9wdGlvbnMubGVuZ3RoID09PSAkV2lkZ2V0SWRlbnRpZmllclswXS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0aXNBbGxTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChXaWRnZXRJZCAhPSAnJykge1xyXG5cdFx0XHRcdG9wdGlvbiA9IG5ldyBPcHRpb24oJ1NlbGVjdCBBbGwnLCAnQWxsJywgdHJ1ZSwgaXNBbGxTZWxlY3RlZCk7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIucHJlcGVuZChvcHRpb24pO1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpLmFkZENsYXNzKCdTZWxlY3RlZEFsbCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY2xvc2VPblNlbGVjdCA9IGZhbHNlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0h0bWwgPSBmYWxzZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKEhhc1NlYXJjaCA9PT0gJ1RydWUnKSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gJC5mbi5zZWxlY3QyLmFtZC5yZXF1aXJlKCdTZWFyY2hMaWtlU2luZ2xlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnTXVsdGlwbGVTZWxlY3QnO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ011bHRpcGxlU2VsZWN0JztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGVtcGxhdGVTZWxlY3Rpb24gPSBmb3JtYXRSZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnNicpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBIdG1sT3B0aW9uc1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cdFx0XHRpZiAoY29uZmlnLmxvY2FsZSA9PT0gJ0FSJyB8fCBjb25maWcubG9jYWxlID09PSAnRkEnKSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZGlyID0gJ3J0bCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBkYXRhSHRtbE9wdGlvbiA9IFtdO1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0XHR2YXIgb3B0aW9uT2JqZWN0ID0ge1xyXG5cdFx0XHRcdFx0aWQ6ICQodGhpcykudmFsKCksXHJcblx0XHRcdFx0XHR0ZXh0OiAkKHRoaXMpLnRleHQoKSxcclxuXHRcdFx0XHRcdGh0bWw6ICQodGhpcykudGV4dCgpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZGF0YUh0bWxPcHRpb24ucHVzaChvcHRpb25PYmplY3QpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ2N1c3RvbVNlbGVjdCc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAnZHJvcGRvd25DdXN0b20nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kYXRhID0gZGF0YUh0bWxPcHRpb247XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmVzY2FwZU1hcmt1cCA9IGZ1bmN0aW9uKG1hcmt1cCkge1xyXG5cdFx0XHRcdHJldHVybiBtYXJrdXA7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoU2VsZWN0ZWRWYWx1ZSAhPSAnJykge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChTZWxlY3RlZFZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMScpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBUYWdDdXN0b21cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3RhZ0N1c3RvbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAndGFnQ3VzdG9tJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuVG9rZW5TZXBhcmF0b3MgPSBbJywnLCAnICddO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jcmVhdGVTZWFyY2hDaG9pY2UgPSBmdW5jdGlvbih0ZXJtLCBkYXRhKSB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0JChkYXRhKS5maWx0ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnRleHQubG9jYWxlQ29tcGFyZSh0ZXJtKSA9PT0gMDtcclxuXHRcdFx0XHRcdH0pLmxlbmd0aCA9PT0gMFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0aWQ6IHRlcm0sXHJcblx0XHRcdFx0XHRcdHRleHQ6IHRlcm0sXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICc1Jykge1xyXG5cdFx0XHQvLyBTZWxlY3QyIFRhZ011bHRpcGxlXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRhZ3MgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICd0YWdTeXN0ZW0nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ3RhZ1N5c3RlbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNyZWF0ZVRhZyA9IGZ1bmN0aW9uKHBhcmFtcykge1xyXG5cdFx0XHRcdHZhciB0ZXJtID0gJC50cmltKHBhcmFtcy50ZXJtKTtcclxuXHRcdFx0XHRpZiAodGVybSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0aWQ6ICcjJyArIHRlcm0sXHJcblx0XHRcdFx0XHR0ZXh0OiB0ZXJtLFxyXG5cdFx0XHRcdFx0bmV3VGFnOiB0cnVlLCAvLyBhZGQgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoSGFzU2VhcmNoID09PSAnRmFsc2UnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE9uVW5TZWxlY3RpbmdKUyAhPSAnJyB8fCBPblNlbGVjdGluZ0pTICE9ICcnKSB7XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyXHJcblx0XHRcdFx0LnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCd1bnNlbGVjdGluZycsIHRydWUpO1xyXG5cdFx0XHRcdFx0T25VblNlbGVjdGluZ0pTO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6c2VsZWN0aW5nJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0T25TZWxlY3RpbmdKUztcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignc2VsZWN0Om9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5kYXRhKCd1bnNlbGVjdGluZycpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlRGF0YSgndW5zZWxlY3RpbmcnKTtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6b3BlbicsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oJ3NlbGVjdDI6Y2xvc2UnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMicpIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHR2YXIgaWR3aWRnZXQgPSAnIycgKyBXaWRnZXRJZDtcclxuXHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0VW5zZWxlY3RlZElkID0gZS5wYXJhbXMuZGF0YS5pZDtcclxuXHRcdFx0XHRcdGlmIChVbnNlbGVjdGVkSWQgPT09ICdBbGwnKSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZEl0ZW1zID0gW107XHJcblx0XHRcdFx0XHRcdHZhciBhbGxPcHRpb25zID0gJChpZHdpZGdldCArICcgb3B0aW9uJyk7XHJcblx0XHRcdFx0XHRcdGFsbE9wdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZEl0ZW1zLnB1c2goJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChzZWxlY3RlZEl0ZW1zKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZE9wdGlvbnMgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdHZhciB0b3RhbE9wdGlvbnMgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb24nKS5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RlZE9wdGlvbnMgPT09IHRvdGFsT3B0aW9ucyAtIDEgJiYgJChpZHdpZGdldCArICcgPiAgb3B0aW9uOnNlbGVjdGVkOmZpcnN0LWNoaWxkJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgYWxsT3B0aW9ucyA9ICQoaWR3aWRnZXQgKyAnIG9wdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRcdGFsbE9wdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkSXRlbXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIudmFsKHNlbGVjdGVkSXRlbXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFVuc2VsZWN0ZWRJZCA9IGUucGFyYW1zLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRpZiAoVW5zZWxlY3RlZElkID09PSAnQWxsJykge1xyXG5cdFx0XHRcdFx0XHQkKGlkd2lkZ2V0ICsgJyA+IG9wdGlvbicpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldClcclxuXHRcdFx0XHRcdFx0XHQudmFsKCcnKVxyXG5cdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0Ly8kKGlkd2lkZ2V0ICsnID4gb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCBcInNlbGVjdGVkXCIpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldCArICcgPiBvcHRpb246Zmlyc3QtY2hpbGQnKS5yZW1vdmVBdHRyKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTaGlmdENvbnRhaW5lciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRsZXQgc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyO1xyXG5cdGxldCAkc2hpZnRDb250YWluZXJJZCA9ICQoKTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gc2hpZnRDb250YWluZXJJZCA9PiB7XHJcblxyXG5cdFx0Ly8gJCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcblx0XHQkc2hpZnRDb250YWluZXJJZCA9ICQoc2hpZnRDb250YWluZXJJZCk7XHJcblxyXG5cdFx0aGFzU2Nyb2xsQmFyKCk7XHJcblx0XHRoYW5kbGVTaGlmdFRhYmxlKCk7XHJcblxyXG5cdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyBcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0Ly8gXHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHQvLyB9LCAxNTAwKTtcclxuXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX19hcnJvdycpLm9mZignbW91c2Vkb3duJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmVkcmF3U2hpZnRUaW1lbGluZSgpO1xyXG5cdFx0XHR9LCAxNTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRjb25zdCBoYW5kbGVTaGlmdFRhYmxlID0gKCkgPT4ge1xyXG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xyXG5cdFx0XHR2YXIgJGVsRmxhZyA9ICQodGhpcykucGFyZW50KCkuZmluZCgnLkZsYWdMaW5lJyk7XHJcblx0XHRcdHZhciAkZWxGbGFnVGltZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnLkZsYWdMaW5lX3RpbWUnKTtcclxuXHRcdFx0dmFyICRjb2x1bW5GbGFnID0gJGVsRmxhZy5kYXRhKCdjb2x1bW4nKTtcclxuXHRcdFx0dmFyICRtaW51dGVzRmxhZyA9ICRlbEZsYWcuZGF0YSgnbWludXRlcycpO1xyXG5cdFx0XHR2YXIgJHNsb3RzID0gJCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykuZmluZCgnLlNoaWZ0Q2VsbENvbnRlbnQnKTtcclxuXHRcdFx0dmFyICRzbG90V2lkdGggPSBNYXRoLnJvdW5kKCRzbG90cy5lcSgwKS53aWR0aCgpKTtcclxuXHRcdFx0dmFyIG1pbnV0ZXNQb3NpdGlvbiA9ICgkbWludXRlc0ZsYWcgKiAkc2xvdFdpZHRoKSAvIDYwO1xyXG5cclxuXHRcdFx0Ly8gaGFuZGxlIGN1cnJlbnQgdGltZSBmbG9nIGhvcml6b250YWwgcG9zaXRpb25pbmdcclxuXHRcdFx0dmFyIHNsb3RzUG9zaXRpb24gPSBbXTtcclxuXHRcdFx0JHNsb3RzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xyXG5cdFx0XHRcdHNsb3RzUG9zaXRpb24ucHVzaCgkKHRoaXMpLnBvc2l0aW9uKCkubGVmdCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkZWxGbGFnLmNzcygnbGVmdCcsIHNsb3RzUG9zaXRpb25bJGNvbHVtbkZsYWcgLSAxXSArIG1pbnV0ZXNQb3NpdGlvbik7XHJcblx0XHRcdCRlbEZsYWcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdGlmICgkY29sdW1uRmxhZyA9PT0gJHNsb3RzLmxlbmd0aCkge1xyXG5cdFx0XHRcdCRlbEZsYWdUaW1lLmNzcyh7XHJcblx0XHRcdFx0XHRyaWdodDogJzFweCcsXHJcblx0XHRcdFx0XHRsZWZ0OiAnYXV0bycsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGhhbmRsZSBjZWxscyB0aGF0IG1pZ2h0IHNwYW4gb3ZlciBzZXZlcmFsIHNsb3RzXHJcblx0XHRcdCQodGhpcykuZmluZCgnLlNoaWZ0Q2FyZCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbFJvdykge1xyXG5cdFx0XHRcdHZhciByb3dIYXNTcGFubmVkQ2VsbCA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoZWxSb3cpLmZpbmQoJy5TaGlmdENlbGxDb250ZW50JykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsQ2VsbCkge1xyXG5cdFx0XHRcdFx0dmFyIGNvbHNwYW4gPSAkKGVsQ2VsbCkuZGF0YSgnY29sc3BhbicpO1xyXG5cdFx0XHRcdFx0aWYgKGNvbHNwYW4gPT09IHNsb3RzUG9zaXRpb24ubGVuZ3RoIHx8IHJvd0hhc1NwYW5uZWRDZWxsKSB7XHJcblx0XHRcdFx0XHRcdCQoZWxDZWxsKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRcdFx0XHRcdGZsZXg6ICcxIDEgYXV0bycsXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjb2xzcGFuID4gMSkge1xyXG5cdFx0XHRcdFx0XHRyb3dIYXNTcGFubmVkQ2VsbCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdCQoZWxDZWxsKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRcdFx0XHRcdGZsZXg6ICdub25lJyxcclxuXHRcdFx0XHRcdFx0XHR3aWR0aDogKyhzbG90c1Bvc2l0aW9uW2NvbHNwYW5dIC0gc2xvdHNQb3NpdGlvblswXSkgKyAncHgnLFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBoYW5kbGUgaG9yaXpvbnRhbCBzY3JvbGwgYmVoYXZpb3JcclxuXHRcdFx0aWYgKGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGgpIHtcclxuXHRcdFx0XHQkKGVsKS53aWR0aChlbC5zY3JvbGxXaWR0aCk7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykud2lkdGgoZWwuc2Nyb2xsV2lkdGgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoZWwpLndpZHRoKCdhdXRvJyk7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykud2lkdGgoJ2F1dG8nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaGFzU2Nyb2xsQmFyID0gKCkgPT4ge1xyXG5cdFx0dmFyICRTY3JvbGxhYmxlRGl2ID0gJHNoaWZ0Q29udGFpbmVySWQuZmluZCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXInKTtcclxuXHRcdGlmICgkc2hpZnRDb250YWluZXJJZC5maW5kKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0aWYgKCRTY3JvbGxhYmxlRGl2LmdldCgwKS5zY3JvbGxIZWlnaHQgPiAkU2Nyb2xsYWJsZURpdi5oZWlnaHQoKSkge1xyXG5cdFx0XHRcdHZhciAkbGFzdENlbGwgPSAkc2hpZnRDb250YWluZXJJZC5maW5kKCcuSXNUaW1lcjpsYXN0LWNoaWxkJyk7XHJcblx0XHRcdFx0JGxhc3RDZWxsLmNzcygncGFkZGluZy1yaWdodCcsICc3cHgnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlZHJhd1NoaWZ0VGltZWxpbmUgPSAoKSA9PiB7XHJcblx0XHRjbGVhclRpbWVvdXQoc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyKTtcclxuXHRcdHNoaWZ0VGltZWxpbmVSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRoYXNTY3JvbGxCYXIoKTtcclxuXHRcdFx0aGFuZGxlU2hpZnRUYWJsZSgpO1xyXG5cdFx0fSwgNDAwKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjaGVja1Njcm9sbCA9ICgpID0+IHtcclxuXHRcdHZhciBoQ29udGVudCA9ICQoJy5Db250ZW50JykuaGVpZ2h0KCk7XHJcblx0XHR2YXIgaFdpbmRvdyA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcblx0XHRpZiAoaENvbnRlbnQgPiBoV2luZG93KSByZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0Y2hlY2tTY3JvbGwsXHJcblx0XHRyZWRyYXdTaGlmdFRpbWVsaW5lXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuXHJcbiQod2luZG93KS5vZmYoJ3Jlc2l6ZS5HZW5lcmljR2FsbGVyeScpLm9uKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcclxuXHJcblx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIucmVkcmF3U2hpZnRUaW1lbGluZSk7XHJcblxyXG5cdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCAxMDAwKTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdH0sIDE1MDApO1xyXG5cclxufSk7XHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCEhJCgnLlNoaWZ0Q29udGFpbmVyJykubGVuZ3RoKSB7XHJcblxyXG5cdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5yZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblx0XHR9LCA0MDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9LCA2MDApO1xyXG5cclxuXHRcdCQoJy5uYXZpZ2F0aW9uLWNvbnRyb2wtaXRlbScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL1ZlcmlmeSB0aGUgc2Nyb2xsIGlmIHRvb2x0aXAgb3BlbmVkXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICgkKCcudG9vbHRpcHN0ZXItYmFzZScpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdFx0JCgnLnRvb2x0aXBzdGVyLWJhc2UnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcclxuXHRcdFx0fSwgNDAwKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdH0sIDYwMCk7XHJcblxyXG5cdFx0XHQvLyBTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIucmVkcmF3U2hpZnRUaW1lbGluZTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG59KTsiLCIvKiBDb21wb25lbnQgU2lkZU1lbnVTdHJ1Y3R1cmUgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNsYXNzIFNpZGVNZW51IHtcclxuXHRcdGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG5cdFx0XHR0aGlzLm9wdGlvbnMgPSB7XHJcblx0XHRcdFx0Li4uY29uZmlnXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLm9uQ29tcG9uZW50SW5pdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldE1haW5NZW51V2lkdGgoKSB7XHJcblx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCAkc2lkZUJhcklmcmFtZSA9ICQoJy5MYXlvdXRCYXNlLWlmcmFtZXNpZGViYXIubm90RXhwYW5kYWJsZScpO1xyXG5cdFx0XHRcdGNvbnN0ICRsYXlvdXRIYXNUYWJzID0gJCgnLkxheW91dEJhc2UtLXdpdGhUYWJzJyk7XHJcblxyXG5cdFx0XHRcdGlmICgkc2lkZUJhcklmcmFtZS5sZW5ndGggJiYgISRsYXlvdXRIYXNUYWJzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgJG1haW5NZW51ID0gJCgnLkxheW91dEJhc2UtTWFpbk1lbnUnKTtcclxuXHRcdFx0XHRcdCRtYWluTWVudS5jc3Moe1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogJ2NhbGMoMTAwJSAtIDI2MnB4KSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b3BlbkNsb3NlTWVudSh0b09wZW4pIHtcclxuXHRcdFx0aWYgKHRvT3Blbikge1xyXG5cdFx0XHRcdHRoaXMuJGNvbXBvbmVudC5hZGRDbGFzcygnU2lkZU1lbnUtLW9wZW4nKTtcclxuXHJcblx0XHRcdFx0JCgnLkxheW91dEJhc2UtaWZyYW1lc2lkZWJhcicpLmNzcyh7XHJcblx0XHRcdFx0XHR6SW5kZXg6IDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRjb21wb25lbnQucmVtb3ZlQ2xhc3MoJ1NpZGVNZW51LS1vcGVuJyk7XHJcblxyXG5cdFx0XHRcdCQoJy5MYXlvdXRCYXNlLWlmcmFtZXNpZGViYXInKS5jc3Moe1xyXG5cdFx0XHRcdFx0ekluZGV4OiA3MFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Db21wb25lbnRJbml0KCkge1xyXG5cdFx0XHR0aGlzLnNldE1haW5NZW51V2lkdGgoKTtcclxuXHJcblx0XHRcdHRoaXMuJGNvbXBvbmVudCA9ICQoYCMke3RoaXMub3B0aW9ucy53aWRnZXRJZH1gKTtcclxuXHRcdFx0dGhpcy4kdHJpZ2dlciA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCcuU2lkZU1lbnVfX1RyaWdnZXInKTtcclxuXHRcdFx0dGhpcy4kc2hpZWxkID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5TaWRlTWVudV9fU2hpZWxkJyk7XHJcblx0XHRcdHRoaXMuJGNsb3NlQnV0dG9uID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5TaWRlTWVudV9fTWVudUNsb3NlJyk7XHJcblx0XHRcdHRoaXMuJHRhYkl0ZW0gPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLlNpZGVNZW51X19UYWJJdGVtcyAuTWVudUl0ZW0nKTtcclxuXHRcdFx0dGhpcy4kbWVudUl0ZW0gPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLlNpZGVNZW51X19NZW51SXRlbXMgLk1lbnVJdGVtJyk7XHJcblx0XHRcdHRoaXMuJHN1Ykl0ZW0gPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLlNpZGVNZW51X19NZW51SXRlbXMgLk1lbnVJdGVtX3N1Ykl0ZW1zJyk7XHJcblxyXG5cclxuXHRcdFx0dGhpcy4kaWZyYW1lQ29udGFpbmVyID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5pZnJhbWVDb250YWluZXInKTtcclxuXHRcdFx0dGhpcy4kaWZyYW1lQ29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxkcy1yaW5nXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nKTtcclxuXHRcdFx0dGhpcy4kaWZyYW1lQ29udGFpbmVyLmZpbmQoJ2lmcmFtZScpLmxvYWQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuJGlmcmFtZUNvbnRhaW5lci5maW5kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblx0XHRcdHRoaXMuJHRyaWdnZXIub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5vcGVuQ2xvc2VNZW51KHRydWUpKTtcclxuXHRcdFx0dGhpcy4kc2hpZWxkLm9uKCdjbGljaycsICgpID0+IHRoaXMub3BlbkNsb3NlTWVudShmYWxzZSkpO1xyXG5cdFx0XHR0aGlzLiRjbG9zZUJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9wZW5DbG9zZU1lbnUoZmFsc2UpKTtcclxuXHJcblx0XHRcdHRoaXMuJHRhYkl0ZW0ub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHRcdGNvbnN0ICRsaW5rID0gJHRhcmdldC5maW5kKCcuTWVudUl0ZW1fbGFiZWwgYScpO1xyXG5cclxuXHRcdFx0XHRpZiAoJGxpbmsubGVuZ3RoKSAkbGluay5nZXQoMCkuY2xpY2soKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLiRtZW51SXRlbS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcblx0XHRcdFx0aWYgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdFx0XHRjb25zdCAkc3ViSXRlbXMgPSAkdGFyZ2V0LmZpbmQoJy5NZW51SXRlbV9zdWJJdGVtcycpO1xyXG5cdFx0XHRcdGNvbnN0ICRsaW5rID0gJHRhcmdldC5maW5kKCcuTWVudUl0ZW1fbGFiZWwgYScpO1xyXG5cclxuXHRcdFx0XHRpZiAoJGxpbmsubGVuZ3RoKSAkbGluay5nZXQoMCkuY2xpY2soKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kY29tcG9uZW50XHJcblx0XHRcdFx0XHQuZmluZCgnLlNpZGVNZW51X19NZW51SXRlbXMgLmFjdGl2ZScpXHJcblx0XHRcdFx0XHQubm90KCR0YXJnZXQpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHR0aGlzLiRjb21wb25lbnRcclxuXHRcdFx0XHRcdC5maW5kKCcuU2lkZU1lbnVfX01lbnVJdGVtcyAuc2hvdycpXHJcblx0XHRcdFx0XHQubm90KCR0YXJnZXQpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHJcblx0XHRcdFx0JHRhcmdldC50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0JHN1Ykl0ZW1zLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy4kc3ViSXRlbS5vbignY2xpY2snLCBldmVudCA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKSk7XHJcblxyXG5cdFx0XHR0aGlzLiRjb21wb25lbnRcclxuXHRcdFx0XHQuZmluZCgnLlNpZGVNZW51X19UYWJJdGVtcyA+IGRpdjplbXB0eScpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmhpZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2lkZU1lbnUoY29uZmlnKSk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TaWRlTWVudSA9IHtcclxuXHRcdGNyZWF0ZVxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgSVNpZGViYXIgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2lkZWJhcihjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNpZGViYXIud2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0fTtcclxuXHJcblx0dmFyIGNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TaWRlYmFyLndpZGdldElkXS5jbG9zZSgpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTaWRlYmFyID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuaXNFeHBhbmRhYmxlID0gY29uZmlnLmlzRXhwYW5kYWJsZTtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyJyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyTWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuSVNpZGViYXItbWVudScpO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnVJdGVtID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TaWRlYmFyTWVudUl0ZW0nKTtcclxuXHRcdHRoaXMuJHNpZGViYXJTaGllbGQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLXNoaWVsZCcpO1xyXG5cdFx0dGhpcy4kc2lkZWJhckNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJz4gZGl2JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdQSCcpICYmICQodGhpcykudGV4dCgpID09PSAnJykge1xyXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcclxuXHRcdGlmICghdGhpcy5pc0V4cGFuZGFibGUpIHtcclxuXHRcdFx0dGhpcy5vcGVuTWVudUl0ZW0oMCk7XHJcblx0XHR9XHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC4kKCcuTGF5b3V0QmFzZS1pZnJhbWVzaWRlYmFyIC5sZHMtcmluZycpLmZhZGVPdXQoKTtcclxuXHRcdFx0aWYgKCF0aGlzLmlzRXhwYW5kYWJsZSkge1xyXG5cdFx0XHRcdCQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdOnZpc2libGUnKS5lcSgwKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQod2luZG93KS51bmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LiQoJy5MYXlvdXRCYXNlLWlmcmFtZXNpZGViYXIgLmxkcy1yaW5nJykuZmFkZU91dCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2lkZWJhci5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJHNpZGViYXJNZW51Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRpZiAoIV90aGlzLiRzaWRlYmFyLmhhc0NsYXNzKCdvcGVuJykpIHtcclxuXHRcdFx0XHRfdGhpcy5vcGVuTWVudUl0ZW0oMCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnVJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHNlbGVjdGVkUG9zaXRpb24gPSAkKHRoaXMpLmluZGV4KCk7XHJcblx0XHRcdF90aGlzLm9wZW5NZW51SXRlbShzZWxlY3RlZFBvc2l0aW9uKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhclNoaWVsZC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJHNpZGViYXIub24oJ2NsaWNrJywgJy5TZWFyY2hTaWRlQmFyRmllbGRzIC5CdXR0b25Hcm91cF9idXR0b246Zmlyc3QtY2hpbGQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLiRzaWRlYmFyLmZpbmQoJy5GaWVsZHNTbGlkZXInKS5hZGRDbGFzcygnVGFiMScpLnJlbW92ZUNsYXNzKCdUYWIyJyk7XHJcblx0XHRcdF90aGlzLnNldEZpZWxkRm9jdXMoX3RoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmVxKDApKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhci5vbignY2xpY2snLCAnLlNlYXJjaFNpZGVCYXJGaWVsZHMgLkJ1dHRvbkdyb3VwX2J1dHRvbjpsYXN0LWNoaWxkJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRfdGhpcy4kc2lkZWJhci5maW5kKCcuRmllbGRzU2xpZGVyJykuYWRkQ2xhc3MoJ1RhYjInKS5yZW1vdmVDbGFzcygnVGFiMScpO1xyXG5cdFx0XHRfdGhpcy5zZXRGaWVsZEZvY3VzKF90aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTaWRlYmFyLnByb3RvdHlwZS5vcGVuTWVudUl0ZW0gPSBmdW5jdGlvbiAoc2VsZWN0ZWRQb3NpdGlvbikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJHNpZGViYXIuZmluZCgnLlNpZGViYXJNZW51SXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5lcShzZWxlY3RlZFBvc2l0aW9uKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyLmZpbmQoJy5JU2lkZWJhci1jb250ZW50ID4gLklTaWRlYmFyLWNvbnRlbnQtcGFuZWwnKS5oaWRlKCkuZXEoc2VsZWN0ZWRQb3NpdGlvbikuc2hvdygpO1xyXG5cdFx0dGhpcy4kc2lkZWJhci5hZGRDbGFzcygnb3BlbicpO1xyXG5cdFx0aWYgKHdpbmRvdy5wYXJlbnQubGVuZ3RoICYmIHRoaXMuaXNFeHBhbmRhYmxlKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uub3BlblNpZGViYXJJZnJhbWUoMCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnLlRleHRJbnB1dDp2aXNpYmxlJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLnNldEZpZWxkRm9jdXModGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnLlRleHRJbnB1dDp2aXNpYmxlJykuZXEoMCkpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHdpbmRvdy5wYXJlbnQuJCgnLnNlbGVjdDItY29udGFpbmVyLS1vcGVuJykubGVuZ3RoKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuJCgnLnNlbGVjdDItaGlkZGVuLWFjY2Vzc2libGUnKS5zZWxlY3QyKCdjbG9zZScpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNpZGViYXIucHJvdG90eXBlLnNldEZpZWxkRm9jdXMgPSBmdW5jdGlvbiAoJGlucHV0KSB7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCRpbnB1dC5jbGljaygpLnNlbGVjdCgpO1xyXG5cdFx0fSwgMjUwKTtcclxuXHR9O1xyXG5cclxuXHRTaWRlYmFyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRpZiAod2luZG93LnBhcmVudC5sZW5ndGgpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5jbG9zZVNpZGViYXJJZnJhbWUoMCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0V4cGFuZGFibGUpIHtcclxuXHRcdFx0dGhpcy4kc2lkZWJhci5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG5cdFx0XHR0aGlzLiRzaWRlYmFyLmZpbmQoJy5TaWRlYmFyTWVudUl0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdHRoaXMuJHNpZGViYXIuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQgPiAuSVNpZGViYXItY29udGVudC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2lkZWJhciA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0Y2xvc2U6IGNsb3NlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgU3Bpbm5lckhvcml6b250YWwgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlNwaW5uZXJIb3Jpem9udGFsID0ge1xyXG5cdGNyZWF0ZTogY29uZmlnID0+IHtcclxuXHRcdGNvbnN0ICRpbnB1dCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH0gaW5wdXRgKTtcclxuXHJcblx0XHQkaW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0IHZhbCA9IE1hdGguYWJzKHBhcnNlSW50KHRoaXMudmFsdWUsIDEwKSB8fCArY29uZmlnLm1pblZhbHVlKTtcclxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbCA+ICtjb25maWcubWF4VmFsdWUgPyArY29uZmlnLm1heFZhbHVlIDogdmFsO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRpbmNyZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnRJZCwgbWluVmFsdWUsIG1heFZhbHVlLCB0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdHZhciBfZWxlbWVudCA9ICQoZWxlbWVudElkKVxyXG5cdFx0XHQuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXHJcblx0XHRcdC5maXJzdCgpO1xyXG5cdFx0aWYgKF9lbGVtZW50LnZhbCgpID09IHVuZGVmaW5lZCB8fCBfZWxlbWVudC52YWwoKSA9PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSkpIHtcclxuXHRcdFx0X2VsZW1lbnQudmFsKG1pblZhbHVlKTtcclxuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPCBtYXhWYWx1ZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnZhbChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSArIDEpO1xyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLk1pbnVzJylcclxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA+PSBtYXhWYWx1ZSkge1xyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuUGx1cycpXHJcblx0XHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGVjcmVtZW50OiBmdW5jdGlvbihlbGVtZW50SWQsIG1pblZhbHVlLCB0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdHZhciBfZWxlbWVudCA9ICQoZWxlbWVudElkKVxyXG5cdFx0XHQuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXHJcblx0XHRcdC5maXJzdCgpO1xyXG5cdFx0aWYgKF9lbGVtZW50LnZhbCgpID09IHVuZGVmaW5lZCB8fCBfZWxlbWVudC52YWwoKSA9PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSkpIHtcclxuXHRcdFx0X2VsZW1lbnQudmFsKG1pblZhbHVlKTtcclxuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPiBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnZhbChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSAtIDEpO1xyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLlBsdXMnKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpIDw9IG1pblZhbHVlKSB7XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5NaW51cycpXHJcblx0XHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTcGlubmVyVmVydGljYWwgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICRtaW51c1ZlcnRpY2FsID0gJChgIyR7Y29uZmlnLndpZGdldElkfWApLmZpbmQoJy5NaW51c1ZlcnRpY2FsJyk7XHJcblx0XHRcdGNvbnN0ICRpbnB1dFNwaW5uZXIgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9IC5TcGlubmVySW5wdXRWZXJ0aWNhbCBpbnB1dGApO1xyXG5cclxuXHRcdFx0JGlucHV0U3Bpbm5lci5vbignYmx1ciBrZXl1cCBpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0Y29uc3QgY3VycmVudElucHV0VmFsdWUgPSAkaW5wdXRTcGlubmVyLnZhbCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29uZmlnLm51bWJlckxpc3QgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInKSB7XHJcblx0XHRcdFx0XHRjb25zdCBpbnB1dFZhbHVlSW50ID0gcGFyc2VJbnQoY3VycmVudElucHV0VmFsdWUpO1xyXG5cdFx0XHRcdFx0Y29uc3QgYXJyYXlUb1NwaW4gPSBjb25maWcubnVtYmVyTGlzdDtcclxuXHRcdFx0XHRcdGNvbnN0ICRlcnJvck1lc3NhZ2UgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9IC5TcGlubmVyRXJyb3JNZXNzYWdlYCk7XHJcblxyXG5cdFx0XHRcdFx0JGVycm9yTWVzc2FnZS5jc3MoJ2Rpc3BsYXknLCBhcnJheVRvU3Bpbi5pbmRleE9mKGlucHV0VmFsdWVJbnQpID09PSAtMSA/ICdibG9jaycgOiAnbm9uZScpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnRJbnB1dFZhbHVlIDwgY29uZmlnLm1pblZhbHVlKSAkbWludXNWZXJ0aWNhbC5hZGRDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHRcdFx0ZWxzZSAkbWludXNWZXJ0aWNhbC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKCRpbnB1dFNwaW5uZXIudmFsKCkgPD0gY29uZmlnLm1pblZhbHVlKSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29uZmlnLm51bWJlckxpc3QgJiYgJGlucHV0U3Bpbm5lci52YWwoKSA9PT0gJycpIHtcclxuXHRcdFx0XHRsZXQgY3VycmVudE51bWJlciA9IDA7XHJcblx0XHRcdFx0Y29uc3QgYXJyYXlUb1NwaW4gPSBjb25maWcubnVtYmVyTGlzdC5zcGxpdCgnLCcpO1xyXG5cclxuXHRcdFx0XHQkaW5wdXRTcGlubmVyLnZhbChhcnJheVRvU3BpbltjdXJyZW50TnVtYmVyXSk7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29uZmlnLmlzQ3Vyc29yT25Gb2N1cykge1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5vbignZm9jdXMnLCBgIyR7Y29uZmlnLmlucHV0SUR9IGlucHV0YCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dGhhdC5mb2N1cygpO1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsID0gdGhhdC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0dGhhdC52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0XHR0aGF0LnZhbHVlID0gdmFsO1xyXG5cdFx0XHRcdFx0fSwgMSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb25maWcuaXNJbnB1dEVtcHR5KSB7XHJcblx0XHRcdFx0JGlucHV0U3Bpbm5lci5hdHRyKCd2YWx1ZScsICcnKTtcclxuXHRcdFx0XHQkbWludXNWZXJ0aWNhbC5hZGRDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGluY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCwgbGlzdFRvc3BpbiA9IFtdKSA9PiB7XHJcblx0XHRjb25zdCAkc3Bpbm5lciA9ICQoZWxlbWVudElkKTtcclxuXHRcdGxldCAkaW5wdXQgPSAkc3Bpbm5lci5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLmZpcnN0KCk7XHJcblxyXG5cdFx0dmFyIGZvcmNlSW50ZWdlciA9ICQoZWxlbWVudElkKS5kYXRhKCdmb3JjZWludGVnZXInKSA9PT0gJ1RydWUnID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoJGlucHV0LnZhbCgpKTtcclxuXHRcdHZhciBpbmNyZW1lbnRVbml0ID0gMTtcclxuXHRcdHZhciBpc0RlY2ltYWxzID0gY3VycmVudFZhbHVlICUgMSAhPSAwO1xyXG5cdFx0dmFyIGFycmF5dG9zcGluID0gbGlzdFRvc3BpbjtcclxuXHJcblx0XHRjb25zdCAkbWludXNWZXJ0aWNhbCA9ICQoZWxlbWVudElkKS5maW5kKCcuTWludXNWZXJ0aWNhbCcpO1xyXG5cdFx0Y29uc3QgJHBsdXNWZXJ0aWNhbCA9ICQoZWxlbWVudElkKS5maW5kKCcuUGx1c1ZlcnRpY2FsJyk7XHJcblxyXG5cdFx0JG1pbnVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdGlmIChhcnJheXRvc3Bpbi5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRQb3NpdGlvbiA9IGFycmF5dG9zcGluLmluZGV4T2YocGFyc2VJbnQoJGlucHV0LnZhbCgpKSk7XHJcblx0XHRcdHZhciBtYXhpbXVtVG9TcGluID0gYXJyYXl0b3NwaW4ubGFzdEluZGV4T2YoYXJyYXl0b3NwaW4uc2xpY2UoLTEpWzBdKTtcclxuXHJcblx0XHRcdCRwbHVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdFx0aWYgKG1heGltdW1Ub1NwaW4gLSAxID09PSBjdXJyZW50UG9zaXRpb24pIHtcclxuXHRcdFx0XHRjdXJyZW50UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb24gKyAxO1xyXG5cdFx0XHRcdCRpbnB1dC52YWwoYXJyYXl0b3NwaW5bY3VycmVudFBvc2l0aW9uXSk7XHJcblxyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpICRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRpZiAodHJpZ2dlck9uSW5wdXQpICRpbnB1dC50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG1heGltdW1Ub1NwaW4gPT09IGN1cnJlbnRQb3NpdGlvbikge1xyXG5cdFx0XHRcdGN1cnJlbnRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbiAlIG1heGltdW1Ub1NwaW47XHJcblx0XHRcdFx0JGlucHV0LnZhbChhcnJheXRvc3BpbltjdXJyZW50UG9zaXRpb25dKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGN1cnJlbnRQb3NpdGlvbiA9IChjdXJyZW50UG9zaXRpb24gKyAxKSAlIG1heGltdW1Ub1NwaW47XHJcblx0XHRcdFx0JGlucHV0LnZhbChhcnJheXRvc3BpbltjdXJyZW50UG9zaXRpb25dKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY3VycmVudFBvc2l0aW9uID09PSBtYXhpbXVtVG9TcGluKSAkcGx1c1ZlcnRpY2FsLmFkZENsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdFx0aWYgKGN1cnJlbnRQb3NpdGlvbiA9PT0gMCkgJG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdFx0JHNwaW5uZXIuZmluZCgnLlNwaW5uZXJFcnJvck1lc3NhZ2UnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSA8IG1pblZhbHVlKSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRtaW51c1ZlcnRpY2FsLnJlbW92ZUNsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFmb3JjZUludGVnZXIgJiYgaXNEZWNpbWFscykgaW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50VmFsdWUgPT09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSkpIHtcclxuXHRcdFx0XHQkaW5wdXQudmFsKG1pblZhbHVlKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkgPCBtYXhWYWx1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMCAmJiAhZm9yY2VJbnRlZ2VyKSBpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xyXG5cclxuXHRcdFx0XHRcdCRpbnB1dC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlICsgaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xyXG5cclxuXHRcdFx0XHRcdHRyaWdnZXJFdmVudHMoJGlucHV0LCB0cmlnZ2VyT25DaGFuZ2UsIHRyaWdnZXJPbklucHV0KTtcclxuXHJcblx0XHRcdFx0XHQkbWludXNWZXJ0aWNhbC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkcGx1c1ZlcnRpY2FsLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjaGVja0Rpc2FibGVkU3RhdHVzKGVsZW1lbnRJZCwgcGFyc2VGbG9hdCgkaW5wdXQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IGRlY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCwgbGlzdFRvc3BpbiA9IFtdKSA9PiB7XHJcblx0XHRjb25zdCAkc3Bpbm5lciA9ICQoZWxlbWVudElkKTtcclxuXHRcdGNvbnN0ICRpbnB1dCA9ICRzcGlubmVyLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykuZmlyc3QoKTtcclxuXHJcblx0XHRsZXQgZm9yY2VJbnRlZ2VyID0gJChlbGVtZW50SWQpLmRhdGEoJ2ZvcmNlaW50ZWdlcicpID09PSAnVHJ1ZScgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRsZXQgY3VycmVudFZhbHVlID0gcGFyc2VGbG9hdCgkaW5wdXQudmFsKCkpO1xyXG5cdFx0bGV0IGluY3JlbWVudFVuaXQgPSAxO1xyXG5cdFx0bGV0IGlzRGVjaW1hbHMgPSBjdXJyZW50VmFsdWUgJSAxICE9IDA7XHJcblx0XHRsZXQgYXJyYXl0b3NwaW4gPSBsaXN0VG9zcGluO1xyXG5cclxuXHRcdGNvbnN0ICRtaW51c1ZlcnRpY2FsID0gJChlbGVtZW50SWQpLmZpbmQoJy5NaW51c1ZlcnRpY2FsJyk7XHJcblx0XHRjb25zdCAkcGx1c1ZlcnRpY2FsID0gJChlbGVtZW50SWQpLmZpbmQoJy5QbHVzVmVydGljYWwnKTtcclxuXHJcblx0XHRpZiAoYXJyYXl0b3NwaW4ubGVuZ3RoKSB7XHJcblx0XHRcdGxldCBjdXJyZW50UG9zaXRpb24gPSBhcnJheXRvc3Bpbi5pbmRleE9mKHBhcnNlSW50KCRpbnB1dC52YWwoKSkpO1xyXG5cdFx0XHRsZXQgbWF4aW11bVRvU3BpbiA9IGFycmF5dG9zcGluLmxhc3RJbmRleE9mKGFycmF5dG9zcGluLnNsaWNlKC0xKVswXSk7XHJcblxyXG5cdFx0XHRjdXJyZW50UG9zaXRpb24gPSAobWF4aW11bVRvU3BpbiArIGN1cnJlbnRQb3NpdGlvbiAtIDEpICUgbWF4aW11bVRvU3BpbjtcclxuXHJcblx0XHRcdCRwbHVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRQb3NpdGlvbiA9PSAwKSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHRcdCRpbnB1dC52YWwoYXJyYXl0b3NwaW5bMF0pO1xyXG5cclxuXHRcdFx0XHR0cmlnZ2VyRXZlbnRzKCRpbnB1dCwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHRcdCRpbnB1dC52YWwoYXJyYXl0b3NwaW5bY3VycmVudFBvc2l0aW9uXSk7XHJcblxyXG5cdFx0XHRcdHRyaWdnZXJFdmVudHMoJGlucHV0LCB0cmlnZ2VyT25DaGFuZ2UsIHRyaWdnZXJPbklucHV0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHNwaW5uZXIuZmluZCgnLlNwaW5uZXJFcnJvck1lc3NhZ2UnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKCFmb3JjZUludGVnZXIgJiYgaXNEZWNpbWFscykgaW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50VmFsdWUgPT09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSkpIHtcclxuXHRcdFx0XHQkaW5wdXQudmFsKG1pblZhbHVlKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkgPiBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMSAmJiAhZm9yY2VJbnRlZ2VyKSBpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xyXG5cclxuXHRcdFx0XHRcdCRpbnB1dC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlIC0gaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xyXG5cclxuXHRcdFx0XHRcdHRyaWdnZXJFdmVudHMoJGlucHV0LCB0cmlnZ2VyT25DaGFuZ2UsIHRyaWdnZXJPbklucHV0KTtcclxuXHJcblx0XHRcdFx0XHQkcGx1c1ZlcnRpY2FsLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRtaW51c1ZlcnRpY2FsLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjaGVja0Rpc2FibGVkU3RhdHVzKGVsZW1lbnRJZCwgcGFyc2VGbG9hdCgkaW5wdXQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHRyaWdnZXJFdmVudHMgPSAoaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpID0+IHtcclxuXHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0aWYgKHRyaWdnZXJPbklucHV0KSBpbnB1dC50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGNoZWNrRGlzYWJsZWRTdGF0dXMgPSAoZWxlbWVudElkLCB2YWx1ZVRvQ2hlY2ssIG1pblZhbHVlLCBtYXhWYWx1ZSkgPT4ge1xyXG5cdFx0aWYgKHZhbHVlVG9DaGVjayA8PSBtaW5WYWx1ZSkge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHZhbHVlVG9DaGVjayA+PSBtYXhWYWx1ZSkge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0LmZpbmQoJ2EuUGx1c1ZlcnRpY2FsJylcclxuXHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU3Bpbm5lclZlcnRpY2FsID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0aW5jcmVtZW50LFxyXG5cdFx0ZGVjcmVtZW50LFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFNwbGl0QnV0dG9uICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTcGxpdEJ1dHRvbihjb25maWcpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTcGxpdEJ1dHRvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRidXR0b24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWJ1dHRvbicpO1xyXG5cdFx0dGhpcy4kYnV0dG9uTGluayA9IHRoaXMuJGJ1dHRvbi5maW5kKCc+IGEnKTtcclxuXHRcdHRoaXMuJHRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLXRyaWdnZXInKTtcclxuXHRcdHRoaXMuJGFjdGlvbnMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWFjdGlvbnMnKTtcclxuXHRcdGlmICghIXRoaXMuJGFjdGlvbnMudGV4dCgpKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCc+IC5TcGxpdEJ1dHRvbicpLmFkZENsYXNzKCdoYXNUcmlnZ2VyJyk7XHJcblx0XHRcdHRoaXMuYnVpbGRBY3Rpb25zVHJpZ2dlcigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNwbGl0QnV0dG9uLnByb3RvdHlwZS5idWlsZEFjdGlvbnNUcmlnZ2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGNsYXNzTGlzdCA9IHRoaXMuJGJ1dHRvbkxpbmtbMF0uY2xhc3NMaXN0LnZhbHVlO1xyXG5cdFx0dGhpcy4kdHJpZ2dlci5hZGRDbGFzcyhjbGFzc0xpc3QpO1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gaW5zaWRlIGEgZG9jdW1lbnQgcmVhZHkgZHVlIHRvIHNhcHBoaXJlIHBvcHVwIGJpbmRlZCBldmVudHNcclxuXHRcdFx0aWYgKCFfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKSB7XHJcblx0XHRcdFx0X3RoaXMuJHRyaWdnZXIudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0YXJyb3c6IHRydWUsXHJcblx0XHRcdFx0XHRjb250ZW50OiAkKCc8c2VjdGlvbi8+JykuYXBwZW5kKF90aGlzLiRhY3Rpb25zLmNsb25lKHRydWUpKSxcclxuXHRcdFx0XHRcdHRyaWdnZXI6IF90aGlzLmNvbmZpZy50cmlnZ2VyRXZlbnQsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogX3RoaXMuY29uZmlnLnBvc2l0aW9uLFxyXG5cdFx0XHRcdFx0bWF4V2lkdGg6IF90aGlzLmNvbmZpZy5tYXhXaWR0aCxcclxuXHRcdFx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItc3BsaXRidXR0b24gUGFkZGluZy0nICsgX3RoaXMuY29uZmlnLnBhZGRpbmcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0X3RoaXMuJGFjdGlvbnMucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TcGxpdEJ1dHRvbiA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwidmFyIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG52YXIgc3RvcHRpbWVyID0gdHJ1ZTtcclxudmFyIG15VGltb3V0ICA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBvbktleWRvd25GdW5jdGlvbigpIHtcclxuICAgIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG4gIFxyXG4gICAgc3RvcHRpbWVyPXRydWU7XHJcbiAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgIG15VGltb3V0ID0gbnVsbDtcclxuICB9O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIG9uS2V5VXBGdW5jdGlvbihlbGVtZW50VG9DbGljaykge1xyXG4gIHN0b3B0aW1lciA9IGZhbHNlO1xyXG4gIFxyXG4gIGlmKG1pbGlzZWNvbmRwYXNzZWQgPT0gMCAmJiBteVRpbW91dD09bnVsbCl7XHJcbiAgICAgIG15VGltb3V0ID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBtaWxpc2Vjb25kcGFzc2VkKz0xMDA7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKG1pbGlzZWNvbmRwYXNzZWQgPj0gNDAwICYmIHN0b3B0aW1lcj09ZmFsc2UpIHtcclxuICAgICAgICAgICAgbWlsaXNlY29uZHBhc3NlZCA9IDA7XHJcbiAgICAgICAgICAgIHN0b3B0aW1lcj10cnVlO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3RvcHRpbWVyPT10cnVlKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteVRpbW91dCk7XHJcbiAgICAgICAgICAgIG15VGltb3V0ID0gbnVsbDtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5pZih0eXBlb2Yoc3NkQ29tcG9uZW50KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICBzc2RDb21wb25lbnQgPSB7XHJcbiAgICAgICAgbGVuZ3RoOiAwLFxyXG4gICAgICAgIG51bWJlck9mQWN0aXZlOiAwLFxyXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgdG9EZXN0cm95OiBmYWxzZSxcclxuICAgICAgICBvbkJsdXJEZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNzZENvbXBvbmVudC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSAkKCcjJyArIHNzZENvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3dyYXBwZXIgPSAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3NkQ29tcG9uZW50LnRvRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLmZpbmQoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhLnRvLWRlc3Ryb3knKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ1tkYXRhLXNzZC1wbGFjZWhvbGRlcj0nICsgc3NkQ29tcG9uZW50LmlkICsgJ10nKTtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudFdpZGdldCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudFdpZGdldCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5jaGlsZHJlbignZGl2LlNTRC1XcmFwcGVyOm5vdCguU2VsZWN0ZWQpJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vSWYgdGhpcyBTU0QtV3JhcHBlciBpcyBhbHJlYWR5IFNlbGVjdGVkLCByZXR1cm4uXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuYmx1cigpOyAvL0JsdXJzIHRoZSBvdGhlciBmb2N1c2VkIFNTRCdzLlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKys7XHJcbiAgICAgICAgICAgIGlmKCFfc3NkQ29tcG9uZW50V2lkZ2V0LnBhcmVudCgpLmhhc0NsYXNzKCdTU0RQb3B1cCcpKXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzc2RDb21wb25lbnQuaXNSVEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgLSAkKHRoaXMpLm91dGVyV2lkdGgoKSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuU1NELUJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuU1NELUxpc3QnKS5hdHRyKCdjdXJyZW50LWZvY3VzJywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLlNTRC1MaXN0JykuYXR0cignY3VycmVudC1mb2N1cycsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5wYXJlbnQoKS5oYXNDbGFzcygnU1NEUG9wdXAnKSl7XHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50V2lkZ2V0LmNsb3Nlc3QoJ2Zvcm0nKS5hcHBlbmQoX3NzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5hZGRDbGFzcygnUG9zaXRpb25lZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBibHVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoIXNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5Qb3NpdGlvbmVkLlNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfd3JhcHBlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQoJyMnICsgJCh0aGlzKS5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3dyYXBwZXIucmVtb3ZlQ2xhc3MoJ1Bvc2l0aW9uZWQnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdTZWFyY2hpbmcgRml4ZWQgS2V5Ym9hcmROYXYnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQmFyJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuU1NELUJhcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJzQ2xlYXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUtLTtcclxuICAgICAgICAgICAgJChcIi5TU0RfTGlzdFJlY29yZHMgc3BhbiwgLlNTRF9MaXN0TGluZS5TaG93TW9yZSwgLlNTRF9EZWxldGVPbkJsdXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZighc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL0lmIHRoZXJlJ3Mgbm8gU1NEIGFjdGl2ZSwgdGhlcmUncyBubyBuZWVkIHRvIHJlc2l6ZSBpdC5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfc3NkV3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJCgnIycgKyBfc3NkV3JhcHBlci5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKVswXTtcclxuICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSBfc3NkV3JhcHBlci5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoX3NzZENvbXBvbmVudFdpZGdldCkud2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LyosXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5pc1JUTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpIC0gJChfc3NkQ29tcG9uZW50V2lkZ2V0KS5vdXRlcldpZHRoKCkgLSBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9KS5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5jbG9zZXN0KCcuU1NELUNvbXBvbmVudCcpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiU2VsZWN0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsIHNzZEJhciwgc2VsZWN0ZWRUYWIsIGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NlbGVjdGVkVGFiID0gJChzZWxlY3RlZFRhYik7XHJcblxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmZvY3VzKHNzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRUYWIuaXMoJy5TZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQudGFic0NsZWFyKHNzZEJhcik7XHJcbiAgICAgICAgICAgICAgICBfc2VsZWN0ZWRUYWIuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKHNzZEJhcixpc0lucHV0RXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXNTZWxlY3RlZFRhYjogZnVuY3Rpb24oc3NkQmFyLGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNlYXJjaCBpbnB1dD9cclxuICAgICAgICAgICAgaWYoc3NkQmFyLmNoaWxkcmVuKCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyLlNlbGVjdGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFRvQ2xpY2sgPSBzc2RCYXIuc2libGluZ3MoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhOm5vdCgudG8tZGVzdHJveSknKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaXNJbnB1dEV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBvbktleVVwRnVuY3Rpb24oZWxlbWVudFRvQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5JbnB1dFBsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdCg6Zm9jdXMpJykuZmlyc3QoKS5zZWxlY3QoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNob3J0IGxpc3Q/XHJcbiAgICAgICAgICAgIGlmKHNzZEJhci5jaGlsZHJlbignLlNob3J0TGlzdFNlbGVjdG9yLUNvbnRhaW5lci5TZWxlY3RlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5TaG9ydExpc3RTZWxlY3Rvci1Db250YWluZXIgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBNZXRob2QgYmVpbmcgY2FsbGVkIGJ5IHVzZXIgYWN0aW9uIGpzX3NzZENvbXBvbmVudF9mb2N1c0N1cnJlbnRSb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb2N1c0N1cnJlbnRSb3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcbiAgICAgICAgICAgIHZhciBfY3VycmVudEZvY3VzID0gX3NzZExpc3QuYXR0cignY3VycmVudC1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOm50aC1jaGlsZCgnICsgX2N1cnJlbnRGb2N1cyArICcpJykuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJzQ2xlYXI6IGZ1bmN0aW9uKHNzZEJhcikge1xyXG4gICAgICAgICAgICAkKHNzZEJhcikuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlYXJjaEljb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJTZWxlY3QoZXZlbnQuZGF0YS5zc2RDb21wb25lbnRXaWRnZXQsIGV2ZW50LmRhdGEuc3NkQmFyLCAkKGV2ZW50LmRhdGEuc3NkQmFyKS5jaGlsZHJlbignLlNlYXJjaElucHV0LUNvbnRhaW5lcicpLGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogQG5hbWUgaW5wdXRFdmVudFxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnB1dEV2ZW50OiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0Q29udGFpbmVyID0gJChldmVudC5kYXRhLmlucHV0KS5jbG9zZXN0KCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudGFiU2VsZWN0KGV2ZW50LmRhdGEuc3NkQ29tcG9uZW50V2lkZ2V0LCBldmVudC5kYXRhLnNzZEJhciwgX2lucHV0Q29udGFpbmVyLHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoJChldmVudC5kYXRhLmlucHV0KS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykucmVtb3ZlQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykuYWRkQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgb25LZXlkb3duRnVuY3Rpb24oKTsgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGtleWJvYXJkSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiU2hpZnRcIiB8fCBldmVudC5rZXkgPT0gXCJDb250cm9sXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJFbnRlclwiICYmIF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJUYWJcIikge1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmF0dHIoJ2N1cnJlbnQtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRFbGVtZW50ID0gJChudWxsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKF9jdXJyZW50Rm9jdXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpudGgtY2hpbGQoJyArIF9jdXJyZW50Rm9jdXMgKyAnKScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LmFkZENsYXNzKCdLZXlib2FyZE5hdicpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50LmlzKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpLnByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbicpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3NlbGVjdGVkRWxlbWVudC5pcygnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9ICQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NlbGVjdGVkRWxlbWVudC5yZW1vdmVDbGFzcygnZm9jdXMnKS5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCAmJiBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1CYXInKSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghX3NlbGVjdGVkRWxlbWVudC5maW5kKCcuU1NEX0xpc3RMaW5lLkRpc2FibGVkJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkTGlzdC5maW5kKCdhLk90aGVyQ29udHJvbExpbmsnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgX2N1cnJlbnRGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhfc3NkQ29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyS2V5Ym9hcmROYXZTdGF0dXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoc3NkQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgdmFyIF9zc2RMaXN0ID0gX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdLZXlib2FyZE5hdicpO1xyXG4gICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgMClcclxuICAgICAgICAgICAgICAgIC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW4uZm9jdXMnKS5yZW1vdmVDbGFzcygnZm9jdXMnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmJsdXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgPD0gMTAyNCl7XHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkgKyAncHgnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLypOb3QgTW9iaWxlIGFwcGx5IGZpeGVkIGJlaGF2aW91ciovXHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICgkKCcuVG9wUGF0aWVudEhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJCgnLkhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJChcIi50b29sYmFyLXdyYXBwZXJcIikub3V0ZXJIZWlnaHQoKSsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpICkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsKCQoJy5Ub3BQYXRpZW50SGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKCcuSGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKFwiLnRvb2xiYXItd3JhcHBlclwiKS5vdXRlckhlaWdodCgpICsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpKSArICdweCcpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIF9zc2RDb21wb25lbnQuYWRkQ2xhc3MoJ0ZpeGVkJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbihfaW5wdXRJZCkgeyAvKiBVc2VkIHRvIGRlc3Ryb3kgYSBzcGVjaWZpYyBzc2QgY29tcG9uZW50IGJ5IHJlY2VpdmUgdGhlIGlucHV0IGlkZW50aWZpZXIgYXMgcGFyYW1ldGVyIGFuZCBkZXRlcm1pbmUgdGhlIHdyYXBwZXIgdG8gcmVtb3ZlLiAqL1xyXG4gICAgICAgICAgICAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsX3RvRGVzdHJveSkge1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubGVuZ3RoKys7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5pc1JUTCA9ICQoJ2h0bWwnKS5pcygnLnJ0bCcpO1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudG9EZXN0cm95ID0gX3RvRGVzdHJveTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzc2RDb21wb25lbnRXaWRnZXQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5pZCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJChzc2RDb21wb25lbnRXaWRnZXQpO1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9IF9zc2RDb21wb25lbnRXaWRnZXQuZmluZCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RCYXIgPSBfc3NkQ29tcG9uZW50LmNoaWxkcmVuKCcuU1NELUJhcicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc2VhcmNoSWNvbiA9IF9zc2RCYXIuZmluZCgnLlNlYXJjaEljb24nKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0ID0gX3NzZEJhci5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfY2xlYXJDb250cm9sID0gX3NzZEJhci5maW5kKCcuQ2xlYXJDb250cm9sJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9zZWFyY2hJY29uLm9mZignY2xpY2snKS5vbignY2xpY2snLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXJcclxuICAgICAgICAgICAgfSwgc3NkQ29tcG9uZW50LnNlYXJjaEljb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3NzZEJhci5jaGlsZHJlbignZGl2Jykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudFdpZGdldDogX3NzZENvbXBvbmVudFdpZGdldCxcclxuICAgICAgICAgICAgICAgIHNzZEJhcjogX3NzZEJhclxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LnRhYlNlbGVjdChldmVudC5kYXRhLnNzZENvbXBvbmVudFdpZGdldCwgZXZlbnQuZGF0YS5zc2RCYXIsIHRoaXMsZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9jbGVhckNvbnRyb2wub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9pbnB1dC5vZmYoJ2tleXVwJykub24oJ2tleXVwJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50V2lkZ2V0OiBfc3NkQ29tcG9uZW50V2lkZ2V0LFxyXG4gICAgICAgICAgICAgICAgc3NkQmFyOiBfc3NkQmFyLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IF9pbnB1dFxyXG4gICAgICAgICAgICB9LCBzc2RDb21wb25lbnQuaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfaW5wdXQub2ZmKCdrZXlkb3duJykub24oJ2tleWRvd24nLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dDogX2lucHV0XHJcbiAgICAgICAgICAgIH0sIHNzZENvbXBvbmVudC5rZXlkb3duRXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChfc3NkQ29tcG9uZW50KS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50OiBfc3NkQ29tcG9uZW50XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhldmVudC5kYXRhLnNzZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgc3NkQ29tcG9uZW50LnJlc2l6ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5pcygnOnZpc2libGUnKSkgeyAvKiBDbGlja3Mgb24gaGlkZGVuIGVsZW1lbnRzIGFyZSBkaXNtaXNzZWQuICovXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGUgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighZS5sZW5ndGgpIHsgLy8gVXNlciBjbGlja2VkIG91dHNpZGUgdGhlIFNTRC1Db21wb25lbnQ/XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gXCIyN1wiKSB7IC8vIFVzZXIgaGl0IEVzY2FwZVxyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm9uQmx1ckRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7IC8vIElmIHRoZXJlJ3MgYW4gU1NEIGNvbXBvbmVudCBhY3RpdmUsIGdvIGZvciBLZXlib2FyZCBoYW5kbGVyXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5rZXlib2FyZEhhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlID4gMCkgeyAvLyBJZiB0aGVyZSdzIGFuIFNTRCBjb21wb25lbnQgYWN0aXZlLCBnbyBmb3Igc2Nyb2xsIGhhbmRsZXJcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LnNjcm9sbEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBTU0RMaXN0TGluZSAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU1NETGlzdExpbmUgPSB7XHJcblx0dG9nZ2xlOiAobGluZUlkLCBsaW5lSGFuZGxlciA9ICcnKSA9PiB7XHJcblx0XHR2YXIgX2xpbmUgPSAkKGxpbmVJZCkuaXMoJy5TU0RfTGlzdExpbmUnKVxyXG5cdFx0XHQ/ICQobGluZUlkKVxyXG5cdFx0XHQ6ICQobGluZUlkKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuU1NEX0xpc3RMaW5lJylcclxuXHRcdFx0XHRcdC5maXJzdCgpO1xyXG5cclxuXHRcdGlmICghX2xpbmUubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdFx0dmFyIF9leHBhbmRDb250cm9sID0gJCgnLmV4cGFuZC1jb250cm9sLWN1c3RvbS13aWR0aCcpO1xyXG5cclxuXHRcdGlmIChfZXhwYW5kQ29udHJvbC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRfZXhwYW5kQ29udHJvbC5yZW1vdmVDbGFzcygnZXhwYW5kLWNvbnRyb2wtY3VzdG9tLXdpZHRoJyk7XHJcblx0XHRcdF9leHBhbmRDb250cm9sLmNzcygnd2lkdGgnLCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFfbGluZS5pcygnLkFjdGl2ZScpKSB7XHJcblx0XHRcdHZhciBfbGluZUhlYWRlciA9IF9saW5lXHJcblx0XHRcdFx0LmNsb3Nlc3QoJ2Rpdi5TZWxlY3RhYmxlTGlzdCwgLlNlbGVjdGFibGVMaXN0LUxpc3RSZWNvcmRzJylcclxuXHRcdFx0XHQuZmluZCgnZGl2LlNlbGVjdGFibGVMaXN0LUxpbmUuQWN0aXZlJylcclxuXHRcdFx0XHQubm90KF9saW5lKTtcclxuXHJcblx0XHRcdF9saW5lSGVhZGVyLmZpbmQoJ2FbaGlkZS1hY3Rpb25dJykuY2xpY2soKTtcclxuXHRcdFx0X2xpbmVIZWFkZXJcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0FjdGl2ZScpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCdzcGFuJylcclxuXHRcdFx0XHQuaGlkZSgyMDApO1xyXG5cdFx0XHRfbGluZS5hZGRDbGFzcygnQWN0aXZlJyk7XHJcblxyXG5cdFx0XHRpZiAoJChsaW5lSGFuZGxlcikubGVuZ3RoKSB7XHJcblx0XHRcdFx0JChsaW5lSGFuZGxlcikuY2xpY2soKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0X2xpbmUucmVtb3ZlQ2xhc3MoJ0FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBUYWJzRXh0ZW5kZWQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlRhYnNFeHRlbmRlZCA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3QgJGNvbXBvbmVudCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH0gLlRhYnNfRXh0ZW5kZWRgKTtcclxuXHRcdGNvbnN0ICR0YWJIZWFkZXIgPSAkY29tcG9uZW50LmZpbmQoJy5UYWJzX2hlYWRlcicpO1xyXG5cdFx0Y29uc3QgJHRhYkNvbnRhaW5lciA9ICRjb21wb25lbnQuZmluZCgnLlRhYnNDb250YWluZXInKTtcclxuXHRcdGNvbnN0ICR0YWJzID0gJHRhYkhlYWRlci5maW5kKCc+IC5UYWJzX190YWInKTtcclxuXHRcdGNvbnN0ICR0YWJzRW5hYmxlZCA9ICR0YWJIZWFkZXIuZmluZCgnPiAuVGFic19fdGFiOm5vdCguZGlzYWJsZWQpJyk7XHJcblx0XHRjb25zdCAkdGFic0lucHV0ID0gJGNvbXBvbmVudC5maW5kKCcuVGFic19JbnB1dCBpbnB1dCcpO1xyXG5cclxuXHRcdCR0YWJzLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICgkKHRoaXMpLnRleHQoKSA9PT0gJycpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkdGFic0VuYWJsZWQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCR0YWJDb250YWluZXIuYXR0cignYWN0aXZldGFiJywgJCh0aGlzKS5hdHRyKCd2YWx1ZScpKTtcclxuXHJcblx0XHRcdCR0YWJzSW5wdXQudmFsKCQodGhpcykuYXR0cigndmFsdWUnKSk7XHJcblx0XHRcdCR0YWJzSW5wdXQuY2hhbmdlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkdGFic0VuYWJsZWQub2ZmKCdtb3VzZWRvd24nKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZ0KSB7XHJcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xyXG5cdFx0XHQkdGFic0V4dGVuZGVkLnJlbW92ZUNsYXNzKCdpc0Nsb3NlZCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLlRhYnNfRXh0ZW5kZWQuSGlkZUFjdGl2ZU9uQ2xpY2sgLlRhYnNfaGVhZGVyJylcclxuXHRcdFx0Lm9mZignbW91c2Vkb3duJylcclxuXHRcdFx0Lm9uKCdtb3VzZWRvd24nLCAnLlRhYnNfX3RhYi5hY3RpdmUnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0XHR2YXIgJHRhYnNFeHRlbmRlZCA9ICQoZXZ0LnRhcmdldCkuY2xvc2VzdCgnLlRhYnNfRXh0ZW5kZWQnKTtcclxuXHRcdFx0XHR2YXIgJHRhYnNCb2R5ID0gJHRhYnNFeHRlbmRlZC5maW5kKCcuVGFic19ib2R5Jyk7XHJcblxyXG5cdFx0XHRcdGlmICgkdGFic0JvZHkuaGFzQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJykpIHtcclxuXHRcdFx0XHRcdCR0YWJzQm9keS5yZW1vdmVDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcclxuXHRcdFx0XHRcdCR0YWJzRXh0ZW5kZWQucmVtb3ZlQ2xhc3MoJ2lzQ2xvc2VkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCR0YWJzQm9keS5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcclxuXHRcdFx0XHRcdCR0YWJzRXh0ZW5kZWQuYWRkQ2xhc3MoJ2lzQ2xvc2VkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHQkdGFiSGVhZGVyLmZpbmQoJy5UYWJzX0V4dGVuZGVkLS1kaXNhYmxlZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcblx0XHRcdCQoZWwpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKVxyXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkY29tcG9uZW50LmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcblx0XHRcdGlmICgkKGVsKS5oYXNDbGFzcygnVGFic19FeHRlbmRlZC0tY2xvc2Vkb25zdGFydCcpKSB7XHJcblx0XHRcdFx0JChlbClcclxuXHRcdFx0XHRcdC5maW5kKCcuVGFic19ib2R5JylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcclxuXHRcdFx0XHQkKGVsKS5hZGRDbGFzcygnaXNDbG9zZWQnKTtcclxuXHRcdFx0XHQkKGVsKS5yZW1vdmVDbGFzcygnVGFic19FeHRlbmRlZC0tY2xvc2Vkb25zdGFydCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkKGVsKVxyXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHQub24oJ2NsaWNrJywgJy5UYWJzX0V4dGVuZGVkLS1jbG9zZScsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdFx0JChldnQudGFyZ2V0KVxyXG5cdFx0XHRcdFx0XHQuY2xvc2VzdCgnLlRhYnNfYm9keScpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICghY29uZmlnLnRhYjFFbmFibGVkKSAkdGFiSGVhZGVyLmZpbmQoJz4gLlRhYnNfX3RhYlt2YWx1ZT0xXScpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYgKCFjb25maWcudGFiMkVuYWJsZWQpICR0YWJIZWFkZXIuZmluZCgnPiAuVGFic19fdGFiW3ZhbHVlPTJdJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRpZiAoIWNvbmZpZy50YWIzRW5hYmxlZCkgJHRhYkhlYWRlci5maW5kKCc+IC5UYWJzX190YWJbdmFsdWU9M10nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdGlmICghY29uZmlnLnRhYjRFbmFibGVkKSAkdGFiSGVhZGVyLmZpbmQoJz4gLlRhYnNfX3RhYlt2YWx1ZT00XScpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYgKCFjb25maWcudGFiNUVuYWJsZWQpICR0YWJIZWFkZXIuZmluZCgnPiAuVGFic19fdGFiW3ZhbHVlPTVdJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBUYWJ1bGFyTGlzdCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGFsbFRhYnVsYXJMaXN0cyA9IFtdO1xyXG5cclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLnRhYnVsYXJMaXN0SWRdID0gbmV3IFRhYnVsYXJMaXN0KGNvbmZpZyk7XHJcblx0XHRhbGxUYWJ1bGFyTGlzdHMucHVzaCh3aW5kb3dbY29uZmlnLnRhYnVsYXJMaXN0SWRdKTtcclxuXHJcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGFsbFRhYnVsYXJMaXN0cyA9IFNhcHBoaXJlV2lkZ2V0cy5UYWJ1bGFyTGlzdC5hbGwoKTtcclxuXHRcdFx0YWxsVGFidWxhckxpc3RzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuaGFuZGxlVGFidWxhckxpc3RDb2x1bW5zKCk7XHJcblx0XHRcdFx0ZWxlbWVudC5oYW5kbGVSZXNwb25zaXZlQ2xhc3NlcygyMDApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5vbigncmVzaXplLnRhYnVsYXJsaXN0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBhbGxUYWJ1bGFyTGlzdHMgPSBTYXBwaGlyZVdpZGdldHMuVGFidWxhckxpc3QuYWxsKCk7XHJcblx0XHRcdGFsbFRhYnVsYXJMaXN0cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGkpIHtcclxuXHRcdFx0XHRlbGVtZW50LmhhbmRsZVJlc3BvbnNpdmVDbGFzc2VzKDIwMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0dmFyIFRhYnVsYXJMaXN0ID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLnRhYnVsYXJMaXN0UmVzaXplVGltZXIgPSAwO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcudGFidWxhckxpc3RJZCk7XHJcblx0XHR0aGlzLiR3aWRnZXRMaXN0ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLlRhYnVsYXJMaXN0Jyk7XHJcblx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLlRhYnVsYXJMaXN0Um93JykuZWFjaChmdW5jdGlvbihpLCByb3cpIHtcclxuXHRcdFx0X3RoaXMuY29sdW1uc0NvdW50ID0gMDtcclxuXHRcdFx0JChyb3cpXHJcblx0XHRcdFx0LmZpbmQoJy5UYWJ1bGFyTGlzdFJvdy12YWx1ZXMgLlRhYnVsYXJMaXN0Um93LWl0ZW0nKVxyXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XHJcblx0XHRcdFx0XHQkKGVsKS5hZGRDbGFzcygnVGFidWxhckxpc3RDb2x1bW4nICsgKGkgKyAxKSk7XHJcblx0XHRcdFx0XHRfdGhpcy5jb2x1bW5zQ291bnQrKztcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCEhY29uZmlnLmJyZWFrT24pIHtcclxuXHRcdFx0dGhpcy5icmVha09uT3JkZXIgPSBwYXJzZUludChjb25maWcuYnJlYWtPbik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmJyZWFrT25PcmRlciA9IDA7XHJcblx0XHR9XHJcblx0XHR0aGlzLmhhbmRsZVRhYnVsYXJMaXN0Q29sdW1ucygpO1xyXG5cdH07XHJcblxyXG5cdFRhYnVsYXJMaXN0LnByb3RvdHlwZS5oYW5kbGVUYWJ1bGFyTGlzdENvbHVtbnMgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5jb2x1bW5zV2lkdGggPT09ICdBdXRvJykge1xyXG5cdFx0XHRpZiAodGhpcy4kd2lkZ2V0TGlzdC53aWR0aCgpID4gMSkge1xyXG5cdFx0XHRcdGZvciAoaSA9IDE7IGkgPD0gdGhpcy5jb2x1bW5zQ291bnQ7IGkrKykge1xyXG5cdFx0XHRcdFx0dmFyIG1heFdpZHRoQ29udGVudCA9IE1hdGgubWF4LmFwcGx5KFxyXG5cdFx0XHRcdFx0XHRudWxsLFxyXG5cdFx0XHRcdFx0XHR0aGlzLiR3aWRnZXRcclxuXHRcdFx0XHRcdFx0XHQuZmluZCgnLlRhYnVsYXJMaXN0Q29sdW1uJyArIGkpXHJcblx0XHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHQuZ2V0KClcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLlRhYnVsYXJMaXN0Q29sdW1uJyArIGkpLndpZHRoKG1heFdpZHRoQ29udGVudCk7XHJcblx0XHRcdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLlRhYnVsYXJMaXN0Q29sdW1uJyArIGkpLmNzcygnb3BhY2l0eScsIDEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKCEhdGhpcy5jb25maWcucHJvcGVydHlNaW5XaWR0aCkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLlRhYnVsYXJMaXN0Um93LXByb3BlcnR5JykuY3NzKCdtaW4td2lkdGgnLCBjb252ZXJ0SW5DU1NWYWx1ZSh0aGlzLmNvbmZpZy5wcm9wZXJ0eU1pbldpZHRoKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoISF0aGlzLmNvbmZpZy5wcm9wZXJ0eU1heFdpZHRoKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuVGFidWxhckxpc3RSb3ctcHJvcGVydHknKS5jc3MoJ21heC13aWR0aCcsIGNvbnZlcnRJbkNTU1ZhbHVlKHRoaXMuY29uZmlnLnByb3BlcnR5TWF4V2lkdGgpKTtcclxuXHRcdH1cclxuXHRcdGlmICghIXRoaXMuY29uZmlnLmFjdGlvbnNNaW5XaWR0aCkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLlRhYnVsYXJMaXN0Um93LWFjdGlvbnMnKS5jc3MoJ21pbi13aWR0aCcsIGNvbnZlcnRJbkNTU1ZhbHVlKHRoaXMuY29uZmlnLmFjdGlvbnNNaW5XaWR0aCkpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCEhdGhpcy5jb25maWcuYWN0aW9uc01heFdpZHRoKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuVGFidWxhckxpc3RSb3ctYWN0aW9ucycpLmNzcygnbWF4LXdpZHRoJywgY29udmVydEluQ1NTVmFsdWUodGhpcy5jb25maWcuYWN0aW9uc01heFdpZHRoKSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0VGFidWxhckxpc3QucHJvdG90eXBlLmhhbmRsZVJlc3BvbnNpdmVDbGFzc2VzID0gZnVuY3Rpb24odGltZW91dCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50YWJ1bGFyTGlzdFJlc2l6ZVRpbWVyKTtcclxuXHRcdHRoaXMudGFidWxhckxpc3RSZXNpemVUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5yZW1vdmVDbGFzcyhmdW5jdGlvbihpbmRleCwgY2xhc3NOYW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuIChjbGFzc05hbWUubWF0Y2goLyhefFxccylzY3JlZW4tXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LnJlbW92ZUNsYXNzKCdpc0JyZWFraW5nJyk7XHJcblxyXG5cdFx0XHR2YXIgd2lkZ2V0V2lkdGggPSBfdGhpcy4kd2lkZ2V0TGlzdC5vdXRlcldpZHRoKHRydWUpO1xyXG5cdFx0XHRpZiAod2lkZ2V0V2lkdGggPT09IDApIHtcclxuXHRcdFx0XHR3aWRnZXRXaWR0aCA9IF90aGlzLiR3aWRnZXRMaXN0XHJcblx0XHRcdFx0XHQucGFyZW50cygnOnZpc2libGUnKVxyXG5cdFx0XHRcdFx0LmVxKDApXHJcblx0XHRcdFx0XHQub3V0ZXJXaWR0aCh0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHdpZGdldFdpZHRoID49IDE5MDApIHtcclxuXHRcdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5hZGRDbGFzcygnc2NyZWVuLURlc2t0b3BIRCcpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5icmVha09uT3JkZXIgPj0gNikge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ2lzQnJlYWtpbmcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTYwMCkge1xyXG5cdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdzY3JlZW4tRGVza3RvcEJpZycpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5icmVha09uT3JkZXIgPj0gNSkge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ2lzQnJlYWtpbmcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTM2Nikge1xyXG5cdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdzY3JlZW4tRGVza3RvcCcpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5icmVha09uT3JkZXIgPj0gNCkge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ2lzQnJlYWtpbmcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTAyNCkge1xyXG5cdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdzY3JlZW4tRGVza3RvcFNtYWxsJyk7XHJcblx0XHRcdFx0aWYgKF90aGlzLmJyZWFrT25PcmRlciA+PSAzKSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5hZGRDbGFzcygnaXNCcmVha2luZycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSA0MjApIHtcclxuXHRcdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5hZGRDbGFzcygnc2NyZWVuLVRhYmxldCcpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5icmVha09uT3JkZXIgPj0gMikge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ2lzQnJlYWtpbmcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ3NjcmVlbi1QaG9uZScpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5icmVha09uT3JkZXIgPj0gMSkge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ2lzQnJlYWtpbmcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sIHRpbWVvdXQpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5UYWJ1bGFyTGlzdCA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0YWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIGFsbFRhYnVsYXJMaXN0cztcclxuXHRcdH0sXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuZnVuY3Rpb24gY29udmVydEluQ1NTVmFsdWUodmFsdWVfaW4pIHtcclxuXHR2YXIgcmV0dXJuZWQ7XHJcblx0aWYgKHZhbHVlX2luLmluY2x1ZGVzKCdweCcpIHx8IHZhbHVlX2luLmluY2x1ZGVzKCclJykpIHtcclxuXHRcdHJldHVybmVkID0gdmFsdWVfaW47XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybmVkID0gdmFsdWVfaW4gKyAncHgnO1xyXG5cdH1cclxuXHRyZXR1cm4gcmV0dXJuZWQ7XHJcbn1cclxuIiwiLyogQ29tcG9uZW50IFRhYnVsYXJTY3JvbGwgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG5cdFx0XHRcdHNldHVwVGFidWxhclNjcm9sbCgkKGVsKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnLlRhYnVsYXJTY3JvbGwnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XHJcblx0XHRcdFx0XHRzZXR1cFRhYnVsYXJTY3JvbGwoJChlbCkpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5vbigncmVzaXplLnRhYnVsYXJzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLlRhYnVsYXJTY3JvbGwnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XHJcblx0XHRcdFx0dmFyICRjZW50ZXJUYWJsZSA9ICQoZWwpLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlci10YWJsZScpO1xyXG5cdFx0XHRcdHZhciB0YWJsZVdpZHRoID0gJGNlbnRlclRhYmxlLmZpbmQoJ3RhYmxlJykud2lkdGgoKTtcclxuXHRcdFx0XHQkKGVsKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpXHJcblx0XHRcdFx0XHQud2lkdGgodGFibGVXaWR0aCk7XHJcblx0XHRcdFx0aWYgKCRjZW50ZXJUYWJsZVswXS5zY3JvbGxXaWR0aCA+ICRjZW50ZXJUYWJsZS53aWR0aCgpKSB7XHJcblx0XHRcdFx0XHQkKGVsKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKVxyXG5cdFx0XHRcdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JChlbClcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJylcclxuXHRcdFx0XHRcdFx0LmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc2V0dXBUYWJ1bGFyU2Nyb2xsID0gZnVuY3Rpb24oJHRhYnVsYXJTY3JvbGwpIHtcclxuXHRcdHZhciAkdG9wU2Nyb2xsV3JhcHBlciA9ICR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJyk7XHJcblx0XHR2YXIgJGNlbnRlclRhYmxlID0gJHRhYnVsYXJTY3JvbGwuZmluZCgnLlRhYnVsYXJTY3JvbGwtY2VudGVyLXRhYmxlJyk7XHJcblx0XHQkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFx0JGNlbnRlclRhYmxlLnNjcm9sbExlZnQoJHRvcFNjcm9sbFdyYXBwZXIuc2Nyb2xsTGVmdCgpKTtcclxuXHRcdH0pO1xyXG5cdFx0JGNlbnRlclRhYmxlLnNjcm9sbChmdW5jdGlvbigpIHtcclxuXHRcdFx0JHRvcFNjcm9sbFdyYXBwZXIuc2Nyb2xsTGVmdCgkY2VudGVyVGFibGUuc2Nyb2xsTGVmdCgpKTtcclxuXHRcdH0pO1xyXG5cdFx0Ly8gc2ltaWxhciB0byBSZXNpemVcclxuXHRcdHZhciB0YWJsZVdpZHRoID0gJGNlbnRlclRhYmxlLmZpbmQoJ3RhYmxlJykud2lkdGgoKTtcclxuXHRcdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpLndpZHRoKHRhYmxlV2lkdGgpO1xyXG5cdFx0aWYgKCRjZW50ZXJUYWJsZVswXS5zY3JvbGxXaWR0aCA+ICRjZW50ZXJUYWJsZS53aWR0aCgpKSB7XHJcblx0XHRcdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5UYWJ1bGFyU2Nyb2xsID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgVHJpZ2dlcklmcmFtZVRvb2x0aXAgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdHZhciAkZWxlbWVudElkID0gJCgnIycgKyBjb25maWcuZWxlbWVudElkKTtcclxuXHJcblx0XHQkZWxlbWVudElkLmFkZENsYXNzKCd0b29sdGlwJyk7XHJcblxyXG5cdFx0aWYgKGNvbmZpZy50cmlnZ2VySWQgPT09ICdjbGljaycpICRlbGVtZW50SWQuYWRkQ2xhc3MoJ3Rvb2x0aXBzdGVyZWQtLXBvaW50ZXInKTtcclxuXHJcblx0XHR2YXIgZXh0cmFEYXRhUGFyYW1zID0gJ2RhdGEtaWZyYW1ldG9vbHRpcHRyaWdnZXJpZD1cIicgKyBjb25maWcuZWxlbWVudElkICsgJ1wiJztcclxuXHRcdHZhciB3aWRnZXROb3RpZnlEaXYgPSAkLmZpbmQoJ1tkYXRhLWlmcmFtZXRvb2x0aXB0cmlnZ2VyaWQ9XCInICsgY29uZmlnLmVsZW1lbnRJZCArICdcIl0nKTtcclxuXHRcdGlmICh3aWRnZXROb3RpZnlEaXYubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGV4dHJhRGF0YVBhcmFtcyArPSAnIGRhdGEtaWZyYW1ldG9vbHRpcG5vdGlmeWlkPScgKyAkKHdpZGdldE5vdGlmeURpdikuZGF0YSgnaWZyYW1ldG9vbHRpcG5vdGlmeWlkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0JGVsZW1lbnRJZC50b29sdGlwc3Rlcih7XHJcblx0XHRcdGNvbnRlbnRBc0hUTUw6IHRydWUsXHJcblx0XHRcdHRoZW1lOiBjb25maWcudGhlbWUsXHJcblx0XHRcdGludGVyYWN0aXZlOiB0cnVlLFxyXG5cdFx0XHRwb3NpdGlvbjogY29uZmlnLnBvc2l0aW9uSWQsXHJcblx0XHRcdHRyaWdnZXI6IGNvbmZpZy50cmlnZ2VySWQsXHJcblx0XHRcdG1pbldpZHRoOiBjb25maWcubWluV2lkdGgsXHJcblx0XHRcdG1heFdpZHRoOiBjb25maWcubWF4V2lkdGgsXHJcblx0XHRcdHppbmRleDogY29uZmlnLnppbmRleCxcclxuXHRcdFx0Y29udGVudDogYDxpZnJhbWUgaWQ9XCJ0b29sdGlwc3Rlci1mcmFtZVwiIGRhdGEtdWk9XCJpZnJhbWUtdG9vbHRpcFwiIHNyYz1cIiR7Y29uZmlnLlVSTH1cIiBzdHlsZT1cImJvcmRlcjpub25lOyBtaW4taGVpZ2h0OiR7Y29uZmlnLm1pbkhlaWdodH1weDsgJHtleHRyYURhdGFQYXJhbXN9PjwvaWZyYW1lPmAsXHJcblx0XHRcdGZ1bmN0aW9uUmVhZHk6IGZ1bmN0aW9uKGluc3RhbmNlLCBoZWxwZXIpIHtcclxuXHRcdFx0XHQkKGhlbHBlcikuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicgfSk7XHJcblxyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHQkKCcudG9vbHRpcHN0ZXItYmFzZScpLmNzcyh7XHJcblx0XHRcdFx0XHRcdHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcclxuXHRcdFx0XHRcdFx0bWluSGVpZ2h0OiBjb25maWcubWluSGVpZ2h0ID4gMCA/IGNvbmZpZy5taW5IZWlnaHQgOiAnYXV0bycsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LCA1MDApO1xyXG5cclxuXHRcdFx0XHQkKCcudG9vbHRpcHN0ZXItY29udGVudCcpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJUb29sdGlwc3RlckxvYWRpbmdcIj48ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjwvZGl2PicpO1xyXG5cclxuXHRcdFx0XHRjb25zdCBpc0xlZnRPclJpZ2h0ID0gY29uZmlnLnBvc2l0aW9uSWQgPT09ICdsZWZ0JyB8fCBjb25maWcucG9zaXRpb25JZCA9PT0gJ3JpZ2h0JztcclxuXHJcblx0XHRcdFx0Ly8gU2V0IGEgZml4ZWQgaGVpZ2h0IGluIG9yZGVyIHRvIGtlZXAgdGhlIGFycm93IGluIHRoZSBzYW1lIHBvc2l0aW9uXHJcblx0XHRcdFx0aWYgKGlzTGVmdE9yUmlnaHQpIHtcclxuXHRcdFx0XHRcdHNldEZpeEhlaWdodCgpO1xyXG5cclxuXHRcdFx0XHRcdCQod2luZG93KVxyXG5cdFx0XHRcdFx0XHQub2ZmKCdzY3JvbGwuVG9vbHRpcCcpXHJcblx0XHRcdFx0XHRcdC5vbignc2Nyb2xsLlRvb2x0aXAnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdHNldEZpeEhlaWdodCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0sIDUwMCk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZnVuY3Rpb25BZnRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh3aW5kb3cpLm9mZignc2Nyb2xsLlRvb2x0aXAnKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHNldEZpeEhlaWdodCA9ICgpID0+IHtcclxuXHRcdGNvbnN0ICRhcnJvdyA9ICQoJy50b29sdGlwc3Rlci1hcnJvdycpO1xyXG5cclxuXHRcdCRhcnJvdy5oZWlnaHQoJGFycm93LmhlaWdodCgpKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuVHJpZ2dlcklmcmFtZVRvb2x0aXAgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBUcnVuY2F0ZWRDb250ZW50ICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcgPSB7fSkge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciAkYWxsVHJ1bmNhdGVkID0gJChbXSk7XHJcblx0XHRcdHZhciByb290U2VsZWN0b3IgPSBgIyR7Y29uZmlnLndpZGdldElkfWA7XHJcblx0XHRcdHZhciBvcGVuZXJTZWxlY3RvciA9ICcuVHJ1bmNhdGVkQ29udGVudC0tYWxsJztcclxuXHRcdFx0dmFyIGJvZHlTZWxlY3RvciA9ICcuVHJ1bmNhdGVkQ29udGVudC0tYm9keSc7XHJcblxyXG5cdFx0XHQkKHJvb3RTZWxlY3RvcikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgJGVsID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkYWxsVHJ1bmNhdGVkID0gJGFsbFRydW5jYXRlZC5hZGQoJGVsKTtcclxuXHRcdFx0XHR2YXIgJGVsQm9keSA9ICRlbC5maW5kKGJvZHlTZWxlY3Rvcik7XHJcblx0XHRcdFx0dmFyIG1heExpbmVzID0gJGVsLmRhdGEoJ21heGxpbmVzJyk7XHJcblx0XHRcdFx0dmFyIGxpbmVIZWlnaHQgPSB3aW5kb3dcclxuXHRcdFx0XHRcdC5nZXRDb21wdXRlZFN0eWxlKCRlbC5maW5kKCc+IGRpdicpWzBdKVxyXG5cdFx0XHRcdFx0LmdldFByb3BlcnR5VmFsdWUoJ2xpbmUtaGVpZ2h0JylcclxuXHRcdFx0XHRcdC5yZXBsYWNlKCdweCcsICcnKTtcclxuXHRcdFx0XHR2YXIgbGluZUNvdW50ID0gTWF0aC5jZWlsKCRlbC5oZWlnaHQoKSAvIGxpbmVIZWlnaHQpO1xyXG5cdFx0XHRcdGlmIChsaW5lQ291bnQgPiBtYXhMaW5lcykge1xyXG5cdFx0XHRcdFx0JGVsQm9keS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRtYXhIZWlnaHQ6IGxpbmVIZWlnaHQgKiBtYXhMaW5lcyArICdweCcsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHZhciBzZW50ZW5jZSA9ICRlbC5kYXRhKCdhZGRpdGlvbmFsJykucmVwbGFjZSgne259JywgbGluZUNvdW50IC0gbWF4TGluZXMpO1xyXG5cdFx0XHRcdFx0JGVsLmFwcGVuZCgnPHAgY2xhc3M9XCInICsgb3BlbmVyU2VsZWN0b3IucmVwbGFjZSgnLicsICcnKSArICdcIj4nICsgc2VudGVuY2UgKyAnPC9wPicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkKHJvb3RTZWxlY3Rvcikub24oJ2NsaWNrJywgb3BlbmVyU2VsZWN0b3IsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBlbCA9ICQodGhpcykuY2xvc2VzdChyb290U2VsZWN0b3IpO1xyXG5cdFx0XHRcdG9wZW5UcnVuY2F0ZWRDb250ZW50KGVsKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRvcGVuVHJ1bmNhdGVkQ29udGVudCA9IGZ1bmN0aW9uKGVsKSB7XHJcblx0XHRcdFx0JChlbClcclxuXHRcdFx0XHRcdC5maW5kKGJvZHlTZWxlY3RvcilcclxuXHRcdFx0XHRcdC5jc3MoJ21heC1oZWlnaHQnLCAnbm9uZScpO1xyXG5cdFx0XHRcdCQoZWwpXHJcblx0XHRcdFx0XHQuZmluZChvcGVuZXJTZWxlY3RvcilcclxuXHRcdFx0XHRcdC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKHdpbmRvdy5mcmFtZUVsZW1lbnQgJiYgd2luZG93LmZyYW1lRWxlbWVudC5pZCA9PT0gJ3Rvb2x0aXBzdGVyLWZyYW1lJykge1xyXG5cdFx0XHRcdCQocm9vdFNlbGVjdG9yKS5vZmYoJ2NsaWNrJywgb3BlbmVyU2VsZWN0b3IpO1xyXG5cdFx0XHRcdCQob3BlbmVyU2VsZWN0b3IpLmFkZENsYXNzKCdpbi10b29sdGlwJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5UcnVuY2F0ZWRDb250ZW50ID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0b3BlbjogZnVuY3Rpb24oZWwpIHtcclxuXHRcdFx0b3BlblRydW5jYXRlZENvbnRlbnQoZWwpO1xyXG5cdFx0fSxcclxuXHRcdG9wZW5BbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkYWxsVHJ1bmNhdGVkLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0b3BlblRydW5jYXRlZENvbnRlbnQoJCh0aGlzKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBWZXJ0aWNhbENhcm91c2VsICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdCQuZm4udmVydGljYWxDYXJvdXNlbCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIGNhcm91c2VsQ29udGFpbmVyQ2xhc3MgPSAnVmVydGljYWxDYXJvdXNlbF9XcmFwcGVyJztcclxuXHRcdFx0dmFyIGNhcm91c2VsR3JvdXBDbGFzcyA9ICdWZXJ0aWNhbENhcm91c2VsX19MaXN0JztcclxuXHRcdFx0dmFyIGNhcm91c2VsR29VcENsYXNzID0gJ1ZlcnRpY2FsQ2Fyb3VzZWxfX19DaGFuZ2VVcCc7XHJcblx0XHRcdHZhciBjYXJvdXNlbEdvRG93bkNsYXNzID0gJ1ZlcnRpY2FsQ2Fyb3VzZWxfX19DaGFuZ2VEb3duJztcclxuXHJcblx0XHRcdHZhciBkZWZhdWx0cyA9IHsgY3VycmVudEl0ZW06IDEsIHNob3dJdGVtczogMSB9O1xyXG5cdFx0XHR2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcclxuXHJcblx0XHRcdHZhciBjYXJvdXNlbENvbnRhaW5lcjtcclxuXHRcdFx0dmFyIGNhcm91c2VsR3JvdXA7XHJcblx0XHRcdHZhciBjYXJvdXNlbFVwO1xyXG5cdFx0XHR2YXIgY2Fyb3VzZWxEb3duO1xyXG5cdFx0XHR2YXIgdG90YWxJdGVtcztcclxuXHJcblx0XHRcdHZhciBzZXRDb250YWluZXJIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY29udGFpbmVySGVpZ2h0ID0gMDtcclxuXHRcdFx0XHR2YXIgbWFyZ2luVG9wID0gMDtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5zaG93SXRlbXMgPT0gMSkge1xyXG5cdFx0XHRcdFx0Y29udGFpbmVySGVpZ2h0ID0gJCgnID4gc3BhbiA+IGRpdjpudGgtY2hpbGQoJyArIG9wdGlvbnMuY3VycmVudEl0ZW0gKyAnKScsIGNhcm91c2VsR3JvdXApLm91dGVySGVpZ2h0KHRydWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRmb3IgKGkgPSAxOyBpID09IG9wdGlvbnMuc2hvd0l0ZW1zOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0Y29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVySGVpZ2h0ICsgJCgnID4gZGl2Om50aC1jaGlsZCgnICsgaSArICcpJywgY2Fyb3VzZWxHcm91cCkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBuZXh0SXRlbSA9IG9wdGlvbnMuc2hvd0l0ZW1zICsgb3B0aW9ucy5jdXJyZW50SXRlbTtcclxuXHRcdFx0XHRtYXJnaW5Ub3AgPSAkKCcgPiBzcGFuID4gZGl2Om50aC1jaGlsZCgnICsgbmV4dEl0ZW0gKyAnKScsIGNhcm91c2VsR3JvdXApLmNzcygnbWFyZ2luVG9wJyk7XHJcblx0XHRcdFx0Y29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVySGVpZ2h0IC0gcGFyc2VJbnQobWFyZ2luVG9wKTtcclxuXHRcdFx0XHQkKGNhcm91c2VsQ29udGFpbmVyKS5jc3MoeyBoZWlnaHQ6IGNvbnRhaW5lckhlaWdodCB9KTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBzZXRPZmZzZXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudEl0ZW1PZmZzZXQgPSAkKCcgPiBzcGFuID4gZGl2Om50aC1jaGlsZCgnICsgb3B0aW9ucy5jdXJyZW50SXRlbSArICcpJywgY2Fyb3VzZWxHcm91cCkub2Zmc2V0KCk7XHJcblxyXG5cdFx0XHRcdHZhciBjYXJvdXNlbEdyb3VwT2Zmc2V0ID0gJChjYXJvdXNlbEdyb3VwKS5vZmZzZXQoKTtcclxuXHRcdFx0XHR2YXIgb2Zmc2V0RGlmZiA9IGNhcm91c2VsR3JvdXBPZmZzZXQudG9wIC0gY3VycmVudEl0ZW1PZmZzZXQudG9wO1xyXG5cclxuXHRcdFx0XHQkKCcuVmVydGljYWxDYXJvdXNlbF9fTGlzdCAuUHJlc2NyaXB0aW9uQ2FyZCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjREFFMEU0Jyk7XHJcblxyXG5cdFx0XHRcdCQoY2Fyb3VzZWxHcm91cCkuY3NzKHtcclxuXHRcdFx0XHRcdG1zVHJhbnNmb3JtOiAndHJhbnNsYXRlWShjYWxjKDM2JSArICcgKyBvZmZzZXREaWZmICsgJ3B4KSknLFxyXG5cdFx0XHRcdFx0d2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlWShjYWxjKDM2JSArICcgKyBvZmZzZXREaWZmICsgJ3B4KSknLFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWShjYWxjKDM2JSArICcgKyBvZmZzZXREaWZmICsgJ3B4KSknLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdCQoJyA+IHNwYW4gPiBkaXY6bnRoLWNoaWxkKCcgKyBvcHRpb25zLmN1cnJlbnRJdGVtICsgJyknLCBjYXJvdXNlbEdyb3VwKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnI2ZmZicpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIGZldGNoQ2FyZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICgkKCcjJyArIENhcmRJZCkpIHtcclxuXHRcdFx0XHRcdGN1cnJlbnRJdGVtID1cclxuXHRcdFx0XHRcdFx0JCgnIycgKyBDYXJkSWQpXHJcblx0XHRcdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHRcdFx0LmluZGV4KCkgKyAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciB1cGRhdGVOYXZpZ2F0aW9uID0gZnVuY3Rpb24oZGlyZWN0aW9uKSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuY3VycmVudEl0ZW0gPT0gMSkge1xyXG5cdFx0XHRcdFx0JChjYXJvdXNlbFVwKS5hZGRDbGFzcygnaXNEaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy5jdXJyZW50SXRlbSA+IDEpIHtcclxuXHRcdFx0XHRcdCQoY2Fyb3VzZWxVcCkucmVtb3ZlQ2xhc3MoJ2lzRGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuY3VycmVudEl0ZW0gPT0gdG90YWxJdGVtcyB8fCBvcHRpb25zLmN1cnJlbnRJdGVtICsgb3B0aW9ucy5zaG93SXRlbXMgPiB0b3RhbEl0ZW1zKSB7XHJcblx0XHRcdFx0XHQkKGNhcm91c2VsRG93bikuYWRkQ2xhc3MoJ2lzRGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuY3VycmVudEl0ZW0gPCB0b3RhbEl0ZW1zKSB7XHJcblx0XHRcdFx0XHQkKGNhcm91c2VsRG93bikucmVtb3ZlQ2xhc3MoJ2lzRGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgbW92ZUNhcm91c2VsID0gZnVuY3Rpb24oZGlyZWN0aW9uKSB7XHJcblx0XHRcdFx0aWYgKGRpcmVjdGlvbiA9PSAndXAnKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmN1cnJlbnRJdGVtID0gb3B0aW9ucy5jdXJyZW50SXRlbSAtIDE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChkaXJlY3Rpb24gPT0gJ2Rvd24nKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmN1cnJlbnRJdGVtID0gb3B0aW9ucy5jdXJyZW50SXRlbSArIDE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHVwZGF0ZU5hdmlnYXRpb24oKTtcclxuXHRcdFx0XHRzZXRDb250YWluZXJIZWlnaHQoKTtcclxuXHRcdFx0XHRzZXRPZmZzZXQoKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy4nICsgY2Fyb3VzZWxHcm91cENsYXNzICsgJywgLlZlcnRpY2FsQ2Fyb3VzZWxfX0NvbnRyb2xsZXJzJylcclxuXHRcdFx0XHRcdC53cmFwQWxsKCc8ZGl2IGNsYXNzPVwiJyArIGNhcm91c2VsQ29udGFpbmVyQ2xhc3MgKyAnXCI+PC9kaXY+Jyk7XHJcblx0XHRcdFx0Y2Fyb3VzZWxDb250YWluZXIgPSAkKHRoaXMpLmZpbmQoJy4nICsgY2Fyb3VzZWxDb250YWluZXJDbGFzcyk7XHJcblx0XHRcdFx0Y2Fyb3VzZWxHcm91cCA9ICQodGhpcykuZmluZCgnLicgKyBjYXJvdXNlbEdyb3VwQ2xhc3MpO1xyXG5cdFx0XHRcdGNhcm91c2VsVXAgPSAkKHRoaXMpLmZpbmQoJy4nICsgY2Fyb3VzZWxHb1VwQ2xhc3MpO1xyXG5cdFx0XHRcdGNhcm91c2VsRG93biA9ICQodGhpcykuZmluZCgnLicgKyBjYXJvdXNlbEdvRG93bkNsYXNzKTtcclxuXHRcdFx0XHR0b3RhbEl0ZW1zID0gJCgnLicgKyBjYXJvdXNlbEdyb3VwQ2xhc3MgKyAnID4gc3BhbicpLmNoaWxkcmVuKCkubGVuZ3RoO1xyXG5cdFx0XHRcdHVwZGF0ZU5hdmlnYXRpb24oKTtcclxuXHRcdFx0XHRzZXRDb250YWluZXJIZWlnaHQoKTtcclxuXHRcdFx0XHRzZXRPZmZzZXQoKTtcclxuXHRcdFx0XHQkKGNhcm91c2VsVXApLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zLmN1cnJlbnRJdGVtID4gMSkge1xyXG5cdFx0XHRcdFx0XHRtb3ZlQ2Fyb3VzZWwoJ3VwJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0JChjYXJvdXNlbERvd24pLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb25zLmN1cnJlbnRJdGVtICsgb3B0aW9ucy5zaG93SXRlbXMgPD0gdG90YWxJdGVtcykge1xyXG5cdFx0XHRcdFx0XHRtb3ZlQ2Fyb3VzZWwoJ2Rvd24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0JCgnLlZlcnRpY2FsQ2Fyb3VzZWwuT3BlbicpLmJpbmQoJ21vdXNld2hlZWwnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRpZiAoZS5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGEgLyAxMjAgPiAwKSB7XHJcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLmN1cnJlbnRJdGVtID4gMSkge1xyXG5cdFx0XHRcdFx0XHRcdG1vdmVDYXJvdXNlbCgndXAnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5jdXJyZW50SXRlbSArIG9wdGlvbnMuc2hvd0l0ZW1zIDw9IHRvdGFsSXRlbXMpIHtcclxuXHRcdFx0XHRcdFx0XHRtb3ZlQ2Fyb3VzZWwoJ2Rvd24nKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBvbk9wZW4gPSBmdW5jdGlvbihjYXJkTnVtYmVyKSB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLlZlcnRpY2FsQ2Fyb3VzZWwnKS52ZXJ0aWNhbENhcm91c2VsKHtcclxuXHRcdFx0XHRjdXJyZW50SXRlbTogY2FyZE51bWJlcixcclxuXHRcdFx0XHRzaG93SXRlbXM6IDEsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JCgnLlBhZ2UnKS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0JCgnLlZlcnRpY2FsQ2Fyb3VzZWxfX19DbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJy5WZXJ0aWNhbENhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ09wZW4nKTtcclxuXHRcdFx0XHQkKCcuUGFnZScpLmNzcygnb3ZlcmZsb3cnLCAnaW5pdGlhbCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5WZXJ0aWNhbENhcm91c2VsID0geyBjcmVhdGUsIG9uT3BlbiB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8vU2FwcGhpcmVXaWRnZXRzID0gd2luZG93LlNhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgfHwge307XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=