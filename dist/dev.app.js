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
/******/ 	var hotCurrentHash = "adb74b41cf7de6806b02";
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

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

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
	"./05-components/v3-pat/comp-line/scripts.js": "./src/components/05-components/v3-pat/comp-line/scripts.js",
	"./05-components/v3-pat/data-tables/scripts.js": "./src/components/05-components/v3-pat/data-tables/scripts.js",
	"./05-components/v3-pat/datetime-range-picker/scripts.js": "./src/components/05-components/v3-pat/datetime-range-picker/scripts.js",
	"./05-components/v3-pat/dropdown-categories/scripts.js": "./src/components/05-components/v3-pat/dropdown-categories/scripts.js",
	"./05-components/v3-pat/dropzone/plugin.js": "./src/components/05-components/v3-pat/dropzone/plugin.js",
	"./05-components/v3-pat/expandable-link/scripts.js": "./src/components/05-components/v3-pat/expandable-link/scripts.js",
	"./05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js": "./src/components/05-components/v3-pat/fullscreen-tabs-wrapper/scripts.js",
	"./05-components/v3-pat/generic-gallery/scripts.js": "./src/components/05-components/v3-pat/generic-gallery/scripts.js",
	"./05-components/v3-pat/horizontal-toolbar/scripts.js": "./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js",
	"./05-components/v3-pat/hour-picker/scripts.js": "./src/components/05-components/v3-pat/hour-picker/scripts.js",
	"./05-components/v3-pat/input-with-clear/scripts.js": "./src/components/05-components/v3-pat/input-with-clear/scripts.js",
	"./05-components/v3-pat/location-box/scripts.js": "./src/components/05-components/v3-pat/location-box/scripts.js",
	"./05-components/v3-pat/main-interactive-card/scripts.js": "./src/components/05-components/v3-pat/main-interactive-card/scripts.js",
	"./05-components/v3-pat/menu-bar/scripts.js": "./src/components/05-components/v3-pat/menu-bar/scripts.js",
	"./05-components/v3-pat/multiple-selection-button/scripts.js": "./src/components/05-components/v3-pat/multiple-selection-button/scripts.js",
	"./05-components/v3-pat/panel/confirmation-panel.js": "./src/components/05-components/v3-pat/panel/confirmation-panel.js",
	"./05-components/v3-pat/panel/panel-by-id-notify.js": "./src/components/05-components/v3-pat/panel/panel-by-id-notify.js",
	"./05-components/v3-pat/panel/panel-by-id.js": "./src/components/05-components/v3-pat/panel/panel-by-id.js",
	"./05-components/v3-pat/panel/popup-menu.js": "./src/components/05-components/v3-pat/panel/popup-menu.js",
	"./05-components/v3-pat/panel/sapphire-panel.js": "./src/components/05-components/v3-pat/panel/sapphire-panel.js",
	"./05-components/v3-pat/panel/scripts.js": "./src/components/05-components/v3-pat/panel/scripts.js",
	"./05-components/v3-pat/patient-call-cancel/scripts.js": "./src/components/05-components/v3-pat/patient-call-cancel/scripts.js",
	"./05-components/v3-pat/person-card/scripts.js": "./src/components/05-components/v3-pat/person-card/scripts.js",
	"./05-components/v3-pat/prescription-card/scripts.js": "./src/components/05-components/v3-pat/prescription-card/scripts.js",
	"./05-components/v3-pat/prescription-expandable/scripts.js": "./src/components/05-components/v3-pat/prescription-expandable/scripts.js",
	"./05-components/v3-pat/sapphire-header/scripts.js": "./src/components/05-components/v3-pat/sapphire-header/scripts.js",
	"./05-components/v3-pat/sapphire-radio-button/scripts.js": "./src/components/05-components/v3-pat/sapphire-radio-button/scripts.js",
	"./05-components/v3-pat/section-expandable-custom/scripts.js": "./src/components/05-components/v3-pat/section-expandable-custom/scripts.js",
	"./05-components/v3-pat/section-expandable-inside/scripts.js": "./src/components/05-components/v3-pat/section-expandable-inside/scripts.js",
	"./05-components/v3-pat/select-system/scripts.js": "./src/components/05-components/v3-pat/select-system/scripts.js",
	"./05-components/v3-pat/shift-container/scripts.js": "./src/components/05-components/v3-pat/shift-container/scripts.js",
	"./05-components/v3-pat/sidebar/sidebar-structure.js": "./src/components/05-components/v3-pat/sidebar/sidebar-structure.js",
	"./05-components/v3-pat/spinner-horizontal/scripts.js": "./src/components/05-components/v3-pat/spinner-horizontal/scripts.js",
	"./05-components/v3-pat/spinner-vertical/scripts.js": "./src/components/05-components/v3-pat/spinner-vertical/scripts.js",
	"./05-components/v3-pat/split-button/scripts.js": "./src/components/05-components/v3-pat/split-button/scripts.js",
	"./05-components/v3-pat/ssd-component-block/scripts.js": "./src/components/05-components/v3-pat/ssd-component-block/scripts.js",
	"./05-components/v3-pat/ssd-list-line/scripts.js": "./src/components/05-components/v3-pat/ssd-list-line/scripts.js",
	"./05-components/v3-pat/table-data/scripts.js": "./src/components/05-components/v3-pat/table-data/scripts.js",
	"./05-components/v3-pat/tabs-extended/scripts.js": "./src/components/05-components/v3-pat/tabs-extended/scripts.js",
	"./05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js": "./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js",
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
(function ($, window, document, SapphireWidgets) {

	var create = function (config) {
		window[config.widgetId] = new LayoutBase(config);
		SapphireWidgets.LayoutBase.widgetId = config.widgetId;
	};

	var openSidebarIframe = function (duration) {
		window[SapphireWidgets.LayoutBase.widgetId].openSidebarIframe(duration);
	};

	var closeSidebarIframe = function (duration) {
		window[SapphireWidgets.LayoutBase.widgetId].closeSidebarIframe(duration);
	};

	var scrollToElement = function ($element) {
		var $targetElement = $element;
		if (!!$targetElement.length) {
			var scrollToOffsetInterval;
			scrollToOffsetInterval = setInterval(function () {
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
						discount = 260;
					}

					$('body, html').scrollTop(targetElementOffsetTop - discount);
				}
			}, 250);
		}
	};

	var LayoutBase = function (config) {
		var _this = this;
		this.layoutBaseRedrawTimer = 0;
		this.hasHeader = config.hasHeader;
		this.isExpandable = config.isExpandable;
		this.isTopWindow = window.top === window.self ? true : false;
		this.$widget = $('#' + config.widgetId);
		this.$wrapper = this.$widget.find('.LayoutBase-Wrapper');
		this.$spacer = this.$widget.find('.LayoutBase-spacer');
		// this.$layoutBaseContent = this.$widget.find('.LayoutBase-Content');
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
		// this.referenceHeight = null;
		this.setupWindowEvents();
		this.$iframeSidebar.append('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
		$(function () {
			$('body').addClass('LayoutBase');
			if (_this.isTopWindow) {
				$('body').css('overflow-y', 'scroll');
			}
		});
		$(window).load(function () {
			$(window).scroll();
			// _this.referenceHeight = $('body')[0].scrollHeight;
		})
	};

	LayoutBase.prototype.setupWindowEvents = function () {

		var _this = this;

		$(window).resize(function () {
			_this.updateThresholds();
			_this.handleOptionalContainers();
			_this.handleLayoutTopPadding();
			_this.handleLayoutBottomPadding();
		});

		$(window).scroll(function () {
			window.clearTimeout(_this.layoutBaseRedrawTimer);
			_this.layoutBaseRedrawTimer = window.setTimeout(function () {
				// console.log('=====');
				// console.log('window', $(window).height());
				// console.log('scrollheight', $('body')[0].scrollHeight);
				// console.log('referenceHeight', _this.referenceHeight);
				_this.updateThresholds();
				_this.handleOptionalContainers();
				_this.handleLayoutTopPadding();
				_this.handleLayoutBottomPadding();
			}, 100);
		});

	};

	LayoutBase.prototype.handleOptionalContainers = function () {
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

			if (this.$secondaryMenu.text().length === 0) {
				this.$secondary.addClass('noToolbar');
			}

			if (scrollTop + this.contentThreshold + (this.$emergency.outerHeight(true) || 0) > this.secondaryThreshold) {
				this.$secondary.addClass('isFixed').css({
					top: this.contentThreshold + (this.$emergency.outerHeight(true) || 0),
					width: this.$header.width(),
				});
				this.$secondary.find('.Button.Second, .Button.Third').not('.Panel .Button.Small, .Panel .Button.Third').addClass('Small');
				if (this.$secondary.find('.Toolbar').length === 1) {
					var targetToolbarWidth = $('.SapphireHeader').outerWidth(true) * 0.66;
					this.$secondary.find('.Toolbar').width(targetToolbarWidth);
				}
				if (this.$secondaryMenu.text().length === 0) {
					this.$secondary.addClass('noToolbar');
				}
				this.$primaryMenu.css('opacity', 0);
				this.extraPaddingSecondary = this.$secondary.outerHeight(true);

				// //
				// var currentHeight = $('body')[0].scrollHeight;
				// var compensation = this.referenceHeight - currentHeight;
				// console.log(compensation);

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
				this.$secondary.find('.Button.Second, .Button.Third').removeClass('Small');
				this.$primaryMenu.css('opacity', 1);
				this.$secondary.css({
					height: 'unset',
				});
				this.$secondary.find('.Toolbar').css('width', '100%');
				this.extraPaddingSecondary = 0;
			}

			if (this.$secondaryMenu.text().length > 0) {
				this.$widget.find('.ClinicianWorkArea-columns-big').css('margin-top', 'unset');
			} else {
				this.$widget.find('.ClinicianWorkArea-columns-big').css('margin-top', -this.$secondary.outerHeight(true));
				this.$secondaryMenu.css('background-color', 'transparent');
			}
		}
	};

	LayoutBase.prototype.handleLayoutTopPadding = function () {
		var paddingTop = this.contentThreshold + this.extraPaddingEmergency + this.extraPaddingSecondary;
		this.$spacer.stop().animate({
			height: paddingTop,
		}, 0, 'linear');
		if (this.$topfixedContent.length === 1) {
			this.$topfixedContent.css({
				width: $('.LayoutBase-MainContent').width(),
				top: this.topfixedContentThreshold + 'px',
			});
		}
	};

	LayoutBase.prototype.handleLayoutBottomPadding = function () {
		if (this.$bottomfixedContent.length === 1) {
			if ($('body')[0].scrollHeight > $('body').height()) {
				var bottomFixedHeight = this.$bottomfixedContent.outerHeight(true);
				this.$wrapper.addClass('hasFixedBottom').css('padding-bottom', bottomFixedHeight + 'px');
				this.$bottomfixedContent.css({
					width: $('.LayoutBase-MainContent').outerWidth(true)
				});
			} else {
				this.$wrapper.removeClass('hasFixedBottom').css('padding-bottom', '');
				this.$bottomfixedContent.css({
					width: ''
				});
			}
		}
	};

	LayoutBase.prototype.updateThresholds = function () {
		var mainMenuHeight = this.$mainMenu.outerHeight(true) || 0;
		var headerBodyHeight = this.$headerBody.outerHeight(true) || this.$header.outerHeight(true) || 0;
		var topfixedContentHeight = this.$topfixedContent.outerHeight(true) || 0;
		var primaryMenuHeight = this.$primaryMenu.outerHeight(true) || 0;
		var emergencyHeight = this.$emergency.outerHeight(true) || 0;
		this.topfixedContentThreshold = mainMenuHeight + headerBodyHeight;
		this.contentThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight;
		this.emergencyThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight + primaryMenuHeight;
		this.secondaryThreshold = mainMenuHeight + headerBodyHeight + topfixedContentHeight + primaryMenuHeight + emergencyHeight;
	};

	LayoutBase.prototype.getThresholds = function () {
		return {
			topfixedContentThreshold: this.topfixedContentThreshold,
			contentThreshold: this.contentThreshold,
			emergencyThreshold: this.emergencyThreshold,
			secondaryThreshold: this.secondaryThreshold,
		};
	};

	LayoutBase.prototype.openSidebarIframe = function (duration_in) {
		var duration = duration_in >= 0 ? duration_in : 100;
		this.$iframeSidebar.animate({
			width: '100%',
		}, duration);
		$('body').css('overflow-y', 'scroll');
		$('.tooltipstered').tooltipster('hide');
	};

	LayoutBase.prototype.closeSidebarIframe = function (duration_in) {
		var duration = duration_in >= 0 ? duration_in : 100;
		var targetWidth = this.isExpandable ? 40 : 262;
		this.$iframeSidebar.animate({
			width: targetWidth,
		}, duration);
		$('body').css('overflow-y', 'scroll');
	};

	SapphireWidgets.LayoutBase = {
		create: create,
		closeSidebarIframe: closeSidebarIframe,
		openSidebarIframe: openSidebarIframe,
		scrollToElement: scrollToElement,
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
$(function() {
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
(function ($, window, document, SapphireWidgets) {
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

	const create = function (config) {

		SapphireWidgets.LayoutPopup.config = config;
		popupSize = SapphireWidgets.LayoutPopup.config.PopupSize;

		$(function () {
			$('body').addClass('LayoutPopup'); // because datetimerangepicker is attached to body
			if (SapphireWidgets.LayoutPopup.config.isTouch) {
				$popup.addClass('isTouch');
				$('body').addClass('isTouch'); // because select2 is attached to body
			}
			var observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation, index) {
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

		$(window).load(function () {
			$(this.frameElement).css({
				width: '100%',
				height: '100%'
			});
			setTimeout(function () {
				resizeDialog();
				resizeContent();
				$('body').css('visibility', 'visible');
			}, 150);
			osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.LayoutPopup.redrawDialogWindow);
		});

		$(window.parent).off('resize.LayoutPopup').on('resize.LayoutPopup', function () {
			redrawDialogWindow();
		});
	};

	const redrawDialogWindow = function () {
		clearTimeout(layoutPopupResizeTimer);
		layoutPopupResizeTimer = setTimeout(function () {
			resizeDialog();
			resizeContent();
		}, 300);
	};

	const resizeDialog = function () {
		if (SapphireWidgets.LayoutPopup.config.hasClose) {
			window.parent.$('.os-internal-ui-dialog-titlebar').show();
		}

		if (window.top.$('body').hasClass('LayoutBase')) {
			window.top.$('body').css({
				overflowY: 'hidden'
			});
		}

		$overlay.width('100%');

		var windowHeight = $(window.parent).height();
		var windowWidth = $(window.parent).width();

		if (popupSize === 'Small') {
			popupWidth = parseInt(windowWidth * 0.33);
			popupMinWidth = 400;
		} else if (popupSize === 'Medium') {
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
					popupMinWidth = 600;
					popupWidthPercentage = 0.6;
					break;
				default:
					popupMinWidth = 700;
					popupWidthPercentage = 0.7;
			}

			popupWidth = SapphireWidgets.LayoutPopup.config.isTouch ? parseInt(windowWidth * 0.8) : parseInt(windowWidth * popupWidthPercentage);
			popupMinHeight = 200;
			popupMaxHeight = SapphireWidgets.LayoutPopup.config.isTouch ? parseInt(windowHeight * 0.9) : parseInt(windowHeight * 0.7);

			if (SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				popupHeight = popupMaxHeight;
			} else {
				popupHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();
			}

			$osPopupContent.css({
				maxHeight: popupMaxHeight + 'px',
				minHeight: popupMinHeight + 'px',
				height: popupHeight + 'px',
			});
		} else if (popupSize === 'Large') {
			popupMinWidth = parseInt(windowWidth * 0.8);
			popupMaxHeight = parseInt(windowHeight * 0.9);
		}

		$osPopup.css({
			position: 'fixed',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			height: 'auto',
			minWidth: popupMinWidth + 'px',
			width: popupWidth + 'px',
		});
	};

	const resizeContent = function () {
		var $body = $('.LayoutPopup__body__content');
		var contentScrollTop = $body.scrollTop();

		if (popupSize === 'Small' && $('.daterangepicker:visible').length > 0) {
			// skip the reset of .LayoutPopup__body__content
		} else {
			$body.css({
				height: 'auto'
			});
		}

		var headerHeight = $('.LayoutPopup__header').innerHeight() || 0;
		var introHeight = $('.LayoutPopup__intro').innerHeight() || 0;
		var bodyHeight = $('.LayoutPopup__body__content')[0].scrollHeight || 0;
		var footerHeight = $('.LayoutPopup__footer').innerHeight() || 0;
		var contentHeight = headerHeight + introHeight + bodyHeight + footerHeight + 40;
		var dialogHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();

		if (popupSize === 'Small') {
			$osPopupContent.height(contentHeight);
		} else {
			if (contentHeight < dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - 40;
				$body.height(forcedBodyHeight);
			} else if (contentHeight < dialogHeight) {
				$osPopupContent.height(contentHeight);
				if (contentHeight < popupMinHeight) {
					var diference = popupMinHeight - contentHeight;
					$body.height(bodyHeight + diference);
				}
			} else if (contentHeight >= dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
				var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - 40;
				$body.height(forcedBodyHeight);
			} else if (contentHeight >= dialogHeight) {
				if (contentHeight > popupMaxHeight) {
					$osPopupContent.height(popupMaxHeight);
					var forcedBodyHeight = popupMaxHeight - headerHeight - introHeight - footerHeight - 40;
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
				$('.LayoutPopup__body__content').height(bodyHeight + difference + 40);
				$osPopupContent.height($('body')[0].scrollHeight);
			}
		}

		$body.scrollTop(contentScrollTop);
	};

	const increaseHeight = function (diference) {
		$osPopupContent.height($osPopupContent.height() + diference);
	};

	const scrollToElement = function ($element) {
		var $targetElement = $element;
		if (!!$targetElement.length) {
			var scrollToOffsetInterval;
			scrollToOffsetInterval = setInterval(function () {
				clearInterval(scrollToOffsetInterval);
				var headerHeight = $('.LayoutPopup__header').outerHeight(true) || 0;
				var introHeight = $('.LayoutPopup__intro').outerHeight(true) || 0;
				var currentBodyScroll = $('.LayoutPopup__body__content')[0].scrollTop || 0;
				var targetElementOffsetTop = $targetElement.offset().top - headerHeight - introHeight + currentBodyScroll - 20;
				$('.LayoutPopup__body__content').scrollTop(targetElementOffsetTop);
			}, 250);
		}
	}

	SapphireWidgets.LayoutPopup = {
		create,
		resizeDialog,
		resizeContent,
		increaseHeight,
		redrawDialogWindow,
		scrollToElement
	};

})(jQuery, window, document, SapphireWidgets);

$(window).unload(function () {
	if (!!$('.LayoutPopup').length) {
		window.top.$('body').css({
			overflowY: 'scroll'
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
(function($, window, SapphireWidgets) {
	var create = function(config) {
		var $triggerElement = $('#' + config.triggerElement);
		var $contentElement = $('#' + config.contentElement);

		if ($contentElement.text().length < 1) {
			$triggerElement.hide();
		}

		$(function() {
			// inside a document ready due to sapphire popup binded events
			window.setTimeout(function() {
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
					theme:
						'tooltipster-location--' +
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

	SapphireWidgets.ActionsMenu = { create };
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

/***/ "./src/components/05-components/v3-pat/data-tables/scripts.js":
/*!********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/data-tables/scripts.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {

  class DataTables {

    constructor(config) {
      this.config = config;
      this.$widget = $(`#${config.widgetId}`);
      this.$table = this.$widget.find('table');
      this.$table.addClass(config.baseStyle);
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
      }

      $(() => {
        this.$table.DataTable(this.options);
      });
    }

  }

  const create = config => (window[config.widgetId] = new DataTables(config));

  SapphireWidgets.DataTables = {
    create
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
(function ($, window, document, SapphireWidgets) {
	var allDateTimeRangePickers = [];

	var create = function (config) {
		for (var i = 0; i < allDateTimeRangePickers.length; i++) {
			if (allDateTimeRangePickers[i].config.widgetId === config.widgetId) {
				allDateTimeRangePickers.splice(i, 1);
			}
		}
		window[config.widgetId] = new DateTimeRangePicker(config);
		allDateTimeRangePickers.push(window[config.widgetId]);
	};

	var DateTimeRangePicker = function (config) {
		this.config = config;
		this.currentLocale = config.currentLocale;

		this.$widget = $('#' + config.widgetId);
		this.$widget.addClass('DateTimeRangePicker');
		this.$clear = this.$widget.find('.DateTimeRangePicker-clear');
		this.$label = this.$widget.find('.DateTimeRangePicker-label');

		this.isEmptyHour = false;

		if (this.config.attachToInput) {
			this.$widget.addClass('attachedInput');
			this.$input = this.$widget.find(
				'.DateTimeRangePicker-placeholder input[type="text"]'
			);
			this.$displayed = this.$widget.find(
				'.DateTimeRangePicker-displayed input[type="text"]'
			);
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
				this.config.formatLabel = this.config.hasYearWhenText ?
					'D MMM YYYY' + stringConnection + ' HH:mm' :
					'D MMM' + stringConnection + ' HH:mm';
			} else {
				this.config.formatInput = 'DD-MM-YYYY hh:mm A';
				this.config.formatLabel = this.config.hasYearWhenText ?
					'D MMM YYYY' + stringConnection + ' hh:mm A' :
					'D MMM' + stringConnection + ' hh:mm A';
			}
		} else {
			this.$widget.addClass('onlyDate');
			if (this.config.attachToInput) {
				this.$displayed.prop('placeholder', 'DD-MM-YYYY');
			} else {
				this.$input.prop('placeholder', 'DD-MM-YYYY');
			}
			this.config.formatInput = 'DD-MM-YYYY';
			this.config.formatLabel = this.config.hasYearWhenText ?
				'D MMM YYYY' :
				'D MMM';
		}

		this.config.formatLabel = this.config.hasWeekDayNameWhenText ?
			'ddd[, ]' + this.config.formatLabel :
			this.config.formatLabel;

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
			options.isInvalidDate = function (date) {
				return disabledWeekDays.includes(
					moment(date)
					.day()
					.toString()
				);
			};
		}

		this.$input.daterangepicker(options, function (startDate, endDate, label) {
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

	DateTimeRangePicker.prototype.handleCustomValidation = function () {
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

	DateTimeRangePicker.prototype.nativeEvents = function () {
		var _this = this;
		this.$input.on('showCalendar.daterangepicker', function (event, picker) {
			if (_this.config.hasGoToday) {
				_this.$calendar
					.find('.calendar-table thead tr')
					.eq(0)
					.after(
						'<tr><td colspan="7" class="DateTimeRangePicker-calendar-gotoday">' +
						'Today' +
						'</td></tr>'
					);
				if (_this.config.drops === 'up') {
					_this.$calendar.css('top', _this.$calendar.offset().top - 24);
				}
			}
			_this.handleViewportPosition();
		});
		this.$input.on('show.daterangepicker', function (event, picker) {
			if (_this.config.timePicker && _this.config.hasClearHour) {
				_this.$calendar
					.find('.calendar-time')
					.append('<span class="DateTimeRangePicker-calendar-clear"></span>');
				if (_this.isEmptyHour) {
					_this.$timeHolder.css('opacity', 0.5);
					_this.$calendar
						.find('.DateTimeRangePicker-calendar-clear')
						.addClass('disabled');
				} else {
					_this.$timeHolder.css('opacity', 1);
					_this.$calendar.find('.DateTimeRangePicker-calendar-clear').removeClass('disabled');
				}
			}
			_this.handleViewportPosition();
			SapphireWidgets.DateTimeRangePicker.openedWidgetId = _this.config.widgetId;
		});
		this.$input.on('hide.daterangepicker', function (event, picker) {
			_this.$calendar.find('.DateTimeRangePicker-calendar-clear').remove();
			_this.updateParentIframe();
		});
		this.$input.on('cancel.daterangepicker', function (event, picker) {});
		this.$input.on('outsideClick.daterangepicker', function (event, picker) {});
		this.$input.on('timechanged.daterangepicker', function (event, picker) {
			_this.isEmptyHour = false;
			_this.$timeHolder.css('opacity', 1);
			if (_this.config.hasClearHour) {
				_this.$calendar
					.find('.calendar-time')
					.append('<span class="DateTimeRangePicker-calendar-clear"></span>');
			}
			if (_this.config.autoApply) {
				_this.$clear.removeClass('disabled');
				_this.updateLabeling();
				_this.sendNotification();
			}
		});
		this.$input.on('clickDate.daterangepicker', function (event, picker) {
			if (_this.config.autoApply) {
				_this.$clear.removeClass('disabled');
				_this.updateLabeling();
				_this.sendNotification();
			}
		});
		this.$input.on('apply.daterangepicker', function (event, picker) {
			_this.$clear.removeClass('disabled');
			_this.updateLabeling();
			_this.sendNotification();
		});
	};

	DateTimeRangePicker.prototype.customEvents = function () {
		var _this = this;
		this.$label.off('click').on('click', function (event) {
			_this.picker.toggle();
		});
		this.$clear.off('click').on('click', function (event) {
			_this.clear();
			_this.picker.hide();
		});
		this.$calendar.on('click', '.DateTimeRangePicker-calendar-clear', function () {
			if (_this.config.timePicker24Hour) {
				_this.$calendar.find('.hourselect').val('0').trigger('change');
			} else {
				_this.$calendar.find('.hourselect').val('12').trigger('change');
			}
			_this.$calendar.find('.minuteselect').val('0').trigger('change');
			_this.$calendar.find('.ampmselect').val('AM').trigger('change');
			_this.isEmptyHour = true;
			_this.$timeHolder.css('opacity', 0.5);
			_this.$calendar.find('.DateTimeRangePicker-calendar-clear').addClass('disabled');
		});
		this.$calendar.on('click', '.DateTimeRangePicker-calendar-gotoday', function () {
			_this.picker.setStartDate(moment());
			_this.picker.setEndDate(moment());
			_this.picker.hide();
			if (!_this.config.autoUpdateInput || _this.config.hasTextTrigger || _this.config.attachToInput) {
				_this.updateLabeling();
			}
			_this.sendNotification();
		});
		if (this.config.attachToInput) {
			this.$displayed.on('click focus', function () {
				_this.$input.trigger('click');
			});
			this.$displayed.on('keyup', function (evt) {
				_this.$input.val(_this.$displayed.val()).trigger('keyup');
			});
		} else {
			this.$input.on('click', function () {
				window.setTimeout(function () {
					_this.updateParentIframe();
				}, 50);
			});
		}
	};

	DateTimeRangePicker.prototype.updateLabeling = function () {
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
			labelMask = labelMask
				.replace('hh:mm A', '[--:--]')
				.replace('HH:mm', '[--:--]');
			inputMask = inputMask
				.replace('hh:mm A', '[--:--]')
				.replace('HH:mm', '[--:--]');
			if (this.config.hasTextTrigger) {
				this.$label.html(this.picker.startDate.format(labelMask));
				if (this.config.timePicker) {
					this.$input.val(
						this.picker.startDate.format('DD-MM-YYYY [00:00:00]')
					);
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
					this.$displayed.val(this.picker.startDate.format(this.config.formatInput));
					if (this.config.timePicker) {
						this.$input.val(this.picker.startDate.format('DD-MM-YYYY HH:mm:ss'));
					} else {
						this.$input.val(this.picker.startDate.format('DD-MM-YYYY'));
					}
				} else {
					this.$input.val(this.picker.startDate.format(this.config.formatInput));
				}
			}
		}
	};

	DateTimeRangePicker.prototype.handleViewportPosition = function () {
		if (window.frameElement && ($(window.frameElement.parentElement).hasClass('tooltipster-content') || $(window.frameElement.parentElement).hasClass('os-internal-ui-dialog-content'))) {
			return;
		}

		if (!this.isInViewport()) {
			var coords = this.$calendar[0].getBoundingClientRect();
			if (this.$calendar.hasClass('drop-up') && this.$calendar[0].getBoundingClientRect().top < 0) {
				var point = window.scrollY + coords.bottom + this.$input.height() + 7;
				this.$calendar.removeClass('drop-up').addClass('drop-down').css('top', point);
			} else if (!this.$calendar.hasClass('drop-up') && this.$calendar[0].getBoundingClientRect().bottom > (window.innerHeight || document.documentElement.clientHeight)) {
				var point = window.scrollY + coords.top - coords.height - this.$input.height() - 7;
				this.$calendar.addClass('drop-up').css('top', point);
			}
		}
	};

	DateTimeRangePicker.prototype.isInViewport = function () {
		var bounding = this.$calendar[0].getBoundingClientRect();
		return (bounding.top >= 0 && bounding.bottom <= (window.innerHeight + 5 || document.documentElement.clientHeight + 5));
	};

	DateTimeRangePicker.prototype.clear = function (sendNotification) {
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

	DateTimeRangePicker.prototype.show = function () {
		this.picker.show();
	};

	DateTimeRangePicker.prototype.hide = function () {
		this.picker.hide();
	};

	DateTimeRangePicker.prototype.cancel = function () {
		this.picker.clickCancel();
	};

	DateTimeRangePicker.prototype.sendNotification = function (sendDate) {
		if (this.$widget.hasClass('attachedInput')) {
			this.$input.trigger('change');
			return false;
		}
		if (sendDate || sendDate == undefined) {
			if (this.isEmptyHour) {
				OsNotifyWidget(
					this.config.dateTimeRangePickerFakeNotifyId,
					this.picker.startDate.format('DD-MM-YYYY [00:00:00]') +
					'|' +
					this.isEmptyHour
				);
			} else {
				if (this.config.timePicker) {
					OsNotifyWidget(
						this.config.dateTimeRangePickerFakeNotifyId,
						this.picker.startDate.format('DD-MM-YYYY HH:mm:ss') +
						'|' +
						this.isEmptyHour
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

	DateTimeRangePicker.prototype.updateParentIframe = function () {
		if (typeof SapphireWidgets.ResizeParentIframe === 'object') {
			SapphireWidgets.ResizeParentIframe.resize();
		}
		if ($('.Page.LayoutPopup').length === 1) {
			SapphireWidgets.LayoutPopup.redrawDialogWindow();
		}
	}

	SapphireWidgets.DateTimeRangePicker = {
		create: create,
		all: function () {
			return allDateTimeRangePickers;
		},
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
(function($, window, SapphireWidgets) {
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

/***/ "./src/components/05-components/v3-pat/dropzone/plugin.js":
/*!****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/dropzone/plugin.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* Component Dropzone (Plugin) */


var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
})();

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true,
		},
	});
	if (superClass)
		Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

// The Emitter class provides the ability to call `.on()` on Dropzone to listen
// to events.
// It is strongly based on component's emitter class, and I removed the
// functionality because of the dependency hell with different frameworks.
var Emitter = (function() {
	function Emitter() {
		_classCallCheck(this, Emitter);
	}

	_createClass(Emitter, [
		{
			key: 'on',

			// Add an event listener for given event
			value: function on(event, fn) {
				this._callbacks = this._callbacks || {};
				// Create namespace for this event
				if (!this._callbacks[event]) {
					this._callbacks[event] = [];
				}
				this._callbacks[event].push(fn);
				return this;
			},
		},
		{
			key: 'emit',
			value: function emit(event) {
				this._callbacks = this._callbacks || {};
				var callbacks = this._callbacks[event];

				if (callbacks) {
					for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						args[_key - 1] = arguments[_key];
					}

					for (
						var _iterator = callbacks,
							_isArray = true,
							_i = 0,
							_iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
						;

					) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var callback = _ref;

						callback.apply(this, args);
					}
				}

				return this;
			},

			// Remove event listener for given event. If fn is not provided, all event
			// listeners for that event will be removed. If neither is provided, all
			// event listeners will be removed.
		},
		{
			key: 'off',
			value: function off(event, fn) {
				if (!this._callbacks || arguments.length === 0) {
					this._callbacks = {};
					return this;
				}

				// specific event
				var callbacks = this._callbacks[event];
				if (!callbacks) {
					return this;
				}

				// remove all handlers
				if (arguments.length === 1) {
					delete this._callbacks[event];
					return this;
				}

				// remove specific handler
				for (var i = 0; i < callbacks.length; i++) {
					var callback = callbacks[i];
					if (callback === fn) {
						callbacks.splice(i, 1);
						break;
					}
				}

				return this;
			},
		},
	]);

	return Emitter;
})();

var Dropzone = (function(_Emitter) {
	_inherits(Dropzone, _Emitter);

	_createClass(Dropzone, null, [
		{
			key: 'initClass',
			value: function initClass() {
				// Exposing the emitter class, mainly for tests
				this.prototype.Emitter = Emitter;

				/*
       This is a list of all available events you can register on a dropzone object.
        You can register an event handler like this:
        dropzone.on("dragEnter", function() { });
        */
				this.prototype.events = [
					'drop',
					'dragstart',
					'dragend',
					'dragenter',
					'dragover',
					'dragleave',
					'addedfile',
					'addedfiles',
					'removedfile',
					'thumbnail',
					'error',
					'errormultiple',
					'processing',
					'processingmultiple',
					'uploadprogress',
					'totaluploadprogress',
					'sending',
					'sendingmultiple',
					'success',
					'successmultiple',
					'canceled',
					'canceledmultiple',
					'complete',
					'completemultiple',
					'reset',
					'maxfilesexceeded',
					'maxfilesreached',
					'queuecomplete',
				];

				this.prototype.defaultOptions = {
					/**
					 * Has to be specified on elements other than form (or when the form
					 * doesn't have an `action` attribute). You can also
					 * provide a function that will be called with `files` and
					 * must return the url (since `v3.12.0`)
					 */
					url: null,

					/**
					 * Can be changed to `"put"` if necessary. You can also provide a function
					 * that will be called with `files` and must return the method (since `v3.12.0`).
					 */
					method: 'post',

					/**
					 * Will be set on the XHRequest.
					 */
					withCredentials: false,

					/**
					 * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
					 */
					timeout: 30000,

					/**
					 * How many file uploads to process in parallel (See the
					 * Enqueuing file uploads* documentation section for more info)
					 */
					parallelUploads: 2,

					/**
					 * Whether to send multiple files in one request. If
					 * this it set to true, then the fallback file input element will
					 * have the `multiple` attribute as well. This option will
					 * also trigger additional events (like `processingmultiple`). See the events
					 * documentation section for more information.
					 */
					uploadMultiple: false,

					/**
					 * Whether you want files to be uploaded in chunks to your server. This can't be
					 * used in combination with `uploadMultiple`.
					 *
					 * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
					 */
					chunking: false,

					/**
					 * If `chunking` is enabled, this defines whether **every** file should be chunked,
					 * even if the file size is below chunkSize. This means, that the additional chunk
					 * form data will be submitted and the `chunksUploaded` callback will be invoked.
					 */
					forceChunking: false,

					/**
					 * If `chunking` is `true`, then this defines the chunk size in bytes.
					 */
					chunkSize: 2000000,

					/**
					 * If `true`, the individual chunks of a file are being uploaded simultaneously.
					 */
					parallelChunkUploads: false,

					/**
					 * Whether a chunk should be retried if it fails.
					 */
					retryChunks: false,

					/**
					 * If `retryChunks` is true, how many times should it be retried.
					 */
					retryChunksLimit: 3,

					/**
					 * If not `null` defines how many files this Dropzone handles. If it exceeds,
					 * the event `maxfilesexceeded` will be called. The dropzone element gets the
					 * class `dz-max-files-reached` accordingly so you can provide visual feedback.
					 */
					maxFilesize: 256,

					/**
					 * The name of the file param that gets transferred.
					 * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
					 * Dropzone will append `[]` to the name.
					 */
					paramName: 'file',

					/**
					 * Whether thumbnails for images should be generated
					 */
					createImageThumbnails: true,

					/**
					 * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
					 */
					maxThumbnailFilesize: 10,

					/**
					 * If `null`, the ratio of the image will be used to calculate it.
					 */
					thumbnailWidth: 120,

					/**
					 * The same as `thumbnailWidth`. If both are null, images will not be resized.
					 */
					thumbnailHeight: 120,

					/**
					 * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
					 * Can be either `contain` or `crop`.
					 */
					thumbnailMethod: 'crop',

					/**
					 * If set, images will be resized to these dimensions before being **uploaded**.
					 * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
					 * ratio of the file will be preserved.
					 *
					 * The `options.transformFile` function uses these options, so if the `transformFile` function
					 * is overridden, these options don't do anything.
					 */
					resizeWidth: null,

					/**
					 * See `resizeWidth`.
					 */
					resizeHeight: null,

					/**
					 * The mime type of the resized image (before it gets uploaded to the server).
					 * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
					 * See `resizeWidth` for more information.
					 */
					resizeMimeType: null,

					/**
					 * The quality of the resized images. See `resizeWidth`.
					 */
					resizeQuality: 0.8,

					/**
					 * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
					 * Can be either `contain` or `crop`.
					 */
					resizeMethod: 'contain',

					/**
					 * The base that is used to calculate the filesize. You can change this to
					 * 1024 if you would rather display kibibytes, mebibytes, etc...
					 * 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
					 * You can change this to `1024` if you don't care about validity.
					 */
					filesizeBase: 1000,

					/**
					 * Can be used to limit the maximum number of files that will be handled by this Dropzone
					 */
					maxFiles: null,

					/**
					 * An optional object to send additional headers to the server. Eg:
					 * `{ "My-Awesome-Header": "header value" }`
					 */
					headers: null,

					/**
					 * If `true`, the dropzone element itself will be clickable, if `false`
					 * nothing will be clickable.
					 *
					 * You can also pass an HTML element, a CSS selector (for multiple elements)
					 * or an array of those. In that case, all of those elements will trigger an
					 * upload when clicked.
					 */
					clickable: true,

					/**
					 * Whether hidden files in directories should be ignored.
					 */
					ignoreHiddenFiles: true,

					/**
					 * The default implementation of `accept` checks the file's mime type or
					 * extension against this list. This is a comma separated list of mime
					 * types or file extensions.
					 *
					 * Eg.: `image/*,application/pdf,.psd`
					 *
					 * If the Dropzone is `clickable` this option will also be used as
					 * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
					 * parameter on the hidden file input as well.
					 */
					acceptedFiles: null,

					/**
					 * **Deprecated!**
					 * Use acceptedFiles instead.
					 */
					acceptedMimeTypes: null,

					/**
					 * If false, files will be added to the queue but the queue will not be
					 * processed automatically.
					 * This can be useful if you need some additional user input before sending
					 * files (or if you want want all files sent at once).
					 * If you're ready to send the file simply call `myDropzone.processQueue()`.
					 *
					 * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
					 * section for more information.
					 */
					autoProcessQueue: true,

					/**
					 * If false, files added to the dropzone will not be queued by default.
					 * You'll have to call `enqueueFile(file)` manually.
					 */
					autoQueue: true,

					/**
					 * If `true`, this will add a link to every file preview to remove or cancel (if
					 * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
					 * and `dictRemoveFile` options are used for the wording.
					 */
					addRemoveLinks: false,

					/**
					 * Defines where to display the file previews – if `null` the
					 * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
					 * selector. The element should have the `dropzone-previews` class so
					 * the previews are displayed properly.
					 */
					previewsContainer: null,

					/**
					 * This is the element the hidden input field (which is used when clicking on the
					 * dropzone to trigger file selection) will be appended to. This might
					 * be important in case you use frameworks to switch the content of your page.
					 */
					hiddenInputContainer: 'body',

					/**
					 * If null, no capture type will be specified
					 * If camera, mobile devices will skip the file selection and choose camera
					 * If microphone, mobile devices will skip the file selection and choose the microphone
					 * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
					 * On apple devices multiple must be set to false.  AcceptedFiles may need to
					 * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
					 */
					capture: null,

					/**
					 * **Deprecated**. Use `renameFile` instead.
					 */
					renameFilename: null,

					/**
					 * A function that is invoked before the file is uploaded to the server and renames the file.
					 * This function gets the `File` as argument and can use the `file.name`. The actual name of the
					 * file that gets used during the upload can be accessed through `file.upload.filename`.
					 */
					renameFile: null,

					/**
					 * If `true` the fallback will be forced. This is very useful to test your server
					 * implementations first and make sure that everything works as
					 * expected without dropzone if you experience problems, and to test
					 * how your fallbacks will look.
					 */
					forceFallback: false,

					/**
					 * The text used before any files are dropped.
					 */
					dictDefaultMessage: 'Drop files here to upload',

					/**
					 * The text that replaces the default message text it the browser is not supported.
					 */
					dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",

					/**
					 * The text that will be added before the fallback form.
					 * If you provide a  fallback element yourself, or if this option is `null` this will
					 * be ignored.
					 */
					dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',

					/**
					 * If the filesize is too big.
					 * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
					 */
					dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',

					/**
					 * If the file doesn't match the file type.
					 */
					dictInvalidFileType: "You can't upload files of this type.",

					/**
					 * If the server response was invalid.
					 * `{{statusCode}}` will be replaced with the servers status code.
					 */
					dictResponseError: 'Server responded with {{statusCode}} code.',

					/**
					 * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
					 */
					dictCancelUpload: 'Cancel upload',

					/**
					 * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
					 */
					dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',

					/**
					 * If `addRemoveLinks` is true, the text to be used to remove a file.
					 */
					dictRemoveFile: 'Remove file',

					/**
					 * If this is not null, then the user will be prompted before removing a file.
					 */
					dictRemoveFileConfirmation: null,

					/**
					 * Displayed if `maxFiles` is st and exceeded.
					 * The string `{{maxFiles}}` will be replaced by the configuration value.
					 */
					dictMaxFilesExceeded: 'You can not upload any more files.',

					/**
					 * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
					 * `b` for bytes.
					 */
					dictFileSizeUnits: { tb: 'TB', gb: 'GB', mb: 'MB', kb: 'KB', b: 'b' },

					/**
					 * Called when dropzone initialized
					 * You can add event listeners here
					 */
					init: function init() {},

					/**
					 * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
					 * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
					 * of a function, this needs to return a map.
					 *
					 * The default implementation does nothing for normal uploads, but adds relevant information for
					 * chunked uploads.
					 *
					 * This is the same as adding hidden input fields in the form element.
					 */
					params: function params(files, xhr, chunk) {
						if (chunk) {
							return {
								dzuuid: chunk.file.upload.uuid,
								dzchunkindex: chunk.index,
								dztotalfilesize: chunk.file.size,
								dzchunksize: this.options.chunkSize,
								dztotalchunkcount: chunk.file.upload.totalChunkCount,
								dzchunkbyteoffset: chunk.index * this.options.chunkSize,
							};
						}
					},

					/**
					 * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
					 * and a `done` function as parameters.
					 *
					 * If the done function is invoked without arguments, the file is "accepted" and will
					 * be processed. If you pass an error message, the file is rejected, and the error
					 * message will be displayed.
					 * This function will not be called if the file is too big or doesn't match the mime types.
					 */
					accept: function accept(file, done) {
						return done();
					},

					/**
					 * The callback that will be invoked when all chunks have been uploaded for a file.
					 * It gets the file for which the chunks have been uploaded as the first parameter,
					 * and the `done` function as second. `done()` needs to be invoked when everything
					 * needed to finish the upload process is done.
					 */
					chunksUploaded: function chunksUploaded(file, done) {
						done();
					},

					/**
					 * Gets called when the browser is not supported.
					 * The default implementation shows the fallback input field and adds
					 * a text.
					 */
					fallback: function fallback() {
						// This code should pass in IE7... :(
						var messageElement = void 0;
						this.element.className = this.element.className + ' dz-browser-not-supported';

						for (
							var _iterator2 = this.element.getElementsByTagName('div'),
								_isArray2 = true,
								_i2 = 0,
								_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
							;

						) {
							var _ref2;

							if (_isArray2) {
								if (_i2 >= _iterator2.length) break;
								_ref2 = _iterator2[_i2++];
							} else {
								_i2 = _iterator2.next();
								if (_i2.done) break;
								_ref2 = _i2.value;
							}

							var child = _ref2;

							if (/(^| )dz-message($| )/.test(child.className)) {
								messageElement = child;
								child.className = 'dz-message'; // Removes the 'dz-default' class
								break;
							}
						}
						if (!messageElement) {
							messageElement = Dropzone.createElement('<div class="dz-message"><span></span></div>');
							this.element.appendChild(messageElement);
						}

						var span = messageElement.getElementsByTagName('span')[0];
						if (span) {
							if (span.textContent != null) {
								span.textContent = this.options.dictFallbackMessage;
							} else if (span.innerText != null) {
								span.innerText = this.options.dictFallbackMessage;
							}
						}

						return this.element.appendChild(this.getFallbackForm());
					},

					/**
					 * Gets called to calculate the thumbnail dimensions.
					 *
					 * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
					 *
					 *  - `srcWidth` & `srcHeight` (required)
					 *  - `trgWidth` & `trgHeight` (required)
					 *  - `srcX` & `srcY` (optional, default `0`)
					 *  - `trgX` & `trgY` (optional, default `0`)
					 *
					 * Those values are going to be used by `ctx.drawImage()`.
					 */
					resize: function resize(file, width, height, resizeMethod) {
						var info = {
							srcX: 0,
							srcY: 0,
							srcWidth: file.width,
							srcHeight: file.height,
						};

						var srcRatio = file.width / file.height;

						// Automatically calculate dimensions if not specified
						if (width == null && height == null) {
							width = info.srcWidth;
							height = info.srcHeight;
						} else if (width == null) {
							width = height * srcRatio;
						} else if (height == null) {
							height = width / srcRatio;
						}

						// Make sure images aren't upscaled
						width = Math.min(width, info.srcWidth);
						height = Math.min(height, info.srcHeight);

						var trgRatio = width / height;

						if (info.srcWidth > width || info.srcHeight > height) {
							// Image is bigger and needs rescaling
							if (resizeMethod === 'crop') {
								if (srcRatio > trgRatio) {
									info.srcHeight = file.height;
									info.srcWidth = info.srcHeight * trgRatio;
								} else {
									info.srcWidth = file.width;
									info.srcHeight = info.srcWidth / trgRatio;
								}
							} else if (resizeMethod === 'contain') {
								// Method 'contain'
								if (srcRatio > trgRatio) {
									height = width / srcRatio;
								} else {
									width = height * srcRatio;
								}
							} else {
								throw new Error("Unknown resizeMethod '" + resizeMethod + "'");
							}
						}

						info.srcX = (file.width - info.srcWidth) / 2;
						info.srcY = (file.height - info.srcHeight) / 2;

						info.trgWidth = width;
						info.trgHeight = height;

						return info;
					},

					/**
					 * Can be used to transform the file (for example, resize an image if necessary).
					 *
					 * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
					 * images according to those dimensions.
					 *
					 * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
					 * to be invoked with the file when the transformation is done.
					 */
					transformFile: function transformFile(file, done) {
						if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {
							return this.resizeImage(
								file,
								this.options.resizeWidth,
								this.options.resizeHeight,
								this.options.resizeMethod,
								done
							);
						} else {
							return done(file);
						}
					},

					/**
					 * A string that contains the template used for each dropped
					 * file. Change it to fulfill your needs but make sure to properly
					 * provide all elements.
					 *
					 * If you want to use an actual HTML element instead of providing a String
					 * as a config option, you could create a div with the id `tpl`,
					 * put the template inside it and provide the element like this:
					 *
					 *     document
					 *       .querySelector('#tpl')
					 *       .innerHTML
					 *
					 */
					previewTemplate:
						'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',

					// END OPTIONS
					// (Required by the dropzone documentation parser)

					/*
         Those functions register themselves to the events on init and handle all
         the user interface specific stuff. Overwriting them won't break the upload
         but can break the way it's displayed.
         You can overwrite them if you don't like the default behavior. If you just
         want to add an additional event handler, register it on the dropzone object
         and don't overwrite those options.
         */

					// Those are self explanatory and simply concern the DragnDrop.
					drop: function drop(e) {
						return this.element.classList.remove('dz-drag-hover');
					},
					dragstart: function dragstart(e) {},
					dragend: function dragend(e) {
						return this.element.classList.remove('dz-drag-hover');
					},
					dragenter: function dragenter(e) {
						return this.element.classList.add('dz-drag-hover');
					},
					dragover: function dragover(e) {
						return this.element.classList.add('dz-drag-hover');
					},
					dragleave: function dragleave(e) {
						return this.element.classList.remove('dz-drag-hover');
					},
					paste: function paste(e) {},

					// Called whenever there are no files left in the dropzone anymore, and the
					// dropzone should be displayed as if in the initial state.
					reset: function reset() {
						return this.element.classList.remove('dz-started');
					},

					// Called when a file is added to the queue
					// Receives `file`
					addedfile: function addedfile(file) {
						var _this2 = this;

						if (this.element === this.previewsContainer) {
							this.element.classList.add('dz-started');
						}

						if (this.previewsContainer) {
							file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
							file.previewTemplate = file.previewElement; // Backwards compatibility

							this.previewsContainer.appendChild(file.previewElement);
							for (
								var _iterator3 = file.previewElement.querySelectorAll('[data-dz-name]'),
									_isArray3 = true,
									_i3 = 0,
									_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();
								;

							) {
								var _ref3;

								if (_isArray3) {
									if (_i3 >= _iterator3.length) break;
									_ref3 = _iterator3[_i3++];
								} else {
									_i3 = _iterator3.next();
									if (_i3.done) break;
									_ref3 = _i3.value;
								}

								var node = _ref3;

								node.textContent = file.name;
							}
							for (
								var _iterator4 = file.previewElement.querySelectorAll('[data-dz-size]'),
									_isArray4 = true,
									_i4 = 0,
									_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();
								;

							) {
								if (_isArray4) {
									if (_i4 >= _iterator4.length) break;
									node = _iterator4[_i4++];
								} else {
									_i4 = _iterator4.next();
									if (_i4.done) break;
									node = _i4.value;
								}

								node.innerHTML = this.filesize(file.size);
							}

							if (this.options.addRemoveLinks) {
								file._removeLink = Dropzone.createElement(
									'<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' +
										this.options.dictRemoveFile +
										'</a>'
								);
								file.previewElement.appendChild(file._removeLink);
							}

							var removeFileEvent = function removeFileEvent(e) {
								e.preventDefault();
								e.stopPropagation();
								if (file.status === Dropzone.UPLOADING) {
									return Dropzone.confirm(_this2.options.dictCancelUploadConfirmation, function() {
										return _this2.removeFile(file);
									});
								} else {
									if (_this2.options.dictRemoveFileConfirmation) {
										return Dropzone.confirm(_this2.options.dictRemoveFileConfirmation, function() {
											return _this2.removeFile(file);
										});
									} else {
										return _this2.removeFile(file);
									}
								}
							};

							for (
								var _iterator5 = file.previewElement.querySelectorAll('[data-dz-remove]'),
									_isArray5 = true,
									_i5 = 0,
									_iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();
								;

							) {
								var _ref4;

								if (_isArray5) {
									if (_i5 >= _iterator5.length) break;
									_ref4 = _iterator5[_i5++];
								} else {
									_i5 = _iterator5.next();
									if (_i5.done) break;
									_ref4 = _i5.value;
								}

								var removeLink = _ref4;

								removeLink.addEventListener('click', removeFileEvent);
							}
						}
					},

					// Called whenever a file is removed.
					removedfile: function removedfile(file) {
						if (file.previewElement != null && file.previewElement.parentNode != null) {
							file.previewElement.parentNode.removeChild(file.previewElement);
						}
						return this._updateMaxFilesReachedClass();
					},

					// Called when a thumbnail has been generated
					// Receives `file` and `dataUrl`
					thumbnail: function thumbnail(file, dataUrl) {
						if (file.previewElement) {
							file.previewElement.classList.remove('dz-file-preview');
							for (
								var _iterator6 = file.previewElement.querySelectorAll('[data-dz-thumbnail]'),
									_isArray6 = true,
									_i6 = 0,
									_iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();
								;

							) {
								var _ref5;

								if (_isArray6) {
									if (_i6 >= _iterator6.length) break;
									_ref5 = _iterator6[_i6++];
								} else {
									_i6 = _iterator6.next();
									if (_i6.done) break;
									_ref5 = _i6.value;
								}

								var thumbnailElement = _ref5;

								thumbnailElement.alt = file.name;
								thumbnailElement.src = dataUrl;
							}

							return setTimeout(function() {
								return file.previewElement.classList.add('dz-image-preview');
							}, 1);
						}
					},

					// Called whenever an error occurs
					// Receives `file` and `message`
					error: function error(file, message) {
						if (file.previewElement) {
							file.previewElement.classList.add('dz-error');
							if (typeof message !== 'String' && message.error) {
								message = message.error;
							}
							for (
								var _iterator7 = file.previewElement.querySelectorAll('[data-dz-errormessage]'),
									_isArray7 = true,
									_i7 = 0,
									_iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();
								;

							) {
								var _ref6;

								if (_isArray7) {
									if (_i7 >= _iterator7.length) break;
									_ref6 = _iterator7[_i7++];
								} else {
									_i7 = _iterator7.next();
									if (_i7.done) break;
									_ref6 = _i7.value;
								}

								var node = _ref6;

								node.textContent = message;
							}
						}
					},
					errormultiple: function errormultiple() {},

					// Called when a file gets processed. Since there is a cue, not all added
					// files are processed immediately.
					// Receives `file`
					processing: function processing(file) {
						if (file.previewElement) {
							file.previewElement.classList.add('dz-processing');
							if (file._removeLink) {
								return (file._removeLink.textContent = this.options.dictCancelUpload);
							}
						}
					},
					processingmultiple: function processingmultiple() {},

					// Called whenever the upload progress gets updated.
					// Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
					// To get the total number of bytes of the file, use `file.size`
					uploadprogress: function uploadprogress(file, progress, bytesSent) {
						if (file.previewElement) {
							for (
								var _iterator8 = file.previewElement.querySelectorAll('[data-dz-uploadprogress]'),
									_isArray8 = true,
									_i8 = 0,
									_iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();
								;

							) {
								var _ref7;

								if (_isArray8) {
									if (_i8 >= _iterator8.length) break;
									_ref7 = _iterator8[_i8++];
								} else {
									_i8 = _iterator8.next();
									if (_i8.done) break;
									_ref7 = _i8.value;
								}

								var node = _ref7;

								node.nodeName === 'PROGRESS' ? (node.value = progress) : (node.style.width = progress + '%');
							}
						}
					},

					// Called whenever the total upload progress gets updated.
					// Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
					totaluploadprogress: function totaluploadprogress() {},

					// Called just before the file is sent. Gets the `xhr` object as second
					// parameter, so you can modify it (for example to add a CSRF token) and a
					// `formData` object to add additional information.
					sending: function sending() {},
					sendingmultiple: function sendingmultiple() {},

					// When the complete upload is finished and successful
					// Receives `file`
					success: function success(file) {
						if (file.previewElement) {
							return file.previewElement.classList.add('dz-success');
						}
					},
					successmultiple: function successmultiple() {},

					// When the upload is canceled.
					canceled: function canceled(file) {
						return this.emit('error', file, 'Upload canceled.');
					},
					canceledmultiple: function canceledmultiple() {},

					// When the upload is finished, either with success or an error.
					// Receives `file`
					complete: function complete(file) {
						if (file._removeLink) {
							file._removeLink.textContent = this.options.dictRemoveFile;
						}
						if (file.previewElement) {
							return file.previewElement.classList.add('dz-complete');
						}
					},
					completemultiple: function completemultiple() {},
					maxfilesexceeded: function maxfilesexceeded() {},
					maxfilesreached: function maxfilesreached() {},
					queuecomplete: function queuecomplete() {},
					addedfiles: function addedfiles() {},
				};

				this.prototype._thumbnailQueue = [];
				this.prototype._processingThumbnail = false;
			},

			// global utility
		},
		{
			key: 'extend',
			value: function extend(target) {
				for (
					var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;
					_key2 < _len2;
					_key2++
				) {
					objects[_key2 - 1] = arguments[_key2];
				}

				for (
					var _iterator9 = objects,
						_isArray9 = true,
						_i9 = 0,
						_iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();
					;

				) {
					var _ref8;

					if (_isArray9) {
						if (_i9 >= _iterator9.length) break;
						_ref8 = _iterator9[_i9++];
					} else {
						_i9 = _iterator9.next();
						if (_i9.done) break;
						_ref8 = _i9.value;
					}

					var object = _ref8;

					for (var key in object) {
						var val = object[key];
						target[key] = val;
					}
				}
				return target;
			},
		},
	]);

	function Dropzone(el, options) {
		_classCallCheck(this, Dropzone);

		var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this));

		var fallback = void 0,
			left = void 0;
		_this.element = el;
		// For backwards compatibility since the version was in the prototype previously
		_this.version = Dropzone.version;

		_this.defaultOptions.previewTemplate = _this.defaultOptions.previewTemplate.replace(/\n*/g, '');

		_this.clickableElements = [];
		_this.listeners = [];
		_this.files = []; // All files

		if (typeof _this.element === 'string') {
			_this.element = document.querySelector(_this.element);
		}

		// Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
		if (!_this.element || _this.element.nodeType == null) {
			throw new Error('Invalid dropzone element.');
		}

		if (_this.element.dropzone) {
			throw new Error('Dropzone already attached.');
		}

		// Now add this dropzone to the instances.
		Dropzone.instances.push(_this);

		// Put the dropzone inside the element itself.
		_this.element.dropzone = _this;

		var elementOptions = (left = Dropzone.optionsForElement(_this.element)) != null ? left : {};

		_this.options = Dropzone.extend({}, _this.defaultOptions, elementOptions, options != null ? options : {});

		// If the browser failed, just call the fallback and leave
		if (_this.options.forceFallback || !Dropzone.isBrowserSupported()) {
			var _ret;

			return (_ret = _this.options.fallback.call(_this)), _possibleConstructorReturn(_this, _ret);
		}

		// @options.url = @element.getAttribute "action" unless @options.url?
		if (_this.options.url == null) {
			_this.options.url = _this.element.getAttribute('action');
		}

		if (!_this.options.url) {
			throw new Error('No URL provided.');
		}

		if (_this.options.acceptedFiles && _this.options.acceptedMimeTypes) {
			throw new Error(
				"You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated."
			);
		}

		if (_this.options.uploadMultiple && _this.options.chunking) {
			throw new Error('You cannot set both: uploadMultiple and chunking.');
		}

		// Backwards compatibility
		if (_this.options.acceptedMimeTypes) {
			_this.options.acceptedFiles = _this.options.acceptedMimeTypes;
			delete _this.options.acceptedMimeTypes;
		}

		// Backwards compatibility
		if (_this.options.renameFilename != null) {
			_this.options.renameFile = function(file) {
				return _this.options.renameFilename.call(_this, file.name, file);
			};
		}

		_this.options.method = _this.options.method.toUpperCase();

		if ((fallback = _this.getExistingFallback()) && fallback.parentNode) {
			// Remove the fallback
			fallback.parentNode.removeChild(fallback);
		}

		// Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
		if (_this.options.previewsContainer !== false) {
			if (_this.options.previewsContainer) {
				_this.previewsContainer = Dropzone.getElement(_this.options.previewsContainer, 'previewsContainer');
			} else {
				_this.previewsContainer = _this.element;
			}
		}

		if (_this.options.clickable) {
			if (_this.options.clickable === true) {
				_this.clickableElements = [_this.element];
			} else {
				_this.clickableElements = Dropzone.getElements(_this.options.clickable, 'clickable');
			}
		}

		_this.init();
		return _this;
	}

	// Returns all files that have been accepted

	_createClass(
		Dropzone,
		[
			{
				key: 'getAcceptedFiles',
				value: function getAcceptedFiles() {
					return this.files
						.filter(function(file) {
							return file.accepted;
						})
						.map(function(file) {
							return file;
						});
				},

				// Returns all files that have been rejected
				// Not sure when that's going to be useful, but added for completeness.
			},
			{
				key: 'getRejectedFiles',
				value: function getRejectedFiles() {
					return this.files
						.filter(function(file) {
							return !file.accepted;
						})
						.map(function(file) {
							return file;
						});
				},
			},
			{
				key: 'getFilesWithStatus',
				value: function getFilesWithStatus(status) {
					return this.files
						.filter(function(file) {
							return file.status === status;
						})
						.map(function(file) {
							return file;
						});
				},

				// Returns all files that are in the queue
			},
			{
				key: 'getQueuedFiles',
				value: function getQueuedFiles() {
					return this.getFilesWithStatus(Dropzone.QUEUED);
				},
			},
			{
				key: 'getUploadingFiles',
				value: function getUploadingFiles() {
					return this.getFilesWithStatus(Dropzone.UPLOADING);
				},
			},
			{
				key: 'getAddedFiles',
				value: function getAddedFiles() {
					return this.getFilesWithStatus(Dropzone.ADDED);
				},

				// Files that are either queued or uploading
			},
			{
				key: 'getActiveFiles',
				value: function getActiveFiles() {
					return this.files
						.filter(function(file) {
							return file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED;
						})
						.map(function(file) {
							return file;
						});
				},

				// The function that gets called when Dropzone is initialized. You
				// can (and should) setup event listeners inside this function.
			},
			{
				key: 'init',
				value: function init() {
					var _this3 = this;

					// In case it isn't set already
					if (this.element.tagName === 'form') {
						this.element.setAttribute('enctype', 'multipart/form-data');
					}

					if (this.element.classList.contains('dropzone') && !this.element.querySelector('.dz-message')) {
						this.element.appendChild(
							Dropzone.createElement(
								'<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + '</span></div>'
							)
						);
					}

					if (this.clickableElements.length) {
						var setupHiddenFileInput = function setupHiddenFileInput() {
							if (_this3.hiddenFileInput) {
								_this3.hiddenFileInput.parentNode.removeChild(_this3.hiddenFileInput);
							}

							// var dropZoneInput = document.querySelector('.dz-hidden-input');
							// if (dropZoneInput) { dropZoneInput.parentNode.removeChild(elem) };

							_this3.hiddenFileInput = document.createElement('input');
							_this3.hiddenFileInput.setAttribute('type', 'file');
							if (_this3.options.maxFiles === null || _this3.options.maxFiles > 1) {
								_this3.hiddenFileInput.setAttribute('multiple', 'multiple');
							}
							_this3.hiddenFileInput.className = 'dz-hidden-input';

							if (_this3.options.acceptedFiles !== null) {
								_this3.hiddenFileInput.setAttribute('accept', _this3.options.acceptedFiles);
							}
							if (_this3.options.capture !== null) {
								_this3.hiddenFileInput.setAttribute('capture', _this3.options.capture);
							}

							// Not setting `display="none"` because some browsers don't accept clicks
							// on elements that aren't displayed.
							_this3.hiddenFileInput.style.visibility = 'hidden';
							_this3.hiddenFileInput.style.position = 'absolute';
							_this3.hiddenFileInput.style.top = '0';
							_this3.hiddenFileInput.style.left = '0';
							_this3.hiddenFileInput.style.height = '0';
							_this3.hiddenFileInput.style.width = '0';
							document.querySelector(_this3.options.hiddenInputContainer).appendChild(_this3.hiddenFileInput);
							return _this3.hiddenFileInput.addEventListener('change', function() {
								var files = _this3.hiddenFileInput.files;

								if (files.length) {
									for (
										var _iterator10 = files,
											_isArray10 = true,
											_i10 = 0,
											_iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();
										;

									) {
										var _ref9;

										if (_isArray10) {
											if (_i10 >= _iterator10.length) break;
											_ref9 = _iterator10[_i10++];
										} else {
											_i10 = _iterator10.next();
											if (_i10.done) break;
											_ref9 = _i10.value;
										}

										var file = _ref9;

										_this3.addFile(file);
									}
								}
								_this3.emit('addedfiles', files);
								return setupHiddenFileInput();
							});
						};
						setupHiddenFileInput();
					}

					this.URL = window.URL !== null ? window.URL : window.webkitURL;

					// Setup all event listeners on the Dropzone object itself.
					// They're not in @setupEventListeners() because they shouldn't be removed
					// again when the dropzone gets disabled.
					for (
						var _iterator11 = this.events,
							_isArray11 = true,
							_i11 = 0,
							_iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();
						;

					) {
						var _ref10;

						if (_isArray11) {
							if (_i11 >= _iterator11.length) break;
							_ref10 = _iterator11[_i11++];
						} else {
							_i11 = _iterator11.next();
							if (_i11.done) break;
							_ref10 = _i11.value;
						}

						var eventName = _ref10;

						this.on(eventName, this.options[eventName]);
					}

					this.on('uploadprogress', function() {
						return _this3.updateTotalUploadProgress();
					});

					this.on('removedfile', function() {
						return _this3.updateTotalUploadProgress();
					});

					this.on('canceled', function(file) {
						return _this3.emit('complete', file);
					});

					// Emit a `queuecomplete` event if all files finished uploading.
					this.on('complete', function(file) {
						if (
							_this3.getAddedFiles().length === 0 &&
							_this3.getUploadingFiles().length === 0 &&
							_this3.getQueuedFiles().length === 0
						) {
							// This needs to be deferred so that `queuecomplete` really triggers after `complete`
							return setTimeout(function() {
								return _this3.emit('queuecomplete');
							}, 0);
						}
					});

					var noPropagation = function noPropagation(e) {
						e.stopPropagation();
						if (e.preventDefault) {
							return e.preventDefault();
						} else {
							return (e.returnValue = false);
						}
					};

					// Create the listeners
					this.listeners = [
						{
							element: this.element,
							events: {
								dragstart: function dragstart(e) {
									return _this3.emit('dragstart', e);
								},
								dragenter: function dragenter(e) {
									noPropagation(e);
									return _this3.emit('dragenter', e);
								},
								dragover: function dragover(e) {
									// Makes it possible to drag files from chrome's download bar
									// http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
									// Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
									var efct = void 0;
									try {
										efct = e.dataTransfer.effectAllowed;
									} catch (error) {}
									e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';

									noPropagation(e);
									return _this3.emit('dragover', e);
								},
								dragleave: function dragleave(e) {
									return _this3.emit('dragleave', e);
								},
								drop: function drop(e) {
									noPropagation(e);
									return _this3.drop(e);
								},
								dragend: function dragend(e) {
									return _this3.emit('dragend', e);
								},

								// This is disabled right now, because the browsers don't implement it properly.
								// "paste": (e) =>
								//   noPropagation e
								//   @paste e
							},
						},
					];

					this.clickableElements.forEach(function(clickableElement) {
						return _this3.listeners.push({
							element: clickableElement,
							events: {
								click: function click(evt) {
									// Only the actual dropzone or the message element should trigger file selection
									if (
										clickableElement !== _this3.element ||
										evt.target === _this3.element ||
										Dropzone.elementInside(evt.target, _this3.element.querySelector('.dz-message'))
									) {
										_this3.hiddenFileInput.click(); // Forward the click
									}
									return true;
								},
							},
						});
					});

					this.enable();

					return this.options.init.call(this);
				},

				// Not fully tested yet
			},
			{
				key: 'destroy',
				value: function destroy() {
					this.disable();
					this.removeAllFiles(true);
					if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
						this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
						this.hiddenFileInput = null;
					}
					delete this.element.dropzone;
					return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
				},
			},
			{
				key: 'updateTotalUploadProgress',
				value: function updateTotalUploadProgress() {
					var totalUploadProgress = void 0;
					var totalBytesSent = 0;
					var totalBytes = 0;

					var activeFiles = this.getActiveFiles();

					if (activeFiles.length) {
						for (
							var _iterator12 = this.getActiveFiles(),
								_isArray12 = true,
								_i12 = 0,
								_iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();
							;

						) {
							var _ref11;

							if (_isArray12) {
								if (_i12 >= _iterator12.length) break;
								_ref11 = _iterator12[_i12++];
							} else {
								_i12 = _iterator12.next();
								if (_i12.done) break;
								_ref11 = _i12.value;
							}

							var file = _ref11;

							totalBytesSent += file.upload.bytesSent;
							totalBytes += file.upload.total;
						}
						totalUploadProgress = (100 * totalBytesSent) / totalBytes;
					} else {
						totalUploadProgress = 100;
					}

					return this.emit('totaluploadprogress', totalUploadProgress, totalBytes, totalBytesSent);
				},

				// @options.paramName can be a function taking one parameter rather than a string.
				// A parameter name for a file is obtained simply by calling this with an index number.
			},
			{
				key: '_getParamName',
				value: function _getParamName(n) {
					if (typeof this.options.paramName === 'function') {
						return this.options.paramName(n);
					} else {
						return '' + this.options.paramName + (this.options.uploadMultiple ? '[' + n + ']' : '');
					}
				},

				// If @options.renameFile is a function,
				// the function will be used to rename the file.name before appending it to the formData
			},
			{
				key: '_renameFile',
				value: function _renameFile(file) {
					if (typeof this.options.renameFile !== 'function') {
						return file.name;
					}
					return this.options.renameFile(file);
				},

				// Returns a form that can be used as fallback if the browser does not support DragnDrop
				//
				// If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
				// This code has to pass in IE7 :(
			},
			{
				key: 'getFallbackForm',
				value: function getFallbackForm() {
					var existingFallback = void 0,
						form = void 0;
					if ((existingFallback = this.getExistingFallback())) {
						return existingFallback;
					}

					var fieldsString = '<div class="dz-fallback">';
					if (this.options.dictFallbackText) {
						fieldsString += '<p>' + this.options.dictFallbackText + '</p>';
					}
					fieldsString +=
						'<input type="file" name="' +
						this._getParamName(0) +
						'" ' +
						(this.options.uploadMultiple ? 'multiple="multiple"' : undefined) +
						' /><input type="submit" value="Upload!"></div>';

					var fields = Dropzone.createElement(fieldsString);
					if (this.element.tagName !== 'FORM') {
						form = Dropzone.createElement(
							'<form action="' +
								this.options.url +
								'" enctype="multipart/form-data" method="' +
								this.options.method +
								'"></form>'
						);
						form.appendChild(fields);
					} else {
						// Make sure that the enctype and method attributes are set properly
						this.element.setAttribute('enctype', 'multipart/form-data');
						this.element.setAttribute('method', this.options.method);
					}
					return form != null ? form : fields;
				},

				// Returns the fallback elements if they exist already
				//
				// This code has to pass in IE7 :(
			},
			{
				key: 'getExistingFallback',
				value: function getExistingFallback() {
					var getFallback = function getFallback(elements) {
						for (
							var _iterator13 = elements,
								_isArray13 = true,
								_i13 = 0,
								_iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();
							;

						) {
							var _ref12;

							if (_isArray13) {
								if (_i13 >= _iterator13.length) break;
								_ref12 = _iterator13[_i13++];
							} else {
								_i13 = _iterator13.next();
								if (_i13.done) break;
								_ref12 = _i13.value;
							}

							var el = _ref12;

							if (/(^| )fallback($| )/.test(el.className)) {
								return el;
							}
						}
					};

					var _arr = ['div', 'form'];
					for (var _i14 = 0; _i14 < _arr.length; _i14++) {
						var tagName = _arr[_i14];
						var fallback;
						if ((fallback = getFallback(this.element.getElementsByTagName(tagName)))) {
							return fallback;
						}
					}
				},

				// Activates all listeners stored in @listeners
			},
			{
				key: 'setupEventListeners',
				value: function setupEventListeners() {
					return this.listeners.map(function(elementListeners) {
						return (function() {
							var result = [];
							for (var event in elementListeners.events) {
								var listener = elementListeners.events[event];
								result.push(elementListeners.element.addEventListener(event, listener, false));
							}
							return result;
						})();
					});
				},

				// Deactivates all listeners stored in @listeners
			},
			{
				key: 'removeEventListeners',
				value: function removeEventListeners() {
					return this.listeners.map(function(elementListeners) {
						return (function() {
							var result = [];
							for (var event in elementListeners.events) {
								var listener = elementListeners.events[event];
								result.push(elementListeners.element.removeEventListener(event, listener, false));
							}
							return result;
						})();
					});
				},

				// Removes all event listeners and cancels all files in the queue or being processed.
			},
			{
				key: 'disable',
				value: function disable() {
					var _this4 = this;

					this.clickableElements.forEach(function(element) {
						return element.classList.remove('dz-clickable');
					});
					this.removeEventListeners();

					return this.files.map(function(file) {
						return _this4.cancelUpload(file);
					});
				},
			},
			{
				key: 'enable',
				value: function enable() {
					this.clickableElements.forEach(function(element) {
						return element.classList.add('dz-clickable');
					});
					return this.setupEventListeners();
				},

				// Returns a nicely formatted filesize
			},
			{
				key: 'filesize',
				value: function filesize(size) {
					var selectedSize = 0;
					var selectedUnit = 'b';

					if (size > 0) {
						var units = ['tb', 'gb', 'mb', 'kb', 'b'];

						for (var i = 0; i < units.length; i++) {
							var unit = units[i];
							var cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;

							if (size >= cutoff) {
								selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
								selectedUnit = unit;
								break;
							}
						}

						selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
					}

					return '<strong>' + selectedSize + '</strong> ' + this.options.dictFileSizeUnits[selectedUnit];
				},

				// Adds or removes the `dz-max-files-reached` class from the form.
			},
			{
				key: '_updateMaxFilesReachedClass',
				value: function _updateMaxFilesReachedClass() {
					if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
						if (this.getAcceptedFiles().length === this.options.maxFiles) {
							this.emit('maxfilesreached', this.files);
						}
						return this.element.classList.add('dz-max-files-reached');
					} else {
						return this.element.classList.remove('dz-max-files-reached');
					}
				},
			},
			{
				key: 'drop',
				value: function drop(e) {
					if (!e.dataTransfer) {
						return;
					}
					this.emit('drop', e);

					var files = e.dataTransfer.files;

					this.emit('addedfiles', files);

					// Even if it's a folder, files.length will contain the folders.
					if (files.length) {
						var items = e.dataTransfer.items;

						if (items && items.length && items[0].webkitGetAsEntry != null) {
							// The browser supports dropping of folders, so handle items instead of files
							this._addFilesFromItems(items);
						} else {
							this.handleFiles(files);
						}
					}
				},
			},
			{
				key: 'paste',
				value: function paste(e) {
					if (
						__guard__(e != null ? e.clipboardData : undefined, function(x) {
							return x.items;
						}) == null
					) {
						return;
					}

					this.emit('paste', e);
					var items = e.clipboardData.items;

					if (items.length) {
						return this._addFilesFromItems(items);
					}
				},
			},
			{
				key: 'handleFiles',
				value: function handleFiles(files) {
					var _this5 = this;

					return files.map(function(file) {
						return _this5.addFile(file);
					});
				},

				// When a folder is dropped (or files are pasted), items must be handled
				// instead of files.
			},
			{
				key: '_addFilesFromItems',
				value: function _addFilesFromItems(items) {
					var _this6 = this;

					return (function() {
						var result = [];
						for (
							var _iterator14 = items,
								_isArray14 = true,
								_i15 = 0,
								_iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();
							;

						) {
							var _ref13;

							if (_isArray14) {
								if (_i15 >= _iterator14.length) break;
								_ref13 = _iterator14[_i15++];
							} else {
								_i15 = _iterator14.next();
								if (_i15.done) break;
								_ref13 = _i15.value;
							}

							var item = _ref13;

							var entry;
							if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
								if (entry.isFile) {
									result.push(_this6.addFile(item.getAsFile()));
								} else if (entry.isDirectory) {
									// Append all files from that directory to files
									result.push(_this6._addFilesFromDirectory(entry, entry.name));
								} else {
									result.push(undefined);
								}
							} else if (item.getAsFile != null) {
								if (item.kind == null || item.kind === 'file') {
									result.push(_this6.addFile(item.getAsFile()));
								} else {
									result.push(undefined);
								}
							} else {
								result.push(undefined);
							}
						}
						return result;
					})();
				},

				// Goes through the directory, and adds each file it finds recursively
			},
			{
				key: '_addFilesFromDirectory',
				value: function _addFilesFromDirectory(directory, path) {
					var _this7 = this;

					var dirReader = directory.createReader();

					var errorHandler = function errorHandler(error) {
						return __guardMethod__(console, 'log', function(o) {
							return o.log(error);
						});
					};

					var readEntries = function readEntries() {
						return dirReader.readEntries(function(entries) {
							if (entries.length > 0) {
								for (
									var _iterator15 = entries,
										_isArray15 = true,
										_i16 = 0,
										_iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();
									;

								) {
									var _ref14;

									if (_isArray15) {
										if (_i16 >= _iterator15.length) break;
										_ref14 = _iterator15[_i16++];
									} else {
										_i16 = _iterator15.next();
										if (_i16.done) break;
										_ref14 = _i16.value;
									}

									var entry = _ref14;

									if (entry.isFile) {
										entry.file(function(file) {
											if (_this7.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
												return;
											}
											file.fullPath = path + '/' + file.name;
											return _this7.addFile(file);
										});
									} else if (entry.isDirectory) {
										_this7._addFilesFromDirectory(entry, path + '/' + entry.name);
									}
								}

								// Recursively call readEntries() again, since browser only handle
								// the first 100 entries.
								// See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
								readEntries();
							}
							return null;
						}, errorHandler);
					};

					return readEntries();
				},

				// If `done()` is called without argument the file is accepted
				// If you call it with an error message, the file is rejected
				// (This allows for asynchronous validation)
				//
				// This function checks the filesize, and if the file.type passes the
				// `acceptedFiles` check.
			},
			{
				key: 'accept',
				value: function accept(file, done) {
					if (file.size > this.options.maxFilesize * 1024 * 1024) {
						return done(
							this.options.dictFileTooBig
								.replace('{{filesize}}', Math.round(file.size / 1024 / 10.24) / 100)
								.replace('{{maxFilesize}}', this.options.maxFilesize)
						);
					} else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
						return done(this.options.dictInvalidFileType);
					} else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
						done(this.options.dictMaxFilesExceeded.replace('{{maxFiles}}', this.options.maxFiles));
						return this.emit('maxfilesexceeded', file);
					} else {
						return this.options.accept.call(this, file, done);
					}
				},
			},
			{
				key: 'addFile',
				value: function addFile(file) {
					var _this8 = this;

					file.upload = {
						uuid: Dropzone.uuidv4(),
						progress: 0,
						// Setting the total upload size to file.size for the beginning
						// It's actual different than the size to be transmitted.
						total: file.size,
						bytesSent: 0,
						filename: this._renameFile(file),
						chunked: this.options.chunking && (this.options.forceChunking || file.size > this.options.chunkSize),
						totalChunkCount: Math.ceil(file.size / this.options.chunkSize),
					};
					this.files.push(file);

					file.status = Dropzone.ADDED;

					this.emit('addedfile', file);

					this._enqueueThumbnail(file);

					return this.accept(file, function(error) {
						if (error) {
							file.accepted = false;
							_this8._errorProcessing([file], error); // Will set the file.status
						} else {
							file.accepted = true;
							if (_this8.options.autoQueue) {
								_this8.enqueueFile(file);
							} // Will set .accepted = true
						}
						return _this8._updateMaxFilesReachedClass();
					});
				},

				// Wrapper for enqueueFile
			},
			{
				key: 'enqueueFiles',
				value: function enqueueFiles(files) {
					for (
						var _iterator16 = files,
							_isArray16 = true,
							_i17 = 0,
							_iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();
						;

					) {
						var _ref15;

						if (_isArray16) {
							if (_i17 >= _iterator16.length) break;
							_ref15 = _iterator16[_i17++];
						} else {
							_i17 = _iterator16.next();
							if (_i17.done) break;
							_ref15 = _i17.value;
						}

						var file = _ref15;

						this.enqueueFile(file);
					}
					return null;
				},
			},
			{
				key: 'enqueueFile',
				value: function enqueueFile(file) {
					var _this9 = this;

					if (file.status === Dropzone.ADDED && file.accepted === true) {
						file.status = Dropzone.QUEUED;
						if (this.options.autoProcessQueue) {
							return setTimeout(function() {
								return _this9.processQueue();
							}, 0); // Deferring the call
						}
					} else {
						throw new Error("This file can't be queued because it has already been processed or was rejected.");
					}
				},
			},
			{
				key: '_enqueueThumbnail',
				value: function _enqueueThumbnail(file) {
					var _this10 = this;

					if (
						this.options.createImageThumbnails &&
						file.type.match(/image.*/) &&
						file.size <= this.options.maxThumbnailFilesize * 1024 * 1024
					) {
						this._thumbnailQueue.push(file);
						return setTimeout(function() {
							return _this10._processThumbnailQueue();
						}, 0); // Deferring the call
					}
				},
			},
			{
				key: '_processThumbnailQueue',
				value: function _processThumbnailQueue() {
					var _this11 = this;

					if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
						return;
					}

					this._processingThumbnail = true;
					var file = this._thumbnailQueue.shift();
					return this.createThumbnail(
						file,
						this.options.thumbnailWidth,
						this.options.thumbnailHeight,
						this.options.thumbnailMethod,
						true,
						function(dataUrl) {
							_this11.emit('thumbnail', file, dataUrl);
							_this11._processingThumbnail = false;
							return _this11._processThumbnailQueue();
						}
					);
				},

				// Can be called by the user to remove a file
			},
			{
				key: 'removeFile',
				value: function removeFile(file) {
					if (file.status === Dropzone.UPLOADING) {
						this.cancelUpload(file);
					}
					this.files = without(this.files, file);

					this.emit('removedfile', file);
					if (this.files.length === 0) {
						return this.emit('reset');
					}
				},

				// Removes all files that aren't currently processed from the list
			},
			{
				key: 'removeAllFiles',
				value: function removeAllFiles(cancelIfNecessary) {
					// Create a copy of files since removeFile() changes the @files array.
					if (cancelIfNecessary == null) {
						cancelIfNecessary = false;
					}
					for (
						var _iterator17 = this.files.slice(),
							_isArray17 = true,
							_i18 = 0,
							_iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();
						;

					) {
						var _ref16;

						if (_isArray17) {
							if (_i18 >= _iterator17.length) break;
							_ref16 = _iterator17[_i18++];
						} else {
							_i18 = _iterator17.next();
							if (_i18.done) break;
							_ref16 = _i18.value;
						}

						var file = _ref16;

						if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
							this.removeFile(file);
						}
					}
					return null;
				},

				// Resizes an image before it gets sent to the server. This function is the default behavior of
				// `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
				// the resized blob.
			},
			{
				key: 'resizeImage',
				value: function resizeImage(file, width, height, resizeMethod, callback) {
					var _this12 = this;

					return this.createThumbnail(file, width, height, resizeMethod, false, function(dataUrl, canvas) {
						if (canvas === null) {
							// The image has not been resized
							return callback(file);
						} else {
							var resizeMimeType = _this12.options.resizeMimeType;

							if (resizeMimeType == null) {
								resizeMimeType = file.type;
							}
							var resizedDataURL = canvas.toDataURL(resizeMimeType, _this12.options.resizeQuality);
							if (resizeMimeType === 'image/jpeg' || resizeMimeType === 'image/jpg') {
								// Now add the original EXIF information
								resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);
							}
							return callback(Dropzone.dataURItoBlob(resizedDataURL));
						}
					});
				},
			},
			{
				key: 'createThumbnail',
				value: function createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
					var _this13 = this;

					var fileReader = new FileReader();

					fileReader.onload = function() {
						file.dataURL = fileReader.result;

						// Don't bother creating a thumbnail for SVG images since they're vector
						if (file.type === 'image/svg+xml') {
							if (callback != null) {
								callback(fileReader.result);
							}
							return;
						}

						return _this13.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
					};

					return fileReader.readAsDataURL(file);
				},
			},
			{
				key: 'createThumbnailFromUrl',
				value: function createThumbnailFromUrl(
					file,
					width,
					height,
					resizeMethod,
					fixOrientation,
					callback,
					crossOrigin
				) {
					var _this14 = this;

					// Not using `new Image` here because of a bug in latest Chrome versions.
					// See https://github.com/enyo/dropzone/pull/226
					var img = document.createElement('img');

					if (crossOrigin) {
						img.crossOrigin = crossOrigin;
					}

					img.onload = function() {
						var loadExif = function loadExif(callback) {
							return callback(1);
						};
						if (typeof EXIF !== 'undefined' && EXIF !== null && fixOrientation) {
							loadExif = function loadExif(callback) {
								return EXIF.getData(img, function() {
									return callback(EXIF.getTag(this, 'Orientation'));
								});
							};
						}

						return loadExif(function(orientation) {
							file.width = img.width;
							file.height = img.height;

							var resizeInfo = _this14.options.resize.call(_this14, file, width, height, resizeMethod);

							var canvas = document.createElement('canvas');
							var ctx = canvas.getContext('2d');

							canvas.width = resizeInfo.trgWidth;
							canvas.height = resizeInfo.trgHeight;

							if (orientation > 4) {
								canvas.width = resizeInfo.trgHeight;
								canvas.height = resizeInfo.trgWidth;
							}

							switch (orientation) {
								case 2:
									// horizontal flip
									ctx.translate(canvas.width, 0);
									ctx.scale(-1, 1);
									break;
								case 3:
									// 180° rotate left
									ctx.translate(canvas.width, canvas.height);
									ctx.rotate(Math.PI);
									break;
								case 4:
									// vertical flip
									ctx.translate(0, canvas.height);
									ctx.scale(1, -1);
									break;
								case 5:
									// vertical flip + 90 rotate right
									ctx.rotate(0.5 * Math.PI);
									ctx.scale(1, -1);
									break;
								case 6:
									// 90° rotate right
									ctx.rotate(0.5 * Math.PI);
									ctx.translate(0, -canvas.height);
									break;
								case 7:
									// horizontal flip + 90 rotate right
									ctx.rotate(0.5 * Math.PI);
									ctx.translate(canvas.width, -canvas.height);
									ctx.scale(-1, 1);
									break;
								case 8:
									// 90° rotate left
									ctx.rotate(-0.5 * Math.PI);
									ctx.translate(-canvas.width, 0);
									break;
							}

							// This is a bugfix for iOS' scaling bug.
							drawImageIOSFix(
								ctx,
								img,
								resizeInfo.srcX != null ? resizeInfo.srcX : 0,
								resizeInfo.srcY != null ? resizeInfo.srcY : 0,
								resizeInfo.srcWidth,
								resizeInfo.srcHeight,
								resizeInfo.trgX != null ? resizeInfo.trgX : 0,
								resizeInfo.trgY != null ? resizeInfo.trgY : 0,
								resizeInfo.trgWidth,
								resizeInfo.trgHeight
							);

							var thumbnail = canvas.toDataURL('image/png');

							if (callback != null) {
								return callback(thumbnail, canvas);
							}
						});
					};

					if (callback != null) {
						img.onerror = callback;
					}

					return (img.src = file.dataURL);
				},

				// Goes through the queue and processes files if there aren't too many already.
			},
			{
				key: 'processQueue',
				value: function processQueue() {
					var parallelUploads = this.options.parallelUploads;

					var processingLength = this.getUploadingFiles().length;
					var i = processingLength;

					// There are already at least as many files uploading than should be
					if (processingLength >= parallelUploads) {
						return;
					}

					var queuedFiles = this.getQueuedFiles();

					if (!(queuedFiles.length > 0)) {
						return;
					}

					if (this.options.uploadMultiple) {
						// The files should be uploaded in one request
						return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
					} else {
						while (i < parallelUploads) {
							if (!queuedFiles.length) {
								return;
							} // Nothing left to process
							this.processFile(queuedFiles.shift());
							i++;
						}
					}
				},

				// Wrapper for `processFiles`
			},
			{
				key: 'processFile',
				value: function processFile(file) {
					return this.processFiles([file]);
				},

				// Loads the file, then calls finishedLoading()
			},
			{
				key: 'processFiles',
				value: function processFiles(files) {
					for (
						var _iterator18 = files,
							_isArray18 = true,
							_i19 = 0,
							_iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();
						;

					) {
						var _ref17;

						if (_isArray18) {
							if (_i19 >= _iterator18.length) break;
							_ref17 = _iterator18[_i19++];
						} else {
							_i19 = _iterator18.next();
							if (_i19.done) break;
							_ref17 = _i19.value;
						}

						var file = _ref17;

						file.processing = true; // Backwards compatibility
						file.status = Dropzone.UPLOADING;

						this.emit('processing', file);
					}

					if (this.options.uploadMultiple) {
						this.emit('processingmultiple', files);
					}

					return this.uploadFiles(files);
				},
			},
			{
				key: '_getFilesWithXhr',
				value: function _getFilesWithXhr(xhr) {
					var files = void 0;
					return (files = this.files
						.filter(function(file) {
							return file.xhr === xhr;
						})
						.map(function(file) {
							return file;
						}));
				},

				// Cancels the file upload and sets the status to CANCELED
				// **if** the file is actually being uploaded.
				// If it's still in the queue, the file is being removed from it and the status
				// set to CANCELED.
			},
			{
				key: 'cancelUpload',
				value: function cancelUpload(file) {
					if (file.status === Dropzone.UPLOADING) {
						var groupedFiles = this._getFilesWithXhr(file.xhr);
						for (
							var _iterator19 = groupedFiles,
								_isArray19 = true,
								_i20 = 0,
								_iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();
							;

						) {
							var _ref18;

							if (_isArray19) {
								if (_i20 >= _iterator19.length) break;
								_ref18 = _iterator19[_i20++];
							} else {
								_i20 = _iterator19.next();
								if (_i20.done) break;
								_ref18 = _i20.value;
							}

							var groupedFile = _ref18;

							groupedFile.status = Dropzone.CANCELED;
						}
						if (typeof file.xhr !== 'undefined') {
							file.xhr.abort();
						}
						for (
							var _iterator20 = groupedFiles,
								_isArray20 = true,
								_i21 = 0,
								_iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();
							;

						) {
							var _ref19;

							if (_isArray20) {
								if (_i21 >= _iterator20.length) break;
								_ref19 = _iterator20[_i21++];
							} else {
								_i21 = _iterator20.next();
								if (_i21.done) break;
								_ref19 = _i21.value;
							}

							var _groupedFile = _ref19;

							this.emit('canceled', _groupedFile);
						}
						if (this.options.uploadMultiple) {
							this.emit('canceledmultiple', groupedFiles);
						}
					} else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {
						file.status = Dropzone.CANCELED;
						this.emit('canceled', file);
						if (this.options.uploadMultiple) {
							this.emit('canceledmultiple', [file]);
						}
					}

					if (this.options.autoProcessQueue) {
						return this.processQueue();
					}
				},
			},
			{
				key: 'resolveOption',
				value: function resolveOption(option) {
					if (typeof option === 'function') {
						for (
							var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1;
							_key3 < _len3;
							_key3++
						) {
							args[_key3 - 1] = arguments[_key3];
						}

						return option.apply(this, args);
					}
					return option;
				},
			},
			{
				key: 'uploadFile',
				value: function uploadFile(file) {
					return this.uploadFiles([file]);
				},
			},
			{
				key: 'uploadFiles',
				value: function uploadFiles(files) {
					var _this15 = this;

					this._transformFiles(files, function(transformedFiles) {
						if (files[0].upload.chunked) {
							// This file should be sent in chunks!

							// If the chunking option is set, we **know** that there can only be **one** file, since
							// uploadMultiple is not allowed with this option.
							var file = files[0];
							var transformedFile = transformedFiles[0];
							var startedChunkCount = 0;

							file.upload.chunks = [];

							var handleNextChunk = function handleNextChunk() {
								var chunkIndex = 0;

								// Find the next item in file.upload.chunks that is not defined yet.
								while (file.upload.chunks[chunkIndex] !== undefined) {
									chunkIndex++;
								}

								// This means, that all chunks have already been started.
								if (chunkIndex >= file.upload.totalChunkCount) return;

								startedChunkCount++;

								var start = chunkIndex * _this15.options.chunkSize;
								var end = Math.min(start + _this15.options.chunkSize, file.size);

								var dataBlock = {
									name: _this15._getParamName(0),
									data: transformedFile.webkitSlice
										? transformedFile.webkitSlice(start, end)
										: transformedFile.slice(start, end),
									filename: file.upload.filename,
									chunkIndex: chunkIndex,
								};

								file.upload.chunks[chunkIndex] = {
									file: file,
									index: chunkIndex,
									dataBlock: dataBlock, // In case we want to retry.
									status: Dropzone.UPLOADING,
									progress: 0,
									retries: 0, // The number of times this block has been retried.
								};

								_this15._uploadData(files, [dataBlock]);
							};

							file.upload.finishedChunkUpload = function(chunk) {
								var allFinished = true;
								chunk.status = Dropzone.SUCCESS;

								// Clear the data from the chunk
								chunk.dataBlock = null;

								for (var i = 0; i < file.upload.totalChunkCount; i++) {
									if (file.upload.chunks[i] === undefined) {
										return handleNextChunk();
									}
									if (file.upload.chunks[i].status !== Dropzone.SUCCESS) {
										allFinished = false;
									}
								}

								if (allFinished) {
									_this15.options.chunksUploaded(file, function() {
										_this15._finished(files, '', null);
									});
								}
							};

							if (_this15.options.parallelChunkUploads) {
								for (var i = 0; i < file.upload.totalChunkCount; i++) {
									handleNextChunk();
								}
							} else {
								handleNextChunk();
							}
						} else {
							var dataBlocks = [];
							for (var _i22 = 0; _i22 < files.length; _i22++) {
								dataBlocks[_i22] = {
									name: _this15._getParamName(_i22),
									data: transformedFiles[_i22],
									filename: files[_i22].upload.filename,
								};
							}
							_this15._uploadData(files, dataBlocks);
						}
					});
				},

				/// Returns the right chunk for given file and xhr
			},
			{
				key: '_getChunk',
				value: function _getChunk(file, xhr) {
					for (var i = 0; i < file.upload.totalChunkCount; i++) {
						if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) {
							return file.upload.chunks[i];
						}
					}
				},

				// This function actually uploads the file(s) to the server.
				// If dataBlocks contains the actual data to upload (meaning, that this could either be transformed
				// files, or individual chunks for chunked upload).
			},
			{
				key: '_uploadData',
				value: function _uploadData(files, dataBlocks) {
					var _this16 = this;

					var xhr = new XMLHttpRequest();

					// Put the xhr object in the file objects to be able to reference it later.
					for (
						var _iterator21 = files,
							_isArray21 = true,
							_i23 = 0,
							_iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();
						;

					) {
						var _ref20;

						if (_isArray21) {
							if (_i23 >= _iterator21.length) break;
							_ref20 = _iterator21[_i23++];
						} else {
							_i23 = _iterator21.next();
							if (_i23.done) break;
							_ref20 = _i23.value;
						}

						var file = _ref20;

						file.xhr = xhr;
					}
					if (files[0].upload.chunked) {
						// Put the xhr object in the right chunk object, so it can be associated later, and found with _getChunk
						files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
					}

					var method = this.resolveOption(this.options.method, files);
					var url = this.resolveOption(this.options.url, files);
					xhr.open(method, url, true);

					// Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
					xhr.timeout = this.resolveOption(this.options.timeout, files);

					// Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
					xhr.withCredentials = !!this.options.withCredentials;

					xhr.onload = function(e) {
						_this16._finishedUploading(files, xhr, e);
					};

					xhr.onerror = function() {
						_this16._handleUploadError(files, xhr);
					};

					// Some browsers do not have the .upload property
					var progressObj = xhr.upload != null ? xhr.upload : xhr;
					progressObj.onprogress = function(e) {
						return _this16._updateFilesUploadProgress(files, xhr, e);
					};

					var headers = {
						Accept: 'application/json',
						'Cache-Control': 'no-cache',
						'X-Requested-With': 'XMLHttpRequest',
					};

					if (this.options.headers) {
						Dropzone.extend(headers, this.options.headers);
					}

					for (var headerName in headers) {
						var headerValue = headers[headerName];
						if (headerValue) {
							xhr.setRequestHeader(headerName, headerValue);
						}
					}

					var formData = new FormData();

					// Adding all @options parameters
					if (this.options.params) {
						var additionalParams = this.options.params;
						if (typeof additionalParams === 'function') {
							additionalParams = additionalParams.call(
								this,
								files,
								xhr,
								files[0].upload.chunked ? this._getChunk(files[0], xhr) : null
							);
						}

						for (var key in additionalParams) {
							var value = additionalParams[key];
							formData.append(key, value);
						}
					}

					// Let the user add additional data if necessary
					for (
						var _iterator22 = files,
							_isArray22 = true,
							_i24 = 0,
							_iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();
						;

					) {
						var _ref21;

						if (_isArray22) {
							if (_i24 >= _iterator22.length) break;
							_ref21 = _iterator22[_i24++];
						} else {
							_i24 = _iterator22.next();
							if (_i24.done) break;
							_ref21 = _i24.value;
						}

						var _file = _ref21;

						this.emit('sending', _file, xhr, formData);
					}
					if (this.options.uploadMultiple) {
						this.emit('sendingmultiple', files, xhr, formData);
					}

					this._addFormElementData(formData);

					// Finally add the files
					// Has to be last because some servers (eg: S3) expect the file to be the last parameter
					for (var i = 0; i < dataBlocks.length; i++) {
						var dataBlock = dataBlocks[i];
						formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
					}

					this.submitRequest(xhr, formData, files);
				},

				// Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
			},
			{
				key: '_transformFiles',
				value: function _transformFiles(files, done) {
					var _this17 = this;

					var transformedFiles = [];
					// Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
					var doneCounter = 0;

					var _loop = function _loop(i) {
						_this17.options.transformFile.call(_this17, files[i], function(transformedFile) {
							transformedFiles[i] = transformedFile;
							if (++doneCounter === files.length) {
								done(transformedFiles);
							}
						});
					};

					for (var i = 0; i < files.length; i++) {
						_loop(i);
					}
				},

				// Takes care of adding other input elements of the form to the AJAX request
			},
			{
				key: '_addFormElementData',
				value: function _addFormElementData(formData) {
					// Take care of other input elements
					if (this.element.tagName === 'FORM') {
						for (
							var _iterator23 = this.element.querySelectorAll('input, textarea, select, button'),
								_isArray23 = true,
								_i25 = 0,
								_iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();
							;

						) {
							var _ref22;

							if (_isArray23) {
								if (_i25 >= _iterator23.length) break;
								_ref22 = _iterator23[_i25++];
							} else {
								_i25 = _iterator23.next();
								if (_i25.done) break;
								_ref22 = _i25.value;
							}

							var input = _ref22;

							var inputName = input.getAttribute('name');
							var inputType = input.getAttribute('type');
							if (inputType) inputType = inputType.toLowerCase();

							// If the input doesn't have a name, we can't use it.
							if (typeof inputName === 'undefined' || inputName === null) continue;

							if (input.tagName === 'SELECT' && input.hasAttribute('multiple')) {
								// Possibly multiple values
								for (
									var _iterator24 = input.options,
										_isArray24 = true,
										_i26 = 0,
										_iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();
									;

								) {
									var _ref23;

									if (_isArray24) {
										if (_i26 >= _iterator24.length) break;
										_ref23 = _iterator24[_i26++];
									} else {
										_i26 = _iterator24.next();
										if (_i26.done) break;
										_ref23 = _i26.value;
									}

									var option = _ref23;

									if (option.selected) {
										formData.append(inputName, option.value);
									}
								}
							} else if (!inputType || (inputType !== 'checkbox' && inputType !== 'radio') || input.checked) {
								formData.append(inputName, input.value);
							}
						}
					}
				},

				// Invoked when there is new progress information about given files.
				// If e is not provided, it is assumed that the upload is finished.
			},
			{
				key: '_updateFilesUploadProgress',
				value: function _updateFilesUploadProgress(files, xhr, e) {
					var progress = void 0;
					if (typeof e !== 'undefined') {
						progress = (100 * e.loaded) / e.total;

						if (files[0].upload.chunked) {
							var file = files[0];
							// Since this is a chunked upload, we need to update the appropriate chunk progress.
							var chunk = this._getChunk(file, xhr);
							chunk.progress = progress;
							chunk.total = e.total;
							chunk.bytesSent = e.loaded;
							var fileProgress = 0,
								fileTotal = void 0,
								fileBytesSent = void 0;
							file.upload.progress = 0;
							file.upload.total = 0;
							file.upload.bytesSent = 0;
							for (var i = 0; i < file.upload.totalChunkCount; i++) {
								if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].progress !== undefined) {
									file.upload.progress += file.upload.chunks[i].progress;
									file.upload.total += file.upload.chunks[i].total;
									file.upload.bytesSent += file.upload.chunks[i].bytesSent;
								}
							}
							file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
						} else {
							for (
								var _iterator25 = files,
									_isArray25 = true,
									_i27 = 0,
									_iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();
								;

							) {
								var _ref24;

								if (_isArray25) {
									if (_i27 >= _iterator25.length) break;
									_ref24 = _iterator25[_i27++];
								} else {
									_i27 = _iterator25.next();
									if (_i27.done) break;
									_ref24 = _i27.value;
								}

								var _file2 = _ref24;

								_file2.upload.progress = progress;
								_file2.upload.total = e.total;
								_file2.upload.bytesSent = e.loaded;
							}
						}
						for (
							var _iterator26 = files,
								_isArray26 = true,
								_i28 = 0,
								_iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();
							;

						) {
							var _ref25;

							if (_isArray26) {
								if (_i28 >= _iterator26.length) break;
								_ref25 = _iterator26[_i28++];
							} else {
								_i28 = _iterator26.next();
								if (_i28.done) break;
								_ref25 = _i28.value;
							}

							var _file3 = _ref25;

							this.emit('uploadprogress', _file3, _file3.upload.progress, _file3.upload.bytesSent);
						}
					} else {
						// Called when the file finished uploading

						var allFilesFinished = true;

						progress = 100;

						for (
							var _iterator27 = files,
								_isArray27 = true,
								_i29 = 0,
								_iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();
							;

						) {
							var _ref26;

							if (_isArray27) {
								if (_i29 >= _iterator27.length) break;
								_ref26 = _iterator27[_i29++];
							} else {
								_i29 = _iterator27.next();
								if (_i29.done) break;
								_ref26 = _i29.value;
							}

							var _file4 = _ref26;

							if (_file4.upload.progress !== 100 || _file4.upload.bytesSent !== _file4.upload.total) {
								allFilesFinished = false;
							}
							_file4.upload.progress = progress;
							_file4.upload.bytesSent = _file4.upload.total;
						}

						// Nothing to do, all files already at 100%
						if (allFilesFinished) {
							return;
						}

						for (
							var _iterator28 = files,
								_isArray28 = true,
								_i30 = 0,
								_iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();
							;

						) {
							var _ref27;

							if (_isArray28) {
								if (_i30 >= _iterator28.length) break;
								_ref27 = _iterator28[_i30++];
							} else {
								_i30 = _iterator28.next();
								if (_i30.done) break;
								_ref27 = _i30.value;
							}

							var _file5 = _ref27;

							this.emit('uploadprogress', _file5, progress, _file5.upload.bytesSent);
						}
					}
				},
			},
			{
				key: '_finishedUploading',
				value: function _finishedUploading(files, xhr, e) {
					var response = void 0;

					if (files[0].status === Dropzone.CANCELED) {
						return;
					}

					if (xhr.readyState !== 4) {
						return;
					}

					if (xhr.responseType !== 'arraybuffer' && xhr.responseType !== 'blob') {
						response = xhr.responseText;

						if (
							xhr.getResponseHeader('content-type') &&
							~xhr.getResponseHeader('content-type').indexOf('application/json')
						) {
							try {
								response = JSON.parse(response);
							} catch (error) {
								e = error;
								response = 'Invalid JSON response from server.';
							}
						}
					}

					this._updateFilesUploadProgress(files);

					if (!(200 <= xhr.status && xhr.status < 300)) {
						this._handleUploadError(files, xhr, response);
					} else {
						if (files[0].upload.chunked) {
							files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr));
						} else {
							this._finished(files, response, e);
						}
					}
				},
			},
			{
				key: '_handleUploadError',
				value: function _handleUploadError(files, xhr, response) {
					if (files[0].status === Dropzone.CANCELED) {
						return;
					}

					if (files[0].upload.chunked && this.options.retryChunks) {
						var chunk = this._getChunk(files[0], xhr);
						if (chunk.retries++ < this.options.retryChunksLimit) {
							this._uploadData(files, [chunk.dataBlock]);
							return;
						} else {
							console.warn('Retried this chunk too often. Giving up.');
						}
					}

					for (
						var _iterator29 = files,
							_isArray29 = true,
							_i31 = 0,
							_iterator29 = _isArray29 ? _iterator29 : _iterator29[Symbol.iterator]();
						;

					) {
						var _ref28;

						if (_isArray29) {
							if (_i31 >= _iterator29.length) break;
							_ref28 = _iterator29[_i31++];
						} else {
							_i31 = _iterator29.next();
							if (_i31.done) break;
							_ref28 = _i31.value;
						}

						var file = _ref28;

						this._errorProcessing(
							files,
							response || this.options.dictResponseError.replace('{{statusCode}}', xhr.status),
							xhr
						);
					}
				},
			},
			{
				key: 'submitRequest',
				value: function submitRequest(xhr, formData, files) {
					xhr.send(formData);
				},

				// Called internally when processing is finished.
				// Individual callbacks have to be called in the appropriate sections.
			},
			{
				key: '_finished',
				value: function _finished(files, responseText, e) {
					for (
						var _iterator30 = files,
							_isArray30 = true,
							_i32 = 0,
							_iterator30 = _isArray30 ? _iterator30 : _iterator30[Symbol.iterator]();
						;

					) {
						var _ref29;

						if (_isArray30) {
							if (_i32 >= _iterator30.length) break;
							_ref29 = _iterator30[_i32++];
						} else {
							_i32 = _iterator30.next();
							if (_i32.done) break;
							_ref29 = _i32.value;
						}

						var file = _ref29;

						file.status = Dropzone.SUCCESS;
						this.emit('success', file, responseText, e);
						this.emit('complete', file);
					}
					if (this.options.uploadMultiple) {
						this.emit('successmultiple', files, responseText, e);
						this.emit('completemultiple', files);
					}

					if (this.options.autoProcessQueue) {
						return this.processQueue();
					}
				},

				// Called internally when processing is finished.
				// Individual callbacks have to be called in the appropriate sections.
			},
			{
				key: '_errorProcessing',
				value: function _errorProcessing(files, message, xhr) {
					for (
						var _iterator31 = files,
							_isArray31 = true,
							_i33 = 0,
							_iterator31 = _isArray31 ? _iterator31 : _iterator31[Symbol.iterator]();
						;

					) {
						var _ref30;

						if (_isArray31) {
							if (_i33 >= _iterator31.length) break;
							_ref30 = _iterator31[_i33++];
						} else {
							_i33 = _iterator31.next();
							if (_i33.done) break;
							_ref30 = _i33.value;
						}

						var file = _ref30;

						file.status = Dropzone.ERROR;
						this.emit('error', file, message, xhr);
						this.emit('complete', file);
					}
					if (this.options.uploadMultiple) {
						this.emit('errormultiple', files, message, xhr);
						this.emit('completemultiple', files);
					}

					if (this.options.autoProcessQueue) {
						return this.processQueue();
					}
				},
			},
		],
		[
			{
				key: 'uuidv4',
				value: function uuidv4() {
					return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
						var r = (Math.random() * 16) | 0,
							v = c === 'x' ? r : (r & 0x3) | 0x8;
						return v.toString(16);
					});
				},
			},
		]
	);

	return Dropzone;
})(Emitter);

Dropzone.initClass();

Dropzone.version = '5.2.0';

// This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elemens.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// To disable autoDiscover for a specific element, you can set `false` as an option:
//
//     Dropzone.options.myDisabledElementId = false;
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
Dropzone.options = {};

// Returns the options for an element or undefined if none available.
Dropzone.optionsForElement = function(element) {
	// Get the `Dropzone.options.elementId` for this element if it exists
	if (element.getAttribute('id')) {
		return Dropzone.options[camelize(element.getAttribute('id'))];
	} else {
		return undefined;
	}
};

// Holds a list of all dropzone instances
Dropzone.instances = [];

// Returns the dropzone for given element if any
Dropzone.forElement = function(element) {
	if (typeof element === 'string') {
		element = document.querySelector(element);
	}
	if ((element != null ? element.dropzone : undefined) == null) {
		throw new Error(
			"No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone."
		);
	}
	return element.dropzone;
};

// Set to false if you don't want Dropzone to automatically find and attach to .dropzone elements.
Dropzone.autoDiscover = true;

// Looks for all .dropzone elements and creates a dropzone for them
Dropzone.discover = function() {
	var dropzones = void 0;
	if (document.querySelectorAll) {
		dropzones = document.querySelectorAll('.dropzone');
	} else {
		dropzones = [];
		// IE :(
		var checkElements = function checkElements(elements) {
			return (function() {
				var result = [];
				for (
					var _iterator32 = elements,
						_isArray32 = true,
						_i34 = 0,
						_iterator32 = _isArray32 ? _iterator32 : _iterator32[Symbol.iterator]();
					;

				) {
					var _ref31;

					if (_isArray32) {
						if (_i34 >= _iterator32.length) break;
						_ref31 = _iterator32[_i34++];
					} else {
						_i34 = _iterator32.next();
						if (_i34.done) break;
						_ref31 = _i34.value;
					}

					var el = _ref31;

					if (/(^| )dropzone($| )/.test(el.className)) {
						result.push(dropzones.push(el));
					} else {
						result.push(undefined);
					}
				}
				return result;
			})();
		};
		checkElements(document.getElementsByTagName('div'));
		checkElements(document.getElementsByTagName('form'));
	}

	return (function() {
		var result = [];
		for (
			var _iterator33 = dropzones,
				_isArray33 = true,
				_i35 = 0,
				_iterator33 = _isArray33 ? _iterator33 : _iterator33[Symbol.iterator]();
			;

		) {
			var _ref32;

			if (_isArray33) {
				if (_i35 >= _iterator33.length) break;
				_ref32 = _iterator33[_i35++];
			} else {
				_i35 = _iterator33.next();
				if (_i35.done) break;
				_ref32 = _i35.value;
			}

			var dropzone = _ref32;

			// Create a dropzone unless auto discover has been disabled for specific element
			if (Dropzone.optionsForElement(dropzone) !== false) {
				result.push(new Dropzone(dropzone));
			} else {
				result.push(undefined);
			}
		}
		return result;
	})();
};

// Since the whole Drag'n'Drop API is pretty new, some browsers implement it,
// but not correctly.
// So I created a blacklist of userAgents. Yes, yes. Browser sniffing, I know.
// But what to do when browsers *theoretically* support an API, but crash
// when using it.
//
// This is a list of regular expressions tested against navigator.userAgent
//
// ** It should only be used on browser that *do* support the API, but
// incorrectly **
//
Dropzone.blacklistedBrowsers = [
	// The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
	/opera.*(Macintosh|Windows Phone).*version\/12/i,
];

// Checks if the browser is supported
Dropzone.isBrowserSupported = function() {
	var capableBrowser = true;

	if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
		if (!('classList' in document.createElement('a'))) {
			capableBrowser = false;
		} else {
			// The browser supports the API, but may be blacklisted.
			for (
				var _iterator34 = Dropzone.blacklistedBrowsers,
					_isArray34 = true,
					_i36 = 0,
					_iterator34 = _isArray34 ? _iterator34 : _iterator34[Symbol.iterator]();
				;

			) {
				var _ref33;

				if (_isArray34) {
					if (_i36 >= _iterator34.length) break;
					_ref33 = _iterator34[_i36++];
				} else {
					_i36 = _iterator34.next();
					if (_i36.done) break;
					_ref33 = _i36.value;
				}

				var regex = _ref33;

				if (regex.test(navigator.userAgent)) {
					capableBrowser = false;
					continue;
				}
			}
		}
	} else {
		capableBrowser = false;
	}

	return capableBrowser;
};

Dropzone.dataURItoBlob = function(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI
		.split(',')[0]
		.split(':')[1]
		.split(';')[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob
	return new Blob([ab], { type: mimeString });
};

// Returns an array without the rejected item
var without = function without(list, rejectedItem) {
	return list
		.filter(function(item) {
			return item !== rejectedItem;
		})
		.map(function(item) {
			return item;
		});
};

// abc-def_ghi -> abcDefGhi
var camelize = function camelize(str) {
	return str.replace(/[\-_](\w)/g, function(match) {
		return match.charAt(1).toUpperCase();
	});
};

// Creates an element from string
Dropzone.createElement = function(string) {
	var div = document.createElement('div');
	div.innerHTML = string;
	return div.childNodes[0];
};

// Tests if given element is inside (or simply is) the container
Dropzone.elementInside = function(element, container) {
	if (element === container) {
		return true;
	} // Coffeescript doesn't support do/while loops
	while ((element = element.parentNode)) {
		if (element === container) {
			return true;
		}
	}
	return false;
};

Dropzone.getElement = function(el, name) {
	var element = void 0;
	if (typeof el === 'string') {
		element = document.querySelector(el);
	} else if (el.nodeType != null) {
		element = el;
	}
	if (element == null) {
		throw new Error('Invalid `' + name + '` option provided. Please provide a CSS selector or a plain HTML element.');
	}
	return element;
};

Dropzone.getElements = function(els, name) {
	var el = void 0,
		elements = void 0;
	if (els instanceof Array) {
		elements = [];
		try {
			for (
				var _iterator35 = els,
					_isArray35 = true,
					_i37 = 0,
					_iterator35 = _isArray35 ? _iterator35 : _iterator35[Symbol.iterator]();
				;

			) {
				if (_isArray35) {
					if (_i37 >= _iterator35.length) break;
					el = _iterator35[_i37++];
				} else {
					_i37 = _iterator35.next();
					if (_i37.done) break;
					el = _i37.value;
				}

				elements.push(this.getElement(el, name));
			}
		} catch (e) {
			elements = null;
		}
	} else if (typeof els === 'string') {
		elements = [];
		for (
			var _iterator36 = document.querySelectorAll(els),
				_isArray36 = true,
				_i38 = 0,
				_iterator36 = _isArray36 ? _iterator36 : _iterator36[Symbol.iterator]();
			;

		) {
			if (_isArray36) {
				if (_i38 >= _iterator36.length) break;
				el = _iterator36[_i38++];
			} else {
				_i38 = _iterator36.next();
				if (_i38.done) break;
				el = _i38.value;
			}

			elements.push(el);
		}
	} else if (els.nodeType != null) {
		elements = [els];
	}

	if (elements == null || !elements.length) {
		throw new Error(
			'Invalid `' + name + '` option provided. Please provide a CSS selector, a plain HTML element or a list of those.'
		);
	}

	return elements;
};

// Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.
Dropzone.confirm = function(question, accepted, rejected) {
	if (window.confirm(question)) {
		return accepted();
	} else if (rejected != null) {
		return rejected();
	}
};

// Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
Dropzone.isValidFile = function(file, acceptedFiles) {
	if (!acceptedFiles) {
		return true;
	} // If there are no accepted mime types, it's OK
	acceptedFiles = acceptedFiles.split(',');

	var mimeType = file.type;
	var baseMimeType = mimeType.replace(/\/.*$/, '');

	for (
		var _iterator37 = acceptedFiles,
			_isArray37 = true,
			_i39 = 0,
			_iterator37 = _isArray37 ? _iterator37 : _iterator37[Symbol.iterator]();
		;

	) {
		var _ref34;

		if (_isArray37) {
			if (_i39 >= _iterator37.length) break;
			_ref34 = _iterator37[_i39++];
		} else {
			_i39 = _iterator37.next();
			if (_i39.done) break;
			_ref34 = _i39.value;
		}

		var validType = _ref34;

		validType = validType.trim();
		if (validType.charAt(0) === '.') {
			if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
				return true;
			}
		} else if (/\/\*$/.test(validType)) {
			// This is something like a image/* mime type
			if (baseMimeType === validType.replace(/\/.*$/, '')) {
				return true;
			}
		} else {
			if (mimeType === validType) {
				return true;
			}
		}
	}

	return false;
};

// Augment jQuery
if (typeof jQuery !== 'undefined' && jQuery !== null) {
	jQuery.fn.dropzone = function(options) {
		return this.each(function() {
			return new Dropzone(this, options);
		});
	};
}

if ( true && module !== null) {
	module.exports = Dropzone;
} else {
	window.Dropzone = Dropzone;
}

// Dropzone file status codes
Dropzone.ADDED = 'added';

Dropzone.QUEUED = 'queued';
// For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.
Dropzone.ACCEPTED = Dropzone.QUEUED;

Dropzone.UPLOADING = 'uploading';
Dropzone.PROCESSING = Dropzone.UPLOADING; // alias

Dropzone.CANCELED = 'canceled';
Dropzone.ERROR = 'error';
Dropzone.SUCCESS = 'success';

/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */

// Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
var detectVerticalSquash = function detectVerticalSquash(img) {
	var iw = img.naturalWidth;
	var ih = img.naturalHeight;
	var canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = ih;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);

	var _ctx$getImageData = ctx.getImageData(1, 0, 1, ih),
		data = _ctx$getImageData.data;

	// search image edge pixel position in case it is squashed vertically.

	var sy = 0;
	var ey = ih;
	var py = ih;
	while (py > sy) {
		var alpha = data[(py - 1) * 4 + 3];

		if (alpha === 0) {
			ey = py;
		} else {
			sy = py;
		}

		py = (ey + sy) >> 1;
	}
	var ratio = py / ih;

	if (ratio === 0) {
		return 1;
	} else {
		return ratio;
	}
};

// A replacement for context.drawImage
// (args are for source and destination).
var drawImageIOSFix = function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
	var vertSquashRatio = detectVerticalSquash(img);
	return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
};

// Based on MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html

var ExifRestore = (function() {
	function ExifRestore() {
		_classCallCheck(this, ExifRestore);
	}

	_createClass(ExifRestore, null, [
		{
			key: 'initClass',
			value: function initClass() {
				this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			},
		},
		{
			key: 'encode64',
			value: function encode64(input) {
				var output = '';
				var chr1 = undefined;
				var chr2 = undefined;
				var chr3 = '';
				var enc1 = undefined;
				var enc2 = undefined;
				var enc3 = undefined;
				var enc4 = '';
				var i = 0;
				while (true) {
					chr1 = input[i++];
					chr2 = input[i++];
					chr3 = input[i++];
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output =
						output +
						this.KEY_STR.charAt(enc1) +
						this.KEY_STR.charAt(enc2) +
						this.KEY_STR.charAt(enc3) +
						this.KEY_STR.charAt(enc4);
					chr1 = chr2 = chr3 = '';
					enc1 = enc2 = enc3 = enc4 = '';
					if (!(i < input.length)) {
						break;
					}
				}
				return output;
			},
		},
		{
			key: 'restore',
			value: function restore(origFileBase64, resizedFileBase64) {
				if (!origFileBase64.match('data:image/jpeg;base64,')) {
					return resizedFileBase64;
				}
				var rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
				var segments = this.slice2Segments(rawImage);
				var image = this.exifManipulation(resizedFileBase64, segments);
				return 'data:image/jpeg;base64,' + this.encode64(image);
			},
		},
		{
			key: 'exifManipulation',
			value: function exifManipulation(resizedFileBase64, segments) {
				var exifArray = this.getExifArray(segments);
				var newImageArray = this.insertExif(resizedFileBase64, exifArray);
				var aBuffer = new Uint8Array(newImageArray);
				return aBuffer;
			},
		},
		{
			key: 'getExifArray',
			value: function getExifArray(segments) {
				var seg = undefined;
				var x = 0;
				while (x < segments.length) {
					seg = segments[x];
					if ((seg[0] === 255) & (seg[1] === 225)) {
						return seg;
					}
					x++;
				}
				return [];
			},
		},
		{
			key: 'insertExif',
			value: function insertExif(resizedFileBase64, exifArray) {
				var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
				var buf = this.decode64(imageData);
				var separatePoint = buf.indexOf(255, 3);
				var mae = buf.slice(0, separatePoint);
				var ato = buf.slice(separatePoint);
				var array = mae;
				array = array.concat(exifArray);
				array = array.concat(ato);
				return array;
			},
		},
		{
			key: 'slice2Segments',
			value: function slice2Segments(rawImageArray) {
				var head = 0;
				var segments = [];
				while (true) {
					var length;
					if ((rawImageArray[head] === 255) & (rawImageArray[head + 1] === 218)) {
						break;
					}
					if ((rawImageArray[head] === 255) & (rawImageArray[head + 1] === 216)) {
						head += 2;
					} else {
						length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
						var endPoint = head + length + 2;
						var seg = rawImageArray.slice(head, endPoint);
						segments.push(seg);
						head = endPoint;
					}
					if (head > rawImageArray.length) {
						break;
					}
				}
				return segments;
			},
		},
		{
			key: 'decode64',
			value: function decode64(input) {
				var output = '';
				var chr1 = undefined;
				var chr2 = undefined;
				var chr3 = '';
				var enc1 = undefined;
				var enc2 = undefined;
				var enc3 = undefined;
				var enc4 = '';
				var i = 0;
				var buf = [];
				// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
				var base64test = /[^A-Za-z0-9\+\/\=]/g;
				if (base64test.exec(input)) {
					console.warn(
						"There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."
					);
				}
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
				while (true) {
					enc1 = this.KEY_STR.indexOf(input.charAt(i++));
					enc2 = this.KEY_STR.indexOf(input.charAt(i++));
					enc3 = this.KEY_STR.indexOf(input.charAt(i++));
					enc4 = this.KEY_STR.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					buf.push(chr1);
					if (enc3 !== 64) {
						buf.push(chr2);
					}
					if (enc4 !== 64) {
						buf.push(chr3);
					}
					chr1 = chr2 = chr3 = '';
					enc1 = enc2 = enc3 = enc4 = '';
					if (!(i < input.length)) {
						break;
					}
				}
				return buf;
			},
		},
	]);

	return ExifRestore;
})();

ExifRestore.initClass();

/*
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 */

// @win window reference
// @fn function reference
var contentLoaded = function contentLoaded(win, fn) {
	var done = false;
	var top = true;
	var doc = win.document;
	var root = doc.documentElement;
	var add = doc.addEventListener ? 'addEventListener' : 'attachEvent';
	var rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent';
	var pre = doc.addEventListener ? '' : 'on';
	var init = function init(e) {
		if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
			return;
		}
		(e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) {
			return fn.call(win, e.type || e);
		}
	};

	var poll = function poll() {
		try {
			root.doScroll('left');
		} catch (e) {
			setTimeout(poll, 50);
			return;
		}
		return init('poll');
	};

	if (doc.readyState !== 'complete') {
		if (doc.createEventObject && root.doScroll) {
			try {
				top = !win.frameElement;
			} catch (error) {}
			if (top) {
				poll();
			}
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		return win[add](pre + 'load', init, false);
	}
};

// As a single function to be able to write tests.
Dropzone._autoDiscoverFunction = function() {
	if (Dropzone.autoDiscover) {
		return Dropzone.discover();
	}
};
contentLoaded(window, Dropzone._autoDiscoverFunction);

function __guard__(value, transform) {
	return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}
function __guardMethod__(obj, methodName, transform) {
	if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
		return transform(obj, methodName);
	} else {
		return undefined;
	}
}

SapphireWidgets.Dropzone = Dropzone;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

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
			$(this)
				.siblings()
				.removeClass('Active');
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
	var allGenericGalleries = [];

	var create = function(config) {
		bindGenericGallery(config);
		if (osAjaxBackend) {
			osAjaxBackend.BindAfterAjaxRequest(function() {
				bindGenericGallery(config);
			});
		} else {
			$(window).load(function() {
				osAjaxBackend.BindAfterAjaxRequest(function() {
					bindGenericGallery(config);
				});
			});
		}
	};

	var bindGenericGallery = function(config) {
		for (var i = 0; i < allGenericGalleries.length; i++) {
			if (allGenericGalleries[i].config.widgetId === config.widgetId) {
				allGenericGalleries.splice(i, 1);
			}
		}
		window[config.widgetId] = new GenericGallery(config);
		allGenericGalleries.push(window[config.widgetId]);
	};

	var GenericGallery = function(config) {
		var _this = this;
		this.config = config;
		this.genericGalleryResizeTimer = 0;
		this.$widget = $('#' + this.config.widgetId).css('display', 'block');
		this.equalHeight = this.config.equalHeight;
		if (
			this.$widget.find('.GenericGallery-content > span').length === 1 &&
			this.$widget.find('.GenericGallery-content > span').hasClass('ListRecords')
		) {
			this.$gallery = this.$widget.find('.GenericGallery-content > span.ListRecords');
		} else {
			this.$gallery = this.$widget.find('.GenericGallery-content');
		}
		this.$galleryItems = this.$gallery.children();
		this.$galleryItems.each(function() {
			if (!$(this).hasClass('GenericGallery-item')) {
				$(this).wrap('<div class="GenericGallery-item"></div>');
			}
		});
		$(function() {
			_this.calculate(0);
		});
	};

	GenericGallery.prototype.calculate = function(timeout) {
		var _this = this;
		window.clearTimeout(this.genericGalleryResizeTimer);
		this.genericGalleryResizeTimer = window.setTimeout(function() {
			var widgetWidth = _this.$widget.outerWidth(true);
			var perLine;
			if (widgetWidth >= 1900) {
				perLine = _this.config.itemsDesktopHD;
			} else if (widgetWidth >= 1600) {
				perLine = _this.config.itemsDesktopBig;
			} else if (widgetWidth >= 1366) {
				perLine = _this.config.itemsDesktop;
			} else if (widgetWidth >= 1024) {
				perLine = _this.config.itemsDesktopSmall;
			} else if (widgetWidth >= 420) {
				perLine = _this.config.itemsTablet;
			} else {
				perLine = _this.config.itemsPhone;
			}

			var itemWidth = 100 / perLine;

			var marginLeft = _this.$gallery.find('.GenericGallery-item').css('margin-left');

			_this.$gallery.find('.GenericGallery-item').each(function(index, el) {
				if ($(el).find('.GenericGallery-item--triple').length > 0) {
					$(el).css('width', itemWidth * 3 + '%');
				} else if ($(el).find('.GenericGallery-item--double').length > 0) {
					$(el).css('width', 'calc(' + itemWidth * 2 + '%)');
				} else {
					$(el).css('width', 'calc(' + itemWidth + '% - ' + marginLeft + ')');
				}
				if (_this.config.itemsBorder === 'Right') {
					if ((index + 1) % perLine === 0) {
						$(el).css({ borderRight: 0 });
					} else {
						$(el).css({ borderRight: '' });
					}
				}
				$(el).css('opacity', 1);
				$(el)
					.find('> span')
					.css('opacity', 1);
				$(el).addClass(_this.config.itemsBgColor);
			});

			if (_this.config.itemsBorder === 'Right') {
				_this.$gallery
					.find('.GenericGallery-item')
					.last()
					.css({ borderRight: 0 });
			}

			if (_this.config.equalHeight) {
				_this.sameHeight();
			}
		}, timeout);
	};

	GenericGallery.prototype.sameHeight = function() {
		this.$gallery.find('.GenericGallery-item').css('min-height', 'auto');
		var maxHeight = Math.max.apply(
			null,
			this.$gallery
				.find('.GenericGallery-item')
				.map(function() {
					return $(this).outerHeight(false);
				})
				.get()
		);
		this.$gallery.find('.GenericGallery-item').css('min-height', maxHeight);
	};

	SapphireWidgets.GenericGallery = {
		create: create,
		all: function() {
			return allGenericGalleries;
		},
	};
})(jQuery, window, document, SapphireWidgets);

$(window)
	.off('resize.GenericGallery')
	.on('resize.GenericGallery', function() {
		var allGenericGalleries = SapphireWidgets.GenericGallery.all();
		allGenericGalleries.forEach(function(element) {
			element.calculate(200);
		});
	});


/***/ }),

/***/ "./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js":
/*!***************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/horizontal-toolbar/scripts.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component HorizontalToolbar */
(function ($, window, SapphireWidgets) {

	const create = () => {
		$(document).ready(() => init());
		$(window).load(() => {
			$('.MenuItemWrapper.Active')[0].scrollIntoView({
				behavior: 'auto',
				block: 'end'
			});
		});
	}

	const init = () => {

		handleArrows();

		$('.Toolbar__Items').scroll(() => {
			handleArrows()
		});

		$('.Toolbar__rightBtn').click(function () {
			var currentScroll = $('.Toolbar__Items').scrollLeft();
			var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
			var sideWidth = maxScrolll - 50;
			$('.Toolbar__Items').scrollLeft(currentScroll + 50);
			if (currentScroll == sideWidth) {
				$('.Toolbar__rightBtn').addClass('Disabled');
			}
			if (currentScroll != 50) {
				$('.Toolbar__leftBtn').removeClass('Disabled');
			}
		});

		$('.Toolbar__leftBtn').click(function () {
			var currentScroll = $('.Toolbar__Items').scrollLeft();
			var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
			var sideWidth = maxScrolll - 50;
			$('.Toolbar__Items').scrollLeft(currentScroll - 50);
			if (currentScroll != sideWidth) {
				$('.Toolbar__rightBtn').removeClass('Disabled');
			}
			if (currentScroll == 50) {
				$('.Toolbar__leftBtn').addClass('Disabled');
			}
		});

		$(window).on('resize.toolbar', () => {
			handleArrows();
		});

	};


	handleArrows = () => {
		let currentScroll = $('.Toolbar__Items').scrollLeft();
		let menuWidth = $('.Toolbar__Items .ListRecords').width();
		let externalWidth = $('.Toolbar__Items').width();
		var maxScrolll = menuWidth - externalWidth;

		if (externalWidth > menuWidth) {
			$('.Toolbar__leftBtn').hide();
			$('.Toolbar__rightBtn').hide();
			$('.Toolbar_container').addClass('Toolbar_container--noarrows');
		} else {
			$('.Toolbar__leftBtn').show();
			$('.Toolbar__rightBtn').show();
			$('.Toolbar_container').removeClass('Toolbar_container--noarrows');
		}

		if (currentScroll === 0) {
			$('.Toolbar__leftBtn').addClass('Disabled');
		} else {
			$('.Toolbar__leftBtn').removeClass('Disabled');
		}

		if (currentScroll >= maxScrolll) {
			$('.Toolbar__rightBtn').addClass('Disabled');
		} else {
			$('.Toolbar__rightBtn').removeClass('Disabled');
		}

	}


	SapphireWidgets.HorizontalToolbar = {
		create
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

			this.onComponentInit();
		}

		isComponentValid() {
			let valid = true;
			let message = `Component HourPicker (${this.options.widgetId}):`;

			if (!this.$input.length || this.$input.length > 1) {
				message = `${message} needs one - and just one - INPUT element!`;
				valid = false;
			}

			if (!valid) console.error(message);

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

	const create = config => (window[config.widgetId] = new HourPicker(config));

	SapphireWidgets.HourPicker = {
		create,
	};
})(jQuery, window, SapphireWidgets);


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

/***/ "./src/components/05-components/v3-pat/location-box/scripts.js":
/*!*********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/location-box/scripts.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LocationBox */
SapphireWidgets.LocationBox = function(clickedElementId) {
	if ($('#' + clickedElementId + '').hasClass('On')) {
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
		$('#' + clickedElementId + '')
			.addClass('On')
			.removeClass('Off')
			.parent('.RoomBox')
			.css({
				opacity: '1',
			})
			.addClass('Selected');

		$('.DisableRoom:not(#' + clickedElementId + ')').each(function() {
			$(this).addClass('Off');
			$(this).removeClass('On');
		});

		$('.DisableRoom.Off')
			.parent('.RoomBox')
			.css({
				opacity: '0.25',
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
			if (this.$widget.find('iframe').length === 1) {
				setTimeout(function () {
					if (!!_this.$widget.find('iframe')[0] && !!_this.$widget.find('iframe')[0].contentWindow && _this.$widget.find('iframe')[0].contentWindow.SapphireWidgets && _this.$widget.find('iframe')[0].contentWindow.SapphireWidgets.ResizeParentIframe) {
						_this.$widget.find('iframe')[0].contentWindow.SapphireWidgets.ResizeParentIframe.resize();
					}
				}, 500);
			}
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
			this.$widget.find('iframe').contents().find('.MainInteractiveCard-iframe-actions').css('visibility', 'hidden');
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
			maxWidth: '99%'
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
SapphireWidgets.PanelById ={
	isAnyPanelOpenedDeprecated:function () {
		return $('body').hasClass('PanelOpened');
	},
	
	togglePanelById:function (Id) {
		if (!this.isAnyPanelOpenedDeprecated()) {
			$('body').addClass('PanelOpened');
			$('body').css('overflow-y', 'hidden');
	
			$('#' + Id)
				.parents('.ToggleButton')
				.parent()
				.children('.Panel')
				.fadeIn(140);
	
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
				$('#' + Id)
					.parents('.ToggleButton')
					.parent()
					.children('.Panel')
					.children('.PanelContainer')
					.slideDown(150);
				$('#' + Id)
					.parents('.ToggleButton')
					.click();
			}, 100);
		} else {
			$('body').removeClass('PanelOpened');
			$('body').css('overflow-y', 'scroll');
	
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
				$('#' + Id)
					.parents('.ToggleButton')
					.click();
			}, 100);
		}
	}
}



/***/ }),

/***/ "./src/components/05-components/v3-pat/panel/popup-menu.js":
/*!*****************************************************************!*\
  !*** ./src/components/05-components/v3-pat/panel/popup-menu.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PopUpMenu */

SapphireWidgets.PopUpMenu = {
	menuPosition: function (id, Context) {
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

		var buttonY = _this.position().top + buttonHh;
		var buttonX = _this.offset().left;
		//var buttonX = _this.position().left;

		/* Get the distance of menu button and the parent element */
		var popupParentXx = _this.offset().left - _this.position().left;

		var popupXx = _el.offset().left;
		var popupWw = _el.outerWidth();

		Xx = Math.abs(buttonX - $('body').scrollLeft() - popupParentXx);
		Yy = Math.abs(buttonHh - buttonY - $('body').scrollTop());

		/* Check if clicked position plus the popup width exceed the window width. */
		if (buttonX + popupWw - $('body').scrollLeft() > $(Context).width()) {
			Xx = buttonX - popupWw - $('body').scrollLeft() - popupParentXx + buttonWw;
			//Xx = ($(window).width() - popupWw) - $('body').scrollLeft();
		}

		/* Set menu position. */
		_el.css({
			left: Xx + 'px',
			top: buttonY + 'px'
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
	menuEvents: function (Context) {
		$('.popup-button')
			.off('click')
			.on('click', function (e) {
				var id = $(this).attr('id');
				SapphireWidgets.PopUpMenu.menuPosition(id, Context);

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
		$(document).on('touchstart', function (event) {
			_PMIsDrag = false;
			_PMIsClick = true;
		});
		$(document).on('touchmove', function (event) {
			_PMIsDrag = true;
		});
		$(document).on('click', function (event) {
			PMClickOutside(event);
			_PMIsDrag = false;
			_PMIsClick = false;
		});
		$(document).on('touchend', function (event) {
			if (!_PMIsDrag && _PMIsClick) {
				PMClickOutside(event);
			}
			_PMIsDrag = false;
			_PMIsClick = false;
		});

		$('.button-collapse').on('click', function (event) {
			$('body').trigger('click');
			return false;
		});
		/* ^ *** Hide popup when click outside *** ^ */
	}
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

/***/ "./src/components/05-components/v3-pat/patient-call-cancel/scripts.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/patient-call-cancel/scripts.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PatientCallCancel */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		var interval;
		var timeCounter;
		var $widget = $('#' + config.widgetId).find('.PatientCallCancel');
		var $countdown = $widget.find('.PatientCallCancel-counter');
		var $label = $widget.find('.PatientCallCancel-label');

		var setState = function(state_in, text_in) {
			//js-idle, js-calling
			$widget.find('> div').prop('class', state_in);
			$label.text(text_in);
		};

		var callPatient = function($widget) {
			setState('js-calling', config.txtCallPatient);
			if (config.showCountdown) {
				$countdown.text(config.txtCallingIn + ' ' + config.timeToCancel);
			} else {
				$countdown.text(config.txtCallingIn);
			}
			startCounter();
		};

		var startCounter = function() {
			timeCounter = config.timeToCancel;
			interval = window.setInterval(updateCounter, 1000);
		};

		var updateCounter = function() {
			timeCounter--;
			if (timeCounter === 0) {
				clearInterval(interval);
				var notification = '';
				OsNotifyWidget(config.patientCallFakeNotifyId, notification);
			}
			if (config.showCountdown) {
				$countdown.text(config.txtCallingIn + ' ' + timeCounter);
			} else {
				$countdown.text(config.txtCallingIn);
			}
		};

		$widget.find('.PatientCallCancel-cancel--label').text(config.txtCancel);

		setState('js-idle', config.txtCallPatient);

		$widget.on('click', '.js-idle .PatientCallCancel-label', function() {
			callPatient($widget);
		});

		$widget.on('click', '.js-idle .PatientCallCancel-icon', function() {
			callPatient($widget);
		});

		$widget.on('click', '.js-calling .PatientCallCancel-cancel', function() {
			timeCounter = config.timeToCancel;
			$countdown.text(timeCounter);
			clearInterval(interval);
			setState('js-idle', config.txtCallPatient);
		});
	};

	SapphireWidgets.PatientCallCancel = {
		create: create,
	};
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
		$('.PersonCard__title, .PersonCard__content')
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

		const ajaxRefresh = function() {
			// remove click events
			$('.PrescriptionExpandable_header').off();

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
		$(function () {
			setTimeout(function () {
				_this.handleDemographics();
			}, 500);
		});
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
	if (!!$('.SapphireHeader-demographics').length) {
		osAjaxBackend.BindAfterAjaxRequest(function () {
			window[SapphireWidgets.SapphireHeader.widgetId].handleDemographics();
		});
	}
});

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
			$('.SectionExpandableInside .SectionExpandableInside_header').off("click").on('click', function() {
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
	$(function () {
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
			function (Utils, Dropdown, AttachBody, AttachContainer, Search, minimumResultsForSearch) {
				let dropdownSearch = Utils.Decorate(Dropdown, Search);
				dropdownSearch.prototype.render = function () {
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

		var formatResult = function (result) {
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
					$allOptExceptAllObj.each(function () {
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
						$selectedOptionsValue.each(function () {
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
			Select2Options.formatNoMatches = function () {
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
			/* Select2Options.containerCssClass=':all';*/

			Select2Options.allowClear = false;
			Select2Options.templateSelection = function (repo) {
				return repo.full_name || repo.text;
			};
			Select2Options.templateResult = function (repo) {
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
				data: function (params) {
					var Select2AjaxOpt = {};
					var SplitParameter = SearchExtraParam1.split(',');
					Select2AjaxOpt.SearchTerm = params.term;
					Select2AjaxOpt.Page = params.page || 1;
					Select2AjaxOpt.PageAmount = AmountPage;

					SplitParameter.forEach(function (el) {
						var splitText = el.split(':');
						Select2AjaxOpt[splitText[0]] = splitText[1];
					});

					return Select2AjaxOpt;
				},
				processResults: function (data, params) {
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
			Select2Options.escapeMarkup = function (markup) {
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

			Select2Options.minimumResultsForSearch = 0;
			Select2Options.tags = true;
			Select2Options.closeOnselect = true;
			Select2Options.placeholder = Prompt;
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
			var dataHtmlOption = [];
			$WidgetIdentifier.find('option').each(function (key, value) {
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
			Select2Options.escapeMarkup = function (markup) {
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
			Select2Options.createSearchChoice = function (term, data) {
				if (
					$(data).filter(function () {
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
			Select2Options.createTag = function (params) {
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
				.on('select2:unselecting', function (e) {
					$(this).data('unselecting', true);
					OnUnSelectingJS;
				})
				.on('select:selecting', function (e) {
					OnSelectingJS;
				})
				.on('select:opening', function (e) {
					if ($(this).data('unselecting')) {
						$(this).removeData('unselecting');
						e.preventDefault();
					}
				})
				.on('select:open', function (evt) {
					evt.preventDefault();
				})
				.on('select2:close', function (evt) {
					evt.preventDefault();
				});
		} else {
			if (Select2Type === '2') {
				$WidgetIdentifier.select2(Select2Options);
				var idwidget = '#' + WidgetId;

				$WidgetIdentifier.on('select2:select', function (e) {
					UnselectedId = e.params.data.id;
					if (UnselectedId === 'All') {
						var selectedItems = [];
						var allOptions = $(idwidget + ' option');
						allOptions.each(function () {
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
							allOptions.each(function () {
								selectedItems.push($(this).val());
							});
							$WidgetIdentifier.select2('destroy');
							$WidgetIdentifier.val(selectedItems).trigger('change');
							$WidgetIdentifier.select2(Select2Options);
							$WidgetIdentifier.select2('open');
						}
					}
				});

				$WidgetIdentifier.on('select2:unselect', function (e) {
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
			window.parent.$('.lds-ring').fadeOut();
			if (!this.isExpandable) {
				$('input[type="text"]:visible').eq(0).focus();
			}
		});
		$(window).unload(function () {
			window.parent.$('.lds-ring').fadeOut();
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
			_this.$sidebar
				.find('.FieldsSlider')
				.addClass('Tab1')
				.removeClass('Tab2');
			_this.setFieldFocus(_this.$sidebarContent.find('.TextInput:visible').eq(0));
		});
		this.$sidebar.on('click', '.SearchSideBarFields .ButtonGroup_button:last-child', function () {
			_this.$sidebar
				.find('.FieldsSlider')
				.addClass('Tab2')
				.removeClass('Tab1');
			_this.setFieldFocus(_this.$sidebarContent.find('.TextInput:visible').eq(0));
		});
	};

	Sidebar.prototype.openMenuItem = function (selectedPosition) {
		var _this = this;
		this.$sidebar
			.find('.SidebarMenuItem')
			.removeClass('active')
			.eq(selectedPosition)
			.addClass('active');
		this.$sidebar
			.find('.ISidebar-content > .ISidebar-content-panel')
			.hide()
			.eq(selectedPosition)
			.show();
		this.$sidebar.addClass('open');
		if (window.parent.length && this.isExpandable) {
			window.parent.SapphireWidgets.LayoutBase.openSidebarIframe(0);
		}
		if (this.$sidebarContent.find('.TextInput:visible').length > 0) {
			this.setFieldFocus(this.$sidebarContent.find('.TextInput:visible').eq(0));
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
	increment: function (elementId, minValue, maxValue, triggerOnChange) {
		var _element = $(elementId).find('input[type="number"]').first();
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
				$(elementId).find('a.Minus').removeAttr('disabled');
			}
			if (parseFloat(_element.val()) >= maxValue) {
				$(elementId).find('a.Plus').attr('disabled', 'disabled');
			}
		}
	},
	decrement: function (elementId, minValue, triggerOnChange) {
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
			var MinValue = ' + MinValue + ';

			$(`#${config.widgetID} .SpinnerInputVertical input`).on('blur keyup input', function() {
				var CurrentInputValue = $(`#${config.widgetID} .SpinnerInputVertical input`).val();

				if (CurrentInputValue < MinValue) {
					$(`#${config.widgetID}`)
						.find('.MinusVertical')
						.addClass('DisabledSpin');
				} else {
					$(`#${config.widgetID}`)
						.find('.MinusVertical')
						.removeClass('DisabledSpin');
				}
			});

			if ($(`#${config.widgetID} .SpinnerInputVertical input`).val() <= MinValue) {
				$(`#${config.widgetID}`)
					.find('.MinusVertical')
					.addClass('DisabledSpin');
			}

			if (config.isCursorOnFocus) {
				$('body').on('focus', `#${config.inputID} input`, function() {
					var that = this;

					setTimeout(function() {
						that.selectionStart = that.selectionEnd = 100000;
					}, 300);
				});
			}
		});
	};

	const increment = (elementId, minValue, maxValue, triggerOnChange, triggerOnInput) => {
		let _element = $(elementId)
			.find('input[type="text"], input[type="number"]')
			.first();
		var forceInteger = $(elementId).data('forceinteger') === 'True' ? true : false;
		var currentValue = parseFloat(_element.val());
		var incrementUnit = 1;
		var isDecimals = currentValue % 1 != 0;

		$(elementId)
			.find('.MinusVertical')
			.removeClass('DisabledSpin');

		if (parseFloat(currentValue) < minValue) {
			$(elementId)
				.find('a.MinusVertical')
				.addClass('DisabledSpin');
		} else {
			$(elementId)
				.find('a.MinusVertical')
				.removeClass('DisabledSpin');
		}

		if (!forceInteger) {
			if (isDecimals) {
				incrementUnit = parseFloat(0.1);
			}
		}
		if (currentValue === undefined || currentValue === '' || isNaN(parseFloat(currentValue))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
			if (triggerOnInput) {
				_element.trigger('input');
			}
		} else {
			if (parseFloat(currentValue) < maxValue) {
				if (currentValue === 0 && !forceInteger) {
					incrementUnit = parseFloat(0.1);
				}
				_element.val(parseFloat((currentValue + incrementUnit).toFixed(1)));
				if (triggerOnChange) {
					_element.trigger('change');
				}
				if (triggerOnInput) {
					_element.trigger('input');
				}
				$(elementId)
					.find('a.MinusVertical')
					.removeAttr('disabled');
			} else {
				$(elementId)
					.find('a.PlusVertical')
					.attr('disabled', 'disabled');
			}
		}

		checkSpinnerVerticalDisabledStatus(elementId, parseFloat(_element.val()), minValue, maxValue);
	};

	const decrement = (elementId, minValue, maxValue, triggerOnChange, triggerOnInput) => {
		var _element = $(elementId)
			.find('input[type="text"], input[type="number"]')
			.first();
		var forceInteger = $(elementId).data('forceinteger') === 'True' ? true : false;
		var currentValue = parseFloat(_element.val());
		var incrementUnit = 1;
		var isDecimals = currentValue % 1 != 0;
		if (!forceInteger) {
			if (isDecimals) {
				incrementUnit = parseFloat(0.1);
			}
		}
		if (currentValue === undefined || currentValue === '' || isNaN(parseFloat(currentValue))) {
			_element.val(minValue);
			if (triggerOnChange) {
				_element.trigger('change');
			}
			if (triggerOnInput) {
				_element.trigger('input');
			}
		} else {
			if (parseFloat(currentValue) > minValue) {
				if (currentValue === 1 && !forceInteger) {
					incrementUnit = parseFloat(0.1);
				}
				_element.val(parseFloat((currentValue - incrementUnit).toFixed(1)));
				if (triggerOnChange) {
					_element.trigger('change');
				}
				if (triggerOnInput) {
					_element.trigger('input');
				}
				$(elementId)
					.find('a.PlusVertical')
					.removeAttr('disabled');
			} else {
				$(elementId)
					.find('a.MinusVertical')
					.attr('disabled', 'disabled');
			}
		}

		checkSpinnerVerticalDisabledStatus(elementId, parseFloat(_element.val()), minValue, maxValue);
	};

	const checkSpinnerVerticalDisabledStatus = (elementId, valueToCheck, minValue, maxValue) => {
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
			// console.log(_this.config.widgetId, _this.$trigger.hasClass('tooltipstered'));
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

/***/ "./src/components/05-components/v3-pat/table-data/scripts.js":
/*!*******************************************************************!*\
  !*** ./src/components/05-components/v3-pat/table-data/scripts.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var setupTabularScroll = function($tabularScroll) {
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

$(function() {
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

$(window).resize(function() {
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


/***/ }),

/***/ "./src/components/05-components/v3-pat/tabs-extended/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/tabs-extended/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TabsExtended */
SapphireWidgets.TabsExtended = function() {
	$('.Tabs_Extended .Tabs_header > .Tabs__tab').each(function() {
		if ($(this).text() === '') {
			$(this).remove();
		}
	});

	$('.Tabs_Extended .Tabs_header .Tabs__tab:not(.active)')
		.off('mousedown')
		.on('mousedown', function(evt) {
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

	$('.Tabs_Extended--disabled').each(function(index, el) {
		$(el)
			.parent()
			.css('cursor', 'default')
			.off('click');
	});

	$('.Tabs_Extended').each(function(index, el) {
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
};

$(document).ready(function() {
	SapphireWidgets.TabsExtended();
	osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.TabsExtended);
});


/***/ }),

/***/ "./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js":
/*!**********************************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/trigger-iframe-tooltip/trigger-iframe-tooltip.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TriggerIframeTooltip */

(function ($, window, document, SapphireWidgets) {

  var create = function (config) {
    var $elementId = $('#' + config.elementId);
    $elementId.addClass('tooltip');

    var extraDataParams = 'data-iframetooltiptriggerid="' + config.elementId + '"';
    var widgetNotifyDiv = $.find('[data-iframetooltiptriggerid="' + config.elementId + '"]');
    if (widgetNotifyDiv.length === 1) {
      extraDataParams += " data-iframetooltipnotifyid=" + $(widgetNotifyDiv).data('iframetooltipnotifyid');
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
      content: '<iframe src="' + config.URL + '" style="border:none" id="tooltipster-frame" ' + extraDataParams + '></iframe>',
      functionReady: function (instance, helper) {
        $(helper).css({
          'visibility': 'hidden'
        });
        setTimeout(function () {
          $('.tooltipster-base').css({
            'visibility': 'visible'
          });
        }, 500);
      }
    });
  }

  SapphireWidgets.TriggerIframeTooltip = {
    create
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzIHN5bmMgXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzAwLXNldHRpbmdzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtbWVudS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGV0aW1lLXJhbmdlLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3Bkb3duLWNhdGVnb3JpZXMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wem9uZS9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZnVsbHNjcmVlbi10YWJzLXdyYXBwZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3Jpem9udGFsLXRvb2xiYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LXdpdGgtY2xlYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9sb2NhdGlvbi1ib3gvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tYWluLWludGVyYWN0aXZlLWNhcmQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tZW51LWJhci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L211bHRpcGxlLXNlbGVjdGlvbi1idXR0b24vc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQtbm90aWZ5LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2FwcGhpcmUtcGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGVyc29uLWNhcmQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tY2FyZC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtaGVhZGVyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWN1c3RvbS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1pbnNpZGUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWxlY3Qtc3lzdGVtL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2lkZWJhci9zaWRlYmFyLXN0cnVjdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLWhvcml6b250YWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3BsaXQtYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWNvbXBvbmVudC1ibG9jay9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1saXN0LWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJsZS1kYXRhL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFicy1leHRlbmRlZC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RyaWdnZXItaWZyYW1lLXRvb2x0aXAvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9nbG9iYWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2luZGV4LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxHQUFHOztRQUVIO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQSw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0Esa0JBQWtCLDhCQUE4QjtRQUNoRDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxvQkFBb0IsMkJBQTJCO1FBQy9DO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLG1CQUFtQixjQUFjO1FBQ2pDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsS0FBSztRQUNyQjtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixZQUFZO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0EsY0FBYyw0QkFBNEI7UUFDMUM7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJOztRQUVKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHVDQUF1QztRQUN4RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsc0JBQXNCO1FBQ3ZDO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxVQUFVO1FBQ1Y7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsY0FBYyx3Q0FBd0M7UUFDdEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsU0FBUztRQUNUO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsUUFBUTtRQUNSO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZUFBZTtRQUNmO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0Esc0NBQXNDLHVCQUF1Qjs7O1FBRzdEO1FBQ0E7Ozs7Ozs7Ozs7OztBQ3h4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQkEsbUJBQU8sQ0FBQyw0REFBeUI7O0FBRWpDO0FBQ0E7QUFDQSxXQUFXLDZEQUE4Qzs7Ozs7Ozs7Ozs7O0FDSnpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkQ7Ozs7Ozs7Ozs7O0FDcEVBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7Ozs7QUFJQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsNkM7Ozs7Ozs7Ozs7O0FDL1FEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDUEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN4T0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUEsZ0NBQWdDO0FBQ2hDLENBQUM7Ozs7Ozs7Ozs7OztBQ3ZERDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNU5EOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsSTs7Ozs7Ozs7Ozs7QUN0Q0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxzRUFBc0U7QUFDdEUsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUN4Y0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMvQ0Q7QUFDYTs7QUFFYjtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1RkFBdUYsYUFBYTtBQUNwRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxFQUFFO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFVBQVUsU0FBUyxhQUFhO0FBQzNDO0FBQ0EseUNBQXlDLFVBQVUsc0JBQXNCLGFBQWE7O0FBRXRGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQSxpREFBaUQsWUFBWTs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaURBQWlEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04seURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBLDJEQUEyRDs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsbURBQW1EO0FBQ25ELCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekM7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLG9DQUFvQyxzRUFBc0U7O0FBRTFHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1IsT0FBTztBQUNQLE1BQU07O0FBRU47O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdEO0FBQ3hEOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUIsb0JBQW9CLGFBQWE7QUFDakM7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ04sd0RBQXdELFVBQVU7QUFDbEU7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxLQUFLO0FBQ2I7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sS0FBSztBQUNaO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLGlDQUFpQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixpQ0FBaUM7QUFDeEQ7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlDQUFpQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQ0FBaUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0EseURBQXlELDJCQUEyQjtBQUNwRjtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxJQUFJLEtBQTZCO0FBQ2pDO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM1NEhBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsU0FBUyxxREFBcUQsU0FBUztBQUMvRTs7QUFFQTs7QUFFQSxtQ0FBbUM7QUFDbkMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGdDQUFnQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEMsTUFBTTtBQUNOLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOzs7Ozs7Ozs7Ozs7QUM5SUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLG1DOzs7Ozs7Ozs7OztBQ3pGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0I7O0FBRWhFO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLGlCQUFpQixFQUFFLEtBQUs7QUFDckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSxNQUFNLEdBQUcsUUFBUSxHQUFHLFFBQVE7QUFDekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUN0SkQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsSTs7Ozs7Ozs7Ozs7QUNyREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUYsQ0FBQyxFOzs7Ozs7Ozs7OztBQzVRRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDMUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbkREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNyREQsbUJBQU8sQ0FBQywrRkFBc0I7QUFDOUIsbUJBQU8sQ0FBQyxpRkFBZTtBQUN2QjtBQUNBLG1CQUFPLENBQUMsK0VBQWM7QUFDdEIsbUJBQU8sQ0FBQyx1RkFBa0I7Ozs7Ozs7Ozs7Ozs7QUNKMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNuRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDOUJEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0JBQWdCO0FBQ3hCLGtCQUFrQixnQkFBZ0I7QUFDbEMsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDO0FBQ3JDLENBQUM7Ozs7Ozs7Ozs7OztBQ3ZCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDLGdCQUFnQjs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7QUFDM0MsQ0FBQzs7Ozs7Ozs7Ozs7O0FDeEpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7OztBQ2pHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOzs7Ozs7Ozs7QUFTQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxtQzs7Ozs7Ozs7Ozs7QUN0TkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUM7QUFDdkMsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3BMRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLDJDQUEyQztBQUMzQyxrQ0FBa0M7QUFDbEMsNkJBQTZCO0FBQzdCLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixFOzs7Ozs7Ozs7OztBQzdZQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUEsR0FBRzs7QUFFSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN4TEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDZDOzs7Ozs7Ozs7OztBQ2xIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLEU7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxnQkFBZ0I7QUFDekIsa0NBQWtDLGdCQUFnQjs7QUFFbEQ7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0EsS0FBSztBQUNMLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUosYUFBYSxnQkFBZ0I7QUFDN0IsVUFBVSxnQkFBZ0I7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMzS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUM1Q0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7Ozs7QUFJVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0I7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiw4STs7O0FBR0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsaVI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFNBQVM7QUFDVCxxQ0FBcUM7QUFDckM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7OztBQzFmRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbEREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMxREQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUN6Q0Q7Ozs7Ozs7Ozs7OztBQ0FBLHVDIiwiZmlsZSI6ImRldi5hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJhZGI3NGI0MWNmN2RlNjgwNmIwMlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJhcHBcIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvYXBwLmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwicmVxdWlyZSgnLi9jb21wb25lbnRzL2luZGV4LnNjc3MnKTtcblxuLy9JbXBvcnQgYWxsIEpTIGZpbGVzXG5jb25zdCByZXF1aXJlQWxsID0gciA9PiByLmtleXMoKS5mb3JFYWNoKHIpO1xucmVxdWlyZUFsbChyZXF1aXJlLmNvbnRleHQoJy4vY29tcG9uZW50cycsIHRydWUsIC9cXC5qcyQvKSk7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vMDAtc2V0dGluZ3MvY29uZmlnLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wMC1zZXR0aW5ncy9jb25maWcuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1iYXNlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1tZW51L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1zdWItbWVudS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvY29tcC1saW5lL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGEtdGFibGVzL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGEtdGFibGVzL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGV0aW1lLXJhbmdlLXBpY2tlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZHJvcGRvd24tY2F0ZWdvcmllcy9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wZG93bi1jYXRlZ29yaWVzL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3B6b25lL3BsdWdpbi5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZHJvcHpvbmUvcGx1Z2luLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9leHBhbmRhYmxlLWxpbmsvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Z1bGxzY3JlZW4tdGFicy13cmFwcGVyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Z1bGxzY3JlZW4tdGFicy13cmFwcGVyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2dlbmVyaWMtZ2FsbGVyeS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaG9yaXpvbnRhbC10b29sYmFyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2hvcml6b250YWwtdG9vbGJhci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC13aXRoLWNsZWFyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LXdpdGgtY2xlYXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xvY2F0aW9uLWJveC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9tYWluLWludGVyYWN0aXZlLWNhcmQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L21lbnUtYmFyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L21lbnUtYmFyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L211bHRpcGxlLXNlbGVjdGlvbi1idXR0b24vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbXVsdGlwbGUtc2VsZWN0aW9uLWJ1dHRvbi9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcGFuZWwuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL2NvbmZpcm1hdGlvbi1wYW5lbC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQtbm90aWZ5LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC1ub3RpZnkuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcG9wdXAtbWVudS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcG9wdXAtbWVudS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2FwcGhpcmUtcGFuZWwuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NhcHBoaXJlLXBhbmVsLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhdGllbnQtY2FsbC1jYW5jZWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGVyc29uLWNhcmQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGVyc29uLWNhcmQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWNhcmQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWNhcmQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWV4cGFuZGFibGUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWV4cGFuZGFibGUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtaGVhZGVyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1yYWRpby1idXR0b24vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1jdXN0b20vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWN1c3RvbS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtaW5zaWRlL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1pbnNpZGUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2VsZWN0LXN5c3RlbS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWxlY3Qtc3lzdGVtL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NoaWZ0LWNvbnRhaW5lci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zaGlmdC1jb250YWluZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2lkZWJhci9zaWRlYmFyLXN0cnVjdHVyZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2lkZWJhci9zaWRlYmFyLXN0cnVjdHVyZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci1ob3Jpem9udGFsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItaG9yaXpvbnRhbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItdmVydGljYWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3BsaXQtYnV0dG9uL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwbGl0LWJ1dHRvbi9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtY29tcG9uZW50LWJsb2NrL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1jb21wb25lbnQtYmxvY2svc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWxpc3QtbGluZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtbGlzdC1saW5lL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYmxlLWRhdGEvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFibGUtZGF0YS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJzLWV4dGVuZGVkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC90cmlnZ2VyLWlmcmFtZS10b29sdGlwLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90cmlnZ2VyLWlmcmFtZS10b29sdGlwL3RyaWdnZXItaWZyYW1lLXRvb2x0aXAuanNcIixcblx0XCIuL2dsb2JhbHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzL2dsb2JhbHMuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvY29tcG9uZW50cyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLmpzJFwiOyIsIlNhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzIHx8IHt9O1xuIiwiLyogQ29tcG9uZW50IExheW91dEJhc2UgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IExheW91dEJhc2UoY29uZmlnKTtcclxuXHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xyXG5cdH07XHJcblxyXG5cdHZhciBvcGVuU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLndpZGdldElkXS5vcGVuU2lkZWJhcklmcmFtZShkdXJhdGlvbik7XHJcblx0fTtcclxuXHJcblx0dmFyIGNsb3NlU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLndpZGdldElkXS5jbG9zZVNpZGViYXJJZnJhbWUoZHVyYXRpb24pO1xyXG5cdH07XHJcblxyXG5cdHZhciBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcclxuXHRcdHZhciAkdGFyZ2V0RWxlbWVudCA9ICRlbGVtZW50O1xyXG5cdFx0aWYgKCEhJHRhcmdldEVsZW1lbnQubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBzY3JvbGxUb09mZnNldEludGVydmFsO1xyXG5cdFx0XHRzY3JvbGxUb09mZnNldEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmICh3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLmdldFRocmVzaG9sZHMoKS5zZWNvbmRhcnlUaHJlc2hvbGQgPiAwKSB7XHJcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwpO1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgPSAkdGFyZ2V0RWxlbWVudC5vZmZzZXQoKS50b3A7XHJcblx0XHRcdFx0XHR2YXIgZGlzY291bnQ7XHJcblx0XHRcdFx0XHRpZiAoISEkKCcuTGF5b3V0QmFzZS1lbWVyZ2VuY3knKS50ZXh0KCkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCQoJy5MYXlvdXRCYXNlLXNlY29uZGFyeScpLmhhc0NsYXNzKCdpc0ZpeGVkJykpIHtcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50T2Zmc2V0VG9wICs9IDE1MDtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50T2Zmc2V0VG9wICs9IDgwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGRpc2NvdW50ID0gMzkwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKCQoJy5MYXlvdXRCYXNlLXNlY29uZGFyeScpLmhhc0NsYXNzKCdpc0ZpeGVkJykpIHtcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50T2Zmc2V0VG9wICs9IDgwO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gMjA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZGlzY291bnQgPSAyNjA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0JCgnYm9keSwgaHRtbCcpLnNjcm9sbFRvcCh0YXJnZXRFbGVtZW50T2Zmc2V0VG9wIC0gZGlzY291bnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMjUwKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR2YXIgTGF5b3V0QmFzZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lciA9IDA7XHJcblx0XHR0aGlzLmhhc0hlYWRlciA9IGNvbmZpZy5oYXNIZWFkZXI7XHJcblx0XHR0aGlzLmlzRXhwYW5kYWJsZSA9IGNvbmZpZy5pc0V4cGFuZGFibGU7XHJcblx0XHR0aGlzLmlzVG9wV2luZG93ID0gd2luZG93LnRvcCA9PT0gd2luZG93LnNlbGYgPyB0cnVlIDogZmFsc2U7XHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiR3cmFwcGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLVdyYXBwZXInKTtcclxuXHRcdHRoaXMuJHNwYWNlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zcGFjZXInKTtcclxuXHRcdC8vIHRoaXMuJGxheW91dEJhc2VDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLUNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJG1haW5NZW51ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLU1haW5NZW51Jyk7XHJcblx0XHR0aGlzLiRoZWFkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtaGVhZGVyJyk7XHJcblx0XHR0aGlzLiRoZWFkZXJCb2R5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1ib2R5Jyk7XHJcblx0XHR0aGlzLiRwcmltYXJ5TWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1wcmltYXJ5LW1lbnUnKTtcclxuXHRcdHRoaXMuJGVtZXJnZW5jeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1lbWVyZ2VuY3knKTtcclxuXHRcdHRoaXMuJHNlY29uZGFyeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zZWNvbmRhcnknKTtcclxuXHRcdHRoaXMuJHNlY29uZGFyeU1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5LW1lbnUnKTtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtaWZyYW1lc2lkZWJhcicpO1xyXG5cdFx0dGhpcy4kaGVhZGVyQWRkaXRpb25hbENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWFkZGl0aW9uYWwtY29udGVudCcpO1xyXG5cdFx0dGhpcy4kdG9wZml4ZWRDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXRvcGZpeGVkY29udGVudCcpO1xyXG5cdFx0dGhpcy4kYm90dG9tZml4ZWRDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLWJvdHRvbWZpeGVkY29udGVudCcpO1xyXG5cdFx0dGhpcy4kbWFpbkNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtTWFpbkNvbnRlbnQnKTtcclxuXHRcdHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ID0gMDtcclxuXHRcdHRoaXMuZXh0cmFQYWRkaW5nU2Vjb25kYXJ5ID0gMDtcclxuXHRcdC8vIHRoaXMucmVmZXJlbmNlSGVpZ2h0ID0gbnVsbDtcclxuXHRcdHRoaXMuc2V0dXBXaW5kb3dFdmVudHMoKTtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xyXG5cdFx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnTGF5b3V0QmFzZScpO1xyXG5cdFx0XHRpZiAoX3RoaXMuaXNUb3BXaW5kb3cpIHtcclxuXHRcdFx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbCgpO1xyXG5cdFx0XHQvLyBfdGhpcy5yZWZlcmVuY2VIZWlnaHQgPSAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0fSlcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5zZXR1cFdpbmRvd0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRfdGhpcy51cGRhdGVUaHJlc2hvbGRzKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycygpO1xyXG5cdFx0XHRfdGhpcy5oYW5kbGVMYXlvdXRUb3BQYWRkaW5nKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KF90aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lcik7XHJcblx0XHRcdF90aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnPT09PT0nKTtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnd2luZG93JywgJCh3aW5kb3cpLmhlaWdodCgpKTtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnc2Nyb2xsaGVpZ2h0JywgJCgnYm9keScpWzBdLnNjcm9sbEhlaWdodCk7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ3JlZmVyZW5jZUhlaWdodCcsIF90aGlzLnJlZmVyZW5jZUhlaWdodCk7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlVGhyZXNob2xkcygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZUxheW91dFRvcFBhZGRpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVMYXlvdXRCb3R0b21QYWRkaW5nKCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuaGFuZGxlT3B0aW9uYWxDb250YWluZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRpZiAodGhpcy4kZW1lcmdlbmN5Lmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRpZiAoc2Nyb2xsVG9wICsgdGhpcy5jb250ZW50VGhyZXNob2xkID4gdGhpcy5lbWVyZ2VuY3lUaHJlc2hvbGQpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kuYWRkQ2xhc3MoJ2lzRml4ZWQnKTtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogdGhpcy5jb250ZW50VGhyZXNob2xkLFxyXG5cdFx0XHRcdFx0d2lkdGg6IHRoaXMuJGhlYWRlci53aWR0aCgpLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ID0gdGhpcy4kZW1lcmdlbmN5Lm91dGVySGVpZ2h0KHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5yZW1vdmVDbGFzcygnaXNGaXhlZCcpO1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiAnYXV0bycsXHJcblx0XHRcdFx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLiRzZWNvbmRhcnkubGVuZ3RoID09PSAxICYmIHRoaXMuJHNlY29uZGFyeS50ZXh0KCkubGVuZ3RoID4gMCkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeU1lbnUudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5hZGRDbGFzcygnbm9Ub29sYmFyJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzY3JvbGxUb3AgKyB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgKyAodGhpcy4kZW1lcmdlbmN5Lm91dGVySGVpZ2h0KHRydWUpIHx8IDApID4gdGhpcy5zZWNvbmRhcnlUaHJlc2hvbGQpIHtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuYWRkQ2xhc3MoJ2lzRml4ZWQnKS5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgKyAodGhpcy4kZW1lcmdlbmN5Lm91dGVySGVpZ2h0KHRydWUpIHx8IDApLFxyXG5cdFx0XHRcdFx0d2lkdGg6IHRoaXMuJGhlYWRlci53aWR0aCgpLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5maW5kKCcuQnV0dG9uLlNlY29uZCwgLkJ1dHRvbi5UaGlyZCcpLm5vdCgnLlBhbmVsIC5CdXR0b24uU21hbGwsIC5QYW5lbCAuQnV0dG9uLlRoaXJkJykuYWRkQ2xhc3MoJ1NtYWxsJyk7XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeS5maW5kKCcuVG9vbGJhcicpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldFRvb2xiYXJXaWR0aCA9ICQoJy5TYXBwaGlyZUhlYWRlcicpLm91dGVyV2lkdGgodHJ1ZSkgKiAwLjY2O1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykud2lkdGgodGFyZ2V0VG9vbGJhcldpZHRoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeU1lbnUudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdub1Rvb2xiYXInKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4kcHJpbWFyeU1lbnUuY3NzKCdvcGFjaXR5JywgMCk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSB0aGlzLiRzZWNvbmRhcnkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG5cdFx0XHRcdC8vIC8vXHJcblx0XHRcdFx0Ly8gdmFyIGN1cnJlbnRIZWlnaHQgPSAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0XHRcdC8vIHZhciBjb21wZW5zYXRpb24gPSB0aGlzLnJlZmVyZW5jZUhlaWdodCAtIGN1cnJlbnRIZWlnaHQ7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coY29tcGVuc2F0aW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gaWYgKGNvbXBlbnNhdGlvbiA8PSAwKSB7XHJcblx0XHRcdFx0Ly8gXHQvLyB0aGlzLiRsYXlvdXRCYXNlQ29udGVudC5jc3MoJ3BhZGRpbmctYm90dG9tJywgJycpO1xyXG5cdFx0XHRcdC8vIH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gXHR0aGlzLiRsYXlvdXRCYXNlQ29udGVudC5jc3MoJ3BhZGRpbmctYm90dG9tJywgY29tcGVuc2F0aW9uKTtcclxuXHRcdFx0XHQvLyB9XHJcblxyXG5cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdC8vIHRoaXMuJGxheW91dEJhc2VDb250ZW50LmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5yZW1vdmVDbGFzcygnaXNGaXhlZCcpLmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5CdXR0b24uU2Vjb25kLCAuQnV0dG9uLlRoaXJkJykucmVtb3ZlQ2xhc3MoJ1NtYWxsJyk7XHJcblx0XHRcdFx0dGhpcy4kcHJpbWFyeU1lbnUuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmNzcyh7XHJcblx0XHRcdFx0XHRoZWlnaHQ6ICd1bnNldCcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykuY3NzKCd3aWR0aCcsICcxMDAlJyk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5TWVudS50ZXh0KCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuQ2xpbmljaWFuV29ya0FyZWEtY29sdW1ucy1iaWcnKS5jc3MoJ21hcmdpbi10b3AnLCAndW5zZXQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLkNsaW5pY2lhbldvcmtBcmVhLWNvbHVtbnMtYmlnJykuY3NzKCdtYXJnaW4tdG9wJywgLXRoaXMuJHNlY29uZGFyeS5vdXRlckhlaWdodCh0cnVlKSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5TWVudS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAndHJhbnNwYXJlbnQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmhhbmRsZUxheW91dFRvcFBhZGRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcGFkZGluZ1RvcCA9IHRoaXMuY29udGVudFRocmVzaG9sZCArIHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ICsgdGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnk7XHJcblx0XHR0aGlzLiRzcGFjZXIuc3RvcCgpLmFuaW1hdGUoe1xyXG5cdFx0XHRoZWlnaHQ6IHBhZGRpbmdUb3AsXHJcblx0XHR9LCAwLCAnbGluZWFyJyk7XHJcblx0XHRpZiAodGhpcy4kdG9wZml4ZWRDb250ZW50Lmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHR0aGlzLiR0b3BmaXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHR3aWR0aDogJCgnLkxheW91dEJhc2UtTWFpbkNvbnRlbnQnKS53aWR0aCgpLFxyXG5cdFx0XHRcdHRvcDogdGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQgKyAncHgnLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVMYXlvdXRCb3R0b21QYWRkaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuJGJvdHRvbWZpeGVkQ29udGVudC5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0aWYgKCQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQgPiAkKCdib2R5JykuaGVpZ2h0KCkpIHtcclxuXHRcdFx0XHR2YXIgYm90dG9tRml4ZWRIZWlnaHQgPSB0aGlzLiRib3R0b21maXhlZENvbnRlbnQub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0dGhpcy4kd3JhcHBlci5hZGRDbGFzcygnaGFzRml4ZWRCb3R0b20nKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgYm90dG9tRml4ZWRIZWlnaHQgKyAncHgnKTtcclxuXHRcdFx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRcdHdpZHRoOiAkKCcuTGF5b3V0QmFzZS1NYWluQ29udGVudCcpLm91dGVyV2lkdGgodHJ1ZSlcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiR3cmFwcGVyLnJlbW92ZUNsYXNzKCdoYXNGaXhlZEJvdHRvbScpLmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7XHJcblx0XHRcdFx0dGhpcy4kYm90dG9tZml4ZWRDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0XHR3aWR0aDogJydcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLnVwZGF0ZVRocmVzaG9sZHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFpbk1lbnVIZWlnaHQgPSB0aGlzLiRtYWluTWVudS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIGhlYWRlckJvZHlIZWlnaHQgPSB0aGlzLiRoZWFkZXJCb2R5Lm91dGVySGVpZ2h0KHRydWUpIHx8IHRoaXMuJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIHRvcGZpeGVkQ29udGVudEhlaWdodCA9IHRoaXMuJHRvcGZpeGVkQ29udGVudC5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIHByaW1hcnlNZW51SGVpZ2h0ID0gdGhpcy4kcHJpbWFyeU1lbnUub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdHZhciBlbWVyZ2VuY3lIZWlnaHQgPSB0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdHRoaXMudG9wZml4ZWRDb250ZW50VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0O1xyXG5cdFx0dGhpcy5jb250ZW50VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0ICsgdG9wZml4ZWRDb250ZW50SGVpZ2h0O1xyXG5cdFx0dGhpcy5lbWVyZ2VuY3lUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQgKyBwcmltYXJ5TWVudUhlaWdodDtcclxuXHRcdHRoaXMuc2Vjb25kYXJ5VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0ICsgdG9wZml4ZWRDb250ZW50SGVpZ2h0ICsgcHJpbWFyeU1lbnVIZWlnaHQgKyBlbWVyZ2VuY3lIZWlnaHQ7XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuZ2V0VGhyZXNob2xkcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHRvcGZpeGVkQ29udGVudFRocmVzaG9sZDogdGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQsXHJcblx0XHRcdGNvbnRlbnRUaHJlc2hvbGQ6IHRoaXMuY29udGVudFRocmVzaG9sZCxcclxuXHRcdFx0ZW1lcmdlbmN5VGhyZXNob2xkOiB0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCxcclxuXHRcdFx0c2Vjb25kYXJ5VGhyZXNob2xkOiB0aGlzLnNlY29uZGFyeVRocmVzaG9sZCxcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUub3BlblNpZGViYXJJZnJhbWUgPSBmdW5jdGlvbiAoZHVyYXRpb25faW4pIHtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uX2luID49IDAgPyBkdXJhdGlvbl9pbiA6IDEwMDtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYW5pbWF0ZSh7XHJcblx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR9LCBkdXJhdGlvbik7XHJcblx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFx0JCgnLnRvb2x0aXBzdGVyZWQnKS50b29sdGlwc3RlcignaGlkZScpO1xyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmNsb3NlU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbl9pbikge1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb25faW4gPj0gMCA/IGR1cmF0aW9uX2luIDogMTAwO1xyXG5cdFx0dmFyIHRhcmdldFdpZHRoID0gdGhpcy5pc0V4cGFuZGFibGUgPyA0MCA6IDI2MjtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYW5pbWF0ZSh7XHJcblx0XHRcdHdpZHRoOiB0YXJnZXRXaWR0aCxcclxuXHRcdH0sIGR1cmF0aW9uKTtcclxuXHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2UgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGNsb3NlU2lkZWJhcklmcmFtZTogY2xvc2VTaWRlYmFySWZyYW1lLFxyXG5cdFx0b3BlblNpZGViYXJJZnJhbWU6IG9wZW5TaWRlYmFySWZyYW1lLFxyXG5cdFx0c2Nyb2xsVG9FbGVtZW50OiBzY3JvbGxUb0VsZW1lbnQsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgTGF5b3V0QmxhbmsgKi9cbiQoZnVuY3Rpb24oKSB7XG5cdGlmICh3aW5kb3cuZnJhbWVFbGVtZW50KSB7XG5cdFx0aWYgKCEhJCh0aGlzLmZyYW1lRWxlbWVudCkuY2xvc2VzdCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQnKS5sZW5ndGgpIHtcblx0XHRcdCQoJy5MYXlvdXRCbGFuay5QYWdlJykuYWRkQ2xhc3MoJ01haW5JbnRlcmFjdGl2ZUNhcmQnKTtcblx0XHR9XG5cdH1cbn0pO1xuIiwiLyogQ29tcG9uZW50IExheW91dFBvcHVwICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIHBvcHVwV2lkdGg7XHJcblx0dmFyIHBvcHVwTWluV2lkdGg7XHJcblx0dmFyIHBvcHVwSGVpZ2h0O1xyXG5cdHZhciBwb3B1cE1pbkhlaWdodDtcclxuXHR2YXIgcG9wdXBNYXhIZWlnaHQ7XHJcblx0dmFyIHBvcHVwV2lkdGhQZXJjZW50YWdlO1xyXG5cdHZhciBsYXlvdXRQb3B1cFJlc2l6ZVRpbWVyO1xyXG5cclxuXHR2YXIgJHBvcHVwID0gJCgnLkxheW91dFBvcHVwJyk7XHJcblx0dmFyICRvc1BvcHVwID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJyk7XHJcblx0dmFyICRvc1BvcHVwQ29udGVudCA9IHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLXVpLWRpYWxvZy1jb250ZW50Lm9zLWludGVybmFsLXVpLXdpZGdldC1jb250ZW50Jyk7XHJcblx0dmFyICRvdmVybGF5ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtdWktd2lkZ2V0LW92ZXJsYXknKTtcclxuXHR2YXIgcG9wdXBTaXplO1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblxyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHBvcHVwU2l6ZSA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuUG9wdXBTaXplO1xyXG5cclxuXHRcdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ0xheW91dFBvcHVwJyk7IC8vIGJlY2F1c2UgZGF0ZXRpbWVyYW5nZXBpY2tlciBpcyBhdHRhY2hlZCB0byBib2R5XHJcblx0XHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2gpIHtcclxuXHRcdFx0XHQkcG9wdXAuYWRkQ2xhc3MoJ2lzVG91Y2gnKTtcclxuXHRcdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2lzVG91Y2gnKTsgLy8gYmVjYXVzZSBzZWxlY3QyIGlzIGF0dGFjaGVkIHRvIGJvZHlcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcblx0XHRcdFx0bXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uLCBpbmRleCkge1xyXG5cdFx0XHRcdFx0cmVkcmF3RGlhbG9nV2luZG93KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuXHRcdFx0XHRjaGlsZExpc3Q6IHRydWUsXHJcblx0XHRcdFx0c3VidHJlZTogdHJ1ZSxcclxuXHRcdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQodGhpcy5mcmFtZUVsZW1lbnQpLmNzcyh7XHJcblx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHRoZWlnaHQ6ICcxMDAlJ1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmVzaXplRGlhbG9nKCk7XHJcblx0XHRcdFx0cmVzaXplQ29udGVudCgpO1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0XHR9LCAxNTApO1xyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5yZWRyYXdEaWFsb2dXaW5kb3cpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cucGFyZW50KS5vZmYoJ3Jlc2l6ZS5MYXlvdXRQb3B1cCcpLm9uKCdyZXNpemUuTGF5b3V0UG9wdXAnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJlZHJhd0RpYWxvZ1dpbmRvdygpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVkcmF3RGlhbG9nV2luZG93ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KGxheW91dFBvcHVwUmVzaXplVGltZXIpO1xyXG5cdFx0bGF5b3V0UG9wdXBSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXNpemVEaWFsb2coKTtcclxuXHRcdFx0cmVzaXplQ29udGVudCgpO1xyXG5cdFx0fSwgMzAwKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZXNpemVEaWFsb2cgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5oYXNDbG9zZSkge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctdGl0bGViYXInKS5zaG93KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdpbmRvdy50b3AuJCgnYm9keScpLmhhc0NsYXNzKCdMYXlvdXRCYXNlJykpIHtcclxuXHRcdFx0d2luZG93LnRvcC4kKCdib2R5JykuY3NzKHtcclxuXHRcdFx0XHRvdmVyZmxvd1k6ICdoaWRkZW4nXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRvdmVybGF5LndpZHRoKCcxMDAlJyk7XHJcblxyXG5cdFx0dmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93LnBhcmVudCkuaGVpZ2h0KCk7XHJcblx0XHR2YXIgd2luZG93V2lkdGggPSAkKHdpbmRvdy5wYXJlbnQpLndpZHRoKCk7XHJcblxyXG5cdFx0aWYgKHBvcHVwU2l6ZSA9PT0gJ1NtYWxsJykge1xyXG5cdFx0XHRwb3B1cFdpZHRoID0gcGFyc2VJbnQod2luZG93V2lkdGggKiAwLjMzKTtcclxuXHRcdFx0cG9wdXBNaW5XaWR0aCA9IDQwMDtcclxuXHRcdH0gZWxzZSBpZiAocG9wdXBTaXplID09PSAnTWVkaXVtJykge1xyXG5cdFx0XHRzd2l0Y2ggKFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuUG9wdXBXaWR0aCkge1xyXG5cdFx0XHRcdGNhc2UgJ1hTbWFsbCc6XHJcblx0XHRcdFx0XHRwb3B1cE1pbldpZHRoID0gMjAwO1xyXG5cdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdTbWFsbCc6XHJcblx0XHRcdFx0XHRwb3B1cE1pbldpZHRoID0gMzAwO1xyXG5cdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjM7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdNZWRpdW0nOlxyXG5cdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDYwMDtcclxuXHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC42O1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSA3MDA7XHJcblx0XHRcdFx0XHRwb3B1cFdpZHRoUGVyY2VudGFnZSA9IDAuNztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9wdXBXaWR0aCA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNUb3VjaCA/IHBhcnNlSW50KHdpbmRvd1dpZHRoICogMC44KSA6IHBhcnNlSW50KHdpbmRvd1dpZHRoICogcG9wdXBXaWR0aFBlcmNlbnRhZ2UpO1xyXG5cdFx0XHRwb3B1cE1pbkhlaWdodCA9IDIwMDtcclxuXHRcdFx0cG9wdXBNYXhIZWlnaHQgPSBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2ggPyBwYXJzZUludCh3aW5kb3dIZWlnaHQgKiAwLjkpIDogcGFyc2VJbnQod2luZG93SGVpZ2h0ICogMC43KTtcclxuXHJcblx0XHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzRml4ZWRIZWlnaHQpIHtcclxuXHRcdFx0XHRwb3B1cEhlaWdodCA9IHBvcHVwTWF4SGVpZ2h0O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHBvcHVwSGVpZ2h0ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJykub3V0ZXJIZWlnaHQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JG9zUG9wdXBDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0bWF4SGVpZ2h0OiBwb3B1cE1heEhlaWdodCArICdweCcsXHJcblx0XHRcdFx0bWluSGVpZ2h0OiBwb3B1cE1pbkhlaWdodCArICdweCcsXHJcblx0XHRcdFx0aGVpZ2h0OiBwb3B1cEhlaWdodCArICdweCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIGlmIChwb3B1cFNpemUgPT09ICdMYXJnZScpIHtcclxuXHRcdFx0cG9wdXBNaW5XaWR0aCA9IHBhcnNlSW50KHdpbmRvd1dpZHRoICogMC44KTtcclxuXHRcdFx0cG9wdXBNYXhIZWlnaHQgPSBwYXJzZUludCh3aW5kb3dIZWlnaHQgKiAwLjkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRvc1BvcHVwLmNzcyh7XHJcblx0XHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxyXG5cdFx0XHRsZWZ0OiAnNTAlJyxcclxuXHRcdFx0dG9wOiAnNTAlJyxcclxuXHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcclxuXHRcdFx0aGVpZ2h0OiAnYXV0bycsXHJcblx0XHRcdG1pbldpZHRoOiBwb3B1cE1pbldpZHRoICsgJ3B4JyxcclxuXHRcdFx0d2lkdGg6IHBvcHVwV2lkdGggKyAncHgnLFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVzaXplQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciAkYm9keSA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpO1xyXG5cdFx0dmFyIGNvbnRlbnRTY3JvbGxUb3AgPSAkYm9keS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnICYmICQoJy5kYXRlcmFuZ2VwaWNrZXI6dmlzaWJsZScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Ly8gc2tpcCB0aGUgcmVzZXQgb2YgLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkYm9keS5jc3Moe1xyXG5cdFx0XHRcdGhlaWdodDogJ2F1dG8nXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBoZWFkZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2hlYWRlcicpLmlubmVySGVpZ2h0KCkgfHwgMDtcclxuXHRcdHZhciBpbnRyb0hlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9faW50cm8nKS5pbm5lckhlaWdodCgpIHx8IDA7XHJcblx0XHR2YXIgYm9keUhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpWzBdLnNjcm9sbEhlaWdodCB8fCAwO1xyXG5cdFx0dmFyIGZvb3RlckhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9fZm9vdGVyJykuaW5uZXJIZWlnaHQoKSB8fCAwO1xyXG5cdFx0dmFyIGNvbnRlbnRIZWlnaHQgPSBoZWFkZXJIZWlnaHQgKyBpbnRyb0hlaWdodCArIGJvZHlIZWlnaHQgKyBmb290ZXJIZWlnaHQgKyA0MDtcclxuXHRcdHZhciBkaWFsb2dIZWlnaHQgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC1Qb3B1cC5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKS5vdXRlckhlaWdodCgpO1xyXG5cclxuXHRcdGlmIChwb3B1cFNpemUgPT09ICdTbWFsbCcpIHtcclxuXHRcdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodChjb250ZW50SGVpZ2h0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChjb250ZW50SGVpZ2h0IDwgZGlhbG9nSGVpZ2h0ICYmIFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNGaXhlZEhlaWdodCkge1xyXG5cdFx0XHRcdHZhciBmb3JjZWRCb2R5SGVpZ2h0ID0gZGlhbG9nSGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW50cm9IZWlnaHQgLSBmb290ZXJIZWlnaHQgLSA0MDtcclxuXHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA8IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPCBwb3B1cE1pbkhlaWdodCkge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmVyZW5jZSA9IHBvcHVwTWluSGVpZ2h0IC0gY29udGVudEhlaWdodDtcclxuXHRcdFx0XHRcdCRib2R5LmhlaWdodChib2R5SGVpZ2h0ICsgZGlmZXJlbmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA+PSBkaWFsb2dIZWlnaHQgJiYgU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc0ZpeGVkSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBkaWFsb2dIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCAtIGZvb3RlckhlaWdodCAtIDQwO1xyXG5cdFx0XHRcdCRib2R5LmhlaWdodChmb3JjZWRCb2R5SGVpZ2h0KTtcclxuXHRcdFx0fSBlbHNlIGlmIChjb250ZW50SGVpZ2h0ID49IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdGlmIChjb250ZW50SGVpZ2h0ID4gcG9wdXBNYXhIZWlnaHQpIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQocG9wdXBNYXhIZWlnaHQpO1xyXG5cdFx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBwb3B1cE1heEhlaWdodCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0IC0gZm9vdGVySGVpZ2h0IC0gNDA7XHJcblx0XHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybignVW5leHBlY3RlZCBjb21iaW5hdGlvbi4uLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSGFuZGxlIHdoZW4gRGF0ZVRpbWVSYW5nZVBpY2tlciBpcyBvcGVuZWRcclxuXHRcdHZhciBkYXRlUmFuZ2VQaWNrZXIgPSAkKCcuZGF0ZXJhbmdlcGlja2VyOnZpc2libGUnKTtcclxuXHRcdGlmIChkYXRlUmFuZ2VQaWNrZXIubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmIChkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gZGlhbG9nSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVuY2UgPSBkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC0gZGlhbG9nSGVpZ2h0O1xyXG5cdFx0XHRcdHZhciBib2R5SGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0JCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50JykuaGVpZ2h0KGJvZHlIZWlnaHQgKyBkaWZmZXJlbmNlICsgNDApO1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoJCgnYm9keScpWzBdLnNjcm9sbEhlaWdodCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQkYm9keS5zY3JvbGxUb3AoY29udGVudFNjcm9sbFRvcCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaW5jcmVhc2VIZWlnaHQgPSBmdW5jdGlvbiAoZGlmZXJlbmNlKSB7XHJcblx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KCRvc1BvcHVwQ29udGVudC5oZWlnaHQoKSArIGRpZmVyZW5jZSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc2Nyb2xsVG9FbGVtZW50ID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XHJcblx0XHR2YXIgJHRhcmdldEVsZW1lbnQgPSAkZWxlbWVudDtcclxuXHRcdGlmICghISR0YXJnZXRFbGVtZW50Lmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbDtcclxuXHRcdFx0c2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHZhciBoZWFkZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2hlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHRcdFx0dmFyIGludHJvSGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19pbnRybycpLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRCb2R5U2Nyb2xsID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50JylbMF0uc2Nyb2xsVG9wIHx8IDA7XHJcblx0XHRcdFx0dmFyIHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgPSAkdGFyZ2V0RWxlbWVudC5vZmZzZXQoKS50b3AgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCArIGN1cnJlbnRCb2R5U2Nyb2xsIC0gMjA7XHJcblx0XHRcdFx0JCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jykuc2Nyb2xsVG9wKHRhcmdldEVsZW1lbnRPZmZzZXRUb3ApO1xyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0cmVzaXplRGlhbG9nLFxyXG5cdFx0cmVzaXplQ29udGVudCxcclxuXHRcdGluY3JlYXNlSGVpZ2h0LFxyXG5cdFx0cmVkcmF3RGlhbG9nV2luZG93LFxyXG5cdFx0c2Nyb2xsVG9FbGVtZW50XHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuXHJcbiQod2luZG93KS51bmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdGlmICghISQoJy5MYXlvdXRQb3B1cCcpLmxlbmd0aCkge1xyXG5cdFx0d2luZG93LnRvcC4kKCdib2R5JykuY3NzKHtcclxuXHRcdFx0b3ZlcmZsb3dZOiAnc2Nyb2xsJ1xyXG5cdFx0fSk7XHJcblx0fVxyXG59KTsiLCIvKiBDb21wb25lbnQgQWN0aW9uc01lbnUgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0dmFyICR0cmlnZ2VyRWxlbWVudCA9ICQoJyMnICsgY29uZmlnLnRyaWdnZXJFbGVtZW50KTtcblx0XHR2YXIgJGNvbnRlbnRFbGVtZW50ID0gJCgnIycgKyBjb25maWcuY29udGVudEVsZW1lbnQpO1xuXG5cdFx0aWYgKCRjb250ZW50RWxlbWVudC50ZXh0KCkubGVuZ3RoIDwgMSkge1xuXHRcdFx0JHRyaWdnZXJFbGVtZW50LmhpZGUoKTtcblx0XHR9XG5cblx0XHQkKGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gaW5zaWRlIGEgZG9jdW1lbnQgcmVhZHkgZHVlIHRvIHNhcHBoaXJlIHBvcHVwIGJpbmRlZCBldmVudHNcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcG9zaXRpb24gPSBjb25maWcucG9zaXRpb247XG5cdFx0XHRcdGlmIChjb25maWcubG9jYWxlID09PSAnQVInKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChjb25maWcucG9zaXRpb24pIHtcblx0XHRcdFx0XHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAnbGVmdCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ3JpZ2h0Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdib3R0b20tbGVmdCc6XG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2JvdHRvbS1yaWdodCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAnYm90dG9tLXJpZ2h0Jzpcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAnYm90dG9tLWxlZnQnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ3RvcC1sZWZ0Jzpcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAndG9wLXJpZ2h0Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICd0b3AtcmlnaHQnOlxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICd0b3AtbGVmdCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQkdHJpZ2dlckVsZW1lbnQudG9vbHRpcHN0ZXIoe1xuXHRcdFx0XHRcdGNvbnRlbnQ6ICQoJzxzZWN0aW9uLz4nKS5hcHBlbmQoJGNvbnRlbnRFbGVtZW50LmNsb25lKHRydWUpKSxcblx0XHRcdFx0XHR0cmlnZ2VyOiBjb25maWcudHJpZ2dlckV2ZW50LFxuXHRcdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHRcdFx0XHRtYXhXaWR0aDogY29uZmlnLm1heFdpZHRoLFxuXHRcdFx0XHRcdHRoZW1lOlxuXHRcdFx0XHRcdFx0J3Rvb2x0aXBzdGVyLWxvY2F0aW9uLS0nICtcblx0XHRcdFx0XHRcdGNvbmZpZy5sb2NhdGlvbiArXG5cdFx0XHRcdFx0XHQnIEFjdGlvbnNNZW51LXRvb2x0aXAgUGFkZGluZy0tJyArXG5cdFx0XHRcdFx0XHRjb25maWcucGFkZGluZyArXG5cdFx0XHRcdFx0XHQnIEJvcmRlci0tJyArXG5cdFx0XHRcdFx0XHRjb25maWcuYm9yZGVyLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0JGNvbnRlbnRFbGVtZW50LnJlbW92ZSgpO1xuXHRcdFx0fSwgNTAwKTtcblx0XHR9KTtcblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuQWN0aW9uc01lbnUgPSB7IGNyZWF0ZSB9O1xufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XG4iLCIvKiBDb21wb25lbnQgQWN0aW9uc1N1Yk1lbnUgLSBARGVwcmVjYXRlZCAqL1xuU2FwcGhpcmVXaWRnZXRzLkFjdGlvbnNTdWJNZW51ID0gZnVuY3Rpb24oSWNvbklkKSB7XG5cdGlmICgkKCcuUGF0aWVudEhlYWRlckFjdGlvbnNfX3N1Yk1lbnUnKS5oYXNDbGFzcygnU3ViTWVudUJsb2NrJykpIHtcblx0XHQkKCcuUGF0aWVudEhlYWRlckFjdGlvbnNfX3N1Yk1lbnUnKS5yZW1vdmVDbGFzcygnU3ViTWVudUJsb2NrJyk7XG5cdH0gZWxzZSB7XG5cdFx0JChJY29uSWQpXG5cdFx0XHQucGFyZW50KClcblx0XHRcdC5zaWJsaW5ncygpXG5cdFx0XHQuZmluZCgnLlBhdGllbnRIZWFkZXJBY3Rpb25zX19zdWJNZW51Jylcblx0XHRcdC5hZGRDbGFzcygnU3ViTWVudUJsb2NrJyk7XG5cdH1cbn07XG4iLCIvKiBDb21wb25lbnQgQ29tcExpbmUgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xuXHRmdW5jdGlvbiBTZWN0aW9uQ29tcGxpbmUoKSB7XG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdFx0Ly8gT2JqZWN0IHRvIHNhdmUgc3RhdHNcblx0XHR2YXIgcHJldmlld3N0YXQgPSBbXTtcblxuXHRcdHZhciB0cmFuc2l0aW9uRXZlbnQgPSBTaWxrVUkud2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcblx0XHQvLyBzZXQgY2xpY2sgZXZlbnRzXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcblx0XHRcdC8vIHN0b3JlIHF1ZXJ5cyBpbiBhIHNpbmdsZSB2YXJcblx0XHRcdHZhciBob2xkZXIgPSAkKG9iKS5jbG9zZXN0KCcuQ29tcExpbmUnKTtcblx0XHRcdHZhciBTZWN0aW9uID0gJChvYikuY2xvc2VzdCgnLkNvbXBMaW5lRXhwYW5kYWJsZScpO1xuXHRcdFx0dmFyIFNlY3Rpb25Db250ZW50ID0gU2VjdGlvbi5jaGlsZHJlbignLkNvbXBMaW5lX0V4cGFuZCcpO1xuXG5cdFx0XHQvLyBnZXQgaWRcblx0XHRcdHZhciBpZCA9IGhvbGRlci5hdHRyKCdpZCcpO1xuXG5cdFx0XHR2YXIgdGVtcEhlaWdodCA9IDA7XG5cblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxuXHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0LCBkdXJpbmcgdGhpcyBwcm9jZXNzLCB0cmFuc2l0aW9ucyBhcmUgZGlzYWJsZWRcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCkpO1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcblxuXHRcdFx0XHQvLyBDb2xsYXBzZSBjb250ZW50XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcblx0XHRcdFx0U2VjdGlvbi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IGZhbHNlO1xuXG5cdFx0XHRcdGlmIChob2xkZXIuaGFzQ2xhc3MoJ25vdFJlbmRlckludGVyYWN0aW9ucycpKSB7XG5cdFx0XHRcdFx0aG9sZGVyLmZpbmQoJy5Db21wTGluZS10b2dnbGUtaW50ZXJhY3Rpb25zJykudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KHRlbXBIZWlnaHQpO1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU4JykgfHwgJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU5JykpIHtcblx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcblx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGFkZCBldmVudCB0cmFuc2l0aW9uIGVuZCB0byBvdmVyZmxvdzp2aXNpYmxlIGZvciB0b29sdGlwcyBhbmQgZHJvcGRvd25zIGlzc3Vlc1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKGhvbGRlci5oYXNDbGFzcygnbm90UmVuZGVySW50ZXJhY3Rpb25zJykpIHtcblx0XHRcdFx0XHRob2xkZXIuZmluZCgnLkNvbXBMaW5lLXRvZ2dsZS1pbnRlcmFjdGlvbnMnKS50cmlnZ2VyKCdjbGljaycpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cblx0XHR0aGF0LmFqYXhSZWZyZXNoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXG5cdFx0XHQkKCcuQ29tcExpbmVfaGVhZExpbmUnKS5vZmYoKTtcblxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cblx0XHRcdCQoJy5Db21wTGluZV9oZWFkTGluZSBpbnB1dCwgLkNvbXBMaW5lX2hlYWRMaW5lIHNlbGVjdCwgLkNvbXBMaW5lX2hlYWRMaW5lIGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBhZGQgbmV3IGNsaWNrIGV2ZW50c1xuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykudW5iaW5kKCdjbGljaycpO1xuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMucGFyZW50RWxlbWVudCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcblx0XHRcdCQoJy5Db21wTGluZUV4cGFuZGFibGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByZXZpZXdzdGF0W1xuXHRcdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcblx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcblx0XHRcdFx0XHRdID09IG51bGxcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xuXHRcdFx0XHRcdC8vIGlmIG9wZW5cblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGFkZCByb3dcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcblx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXG5cdFx0XHRcdFx0XSA9IHtcblx0XHRcdFx0XHRcdGNsaWVudDogc3RhdCxcblx0XHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gY3VyZW50IHN0YXRlIChhamF4IHN0YXRlIHggaW5pdGlhbCBzdGF0ZSlcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XG5cblx0XHRcdFx0Ly8gY2hlY2sgaWYgc3RhcnQgZXhwYW5kYWJsZVxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGN1clN0YXRlICE9XG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXG5cdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxuXHRcdFx0XHRcdF1bJ3NlcnZlciddXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXG5cdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxuXHRcdFx0XHRcdF1bJ2NsaWVudCddID0gY3VyU3RhdGU7XG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXG5cdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxuXHRcdFx0XHRcdF1bJ3NlcnZlciddID0gY3VyU3RhdGU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0cHJldmlld3N0YXRbXG5cdFx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcblx0XHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxuXHRcdFx0XHRcdFx0XVsnY2xpZW50J10gPT0gZmFsc2UgJiZcblx0XHRcdFx0XHRcdCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJylcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbignLkNvbXBMaW5lX0V4cGFuZCcpXG5cdFx0XHRcdFx0XHRcdC5oZWlnaHQoMCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0XHRcdHByZXZpZXdzdGF0W1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXG5cdFx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcblx0XHRcdFx0XHRcdF1bJ2NsaWVudCddID09IHRydWUgJiZcblx0XHRcdFx0XHRcdCEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8vIHNldCBldmVudHNcblx0XHR0aGF0LmluaXQgPSBmdW5jdGlvbigpIHtcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zIHRvIGNyZWF0ZSBhcnJheSBzdGF0XG5cdFx0XHQkKCcuQ29tcExpbmVFeHBhbmRhYmxlJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcblx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcblxuXHRcdFx0XHQvLyBpZiBvcGVuXG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdFx0c3RhdCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBhZGQgcm93XG5cdFx0XHRcdHByZXZpZXdzdGF0W1xuXHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxuXHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcblx0XHRcdFx0XSA9IHtcblx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXG5cdFx0XHRcdFx0c2VydmVyOiBzdGF0LFxuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGFkZCBjbGljayBldmVudHNcblx0XHRcdCQoJy5Db21wTGluZV9fZXhwYW5kSWNvbicpLnVuYmluZCgnY2xpY2snKTtcblx0XHRcdCQoJy5Db21wTGluZV9fZXhwYW5kSWNvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjbGlja0V2ZW50cyh0aGlzLnBhcmVudEVsZW1lbnQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXG5cdFx0XHQkKCcuQ29tcExpbmVfaGVhZExpbmUgaW5wdXQsIC5Db21wTGluZV9oZWFkTGluZSBzZWxlY3QsIC5Db21wTGluZV9oZWFkTGluZSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gcmVtb3ZlIHVuZWNlc3NhcnkgYmVoYXZpb3JzXG5cblx0XHRcdC8vIGV2ZW50IGFqYXhcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QodGhhdC5hamF4UmVmcmVzaCk7XG5cdFx0fTtcblx0fVxuXG5cdGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkNvbXBsaW5lKCk7XG5cdFx0U2lsa1VJLkV4ZWN1dGUoU2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlLmluaXQsICdFcnJvciBvbiBTYXBwaGlyZXYyX1BhdHRlcnMvQ29tcExpbmUnKTtcblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuQ29tcExpbmUgPSB7IGNyZWF0ZSB9O1xufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gIGNsYXNzIERhdGFUYWJsZXMge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgIHRoaXMuJHdpZGdldCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcbiAgICAgIHRoaXMuJHRhYmxlID0gdGhpcy4kd2lkZ2V0LmZpbmQoJ3RhYmxlJyk7XG4gICAgICB0aGlzLiR0YWJsZS5hZGRDbGFzcyhjb25maWcuYmFzZVN0eWxlKTtcbiAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgfVxuXG4gICAgb25Jbml0KCkge1xuXG4gICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgIC4uLnRoaXMuY29uZmlnLFxuICAgICAgICBmaXhlZENvbHVtbnM6IHRydWUsXG4gICAgICAgIGluZm86IGZhbHNlLFxuICAgICAgICBvcmRlcmluZzogZmFsc2UsXG4gICAgICAgIHBhZ2luZzogZmFsc2UsXG4gICAgICAgIHNjcm9sbENvbGxhcHNlOiB0cnVlLFxuICAgICAgICBzY3JvbGxYOiB0cnVlLFxuICAgICAgICBzZWFyY2hpbmc6IGZhbHNlLFxuICAgICAgfVxuXG4gICAgICAkKCgpID0+IHtcbiAgICAgICAgdGhpcy4kdGFibGUuRGF0YVRhYmxlKHRoaXMub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgRGF0YVRhYmxlcyhjb25maWcpKTtcblxuICBTYXBwaGlyZVdpZGdldHMuRGF0YVRhYmxlcyA9IHtcbiAgICBjcmVhdGVcbiAgfTtcblxufSkoKTsiLCIvKiBDb21wb25lbnQgRGF0ZVRpbWVSYW5nZVBpY2tlciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBhbGxEYXRlVGltZVJhbmdlUGlja2VycyA9IFtdO1xyXG5cclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxEYXRlVGltZVJhbmdlUGlja2Vycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoYWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnNbaV0uY29uZmlnLndpZGdldElkID09PSBjb25maWcud2lkZ2V0SWQpIHtcclxuXHRcdFx0XHRhbGxEYXRlVGltZVJhbmdlUGlja2Vycy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IERhdGVUaW1lUmFuZ2VQaWNrZXIoY29uZmlnKTtcclxuXHRcdGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzLnB1c2god2luZG93W2NvbmZpZy53aWRnZXRJZF0pO1xyXG5cdH07XHJcblxyXG5cdHZhciBEYXRlVGltZVJhbmdlUGlja2VyID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmN1cnJlbnRMb2NhbGUgPSBjb25maWcuY3VycmVudExvY2FsZTtcclxuXHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ0RhdGVUaW1lUmFuZ2VQaWNrZXInKTtcclxuXHRcdHRoaXMuJGNsZWFyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNsZWFyJyk7XHJcblx0XHR0aGlzLiRsYWJlbCA9IHRoaXMuJHdpZGdldC5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1sYWJlbCcpO1xyXG5cclxuXHRcdHRoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ2F0dGFjaGVkSW5wdXQnKTtcclxuXHRcdFx0dGhpcy4kaW5wdXQgPSB0aGlzLiR3aWRnZXQuZmluZChcclxuXHRcdFx0XHQnLkRhdGVUaW1lUmFuZ2VQaWNrZXItcGxhY2Vob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nXHJcblx0XHRcdCk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZCA9IHRoaXMuJHdpZGdldC5maW5kKFxyXG5cdFx0XHRcdCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1kaXNwbGF5ZWQgaW5wdXRbdHlwZT1cInRleHRcIl0nXHJcblx0XHRcdCk7XHJcblx0XHRcdGlmICghdGhpcy5jb25maWcuYWxsb3dzVHlwaW5nKSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnByb3AoJ3JlYWRvbmx5JywgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGlucHV0ID0gJCgnIycgKyBjb25maWcuaW5wdXRJZCk7XHJcblx0XHRcdGlmICghdGhpcy5jb25maWcuYWxsb3dzVHlwaW5nKSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncmVhZG9ubHknLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmN1cnJlbnRMb2NhbGUgPT09ICdBUicpIHtcclxuXHRcdFx0bW9tZW50LmxvY2FsZSgnYXIta3cnKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgb3B0aW9ucyA9IHt9O1xyXG5cdFx0b3B0aW9ucy5zdGFydERhdGUgPSBjb25maWcuc3RhcnREYXRlO1xyXG5cdFx0b3B0aW9ucy5zaW5nbGVEYXRlUGlja2VyID0gY29uZmlnLnNpbmdsZURhdGVQaWNrZXI7XHJcblx0XHRvcHRpb25zLmF1dG9BcHBseSA9IGNvbmZpZy5hdXRvQXBwbHk7XHJcblx0XHRvcHRpb25zLmF1dG9VcGRhdGVJbnB1dCA9IGNvbmZpZy5hdXRvVXBkYXRlSW5wdXQ7XHJcblx0XHRvcHRpb25zLnRpbWVQaWNrZXIgPSBjb25maWcudGltZVBpY2tlcjtcclxuXHRcdG9wdGlvbnMudGltZVBpY2tlcjI0SG91ciA9IGNvbmZpZy50aW1lUGlja2VyMjRIb3VyO1xyXG5cdFx0b3B0aW9ucy50aW1lUGlja2VySW5jcmVtZW50ID0gY29uZmlnLnRpbWVQaWNrZXJJbmNyZW1lbnQ7XHJcblx0XHRvcHRpb25zLnNob3dEcm9wZG93bnMgPSBjb25maWcuaGFzRHJvcGRvd25zO1xyXG5cdFx0b3B0aW9ucy5kcm9wcyA9IGNvbmZpZy5kcm9wcztcclxuXHRcdG9wdGlvbnMub3BlbnMgPSBjb25maWcub3BlbnM7XHJcblxyXG5cdFx0dmFyIHN0cmluZ0Nvbm5lY3Rpb24gPSAnWywgYXRdJztcclxuXHJcblx0XHRpZiAoY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWSBISDpNTScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVkgSEg6TU0nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAob3B0aW9ucy50aW1lUGlja2VyMjRIb3VyKSB7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0SW5wdXQgPSAnREQtTU0tWVlZWSBISDptbSc7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNZZWFyV2hlblRleHQgP1xyXG5cdFx0XHRcdFx0J0QgTU1NIFlZWVknICsgc3RyaW5nQ29ubmVjdGlvbiArICcgSEg6bW0nIDpcclxuXHRcdFx0XHRcdCdEIE1NTScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBISDptbSc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0SW5wdXQgPSAnREQtTU0tWVlZWSBoaDptbSBBJztcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1llYXJXaGVuVGV4dCA/XHJcblx0XHRcdFx0XHQnRCBNTU0gWVlZWScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBoaDptbSBBJyA6XHJcblx0XHRcdFx0XHQnRCBNTU0nICsgc3RyaW5nQ29ubmVjdGlvbiArICcgaGg6bW0gQSc7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnb25seURhdGUnKTtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVknKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCA9ICdERC1NTS1ZWVlZJztcclxuXHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNZZWFyV2hlblRleHQgP1xyXG5cdFx0XHRcdCdEIE1NTSBZWVlZJyA6XHJcblx0XHRcdFx0J0QgTU1NJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1dlZWtEYXlOYW1lV2hlblRleHQgP1xyXG5cdFx0XHQnZGRkWywgXScgKyB0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA6XHJcblx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsO1xyXG5cclxuXHRcdG9wdGlvbnMubG9jYWxlID0ge1xyXG5cdFx0XHRkaXJlY3Rpb246IGNvbmZpZy5jdXJyZW50TG9jYWxlID09PSAnQVInID8gJ3J0bCcgOiAnbHRyJyxcclxuXHRcdFx0Zm9ybWF0OiB0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCxcclxuXHRcdFx0Y2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxyXG5cdFx0XHRhcHBseUxhYmVsOiAnQXBwbHknLFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygndGV4dFRyaWdnZXInKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29uZmlnLmVuZERhdGUgJiYgY29uZmlnLmVuZERhdGUgIT09ICcwMS0wMS0xOTAwIDAwOjAwOjAwJykge1xyXG5cdFx0XHRvcHRpb25zLmVuZERhdGUgPSBjb25maWcuZW5kRGF0ZTtcclxuXHRcdH1cclxuXHRcdGlmIChjb25maWcubWF4RGF0ZSAmJiBjb25maWcubWF4RGF0ZSAhPT0gJzAxLTAxLTE5MDAgMDA6MDA6MDAnKSB7XHJcblx0XHRcdG9wdGlvbnMubWF4RGF0ZSA9IGNvbmZpZy5tYXhEYXRlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNvbmZpZy5taW5EYXRlICYmIGNvbmZpZy5taW5EYXRlICE9PSAnMDEtMDEtMTkwMCAwMDowMDowMCcpIHtcclxuXHRcdFx0b3B0aW9ucy5taW5EYXRlID0gY29uZmlnLm1pbkRhdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5EaXNhYmxlZFdlZWtEYXlzKSB7XHJcblx0XHRcdHZhciBkaXNhYmxlZFdlZWtEYXlzID0gY29uZmlnLkRpc2FibGVkV2Vla0RheXMuc3BsaXQoJywnKTtcclxuXHRcdFx0b3B0aW9ucy5pc0ludmFsaWREYXRlID0gZnVuY3Rpb24gKGRhdGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gZGlzYWJsZWRXZWVrRGF5cy5pbmNsdWRlcyhcclxuXHRcdFx0XHRcdG1vbWVudChkYXRlKVxyXG5cdFx0XHRcdFx0LmRheSgpXHJcblx0XHRcdFx0XHQudG9TdHJpbmcoKVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy4kaW5wdXQuZGF0ZXJhbmdlcGlja2VyKG9wdGlvbnMsIGZ1bmN0aW9uIChzdGFydERhdGUsIGVuZERhdGUsIGxhYmVsKSB7XHJcblx0XHRcdC8vIGFmdGVyIGEgc2VsZWN0aW9uIGlzIG1hZGVcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIG5vdyB3ZSBoYXZlIGEgcHJvcGVyIGluc3RhbmNlXHJcblx0XHR0aGlzLnBpY2tlciA9IHRoaXMuJGlucHV0LmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpO1xyXG5cclxuXHRcdHRoaXMuJGNhbGVuZGFyID0gJCh0aGlzLnBpY2tlci5jb250YWluZXIpO1xyXG5cclxuXHRcdGlmICghIXRoaXMuY29uZmlnLmNzc0NsYXNzKSB7XHJcblx0XHRcdHRoaXMuJGNhbGVuZGFyLmFkZENsYXNzKHRoaXMuY29uZmlnLmNzc0NsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiR0aW1lSG9sZGVyID0gdGhpcy4kY2FsZW5kYXIuZmluZCgnLmNhbGVuZGFyLXRpbWUnKTtcclxuXHRcdHRoaXMuJGJ1dHRvbnNIb2xkZXIgPSB0aGlzLiRjYWxlbmRhci5maW5kKCcuZHJwLWJ1dHRvbnMnKTtcclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuYXV0b0FwcGx5KSB7XHJcblx0XHRcdHRoaXMuJGJ1dHRvbnNIb2xkZXIuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuaXNFbXB0eVN0YXJ0RGF0ZSkge1xyXG5cdFx0XHR0aGlzLmNsZWFyKGZhbHNlKTtcclxuXHRcdH0gZWxzZSBpZiAoY29uZmlnLmlzRW1wdHlTdGFydEhvdXIpIHtcclxuXHRcdFx0dGhpcy5pc0VtcHR5SG91ciA9IHRydWU7XHJcblx0XHRcdHRoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29uZmlnLmVuYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5uYXRpdmVFdmVudHMoKTtcclxuXHRcdFx0dGhpcy5jdXN0b21FdmVudHMoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuXHRcdFx0dGhpcy4kaW5wdXQub2ZmKCdjbGljayBmb2N1cyBrZXlkb3duIGtleXVwJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0dGhpcy5oYW5kbGVDdXN0b21WYWxpZGF0aW9uKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuaGFuZGxlQ3VzdG9tVmFsaWRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBlcnJvck1lc3NhZ2UgPSB0aGlzLiRpbnB1dC5uZXh0KCkudGV4dCgpO1xyXG5cdFx0aWYgKCEhZXJyb3JNZXNzYWdlLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQuYWRkQ2xhc3MoJ05vdF9WYWxpZCcpO1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWRcclxuXHRcdFx0XHQubmV4dCgpXHJcblx0XHRcdFx0LnNob3coKVxyXG5cdFx0XHRcdC50ZXh0KGVycm9yTWVzc2FnZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQucmVtb3ZlQ2xhc3MoJ05vdF9WYWxpZCcpO1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQubmV4dCgpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5uYXRpdmVFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ3Nob3dDYWxlbmRhci5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmhhc0dvVG9kYXkpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdC5maW5kKCcuY2FsZW5kYXItdGFibGUgdGhlYWQgdHInKVxyXG5cdFx0XHRcdFx0LmVxKDApXHJcblx0XHRcdFx0XHQuYWZ0ZXIoXHJcblx0XHRcdFx0XHRcdCc8dHI+PHRkIGNvbHNwYW49XCI3XCIgY2xhc3M9XCJEYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWdvdG9kYXlcIj4nICtcclxuXHRcdFx0XHRcdFx0J1RvZGF5JyArXHJcblx0XHRcdFx0XHRcdCc8L3RkPjwvdHI+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRpZiAoX3RoaXMuY29uZmlnLmRyb3BzID09PSAndXAnKSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kY2FsZW5kYXIuY3NzKCd0b3AnLCBfdGhpcy4kY2FsZW5kYXIub2Zmc2V0KCkudG9wIC0gMjQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5oYW5kbGVWaWV3cG9ydFBvc2l0aW9uKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdzaG93LmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcudGltZVBpY2tlciAmJiBfdGhpcy5jb25maWcuaGFzQ2xlYXJIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQuZmluZCgnLmNhbGVuZGFyLXRpbWUnKVxyXG5cdFx0XHRcdFx0LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJEYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyXCI+PC9zcGFuPicpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5pc0VtcHR5SG91cikge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMC41KTtcclxuXHRcdFx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInKVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdF90aGlzLiR0aW1lSG9sZGVyLmNzcygnb3BhY2l0eScsIDEpO1xyXG5cdFx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmhhbmRsZVZpZXdwb3J0UG9zaXRpb24oKTtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLkRhdGVUaW1lUmFuZ2VQaWNrZXIub3BlbmVkV2lkZ2V0SWQgPSBfdGhpcy5jb25maWcud2lkZ2V0SWQ7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdoaWRlLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpLnJlbW92ZSgpO1xyXG5cdFx0XHRfdGhpcy51cGRhdGVQYXJlbnRJZnJhbWUoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2NhbmNlbC5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge30pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ291dHNpZGVDbGljay5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge30pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ3RpbWVjaGFuZ2VkLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdF90aGlzLmlzRW1wdHlIb3VyID0gZmFsc2U7XHJcblx0XHRcdF90aGlzLiR0aW1lSG9sZGVyLmNzcygnb3BhY2l0eScsIDEpO1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmhhc0NsZWFySG91cikge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdFx0LmZpbmQoJy5jYWxlbmRhci10aW1lJylcclxuXHRcdFx0XHRcdC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhclwiPjwvc3Bhbj4nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmF1dG9BcHBseSkge1xyXG5cdFx0XHRcdF90aGlzLiRjbGVhci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0XHRcdF90aGlzLnNlbmROb3RpZmljYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignY2xpY2tEYXRlLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuYXV0b0FwcGx5KSB7XHJcblx0XHRcdFx0X3RoaXMuJGNsZWFyLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdhcHBseS5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRfdGhpcy4kY2xlYXIucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdF90aGlzLnNlbmROb3RpZmljYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmN1c3RvbUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRsYWJlbC5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdF90aGlzLnBpY2tlci50b2dnbGUoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kY2xlYXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRjYWxlbmRhci5vbignY2xpY2snLCAnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcudGltZVBpY2tlcjI0SG91cikge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuaG91cnNlbGVjdCcpLnZhbCgnMCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuaG91cnNlbGVjdCcpLnZhbCgnMTInKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLm1pbnV0ZXNlbGVjdCcpLnZhbCgnMCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLmFtcG1zZWxlY3QnKS52YWwoJ0FNJykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdF90aGlzLmlzRW1wdHlIb3VyID0gdHJ1ZTtcclxuXHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMC41KTtcclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGNhbGVuZGFyLm9uKCdjbGljaycsICcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1nb3RvZGF5JywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuc2V0U3RhcnREYXRlKG1vbWVudCgpKTtcclxuXHRcdFx0X3RoaXMucGlja2VyLnNldEVuZERhdGUobW9tZW50KCkpO1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuaGlkZSgpO1xyXG5cdFx0XHRpZiAoIV90aGlzLmNvbmZpZy5hdXRvVXBkYXRlSW5wdXQgfHwgX3RoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyIHx8IF90aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5zZW5kTm90aWZpY2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5vbignY2xpY2sgZm9jdXMnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0X3RoaXMuJGlucHV0LnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQub24oJ2tleXVwJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRcdF90aGlzLiRpbnB1dC52YWwoX3RoaXMuJGRpc3BsYXllZC52YWwoKSkudHJpZ2dlcigna2V5dXAnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRpbnB1dC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0X3RoaXMudXBkYXRlUGFyZW50SWZyYW1lKCk7XHJcblx0XHRcdFx0fSwgNTApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS51cGRhdGVMYWJlbGluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBsYWJlbE1hc2sgPSB0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbDtcclxuXHRcdHZhciBpbnB1dE1hc2sgPSB0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dDtcclxuXHRcdGlmIChtb21lbnQodGhpcy5waWNrZXIuc3RhcnREYXRlKS5pc1NhbWUobW9tZW50KCksICdkYXknKSkge1xyXG5cdFx0XHRpZiAobGFiZWxNYXNrLmluY2x1ZGVzKCdEIE1NTSBZWVlZJykpIHtcclxuXHRcdFx0XHRsYWJlbE1hc2sgPSBsYWJlbE1hc2sucmVwbGFjZSgnRCBNTU0gWVlZWScsICdbVG9kYXldJyk7XHJcblx0XHRcdH0gZWxzZSBpZiAobGFiZWxNYXNrLmluY2x1ZGVzKCdEIE1NTScpKSB7XHJcblx0XHRcdFx0bGFiZWxNYXNrID0gbGFiZWxNYXNrLnJlcGxhY2UoJ0QgTU1NJywgJ1tUb2RheV0nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnU29tZXRoaW5nIHdyb25nIHdpdGggdGhlIGxhYmVsTWFzaycsIGxhYmVsTWFzayk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdGxhYmVsTWFzayA9IGxhYmVsTWFza1xyXG5cdFx0XHRcdC5yZXBsYWNlKCdoaDptbSBBJywgJ1stLTotLV0nKVxyXG5cdFx0XHRcdC5yZXBsYWNlKCdISDptbScsICdbLS06LS1dJyk7XHJcblx0XHRcdGlucHV0TWFzayA9IGlucHV0TWFza1xyXG5cdFx0XHRcdC5yZXBsYWNlKCdoaDptbSBBJywgJ1stLTotLV0nKVxyXG5cdFx0XHRcdC5yZXBsYWNlKCdISDptbScsICdbLS06LS1dJyk7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5oYXNUZXh0VHJpZ2dlcikge1xyXG5cdFx0XHRcdHRoaXMuJGxhYmVsLmh0bWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdChsYWJlbE1hc2spKTtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKFxyXG5cdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIFswMDowMDowMF0nKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIFswMDowMDowMF0nKSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGRpc3BsYXllZC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdChpbnB1dE1hc2spKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5oYXNUZXh0VHJpZ2dlcikge1xyXG5cdFx0XHRcdHRoaXMuJGxhYmVsLmh0bWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdChsYWJlbE1hc2spKTtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW06c3MnKSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLmZvcm1hdElucHV0KSk7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBISDptbTpzcycpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmhhbmRsZVZpZXdwb3J0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAod2luZG93LmZyYW1lRWxlbWVudCAmJiAoJCh3aW5kb3cuZnJhbWVFbGVtZW50LnBhcmVudEVsZW1lbnQpLmhhc0NsYXNzKCd0b29sdGlwc3Rlci1jb250ZW50JykgfHwgJCh3aW5kb3cuZnJhbWVFbGVtZW50LnBhcmVudEVsZW1lbnQpLmhhc0NsYXNzKCdvcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudCcpKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzSW5WaWV3cG9ydCgpKSB7XHJcblx0XHRcdHZhciBjb29yZHMgPSB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0aWYgKHRoaXMuJGNhbGVuZGFyLmhhc0NsYXNzKCdkcm9wLXVwJykgJiYgdGhpcy4kY2FsZW5kYXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDwgMCkge1xyXG5cdFx0XHRcdHZhciBwb2ludCA9IHdpbmRvdy5zY3JvbGxZICsgY29vcmRzLmJvdHRvbSArIHRoaXMuJGlucHV0LmhlaWdodCgpICsgNztcclxuXHRcdFx0XHR0aGlzLiRjYWxlbmRhci5yZW1vdmVDbGFzcygnZHJvcC11cCcpLmFkZENsYXNzKCdkcm9wLWRvd24nKS5jc3MoJ3RvcCcsIHBvaW50KTtcclxuXHRcdFx0fSBlbHNlIGlmICghdGhpcy4kY2FsZW5kYXIuaGFzQ2xhc3MoJ2Ryb3AtdXAnKSAmJiB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPiAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpKSB7XHJcblx0XHRcdFx0dmFyIHBvaW50ID0gd2luZG93LnNjcm9sbFkgKyBjb29yZHMudG9wIC0gY29vcmRzLmhlaWdodCAtIHRoaXMuJGlucHV0LmhlaWdodCgpIC0gNztcclxuXHRcdFx0XHR0aGlzLiRjYWxlbmRhci5hZGRDbGFzcygnZHJvcC11cCcpLmNzcygndG9wJywgcG9pbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuaXNJblZpZXdwb3J0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGJvdW5kaW5nID0gdGhpcy4kY2FsZW5kYXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRyZXR1cm4gKGJvdW5kaW5nLnRvcCA+PSAwICYmIGJvdW5kaW5nLmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0ICsgNSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgNSkpO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKHNlbmROb3RpZmljYXRpb24pIHtcclxuXHRcdHRoaXMucGlja2VyLnNldFN0YXJ0RGF0ZShtb21lbnQoKSk7XHJcblx0XHR0aGlzLnBpY2tlci5zZXRFbmREYXRlKG1vbWVudCgpKTtcclxuXHRcdHRoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHRcdHRoaXMuJGNsZWFyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMuJGxhYmVsLmh0bWwoJy0tIC0tIC0tJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpO1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC52YWwoJycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoc2VuZE5vdGlmaWNhdGlvbiB8fCBzZW5kTm90aWZpY2F0aW9uID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNlbmROb3RpZmljYXRpb24oZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnBpY2tlci5zaG93KCk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMucGlja2VyLmhpZGUoKTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnBpY2tlci5jbGlja0NhbmNlbCgpO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbiAoc2VuZERhdGUpIHtcclxuXHRcdGlmICh0aGlzLiR3aWRnZXQuaGFzQ2xhc3MoJ2F0dGFjaGVkSW5wdXQnKSkge1xyXG5cdFx0XHR0aGlzLiRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHNlbmREYXRlIHx8IHNlbmREYXRlID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpZiAodGhpcy5pc0VtcHR5SG91cikge1xyXG5cdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KFxyXG5cdFx0XHRcdFx0dGhpcy5jb25maWcuZGF0ZVRpbWVSYW5nZVBpY2tlckZha2VOb3RpZnlJZCxcclxuXHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgWzAwOjAwOjAwXScpICtcclxuXHRcdFx0XHRcdCd8JyArXHJcblx0XHRcdFx0XHR0aGlzLmlzRW1wdHlIb3VyXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLmRhdGVUaW1lUmFuZ2VQaWNrZXJGYWtlTm90aWZ5SWQsXHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW06c3MnKSArXHJcblx0XHRcdFx0XHRcdCd8JyArXHJcblx0XHRcdFx0XHRcdHRoaXMuaXNFbXB0eUhvdXJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KFxyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykgKyAnfCcgKyB0aGlzLmlzRW1wdHlIb3VyXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0T3NOb3RpZnlXaWRnZXQodGhpcy5jb25maWcuZGF0ZVRpbWVSYW5nZVBpY2tlckZha2VOb3RpZnlJZCwgJ251bGx8dHJ1ZScpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnVwZGF0ZVBhcmVudElmcmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0eXBlb2YgU2FwcGhpcmVXaWRnZXRzLlJlc2l6ZVBhcmVudElmcmFtZSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLlJlc2l6ZVBhcmVudElmcmFtZS5yZXNpemUoKTtcclxuXHRcdH1cclxuXHRcdGlmICgkKCcuUGFnZS5MYXlvdXRQb3B1cCcpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAucmVkcmF3RGlhbG9nV2luZG93KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRGF0ZVRpbWVSYW5nZVBpY2tlciA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0YWxsOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBhbGxEYXRlVGltZVJhbmdlUGlja2VycztcclxuXHRcdH0sXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBEcm9wZG93bkNhdGVnb3JpZXMgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xuXHRmdW5jdGlvbiBvcHRHcm91cFNldFZhbHVlKHNlbGVjdElkLCBpbnB1dEJveElkLCBidXR0b25JZCkge1xuXHRcdHZhciB2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0SWQpLnZhbHVlO1xuXHRcdCQoJyMnICsgaW5wdXRCb3hJZCkudmFsKHYpO1xuXHRcdCQoJyMnICsgc2VsZWN0SWQgKyAnIG9wdGlvbltzZWxlY3RlZF0nKS5yZW1vdmVBdHRyKCdzZWxlY3RlZCcpO1xuXG5cdFx0aWYgKHYgPiAtMSkge1xuXHRcdFx0JCgnIycgKyBzZWxlY3RJZCArICcgb3B0aW9uW3ZhbHVlPVwiJyArIHYgKyAnXCJdJykuYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcblx0XHR9XG5cblx0XHQkKCcjJyArIGJ1dHRvbklkKS5jbGljaygpO1xuXHRcdCQoJyNzMmlkXycgKyBzZWxlY3RJZCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdDItY29udGFpbmVyLWFjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gT3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cChhLCBiKSB7XG5cdFx0dmFyIF9lID0gJCgnIycgKyBhLmNvbnRyb2x0b3ZhbGlkYXRlKTtcblx0XHR2YXIgaXNWYWxpZCA9IF9lLmZpbmQoJ29wdGlvbltzZWxlY3RlZF0nKS5sZW5ndGg7XG5cdFx0dmFyIGhhc1NpYmxpbmdfTWFuZGF0b3J5U2VsZWN0MiA9IF9lLnByZXYoJ2Rpdi5zZWxlY3QyLWNvbnRhaW5lci5NYW5kYXRvcnknKS5sZW5ndGg7XG5cblx0XHRpZiAoaGFzU2libGluZ19NYW5kYXRvcnlTZWxlY3QyKSB7XG5cdFx0XHRpZiAoaXNWYWxpZCkge1xuXHRcdFx0XHRfZS5wcmV2KCdkaXYuc2VsZWN0Mi1jb250YWluZXIuTWFuZGF0b3J5JykucmVtb3ZlQ2xhc3MoJ05vdF9WYWxpZCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X2UucHJldignZGl2LnNlbGVjdDItY29udGFpbmVyLk1hbmRhdG9yeScpLmFkZENsYXNzKCdOb3RfVmFsaWQnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gaXNWYWxpZDtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZE9wdEdyb3VwVmFsaWRhdG9yKG9wdEdyb3VwRWxlbWVudElkKSB7XG5cdFx0T3NQYWdlX1ZhbGlkYXRvcnMucHVzaCh7XG5cdFx0XHRjb250cm9sdG92YWxpZGF0ZTogb3B0R3JvdXBFbGVtZW50SWQsXG5cdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0ZXJyb3JtZXNzYWdlOiAnUmVxdWlyZWQgZmllbGQhJyxcblx0XHRcdGV2YWx1YXRpb25mdW5jdGlvbjogJ1NhcHBoaXJlV2lkZ2V0cy5Ecm9wZG93bkNhdGVnb3JpZXMuT3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cCcsXG5cdFx0XHRpbml0aWFsdmFsdWU6ICcnLFxuXHRcdFx0aXN2YWxpZDogdHJ1ZSxcblx0XHR9KTtcblx0fVxuXG5cdFNhcHBoaXJlV2lkZ2V0cy5Ecm9wZG93bkNhdGVnb3JpZXMgPSB7XG5cdFx0b3B0R3JvdXBTZXRWYWx1ZSxcblx0XHRPc0N1c3RvbVZhbGlkYXRvck9wdEdyb3VwLFxuXHRcdGFkZE9wdEdyb3VwVmFsaWRhdG9yLFxuXHR9O1xufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XG4iLCIvKiBDb21wb25lbnQgRHJvcHpvbmUgKFBsdWdpbikgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbigpIHtcblx0ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcblx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcblx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0XHRcdGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuY3Rpb24oQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG5cdFx0aWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcblx0XHRpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcblx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG5cdGlmICghc2VsZikge1xuXHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcblx0fVxuXHRyZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBjYWxsID09PSAnZnVuY3Rpb24nKSA/IGNhbGwgOiBzZWxmO1xufVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcblx0aWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG5cdH1cblx0c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG5cdFx0Y29uc3RydWN0b3I6IHtcblx0XHRcdHZhbHVlOiBzdWJDbGFzcyxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0fSxcblx0fSk7XG5cdGlmIChzdXBlckNsYXNzKVxuXHRcdE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiAoc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcblx0aWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTtcblx0fVxufVxuXG4vKlxuICpcbiAqIE1vcmUgaW5mbyBhdCBbd3d3LmRyb3B6b25lanMuY29tXShodHRwOi8vd3d3LmRyb3B6b25lanMuY29tKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiwgTWF0aWFzIE1lbm9cbiAqXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKi9cblxuLy8gVGhlIEVtaXR0ZXIgY2xhc3MgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gY2FsbCBgLm9uKClgIG9uIERyb3B6b25lIHRvIGxpc3RlblxuLy8gdG8gZXZlbnRzLlxuLy8gSXQgaXMgc3Ryb25nbHkgYmFzZWQgb24gY29tcG9uZW50J3MgZW1pdHRlciBjbGFzcywgYW5kIEkgcmVtb3ZlZCB0aGVcbi8vIGZ1bmN0aW9uYWxpdHkgYmVjYXVzZSBvZiB0aGUgZGVwZW5kZW5jeSBoZWxsIHdpdGggZGlmZmVyZW50IGZyYW1ld29ya3MuXG52YXIgRW1pdHRlciA9IChmdW5jdGlvbigpIHtcblx0ZnVuY3Rpb24gRW1pdHRlcigpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW1pdHRlcik7XG5cdH1cblxuXHRfY3JlYXRlQ2xhc3MoRW1pdHRlciwgW1xuXHRcdHtcblx0XHRcdGtleTogJ29uJyxcblxuXHRcdFx0Ly8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciBnaXZlbiBldmVudFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbikge1xuXHRcdFx0XHR0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cdFx0XHRcdC8vIENyZWF0ZSBuYW1lc3BhY2UgZm9yIHRoaXMgZXZlbnRcblx0XHRcdFx0aWYgKCF0aGlzLl9jYWxsYmFja3NbZXZlbnRdKSB7XG5cdFx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrc1tldmVudF0ucHVzaChmbik7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGtleTogJ2VtaXQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcblx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuXHRcdFx0XHRpZiAoY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdFx0XHRcdFx0XHRhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvciA9IGNhbGxiYWNrcyxcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRfaSA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dmFyIF9yZWY7XG5cblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdGlmIChfaS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZiA9IF9pLnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgY2FsbGJhY2sgPSBfcmVmO1xuXG5cdFx0XHRcdFx0XHRjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lciBmb3IgZ2l2ZW4gZXZlbnQuIElmIGZuIGlzIG5vdCBwcm92aWRlZCwgYWxsIGV2ZW50XG5cdFx0XHQvLyBsaXN0ZW5lcnMgZm9yIHRoYXQgZXZlbnQgd2lsbCBiZSByZW1vdmVkLiBJZiBuZWl0aGVyIGlzIHByb3ZpZGVkLCBhbGxcblx0XHRcdC8vIGV2ZW50IGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdvZmYnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudCwgZm4pIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9jYWxsYmFja3MgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc3BlY2lmaWMgZXZlbnRcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG5cdFx0XHRcdGlmICghY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG5cdFx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXTtcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT09IGZuKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdF0pO1xuXG5cdHJldHVybiBFbWl0dGVyO1xufSkoKTtcblxudmFyIERyb3B6b25lID0gKGZ1bmN0aW9uKF9FbWl0dGVyKSB7XG5cdF9pbmhlcml0cyhEcm9wem9uZSwgX0VtaXR0ZXIpO1xuXG5cdF9jcmVhdGVDbGFzcyhEcm9wem9uZSwgbnVsbCwgW1xuXHRcdHtcblx0XHRcdGtleTogJ2luaXRDbGFzcycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdENsYXNzKCkge1xuXHRcdFx0XHQvLyBFeHBvc2luZyB0aGUgZW1pdHRlciBjbGFzcywgbWFpbmx5IGZvciB0ZXN0c1xuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5FbWl0dGVyID0gRW1pdHRlcjtcblxuXHRcdFx0XHQvKlxuICAgICAgIFRoaXMgaXMgYSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgZXZlbnRzIHlvdSBjYW4gcmVnaXN0ZXIgb24gYSBkcm9wem9uZSBvYmplY3QuXG4gICAgICAgIFlvdSBjYW4gcmVnaXN0ZXIgYW4gZXZlbnQgaGFuZGxlciBsaWtlIHRoaXM6XG4gICAgICAgIGRyb3B6b25lLm9uKFwiZHJhZ0VudGVyXCIsIGZ1bmN0aW9uKCkgeyB9KTtcbiAgICAgICAgKi9cblx0XHRcdFx0dGhpcy5wcm90b3R5cGUuZXZlbnRzID0gW1xuXHRcdFx0XHRcdCdkcm9wJyxcblx0XHRcdFx0XHQnZHJhZ3N0YXJ0Jyxcblx0XHRcdFx0XHQnZHJhZ2VuZCcsXG5cdFx0XHRcdFx0J2RyYWdlbnRlcicsXG5cdFx0XHRcdFx0J2RyYWdvdmVyJyxcblx0XHRcdFx0XHQnZHJhZ2xlYXZlJyxcblx0XHRcdFx0XHQnYWRkZWRmaWxlJyxcblx0XHRcdFx0XHQnYWRkZWRmaWxlcycsXG5cdFx0XHRcdFx0J3JlbW92ZWRmaWxlJyxcblx0XHRcdFx0XHQndGh1bWJuYWlsJyxcblx0XHRcdFx0XHQnZXJyb3InLFxuXHRcdFx0XHRcdCdlcnJvcm11bHRpcGxlJyxcblx0XHRcdFx0XHQncHJvY2Vzc2luZycsXG5cdFx0XHRcdFx0J3Byb2Nlc3NpbmdtdWx0aXBsZScsXG5cdFx0XHRcdFx0J3VwbG9hZHByb2dyZXNzJyxcblx0XHRcdFx0XHQndG90YWx1cGxvYWRwcm9ncmVzcycsXG5cdFx0XHRcdFx0J3NlbmRpbmcnLFxuXHRcdFx0XHRcdCdzZW5kaW5nbXVsdGlwbGUnLFxuXHRcdFx0XHRcdCdzdWNjZXNzJyxcblx0XHRcdFx0XHQnc3VjY2Vzc211bHRpcGxlJyxcblx0XHRcdFx0XHQnY2FuY2VsZWQnLFxuXHRcdFx0XHRcdCdjYW5jZWxlZG11bHRpcGxlJyxcblx0XHRcdFx0XHQnY29tcGxldGUnLFxuXHRcdFx0XHRcdCdjb21wbGV0ZW11bHRpcGxlJyxcblx0XHRcdFx0XHQncmVzZXQnLFxuXHRcdFx0XHRcdCdtYXhmaWxlc2V4Y2VlZGVkJyxcblx0XHRcdFx0XHQnbWF4ZmlsZXNyZWFjaGVkJyxcblx0XHRcdFx0XHQncXVldWVjb21wbGV0ZScsXG5cdFx0XHRcdF07XG5cblx0XHRcdFx0dGhpcy5wcm90b3R5cGUuZGVmYXVsdE9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSGFzIHRvIGJlIHNwZWNpZmllZCBvbiBlbGVtZW50cyBvdGhlciB0aGFuIGZvcm0gKG9yIHdoZW4gdGhlIGZvcm1cblx0XHRcdFx0XHQgKiBkb2Vzbid0IGhhdmUgYW4gYGFjdGlvbmAgYXR0cmlidXRlKS4gWW91IGNhbiBhbHNvXG5cdFx0XHRcdFx0ICogcHJvdmlkZSBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBgZmlsZXNgIGFuZFxuXHRcdFx0XHRcdCAqIG11c3QgcmV0dXJuIHRoZSB1cmwgKHNpbmNlIGB2My4xMi4wYClcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR1cmw6IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBDYW4gYmUgY2hhbmdlZCB0byBgXCJwdXRcImAgaWYgbmVjZXNzYXJ5LiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIGZ1bmN0aW9uXG5cdFx0XHRcdFx0ICogdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBmaWxlc2AgYW5kIG11c3QgcmV0dXJuIHRoZSBtZXRob2QgKHNpbmNlIGB2My4xMi4wYCkuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBXaWxsIGJlIHNldCBvbiB0aGUgWEhSZXF1ZXN0LlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgdGltZW91dCBmb3IgdGhlIFhIUiByZXF1ZXN0cyBpbiBtaWxsaXNlY29uZHMgKHNpbmNlIGB2NC40LjBgKS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aW1lb3V0OiAzMDAwMCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEhvdyBtYW55IGZpbGUgdXBsb2FkcyB0byBwcm9jZXNzIGluIHBhcmFsbGVsIChTZWUgdGhlXG5cdFx0XHRcdFx0ICogRW5xdWV1aW5nIGZpbGUgdXBsb2FkcyogZG9jdW1lbnRhdGlvbiBzZWN0aW9uIGZvciBtb3JlIGluZm8pXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cGFyYWxsZWxVcGxvYWRzOiAyLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogV2hldGhlciB0byBzZW5kIG11bHRpcGxlIGZpbGVzIGluIG9uZSByZXF1ZXN0LiBJZlxuXHRcdFx0XHRcdCAqIHRoaXMgaXQgc2V0IHRvIHRydWUsIHRoZW4gdGhlIGZhbGxiYWNrIGZpbGUgaW5wdXQgZWxlbWVudCB3aWxsXG5cdFx0XHRcdFx0ICogaGF2ZSB0aGUgYG11bHRpcGxlYCBhdHRyaWJ1dGUgYXMgd2VsbC4gVGhpcyBvcHRpb24gd2lsbFxuXHRcdFx0XHRcdCAqIGFsc28gdHJpZ2dlciBhZGRpdGlvbmFsIGV2ZW50cyAobGlrZSBgcHJvY2Vzc2luZ211bHRpcGxlYCkuIFNlZSB0aGUgZXZlbnRzXG5cdFx0XHRcdFx0ICogZG9jdW1lbnRhdGlvbiBzZWN0aW9uIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFdoZXRoZXIgeW91IHdhbnQgZmlsZXMgdG8gYmUgdXBsb2FkZWQgaW4gY2h1bmtzIHRvIHlvdXIgc2VydmVyLiBUaGlzIGNhbid0IGJlXG5cdFx0XHRcdFx0ICogdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGB1cGxvYWRNdWx0aXBsZWAuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBTZWUgW2NodW5rc1VwbG9hZGVkXSgjY29uZmlnLWNodW5rc1VwbG9hZGVkKSBmb3IgdGhlIGNhbGxiYWNrIHRvIGZpbmFsaXNlIGFuIHVwbG9hZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRjaHVua2luZzogZmFsc2UsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgY2h1bmtpbmdgIGlzIGVuYWJsZWQsIHRoaXMgZGVmaW5lcyB3aGV0aGVyICoqZXZlcnkqKiBmaWxlIHNob3VsZCBiZSBjaHVua2VkLFxuXHRcdFx0XHRcdCAqIGV2ZW4gaWYgdGhlIGZpbGUgc2l6ZSBpcyBiZWxvdyBjaHVua1NpemUuIFRoaXMgbWVhbnMsIHRoYXQgdGhlIGFkZGl0aW9uYWwgY2h1bmtcblx0XHRcdFx0XHQgKiBmb3JtIGRhdGEgd2lsbCBiZSBzdWJtaXR0ZWQgYW5kIHRoZSBgY2h1bmtzVXBsb2FkZWRgIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRmb3JjZUNodW5raW5nOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGBjaHVua2luZ2AgaXMgYHRydWVgLCB0aGVuIHRoaXMgZGVmaW5lcyB0aGUgY2h1bmsgc2l6ZSBpbiBieXRlcy5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRjaHVua1NpemU6IDIwMDAwMDAsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgdHJ1ZWAsIHRoZSBpbmRpdmlkdWFsIGNodW5rcyBvZiBhIGZpbGUgYXJlIGJlaW5nIHVwbG9hZGVkIHNpbXVsdGFuZW91c2x5LlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHBhcmFsbGVsQ2h1bmtVcGxvYWRzOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFdoZXRoZXIgYSBjaHVuayBzaG91bGQgYmUgcmV0cmllZCBpZiBpdCBmYWlscy5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRyZXRyeUNodW5rczogZmFsc2UsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgcmV0cnlDaHVua3NgIGlzIHRydWUsIGhvdyBtYW55IHRpbWVzIHNob3VsZCBpdCBiZSByZXRyaWVkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJldHJ5Q2h1bmtzTGltaXQ6IDMsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBub3QgYG51bGxgIGRlZmluZXMgaG93IG1hbnkgZmlsZXMgdGhpcyBEcm9wem9uZSBoYW5kbGVzLiBJZiBpdCBleGNlZWRzLFxuXHRcdFx0XHRcdCAqIHRoZSBldmVudCBgbWF4ZmlsZXNleGNlZWRlZGAgd2lsbCBiZSBjYWxsZWQuIFRoZSBkcm9wem9uZSBlbGVtZW50IGdldHMgdGhlXG5cdFx0XHRcdFx0ICogY2xhc3MgYGR6LW1heC1maWxlcy1yZWFjaGVkYCBhY2NvcmRpbmdseSBzbyB5b3UgY2FuIHByb3ZpZGUgdmlzdWFsIGZlZWRiYWNrLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdG1heEZpbGVzaXplOiAyNTYsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgbmFtZSBvZiB0aGUgZmlsZSBwYXJhbSB0aGF0IGdldHMgdHJhbnNmZXJyZWQuXG5cdFx0XHRcdFx0ICogKipOT1RFKio6IElmIHlvdSBoYXZlIHRoZSBvcHRpb24gIGB1cGxvYWRNdWx0aXBsZWAgc2V0IHRvIGB0cnVlYCwgdGhlblxuXHRcdFx0XHRcdCAqIERyb3B6b25lIHdpbGwgYXBwZW5kIGBbXWAgdG8gdGhlIG5hbWUuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cGFyYW1OYW1lOiAnZmlsZScsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBXaGV0aGVyIHRodW1ibmFpbHMgZm9yIGltYWdlcyBzaG91bGQgYmUgZ2VuZXJhdGVkXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Y3JlYXRlSW1hZ2VUaHVtYm5haWxzOiB0cnVlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSW4gTUIuIFdoZW4gdGhlIGZpbGVuYW1lIGV4Y2VlZHMgdGhpcyBsaW1pdCwgdGhlIHRodW1ibmFpbCB3aWxsIG5vdCBiZSBnZW5lcmF0ZWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0bWF4VGh1bWJuYWlsRmlsZXNpemU6IDEwLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgYG51bGxgLCB0aGUgcmF0aW8gb2YgdGhlIGltYWdlIHdpbGwgYmUgdXNlZCB0byBjYWxjdWxhdGUgaXQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dGh1bWJuYWlsV2lkdGg6IDEyMCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSBzYW1lIGFzIGB0aHVtYm5haWxXaWR0aGAuIElmIGJvdGggYXJlIG51bGwsIGltYWdlcyB3aWxsIG5vdCBiZSByZXNpemVkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRodW1ibmFpbEhlaWdodDogMTIwLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSG93IHRoZSBpbWFnZXMgc2hvdWxkIGJlIHNjYWxlZCBkb3duIGluIGNhc2UgYm90aCwgYHRodW1ibmFpbFdpZHRoYCBhbmQgYHRodW1ibmFpbEhlaWdodGAgYXJlIHByb3ZpZGVkLlxuXHRcdFx0XHRcdCAqIENhbiBiZSBlaXRoZXIgYGNvbnRhaW5gIG9yIGBjcm9wYC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aHVtYm5haWxNZXRob2Q6ICdjcm9wJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIHNldCwgaW1hZ2VzIHdpbGwgYmUgcmVzaXplZCB0byB0aGVzZSBkaW1lbnNpb25zIGJlZm9yZSBiZWluZyAqKnVwbG9hZGVkKiouXG5cdFx0XHRcdFx0ICogSWYgb25seSBvbmUsIGByZXNpemVXaWR0aGAgKipvcioqIGByZXNpemVIZWlnaHRgIGlzIHByb3ZpZGVkLCB0aGUgb3JpZ2luYWwgYXNwZWN0XG5cdFx0XHRcdFx0ICogcmF0aW8gb2YgdGhlIGZpbGUgd2lsbCBiZSBwcmVzZXJ2ZWQuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBUaGUgYG9wdGlvbnMudHJhbnNmb3JtRmlsZWAgZnVuY3Rpb24gdXNlcyB0aGVzZSBvcHRpb25zLCBzbyBpZiB0aGUgYHRyYW5zZm9ybUZpbGVgIGZ1bmN0aW9uXG5cdFx0XHRcdFx0ICogaXMgb3ZlcnJpZGRlbiwgdGhlc2Ugb3B0aW9ucyBkb24ndCBkbyBhbnl0aGluZy5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRyZXNpemVXaWR0aDogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFNlZSBgcmVzaXplV2lkdGhgLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJlc2l6ZUhlaWdodDogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSBtaW1lIHR5cGUgb2YgdGhlIHJlc2l6ZWQgaW1hZ2UgKGJlZm9yZSBpdCBnZXRzIHVwbG9hZGVkIHRvIHRoZSBzZXJ2ZXIpLlxuXHRcdFx0XHRcdCAqIElmIGBudWxsYCB0aGUgb3JpZ2luYWwgbWltZSB0eXBlIHdpbGwgYmUgdXNlZC4gVG8gZm9yY2UganBlZywgZm9yIGV4YW1wbGUsIHVzZSBgaW1hZ2UvanBlZ2AuXG5cdFx0XHRcdFx0ICogU2VlIGByZXNpemVXaWR0aGAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVzaXplTWltZVR5cGU6IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgcXVhbGl0eSBvZiB0aGUgcmVzaXplZCBpbWFnZXMuIFNlZSBgcmVzaXplV2lkdGhgLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJlc2l6ZVF1YWxpdHk6IDAuOCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEhvdyB0aGUgaW1hZ2VzIHNob3VsZCBiZSBzY2FsZWQgZG93biBpbiBjYXNlIGJvdGgsIGByZXNpemVXaWR0aGAgYW5kIGByZXNpemVIZWlnaHRgIGFyZSBwcm92aWRlZC5cblx0XHRcdFx0XHQgKiBDYW4gYmUgZWl0aGVyIGBjb250YWluYCBvciBgY3JvcGAuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVzaXplTWV0aG9kOiAnY29udGFpbicsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgYmFzZSB0aGF0IGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBmaWxlc2l6ZS4gWW91IGNhbiBjaGFuZ2UgdGhpcyB0b1xuXHRcdFx0XHRcdCAqIDEwMjQgaWYgeW91IHdvdWxkIHJhdGhlciBkaXNwbGF5IGtpYmlieXRlcywgbWViaWJ5dGVzLCBldGMuLi5cblx0XHRcdFx0XHQgKiAxMDI0IGlzIHRlY2huaWNhbGx5IGluY29ycmVjdCwgYmVjYXVzZSBgMTAyNCBieXRlc2AgYXJlIGAxIGtpYmlieXRlYCBub3QgYDEga2lsb2J5dGVgLlxuXHRcdFx0XHRcdCAqIFlvdSBjYW4gY2hhbmdlIHRoaXMgdG8gYDEwMjRgIGlmIHlvdSBkb24ndCBjYXJlIGFib3V0IHZhbGlkaXR5LlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGZpbGVzaXplQmFzZTogMTAwMCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIENhbiBiZSB1c2VkIHRvIGxpbWl0IHRoZSBtYXhpbXVtIG51bWJlciBvZiBmaWxlcyB0aGF0IHdpbGwgYmUgaGFuZGxlZCBieSB0aGlzIERyb3B6b25lXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0bWF4RmlsZXM6IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBBbiBvcHRpb25hbCBvYmplY3QgdG8gc2VuZCBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gdGhlIHNlcnZlci4gRWc6XG5cdFx0XHRcdFx0ICogYHsgXCJNeS1Bd2Vzb21lLUhlYWRlclwiOiBcImhlYWRlciB2YWx1ZVwiIH1gXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0aGVhZGVyczogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGB0cnVlYCwgdGhlIGRyb3B6b25lIGVsZW1lbnQgaXRzZWxmIHdpbGwgYmUgY2xpY2thYmxlLCBpZiBgZmFsc2VgXG5cdFx0XHRcdFx0ICogbm90aGluZyB3aWxsIGJlIGNsaWNrYWJsZS5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIFlvdSBjYW4gYWxzbyBwYXNzIGFuIEhUTUwgZWxlbWVudCwgYSBDU1Mgc2VsZWN0b3IgKGZvciBtdWx0aXBsZSBlbGVtZW50cylcblx0XHRcdFx0XHQgKiBvciBhbiBhcnJheSBvZiB0aG9zZS4gSW4gdGhhdCBjYXNlLCBhbGwgb2YgdGhvc2UgZWxlbWVudHMgd2lsbCB0cmlnZ2VyIGFuXG5cdFx0XHRcdFx0ICogdXBsb2FkIHdoZW4gY2xpY2tlZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRjbGlja2FibGU6IHRydWUsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBXaGV0aGVyIGhpZGRlbiBmaWxlcyBpbiBkaXJlY3RvcmllcyBzaG91bGQgYmUgaWdub3JlZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRpZ25vcmVIaWRkZW5GaWxlczogdHJ1ZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBhY2NlcHRgIGNoZWNrcyB0aGUgZmlsZSdzIG1pbWUgdHlwZSBvclxuXHRcdFx0XHRcdCAqIGV4dGVuc2lvbiBhZ2FpbnN0IHRoaXMgbGlzdC4gVGhpcyBpcyBhIGNvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIG1pbWVcblx0XHRcdFx0XHQgKiB0eXBlcyBvciBmaWxlIGV4dGVuc2lvbnMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBFZy46IGBpbWFnZS8qLGFwcGxpY2F0aW9uL3BkZiwucHNkYFxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgdGhlIERyb3B6b25lIGlzIGBjbGlja2FibGVgIHRoaXMgb3B0aW9uIHdpbGwgYWxzbyBiZSB1c2VkIGFzXG5cdFx0XHRcdFx0ICogW2BhY2NlcHRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0hUTUwvRWxlbWVudC9pbnB1dCNhdHRyLWFjY2VwdClcblx0XHRcdFx0XHQgKiBwYXJhbWV0ZXIgb24gdGhlIGhpZGRlbiBmaWxlIGlucHV0IGFzIHdlbGwuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0YWNjZXB0ZWRGaWxlczogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqICoqRGVwcmVjYXRlZCEqKlxuXHRcdFx0XHRcdCAqIFVzZSBhY2NlcHRlZEZpbGVzIGluc3RlYWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0YWNjZXB0ZWRNaW1lVHlwZXM6IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBmYWxzZSwgZmlsZXMgd2lsbCBiZSBhZGRlZCB0byB0aGUgcXVldWUgYnV0IHRoZSBxdWV1ZSB3aWxsIG5vdCBiZVxuXHRcdFx0XHRcdCAqIHByb2Nlc3NlZCBhdXRvbWF0aWNhbGx5LlxuXHRcdFx0XHRcdCAqIFRoaXMgY2FuIGJlIHVzZWZ1bCBpZiB5b3UgbmVlZCBzb21lIGFkZGl0aW9uYWwgdXNlciBpbnB1dCBiZWZvcmUgc2VuZGluZ1xuXHRcdFx0XHRcdCAqIGZpbGVzIChvciBpZiB5b3Ugd2FudCB3YW50IGFsbCBmaWxlcyBzZW50IGF0IG9uY2UpLlxuXHRcdFx0XHRcdCAqIElmIHlvdSdyZSByZWFkeSB0byBzZW5kIHRoZSBmaWxlIHNpbXBseSBjYWxsIGBteURyb3B6b25lLnByb2Nlc3NRdWV1ZSgpYC5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIFNlZSB0aGUgW2VucXVldWluZyBmaWxlIHVwbG9hZHNdKCNlbnF1ZXVpbmctZmlsZS11cGxvYWRzKSBkb2N1bWVudGF0aW9uXG5cdFx0XHRcdFx0ICogc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRhdXRvUHJvY2Vzc1F1ZXVlOiB0cnVlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgZmFsc2UsIGZpbGVzIGFkZGVkIHRvIHRoZSBkcm9wem9uZSB3aWxsIG5vdCBiZSBxdWV1ZWQgYnkgZGVmYXVsdC5cblx0XHRcdFx0XHQgKiBZb3UnbGwgaGF2ZSB0byBjYWxsIGBlbnF1ZXVlRmlsZShmaWxlKWAgbWFudWFsbHkuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0YXV0b1F1ZXVlOiB0cnVlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgYHRydWVgLCB0aGlzIHdpbGwgYWRkIGEgbGluayB0byBldmVyeSBmaWxlIHByZXZpZXcgdG8gcmVtb3ZlIG9yIGNhbmNlbCAoaWZcblx0XHRcdFx0XHQgKiBhbHJlYWR5IHVwbG9hZGluZykgdGhlIGZpbGUuIFRoZSBgZGljdENhbmNlbFVwbG9hZGAsIGBkaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uYFxuXHRcdFx0XHRcdCAqIGFuZCBgZGljdFJlbW92ZUZpbGVgIG9wdGlvbnMgYXJlIHVzZWQgZm9yIHRoZSB3b3JkaW5nLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGFkZFJlbW92ZUxpbmtzOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIERlZmluZXMgd2hlcmUgdG8gZGlzcGxheSB0aGUgZmlsZSBwcmV2aWV3cyDigJMgaWYgYG51bGxgIHRoZVxuXHRcdFx0XHRcdCAqIERyb3B6b25lIGVsZW1lbnQgaXRzZWxmIGlzIHVzZWQuIENhbiBiZSBhIHBsYWluIGBIVE1MRWxlbWVudGAgb3IgYSBDU1Ncblx0XHRcdFx0XHQgKiBzZWxlY3Rvci4gVGhlIGVsZW1lbnQgc2hvdWxkIGhhdmUgdGhlIGBkcm9wem9uZS1wcmV2aWV3c2AgY2xhc3Mgc29cblx0XHRcdFx0XHQgKiB0aGUgcHJldmlld3MgYXJlIGRpc3BsYXllZCBwcm9wZXJseS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRwcmV2aWV3c0NvbnRhaW5lcjogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoaXMgaXMgdGhlIGVsZW1lbnQgdGhlIGhpZGRlbiBpbnB1dCBmaWVsZCAod2hpY2ggaXMgdXNlZCB3aGVuIGNsaWNraW5nIG9uIHRoZVxuXHRcdFx0XHRcdCAqIGRyb3B6b25lIHRvIHRyaWdnZXIgZmlsZSBzZWxlY3Rpb24pIHdpbGwgYmUgYXBwZW5kZWQgdG8uIFRoaXMgbWlnaHRcblx0XHRcdFx0XHQgKiBiZSBpbXBvcnRhbnQgaW4gY2FzZSB5b3UgdXNlIGZyYW1ld29ya3MgdG8gc3dpdGNoIHRoZSBjb250ZW50IG9mIHlvdXIgcGFnZS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRoaWRkZW5JbnB1dENvbnRhaW5lcjogJ2JvZHknLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgbnVsbCwgbm8gY2FwdHVyZSB0eXBlIHdpbGwgYmUgc3BlY2lmaWVkXG5cdFx0XHRcdFx0ICogSWYgY2FtZXJhLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgY2FtZXJhXG5cdFx0XHRcdFx0ICogSWYgbWljcm9waG9uZSwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIHRoZSBtaWNyb3Bob25lXG5cdFx0XHRcdFx0ICogSWYgY2FtY29yZGVyLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgdGhlIGNhbWVyYSBpbiB2aWRlbyBtb2RlXG5cdFx0XHRcdFx0ICogT24gYXBwbGUgZGV2aWNlcyBtdWx0aXBsZSBtdXN0IGJlIHNldCB0byBmYWxzZS4gIEFjY2VwdGVkRmlsZXMgbWF5IG5lZWQgdG9cblx0XHRcdFx0XHQgKiBiZSBzZXQgdG8gYW4gYXBwcm9wcmlhdGUgbWltZSB0eXBlIChlLmcuIFwiaW1hZ2UvKlwiLCBcImF1ZGlvLypcIiwgb3IgXCJ2aWRlby8qXCIpLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGNhcHR1cmU6IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiAqKkRlcHJlY2F0ZWQqKi4gVXNlIGByZW5hbWVGaWxlYCBpbnN0ZWFkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJlbmFtZUZpbGVuYW1lOiBudWxsLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogQSBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWQgYmVmb3JlIHRoZSBmaWxlIGlzIHVwbG9hZGVkIHRvIHRoZSBzZXJ2ZXIgYW5kIHJlbmFtZXMgdGhlIGZpbGUuXG5cdFx0XHRcdFx0ICogVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBgRmlsZWAgYXMgYXJndW1lbnQgYW5kIGNhbiB1c2UgdGhlIGBmaWxlLm5hbWVgLiBUaGUgYWN0dWFsIG5hbWUgb2YgdGhlXG5cdFx0XHRcdFx0ICogZmlsZSB0aGF0IGdldHMgdXNlZCBkdXJpbmcgdGhlIHVwbG9hZCBjYW4gYmUgYWNjZXNzZWQgdGhyb3VnaCBgZmlsZS51cGxvYWQuZmlsZW5hbWVgLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJlbmFtZUZpbGU6IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgdHJ1ZWAgdGhlIGZhbGxiYWNrIHdpbGwgYmUgZm9yY2VkLiBUaGlzIGlzIHZlcnkgdXNlZnVsIHRvIHRlc3QgeW91ciBzZXJ2ZXJcblx0XHRcdFx0XHQgKiBpbXBsZW1lbnRhdGlvbnMgZmlyc3QgYW5kIG1ha2Ugc3VyZSB0aGF0IGV2ZXJ5dGhpbmcgd29ya3MgYXNcblx0XHRcdFx0XHQgKiBleHBlY3RlZCB3aXRob3V0IGRyb3B6b25lIGlmIHlvdSBleHBlcmllbmNlIHByb2JsZW1zLCBhbmQgdG8gdGVzdFxuXHRcdFx0XHRcdCAqIGhvdyB5b3VyIGZhbGxiYWNrcyB3aWxsIGxvb2suXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm9yY2VGYWxsYmFjazogZmFsc2UsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgdGV4dCB1c2VkIGJlZm9yZSBhbnkgZmlsZXMgYXJlIGRyb3BwZWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdERlZmF1bHRNZXNzYWdlOiAnRHJvcCBmaWxlcyBoZXJlIHRvIHVwbG9hZCcsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgdGV4dCB0aGF0IHJlcGxhY2VzIHRoZSBkZWZhdWx0IG1lc3NhZ2UgdGV4dCBpdCB0aGUgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RGYWxsYmFja01lc3NhZ2U6IFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZHJhZyduJ2Ryb3AgZmlsZSB1cGxvYWRzLlwiLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVGhlIHRleHQgdGhhdCB3aWxsIGJlIGFkZGVkIGJlZm9yZSB0aGUgZmFsbGJhY2sgZm9ybS5cblx0XHRcdFx0XHQgKiBJZiB5b3UgcHJvdmlkZSBhICBmYWxsYmFjayBlbGVtZW50IHlvdXJzZWxmLCBvciBpZiB0aGlzIG9wdGlvbiBpcyBgbnVsbGAgdGhpcyB3aWxsXG5cdFx0XHRcdFx0ICogYmUgaWdub3JlZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRkaWN0RmFsbGJhY2tUZXh0OiAnUGxlYXNlIHVzZSB0aGUgZmFsbGJhY2sgZm9ybSBiZWxvdyB0byB1cGxvYWQgeW91ciBmaWxlcyBsaWtlIGluIHRoZSBvbGRlbiBkYXlzLicsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiB0aGUgZmlsZXNpemUgaXMgdG9vIGJpZy5cblx0XHRcdFx0XHQgKiBge3tmaWxlc2l6ZX19YCBhbmQgYHt7bWF4RmlsZXNpemV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSByZXNwZWN0aXZlIGNvbmZpZ3VyYXRpb24gdmFsdWVzLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RGaWxlVG9vQmlnOiAnRmlsZSBpcyB0b28gYmlnICh7e2ZpbGVzaXplfX1NaUIpLiBNYXggZmlsZXNpemU6IHt7bWF4RmlsZXNpemV9fU1pQi4nLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgdGhlIGZpbGUgZG9lc24ndCBtYXRjaCB0aGUgZmlsZSB0eXBlLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RJbnZhbGlkRmlsZVR5cGU6IFwiWW91IGNhbid0IHVwbG9hZCBmaWxlcyBvZiB0aGlzIHR5cGUuXCIsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiB0aGUgc2VydmVyIHJlc3BvbnNlIHdhcyBpbnZhbGlkLlxuXHRcdFx0XHRcdCAqIGB7e3N0YXR1c0NvZGV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBzZXJ2ZXJzIHN0YXR1cyBjb2RlLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RSZXNwb25zZUVycm9yOiAnU2VydmVyIHJlc3BvbmRlZCB3aXRoIHt7c3RhdHVzQ29kZX19IGNvZGUuJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCBmb3IgdGhlIGNhbmNlbCB1cGxvYWQgbGluay5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRkaWN0Q2FuY2VsVXBsb2FkOiAnQ2FuY2VsIHVwbG9hZCcsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgZm9yIGNvbmZpcm1hdGlvbiB3aGVuIGNhbmNlbGxpbmcgdXBsb2FkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb246ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsIHRoaXMgdXBsb2FkPycsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgYWRkUmVtb3ZlTGlua3NgIGlzIHRydWUsIHRoZSB0ZXh0IHRvIGJlIHVzZWQgdG8gcmVtb3ZlIGEgZmlsZS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRkaWN0UmVtb3ZlRmlsZTogJ1JlbW92ZSBmaWxlJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIHRoaXMgaXMgbm90IG51bGwsIHRoZW4gdGhlIHVzZXIgd2lsbCBiZSBwcm9tcHRlZCBiZWZvcmUgcmVtb3ZpbmcgYSBmaWxlLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RSZW1vdmVGaWxlQ29uZmlybWF0aW9uOiBudWxsLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogRGlzcGxheWVkIGlmIGBtYXhGaWxlc2AgaXMgc3QgYW5kIGV4Y2VlZGVkLlxuXHRcdFx0XHRcdCAqIFRoZSBzdHJpbmcgYHt7bWF4RmlsZXN9fWAgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRkaWN0TWF4RmlsZXNFeGNlZWRlZDogJ1lvdSBjYW4gbm90IHVwbG9hZCBhbnkgbW9yZSBmaWxlcy4nLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogQWxsb3dzIHlvdSB0byB0cmFuc2xhdGUgdGhlIGRpZmZlcmVudCB1bml0cy4gU3RhcnRpbmcgd2l0aCBgdGJgIGZvciB0ZXJhYnl0ZXMgYW5kIGdvaW5nIGRvd24gdG9cblx0XHRcdFx0XHQgKiBgYmAgZm9yIGJ5dGVzLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RGaWxlU2l6ZVVuaXRzOiB7IHRiOiAnVEInLCBnYjogJ0dCJywgbWI6ICdNQicsIGtiOiAnS0InLCBiOiAnYicgfSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIENhbGxlZCB3aGVuIGRyb3B6b25lIGluaXRpYWxpemVkXG5cdFx0XHRcdFx0ICogWW91IGNhbiBhZGQgZXZlbnQgbGlzdGVuZXJzIGhlcmVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRpbml0OiBmdW5jdGlvbiBpbml0KCkge30sXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBDYW4gYmUgYW4gKipvYmplY3QqKiBvZiBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gdHJhbnNmZXIgdG8gdGhlIHNlcnZlciwgKipvcioqIGEgYEZ1bmN0aW9uYFxuXHRcdFx0XHRcdCAqIHRoYXQgZ2V0cyBpbnZva2VkIHdpdGggdGhlIGBmaWxlc2AsIGB4aHJgIGFuZCwgaWYgaXQncyBhIGNodW5rZWQgdXBsb2FkLCBgY2h1bmtgIGFyZ3VtZW50cy4gSW4gY2FzZVxuXHRcdFx0XHRcdCAqIG9mIGEgZnVuY3Rpb24sIHRoaXMgbmVlZHMgdG8gcmV0dXJuIGEgbWFwLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3RoaW5nIGZvciBub3JtYWwgdXBsb2FkcywgYnV0IGFkZHMgcmVsZXZhbnQgaW5mb3JtYXRpb24gZm9yXG5cdFx0XHRcdFx0ICogY2h1bmtlZCB1cGxvYWRzLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogVGhpcyBpcyB0aGUgc2FtZSBhcyBhZGRpbmcgaGlkZGVuIGlucHV0IGZpZWxkcyBpbiB0aGUgZm9ybSBlbGVtZW50LlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHBhcmFtczogZnVuY3Rpb24gcGFyYW1zKGZpbGVzLCB4aHIsIGNodW5rKSB7XG5cdFx0XHRcdFx0XHRpZiAoY2h1bmspIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRkenV1aWQ6IGNodW5rLmZpbGUudXBsb2FkLnV1aWQsXG5cdFx0XHRcdFx0XHRcdFx0ZHpjaHVua2luZGV4OiBjaHVuay5pbmRleCxcblx0XHRcdFx0XHRcdFx0XHRkenRvdGFsZmlsZXNpemU6IGNodW5rLmZpbGUuc2l6ZSxcblx0XHRcdFx0XHRcdFx0XHRkemNodW5rc2l6ZTogdGhpcy5vcHRpb25zLmNodW5rU2l6ZSxcblx0XHRcdFx0XHRcdFx0XHRkenRvdGFsY2h1bmtjb3VudDogY2h1bmsuZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50LFxuXHRcdFx0XHRcdFx0XHRcdGR6Y2h1bmtieXRlb2Zmc2V0OiBjaHVuay5pbmRleCAqIHRoaXMub3B0aW9ucy5jaHVua1NpemUsXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEEgZnVuY3Rpb24gdGhhdCBnZXRzIGEgW2ZpbGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvRE9NL0ZpbGUpXG5cdFx0XHRcdFx0ICogYW5kIGEgYGRvbmVgIGZ1bmN0aW9uIGFzIHBhcmFtZXRlcnMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB0aGUgZG9uZSBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCB0aGUgZmlsZSBpcyBcImFjY2VwdGVkXCIgYW5kIHdpbGxcblx0XHRcdFx0XHQgKiBiZSBwcm9jZXNzZWQuIElmIHlvdSBwYXNzIGFuIGVycm9yIG1lc3NhZ2UsIHRoZSBmaWxlIGlzIHJlamVjdGVkLCBhbmQgdGhlIGVycm9yXG5cdFx0XHRcdFx0ICogbWVzc2FnZSB3aWxsIGJlIGRpc3BsYXllZC5cblx0XHRcdFx0XHQgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgbm90IGJlIGNhbGxlZCBpZiB0aGUgZmlsZSBpcyB0b28gYmlnIG9yIGRvZXNuJ3QgbWF0Y2ggdGhlIG1pbWUgdHlwZXMuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0YWNjZXB0OiBmdW5jdGlvbiBhY2NlcHQoZmlsZSwgZG9uZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoKTtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gYWxsIGNodW5rcyBoYXZlIGJlZW4gdXBsb2FkZWQgZm9yIGEgZmlsZS5cblx0XHRcdFx0XHQgKiBJdCBnZXRzIHRoZSBmaWxlIGZvciB3aGljaCB0aGUgY2h1bmtzIGhhdmUgYmVlbiB1cGxvYWRlZCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLFxuXHRcdFx0XHRcdCAqIGFuZCB0aGUgYGRvbmVgIGZ1bmN0aW9uIGFzIHNlY29uZC4gYGRvbmUoKWAgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIGV2ZXJ5dGhpbmdcblx0XHRcdFx0XHQgKiBuZWVkZWQgdG8gZmluaXNoIHRoZSB1cGxvYWQgcHJvY2VzcyBpcyBkb25lLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGNodW5rc1VwbG9hZGVkOiBmdW5jdGlvbiBjaHVua3NVcGxvYWRlZChmaWxlLCBkb25lKSB7XG5cdFx0XHRcdFx0XHRkb25lKCk7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEdldHMgY2FsbGVkIHdoZW4gdGhlIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZC5cblx0XHRcdFx0XHQgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBzaG93cyB0aGUgZmFsbGJhY2sgaW5wdXQgZmllbGQgYW5kIGFkZHNcblx0XHRcdFx0XHQgKiBhIHRleHQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZmFsbGJhY2s6IGZ1bmN0aW9uIGZhbGxiYWNrKCkge1xuXHRcdFx0XHRcdFx0Ly8gVGhpcyBjb2RlIHNob3VsZCBwYXNzIGluIElFNy4uLiA6KFxuXHRcdFx0XHRcdFx0dmFyIG1lc3NhZ2VFbGVtZW50ID0gdm9pZCAwO1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuZWxlbWVudC5jbGFzc05hbWUgKyAnIGR6LWJyb3dzZXItbm90LXN1cHBvcnRlZCc7XG5cblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSxcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTIgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMiA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMiA9IF9pc0FycmF5MiA/IF9pdGVyYXRvcjIgOiBfaXRlcmF0b3IyW1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTIpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyID49IF9pdGVyYXRvcjIubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMiA9IF9pdGVyYXRvcjIubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjIgPSBfaTIudmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHR2YXIgY2hpbGQgPSBfcmVmMjtcblxuXHRcdFx0XHRcdFx0XHRpZiAoLyhefCApZHotbWVzc2FnZSgkfCApLy50ZXN0KGNoaWxkLmNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlRWxlbWVudCA9IGNoaWxkO1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkLmNsYXNzTmFtZSA9ICdkei1tZXNzYWdlJzsgLy8gUmVtb3ZlcyB0aGUgJ2R6LWRlZmF1bHQnIGNsYXNzXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICghbWVzc2FnZUVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0bWVzc2FnZUVsZW1lbnQgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KCc8ZGl2IGNsYXNzPVwiZHotbWVzc2FnZVwiPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIHNwYW4gPSBtZXNzYWdlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdO1xuXHRcdFx0XHRcdFx0aWYgKHNwYW4pIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNwYW4udGV4dENvbnRlbnQgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRcdHNwYW4udGV4dENvbnRlbnQgPSB0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrTWVzc2FnZTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChzcGFuLmlubmVyVGV4dCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3Bhbi5pbm5lclRleHQgPSB0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrTWVzc2FnZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0RmFsbGJhY2tGb3JtKCkpO1xuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBHZXRzIGNhbGxlZCB0byBjYWxjdWxhdGUgdGhlIHRodW1ibmFpbCBkaW1lbnNpb25zLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSXQgZ2V0cyBgZmlsZWAsIGB3aWR0aGAgYW5kIGBoZWlnaHRgIChib3RoIG1heSBiZSBgbnVsbGApIGFzIHBhcmFtZXRlcnMgYW5kIG11c3QgcmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nOlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogIC0gYHNyY1dpZHRoYCAmIGBzcmNIZWlnaHRgIChyZXF1aXJlZClcblx0XHRcdFx0XHQgKiAgLSBgdHJnV2lkdGhgICYgYHRyZ0hlaWdodGAgKHJlcXVpcmVkKVxuXHRcdFx0XHRcdCAqICAtIGBzcmNYYCAmIGBzcmNZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxuXHRcdFx0XHRcdCAqICAtIGB0cmdYYCAmIGB0cmdZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogVGhvc2UgdmFsdWVzIGFyZSBnb2luZyB0byBiZSB1c2VkIGJ5IGBjdHguZHJhd0ltYWdlKClgLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJlc2l6ZTogZnVuY3Rpb24gcmVzaXplKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCkge1xuXHRcdFx0XHRcdFx0dmFyIGluZm8gPSB7XG5cdFx0XHRcdFx0XHRcdHNyY1g6IDAsXG5cdFx0XHRcdFx0XHRcdHNyY1k6IDAsXG5cdFx0XHRcdFx0XHRcdHNyY1dpZHRoOiBmaWxlLndpZHRoLFxuXHRcdFx0XHRcdFx0XHRzcmNIZWlnaHQ6IGZpbGUuaGVpZ2h0LFxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0dmFyIHNyY1JhdGlvID0gZmlsZS53aWR0aCAvIGZpbGUuaGVpZ2h0O1xuXG5cdFx0XHRcdFx0XHQvLyBBdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZSBkaW1lbnNpb25zIGlmIG5vdCBzcGVjaWZpZWRcblx0XHRcdFx0XHRcdGlmICh3aWR0aCA9PSBudWxsICYmIGhlaWdodCA9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHdpZHRoID0gaW5mby5zcmNXaWR0aDtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gaW5mby5zcmNIZWlnaHQ7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHdpZHRoID09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0d2lkdGggPSBoZWlnaHQgKiBzcmNSYXRpbztcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaGVpZ2h0ID09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gd2lkdGggLyBzcmNSYXRpbztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIGltYWdlcyBhcmVuJ3QgdXBzY2FsZWRcblx0XHRcdFx0XHRcdHdpZHRoID0gTWF0aC5taW4od2lkdGgsIGluZm8uc3JjV2lkdGgpO1xuXHRcdFx0XHRcdFx0aGVpZ2h0ID0gTWF0aC5taW4oaGVpZ2h0LCBpbmZvLnNyY0hlaWdodCk7XG5cblx0XHRcdFx0XHRcdHZhciB0cmdSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuXG5cdFx0XHRcdFx0XHRpZiAoaW5mby5zcmNXaWR0aCA+IHdpZHRoIHx8IGluZm8uc3JjSGVpZ2h0ID4gaGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRcdC8vIEltYWdlIGlzIGJpZ2dlciBhbmQgbmVlZHMgcmVzY2FsaW5nXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNpemVNZXRob2QgPT09ICdjcm9wJykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzcmNSYXRpbyA+IHRyZ1JhdGlvKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbmZvLnNyY0hlaWdodCA9IGZpbGUuaGVpZ2h0O1xuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5zcmNXaWR0aCA9IGluZm8uc3JjSGVpZ2h0ICogdHJnUmF0aW87XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluZm8uc3JjV2lkdGggPSBmaWxlLndpZHRoO1xuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5zcmNIZWlnaHQgPSBpbmZvLnNyY1dpZHRoIC8gdHJnUmF0aW87XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlc2l6ZU1ldGhvZCA9PT0gJ2NvbnRhaW4nKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gTWV0aG9kICdjb250YWluJ1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzcmNSYXRpbyA+IHRyZ1JhdGlvKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRoZWlnaHQgPSB3aWR0aCAvIHNyY1JhdGlvO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHJlc2l6ZU1ldGhvZCAnXCIgKyByZXNpemVNZXRob2QgKyBcIidcIik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aW5mby5zcmNYID0gKGZpbGUud2lkdGggLSBpbmZvLnNyY1dpZHRoKSAvIDI7XG5cdFx0XHRcdFx0XHRpbmZvLnNyY1kgPSAoZmlsZS5oZWlnaHQgLSBpbmZvLnNyY0hlaWdodCkgLyAyO1xuXG5cdFx0XHRcdFx0XHRpbmZvLnRyZ1dpZHRoID0gd2lkdGg7XG5cdFx0XHRcdFx0XHRpbmZvLnRyZ0hlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGluZm87XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIENhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgZmlsZSAoZm9yIGV4YW1wbGUsIHJlc2l6ZSBhbiBpbWFnZSBpZiBuZWNlc3NhcnkpLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyBgcmVzaXplV2lkdGhgIGFuZCBgcmVzaXplSGVpZ2h0YCAoaWYgcHJvdmlkZWQpIGFuZCByZXNpemVzXG5cdFx0XHRcdFx0ICogaW1hZ2VzIGFjY29yZGluZyB0byB0aG9zZSBkaW1lbnNpb25zLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogR2V0cyB0aGUgYGZpbGVgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIGFuZCBhIGBkb25lKClgIGZ1bmN0aW9uIGFzIHRoZSBzZWNvbmQsIHRoYXQgbmVlZHNcblx0XHRcdFx0XHQgKiB0byBiZSBpbnZva2VkIHdpdGggdGhlIGZpbGUgd2hlbiB0aGUgdHJhbnNmb3JtYXRpb24gaXMgZG9uZS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0cmFuc2Zvcm1GaWxlOiBmdW5jdGlvbiB0cmFuc2Zvcm1GaWxlKGZpbGUsIGRvbmUpIHtcblx0XHRcdFx0XHRcdGlmICgodGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoIHx8IHRoaXMub3B0aW9ucy5yZXNpemVIZWlnaHQpICYmIGZpbGUudHlwZS5tYXRjaCgvaW1hZ2UuKi8pKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnJlc2l6ZUltYWdlKFxuXHRcdFx0XHRcdFx0XHRcdGZpbGUsXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoLFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5yZXNpemVIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnJlc2l6ZU1ldGhvZCxcblx0XHRcdFx0XHRcdFx0XHRkb25lXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShmaWxlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogQSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgdGVtcGxhdGUgdXNlZCBmb3IgZWFjaCBkcm9wcGVkXG5cdFx0XHRcdFx0ICogZmlsZS4gQ2hhbmdlIGl0IHRvIGZ1bGZpbGwgeW91ciBuZWVkcyBidXQgbWFrZSBzdXJlIHRvIHByb3Blcmx5XG5cdFx0XHRcdFx0ICogcHJvdmlkZSBhbGwgZWxlbWVudHMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gYWN0dWFsIEhUTUwgZWxlbWVudCBpbnN0ZWFkIG9mIHByb3ZpZGluZyBhIFN0cmluZ1xuXHRcdFx0XHRcdCAqIGFzIGEgY29uZmlnIG9wdGlvbiwgeW91IGNvdWxkIGNyZWF0ZSBhIGRpdiB3aXRoIHRoZSBpZCBgdHBsYCxcblx0XHRcdFx0XHQgKiBwdXQgdGhlIHRlbXBsYXRlIGluc2lkZSBpdCBhbmQgcHJvdmlkZSB0aGUgZWxlbWVudCBsaWtlIHRoaXM6XG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiAgICAgZG9jdW1lbnRcblx0XHRcdFx0XHQgKiAgICAgICAucXVlcnlTZWxlY3RvcignI3RwbCcpXG5cdFx0XHRcdFx0ICogICAgICAgLmlubmVySFRNTFxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cHJldmlld1RlbXBsYXRlOlxuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkei1wcmV2aWV3IGR6LWZpbGUtcHJldmlld1wiPlxcbiAgPGRpdiBjbGFzcz1cImR6LWltYWdlXCI+PGltZyBkYXRhLWR6LXRodW1ibmFpbCAvPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cImR6LWRldGFpbHNcIj5cXG4gICAgPGRpdiBjbGFzcz1cImR6LXNpemVcIj48c3BhbiBkYXRhLWR6LXNpemU+PC9zcGFuPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZHotZmlsZW5hbWVcIj48c3BhbiBkYXRhLWR6LW5hbWU+PC9zcGFuPjwvZGl2PlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotcHJvZ3Jlc3NcIj48c3BhbiBjbGFzcz1cImR6LXVwbG9hZFwiIGRhdGEtZHotdXBsb2FkcHJvZ3Jlc3M+PC9zcGFuPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cImR6LWVycm9yLW1lc3NhZ2VcIj48c3BhbiBkYXRhLWR6LWVycm9ybWVzc2FnZT48L3NwYW4+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotc3VjY2Vzcy1tYXJrXCI+XFxuICAgIDxzdmcgd2lkdGg9XCI1NHB4XCIgaGVpZ2h0PVwiNTRweFwiIHZpZXdCb3g9XCIwIDAgNTQgNTRcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbG5zOnNrZXRjaD1cImh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9uc1wiPlxcbiAgICAgIDx0aXRsZT5DaGVjazwvdGl0bGU+XFxuICAgICAgPGRlZnM+PC9kZWZzPlxcbiAgICAgIDxnIGlkPVwiUGFnZS0xXCIgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBza2V0Y2g6dHlwZT1cIk1TUGFnZVwiPlxcbiAgICAgICAgPHBhdGggZD1cIk0yMy41LDMxLjg0MzE0NTggTDE3LjU4NTI0MTksMjUuOTI4Mzg3NyBDMTYuMDI0ODI1MywyNC4zNjc5NzExIDEzLjQ5MTAyOTQsMjQuMzY2ODM1IDExLjkyODkzMjIsMjUuOTI4OTMyMiBDMTAuMzcwMDEzNiwyNy40ODc4NTA4IDEwLjM2NjU5MTIsMzAuMDIzNDQ1NSAxMS45MjgzODc3LDMxLjU4NTI0MTkgTDIwLjQxNDc1ODEsNDAuMDcxNjEyMyBDMjAuNTEzMzk5OSw0MC4xNzAyNTQxIDIwLjYxNTkzMTUsNDAuMjYyNjY0OSAyMC43MjE4NjE1LDQwLjM0ODg0MzUgQzIyLjI4MzU2NjksNDEuODcyNTY1MSAyNC43OTQyMzQsNDEuODYyNjIwMiAyNi4zNDYxNTY0LDQwLjMxMDY5NzggTDQzLjMxMDY5NzgsMjMuMzQ2MTU2NCBDNDQuODc3MTAyMSwyMS43Nzk3NTIxIDQ0Ljg3NTgwNTcsMTkuMjQ4Mzg4NyA0My4zMTM3MDg1LDE3LjY4NjI5MTUgQzQxLjc1NDc4OTksMTYuMTI3MzcyOSAzOS4yMTc2MDM1LDE2LjEyNTU0MjIgMzcuNjUzODQzNiwxNy42ODkzMDIyIEwyMy41LDMxLjg0MzE0NTggWiBNMjcsNTMgQzQxLjM1OTQwMzUsNTMgNTMsNDEuMzU5NDAzNSA1MywyNyBDNTMsMTIuNjQwNTk2NSA0MS4zNTk0MDM1LDEgMjcsMSBDMTIuNjQwNTk2NSwxIDEsMTIuNjQwNTk2NSAxLDI3IEMxLDQxLjM1OTQwMzUgMTIuNjQwNTk2NSw1MyAyNyw1MyBaXCIgaWQ9XCJPdmFsLTJcIiBzdHJva2Utb3BhY2l0eT1cIjAuMTk4Nzk0MTU4XCIgc3Ryb2tlPVwiIzc0NzQ3NFwiIGZpbGwtb3BhY2l0eT1cIjAuODE2NTE5NDc1XCIgZmlsbD1cIiNGRkZGRkZcIiBza2V0Y2g6dHlwZT1cIk1TU2hhcGVHcm91cFwiPjwvcGF0aD5cXG4gICAgICA8L2c+XFxuICAgIDwvc3ZnPlxcbiAgPC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotZXJyb3ItbWFya1wiPlxcbiAgICA8c3ZnIHdpZHRoPVwiNTRweFwiIGhlaWdodD1cIjU0cHhcIiB2aWV3Qm94PVwiMCAwIDU0IDU0XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bWxuczpza2V0Y2g9XCJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnNcIj5cXG4gICAgICA8dGl0bGU+RXJyb3I8L3RpdGxlPlxcbiAgICAgIDxkZWZzPjwvZGVmcz5cXG4gICAgICA8ZyBpZD1cIlBhZ2UtMVwiIHN0cm9rZT1cIm5vbmVcIiBzdHJva2Utd2lkdGg9XCIxXCIgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc2tldGNoOnR5cGU9XCJNU1BhZ2VcIj5cXG4gICAgICAgIDxnIGlkPVwiQ2hlY2stKy1PdmFsLTJcIiBza2V0Y2g6dHlwZT1cIk1TTGF5ZXJHcm91cFwiIHN0cm9rZT1cIiM3NDc0NzRcIiBzdHJva2Utb3BhY2l0eT1cIjAuMTk4Nzk0MTU4XCIgZmlsbD1cIiNGRkZGRkZcIiBmaWxsLW9wYWNpdHk9XCIwLjgxNjUxOTQ3NVwiPlxcbiAgICAgICAgICA8cGF0aCBkPVwiTTMyLjY1Njg1NDIsMjkgTDM4LjMxMDY5NzgsMjMuMzQ2MTU2NCBDMzkuODc3MTAyMSwyMS43Nzk3NTIxIDM5Ljg3NTgwNTcsMTkuMjQ4Mzg4NyAzOC4zMTM3MDg1LDE3LjY4NjI5MTUgQzM2Ljc1NDc4OTksMTYuMTI3MzcyOSAzNC4yMTc2MDM1LDE2LjEyNTU0MjIgMzIuNjUzODQzNiwxNy42ODkzMDIyIEwyNywyMy4zNDMxNDU4IEwyMS4zNDYxNTY0LDE3LjY4OTMwMjIgQzE5Ljc4MjM5NjUsMTYuMTI1NTQyMiAxNy4yNDUyMTAxLDE2LjEyNzM3MjkgMTUuNjg2MjkxNSwxNy42ODYyOTE1IEMxNC4xMjQxOTQzLDE5LjI0ODM4ODcgMTQuMTIyODk3OSwyMS43Nzk3NTIxIDE1LjY4OTMwMjIsMjMuMzQ2MTU2NCBMMjEuMzQzMTQ1OCwyOSBMMTUuNjg5MzAyMiwzNC42NTM4NDM2IEMxNC4xMjI4OTc5LDM2LjIyMDI0NzkgMTQuMTI0MTk0MywzOC43NTE2MTEzIDE1LjY4NjI5MTUsNDAuMzEzNzA4NSBDMTcuMjQ1MjEwMSw0MS44NzI2MjcxIDE5Ljc4MjM5NjUsNDEuODc0NDU3OCAyMS4zNDYxNTY0LDQwLjMxMDY5NzggTDI3LDM0LjY1Njg1NDIgTDMyLjY1Mzg0MzYsNDAuMzEwNjk3OCBDMzQuMjE3NjAzNSw0MS44NzQ0NTc4IDM2Ljc1NDc4OTksNDEuODcyNjI3MSAzOC4zMTM3MDg1LDQwLjMxMzcwODUgQzM5Ljg3NTgwNTcsMzguNzUxNjExMyAzOS44NzcxMDIxLDM2LjIyMDI0NzkgMzguMzEwNjk3OCwzNC42NTM4NDM2IEwzMi42NTY4NTQyLDI5IFogTTI3LDUzIEM0MS4zNTk0MDM1LDUzIDUzLDQxLjM1OTQwMzUgNTMsMjcgQzUzLDEyLjY0MDU5NjUgNDEuMzU5NDAzNSwxIDI3LDEgQzEyLjY0MDU5NjUsMSAxLDEyLjY0MDU5NjUgMSwyNyBDMSw0MS4zNTk0MDM1IDEyLjY0MDU5NjUsNTMgMjcsNTMgWlwiIGlkPVwiT3ZhbC0yXCIgc2tldGNoOnR5cGU9XCJNU1NoYXBlR3JvdXBcIj48L3BhdGg+XFxuICAgICAgICA8L2c+XFxuICAgICAgPC9nPlxcbiAgICA8L3N2Zz5cXG4gIDwvZGl2PlxcbjwvZGl2PicsXG5cblx0XHRcdFx0XHQvLyBFTkQgT1BUSU9OU1xuXHRcdFx0XHRcdC8vIChSZXF1aXJlZCBieSB0aGUgZHJvcHpvbmUgZG9jdW1lbnRhdGlvbiBwYXJzZXIpXG5cblx0XHRcdFx0XHQvKlxuICAgICAgICAgVGhvc2UgZnVuY3Rpb25zIHJlZ2lzdGVyIHRoZW1zZWx2ZXMgdG8gdGhlIGV2ZW50cyBvbiBpbml0IGFuZCBoYW5kbGUgYWxsXG4gICAgICAgICB0aGUgdXNlciBpbnRlcmZhY2Ugc3BlY2lmaWMgc3R1ZmYuIE92ZXJ3cml0aW5nIHRoZW0gd29uJ3QgYnJlYWsgdGhlIHVwbG9hZFxuICAgICAgICAgYnV0IGNhbiBicmVhayB0aGUgd2F5IGl0J3MgZGlzcGxheWVkLlxuICAgICAgICAgWW91IGNhbiBvdmVyd3JpdGUgdGhlbSBpZiB5b3UgZG9uJ3QgbGlrZSB0aGUgZGVmYXVsdCBiZWhhdmlvci4gSWYgeW91IGp1c3RcbiAgICAgICAgIHdhbnQgdG8gYWRkIGFuIGFkZGl0aW9uYWwgZXZlbnQgaGFuZGxlciwgcmVnaXN0ZXIgaXQgb24gdGhlIGRyb3B6b25lIG9iamVjdFxuICAgICAgICAgYW5kIGRvbid0IG92ZXJ3cml0ZSB0aG9zZSBvcHRpb25zLlxuICAgICAgICAgKi9cblxuXHRcdFx0XHRcdC8vIFRob3NlIGFyZSBzZWxmIGV4cGxhbmF0b3J5IGFuZCBzaW1wbHkgY29uY2VybiB0aGUgRHJhZ25Ecm9wLlxuXHRcdFx0XHRcdGRyb3A6IGZ1bmN0aW9uIGRyb3AoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1kcmFnLWhvdmVyJyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkcmFnc3RhcnQ6IGZ1bmN0aW9uIGRyYWdzdGFydChlKSB7fSxcblx0XHRcdFx0XHRkcmFnZW5kOiBmdW5jdGlvbiBkcmFnZW5kKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotZHJhZy1ob3ZlcicpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZHJhZ2VudGVyOiBmdW5jdGlvbiBkcmFnZW50ZXIoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1kcmFnLWhvdmVyJyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkcmFnb3ZlcjogZnVuY3Rpb24gZHJhZ292ZXIoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1kcmFnLWhvdmVyJyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkcmFnbGVhdmU6IGZ1bmN0aW9uIGRyYWdsZWF2ZShlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWRyYWctaG92ZXInKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHBhc3RlOiBmdW5jdGlvbiBwYXN0ZShlKSB7fSxcblxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuZXZlciB0aGVyZSBhcmUgbm8gZmlsZXMgbGVmdCBpbiB0aGUgZHJvcHpvbmUgYW55bW9yZSwgYW5kIHRoZVxuXHRcdFx0XHRcdC8vIGRyb3B6b25lIHNob3VsZCBiZSBkaXNwbGF5ZWQgYXMgaWYgaW4gdGhlIGluaXRpYWwgc3RhdGUuXG5cdFx0XHRcdFx0cmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1zdGFydGVkJyk7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuIGEgZmlsZSBpcyBhZGRlZCB0byB0aGUgcXVldWVcblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWBcblx0XHRcdFx0XHRhZGRlZGZpbGU6IGZ1bmN0aW9uIGFkZGVkZmlsZShmaWxlKSB7XG5cdFx0XHRcdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZWxlbWVudCA9PT0gdGhpcy5wcmV2aWV3c0NvbnRhaW5lcikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotc3RhcnRlZCcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5wcmV2aWV3c0NvbnRhaW5lcikge1xuXHRcdFx0XHRcdFx0XHRmaWxlLnByZXZpZXdFbGVtZW50ID0gRHJvcHpvbmUuY3JlYXRlRWxlbWVudCh0aGlzLm9wdGlvbnMucHJldmlld1RlbXBsYXRlLnRyaW0oKSk7XG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld1RlbXBsYXRlID0gZmlsZS5wcmV2aWV3RWxlbWVudDsgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblxuXHRcdFx0XHRcdFx0XHR0aGlzLnByZXZpZXdzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbGUucHJldmlld0VsZW1lbnQpO1xuXHRcdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IzID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei1uYW1lXScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkzID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pMyA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IzID0gX2lzQXJyYXkzID8gX2l0ZXJhdG9yMyA6IF9pdGVyYXRvcjNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjM7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kzID49IF9pdGVyYXRvcjMubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWYzID0gX2l0ZXJhdG9yM1tfaTMrK107XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pMyA9IF9pdGVyYXRvcjMubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMy5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWYzID0gX2kzLnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdHZhciBub2RlID0gX3JlZjM7XG5cblx0XHRcdFx0XHRcdFx0XHRub2RlLnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjQgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LXNpemVdJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTQgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2k0ID0gMCxcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjQgPSBfaXNBcnJheTQgPyBfaXRlcmF0b3I0IDogX2l0ZXJhdG9yNFtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTQgPj0gX2l0ZXJhdG9yNC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0bm9kZSA9IF9pdGVyYXRvcjRbX2k0KytdO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRfaTQgPSBfaXRlcmF0b3I0Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTQuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRub2RlID0gX2k0LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdG5vZGUuaW5uZXJIVE1MID0gdGhpcy5maWxlc2l6ZShmaWxlLnNpemUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5hZGRSZW1vdmVMaW5rcykge1xuXHRcdFx0XHRcdFx0XHRcdGZpbGUuX3JlbW92ZUxpbmsgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0XHRcdFx0JzxhIGNsYXNzPVwiZHotcmVtb3ZlXCIgaHJlZj1cImphdmFzY3JpcHQ6dW5kZWZpbmVkO1wiIGRhdGEtZHotcmVtb3ZlPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGUgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9hPidcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoZmlsZS5fcmVtb3ZlTGluayk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHR2YXIgcmVtb3ZlRmlsZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRmlsZUV2ZW50KGUpIHtcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORykge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIERyb3B6b25lLmNvbmZpcm0oX3RoaXMyLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczIucmVtb3ZlRmlsZShmaWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMyLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24pIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIERyb3B6b25lLmNvbmZpcm0oX3RoaXMyLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczIucmVtb3ZlRmlsZShmaWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLnJlbW92ZUZpbGUoZmlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjUgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LXJlbW92ZV0nKSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5NSA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTUgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yNSA9IF9pc0FycmF5NSA/IF9pdGVyYXRvcjUgOiBfaXRlcmF0b3I1W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWY0O1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5NSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNSA+PSBfaXRlcmF0b3I1Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNCA9IF9pdGVyYXRvcjVbX2k1KytdO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRfaTUgPSBfaXRlcmF0b3I1Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTUuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNCA9IF9pNS52YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVtb3ZlTGluayA9IF9yZWY0O1xuXG5cdFx0XHRcdFx0XHRcdFx0cmVtb3ZlTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUZpbGVFdmVudCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIGEgZmlsZSBpcyByZW1vdmVkLlxuXHRcdFx0XHRcdHJlbW92ZWRmaWxlOiBmdW5jdGlvbiByZW1vdmVkZmlsZShmaWxlKSB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCAhPSBudWxsICYmIGZpbGUucHJldmlld0VsZW1lbnQucGFyZW50Tm9kZSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmaWxlLnByZXZpZXdFbGVtZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcygpO1xuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbiBhIHRodW1ibmFpbCBoYXMgYmVlbiBnZW5lcmF0ZWRcblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWAgYW5kIGBkYXRhVXJsYFxuXHRcdFx0XHRcdHRodW1ibmFpbDogZnVuY3Rpb24gdGh1bWJuYWlsKGZpbGUsIGRhdGFVcmwpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotZmlsZS1wcmV2aWV3Jyk7XG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjYgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LXRodW1ibmFpbF0nKSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5NiA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTYgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yNiA9IF9pc0FycmF5NiA/IF9pdGVyYXRvcjYgOiBfaXRlcmF0b3I2W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWY1O1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5Nikge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNiA+PSBfaXRlcmF0b3I2Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNSA9IF9pdGVyYXRvcjZbX2k2KytdO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRfaTYgPSBfaXRlcmF0b3I2Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTYuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNSA9IF9pNi52YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgdGh1bWJuYWlsRWxlbWVudCA9IF9yZWY1O1xuXG5cdFx0XHRcdFx0XHRcdFx0dGh1bWJuYWlsRWxlbWVudC5hbHQgPSBmaWxlLm5hbWU7XG5cdFx0XHRcdFx0XHRcdFx0dGh1bWJuYWlsRWxlbWVudC5zcmMgPSBkYXRhVXJsO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotaW1hZ2UtcHJldmlldycpO1xuXHRcdFx0XHRcdFx0XHR9LCAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIGFuIGVycm9yIG9jY3Vyc1xuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYCBhbmQgYG1lc3NhZ2VgXG5cdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGZpbGUsIG1lc3NhZ2UpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotZXJyb3InKTtcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnU3RyaW5nJyAmJiBtZXNzYWdlLmVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZSA9IG1lc3NhZ2UuZXJyb3I7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yNyA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHotZXJyb3JtZXNzYWdlXScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXk3ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pNyA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I3ID0gX2lzQXJyYXk3ID8gX2l0ZXJhdG9yNyA6IF9pdGVyYXRvcjdbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjY7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXk3KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k3ID49IF9pdGVyYXRvcjcubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY2ID0gX2l0ZXJhdG9yN1tfaTcrK107XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pNyA9IF9pdGVyYXRvcjcubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNy5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY2ID0gX2k3LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdHZhciBub2RlID0gX3JlZjY7XG5cblx0XHRcdFx0XHRcdFx0XHRub2RlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3JtdWx0aXBsZTogZnVuY3Rpb24gZXJyb3JtdWx0aXBsZSgpIHt9LFxuXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW4gYSBmaWxlIGdldHMgcHJvY2Vzc2VkLiBTaW5jZSB0aGVyZSBpcyBhIGN1ZSwgbm90IGFsbCBhZGRlZFxuXHRcdFx0XHRcdC8vIGZpbGVzIGFyZSBwcm9jZXNzZWQgaW1tZWRpYXRlbHkuXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgXG5cdFx0XHRcdFx0cHJvY2Vzc2luZzogZnVuY3Rpb24gcHJvY2Vzc2luZyhmaWxlKSB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LXByb2Nlc3NpbmcnKTtcblx0XHRcdFx0XHRcdFx0aWYgKGZpbGUuX3JlbW92ZUxpbmspIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKGZpbGUuX3JlbW92ZUxpbmsudGV4dENvbnRlbnQgPSB0aGlzLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHByb2Nlc3NpbmdtdWx0aXBsZTogZnVuY3Rpb24gcHJvY2Vzc2luZ211bHRpcGxlKCkge30sXG5cblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbmV2ZXIgdGhlIHVwbG9hZCBwcm9ncmVzcyBnZXRzIHVwZGF0ZWQuXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgLCBgcHJvZ3Jlc3NgIChwZXJjZW50YWdlIDAtMTAwKSBhbmQgYGJ5dGVzU2VudGAuXG5cdFx0XHRcdFx0Ly8gVG8gZ2V0IHRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgb2YgdGhlIGZpbGUsIHVzZSBgZmlsZS5zaXplYFxuXHRcdFx0XHRcdHVwbG9hZHByb2dyZXNzOiBmdW5jdGlvbiB1cGxvYWRwcm9ncmVzcyhmaWxlLCBwcm9ncmVzcywgYnl0ZXNTZW50KSB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3I4ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei11cGxvYWRwcm9ncmVzc10nKSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5OCA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTggPSAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yOCA9IF9pc0FycmF5OCA/IF9pdGVyYXRvcjggOiBfaXRlcmF0b3I4W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWY3O1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5OCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pOCA+PSBfaXRlcmF0b3I4Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNyA9IF9pdGVyYXRvcjhbX2k4KytdO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRfaTggPSBfaXRlcmF0b3I4Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTguZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNyA9IF9pOC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgbm9kZSA9IF9yZWY3O1xuXG5cdFx0XHRcdFx0XHRcdFx0bm9kZS5ub2RlTmFtZSA9PT0gJ1BST0dSRVNTJyA/IChub2RlLnZhbHVlID0gcHJvZ3Jlc3MpIDogKG5vZGUuc3R5bGUud2lkdGggPSBwcm9ncmVzcyArICclJyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIHRoZSB0b3RhbCB1cGxvYWQgcHJvZ3Jlc3MgZ2V0cyB1cGRhdGVkLlxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aXRoIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgKDAtMTAwKSwgdG90YWxCeXRlcyBhbmQgdG90YWxCeXRlc1NlbnRcblx0XHRcdFx0XHR0b3RhbHVwbG9hZHByb2dyZXNzOiBmdW5jdGlvbiB0b3RhbHVwbG9hZHByb2dyZXNzKCkge30sXG5cblx0XHRcdFx0XHQvLyBDYWxsZWQganVzdCBiZWZvcmUgdGhlIGZpbGUgaXMgc2VudC4gR2V0cyB0aGUgYHhocmAgb2JqZWN0IGFzIHNlY29uZFxuXHRcdFx0XHRcdC8vIHBhcmFtZXRlciwgc28geW91IGNhbiBtb2RpZnkgaXQgKGZvciBleGFtcGxlIHRvIGFkZCBhIENTUkYgdG9rZW4pIGFuZCBhXG5cdFx0XHRcdFx0Ly8gYGZvcm1EYXRhYCBvYmplY3QgdG8gYWRkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG5cdFx0XHRcdFx0c2VuZGluZzogZnVuY3Rpb24gc2VuZGluZygpIHt9LFxuXHRcdFx0XHRcdHNlbmRpbmdtdWx0aXBsZTogZnVuY3Rpb24gc2VuZGluZ211bHRpcGxlKCkge30sXG5cblx0XHRcdFx0XHQvLyBXaGVuIHRoZSBjb21wbGV0ZSB1cGxvYWQgaXMgZmluaXNoZWQgYW5kIHN1Y2Nlc3NmdWxcblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWBcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGZpbGUpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LXN1Y2Nlc3MnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHN1Y2Nlc3NtdWx0aXBsZTogZnVuY3Rpb24gc3VjY2Vzc211bHRpcGxlKCkge30sXG5cblx0XHRcdFx0XHQvLyBXaGVuIHRoZSB1cGxvYWQgaXMgY2FuY2VsZWQuXG5cdFx0XHRcdFx0Y2FuY2VsZWQ6IGZ1bmN0aW9uIGNhbmNlbGVkKGZpbGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgZmlsZSwgJ1VwbG9hZCBjYW5jZWxlZC4nKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNhbmNlbGVkbXVsdGlwbGU6IGZ1bmN0aW9uIGNhbmNlbGVkbXVsdGlwbGUoKSB7fSxcblxuXHRcdFx0XHRcdC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBmaW5pc2hlZCwgZWl0aGVyIHdpdGggc3VjY2VzcyBvciBhbiBlcnJvci5cblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWBcblx0XHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoZmlsZSkge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGUuX3JlbW92ZUxpbmspIHtcblx0XHRcdFx0XHRcdFx0ZmlsZS5fcmVtb3ZlTGluay50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LWNvbXBsZXRlJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRjb21wbGV0ZW11bHRpcGxlOiBmdW5jdGlvbiBjb21wbGV0ZW11bHRpcGxlKCkge30sXG5cdFx0XHRcdFx0bWF4ZmlsZXNleGNlZWRlZDogZnVuY3Rpb24gbWF4ZmlsZXNleGNlZWRlZCgpIHt9LFxuXHRcdFx0XHRcdG1heGZpbGVzcmVhY2hlZDogZnVuY3Rpb24gbWF4ZmlsZXNyZWFjaGVkKCkge30sXG5cdFx0XHRcdFx0cXVldWVjb21wbGV0ZTogZnVuY3Rpb24gcXVldWVjb21wbGV0ZSgpIHt9LFxuXHRcdFx0XHRcdGFkZGVkZmlsZXM6IGZ1bmN0aW9uIGFkZGVkZmlsZXMoKSB7fSxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5fdGh1bWJuYWlsUXVldWUgPSBbXTtcblx0XHRcdFx0dGhpcy5wcm90b3R5cGUuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSBmYWxzZTtcblx0XHRcdH0sXG5cblx0XHRcdC8vIGdsb2JhbCB1dGlsaXR5XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdleHRlbmQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcblx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHR2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBvYmplY3RzID0gQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTtcblx0XHRcdFx0XHRfa2V5MiA8IF9sZW4yO1xuXHRcdFx0XHRcdF9rZXkyKytcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0b2JqZWN0c1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjkgPSBvYmplY3RzLFxuXHRcdFx0XHRcdFx0X2lzQXJyYXk5ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdF9pOSA9IDAsXG5cdFx0XHRcdFx0XHRfaXRlcmF0b3I5ID0gX2lzQXJyYXk5ID8gX2l0ZXJhdG9yOSA6IF9pdGVyYXRvcjlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHR2YXIgX3JlZjg7XG5cblx0XHRcdFx0XHRpZiAoX2lzQXJyYXk5KSB7XG5cdFx0XHRcdFx0XHRpZiAoX2k5ID49IF9pdGVyYXRvcjkubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdF9yZWY4ID0gX2l0ZXJhdG9yOVtfaTkrK107XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF9pOSA9IF9pdGVyYXRvcjkubmV4dCgpO1xuXHRcdFx0XHRcdFx0aWYgKF9pOS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdF9yZWY4ID0gX2k5LnZhbHVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBvYmplY3QgPSBfcmVmODtcblxuXHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcblx0XHRcdFx0XHRcdHZhciB2YWwgPSBvYmplY3Rba2V5XTtcblx0XHRcdFx0XHRcdHRhcmdldFtrZXldID0gdmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdFx0fSxcblx0XHR9LFxuXHRdKTtcblxuXHRmdW5jdGlvbiBEcm9wem9uZShlbCwgb3B0aW9ucykge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEcm9wem9uZSk7XG5cblx0XHR2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRHJvcHpvbmUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wem9uZSkpLmNhbGwodGhpcykpO1xuXG5cdFx0dmFyIGZhbGxiYWNrID0gdm9pZCAwLFxuXHRcdFx0bGVmdCA9IHZvaWQgMDtcblx0XHRfdGhpcy5lbGVtZW50ID0gZWw7XG5cdFx0Ly8gRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHNpbmNlIHRoZSB2ZXJzaW9uIHdhcyBpbiB0aGUgcHJvdG90eXBlIHByZXZpb3VzbHlcblx0XHRfdGhpcy52ZXJzaW9uID0gRHJvcHpvbmUudmVyc2lvbjtcblxuXHRcdF90aGlzLmRlZmF1bHRPcHRpb25zLnByZXZpZXdUZW1wbGF0ZSA9IF90aGlzLmRlZmF1bHRPcHRpb25zLnByZXZpZXdUZW1wbGF0ZS5yZXBsYWNlKC9cXG4qL2csICcnKTtcblxuXHRcdF90aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gW107XG5cdFx0X3RoaXMubGlzdGVuZXJzID0gW107XG5cdFx0X3RoaXMuZmlsZXMgPSBbXTsgLy8gQWxsIGZpbGVzXG5cblx0XHRpZiAodHlwZW9mIF90aGlzLmVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRfdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihfdGhpcy5lbGVtZW50KTtcblx0XHR9XG5cblx0XHQvLyBOb3QgY2hlY2tpbmcgaWYgaW5zdGFuY2Ugb2YgSFRNTEVsZW1lbnQgb3IgRWxlbWVudCBzaW5jZSBJRTkgaXMgZXh0cmVtZWx5IHdlaXJkLlxuXHRcdGlmICghX3RoaXMuZWxlbWVudCB8fCBfdGhpcy5lbGVtZW50Lm5vZGVUeXBlID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkcm9wem9uZSBlbGVtZW50LicpO1xuXHRcdH1cblxuXHRcdGlmIChfdGhpcy5lbGVtZW50LmRyb3B6b25lKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Ryb3B6b25lIGFscmVhZHkgYXR0YWNoZWQuJyk7XG5cdFx0fVxuXG5cdFx0Ly8gTm93IGFkZCB0aGlzIGRyb3B6b25lIHRvIHRoZSBpbnN0YW5jZXMuXG5cdFx0RHJvcHpvbmUuaW5zdGFuY2VzLnB1c2goX3RoaXMpO1xuXG5cdFx0Ly8gUHV0IHRoZSBkcm9wem9uZSBpbnNpZGUgdGhlIGVsZW1lbnQgaXRzZWxmLlxuXHRcdF90aGlzLmVsZW1lbnQuZHJvcHpvbmUgPSBfdGhpcztcblxuXHRcdHZhciBlbGVtZW50T3B0aW9ucyA9IChsZWZ0ID0gRHJvcHpvbmUub3B0aW9uc0ZvckVsZW1lbnQoX3RoaXMuZWxlbWVudCkpICE9IG51bGwgPyBsZWZ0IDoge307XG5cblx0XHRfdGhpcy5vcHRpb25zID0gRHJvcHpvbmUuZXh0ZW5kKHt9LCBfdGhpcy5kZWZhdWx0T3B0aW9ucywgZWxlbWVudE9wdGlvbnMsIG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMgOiB7fSk7XG5cblx0XHQvLyBJZiB0aGUgYnJvd3NlciBmYWlsZWQsIGp1c3QgY2FsbCB0aGUgZmFsbGJhY2sgYW5kIGxlYXZlXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMuZm9yY2VGYWxsYmFjayB8fCAhRHJvcHpvbmUuaXNCcm93c2VyU3VwcG9ydGVkKCkpIHtcblx0XHRcdHZhciBfcmV0O1xuXG5cdFx0XHRyZXR1cm4gKF9yZXQgPSBfdGhpcy5vcHRpb25zLmZhbGxiYWNrLmNhbGwoX3RoaXMpKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuXHRcdH1cblxuXHRcdC8vIEBvcHRpb25zLnVybCA9IEBlbGVtZW50LmdldEF0dHJpYnV0ZSBcImFjdGlvblwiIHVubGVzcyBAb3B0aW9ucy51cmw/XG5cdFx0aWYgKF90aGlzLm9wdGlvbnMudXJsID09IG51bGwpIHtcblx0XHRcdF90aGlzLm9wdGlvbnMudXJsID0gX3RoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FjdGlvbicpO1xuXHRcdH1cblxuXHRcdGlmICghX3RoaXMub3B0aW9ucy51cmwpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTm8gVVJMIHByb3ZpZGVkLicpO1xuXHRcdH1cblxuXHRcdGlmIChfdGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMgJiYgX3RoaXMub3B0aW9ucy5hY2NlcHRlZE1pbWVUeXBlcykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcIllvdSBjYW4ndCBwcm92aWRlIGJvdGggJ2FjY2VwdGVkRmlsZXMnIGFuZCAnYWNjZXB0ZWRNaW1lVHlwZXMnLiAnYWNjZXB0ZWRNaW1lVHlwZXMnIGlzIGRlcHJlY2F0ZWQuXCJcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUgJiYgX3RoaXMub3B0aW9ucy5jaHVua2luZykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IHNldCBib3RoOiB1cGxvYWRNdWx0aXBsZSBhbmQgY2h1bmtpbmcuJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5hY2NlcHRlZE1pbWVUeXBlcykge1xuXHRcdFx0X3RoaXMub3B0aW9ucy5hY2NlcHRlZEZpbGVzID0gX3RoaXMub3B0aW9ucy5hY2NlcHRlZE1pbWVUeXBlcztcblx0XHRcdGRlbGV0ZSBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzO1xuXHRcdH1cblxuXHRcdC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5cdFx0aWYgKF90aGlzLm9wdGlvbnMucmVuYW1lRmlsZW5hbWUgIT0gbnVsbCkge1xuXHRcdFx0X3RoaXMub3B0aW9ucy5yZW5hbWVGaWxlID0gZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRyZXR1cm4gX3RoaXMub3B0aW9ucy5yZW5hbWVGaWxlbmFtZS5jYWxsKF90aGlzLCBmaWxlLm5hbWUsIGZpbGUpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRfdGhpcy5vcHRpb25zLm1ldGhvZCA9IF90aGlzLm9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cblx0XHRpZiAoKGZhbGxiYWNrID0gX3RoaXMuZ2V0RXhpc3RpbmdGYWxsYmFjaygpKSAmJiBmYWxsYmFjay5wYXJlbnROb2RlKSB7XG5cdFx0XHQvLyBSZW1vdmUgdGhlIGZhbGxiYWNrXG5cdFx0XHRmYWxsYmFjay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZhbGxiYWNrKTtcblx0XHR9XG5cblx0XHQvLyBEaXNwbGF5IHByZXZpZXdzIGluIHRoZSBwcmV2aWV3c0NvbnRhaW5lciBlbGVtZW50IG9yIHRoZSBEcm9wem9uZSBlbGVtZW50IHVubGVzcyBleHBsaWNpdGx5IHNldCB0byBmYWxzZVxuXHRcdGlmIChfdGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyICE9PSBmYWxzZSkge1xuXHRcdFx0aWYgKF90aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIpIHtcblx0XHRcdFx0X3RoaXMucHJldmlld3NDb250YWluZXIgPSBEcm9wem9uZS5nZXRFbGVtZW50KF90aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIsICdwcmV2aWV3c0NvbnRhaW5lcicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X3RoaXMucHJldmlld3NDb250YWluZXIgPSBfdGhpcy5lbGVtZW50O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChfdGhpcy5vcHRpb25zLmNsaWNrYWJsZSkge1xuXHRcdFx0aWYgKF90aGlzLm9wdGlvbnMuY2xpY2thYmxlID09PSB0cnVlKSB7XG5cdFx0XHRcdF90aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gW190aGlzLmVsZW1lbnRdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X3RoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBEcm9wem9uZS5nZXRFbGVtZW50cyhfdGhpcy5vcHRpb25zLmNsaWNrYWJsZSwgJ2NsaWNrYWJsZScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdF90aGlzLmluaXQoKTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHQvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGhhdmUgYmVlbiBhY2NlcHRlZFxuXG5cdF9jcmVhdGVDbGFzcyhcblx0XHREcm9wem9uZSxcblx0XHRbXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2dldEFjY2VwdGVkRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0QWNjZXB0ZWRGaWxlcygpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maWxlc1xuXHRcdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLmFjY2VwdGVkO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFJldHVybnMgYWxsIGZpbGVzIHRoYXQgaGF2ZSBiZWVuIHJlamVjdGVkXG5cdFx0XHRcdC8vIE5vdCBzdXJlIHdoZW4gdGhhdCdzIGdvaW5nIHRvIGJlIHVzZWZ1bCwgYnV0IGFkZGVkIGZvciBjb21wbGV0ZW5lc3MuXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdnZXRSZWplY3RlZEZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFJlamVjdGVkRmlsZXMoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZmlsZXNcblx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gIWZpbGUuYWNjZXB0ZWQ7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdnZXRGaWxlc1dpdGhTdGF0dXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0RmlsZXNXaXRoU3RhdHVzKHN0YXR1cykge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbGVzXG5cdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUuc3RhdHVzID09PSBzdGF0dXM7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBhcmUgaW4gdGhlIHF1ZXVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdnZXRRdWV1ZWRGaWxlcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRRdWV1ZWRGaWxlcygpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoRHJvcHpvbmUuUVVFVUVEKTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2dldFVwbG9hZGluZ0ZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFVwbG9hZGluZ0ZpbGVzKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cyhEcm9wem9uZS5VUExPQURJTkcpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZ2V0QWRkZWRGaWxlcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRBZGRlZEZpbGVzKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cyhEcm9wem9uZS5BRERFRCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gRmlsZXMgdGhhdCBhcmUgZWl0aGVyIHF1ZXVlZCBvciB1cGxvYWRpbmdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2dldEFjdGl2ZUZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEFjdGl2ZUZpbGVzKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbGVzXG5cdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUuc3RhdHVzID09PSBEcm9wem9uZS5VUExPQURJTkcgfHwgZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlFVRVVFRDtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGU7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCB3aGVuIERyb3B6b25lIGlzIGluaXRpYWxpemVkLiBZb3Vcblx0XHRcdFx0Ly8gY2FuIChhbmQgc2hvdWxkKSBzZXR1cCBldmVudCBsaXN0ZW5lcnMgaW5zaWRlIHRoaXMgZnVuY3Rpb24uXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdpbml0Jyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRcdFx0XHQvLyBJbiBjYXNlIGl0IGlzbid0IHNldCBhbHJlYWR5XG5cdFx0XHRcdFx0aWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSAnZm9ybScpIHtcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2VuY3R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wem9uZScpICYmICF0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR6LW1lc3NhZ2UnKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKFxuXHRcdFx0XHRcdFx0XHREcm9wem9uZS5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZHotZGVmYXVsdCBkei1tZXNzYWdlXCI+PHNwYW4+JyArIHRoaXMub3B0aW9ucy5kaWN0RGVmYXVsdE1lc3NhZ2UgKyAnPC9zcGFuPjwvZGl2Pidcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5jbGlja2FibGVFbGVtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHZhciBzZXR1cEhpZGRlbkZpbGVJbnB1dCA9IGZ1bmN0aW9uIHNldHVwSGlkZGVuRmlsZUlucHV0KCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLmhpZGRlbkZpbGVJbnB1dCkge1xuXHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfdGhpczMuaGlkZGVuRmlsZUlucHV0KTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIHZhciBkcm9wWm9uZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmR6LWhpZGRlbi1pbnB1dCcpO1xuXHRcdFx0XHRcdFx0XHQvLyBpZiAoZHJvcFpvbmVJbnB1dCkgeyBkcm9wWm9uZUlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSkgfTtcblxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZmlsZScpO1xuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLm9wdGlvbnMubWF4RmlsZXMgPT09IG51bGwgfHwgX3RoaXMzLm9wdGlvbnMubWF4RmlsZXMgPiAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ211bHRpcGxlJywgJ211bHRpcGxlJyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5jbGFzc05hbWUgPSAnZHotaGlkZGVuLWlucHV0JztcblxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKCdhY2NlcHQnLCBfdGhpczMub3B0aW9ucy5hY2NlcHRlZEZpbGVzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLm9wdGlvbnMuY2FwdHVyZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKCdjYXB0dXJlJywgX3RoaXMzLm9wdGlvbnMuY2FwdHVyZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBOb3Qgc2V0dGluZyBgZGlzcGxheT1cIm5vbmVcImAgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGRvbid0IGFjY2VwdCBjbGlja3Ncblx0XHRcdFx0XHRcdFx0Ly8gb24gZWxlbWVudHMgdGhhdCBhcmVuJ3QgZGlzcGxheWVkLlxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUudG9wID0gJzAnO1xuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLmxlZnQgPSAnMCc7XG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUuaGVpZ2h0ID0gJzAnO1xuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLndpZHRoID0gJzAnO1xuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKF90aGlzMy5vcHRpb25zLmhpZGRlbklucHV0Q29udGFpbmVyKS5hcHBlbmRDaGlsZChfdGhpczMuaGlkZGVuRmlsZUlucHV0KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGZpbGVzID0gX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5maWxlcztcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChmaWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxMCA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTAgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9pMTAgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjEwID0gX2lzQXJyYXkxMCA/IF9pdGVyYXRvcjEwIDogX2l0ZXJhdG9yMTBbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxMCA+PSBfaXRlcmF0b3IxMC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWY5ID0gX2l0ZXJhdG9yMTBbX2kxMCsrXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfaTEwID0gX2l0ZXJhdG9yMTAubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTEwLmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWY5ID0gX2kxMC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmFkZEZpbGUoZmlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdF90aGlzMy5lbWl0KCdhZGRlZGZpbGVzJywgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuVVJMID0gd2luZG93LlVSTCAhPT0gbnVsbCA/IHdpbmRvdy5VUkwgOiB3aW5kb3cud2Via2l0VVJMO1xuXG5cdFx0XHRcdFx0Ly8gU2V0dXAgYWxsIGV2ZW50IGxpc3RlbmVycyBvbiB0aGUgRHJvcHpvbmUgb2JqZWN0IGl0c2VsZi5cblx0XHRcdFx0XHQvLyBUaGV5J3JlIG5vdCBpbiBAc2V0dXBFdmVudExpc3RlbmVycygpIGJlY2F1c2UgdGhleSBzaG91bGRuJ3QgYmUgcmVtb3ZlZFxuXHRcdFx0XHRcdC8vIGFnYWluIHdoZW4gdGhlIGRyb3B6b25lIGdldHMgZGlzYWJsZWQuXG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxMSA9IHRoaXMuZXZlbnRzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTExID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kxMSA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjExID0gX2lzQXJyYXkxMSA/IF9pdGVyYXRvcjExIDogX2l0ZXJhdG9yMTFbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjEwO1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxMSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kxMSA+PSBfaXRlcmF0b3IxMS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMTAgPSBfaXRlcmF0b3IxMVtfaTExKytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kxMSA9IF9pdGVyYXRvcjExLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTEuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYxMCA9IF9pMTEudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBldmVudE5hbWUgPSBfcmVmMTA7XG5cblx0XHRcdFx0XHRcdHRoaXMub24oZXZlbnROYW1lLCB0aGlzLm9wdGlvbnNbZXZlbnROYW1lXSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5vbigndXBsb2FkcHJvZ3Jlc3MnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMudXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5vbigncmVtb3ZlZGZpbGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMudXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5vbignY2FuY2VsZWQnLCBmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmVtaXQoJ2NvbXBsZXRlJywgZmlsZSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBFbWl0IGEgYHF1ZXVlY29tcGxldGVgIGV2ZW50IGlmIGFsbCBmaWxlcyBmaW5pc2hlZCB1cGxvYWRpbmcuXG5cdFx0XHRcdFx0dGhpcy5vbignY29tcGxldGUnLCBmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5nZXRBZGRlZEZpbGVzKCkubGVuZ3RoID09PSAwICYmXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aCA9PT0gMCAmJlxuXHRcdFx0XHRcdFx0XHRfdGhpczMuZ2V0UXVldWVkRmlsZXMoKS5sZW5ndGggPT09IDBcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIG5lZWRzIHRvIGJlIGRlZmVycmVkIHNvIHRoYXQgYHF1ZXVlY29tcGxldGVgIHJlYWxseSB0cmlnZ2VycyBhZnRlciBgY29tcGxldGVgXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgncXVldWVjb21wbGV0ZScpO1xuXHRcdFx0XHRcdFx0XHR9LCAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHZhciBub1Byb3BhZ2F0aW9uID0gZnVuY3Rpb24gbm9Qcm9wYWdhdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0aWYgKGUucHJldmVudERlZmF1bHQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAoZS5yZXR1cm5WYWx1ZSA9IGZhbHNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSBsaXN0ZW5lcnNcblx0XHRcdFx0XHR0aGlzLmxpc3RlbmVycyA9IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogdGhpcy5lbGVtZW50LFxuXHRcdFx0XHRcdFx0XHRldmVudHM6IHtcblx0XHRcdFx0XHRcdFx0XHRkcmFnc3RhcnQ6IGZ1bmN0aW9uIGRyYWdzdGFydChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmVtaXQoJ2RyYWdzdGFydCcsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ2VudGVyOiBmdW5jdGlvbiBkcmFnZW50ZXIoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bm9Qcm9wYWdhdGlvbihlKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ2VudGVyJywgZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRkcmFnb3ZlcjogZnVuY3Rpb24gZHJhZ292ZXIoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gTWFrZXMgaXQgcG9zc2libGUgdG8gZHJhZyBmaWxlcyBmcm9tIGNocm9tZSdzIGRvd25sb2FkIGJhclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTUyNjQzMC9kcmFnLWFuZC1kcm9wLWZpbGUtdXBsb2Fkcy1mcm9tLWNocm9tZS1kb3dubG9hZHMtYmFyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBUcnkgaXMgcmVxdWlyZWQgdG8gcHJldmVudCBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTEgKFNDUklQVDY1NTM1IGV4Y2VwdGlvbilcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBlZmN0ID0gdm9pZCAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWZjdCA9IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge31cblx0XHRcdFx0XHRcdFx0XHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZScgPT09IGVmY3QgfHwgJ2xpbmtNb3ZlJyA9PT0gZWZjdCA/ICdtb3ZlJyA6ICdjb3B5JztcblxuXHRcdFx0XHRcdFx0XHRcdFx0bm9Qcm9wYWdhdGlvbihlKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ292ZXInLCBlKTtcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGRyYWdsZWF2ZTogZnVuY3Rpb24gZHJhZ2xlYXZlKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ2xlYXZlJywgZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRkcm9wOiBmdW5jdGlvbiBkcm9wKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG5vUHJvcGFnYXRpb24oZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmRyb3AoZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRkcmFnZW5kOiBmdW5jdGlvbiBkcmFnZW5kKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ2VuZCcsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGRpc2FibGVkIHJpZ2h0IG5vdywgYmVjYXVzZSB0aGUgYnJvd3NlcnMgZG9uJ3QgaW1wbGVtZW50IGl0IHByb3Blcmx5LlxuXHRcdFx0XHRcdFx0XHRcdC8vIFwicGFzdGVcIjogKGUpID0+XG5cdFx0XHRcdFx0XHRcdFx0Ly8gICBub1Byb3BhZ2F0aW9uIGVcblx0XHRcdFx0XHRcdFx0XHQvLyAgIEBwYXN0ZSBlXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdF07XG5cblx0XHRcdFx0XHR0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oY2xpY2thYmxlRWxlbWVudCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5saXN0ZW5lcnMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQ6IGNsaWNrYWJsZUVsZW1lbnQsXG5cdFx0XHRcdFx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHRcdFx0XHRcdGNsaWNrOiBmdW5jdGlvbiBjbGljayhldnQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIE9ubHkgdGhlIGFjdHVhbCBkcm9wem9uZSBvciB0aGUgbWVzc2FnZSBlbGVtZW50IHNob3VsZCB0cmlnZ2VyIGZpbGUgc2VsZWN0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsaWNrYWJsZUVsZW1lbnQgIT09IF90aGlzMy5lbGVtZW50IHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGV2dC50YXJnZXQgPT09IF90aGlzMy5lbGVtZW50IHx8XG5cdFx0XHRcdFx0XHRcdFx0XHRcdERyb3B6b25lLmVsZW1lbnRJbnNpZGUoZXZ0LnRhcmdldCwgX3RoaXMzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR6LW1lc3NhZ2UnKSlcblx0XHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LmNsaWNrKCk7IC8vIEZvcndhcmQgdGhlIGNsaWNrXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR0aGlzLmVuYWJsZSgpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5pbml0LmNhbGwodGhpcyk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gTm90IGZ1bGx5IHRlc3RlZCB5ZXRcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2Rlc3Ryb3knLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0XHRcdFx0XHR0aGlzLmRpc2FibGUoKTtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZUFsbEZpbGVzKHRydWUpO1xuXHRcdFx0XHRcdGlmICh0aGlzLmhpZGRlbkZpbGVJbnB1dCAhPSBudWxsID8gdGhpcy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZSA6IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0dGhpcy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmhpZGRlbkZpbGVJbnB1dCk7XG5cdFx0XHRcdFx0XHR0aGlzLmhpZGRlbkZpbGVJbnB1dCA9IG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQuZHJvcHpvbmU7XG5cdFx0XHRcdFx0cmV0dXJuIERyb3B6b25lLmluc3RhbmNlcy5zcGxpY2UoRHJvcHpvbmUuaW5zdGFuY2VzLmluZGV4T2YodGhpcyksIDEpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAndXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCkge1xuXHRcdFx0XHRcdHZhciB0b3RhbFVwbG9hZFByb2dyZXNzID0gdm9pZCAwO1xuXHRcdFx0XHRcdHZhciB0b3RhbEJ5dGVzU2VudCA9IDA7XG5cdFx0XHRcdFx0dmFyIHRvdGFsQnl0ZXMgPSAwO1xuXG5cdFx0XHRcdFx0dmFyIGFjdGl2ZUZpbGVzID0gdGhpcy5nZXRBY3RpdmVGaWxlcygpO1xuXG5cdFx0XHRcdFx0aWYgKGFjdGl2ZUZpbGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjEyID0gdGhpcy5nZXRBY3RpdmVGaWxlcygpLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTIgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMTIgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjEyID0gX2lzQXJyYXkxMiA/IF9pdGVyYXRvcjEyIDogX2l0ZXJhdG9yMTJbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjExO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTEyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTIgPj0gX2l0ZXJhdG9yMTIubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTEgPSBfaXRlcmF0b3IxMltfaTEyKytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMTIgPSBfaXRlcmF0b3IxMi5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTIuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjExID0gX2kxMi52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjExO1xuXG5cdFx0XHRcdFx0XHRcdHRvdGFsQnl0ZXNTZW50ICs9IGZpbGUudXBsb2FkLmJ5dGVzU2VudDtcblx0XHRcdFx0XHRcdFx0dG90YWxCeXRlcyArPSBmaWxlLnVwbG9hZC50b3RhbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSAoMTAwICogdG90YWxCeXRlc1NlbnQpIC8gdG90YWxCeXRlcztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dG90YWxVcGxvYWRQcm9ncmVzcyA9IDEwMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbWl0KCd0b3RhbHVwbG9hZHByb2dyZXNzJywgdG90YWxVcGxvYWRQcm9ncmVzcywgdG90YWxCeXRlcywgdG90YWxCeXRlc1NlbnQpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEBvcHRpb25zLnBhcmFtTmFtZSBjYW4gYmUgYSBmdW5jdGlvbiB0YWtpbmcgb25lIHBhcmFtZXRlciByYXRoZXIgdGhhbiBhIHN0cmluZy5cblx0XHRcdFx0Ly8gQSBwYXJhbWV0ZXIgbmFtZSBmb3IgYSBmaWxlIGlzIG9idGFpbmVkIHNpbXBseSBieSBjYWxsaW5nIHRoaXMgd2l0aCBhbiBpbmRleCBudW1iZXIuXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfZ2V0UGFyYW1OYW1lJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9nZXRQYXJhbU5hbWUobikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnBhcmFtTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUobik7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiAnJyArIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUgKyAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gJ1snICsgbiArICddJyA6ICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gSWYgQG9wdGlvbnMucmVuYW1lRmlsZSBpcyBhIGZ1bmN0aW9uLFxuXHRcdFx0XHQvLyB0aGUgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIHRvIHJlbmFtZSB0aGUgZmlsZS5uYW1lIGJlZm9yZSBhcHBlbmRpbmcgaXQgdG8gdGhlIGZvcm1EYXRhXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfcmVuYW1lRmlsZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfcmVuYW1lRmlsZShmaWxlKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucmVuYW1lRmlsZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUubmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlKGZpbGUpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFJldHVybnMgYSBmb3JtIHRoYXQgY2FuIGJlIHVzZWQgYXMgZmFsbGJhY2sgaWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBEcmFnbkRyb3Bcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gSWYgdGhlIGRyb3B6b25lIGlzIGFscmVhZHkgYSBmb3JtLCBvbmx5IHRoZSBpbnB1dCBmaWVsZCBhbmQgYnV0dG9uIGFyZSByZXR1cm5lZC4gT3RoZXJ3aXNlIGEgY29tcGxldGUgZm9ybSBlbGVtZW50IGlzIHByb3ZpZGVkLlxuXHRcdFx0XHQvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdnZXRGYWxsYmFja0Zvcm0nLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0RmFsbGJhY2tGb3JtKCkge1xuXHRcdFx0XHRcdHZhciBleGlzdGluZ0ZhbGxiYWNrID0gdm9pZCAwLFxuXHRcdFx0XHRcdFx0Zm9ybSA9IHZvaWQgMDtcblx0XHRcdFx0XHRpZiAoKGV4aXN0aW5nRmFsbGJhY2sgPSB0aGlzLmdldEV4aXN0aW5nRmFsbGJhY2soKSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBleGlzdGluZ0ZhbGxiYWNrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBmaWVsZHNTdHJpbmcgPSAnPGRpdiBjbGFzcz1cImR6LWZhbGxiYWNrXCI+Jztcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHQpIHtcblx0XHRcdFx0XHRcdGZpZWxkc1N0cmluZyArPSAnPHA+JyArIHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tUZXh0ICsgJzwvcD4nO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmaWVsZHNTdHJpbmcgKz1cblx0XHRcdFx0XHRcdCc8aW5wdXQgdHlwZT1cImZpbGVcIiBuYW1lPVwiJyArXG5cdFx0XHRcdFx0XHR0aGlzLl9nZXRQYXJhbU5hbWUoMCkgK1xuXHRcdFx0XHRcdFx0J1wiICcgK1xuXHRcdFx0XHRcdFx0KHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSA/ICdtdWx0aXBsZT1cIm11bHRpcGxlXCInIDogdW5kZWZpbmVkKSArXG5cdFx0XHRcdFx0XHQnIC8+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlVwbG9hZCFcIj48L2Rpdj4nO1xuXG5cdFx0XHRcdFx0dmFyIGZpZWxkcyA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoZmllbGRzU3RyaW5nKTtcblx0XHRcdFx0XHRpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgIT09ICdGT1JNJykge1xuXHRcdFx0XHRcdFx0Zm9ybSA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRcdCc8Zm9ybSBhY3Rpb249XCInICtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMudXJsICtcblx0XHRcdFx0XHRcdFx0XHQnXCIgZW5jdHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIiBtZXRob2Q9XCInICtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMubWV0aG9kICtcblx0XHRcdFx0XHRcdFx0XHQnXCI+PC9mb3JtPidcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRmb3JtLmFwcGVuZENoaWxkKGZpZWxkcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBlbmN0eXBlIGFuZCBtZXRob2QgYXR0cmlidXRlcyBhcmUgc2V0IHByb3Blcmx5XG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdlbmN0eXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKTtcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsIHRoaXMub3B0aW9ucy5tZXRob2QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZm9ybSAhPSBudWxsID8gZm9ybSA6IGZpZWxkcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSZXR1cm5zIHRoZSBmYWxsYmFjayBlbGVtZW50cyBpZiB0aGV5IGV4aXN0IGFscmVhZHlcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8gVGhpcyBjb2RlIGhhcyB0byBwYXNzIGluIElFNyA6KFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZ2V0RXhpc3RpbmdGYWxsYmFjaycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRFeGlzdGluZ0ZhbGxiYWNrKCkge1xuXHRcdFx0XHRcdHZhciBnZXRGYWxsYmFjayA9IGZ1bmN0aW9uIGdldEZhbGxiYWNrKGVsZW1lbnRzKSB7XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTMgPSBlbGVtZW50cyxcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTEzID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRfaTEzID0gMCxcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxMyA9IF9pc0FycmF5MTMgPyBfaXRlcmF0b3IxMyA6IF9pdGVyYXRvcjEzW1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxMjtcblxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxMykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTEzID49IF9pdGVyYXRvcjEzLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEyID0gX2l0ZXJhdG9yMTNbX2kxMysrXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRfaTEzID0gX2l0ZXJhdG9yMTMubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTEzLmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYxMiA9IF9pMTMudmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHR2YXIgZWwgPSBfcmVmMTI7XG5cblx0XHRcdFx0XHRcdFx0aWYgKC8oXnwgKWZhbGxiYWNrKCR8ICkvLnRlc3QoZWwuY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBlbDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR2YXIgX2FyciA9IFsnZGl2JywgJ2Zvcm0nXTtcblx0XHRcdFx0XHRmb3IgKHZhciBfaTE0ID0gMDsgX2kxNCA8IF9hcnIubGVuZ3RoOyBfaTE0KyspIHtcblx0XHRcdFx0XHRcdHZhciB0YWdOYW1lID0gX2FycltfaTE0XTtcblx0XHRcdFx0XHRcdHZhciBmYWxsYmFjaztcblx0XHRcdFx0XHRcdGlmICgoZmFsbGJhY2sgPSBnZXRGYWxsYmFjayh0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSkpKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsbGJhY2s7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEFjdGl2YXRlcyBhbGwgbGlzdGVuZXJzIHN0b3JlZCBpbiBAbGlzdGVuZXJzXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdzZXR1cEV2ZW50TGlzdGVuZXJzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubGlzdGVuZXJzLm1hcChmdW5jdGlvbihlbGVtZW50TGlzdGVuZXJzKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGxpc3RlbmVyID0gZWxlbWVudExpc3RlbmVycy5ldmVudHNbZXZlbnRdO1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGVsZW1lbnRMaXN0ZW5lcnMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBEZWFjdGl2YXRlcyBhbGwgbGlzdGVuZXJzIHN0b3JlZCBpbiBAbGlzdGVuZXJzXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdyZW1vdmVFdmVudExpc3RlbmVycycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKGZ1bmN0aW9uKGVsZW1lbnRMaXN0ZW5lcnMpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goZWxlbWVudExpc3RlbmVycy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBhbmQgY2FuY2VscyBhbGwgZmlsZXMgaW4gdGhlIHF1ZXVlIG9yIGJlaW5nIHByb2Nlc3NlZC5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2Rpc2FibGUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXM0ID0gdGhpcztcblxuXHRcdFx0XHRcdHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1jbGlja2FibGUnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maWxlcy5tYXAoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzNC5jYW5jZWxVcGxvYWQoZmlsZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdlbmFibGUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuXHRcdFx0XHRcdHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1jbGlja2FibGUnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmV0dXJucyBhIG5pY2VseSBmb3JtYXR0ZWQgZmlsZXNpemVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2ZpbGVzaXplJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGZpbGVzaXplKHNpemUpIHtcblx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRTaXplID0gMDtcblx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRVbml0ID0gJ2InO1xuXG5cdFx0XHRcdFx0aWYgKHNpemUgPiAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgdW5pdHMgPSBbJ3RiJywgJ2diJywgJ21iJywgJ2tiJywgJ2InXTtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1bml0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgdW5pdCA9IHVuaXRzW2ldO1xuXHRcdFx0XHRcdFx0XHR2YXIgY3V0b2ZmID0gTWF0aC5wb3codGhpcy5vcHRpb25zLmZpbGVzaXplQmFzZSwgNCAtIGkpIC8gMTA7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHNpemUgPj0gY3V0b2ZmKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRTaXplID0gc2l6ZSAvIE1hdGgucG93KHRoaXMub3B0aW9ucy5maWxlc2l6ZUJhc2UsIDQgLSBpKTtcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZFVuaXQgPSB1bml0O1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHNlbGVjdGVkU2l6ZSA9IE1hdGgucm91bmQoMTAgKiBzZWxlY3RlZFNpemUpIC8gMTA7IC8vIEN1dHRpbmcgb2YgZGlnaXRzXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuICc8c3Ryb25nPicgKyBzZWxlY3RlZFNpemUgKyAnPC9zdHJvbmc+ICcgKyB0aGlzLm9wdGlvbnMuZGljdEZpbGVTaXplVW5pdHNbc2VsZWN0ZWRVbml0XTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgY2xhc3MgZnJvbSB0aGUgZm9ybS5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ191cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5tYXhGaWxlcyAhPSBudWxsICYmIHRoaXMuZ2V0QWNjZXB0ZWRGaWxlcygpLmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPT09IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ21heGZpbGVzcmVhY2hlZCcsIHRoaXMuZmlsZXMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1tYXgtZmlsZXMtcmVhY2hlZCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LW1heC1maWxlcy1yZWFjaGVkJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZHJvcCcsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkcm9wKGUpIHtcblx0XHRcdFx0XHRpZiAoIWUuZGF0YVRyYW5zZmVyKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZW1pdCgnZHJvcCcsIGUpO1xuXG5cdFx0XHRcdFx0dmFyIGZpbGVzID0gZS5kYXRhVHJhbnNmZXIuZmlsZXM7XG5cblx0XHRcdFx0XHR0aGlzLmVtaXQoJ2FkZGVkZmlsZXMnLCBmaWxlcyk7XG5cblx0XHRcdFx0XHQvLyBFdmVuIGlmIGl0J3MgYSBmb2xkZXIsIGZpbGVzLmxlbmd0aCB3aWxsIGNvbnRhaW4gdGhlIGZvbGRlcnMuXG5cdFx0XHRcdFx0aWYgKGZpbGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0dmFyIGl0ZW1zID0gZS5kYXRhVHJhbnNmZXIuaXRlbXM7XG5cblx0XHRcdFx0XHRcdGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggJiYgaXRlbXNbMF0ud2Via2l0R2V0QXNFbnRyeSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFRoZSBicm93c2VyIHN1cHBvcnRzIGRyb3BwaW5nIG9mIGZvbGRlcnMsIHNvIGhhbmRsZSBpdGVtcyBpbnN0ZWFkIG9mIGZpbGVzXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuaGFuZGxlRmlsZXMoZmlsZXMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3Bhc3RlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHBhc3RlKGUpIHtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRfX2d1YXJkX18oZSAhPSBudWxsID8gZS5jbGlwYm9hcmREYXRhIDogdW5kZWZpbmVkLCBmdW5jdGlvbih4KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB4Lml0ZW1zO1xuXHRcdFx0XHRcdFx0fSkgPT0gbnVsbFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuZW1pdCgncGFzdGUnLCBlKTtcblx0XHRcdFx0XHR2YXIgaXRlbXMgPSBlLmNsaXBib2FyZERhdGEuaXRlbXM7XG5cblx0XHRcdFx0XHRpZiAoaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYWRkRmlsZXNGcm9tSXRlbXMoaXRlbXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2hhbmRsZUZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUZpbGVzKGZpbGVzKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzNSA9IHRoaXM7XG5cblx0XHRcdFx0XHRyZXR1cm4gZmlsZXMubWFwKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczUuYWRkRmlsZShmaWxlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBXaGVuIGEgZm9sZGVyIGlzIGRyb3BwZWQgKG9yIGZpbGVzIGFyZSBwYXN0ZWQpLCBpdGVtcyBtdXN0IGJlIGhhbmRsZWRcblx0XHRcdFx0Ly8gaW5zdGVhZCBvZiBmaWxlcy5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19hZGRGaWxlc0Zyb21JdGVtcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfYWRkRmlsZXNGcm9tSXRlbXMoaXRlbXMpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXM2ID0gdGhpcztcblxuXHRcdFx0XHRcdHJldHVybiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTQgPSBpdGVtcyxcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTE0ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRfaTE1ID0gMCxcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxNCA9IF9pc0FycmF5MTQgPyBfaXRlcmF0b3IxNCA6IF9pdGVyYXRvcjE0W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxMztcblxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxNCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTE1ID49IF9pdGVyYXRvcjE0Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEzID0gX2l0ZXJhdG9yMTRbX2kxNSsrXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRfaTE1ID0gX2l0ZXJhdG9yMTQubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTE1LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYxMyA9IF9pMTUudmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHR2YXIgaXRlbSA9IF9yZWYxMztcblxuXHRcdFx0XHRcdFx0XHR2YXIgZW50cnk7XG5cdFx0XHRcdFx0XHRcdGlmIChpdGVtLndlYmtpdEdldEFzRW50cnkgIT0gbnVsbCAmJiAoZW50cnkgPSBpdGVtLndlYmtpdEdldEFzRW50cnkoKSkpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZW50cnkuaXNGaWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChfdGhpczYuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gQXBwZW5kIGFsbCBmaWxlcyBmcm9tIHRoYXQgZGlyZWN0b3J5IHRvIGZpbGVzXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChfdGhpczYuX2FkZEZpbGVzRnJvbURpcmVjdG9yeShlbnRyeSwgZW50cnkubmFtZSkpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChpdGVtLmdldEFzRmlsZSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGl0ZW0ua2luZCA9PSBudWxsIHx8IGl0ZW0ua2luZCA9PT0gJ2ZpbGUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChfdGhpczYuYWRkRmlsZShpdGVtLmdldEFzRmlsZSgpKSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBHb2VzIHRocm91Z2ggdGhlIGRpcmVjdG9yeSwgYW5kIGFkZHMgZWFjaCBmaWxlIGl0IGZpbmRzIHJlY3Vyc2l2ZWx5XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfYWRkRmlsZXNGcm9tRGlyZWN0b3J5Jyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9hZGRGaWxlc0Zyb21EaXJlY3RvcnkoZGlyZWN0b3J5LCBwYXRoKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzNyA9IHRoaXM7XG5cblx0XHRcdFx0XHR2YXIgZGlyUmVhZGVyID0gZGlyZWN0b3J5LmNyZWF0ZVJlYWRlcigpO1xuXG5cdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnJvcikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF9fZ3VhcmRNZXRob2RfXyhjb25zb2xlLCAnbG9nJywgZnVuY3Rpb24obykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gby5sb2coZXJyb3IpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHZhciByZWFkRW50cmllcyA9IGZ1bmN0aW9uIHJlYWRFbnRyaWVzKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRpclJlYWRlci5yZWFkRW50cmllcyhmdW5jdGlvbihlbnRyaWVzKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlbnRyaWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjE1ID0gZW50cmllcyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxNSA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pMTYgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxNSA9IF9pc0FycmF5MTUgPyBfaXRlcmF0b3IxNSA6IF9pdGVyYXRvcjE1W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxNDtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTYgPj0gX2l0ZXJhdG9yMTUubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjE0ID0gX2l0ZXJhdG9yMTVbX2kxNisrXTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pMTYgPSBfaXRlcmF0b3IxNS5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTE2LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmMTQgPSBfaTE2LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgZW50cnkgPSBfcmVmMTQ7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlbnRyeS5pc0ZpbGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZW50cnkuZmlsZShmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF90aGlzNy5vcHRpb25zLmlnbm9yZUhpZGRlbkZpbGVzICYmIGZpbGUubmFtZS5zdWJzdHJpbmcoMCwgMSkgPT09ICcuJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaWxlLmZ1bGxQYXRoID0gcGF0aCArICcvJyArIGZpbGUubmFtZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM3LmFkZEZpbGUoZmlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfdGhpczcuX2FkZEZpbGVzRnJvbURpcmVjdG9yeShlbnRyeSwgcGF0aCArICcvJyArIGVudHJ5Lm5hbWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdC8vIFJlY3Vyc2l2ZWx5IGNhbGwgcmVhZEVudHJpZXMoKSBhZ2Fpbiwgc2luY2UgYnJvd3NlciBvbmx5IGhhbmRsZVxuXHRcdFx0XHRcdFx0XHRcdC8vIHRoZSBmaXJzdCAxMDAgZW50cmllcy5cblx0XHRcdFx0XHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9EaXJlY3RvcnlSZWFkZXIjcmVhZEVudHJpZXNcblx0XHRcdFx0XHRcdFx0XHRyZWFkRW50cmllcygpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdFx0fSwgZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0cmV0dXJuIHJlYWRFbnRyaWVzKCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gSWYgYGRvbmUoKWAgaXMgY2FsbGVkIHdpdGhvdXQgYXJndW1lbnQgdGhlIGZpbGUgaXMgYWNjZXB0ZWRcblx0XHRcdFx0Ly8gSWYgeW91IGNhbGwgaXQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLCB0aGUgZmlsZSBpcyByZWplY3RlZFxuXHRcdFx0XHQvLyAoVGhpcyBhbGxvd3MgZm9yIGFzeW5jaHJvbm91cyB2YWxpZGF0aW9uKVxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB0aGUgZmlsZXNpemUsIGFuZCBpZiB0aGUgZmlsZS50eXBlIHBhc3NlcyB0aGVcblx0XHRcdFx0Ly8gYGFjY2VwdGVkRmlsZXNgIGNoZWNrLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnYWNjZXB0Jyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGFjY2VwdChmaWxlLCBkb25lKSB7XG5cdFx0XHRcdFx0aWYgKGZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5tYXhGaWxlc2l6ZSAqIDEwMjQgKiAxMDI0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShcblx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLmRpY3RGaWxlVG9vQmlnXG5cdFx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoJ3t7ZmlsZXNpemV9fScsIE1hdGgucm91bmQoZmlsZS5zaXplIC8gMTAyNCAvIDEwLjI0KSAvIDEwMClcblx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgne3ttYXhGaWxlc2l6ZX19JywgdGhpcy5vcHRpb25zLm1heEZpbGVzaXplKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCFEcm9wem9uZS5pc1ZhbGlkRmlsZShmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcykpIHtcblx0XHRcdFx0XHRcdHJldHVybiBkb25lKHRoaXMub3B0aW9ucy5kaWN0SW52YWxpZEZpbGVUeXBlKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5tYXhGaWxlcyAhPSBudWxsICYmIHRoaXMuZ2V0QWNjZXB0ZWRGaWxlcygpLmxlbmd0aCA+PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHtcblx0XHRcdFx0XHRcdGRvbmUodGhpcy5vcHRpb25zLmRpY3RNYXhGaWxlc0V4Y2VlZGVkLnJlcGxhY2UoJ3t7bWF4RmlsZXN9fScsIHRoaXMub3B0aW9ucy5tYXhGaWxlcykpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZW1pdCgnbWF4ZmlsZXNleGNlZWRlZCcsIGZpbGUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmFjY2VwdC5jYWxsKHRoaXMsIGZpbGUsIGRvbmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2FkZEZpbGUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gYWRkRmlsZShmaWxlKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzOCA9IHRoaXM7XG5cblx0XHRcdFx0XHRmaWxlLnVwbG9hZCA9IHtcblx0XHRcdFx0XHRcdHV1aWQ6IERyb3B6b25lLnV1aWR2NCgpLFxuXHRcdFx0XHRcdFx0cHJvZ3Jlc3M6IDAsXG5cdFx0XHRcdFx0XHQvLyBTZXR0aW5nIHRoZSB0b3RhbCB1cGxvYWQgc2l6ZSB0byBmaWxlLnNpemUgZm9yIHRoZSBiZWdpbm5pbmdcblx0XHRcdFx0XHRcdC8vIEl0J3MgYWN0dWFsIGRpZmZlcmVudCB0aGFuIHRoZSBzaXplIHRvIGJlIHRyYW5zbWl0dGVkLlxuXHRcdFx0XHRcdFx0dG90YWw6IGZpbGUuc2l6ZSxcblx0XHRcdFx0XHRcdGJ5dGVzU2VudDogMCxcblx0XHRcdFx0XHRcdGZpbGVuYW1lOiB0aGlzLl9yZW5hbWVGaWxlKGZpbGUpLFxuXHRcdFx0XHRcdFx0Y2h1bmtlZDogdGhpcy5vcHRpb25zLmNodW5raW5nICYmICh0aGlzLm9wdGlvbnMuZm9yY2VDaHVua2luZyB8fCBmaWxlLnNpemUgPiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplKSxcblx0XHRcdFx0XHRcdHRvdGFsQ2h1bmtDb3VudDogTWF0aC5jZWlsKGZpbGUuc2l6ZSAvIHRoaXMub3B0aW9ucy5jaHVua1NpemUpLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dGhpcy5maWxlcy5wdXNoKGZpbGUpO1xuXG5cdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5BRERFRDtcblxuXHRcdFx0XHRcdHRoaXMuZW1pdCgnYWRkZWRmaWxlJywgZmlsZSk7XG5cblx0XHRcdFx0XHR0aGlzLl9lbnF1ZXVlVGh1bWJuYWlsKGZpbGUpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuYWNjZXB0KGZpbGUsIGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0ZmlsZS5hY2NlcHRlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRfdGhpczguX2Vycm9yUHJvY2Vzc2luZyhbZmlsZV0sIGVycm9yKTsgLy8gV2lsbCBzZXQgdGhlIGZpbGUuc3RhdHVzXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRmaWxlLmFjY2VwdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0aWYgKF90aGlzOC5vcHRpb25zLmF1dG9RdWV1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdF90aGlzOC5lbnF1ZXVlRmlsZShmaWxlKTtcblx0XHRcdFx0XHRcdFx0fSAvLyBXaWxsIHNldCAuYWNjZXB0ZWQgPSB0cnVlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM4Ll91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcygpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFdyYXBwZXIgZm9yIGVucXVldWVGaWxlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdlbnF1ZXVlRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW5xdWV1ZUZpbGVzKGZpbGVzKSB7XG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxNiA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTE2ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kxNyA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE2ID0gX2lzQXJyYXkxNiA/IF9pdGVyYXRvcjE2IDogX2l0ZXJhdG9yMTZbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjE1O1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxNikge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kxNyA+PSBfaXRlcmF0b3IxNi5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMTUgPSBfaXRlcmF0b3IxNltfaTE3KytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kxNyA9IF9pdGVyYXRvcjE2Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTcuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYxNSA9IF9pMTcudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjE1O1xuXG5cdFx0XHRcdFx0XHR0aGlzLmVucXVldWVGaWxlKGZpbGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2VucXVldWVGaWxlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGVucXVldWVGaWxlKGZpbGUpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXM5ID0gdGhpcztcblxuXHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuQURERUQgJiYgZmlsZS5hY2NlcHRlZCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5RVUVVRUQ7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzOS5wcm9jZXNzUXVldWUoKTtcblx0XHRcdFx0XHRcdFx0fSwgMCk7IC8vIERlZmVycmluZyB0aGUgY2FsbFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGZpbGUgY2FuJ3QgYmUgcXVldWVkIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQgb3Igd2FzIHJlamVjdGVkLlwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfZW5xdWV1ZVRodW1ibmFpbCcsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZW5xdWV1ZVRodW1ibmFpbChmaWxlKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzMTAgPSB0aGlzO1xuXG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLmNyZWF0ZUltYWdlVGh1bWJuYWlscyAmJlxuXHRcdFx0XHRcdFx0ZmlsZS50eXBlLm1hdGNoKC9pbWFnZS4qLykgJiZcblx0XHRcdFx0XHRcdGZpbGUuc2l6ZSA8PSB0aGlzLm9wdGlvbnMubWF4VGh1bWJuYWlsRmlsZXNpemUgKiAxMDI0ICogMTAyNFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fdGh1bWJuYWlsUXVldWUucHVzaChmaWxlKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMxMC5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCk7XG5cdFx0XHRcdFx0XHR9LCAwKTsgLy8gRGVmZXJyaW5nIHRoZSBjYWxsXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCkge1xuXHRcdFx0XHRcdHZhciBfdGhpczExID0gdGhpcztcblxuXHRcdFx0XHRcdGlmICh0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsIHx8IHRoaXMuX3RodW1ibmFpbFF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSB0cnVlO1xuXHRcdFx0XHRcdHZhciBmaWxlID0gdGhpcy5fdGh1bWJuYWlsUXVldWUuc2hpZnQoKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVUaHVtYm5haWwoXG5cdFx0XHRcdFx0XHRmaWxlLFxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnRodW1ibmFpbFdpZHRoLFxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnRodW1ibmFpbEhlaWdodCxcblx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy50aHVtYm5haWxNZXRob2QsXG5cdFx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oZGF0YVVybCkge1xuXHRcdFx0XHRcdFx0XHRfdGhpczExLmVtaXQoJ3RodW1ibmFpbCcsIGZpbGUsIGRhdGFVcmwpO1xuXHRcdFx0XHRcdFx0XHRfdGhpczExLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczExLl9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbiBiZSBjYWxsZWQgYnkgdGhlIHVzZXIgdG8gcmVtb3ZlIGEgZmlsZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncmVtb3ZlRmlsZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZW1vdmVGaWxlKGZpbGUpIHtcblx0XHRcdFx0XHRpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORykge1xuXHRcdFx0XHRcdFx0dGhpcy5jYW5jZWxVcGxvYWQoZmlsZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuZmlsZXMgPSB3aXRob3V0KHRoaXMuZmlsZXMsIGZpbGUpO1xuXG5cdFx0XHRcdFx0dGhpcy5lbWl0KCdyZW1vdmVkZmlsZScsIGZpbGUpO1xuXHRcdFx0XHRcdGlmICh0aGlzLmZpbGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZW1pdCgncmVzZXQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmVtb3ZlcyBhbGwgZmlsZXMgdGhhdCBhcmVuJ3QgY3VycmVudGx5IHByb2Nlc3NlZCBmcm9tIHRoZSBsaXN0XG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdyZW1vdmVBbGxGaWxlcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZW1vdmVBbGxGaWxlcyhjYW5jZWxJZk5lY2Vzc2FyeSkge1xuXHRcdFx0XHRcdC8vIENyZWF0ZSBhIGNvcHkgb2YgZmlsZXMgc2luY2UgcmVtb3ZlRmlsZSgpIGNoYW5nZXMgdGhlIEBmaWxlcyBhcnJheS5cblx0XHRcdFx0XHRpZiAoY2FuY2VsSWZOZWNlc3NhcnkgPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0Y2FuY2VsSWZOZWNlc3NhcnkgPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxNyA9IHRoaXMuZmlsZXMuc2xpY2UoKSxcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxNyA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdF9pMTggPSAwLFxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxNyA9IF9pc0FycmF5MTcgPyBfaXRlcmF0b3IxNyA6IF9pdGVyYXRvcjE3W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dmFyIF9yZWYxNjtcblxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTcpIHtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTggPj0gX2l0ZXJhdG9yMTcubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjE2ID0gX2l0ZXJhdG9yMTdbX2kxOCsrXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF9pMTggPSBfaXRlcmF0b3IxNy5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTE4LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMTYgPSBfaTE4LnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYxNjtcblxuXHRcdFx0XHRcdFx0aWYgKGZpbGUuc3RhdHVzICE9PSBEcm9wem9uZS5VUExPQURJTkcgfHwgY2FuY2VsSWZOZWNlc3NhcnkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVGaWxlKGZpbGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSZXNpemVzIGFuIGltYWdlIGJlZm9yZSBpdCBnZXRzIHNlbnQgdG8gdGhlIHNlcnZlci4gVGhpcyBmdW5jdGlvbiBpcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZlxuXHRcdFx0XHQvLyBgb3B0aW9ucy50cmFuc2Zvcm1GaWxlYCBpZiBgcmVzaXplV2lkdGhgIG9yIGByZXNpemVIZWlnaHRgIGFyZSBzZXQuIFRoZSBjYWxsYmFjayBpcyBpbnZva2VkIHdpdGhcblx0XHRcdFx0Ly8gdGhlIHJlc2l6ZWQgYmxvYi5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3Jlc2l6ZUltYWdlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlc2l6ZUltYWdlKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgY2FsbGJhY2spIHtcblx0XHRcdFx0XHR2YXIgX3RoaXMxMiA9IHRoaXM7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVUaHVtYm5haWwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmYWxzZSwgZnVuY3Rpb24oZGF0YVVybCwgY2FudmFzKSB7XG5cdFx0XHRcdFx0XHRpZiAoY2FudmFzID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFRoZSBpbWFnZSBoYXMgbm90IGJlZW4gcmVzaXplZFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soZmlsZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgcmVzaXplTWltZVR5cGUgPSBfdGhpczEyLm9wdGlvbnMucmVzaXplTWltZVR5cGU7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJlc2l6ZU1pbWVUeXBlID09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVNaW1lVHlwZSA9IGZpbGUudHlwZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzaXplZERhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKHJlc2l6ZU1pbWVUeXBlLCBfdGhpczEyLm9wdGlvbnMucmVzaXplUXVhbGl0eSk7XG5cdFx0XHRcdFx0XHRcdGlmIChyZXNpemVNaW1lVHlwZSA9PT0gJ2ltYWdlL2pwZWcnIHx8IHJlc2l6ZU1pbWVUeXBlID09PSAnaW1hZ2UvanBnJykge1xuXHRcdFx0XHRcdFx0XHRcdC8vIE5vdyBhZGQgdGhlIG9yaWdpbmFsIEVYSUYgaW5mb3JtYXRpb25cblx0XHRcdFx0XHRcdFx0XHRyZXNpemVkRGF0YVVSTCA9IEV4aWZSZXN0b3JlLnJlc3RvcmUoZmlsZS5kYXRhVVJMLCByZXNpemVkRGF0YVVSTCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKERyb3B6b25lLmRhdGFVUkl0b0Jsb2IocmVzaXplZERhdGFVUkwpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2NyZWF0ZVRodW1ibmFpbCcsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVUaHVtYm5haWwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2spIHtcblx0XHRcdFx0XHR2YXIgX3RoaXMxMyA9IHRoaXM7XG5cblx0XHRcdFx0XHR2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cblx0XHRcdFx0XHRmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0ZmlsZS5kYXRhVVJMID0gZmlsZVJlYWRlci5yZXN1bHQ7XG5cblx0XHRcdFx0XHRcdC8vIERvbid0IGJvdGhlciBjcmVhdGluZyBhIHRodW1ibmFpbCBmb3IgU1ZHIGltYWdlcyBzaW5jZSB0aGV5J3JlIHZlY3RvclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUudHlwZSA9PT0gJ2ltYWdlL3N2Zyt4bWwnKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFjayAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soZmlsZVJlYWRlci5yZXN1bHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMTMuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHJldHVybiBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdjcmVhdGVUaHVtYm5haWxGcm9tVXJsJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVRodW1ibmFpbEZyb21VcmwoXG5cdFx0XHRcdFx0ZmlsZSxcblx0XHRcdFx0XHR3aWR0aCxcblx0XHRcdFx0XHRoZWlnaHQsXG5cdFx0XHRcdFx0cmVzaXplTWV0aG9kLFxuXHRcdFx0XHRcdGZpeE9yaWVudGF0aW9uLFxuXHRcdFx0XHRcdGNhbGxiYWNrLFxuXHRcdFx0XHRcdGNyb3NzT3JpZ2luXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHZhciBfdGhpczE0ID0gdGhpcztcblxuXHRcdFx0XHRcdC8vIE5vdCB1c2luZyBgbmV3IEltYWdlYCBoZXJlIGJlY2F1c2Ugb2YgYSBidWcgaW4gbGF0ZXN0IENocm9tZSB2ZXJzaW9ucy5cblx0XHRcdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvcHVsbC8yMjZcblx0XHRcdFx0XHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cblx0XHRcdFx0XHRpZiAoY3Jvc3NPcmlnaW4pIHtcblx0XHRcdFx0XHRcdGltZy5jcm9zc09yaWdpbiA9IGNyb3NzT3JpZ2luO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBsb2FkRXhpZiA9IGZ1bmN0aW9uIGxvYWRFeGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjaygxKTtcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIEVYSUYgIT09ICd1bmRlZmluZWQnICYmIEVYSUYgIT09IG51bGwgJiYgZml4T3JpZW50YXRpb24pIHtcblx0XHRcdFx0XHRcdFx0bG9hZEV4aWYgPSBmdW5jdGlvbiBsb2FkRXhpZihjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBFWElGLmdldERhdGEoaW1nLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhFWElGLmdldFRhZyh0aGlzLCAnT3JpZW50YXRpb24nKSk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBsb2FkRXhpZihmdW5jdGlvbihvcmllbnRhdGlvbikge1xuXHRcdFx0XHRcdFx0XHRmaWxlLndpZHRoID0gaW1nLndpZHRoO1xuXHRcdFx0XHRcdFx0XHRmaWxlLmhlaWdodCA9IGltZy5oZWlnaHQ7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHJlc2l6ZUluZm8gPSBfdGhpczE0Lm9wdGlvbnMucmVzaXplLmNhbGwoX3RoaXMxNCwgZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kKTtcblxuXHRcdFx0XHRcdFx0XHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cdFx0XHRcdFx0XHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdFx0XHRcdFx0XHRjYW52YXMud2lkdGggPSByZXNpemVJbmZvLnRyZ1dpZHRoO1xuXHRcdFx0XHRcdFx0XHRjYW52YXMuaGVpZ2h0ID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XG5cblx0XHRcdFx0XHRcdFx0aWYgKG9yaWVudGF0aW9uID4gNCkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbnZhcy53aWR0aCA9IHJlc2l6ZUluZm8udHJnSGVpZ2h0O1xuXHRcdFx0XHRcdFx0XHRcdGNhbnZhcy5oZWlnaHQgPSByZXNpemVJbmZvLnRyZ1dpZHRoO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0c3dpdGNoIChvcmllbnRhdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgMjpcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGhvcml6b250YWwgZmxpcFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIDApO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKC0xLCAxKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgMzpcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDE4MMKwIHJvdGF0ZSBsZWZ0XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgucm90YXRlKE1hdGguUEkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gdmVydGljYWwgZmxpcFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZSgwLCBjYW52YXMuaGVpZ2h0KTtcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5zY2FsZSgxLCAtMSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDU6XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyB2ZXJ0aWNhbCBmbGlwICsgOTAgcm90YXRlIHJpZ2h0XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgucm90YXRlKDAuNSAqIE1hdGguUEkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKDEsIC0xKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgNjpcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDkwwrAgcm90YXRlIHJpZ2h0XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgucm90YXRlKDAuNSAqIE1hdGguUEkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZSgwLCAtY2FudmFzLmhlaWdodCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDc6XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBob3Jpem9udGFsIGZsaXAgKyA5MCByb3RhdGUgcmlnaHRcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKGNhbnZhcy53aWR0aCwgLWNhbnZhcy5oZWlnaHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKC0xLCAxKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgODpcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDkwwrAgcm90YXRlIGxlZnRcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoLTAuNSAqIE1hdGguUEkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZSgtY2FudmFzLndpZHRoLCAwKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIGJ1Z2ZpeCBmb3IgaU9TJyBzY2FsaW5nIGJ1Zy5cblx0XHRcdFx0XHRcdFx0ZHJhd0ltYWdlSU9TRml4KFxuXHRcdFx0XHRcdFx0XHRcdGN0eCxcblx0XHRcdFx0XHRcdFx0XHRpbWcsXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby5zcmNYICE9IG51bGwgPyByZXNpemVJbmZvLnNyY1ggOiAwLFxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8uc3JjWSAhPSBudWxsID8gcmVzaXplSW5mby5zcmNZIDogMCxcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnNyY1dpZHRoLFxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8uc3JjSGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8udHJnWCAhPSBudWxsID8gcmVzaXplSW5mby50cmdYIDogMCxcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnRyZ1kgIT0gbnVsbCA/IHJlc2l6ZUluZm8udHJnWSA6IDAsXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby50cmdXaWR0aCxcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnRyZ0hlaWdodFxuXHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdHZhciB0aHVtYm5haWwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayh0aHVtYm5haWwsIGNhbnZhcyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0aW1nLm9uZXJyb3IgPSBjYWxsYmFjaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gKGltZy5zcmMgPSBmaWxlLmRhdGFVUkwpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEdvZXMgdGhyb3VnaCB0aGUgcXVldWUgYW5kIHByb2Nlc3NlcyBmaWxlcyBpZiB0aGVyZSBhcmVuJ3QgdG9vIG1hbnkgYWxyZWFkeS5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3Byb2Nlc3NRdWV1ZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBwcm9jZXNzUXVldWUoKSB7XG5cdFx0XHRcdFx0dmFyIHBhcmFsbGVsVXBsb2FkcyA9IHRoaXMub3B0aW9ucy5wYXJhbGxlbFVwbG9hZHM7XG5cblx0XHRcdFx0XHR2YXIgcHJvY2Vzc2luZ0xlbmd0aCA9IHRoaXMuZ2V0VXBsb2FkaW5nRmlsZXMoKS5sZW5ndGg7XG5cdFx0XHRcdFx0dmFyIGkgPSBwcm9jZXNzaW5nTGVuZ3RoO1xuXG5cdFx0XHRcdFx0Ly8gVGhlcmUgYXJlIGFscmVhZHkgYXQgbGVhc3QgYXMgbWFueSBmaWxlcyB1cGxvYWRpbmcgdGhhbiBzaG91bGQgYmVcblx0XHRcdFx0XHRpZiAocHJvY2Vzc2luZ0xlbmd0aCA+PSBwYXJhbGxlbFVwbG9hZHMpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcXVldWVkRmlsZXMgPSB0aGlzLmdldFF1ZXVlZEZpbGVzKCk7XG5cblx0XHRcdFx0XHRpZiAoIShxdWV1ZWRGaWxlcy5sZW5ndGggPiAwKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcblx0XHRcdFx0XHRcdC8vIFRoZSBmaWxlcyBzaG91bGQgYmUgdXBsb2FkZWQgaW4gb25lIHJlcXVlc3Rcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhxdWV1ZWRGaWxlcy5zbGljZSgwLCBwYXJhbGxlbFVwbG9hZHMgLSBwcm9jZXNzaW5nTGVuZ3RoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHdoaWxlIChpIDwgcGFyYWxsZWxVcGxvYWRzKSB7XG5cdFx0XHRcdFx0XHRcdGlmICghcXVldWVkRmlsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9IC8vIE5vdGhpbmcgbGVmdCB0byBwcm9jZXNzXG5cdFx0XHRcdFx0XHRcdHRoaXMucHJvY2Vzc0ZpbGUocXVldWVkRmlsZXMuc2hpZnQoKSk7XG5cdFx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gV3JhcHBlciBmb3IgYHByb2Nlc3NGaWxlc2Bcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3Byb2Nlc3NGaWxlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3NGaWxlKGZpbGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9jZXNzRmlsZXMoW2ZpbGVdKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBMb2FkcyB0aGUgZmlsZSwgdGhlbiBjYWxscyBmaW5pc2hlZExvYWRpbmcoKVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncHJvY2Vzc0ZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyhmaWxlcykge1xuXHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTggPSBmaWxlcyxcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxOCA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdF9pMTkgPSAwLFxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxOCA9IF9pc0FycmF5MTggPyBfaXRlcmF0b3IxOCA6IF9pdGVyYXRvcjE4W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dmFyIF9yZWYxNztcblxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTkgPj0gX2l0ZXJhdG9yMTgubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjE3ID0gX2l0ZXJhdG9yMThbX2kxOSsrXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF9pMTkgPSBfaXRlcmF0b3IxOC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTE5LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMTcgPSBfaTE5LnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYxNztcblxuXHRcdFx0XHRcdFx0ZmlsZS5wcm9jZXNzaW5nID0gdHJ1ZTsgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblx0XHRcdFx0XHRcdGZpbGUuc3RhdHVzID0gRHJvcHpvbmUuVVBMT0FESU5HO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3Byb2Nlc3NpbmcnLCBmaWxlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3Byb2Nlc3NpbmdtdWx0aXBsZScsIGZpbGVzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhmaWxlcyk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfZ2V0RmlsZXNXaXRoWGhyJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9nZXRGaWxlc1dpdGhYaHIoeGhyKSB7XG5cdFx0XHRcdFx0dmFyIGZpbGVzID0gdm9pZCAwO1xuXHRcdFx0XHRcdHJldHVybiAoZmlsZXMgPSB0aGlzLmZpbGVzXG5cdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUueGhyID09PSB4aHI7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlO1xuXHRcdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbmNlbHMgdGhlIGZpbGUgdXBsb2FkIGFuZCBzZXRzIHRoZSBzdGF0dXMgdG8gQ0FOQ0VMRURcblx0XHRcdFx0Ly8gKippZioqIHRoZSBmaWxlIGlzIGFjdHVhbGx5IGJlaW5nIHVwbG9hZGVkLlxuXHRcdFx0XHQvLyBJZiBpdCdzIHN0aWxsIGluIHRoZSBxdWV1ZSwgdGhlIGZpbGUgaXMgYmVpbmcgcmVtb3ZlZCBmcm9tIGl0IGFuZCB0aGUgc3RhdHVzXG5cdFx0XHRcdC8vIHNldCB0byBDQU5DRUxFRC5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2NhbmNlbFVwbG9hZCcsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBjYW5jZWxVcGxvYWQoZmlsZSkge1xuXHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XG5cdFx0XHRcdFx0XHR2YXIgZ3JvdXBlZEZpbGVzID0gdGhpcy5fZ2V0RmlsZXNXaXRoWGhyKGZpbGUueGhyKTtcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxOSA9IGdyb3VwZWRGaWxlcyxcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTE5ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRfaTIwID0gMCxcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxOSA9IF9pc0FycmF5MTkgPyBfaXRlcmF0b3IxOSA6IF9pdGVyYXRvcjE5W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxODtcblxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxOSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIwID49IF9pdGVyYXRvcjE5Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjE4ID0gX2l0ZXJhdG9yMTlbX2kyMCsrXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRfaTIwID0gX2l0ZXJhdG9yMTkubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIwLmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYxOCA9IF9pMjAudmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHR2YXIgZ3JvdXBlZEZpbGUgPSBfcmVmMTg7XG5cblx0XHRcdFx0XHRcdFx0Z3JvdXBlZEZpbGUuc3RhdHVzID0gRHJvcHpvbmUuQ0FOQ0VMRUQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZpbGUueGhyICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHRmaWxlLnhoci5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjIwID0gZ3JvdXBlZEZpbGVzLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjAgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMjEgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjIwID0gX2lzQXJyYXkyMCA/IF9pdGVyYXRvcjIwIDogX2l0ZXJhdG9yMjBbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjE5O1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTIwKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjEgPj0gX2l0ZXJhdG9yMjAubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTkgPSBfaXRlcmF0b3IyMFtfaTIxKytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMjEgPSBfaXRlcmF0b3IyMC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjEuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjE5ID0gX2kyMS52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBfZ3JvdXBlZEZpbGUgPSBfcmVmMTk7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZCcsIF9ncm91cGVkRmlsZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY2FuY2VsZWRtdWx0aXBsZScsIGdyb3VwZWRGaWxlcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuQURERUQgfHwgZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlFVRVVFRCkge1xuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5DQU5DRUxFRDtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY2FuY2VsZWQnLCBmaWxlKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZG11bHRpcGxlJywgW2ZpbGVdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3Jlc29sdmVPcHRpb24nLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcmVzb2x2ZU9wdGlvbihvcHRpb24pIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7XG5cdFx0XHRcdFx0XHRcdF9rZXkzIDwgX2xlbjM7XG5cdFx0XHRcdFx0XHRcdF9rZXkzKytcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAndXBsb2FkRmlsZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1cGxvYWRGaWxlKGZpbGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhbZmlsZV0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAndXBsb2FkRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gdXBsb2FkRmlsZXMoZmlsZXMpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXMxNSA9IHRoaXM7XG5cblx0XHRcdFx0XHR0aGlzLl90cmFuc2Zvcm1GaWxlcyhmaWxlcywgZnVuY3Rpb24odHJhbnNmb3JtZWRGaWxlcykge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgZmlsZSBzaG91bGQgYmUgc2VudCBpbiBjaHVua3MhXG5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGNodW5raW5nIG9wdGlvbiBpcyBzZXQsIHdlICoqa25vdyoqIHRoYXQgdGhlcmUgY2FuIG9ubHkgYmUgKipvbmUqKiBmaWxlLCBzaW5jZVxuXHRcdFx0XHRcdFx0XHQvLyB1cGxvYWRNdWx0aXBsZSBpcyBub3QgYWxsb3dlZCB3aXRoIHRoaXMgb3B0aW9uLlxuXHRcdFx0XHRcdFx0XHR2YXIgZmlsZSA9IGZpbGVzWzBdO1xuXHRcdFx0XHRcdFx0XHR2YXIgdHJhbnNmb3JtZWRGaWxlID0gdHJhbnNmb3JtZWRGaWxlc1swXTtcblx0XHRcdFx0XHRcdFx0dmFyIHN0YXJ0ZWRDaHVua0NvdW50ID0gMDtcblxuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5jaHVua3MgPSBbXTtcblxuXHRcdFx0XHRcdFx0XHR2YXIgaGFuZGxlTmV4dENodW5rID0gZnVuY3Rpb24gaGFuZGxlTmV4dENodW5rKCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBjaHVua0luZGV4ID0gMDtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEZpbmQgdGhlIG5leHQgaXRlbSBpbiBmaWxlLnVwbG9hZC5jaHVua3MgdGhhdCBpcyBub3QgZGVmaW5lZCB5ZXQuXG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKGZpbGUudXBsb2FkLmNodW5rc1tjaHVua0luZGV4XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjaHVua0luZGV4Kys7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBtZWFucywgdGhhdCBhbGwgY2h1bmtzIGhhdmUgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNodW5rSW5kZXggPj0gZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50KSByZXR1cm47XG5cblx0XHRcdFx0XHRcdFx0XHRzdGFydGVkQ2h1bmtDb3VudCsrO1xuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHN0YXJ0ID0gY2h1bmtJbmRleCAqIF90aGlzMTUub3B0aW9ucy5jaHVua1NpemU7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgX3RoaXMxNS5vcHRpb25zLmNodW5rU2l6ZSwgZmlsZS5zaXplKTtcblxuXHRcdFx0XHRcdFx0XHRcdHZhciBkYXRhQmxvY2sgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRuYW1lOiBfdGhpczE1Ll9nZXRQYXJhbU5hbWUoMCksXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhOiB0cmFuc2Zvcm1lZEZpbGUud2Via2l0U2xpY2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0PyB0cmFuc2Zvcm1lZEZpbGUud2Via2l0U2xpY2Uoc3RhcnQsIGVuZClcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiB0cmFuc2Zvcm1lZEZpbGUuc2xpY2Uoc3RhcnQsIGVuZCksXG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlbmFtZTogZmlsZS51cGxvYWQuZmlsZW5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRjaHVua0luZGV4OiBjaHVua0luZGV4LFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlOiBmaWxlLFxuXHRcdFx0XHRcdFx0XHRcdFx0aW5kZXg6IGNodW5rSW5kZXgsXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhQmxvY2s6IGRhdGFCbG9jaywgLy8gSW4gY2FzZSB3ZSB3YW50IHRvIHJldHJ5LlxuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzOiBEcm9wem9uZS5VUExPQURJTkcsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9ncmVzczogMCxcblx0XHRcdFx0XHRcdFx0XHRcdHJldHJpZXM6IDAsIC8vIFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBibG9jayBoYXMgYmVlbiByZXRyaWVkLlxuXHRcdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0XHRfdGhpczE1Ll91cGxvYWREYXRhKGZpbGVzLCBbZGF0YUJsb2NrXSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQuZmluaXNoZWRDaHVua1VwbG9hZCA9IGZ1bmN0aW9uKGNodW5rKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGFsbEZpbmlzaGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRjaHVuay5zdGF0dXMgPSBEcm9wem9uZS5TVUNDRVNTO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ2xlYXIgdGhlIGRhdGEgZnJvbSB0aGUgY2h1bmtcblx0XHRcdFx0XHRcdFx0XHRjaHVuay5kYXRhQmxvY2sgPSBudWxsO1xuXG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBoYW5kbGVOZXh0Q2h1bmsoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0uc3RhdHVzICE9PSBEcm9wem9uZS5TVUNDRVNTKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFsbEZpbmlzaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGFsbEZpbmlzaGVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRfdGhpczE1Lm9wdGlvbnMuY2h1bmtzVXBsb2FkZWQoZmlsZSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMTUuX2ZpbmlzaGVkKGZpbGVzLCAnJywgbnVsbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0aWYgKF90aGlzMTUub3B0aW9ucy5wYXJhbGxlbENodW5rVXBsb2Fkcykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdGhhbmRsZU5leHRDaHVuaygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRoYW5kbGVOZXh0Q2h1bmsoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRhdGFCbG9ja3MgPSBbXTtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgX2kyMiA9IDA7IF9pMjIgPCBmaWxlcy5sZW5ndGg7IF9pMjIrKykge1xuXHRcdFx0XHRcdFx0XHRcdGRhdGFCbG9ja3NbX2kyMl0gPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRuYW1lOiBfdGhpczE1Ll9nZXRQYXJhbU5hbWUoX2kyMiksXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhOiB0cmFuc2Zvcm1lZEZpbGVzW19pMjJdLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZW5hbWU6IGZpbGVzW19pMjJdLnVwbG9hZC5maWxlbmFtZSxcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdF90aGlzMTUuX3VwbG9hZERhdGEoZmlsZXMsIGRhdGFCbG9ja3MpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vLyBSZXR1cm5zIHRoZSByaWdodCBjaHVuayBmb3IgZ2l2ZW4gZmlsZSBhbmQgeGhyXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfZ2V0Q2h1bmsnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2dldENodW5rKGZpbGUsIHhocikge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gIT09IHVuZGVmaW5lZCAmJiBmaWxlLnVwbG9hZC5jaHVua3NbaV0ueGhyID09PSB4aHIpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUudXBsb2FkLmNodW5rc1tpXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gVGhpcyBmdW5jdGlvbiBhY3R1YWxseSB1cGxvYWRzIHRoZSBmaWxlKHMpIHRvIHRoZSBzZXJ2ZXIuXG5cdFx0XHRcdC8vIElmIGRhdGFCbG9ja3MgY29udGFpbnMgdGhlIGFjdHVhbCBkYXRhIHRvIHVwbG9hZCAobWVhbmluZywgdGhhdCB0aGlzIGNvdWxkIGVpdGhlciBiZSB0cmFuc2Zvcm1lZFxuXHRcdFx0XHQvLyBmaWxlcywgb3IgaW5kaXZpZHVhbCBjaHVua3MgZm9yIGNodW5rZWQgdXBsb2FkKS5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ191cGxvYWREYXRhJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF91cGxvYWREYXRhKGZpbGVzLCBkYXRhQmxvY2tzKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzMTYgPSB0aGlzO1xuXG5cdFx0XHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0XHRcdFx0Ly8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSBmaWxlIG9iamVjdHMgdG8gYmUgYWJsZSB0byByZWZlcmVuY2UgaXQgbGF0ZXIuXG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyMSA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTIxID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kyMyA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjIxID0gX2lzQXJyYXkyMSA/IF9pdGVyYXRvcjIxIDogX2l0ZXJhdG9yMjFbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjIwO1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyMSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kyMyA+PSBfaXRlcmF0b3IyMS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMjAgPSBfaXRlcmF0b3IyMVtfaTIzKytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kyMyA9IF9pdGVyYXRvcjIxLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMjMuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYyMCA9IF9pMjMudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjIwO1xuXG5cdFx0XHRcdFx0XHRmaWxlLnhociA9IHhocjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XG5cdFx0XHRcdFx0XHQvLyBQdXQgdGhlIHhociBvYmplY3QgaW4gdGhlIHJpZ2h0IGNodW5rIG9iamVjdCwgc28gaXQgY2FuIGJlIGFzc29jaWF0ZWQgbGF0ZXIsIGFuZCBmb3VuZCB3aXRoIF9nZXRDaHVua1xuXHRcdFx0XHRcdFx0ZmlsZXNbMF0udXBsb2FkLmNodW5rc1tkYXRhQmxvY2tzWzBdLmNodW5rSW5kZXhdLnhociA9IHhocjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgbWV0aG9kID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy5tZXRob2QsIGZpbGVzKTtcblx0XHRcdFx0XHR2YXIgdXJsID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy51cmwsIGZpbGVzKTtcblx0XHRcdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cblx0XHRcdFx0XHQvLyBTZXR0aW5nIHRoZSB0aW1lb3V0IGFmdGVyIG9wZW4gYmVjYXVzZSBvZiBJRTExIGlzc3VlOiBodHRwczovL2dpdGxhYi5jb20vbWVuby9kcm9wem9uZS9pc3N1ZXMvOFxuXHRcdFx0XHRcdHhoci50aW1lb3V0ID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy50aW1lb3V0LCBmaWxlcyk7XG5cblx0XHRcdFx0XHQvLyBIYXMgdG8gYmUgYWZ0ZXIgYC5vcGVuKClgLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvaXNzdWVzLzE3OVxuXHRcdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIXRoaXMub3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XG5cblx0XHRcdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0X3RoaXMxNi5fZmluaXNoZWRVcGxvYWRpbmcoZmlsZXMsIHhociwgZSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRfdGhpczE2Ll9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Ly8gU29tZSBicm93c2VycyBkbyBub3QgaGF2ZSB0aGUgLnVwbG9hZCBwcm9wZXJ0eVxuXHRcdFx0XHRcdHZhciBwcm9ncmVzc09iaiA9IHhoci51cGxvYWQgIT0gbnVsbCA/IHhoci51cGxvYWQgOiB4aHI7XG5cdFx0XHRcdFx0cHJvZ3Jlc3NPYmoub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczE2Ll91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR2YXIgaGVhZGVycyA9IHtcblx0XHRcdFx0XHRcdEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRcdFx0J0NhY2hlLUNvbnRyb2wnOiAnbm8tY2FjaGUnLFxuXHRcdFx0XHRcdFx0J1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcblx0XHRcdFx0XHRcdERyb3B6b25lLmV4dGVuZChoZWFkZXJzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yICh2YXIgaGVhZGVyTmFtZSBpbiBoZWFkZXJzKSB7XG5cdFx0XHRcdFx0XHR2YXIgaGVhZGVyVmFsdWUgPSBoZWFkZXJzW2hlYWRlck5hbWVdO1xuXHRcdFx0XHRcdFx0aWYgKGhlYWRlclZhbHVlKSB7XG5cdFx0XHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuXHRcdFx0XHRcdC8vIEFkZGluZyBhbGwgQG9wdGlvbnMgcGFyYW1ldGVyc1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMucGFyYW1zKSB7XG5cdFx0XHRcdFx0XHR2YXIgYWRkaXRpb25hbFBhcmFtcyA9IHRoaXMub3B0aW9ucy5wYXJhbXM7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGFkZGl0aW9uYWxQYXJhbXMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0YWRkaXRpb25hbFBhcmFtcyA9IGFkZGl0aW9uYWxQYXJhbXMuY2FsbChcblx0XHRcdFx0XHRcdFx0XHR0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRcdHhocixcblx0XHRcdFx0XHRcdFx0XHRmaWxlc1swXS51cGxvYWQuY2h1bmtlZCA/IHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpIDogbnVsbFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYWRkaXRpb25hbFBhcmFtcykge1xuXHRcdFx0XHRcdFx0XHR2YXIgdmFsdWUgPSBhZGRpdGlvbmFsUGFyYW1zW2tleV07XG5cdFx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBMZXQgdGhlIHVzZXIgYWRkIGFkZGl0aW9uYWwgZGF0YSBpZiBuZWNlc3Nhcnlcblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjIyID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MjIgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRfaTI0ID0gMCxcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjIgPSBfaXNBcnJheTIyID8gX2l0ZXJhdG9yMjIgOiBfaXRlcmF0b3IyMltTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHZhciBfcmVmMjE7XG5cblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTIyKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTI0ID49IF9pdGVyYXRvcjIyLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYyMSA9IF9pdGVyYXRvcjIyW19pMjQrK107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfaTI0ID0gX2l0ZXJhdG9yMjIubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kyNC5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjIxID0gX2kyNC52YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIF9maWxlID0gX3JlZjIxO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3NlbmRpbmcnLCBfZmlsZSwgeGhyLCBmb3JtRGF0YSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnc2VuZGluZ211bHRpcGxlJywgZmlsZXMsIHhociwgZm9ybURhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX2FkZEZvcm1FbGVtZW50RGF0YShmb3JtRGF0YSk7XG5cblx0XHRcdFx0XHQvLyBGaW5hbGx5IGFkZCB0aGUgZmlsZXNcblx0XHRcdFx0XHQvLyBIYXMgdG8gYmUgbGFzdCBiZWNhdXNlIHNvbWUgc2VydmVycyAoZWc6IFMzKSBleHBlY3QgdGhlIGZpbGUgdG8gYmUgdGhlIGxhc3QgcGFyYW1ldGVyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQmxvY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgZGF0YUJsb2NrID0gZGF0YUJsb2Nrc1tpXTtcblx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZChkYXRhQmxvY2submFtZSwgZGF0YUJsb2NrLmRhdGEsIGRhdGFCbG9jay5maWxlbmFtZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5zdWJtaXRSZXF1ZXN0KHhociwgZm9ybURhdGEsIGZpbGVzKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBUcmFuc2Zvcm1zIGFsbCBmaWxlcyB3aXRoIHRoaXMub3B0aW9ucy50cmFuc2Zvcm1GaWxlIGFuZCBpbnZva2VzIGRvbmUgd2l0aCB0aGUgdHJhbnNmb3JtZWQgZmlsZXMgd2hlbiBkb25lLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX3RyYW5zZm9ybUZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF90cmFuc2Zvcm1GaWxlcyhmaWxlcywgZG9uZSkge1xuXHRcdFx0XHRcdHZhciBfdGhpczE3ID0gdGhpcztcblxuXHRcdFx0XHRcdHZhciB0cmFuc2Zvcm1lZEZpbGVzID0gW107XG5cdFx0XHRcdFx0Ly8gQ2x1bXN5IHdheSBvZiBoYW5kbGluZyBhc3luY2hyb25vdXMgY2FsbHMsIHVudGlsIEkgZ2V0IHRvIGFkZCBhIHByb3BlciBGdXR1cmUgbGlicmFyeS5cblx0XHRcdFx0XHR2YXIgZG9uZUNvdW50ZXIgPSAwO1xuXG5cdFx0XHRcdFx0dmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xuXHRcdFx0XHRcdFx0X3RoaXMxNy5vcHRpb25zLnRyYW5zZm9ybUZpbGUuY2FsbChfdGhpczE3LCBmaWxlc1tpXSwgZnVuY3Rpb24odHJhbnNmb3JtZWRGaWxlKSB7XG5cdFx0XHRcdFx0XHRcdHRyYW5zZm9ybWVkRmlsZXNbaV0gPSB0cmFuc2Zvcm1lZEZpbGU7XG5cdFx0XHRcdFx0XHRcdGlmICgrK2RvbmVDb3VudGVyID09PSBmaWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRkb25lKHRyYW5zZm9ybWVkRmlsZXMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0X2xvb3AoaSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFRha2VzIGNhcmUgb2YgYWRkaW5nIG90aGVyIGlucHV0IGVsZW1lbnRzIG9mIHRoZSBmb3JtIHRvIHRoZSBBSkFYIHJlcXVlc3Rcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19hZGRGb3JtRWxlbWVudERhdGEnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2FkZEZvcm1FbGVtZW50RGF0YShmb3JtRGF0YSkge1xuXHRcdFx0XHRcdC8vIFRha2UgY2FyZSBvZiBvdGhlciBpbnB1dCBlbGVtZW50c1xuXHRcdFx0XHRcdGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gJ0ZPUk0nKSB7XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjMgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMjUgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjIzID0gX2lzQXJyYXkyMyA/IF9pdGVyYXRvcjIzIDogX2l0ZXJhdG9yMjNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjIyO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTIzKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjUgPj0gX2l0ZXJhdG9yMjMubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjIgPSBfaXRlcmF0b3IyM1tfaTI1KytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMjUgPSBfaXRlcmF0b3IyMy5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjUuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjIyID0gX2kyNS52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBpbnB1dCA9IF9yZWYyMjtcblxuXHRcdFx0XHRcdFx0XHR2YXIgaW5wdXROYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0XHRcdFx0XHRcdHZhciBpbnB1dFR5cGUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKTtcblx0XHRcdFx0XHRcdFx0aWYgKGlucHV0VHlwZSkgaW5wdXRUeXBlID0gaW5wdXRUeXBlLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGlucHV0IGRvZXNuJ3QgaGF2ZSBhIG5hbWUsIHdlIGNhbid0IHVzZSBpdC5cblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBpbnB1dE5hbWUgPT09ICd1bmRlZmluZWQnIHx8IGlucHV0TmFtZSA9PT0gbnVsbCkgY29udGludWU7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGlucHV0LnRhZ05hbWUgPT09ICdTRUxFQ1QnICYmIGlucHV0Lmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKSkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIFBvc3NpYmx5IG11bHRpcGxlIHZhbHVlc1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjQgPSBpbnB1dC5vcHRpb25zLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI0ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2kyNiA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI0ID0gX2lzQXJyYXkyNCA/IF9pdGVyYXRvcjI0IDogX2l0ZXJhdG9yMjRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjIzO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyNCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNiA+PSBfaXRlcmF0b3IyNC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmMjMgPSBfaXRlcmF0b3IyNFtfaTI2KytdO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2kyNiA9IF9pdGVyYXRvcjI0Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjYuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWYyMyA9IF9pMjYudmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdHZhciBvcHRpb24gPSBfcmVmMjM7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKGlucHV0TmFtZSwgb3B0aW9uLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIWlucHV0VHlwZSB8fCAoaW5wdXRUeXBlICE9PSAnY2hlY2tib3gnICYmIGlucHV0VHlwZSAhPT0gJ3JhZGlvJykgfHwgaW5wdXQuY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZChpbnB1dE5hbWUsIGlucHV0LnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBJbnZva2VkIHdoZW4gdGhlcmUgaXMgbmV3IHByb2dyZXNzIGluZm9ybWF0aW9uIGFib3V0IGdpdmVuIGZpbGVzLlxuXHRcdFx0XHQvLyBJZiBlIGlzIG5vdCBwcm92aWRlZCwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoZSB1cGxvYWQgaXMgZmluaXNoZWQuXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcywgeGhyLCBlKSB7XG5cdFx0XHRcdFx0dmFyIHByb2dyZXNzID0gdm9pZCAwO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHByb2dyZXNzID0gKDEwMCAqIGUubG9hZGVkKSAvIGUudG90YWw7XG5cblx0XHRcdFx0XHRcdGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgZmlsZSA9IGZpbGVzWzBdO1xuXHRcdFx0XHRcdFx0XHQvLyBTaW5jZSB0aGlzIGlzIGEgY2h1bmtlZCB1cGxvYWQsIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBhcHByb3ByaWF0ZSBjaHVuayBwcm9ncmVzcy5cblx0XHRcdFx0XHRcdFx0dmFyIGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZSwgeGhyKTtcblx0XHRcdFx0XHRcdFx0Y2h1bmsucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblx0XHRcdFx0XHRcdFx0Y2h1bmsudG90YWwgPSBlLnRvdGFsO1xuXHRcdFx0XHRcdFx0XHRjaHVuay5ieXRlc1NlbnQgPSBlLmxvYWRlZDtcblx0XHRcdFx0XHRcdFx0dmFyIGZpbGVQcm9ncmVzcyA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZVRvdGFsID0gdm9pZCAwLFxuXHRcdFx0XHRcdFx0XHRcdGZpbGVCeXRlc1NlbnQgPSB2b2lkIDA7XG5cdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLnByb2dyZXNzID0gMDtcblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQudG90YWwgPSAwO1xuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5ieXRlc1NlbnQgPSAwO1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAhPT0gdW5kZWZpbmVkICYmIGZpbGUudXBsb2FkLmNodW5rc1tpXS5wcm9ncmVzcyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5wcm9ncmVzcyArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0ucHJvZ3Jlc3M7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC50b3RhbCArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0udG90YWw7XG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5ieXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLmJ5dGVzU2VudDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSBmaWxlLnVwbG9hZC5wcm9ncmVzcyAvIGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI1ID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI1ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pMjcgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjUgPSBfaXNBcnJheTI1ID8gX2l0ZXJhdG9yMjUgOiBfaXRlcmF0b3IyNVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmMjQ7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyNSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjcgPj0gX2l0ZXJhdG9yMjUubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWYyNCA9IF9pdGVyYXRvcjI1W19pMjcrK107XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pMjcgPSBfaXRlcmF0b3IyNS5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNy5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWYyNCA9IF9pMjcudmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9maWxlMiA9IF9yZWYyNDtcblxuXHRcdFx0XHRcdFx0XHRcdF9maWxlMi51cGxvYWQucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblx0XHRcdFx0XHRcdFx0XHRfZmlsZTIudXBsb2FkLnRvdGFsID0gZS50b3RhbDtcblx0XHRcdFx0XHRcdFx0XHRfZmlsZTIudXBsb2FkLmJ5dGVzU2VudCA9IGUubG9hZGVkO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjYgPSBmaWxlcyxcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI2ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRfaTI4ID0gMCxcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyNiA9IF9pc0FycmF5MjYgPyBfaXRlcmF0b3IyNiA6IF9pdGVyYXRvcjI2W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyNTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyNikge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTI4ID49IF9pdGVyYXRvcjI2Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI1ID0gX2l0ZXJhdG9yMjZbX2kyOCsrXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRfaTI4ID0gX2l0ZXJhdG9yMjYubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTI4LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYyNSA9IF9pMjgudmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHR2YXIgX2ZpbGUzID0gX3JlZjI1O1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgndXBsb2FkcHJvZ3Jlc3MnLCBfZmlsZTMsIF9maWxlMy51cGxvYWQucHJvZ3Jlc3MsIF9maWxlMy51cGxvYWQuYnl0ZXNTZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW4gdGhlIGZpbGUgZmluaXNoZWQgdXBsb2FkaW5nXG5cblx0XHRcdFx0XHRcdHZhciBhbGxGaWxlc0ZpbmlzaGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdFx0cHJvZ3Jlc3MgPSAxMDA7XG5cblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyNyA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjcgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMjkgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI3ID0gX2lzQXJyYXkyNyA/IF9pdGVyYXRvcjI3IDogX2l0ZXJhdG9yMjdbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjI2O1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI3KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjkgPj0gX2l0ZXJhdG9yMjcubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjYgPSBfaXRlcmF0b3IyN1tfaTI5KytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMjkgPSBfaXRlcmF0b3IyNy5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjkuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI2ID0gX2kyOS52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBfZmlsZTQgPSBfcmVmMjY7XG5cblx0XHRcdFx0XHRcdFx0aWYgKF9maWxlNC51cGxvYWQucHJvZ3Jlc3MgIT09IDEwMCB8fCBfZmlsZTQudXBsb2FkLmJ5dGVzU2VudCAhPT0gX2ZpbGU0LnVwbG9hZC50b3RhbCkge1xuXHRcdFx0XHRcdFx0XHRcdGFsbEZpbGVzRmluaXNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRfZmlsZTQudXBsb2FkLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG5cdFx0XHRcdFx0XHRcdF9maWxlNC51cGxvYWQuYnl0ZXNTZW50ID0gX2ZpbGU0LnVwbG9hZC50b3RhbDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTm90aGluZyB0byBkbywgYWxsIGZpbGVzIGFscmVhZHkgYXQgMTAwJVxuXHRcdFx0XHRcdFx0aWYgKGFsbEZpbGVzRmluaXNoZWQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjggPSBmaWxlcyxcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI4ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRfaTMwID0gMCxcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyOCA9IF9pc0FycmF5MjggPyBfaXRlcmF0b3IyOCA6IF9pdGVyYXRvcjI4W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyNztcblxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyOCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTMwID49IF9pdGVyYXRvcjI4Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI3ID0gX2l0ZXJhdG9yMjhbX2kzMCsrXTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRfaTMwID0gX2l0ZXJhdG9yMjgubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTMwLmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYyNyA9IF9pMzAudmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHR2YXIgX2ZpbGU1ID0gX3JlZjI3O1xuXG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgndXBsb2FkcHJvZ3Jlc3MnLCBfZmlsZTUsIHByb2dyZXNzLCBfZmlsZTUudXBsb2FkLmJ5dGVzU2VudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX2ZpbmlzaGVkVXBsb2FkaW5nJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9maW5pc2hlZFVwbG9hZGluZyhmaWxlcywgeGhyLCBlKSB7XG5cdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gdm9pZCAwO1xuXG5cdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnN0YXR1cyA9PT0gRHJvcHpvbmUuQ0FOQ0VMRUQpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoeGhyLnJlc3BvbnNlVHlwZSAhPT0gJ2FycmF5YnVmZmVyJyAmJiB4aHIucmVzcG9uc2VUeXBlICE9PSAnYmxvYicpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcblxuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHR4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpICYmXG5cdFx0XHRcdFx0XHRcdH54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKVxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRlID0gZXJyb3I7XG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSAnSW52YWxpZCBKU09OIHJlc3BvbnNlIGZyb20gc2VydmVyLic7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzKTtcblxuXHRcdFx0XHRcdGlmICghKDIwMCA8PSB4aHIuc3RhdHVzICYmIHhoci5zdGF0dXMgPCAzMDApKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyLCByZXNwb25zZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xuXHRcdFx0XHRcdFx0XHRmaWxlc1swXS51cGxvYWQuZmluaXNoZWRDaHVua1VwbG9hZCh0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9maW5pc2hlZChmaWxlcywgcmVzcG9uc2UsIGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19oYW5kbGVVcGxvYWRFcnJvcicsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgcmVzcG9uc2UpIHtcblx0XHRcdFx0XHRpZiAoZmlsZXNbMF0uc3RhdHVzID09PSBEcm9wem9uZS5DQU5DRUxFRCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCAmJiB0aGlzLm9wdGlvbnMucmV0cnlDaHVua3MpIHtcblx0XHRcdFx0XHRcdHZhciBjaHVuayA9IHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpO1xuXHRcdFx0XHRcdFx0aWYgKGNodW5rLnJldHJpZXMrKyA8IHRoaXMub3B0aW9ucy5yZXRyeUNodW5rc0xpbWl0KSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3VwbG9hZERhdGEoZmlsZXMsIFtjaHVuay5kYXRhQmxvY2tdKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdSZXRyaWVkIHRoaXMgY2h1bmsgdG9vIG9mdGVuLiBHaXZpbmcgdXAuJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyOSA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTI5ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kzMSA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI5ID0gX2lzQXJyYXkyOSA/IF9pdGVyYXRvcjI5IDogX2l0ZXJhdG9yMjlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjI4O1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyOSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kzMSA+PSBfaXRlcmF0b3IyOS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMjggPSBfaXRlcmF0b3IyOVtfaTMxKytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kzMSA9IF9pdGVyYXRvcjI5Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzEuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYyOCA9IF9pMzEudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjI4O1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9lcnJvclByb2Nlc3NpbmcoXG5cdFx0XHRcdFx0XHRcdGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSB8fCB0aGlzLm9wdGlvbnMuZGljdFJlc3BvbnNlRXJyb3IucmVwbGFjZSgne3tzdGF0dXNDb2RlfX0nLCB4aHIuc3RhdHVzKSxcblx0XHRcdFx0XHRcdFx0eGhyXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3N1Ym1pdFJlcXVlc3QnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcykge1xuXHRcdFx0XHRcdHhoci5zZW5kKGZvcm1EYXRhKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYWxsZWQgaW50ZXJuYWxseSB3aGVuIHByb2Nlc3NpbmcgaXMgZmluaXNoZWQuXG5cdFx0XHRcdC8vIEluZGl2aWR1YWwgY2FsbGJhY2tzIGhhdmUgdG8gYmUgY2FsbGVkIGluIHRoZSBhcHByb3ByaWF0ZSBzZWN0aW9ucy5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19maW5pc2hlZCcsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlVGV4dCwgZSkge1xuXHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMzAgPSBmaWxlcyxcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkzMCA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdF9pMzIgPSAwLFxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IzMCA9IF9pc0FycmF5MzAgPyBfaXRlcmF0b3IzMCA6IF9pdGVyYXRvcjMwW1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dmFyIF9yZWYyOTtcblxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MzApIHtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzIgPj0gX2l0ZXJhdG9yMzAubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjI5ID0gX2l0ZXJhdG9yMzBbX2kzMisrXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF9pMzIgPSBfaXRlcmF0b3IzMC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTMyLmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMjkgPSBfaTMyLnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYyOTtcblxuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5TVUNDRVNTO1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdzdWNjZXNzJywgZmlsZSwgcmVzcG9uc2VUZXh0LCBlKTtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGUnLCBmaWxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdzdWNjZXNzbXVsdGlwbGUnLCBmaWxlcywgcmVzcG9uc2VUZXh0LCBlKTtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGVtdWx0aXBsZScsIGZpbGVzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBDYWxsZWQgaW50ZXJuYWxseSB3aGVuIHByb2Nlc3NpbmcgaXMgZmluaXNoZWQuXG5cdFx0XHRcdC8vIEluZGl2aWR1YWwgY2FsbGJhY2tzIGhhdmUgdG8gYmUgY2FsbGVkIGluIHRoZSBhcHByb3ByaWF0ZSBzZWN0aW9ucy5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19lcnJvclByb2Nlc3NpbmcnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2Vycm9yUHJvY2Vzc2luZyhmaWxlcywgbWVzc2FnZSwgeGhyKSB7XG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IzMSA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTMxID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kzMyA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjMxID0gX2lzQXJyYXkzMSA/IF9pdGVyYXRvcjMxIDogX2l0ZXJhdG9yMzFbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjMwO1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkzMSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kzMyA+PSBfaXRlcmF0b3IzMS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMzAgPSBfaXRlcmF0b3IzMVtfaTMzKytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kzMyA9IF9pdGVyYXRvcjMxLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzMuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYzMCA9IF9pMzMudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjMwO1xuXG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLkVSUk9SO1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdlcnJvcicsIGZpbGUsIG1lc3NhZ2UsIHhocik7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NvbXBsZXRlJywgZmlsZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnZXJyb3JtdWx0aXBsZScsIGZpbGVzLCBtZXNzYWdlLCB4aHIpO1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjb21wbGV0ZW11bHRpcGxlJywgZmlsZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRdLFxuXHRcdFtcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAndXVpZHY0Jyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHV1aWR2NCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG5cdFx0XHRcdFx0XHR2YXIgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMCxcblx0XHRcdFx0XHRcdFx0diA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdF1cblx0KTtcblxuXHRyZXR1cm4gRHJvcHpvbmU7XG59KShFbWl0dGVyKTtcblxuRHJvcHpvbmUuaW5pdENsYXNzKCk7XG5cbkRyb3B6b25lLnZlcnNpb24gPSAnNS4yLjAnO1xuXG4vLyBUaGlzIGlzIGEgbWFwIG9mIG9wdGlvbnMgZm9yIHlvdXIgZGlmZmVyZW50IGRyb3B6b25lcy4gQWRkIGNvbmZpZ3VyYXRpb25zXG4vLyB0byB0aGlzIG9iamVjdCBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmUgZWxlbWVucy5cbi8vXG4vLyBFeGFtcGxlOlxuLy9cbi8vICAgICBEcm9wem9uZS5vcHRpb25zLm15RHJvcHpvbmVFbGVtZW50SWQgPSB7IG1heEZpbGVzaXplOiAxIH07XG4vL1xuLy8gVG8gZGlzYWJsZSBhdXRvRGlzY292ZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCwgeW91IGNhbiBzZXQgYGZhbHNlYCBhcyBhbiBvcHRpb246XG4vL1xuLy8gICAgIERyb3B6b25lLm9wdGlvbnMubXlEaXNhYmxlZEVsZW1lbnRJZCA9IGZhbHNlO1xuLy9cbi8vIEFuZCBpbiBodG1sOlxuLy9cbi8vICAgICA8Zm9ybSBhY3Rpb249XCIvdXBsb2FkXCIgaWQ9XCJteS1kcm9wem9uZS1lbGVtZW50LWlkXCIgY2xhc3M9XCJkcm9wem9uZVwiPjwvZm9ybT5cbkRyb3B6b25lLm9wdGlvbnMgPSB7fTtcblxuLy8gUmV0dXJucyB0aGUgb3B0aW9ucyBmb3IgYW4gZWxlbWVudCBvciB1bmRlZmluZWQgaWYgbm9uZSBhdmFpbGFibGUuXG5Ecm9wem9uZS5vcHRpb25zRm9yRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0Ly8gR2V0IHRoZSBgRHJvcHpvbmUub3B0aW9ucy5lbGVtZW50SWRgIGZvciB0aGlzIGVsZW1lbnQgaWYgaXQgZXhpc3RzXG5cdGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKSkge1xuXHRcdHJldHVybiBEcm9wem9uZS5vcHRpb25zW2NhbWVsaXplKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpKV07XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxufTtcblxuLy8gSG9sZHMgYSBsaXN0IG9mIGFsbCBkcm9wem9uZSBpbnN0YW5jZXNcbkRyb3B6b25lLmluc3RhbmNlcyA9IFtdO1xuXG4vLyBSZXR1cm5zIHRoZSBkcm9wem9uZSBmb3IgZ2l2ZW4gZWxlbWVudCBpZiBhbnlcbkRyb3B6b25lLmZvckVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cdGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcblx0XHRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcblx0fVxuXHRpZiAoKGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuZHJvcHpvbmUgOiB1bmRlZmluZWQpID09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcIk5vIERyb3B6b25lIGZvdW5kIGZvciBnaXZlbiBlbGVtZW50LiBUaGlzIGlzIHByb2JhYmx5IGJlY2F1c2UgeW91J3JlIHRyeWluZyB0byBhY2Nlc3MgaXQgYmVmb3JlIERyb3B6b25lIGhhZCB0aGUgdGltZSB0byBpbml0aWFsaXplLiBVc2UgdGhlIGBpbml0YCBvcHRpb24gdG8gc2V0dXAgYW55IGFkZGl0aW9uYWwgb2JzZXJ2ZXJzIG9uIHlvdXIgRHJvcHpvbmUuXCJcblx0XHQpO1xuXHR9XG5cdHJldHVybiBlbGVtZW50LmRyb3B6b25lO1xufTtcblxuLy8gU2V0IHRvIGZhbHNlIGlmIHlvdSBkb24ndCB3YW50IERyb3B6b25lIHRvIGF1dG9tYXRpY2FsbHkgZmluZCBhbmQgYXR0YWNoIHRvIC5kcm9wem9uZSBlbGVtZW50cy5cbkRyb3B6b25lLmF1dG9EaXNjb3ZlciA9IHRydWU7XG5cbi8vIExvb2tzIGZvciBhbGwgLmRyb3B6b25lIGVsZW1lbnRzIGFuZCBjcmVhdGVzIGEgZHJvcHpvbmUgZm9yIHRoZW1cbkRyb3B6b25lLmRpc2NvdmVyID0gZnVuY3Rpb24oKSB7XG5cdHZhciBkcm9wem9uZXMgPSB2b2lkIDA7XG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSB7XG5cdFx0ZHJvcHpvbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyb3B6b25lJyk7XG5cdH0gZWxzZSB7XG5cdFx0ZHJvcHpvbmVzID0gW107XG5cdFx0Ly8gSUUgOihcblx0XHR2YXIgY2hlY2tFbGVtZW50cyA9IGZ1bmN0aW9uIGNoZWNrRWxlbWVudHMoZWxlbWVudHMpIHtcblx0XHRcdHJldHVybiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMzIgPSBlbGVtZW50cyxcblx0XHRcdFx0XHRcdF9pc0FycmF5MzIgPSB0cnVlLFxuXHRcdFx0XHRcdFx0X2kzNCA9IDAsXG5cdFx0XHRcdFx0XHRfaXRlcmF0b3IzMiA9IF9pc0FycmF5MzIgPyBfaXRlcmF0b3IzMiA6IF9pdGVyYXRvcjMyW1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0dmFyIF9yZWYzMTtcblxuXHRcdFx0XHRcdGlmIChfaXNBcnJheTMyKSB7XG5cdFx0XHRcdFx0XHRpZiAoX2kzNCA+PSBfaXRlcmF0b3IzMi5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0X3JlZjMxID0gX2l0ZXJhdG9yMzJbX2kzNCsrXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X2kzNCA9IF9pdGVyYXRvcjMyLm5leHQoKTtcblx0XHRcdFx0XHRcdGlmIChfaTM0LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0X3JlZjMxID0gX2kzNC52YWx1ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgZWwgPSBfcmVmMzE7XG5cblx0XHRcdFx0XHRpZiAoLyhefCApZHJvcHpvbmUoJHwgKS8udGVzdChlbC5jbGFzc05hbWUpKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChkcm9wem9uZXMucHVzaChlbCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSkoKTtcblx0XHR9O1xuXHRcdGNoZWNrRWxlbWVudHMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpKTtcblx0XHRjaGVja0VsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJykpO1xuXHR9XG5cblx0cmV0dXJuIChmdW5jdGlvbigpIHtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0Zm9yIChcblx0XHRcdHZhciBfaXRlcmF0b3IzMyA9IGRyb3B6b25lcyxcblx0XHRcdFx0X2lzQXJyYXkzMyA9IHRydWUsXG5cdFx0XHRcdF9pMzUgPSAwLFxuXHRcdFx0XHRfaXRlcmF0b3IzMyA9IF9pc0FycmF5MzMgPyBfaXRlcmF0b3IzMyA6IF9pdGVyYXRvcjMzW1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdDtcblxuXHRcdCkge1xuXHRcdFx0dmFyIF9yZWYzMjtcblxuXHRcdFx0aWYgKF9pc0FycmF5MzMpIHtcblx0XHRcdFx0aWYgKF9pMzUgPj0gX2l0ZXJhdG9yMzMubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0X3JlZjMyID0gX2l0ZXJhdG9yMzNbX2kzNSsrXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF9pMzUgPSBfaXRlcmF0b3IzMy5uZXh0KCk7XG5cdFx0XHRcdGlmIChfaTM1LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRfcmVmMzIgPSBfaTM1LnZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZHJvcHpvbmUgPSBfcmVmMzI7XG5cblx0XHRcdC8vIENyZWF0ZSBhIGRyb3B6b25lIHVubGVzcyBhdXRvIGRpc2NvdmVyIGhhcyBiZWVuIGRpc2FibGVkIGZvciBzcGVjaWZpYyBlbGVtZW50XG5cdFx0XHRpZiAoRHJvcHpvbmUub3B0aW9uc0ZvckVsZW1lbnQoZHJvcHpvbmUpICE9PSBmYWxzZSkge1xuXHRcdFx0XHRyZXN1bHQucHVzaChuZXcgRHJvcHpvbmUoZHJvcHpvbmUpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0pKCk7XG59O1xuXG4vLyBTaW5jZSB0aGUgd2hvbGUgRHJhZyduJ0Ryb3AgQVBJIGlzIHByZXR0eSBuZXcsIHNvbWUgYnJvd3NlcnMgaW1wbGVtZW50IGl0LFxuLy8gYnV0IG5vdCBjb3JyZWN0bHkuXG4vLyBTbyBJIGNyZWF0ZWQgYSBibGFja2xpc3Qgb2YgdXNlckFnZW50cy4gWWVzLCB5ZXMuIEJyb3dzZXIgc25pZmZpbmcsIEkga25vdy5cbi8vIEJ1dCB3aGF0IHRvIGRvIHdoZW4gYnJvd3NlcnMgKnRoZW9yZXRpY2FsbHkqIHN1cHBvcnQgYW4gQVBJLCBidXQgY3Jhc2hcbi8vIHdoZW4gdXNpbmcgaXQuXG4vL1xuLy8gVGhpcyBpcyBhIGxpc3Qgb2YgcmVndWxhciBleHByZXNzaW9ucyB0ZXN0ZWQgYWdhaW5zdCBuYXZpZ2F0b3IudXNlckFnZW50XG4vL1xuLy8gKiogSXQgc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiBicm93c2VyIHRoYXQgKmRvKiBzdXBwb3J0IHRoZSBBUEksIGJ1dFxuLy8gaW5jb3JyZWN0bHkgKipcbi8vXG5Ecm9wem9uZS5ibGFja2xpc3RlZEJyb3dzZXJzID0gW1xuXHQvLyBUaGUgbWFjIG9zIGFuZCB3aW5kb3dzIHBob25lIHZlcnNpb24gb2Ygb3BlcmEgMTIgc2VlbXMgdG8gaGF2ZSBhIHByb2JsZW0gd2l0aCB0aGUgRmlsZSBkcmFnJ24nZHJvcCBBUEkuXG5cdC9vcGVyYS4qKE1hY2ludG9zaHxXaW5kb3dzIFBob25lKS4qdmVyc2lvblxcLzEyL2ksXG5dO1xuXG4vLyBDaGVja3MgaWYgdGhlIGJyb3dzZXIgaXMgc3VwcG9ydGVkXG5Ecm9wem9uZS5pc0Jyb3dzZXJTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcblx0dmFyIGNhcGFibGVCcm93c2VyID0gdHJ1ZTtcblxuXHRpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iICYmIHdpbmRvdy5Gb3JtRGF0YSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSB7XG5cdFx0aWYgKCEoJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpKSkge1xuXHRcdFx0Y2FwYWJsZUJyb3dzZXIgPSBmYWxzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gVGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIEFQSSwgYnV0IG1heSBiZSBibGFja2xpc3RlZC5cblx0XHRcdGZvciAoXG5cdFx0XHRcdHZhciBfaXRlcmF0b3IzNCA9IERyb3B6b25lLmJsYWNrbGlzdGVkQnJvd3NlcnMsXG5cdFx0XHRcdFx0X2lzQXJyYXkzNCA9IHRydWUsXG5cdFx0XHRcdFx0X2kzNiA9IDAsXG5cdFx0XHRcdFx0X2l0ZXJhdG9yMzQgPSBfaXNBcnJheTM0ID8gX2l0ZXJhdG9yMzQgOiBfaXRlcmF0b3IzNFtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdDtcblxuXHRcdFx0KSB7XG5cdFx0XHRcdHZhciBfcmVmMzM7XG5cblx0XHRcdFx0aWYgKF9pc0FycmF5MzQpIHtcblx0XHRcdFx0XHRpZiAoX2kzNiA+PSBfaXRlcmF0b3IzNC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdF9yZWYzMyA9IF9pdGVyYXRvcjM0W19pMzYrK107XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X2kzNiA9IF9pdGVyYXRvcjM0Lm5leHQoKTtcblx0XHRcdFx0XHRpZiAoX2kzNi5kb25lKSBicmVhaztcblx0XHRcdFx0XHRfcmVmMzMgPSBfaTM2LnZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHJlZ2V4ID0gX3JlZjMzO1xuXG5cdFx0XHRcdGlmIChyZWdleC50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdFx0XHRcdFx0Y2FwYWJsZUJyb3dzZXIgPSBmYWxzZTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRjYXBhYmxlQnJvd3NlciA9IGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIGNhcGFibGVCcm93c2VyO1xufTtcblxuRHJvcHpvbmUuZGF0YVVSSXRvQmxvYiA9IGZ1bmN0aW9uKGRhdGFVUkkpIHtcblx0Ly8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcblx0Ly8gZG9lc24ndCBoYW5kbGUgVVJMRW5jb2RlZCBEYXRhVVJJcyAtIHNlZSBTTyBhbnN3ZXIgIzY4NTAyNzYgZm9yIGNvZGUgdGhhdCBkb2VzIHRoaXNcblx0dmFyIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cblx0Ly8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuXHR2YXIgbWltZVN0cmluZyA9IGRhdGFVUklcblx0XHQuc3BsaXQoJywnKVswXVxuXHRcdC5zcGxpdCgnOicpWzFdXG5cdFx0LnNwbGl0KCc7JylbMF07XG5cblx0Ly8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYW4gQXJyYXlCdWZmZXJcblx0dmFyIGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcblx0dmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuXHRmb3IgKHZhciBpID0gMCwgZW5kID0gYnl0ZVN0cmluZy5sZW5ndGgsIGFzYyA9IDAgPD0gZW5kOyBhc2MgPyBpIDw9IGVuZCA6IGkgPj0gZW5kOyBhc2MgPyBpKysgOiBpLS0pIHtcblx0XHRpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcblx0fVxuXG5cdC8vIHdyaXRlIHRoZSBBcnJheUJ1ZmZlciB0byBhIGJsb2Jcblx0cmV0dXJuIG5ldyBCbG9iKFthYl0sIHsgdHlwZTogbWltZVN0cmluZyB9KTtcbn07XG5cbi8vIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgcmVqZWN0ZWQgaXRlbVxudmFyIHdpdGhvdXQgPSBmdW5jdGlvbiB3aXRob3V0KGxpc3QsIHJlamVjdGVkSXRlbSkge1xuXHRyZXR1cm4gbGlzdFxuXHRcdC5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0cmV0dXJuIGl0ZW0gIT09IHJlamVjdGVkSXRlbTtcblx0XHR9KVxuXHRcdC5tYXAoZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSk7XG59O1xuXG4vLyBhYmMtZGVmX2doaSAtPiBhYmNEZWZHaGlcbnZhciBjYW1lbGl6ZSA9IGZ1bmN0aW9uIGNhbWVsaXplKHN0cikge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1fXShcXHcpL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG5cdFx0cmV0dXJuIG1hdGNoLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xuXHR9KTtcbn07XG5cbi8vIENyZWF0ZXMgYW4gZWxlbWVudCBmcm9tIHN0cmluZ1xuRHJvcHpvbmUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKHN0cmluZykge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpdi5pbm5lckhUTUwgPSBzdHJpbmc7XG5cdHJldHVybiBkaXYuY2hpbGROb2Rlc1swXTtcbn07XG5cbi8vIFRlc3RzIGlmIGdpdmVuIGVsZW1lbnQgaXMgaW5zaWRlIChvciBzaW1wbHkgaXMpIHRoZSBjb250YWluZXJcbkRyb3B6b25lLmVsZW1lbnRJbnNpZGUgPSBmdW5jdGlvbihlbGVtZW50LCBjb250YWluZXIpIHtcblx0aWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IC8vIENvZmZlZXNjcmlwdCBkb2Vzbid0IHN1cHBvcnQgZG8vd2hpbGUgbG9vcHNcblx0d2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSkge1xuXHRcdGlmIChlbGVtZW50ID09PSBjb250YWluZXIpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5Ecm9wem9uZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24oZWwsIG5hbWUpIHtcblx0dmFyIGVsZW1lbnQgPSB2b2lkIDA7XG5cdGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG5cdFx0ZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHR9IGVsc2UgaWYgKGVsLm5vZGVUeXBlICE9IG51bGwpIHtcblx0XHRlbGVtZW50ID0gZWw7XG5cdH1cblx0aWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBgJyArIG5hbWUgKyAnYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yIG9yIGEgcGxhaW4gSFRNTCBlbGVtZW50LicpO1xuXHR9XG5cdHJldHVybiBlbGVtZW50O1xufTtcblxuRHJvcHpvbmUuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbihlbHMsIG5hbWUpIHtcblx0dmFyIGVsID0gdm9pZCAwLFxuXHRcdGVsZW1lbnRzID0gdm9pZCAwO1xuXHRpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRlbGVtZW50cyA9IFtdO1xuXHRcdHRyeSB7XG5cdFx0XHRmb3IgKFxuXHRcdFx0XHR2YXIgX2l0ZXJhdG9yMzUgPSBlbHMsXG5cdFx0XHRcdFx0X2lzQXJyYXkzNSA9IHRydWUsXG5cdFx0XHRcdFx0X2kzNyA9IDAsXG5cdFx0XHRcdFx0X2l0ZXJhdG9yMzUgPSBfaXNBcnJheTM1ID8gX2l0ZXJhdG9yMzUgOiBfaXRlcmF0b3IzNVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdDtcblxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmIChfaXNBcnJheTM1KSB7XG5cdFx0XHRcdFx0aWYgKF9pMzcgPj0gX2l0ZXJhdG9yMzUubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRlbCA9IF9pdGVyYXRvcjM1W19pMzcrK107XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X2kzNyA9IF9pdGVyYXRvcjM1Lm5leHQoKTtcblx0XHRcdFx0XHRpZiAoX2kzNy5kb25lKSBicmVhaztcblx0XHRcdFx0XHRlbCA9IF9pMzcudmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50cy5wdXNoKHRoaXMuZ2V0RWxlbWVudChlbCwgbmFtZSkpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGVsZW1lbnRzID0gbnVsbDtcblx0XHR9XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVscyA9PT0gJ3N0cmluZycpIHtcblx0XHRlbGVtZW50cyA9IFtdO1xuXHRcdGZvciAoXG5cdFx0XHR2YXIgX2l0ZXJhdG9yMzYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVscyksXG5cdFx0XHRcdF9pc0FycmF5MzYgPSB0cnVlLFxuXHRcdFx0XHRfaTM4ID0gMCxcblx0XHRcdFx0X2l0ZXJhdG9yMzYgPSBfaXNBcnJheTM2ID8gX2l0ZXJhdG9yMzYgOiBfaXRlcmF0b3IzNltTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHQ7XG5cblx0XHQpIHtcblx0XHRcdGlmIChfaXNBcnJheTM2KSB7XG5cdFx0XHRcdGlmIChfaTM4ID49IF9pdGVyYXRvcjM2Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdGVsID0gX2l0ZXJhdG9yMzZbX2kzOCsrXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF9pMzggPSBfaXRlcmF0b3IzNi5uZXh0KCk7XG5cdFx0XHRcdGlmIChfaTM4LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRlbCA9IF9pMzgudmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW1lbnRzLnB1c2goZWwpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChlbHMubm9kZVR5cGUgIT0gbnVsbCkge1xuXHRcdGVsZW1lbnRzID0gW2Vsc107XG5cdH1cblxuXHRpZiAoZWxlbWVudHMgPT0gbnVsbCB8fCAhZWxlbWVudHMubGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0J0ludmFsaWQgYCcgKyBuYW1lICsgJ2Agb3B0aW9uIHByb3ZpZGVkLiBQbGVhc2UgcHJvdmlkZSBhIENTUyBzZWxlY3RvciwgYSBwbGFpbiBIVE1MIGVsZW1lbnQgb3IgYSBsaXN0IG9mIHRob3NlLidcblx0XHQpO1xuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnRzO1xufTtcblxuLy8gQXNrcyB0aGUgdXNlciB0aGUgcXVlc3Rpb24gYW5kIGNhbGxzIGFjY2VwdGVkIG9yIHJlamVjdGVkIGFjY29yZGluZ2x5XG4vL1xuLy8gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24ganVzdCB1c2VzIGB3aW5kb3cuY29uZmlybWAgYW5kIHRoZW4gY2FsbHMgdGhlXG4vLyBhcHByb3ByaWF0ZSBjYWxsYmFjay5cbkRyb3B6b25lLmNvbmZpcm0gPSBmdW5jdGlvbihxdWVzdGlvbiwgYWNjZXB0ZWQsIHJlamVjdGVkKSB7XG5cdGlmICh3aW5kb3cuY29uZmlybShxdWVzdGlvbikpIHtcblx0XHRyZXR1cm4gYWNjZXB0ZWQoKTtcblx0fSBlbHNlIGlmIChyZWplY3RlZCAhPSBudWxsKSB7XG5cdFx0cmV0dXJuIHJlamVjdGVkKCk7XG5cdH1cbn07XG5cbi8vIFZhbGlkYXRlcyB0aGUgbWltZSB0eXBlIGxpa2UgdGhpczpcbi8vXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0hUTUwvRWxlbWVudC9pbnB1dCNhdHRyLWFjY2VwdFxuRHJvcHpvbmUuaXNWYWxpZEZpbGUgPSBmdW5jdGlvbihmaWxlLCBhY2NlcHRlZEZpbGVzKSB7XG5cdGlmICghYWNjZXB0ZWRGaWxlcykge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IC8vIElmIHRoZXJlIGFyZSBubyBhY2NlcHRlZCBtaW1lIHR5cGVzLCBpdCdzIE9LXG5cdGFjY2VwdGVkRmlsZXMgPSBhY2NlcHRlZEZpbGVzLnNwbGl0KCcsJyk7XG5cblx0dmFyIG1pbWVUeXBlID0gZmlsZS50eXBlO1xuXHR2YXIgYmFzZU1pbWVUeXBlID0gbWltZVR5cGUucmVwbGFjZSgvXFwvLiokLywgJycpO1xuXG5cdGZvciAoXG5cdFx0dmFyIF9pdGVyYXRvcjM3ID0gYWNjZXB0ZWRGaWxlcyxcblx0XHRcdF9pc0FycmF5MzcgPSB0cnVlLFxuXHRcdFx0X2kzOSA9IDAsXG5cdFx0XHRfaXRlcmF0b3IzNyA9IF9pc0FycmF5MzcgPyBfaXRlcmF0b3IzNyA6IF9pdGVyYXRvcjM3W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHQ7XG5cblx0KSB7XG5cdFx0dmFyIF9yZWYzNDtcblxuXHRcdGlmIChfaXNBcnJheTM3KSB7XG5cdFx0XHRpZiAoX2kzOSA+PSBfaXRlcmF0b3IzNy5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0X3JlZjM0ID0gX2l0ZXJhdG9yMzdbX2kzOSsrXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0X2kzOSA9IF9pdGVyYXRvcjM3Lm5leHQoKTtcblx0XHRcdGlmIChfaTM5LmRvbmUpIGJyZWFrO1xuXHRcdFx0X3JlZjM0ID0gX2kzOS52YWx1ZTtcblx0XHR9XG5cblx0XHR2YXIgdmFsaWRUeXBlID0gX3JlZjM0O1xuXG5cdFx0dmFsaWRUeXBlID0gdmFsaWRUeXBlLnRyaW0oKTtcblx0XHRpZiAodmFsaWRUeXBlLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG5cdFx0XHRpZiAoZmlsZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih2YWxpZFR5cGUudG9Mb3dlckNhc2UoKSwgZmlsZS5uYW1lLmxlbmd0aCAtIHZhbGlkVHlwZS5sZW5ndGgpICE9PSAtMSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKC9cXC9cXCokLy50ZXN0KHZhbGlkVHlwZSkpIHtcblx0XHRcdC8vIFRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSBpbWFnZS8qIG1pbWUgdHlwZVxuXHRcdFx0aWYgKGJhc2VNaW1lVHlwZSA9PT0gdmFsaWRUeXBlLnJlcGxhY2UoL1xcLy4qJC8sICcnKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKG1pbWVUeXBlID09PSB2YWxpZFR5cGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQXVnbWVudCBqUXVlcnlcbmlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiBqUXVlcnkgIT09IG51bGwpIHtcblx0alF1ZXJ5LmZuLmRyb3B6b25lID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbmV3IERyb3B6b25lKHRoaXMsIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9O1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlICE9PSBudWxsKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gRHJvcHpvbmU7XG59IGVsc2Uge1xuXHR3aW5kb3cuRHJvcHpvbmUgPSBEcm9wem9uZTtcbn1cblxuLy8gRHJvcHpvbmUgZmlsZSBzdGF0dXMgY29kZXNcbkRyb3B6b25lLkFEREVEID0gJ2FkZGVkJztcblxuRHJvcHpvbmUuUVVFVUVEID0gJ3F1ZXVlZCc7XG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIE5vdywgaWYgYSBmaWxlIGlzIGFjY2VwdGVkLCBpdCdzIGVpdGhlciBxdWV1ZWRcbi8vIG9yIHVwbG9hZGluZy5cbkRyb3B6b25lLkFDQ0VQVEVEID0gRHJvcHpvbmUuUVVFVUVEO1xuXG5Ecm9wem9uZS5VUExPQURJTkcgPSAndXBsb2FkaW5nJztcbkRyb3B6b25lLlBST0NFU1NJTkcgPSBEcm9wem9uZS5VUExPQURJTkc7IC8vIGFsaWFzXG5cbkRyb3B6b25lLkNBTkNFTEVEID0gJ2NhbmNlbGVkJztcbkRyb3B6b25lLkVSUk9SID0gJ2Vycm9yJztcbkRyb3B6b25lLlNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG5cbi8qXG5cbiBCdWdmaXggZm9yIGlPUyA2IGFuZCA3XG4gU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExOTI5MDk5L2h0bWw1LWNhbnZhcy1kcmF3aW1hZ2UtcmF0aW8tYnVnLWlvc1xuIGJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXG5cbiAqL1xuXG4vLyBEZXRlY3RpbmcgdmVydGljYWwgc3F1YXNoIGluIGxvYWRlZCBpbWFnZS5cbi8vIEZpeGVzIGEgYnVnIHdoaWNoIHNxdWFzaCBpbWFnZSB2ZXJ0aWNhbGx5IHdoaWxlIGRyYXdpbmcgaW50byBjYW52YXMgZm9yIHNvbWUgaW1hZ2VzLlxuLy8gVGhpcyBpcyBhIGJ1ZyBpbiBpT1M2IGRldmljZXMuIFRoaXMgZnVuY3Rpb24gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc3RvbWl0YS9pb3MtaW1hZ2VmaWxlLW1lZ2FwaXhlbFxudmFyIGRldGVjdFZlcnRpY2FsU3F1YXNoID0gZnVuY3Rpb24gZGV0ZWN0VmVydGljYWxTcXVhc2goaW1nKSB7XG5cdHZhciBpdyA9IGltZy5uYXR1cmFsV2lkdGg7XG5cdHZhciBpaCA9IGltZy5uYXR1cmFsSGVpZ2h0O1xuXHR2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cdGNhbnZhcy53aWR0aCA9IDE7XG5cdGNhbnZhcy5oZWlnaHQgPSBpaDtcblx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXHRjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG5cblx0dmFyIF9jdHgkZ2V0SW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgxLCAwLCAxLCBpaCksXG5cdFx0ZGF0YSA9IF9jdHgkZ2V0SW1hZ2VEYXRhLmRhdGE7XG5cblx0Ly8gc2VhcmNoIGltYWdlIGVkZ2UgcGl4ZWwgcG9zaXRpb24gaW4gY2FzZSBpdCBpcyBzcXVhc2hlZCB2ZXJ0aWNhbGx5LlxuXG5cdHZhciBzeSA9IDA7XG5cdHZhciBleSA9IGloO1xuXHR2YXIgcHkgPSBpaDtcblx0d2hpbGUgKHB5ID4gc3kpIHtcblx0XHR2YXIgYWxwaGEgPSBkYXRhWyhweSAtIDEpICogNCArIDNdO1xuXG5cdFx0aWYgKGFscGhhID09PSAwKSB7XG5cdFx0XHRleSA9IHB5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzeSA9IHB5O1xuXHRcdH1cblxuXHRcdHB5ID0gKGV5ICsgc3kpID4+IDE7XG5cdH1cblx0dmFyIHJhdGlvID0gcHkgLyBpaDtcblxuXHRpZiAocmF0aW8gPT09IDApIHtcblx0XHRyZXR1cm4gMTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gcmF0aW87XG5cdH1cbn07XG5cbi8vIEEgcmVwbGFjZW1lbnQgZm9yIGNvbnRleHQuZHJhd0ltYWdlXG4vLyAoYXJncyBhcmUgZm9yIHNvdXJjZSBhbmQgZGVzdGluYXRpb24pLlxudmFyIGRyYXdJbWFnZUlPU0ZpeCA9IGZ1bmN0aW9uIGRyYXdJbWFnZUlPU0ZpeChjdHgsIGltZywgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKSB7XG5cdHZhciB2ZXJ0U3F1YXNoUmF0aW8gPSBkZXRlY3RWZXJ0aWNhbFNxdWFzaChpbWcpO1xuXHRyZXR1cm4gY3R4LmRyYXdJbWFnZShpbWcsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCAvIHZlcnRTcXVhc2hSYXRpbyk7XG59O1xuXG4vLyBCYXNlZCBvbiBNaW5pZnlKcGVnXG4vLyBTb3VyY2U6IGh0dHA6Ly93d3cucGVycnkuY3ovZmlsZXMvRXhpZlJlc3RvcmVyLmpzXG4vLyBodHRwOi8vZWxpY29uLmJsb2c1Ny5mYzIuY29tL2Jsb2ctZW50cnktMjA2Lmh0bWxcblxudmFyIEV4aWZSZXN0b3JlID0gKGZ1bmN0aW9uKCkge1xuXHRmdW5jdGlvbiBFeGlmUmVzdG9yZSgpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhpZlJlc3RvcmUpO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKEV4aWZSZXN0b3JlLCBudWxsLCBbXG5cdFx0e1xuXHRcdFx0a2V5OiAnaW5pdENsYXNzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbml0Q2xhc3MoKSB7XG5cdFx0XHRcdHRoaXMuS0VZX1NUUiA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0a2V5OiAnZW5jb2RlNjQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGVuY29kZTY0KGlucHV0KSB7XG5cdFx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdFx0dmFyIGNocjEgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBjaHIyID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR2YXIgY2hyMyA9ICcnO1xuXHRcdFx0XHR2YXIgZW5jMSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIGVuYzIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBlbmMzID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR2YXIgZW5jNCA9ICcnO1xuXHRcdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdFx0Y2hyMSA9IGlucHV0W2krK107XG5cdFx0XHRcdFx0Y2hyMiA9IGlucHV0W2krK107XG5cdFx0XHRcdFx0Y2hyMyA9IGlucHV0W2krK107XG5cdFx0XHRcdFx0ZW5jMSA9IGNocjEgPj4gMjtcblx0XHRcdFx0XHRlbmMyID0gKChjaHIxICYgMykgPDwgNCkgfCAoY2hyMiA+PiA0KTtcblx0XHRcdFx0XHRlbmMzID0gKChjaHIyICYgMTUpIDw8IDIpIHwgKGNocjMgPj4gNik7XG5cdFx0XHRcdFx0ZW5jNCA9IGNocjMgJiA2Mztcblx0XHRcdFx0XHRpZiAoaXNOYU4oY2hyMikpIHtcblx0XHRcdFx0XHRcdGVuYzMgPSBlbmM0ID0gNjQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpc05hTihjaHIzKSkge1xuXHRcdFx0XHRcdFx0ZW5jNCA9IDY0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRvdXRwdXQgPVxuXHRcdFx0XHRcdFx0b3V0cHV0ICtcblx0XHRcdFx0XHRcdHRoaXMuS0VZX1NUUi5jaGFyQXQoZW5jMSkgK1xuXHRcdFx0XHRcdFx0dGhpcy5LRVlfU1RSLmNoYXJBdChlbmMyKSArXG5cdFx0XHRcdFx0XHR0aGlzLktFWV9TVFIuY2hhckF0KGVuYzMpICtcblx0XHRcdFx0XHRcdHRoaXMuS0VZX1NUUi5jaGFyQXQoZW5jNCk7XG5cdFx0XHRcdFx0Y2hyMSA9IGNocjIgPSBjaHIzID0gJyc7XG5cdFx0XHRcdFx0ZW5jMSA9IGVuYzIgPSBlbmMzID0gZW5jNCA9ICcnO1xuXHRcdFx0XHRcdGlmICghKGkgPCBpbnB1dC5sZW5ndGgpKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdyZXN0b3JlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZXN0b3JlKG9yaWdGaWxlQmFzZTY0LCByZXNpemVkRmlsZUJhc2U2NCkge1xuXHRcdFx0XHRpZiAoIW9yaWdGaWxlQmFzZTY0Lm1hdGNoKCdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciByYXdJbWFnZSA9IHRoaXMuZGVjb2RlNjQob3JpZ0ZpbGVCYXNlNjQucmVwbGFjZSgnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnLCAnJykpO1xuXHRcdFx0XHR2YXIgc2VnbWVudHMgPSB0aGlzLnNsaWNlMlNlZ21lbnRzKHJhd0ltYWdlKTtcblx0XHRcdFx0dmFyIGltYWdlID0gdGhpcy5leGlmTWFuaXB1bGF0aW9uKHJlc2l6ZWRGaWxlQmFzZTY0LCBzZWdtZW50cyk7XG5cdFx0XHRcdHJldHVybiAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgdGhpcy5lbmNvZGU2NChpbWFnZSk7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0a2V5OiAnZXhpZk1hbmlwdWxhdGlvbicsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZXhpZk1hbmlwdWxhdGlvbihyZXNpemVkRmlsZUJhc2U2NCwgc2VnbWVudHMpIHtcblx0XHRcdFx0dmFyIGV4aWZBcnJheSA9IHRoaXMuZ2V0RXhpZkFycmF5KHNlZ21lbnRzKTtcblx0XHRcdFx0dmFyIG5ld0ltYWdlQXJyYXkgPSB0aGlzLmluc2VydEV4aWYocmVzaXplZEZpbGVCYXNlNjQsIGV4aWZBcnJheSk7XG5cdFx0XHRcdHZhciBhQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkobmV3SW1hZ2VBcnJheSk7XG5cdFx0XHRcdHJldHVybiBhQnVmZmVyO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGtleTogJ2dldEV4aWZBcnJheScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0RXhpZkFycmF5KHNlZ21lbnRzKSB7XG5cdFx0XHRcdHZhciBzZWcgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciB4ID0gMDtcblx0XHRcdFx0d2hpbGUgKHggPCBzZWdtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0XHRzZWcgPSBzZWdtZW50c1t4XTtcblx0XHRcdFx0XHRpZiAoKHNlZ1swXSA9PT0gMjU1KSAmIChzZWdbMV0gPT09IDIyNSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHgrKztcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0a2V5OiAnaW5zZXJ0RXhpZicsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5zZXJ0RXhpZihyZXNpemVkRmlsZUJhc2U2NCwgZXhpZkFycmF5KSB7XG5cdFx0XHRcdHZhciBpbWFnZURhdGEgPSByZXNpemVkRmlsZUJhc2U2NC5yZXBsYWNlKCdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcsICcnKTtcblx0XHRcdFx0dmFyIGJ1ZiA9IHRoaXMuZGVjb2RlNjQoaW1hZ2VEYXRhKTtcblx0XHRcdFx0dmFyIHNlcGFyYXRlUG9pbnQgPSBidWYuaW5kZXhPZigyNTUsIDMpO1xuXHRcdFx0XHR2YXIgbWFlID0gYnVmLnNsaWNlKDAsIHNlcGFyYXRlUG9pbnQpO1xuXHRcdFx0XHR2YXIgYXRvID0gYnVmLnNsaWNlKHNlcGFyYXRlUG9pbnQpO1xuXHRcdFx0XHR2YXIgYXJyYXkgPSBtYWU7XG5cdFx0XHRcdGFycmF5ID0gYXJyYXkuY29uY2F0KGV4aWZBcnJheSk7XG5cdFx0XHRcdGFycmF5ID0gYXJyYXkuY29uY2F0KGF0byk7XG5cdFx0XHRcdHJldHVybiBhcnJheTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdzbGljZTJTZWdtZW50cycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gc2xpY2UyU2VnbWVudHMocmF3SW1hZ2VBcnJheSkge1xuXHRcdFx0XHR2YXIgaGVhZCA9IDA7XG5cdFx0XHRcdHZhciBzZWdtZW50cyA9IFtdO1xuXHRcdFx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0XHRcdHZhciBsZW5ndGg7XG5cdFx0XHRcdFx0aWYgKChyYXdJbWFnZUFycmF5W2hlYWRdID09PSAyNTUpICYgKHJhd0ltYWdlQXJyYXlbaGVhZCArIDFdID09PSAyMTgpKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKChyYXdJbWFnZUFycmF5W2hlYWRdID09PSAyNTUpICYgKHJhd0ltYWdlQXJyYXlbaGVhZCArIDFdID09PSAyMTYpKSB7XG5cdFx0XHRcdFx0XHRoZWFkICs9IDI7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxlbmd0aCA9IHJhd0ltYWdlQXJyYXlbaGVhZCArIDJdICogMjU2ICsgcmF3SW1hZ2VBcnJheVtoZWFkICsgM107XG5cdFx0XHRcdFx0XHR2YXIgZW5kUG9pbnQgPSBoZWFkICsgbGVuZ3RoICsgMjtcblx0XHRcdFx0XHRcdHZhciBzZWcgPSByYXdJbWFnZUFycmF5LnNsaWNlKGhlYWQsIGVuZFBvaW50KTtcblx0XHRcdFx0XHRcdHNlZ21lbnRzLnB1c2goc2VnKTtcblx0XHRcdFx0XHRcdGhlYWQgPSBlbmRQb2ludDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGhlYWQgPiByYXdJbWFnZUFycmF5Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzZWdtZW50cztcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdkZWNvZGU2NCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGVjb2RlNjQoaW5wdXQpIHtcblx0XHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0XHR2YXIgY2hyMSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIGNocjIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBjaHIzID0gJyc7XG5cdFx0XHRcdHZhciBlbmMxID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR2YXIgZW5jMiA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIGVuYzMgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBlbmM0ID0gJyc7XG5cdFx0XHRcdHZhciBpID0gMDtcblx0XHRcdFx0dmFyIGJ1ZiA9IFtdO1xuXHRcdFx0XHQvLyByZW1vdmUgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IEEtWiwgYS16LCAwLTksICssIC8sIG9yID1cblx0XHRcdFx0dmFyIGJhc2U2NHRlc3QgPSAvW15BLVphLXowLTlcXCtcXC9cXD1dL2c7XG5cdFx0XHRcdGlmIChiYXNlNjR0ZXN0LmV4ZWMoaW5wdXQpKSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0XCJUaGVyZSB3ZXJlIGludmFsaWQgYmFzZTY0IGNoYXJhY3RlcnMgaW4gdGhlIGlucHV0IHRleHQuXFxuVmFsaWQgYmFzZTY0IGNoYXJhY3RlcnMgYXJlIEEtWiwgYS16LCAwLTksICcrJywgJy8nLGFuZCAnPSdcXG5FeHBlY3QgZXJyb3JzIGluIGRlY29kaW5nLlwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05XFwrXFwvXFw9XS9nLCAnJyk7XG5cdFx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdFx0ZW5jMSA9IHRoaXMuS0VZX1NUUi5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcblx0XHRcdFx0XHRlbmMyID0gdGhpcy5LRVlfU1RSLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuXHRcdFx0XHRcdGVuYzMgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG5cdFx0XHRcdFx0ZW5jNCA9IHRoaXMuS0VZX1NUUi5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcblx0XHRcdFx0XHRjaHIxID0gKGVuYzEgPDwgMikgfCAoZW5jMiA+PiA0KTtcblx0XHRcdFx0XHRjaHIyID0gKChlbmMyICYgMTUpIDw8IDQpIHwgKGVuYzMgPj4gMik7XG5cdFx0XHRcdFx0Y2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNDtcblx0XHRcdFx0XHRidWYucHVzaChjaHIxKTtcblx0XHRcdFx0XHRpZiAoZW5jMyAhPT0gNjQpIHtcblx0XHRcdFx0XHRcdGJ1Zi5wdXNoKGNocjIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZW5jNCAhPT0gNjQpIHtcblx0XHRcdFx0XHRcdGJ1Zi5wdXNoKGNocjMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjaHIxID0gY2hyMiA9IGNocjMgPSAnJztcblx0XHRcdFx0XHRlbmMxID0gZW5jMiA9IGVuYzMgPSBlbmM0ID0gJyc7XG5cdFx0XHRcdFx0aWYgKCEoaSA8IGlucHV0Lmxlbmd0aCkpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gYnVmO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRdKTtcblxuXHRyZXR1cm4gRXhpZlJlc3RvcmU7XG59KSgpO1xuXG5FeGlmUmVzdG9yZS5pbml0Q2xhc3MoKTtcblxuLypcbiAqIGNvbnRlbnRsb2FkZWQuanNcbiAqXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcbiAqIFN1bW1hcnk6IGNyb3NzLWJyb3dzZXIgd3JhcHBlciBmb3IgRE9NQ29udGVudExvYWRlZFxuICogVXBkYXRlZDogMjAxMDEwMjBcbiAqIExpY2Vuc2U6IE1JVFxuICogVmVyc2lvbjogMS4yXG4gKlxuICogVVJMOlxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxuICovXG5cbi8vIEB3aW4gd2luZG93IHJlZmVyZW5jZVxuLy8gQGZuIGZ1bmN0aW9uIHJlZmVyZW5jZVxudmFyIGNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblx0dmFyIGRvbmUgPSBmYWxzZTtcblx0dmFyIHRvcCA9IHRydWU7XG5cdHZhciBkb2MgPSB3aW4uZG9jdW1lbnQ7XG5cdHZhciByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblx0dmFyIGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50Jztcblx0dmFyIHJlbSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50Jztcblx0dmFyIHByZSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJycgOiAnb24nO1xuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uIGluaXQoZSkge1xuXHRcdGlmIChlLnR5cGUgPT09ICdyZWFkeXN0YXRlY2hhbmdlJyAmJiBkb2MucmVhZHlTdGF0ZSAhPT0gJ2NvbXBsZXRlJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHQoZS50eXBlID09PSAnbG9hZCcgPyB3aW4gOiBkb2MpW3JlbV0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG5cdFx0aWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIHtcblx0XHRcdHJldHVybiBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgcG9sbCA9IGZ1bmN0aW9uIHBvbGwoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJvb3QuZG9TY3JvbGwoJ2xlZnQnKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRzZXRUaW1lb3V0KHBvbGwsIDUwKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0cmV0dXJuIGluaXQoJ3BvbGwnKTtcblx0fTtcblxuXHRpZiAoZG9jLnJlYWR5U3RhdGUgIT09ICdjb21wbGV0ZScpIHtcblx0XHRpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50O1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHt9XG5cdFx0XHRpZiAodG9wKSB7XG5cdFx0XHRcdHBvbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG5cdFx0ZG9jW2FkZF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG5cdFx0cmV0dXJuIHdpblthZGRdKHByZSArICdsb2FkJywgaW5pdCwgZmFsc2UpO1xuXHR9XG59O1xuXG4vLyBBcyBhIHNpbmdsZSBmdW5jdGlvbiB0byBiZSBhYmxlIHRvIHdyaXRlIHRlc3RzLlxuRHJvcHpvbmUuX2F1dG9EaXNjb3ZlckZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG5cdGlmIChEcm9wem9uZS5hdXRvRGlzY292ZXIpIHtcblx0XHRyZXR1cm4gRHJvcHpvbmUuZGlzY292ZXIoKTtcblx0fVxufTtcbmNvbnRlbnRMb2FkZWQod2luZG93LCBEcm9wem9uZS5fYXV0b0Rpc2NvdmVyRnVuY3Rpb24pO1xuXG5mdW5jdGlvbiBfX2d1YXJkX18odmFsdWUsIHRyYW5zZm9ybSkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbCA/IHRyYW5zZm9ybSh2YWx1ZSkgOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBfX2d1YXJkTWV0aG9kX18ob2JqLCBtZXRob2ROYW1lLCB0cmFuc2Zvcm0pIHtcblx0aWYgKHR5cGVvZiBvYmogIT09ICd1bmRlZmluZWQnICYmIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIHRyYW5zZm9ybShvYmosIG1ldGhvZE5hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cbn1cblxuU2FwcGhpcmVXaWRnZXRzLkRyb3B6b25lID0gRHJvcHpvbmU7XG4iLCIvKiBDb21wb25lbnQgRXhwYW5kYWJsZUxpbmsgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gd2lkZ2V0SUQgPT4ge1xyXG5cdFx0Y29uc3QgJGVsZW1lbnRXcmFwcGVyID0gJChgIyR7d2lkZ2V0SUR9YCk7XHJcblxyXG5cdFx0aWYgKCRlbGVtZW50V3JhcHBlci5wYXJlbnQoJy5FeHBhbmRhYmxlTGlzdCcpLmhhc0NsYXNzKCdIaWRlV2hlbkVtcHR5JykpIHtcclxuXHRcdFx0Y29uc3QgdGV4dCA9ICRlbGVtZW50V3JhcHBlci5maW5kKCcuRXhwYW5kYWJsZUxpbmtfX0NvbnRlbnQnKS50ZXh0KCk7XHJcblxyXG5cdFx0XHRpZiAodGV4dC5sZW5ndGggPT09IDApICRlbGVtZW50V3JhcHBlci5wYXJlbnQoJy5FeHBhbmRhYmxlTGlzdCcpLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRiaW5kRXZlbnRzKHdpZGdldElEKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBiaW5kRXZlbnRzID0gd2lkZ2V0SUQgPT4ge1xyXG5cdFx0JChgIyR7d2lkZ2V0SUR9IC5FeHBhbmRhYmxlTGlua19fSGVhZGVyYCkuY2xpY2soKCkgPT4gb3BlbkNsb3NlKGAjJHt3aWRnZXRJRH1gKSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgb3BlbkNsb3NlID0gZWxlbWVudElEID0+ICQoZWxlbWVudElEKS50b2dnbGVDbGFzcygnRXhwYW5kYWJsZUxpbmstLWV4cGFuZGVkJyk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5FeHBhbmRhYmxlTGluayA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgRnVsbFNjcmVlblRhYnNXcmFwcGVyICovXG5TYXBwaGlyZVdpZGdldHMuRnVsbFNjcmVlblRhYnNXcmFwcGVyID0gKCkgPT4ge1xuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0XHQkKCcuVGFiV3JhcHBlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKVxuXHRcdFx0XHQuc2libGluZ3MoKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0FjdGl2ZScpO1xuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnQWN0aXZlJyk7XG5cdFx0fSk7XG5cdH0pO1xufTtcbiIsIi8qIENvbXBvbmVudCBHZW5lcmljR2FsbGVyeSAqL1xuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xuXHR2YXIgYWxsR2VuZXJpY0dhbGxlcmllcyA9IFtdO1xuXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcblx0XHRiaW5kR2VuZXJpY0dhbGxlcnkoY29uZmlnKTtcblx0XHRpZiAob3NBamF4QmFja2VuZCkge1xuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbigpIHtcblx0XHRcdFx0YmluZEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0YmluZEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBiaW5kR2VuZXJpY0dhbGxlcnkgPSBmdW5jdGlvbihjb25maWcpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbEdlbmVyaWNHYWxsZXJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChhbGxHZW5lcmljR2FsbGVyaWVzW2ldLmNvbmZpZy53aWRnZXRJZCA9PT0gY29uZmlnLndpZGdldElkKSB7XG5cdFx0XHRcdGFsbEdlbmVyaWNHYWxsZXJpZXMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBHZW5lcmljR2FsbGVyeShjb25maWcpO1xuXHRcdGFsbEdlbmVyaWNHYWxsZXJpZXMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XG5cdH07XG5cblx0dmFyIEdlbmVyaWNHYWxsZXJ5ID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcblx0XHR0aGlzLmdlbmVyaWNHYWxsZXJ5UmVzaXplVGltZXIgPSAwO1xuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgdGhpcy5jb25maWcud2lkZ2V0SWQpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdHRoaXMuZXF1YWxIZWlnaHQgPSB0aGlzLmNvbmZpZy5lcXVhbEhlaWdodDtcblx0XHRpZiAoXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQgPiBzcGFuJykubGVuZ3RoID09PSAxICYmXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQgPiBzcGFuJykuaGFzQ2xhc3MoJ0xpc3RSZWNvcmRzJylcblx0XHQpIHtcblx0XHRcdHRoaXMuJGdhbGxlcnkgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQgPiBzcGFuLkxpc3RSZWNvcmRzJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuJGdhbGxlcnkgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQnKTtcblx0XHR9XG5cdFx0dGhpcy4kZ2FsbGVyeUl0ZW1zID0gdGhpcy4kZ2FsbGVyeS5jaGlsZHJlbigpO1xuXHRcdHRoaXMuJGdhbGxlcnlJdGVtcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdHZW5lcmljR2FsbGVyeS1pdGVtJykpIHtcblx0XHRcdFx0JCh0aGlzKS53cmFwKCc8ZGl2IGNsYXNzPVwiR2VuZXJpY0dhbGxlcnktaXRlbVwiPjwvZGl2PicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdCQoZnVuY3Rpb24oKSB7XG5cdFx0XHRfdGhpcy5jYWxjdWxhdGUoMCk7XG5cdFx0fSk7XG5cdH07XG5cblx0R2VuZXJpY0dhbGxlcnkucHJvdG90eXBlLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5nZW5lcmljR2FsbGVyeVJlc2l6ZVRpbWVyKTtcblx0XHR0aGlzLmdlbmVyaWNHYWxsZXJ5UmVzaXplVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHZhciB3aWRnZXRXaWR0aCA9IF90aGlzLiR3aWRnZXQub3V0ZXJXaWR0aCh0cnVlKTtcblx0XHRcdHZhciBwZXJMaW5lO1xuXHRcdFx0aWYgKHdpZGdldFdpZHRoID49IDE5MDApIHtcblx0XHRcdFx0cGVyTGluZSA9IF90aGlzLmNvbmZpZy5pdGVtc0Rlc2t0b3BIRDtcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTYwMCkge1xuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zRGVza3RvcEJpZztcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTM2Nikge1xuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zRGVza3RvcDtcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTAyNCkge1xuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zRGVza3RvcFNtYWxsO1xuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSA0MjApIHtcblx0XHRcdFx0cGVyTGluZSA9IF90aGlzLmNvbmZpZy5pdGVtc1RhYmxldDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNQaG9uZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGl0ZW1XaWR0aCA9IDEwMCAvIHBlckxpbmU7XG5cblx0XHRcdHZhciBtYXJnaW5MZWZ0ID0gX3RoaXMuJGdhbGxlcnkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKS5jc3MoJ21hcmdpbi1sZWZ0Jyk7XG5cblx0XHRcdF90aGlzLiRnYWxsZXJ5LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJykuZWFjaChmdW5jdGlvbihpbmRleCwgZWwpIHtcblx0XHRcdFx0aWYgKCQoZWwpLmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtLS10cmlwbGUnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0JChlbCkuY3NzKCd3aWR0aCcsIGl0ZW1XaWR0aCAqIDMgKyAnJScpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQoZWwpLmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtLS1kb3VibGUnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0JChlbCkuY3NzKCd3aWR0aCcsICdjYWxjKCcgKyBpdGVtV2lkdGggKiAyICsgJyUpJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JChlbCkuY3NzKCd3aWR0aCcsICdjYWxjKCcgKyBpdGVtV2lkdGggKyAnJSAtICcgKyBtYXJnaW5MZWZ0ICsgJyknKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoX3RoaXMuY29uZmlnLml0ZW1zQm9yZGVyID09PSAnUmlnaHQnKSB7XG5cdFx0XHRcdFx0aWYgKChpbmRleCArIDEpICUgcGVyTGluZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0JChlbCkuY3NzKHsgYm9yZGVyUmlnaHQ6IDAgfSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQoZWwpLmNzcyh7IGJvcmRlclJpZ2h0OiAnJyB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JChlbCkuY3NzKCdvcGFjaXR5JywgMSk7XG5cdFx0XHRcdCQoZWwpXG5cdFx0XHRcdFx0LmZpbmQoJz4gc3BhbicpXG5cdFx0XHRcdFx0LmNzcygnb3BhY2l0eScsIDEpO1xuXHRcdFx0XHQkKGVsKS5hZGRDbGFzcyhfdGhpcy5jb25maWcuaXRlbXNCZ0NvbG9yKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLml0ZW1zQm9yZGVyID09PSAnUmlnaHQnKSB7XG5cdFx0XHRcdF90aGlzLiRnYWxsZXJ5XG5cdFx0XHRcdFx0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJylcblx0XHRcdFx0XHQubGFzdCgpXG5cdFx0XHRcdFx0LmNzcyh7IGJvcmRlclJpZ2h0OiAwIH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmVxdWFsSGVpZ2h0KSB7XG5cdFx0XHRcdF90aGlzLnNhbWVIZWlnaHQoKTtcblx0XHRcdH1cblx0XHR9LCB0aW1lb3V0KTtcblx0fTtcblxuXHRHZW5lcmljR2FsbGVyeS5wcm90b3R5cGUuc2FtZUhlaWdodCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuJGdhbGxlcnkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKS5jc3MoJ21pbi1oZWlnaHQnLCAnYXV0bycpO1xuXHRcdHZhciBtYXhIZWlnaHQgPSBNYXRoLm1heC5hcHBseShcblx0XHRcdG51bGwsXG5cdFx0XHR0aGlzLiRnYWxsZXJ5XG5cdFx0XHRcdC5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbScpXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuICQodGhpcykub3V0ZXJIZWlnaHQoZmFsc2UpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuZ2V0KClcblx0XHQpO1xuXHRcdHRoaXMuJGdhbGxlcnkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKS5jc3MoJ21pbi1oZWlnaHQnLCBtYXhIZWlnaHQpO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5HZW5lcmljR2FsbGVyeSA9IHtcblx0XHRjcmVhdGU6IGNyZWF0ZSxcblx0XHRhbGw6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGFsbEdlbmVyaWNHYWxsZXJpZXM7XG5cdFx0fSxcblx0fTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcblxuJCh3aW5kb3cpXG5cdC5vZmYoJ3Jlc2l6ZS5HZW5lcmljR2FsbGVyeScpXG5cdC5vbigncmVzaXplLkdlbmVyaWNHYWxsZXJ5JywgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGFsbEdlbmVyaWNHYWxsZXJpZXMgPSBTYXBwaGlyZVdpZGdldHMuR2VuZXJpY0dhbGxlcnkuYWxsKCk7XG5cdFx0YWxsR2VuZXJpY0dhbGxlcmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnQuY2FsY3VsYXRlKDIwMCk7XG5cdFx0fSk7XG5cdH0pO1xuIiwiLyogQ29tcG9uZW50IEhvcml6b250YWxUb29sYmFyICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gKCkgPT4ge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoKCkgPT4gaW5pdCgpKTtcclxuXHRcdCQod2luZG93KS5sb2FkKCgpID0+IHtcclxuXHRcdFx0JCgnLk1lbnVJdGVtV3JhcHBlci5BY3RpdmUnKVswXS5zY3JvbGxJbnRvVmlldyh7XHJcblx0XHRcdFx0YmVoYXZpb3I6ICdhdXRvJyxcclxuXHRcdFx0XHRibG9jazogJ2VuZCdcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGluaXQgPSAoKSA9PiB7XHJcblxyXG5cdFx0aGFuZGxlQXJyb3dzKCk7XHJcblxyXG5cdFx0JCgnLlRvb2xiYXJfX0l0ZW1zJykuc2Nyb2xsKCgpID0+IHtcclxuXHRcdFx0aGFuZGxlQXJyb3dzKClcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRTY3JvbGwgPSAkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KCk7XHJcblx0XHRcdHZhciBtYXhTY3JvbGxsID0gJCgnLlRvb2xiYXJfX0l0ZW1zIC5MaXN0UmVjb3JkcycpLndpZHRoKCkgLSAkKCcuVG9vbGJhcl9fSXRlbXMnKS53aWR0aCgpO1xyXG5cdFx0XHR2YXIgc2lkZVdpZHRoID0gbWF4U2Nyb2xsbCAtIDUwO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KGN1cnJlbnRTY3JvbGwgKyA1MCk7XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsID09IHNpZGVXaWR0aCkge1xyXG5cdFx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsICE9IDUwKSB7XHJcblx0XHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBjdXJyZW50U2Nyb2xsID0gJCgnLlRvb2xiYXJfX0l0ZW1zJykuc2Nyb2xsTGVmdCgpO1xyXG5cdFx0XHR2YXIgbWF4U2Nyb2xsbCA9ICQoJy5Ub29sYmFyX19JdGVtcyAuTGlzdFJlY29yZHMnKS53aWR0aCgpIC0gJCgnLlRvb2xiYXJfX0l0ZW1zJykud2lkdGgoKTtcclxuXHRcdFx0dmFyIHNpZGVXaWR0aCA9IG1heFNjcm9sbGwgLSA1MDtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX0l0ZW1zJykuc2Nyb2xsTGVmdChjdXJyZW50U2Nyb2xsIC0gNTApO1xyXG5cdFx0XHRpZiAoY3VycmVudFNjcm9sbCAhPSBzaWRlV2lkdGgpIHtcclxuXHRcdFx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY3VycmVudFNjcm9sbCA9PSA1MCkge1xyXG5cdFx0XHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5vbigncmVzaXplLnRvb2xiYXInLCAoKSA9PiB7XHJcblx0XHRcdGhhbmRsZUFycm93cygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cclxuXHRoYW5kbGVBcnJvd3MgPSAoKSA9PiB7XHJcblx0XHRsZXQgY3VycmVudFNjcm9sbCA9ICQoJy5Ub29sYmFyX19JdGVtcycpLnNjcm9sbExlZnQoKTtcclxuXHRcdGxldCBtZW51V2lkdGggPSAkKCcuVG9vbGJhcl9fSXRlbXMgLkxpc3RSZWNvcmRzJykud2lkdGgoKTtcclxuXHRcdGxldCBleHRlcm5hbFdpZHRoID0gJCgnLlRvb2xiYXJfX0l0ZW1zJykud2lkdGgoKTtcclxuXHRcdHZhciBtYXhTY3JvbGxsID0gbWVudVdpZHRoIC0gZXh0ZXJuYWxXaWR0aDtcclxuXHJcblx0XHRpZiAoZXh0ZXJuYWxXaWR0aCA+IG1lbnVXaWR0aCkge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLmhpZGUoKTtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykuaGlkZSgpO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9jb250YWluZXInKS5hZGRDbGFzcygnVG9vbGJhcl9jb250YWluZXItLW5vYXJyb3dzJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLnNob3coKTtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykuc2hvdygpO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9jb250YWluZXInKS5yZW1vdmVDbGFzcygnVG9vbGJhcl9jb250YWluZXItLW5vYXJyb3dzJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRTY3JvbGwgPT09IDApIHtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRTY3JvbGwgPj0gbWF4U2Nyb2xsbCkge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuSG9yaXpvbnRhbFRvb2xiYXIgPSB7XHJcblx0XHRjcmVhdGVcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IEhvdXJQaWNrZXIgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xuXHRjbGFzcyBIb3VyUGlja2VyIHtcblx0XHRjb25zdHJ1Y3Rvcihjb25maWcpIHtcblx0XHRcdC8vIE9wdGlvbnMgdXNlZCBieSBqUXVlcnkgVGltZXJwaWNrZXIgKEV4dGVybmFsIExpYilcblx0XHRcdHRoaXMub3B0aW9ucyA9IHtcblx0XHRcdFx0Li4uY29uZmlnLFxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5vbkNvbXBvbmVudEluaXQoKTtcblx0XHR9XG5cblx0XHRpc0NvbXBvbmVudFZhbGlkKCkge1xuXHRcdFx0bGV0IHZhbGlkID0gdHJ1ZTtcblx0XHRcdGxldCBtZXNzYWdlID0gYENvbXBvbmVudCBIb3VyUGlja2VyICgke3RoaXMub3B0aW9ucy53aWRnZXRJZH0pOmA7XG5cblx0XHRcdGlmICghdGhpcy4kaW5wdXQubGVuZ3RoIHx8IHRoaXMuJGlucHV0Lmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0bWVzc2FnZSA9IGAke21lc3NhZ2V9IG5lZWRzIG9uZSAtIGFuZCBqdXN0IG9uZSAtIElOUFVUIGVsZW1lbnQhYDtcblx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF2YWxpZCkgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcblxuXHRcdFx0cmV0dXJuIHZhbGlkO1xuXHRcdH1cblxuXHRcdHNldENvbXBvbmVudFBvc2l0aW9uKCkge1xuXHRcdFx0Y29uc3QgJHdpZGdldCA9ICQoJy51aS10aW1lcGlja2VyLWNvbnRhaW5lcicpO1xuXHRcdFx0Y29uc3QgbGFiZWxMZWZ0ID0gdGhpcy4kbGFiZWwub2Zmc2V0KCkubGVmdDtcblx0XHRcdGNvbnN0IGxhYmVsV2lkdGggPSB0aGlzLiRsYWJlbC53aWR0aCgpO1xuXHRcdFx0Y29uc3QgbGFiZWxPdXRlcldpZHRoID0gdGhpcy4kbGFiZWwub3V0ZXJXaWR0aCgpO1xuXHRcdFx0Y29uc3Qgd2lkZ2V0T3V0ZXJXaWR0aCA9ICR3aWRnZXQub3V0ZXJXaWR0aCgpO1xuXHRcdFx0Y29uc3Qgd2lkZ2V0TWluV2lkdGggPSArJHdpZGdldC5jc3MoJ21pbi13aWR0aCcpLnJlcGxhY2UoJ3B4JywgJycpO1xuXHRcdFx0Y29uc3QgaXNPdXRzaWRlV2luZG93ID1cblx0XHRcdFx0bGFiZWxMZWZ0ICsgbGFiZWxPdXRlcldpZHRoID4gJCh3aW5kb3cpLnNjcm9sbExlZnQoKSArICQod2luZG93KS53aWR0aCgpIC0gd2lkZ2V0T3V0ZXJXaWR0aDtcblxuXHRcdFx0JHdpZGdldC5jc3Moe1xuXHRcdFx0XHRsZWZ0OiAoKSA9PiB7XG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gbGFiZWxMZWZ0IC0gKHdpZGdldE1pbldpZHRoIC0gbGFiZWxXaWR0aCkgLyAyO1xuXG5cdFx0XHRcdFx0aWYgKGlzT3V0c2lkZVdpbmRvdykgdmFsdWUgPSBsYWJlbExlZnQgKyBsYWJlbFdpZHRoIC0gd2lkZ2V0T3V0ZXJXaWR0aDtcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gbGFiZWxMZWZ0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0c2V0RWxlbWVudENsYXNzKHNlbGVjdG9yLCBjbGFzc05hbWUpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWUgPyAkKHNlbGVjdG9yKS5hZGRDbGFzcyhjbGFzc05hbWUpIDogZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZGVmaW5lVGltZUZvcm1hdCgpIHtcblx0XHRcdGxldCBmb3JtYXQgPSBbXTtcblx0XHRcdGxldCBhbVBtID0gJyc7XG5cblx0XHRcdGZvcm1hdC5wdXNoKHRoaXMub3B0aW9ucy5pczI0aEZvcm1hdCA/ICdISCcgOiAnaGgnKTtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuc2hvd01pbnV0ZXMpIGZvcm1hdC5wdXNoKCdtbScpO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5zaG93U2Vjb25kcykgZm9ybWF0LnB1c2goJ3NzJyk7XG5cdFx0XHRpZiAoIXRoaXMub3B0aW9ucy5pczI0aEZvcm1hdCkgYW1QbSA9ICcgcCc7XG5cblx0XHRcdHJldHVybiBgJHtmb3JtYXQuam9pbignOicpfSR7YW1QbX1gO1xuXHRcdH1cblxuXHRcdGNvbnZlcnRUaW1lMTJ0bzI0KHZhbHVlKSB7XG5cdFx0XHRjb25zdCBbdGltZSwgbW9kaWZpZXJdID0gdmFsdWUuc3BsaXQoJyAnKTtcblx0XHRcdGxldCBbaG91cnMsIG1pbnV0ZXMgPSAnMDAnLCBzZWNvbmRzID0gJzAwJ10gPSB0aW1lLnNwbGl0KCc6Jyk7XG5cblx0XHRcdGlmIChob3VycyA9PT0gJzEyJykgaG91cnMgPSAnMDAnO1xuXHRcdFx0aWYgKG1vZGlmaWVyID09PSAnUE0nKSBob3VycyA9IHBhcnNlSW50KGhvdXJzLCAxMCkgKyAxMjtcblxuXHRcdFx0cmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc31gO1xuXHRcdH1cblxuXHRcdGNvbnZlcnRUaW1lRm9ybWF0VG9NYXNrKHZhbHVlID0gJycpIHtcblx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bYS16QS1aXSsvZywgJy0tJyk7XG5cdFx0fVxuXG5cdFx0b25DaGFuZ2VFdmVudCh2YWx1ZSA9ICcnKSB7XG5cdFx0XHRsZXQgbW9kZWwgPSAnMDEtMDEtMTkwMCAwMDowMDowMCc7IC8vaS5lLiBudWxsXG5cdFx0XHRsZXQgbGFiZWwgPSB0aGlzLmNvbnZlcnRUaW1lRm9ybWF0VG9NYXNrKHRoaXMub3B0aW9ucy50aW1lRm9ybWF0KTtcblxuXHRcdFx0aWYgKHZhbHVlICYmICEhdmFsdWUudHJpbSgpKSB7XG5cdFx0XHRcdG1vZGVsID0gdGhpcy5vcHRpb25zLmlzMjRoRm9ybWF0ID8gdmFsdWUgOiB0aGlzLmNvbnZlcnRUaW1lMTJ0bzI0KHZhbHVlKTtcblx0XHRcdFx0bGFiZWwgPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc05vdGlmeUVuYWJsZWQpIE9zTm90aWZ5V2lkZ2V0KHRoaXMub3B0aW9ucy5ob3VyUGlja2VyRmFrZU5vdGlmeUlkLCBtb2RlbCk7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzVGV4dFRyaWdnZXJhYmxlKSB0aGlzLiRsYWJlbC50ZXh0KGxhYmVsKTtcblxuXHRcdFx0dGhpcy4kbW9kZWwudmFsKG1vZGVsKTtcblx0XHRcdHRoaXMuJG1vZGVsLmNoYW5nZSgpO1xuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0b25Db21wb25lbnRJbml0KCkge1xuXHRcdFx0dGhpcy4kY29tcG9uZW50ID0gJChgIyR7dGhpcy5vcHRpb25zLndpZGdldElkfWApO1xuXHRcdFx0dGhpcy4kbW9kZWwgPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLkhvdXJQaWNrZXJfX1BsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XG5cdFx0XHR0aGlzLiRpbnB1dCA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCcuSG91clBpY2tlcl9fRGlzcGxheWVkIC5Ib3VyUGlja2VyX19JbnB1dFZhbHVlJyk7XG5cdFx0XHR0aGlzLiRlbGVtZW50ID0gdGhpcy4kaW5wdXQ7XG5cblx0XHRcdHRoaXMub3B0aW9ucy50aW1lRm9ybWF0ID0gdGhpcy5kZWZpbmVUaW1lRm9ybWF0KCk7XG5cblx0XHRcdGlmICghdGhpcy5pc0NvbXBvbmVudFZhbGlkKCkpIHJldHVybjtcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCAkY29udGFpbmVyID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJ2Rpdi5Ib3VyUGlja2VyJyk7XG5cblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc1RleHRUcmlnZ2VyYWJsZSkge1xuXHRcdFx0XHRcdCRjb250YWluZXIuYWRkQ2xhc3MoJ0hvdXJQaWNrZXItLXRleHRUcmlnZ2VyJyk7XG5cblx0XHRcdFx0XHR0aGlzLiRsYWJlbCA9ICRjb250YWluZXIuZmluZCgnLkhvdXJQaWNrZXJfX0Rpc3BsYXllZCAuSG91clBpY2tlcl9fTGFiZWxWYWx1ZScpO1xuXHRcdFx0XHRcdHRoaXMuJGVsZW1lbnQgPSB0aGlzLiRsYWJlbDtcblxuXHRcdFx0XHRcdHRoaXMuJGxhYmVsLnRleHQodGhpcy5jb252ZXJ0VGltZUZvcm1hdFRvTWFzayh0aGlzLm9wdGlvbnMudGltZUZvcm1hdCkpO1xuXG5cdFx0XHRcdFx0dGhpcy4kbGFiZWwub24oJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy4kbGFiZWwudGltZXBpY2tlcigpLm9wZW4oKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5zZXRDb21wb25lbnRQb3NpdGlvbigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc0NsZWFyYWJsZSkge1xuXHRcdFx0XHRcdHRoaXMuJGJ1dHRvbkNsZWFyID0gJGNvbnRhaW5lci5maW5kKCcuSG91clBpY2tlcl9fRGlzcGxheWVkIC5Ib3VyUGlja2VyX19CdXR0b25DbGVhcicpO1xuXG5cdFx0XHRcdFx0dGhpcy4kYnV0dG9uQ2xlYXIub24oJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKTtcblx0XHRcdFx0XHRcdHRoaXMub25DaGFuZ2VFdmVudCgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy4kZWxlbWVudC50aW1lcGlja2VyKHtcblx0XHRcdFx0XHQuLi50aGlzLm9wdGlvbnMsXG5cdFx0XHRcdFx0Y2hhbmdlOiB0aW1lID0+IHRoaXMub25DaGFuZ2VFdmVudCh0aW1lID8gJCgpLnRpbWVwaWNrZXIuZm9ybWF0VGltZSh0aGlzLm9wdGlvbnMudGltZUZvcm1hdCwgdGltZSkgOiBudWxsKSxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5zZXRFbGVtZW50Q2xhc3MoJy51aS10aW1lcGlja2VyLWNvbnRhaW5lcicsIHRoaXMub3B0aW9ucy5jdXJyZW50TG9jYWxlID09PSAnQVInID8gJ3J0bCcgOiAnbHRyJyk7XG5cblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncmVhZG9ubHknLCAhdGhpcy5vcHRpb25zLmlzVHlwZUVuYWJsZWQpO1xuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdwbGFjZWhvbGRlcicsIHRoaXMub3B0aW9ucy50aW1lRm9ybWF0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4gKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEhvdXJQaWNrZXIoY29uZmlnKSk7XG5cblx0U2FwcGhpcmVXaWRnZXRzLkhvdXJQaWNrZXIgPSB7XG5cdFx0Y3JlYXRlLFxuXHR9O1xufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICBjbGFzcyBJbnB1dFdpdGhDbGVhciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgICB0aGlzLiR3aWRnZXQgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9YCk7XHJcbiAgICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGVdJyk7XHJcbiAgICAgIHRoaXMuJGNsZWFyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JbnB1dFdpdGhDbGVhci1jbGVhcicpO1xyXG4gICAgICB0aGlzLiRub3RpZnlMaW5rID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JbnB1dFdpdGhDbGVhci1ub3RpZnktbGluaycpO1xyXG4gICAgICB0aGlzLiR3aWRnZXRTaGllbGQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLS1zaGllbGQnKTtcclxuICAgICAgdGhpcy5vbkluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQoKSB7XHJcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdmb2N1cycsICgpID0+IHtcclxuICAgICAgICB0aGlzLiRjbGVhci5zaG93KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLiRpbnB1dC5vbignYmx1cicsICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy4kaW5wdXQudmFsKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKCcuZGF0ZXJhbmdlcGlja2VyOnZpc2libGUnKS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kY2xlYXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRub3RpZnlMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLiRjbGVhci5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kaW5wdXQudmFsKCcnKTtcclxuICAgICAgICB0aGlzLiRjbGVhci5oaWRlKCk7XHJcbiAgICAgICAgdGhpcy4kbm90aWZ5TGluay50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnLmhhc1NoaWVsZCkge1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuJHdpZGdldFNoaWVsZC5oaWRlKCk7XHJcbiAgICAgICAgfSwgdGhpcy5jb25maWcuc2hpZWxkVGltZW91dCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNoaWVsZFRpbWVvdXQgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLiR3aWRnZXRTaGllbGQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRjbGVhci5oaWRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgSW5wdXRXaXRoQ2xlYXIoY29uZmlnKSk7XHJcblxyXG4gIFNhcHBoaXJlV2lkZ2V0cy5JbnB1dFdpdGhDbGVhciA9IHtcclxuICAgIGNyZWF0ZVxyXG4gIH07XHJcblxyXG59KSgpOyIsIi8qIENvbXBvbmVudCBMb2NhdGlvbkJveCAqL1xuU2FwcGhpcmVXaWRnZXRzLkxvY2F0aW9uQm94ID0gZnVuY3Rpb24oY2xpY2tlZEVsZW1lbnRJZCkge1xuXHRpZiAoJCgnIycgKyBjbGlja2VkRWxlbWVudElkICsgJycpLmhhc0NsYXNzKCdPbicpKSB7XG5cdFx0JCgnLkRpc2FibGVSb29tJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdPZmYnKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ09uJyk7XG5cdFx0XHQkKHRoaXMpXG5cdFx0XHRcdC5wYXJlbnQoJy5Sb29tQm94Jylcblx0XHRcdFx0LmNzcyh7XG5cdFx0XHRcdFx0b3BhY2l0eTogJzEnLFxuXHRcdFx0XHR9KVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ1NlbGVjdGVkJyk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0JCgnIycgKyBjbGlja2VkRWxlbWVudElkICsgJycpXG5cdFx0XHQuYWRkQ2xhc3MoJ09uJylcblx0XHRcdC5yZW1vdmVDbGFzcygnT2ZmJylcblx0XHRcdC5wYXJlbnQoJy5Sb29tQm94Jylcblx0XHRcdC5jc3Moe1xuXHRcdFx0XHRvcGFjaXR5OiAnMScsXG5cdFx0XHR9KVxuXHRcdFx0LmFkZENsYXNzKCdTZWxlY3RlZCcpO1xuXG5cdFx0JCgnLkRpc2FibGVSb29tOm5vdCgjJyArIGNsaWNrZWRFbGVtZW50SWQgKyAnKScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdPZmYnKTtcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ09uJyk7XG5cdFx0fSk7XG5cblx0XHQkKCcuRGlzYWJsZVJvb20uT2ZmJylcblx0XHRcdC5wYXJlbnQoJy5Sb29tQm94Jylcblx0XHRcdC5jc3Moe1xuXHRcdFx0XHRvcGFjaXR5OiAnMC4yNScsXG5cdFx0XHR9KVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdTZWxlY3RlZCcpO1xuXHR9XG59O1xuIiwiLyogQ29tcG9uZW50IE1haW5JbnRlcmFjdGl2ZUNhcmQgKi9cbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFtdO1xuXHR2YXIgZGVmYXVsdER1cmF0aW9uID0gMzAwO1xuXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzW2ldLmNvbmZpZy53aWRnZXRJZCA9PT0gY29uZmlnLndpZGdldElkKSB7XG5cdFx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgTWFpbkludGVyYWN0aXZlQ2FyZChjb25maWcpO1xuXHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLnB1c2god2luZG93W2NvbmZpZy53aWRnZXRJZF0pO1xuXG5cdFx0aWYgKCEhIVNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQgJiYgISFvc0FqYXhCYWNrZW5kKSB7XG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWxsKCk7XG5cdFx0XHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRlbGVtZW50LmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQgPSB0cnVlO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgTWFpbkludGVyYWN0aXZlQ2FyZCA9IGZ1bmN0aW9uIChjb25maWcpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xuXHRcdHRoaXMuaXNMb2NrZWRPbkNsb3NlID0gZmFsc2U7XG5cdFx0dGhpcy5pc09wZW4gPSBjb25maWcuaXNPcGVuO1xuXHRcdHRoaXMuaXNFbmFibGVkID0gY29uZmlnLmlzRW5hYmxlZDtcblx0XHR0aGlzLmlzU2VsZWN0YWJsZSA9IGNvbmZpZy5pc1NlbGVjdGFibGU7XG5cdFx0dGhpcy5hbGxvd09wZW5pbmcgPSBjb25maWcuYWxsb3dPcGVuaW5nO1xuXHRcdHRoaXMuZ3JhZGllbnRXaGVuT3BlbiA9IGNvbmZpZy5ncmFkaWVudFdoZW5PcGVuO1xuXHRcdHRoaXMuYWxsb3dNdWx0aXBsZU9wZW4gPSBjb25maWcuYWxsb3dNdWx0aXBsZU9wZW47XG5cdFx0dGhpcy5lbWl0Tm90aWZ5T25PcGVuID0gY29uZmlnLmVtaXROb3RpZnlPbk9wZW47XG5cdFx0dGhpcy5oaWRlQWN0aW9uc09uT3BlbiA9IGNvbmZpZy5oaWRlQWN0aW9uc09uT3Blbjtcblx0XHR0aGlzLmhpZGVDYXB0aW9uT25PcGVuID0gY29uZmlnLmhpZGVDYXB0aW9uT25PcGVuO1xuXHRcdHRoaXMuaGlkZVRpdGxlT25PcGVuID0gY29uZmlnLmhpZGVUaXRsZU9uT3Blbjtcblx0XHR0aGlzLmhpZGVTdWJUaXRsZU9uT3BlbiA9IGNvbmZpZy5oaWRlU3ViVGl0bGVPbk9wZW47XG5cdFx0dGhpcy5oZWFkZXJIZWlnaHRXaGVuT3BlbiA9IGNvbmZpZy5oZWFkZXJIZWlnaHRXaGVuT3Blbjtcblx0XHR0aGlzLk1haW5JbnRlcmFjdGl2ZUNhcmRGYWtlTm90aWZ5SWQgPSBjb25maWcubWFpbkludGVyYWN0aXZlQ2FyZEZha2VOb3RpZnlJZDtcblxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcblx0XHR0aGlzLiR3aWRnZXQuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0dGhpcy4kY2FyZCA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkJyk7XG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXInKTtcblx0XHR0aGlzLiRoZWFkZXJUZXh0ID0gdGhpcy4kaGVhZGVyLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0Jyk7XG5cdFx0dGhpcy4kYm9keSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gZGl2ID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtYm9keScpO1xuXHRcdHRoaXMuJGFjdGlvbnMgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItYWN0aW9ucycpO1xuXHRcdHRoaXMuJGNhcHRpb24gPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dC1jYXB0aW9uJyk7XG5cdFx0dGhpcy4kdGl0bGUgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dC10aXRsZScpO1xuXHRcdHRoaXMuJHN1YlRpdGxlID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRleHQtc3VidGl0bGUnKTtcblx0XHR0aGlzLiRzZWxlY3RUcmlnZ2VyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItc2VsZWN0YWJsZSA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1zZWxlY3RhYmxlLXRyaWdnZXInKTtcblx0XHR0aGlzLiRzZWxlY3RQbGFjZWhvbGRlciA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1zZWxlY3RhYmxlLXBsYWNlaG9sZGVyJyk7XG5cdFx0dGhpcy4kdHJpZ2dlclBsYWNlaG9sZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdHJpZ2dlckFjdGlvbi1wbGFjZWhvbGRlcicpO1xuXG5cdFx0aWYgKHRoaXMuJHRyaWdnZXJQbGFjZWhvbGRlci5maW5kKCdhJykubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzLiR0cmlnZ2VyID0gdGhpcy4kdHJpZ2dlclBsYWNlaG9sZGVyLmZpbmQoJ2EnKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pc09wZW4pIHtcblx0XHRcdHRoaXMub3BlbihmYWxzZSwgLTEpO1xuXHRcdFx0dGhpcy4kY2FyZC5hZGRDbGFzcygnZm9yY2VPcGVuJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy4kY2FyZC5hZGRDbGFzcyh0aGlzLmhlYWRlckhlaWdodFdoZW5PcGVuICsgJ0hlYWRlcicpO1xuXG5cdFx0aWYgKHRoaXMuYWxsb3dPcGVuaW5nKSB7XG5cdFx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdhbGxvd09wZW5pbmcnKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5ncmFkaWVudFdoZW5PcGVuKSB7XG5cdFx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdncmFkaWVudFdoZW5PcGVuJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcblxuXHRcdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcblx0XHRcdG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbiwgaW5kZXgpIHtcblx0XHRcdFx0X3RoaXMuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbmZpZy53aWRnZXRJZCksIHtcblx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRcdHN1YnRyZWU6IHRydWUsXG5cdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcblx0XHR9KTtcblx0fTtcblxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0aWYgKCEhdGhpcy4kYm9keS5maW5kKCc+IGRpdiAuTWFpbkludGVyYWN0aXZlQ2FyZC1hYnNvbHV0ZS1hY3Rpb25zJykubGVuZ3RoICYmIHRoaXMuaXNPcGVuKSB7XG5cdFx0XHR2YXIgYWJzb2x1dGVBY3Rpb25zV2lkdGggPSBNYXRoLm1heC5hcHBseShNYXRoLCB0aGlzLiRib2R5LmZpbmQoJz4gZGl2IC5NYWluSW50ZXJhY3RpdmVDYXJkLWFic29sdXRlLWFjdGlvbnMnKS5tYXAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xuXHRcdFx0fSkuZ2V0KCkpO1xuXHRcdFx0dmFyIGhlYWRlck1heFdpZHRoID0gdGhpcy4kaGVhZGVyLndpZHRoKCkgLSBhYnNvbHV0ZUFjdGlvbnNXaWR0aDtcblx0XHRcdGlmIChoZWFkZXJNYXhXaWR0aCA+IDEwKSB7XG5cdFx0XHRcdHRoaXMuJGhlYWRlclRleHQuY3NzKHtcblx0XHRcdFx0XHRtYXhXaWR0aDogaGVhZGVyTWF4V2lkdGggKyAncHgnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy4kYm9keS5maW5kKCc+IGRpdiAuTWFpbkludGVyYWN0aXZlQ2FyZC1hYnNvbHV0ZS1hY3Rpb25zIC5NYWluSW50ZXJhY3RpdmVDYXJkLS1jbG9zZScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdF90aGlzLmNsb3NlKCk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy4kaGVhZGVyVGV4dC5jc3Moe1xuXHRcdFx0XHRtYXhXaWR0aDogJzk5JSdcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKCEhX3RoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKVswXSAmJiAhIV90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0uY29udGVudFdpbmRvdyAmJiBfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpWzBdLmNvbnRlbnRXaW5kb3cuU2FwcGhpcmVXaWRnZXRzICYmIF90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0uY29udGVudFdpbmRvdy5TYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lKSB7XG5cdFx0XHRcdFx0XHRfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpWzBdLmNvbnRlbnRXaW5kb3cuU2FwcGhpcmVXaWRnZXRzLlJlc2l6ZVBhcmVudElmcmFtZS5yZXNpemUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIDUwMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMuJGhlYWRlci5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC0tb3Blbjpub3QoW2Rpc2FibGVkXSknKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdF90aGlzLm9wZW4odHJ1ZSk7XG5cdFx0fSk7XG5cdFx0dGhpcy4kaGVhZGVyLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLS1jbG9zZScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0X3RoaXMuY2xvc2UoKTtcblx0XHR9KTtcblx0XHRpZiAodGhpcy5hbGxvd09wZW5pbmcpIHtcblx0XHRcdHRoaXMuJGhlYWRlclRleHQub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdFx0aWYgKCQoZXZ0LnRhcmdldCkuaGFzQ2xhc3MoJ0J1dHRvbicpKSB7XG5cdFx0XHRcdFx0Ly8gdGhlIHVzZXIgY2xpY2tlZCBvbiBhIEJ1dHRvbiBpbnNpZGUgdGhlIGhlYWRlciwgbm90aGluZyB0byBkbyBoZXJlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKF90aGlzLmlzT3Blbikge1xuXHRcdFx0XHRcdFx0aWYgKF90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGRvIG5vdCBjbG9zZSB3aGVuIGFuZCBpZnJhbWUgZXhpc3RzXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRcdFx0XHRfdGhpcy4kYWN0aW9ucy5maW5kKCdhJykubGVuZ3RoID4gMCAmJlxuXHRcdFx0XHRcdFx0XHRfdGhpcy4kYWN0aW9ucy5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC0tY2xvc2UnKS5sZW5ndGggPiAwXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gZG8gbm90IGNsb3NlIHdoZW4gdGhlIGNhcmQgaGFzIGFjdGlvbnNcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzLmNsb3NlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm9wZW4odHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuaXNTZWxlY3RhYmxlKSB7XG5cdFx0XHR0aGlzLiRzZWxlY3RUcmlnZ2VyLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoX3RoaXMuJHNlbGVjdFBsYWNlaG9sZGVyLmZpbmQoJ2EnKS5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRfdGhpcy4kc2VsZWN0UGxhY2Vob2xkZXIuZmluZCgnYScpLmNsaWNrKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdZb3UgbmVlZCAxIGxpbmsgaW4gdGhpcyBwbGFjZWhvbGRlci4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoc2VuZE5vdGlmeSwgZHVyYXRpb24pIHtcblx0XHR2YXIgZHVyYXRpb24gPSBkdXJhdGlvbiB8fCBkZWZhdWx0RHVyYXRpb247XG5cdFx0dGhpcy5pc09wZW4gPSB0cnVlO1xuXHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2lzT3BlbicpO1xuXHRcdGlmICh0aGlzLmhpZGVBY3Rpb25zT25PcGVuKSB7XG5cdFx0XHR0aGlzLiRhY3Rpb25zLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVUaXRsZU9uT3Blbikge1xuXHRcdFx0dGhpcy4kdGl0bGUuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuKSB7XG5cdFx0XHR0aGlzLiRzdWJUaXRsZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5oaWRlQ2FwdGlvbk9uT3Blbikge1xuXHRcdFx0dGhpcy4kY2FwdGlvbi5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5lbWl0Tm90aWZ5T25PcGVuKSB7XG5cdFx0XHRpZiAoc2VuZE5vdGlmeSkge1xuXHRcdFx0XHRPc05vdGlmeVdpZGdldCh0aGlzLk1haW5JbnRlcmFjdGl2ZUNhcmRGYWtlTm90aWZ5SWQsICdvcGVuJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy4kdHJpZ2dlcikge1xuXHRcdFx0dGhpcy4kdHJpZ2dlci5jbGljaygpO1xuXHRcdFx0dGhpcy4kYm9keS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGR1cmF0aW9uID4gMCkge1xuXHRcdFx0XHR0aGlzLiRib2R5LnNsaWRlRG93bihkdXJhdGlvbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmhhc0NsYXNzKCdja2Vfd3lzaXd5Z19mcmFtZScpKSB7XG5cdFx0XHR2YXIgaWZyYW1lQ29udGVudHMgPSB0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuY29udGVudHMoKTtcblx0XHRcdGlmcmFtZUNvbnRlbnRzLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWlmcmFtZS1hY3Rpb25zJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5hbGxvd011bHRpcGxlT3Blbikge1xuXHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuZm9yRWFjaChpdGVtID0+IChpdGVtICE9PSB0aGlzICYmIGl0ZW0uYWxsb3dPcGVuaW5nID8gaXRlbS5jbG9zZShkdXJhdGlvbikgOiBudWxsKSk7XG5cdFx0fVxuXHR9O1xuXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uIHx8IGRlZmF1bHREdXJhdGlvbjtcblx0XHR0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMuJGNhcmQucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xuXHRcdGlmICh0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykubGVuZ3RoID09PSAxICYmICF0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuaGFzQ2xhc3MoJ2NrZV93eXNpd3lnX2ZyYW1lJykpIHtcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5jb250ZW50cygpLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWlmcmFtZS1hY3Rpb25zJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdH1cblx0XHR0aGlzLiRib2R5LnNsaWRlVXAoZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChzZWxmLiRjYXJkLmhhc0NsYXNzKCdmb3JjZU9wZW4nKSkge1xuXHRcdFx0XHRzZWxmLiRjYXJkLnJlbW92ZUNsYXNzKCdmb3JjZU9wZW4nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZiAodGhpcy5oaWRlQWN0aW9uc09uT3Blbikge1xuXHRcdFx0dGhpcy4kYWN0aW9ucy5zaG93KCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVUaXRsZU9uT3Blbikge1xuXHRcdFx0dGhpcy4kdGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVTdWJUaXRsZU9uT3Blbikge1xuXHRcdFx0dGhpcy4kc3ViVGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVDYXB0aW9uT25PcGVuKSB7XG5cdFx0XHR0aGlzLiRjYXB0aW9uLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdH1cblx0XHR0aGlzLiRoZWFkZXJUZXh0LmNzcyh7XG5cdFx0XHRtYXhXaWR0aDogJzk5JSdcblx0XHR9KTtcblx0fTtcblxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaXNPcGVuO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkID0ge1xuXHRcdGNyZWF0ZTogY3JlYXRlLFxuXHRcdGFsbDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzO1xuXHRcdH0sXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcblx0aWYgKCEhJCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQnKS5sZW5ndGgpIHtcblx0XHRpZiAoISEhU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCkge1xuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFsbCgpO1xuXHRcdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hZnRlckFqYXhSZXF1ZXN0QmluZGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMgPSBTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hbGwoKTtcblx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50LmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcblx0XHR9KTtcblx0fSwgMTAwMCk7XG5cbn0pOyIsIi8qIENvbXBvbmVudCBNZW51QmFyICovXG5TYXBwaGlyZVdpZGdldHMuTWVudUJhciA9IGZ1bmN0aW9uKGNvbmZpZykge1xuXHQkKGZ1bmN0aW9uKCkge1xuXHRcdHZhciAkbWVudVdpZGdldCA9ICQoJyMnICsgY29uZmlnLm1lbnVXaWRnZXQpO1xuXG5cdFx0dmFyIG1lbnVSZXNpZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2V2lkdGggPSAwO1xuXHRcdFx0dmFyIGF2YWlsYWJlRXNwYWNlID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbScpLndpZHRoKCk7XG5cblx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0bmF2V2lkdGggKz0gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChuYXZXaWR0aCA+IGF2YWlsYWJlRXNwYWNlKSB7XG5cdFx0XHRcdHZhciBsYXN0SXRlbSA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykubGFzdCgpO1xuXHRcdFx0XHRsYXN0SXRlbS5hdHRyKCdkYXRhLXdpZHRoJywgbGFzdEl0ZW0ub3V0ZXJXaWR0aCh0cnVlKSk7XG5cdFx0XHRcdGxhc3RJdGVtLnByZXBlbmRUbygkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKSk7XG5cdFx0XHRcdG1lbnVSZXNpZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgZmlyc3RNb3JlRWxlbWVudCA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lciAuTWVudUl0ZW0nKS5maXJzdCgpO1xuXHRcdFx0XHRpZiAobmF2V2lkdGggKyBmaXJzdE1vcmVFbGVtZW50LmRhdGEoJ3dpZHRoJykgPCBhdmFpbGFiZUVzcGFjZSkge1xuXHRcdFx0XHRcdGZpcnN0TW9yZUVsZW1lbnQuaW5zZXJ0QWZ0ZXIoJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbSAuTWVudUl0ZW0nKS5sYXN0KCkpO1xuXHRcdFx0XHRcdG1lbnVSZXNpZGVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCEkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKS5pcygnOmVtcHR5JykpIHtcblx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfZXh0cmFJdGVtJykuYWRkQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhJCh0aGlzKVxuXHRcdFx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0XHRcdC5oYXNDbGFzcygnTWVudWJhcl9fZXh0cmFDb250YWluZXInKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZUluZGljYXRvcicpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLmFjdGl2ZUluZGljYXRvcicpLmFkZENsYXNzKCdzaGFkb3cnKTtcblx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcblx0XHRcdFx0XHRcdC50b2dnbGVDbGFzcygnc2hvdycpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmVJbmRpY2F0b3InKSkge1xuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdC5maW5kKCcuTWVudUl0ZW1fc3ViSXRlbXMnKVxuXHRcdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcblx0XHRcdFx0XHQudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbSAuaWNvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyICcpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG5cdFx0fSk7XG5cblx0XHQkKGRvY3VtZW50KS5tb3VzZXVwKGUgPT4ge1xuXHRcdFx0dmFyICRtZW51ID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnVJdGVtLmFjdGl2ZScpO1xuXHRcdFx0dmFyICRtb3JlT3B0aW9ucyA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpO1xuXG5cdFx0XHQvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgbWVudSBvciBhIGRlc2NlbmRhbnQgb2YgdGhlIG1lbnVcblx0XHRcdGlmICgkbWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGlmICghJG1lbnUuaXMoZS50YXJnZXQpICYmICRtZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0JG1lbnUuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdFx0XHQkKCcuYWN0aXZlSW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ3NoYWRvdycpO1xuXHRcdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCEkbW9yZU9wdGlvbnMuaXMoZS50YXJnZXQpICYmICRtb3JlT3B0aW9ucy5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHQkbW9yZU9wdGlvbnMuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdFx0JCgnLmFjdGl2ZUluZGljYXRvcicpLnJlbW92ZUNsYXNzKCdzaGFkb3cnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCQod2luZG93KS5vbigncmVzaXplIGxvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdG1lbnVSZXNpZGVyKCk7XG5cdFx0fSk7XG5cdH0pO1xufTtcbiIsIi8qIENvbXBvbmVudCBNdWx0aXBsZVNlbGVjdGlvbkJ1dHRvbiAqL1xuU2FwcGhpcmVXaWRnZXRzLk11bHRpcGxlU2VsZWN0aW9uQnV0dG9uID0gZnVuY3Rpb24oV3JhcHBlcklkKSB7XG5cdHZhciAkd2lkZ2V0ID0gJChXcmFwcGVySWQpO1xuXHR2YXIgJGNvbnRyb2wgPSAkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpkaXNhYmxlZCcpKSB7XG5cdFx0JChXcmFwcGVySWQpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHR9IGVsc2Uge1xuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0fVxuXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpjaGVja2VkJykpIHtcblx0XHQkKFdyYXBwZXJJZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHR9IGVsc2Uge1xuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdH1cblxuXHQkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoYW5nZShmdW5jdGlvbigpIHtcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuXHRcdFx0JCh0aGlzKVxuXHRcdFx0XHQucGFyZW50KClcblx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH1cblx0fSk7XG5cblx0JHdpZGdldC5maW5kKCcuTXVsdGlwbGVTZWxlY3Rpb25CdXR0b24tbGFiZWwnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHQvLyAkY29udHJvbC5wcm9wKFwiY2hlY2tlZFwiLCAhJGNvbnRyb2wucHJvcChcImNoZWNrZWRcIikpO1xuXHRcdCRjb250cm9sWzBdLmNsaWNrKCk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGlmICgkY29udHJvbC5pcygnOmNoZWNrZWQnKSkge1xuXHRcdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sIDEwKTtcblx0fSk7XG59O1xuIiwiLyogQ29tcG9uZW50IENvbmZpcm1hdGlvblBhbmVsM09wdGlvbnMgQ29uZmlybWF0aW9uUGFuZWwgc2FtZSBqYXZhc2NyaXB0IGNvZGUqL1xuXG5TYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwgPSB7XG5cdGlzQW55UGFuZWxPcGVuZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJykgJiYgJCgnLlBhbmVsQ29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XG5cdH0sXG5cblx0dG9nZ2xlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcblx0XHRpZiAoIU9zVmFsaWRhdG9yT25TdWJtaXQoKSkgcmV0dXJuO1xuXG5cdFx0aWYgKCFTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuaXNBbnlQYW5lbE9wZW5lZCgpKSB7XG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVJbigxNDApO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKCcjJyArIFBhbmVsSWQpXG5cdFx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXG5cdFx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XG5cdFx0XHR9LCAxMDApO1xuXHRcdH1cblx0fSxcblxuXHRjbG9zZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xuXHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZU91dCgxNDApO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCQoJyMnICsgUGFuZWxJZClcblx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXG5cdFx0XHRcdC5zbGlkZVVwKDE1MCk7XG5cdFx0fSwgMTAwKTtcblx0fSxcblxuXHRzZXRQYW5lbEJlaGF2aW9yOiBmdW5jdGlvbigpIHtcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0aGlzX3BhbmVsID0gJCh0aGlzKTtcblx0XHRcdCQoJyMnICsgdGhpc19wYW5lbC5hdHRyKCdwYW5lbC10cmlnZ2VyLWVsZW1lbnRpZCcpICsgJycpXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbC50b2dnbGVQYW5lbCh0aGlzX3BhbmVsLmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0U2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBhbmVsLnNldFBhbmVsQmVoYXZpb3IoKTtcblx0aWYgKG9zQWpheEJhY2tlbmQuRXZlbnRIYW5kbGVycy5BZnRlckFqYXhSZXF1ZXN0LnRvU3RyaW5nKCkuaW5kZXhPZignc2V0UGFuZWxCZWhhdmlvcicpID09IC0xKSB7XG5cdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuc2V0UGFuZWxCZWhhdmlvcik7XG5cdH1cbn0pO1xuIiwiLyogQ29tcG9uZW50IFBhbmVsQnlJRE5vdGlmeSAqL1xyXG52YXIgcGFuZWxOb3RpZnlXaWRnZXQ7XHJcblNhcHBoaXJlV2lkZ2V0cy5QYW5lbEJ5SWROb3RpZnkgPSB7XHJcblx0aXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuICQoJ2JvZHknKS5oYXNDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHR9LFxyXG5cdHRvZ2dsZVBhbmVsQnlOb3RpZnk6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHRpZiAoIWlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkKCkpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVJbigxNDApO1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoanVzdERyYWdnZWQgPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdCQoJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHRcdC5jc3MoJ21hcmdpbi1sZWZ0JywgcGFuZWxNYXJnaW5MZWZ0KVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdsZWZ0JywgcGFuZWxMZWZ0KVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MocGFuZWxBcnJvd0NsYXNzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVEb3duKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuZmFkZU91dCgxNDApO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdC5zbGlkZVVwKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR0b2dnbGVQYW5lbE5vdGlmeUJ5SWQ6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHQkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdC5mYWRlVG9nZ2xlKDE0MCk7XHJcblxyXG5cdFx0cGFuZWxOb3RpZnlXaWRnZXQgPSAkKCcjJyArIElkKVxyXG5cdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdC5hdHRyKCdOb3RpZnlJZCcpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBQYW5lbEJ5SUQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlBhbmVsQnlJZCA9e1xyXG5cdGlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkOmZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0fSxcclxuXHRcclxuXHR0b2dnbGVQYW5lbEJ5SWQ6ZnVuY3Rpb24gKElkKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcblx0XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuZmFkZUluKDE0MCk7XHJcblx0XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBqdXN0RHJhZ2dlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdGlmIChqdXN0RHJhZ2dlZCA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHQkKCcuUGFuZWxCeUlkTmV3X1BhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdtYXJnaW4tbGVmdCcsIHBhbmVsTWFyZ2luTGVmdClcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdsZWZ0JywgcGFuZWxMZWZ0KVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhwYW5lbEFycm93Q2xhc3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHR9XHJcblx0XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bigxNTApO1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQuY2xpY2soKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHRcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5mYWRlT3V0KDE0MCk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LmNsaWNrKCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4iLCIvKiBDb21wb25lbnQgUG9wVXBNZW51ICovXHJcblxyXG5TYXBwaGlyZVdpZGdldHMuUG9wVXBNZW51ID0ge1xyXG5cdG1lbnVQb3NpdGlvbjogZnVuY3Rpb24gKGlkLCBDb250ZXh0KSB7XHJcblx0XHQvKiBIaWRlIGFueSBvdGhlciBtZW51cyBvbiBwYWdlIGFuZCBzZXQgYnV0dG9uIGFzIGNvbGxhcHNlZC4gKi9cclxuXHRcdCQoJy5wb3B1cC1tZW51OnZpc2libGUnKS5oaWRlKCk7XHJcblxyXG5cdFx0Ly92YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIF90aGlzID0gJCgnIycgKyBpZCk7XHJcblx0XHR2YXIgWHggPSAwO1xyXG5cdFx0dmFyIFl5ID0gMDtcclxuXHRcdHZhciBXdyA9IDA7XHJcblx0XHR2YXIgSGggPSAwO1xyXG5cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWV4cGFuZDp2aXNpYmxlJykuaGlkZSgpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgbWVudSBlbGVtZW50LiAqL1xyXG5cdFx0dmFyIF9lbCA9IF90aGlzLm5leHQoJy5wb3B1cC1tZW51Jyk7XHJcblxyXG5cdFx0LyogRGlzcGxheSB0aGUgbWVudS4gKi9cclxuXHRcdF9lbC5zaG93KCk7XHJcblxyXG5cdFx0LyogU2V0IGJ1dHRvbiBjb2xsYXBzZS4gKi9cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWNvbGxhcHNlJykuc2hvdygpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYnV0dG9uLiAqL1xyXG5cdFx0YnV0dG9uSGggPSBfdGhpcy5vdXRlckhlaWdodCgpO1xyXG5cdFx0YnV0dG9uV3cgPSBfdGhpcy5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvblkgPSBfdGhpcy5wb3NpdGlvbigpLnRvcCArIGJ1dHRvbkhoO1xyXG5cdFx0dmFyIGJ1dHRvblggPSBfdGhpcy5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0Ly92YXIgYnV0dG9uWCA9IF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHQvKiBHZXQgdGhlIGRpc3RhbmNlIG9mIG1lbnUgYnV0dG9uIGFuZCB0aGUgcGFyZW50IGVsZW1lbnQgKi9cclxuXHRcdHZhciBwb3B1cFBhcmVudFh4ID0gX3RoaXMub2Zmc2V0KCkubGVmdCAtIF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHR2YXIgcG9wdXBYeCA9IF9lbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIHBvcHVwV3cgPSBfZWwub3V0ZXJXaWR0aCgpO1xyXG5cclxuXHRcdFh4ID0gTWF0aC5hYnMoYnV0dG9uWCAtICQoJ2JvZHknKS5zY3JvbGxMZWZ0KCkgLSBwb3B1cFBhcmVudFh4KTtcclxuXHRcdFl5ID0gTWF0aC5hYnMoYnV0dG9uSGggLSBidXR0b25ZIC0gJCgnYm9keScpLnNjcm9sbFRvcCgpKTtcclxuXHJcblx0XHQvKiBDaGVjayBpZiBjbGlja2VkIHBvc2l0aW9uIHBsdXMgdGhlIHBvcHVwIHdpZHRoIGV4Y2VlZCB0aGUgd2luZG93IHdpZHRoLiAqL1xyXG5cdFx0aWYgKGJ1dHRvblggKyBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSA+ICQoQ29udGV4dCkud2lkdGgoKSkge1xyXG5cdFx0XHRYeCA9IGJ1dHRvblggLSBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSAtIHBvcHVwUGFyZW50WHggKyBidXR0b25XdztcclxuXHRcdFx0Ly9YeCA9ICgkKHdpbmRvdykud2lkdGgoKSAtIHBvcHVwV3cpIC0gJCgnYm9keScpLnNjcm9sbExlZnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgbWVudSBwb3NpdGlvbi4gKi9cclxuXHRcdF9lbC5jc3Moe1xyXG5cdFx0XHRsZWZ0OiBYeCArICdweCcsXHJcblx0XHRcdHRvcDogYnV0dG9uWSArICdweCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qIFJlZnJlc2ggdmFsdWUgKi9cclxuXHRcdHBvcHVwWHggPSBfZWwub2Zmc2V0KCkubGVmdDtcclxuXHJcblx0XHR2YXIgX2JhbGxvb25FbCA9IF9lbC5jaGlsZHJlbignLnBvcHVwLW1lbnUtYmFsbG9vbicpO1xyXG5cclxuXHRcdHZhciBfYmFsbG9vblh4ID0gX2JhbGxvb25FbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIF9iYWxsb29uV3cgPSBfYmFsbG9vbkVsLm91dGVyV2lkdGgoKTtcclxuXHRcdHZhciBfYmFsbG9vblBvc1h4ID0gTWF0aC5hYnMoYnV0dG9uWCAtIFh4IC0gcG9wdXBQYXJlbnRYeCk7XHJcblxyXG5cdFx0LyogSXMgdGhlIGJhbGxvb24gaWNvbiBwb3NpdGlvbmVkIG91dCBvZiB0aGUgcG9wdXAgbWVudT8gKi9cclxuXHRcdGlmIChfYmFsbG9vblBvc1h4ICsgWHggKyBfYmFsbG9vbld3ID4gWHggKyBwb3B1cFd3KSB7XHJcblx0XHRcdF9iYWxsb29uUG9zWHggPSBfYmFsbG9vblBvc1h4IC0gX2JhbGxvb25XdztcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgcG9zaXRpb24gb2YgdGhlIGJhbGxvb24gZWZmZWN0LiAqL1xyXG5cdFx0X2JhbGxvb25FbC5jc3MoJ2xlZnQnLCBfYmFsbG9vblBvc1h4ICsgJ3B4Jyk7XHJcblx0fSxcclxuXHRtZW51RXZlbnRzOiBmdW5jdGlvbiAoQ29udGV4dCkge1xyXG5cdFx0JCgnLnBvcHVwLWJ1dHRvbicpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Qb3BVcE1lbnUubWVudVBvc2l0aW9uKGlkLCBDb250ZXh0KTtcclxuXHJcblx0XHRcdFx0LyplLnN0b3BQcm9wYWdhdGlvbigpOyovXHJcblxyXG5cdFx0XHRcdC8qIFByZXZlbnQgbGluayBzdWJtaXNzaW9uICovXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHQvKiB2ICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogdiAqL1xyXG5cdFx0ZnVuY3Rpb24gUE1DbGlja091dHNpZGUoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50Lmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0LyppZiAoKHRhcmdldC5wYXJlbnRzKCkuaW5kZXgoJCgnYVtzYXBwaGlyZWhvc3BpdGFsXSwgLkhvc3BpdGFsUG9wVXAnKSkgPT0gLTEpKSB7fSovXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0ISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFxyXG5cdFx0XHRcdFx0XHQnLnBvcHVwLWJ1dHRvbiwgLnBvcHVwLW1lbnUsIC5vcy1pbnRlcm5hbC11aS1hdXRvY29tcGxldGUsIC5vcy1pbnRlcm5hbC11aS1tZW51LWl0ZW0sIC5vcy1pbnRlcm5hbC11aS1jb3JuZXItYWxsLCB1aS1hdXRvY29tcGxldGUtaXRlbSdcclxuXHRcdFx0XHRcdCkubGVuZ3RoXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHQkKCcucG9wdXAtbWVudTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1leHBhbmQnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0dmFyIF9QTUlzQ2xpY2sgPSBmYWxzZTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0XHRfUE1Jc0NsaWNrID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cdFx0JChkb2N1bWVudCkub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0UE1DbGlja091dHNpZGUoZXZlbnQpO1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKCFfUE1Jc0RyYWcgJiYgX1BNSXNDbGljaykge1xyXG5cdFx0XHRcdFBNQ2xpY2tPdXRzaWRlKGV2ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQkKCdib2R5JykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQvKiBeICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogXiAqL1xyXG5cdH1cclxufTsiLCIvKiBDb21wb25lbnQgU2FwcGhpcmVQYW5lbCAqL1xuU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwgPSB7XG5cdGNoZWNrT3BlblBhbmVsOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpICYmICQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcjp2aXNpYmxlJykubGVuZ3RoO1xuXHR9LFxuXG5cdHRvZ2dsZVNhcHBoaXJlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcblx0XHRpZiAoIU9zVmFsaWRhdG9yT25TdWJtaXQoKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuY2hlY2tPcGVuUGFuZWwoKSkge1xuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xuXHRcdFx0JCgnIycgKyBQYW5lbElkKS5mYWRlSW4oMTQwKTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnIycgKyBQYW5lbElkKVxuXHRcdFx0XHRcdC5maW5kKCcuU2FwcGhpcmVQYW5lbF9Db250YWluZXInKVxuXHRcdFx0XHRcdC5zbGlkZVRvZ2dsZSgxNTApO1xuXHRcdFx0fSwgMTAwKTtcblx0XHR9XG5cdH0sXG5cblx0Y2xvc2VTYXBwaGlyZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xuXHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZU91dCgxNDApO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCQoJyMnICsgUGFuZWxJZClcblx0XHRcdFx0LmZpbmQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcicpXG5cdFx0XHRcdC5zbGlkZVVwKDE1MCk7XG5cdFx0fSwgMTAwKTtcblx0fSxcblxuXHRzZXRQYW5lbEJlaGF2aW9yOiBmdW5jdGlvbigpIHtcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0aGlzX3BhbmVsID0gJCh0aGlzKTtcblx0XHRcdCQoJyMnICsgdGhpc19wYW5lbC5hdHRyKCdwYW5lbC10cmlnZ2VyLWVsZW1lbnRpZCcpICsgJycpXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnRvZ2dsZVNhcHBoaXJlUGFuZWwodGhpc19wYW5lbC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IoKTtcblxuXHRpZiAob3NBamF4QmFja2VuZC5FdmVudEhhbmRsZXJzLkFmdGVyQWpheFJlcXVlc3QudG9TdHJpbmcoKS5pbmRleE9mKCdzZXRQYW5lbEJlaGF2aW9yJykgPT0gLTEpIHtcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IpO1xuXHR9XG59KTtcbiIsInJlcXVpcmUoJy4vY29uZmlybWF0aW9uLXBhbmVsJyk7XHJcbnJlcXVpcmUoJy4vcGFuZWwtYnktaWQnKTtcclxuLy9yZXF1aXJlKCcuL3BhbmVsLWJ5LWlkLW5vdGlmeScpO1xyXG5yZXF1aXJlKCcuL3BvcHVwLW1lbnUnKTtcclxucmVxdWlyZSgnLi9zYXBwaGlyZS1wYW5lbCcpO1xyXG5cclxuIiwiLyogQ29tcG9uZW50IFBhdGllbnRDYWxsQ2FuY2VsICovXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcblx0XHR2YXIgaW50ZXJ2YWw7XG5cdFx0dmFyIHRpbWVDb3VudGVyO1xuXHRcdHZhciAkd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpLmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbCcpO1xuXHRcdHZhciAkY291bnRkb3duID0gJHdpZGdldC5maW5kKCcuUGF0aWVudENhbGxDYW5jZWwtY291bnRlcicpO1xuXHRcdHZhciAkbGFiZWwgPSAkd2lkZ2V0LmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbC1sYWJlbCcpO1xuXG5cdFx0dmFyIHNldFN0YXRlID0gZnVuY3Rpb24oc3RhdGVfaW4sIHRleHRfaW4pIHtcblx0XHRcdC8vanMtaWRsZSwganMtY2FsbGluZ1xuXHRcdFx0JHdpZGdldC5maW5kKCc+IGRpdicpLnByb3AoJ2NsYXNzJywgc3RhdGVfaW4pO1xuXHRcdFx0JGxhYmVsLnRleHQodGV4dF9pbik7XG5cdFx0fTtcblxuXHRcdHZhciBjYWxsUGF0aWVudCA9IGZ1bmN0aW9uKCR3aWRnZXQpIHtcblx0XHRcdHNldFN0YXRlKCdqcy1jYWxsaW5nJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcblx0XHRcdGlmIChjb25maWcuc2hvd0NvdW50ZG93bikge1xuXHRcdFx0XHQkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxpbmdJbiArICcgJyArIGNvbmZpZy50aW1lVG9DYW5jZWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4pO1xuXHRcdFx0fVxuXHRcdFx0c3RhcnRDb3VudGVyKCk7XG5cdFx0fTtcblxuXHRcdHZhciBzdGFydENvdW50ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcblx0XHRcdGludGVydmFsID0gd2luZG93LnNldEludGVydmFsKHVwZGF0ZUNvdW50ZXIsIDEwMDApO1xuXHRcdH07XG5cblx0XHR2YXIgdXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZUNvdW50ZXItLTtcblx0XHRcdGlmICh0aW1lQ291bnRlciA9PT0gMCkge1xuXHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcblx0XHRcdFx0dmFyIG5vdGlmaWNhdGlvbiA9ICcnO1xuXHRcdFx0XHRPc05vdGlmeVdpZGdldChjb25maWcucGF0aWVudENhbGxGYWtlTm90aWZ5SWQsIG5vdGlmaWNhdGlvbik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY29uZmlnLnNob3dDb3VudGRvd24pIHtcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4gKyAnICcgKyB0aW1lQ291bnRlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxpbmdJbik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdCR3aWRnZXQuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsLWNhbmNlbC0tbGFiZWwnKS50ZXh0KGNvbmZpZy50eHRDYW5jZWwpO1xuXG5cdFx0c2V0U3RhdGUoJ2pzLWlkbGUnLCBjb25maWcudHh0Q2FsbFBhdGllbnQpO1xuXG5cdFx0JHdpZGdldC5vbignY2xpY2snLCAnLmpzLWlkbGUgLlBhdGllbnRDYWxsQ2FuY2VsLWxhYmVsJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWxsUGF0aWVudCgkd2lkZ2V0KTtcblx0XHR9KTtcblxuXHRcdCR3aWRnZXQub24oJ2NsaWNrJywgJy5qcy1pZGxlIC5QYXRpZW50Q2FsbENhbmNlbC1pY29uJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWxsUGF0aWVudCgkd2lkZ2V0KTtcblx0XHR9KTtcblxuXHRcdCR3aWRnZXQub24oJ2NsaWNrJywgJy5qcy1jYWxsaW5nIC5QYXRpZW50Q2FsbENhbmNlbC1jYW5jZWwnLCBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcblx0XHRcdCRjb3VudGRvd24udGV4dCh0aW1lQ291bnRlcik7XG5cdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcblx0XHRcdHNldFN0YXRlKCdqcy1pZGxlJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcblx0XHR9KTtcblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuUGF0aWVudENhbGxDYW5jZWwgPSB7XG5cdFx0Y3JlYXRlOiBjcmVhdGUsXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XG4iLCIvKiBDb21wb25lbnQgUGVyc29uQ2FyZCAqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdHZhciBQZXJzb25DYXJkRXZlbnQgPSBmdW5jdGlvbigpIHtcblx0XHQkKCcuUGVyc29uQ2FyZF9fdGl0bGUsIC5QZXJzb25DYXJkX19jb250ZW50Jylcblx0XHRcdC5vZmYoJ2NsaWNrJylcblx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0JGhlYWRlciA9ICQodGhpcykuY2xvc2VzdCgnLlBlcnNvbkNhcmRfaGVhZGVyJyk7XG5cdFx0XHRcdCRjb250ZW50ID0gJGhlYWRlci5uZXh0KCk7XG5cdFx0XHRcdGlmICgkY29udGVudC5jaGlsZHJlbigpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQkY29udGVudC5zbGlkZVRvZ2dsZSg1MDApO1xuXHRcdFx0XHRcdGlmICgkKCcuUGVyc29uQ2FyZC5Jc09wZW4nKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuUGVyc29uQ2FyZCcpXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnSXNPcGVuJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5QZXJzb25DYXJkJylcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdJc09wZW4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9O1xuXG5cdCQoJy5TdG9wUHJvcGFnYXRpb24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9KTtcblxuXHRQZXJzb25DYXJkRXZlbnQoKTtcblxuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFBlcnNvbkNhcmRFdmVudCk7XG59KTtcbiIsIi8qIENvbXBvbmVudCBQcmVzY3JpcHRpb25DYXJkICovXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcblx0XHQkKGAjJHtjb25maWcud2lkZ2V0SWR9YCkuY2xpY2soKCkgPT4ge1xuXHRcdFx0c2hvd01vcmUoJChgIyR7Y29uZmlnLndpZGdldElkfWApKTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBzaG93TW9yZSA9IGVsZW1lbnQgPT4ge1xuXHRcdGNvbnN0IHBhcmVudHMgPSBlbGVtZW50LnBhcmVudHMoJy5QcmVzY3JpcHRpb25DYXJkJyk7XG5cblx0XHRpZiAocGFyZW50cy5maW5kKCcuRXhwYW5EaXYnKS5oYXNDbGFzcygnSXNPcGVuJykpIHtcblx0XHRcdHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykucmVtb3ZlQ2xhc3MoJ0lzT3BlbicpO1xuXG5cdFx0XHRlbGVtZW50LnRleHQoJ1NlZSBNb3JlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykuYWRkQ2xhc3MoJ0lzT3BlbicpO1xuXG5cdFx0XHRlbGVtZW50LnRleHQoJ1NlZSBMZXNzJyk7XG5cdFx0fVxuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5QcmVzY3JpcHRpb25DYXJkID0geyBjcmVhdGUgfTtcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xuIiwiLyogQ29tcG9uZW50IFByZXNjcmlwdGlvbkV4cGFuZGFibGUgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xuXHRjb25zdCBQcmVzY3JpcHRpb25FeHBhbmRhYmxlID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0Y29uc3Qgd2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XG5cdFx0Y29uc3QgcHJldmlld3N0YXQgPSBbXTtcblx0XHRjb25zdCB0cmFuc2l0aW9uRXZlbnQgPSBTaWxrVUkud2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcblxuXHRcdGNvbnN0ICRlbGVtZW50V3JhcHBlciA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcblxuXHRcdGNvbnN0IGNsaWNrRXZlbnRzID0gb2IgPT4ge1xuXHRcdFx0aWYgKCQob2IpLmhhc0NsYXNzKCdQcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlcl9fTGlua3NEaXYnKSkge1xuXHRcdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpXG5cdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0LnBhcmVudCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIFNlY3Rpb24gPSAkKG9iKS5wYXJlbnQoKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIFNlY3Rpb25Db250ZW50ID0gU2VjdGlvbi5jaGlsZHJlbignLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfY29udGVudCcpO1xuXG5cdFx0XHQvLyBnZXQgaWRcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcblxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xuXG5cdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XG5cblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcblx0XHRcdFx0dGVtcEhlaWdodCA9IFNlY3Rpb25Db250ZW50LmhlaWdodCgpO1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcblxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcblx0XHRcdFx0U2VjdGlvbi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XG5cblx0XHRcdFx0Ly8gYWRkIGV2ZW50IHRyYW5zaXRpb24gZW5kIHRvIG92ZXJmbG93OnZpc2libGUgZm9yIHRvb2x0aXBzIGFuZCBkcm9wZG93bnMgaXNzdWVzXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5pbml0ID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgJGhlYWRlciA9ICRlbGVtZW50V3JhcHBlci5maW5kKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXInKTtcblx0XHRcdGNvbnN0ICRsaW5rcyA9ICRoZWFkZXIuZmluZCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyX19MaW5rc0RpdicpO1xuXG5cdFx0XHQvLyBDcmVhdGUgYXJyYXkgc3RhdFxuXHRcdFx0JCgnLlNlY3Rpb25QcmVzY3JpcHRpb25FeHBhbmRhYmxlQXJlYScpLmVhY2goKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzdGF0ID0gJGhlYWRlci5oYXNDbGFzcygnZXhwYW5kZWQnKSA/IHRydWUgOiBmYWxzZTtcblx0XHRcdFx0cHJldmlld3N0YXRbd2lkZ2V0SWRdID0geyBjbGllbnQ6IHN0YXQsIHNlcnZlcjogc3RhdCB9O1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICgkaGVhZGVyLmhhc0NsYXNzKCdOb3RFeHBhbmRhYmxlJykpIHtcblx0XHRcdFx0JGhlYWRlci5vbignY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cdFx0XHR9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoJ2lzTGlua0VwYW5kYWJsZUNsaWNrJykpIHtcblx0XHRcdFx0JGxpbmtzLm9uKCdjbGljaycsIGUgPT4gY2xpY2tFdmVudHMoJGxpbmtzKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkaGVhZGVyLm9uKCdjbGljaycsIGUgPT4gY2xpY2tFdmVudHMoJGhlYWRlcikpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbGVtZW50cyA9XG5cdFx0XHRcdCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgaW5wdXQsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBzZWxlY3QsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBhJztcblx0XHRcdCQoZWxlbWVudHMpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoYWpheFJlZnJlc2gpO1xuXHRcdH07XG5cblx0XHRjb25zdCBhamF4UmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xuXHRcdFx0JCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyJykub2ZmKCk7XG5cblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXG5cdFx0XHQkKFxuXHRcdFx0XHQnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIGlucHV0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgc2VsZWN0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgYSdcblx0XHRcdCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcblx0XHRcdCQoJy5TZWN0aW9uUHJlc2NyaXB0aW9uRXhwYW5kYWJsZUFyZWEnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcblx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPT0gbnVsbCkge1xuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcblx0XHRcdFx0XHQvLyBpZiBvcGVuXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBhZGQgcm93XG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRjdXJTdGF0ZSA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBjaGVjayBpZiBhamF4ICE9IGluaXRpYWwgc2VydmVyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPSBjdXJTdGF0ZTtcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2NvbnRlbnQnKVxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gdHJ1ZSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgUHJlc2NyaXB0aW9uRXhwYW5kYWJsZShjb25maWcpO1xuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gV2ViUGF0dGVybnMvQ29udGVudC9TZWN0aW9uRXhwYW5kYWJsZScpO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlID0geyBjcmVhdGUgfTtcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xuIiwiLyogQ29tcG9uZW50IFNhcHBoaXJlSGVhZGVyICovXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IFNhcHBoaXJlSGVhZGVyKGNvbmZpZyk7XG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xuXHR9O1xuXG5cdHZhciBoYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZF0uaGFuZGxlRGVtb2dyYXBoaWNzKCk7XG5cdH07XG5cblx0dmFyIFNhcHBoaXJlSGVhZGVyID0gZnVuY3Rpb24gKGNvbmZpZykge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cdFx0dGhpcy5pc0NvbmZpZGVudGlhbCA9IGNvbmZpZy5pc0NvbmZpZGVudGlhbDtcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XG5cdFx0dGhpcy4kd2lkZ2V0LmNzcyh7XG5cdFx0XHRkaXNwbGF5OiAnYmxvY2snXG5cdFx0fSk7XG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlcicpO1xuXHRcdHRoaXMuJGRlbW9ncmFwaGljID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKTtcblx0XHR0aGlzLiRpbmZvcm1hdGlvbiA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItaW5mb3JtYXRpb24nKTtcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC10cmlnZ2VyJyk7XG5cdFx0dGhpcy4kYWRkaXRpb25hbENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWFkZGl0aW9uYWwtY29udGVudCcpO1xuXHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcblx0XHQkKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRfdGhpcy5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcblx0XHRcdH0sIDUwMCk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWc7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhhbmRsZVJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuXHRcdFx0X3RoaXMuaGFuZGxlRGVtb2dyYXBoaWNzKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMuJGFkZGl0aW9uYWxUcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChfdGhpcy4kaGVhZGVyLmhhc0NsYXNzKCdpc09wZW4nKSkge1xuXHRcdFx0XHRfdGhpcy4kaGVhZGVyLnJlbW92ZUNsYXNzKCdpc09wZW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF90aGlzLiRoZWFkZXIuYWRkQ2xhc3MoJ2lzT3BlbicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdFNhcHBoaXJlSGVhZGVyLnByb3RvdHlwZS5oYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHR0aGlzLiRkZW1vZ3JhcGhpYy5maW5kKCcuRGVtb2dyYXBoaWMtaXRlbScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0dGhpcy4kYWRkaXRpb25hbFRyaWdnZXIuaGlkZSgpO1xuXHRcdHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmVtcHR5KCk7XG5cdFx0dmFyIGRlbW9ncmFwaGljV2lkdGggPSB0aGlzLiRkZW1vZ3JhcGhpYy5vdXRlcldpZHRoKHRydWUpO1xuXHRcdHZhciBpdGVtc1RvdGFsID0gMDtcblx0XHR0aGlzLiRkZW1vZ3JhcGhpYy5maW5kKCcuRGVtb2dyYXBoaWMtaXRlbScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG5cdFx0XHRpdGVtc1RvdGFsICs9IHBhcnNlSW50KCQodGhpcykub3V0ZXJXaWR0aCh0cnVlKSwgMTApO1xuXHRcdFx0aWYgKGl0ZW1zVG90YWwgKyA2MCA8IGRlbW9ncmFwaGljV2lkdGgpIHtcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKHRoaXMpLmNsb25lKCkuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpLmFwcGVuZFRvKF90aGlzLiRhZGRpdGlvbmFsQ29udGVudCk7XG5cdFx0XHRcdF90aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLiRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xuXHRcdH1cblx0fTtcblxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuc2hvd0FkZGl0aW9uYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5hZGRDbGFzcygnaXNPcGVuJyk7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhpZGVBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLiRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlciA9IHtcblx0XHRjcmVhdGU6IGNyZWF0ZSxcblx0XHRoYW5kbGVEZW1vZ3JhcGhpY3M6IGhhbmRsZURlbW9ncmFwaGljcyxcblx0fTtcblxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xuXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XG5cdGlmICghISQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKS5sZW5ndGgpIHtcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVIZWFkZXIud2lkZ2V0SWRdLmhhbmRsZURlbW9ncmFwaGljcygpO1xuXHRcdH0pO1xuXHR9XG59KTsiLCIvKiBDb21wb25lbnQgU2FwcGhpcmVSYWRpb0J1dHRvbiAqL1xuU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUmFkaW9CdXR0b24gPSB3aWRnZXRJZCA9PiB7XG5cdHZhciAkd2lkZ2V0ID0gJCgnIycgKyB3aWRnZXRJZCk7XG5cdHZhciAkY29udHJvbCA9ICR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XG5cdHZhciBuYW1lID0gJGNvbnRyb2wucHJvcCgnbmFtZScpO1xuXG5cdCRjb250cm9sLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtuYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LmNsb3Nlc3QoJy5CdXR0b25SYWRpb0lucCcpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSk7XG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcblx0XHRcdCR3aWRnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkd2lkZ2V0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9XG5cdH0pO1xuXG5cdCR3aWRnZXQuZmluZCgnLkJ1dHRvblJhZGlvSW5wX3JhZGlvVGV4dCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdGlmIChcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LmNsb3Nlc3QoJy5CdXR0b25SYWRpb0lucCcpXG5cdFx0XHRcdC5oYXNDbGFzcygnZGlzYWJsZWQnKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHQkY29udHJvbC50cmlnZ2VyKCdjbGljaycpO1xuXHRcdCRjb250cm9sLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0aWYgKCRjb250cm9sLmlzKCc6Y2hlY2tlZCcpKSB7XG5cdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JHdpZGdldC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fVxuXHR9KTtcbn07XG4iLCIvKiBDb21wb25lbnQgU2VjdGlvbkV4cGFuZGFibGUgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU4JykgfHwgJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU5JykpIHtcclxuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFqYXggcmVmcmVzIGZ1bmN0aW9uXHJcblx0XHR0aGF0LmFqYXhSZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoKTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gc2VsZWN0LCAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIGEnKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgbmV3IGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxyXG5cdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID0ge1xyXG5cdFx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxyXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcclxuXHRcdFx0XHRpZiAoY3VyU3RhdGUgIT0gcHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10pIHtcclxuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gZmFsc2UgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpXHJcblx0XHRcdFx0XHRcdFx0LmhlaWdodCgwKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gdHJ1ZSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIHNldCBldmVudHNcclxuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7XHJcblx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRzZXJ2ZXI6IHN0YXQsXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ0hpZGVXaGVuRW1wdHknKSAmJiAkKHRoaXMpLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50JykudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBoYWNrIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gU2VjdGlvbkV4cGFuZGFibGVDdXN0b20gaGFzIG5vIGNoaWxkIGl0ZW1zXHJcblx0XHRcdFx0dmFyIGlzRW1wdHkgPSB0cnVlO1xyXG5cdFx0XHRcdCQodGhpcykuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tX2NvbnRlbnQgZGl2LCAuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCBzcGFuJykubm90KCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGlzRW1wdHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGlmICghaXNFbXB0eSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZScsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblx0XHRcdFx0dmFyICRleHBhbmRhYmxlSW5zdGFuY2UgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciAkdG9nZ2xlciA9ICQodGhpcykuZmluZCgnPiAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIC5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVyJyk7XHJcblx0XHRcdFx0aWYgKCR0b2dnbGVyLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyICR0b2dnbGVyU3RhdGUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0JHRvZ2dsZXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHQkdG9nZ2xlclN0YXRlID0gISR0b2dnbGVyU3RhdGU7XHJcblx0XHRcdFx0XHRcdGlmICgkdG9nZ2xlclN0YXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0JGV4cGFuZGFibGVJbnN0YW5jZS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGUtdG9nZ2xlZCcpLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHQkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHZhbHVlXScpLnRleHQoJHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWxoaWRlXScpLmRhdGEoJ2xhYmVsaGlkZScpKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQkZXhwYW5kYWJsZUluc3RhbmNlLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVkJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoXCJjbGlja1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gYScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkV4cGFuZGFibGVDdXN0b20oKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2lsa1VJRnJhbWV3b3JrL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2VjdGlvbkV4cGFuZGFibGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cclxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpLm9mZigpO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcclxuXHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zIHRvIGNyZWF0ZSBhcnJheSBzdGF0XHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7IGNsaWVudDogc3RhdCwgc2VydmVyOiBzdGF0IH07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpLm9mZihcImNsaWNrXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoXHJcblx0XHRcdFx0Jy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIGlucHV0LCAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIGEnXHJcblx0XHRcdCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBldmVudCBhamF4XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QodGhhdC5hamF4UmVmcmVzaCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y29uc3Qgc2V0T3BlbkNsb3NlQ2xhc3MgPSBpZCA9PiB7XHJcblx0XHRpZC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGlkLnBhcmVudCgpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuSGVhZGVySWNvbicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2Nsb3NlZCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuSGVhZGVySWNvbicpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuSGVhZGVySWNvbicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ29wZW4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gKCkgPT4ge1xyXG5cdFx0U2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlID0gbmV3IFNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlKCk7XHJcblx0XHRTaWxrVUkuRXhlY3V0ZShTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUuaW5pdCwgJ0Vycm9yIG9uIFNpbGtVSUZyYW1ld29yay9Db250ZW50L1NlY3Rpb25FeHBhbmRhYmxlJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0c2V0T3BlbkNsb3NlQ2xhc3MsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBTZWxlY3RTeXN0ZW0gKi9cclxuU2FwcGhpcmVXaWRnZXRzLlNlbGVjdFN5c3RlbSA9IGNvbmZpZyA9PiB7XHJcblx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgV2lkZ2V0SWQgPSBjb25maWcuV2lkZ2V0SWQ7IC8vQ29tYm8gQm94IElkIHRvIGJlIHVzZWQuXHJcblx0XHR2YXIgQ2xhc3MgPSBjb25maWcuQ2xhc3M7IC8vQWxsIENvbWJvIGJveGVzIHdpdGggdGhpcyBjbGFzcyB3aWxsIGJlIGJlIHRyYW5zZm9ybWVkLlxyXG5cdFx0dmFyIE5vUmVzdWx0c1RleHQgPSBjb25maWcuTm9SZXN1bHRzVGV4dDsgLy9UZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGVyZSBhcmUgbm8gcmVzdWx0cy5cclxuXHRcdHZhciBpbnB1dFR5cGUgPSBjb25maWcuSW5wdVR5cGU7IC8vT3B0aW9uczogRklsdGVycywgRHJvcGRvd24sIFNlbGVjdDJcclxuXHRcdHZhciBQcm9tcHQgPSBjb25maWcuUHJvbXB0OyAvL1Byb21wdCBpbiBzZWFyY2hcclxuXHRcdHZhciBTZWxlY3QyVHlwZSA9IGNvbmZpZy5TZWxlY3RUeXBlOyAvLyBUeXBlIG9mIHNlbGVjdDIgY29uZmlndXJhdGlvblxyXG5cdFx0dmFyIEhhc1NlYXJjaCA9IGNvbmZpZy5IYXNTZWFyY2g7IC8vIGhhcyBzZWFyY2hcclxuXHRcdHZhciBPblNlbGVjdGluZ0pTID0gY29uZmlnLk9uU2VsZWN0aW5nSlM7XHJcblx0XHR2YXIgT25VblNlbGVjdGluZ0pTID0gY29uZmlnLk9uVW5TZWxlY3RpbmdKUztcclxuXHRcdHZhciBNYXhpbXVtTGVuZ3RoID0gY29uZmlnLk1heGltdW1MZW5ndGg7XHJcblx0XHR2YXIgU2VsZWN0ZWRWYWx1ZSA9IGNvbmZpZy5TZWxlY3RlZFZhbHVlO1xyXG5cdFx0dmFyIGFsbG93Q2xlYXIgPSBjb25maWcuYWxsb3dDbGVhcjtcclxuXHRcdC8vICBTZWxlY3QyIEFqYXggQ29uZmlndXJhdGlvblxyXG5cdFx0dmFyIEFqYXhVUkwgPSBjb25maWcuQWpheFVSTDtcclxuXHRcdHZhciBBamF4RGVsYXkgPSBjb25maWcuQWpheERlbGF5O1xyXG5cdFx0dmFyIFBhZ2luYXRpb25TaXplID0gY29uZmlnLlBhZ2luYXRpb25TaXplO1xyXG5cdFx0dmFyIE1pbmltdW1JbnB1dExlbmdodCA9IGNvbmZpZy5NaW5pbXVtSW5wdXRMZW5naHQ7XHJcblx0XHR2YXIgU2VhcmNoVGVybSA9IGNvbmZpZy5TZWFyY2hUZXJtO1xyXG5cdFx0dmFyIFNlYXJjaEV4dHJhUGFyYW0xID0gY29uZmlnLlNlYXJjaEV4dHJhUGFyYW0xO1xyXG5cdFx0dmFyIFBhZ2VUZXJtID0gY29uZmlnLlBhZ2VUZXJtO1xyXG5cdFx0dmFyIEFtb3VudFBhZ2UgPSBjb25maWcuUGFnZUFtb3VudDtcclxuXHRcdHZhciBpc011bHRpcGxlID0gY29uZmlnLmlzTXVsdGlwbGU7XHJcblx0XHR2YXIgU2VsZWN0Mk9wdGlvbnMgPSB7fTtcclxuXHRcdHZhciAkV2lkZ2V0SWRlbnRpZmllcjtcclxuXHJcblx0XHQvKiAgXHJcbiAgICAgICAgICBDaGFuZ2Ugc2VsZWN0MiBzZWFyY2ggZGlzcGxheSBcclxuICAgICAgICAgICAgICAtTXVsdGlwbGUgU2VsZWN0MiBzZWFyY2ggVUkgbGlrZSBTaW5nbGUgU2VsZWN0MlxyXG4gICAgICAqL1xyXG5cdFx0JC5mbi5zZWxlY3QyLmFtZC5kZWZpbmUoXHJcblx0XHRcdCdTZWFyY2hMaWtlU2luZ2xlJyxcclxuXHRcdFx0W1xyXG5cdFx0XHRcdCdzZWxlY3QyL3V0aWxzJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bicsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQm9keScsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQ29udGFpbmVyJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bi9zZWFyY2gnLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxcclxuXHRcdFx0XSxcclxuXHRcdFx0ZnVuY3Rpb24gKFV0aWxzLCBEcm9wZG93biwgQXR0YWNoQm9keSwgQXR0YWNoQ29udGFpbmVyLCBTZWFyY2gsIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoKSB7XHJcblx0XHRcdFx0bGV0IGRyb3Bkb3duU2VhcmNoID0gVXRpbHMuRGVjb3JhdGUoRHJvcGRvd24sIFNlYXJjaCk7XHJcblx0XHRcdFx0ZHJvcGRvd25TZWFyY2gucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHZhciAkcmVuZGVyZWQgPSBEcm9wZG93bi5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0XHQvLyBBZGQgYWJpbGl0eSBmb3IgYSBwbGFjZWhvbGRlciBpbiB0aGUgc2VhcmNoIGJveFxyXG5cdFx0XHRcdFx0bGV0IHBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLmdldCgncGxhY2Vob2xkZXJGb3JTZWFyY2gnKSB8fCAnJztcclxuXHRcdFx0XHRcdHZhciAkc2VhcmNoID0gJChcclxuXHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2ggc2VsZWN0Mi1zZWFyY2gtLWRyb3Bkb3duXCI+JyArXHJcblx0XHRcdFx0XHRcdCc8aW5wdXQgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaF9fZmllbGRcIiBwbGFjZWhvbGRlcj1cIicgK1xyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlciArXHJcblx0XHRcdFx0XHRcdCdcIiB0eXBlPVwic2VhcmNoXCInICtcclxuXHRcdFx0XHRcdFx0JyB0YWJpbmRleD1cIi0xXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiJyArXHJcblx0XHRcdFx0XHRcdCcgc3BlbGxjaGVjaz1cImZhbHNlXCIgcm9sZT1cInRleHRib3hcIiAvPicgK1xyXG5cdFx0XHRcdFx0XHQnPC9zcGFuPidcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4kc2VhcmNoQ29udGFpbmVyID0gJHNlYXJjaDtcclxuXHRcdFx0XHRcdHRoaXMuJHNlYXJjaCA9ICRzZWFyY2guZmluZCgnaW5wdXQnKTtcclxuXHRcdFx0XHRcdCRzZWFyY2guYWRkQ2xhc3MoJ011bHRpcGxlU2VsZWN0Jyk7XHJcblxyXG5cdFx0XHRcdFx0JHJlbmRlcmVkLnByZXBlbmQoJHNlYXJjaCk7XHJcblx0XHRcdFx0XHQkc2VhcmNoLnBhcmVudCgpLmFkZENsYXNzKCdNdWx0aXBsZVNlbGVjdCcpO1xyXG5cdFx0XHRcdFx0cmV0dXJuICRyZW5kZXJlZDtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBEZWNvcmF0ZSB0aGUgZHJvcGRvd24rc2VhcmNoIHdpdGggdGhlIGNvbnRhaW5lcnNcclxuXHRcdFx0XHRsZXQgYWRhcHRlciA9IFV0aWxzLkRlY29yYXRlKGRyb3Bkb3duU2VhcmNoLCBBdHRhY2hDb250YWluZXIpO1xyXG5cdFx0XHRcdGFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShhZGFwdGVyLCBBdHRhY2hCb2R5KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGFkYXB0ZXI7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZWZhdWx0IENvbmZpZ3VyYXRpb24gbmVlZGVkIHRvIGFzc29jaWF0ZSB0aGUgd2lkZ2V0IHRvIHRoZSBzZWxlY3QyIHBsdWdpblxyXG5cdFx0ICovXHJcblx0XHRpZiAoV2lkZ2V0SWQgPT09ICcnICYmIENsYXNzICE9ICcnKSB7XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyID0gJCgnLicgKyBDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllciA9ICQoJyMnICsgV2lkZ2V0SWQpO1xyXG5cdFx0fVxyXG5cdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnc2VsZWN0LWhpZGUgJyArIGlucHV0VHlwZTtcclxuXHJcblx0XHQvLyAgU2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25QYXJlbnQ9ICQoJyMnK1BhcmVudERpdik7XHJcblxyXG5cdFx0dmFyIGZvcm1hdFJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0dmFyICRzZWxlY3RlZE9wdGlvbnNWYWx1ZSA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gJHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmxlbmd0aDtcclxuXHRcdFx0dmFyIHRvdGFsT3B0aW9ucyA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbicpLmxlbmd0aDtcclxuXHRcdFx0dmFyIHNlbGVjdEFsbE9wdCA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZDpzZWxlY3RlZCcpLmxlbmd0aDtcclxuXHRcdFx0dmFyIGFjdGl2ZVZhbHVlcyA9ICcnO1xyXG5cdFx0XHR2YXIgYWxsT3B0RXhjZXB0QWxsID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnOnNlbGVjdGVkOm5vdChcIi5TZWxlY3RlZEFsbFwiKScpLmxlbmd0aDtcclxuXHRcdFx0dmFyICRhbGxPcHRFeGNlcHRBbGxPYmogPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCc6c2VsZWN0ZWQ6bm90KFwiLlNlbGVjdGVkQWxsXCIpJyk7XHJcblxyXG5cdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID09PSB0b3RhbE9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAodG90YWxPcHRpb25zIC0gMSA+IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiAnQWxsIFNlbGVjdGVkJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JGFsbE9wdEV4Y2VwdEFsbE9iai5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0YWN0aXZlVmFsdWVzID0gYWN0aXZlVmFsdWVzICsgJyAnICsgJCh0aGlzKVswXS5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGFjdGl2ZVZhbHVlcyA9IGFjdGl2ZVZhbHVlcy5yZXBsYWNlKC8sXFxzKiQvLCAnJyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gYWN0aXZlVmFsdWVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgdG90YWxvcHQgPSB0b3RhbE9wdGlvbnMgLSAxO1xyXG5cdFx0XHRcdGlmIChzZWxlY3RlZE9wdGlvbnMgPiAzKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2VsZWN0ZWRPcHRpb25zICsgJyBvZiAnICsgdG90YWxvcHQgKyAnIHNlbGVjdGVkJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKHNlbGVjdGVkT3B0aW9ucyA+IDApIHtcclxuXHRcdFx0XHRcdFx0JHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdGFjdGl2ZVZhbHVlcyA9IGFjdGl2ZVZhbHVlcyArICcgJyArICQodGhpcylbMF0uaW5uZXJUZXh0ICsgJywgJztcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZVZhbHVlcyA9IGFjdGl2ZVZhbHVlcy5yZXBsYWNlKC8sXFxzKiQvLCAnJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBhY3RpdmVWYWx1ZXM7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJ1NlbGVjdCBhbiBvcHRpb24nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoTm9SZXN1bHRzVGV4dCAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5mb3JtYXROb01hdGNoZXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIE5vUmVzdWx0c1RleHQ7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlucHV0VHlwZSAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gaW5wdXRUeXBlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhbGxvd0NsZWFyID09PSAnVHJ1ZScpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuYWxsb3dDbGVhciA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE1heGltdW1MZW5ndGggIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMubWF4aW11bUlucHV0TGVuZ3RoID0gTWF4aW11bUxlbmd0aDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoUHJvbXB0ICE9ICcnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnBsYWNlaG9sZGVyID0gUHJvbXB0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMucGxhY2Vob2xkZXIgPSB7XHJcblx0XHRcdFx0aWQ6ICctMScsIC8vIHRoZSB2YWx1ZSBvZiB0aGUgb3B0aW9uXHJcblx0XHRcdFx0dGV4dDogJ1NlbGVjdCBhbiBvcHRpb24nLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzMnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgQWpheFxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cdFx0XHQvKiBTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcz0nOmFsbCc7Ki9cclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmFsbG93Q2xlYXIgPSBmYWxzZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGVtcGxhdGVTZWxlY3Rpb24gPSBmdW5jdGlvbiAocmVwbykge1xyXG5cdFx0XHRcdHJldHVybiByZXBvLmZ1bGxfbmFtZSB8fCByZXBvLnRleHQ7XHJcblx0XHRcdH07XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRlbXBsYXRlUmVzdWx0ID0gZnVuY3Rpb24gKHJlcG8pIHtcclxuXHRcdFx0XHRpZiAocmVwby5sb2FkaW5nKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVwby50ZXh0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgbWFya3VwID0gJzxkaXYgY2xhc3M9XCJcIkNsZWFyZml4XCJcIj4nICsgJzxkaXYgY2xhc3M9XCJcIlRoZW1lR3JpZF9XaWR0aDEyXCJcIj4nICsgcmVwby50ZXh0ICsgJzwvZGl2Pic7XHJcblx0XHRcdFx0aWYgKHJlcG8uZGVzY3JpcHRpb24pIHtcclxuXHRcdFx0XHRcdG1hcmt1cCArPSAnPGRpdiBjbGFzcz1cIlwiT1NBdXRvTWFyZ2luVG9wXCJcIj4nICsgcmVwby5kZXNjcmlwdGlvbiArICc8L2Rpdj4nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtYXJrdXAgKz0gJzwvZGl2Pic7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdChTZWxlY3QyT3B0aW9ucy5hamF4ID0ge1xyXG5cdFx0XHRcdHVybDogQWpheFVSTCxcclxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRcdGRlbGF5OiBBamF4RGVsYXksXHJcblx0XHRcdFx0ZGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xyXG5cdFx0XHRcdFx0dmFyIFNlbGVjdDJBamF4T3B0ID0ge307XHJcblx0XHRcdFx0XHR2YXIgU3BsaXRQYXJhbWV0ZXIgPSBTZWFyY2hFeHRyYVBhcmFtMS5zcGxpdCgnLCcpO1xyXG5cdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHQuU2VhcmNoVGVybSA9IHBhcmFtcy50ZXJtO1xyXG5cdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHQuUGFnZSA9IHBhcmFtcy5wYWdlIHx8IDE7XHJcblx0XHRcdFx0XHRTZWxlY3QyQWpheE9wdC5QYWdlQW1vdW50ID0gQW1vdW50UGFnZTtcclxuXHJcblx0XHRcdFx0XHRTcGxpdFBhcmFtZXRlci5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgc3BsaXRUZXh0ID0gZWwuc3BsaXQoJzonKTtcclxuXHRcdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHRbc3BsaXRUZXh0WzBdXSA9IHNwbGl0VGV4dFsxXTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBTZWxlY3QyQWpheE9wdDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbiAoZGF0YSwgcGFyYW1zKSB7XHJcblx0XHRcdFx0XHRwYXJhbXMucGFnZSA9IHBhcmFtcy5wYWdlIHx8IDE7XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHRzOiBkYXRhLml0ZW1zLFxyXG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0bW9yZTogcGFyYW1zLnBhZ2UgKiBQYWdpbmF0aW9uU2l6ZSA8IGRhdGEudG90YWxfY291bnQsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FjaGU6IHRydWUsXHJcblx0XHRcdH0pLFxyXG5cdFx0XHQoU2VsZWN0Mk9wdGlvbnMubWluaW11bUlucHV0TGVuZ3RoID0gTWluaW11bUlucHV0TGVuZ2h0KTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZXNjYXBlTWFya3VwID0gZnVuY3Rpb24gKG1hcmt1cCkge1xyXG5cdFx0XHRcdHJldHVybiBtYXJrdXA7XHJcblx0XHRcdH07XHJcblx0XHRcdGlmIChjb25maWcuaXNNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubXVsdGlwbGUgPSBmYWxzZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gMDtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNsb3NlT25zZWxlY3QgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5wbGFjZWhvbGRlciA9IFByb21wdDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICcyJykge1xyXG5cdFx0XHQvL1NlbGVjdDIgd2l0aCBDaGVja0JveFxyXG5cclxuXHRcdFx0dmFyIGlzQWxsU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0aWYgKCRXaWRnZXRJZGVudGlmaWVyWzBdLm9wdGlvbnMubGVuZ3RoID09PSAkV2lkZ2V0SWRlbnRpZmllclswXS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0aXNBbGxTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChXaWRnZXRJZCAhPSAnJykge1xyXG5cdFx0XHRcdG9wdGlvbiA9IG5ldyBPcHRpb24oJ1NlbGVjdCBBbGwnLCAnQWxsJywgdHJ1ZSwgaXNBbGxTZWxlY3RlZCk7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIucHJlcGVuZChvcHRpb24pO1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpLmFkZENsYXNzKCdTZWxlY3RlZEFsbCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY2xvc2VPblNlbGVjdCA9IGZhbHNlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0h0bWwgPSBmYWxzZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKEhhc1NlYXJjaCA9PT0gJ1RydWUnKSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gJC5mbi5zZWxlY3QyLmFtZC5yZXF1aXJlKCdTZWFyY2hMaWtlU2luZ2xlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnTXVsdGlwbGVTZWxlY3QnO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ011bHRpcGxlU2VsZWN0JztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGVtcGxhdGVTZWxlY3Rpb24gPSBmb3JtYXRSZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnNicpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBIdG1sT3B0aW9uc1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cdFx0XHR2YXIgZGF0YUh0bWxPcHRpb24gPSBbXTtcclxuXHRcdFx0JFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRcdHZhciBvcHRpb25PYmplY3QgPSB7XHJcblx0XHRcdFx0XHRpZDogJCh0aGlzKS52YWwoKSxcclxuXHRcdFx0XHRcdHRleHQ6ICQodGhpcykudGV4dCgpLFxyXG5cdFx0XHRcdFx0aHRtbDogJCh0aGlzKS50ZXh0KCksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRkYXRhSHRtbE9wdGlvbi5wdXNoKG9wdGlvbk9iamVjdCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnY3VzdG9tU2VsZWN0JztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdkcm9wZG93bkN1c3RvbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRhdGEgPSBkYXRhSHRtbE9wdGlvbjtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZXNjYXBlTWFya3VwID0gZnVuY3Rpb24gKG1hcmt1cCkge1xyXG5cdFx0XHRcdHJldHVybiBtYXJrdXA7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoU2VsZWN0ZWRWYWx1ZSAhPSAnJykge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChTZWxlY3RlZFZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMScpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBUYWdDdXN0b21cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3RhZ0N1c3RvbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAndGFnQ3VzdG9tJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuVG9rZW5TZXBhcmF0b3MgPSBbJywnLCAnICddO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jcmVhdGVTZWFyY2hDaG9pY2UgPSBmdW5jdGlvbiAodGVybSwgZGF0YSkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCQoZGF0YSkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMudGV4dC5sb2NhbGVDb21wYXJlKHRlcm0pID09PSAwO1xyXG5cdFx0XHRcdFx0fSkubGVuZ3RoID09PSAwXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRpZDogdGVybSxcclxuXHRcdFx0XHRcdFx0dGV4dDogdGVybSxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzUnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgVGFnTXVsdGlwbGVcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3RhZ1N5c3RlbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAndGFnU3lzdGVtJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY3JlYXRlVGFnID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG5cdFx0XHRcdHZhciB0ZXJtID0gJC50cmltKHBhcmFtcy50ZXJtKTtcclxuXHRcdFx0XHRpZiAodGVybSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0aWQ6ICcjJyArIHRlcm0sXHJcblx0XHRcdFx0XHR0ZXh0OiB0ZXJtLFxyXG5cdFx0XHRcdFx0bmV3VGFnOiB0cnVlLCAvLyBhZGQgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoSGFzU2VhcmNoID09PSAnRmFsc2UnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE9uVW5TZWxlY3RpbmdKUyAhPSAnJyB8fCBPblNlbGVjdGluZ0pTICE9ICcnKSB7XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyXHJcblx0XHRcdFx0LnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuZGF0YSgndW5zZWxlY3RpbmcnLCB0cnVlKTtcclxuXHRcdFx0XHRcdE9uVW5TZWxlY3RpbmdKUztcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignc2VsZWN0OnNlbGVjdGluZycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRPblNlbGVjdGluZ0pTO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6b3BlbmluZycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5kYXRhKCd1bnNlbGVjdGluZycpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlRGF0YSgndW5zZWxlY3RpbmcnKTtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6b3BlbicsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3QyOmNsb3NlJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICcyJykge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdHZhciBpZHdpZGdldCA9ICcjJyArIFdpZGdldElkO1xyXG5cclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0VW5zZWxlY3RlZElkID0gZS5wYXJhbXMuZGF0YS5pZDtcclxuXHRcdFx0XHRcdGlmIChVbnNlbGVjdGVkSWQgPT09ICdBbGwnKSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZEl0ZW1zID0gW107XHJcblx0XHRcdFx0XHRcdHZhciBhbGxPcHRpb25zID0gJChpZHdpZGdldCArICcgb3B0aW9uJyk7XHJcblx0XHRcdFx0XHRcdGFsbE9wdGlvbnMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRJdGVtcy5wdXNoKCQodGhpcykudmFsKCkpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MignZGVzdHJveScpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoc2VsZWN0ZWRJdGVtcykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdvcGVuJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHR2YXIgdG90YWxPcHRpb25zID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uJykubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID09PSB0b3RhbE9wdGlvbnMgLSAxICYmICQoaWR3aWRnZXQgKyAnID4gIG9wdGlvbjpzZWxlY3RlZDpmaXJzdC1jaGlsZCcpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZEl0ZW1zID0gW107XHJcblx0XHRcdFx0XHRcdFx0dmFyIGFsbE9wdGlvbnMgPSAkKGlkd2lkZ2V0ICsgJyBvcHRpb24nKTtcclxuXHRcdFx0XHRcdFx0XHRhbGxPcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRJdGVtcy5wdXNoKCQodGhpcykudmFsKCkpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoc2VsZWN0ZWRJdGVtcykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFVuc2VsZWN0ZWRJZCA9IGUucGFyYW1zLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRpZiAoVW5zZWxlY3RlZElkID09PSAnQWxsJykge1xyXG5cdFx0XHRcdFx0XHQkKGlkd2lkZ2V0ICsgJyA+IG9wdGlvbicpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldClcclxuXHRcdFx0XHRcdFx0XHQudmFsKCcnKVxyXG5cdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0Ly8kKGlkd2lkZ2V0ICsnID4gb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCBcInNlbGVjdGVkXCIpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldCArICcgPiBvcHRpb246Zmlyc3QtY2hpbGQnKS5yZW1vdmVBdHRyKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn07IiwiLyogQ29tcG9uZW50IFNoaWZ0Q29udGFpbmVyICovXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xuXG5cdGxldCBzaGlmdFRpbWVsaW5lUmVzaXplVGltZXI7XG5cdGxldCAkc2hpZnRDb250YWluZXJJZCA9ICQoKTtcblxuXHRjb25zdCBjcmVhdGUgPSBzaGlmdENvbnRhaW5lcklkID0+IHtcblxuXHRcdC8vICQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdCRzaGlmdENvbnRhaW5lcklkID0gJChzaGlmdENvbnRhaW5lcklkKTtcblxuXHRcdGhhc1Njcm9sbEJhcigpO1xuXHRcdGhhbmRsZVNoaWZ0VGFibGUoKTtcblxuXHRcdC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdC8vIFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdFx0Ly8gXHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0Ly8gfSwgMTUwMCk7XG5cblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX19hcnJvdycpLm9mZignbW91c2Vkb3duJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZWRyYXdTaGlmdFRpbWVsaW5lKCk7XG5cdFx0XHR9LCAxNTAwKTtcblx0XHR9KTtcblxuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZVNoaWZ0VGFibGUgPSAoKSA9PiB7XG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuXHRcdFx0dmFyICRlbEZsYWcgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5GbGFnTGluZScpO1xuXHRcdFx0dmFyICRlbEZsYWdUaW1lID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuRmxhZ0xpbmVfdGltZScpO1xuXHRcdFx0dmFyICRjb2x1bW5GbGFnID0gJGVsRmxhZy5kYXRhKCdjb2x1bW4nKTtcblx0XHRcdHZhciAkbWludXRlc0ZsYWcgPSAkZWxGbGFnLmRhdGEoJ21pbnV0ZXMnKTtcblx0XHRcdHZhciAkc2xvdHMgPSAkKHRoaXMpLmNsb3Nlc3QoJy5TaGlmdENvbnRhaW5lcicpLmZpbmQoJy5TaGlmdENvbnRhaW5lcl9oZWFkZXInKS5maW5kKCcuU2hpZnRDZWxsQ29udGVudCcpO1xuXHRcdFx0dmFyICRzbG90V2lkdGggPSBNYXRoLnJvdW5kKCRzbG90cy5lcSgwKS53aWR0aCgpKTtcblx0XHRcdHZhciBtaW51dGVzUG9zaXRpb24gPSAoJG1pbnV0ZXNGbGFnICogJHNsb3RXaWR0aCkgLyA2MDtcblxuXHRcdFx0Ly8gaGFuZGxlIGN1cnJlbnQgdGltZSBmbG9nIGhvcml6b250YWwgcG9zaXRpb25pbmdcblx0XHRcdHZhciBzbG90c1Bvc2l0aW9uID0gW107XG5cdFx0XHQkc2xvdHMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG5cdFx0XHRcdHNsb3RzUG9zaXRpb24ucHVzaCgkKHRoaXMpLnBvc2l0aW9uKCkubGVmdCk7XG5cdFx0XHR9KTtcblx0XHRcdCRlbEZsYWcuY3NzKCdsZWZ0Jywgc2xvdHNQb3NpdGlvblskY29sdW1uRmxhZyAtIDFdICsgbWludXRlc1Bvc2l0aW9uKTtcblx0XHRcdCRlbEZsYWcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0XHRpZiAoJGNvbHVtbkZsYWcgPT09ICRzbG90cy5sZW5ndGgpIHtcblx0XHRcdFx0JGVsRmxhZ1RpbWUuY3NzKHtcblx0XHRcdFx0XHRyaWdodDogJzFweCcsXG5cdFx0XHRcdFx0bGVmdDogJ2F1dG8nLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaGFuZGxlIGNlbGxzIHRoYXQgbWlnaHQgc3BhbiBvdmVyIHNldmVyYWwgc2xvdHNcblx0XHRcdCQodGhpcykuZmluZCgnLlNoaWZ0Q2FyZCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbFJvdykge1xuXHRcdFx0XHR2YXIgcm93SGFzU3Bhbm5lZENlbGwgPSBmYWxzZTtcblx0XHRcdFx0JChlbFJvdykuZmluZCgnLlNoaWZ0Q2VsbENvbnRlbnQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxDZWxsKSB7XG5cdFx0XHRcdFx0dmFyIGNvbHNwYW4gPSAkKGVsQ2VsbCkuZGF0YSgnY29sc3BhbicpO1xuXHRcdFx0XHRcdGlmIChjb2xzcGFuID09PSBzbG90c1Bvc2l0aW9uLmxlbmd0aCB8fCByb3dIYXNTcGFubmVkQ2VsbCkge1xuXHRcdFx0XHRcdFx0JChlbENlbGwpLmNzcyh7XG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdFx0XHRcdFx0XHRmbGV4OiAnMSAxIGF1dG8nLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjb2xzcGFuID4gMSkge1xuXHRcdFx0XHRcdFx0cm93SGFzU3Bhbm5lZENlbGwgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JChlbENlbGwpLmNzcyh7XG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdFx0XHRcdFx0XHRmbGV4OiAnbm9uZScsXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiArKHNsb3RzUG9zaXRpb25bY29sc3Bhbl0gLSBzbG90c1Bvc2l0aW9uWzBdKSArICdweCcsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGhhbmRsZSBob3Jpem9udGFsIHNjcm9sbCBiZWhhdmlvclxuXHRcdFx0aWYgKGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGgpIHtcblx0XHRcdFx0JChlbCkud2lkdGgoZWwuc2Nyb2xsV2lkdGgpO1xuXHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5TaGlmdENvbnRhaW5lcicpLmZpbmQoJy5TaGlmdENvbnRhaW5lcl9oZWFkZXInKS53aWR0aChlbC5zY3JvbGxXaWR0aCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKGVsKS53aWR0aCgnYXV0bycpO1xuXHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5TaGlmdENvbnRhaW5lcicpLmZpbmQoJy5TaGlmdENvbnRhaW5lcl9oZWFkZXInKS53aWR0aCgnYXV0bycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IGhhc1Njcm9sbEJhciA9ICgpID0+IHtcblx0XHR2YXIgJFNjcm9sbGFibGVEaXYgPSAkc2hpZnRDb250YWluZXJJZC5maW5kKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpO1xuXHRcdGlmICgkc2hpZnRDb250YWluZXJJZC5maW5kKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLmxlbmd0aCA+IDApIHtcblx0XHRcdGlmICgkU2Nyb2xsYWJsZURpdi5nZXQoMCkuc2Nyb2xsSGVpZ2h0ID4gJFNjcm9sbGFibGVEaXYuaGVpZ2h0KCkpIHtcblx0XHRcdFx0dmFyICRsYXN0Q2VsbCA9ICRzaGlmdENvbnRhaW5lcklkLmZpbmQoJy5Jc1RpbWVyOmxhc3QtY2hpbGQnKTtcblx0XHRcdFx0JGxhc3RDZWxsLmNzcygncGFkZGluZy1yaWdodCcsICc3cHgnKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0Y29uc3QgcmVkcmF3U2hpZnRUaW1lbGluZSA9ICgpID0+IHtcblx0XHRjbGVhclRpbWVvdXQoc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyKTtcblx0XHRzaGlmdFRpbWVsaW5lUmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdGhhc1Njcm9sbEJhcigpO1xuXHRcdFx0aGFuZGxlU2hpZnRUYWJsZSgpO1xuXHRcdH0sIDQwMCk7XG5cdH07XG5cblx0Y29uc3QgY2hlY2tTY3JvbGwgPSAoKSA9PiB7XG5cdFx0dmFyIGhDb250ZW50ID0gJCgnLkNvbnRlbnQnKS5oZWlnaHQoKTtcblx0XHR2YXIgaFdpbmRvdyA9ICQod2luZG93KS5oZWlnaHQoKTtcblxuXHRcdGlmIChoQ29udGVudCA+IGhXaW5kb3cpIHJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIgPSB7XG5cdFx0Y3JlYXRlLFxuXHRcdGNoZWNrU2Nyb2xsLFxuXHRcdHJlZHJhd1NoaWZ0VGltZWxpbmVcblx0fTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcblxuXG4kKHdpbmRvdykub2ZmKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknKS5vbigncmVzaXplLkdlbmVyaWNHYWxsZXJ5JywgZnVuY3Rpb24gKCkge1xuXG5cdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblxuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5yZWRyYXdTaGlmdFRpbWVsaW5lKTtcblxuXHRzZXRUaW1lb3V0KFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5jaGVja1Njcm9sbCwgMTAwMCk7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdH0sIDE1MDApO1xuXG59KTtcblxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xuXHRpZiAoISEkKCcuU2hpZnRDb250YWluZXInKS5sZW5ndGgpIHtcblxuXHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblx0XHR9LCA0MDApO1xuXG5cdFx0c2V0VGltZW91dChTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIuY2hlY2tTY3JvbGwsIDUwMCk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0fSwgNjAwKTtcblxuXHRcdCQoJy5uYXZpZ2F0aW9uLWNvbnRyb2wtaXRlbScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHR9KTtcblxuXHRcdC8vVmVyaWZ5IHRoZSBzY3JvbGwgaWYgdG9vbHRpcCBvcGVuZWRcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoJCgnLnRvb2x0aXBzdGVyLWJhc2UnKS5pcygnOnZpc2libGUnKSkge1xuXHRcdFx0XHQkKCcudG9vbHRpcHN0ZXItYmFzZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblx0XHRcdH0sIDQwMCk7XG5cblx0XHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdFx0XHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdFx0fSwgNjAwKTtcblxuXHRcdFx0Ly8gU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmU7XG5cblx0XHR9KTtcblxuXHR9XG59KTsiLCIvKiBDb21wb25lbnQgSVNpZGViYXIgKi9cbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2lkZWJhcihjb25maWcpO1xuXHRcdFNhcHBoaXJlV2lkZ2V0cy5TaWRlYmFyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xuXHR9O1xuXG5cdHZhciBjbG9zZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNpZGViYXIud2lkZ2V0SWRdLmNsb3NlKCk7XG5cdH07XG5cblx0dmFyIFNpZGViYXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHR0aGlzLmlzRXhwYW5kYWJsZSA9IGNvbmZpZy5pc0V4cGFuZGFibGU7XG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xuXHRcdHRoaXMuJHNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyJyk7XG5cdFx0dGhpcy4kc2lkZWJhck1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLW1lbnUnKTtcblx0XHR0aGlzLiRzaWRlYmFyTWVudUl0ZW0gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNpZGViYXJNZW51SXRlbScpO1xuXHRcdHRoaXMuJHNpZGViYXJTaGllbGQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLXNoaWVsZCcpO1xuXHRcdHRoaXMuJHNpZGViYXJDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JU2lkZWJhci1jb250ZW50Jyk7XG5cdFx0dGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnPiBkaXYnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdQSCcpICYmICQodGhpcykudGV4dCgpID09PSAnJykge1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XG5cdFx0aWYgKCF0aGlzLmlzRXhwYW5kYWJsZSkge1xuXHRcdFx0dGhpcy5vcGVuTWVudUl0ZW0oMCk7XG5cdFx0fVxuXHRcdCQoZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LnBhcmVudC4kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XG5cdFx0XHRpZiAoIXRoaXMuaXNFeHBhbmRhYmxlKSB7XG5cdFx0XHRcdCQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdOnZpc2libGUnKS5lcSgwKS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdCQod2luZG93KS51bmxvYWQoZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LnBhcmVudC4kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2lkZWJhci5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dGhpcy4kc2lkZWJhck1lbnUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0aWYgKCFfdGhpcy4kc2lkZWJhci5oYXNDbGFzcygnb3BlbicpKSB7XG5cdFx0XHRcdF90aGlzLm9wZW5NZW51SXRlbSgwKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLiRzaWRlYmFyTWVudUl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHNlbGVjdGVkUG9zaXRpb24gPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRfdGhpcy5vcGVuTWVudUl0ZW0oc2VsZWN0ZWRQb3NpdGlvbik7XG5cdFx0fSk7XG5cdFx0dGhpcy4kc2lkZWJhclNoaWVsZC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfdGhpcy5jbG9zZSgpO1xuXHRcdH0pO1xuXHRcdHRoaXMuJHNpZGViYXIub24oJ2NsaWNrJywgJy5TZWFyY2hTaWRlQmFyRmllbGRzIC5CdXR0b25Hcm91cF9idXR0b246Zmlyc3QtY2hpbGQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfdGhpcy4kc2lkZWJhclxuXHRcdFx0XHQuZmluZCgnLkZpZWxkc1NsaWRlcicpXG5cdFx0XHRcdC5hZGRDbGFzcygnVGFiMScpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnVGFiMicpO1xuXHRcdFx0X3RoaXMuc2V0RmllbGRGb2N1cyhfdGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnLlRleHRJbnB1dDp2aXNpYmxlJykuZXEoMCkpO1xuXHRcdH0pO1xuXHRcdHRoaXMuJHNpZGViYXIub24oJ2NsaWNrJywgJy5TZWFyY2hTaWRlQmFyRmllbGRzIC5CdXR0b25Hcm91cF9idXR0b246bGFzdC1jaGlsZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdF90aGlzLiRzaWRlYmFyXG5cdFx0XHRcdC5maW5kKCcuRmllbGRzU2xpZGVyJylcblx0XHRcdFx0LmFkZENsYXNzKCdUYWIyJylcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdUYWIxJyk7XG5cdFx0XHRfdGhpcy5zZXRGaWVsZEZvY3VzKF90aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2lkZWJhci5wcm90b3R5cGUub3Blbk1lbnVJdGVtID0gZnVuY3Rpb24gKHNlbGVjdGVkUG9zaXRpb24pIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMuJHNpZGViYXJcblx0XHRcdC5maW5kKCcuU2lkZWJhck1lbnVJdGVtJylcblx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblx0XHRcdC5lcShzZWxlY3RlZFBvc2l0aW9uKVxuXHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRzaWRlYmFyXG5cdFx0XHQuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQgPiAuSVNpZGViYXItY29udGVudC1wYW5lbCcpXG5cdFx0XHQuaGlkZSgpXG5cdFx0XHQuZXEoc2VsZWN0ZWRQb3NpdGlvbilcblx0XHRcdC5zaG93KCk7XG5cdFx0dGhpcy4kc2lkZWJhci5hZGRDbGFzcygnb3BlbicpO1xuXHRcdGlmICh3aW5kb3cucGFyZW50Lmxlbmd0aCAmJiB0aGlzLmlzRXhwYW5kYWJsZSkge1xuXHRcdFx0d2luZG93LnBhcmVudC5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5vcGVuU2lkZWJhcklmcmFtZSgwKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuc2V0RmllbGRGb2N1cyh0aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XG5cdFx0fVxuXHR9O1xuXG5cdFNpZGViYXIucHJvdG90eXBlLnNldEZpZWxkRm9jdXMgPSBmdW5jdGlvbiAoJGlucHV0KSB7XG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0JGlucHV0LmNsaWNrKCkuc2VsZWN0KCk7XG5cdFx0fSwgMjUwKTtcblx0fTtcblxuXHRTaWRlYmFyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdGlmICh3aW5kb3cucGFyZW50Lmxlbmd0aCkge1xuXHRcdFx0d2luZG93LnBhcmVudC5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5jbG9zZVNpZGViYXJJZnJhbWUoMCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmlzRXhwYW5kYWJsZSkge1xuXHRcdFx0dGhpcy4kc2lkZWJhci5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdFx0dGhpcy4kc2lkZWJhci5maW5kKCcuU2lkZWJhck1lbnVJdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0dGhpcy4kc2lkZWJhci5maW5kKCcuSVNpZGViYXItY29udGVudCA+IC5JU2lkZWJhci1jb250ZW50LXBhbmVsJykuaGlkZSgpO1xuXHRcdH1cblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuU2lkZWJhciA9IHtcblx0XHRjcmVhdGU6IGNyZWF0ZSxcblx0XHRjbG9zZTogY2xvc2UsXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IFNwaW5uZXJIb3Jpem9udGFsICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TcGlubmVySG9yaXpvbnRhbCA9IHtcclxuXHRpbmNyZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHR2YXIgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZCkuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLmZpcnN0KCk7XHJcblx0XHRpZiAoX2VsZW1lbnQudmFsKCkgPT0gdW5kZWZpbmVkIHx8IF9lbGVtZW50LnZhbCgpID09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpKSkge1xyXG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xyXG5cdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA8IG1heFZhbHVlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudmFsKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpICsgMSk7XHJcblx0XHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoZWxlbWVudElkKS5maW5kKCdhLk1pbnVzJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPj0gbWF4VmFsdWUpIHtcclxuXHRcdFx0XHQkKGVsZW1lbnRJZCkuZmluZCgnYS5QbHVzJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGVjcmVtZW50OiBmdW5jdGlvbiAoZWxlbWVudElkLCBtaW5WYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHR2YXIgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZClcclxuXHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKVxyXG5cdFx0XHQuZmlyc3QoKTtcclxuXHRcdGlmIChfZWxlbWVudC52YWwoKSA9PSB1bmRlZmluZWQgfHwgX2VsZW1lbnQudmFsKCkgPT0gJycgfHwgaXNOYU4ocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkpKSB7XHJcblx0XHRcdF9lbGVtZW50LnZhbChtaW5WYWx1ZSk7XHJcblx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpID4gbWluVmFsdWUpIHtcclxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgLSAxKTtcclxuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5QbHVzJylcclxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA8PSBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuTWludXMnKVxyXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG59OyIsIi8qIENvbXBvbmVudCBTcGlubmVyVmVydGljYWwgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgTWluVmFsdWUgPSAnICsgTWluVmFsdWUgKyAnO1xuXG5cdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9IC5TcGlubmVySW5wdXRWZXJ0aWNhbCBpbnB1dGApLm9uKCdibHVyIGtleXVwIGlucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBDdXJyZW50SW5wdXRWYWx1ZSA9ICQoYCMke2NvbmZpZy53aWRnZXRJRH0gLlNwaW5uZXJJbnB1dFZlcnRpY2FsIGlucHV0YCkudmFsKCk7XG5cblx0XHRcdFx0aWYgKEN1cnJlbnRJbnB1dFZhbHVlIDwgTWluVmFsdWUpIHtcblx0XHRcdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9YClcblx0XHRcdFx0XHRcdC5maW5kKCcuTWludXNWZXJ0aWNhbCcpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQoYCMke2NvbmZpZy53aWRnZXRJRH1gKVxuXHRcdFx0XHRcdFx0LmZpbmQoJy5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoJChgIyR7Y29uZmlnLndpZGdldElEfSAuU3Bpbm5lcklucHV0VmVydGljYWwgaW5wdXRgKS52YWwoKSA8PSBNaW5WYWx1ZSkge1xuXHRcdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9YClcblx0XHRcdFx0XHQuZmluZCgnLk1pbnVzVmVydGljYWwnKVxuXHRcdFx0XHRcdC5hZGRDbGFzcygnRGlzYWJsZWRTcGluJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb25maWcuaXNDdXJzb3JPbkZvY3VzKSB7XG5cdFx0XHRcdCQoJ2JvZHknKS5vbignZm9jdXMnLCBgIyR7Y29uZmlnLmlucHV0SUR9IGlucHV0YCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHRoYXQuc2VsZWN0aW9uU3RhcnQgPSB0aGF0LnNlbGVjdGlvbkVuZCA9IDEwMDAwMDtcblx0XHRcdFx0XHR9LCAzMDApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBpbmNyZW1lbnQgPSAoZWxlbWVudElkLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpID0+IHtcblx0XHRsZXQgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZClcblx0XHRcdC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXG5cdFx0XHQuZmlyc3QoKTtcblx0XHR2YXIgZm9yY2VJbnRlZ2VyID0gJChlbGVtZW50SWQpLmRhdGEoJ2ZvcmNlaW50ZWdlcicpID09PSAnVHJ1ZScgPyB0cnVlIDogZmFsc2U7XG5cdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpO1xuXHRcdHZhciBpbmNyZW1lbnRVbml0ID0gMTtcblx0XHR2YXIgaXNEZWNpbWFscyA9IGN1cnJlbnRWYWx1ZSAlIDEgIT0gMDtcblxuXHRcdCQoZWxlbWVudElkKVxuXHRcdFx0LmZpbmQoJy5NaW51c1ZlcnRpY2FsJylcblx0XHRcdC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XG5cblx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpIDwgbWluVmFsdWUpIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0LmFkZENsYXNzKCdEaXNhYmxlZFNwaW4nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JChlbGVtZW50SWQpXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xuXHRcdH1cblxuXHRcdGlmICghZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRpZiAoaXNEZWNpbWFscykge1xuXHRcdFx0XHRpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQgfHwgY3VycmVudFZhbHVlID09PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkpKSB7XG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0cmlnZ2VyT25JbnB1dCkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpIDwgbWF4VmFsdWUpIHtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMCAmJiAhZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRcdFx0aW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlICsgaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRyaWdnZXJPbklucHV0KSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignaW5wdXQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKGVsZW1lbnRJZClcblx0XHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHRcdC5maW5kKCdhLlBsdXNWZXJ0aWNhbCcpXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2hlY2tTcGlubmVyVmVydGljYWxEaXNhYmxlZFN0YXR1cyhlbGVtZW50SWQsIHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuXHR9O1xuXG5cdGNvbnN0IGRlY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCkgPT4ge1xuXHRcdHZhciBfZWxlbWVudCA9ICQoZWxlbWVudElkKVxuXHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJylcblx0XHRcdC5maXJzdCgpO1xuXHRcdHZhciBmb3JjZUludGVnZXIgPSAkKGVsZW1lbnRJZCkuZGF0YSgnZm9yY2VpbnRlZ2VyJykgPT09ICdUcnVlJyA/IHRydWUgOiBmYWxzZTtcblx0XHR2YXIgY3VycmVudFZhbHVlID0gcGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSk7XG5cdFx0dmFyIGluY3JlbWVudFVuaXQgPSAxO1xuXHRcdHZhciBpc0RlY2ltYWxzID0gY3VycmVudFZhbHVlICUgMSAhPSAwO1xuXHRcdGlmICghZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRpZiAoaXNEZWNpbWFscykge1xuXHRcdFx0XHRpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQgfHwgY3VycmVudFZhbHVlID09PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkpKSB7XG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0cmlnZ2VyT25JbnB1dCkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpID4gbWluVmFsdWUpIHtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMSAmJiAhZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRcdFx0aW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlIC0gaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRyaWdnZXJPbklucHV0KSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignaW5wdXQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKGVsZW1lbnRJZClcblx0XHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JChlbGVtZW50SWQpXG5cdFx0XHRcdFx0LmZpbmQoJ2EuTWludXNWZXJ0aWNhbCcpXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2hlY2tTcGlubmVyVmVydGljYWxEaXNhYmxlZFN0YXR1cyhlbGVtZW50SWQsIHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuXHR9O1xuXG5cdGNvbnN0IGNoZWNrU3Bpbm5lclZlcnRpY2FsRGlzYWJsZWRTdGF0dXMgPSAoZWxlbWVudElkLCB2YWx1ZVRvQ2hlY2ssIG1pblZhbHVlLCBtYXhWYWx1ZSkgPT4ge1xuXHRcdGlmICh2YWx1ZVRvQ2hlY2sgPD0gbWluVmFsdWUpIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0fVxuXHRcdGlmICh2YWx1ZVRvQ2hlY2sgPj0gbWF4VmFsdWUpIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxuXHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JChlbGVtZW50SWQpXG5cdFx0XHRcdC5maW5kKCdhLlBsdXNWZXJ0aWNhbCcpXG5cdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdH1cblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuU3Bpbm5lclZlcnRpY2FsID0ge1xuXHRcdGNyZWF0ZSxcblx0XHRpbmNyZW1lbnQsXG5cdFx0ZGVjcmVtZW50LFxuXHR9O1xufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xuIiwiLyogQ29tcG9uZW50IFNwbGl0QnV0dG9uICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTcGxpdEJ1dHRvbihjb25maWcpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTcGxpdEJ1dHRvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRidXR0b24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWJ1dHRvbicpO1xyXG5cdFx0dGhpcy4kYnV0dG9uTGluayA9IHRoaXMuJGJ1dHRvbi5maW5kKCc+IGEnKTtcclxuXHRcdHRoaXMuJHRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLXRyaWdnZXInKTtcclxuXHRcdHRoaXMuJGFjdGlvbnMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWFjdGlvbnMnKTtcclxuXHRcdGlmICghIXRoaXMuJGFjdGlvbnMudGV4dCgpKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCc+IC5TcGxpdEJ1dHRvbicpLmFkZENsYXNzKCdoYXNUcmlnZ2VyJyk7XHJcblx0XHRcdHRoaXMuYnVpbGRBY3Rpb25zVHJpZ2dlcigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNwbGl0QnV0dG9uLnByb3RvdHlwZS5idWlsZEFjdGlvbnNUcmlnZ2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGNsYXNzTGlzdCA9IHRoaXMuJGJ1dHRvbkxpbmtbMF0uY2xhc3NMaXN0LnZhbHVlO1xyXG5cdFx0dGhpcy4kdHJpZ2dlci5hZGRDbGFzcyhjbGFzc0xpc3QpO1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gaW5zaWRlIGEgZG9jdW1lbnQgcmVhZHkgZHVlIHRvIHNhcHBoaXJlIHBvcHVwIGJpbmRlZCBldmVudHNcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coX3RoaXMuY29uZmlnLndpZGdldElkLCBfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKTtcclxuXHRcdFx0aWYgKCFfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKSB7XHJcblx0XHRcdFx0X3RoaXMuJHRyaWdnZXIudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0YXJyb3c6IHRydWUsXHJcblx0XHRcdFx0XHRjb250ZW50OiAkKCc8c2VjdGlvbi8+JykuYXBwZW5kKF90aGlzLiRhY3Rpb25zLmNsb25lKHRydWUpKSxcclxuXHRcdFx0XHRcdHRyaWdnZXI6IF90aGlzLmNvbmZpZy50cmlnZ2VyRXZlbnQsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogX3RoaXMuY29uZmlnLnBvc2l0aW9uLFxyXG5cdFx0XHRcdFx0bWF4V2lkdGg6IF90aGlzLmNvbmZpZy5tYXhXaWR0aCxcclxuXHRcdFx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItc3BsaXRidXR0b24gUGFkZGluZy0nICsgX3RoaXMuY29uZmlnLnBhZGRpbmcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0X3RoaXMuJGFjdGlvbnMucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TcGxpdEJ1dHRvbiA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwidmFyIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG52YXIgc3RvcHRpbWVyID0gdHJ1ZTtcclxudmFyIG15VGltb3V0ICA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBvbktleWRvd25GdW5jdGlvbigpIHtcclxuICAgIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG4gIFxyXG4gICAgc3RvcHRpbWVyPXRydWU7XHJcbiAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgIG15VGltb3V0ID0gbnVsbDtcclxuICB9O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIG9uS2V5VXBGdW5jdGlvbihlbGVtZW50VG9DbGljaykge1xyXG4gIHN0b3B0aW1lciA9IGZhbHNlO1xyXG4gIFxyXG4gIGlmKG1pbGlzZWNvbmRwYXNzZWQgPT0gMCAmJiBteVRpbW91dD09bnVsbCl7XHJcbiAgICAgIG15VGltb3V0ID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBtaWxpc2Vjb25kcGFzc2VkKz0xMDA7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKG1pbGlzZWNvbmRwYXNzZWQgPj0gNDAwICYmIHN0b3B0aW1lcj09ZmFsc2UpIHtcclxuICAgICAgICAgICAgbWlsaXNlY29uZHBhc3NlZCA9IDA7XHJcbiAgICAgICAgICAgIHN0b3B0aW1lcj10cnVlO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3RvcHRpbWVyPT10cnVlKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteVRpbW91dCk7XHJcbiAgICAgICAgICAgIG15VGltb3V0ID0gbnVsbDtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5pZih0eXBlb2Yoc3NkQ29tcG9uZW50KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICBzc2RDb21wb25lbnQgPSB7XHJcbiAgICAgICAgbGVuZ3RoOiAwLFxyXG4gICAgICAgIG51bWJlck9mQWN0aXZlOiAwLFxyXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgdG9EZXN0cm95OiBmYWxzZSxcclxuICAgICAgICBvbkJsdXJEZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNzZENvbXBvbmVudC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSAkKCcjJyArIHNzZENvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3dyYXBwZXIgPSAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3NkQ29tcG9uZW50LnRvRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLmZpbmQoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhLnRvLWRlc3Ryb3knKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ1tkYXRhLXNzZC1wbGFjZWhvbGRlcj0nICsgc3NkQ29tcG9uZW50LmlkICsgJ10nKTtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudFdpZGdldCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudFdpZGdldCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5jaGlsZHJlbignZGl2LlNTRC1XcmFwcGVyOm5vdCguU2VsZWN0ZWQpJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vSWYgdGhpcyBTU0QtV3JhcHBlciBpcyBhbHJlYWR5IFNlbGVjdGVkLCByZXR1cm4uXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuYmx1cigpOyAvL0JsdXJzIHRoZSBvdGhlciBmb2N1c2VkIFNTRCdzLlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKys7XHJcbiAgICAgICAgICAgIGlmKCFfc3NkQ29tcG9uZW50V2lkZ2V0LnBhcmVudCgpLmhhc0NsYXNzKCdTU0RQb3B1cCcpKXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzc2RDb21wb25lbnQuaXNSVEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgLSAkKHRoaXMpLm91dGVyV2lkdGgoKSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuU1NELUJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuU1NELUxpc3QnKS5hdHRyKCdjdXJyZW50LWZvY3VzJywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLlNTRC1MaXN0JykuYXR0cignY3VycmVudC1mb2N1cycsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5wYXJlbnQoKS5oYXNDbGFzcygnU1NEUG9wdXAnKSl7XHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50V2lkZ2V0LmNsb3Nlc3QoJ2Zvcm0nKS5hcHBlbmQoX3NzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5hZGRDbGFzcygnUG9zaXRpb25lZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBibHVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoIXNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5Qb3NpdGlvbmVkLlNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfd3JhcHBlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQoJyMnICsgJCh0aGlzKS5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3dyYXBwZXIucmVtb3ZlQ2xhc3MoJ1Bvc2l0aW9uZWQnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdTZWFyY2hpbmcgRml4ZWQgS2V5Ym9hcmROYXYnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQmFyJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuU1NELUJhcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJzQ2xlYXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUtLTtcclxuICAgICAgICAgICAgJChcIi5TU0RfTGlzdFJlY29yZHMgc3BhbiwgLlNTRF9MaXN0TGluZS5TaG93TW9yZSwgLlNTRF9EZWxldGVPbkJsdXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZighc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL0lmIHRoZXJlJ3Mgbm8gU1NEIGFjdGl2ZSwgdGhlcmUncyBubyBuZWVkIHRvIHJlc2l6ZSBpdC5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfc3NkV3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJCgnIycgKyBfc3NkV3JhcHBlci5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKVswXTtcclxuICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSBfc3NkV3JhcHBlci5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoX3NzZENvbXBvbmVudFdpZGdldCkud2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LyosXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5pc1JUTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpIC0gJChfc3NkQ29tcG9uZW50V2lkZ2V0KS5vdXRlcldpZHRoKCkgLSBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9KS5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5jbG9zZXN0KCcuU1NELUNvbXBvbmVudCcpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiU2VsZWN0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsIHNzZEJhciwgc2VsZWN0ZWRUYWIsIGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NlbGVjdGVkVGFiID0gJChzZWxlY3RlZFRhYik7XHJcblxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmZvY3VzKHNzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRUYWIuaXMoJy5TZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQudGFic0NsZWFyKHNzZEJhcik7XHJcbiAgICAgICAgICAgICAgICBfc2VsZWN0ZWRUYWIuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKHNzZEJhcixpc0lucHV0RXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXNTZWxlY3RlZFRhYjogZnVuY3Rpb24oc3NkQmFyLGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNlYXJjaCBpbnB1dD9cclxuICAgICAgICAgICAgaWYoc3NkQmFyLmNoaWxkcmVuKCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyLlNlbGVjdGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFRvQ2xpY2sgPSBzc2RCYXIuc2libGluZ3MoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhOm5vdCgudG8tZGVzdHJveSknKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaXNJbnB1dEV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBvbktleVVwRnVuY3Rpb24oZWxlbWVudFRvQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5JbnB1dFBsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdCg6Zm9jdXMpJykuZmlyc3QoKS5zZWxlY3QoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNob3J0IGxpc3Q/XHJcbiAgICAgICAgICAgIGlmKHNzZEJhci5jaGlsZHJlbignLlNob3J0TGlzdFNlbGVjdG9yLUNvbnRhaW5lci5TZWxlY3RlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5TaG9ydExpc3RTZWxlY3Rvci1Db250YWluZXIgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBNZXRob2QgYmVpbmcgY2FsbGVkIGJ5IHVzZXIgYWN0aW9uIGpzX3NzZENvbXBvbmVudF9mb2N1c0N1cnJlbnRSb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb2N1c0N1cnJlbnRSb3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcbiAgICAgICAgICAgIHZhciBfY3VycmVudEZvY3VzID0gX3NzZExpc3QuYXR0cignY3VycmVudC1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOm50aC1jaGlsZCgnICsgX2N1cnJlbnRGb2N1cyArICcpJykuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJzQ2xlYXI6IGZ1bmN0aW9uKHNzZEJhcikge1xyXG4gICAgICAgICAgICAkKHNzZEJhcikuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlYXJjaEljb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJTZWxlY3QoZXZlbnQuZGF0YS5zc2RDb21wb25lbnRXaWRnZXQsIGV2ZW50LmRhdGEuc3NkQmFyLCAkKGV2ZW50LmRhdGEuc3NkQmFyKS5jaGlsZHJlbignLlNlYXJjaElucHV0LUNvbnRhaW5lcicpLGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogQG5hbWUgaW5wdXRFdmVudFxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnB1dEV2ZW50OiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0Q29udGFpbmVyID0gJChldmVudC5kYXRhLmlucHV0KS5jbG9zZXN0KCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudGFiU2VsZWN0KGV2ZW50LmRhdGEuc3NkQ29tcG9uZW50V2lkZ2V0LCBldmVudC5kYXRhLnNzZEJhciwgX2lucHV0Q29udGFpbmVyLHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoJChldmVudC5kYXRhLmlucHV0KS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykucmVtb3ZlQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykuYWRkQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgb25LZXlkb3duRnVuY3Rpb24oKTsgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGtleWJvYXJkSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiU2hpZnRcIiB8fCBldmVudC5rZXkgPT0gXCJDb250cm9sXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJFbnRlclwiICYmIF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJUYWJcIikge1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmF0dHIoJ2N1cnJlbnQtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRFbGVtZW50ID0gJChudWxsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKF9jdXJyZW50Rm9jdXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpudGgtY2hpbGQoJyArIF9jdXJyZW50Rm9jdXMgKyAnKScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LmFkZENsYXNzKCdLZXlib2FyZE5hdicpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50LmlzKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpLnByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbicpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3NlbGVjdGVkRWxlbWVudC5pcygnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9ICQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NlbGVjdGVkRWxlbWVudC5yZW1vdmVDbGFzcygnZm9jdXMnKS5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCAmJiBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1CYXInKSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghX3NlbGVjdGVkRWxlbWVudC5maW5kKCcuU1NEX0xpc3RMaW5lLkRpc2FibGVkJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkTGlzdC5maW5kKCdhLk90aGVyQ29udHJvbExpbmsnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgX2N1cnJlbnRGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhfc3NkQ29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyS2V5Ym9hcmROYXZTdGF0dXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoc3NkQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgdmFyIF9zc2RMaXN0ID0gX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdLZXlib2FyZE5hdicpO1xyXG4gICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgMClcclxuICAgICAgICAgICAgICAgIC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW4uZm9jdXMnKS5yZW1vdmVDbGFzcygnZm9jdXMnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmJsdXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgPD0gMTAyNCl7XHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkgKyAncHgnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLypOb3QgTW9iaWxlIGFwcGx5IGZpeGVkIGJlaGF2aW91ciovXHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICgkKCcuVG9wUGF0aWVudEhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJCgnLkhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJChcIi50b29sYmFyLXdyYXBwZXJcIikub3V0ZXJIZWlnaHQoKSsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpICkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsKCQoJy5Ub3BQYXRpZW50SGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKCcuSGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKFwiLnRvb2xiYXItd3JhcHBlclwiKS5vdXRlckhlaWdodCgpICsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpKSArICdweCcpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIF9zc2RDb21wb25lbnQuYWRkQ2xhc3MoJ0ZpeGVkJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbihfaW5wdXRJZCkgeyAvKiBVc2VkIHRvIGRlc3Ryb3kgYSBzcGVjaWZpYyBzc2QgY29tcG9uZW50IGJ5IHJlY2VpdmUgdGhlIGlucHV0IGlkZW50aWZpZXIgYXMgcGFyYW1ldGVyIGFuZCBkZXRlcm1pbmUgdGhlIHdyYXBwZXIgdG8gcmVtb3ZlLiAqL1xyXG4gICAgICAgICAgICAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsX3RvRGVzdHJveSkge1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubGVuZ3RoKys7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5pc1JUTCA9ICQoJ2h0bWwnKS5pcygnLnJ0bCcpO1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudG9EZXN0cm95ID0gX3RvRGVzdHJveTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzc2RDb21wb25lbnRXaWRnZXQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5pZCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJChzc2RDb21wb25lbnRXaWRnZXQpO1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9IF9zc2RDb21wb25lbnRXaWRnZXQuZmluZCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RCYXIgPSBfc3NkQ29tcG9uZW50LmNoaWxkcmVuKCcuU1NELUJhcicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc2VhcmNoSWNvbiA9IF9zc2RCYXIuZmluZCgnLlNlYXJjaEljb24nKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0ID0gX3NzZEJhci5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfY2xlYXJDb250cm9sID0gX3NzZEJhci5maW5kKCcuQ2xlYXJDb250cm9sJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9zZWFyY2hJY29uLm9mZignY2xpY2snKS5vbignY2xpY2snLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXJcclxuICAgICAgICAgICAgfSwgc3NkQ29tcG9uZW50LnNlYXJjaEljb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3NzZEJhci5jaGlsZHJlbignZGl2Jykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudFdpZGdldDogX3NzZENvbXBvbmVudFdpZGdldCxcclxuICAgICAgICAgICAgICAgIHNzZEJhcjogX3NzZEJhclxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LnRhYlNlbGVjdChldmVudC5kYXRhLnNzZENvbXBvbmVudFdpZGdldCwgZXZlbnQuZGF0YS5zc2RCYXIsIHRoaXMsZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9jbGVhckNvbnRyb2wub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9pbnB1dC5vZmYoJ2tleXVwJykub24oJ2tleXVwJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50V2lkZ2V0OiBfc3NkQ29tcG9uZW50V2lkZ2V0LFxyXG4gICAgICAgICAgICAgICAgc3NkQmFyOiBfc3NkQmFyLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IF9pbnB1dFxyXG4gICAgICAgICAgICB9LCBzc2RDb21wb25lbnQuaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfaW5wdXQub2ZmKCdrZXlkb3duJykub24oJ2tleWRvd24nLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dDogX2lucHV0XHJcbiAgICAgICAgICAgIH0sIHNzZENvbXBvbmVudC5rZXlkb3duRXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChfc3NkQ29tcG9uZW50KS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50OiBfc3NkQ29tcG9uZW50XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhldmVudC5kYXRhLnNzZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgc3NkQ29tcG9uZW50LnJlc2l6ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5pcygnOnZpc2libGUnKSkgeyAvKiBDbGlja3Mgb24gaGlkZGVuIGVsZW1lbnRzIGFyZSBkaXNtaXNzZWQuICovXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGUgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighZS5sZW5ndGgpIHsgLy8gVXNlciBjbGlja2VkIG91dHNpZGUgdGhlIFNTRC1Db21wb25lbnQ/XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gXCIyN1wiKSB7IC8vIFVzZXIgaGl0IEVzY2FwZVxyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm9uQmx1ckRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7IC8vIElmIHRoZXJlJ3MgYW4gU1NEIGNvbXBvbmVudCBhY3RpdmUsIGdvIGZvciBLZXlib2FyZCBoYW5kbGVyXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5rZXlib2FyZEhhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlID4gMCkgeyAvLyBJZiB0aGVyZSdzIGFuIFNTRCBjb21wb25lbnQgYWN0aXZlLCBnbyBmb3Igc2Nyb2xsIGhhbmRsZXJcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LnNjcm9sbEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBTU0RMaXN0TGluZSAqL1xuU2FwcGhpcmVXaWRnZXRzLlNTRExpc3RMaW5lID0ge1xuXHR0b2dnbGU6IChsaW5lSWQsIGxpbmVIYW5kbGVyID0gJycpID0+IHtcblx0XHR2YXIgX2xpbmUgPSAkKGxpbmVJZCkuaXMoJy5TU0RfTGlzdExpbmUnKVxuXHRcdFx0PyAkKGxpbmVJZClcblx0XHRcdDogJChsaW5lSWQpXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuU1NEX0xpc3RMaW5lJylcblx0XHRcdFx0XHQuZmlyc3QoKTtcblxuXHRcdGlmICghX2xpbmUubGVuZ3RoKSByZXR1cm47XG5cblx0XHR2YXIgX2V4cGFuZENvbnRyb2wgPSAkKCcuZXhwYW5kLWNvbnRyb2wtY3VzdG9tLXdpZHRoJyk7XG5cblx0XHRpZiAoX2V4cGFuZENvbnRyb2wubGVuZ3RoICE9IDApIHtcblx0XHRcdF9leHBhbmRDb250cm9sLnJlbW92ZUNsYXNzKCdleHBhbmQtY29udHJvbC1jdXN0b20td2lkdGgnKTtcblx0XHRcdF9leHBhbmRDb250cm9sLmNzcygnd2lkdGgnLCAnJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFfbGluZS5pcygnLkFjdGl2ZScpKSB7XG5cdFx0XHR2YXIgX2xpbmVIZWFkZXIgPSBfbGluZVxuXHRcdFx0XHQuY2xvc2VzdCgnZGl2LlNlbGVjdGFibGVMaXN0LCAuU2VsZWN0YWJsZUxpc3QtTGlzdFJlY29yZHMnKVxuXHRcdFx0XHQuZmluZCgnZGl2LlNlbGVjdGFibGVMaXN0LUxpbmUuQWN0aXZlJylcblx0XHRcdFx0Lm5vdChfbGluZSk7XG5cblx0XHRcdF9saW5lSGVhZGVyLmZpbmQoJ2FbaGlkZS1hY3Rpb25dJykuY2xpY2soKTtcblx0XHRcdF9saW5lSGVhZGVyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnQWN0aXZlJylcblx0XHRcdFx0LmNoaWxkcmVuKCdzcGFuJylcblx0XHRcdFx0LmhpZGUoMjAwKTtcblx0XHRcdF9saW5lLmFkZENsYXNzKCdBY3RpdmUnKTtcblxuXHRcdFx0aWYgKCQobGluZUhhbmRsZXIpLmxlbmd0aCkge1xuXHRcdFx0XHQkKGxpbmVIYW5kbGVyKS5jbGljaygpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRfbGluZS5yZW1vdmVDbGFzcygnQWN0aXZlJyk7XG5cdFx0fVxuXHR9LFxufTtcbiIsInZhciBzZXR1cFRhYnVsYXJTY3JvbGwgPSBmdW5jdGlvbigkdGFidWxhclNjcm9sbCkge1xuXHR2YXIgJHRvcFNjcm9sbFdyYXBwZXIgPSAkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpO1xuXHR2YXIgJGNlbnRlclRhYmxlID0gJHRhYnVsYXJTY3JvbGwuZmluZCgnLlRhYnVsYXJTY3JvbGwtY2VudGVyLXRhYmxlJyk7XG5cdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdCRjZW50ZXJUYWJsZS5zY3JvbGxMZWZ0KCR0b3BTY3JvbGxXcmFwcGVyLnNjcm9sbExlZnQoKSk7XG5cdH0pO1xuXHQkY2VudGVyVGFibGUuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdCR0b3BTY3JvbGxXcmFwcGVyLnNjcm9sbExlZnQoJGNlbnRlclRhYmxlLnNjcm9sbExlZnQoKSk7XG5cdH0pO1xuXHQvLyBzaW1pbGFyIHRvIFJlc2l6ZVxuXHR2YXIgdGFibGVXaWR0aCA9ICRjZW50ZXJUYWJsZS5maW5kKCd0YWJsZScpLndpZHRoKCk7XG5cdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpLndpZHRoKHRhYmxlV2lkdGgpO1xuXHRpZiAoJGNlbnRlclRhYmxlWzBdLnNjcm9sbFdpZHRoID4gJGNlbnRlclRhYmxlLndpZHRoKCkpIHtcblx0XHQkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdH0gZWxzZSB7XG5cdFx0JHRhYnVsYXJTY3JvbGwuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdH1cbn07XG5cbiQoZnVuY3Rpb24oKSB7XG5cdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuXHRcdHNldHVwVGFidWxhclNjcm9sbCgkKGVsKSk7XG5cdH0pO1xufSk7XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xuXHRcdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuXHRcdFx0c2V0dXBUYWJ1bGFyU2Nyb2xsKCQoZWwpKTtcblx0XHR9KTtcblx0fSk7XG59KTtcblxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcblx0JCgnLlRhYnVsYXJTY3JvbGwnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XG5cdFx0dmFyICRjZW50ZXJUYWJsZSA9ICQoZWwpLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlci10YWJsZScpO1xuXHRcdHZhciB0YWJsZVdpZHRoID0gJGNlbnRlclRhYmxlLmZpbmQoJ3RhYmxlJykud2lkdGgoKTtcblx0XHQkKGVsKVxuXHRcdFx0LmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpXG5cdFx0XHQud2lkdGgodGFibGVXaWR0aCk7XG5cdFx0aWYgKCRjZW50ZXJUYWJsZVswXS5zY3JvbGxXaWR0aCA+ICRjZW50ZXJUYWJsZS53aWR0aCgpKSB7XG5cdFx0XHQkKGVsKVxuXHRcdFx0XHQuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKVxuXHRcdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JChlbClcblx0XHRcdFx0LmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJylcblx0XHRcdFx0LmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHR9XG5cdH0pO1xufSk7XG4iLCIvKiBDb21wb25lbnQgVGFic0V4dGVuZGVkICovXG5TYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkID0gZnVuY3Rpb24oKSB7XG5cdCQoJy5UYWJzX0V4dGVuZGVkIC5UYWJzX2hlYWRlciA+IC5UYWJzX190YWInKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkKHRoaXMpLnRleHQoKSA9PT0gJycpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuVGFic19FeHRlbmRlZCAuVGFic19oZWFkZXIgLlRhYnNfX3RhYjpub3QoLmFjdGl2ZSknKVxuXHRcdC5vZmYoJ21vdXNlZG93bicpXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldnQpIHtcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xuXHRcdFx0JHRhYnNFeHRlbmRlZC5yZW1vdmVDbGFzcygnaXNDbG9zZWQnKTtcblx0XHR9KTtcblxuXHQkKCcuVGFic19FeHRlbmRlZC5IaWRlQWN0aXZlT25DbGljayAuVGFic19oZWFkZXInKVxuXHRcdC5vZmYoJ21vdXNlZG93bicpXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCAnLlRhYnNfX3RhYi5hY3RpdmUnLCBmdW5jdGlvbihldnQpIHtcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xuXHRcdFx0dmFyICR0YWJzQm9keSA9ICR0YWJzRXh0ZW5kZWQuZmluZCgnLlRhYnNfYm9keScpO1xuXG5cdFx0XHRpZiAoJHRhYnNCb2R5Lmhhc0NsYXNzKCdUYWJzX2JvZHktLWNsb3NlZCcpKSB7XG5cdFx0XHRcdCR0YWJzQm9keS5yZW1vdmVDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5yZW1vdmVDbGFzcygnaXNDbG9zZWQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCR0YWJzQm9keS5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5hZGRDbGFzcygnaXNDbG9zZWQnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHQkKCcuVGFic19FeHRlbmRlZC0tZGlzYWJsZWQnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuXHRcdCQoZWwpXG5cdFx0XHQucGFyZW50KClcblx0XHRcdC5jc3MoJ2N1cnNvcicsICdkZWZhdWx0Jylcblx0XHRcdC5vZmYoJ2NsaWNrJyk7XG5cdH0pO1xuXG5cdCQoJy5UYWJzX0V4dGVuZGVkJykuZWFjaChmdW5jdGlvbihpbmRleCwgZWwpIHtcblx0XHRpZiAoJChlbCkuaGFzQ2xhc3MoJ1RhYnNfRXh0ZW5kZWQtLWNsb3NlZG9uc3RhcnQnKSkge1xuXHRcdFx0JChlbClcblx0XHRcdFx0LmZpbmQoJy5UYWJzX2JvZHknKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XG5cdFx0XHQkKGVsKS5hZGRDbGFzcygnaXNDbG9zZWQnKTtcblx0XHRcdCQoZWwpLnJlbW92ZUNsYXNzKCdUYWJzX0V4dGVuZGVkLS1jbG9zZWRvbnN0YXJ0Jyk7XG5cdFx0fVxuXHRcdCQoZWwpXG5cdFx0XHQub2ZmKCdjbGljaycpXG5cdFx0XHQub24oJ2NsaWNrJywgJy5UYWJzX0V4dGVuZGVkLS1jbG9zZScsIGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHQkKGV2dC50YXJnZXQpXG5cdFx0XHRcdFx0LmNsb3Nlc3QoJy5UYWJzX2JvZHknKVxuXHRcdFx0XHRcdC5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcblx0XHRcdH0pO1xuXHR9KTtcbn07XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRTYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkKCk7XG5cdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLlRhYnNFeHRlbmRlZCk7XG59KTtcbiIsIi8qIENvbXBvbmVudCBUcmlnZ2VySWZyYW1lVG9vbHRpcCAqL1xyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcbiAgdmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIHZhciAkZWxlbWVudElkID0gJCgnIycgKyBjb25maWcuZWxlbWVudElkKTtcclxuICAgICRlbGVtZW50SWQuYWRkQ2xhc3MoJ3Rvb2x0aXAnKTtcclxuXHJcbiAgICB2YXIgZXh0cmFEYXRhUGFyYW1zID0gJ2RhdGEtaWZyYW1ldG9vbHRpcHRyaWdnZXJpZD1cIicgKyBjb25maWcuZWxlbWVudElkICsgJ1wiJztcclxuICAgIHZhciB3aWRnZXROb3RpZnlEaXYgPSAkLmZpbmQoJ1tkYXRhLWlmcmFtZXRvb2x0aXB0cmlnZ2VyaWQ9XCInICsgY29uZmlnLmVsZW1lbnRJZCArICdcIl0nKTtcclxuICAgIGlmICh3aWRnZXROb3RpZnlEaXYubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGV4dHJhRGF0YVBhcmFtcyArPSBcIiBkYXRhLWlmcmFtZXRvb2x0aXBub3RpZnlpZD1cIiArICQod2lkZ2V0Tm90aWZ5RGl2KS5kYXRhKCdpZnJhbWV0b29sdGlwbm90aWZ5aWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbWVudElkLnRvb2x0aXBzdGVyKHtcclxuICAgICAgY29udGVudEFzSFRNTDogdHJ1ZSxcclxuICAgICAgdGhlbWU6IGNvbmZpZy50aGVtZSxcclxuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXHJcbiAgICAgIHBvc2l0aW9uOiBjb25maWcucG9zaXRpb25JZCxcclxuICAgICAgdHJpZ2dlcjogY29uZmlnLnRyaWdnZXJJZCxcclxuICAgICAgbWluV2lkdGg6IGNvbmZpZy5taW5XaWR0aCxcclxuICAgICAgbWF4V2lkdGg6IGNvbmZpZy5tYXhXaWR0aCxcclxuICAgICAgemluZGV4OiBjb25maWcuemluZGV4LFxyXG4gICAgICBjb250ZW50OiAnPGlmcmFtZSBzcmM9XCInICsgY29uZmlnLlVSTCArICdcIiBzdHlsZT1cImJvcmRlcjpub25lXCIgaWQ9XCJ0b29sdGlwc3Rlci1mcmFtZVwiICcgKyBleHRyYURhdGFQYXJhbXMgKyAnPjwvaWZyYW1lPicsXHJcbiAgICAgIGZ1bmN0aW9uUmVhZHk6IGZ1bmN0aW9uIChpbnN0YW5jZSwgaGVscGVyKSB7XHJcbiAgICAgICAgJChoZWxwZXIpLmNzcyh7XHJcbiAgICAgICAgICAndmlzaWJpbGl0eSc6ICdoaWRkZW4nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkKCcudG9vbHRpcHN0ZXItYmFzZScpLmNzcyh7XHJcbiAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIFNhcHBoaXJlV2lkZ2V0cy5UcmlnZ2VySWZyYW1lVG9vbHRpcCA9IHtcclxuICAgIGNyZWF0ZVxyXG4gIH1cclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvL1NhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzIHx8IHt9O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==