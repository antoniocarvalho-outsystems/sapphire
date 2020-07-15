/*! Version: 5.1.910044 || Generated: Wed Jul 15 2020 10:43:18 GMT+0100 (Hora de verão da Europa Ocidental) */
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
/******/ 	var hotCurrentHash = "6a52fb6968dc7854764b";
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
	"./05-components/v3-pat/patient-call-cancel/scripts.js": "./src/components/05-components/v3-pat/patient-call-cancel/scripts.js",
	"./05-components/v3-pat/person-card/scripts.js": "./src/components/05-components/v3-pat/person-card/scripts.js",
	"./05-components/v3-pat/prescription-card/scripts.js": "./src/components/05-components/v3-pat/prescription-card/scripts.js",
	"./05-components/v3-pat/prescription-expandable/scripts.js": "./src/components/05-components/v3-pat/prescription-expandable/scripts.js",
	"./05-components/v3-pat/sapphire-header/scripts.js": "./src/components/05-components/v3-pat/sapphire-header/scripts.js",
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

	var showAppointmentTrigger = function () {
		window[SapphireWidgets.LayoutBase.widgetId].showAppointmentTrigger();
	};

	var hideAppointmentTrigger = function () {
		window[SapphireWidgets.LayoutBase.widgetId].hideAppointmentTrigger();
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
						discount = 100;
					}

					$('body, html').scrollTop(targetElementOffsetTop - discount);
				}
			}, 250);
		}
	};

	var popupWindow = function (url, title, win, w, h) {
		const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
		const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
		return win.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
	}

	var LayoutBase = function (config) {
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

		$(function () {

			$('body').addClass('LayoutBase');

			if (_this.isTopWindow) {
				$('body').css('overflow-y', 'scroll');
			}

			$('body').on('click', '.remote-trigger', function () {
				let newWin = window.open('', 'remoteAppointment');
			});

			$('.ViewStateCounter').on('dblclick', function () {
				if (!!!localStorage.getItem('RemoteAppointment')) {
					window.remoteAppointment = SapphireWidgets.LayoutBase.popupWindow('//atc-dev.outsystemsenterprise.com/Sapphirev2_Th/RemoteAppointment.aspx', 'remoteAppointment', window, 300, 200);
					window.remoteAppointment.focus();
					localStorage.setItem('RemoteAppointment', 'true');
				}
			});
		});

		$(window).load(function () {
			$('body').click();
			$(window).scroll();
			if (!!localStorage.getItem('RemoteAppointment')) {
				window.setTimeout(() => {
					_this.showAppointmentTrigger();
				}, 300);
			}
		});

	};

	LayoutBase.prototype.showAppointmentTrigger = function () {
		$('.remote-trigger').addClass('opened');
	}

	LayoutBase.prototype.hideAppointmentTrigger = function () {
		$('.remote-trigger').removeClass('opened');
	}

	LayoutBase.prototype.setupWindowEvents = function () {
		var _this = this;
		var cursorPositon = 0;

		$(window).resize(function () {
			_this.updateThresholds();
			_this.handleOptionalContainers();
			_this.handleLayoutTopPadding();
			_this.handleLayoutBottomPadding();
		});

		$(window).scroll(function () {
			var newPosition = $(window).scrollTop();

			window.clearTimeout(_this.layoutBaseRedrawTimer);
			_this.layoutBaseRedrawTimer = window.setTimeout(function () {
				_this.updateThresholds();
				_this.handleOptionalContainers();
				_this.handleLayoutTopPadding();
				_this.handleLayoutBottomPadding();
				_this.handleManageQueueCard(cursorPositon, newPosition);
				cursorPositon = newPosition;
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

	LayoutBase.prototype.updateThresholds = function () {
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
		$('body').css('overflow-y', 'scroll').click();
	};

	LayoutBase.prototype.closeSidebarIframe = function (duration_in) {
		var duration = duration_in >= 0 ? duration_in : 100;
		var targetWidth = this.isExpandable ? 40 : 262;
		this.$iframeSidebar.animate({
				width: targetWidth,
			},
			duration
		);
		$('body').css('overflow-y', 'scroll');
	};

	LayoutBase.prototype.handleManageQueueCard = function (cursorPositon, newPosition) {
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
		popupWindow,
		showAppointmentTrigger,
		hideAppointmentTrigger
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




	$('.CLOSE_REMOTE').on('click', function () {
		localStorage.removeItem('RemoteAppointment');
		window.opener.SapphireWidgets.LayoutBase.hideAppointmentTrigger();
		window.close();
	});

	if ($('.LayoutBlank.Page.RemoteAppointment').length > 0) {

		window.addEventListener('blur', function (event) {
			if (!!localStorage.getItem('RemoteAppointment')) {
				window.opener.SapphireWidgets.LayoutBase.showAppointmentTrigger();
			}
		});

		window.addEventListener('focus', function (event) {
			window.opener.SapphireWidgets.LayoutBase.hideAppointmentTrigger();
		});

		window.addEventListener('beforeunload', function (event) {
			localStorage.removeItem('RemoteAppointment');
		});

		window.addEventListener('unload', function (event) {
			localStorage.removeItem('RemoteAppointment');
		});
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
				$closeButton.off('click').on('click', () => window.top._iframePopup.Popup_Window_Close());
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
			position: 'fixed',
			left: '50%',
			top: '50%',
			transform: 'perspective(1px) translate(-50%, -50%)',
			height: 'auto',
			minWidth: popupMinWidth + 'px',
			width: popupWidth + 'px',
			filter: 'blur(0px)',
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
		var contentHeight = headerHeight + introHeight + bodyHeight + footerHeight + 40;
		var dialogHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();

		if (popupSize === 'Small') {
			var parentHeight = $(window.parent).height();

			if (contentHeight > parentHeight) {
				$osPopupContent.height(parentHeight - 70);
				$body.height($osPopupContent.height() - 40);
			} else {
				$osPopupContent.height(contentHeight);
			}
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
					.after('<tr><td colspan="7" class="DateTimeRangePicker-calendar-gotoday">' + 'Today' + '</td></tr>');
				if (_this.config.drops === 'up') {
					_this.$calendar.css('top', _this.$calendar.offset().top - 24);
				}
			}
			_this.handleViewportPosition();
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
(function ($, window, document, SapphireWidgets) {

	var create = function (config) {
		window[config.widgetId] = new GenericGallery(config);
	};

	var GenericGallery = function (config) {
		this.config = config;
		this.$widget = $('#' + this.config.widgetId).css('display', 'block');
		this.equalHeight = this.config.equalHeight;
		if (this.$widget.find('.GenericGallery-content > span').length === 1 && this.$widget.find('.GenericGallery-content > span').hasClass('ListRecords')) {
			this.$gallery = this.$widget.find('.GenericGallery-content > span.ListRecords');
		} else {
			this.$gallery = this.$widget.find('.GenericGallery-content');
		}

		this.$gallery.css({
			'display': 'grid',
			'gridTemplateColumns': 'repeat(' + this.config.columnSizing + ', minmax(' + this.config.columnMinWidth + ', 1fr))'
		});

		this.$galleryItems = this.$gallery.children();
		this.$galleryItems.each(function () {
			if (!$(this).hasClass('GenericGallery-item')) {
				$(this).wrap('<div class="GenericGallery-item"></div>');
			}
		});
	};

	SapphireWidgets.GenericGallery = {
		create: create
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

			osAjaxBackend.BindAfterAjaxRequest(() => setWidth(config.widgetId));
		});

		$(window).on('resize.LineAdd', () => setWidth(config.widgetId));
	};

	const setWidth = function(widgetId) {
		window.setTimeout(function() {
			const $widget = $(`#${widgetId}`);
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

	SapphireWidgets.LineAdd = { create };
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
	isAnyConfirmationOpened: function() {
		if (_isInIframe) {
			return window.top.$('body').hasClass('confirmation-opened') && window.top.$('.confirm-container:visible').length;
		} else {
			return $('body').hasClass('confirmation-opened') && $('.confirm-container:visible').length;
		}
	},

	toggleConfirm: function(_id, _question, _message, _notifyId, _HasNotifyOnCancel) {
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
						'document.getElementById("' +
							'iframe_' +
							_id +
							'").contentWindow.OsNotifyWidget("' +
							_notifyId +
							'","CANCEL"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' +
							_confirmId +
							'");'
					);
				} else {
					_noBtnLnk.setAttribute(
						'onclick',
						'OsNotifyWidget("' +
							_notifyId +
							'","CANCEL"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' +
							_confirmId +
							'");'
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
			_yesBtnLnk.setAttribute('class', 'Button SetAsValid');
			_yesBtnLnk.setAttribute('cancel-button', '');
			_yesBtnLnk.setAttribute('ui', 'ConfirmYes1');

			if (_isInIframe) {
				_yesBtnLnk.setAttribute(
					'onclick',
					'document.getElementById("' +
						'iframe_' +
						_id +
						'").contentWindow.OsNotifyWidget("' +
						_notifyId +
						'","OK"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' +
						_confirmId +
						'");'
				);
			} else {
				_yesBtnLnk.setAttribute(
					'onclick',
					'OsNotifyWidget("' +
						_notifyId +
						'","OK"); SapphireWidgets.ConfirmationPopup.closeConfirmPopup("' +
						_confirmId +
						'");'
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
				setTimeout(function() {
					window.top
						.$('#' + _confirmId)
						.find('.confirm-container')
						.slideToggle(150);
					window.top.$('#' + _confirmId + ' [cancel-button]').focus();
				}, 100);
			} else {
				$('#bg_' + _confirmId).fadeIn(140);
				setTimeout(function() {
					$('#' + _confirmId)
						.find('.confirm-container')
						.slideToggle(150);
					$('#' + _confirmId + ' [cancel-button]').focus();
				}, 100);
			}
		}
	},

	closeConfirmPopup: function(_confirmId) {
		$('body').removeClass('confirmation-opened');
		$('body').css('overflow-y', 'scroll');
		$('#bg_' + _confirmId).fadeOut(140);

		setTimeout(function() {
			$('#' + _confirmId)
				.find('.confirm-container')
				.slideUp(150);
			$('#' + _confirmId).remove();
		}, 100);
	},

	create: function(_id, _question, _message, _notifyId, _HasNotifyOnCancel) {
		$(document).ready(function() {
			$('#' + _id)
				.off('click')
				.on('click', function() {
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

				$(`#${Id}`)
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

				$(`#${Id}`)
					.parents('.ToggleButton')
					.click();
			}, 100);
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

		var buttonY = _this.position().top + buttonHh;
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

/***/ "./src/components/05-components/v3-pat/patient-call-cancel/scripts.js":
/*!****************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/patient-call-cancel/scripts.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component PatientCallCancel */
(function ($, window, document, SapphireWidgets) {
	var create = function (config) {
		var interval;
		var timeCounter;
		var $widget = $('#' + config.widgetId).find('.PatientCallCancel');
		var $countdown = $widget.find('.PatientCallCancel-counter');
		var $label = $widget.find('.PatientCallCancel-label');

		var setState = function (state_in, text_in) {
			//js-idle, js-calling
			$widget.find('> div').prop('class', state_in);
			$label.text(text_in);
		};

		var callPatient = function ($widget) {
			setState('js-calling', config.txtCallPatient);
			if (config.showCountdown) {
				$countdown.text(config.txtCallingIn + ' ' + config.timeToCancel);
			} else {
				$countdown.text(config.txtCallingIn);
			}
			startCounter();
		};

		var startCounter = function () {
			timeCounter = config.timeToCancel;
			interval = window.setInterval(updateCounter, 1000);
		};

		var updateCounter = function () {
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

		if (config.startCounting) {
			callPatient($widget);
		}

		$widget.on('click', '.js-idle .PatientCallCancel-label', function () {
			callPatient($widget);
		});

		$widget.on('click', '.js-idle .PatientCallCancel-icon', function () {
			callPatient($widget);
		});

		$widget.on('click', '.js-calling .PatientCallCancel-cancel', function () {
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
				console.log(checkBoxCount);
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
								console.log('click 6 .SelectSD_contentWrapper', e);
								$(this)
									.find('.LineActionLINK > a')
									.click();
							});
						$(this)
							.find('.SelectSD_actionLink')
							.on('click', function(e) {
								console.log('click 5 .SelectSD_actionLink', e);
								$(this)
									.find('.LineActionLINK > a')
									.click();
							});
					});
				}
			}
		};

		if (isMultiple === 'True') {
			console.log($('.SelectSD__multiple'));
			$SSDselectId.find('.SelectSD__multiple > input').click(function() {
				console.log('click 4', this);
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
			$SSDComponent.find('.SearchSD___remove').hide();
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

		// $SSDComponent.find('.SearchSD___input input').select(function() {
		// 	if ($('.SearchSD___input input').val().length > 0) {
		// 		ssdClear($SSDComponent);
		// 		debounce(ssdFocus($SSDComponent), 600);
		// 	}
		// });

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
window.addEventListener('DOMContentLoaded', (event) => {
	var rootElement = document.querySelector('body');
rootElement.addEventListener(
	'click',
	function(event) {
		document.querySelector("iframe[src*='Prescriptions_CW']") && document.querySelector("iframe[src*='Prescriptions_CW']").contentWindow.document.addEventListener("click",(e)=>{
			e.stopPropagation();
			document.querySelector(".SearchSD").classList.remove('Open');
			var allInput=document.querySelector('.SearchSD___input').children;
			for(const element in allInput){
				return allInput[element].value!=undefined?allInput[element].value='':null;
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

/***/ "./src/components/05-components/v3-pat/tabs-extended/scripts.js":
/*!**********************************************************************!*\
  !*** ./src/components/05-components/v3-pat/tabs-extended/scripts.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component TabsExtended */
SapphireWidgets.TabsExtended = function () {
	$('.Tabs_Extended .Tabs_header > .Tabs__tab').each(function () {
		if ($(this).text() === '') {
			$(this).remove();
		}
	});

	$('.Tabs_Extended .Tabs_header .Tabs__tab:not(.active)')
		.off('mousedown')
		.on('mousedown', function (evt) {
			var $tabsExtended = $(evt.target).closest('.Tabs_Extended');
			$tabsExtended.removeClass('isClosed');
		});

	$('.Tabs_Extended.HideActiveOnClick .Tabs_header')
		.off('mousedown')
		.on('mousedown', '.Tabs__tab.active', function (evt) {
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

	$('.Tabs_Extended--disabled').each(function (index, el) {
		$(el)
			.parent()
			.css('cursor', 'default')
			.off('click');
	});

	$('.Tabs_Extended').each(function (index, el) {
		if ($(el).hasClass('Tabs_Extended--closedonstart')) {
			$(el)
				.find('.Tabs_body')
				.addClass('Tabs_body--closed');
			$(el).addClass('isClosed');
			$(el).removeClass('Tabs_Extended--closedonstart');
		}
		$(el)
			.off('click')
			.on('click', '.Tabs_Extended--close', function (evt) {
				$(evt.target)
					.closest('.Tabs_body')
					.addClass('Tabs_body--closed');
			});
	});
};

$(document).ready(function () {
	SapphireWidgets.TabsExtended();
	osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.TabsExtended);
});

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
(function ($, window, document, SapphireWidgets) {
	var create = function (config) {

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
			content: '<iframe id="tooltipster-frame" data-ui="iframe-tooltip" src="' + config.URL + '" style="border:none" ' + extraDataParams + '></iframe>',
			functionReady: function (instance, helper) {
				$(helper).css({
					visibility: 'hidden',
				});
				setTimeout(function () {
					$('.tooltipster-base').css({
						visibility: 'visible',
						"minHeight": config.minHeight > 0 ? config.minHeight : 'auto',
					});
				}, 500);
			},
		});
	};

	SapphireWidgets.TriggerIframeTooltip = {
		create,
	};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cyBzeW5jIFxcLmpzJCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wMC1zZXR0aW5ncy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLW1lbnUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLXN1Yi1tZW51L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYnV0dG9uLWxpbmsvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jYXJkLXBhdGllbnQtdGFibGUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb3VudHJ5LXBob25lL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZGF0YS10YWJsZXMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcmFnLWRyb3Avc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wZG93bi1jYXRlZ29yaWVzL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZHJvcHpvbmUvZHJvcHpvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1ncm91cC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2V4cGFuZGFibGUtbGluay9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Z1bGxzY3JlZW4tdGFicy13cmFwcGVyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1nYWxsZXJ5L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1ncmlkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaG9yaXpvbnRhbC10b29sYmFyL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC1sYXNhL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaW5wdXQtd2l0aC1jbGVhci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtYWRkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbGluZS1jYXJkLWxpc3Qvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWRldGFpbHMtZXhwYW5kLWJveC9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL2NvbmZpcm1hdGlvbi1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC1ub3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcG9wdXAtbWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zYXBwaGlyZS1wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhdGllbnQtY2FsbC1jYW5jZWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wZXJzb24tY2FyZC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWV4cGFuZGFibGUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1oZWFkZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1yYWRpby1idXR0b24vc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zY2FsZXMvc2NhbGUtbWFpbi1zdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2NhbGVzL3RvZ2dsZS1pdGVtLWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VhcmNoLWFuZC1zZWxlY3Qvc2VsZWN0LXNzZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWFyY2gtYW5kLXNlbGVjdC9zc2Qtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaGFibGUtY2xpZW50LXNpZGUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtY3VzdG9tL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWluc2lkZS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlbGVjdC1zeXN0ZW0vc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zaGlmdC1jb250YWluZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zaWRlLW1lbnUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zaWRlYmFyL3NpZGViYXItc3RydWN0dXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItaG9yaXpvbnRhbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItdmVydGljYWwvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGxpdC1idXR0b24vc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtY29tcG9uZW50LWJsb2NrL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWxpc3QtbGluZS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJ1bGFyLWxpc3Qvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJ1bGFyLXNjcm9sbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RyaWdnZXItaWZyYW1lLXRvb2x0aXAvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90cnVuY2F0ZWQtY29udGVudC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ZlcnRpY2FsLWNhcnJvdXNlbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaW5kZXguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxHQUFHOztRQUVIO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQSw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0Esa0JBQWtCLDhCQUE4QjtRQUNoRDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxvQkFBb0IsMkJBQTJCO1FBQy9DO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLG1CQUFtQixjQUFjO1FBQ2pDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsS0FBSztRQUNyQjtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixZQUFZO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0EsY0FBYyw0QkFBNEI7UUFDMUM7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJOztRQUVKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHVDQUF1QztRQUN4RDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsc0JBQXNCO1FBQ3ZDO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxVQUFVO1FBQ1Y7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsY0FBYyx3Q0FBd0M7UUFDdEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsU0FBUztRQUNUO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsUUFBUTtRQUNSO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZUFBZTtRQUNmO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0Esc0NBQXNDLHVCQUF1Qjs7O1FBRzdEO1FBQ0E7Ozs7Ozs7Ozs7OztBQ3h4QkEsbUJBQU8sQ0FBQyw0REFBeUI7O0FBRWpDO0FBQ0E7QUFDQSxXQUFXLDZEQUE4Qzs7Ozs7Ozs7Ozs7O0FDSnpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEOzs7Ozs7Ozs7OztBQ3hGQTs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvSkFBb0osRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtBQUN4TDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUNqVkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN0Q0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDOztBQUVyQztBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM1FEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBLGdDQUFnQztBQUNoQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN2REQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUEsK0JBQStCO0FBQy9CLENBQUM7Ozs7Ozs7Ozs7OztBQ2xCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBLHFDQUFxQztBQUNyQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN2QkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNU5EO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxnQkFBZ0I7O0FBRTlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsbUM7Ozs7Ozs7Ozs7O0FDcEJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdCQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNqQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHFFQUFxRTtBQUNyRSwyRUFBMkU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDaGREO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNqSUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsbUM7Ozs7Ozs7Ozs7O0FDL0NEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLDRCQUE0Qjs7QUFFdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLGdDQUFnQyxxQkFBcUI7O0FBRXJEO0FBQ0E7O0FBRUEsWUFBWSxxQkFBcUI7QUFDakM7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0EsUUFBUSxnQkFBZ0I7QUFDeEIsU0FBUyxnQkFBZ0I7QUFDekIsR0FBRztBQUNIOztBQUVBLDZCQUE2QjtBQUM3QixDQUFDOzs7Ozs7Ozs7Ozs7QUMvREQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGdDQUFnQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdkVEO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsU0FBUyxxREFBcUQsU0FBUztBQUMvRTs7QUFFQTs7QUFFQSxtQ0FBbUM7QUFDbkMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUNsQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsNkM7Ozs7Ozs7Ozs7O0FDbkJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM0tEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQjtBQUNoRTs7QUFFQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBOztBQUVBLGdDQUFnQyxRQUFRLEdBQUcsT0FBTzs7QUFFbEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxpQkFBaUIsRUFBRSxLQUFLO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWEsTUFBTSxHQUFHLFFBQVEsR0FBRyxRQUFRO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDaktEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QseUJBQXlCO0FBQzdFLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxpQkFBaUI7QUFDckUsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckREOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEk7Ozs7Ozs7Ozs7O0FDckREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixTQUFTO0FBQ2xDOztBQUVBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsNEJBQTRCO0FBQzVCLENBQUM7Ozs7Ozs7Ozs7OztBQ25DRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUEsaUNBQWlDO0FBQ2pDLENBQUM7Ozs7Ozs7Ozs7OztBQzNDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdCQUFnQjtBQUN4QjtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQSx5Q0FBeUM7QUFDekMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDWEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRixDQUFDLEU7Ozs7Ozs7Ozs7O0FDclFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUMxQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNuREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQ0FBb0M7QUFDcEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsV0FBVztBQUNYO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQzFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLDhCQUE4QixHQUFHO0FBQ2pDLFdBQVcsR0FBRztBQUNkLFdBQVcsR0FBRzs7QUFFZDtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLEdBQUc7QUFDYjtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxHQUFHO0FBQ2I7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRkFBc0Y7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNyREQsbUJBQU8sQ0FBQywrRkFBc0I7QUFDOUIsbUJBQU8sQ0FBQyxpRkFBZTtBQUN2QjtBQUNBLG1CQUFPLENBQUMsK0VBQWM7QUFDdEIsbUJBQU8sQ0FBQyx1RkFBa0I7Ozs7Ozs7Ozs7Ozs7QUNKMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsNkM7Ozs7Ozs7Ozs7O0FDeEVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzlCRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdCQUFnQjtBQUN4QixrQkFBa0IsZ0JBQWdCO0FBQ2xDLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN2QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxnQkFBZ0I7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDO0FBQzNDLENBQUM7Ozs7Ozs7Ozs7OztBQ3hKRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDckdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsa0JBQWtCO0FBQ2pDLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDhCQUE4QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBLHVDQUF1QztBQUN2QyxDQUFDOzs7Ozs7Ozs7Ozs7QUMxUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUMzREEscUZBQXFGOztBQUVyRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTixJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUM3SEEscUZBQXFGOztBQUVyRjtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLG1EQUFtRDtBQUNuRCxxRUFBcUU7QUFDckUsaUNBQWlDO0FBQ2pDLHVDQUF1QztBQUN2QyxxQ0FBcUM7QUFDckMsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRjtBQUNwRixvRkFBb0Y7QUFDcEYsa0ZBQWtGO0FBQ2xGLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUgsK0VBQStFLHVCQUF1Qjs7QUFFdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzViRDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsbUM7Ozs7Ozs7Ozs7O0FDL0REO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7Ozs7Ozs7O0FBU0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsbUM7Ozs7Ozs7Ozs7O0FDdE5EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdExEO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQywyQkFBMkI7QUFDM0IsMkNBQTJDO0FBQzNDLGtDQUFrQztBQUNsQyw2QkFBNkI7QUFDN0Isc0NBQXNDO0FBQ3RDLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsOENBQThDLFNBQVM7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQzNhQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUEsR0FBRzs7QUFFSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN4TEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLG1DOzs7Ozs7Ozs7OztBQzdHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUN2R0Q7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQjs7QUFFdkM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQsK0JBQStCLGdCQUFnQjs7QUFFL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0JBQWdCOztBQUVqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDMU5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOzs7O0FBSVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtCOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsOEk7OztBQUdBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlSO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxTQUFTO0FBQ1QscUNBQXFDO0FBQ3JDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBOztBQUVBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7QUMxZkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDMUREO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHdCQUF3QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDLENBQUM7Ozs7Ozs7Ozs7OztBQ3pERDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUM1Q0Q7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0EsMEJBQTBCLGdCQUFnQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRCxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNUREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxnQkFBZ0Isd0JBQXdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwQkFBMEI7QUFDeEQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBLHFDQUFxQztBQUNyQyxDQUFDOzs7Ozs7Ozs7Ozs7QUMvSUQ7Ozs7Ozs7Ozs7OztBQ0FBLHVDIiwiZmlsZSI6ImRldi5hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI2YTUyZmI2OTY4ZGM3ODU0NzY0YlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJhcHBcIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvYXBwLmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLmpzXCIpO1xuIiwicmVxdWlyZSgnLi9jb21wb25lbnRzL2luZGV4LnNjc3MnKTtcclxuXHJcbi8vSW1wb3J0IGFsbCBKUyBmaWxlc1xyXG5jb25zdCByZXF1aXJlQWxsID0gciA9PiByLmtleXMoKS5mb3JFYWNoKHIpO1xyXG5yZXF1aXJlQWxsKHJlcXVpcmUuY29udGV4dCgnLi9jb21wb25lbnRzJywgdHJ1ZSwgL1xcLmpzJC8pKTtcclxuIiwidmFyIG1hcCA9IHtcblx0XCIuLzAwLXNldHRpbmdzL2NvbmZpZy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDAtc2V0dGluZ3MvY29uZmlnLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJhc2UuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1ibGFuay5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtcG9wdXAuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1tZW51L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtbWVudS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLXN1Yi1tZW51L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvYnV0dG9uLWxpbmsvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYnV0dG9uLWxpbmsvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvY2FyZC1wYXRpZW50LXRhYmxlL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2NhcmQtcGF0aWVudC10YWJsZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvY29tcC1saW5lL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2NvdW50cnktcGhvbmUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvY291bnRyeS1waG9uZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZGF0ZXRpbWUtcmFuZ2UtcGlja2VyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RyYWctZHJvcC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcmFnLWRyb3Avc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZHJvcGRvd24tY2F0ZWdvcmllcy9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wZG93bi1jYXRlZ29yaWVzL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3B6b25lL2Ryb3B6b25lLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wem9uZS9kcm9wem9uZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1ncm91cC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9leHBhbmRhYmxlLWdyb3VwL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2V4cGFuZGFibGUtbGluay9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9leHBhbmRhYmxlLWxpbmsvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZnVsbHNjcmVlbi10YWJzLXdyYXBwZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZnVsbHNjcmVlbi10YWJzLXdyYXBwZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1nYWxsZXJ5L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2dlbmVyaWMtZ2FsbGVyeS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdyaWQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1ncmlkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2hvcml6b250YWwtdG9vbGJhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3Jpem9udGFsLXRvb2xiYXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaW5wdXQtbGFzYS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC1sYXNhL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LXdpdGgtY2xlYXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaW5wdXQtd2l0aC1jbGVhci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWFkZC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWFkZC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWNhcmQtbGlzdC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWNhcmQtbGlzdC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWRldGFpbHMtZXhwYW5kLWJveC9zY3JpcHQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtZGV0YWlscy1leHBhbmQtYm94L3NjcmlwdC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xvY2F0aW9uLWJveC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9tYWluLWludGVyYWN0aXZlLWNhcmQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L21lbnUtYmFyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L21lbnUtYmFyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L211bHRpcGxlLXNlbGVjdGlvbi1idXR0b24vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbXVsdGlwbGUtc2VsZWN0aW9uLWJ1dHRvbi9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcGFuZWwuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL2NvbmZpcm1hdGlvbi1wYW5lbC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBvcHVwLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcG9wdXAuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLW5vdGlmeS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQtbm90aWZ5LmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NhcHBoaXJlLXBhbmVsLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zYXBwaGlyZS1wYW5lbC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGF0aWVudC1jYWxsLWNhbmNlbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1oZWFkZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLXJhZGlvLWJ1dHRvbi9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zY2FsZXMvc2NhbGUtbWFpbi1zdHJ1Y3R1cmUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NjYWxlcy9zY2FsZS1tYWluLXN0cnVjdHVyZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2NhbGVzL3RvZ2dsZS1pdGVtLWNvbnRyb2wuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NjYWxlcy90b2dnbGUtaXRlbS1jb250cm9sLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWFyY2gtYW5kLXNlbGVjdC9zZWxlY3Qtc3NkLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWFyY2gtYW5kLXNlbGVjdC9zZWxlY3Qtc3NkLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWFyY2gtYW5kLXNlbGVjdC9zc2Qtc2VhcmNoLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWFyY2gtYW5kLXNlbGVjdC9zc2Qtc2VhcmNoLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWFyY2hhYmxlLWNsaWVudC1zaWRlL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlYXJjaGFibGUtY2xpZW50LXNpZGUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWN1c3RvbS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtY3VzdG9tL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1pbnNpZGUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWluc2lkZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWxlY3Qtc3lzdGVtL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlbGVjdC1zeXN0ZW0vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NoaWZ0LWNvbnRhaW5lci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zaWRlLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2lkZS1tZW51L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItaG9yaXpvbnRhbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLWhvcml6b250YWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci12ZXJ0aWNhbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwbGl0LWJ1dHRvbi9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGxpdC1idXR0b24vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWNvbXBvbmVudC1ibG9jay9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtY29tcG9uZW50LWJsb2NrL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1saXN0LWxpbmUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWxpc3QtbGluZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJzLWV4dGVuZGVkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvdGFidWxhci1saXN0L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnVsYXItbGlzdC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJ1bGFyLXNjcm9sbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJ1bGFyLXNjcm9sbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90cmlnZ2VyLWlmcmFtZS10b29sdGlwL3RyaWdnZXItaWZyYW1lLXRvb2x0aXAuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RyaWdnZXItaWZyYW1lLXRvb2x0aXAvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvdHJ1bmNhdGVkLWNvbnRlbnQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdHJ1bmNhdGVkLWNvbnRlbnQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvdmVydGljYWwtY2Fycm91c2VsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ZlcnRpY2FsLWNhcnJvdXNlbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi9nbG9iYWxzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9nbG9iYWxzLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2NvbXBvbmVudHMgc3luYyByZWN1cnNpdmUgXFxcXC5qcyRcIjsiLCJTYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzID0gd2luZG93LlNhcHBoaXJlV2lkZ2V0cyB8fCB7fTtcclxuIiwiLyogQ29tcG9uZW50IExheW91dEJhc2UgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgTGF5b3V0QmFzZShjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0fTtcclxuXHJcblx0dmFyIG9wZW5TaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLm9wZW5TaWRlYmFySWZyYW1lKGR1cmF0aW9uKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgY2xvc2VTaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLmNsb3NlU2lkZWJhcklmcmFtZShkdXJhdGlvbik7XHJcblx0fTtcclxuXHJcblx0dmFyIHNob3dBcHBvaW50bWVudFRyaWdnZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLnNob3dBcHBvaW50bWVudFRyaWdnZXIoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgaGlkZUFwcG9pbnRtZW50VHJpZ2dlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS53aWRnZXRJZF0uaGlkZUFwcG9pbnRtZW50VHJpZ2dlcigpO1xyXG5cdH07XHJcblxyXG5cdHZhciBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcclxuXHRcdHZhciAkdGFyZ2V0RWxlbWVudCA9ICRlbGVtZW50O1xyXG5cclxuXHRcdGlmICghISR0YXJnZXRFbGVtZW50Lmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbDtcclxuXHJcblx0XHRcdHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS53aWRnZXRJZF0uZ2V0VGhyZXNob2xkcygpLnNlY29uZGFyeVRocmVzaG9sZCA+IDApIHtcclxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgPSAkdGFyZ2V0RWxlbWVudC5vZmZzZXQoKS50b3A7XHJcblx0XHRcdFx0XHR2YXIgZGlzY291bnQ7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCEhJCgnLkxheW91dEJhc2UtZW1lcmdlbmN5JykudGV4dCgpKSB7XHJcblx0XHRcdFx0XHRcdGlmICgkKCcuTGF5b3V0QmFzZS1zZWNvbmRhcnknKS5oYXNDbGFzcygnaXNGaXhlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudE9mZnNldFRvcCArPSAxNTA7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudE9mZnNldFRvcCArPSA4MDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRkaXNjb3VudCA9IDM5MDtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlmICgkKCcuTGF5b3V0QmFzZS1zZWNvbmRhcnknKS5oYXNDbGFzcygnaXNGaXhlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudE9mZnNldFRvcCArPSA4MDtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50T2Zmc2V0VG9wICs9IDIwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGRpc2NvdW50ID0gMTAwO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdCQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AodGFyZ2V0RWxlbWVudE9mZnNldFRvcCAtIGRpc2NvdW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDI1MCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0dmFyIHBvcHVwV2luZG93ID0gZnVuY3Rpb24gKHVybCwgdGl0bGUsIHdpbiwgdywgaCkge1xyXG5cdFx0Y29uc3QgeSA9IHdpbi50b3Aub3V0ZXJIZWlnaHQgLyAyICsgd2luLnRvcC5zY3JlZW5ZIC0gKGggLyAyKTtcclxuXHRcdGNvbnN0IHggPSB3aW4udG9wLm91dGVyV2lkdGggLyAyICsgd2luLnRvcC5zY3JlZW5YIC0gKHcgLyAyKTtcclxuXHRcdHJldHVybiB3aW4ub3Blbih1cmwsIHRpdGxlLCBgdG9vbGJhcj1ubywgbG9jYXRpb249bm8sIGRpcmVjdG9yaWVzPW5vLCBzdGF0dXM9bm8sIG1lbnViYXI9bm8sIHNjcm9sbGJhcnM9bm8sIHJlc2l6YWJsZT1ubywgY29weWhpc3Rvcnk9bm8sIHdpZHRoPSR7d30sIGhlaWdodD0ke2h9LCB0b3A9JHt5fSwgbGVmdD0ke3h9YCk7XHJcblx0fVxyXG5cclxuXHR2YXIgTGF5b3V0QmFzZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lciA9IDA7XHJcblx0XHR0aGlzLmhhc0hlYWRlciA9IGNvbmZpZy5oYXNIZWFkZXI7XHJcblx0XHR0aGlzLmlzRXhwYW5kYWJsZSA9IGNvbmZpZy5pc0V4cGFuZGFibGU7XHJcblx0XHR0aGlzLmlzVG9wV2luZG93ID0gd2luZG93LnRvcCA9PT0gd2luZG93LnNlbGYgPyB0cnVlIDogZmFsc2U7XHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiR3cmFwcGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLVdyYXBwZXInKTtcclxuXHRcdHRoaXMuJHNwYWNlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zcGFjZXInKTtcclxuXHRcdHRoaXMuJG1haW5NZW51ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLU1haW5NZW51Jyk7XHJcblx0XHR0aGlzLiRoZWFkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtaGVhZGVyJyk7XHJcblx0XHR0aGlzLiRoZWFkZXJCb2R5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1ib2R5Jyk7XHJcblx0XHR0aGlzLiRwcmltYXJ5TWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1wcmltYXJ5LW1lbnUnKTtcclxuXHRcdHRoaXMuJGVtZXJnZW5jeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1lbWVyZ2VuY3knKTtcclxuXHRcdHRoaXMuJHNlY29uZGFyeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zZWNvbmRhcnknKTtcclxuXHRcdHRoaXMuJHNlY29uZGFyeU1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5LW1lbnUnKTtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtaWZyYW1lc2lkZWJhcicpO1xyXG5cdFx0dGhpcy4kaGVhZGVyQWRkaXRpb25hbENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWFkZGl0aW9uYWwtY29udGVudCcpO1xyXG5cdFx0dGhpcy4kdG9wZml4ZWRDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXRvcGZpeGVkY29udGVudCcpO1xyXG5cdFx0dGhpcy4kYm90dG9tZml4ZWRDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLWJvdHRvbWZpeGVkY29udGVudCcpO1xyXG5cdFx0dGhpcy4kbWFpbkNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtTWFpbkNvbnRlbnQnKTtcclxuXHRcdHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ID0gMDtcclxuXHRcdHRoaXMuZXh0cmFQYWRkaW5nU2Vjb25kYXJ5ID0gMDtcclxuXHRcdHRoaXMuc2V0dXBXaW5kb3dFdmVudHMoKTtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xyXG5cclxuXHRcdCQoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdMYXlvdXRCYXNlJyk7XHJcblxyXG5cdFx0XHRpZiAoX3RoaXMuaXNUb3BXaW5kb3cpIHtcclxuXHRcdFx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5yZW1vdGUtdHJpZ2dlcicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRsZXQgbmV3V2luID0gd2luZG93Lm9wZW4oJycsICdyZW1vdGVBcHBvaW50bWVudCcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCQoJy5WaWV3U3RhdGVDb3VudGVyJykub24oJ2RibGNsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmICghISFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnUmVtb3RlQXBwb2ludG1lbnQnKSkge1xyXG5cdFx0XHRcdFx0d2luZG93LnJlbW90ZUFwcG9pbnRtZW50ID0gU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2UucG9wdXBXaW5kb3coJy8vYXRjLWRldi5vdXRzeXN0ZW1zZW50ZXJwcmlzZS5jb20vU2FwcGhpcmV2Ml9UaC9SZW1vdGVBcHBvaW50bWVudC5hc3B4JywgJ3JlbW90ZUFwcG9pbnRtZW50Jywgd2luZG93LCAzMDAsIDIwMCk7XHJcblx0XHRcdFx0XHR3aW5kb3cucmVtb3RlQXBwb2ludG1lbnQuZm9jdXMoKTtcclxuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdSZW1vdGVBcHBvaW50bWVudCcsICd0cnVlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCgnYm9keScpLmNsaWNrKCk7XHJcblx0XHRcdCQod2luZG93KS5zY3JvbGwoKTtcclxuXHRcdFx0aWYgKCEhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1JlbW90ZUFwcG9pbnRtZW50JykpIHtcclxuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRfdGhpcy5zaG93QXBwb2ludG1lbnRUcmlnZ2VyKCk7XHJcblx0XHRcdFx0fSwgMzAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLnNob3dBcHBvaW50bWVudFRyaWdnZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcucmVtb3RlLXRyaWdnZXInKS5hZGRDbGFzcygnb3BlbmVkJyk7XHJcblx0fVxyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oaWRlQXBwb2ludG1lbnRUcmlnZ2VyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0JCgnLnJlbW90ZS10cmlnZ2VyJykucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xyXG5cdH1cclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuc2V0dXBXaW5kb3dFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGN1cnNvclBvc2l0b24gPSAwO1xyXG5cclxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRfdGhpcy51cGRhdGVUaHJlc2hvbGRzKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycygpO1xyXG5cdFx0XHRfdGhpcy5oYW5kbGVMYXlvdXRUb3BQYWRkaW5nKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgbmV3UG9zaXRpb24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KF90aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lcik7XHJcblx0XHRcdF90aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVUaHJlc2hvbGRzKCk7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlT3B0aW9uYWxDb250YWluZXJzKCk7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlTGF5b3V0VG9wUGFkZGluZygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVNYW5hZ2VRdWV1ZUNhcmQoY3Vyc29yUG9zaXRvbiwgbmV3UG9zaXRpb24pO1xyXG5cdFx0XHRcdGN1cnNvclBvc2l0b24gPSBuZXdQb3NpdGlvbjtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuJGVtZXJnZW5jeS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0aWYgKHNjcm9sbFRvcCArIHRoaXMuY29udGVudFRocmVzaG9sZCA+IHRoaXMuZW1lcmdlbmN5VGhyZXNob2xkKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LmFkZENsYXNzKCdpc0ZpeGVkJyk7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6IHRoaXMuY29udGVudFRocmVzaG9sZCxcclxuXHRcdFx0XHRcdHdpZHRoOiB0aGlzLiRoZWFkZXIud2lkdGgoKSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ0VtZXJnZW5jeSA9IHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kucmVtb3ZlQ2xhc3MoJ2lzRml4ZWQnKTtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ0VtZXJnZW5jeSA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5Lmxlbmd0aCA9PT0gMSAmJiB0aGlzLiRzZWNvbmRhcnkudGV4dCgpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Y29uc3QgZXZlbnRUb29sYmFyID0gbmV3IEN1c3RvbUV2ZW50KCdUb29sYmFyRml4ZWQnKTtcclxuXHRcdFx0Y29uc3QgaGFzQ2xhc3MgPSB0aGlzLiRzZWNvbmRhcnkuaGFzQ2xhc3MoJ2lzRml4ZWQnKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLiRzZWNvbmRhcnlNZW51LnRleHQoKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuYWRkQ2xhc3MoJ25vVG9vbGJhcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2Nyb2xsVG9wICsgdGhpcy5jb250ZW50VGhyZXNob2xkICsgKHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKSB8fCAwKSA+IHRoaXMuc2Vjb25kYXJ5VGhyZXNob2xkKSB7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdpc0ZpeGVkJykuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogdGhpcy5jb250ZW50VGhyZXNob2xkICsgKHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKSB8fCAwKSxcclxuXHRcdFx0XHRcdHdpZHRoOiB0aGlzLiRoZWFkZXIud2lkdGgoKSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnlcclxuXHRcdFx0XHRcdC5maW5kKCcuQnV0dG9uLlNlY29uZCwgLkJ1dHRvbi5UaGlyZCwgLkJ1dHRvbi5MaW5rJylcclxuXHRcdFx0XHRcdC5ub3QoJy5QYW5lbCAuQnV0dG9uLlNtYWxsLCAuUGFuZWwgLkJ1dHRvbi5UaGlyZCcpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ1NtYWxsJyk7XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeS5maW5kKCcuVG9vbGJhcicpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldFRvb2xiYXJXaWR0aCA9ICQoJy5TYXBwaGlyZUhlYWRlcicpLm91dGVyV2lkdGgodHJ1ZSkgKiAwLjY2O1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykud2lkdGgodGFyZ2V0VG9vbGJhcldpZHRoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeU1lbnUudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdub1Rvb2xiYXInKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4kcHJpbWFyeU1lbnUuY3NzKCdvcGFjaXR5JywgMCk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSB0aGlzLiRzZWNvbmRhcnkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG5cdFx0XHRcdGlmICghaGFzQ2xhc3MpIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50VG9vbGJhcik7XHJcblxyXG5cdFx0XHRcdC8vIC8vXHJcblx0XHRcdFx0Ly8gdmFyIGN1cnJlbnRIZWlnaHQgPSAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0XHRcdC8vIHZhciBjb21wZW5zYXRpb24gPSB0aGlzLnJlZmVyZW5jZUhlaWdodCAtIGN1cnJlbnRIZWlnaHQ7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coY29tcGVuc2F0aW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gaWYgKGNvbXBlbnNhdGlvbiA8PSAwKSB7XHJcblx0XHRcdFx0Ly8gXHQvLyB0aGlzLiRsYXlvdXRCYXNlQ29udGVudC5jc3MoJ3BhZGRpbmctYm90dG9tJywgJycpO1xyXG5cdFx0XHRcdC8vIH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gXHR0aGlzLiRsYXlvdXRCYXNlQ29udGVudC5jc3MoJ3BhZGRpbmctYm90dG9tJywgY29tcGVuc2F0aW9uKTtcclxuXHRcdFx0XHQvLyB9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gdGhpcy4kbGF5b3V0QmFzZUNvbnRlbnQuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LnJlbW92ZUNsYXNzKCdpc0ZpeGVkJykuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLkJ1dHRvbi5TZWNvbmQsIC5CdXR0b24uVGhpcmQsIC5CdXR0b24uTGluaycpLnJlbW92ZUNsYXNzKCdTbWFsbCcpO1xyXG5cdFx0XHRcdHRoaXMuJHByaW1hcnlNZW51LmNzcygnb3BhY2l0eScsIDEpO1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5jc3Moe1xyXG5cdFx0XHRcdFx0aGVpZ2h0OiAndW5zZXQnLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5maW5kKCcuVG9vbGJhcicpLmNzcygnd2lkdGgnLCAnMTAwJScpO1xyXG5cdFx0XHRcdHRoaXMuZXh0cmFQYWRkaW5nU2Vjb25kYXJ5ID0gMDtcclxuXHJcblx0XHRcdFx0d2luZG93LmRpc3BhdGNoRXZlbnQoZXZlbnRUb29sYmFyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeU1lbnUudGV4dCgpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLkNsaW5pY2lhbldvcmtBcmVhLWNvbHVtbnMtYmlnJykuY3NzKCdtYXJnaW4tdG9wJywgJ3Vuc2V0Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5DbGluaWNpYW5Xb3JrQXJlYS1jb2x1bW5zLWJpZycpLmNzcygnbWFyZ2luLXRvcCcsIC10aGlzLiRzZWNvbmRhcnkub3V0ZXJIZWlnaHQodHJ1ZSkpO1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeU1lbnUuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3RyYW5zcGFyZW50Jyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVMYXlvdXRUb3BQYWRkaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHBhZGRpbmdUb3AgPSB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgKyB0aGlzLmV4dHJhUGFkZGluZ0VtZXJnZW5jeSArIHRoaXMuZXh0cmFQYWRkaW5nU2Vjb25kYXJ5O1xyXG5cdFx0dGhpcy4kc3BhY2VyLnN0b3AoKS5hbmltYXRlKHtcclxuXHRcdFx0aGVpZ2h0OiBwYWRkaW5nVG9wLFxyXG5cdFx0fSwgMCwgJ2xpbmVhcicpO1xyXG5cdFx0aWYgKHRoaXMuJHRvcGZpeGVkQ29udGVudC5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0dGhpcy4kdG9wZml4ZWRDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0d2lkdGg6ICQoJy5MYXlvdXRCYXNlLU1haW5Db250ZW50Jykud2lkdGgoKSxcclxuXHRcdFx0XHR0b3A6IHRoaXMudG9wZml4ZWRDb250ZW50VGhyZXNob2xkICsgJ3B4JyxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuaGFuZGxlTGF5b3V0Qm90dG9tUGFkZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLiRib3R0b21maXhlZENvbnRlbnQubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmICgkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0ID4gJCgnYm9keScpLmhlaWdodCgpKSB7XHJcblx0XHRcdFx0dmFyIGJvdHRvbUZpeGVkSGVpZ2h0ID0gdGhpcy4kYm90dG9tZml4ZWRDb250ZW50Lm91dGVySGVpZ2h0KHRydWUpO1xyXG5cdFx0XHRcdHRoaXMuJHdyYXBwZXIuYWRkQ2xhc3MoJ2hhc0ZpeGVkQm90dG9tJykuY3NzKCdwYWRkaW5nLWJvdHRvbScsIGJvdHRvbUZpeGVkSGVpZ2h0ICsgJ3B4Jyk7XHJcblx0XHRcdFx0dGhpcy4kYm90dG9tZml4ZWRDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0XHR3aWR0aDogJCgnLkxheW91dEJhc2UtTWFpbkNvbnRlbnQnKS5vdXRlcldpZHRoKHRydWUpLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2hhc0ZpeGVkQm90dG9tJykuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHRcdFx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRcdHdpZHRoOiAnJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLnVwZGF0ZVRocmVzaG9sZHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFpbk1lbnVIZWlnaHQgPSB0aGlzLiRtYWluTWVudS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIGhlYWRlckJvZHlIZWlnaHQgPSB0aGlzLiRoZWFkZXJCb2R5Lm91dGVySGVpZ2h0KHRydWUpIHx8IHRoaXMuJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIHRvcGZpeGVkQ29udGVudEhlaWdodCA9IHRoaXMuJHRvcGZpeGVkQ29udGVudC5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIHByaW1hcnlNZW51SGVpZ2h0ID0gdGhpcy4kcHJpbWFyeU1lbnUub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdHZhciBlbWVyZ2VuY3lIZWlnaHQgPSB0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdHRoaXMudG9wZml4ZWRDb250ZW50VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0O1xyXG5cdFx0dGhpcy5jb250ZW50VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0ICsgdG9wZml4ZWRDb250ZW50SGVpZ2h0O1xyXG5cdFx0dGhpcy5lbWVyZ2VuY3lUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQgKyBwcmltYXJ5TWVudUhlaWdodDtcclxuXHRcdHRoaXMuc2Vjb25kYXJ5VGhyZXNob2xkID1cclxuXHRcdFx0bWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0ICsgdG9wZml4ZWRDb250ZW50SGVpZ2h0ICsgcHJpbWFyeU1lbnVIZWlnaHQgKyBlbWVyZ2VuY3lIZWlnaHQ7XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuZ2V0VGhyZXNob2xkcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHRvcGZpeGVkQ29udGVudFRocmVzaG9sZDogdGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQsXHJcblx0XHRcdGNvbnRlbnRUaHJlc2hvbGQ6IHRoaXMuY29udGVudFRocmVzaG9sZCxcclxuXHRcdFx0ZW1lcmdlbmN5VGhyZXNob2xkOiB0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCxcclxuXHRcdFx0c2Vjb25kYXJ5VGhyZXNob2xkOiB0aGlzLnNlY29uZGFyeVRocmVzaG9sZCxcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUub3BlblNpZGViYXJJZnJhbWUgPSBmdW5jdGlvbiAoZHVyYXRpb25faW4pIHtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uX2luID49IDAgPyBkdXJhdGlvbl9pbiA6IDEwMDtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYW5pbWF0ZSh7XHJcblx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR9LCBkdXJhdGlvbik7XHJcblx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpLmNsaWNrKCk7XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuY2xvc2VTaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uX2luKSB7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkdXJhdGlvbl9pbiA+PSAwID8gZHVyYXRpb25faW4gOiAxMDA7XHJcblx0XHR2YXIgdGFyZ2V0V2lkdGggPSB0aGlzLmlzRXhwYW5kYWJsZSA/IDQwIDogMjYyO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhci5hbmltYXRlKHtcclxuXHRcdFx0XHR3aWR0aDogdGFyZ2V0V2lkdGgsXHJcblx0XHRcdH0sXHJcblx0XHRcdGR1cmF0aW9uXHJcblx0XHQpO1xyXG5cdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVNYW5hZ2VRdWV1ZUNhcmQgPSBmdW5jdGlvbiAoY3Vyc29yUG9zaXRvbiwgbmV3UG9zaXRpb24pIHtcclxuXHRcdGNvbnN0ICRtYW5hZ2VRdWV1ZSA9ICQoJy5NYW5hZ2VRdWV1ZUNvbnRhaW5lcicpO1xyXG5cclxuXHRcdGlmICgkbWFuYWdlUXVldWUubGVuZ3RoKSB7XHJcblx0XHRcdGlmIChuZXdQb3NpdGlvbiA+IGN1cnNvclBvc2l0b24pIHtcclxuXHRcdFx0XHQkbWFuYWdlUXVldWUuYWRkQ2xhc3MoJ01hbmFnZVF1ZXVlQ29udGFpbmVyLS1jbG9zZWQnKTtcclxuXHRcdFx0fSBlbHNlIGlmIChuZXdQb3NpdGlvbiA8IGN1cnNvclBvc2l0b24pIHtcclxuXHRcdFx0XHQkbWFuYWdlUXVldWUucmVtb3ZlQ2xhc3MoJ01hbmFnZVF1ZXVlQ29udGFpbmVyLS1jbG9zZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0Y2xvc2VTaWRlYmFySWZyYW1lLFxyXG5cdFx0b3BlblNpZGViYXJJZnJhbWUsXHJcblx0XHRzY3JvbGxUb0VsZW1lbnQsXHJcblx0XHRwb3B1cFdpbmRvdyxcclxuXHRcdHNob3dBcHBvaW50bWVudFRyaWdnZXIsXHJcblx0XHRoaWRlQXBwb2ludG1lbnRUcmlnZ2VyXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgTGF5b3V0QmxhbmsgKi9cclxuJChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHdpbmRvdy5mcmFtZUVsZW1lbnQpIHtcclxuXHRcdGlmICghISQodGhpcy5mcmFtZUVsZW1lbnQpLmNsb3Nlc3QoJy5NYWluSW50ZXJhY3RpdmVDYXJkJykubGVuZ3RoKSB7XHJcblx0XHRcdCQoJy5MYXlvdXRCbGFuay5QYWdlJykuYWRkQ2xhc3MoJ01haW5JbnRlcmFjdGl2ZUNhcmQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cdCQoJy5DTE9TRV9SRU1PVEUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnUmVtb3RlQXBwb2ludG1lbnQnKTtcclxuXHRcdHdpbmRvdy5vcGVuZXIuU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2UuaGlkZUFwcG9pbnRtZW50VHJpZ2dlcigpO1xyXG5cdFx0d2luZG93LmNsb3NlKCk7XHJcblx0fSk7XHJcblxyXG5cdGlmICgkKCcuTGF5b3V0QmxhbmsuUGFnZS5SZW1vdGVBcHBvaW50bWVudCcpLmxlbmd0aCA+IDApIHtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRpZiAoISFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnUmVtb3RlQXBwb2ludG1lbnQnKSkge1xyXG5cdFx0XHRcdHdpbmRvdy5vcGVuZXIuU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uuc2hvd0FwcG9pbnRtZW50VHJpZ2dlcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0d2luZG93Lm9wZW5lci5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5oaWRlQXBwb2ludG1lbnRUcmlnZ2VyKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdSZW1vdGVBcHBvaW50bWVudCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnUmVtb3RlQXBwb2ludG1lbnQnKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcbn0pOyIsIi8qIENvbXBvbmVudCBMYXlvdXRQb3B1cCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIHBvcHVwV2lkdGg7XHJcblx0dmFyIHBvcHVwTWluV2lkdGg7XHJcblx0dmFyIHBvcHVwSGVpZ2h0O1xyXG5cdHZhciBwb3B1cE1pbkhlaWdodDtcclxuXHR2YXIgcG9wdXBNYXhIZWlnaHQ7XHJcblx0dmFyIHBvcHVwV2lkdGhQZXJjZW50YWdlO1xyXG5cdHZhciBsYXlvdXRQb3B1cFJlc2l6ZVRpbWVyO1xyXG5cclxuXHR2YXIgJHBvcHVwID0gJCgnLkxheW91dFBvcHVwJyk7XHJcblx0dmFyICRvc1BvcHVwID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJyk7XHJcblx0dmFyICRvc1BvcHVwQ29udGVudCA9IHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLXVpLWRpYWxvZy1jb250ZW50Lm9zLWludGVybmFsLXVpLXdpZGdldC1jb250ZW50Jyk7XHJcblx0dmFyICRvdmVybGF5ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtdWktd2lkZ2V0LW92ZXJsYXknKTtcclxuXHR2YXIgcG9wdXBTaXplO1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcgPSBjb25maWc7XHJcblx0XHRwb3B1cFNpemUgPSBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLlBvcHVwU2l6ZTtcclxuXHJcblx0XHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ0xheW91dFBvcHVwJyk7IC8vIGJlY2F1c2UgZGF0ZXRpbWVyYW5nZXBpY2tlciBpcyBhdHRhY2hlZCB0byBib2R5XHJcblxyXG5cdFx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc1RvdWNoKSB7XHJcblx0XHRcdFx0JHBvcHVwLmFkZENsYXNzKCdpc1RvdWNoJyk7XHJcblx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdpc1RvdWNoJyk7IC8vIGJlY2F1c2Ugc2VsZWN0MiBpcyBhdHRhY2hlZCB0byBib2R5XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG5cdFx0XHRcdG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG11dGF0aW9uLCBpbmRleCkge1xyXG5cdFx0XHRcdFx0cmVkcmF3RGlhbG9nV2luZG93KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XHJcblx0XHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxyXG5cdFx0XHRcdHN1YnRyZWU6IHRydWUsXHJcblx0XHRcdFx0YXR0cmlidXRlczogZmFsc2UsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JCgnYm9keScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMuZnJhbWVFbGVtZW50KS5jc3Moe1xyXG5cdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0aGVpZ2h0OiAnMTAwJScsXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXNpemVEaWFsb2coKTtcclxuXHRcdFx0XHRyZXNpemVDb250ZW50KCk7XHJcblx0XHRcdFx0JCgnYm9keScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdH0sIDE1MCk7XHJcblxyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5yZWRyYXdEaWFsb2dXaW5kb3cpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cucGFyZW50KVxyXG5cdFx0XHQub2ZmKCdyZXNpemUuTGF5b3V0UG9wdXAnKVxyXG5cdFx0XHQub24oJ3Jlc2l6ZS5MYXlvdXRQb3B1cCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlZHJhd0RpYWxvZ1dpbmRvdygpO1xyXG5cdFx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZWRyYXdEaWFsb2dXaW5kb3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNsZWFyVGltZW91dChsYXlvdXRQb3B1cFJlc2l6ZVRpbWVyKTtcclxuXHRcdGxheW91dFBvcHVwUmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXNpemVEaWFsb2coKTtcclxuXHRcdFx0cmVzaXplQ29udGVudCgpO1xyXG5cdFx0XHQkKCdib2R5JykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdH0sIDMwMCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVzaXplRGlhbG9nID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5oYXNDbG9zZSkge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctdGl0bGViYXInKS5zaG93KCk7XHJcblxyXG5cdFx0XHRpZiAod2luZG93LnRvcC5faWZyYW1lUG9wdXAgIT0gdW5kZWZpbmVkIHx8IGZhbHNlKSB7XHJcblx0XHRcdFx0Y29uc3QgJGNsb3NlQnV0dG9uID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlJyk7XHJcblxyXG5cdFx0XHRcdCRjbG9zZUJ1dHRvbi5yZW1vdmVBdHRyKCdocmVmJyk7XHJcblx0XHRcdFx0JGNsb3NlQnV0dG9uLm9mZignY2xpY2snKS5vbignY2xpY2snLCAoKSA9PiB3aW5kb3cudG9wLl9pZnJhbWVQb3B1cC5Qb3B1cF9XaW5kb3dfQ2xvc2UoKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2luZG93LnRvcC4kKCdib2R5JykuaGFzQ2xhc3MoJ0xheW91dEJhc2UnKSkge1xyXG5cdFx0XHR3aW5kb3cudG9wLiQoJ2JvZHknKS5jc3Moe1xyXG5cdFx0XHRcdG92ZXJmbG93WTogJ2hpZGRlbicsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRvdmVybGF5LndpZHRoKCcxMDAlJyk7XHJcblxyXG5cdFx0Y2FsY1dpZHRoUGVyY2VudGFnZShwb3B1cFNpemUsICRvc1BvcHVwQ29udGVudCk7XHJcblxyXG5cdFx0JG9zUG9wdXAuY3NzKHtcclxuXHRcdFx0cG9zaXRpb246ICdmaXhlZCcsXHJcblx0XHRcdGxlZnQ6ICc1MCUnLFxyXG5cdFx0XHR0b3A6ICc1MCUnLFxyXG5cdFx0XHR0cmFuc2Zvcm06ICdwZXJzcGVjdGl2ZSgxcHgpIHRyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXHJcblx0XHRcdGhlaWdodDogJ2F1dG8nLFxyXG5cdFx0XHRtaW5XaWR0aDogcG9wdXBNaW5XaWR0aCArICdweCcsXHJcblx0XHRcdHdpZHRoOiBwb3B1cFdpZHRoICsgJ3B4JyxcclxuXHRcdFx0ZmlsdGVyOiAnYmx1cigwcHgpJyxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlc2l6ZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciAkYm9keSA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpO1xyXG5cdFx0dmFyIGNvbnRlbnRTY3JvbGxUb3AgPSAkYm9keS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnICYmICQoJy5kYXRlcmFuZ2VwaWNrZXI6dmlzaWJsZScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Ly8gc2tpcCB0aGUgcmVzZXQgb2YgLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkYm9keS5jc3Moe1xyXG5cdFx0XHRcdGhlaWdodDogJ2F1dG8nLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaGVhZGVySGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19oZWFkZXInKS5pbm5lckhlaWdodCgpIHx8IDA7XHJcblx0XHR2YXIgaW50cm9IZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2ludHJvJykuaW5uZXJIZWlnaHQoKSB8fCAwO1xyXG5cdFx0dmFyIGJvZHlIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKVswXS5zY3JvbGxIZWlnaHQgfHwgMDtcclxuXHRcdHZhciBmb290ZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2Zvb3RlcicpLmlubmVySGVpZ2h0KCkgfHwgMDtcclxuXHRcdHZhciBjb250ZW50SGVpZ2h0ID0gaGVhZGVySGVpZ2h0ICsgaW50cm9IZWlnaHQgKyBib2R5SGVpZ2h0ICsgZm9vdGVySGVpZ2h0ICsgNDA7XHJcblx0XHR2YXIgZGlhbG9nSGVpZ2h0ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJykub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnKSB7XHJcblx0XHRcdHZhciBwYXJlbnRIZWlnaHQgPSAkKHdpbmRvdy5wYXJlbnQpLmhlaWdodCgpO1xyXG5cclxuXHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPiBwYXJlbnRIZWlnaHQpIHtcclxuXHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KHBhcmVudEhlaWdodCAtIDcwKTtcclxuXHRcdFx0XHQkYm9keS5oZWlnaHQoJG9zUG9wdXBDb250ZW50LmhlaWdodCgpIC0gNDApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChjb250ZW50SGVpZ2h0IDwgZGlhbG9nSGVpZ2h0ICYmIFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNGaXhlZEhlaWdodCkge1xyXG5cdFx0XHRcdHZhciBmb3JjZWRCb2R5SGVpZ2h0ID0gZGlhbG9nSGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW50cm9IZWlnaHQgLSBmb290ZXJIZWlnaHQgLSA0MDtcclxuXHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA8IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPCBwb3B1cE1pbkhlaWdodCkge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmVyZW5jZSA9IHBvcHVwTWluSGVpZ2h0IC0gY29udGVudEhlaWdodDtcclxuXHRcdFx0XHRcdCRib2R5LmhlaWdodChib2R5SGVpZ2h0ICsgZGlmZXJlbmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA+PSBkaWFsb2dIZWlnaHQgJiYgU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc0ZpeGVkSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBkaWFsb2dIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCAtIGZvb3RlckhlaWdodCAtIDQwO1xyXG5cdFx0XHRcdCRib2R5LmhlaWdodChmb3JjZWRCb2R5SGVpZ2h0KTtcclxuXHRcdFx0fSBlbHNlIGlmIChjb250ZW50SGVpZ2h0ID49IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdGlmIChjb250ZW50SGVpZ2h0ID4gcG9wdXBNYXhIZWlnaHQpIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQocG9wdXBNYXhIZWlnaHQpO1xyXG5cdFx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBwb3B1cE1heEhlaWdodCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0IC0gZm9vdGVySGVpZ2h0IC0gNDA7XHJcblx0XHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybignVW5leHBlY3RlZCBjb21iaW5hdGlvbi4uLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSGFuZGxlIHdoZW4gRGF0ZVRpbWVSYW5nZVBpY2tlciBpcyBvcGVuZWRcclxuXHRcdHZhciBkYXRlUmFuZ2VQaWNrZXIgPSAkKCcuZGF0ZXJhbmdlcGlja2VyOnZpc2libGUnKTtcclxuXHRcdGlmIChkYXRlUmFuZ2VQaWNrZXIubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmIChkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gZGlhbG9nSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGRpZmZlcmVuY2UgPSBkYXRlUmFuZ2VQaWNrZXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tIC0gZGlhbG9nSGVpZ2h0O1xyXG5cdFx0XHRcdHZhciBib2R5SGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jykub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0JCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50JykuaGVpZ2h0KGJvZHlIZWlnaHQgKyBkaWZmZXJlbmNlICsgNDApO1xyXG5cdFx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoJCgnYm9keScpWzBdLnNjcm9sbEhlaWdodCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQkYm9keS5zY3JvbGxUb3AoY29udGVudFNjcm9sbFRvcCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaW5jcmVhc2VIZWlnaHQgPSBmdW5jdGlvbihkaWZlcmVuY2UpIHtcclxuXHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoJG9zUG9wdXBDb250ZW50LmhlaWdodCgpICsgZGlmZXJlbmNlKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbigkZWxlbWVudCkge1xyXG5cdFx0dmFyICR0YXJnZXRFbGVtZW50ID0gJGVsZW1lbnQ7XHJcblx0XHRpZiAoISEkdGFyZ2V0RWxlbWVudC5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWw7XHJcblx0XHRcdHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHZhciBoZWFkZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2hlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHRcdFx0dmFyIGludHJvSGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19pbnRybycpLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRCb2R5U2Nyb2xsID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50JylbMF0uc2Nyb2xsVG9wIHx8IDA7XHJcblx0XHRcdFx0dmFyIHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgPSAkdGFyZ2V0RWxlbWVudC5vZmZzZXQoKS50b3AgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCArIGN1cnJlbnRCb2R5U2Nyb2xsIC0gMjA7XHJcblx0XHRcdFx0JCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jykuc2Nyb2xsVG9wKHRhcmdldEVsZW1lbnRPZmZzZXRUb3ApO1xyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IGNhbGNXaWR0aFBlcmNlbnRhZ2UgPSAoKSA9PiB7XHJcblx0XHRjb25zdCB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdy5wYXJlbnQpLmhlaWdodCgpO1xyXG5cdFx0Y29uc3Qgd2luZG93V2lkdGggPSAkKHdpbmRvdy5wYXJlbnQpLndpZHRoKCk7XHJcblxyXG5cdFx0aWYgKHBvcHVwU2l6ZSA9PT0gJ1NtYWxsJykge1xyXG5cdFx0XHRsZXQgcGVyY2VudGFnZSA9IDAuMzM7XHJcblxyXG5cdFx0XHRpZiAod2luZG93V2lkdGggPD0gMTAyNCkgcGVyY2VudGFnZSA9IDAuNTtcclxuXHRcdFx0ZWxzZSBpZiAod2luZG93V2lkdGggPiAxMDI0ICYmIHdpbmRvd1dpZHRoIDw9IDE0NDApIHBlcmNlbnRhZ2UgPSAwLjQ7XHJcblxyXG5cdFx0XHRwb3B1cFdpZHRoID0gcGFyc2VJbnQod2luZG93V2lkdGggKiBwZXJjZW50YWdlKTtcclxuXHRcdFx0cG9wdXBNaW5XaWR0aCA9IDQwMDtcclxuXHRcdH0gZWxzZSBpZiAocG9wdXBTaXplID09PSAnTWVkaXVtJykge1xyXG5cdFx0XHRpZiAod2luZG93V2lkdGggPD0gMTAyNCkgcG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjg7XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHN3aXRjaCAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5Qb3B1cFdpZHRoKSB7XHJcblx0XHRcdFx0XHRjYXNlICdYU21hbGwnOlxyXG5cdFx0XHRcdFx0XHRwb3B1cE1pbldpZHRoID0gMjAwO1xyXG5cdFx0XHRcdFx0XHRwb3B1cFdpZHRoUGVyY2VudGFnZSA9IDAuMjtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdTbWFsbCc6XHJcblx0XHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSAzMDA7XHJcblx0XHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC4zO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ01lZGl1bSc6XHJcblx0XHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSA3MDA7XHJcblx0XHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC42O1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSA3MDA7XHJcblx0XHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC43O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2ggPyAwLjggOiBwb3B1cFdpZHRoUGVyY2VudGFnZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9wdXBXaWR0aCA9IHBhcnNlSW50KHdpbmRvd1dpZHRoICogcG9wdXBXaWR0aFBlcmNlbnRhZ2UpO1xyXG5cdFx0XHRwb3B1cE1pbkhlaWdodCA9IDEwMDtcclxuXHRcdFx0cG9wdXBNYXhIZWlnaHQgPSBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2hcclxuXHRcdFx0XHQ/IHBhcnNlSW50KHdpbmRvd0hlaWdodCAqIDAuOSlcclxuXHRcdFx0XHQ6IHBhcnNlSW50KHdpbmRvd0hlaWdodCAqIDAuNyk7XHJcblxyXG5cdFx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc0ZpeGVkSGVpZ2h0KSBwb3B1cEhlaWdodCA9IHBvcHVwTWF4SGVpZ2h0O1xyXG5cdFx0XHRlbHNlIHBvcHVwSGVpZ2h0ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJykub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0XHRcdCRvc1BvcHVwQ29udGVudC5jc3Moe1xyXG5cdFx0XHRcdG1heEhlaWdodDogcG9wdXBNYXhIZWlnaHQgKyAncHgnLFxyXG5cdFx0XHRcdG1pbkhlaWdodDogcG9wdXBNaW5IZWlnaHQgKyAncHgnLFxyXG5cdFx0XHRcdGhlaWdodDogcG9wdXBIZWlnaHQgKyAncHgnLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSBpZiAocG9wdXBTaXplID09PSAnTGFyZ2UnKSB7XHJcblx0XHRcdHBvcHVwTWluV2lkdGggPSBwYXJzZUludCh3aW5kb3dXaWR0aCAqIDAuOCk7XHJcblx0XHRcdHBvcHVwTWF4SGVpZ2h0ID0gcGFyc2VJbnQod2luZG93SGVpZ2h0ICogMC45KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRyZXNpemVEaWFsb2csXHJcblx0XHRyZXNpemVDb250ZW50LFxyXG5cdFx0aW5jcmVhc2VIZWlnaHQsXHJcblx0XHRyZWRyYXdEaWFsb2dXaW5kb3csXHJcblx0XHRzY3JvbGxUb0VsZW1lbnQsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuJCh3aW5kb3cpLnVubG9hZChmdW5jdGlvbigpIHtcclxuXHRpZiAoISEkKCcuTGF5b3V0UG9wdXAnKS5sZW5ndGgpIHtcclxuXHRcdHdpbmRvdy50b3AuJCgnYm9keScpLmNzcyh7XHJcblx0XHRcdG92ZXJmbG93WTogJ3Njcm9sbCcsXHJcblx0XHR9KTtcclxuXHR9XHJcbn0pO1xyXG4iLCIvKiBDb21wb25lbnQgQWN0aW9uc01lbnUgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyICR0cmlnZ2VyRWxlbWVudCA9ICQoJyMnICsgY29uZmlnLnRyaWdnZXJFbGVtZW50KTtcclxuXHRcdHZhciAkY29udGVudEVsZW1lbnQgPSAkKCcjJyArIGNvbmZpZy5jb250ZW50RWxlbWVudCk7XHJcblxyXG5cdFx0aWYgKCRjb250ZW50RWxlbWVudC50ZXh0KCkubGVuZ3RoIDwgMSkge1xyXG5cdFx0XHQkdHJpZ2dlckVsZW1lbnQuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGluc2lkZSBhIGRvY3VtZW50IHJlYWR5IGR1ZSB0byBzYXBwaGlyZSBwb3B1cCBiaW5kZWQgZXZlbnRzXHJcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuXHRcdFx0XHRpZiAoY29uZmlnLmxvY2FsZSA9PT0gJ0FSJykge1xyXG5cdFx0XHRcdFx0c3dpdGNoIChjb25maWcucG9zaXRpb24pIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2xlZnQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdyaWdodCc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbS1sZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdib3R0b20tcmlnaHQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICdib3R0b20tcmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2JvdHRvbS1sZWZ0JztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAndG9wLWxlZnQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ3RvcC1yaWdodCc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3RvcC1yaWdodCc6XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAndG9wLWxlZnQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkdHJpZ2dlckVsZW1lbnQudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0Y29udGVudDogJCgnPHNlY3Rpb24vPicpLmFwcGVuZCgkY29udGVudEVsZW1lbnQuY2xvbmUodHJ1ZSkpLFxyXG5cdFx0XHRcdFx0dHJpZ2dlcjogY29uZmlnLnRyaWdnZXJFdmVudCxcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcclxuXHRcdFx0XHRcdG1heFdpZHRoOiBjb25maWcubWF4V2lkdGgsXHJcblx0XHRcdFx0XHR0aGVtZTpcclxuXHRcdFx0XHRcdFx0J3Rvb2x0aXBzdGVyLWxvY2F0aW9uLS0nICtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLmxvY2F0aW9uICtcclxuXHRcdFx0XHRcdFx0JyBBY3Rpb25zTWVudS10b29sdGlwIFBhZGRpbmctLScgK1xyXG5cdFx0XHRcdFx0XHRjb25maWcucGFkZGluZyArXHJcblx0XHRcdFx0XHRcdCcgQm9yZGVyLS0nICtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLmJvcmRlcixcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkY29udGVudEVsZW1lbnQucmVtb3ZlKCk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuQWN0aW9uc01lbnUgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IEFjdGlvbnNTdWJNZW51IC0gQERlcHJlY2F0ZWQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLkFjdGlvbnNTdWJNZW51ID0gZnVuY3Rpb24oSWNvbklkKSB7XHJcblx0aWYgKCQoJy5QYXRpZW50SGVhZGVyQWN0aW9uc19fc3ViTWVudScpLmhhc0NsYXNzKCdTdWJNZW51QmxvY2snKSkge1xyXG5cdFx0JCgnLlBhdGllbnRIZWFkZXJBY3Rpb25zX19zdWJNZW51JykucmVtb3ZlQ2xhc3MoJ1N1Yk1lbnVCbG9jaycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKEljb25JZClcclxuXHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdC5zaWJsaW5ncygpXHJcblx0XHRcdC5maW5kKCcuUGF0aWVudEhlYWRlckFjdGlvbnNfX3N1Yk1lbnUnKVxyXG5cdFx0XHQuYWRkQ2xhc3MoJ1N1Yk1lbnVCbG9jaycpO1xyXG5cdH1cclxufTtcclxuIiwiLyogQ29tcG9uZW50IEJ1dHRvbkxpbmsgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjb25zdCAkd2lkZ2V0ID0gJChgIyR7Y29uZmlnLndpZGdldElkfSAuQnV0dG9uQ2xpY2tgKTtcclxuXHJcblx0XHRcdCR3aWRnZXQub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRjb25zdCBfdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG5cdFx0XHRcdGlmIChfdGFyZ2V0LmNsb3Nlc3QoJy5CdXR0b25DbGljay5jbGljaycpLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdFx0XHQkKCcuQnV0dG9uQ2xpY2suY2xpY2snKS5yZW1vdmVDbGFzcygnY2xpY2snKTtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2NsaWNrJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5CdXR0b25MaW5rID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBDYXJkUGF0aWVudFRhYmxlICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLkNhcmRQYXRpZW50SW5mbyBkaXYgYScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ0JvbGQnKTtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5zaWJsaW5ncygnLlRoZW1lR3JpZF9XaWR0aDInKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EnKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdCb2xkJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5zaWJsaW5ncygpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EnKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdCb2xkJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkNhcmRQYXRpZW50VGFibGUgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IENvbXBMaW5lICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGZ1bmN0aW9uIFNlY3Rpb25Db21wbGluZSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgaG9sZGVyID0gJChvYikuY2xvc2VzdCgnLkNvbXBMaW5lJyk7XHJcblx0XHRcdHZhciBTZWN0aW9uID0gJChvYikuY2xvc2VzdCgnLkNvbXBMaW5lRXhwYW5kYWJsZScpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuQ29tcExpbmVfRXhwYW5kJyk7XHJcblxyXG5cdFx0XHQvLyBnZXQgaWRcclxuXHRcdFx0dmFyIGlkID0gaG9sZGVyLmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0XHR2YXIgdGVtcEhlaWdodCA9IDA7XHJcblxyXG5cdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHQsIGR1cmluZyB0aGlzIHByb2Nlc3MsIHRyYW5zaXRpb25zIGFyZSBkaXNhYmxlZFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCkpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblxyXG5cdFx0XHRcdC8vIENvbGxhcHNlIGNvbnRlbnRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChob2xkZXIuaGFzQ2xhc3MoJ25vdFJlbmRlckludGVyYWN0aW9ucycpKSB7XHJcblx0XHRcdFx0XHRob2xkZXIuZmluZCgnLkNvbXBMaW5lLXRvZ2dsZS1pbnRlcmFjdGlvbnMnKS50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU4JykgfHwgJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU5JykpIHtcclxuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRpZiAoaG9sZGVyLmhhc0NsYXNzKCdub3RSZW5kZXJJbnRlcmFjdGlvbnMnKSkge1xyXG5cdFx0XHRcdFx0aG9sZGVyLmZpbmQoJy5Db21wTGluZS10b2dnbGUtaW50ZXJhY3Rpb25zJykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBhamF4IHJlZnJlcyBmdW5jdGlvblxyXG5cdFx0dGhhdC5hamF4UmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5Db21wTGluZV9oZWFkTGluZScpLm9mZigpO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLkNvbXBMaW5lX2hlYWRMaW5lIGlucHV0LCAuQ29tcExpbmVfaGVhZExpbmUgc2VsZWN0LCAuQ29tcExpbmVfaGVhZExpbmUgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIG5ldyBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykudW5iaW5kKCdjbGljaycpO1xyXG5cdFx0XHQkKCcuQ29tcExpbmVfX2V4cGFuZEljb24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjbGlja0V2ZW50cyh0aGlzLnBhcmVudEVsZW1lbnQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zXHJcblx0XHRcdCQoJy5Db21wTGluZUV4cGFuZGFibGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRcdF0gPT0gbnVsbFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIGFkZCByb3dcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRcdF0gPSB7XHJcblx0XHRcdFx0XHRcdGNsaWVudDogc3RhdCxcclxuXHRcdFx0XHRcdFx0c2VydmVyOiBzdGF0LFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdGN1clN0YXRlICE9XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XHRdWydzZXJ2ZXInXVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRcdF1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XHRdWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdFx0XHRdWydjbGllbnQnXSA9PSBmYWxzZSAmJlxyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbignLkNvbXBMaW5lX0V4cGFuZCcpXHJcblx0XHRcdFx0XHRcdFx0LmhlaWdodCgwKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRcdFx0XVsnY2xpZW50J10gPT0gdHJ1ZSAmJlxyXG5cdFx0XHRcdFx0XHQhJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKVxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zIHRvIGNyZWF0ZSBhcnJheSBzdGF0XHJcblx0XHRcdCQoJy5Db21wTGluZUV4cGFuZGFibGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGFkZCByb3dcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXHJcblx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XSA9IHtcclxuXHRcdFx0XHRcdGNsaWVudDogc3RhdCxcclxuXHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykudW5iaW5kKCdjbGljaycpO1xyXG5cdFx0XHQkKCcuQ29tcExpbmVfX2V4cGFuZEljb24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjbGlja0V2ZW50cyh0aGlzLnBhcmVudEVsZW1lbnQpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoJy5Db21wTGluZV9oZWFkTGluZSBpbnB1dCwgLkNvbXBMaW5lX2hlYWRMaW5lIHNlbGVjdCwgLkNvbXBMaW5lX2hlYWRMaW5lIGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIHJlbW92ZSB1bmVjZXNzYXJ5IGJlaGF2aW9yc1xyXG5cclxuXHRcdFx0Ly8gZXZlbnQgYWpheFxyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KHRoYXQuYWpheFJlZnJlc2gpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcclxuXHRcdFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZSA9IG5ldyBTZWN0aW9uQ29tcGxpbmUoKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2FwcGhpcmV2Ml9QYXR0ZXJzL0NvbXBMaW5lJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkNvbXBMaW5lID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBDb3VudHJ5UGhvbmUgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHRjb25zdCAkZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuXHJcblx0XHRjb25zdCBjb3VudHJ5UGhvbmVJbnB1dCA9IHdpbmRvdy5pbnRsVGVsSW5wdXQoJGVsZW1lbnQsIHtcclxuXHRcdFx0aW5pdGlhbENvdW50cnk6IGNvbmZpZy5pbml0aWFsQ291bnRyeSxcclxuXHRcdFx0cHJlZmVycmVkQ291bnRyaWVzOiBjb25maWcucHJlZmVycmVkQ291bnRyaWVzLFxyXG5cdFx0XHRzZXBhcmF0ZURpYWxDb2RlOiBjb25maWcuc2VwYXJhdGVEaWFsQ29kZSxcclxuXHRcdFx0bmF0aW9uYWxNb2RlOiBjb25maWcubmF0aW9uYWxNb2RlLFxyXG5cdFx0XHRhdXRvUGxhY2Vob2xkZXI6IGNvbmZpZy5hdXRvUGxhY2Vob2xkZXIgPyAncG9saXRlJyA6IGZhbHNlLFxyXG5cdFx0XHRmb3JtYXRPbkRpc3BsYXk6IGZhbHNlLFxyXG5cdFx0XHR1dGlsc1NjcmlwdDogJy9WM19QYXQvanMvdXRpbHMuanMnLFxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkNvdW50cnlQaG9uZSA9IHtcclxuXHRcdGNyZWF0ZVxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0Y2xhc3MgRGF0YVRhYmxlcyB7XHJcblx0XHRjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuXHRcdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHRcdHRoaXMuJHdpZGdldCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuXHRcdFx0dGhpcy4kdGFibGUgPSB0aGlzLiR3aWRnZXQuZmluZCgndGFibGUnKTtcclxuXHRcdFx0dGhpcy4kdGFibGUuYWRkQ2xhc3MoJ2NlbGwtYm9yZGVyIGNvbXBhY3QnKTtcclxuXHRcdFx0dGhpcy5vbkluaXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRvbkluaXQoKSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucyA9IHtcclxuXHRcdFx0XHQuLi50aGlzLmNvbmZpZyxcclxuXHRcdFx0XHRmaXhlZENvbHVtbnM6IHRydWUsXHJcblx0XHRcdFx0aW5mbzogZmFsc2UsXHJcblx0XHRcdFx0b3JkZXJpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHBhZ2luZzogZmFsc2UsXHJcblx0XHRcdFx0c2Nyb2xsQ29sbGFwc2U6IHRydWUsXHJcblx0XHRcdFx0c2Nyb2xsWDogdHJ1ZSxcclxuXHRcdFx0XHRzZWFyY2hpbmc6IGZhbHNlLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0JCgoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy4kdGFibGUuRGF0YVRhYmxlKHRoaXMub3B0aW9ucyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+ICh3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBEYXRhVGFibGVzKGNvbmZpZykpO1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRGF0YVRhYmxlcyA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHR9O1xyXG59KSgpO1xyXG4iLCIvKiBDb21wb25lbnQgRGF0ZVRpbWVSYW5nZVBpY2tlciAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzID0gW107XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzW2ldLmNvbmZpZy53aWRnZXRJZCA9PT0gY29uZmlnLndpZGdldElkKSB7XHJcblx0XHRcdFx0YWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBEYXRlVGltZVJhbmdlUGlja2VyKGNvbmZpZyk7XHJcblx0XHRhbGxEYXRlVGltZVJhbmdlUGlja2Vycy5wdXNoKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgRGF0ZVRpbWVSYW5nZVBpY2tlciA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmN1cnJlbnRMb2NhbGUgPSBjb25maWcuY3VycmVudExvY2FsZTtcclxuXHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ0RhdGVUaW1lUmFuZ2VQaWNrZXInKTtcclxuXHRcdHRoaXMuJGNsZWFyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNsZWFyJyk7XHJcblx0XHR0aGlzLiRsYWJlbCA9IHRoaXMuJHdpZGdldC5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1sYWJlbCcpO1xyXG5cclxuXHRcdHRoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ2F0dGFjaGVkSW5wdXQnKTtcclxuXHRcdFx0dGhpcy4kaW5wdXQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItcGxhY2Vob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWRpc3BsYXllZCBpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG5cdFx0XHRpZiAoIXRoaXMuY29uZmlnLmFsbG93c1R5cGluZykge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC5wcm9wKCdyZWFkb25seScsIHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRpbnB1dCA9ICQoJyMnICsgY29uZmlnLmlucHV0SWQpO1xyXG5cdFx0XHRpZiAoIXRoaXMuY29uZmlnLmFsbG93c1R5cGluZykge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JywgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5jdXJyZW50TG9jYWxlID09PSAnQVInKSB7XHJcblx0XHRcdG1vbWVudC5sb2NhbGUoJ2FyLWt3Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG9wdGlvbnMgPSB7fTtcclxuXHRcdG9wdGlvbnMuc3RhcnREYXRlID0gY29uZmlnLnN0YXJ0RGF0ZTtcclxuXHRcdG9wdGlvbnMuc2luZ2xlRGF0ZVBpY2tlciA9IGNvbmZpZy5zaW5nbGVEYXRlUGlja2VyO1xyXG5cdFx0b3B0aW9ucy5hdXRvQXBwbHkgPSBjb25maWcuYXV0b0FwcGx5O1xyXG5cdFx0b3B0aW9ucy5hdXRvVXBkYXRlSW5wdXQgPSBjb25maWcuYXV0b1VwZGF0ZUlucHV0O1xyXG5cdFx0b3B0aW9ucy50aW1lUGlja2VyID0gY29uZmlnLnRpbWVQaWNrZXI7XHJcblx0XHRvcHRpb25zLnRpbWVQaWNrZXIyNEhvdXIgPSBjb25maWcudGltZVBpY2tlcjI0SG91cjtcclxuXHRcdG9wdGlvbnMudGltZVBpY2tlckluY3JlbWVudCA9IGNvbmZpZy50aW1lUGlja2VySW5jcmVtZW50O1xyXG5cdFx0b3B0aW9ucy5zaG93RHJvcGRvd25zID0gY29uZmlnLmhhc0Ryb3Bkb3ducztcclxuXHRcdG9wdGlvbnMuZHJvcHMgPSBjb25maWcuZHJvcHM7XHJcblx0XHRvcHRpb25zLm9wZW5zID0gY29uZmlnLm9wZW5zO1xyXG5cclxuXHRcdHZhciBzdHJpbmdDb25uZWN0aW9uID0gJ1ssIGF0XSc7XHJcblxyXG5cdFx0aWYgKGNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVkgSEg6TU0nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZIEhIOk1NJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG9wdGlvbnMudGltZVBpY2tlcjI0SG91cikge1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdElucHV0ID0gJ0RELU1NLVlZWVkgSEg6bW0nO1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzWWVhcldoZW5UZXh0XHJcblx0XHRcdFx0XHQ/ICdEIE1NTSBZWVlZJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIEhIOm1tJ1xyXG5cdFx0XHRcdFx0OiAnRCBNTU0nICsgc3RyaW5nQ29ubmVjdGlvbiArICcgSEg6bW0nO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdElucHV0ID0gJ0RELU1NLVlZWVkgaGg6bW0gQSc7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNZZWFyV2hlblRleHRcclxuXHRcdFx0XHRcdD8gJ0QgTU1NIFlZWVknICsgc3RyaW5nQ29ubmVjdGlvbiArICcgaGg6bW0gQSdcclxuXHRcdFx0XHRcdDogJ0QgTU1NJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIGhoOm1tIEEnO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ29ubHlEYXRlJyk7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVknKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jb25maWcuZm9ybWF0SW5wdXQgPSAnREQtTU0tWVlZWSc7XHJcblx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzWWVhcldoZW5UZXh0ID8gJ0QgTU1NIFlZWVknIDogJ0QgTU1NJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1dlZWtEYXlOYW1lV2hlblRleHRcclxuXHRcdFx0PyAnZGRkWywgXScgKyB0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbFxyXG5cdFx0XHQ6IHRoaXMuY29uZmlnLmZvcm1hdExhYmVsO1xyXG5cclxuXHRcdG9wdGlvbnMubG9jYWxlID0ge1xyXG5cdFx0XHRkaXJlY3Rpb246IGNvbmZpZy5jdXJyZW50TG9jYWxlID09PSAnQVInID8gJ3J0bCcgOiAnbHRyJyxcclxuXHRcdFx0Zm9ybWF0OiB0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCxcclxuXHRcdFx0Y2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxyXG5cdFx0XHRhcHBseUxhYmVsOiAnQXBwbHknLFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygndGV4dFRyaWdnZXInKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29uZmlnLmVuZERhdGUgJiYgY29uZmlnLmVuZERhdGUgIT09ICcwMS0wMS0xOTAwIDAwOjAwOjAwJykge1xyXG5cdFx0XHRvcHRpb25zLmVuZERhdGUgPSBjb25maWcuZW5kRGF0ZTtcclxuXHRcdH1cclxuXHRcdGlmIChjb25maWcubWF4RGF0ZSAmJiBjb25maWcubWF4RGF0ZSAhPT0gJzAxLTAxLTE5MDAgMDA6MDA6MDAnKSB7XHJcblx0XHRcdG9wdGlvbnMubWF4RGF0ZSA9IGNvbmZpZy5tYXhEYXRlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNvbmZpZy5taW5EYXRlICYmIGNvbmZpZy5taW5EYXRlICE9PSAnMDEtMDEtMTkwMCAwMDowMDowMCcpIHtcclxuXHRcdFx0b3B0aW9ucy5taW5EYXRlID0gY29uZmlnLm1pbkRhdGU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5EaXNhYmxlZFdlZWtEYXlzKSB7XHJcblx0XHRcdHZhciBkaXNhYmxlZFdlZWtEYXlzID0gY29uZmlnLkRpc2FibGVkV2Vla0RheXMuc3BsaXQoJywnKTtcclxuXHRcdFx0b3B0aW9ucy5pc0ludmFsaWREYXRlID0gZnVuY3Rpb24oZGF0ZSkge1xyXG5cdFx0XHRcdHJldHVybiBkaXNhYmxlZFdlZWtEYXlzLmluY2x1ZGVzKFxyXG5cdFx0XHRcdFx0bW9tZW50KGRhdGUpXHJcblx0XHRcdFx0XHRcdC5kYXkoKVxyXG5cdFx0XHRcdFx0XHQudG9TdHJpbmcoKVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy4kaW5wdXQuZGF0ZXJhbmdlcGlja2VyKG9wdGlvbnMsIGZ1bmN0aW9uKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgbGFiZWwpIHtcclxuXHRcdFx0Ly8gYWZ0ZXIgYSBzZWxlY3Rpb24gaXMgbWFkZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gbm93IHdlIGhhdmUgYSBwcm9wZXIgaW5zdGFuY2VcclxuXHRcdHRoaXMucGlja2VyID0gdGhpcy4kaW5wdXQuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJyk7XHJcblxyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSAkKHRoaXMucGlja2VyLmNvbnRhaW5lcik7XHJcblxyXG5cdFx0aWYgKCEhdGhpcy5jb25maWcuY3NzQ2xhc3MpIHtcclxuXHRcdFx0dGhpcy4kY2FsZW5kYXIuYWRkQ2xhc3ModGhpcy5jb25maWcuY3NzQ2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuJHRpbWVIb2xkZXIgPSB0aGlzLiRjYWxlbmRhci5maW5kKCcuY2FsZW5kYXItdGltZScpO1xyXG5cdFx0dGhpcy4kYnV0dG9uc0hvbGRlciA9IHRoaXMuJGNhbGVuZGFyLmZpbmQoJy5kcnAtYnV0dG9ucycpO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdXRvQXBwbHkpIHtcclxuXHRcdFx0dGhpcy4kYnV0dG9uc0hvbGRlci5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5pc0VtcHR5U3RhcnREYXRlKSB7XHJcblx0XHRcdHRoaXMuY2xlYXIoZmFsc2UpO1xyXG5cdFx0fSBlbHNlIGlmIChjb25maWcuaXNFbXB0eVN0YXJ0SG91cikge1xyXG5cdFx0XHR0aGlzLmlzRW1wdHlIb3VyID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuZW5hYmxlZCkge1xyXG5cdFx0XHR0aGlzLm5hdGl2ZUV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLmN1c3RvbUV2ZW50cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kY2xlYXIuaGlkZSgpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dC5vZmYoJ2NsaWNrIGZvY3VzIGtleWRvd24ga2V5dXAnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHR0aGlzLmhhbmRsZUN1c3RvbVZhbGlkYXRpb24oKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oYW5kbGVDdXN0b21WYWxpZGF0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgZXJyb3JNZXNzYWdlID0gdGhpcy4kaW5wdXQubmV4dCgpLnRleHQoKTtcclxuXHRcdGlmICghIWVycm9yTWVzc2FnZS5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLmFkZENsYXNzKCdOb3RfVmFsaWQnKTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkXHJcblx0XHRcdFx0Lm5leHQoKVxyXG5cdFx0XHRcdC5zaG93KClcclxuXHRcdFx0XHQudGV4dChlcnJvck1lc3NhZ2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLnJlbW92ZUNsYXNzKCdOb3RfVmFsaWQnKTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLm5leHQoKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUubmF0aXZlRXZlbnRzID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ3Nob3dDYWxlbmRhci5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuaGFzR29Ub2RheSkge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdFx0LmZpbmQoJy5jYWxlbmRhci10YWJsZSB0aGVhZCB0cicpXHJcblx0XHRcdFx0XHQuZXEoMClcclxuXHRcdFx0XHRcdC5hZnRlcignPHRyPjx0ZCBjb2xzcGFuPVwiN1wiIGNsYXNzPVwiRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1nb3RvZGF5XCI+JyArICdUb2RheScgKyAnPC90ZD48L3RyPicpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5jb25maWcuZHJvcHMgPT09ICd1cCcpIHtcclxuXHRcdFx0XHRcdF90aGlzLiRjYWxlbmRhci5jc3MoJ3RvcCcsIF90aGlzLiRjYWxlbmRhci5vZmZzZXQoKS50b3AgLSAyNCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmhhbmRsZVZpZXdwb3J0UG9zaXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ3Nob3cuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24oZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLnRpbWVQaWNrZXIgJiYgX3RoaXMuY29uZmlnLmhhc0NsZWFySG91cikge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuY2FsZW5kYXItdGltZScpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJEYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyXCI+PC9zcGFuPicpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5pc0VtcHR5SG91cikge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMC41KTtcclxuXHRcdFx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5oYW5kbGVWaWV3cG9ydFBvc2l0aW9uKCk7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5EYXRlVGltZVJhbmdlUGlja2VyLm9wZW5lZFdpZGdldElkID0gX3RoaXMuY29uZmlnLndpZGdldElkO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignaGlkZS5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpLnJlbW92ZSgpO1xyXG5cdFx0XHRfdGhpcy51cGRhdGVQYXJlbnRJZnJhbWUoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2NhbmNlbC5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignb3V0c2lkZUNsaWNrLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uKGV2ZW50LCBwaWNrZXIpIHt9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCd0aW1lY2hhbmdlZC5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdF90aGlzLmlzRW1wdHlIb3VyID0gZmFsc2U7XHJcblx0XHRcdF90aGlzLiR0aW1lSG9sZGVyLmNzcygnb3BhY2l0eScsIDEpO1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmhhc0NsZWFySG91cikge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuY2FsZW5kYXItdGltZScpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJEYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyXCI+PC9zcGFuPicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuYXV0b0FwcGx5KSB7XHJcblx0XHRcdFx0X3RoaXMuJGNsZWFyLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdjbGlja0RhdGUuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24oZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmF1dG9BcHBseSkge1xyXG5cdFx0XHRcdF90aGlzLiRjbGVhci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0XHRcdF90aGlzLnNlbmROb3RpZmljYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24oZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRfdGhpcy4kY2xlYXIucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdF90aGlzLnNlbmROb3RpZmljYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmN1c3RvbUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGxhYmVsLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRfdGhpcy5waWNrZXIudG9nZ2xlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGNsZWFyLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuaGlkZSgpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRjYWxlbmRhci5vbignY2xpY2snLCAnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy50aW1lUGlja2VyMjRIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQuZmluZCgnLmhvdXJzZWxlY3QnKVxyXG5cdFx0XHRcdFx0LnZhbCgnMCcpXHJcblx0XHRcdFx0XHQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQuZmluZCgnLmhvdXJzZWxlY3QnKVxyXG5cdFx0XHRcdFx0LnZhbCgnMTInKVxyXG5cdFx0XHRcdFx0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdC5maW5kKCcubWludXRlc2VsZWN0JylcclxuXHRcdFx0XHQudmFsKCcwJylcclxuXHRcdFx0XHQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdC5maW5kKCcuYW1wbXNlbGVjdCcpXHJcblx0XHRcdFx0LnZhbCgnQU0nKVxyXG5cdFx0XHRcdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0X3RoaXMuaXNFbXB0eUhvdXIgPSB0cnVlO1xyXG5cdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAwLjUpO1xyXG5cdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIub24oJ2NsaWNrJywgJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWdvdG9kYXknLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0X3RoaXMucGlja2VyLnNldFN0YXJ0RGF0ZShtb21lbnQoKSk7XHJcblx0XHRcdF90aGlzLnBpY2tlci5zZXRFbmREYXRlKG1vbWVudCgpKTtcclxuXHRcdFx0X3RoaXMucGlja2VyLmhpZGUoKTtcclxuXHRcdFx0aWYgKCFfdGhpcy5jb25maWcuYXV0b1VwZGF0ZUlucHV0IHx8IF90aGlzLmNvbmZpZy5oYXNUZXh0VHJpZ2dlciB8fCBfdGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQub24oJ2NsaWNrIGZvY3VzJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0X3RoaXMuJGlucHV0LnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQub24oJ2tleXVwJywgZnVuY3Rpb24oZXZ0KSB7XHJcblx0XHRcdFx0X3RoaXMuJGlucHV0LnZhbChfdGhpcy4kZGlzcGxheWVkLnZhbCgpKS50cmlnZ2VyKCdrZXl1cCcpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdF90aGlzLiRpbnB1dC52YWwoX3RoaXMuJGRpc3BsYXllZC52YWwoKSkudHJpZ2dlcigna2V5ZG93bicpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0ICYmIHRoaXMuY29uZmlnLmFsbG93c1R5cGluZykge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdFx0X3RoaXMuJGRpc3BsYXllZC52YWwoX3RoaXMuJGlucHV0LnZhbCgpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kaW5wdXQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRfdGhpcy51cGRhdGVQYXJlbnRJZnJhbWUoKTtcclxuXHRcdFx0XHR9LCA1MCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnVwZGF0ZUxhYmVsaW5nID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgbGFiZWxNYXNrID0gdGhpcy5jb25maWcuZm9ybWF0TGFiZWw7XHJcblx0XHR2YXIgaW5wdXRNYXNrID0gdGhpcy5jb25maWcuZm9ybWF0SW5wdXQ7XHJcblx0XHRpZiAobW9tZW50KHRoaXMucGlja2VyLnN0YXJ0RGF0ZSkuaXNTYW1lKG1vbWVudCgpLCAnZGF5JykpIHtcclxuXHRcdFx0aWYgKGxhYmVsTWFzay5pbmNsdWRlcygnRCBNTU0gWVlZWScpKSB7XHJcblx0XHRcdFx0bGFiZWxNYXNrID0gbGFiZWxNYXNrLnJlcGxhY2UoJ0QgTU1NIFlZWVknLCAnW1RvZGF5XScpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGxhYmVsTWFzay5pbmNsdWRlcygnRCBNTU0nKSkge1xyXG5cdFx0XHRcdGxhYmVsTWFzayA9IGxhYmVsTWFzay5yZXBsYWNlKCdEIE1NTScsICdbVG9kYXldJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1NvbWV0aGluZyB3cm9uZyB3aXRoIHRoZSBsYWJlbE1hc2snLCBsYWJlbE1hc2spO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0VtcHR5SG91cikge1xyXG5cdFx0XHRsYWJlbE1hc2sgPSBsYWJlbE1hc2sucmVwbGFjZSgnaGg6bW0gQScsICdbLS06LS1dJykucmVwbGFjZSgnSEg6bW0nLCAnWy0tOi0tXScpO1xyXG5cdFx0XHRpbnB1dE1hc2sgPSBpbnB1dE1hc2sucmVwbGFjZSgnaGg6bW0gQScsICdbLS06LS1dJykucmVwbGFjZSgnSEg6bW0nLCAnWy0tOi0tXScpO1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0XHR0aGlzLiRsYWJlbC5odG1sKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQobGFiZWxNYXNrKSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIFswMDowMDowMF0nKSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBbMDA6MDA6MDBdJykpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoaW5wdXRNYXNrKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0XHR0aGlzLiRsYWJlbC5odG1sKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQobGFiZWxNYXNrKSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJykpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGRpc3BsYXllZC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCkpO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW06c3MnKSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcuZm9ybWF0SW5wdXQpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oYW5kbGVWaWV3cG9ydFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoXHJcblx0XHRcdHdpbmRvdy5mcmFtZUVsZW1lbnQgJiZcclxuXHRcdFx0KCQod2luZG93LmZyYW1lRWxlbWVudC5wYXJlbnRFbGVtZW50KS5oYXNDbGFzcygndG9vbHRpcHN0ZXItY29udGVudCcpIHx8XHJcblx0XHRcdFx0JCh3aW5kb3cuZnJhbWVFbGVtZW50LnBhcmVudEVsZW1lbnQpLmhhc0NsYXNzKCdvcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudCcpKVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaXNJblZpZXdwb3J0KCkpIHtcclxuXHRcdFx0dmFyIGNvb3JkcyA9IHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRpZiAodGhpcy4kY2FsZW5kYXIuaGFzQ2xhc3MoJ2Ryb3AtdXAnKSAmJiB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XHJcblx0XHRcdFx0dmFyIHBvaW50ID0gd2luZG93LnNjcm9sbFkgKyBjb29yZHMuYm90dG9tICsgdGhpcy4kaW5wdXQuaGVpZ2h0KCkgKyA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2Ryb3AtdXAnKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdkcm9wLWRvd24nKVxyXG5cdFx0XHRcdFx0LmNzcygndG9wJywgcG9pbnQpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdCF0aGlzLiRjYWxlbmRhci5oYXNDbGFzcygnZHJvcC11cCcpICYmXHJcblx0XHRcdFx0dGhpcy4kY2FsZW5kYXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHR2YXIgcG9pbnQgPSB3aW5kb3cuc2Nyb2xsWSArIGNvb3Jkcy50b3AgLSBjb29yZHMuaGVpZ2h0IC0gdGhpcy4kaW5wdXQuaGVpZ2h0KCkgLSA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyLmFkZENsYXNzKCdkcm9wLXVwJykuY3NzKCd0b3AnLCBwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5pc0luVmlld3BvcnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBib3VuZGluZyA9IHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0Ym91bmRpbmcudG9wID49IDAgJiYgYm91bmRpbmcuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKyA1IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyA1KVxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKHNlbmROb3RpZmljYXRpb24pIHtcclxuXHRcdHRoaXMucGlja2VyLnNldFN0YXJ0RGF0ZShtb21lbnQoKSk7XHJcblx0XHR0aGlzLnBpY2tlci5zZXRFbmREYXRlKG1vbWVudCgpKTtcclxuXHRcdHRoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHRcdHRoaXMuJGNsZWFyLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdHRoaXMuJGxhYmVsLmh0bWwoJy0tIC0tIC0tJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpO1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC52YWwoJycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoc2VuZE5vdGlmaWNhdGlvbiB8fCBzZW5kTm90aWZpY2F0aW9uID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnNlbmROb3RpZmljYXRpb24oZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMucGlja2VyLnNob3coKTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnBpY2tlci5jbGlja0NhbmNlbCgpO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihzZW5kRGF0ZSkge1xyXG5cdFx0aWYgKHRoaXMuJHdpZGdldC5oYXNDbGFzcygnYXR0YWNoZWRJbnB1dCcpKSB7XHJcblx0XHRcdHRoaXMuJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoc2VuZERhdGUgfHwgc2VuZERhdGUgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBbMDA6MDA6MDBdJykgKyAnfCcgKyB0aGlzLmlzRW1wdHlIb3VyXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLmRhdGVUaW1lUmFuZ2VQaWNrZXJGYWtlTm90aWZ5SWQsXHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW06c3MnKSArICd8JyArIHRoaXMuaXNFbXB0eUhvdXJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KFxyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykgKyAnfCcgKyB0aGlzLmlzRW1wdHlIb3VyXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0T3NOb3RpZnlXaWRnZXQodGhpcy5jb25maWcuZGF0ZVRpbWVSYW5nZVBpY2tlckZha2VOb3RpZnlJZCwgJ251bGx8dHJ1ZScpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnVwZGF0ZVBhcmVudElmcmFtZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKHR5cGVvZiBTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lLnJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQoJy5QYWdlLkxheW91dFBvcHVwJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5yZWRyYXdEaWFsb2dXaW5kb3coKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRGF0ZVRpbWVSYW5nZVBpY2tlciA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0YWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBEcmFnRHJvcEFyZWEgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBkcmFnRHJvcEFyZWFXaWRnZXQ7XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcuZHJhZ0Ryb3BBcmVhSWRdID0gbmV3IERyYWdEcm9wQXJlYShjb25maWcpO1xyXG5cdFx0ZHJhZ0Ryb3BBcmVhV2lkZ2V0ID0gd2luZG93W2NvbmZpZy5kcmFnRHJvcEFyZWFJZF07XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLkRyYWdEcm9wQXJlYS5yZWZyZXNoRHJhZ0Ryb3ApO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0dmFyIHJlZnJlc2hEcmFnRHJvcCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0ZHJhZ0Ryb3BBcmVhV2lkZ2V0LnNldHVwRHJhZ2dhYmxlKCk7XHJcblx0XHRkcmFnRHJvcEFyZWFXaWRnZXQuc2V0dXBEcm9wcGFibGUoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgRHJhZ0Ryb3BBcmVhID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLiRhcmVhID0gJCgnIycgKyBjb25maWcuZHJhZ0Ryb3BBcmVhSWQpO1xyXG5cdFx0dGhpcy4kYXJlYS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdHRoaXMuc2tpbiA9IGNvbmZpZy5za2luO1xyXG5cdFx0dGhpcy5mYWtlTm90aWZ5V2lkZ2V0SWQgPSBjb25maWcuZmFrZU5vdGlmeVdpZGdldElkO1xyXG5cdFx0dGhpcy5zZXR1cERyb3BwYWJsZSgpO1xyXG5cdFx0aWYgKGNvbmZpZy5zb3J0YWJsZSkge1xyXG5cdFx0XHR0aGlzLnNldHVwU29ydGFibGUoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0dXBEcmFnZ2FibGUoKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblx0XHR0aGlzLiRhcmVhLmZpbmQoJy5EcmFnRHJvcC1kcm9wcGFibGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRfdGhpcy5oYW5kbGVEcm9wcGFibGUoJCh0aGlzKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREcmFnRHJvcEFyZWEucHJvdG90eXBlLnNldHVwRHJhZ2dhYmxlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLiRhcmVhLmZpbmQoJy5EcmFnRHJvcC1kcmFnZ2FibGUnKS5kcmFnZ2FibGUoe1xyXG5cdFx0XHRkaXNhYmxlZDogdGhpcy5jb25maWcuZGlzYWJsZWQsXHJcblx0XHRcdGNvbnRhaW5tZW50OiB0aGlzLiRhcmVhLFxyXG5cdFx0XHRzY29wZTogdGhpcy5jb25maWcuZHJhZ0Ryb3BBcmVhSWQsXHJcblx0XHRcdGRlbGF5OiAwLFxyXG5cdFx0XHRzY3JvbGw6IHRydWUsXHJcblx0XHRcdHJldmVydDogJ2ludmFsaWQnLFxyXG5cdFx0XHRyZXZlcnREdXJhdGlvbjogMCxcclxuXHRcdFx0Y29ubmVjdFRvU29ydGFibGU6ICcuRHJhZ0Ryb3AtZHJvcHBhYmxlJyxcclxuXHRcdFx0c3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7fSxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdERyYWdEcm9wQXJlYS5wcm90b3R5cGUuc2V0dXBEcm9wcGFibGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRhcmVhLmZpbmQoJy5EcmFnRHJvcC1kcm9wcGFibGUnKS5kcm9wcGFibGUoe1xyXG5cdFx0XHRob3ZlckNsYXNzOiAnaG92ZXJlZCcsXHJcblx0XHRcdGFkZENsYXNzZXM6IHRydWUsXHJcblx0XHRcdGRpc2FibGVkOiB0aGlzLmNvbmZpZy5kaXNhYmxlZCxcclxuXHRcdFx0c2NvcGU6IHRoaXMuY29uZmlnLmRyYWdEcm9wQXJlYUlkLFxyXG5cdFx0XHR0b2xlcmFuY2U6ICdwb2ludGVyJyxcclxuXHRcdFx0ZHJvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcblx0XHRcdFx0aWYgKF90aGlzLnNraW4gPT09ICdUZWFtcycpIHtcclxuXHRcdFx0XHRcdCQodWkuZHJhZ2dhYmxlKS5oaWRlKCk7XHJcblx0XHRcdFx0XHRPc05vdGlmeVdpZGdldChcclxuXHRcdFx0XHRcdFx0JChldmVudC50YXJnZXQpLmRhdGEoJ2Zha2Vub3RpZnknKSxcclxuXHRcdFx0XHRcdFx0dWkuZHJhZ2dhYmxlLmRhdGEoJ2l0ZW10eXBlJykgKyAnfCcgKyB1aS5kcmFnZ2FibGUuZGF0YSgnaXRlbWlkJylcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KFxyXG5cdFx0XHRcdFx0XHQkKGV2ZW50LnRhcmdldCkuZGF0YSgnZmFrZW5vdGlmeScpLFxyXG5cdFx0XHRcdFx0XHRfdGhpcy4kYXJlYS5maW5kKCcuRHJhZ0Ryb3AtZHJhZ2dhYmxlLXBsYWNlaG9sZGVyJykuaW5kZXgoKSArICd8JyArIHVpLmRyYWdnYWJsZS5kYXRhKCdpdGVtaWQnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREcmFnRHJvcEFyZWEucHJvdG90eXBlLnNldHVwU29ydGFibGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuJGFyZWEuZmluZCgnLkRyYWdEcm9wLWRyb3BwYWJsZScpLnNvcnRhYmxlKHtcclxuXHRcdFx0ZGlzYWJsZWQ6IHRoaXMuY29uZmlnLmRpc2FibGVkLFxyXG5cdFx0XHRmb3JjZVBsYWNlaG9sZGVyU2l6ZTogdHJ1ZSxcclxuXHRcdFx0Y29udGFpbm1lbnQ6IHRoaXMuJGFyZWEsXHJcblx0XHRcdHRvbGVyYW5jZTogJ3BvaW50ZXInLFxyXG5cdFx0XHRyZXZlcnQ6IDIwMCxcclxuXHRcdFx0aXRlbXM6ICcuRHJhZ0Ryb3AtZHJvcHBhYmxlLWl0ZW1zIC5EcmFnRHJvcC1kcmFnZ2FibGUnLFxyXG5cdFx0XHRwbGFjZWhvbGRlcjogJ0RyYWdEcm9wLWRyYWdnYWJsZS1wbGFjZWhvbGRlcicsXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREcmFnRHJvcEFyZWEucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGFyZWEub24oJ2NsaWNrJywgJy5EcmFnRHJvcC1kcmFnZ2FibGUnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR2YXIgJGRyYWdnYWJsZSA9ICQoZXZ0LmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHQkZHJhZ2dhYmxlLmZpbmQoJy5EcmFnRHJvcC1kcmFnZ2FibGUtc2VsZWN0LWFjdGlvbiBhJykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0dmFyICRkcm9wcGFibGUgPSAkZHJhZ2dhYmxlLmNsb3Nlc3QoJy5EcmFnRHJvcC1kcm9wcGFibGUnKTtcclxuXHRcdFx0aWYgKCRkcm9wcGFibGUuaGFzQ2xhc3MoJ2FsbG93TXVsdGlwbGUnKSkge1xyXG5cdFx0XHRcdHZhciAkY2hlY2tib3ggPSAkZHJhZ2dhYmxlLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG5cdFx0XHRcdGlmICgkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0XHQkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdCRkcmFnZ2FibGUucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHQkZHJhZ2dhYmxlLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVEcm9wcGFibGUoJGRyb3BwYWJsZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kYXJlYS5vbignY2xpY2snLCAnLkRyYWdEcm9wLWRyYWdnYWJsZS1zZWxlY3QtYWN0aW9uIGEnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RHJhZ0Ryb3BBcmVhLnByb3RvdHlwZS5oYW5kbGVEcm9wcGFibGUgPSBmdW5jdGlvbigkZHJvcHBhYmxlKSB7XHJcblx0XHRpZiAoJGRyb3BwYWJsZS5oYXNDbGFzcygnYWxsb3dNdWx0aXBsZScpKSB7XHJcblx0XHRcdHZhciAkYWN0aW9ucyA9ICRkcm9wcGFibGUuZmluZCgnLkRyYWdEcm9wLWRyb3BwYWJsZS1pbnRybycpO1xyXG5cdFx0XHR2YXIgY2hrU2VsZWN0ZWQgPSAkZHJvcHBhYmxlLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkJykubGVuZ3RoO1xyXG5cdFx0XHRpZiAoY2hrU2VsZWN0ZWQgPiAwKSB7XHJcblx0XHRcdFx0JGFjdGlvbnMuZmluZCgnYSwgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGFjdGlvbnMuZmluZCgnYSwgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JGRyb3BwYWJsZS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5EcmFnRHJvcEFyZWEgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdHJlZnJlc2hEcmFnRHJvcDogcmVmcmVzaERyYWdEcm9wLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IERyb3Bkb3duQ2F0ZWdvcmllcyAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0ZnVuY3Rpb24gb3B0R3JvdXBTZXRWYWx1ZShzZWxlY3RJZCwgaW5wdXRCb3hJZCwgYnV0dG9uSWQpIHtcclxuXHRcdHZhciB2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0SWQpLnZhbHVlO1xyXG5cdFx0JCgnIycgKyBpbnB1dEJveElkKS52YWwodik7XHJcblx0XHQkKCcjJyArIHNlbGVjdElkICsgJyBvcHRpb25bc2VsZWN0ZWRdJykucmVtb3ZlQXR0cignc2VsZWN0ZWQnKTtcclxuXHJcblx0XHRpZiAodiA+IC0xKSB7XHJcblx0XHRcdCQoJyMnICsgc2VsZWN0SWQgKyAnIG9wdGlvblt2YWx1ZT1cIicgKyB2ICsgJ1wiXScpLmF0dHIoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgnIycgKyBidXR0b25JZCkuY2xpY2soKTtcclxuXHRcdCQoJyNzMmlkXycgKyBzZWxlY3RJZCkucmVtb3ZlQ2xhc3MoJ3NlbGVjdDItY29udGFpbmVyLWFjdGl2ZScpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gT3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cChhLCBiKSB7XHJcblx0XHR2YXIgX2UgPSAkKCcjJyArIGEuY29udHJvbHRvdmFsaWRhdGUpO1xyXG5cdFx0dmFyIGlzVmFsaWQgPSBfZS5maW5kKCdvcHRpb25bc2VsZWN0ZWRdJykubGVuZ3RoO1xyXG5cdFx0dmFyIGhhc1NpYmxpbmdfTWFuZGF0b3J5U2VsZWN0MiA9IF9lLnByZXYoJ2Rpdi5zZWxlY3QyLWNvbnRhaW5lci5NYW5kYXRvcnknKS5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKGhhc1NpYmxpbmdfTWFuZGF0b3J5U2VsZWN0Mikge1xyXG5cdFx0XHRpZiAoaXNWYWxpZCkge1xyXG5cdFx0XHRcdF9lLnByZXYoJ2Rpdi5zZWxlY3QyLWNvbnRhaW5lci5NYW5kYXRvcnknKS5yZW1vdmVDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X2UucHJldignZGl2LnNlbGVjdDItY29udGFpbmVyLk1hbmRhdG9yeScpLmFkZENsYXNzKCdOb3RfVmFsaWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpc1ZhbGlkO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYWRkT3B0R3JvdXBWYWxpZGF0b3Iob3B0R3JvdXBFbGVtZW50SWQpIHtcclxuXHRcdE9zUGFnZV9WYWxpZGF0b3JzLnB1c2goe1xyXG5cdFx0XHRjb250cm9sdG92YWxpZGF0ZTogb3B0R3JvdXBFbGVtZW50SWQsXHJcblx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdGVycm9ybWVzc2FnZTogJ1JlcXVpcmVkIGZpZWxkIScsXHJcblx0XHRcdGV2YWx1YXRpb25mdW5jdGlvbjogJ1NhcHBoaXJlV2lkZ2V0cy5Ecm9wZG93bkNhdGVnb3JpZXMuT3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cCcsXHJcblx0XHRcdGluaXRpYWx2YWx1ZTogJycsXHJcblx0XHRcdGlzdmFsaWQ6IHRydWUsXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Ecm9wZG93bkNhdGVnb3JpZXMgPSB7XHJcblx0XHRvcHRHcm91cFNldFZhbHVlLFxyXG5cdFx0T3NDdXN0b21WYWxpZGF0b3JPcHRHcm91cCxcclxuXHRcdGFkZE9wdEdyb3VwVmFsaWRhdG9yLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBEcm9wem9uZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFx0YmluZEV2ZW50cyhjb25maWcpO1xyXG5cclxuXHRcdFx0d2luZG93LkRyb3B6b25lLmF1dG9EaXNjb3ZlciA9IGZhbHNlO1xyXG5cclxuXHRcdFx0Y29uc3QgbXlEcm9wem9uZSA9IG5ldyB3aW5kb3cuRHJvcHpvbmUoY29uZmlnLmhpZGRlbklucHV0Q29udGFpbmVyLCB7XHJcblx0XHRcdFx0Li4uY29uZmlnLFxyXG5cdFx0XHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0bGV0IHByZXZGaWxlO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IGZpbGVzTGlzdCA9IGNvbmZpZy5maWxlc0xpc3QgPyBjb25maWcuZmlsZXNMaXN0LnNwbGl0KCcsJykgOiBbXTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGl0ZW0gb2YgZmlsZXNMaXN0KSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1vY2tGaWxlID0geyBuYW1lOiBpdGVtLCBzaXplOiAxMjM0NTY3OCB9O1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdhZGRlZGZpbGUnLCBtb2NrRmlsZSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGUnLCBtb2NrRmlsZSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZmlsZXMucHVzaChtb2NrRmlsZSk7XHJcblxyXG5cdFx0XHRcdFx0XHQkKGAke2NvbmZpZy5oaWRkZW5JbnB1dENvbnRhaW5lcn0gLmR6LWZpbGVuYW1lYCkuYXR0cigndGl0bGUnLCBpdGVtKTtcclxuXHJcblx0XHRcdFx0XHRcdHByZXZGaWxlID0gbW9ja0ZpbGU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKCtjb25maWcubWF4RmlsZXMgPT09IDEgJiYgY29uZmlnLmlzUmVwbGFjZVByZXZpb3VzKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMub24oJ2FkZGVkZmlsZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwcmV2RmlsZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUZpbGUocHJldkZpbGUpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgJG5vdGlmeUlucHV0ID0gJChgIyR7Y29uZmlnLm5vdGlmeUlucHV0SWR9YCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5vbignc3VjY2VzcycsIGZ1bmN0aW9uKGZpbGUsIHJlc3BvbnNlVGV4dCkge1xyXG5cdFx0XHRcdFx0XHRwcmV2RmlsZSA9IGZpbGU7XHJcblxyXG5cdFx0XHRcdFx0XHQkKGAjJHtjb25maWcubm90aWZ5SW5wdXRJZH0gLmR6LWZpbGVuYW1lYCkuYXR0cigndGl0bGUnLCBmaWxlLm5hbWUpO1xyXG5cdFx0XHRcdFx0XHQkbm90aWZ5SW5wdXQudmFsKHJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdCRub3RpZnlJbnB1dC5jaGFuZ2UoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMub24oJ2Vycm9yJywgZnVuY3Rpb24oZmlsZSwgcmVzcG9uc2VUZXh0KSB7XHJcblx0XHRcdFx0XHRcdHByZXZGaWxlID0gZmlsZTtcclxuXHJcblx0XHRcdFx0XHRcdCRub3RpZnlJbnB1dC52YWwocmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFx0JG5vdGlmeUlucHV0LmNoYW5nZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBiaW5kRXZlbnRzID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHQkKGAjJHtjb25maWcud2lkZ2V0SWR9IC5VcGxvYWRNZXNzYWdlQ2xhc3NgKS5vbignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdCQoYCMke2NvbmZpZy53aWRnZXRJZH0gLmR6LWNsaWNrYWJsZWApLmNsaWNrKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRHJvcHpvbmUgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBFeHBhbmRhYmxlR3JvdXAgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBhbGxFeHBhbmRhYmxlR3JvdXBzID0gW107XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRXhwYW5kYWJsZUdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoYWxsRXhwYW5kYWJsZUdyb3Vwc1tpXS5jb25maWcud2lkZ2V0SWQgPT09IGNvbmZpZy53aWRnZXRJZCkge1xyXG5cdFx0XHRcdGFsbEV4cGFuZGFibGVHcm91cHMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBFeHBhbmRhYmxlR3JvdXAoY29uZmlnKTtcclxuXHRcdGFsbEV4cGFuZGFibGVHcm91cHMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGFsbEV4cGFuZGFibGVHcm91cHMgPSBTYXBwaGlyZVdpZGdldHMuRXhwYW5kYWJsZUdyb3VwLmFsbCgpO1xyXG5cdFx0XHRcdGFsbEV4cGFuZGFibGVHcm91cHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuRXhwYW5kYWJsZUdyb3VwLmNyZWF0ZShlbGVtZW50LmNvbmZpZyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0dmFyIEV4cGFuZGFibGVHcm91cCA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRpdGVtcyA9IHRoaXMuJHdpZGdldC5maW5kKCcuRXhwYW5kYWJsZUdyb3VwSXRlbScpO1xyXG5cdFx0dGhpcy4kaXRlbXMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0d2luZG93WyQodGhpcykuYXR0cignaWQnKV0gPSBuZXcgRXhwYW5kYWJsZUdyb3VwSXRlbSgkKHRoaXMpLCBfdGhpcyk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHR2YXIgRXhwYW5kYWJsZUdyb3VwSXRlbSA9IGZ1bmN0aW9uKCRpdGVtLCBncm91cCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuZ3JvdXAgPSBncm91cDtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICRpdGVtO1xyXG5cdFx0dGhpcy4kY29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuRXhwYW5kYWJsZUdyb3VwSXRlbS1jb250ZW50Jyk7XHJcblx0XHR0aGlzLiR3aWRnZXQub2ZmKCdjbGljaycpLm9uKCdjbGljaycsICcuRXhwYW5kYWJsZUdyb3VwSXRlbS1oZWFkZXInLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKF90aGlzLiR3aWRnZXQuaGFzQ2xhc3MoJ2lzT3BlbicpKSB7XHJcblx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRfdGhpcy5ncm91cC5jbG9zZUFsbCgpO1xyXG5cdFx0XHRcdF90aGlzLm9wZW4oKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLlJlc2l6ZVBhcmVudElmcmFtZSkge1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5SZXNpemVQYXJlbnRJZnJhbWUucmVzaXplKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdEV4cGFuZGFibGVHcm91cC5wcm90b3R5cGUuY2xvc2VBbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuJGl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdHdpbmRvd1skKHRoaXMpLmF0dHIoJ2lkJyldLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRFeHBhbmRhYmxlR3JvdXBJdGVtLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdH07XHJcblxyXG5cdEV4cGFuZGFibGVHcm91cEl0ZW0ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLiR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5FeHBhbmRhYmxlR3JvdXAgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBhbGxFeHBhbmRhYmxlR3JvdXBzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBFeHBhbmRhYmxlTGluayAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSB3aWRnZXRJRCA9PiB7XHJcblx0XHRjb25zdCAkZWxlbWVudFdyYXBwZXIgPSAkKGAjJHt3aWRnZXRJRH1gKTtcclxuXHJcblx0XHRpZiAoJGVsZW1lbnRXcmFwcGVyLnBhcmVudCgnLkV4cGFuZGFibGVMaXN0JykuaGFzQ2xhc3MoJ0hpZGVXaGVuRW1wdHknKSkge1xyXG5cdFx0XHRjb25zdCB0ZXh0ID0gJGVsZW1lbnRXcmFwcGVyLmZpbmQoJy5FeHBhbmRhYmxlTGlua19fQ29udGVudCcpLnRleHQoKTtcclxuXHJcblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gMCkgJGVsZW1lbnRXcmFwcGVyLnBhcmVudCgnLkV4cGFuZGFibGVMaXN0JykuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJpbmRFdmVudHMod2lkZ2V0SUQpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGJpbmRFdmVudHMgPSB3aWRnZXRJRCA9PiB7XHJcblx0XHQkKGAjJHt3aWRnZXRJRH0gLkV4cGFuZGFibGVMaW5rX19IZWFkZXJgKS5jbGljaygoKSA9PiBvcGVuQ2xvc2UoYCMke3dpZGdldElEfWApKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBvcGVuQ2xvc2UgPSBlbGVtZW50SUQgPT4gJChlbGVtZW50SUQpLnRvZ2dsZUNsYXNzKCdFeHBhbmRhYmxlTGluay0tZXhwYW5kZWQnKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkV4cGFuZGFibGVMaW5rID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBGdWxsU2NyZWVuVGFic1dyYXBwZXIgKi9cclxuU2FwcGhpcmVXaWRnZXRzLkZ1bGxTY3JlZW5UYWJzV3JhcHBlciA9ICgpID0+IHtcclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQoJy5UYWJXcmFwcGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICR3cmFwcGVyID0gJCh0aGlzKS5jbG9zZXN0KCcuRnVsbFNjcmVlblRhYnNXcmFwcGVyX19UYWJzJyk7XHJcblx0XHRcdCR3cmFwcGVyLmZpbmQoJyonKS5yZW1vdmVDbGFzcygnQWN0aXZlJyk7XHJcblxyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdBY3RpdmUnKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgR2VuZXJpY0dhbGxlcnkgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XHJcblx0fTtcclxuXHJcblx0dmFyIEdlbmVyaWNHYWxsZXJ5ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIHRoaXMuY29uZmlnLndpZGdldElkKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdHRoaXMuZXF1YWxIZWlnaHQgPSB0aGlzLmNvbmZpZy5lcXVhbEhlaWdodDtcclxuXHRcdGlmICh0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQgPiBzcGFuJykubGVuZ3RoID09PSAxICYmIHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4nKS5oYXNDbGFzcygnTGlzdFJlY29yZHMnKSkge1xyXG5cdFx0XHR0aGlzLiRnYWxsZXJ5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1jb250ZW50ID4gc3Bhbi5MaXN0UmVjb3JkcycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kZ2FsbGVyeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuJGdhbGxlcnkuY3NzKHtcclxuXHRcdFx0J2Rpc3BsYXknOiAnZ3JpZCcsXHJcblx0XHRcdCdncmlkVGVtcGxhdGVDb2x1bW5zJzogJ3JlcGVhdCgnICsgdGhpcy5jb25maWcuY29sdW1uU2l6aW5nICsgJywgbWlubWF4KCcgKyB0aGlzLmNvbmZpZy5jb2x1bW5NaW5XaWR0aCArICcsIDFmcikpJ1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy4kZ2FsbGVyeUl0ZW1zID0gdGhpcy4kZ2FsbGVyeS5jaGlsZHJlbigpO1xyXG5cdFx0dGhpcy4kZ2FsbGVyeUl0ZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoISQodGhpcykuaGFzQ2xhc3MoJ0dlbmVyaWNHYWxsZXJ5LWl0ZW0nKSkge1xyXG5cdFx0XHRcdCQodGhpcykud3JhcCgnPGRpdiBjbGFzcz1cIkdlbmVyaWNHYWxsZXJ5LWl0ZW1cIj48L2Rpdj4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkdlbmVyaWNHYWxsZXJ5ID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGVcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBHZW5lcmljR3JpZCAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBhbGxHZW5lcmljR3JpZHMgPSBbXTtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEdlbmVyaWNHcmlkKGNvbmZpZyk7XHJcblx0XHRhbGxHZW5lcmljR3JpZHMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblx0fTtcclxuXHJcblx0dmFyIEdlbmVyaWNHcmlkID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5jb25maWcpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5HZW5lcmljR3JpZCA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IEhvcml6b250YWxUb29sYmFyICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHRjb25zdCAkd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IGluaXQoJHdpZGdldCwgY29uZmlnKSk7XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5pc0Fycm93TmF2aWdhdGlvbikge1xyXG5cdFx0XHQkKHdpbmRvdykubG9hZCgoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgJGl0ZW1XcmFwcGVyID0gJHdpZGdldC5maW5kKCcuTWVudUl0ZW1XcmFwcGVyLkFjdGl2ZScpO1xyXG5cdFx0XHRcdGlmICgkaXRlbVdyYXBwZXIubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHQkaXRlbVdyYXBwZXJbMF0uc2Nyb2xsSW50b1ZpZXcoe1xyXG5cdFx0XHRcdFx0XHRiZWhhdmlvcjogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0XHRibG9jazogJ2VuZCcsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IGluaXQgPSAoJHdpZGdldCwgY29uZmlnKSA9PiB7XHJcblx0XHRpZiAoY29uZmlnLmlzQXJyb3dOYXZpZ2F0aW9uKSB7XHJcblx0XHRcdGhhbmRsZUFycm93cygkd2lkZ2V0KTtcclxuXHJcblx0XHRcdGNvbnN0ICR0b29sYmFySXRlbXMgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcycpO1xyXG5cdFx0XHRjb25zdCAkbGlzdEl0ZW1zID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fSXRlbXMgLkxpc3RSZWNvcmRzJyk7XHJcblx0XHRcdGNvbnN0ICRidG5SaWdodCA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX3JpZ2h0QnRuJyk7XHJcblx0XHRcdGNvbnN0ICRidG5MZWZ0ID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fbGVmdEJ0bicpO1xyXG5cclxuXHRcdFx0JHRvb2xiYXJJdGVtcy5zY3JvbGwoKCkgPT4gaGFuZGxlQXJyb3dzKCR3aWRnZXQpKTtcclxuXHJcblx0XHRcdCRidG5SaWdodC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudFNjcm9sbCA9ICR0b29sYmFySXRlbXMuc2Nyb2xsTGVmdCgpO1xyXG5cdFx0XHRcdHZhciBtYXhTY3JvbGxsID0gJGxpc3RJdGVtcy53aWR0aCgpIC0gJHRvb2xiYXJJdGVtcy53aWR0aCgpO1xyXG5cdFx0XHRcdHZhciBzaWRlV2lkdGggPSBtYXhTY3JvbGxsIC0gNTA7XHJcblx0XHRcdFx0JHRvb2xiYXJJdGVtcy5zY3JvbGxMZWZ0KGN1cnJlbnRTY3JvbGwgKyA1MCk7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50U2Nyb2xsID09IHNpZGVXaWR0aCkgJGJ0blJpZ2h0LmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHRcdGlmIChjdXJyZW50U2Nyb2xsICE9IDUwKSAkYnRuTGVmdC5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkYnRuTGVmdC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudFNjcm9sbCA9ICR0b29sYmFySXRlbXMuc2Nyb2xsTGVmdCgpO1xyXG5cdFx0XHRcdHZhciBtYXhTY3JvbGxsID0gJGxpc3RJdGVtcy53aWR0aCgpIC0gJHRvb2xiYXJJdGVtcy53aWR0aCgpO1xyXG5cdFx0XHRcdHZhciBzaWRlV2lkdGggPSBtYXhTY3JvbGxsIC0gNTA7XHJcblx0XHRcdFx0JHRvb2xiYXJJdGVtcy5zY3JvbGxMZWZ0KGN1cnJlbnRTY3JvbGwgLSA1MCk7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50U2Nyb2xsICE9IHNpZGVXaWR0aCkgJGJ0blJpZ2h0LnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHRcdGlmIChjdXJyZW50U2Nyb2xsID09IDUwKSAkYnRuTGVmdC5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZS50b29sYmFyJywgKCkgPT4gaGFuZGxlQXJyb3dzKCR3aWRnZXQpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZVJlc2l6ZSgkd2lkZ2V0KTtcclxuXHRcdFx0YmluZEV2ZW50c0NsaWNrKCR3aWRnZXQpO1xyXG5cclxuXHRcdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUudG9vbGJhcicsICgpID0+IGhhbmRsZVJlc2l6ZSgkd2lkZ2V0KSk7XHJcblxyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignVG9vbGJhckZpeGVkJywgKCkgPT4gaGFuZGxlUmVzaXplKCR3aWRnZXQpLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0aGFuZGxlQXJyb3dzID0gJHdpZGdldCA9PiB7XHJcblx0XHRjb25zdCAkdG9vbGJhckl0ZW1zID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fSXRlbXMnKTtcclxuXHRcdGNvbnN0ICRsaXN0SXRlbXMgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcyAuTGlzdFJlY29yZHMnKTtcclxuXHRcdGNvbnN0ICRidG5SaWdodCA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX3JpZ2h0QnRuJyk7XHJcblx0XHRjb25zdCAkYnRuTGVmdCA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX2xlZnRCdG4nKTtcclxuXHJcblx0XHRsZXQgY3VycmVudFNjcm9sbCA9ICR0b29sYmFySXRlbXMuc2Nyb2xsTGVmdCgpO1xyXG5cdFx0bGV0IG1lbnVXaWR0aCA9ICRsaXN0SXRlbXMud2lkdGgoKTtcclxuXHRcdGxldCBleHRlcm5hbFdpZHRoID0gJHRvb2xiYXJJdGVtcy53aWR0aCgpO1xyXG5cdFx0dmFyIG1heFNjcm9sbGwgPSBtZW51V2lkdGggLSBleHRlcm5hbFdpZHRoO1xyXG5cclxuXHRcdGlmIChleHRlcm5hbFdpZHRoID4gbWVudVdpZHRoKSB7XHJcblx0XHRcdCRidG5MZWZ0LmhpZGUoKTtcclxuXHRcdFx0JGJ0blJpZ2h0LmhpZGUoKTtcclxuXHJcblx0XHRcdCR3aWRnZXQuZmluZCgnLlRvb2xiYXJfY29udGFpbmVyJykuYWRkQ2xhc3MoJ1Rvb2xiYXJfY29udGFpbmVyLS1ub2Fycm93cycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JGJ0bkxlZnQuc2hvdygpO1xyXG5cdFx0XHQkYnRuUmlnaHQuc2hvdygpO1xyXG5cclxuXHRcdFx0JHdpZGdldC5maW5kKCcuVG9vbGJhcl9jb250YWluZXInKS5yZW1vdmVDbGFzcygnVG9vbGJhcl9jb250YWluZXItLW5vYXJyb3dzJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRTY3JvbGwgPT09IDApICRidG5MZWZ0LmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0ZWxzZSAkYnRuTGVmdC5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHJcblx0XHRpZiAoY3VycmVudFNjcm9sbCA+PSBtYXhTY3JvbGxsKSAkYnRuUmlnaHQuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRlbHNlICRidG5SaWdodC5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHR9O1xyXG5cclxuXHRoYW5kbGVSZXNpemUgPSAkd2lkZ2V0ID0+IHtcclxuXHRcdGxldCBpdGVtc1RvdGFsID0gMDtcclxuXHRcdGxldCBoYXNJdGVtc0hpZGRlbiA9IGZhbHNlO1xyXG5cclxuXHRcdGNvbnN0ICRsaXN0SXRlbXMgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcyAuTGlzdFJlY29yZHMnKTtcclxuXHRcdCRsaXN0SXRlbXMuZmluZCgnPiBhW3VpXScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG5cdFx0Y29uc3QgbWVudVdpZHRoID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fSXRlbXMnKS5vdXRlcldpZHRoKHRydWUpO1xyXG5cclxuXHRcdCRsaXN0SXRlbXMuZmluZCgnYVt1aV0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpdGVtc1RvdGFsICs9IHBhcnNlSW50KCQodGhpcykub3V0ZXJXaWR0aCh0cnVlKSwgMTApO1xyXG5cclxuXHRcdFx0aWYgKGl0ZW1zVG90YWwgKyA5MCA8IG1lbnVXaWR0aCkge1xyXG5cdFx0XHRcdCQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aGFzSXRlbXNIaWRkZW4gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChoYXNJdGVtc0hpZGRlbiAmJiAhJGxpc3RJdGVtcy5maW5kKCcuVG9vbGJhcl9fTW9yZU9wdGlvbnMnKS5sZW5ndGgpIHtcclxuXHRcdFx0JHdpZGdldFxyXG5cdFx0XHRcdC5maW5kKCcuVG9vbGJhcl9fTW9yZU9wdGlvbnMnKVxyXG5cdFx0XHRcdC5jbG9uZSgpXHJcblx0XHRcdFx0LmNzcygnZGlzcGxheScsICdibG9jaycpXHJcblx0XHRcdFx0LmFwcGVuZFRvKCRsaXN0SXRlbXMpO1xyXG5cclxuXHRcdFx0aGFzSXRlbXNIaWRkZW4gPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCAkb3B0aW9uc0xpc3QgPSAkd2lkZ2V0LmZpbmQoJy5Ub29sYmFyX19JdGVtcyAuVG9vbGJhcl9fTW9yZU9wdGlvbnNMaXN0Jyk7XHJcblxyXG5cdFx0JGxpc3RJdGVtcy5maW5kKCcuVG9vbGJhcl9fTW9yZU9wdGlvbnMnKS5jc3MoJ2Rpc3BsYXknLCAkb3B0aW9uc0xpc3QubGVuZ3RoID8gJ2Jsb2NrJyA6ICdub25lJyk7XHJcblxyXG5cdFx0Y29uc3QgJGhpZGRlbkl0ZW1zID0gJGxpc3RJdGVtcy5maW5kKCc+IGFbdWldJykuZmlsdGVyKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PSAnbm9uZSc7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkb3B0aW9uc0xpc3QuZW1wdHkoKTtcclxuXHJcblx0XHRjb25zdCBoYXNOb3RpZmljYXRpb25IaWRkZW4gPSAkaGlkZGVuSXRlbXMuZmluZCgnLk1lbnVJdGVtV3JhcHBlcl9CYWRnZTpub3QoOmVtcHR5KScpLmxlbmd0aCAhPT0gMDtcclxuXHRcdGNvbnN0ICR0cmlnZ2VyID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fSXRlbXMgLlRvb2xiYXJfX01vcmVPcHRpb25zSWNvbicpO1xyXG5cclxuXHRcdGlmIChoYXNOb3RpZmljYXRpb25IaWRkZW4pICR0cmlnZ2VyLmFkZENsYXNzKCdUb29sYmFyX19Nb3JlT3B0aW9uc0ljb24tLW5vdGlmaWNhdGlvbicpO1xyXG5cdFx0ZWxzZSAkdHJpZ2dlci5yZW1vdmVDbGFzcygnVG9vbGJhcl9fTW9yZU9wdGlvbnNJY29uLS1ub3RpZmljYXRpb24nKTtcclxuXHJcblx0XHQkaGlkZGVuSXRlbXNcclxuXHRcdFx0LmNsb25lKClcclxuXHRcdFx0LmNzcygnZGlzcGxheScsICdibG9jaycpXHJcblx0XHRcdC5hcHBlbmRUbygkb3B0aW9uc0xpc3QpO1xyXG5cdH07XHJcblxyXG5cdGJpbmRFdmVudHNDbGljayA9ICR3aWRnZXQgPT4ge1xyXG5cdFx0Y29uc3QgJG1vcmVPcHRpb25zID0gJHdpZGdldC5maW5kKCcuVG9vbGJhcl9fSXRlbXMgLlRvb2xiYXJfX01vcmVPcHRpb25zJyk7XHJcblx0XHRjb25zdCAkdHJpZ2dlciA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX0l0ZW1zIC5Ub29sYmFyX19Nb3JlT3B0aW9uc0ljb24nKTtcclxuXHRcdGNvbnN0ICRvcHRpb25zTGlzdCA9ICR3aWRnZXQuZmluZCgnLlRvb2xiYXJfX01vcmVPcHRpb25zTGlzdCcpO1xyXG5cclxuXHRcdCR0cmlnZ2VyLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuXHRcdFx0JG1vcmVPcHRpb25zLnRvZ2dsZUNsYXNzKCdUb29sYmFyX19Nb3JlT3B0aW9ucy0tb3BlbicpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRvcHRpb25zTGlzdC5vbignbW91c2V3aGVlbCcsIGV2ZW50ID0+IHtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ21vdXNldXAnLCBldmVudCA9PiB7XHJcblx0XHRcdGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50cygpO1xyXG5cclxuXHRcdFx0aWYgKCEkdGFyZ2V0LmFuZFNlbGYoKS5pcygkbW9yZU9wdGlvbnMpKSB7XHJcblx0XHRcdFx0JG1vcmVPcHRpb25zLnJlbW92ZUNsYXNzKCdUb29sYmFyX19Nb3JlT3B0aW9ucy0tb3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuSG9yaXpvbnRhbFRvb2xiYXIgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBIb3VyUGlja2VyICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNsYXNzIEhvdXJQaWNrZXIge1xyXG5cdFx0Y29uc3RydWN0b3IoY29uZmlnKSB7XHJcblx0XHRcdC8vIE9wdGlvbnMgdXNlZCBieSBqUXVlcnkgVGltZXJwaWNrZXIgKEV4dGVybmFsIExpYilcclxuXHRcdFx0dGhpcy5vcHRpb25zID0ge1xyXG5cdFx0XHRcdC4uLmNvbmZpZyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Ib3VyUGlja2VyLmFsbEludGFuY2VzLnB1c2goY29uZmlnLndpZGdldElkKTtcclxuXHJcblx0XHRcdHRoaXMub25Db21wb25lbnRJbml0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aXNDb21wb25lbnRWYWxpZCgpIHtcclxuXHRcdFx0bGV0IHZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0bGV0IG1lc3NhZ2UgPSBgQ29tcG9uZW50IEhvdXJQaWNrZXIgKCR7dGhpcy5vcHRpb25zLndpZGdldElkfSk6YDtcclxuXHRcdFx0bGV0IGVycm9ycyA9ICcnO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuJG1vZGVsLmxlbmd0aCAmJiB0aGlzLiRtb2RlbC5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0ZXJyb3JzID0gYCR7ZXJyb3JzfSAtIE5lZWRzIG9uZSAtIGFuZCBqdXN0IG9uZSAtIElucHV0IGVsZW1lbnQuYDtcclxuXHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuJG1vZGVsLmxlbmd0aCAmJiB0aGlzLiRjb21wb25lbnQuZmluZCgnLkhvdXJQaWNrZXJfX1BsYWNlaG9sZGVyIGlucHV0JykubGVuZ3RoKSB7XHJcblx0XHRcdFx0ZXJyb3JzID0gYCR7ZXJyb3JzfVxcbiAtIFRoZSBJbnB1dCBlbGVtZW50IG11c3QgYmUgb2YgdHlwZSBUZXh0LmA7XHJcblx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCF2YWxpZCkgY29uc29sZS5lcnJvcihgJHttZXNzYWdlfSAke2Vycm9yc31gKTtcclxuXHJcblx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRDb21wb25lbnRQb3NpdGlvbigpIHtcclxuXHRcdFx0Y29uc3QgJHdpZGdldCA9ICQoJy51aS10aW1lcGlja2VyLWNvbnRhaW5lcicpO1xyXG5cdFx0XHRjb25zdCBsYWJlbExlZnQgPSB0aGlzLiRsYWJlbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0XHRjb25zdCBsYWJlbFdpZHRoID0gdGhpcy4kbGFiZWwud2lkdGgoKTtcclxuXHRcdFx0Y29uc3QgbGFiZWxPdXRlcldpZHRoID0gdGhpcy4kbGFiZWwub3V0ZXJXaWR0aCgpO1xyXG5cdFx0XHRjb25zdCB3aWRnZXRPdXRlcldpZHRoID0gJHdpZGdldC5vdXRlcldpZHRoKCk7XHJcblx0XHRcdGNvbnN0IHdpZGdldE1pbldpZHRoID0gKyR3aWRnZXQuY3NzKCdtaW4td2lkdGgnKS5yZXBsYWNlKCdweCcsICcnKTtcclxuXHRcdFx0Y29uc3QgaXNPdXRzaWRlV2luZG93ID1cclxuXHRcdFx0XHRsYWJlbExlZnQgKyBsYWJlbE91dGVyV2lkdGggPiAkKHdpbmRvdykuc2Nyb2xsTGVmdCgpICsgJCh3aW5kb3cpLndpZHRoKCkgLSB3aWRnZXRPdXRlcldpZHRoO1xyXG5cclxuXHRcdFx0JHdpZGdldC5jc3Moe1xyXG5cdFx0XHRcdGxlZnQ6ICgpID0+IHtcclxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGxhYmVsTGVmdCAtICh3aWRnZXRNaW5XaWR0aCAtIGxhYmVsV2lkdGgpIC8gMjtcclxuXHJcblx0XHRcdFx0XHRpZiAoaXNPdXRzaWRlV2luZG93KSB2YWx1ZSA9IGxhYmVsTGVmdCArIGxhYmVsV2lkdGggLSB3aWRnZXRPdXRlcldpZHRoO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IGxhYmVsTGVmdDtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0RWxlbWVudENsYXNzKHNlbGVjdG9yLCBjbGFzc05hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZSA/ICQoc2VsZWN0b3IpLmFkZENsYXNzKGNsYXNzTmFtZSkgOiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWZpbmVUaW1lRm9ybWF0KCkge1xyXG5cdFx0XHRsZXQgZm9ybWF0ID0gW107XHJcblx0XHRcdGxldCBhbVBtID0gJyc7XHJcblxyXG5cdFx0XHRmb3JtYXQucHVzaCh0aGlzLm9wdGlvbnMuaXMyNGhGb3JtYXQgPyAnSEgnIDogJ2hoJyk7XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuc2hvd01pbnV0ZXMpIGZvcm1hdC5wdXNoKCdtbScpO1xyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnNob3dTZWNvbmRzKSBmb3JtYXQucHVzaCgnc3MnKTtcclxuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMuaXMyNGhGb3JtYXQpIGFtUG0gPSAnIHAnO1xyXG5cclxuXHRcdFx0cmV0dXJuIGAke2Zvcm1hdC5qb2luKCc6Jyl9JHthbVBtfWA7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udmVydFRpbWUxMnRvMjQodmFsdWUpIHtcclxuXHRcdFx0Y29uc3QgW3RpbWUsIG1vZGlmaWVyXSA9IHZhbHVlLnNwbGl0KCcgJyk7XHJcblx0XHRcdGxldCBbaG91cnMsIG1pbnV0ZXMgPSAnMDAnLCBzZWNvbmRzID0gJzAwJ10gPSB0aW1lLnNwbGl0KCc6Jyk7XHJcblxyXG5cdFx0XHRpZiAoaG91cnMgPT09ICcxMicpIGhvdXJzID0gJzAwJztcclxuXHRcdFx0aWYgKG1vZGlmaWVyID09PSAnUE0nKSBob3VycyA9IHBhcnNlSW50KGhvdXJzLCAxMCkgKyAxMjtcclxuXHJcblx0XHRcdHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9YDtcclxuXHRcdH1cclxuXHJcblx0XHRjb252ZXJ0VGltZUZvcm1hdFRvTWFzayh2YWx1ZSA9ICcnKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bYS16QS1aXSsvZywgJy0tJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25DaGFuZ2VFdmVudCh2YWx1ZSA9ICcnKSB7XHJcblx0XHRcdGxldCBtb2RlbCA9ICcwMS0wMS0xOTAwIDAwOjAwOjAwJzsgLy9pLmUuIG51bGxcclxuXHRcdFx0bGV0IGxhYmVsID0gdGhpcy5jb252ZXJ0VGltZUZvcm1hdFRvTWFzayh0aGlzLm9wdGlvbnMudGltZUZvcm1hdCk7XHJcblxyXG5cdFx0XHRpZiAodmFsdWUgJiYgISF2YWx1ZS50cmltKCkpIHtcclxuXHRcdFx0XHRtb2RlbCA9IHRoaXMub3B0aW9ucy5pczI0aEZvcm1hdCA/IHZhbHVlIDogdGhpcy5jb252ZXJ0VGltZTEydG8yNCh2YWx1ZSk7XHJcblx0XHRcdFx0bGFiZWwgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc05vdGlmeUVuYWJsZWQpIE9zTm90aWZ5V2lkZ2V0KHRoaXMub3B0aW9ucy5ob3VyUGlja2VyRmFrZU5vdGlmeUlkLCBtb2RlbCk7XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuaXNUZXh0VHJpZ2dlcmFibGUpIHRoaXMuJGxhYmVsLnRleHQobGFiZWwpO1xyXG5cclxuXHRcdFx0dGhpcy4kbW9kZWwudmFsKG1vZGVsKTtcclxuXHRcdFx0dGhpcy4kbW9kZWwuY2hhbmdlKCk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0b25Db21wb25lbnRJbml0KCkge1xyXG5cdFx0XHR0aGlzLiRjb21wb25lbnQgPSAkKGAjJHt0aGlzLm9wdGlvbnMud2lkZ2V0SWR9YCk7XHJcblx0XHRcdHRoaXMuJG1vZGVsID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5Ib3VyUGlja2VyX19QbGFjZWhvbGRlciBpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dCA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCcuSG91clBpY2tlcl9fRGlzcGxheWVkIC5Ib3VyUGlja2VyX19JbnB1dFZhbHVlJyk7XHJcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSB0aGlzLiRpbnB1dDtcclxuXHJcblx0XHRcdHRoaXMub3B0aW9ucy50aW1lRm9ybWF0ID0gdGhpcy5kZWZpbmVUaW1lRm9ybWF0KCk7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuaXNDb21wb25lbnRWYWxpZCgpKSByZXR1cm47XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0ICRjb250YWluZXIgPSB0aGlzLiRjb21wb25lbnQuZmluZCgnZGl2LkhvdXJQaWNrZXInKTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc1RleHRUcmlnZ2VyYWJsZSkge1xyXG5cdFx0XHRcdFx0JGNvbnRhaW5lci5hZGRDbGFzcygnSG91clBpY2tlci0tdGV4dFRyaWdnZXInKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLiRsYWJlbCA9ICRjb250YWluZXIuZmluZCgnLkhvdXJQaWNrZXJfX0Rpc3BsYXllZCAuSG91clBpY2tlcl9fTGFiZWxWYWx1ZScpO1xyXG5cdFx0XHRcdFx0dGhpcy4kZWxlbWVudCA9IHRoaXMuJGxhYmVsO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJGxhYmVsLnRleHQodGhpcy5jb252ZXJ0VGltZUZvcm1hdFRvTWFzayh0aGlzLm9wdGlvbnMudGltZUZvcm1hdCkpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJGxhYmVsLm9uKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kbGFiZWwudGltZXBpY2tlcigpLm9wZW4oKTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0Q29tcG9uZW50UG9zaXRpb24oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc0NsZWFyYWJsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy4kYnV0dG9uQ2xlYXIgPSAkY29udGFpbmVyLmZpbmQoJy5Ib3VyUGlja2VyX19EaXNwbGF5ZWQgLkhvdXJQaWNrZXJfX0J1dHRvbkNsZWFyJyk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4kYnV0dG9uQ2xlYXIub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLm9uQ2hhbmdlRXZlbnQoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC50aW1lcGlja2VyKHtcclxuXHRcdFx0XHRcdC4uLnRoaXMub3B0aW9ucyxcclxuXHRcdFx0XHRcdGNoYW5nZTogdGltZSA9PiB0aGlzLm9uQ2hhbmdlRXZlbnQodGltZSA/ICQoKS50aW1lcGlja2VyLmZvcm1hdFRpbWUodGhpcy5vcHRpb25zLnRpbWVGb3JtYXQsIHRpbWUpIDogbnVsbCksXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2V0RWxlbWVudENsYXNzKCcudWktdGltZXBpY2tlci1jb250YWluZXInLCB0aGlzLm9wdGlvbnMuY3VycmVudExvY2FsZSA9PT0gJ0FSJyA/ICdydGwnIDogJ2x0cicpO1xyXG5cclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScsICF0aGlzLm9wdGlvbnMuaXNUeXBlRW5hYmxlZCk7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncGxhY2Vob2xkZXInLCB0aGlzLm9wdGlvbnMudGltZUZvcm1hdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBIb3VyUGlja2VyKGNvbmZpZyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkhvdXJQaWNrZXIgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRhbGxJbnRhbmNlczogW10sXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBJbnB1dExBU0EgKi9cclxuKGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzZXR1cElucHV0ID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHQkKCdib2R5Jykub2ZmKCdjbGljaycsICcjJyArIGNvbmZpZy5sYWJlbElkKTtcclxuXHRcdCQoJ2JvZHknKS5vZmYoJ2JsdXIgY2hhbmdlIGlucHV0JywgJyMnICsgY29uZmlnLmlucHV0SWQpO1xyXG5cclxuXHRcdCQoJyMnICsgY29uZmlnLmlucHV0SWQpLmNzcygnd2lkdGgnLCAnMTAwJScpO1xyXG5cdFx0JCgnIycgKyBjb25maWcubGFiZWxJZCkuY3NzKCd3aWR0aCcsICcxMDAlJyk7XHJcblxyXG5cdFx0JCgnIycgKyBjb25maWcuaW5wdXRJZCkuaGlkZSgpO1xyXG5cdFx0JCgnIycgKyBjb25maWcubGFiZWxJZCkuc2hvdygpO1xyXG5cclxuXHRcdFNhcHBoaXJlV2lkZ2V0cy5NYXJrV29yZHNGcm9tTGlzdC5oYW5kbGVQcm9tcHQoY29uZmlnKTtcclxuXHJcblx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJyMnICsgY29uZmlnLmxhYmVsSWQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIGNvbmZpZy5sYWJlbElkKS5oaWRlKCk7XHJcblx0XHRcdCQoJyMnICsgY29uZmlnLmlucHV0SWQpLnNob3coKTtcclxuXHRcdFx0JCgnIycgKyBjb25maWcuaW5wdXRJZCkuZm9jdXMoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5vbignYmx1cicsICcjJyArIGNvbmZpZy5pbnB1dElkLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLk1hcmtXb3Jkc0Zyb21MaXN0LmhhbmRsZVByb21wdChjb25maWcpO1xyXG5cdFx0XHQkKCcjJyArIGNvbmZpZy5pbnB1dElkKS5oaWRlKCk7XHJcblx0XHRcdCQoJyMnICsgY29uZmlnLmxhYmVsSWQpLnNob3coKTtcclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLk1hcmtXb3Jkc0Zyb21MaXN0LmhhbmRsZVByb21wdChjb25maWcpO1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5NYXJrV29yZHNGcm9tTGlzdC5hcHBseU1hcmtpbmcoeyB0YXJnZXQ6IGNvbmZpZy5sYWJlbElkIH0pO1xyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnYm9keScpLm9uKCdjaGFuZ2UgaW5wdXQnLCAnIycgKyBjb25maWcuaW5wdXRJZCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyMnICsgY29uZmlnLmxhYmVsSWQpLnRleHQoJCgnIycgKyBjb25maWcuaW5wdXRJZCkudmFsKCkpO1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFya1dvcmRzRnJvbUxpc3QuYXBwbHlNYXJraW5nKHsgdGFyZ2V0OiAncGFnZScgfSk7XHJcblx0XHRcdH0sIDI1MCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHR2YXIgaGFuZGxlUHJvbXB0ID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHRpZiAoISQoJyMnICsgY29uZmlnLmlucHV0SWQpLnZhbCgpLmxlbmd0aCkge1xyXG5cdFx0XHQkKCcjJyArIGNvbmZpZy5sYWJlbElkKVxyXG5cdFx0XHRcdC50ZXh0KCQoJyMnICsgY29uZmlnLmlucHV0SWQpLnByb3AoJ3BsYWNlaG9sZGVyJykpXHJcblx0XHRcdFx0LmNzcygnY29sb3InLCAnIzk5OScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnIycgKyBjb25maWcubGFiZWxJZClcclxuXHRcdFx0XHQudGV4dCgkKCcjJyArIGNvbmZpZy5pbnB1dElkKS52YWwoKSlcclxuXHRcdFx0XHQuY3NzKCdjb2xvcicsICcnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTWFya1dvcmRzRnJvbUxpc3QgPSBTYXBwaGlyZVdpZGdldHMuTWFya1dvcmRzRnJvbUxpc3QgPSBTYXBwaGlyZVdpZGdldHMuTWFya1dvcmRzRnJvbUxpc3QgfHwge307XHJcblx0U2FwcGhpcmVXaWRnZXRzLk1hcmtXb3Jkc0Zyb21MaXN0LnNldHVwSW5wdXQgPSBzZXR1cElucHV0O1xyXG5cdFNhcHBoaXJlV2lkZ2V0cy5NYXJrV29yZHNGcm9tTGlzdC5oYW5kbGVQcm9tcHQgPSBoYW5kbGVQcm9tcHQ7XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gIGNsYXNzIElucHV0V2l0aENsZWFyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgIHRoaXMuJHdpZGdldCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuICAgICAgdGhpcy4kaW5wdXQgPSB0aGlzLiR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZV0nKTtcclxuICAgICAgdGhpcy4kY2xlYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLWNsZWFyJyk7XHJcbiAgICAgIHRoaXMuJG5vdGlmeUxpbmsgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLW5vdGlmeS1saW5rJyk7XHJcbiAgICAgIHRoaXMuJHdpZGdldFNoaWVsZCA9IHRoaXMuJHdpZGdldC5maW5kKCcuSW5wdXRXaXRoQ2xlYXItLXNoaWVsZCcpO1xyXG4gICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgpIHtcclxuICAgICAgdGhpcy4kaW5wdXQub24oJ2ZvY3VzJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGNsZWFyLnNob3coKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdibHVyJywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycpIHtcclxuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoJy5kYXRlcmFuZ2VwaWNrZXI6dmlzaWJsZScpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRjbGVhci5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeUxpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJGNsZWFyLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLiRpbnB1dC52YWwoJycpO1xyXG4gICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuICAgICAgICB0aGlzLiRub3RpZnlMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5jb25maWcuaGFzU2hpZWxkKSB7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kd2lkZ2V0U2hpZWxkLmhpZGUoKTtcclxuICAgICAgICB9LCB0aGlzLmNvbmZpZy5zaGllbGRUaW1lb3V0KTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2hpZWxkVGltZW91dCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuJHdpZGdldFNoaWVsZC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgY3JlYXRlID0gY29uZmlnID0+ICh3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBJbnB1dFdpdGhDbGVhcihjb25maWcpKTtcclxuXHJcbiAgU2FwcGhpcmVXaWRnZXRzLklucHV0V2l0aENsZWFyID0ge1xyXG4gICAgY3JlYXRlXHJcbiAgfTtcclxuXHJcbn0pKCk7IiwiLyogQ29tcG9uZW50IExpbmVBZGQgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcclxuXHRcdFx0c2V0V2lkdGgoY29uZmlnLndpZGdldElkKTtcclxuXHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoKCkgPT4gc2V0V2lkdGgoY29uZmlnLndpZGdldElkKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZS5MaW5lQWRkJywgKCkgPT4gc2V0V2lkdGgoY29uZmlnLndpZGdldElkKSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgc2V0V2lkdGggPSBmdW5jdGlvbih3aWRnZXRJZCkge1xyXG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICR3aWRnZXQgPSAkKGAjJHt3aWRnZXRJZH1gKTtcclxuXHRcdFx0Y29uc3Qgd2lkdGhzID0gW107XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAxOyBpIDwgODsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IG1heFdpZHRoQ29udGVudCA9IE1hdGgubWF4LmFwcGx5KFxyXG5cdFx0XHRcdFx0bnVsbCxcclxuXHRcdFx0XHRcdCR3aWRnZXRcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5sYWNvbCcgKyBpKVxyXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiAkKHRoaXMpLndpZHRoKCk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5nZXQoKVxyXG5cdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdHdpZHRocy5wdXNoKG1heFdpZHRoQ29udGVudCk7XHJcblx0XHRcdFx0JHdpZGdldC5maW5kKCcubGFjb2wnICsgaSkud2lkdGgobWF4V2lkdGhDb250ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMTAwKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGluZUFkZCA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgTGluZUNhcmRMaXN0ICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFx0Y29uc3QgJGNvbXBvbmVudCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuXHRcdFx0Y29uc3QgJGNhcmQgPSAkY29tcG9uZW50LmZpbmQoJy5MaW5lQ2FyZExpc3QnKTtcclxuXHRcdFx0Y29uc3QgJGNoZWNrQm94ID0gJGNvbXBvbmVudC5maW5kKCcuTGluZUNhcmRMaXN0X2NoZWNrYm94IGxhYmVsJyk7XHJcblxyXG5cdFx0XHQkY2FyZC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0JGNhcmQubm90KHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0JGNhcmRcclxuXHRcdFx0XHRcdC5ub3QodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuTGluZUNhcmRMaXN0X2NoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuXHRcdFx0XHRcdC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5MaW5lQ2FyZExpc3RfY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0nKVxyXG5cdFx0XHRcdFx0XHQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuTGluZUNhcmRMaXN0X2NoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJylcclxuXHRcdFx0XHRcdFx0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCRjaGVja0JveC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkY2FyZFxyXG5cdFx0XHRcdFx0Lm5vdCh0aGlzKVxyXG5cdFx0XHRcdFx0LmNsb3Nlc3QoJy5MaW5lQ2FyZExpc3QnKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmNsb3Nlc3QoJy5MaW5lQ2FyZExpc3QnKVxyXG5cdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGluZUNhcmRMaXN0ID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBMaW5lRGV0YWlsc0V4cGFuZEJveCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBpbml0ID0gY29uZmlnID0+IHtcclxuXHRcdCQoYCMke2NvbmZpZy53aWRnZXRJZH0gKyAuTGluZURldGFpbHNFeHBhbmRCb3hfYWN0aW9uYCkuY2xpY2soZXZlbnQgPT4ge1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiBpbml0KGNvbmZpZykpO1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGluZURldGFpbHNFeHBhbmRCb3ggPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IExvY2F0aW9uQm94ICovXHJcblNhcHBoaXJlV2lkZ2V0cy5Mb2NhdGlvbkJveCA9IGZ1bmN0aW9uKGNsaWNrZWRFbGVtZW50SWQpIHtcclxuXHRpZiAoJCgnIycgKyBjbGlja2VkRWxlbWVudElkICsgJycpLmhhc0NsYXNzKCdPbicpKSB7XHJcblx0XHQkKCcuRGlzYWJsZVJvb20nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdPZmYnKVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnT24nKTtcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5wYXJlbnQoJy5Sb29tQm94JylcclxuXHRcdFx0XHQuY3NzKHtcclxuXHRcdFx0XHRcdG9wYWNpdHk6ICcxJyxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjJyArIGNsaWNrZWRFbGVtZW50SWQgKyAnJylcclxuXHRcdFx0LmFkZENsYXNzKCdPbicpXHJcblx0XHRcdC5yZW1vdmVDbGFzcygnT2ZmJylcclxuXHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxyXG5cdFx0XHQuY3NzKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAnMScsXHJcblx0XHRcdH0pXHJcblx0XHRcdC5hZGRDbGFzcygnU2VsZWN0ZWQnKTtcclxuXHJcblx0XHQkKCcuRGlzYWJsZVJvb206bm90KCMnICsgY2xpY2tlZEVsZW1lbnRJZCArICcpJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnT2ZmJyk7XHJcblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ09uJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuRGlzYWJsZVJvb20uT2ZmJylcclxuXHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxyXG5cdFx0XHQuY3NzKHtcclxuXHRcdFx0XHRvcGFjaXR5OiAnMC4yNScsXHJcblx0XHRcdH0pXHJcblx0XHRcdC5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcclxuXHR9XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBNYWluSW50ZXJhY3RpdmVDYXJkICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gW107XHJcblx0dmFyIGRlZmF1bHREdXJhdGlvbiA9IDMwMDtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzW2ldLmNvbmZpZy53aWRnZXRJZCA9PT0gY29uZmlnLndpZGdldElkKSB7XHJcblx0XHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBNYWluSW50ZXJhY3RpdmVDYXJkKGNvbmZpZyk7XHJcblx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5wdXNoKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdKTtcclxuXHJcblx0XHRpZiAoISEhU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCAmJiAhIW9zQWpheEJhY2tlbmQpIHtcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWxsKCk7XHJcblx0XHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hZnRlckFqYXhSZXF1ZXN0QmluZGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR2YXIgTWFpbkludGVyYWN0aXZlQ2FyZCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHRoaXMuaXNMb2NrZWRPbkNsb3NlID0gZmFsc2U7XHJcblx0XHR0aGlzLmlzT3BlbiA9IGNvbmZpZy5pc09wZW47XHJcblx0XHR0aGlzLmlzRW5hYmxlZCA9IGNvbmZpZy5pc0VuYWJsZWQ7XHJcblx0XHR0aGlzLmlzU2VsZWN0YWJsZSA9IGNvbmZpZy5pc1NlbGVjdGFibGU7XHJcblx0XHR0aGlzLmFsbG93T3BlbmluZyA9IGNvbmZpZy5hbGxvd09wZW5pbmc7XHJcblx0XHR0aGlzLmdyYWRpZW50V2hlbk9wZW4gPSBjb25maWcuZ3JhZGllbnRXaGVuT3BlbjtcclxuXHRcdHRoaXMuYWxsb3dNdWx0aXBsZU9wZW4gPSBjb25maWcuYWxsb3dNdWx0aXBsZU9wZW47XHJcblx0XHR0aGlzLmVtaXROb3RpZnlPbk9wZW4gPSBjb25maWcuZW1pdE5vdGlmeU9uT3BlbjtcclxuXHRcdHRoaXMuaGlkZUFjdGlvbnNPbk9wZW4gPSBjb25maWcuaGlkZUFjdGlvbnNPbk9wZW47XHJcblx0XHR0aGlzLmhpZGVDYXB0aW9uT25PcGVuID0gY29uZmlnLmhpZGVDYXB0aW9uT25PcGVuO1xyXG5cdFx0dGhpcy5oaWRlVGl0bGVPbk9wZW4gPSBjb25maWcuaGlkZVRpdGxlT25PcGVuO1xyXG5cdFx0dGhpcy5oaWRlU3ViVGl0bGVPbk9wZW4gPSBjb25maWcuaGlkZVN1YlRpdGxlT25PcGVuO1xyXG5cdFx0dGhpcy5oZWFkZXJIZWlnaHRXaGVuT3BlbiA9IGNvbmZpZy5oZWFkZXJIZWlnaHRXaGVuT3BlbjtcclxuXHRcdHRoaXMuTWFpbkludGVyYWN0aXZlQ2FyZEZha2VOb3RpZnlJZCA9IGNvbmZpZy5tYWluSW50ZXJhY3RpdmVDYXJkRmFrZU5vdGlmeUlkO1xyXG5cclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHdpZGdldC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdHRoaXMuJGNhcmQgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCcpO1xyXG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXInKTtcclxuXHRcdHRoaXMuJGhlYWRlclRleHQgPSB0aGlzLiRoZWFkZXIuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRleHQnKTtcclxuXHRcdHRoaXMuJGJvZHkgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IGRpdiA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWJvZHknKTtcclxuXHRcdHRoaXMuJGFjdGlvbnMgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItYWN0aW9ucycpO1xyXG5cdFx0dGhpcy4kY2FwdGlvbiA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0LWNhcHRpb24nKTtcclxuXHRcdHRoaXMuJHRpdGxlID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRleHQtdGl0bGUnKTtcclxuXHRcdHRoaXMuJHN1YlRpdGxlID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRleHQtc3VidGl0bGUnKTtcclxuXHRcdHRoaXMuJHNlbGVjdFRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1zZWxlY3RhYmxlID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXNlbGVjdGFibGUtdHJpZ2dlcicpO1xyXG5cdFx0dGhpcy4kc2VsZWN0UGxhY2Vob2xkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItc2VsZWN0YWJsZS1wbGFjZWhvbGRlcicpO1xyXG5cdFx0dGhpcy4kdHJpZ2dlclBsYWNlaG9sZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdHJpZ2dlckFjdGlvbi1wbGFjZWhvbGRlcicpO1xyXG5cclxuXHRcdGlmICh0aGlzLiR0cmlnZ2VyUGxhY2Vob2xkZXIuZmluZCgnYScpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHR0aGlzLiR0cmlnZ2VyID0gdGhpcy4kdHJpZ2dlclBsYWNlaG9sZGVyLmZpbmQoJ2EnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pc09wZW4pIHtcclxuXHRcdFx0dGhpcy5vcGVuKGZhbHNlLCAtMSk7XHJcblx0XHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2ZvcmNlT3BlbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3ModGhpcy5oZWFkZXJIZWlnaHRXaGVuT3BlbiArICdIZWFkZXInKTtcclxuXHJcblx0XHRpZiAodGhpcy5hbGxvd09wZW5pbmcpIHtcclxuXHRcdFx0dGhpcy4kY2FyZC5hZGRDbGFzcygnYWxsb3dPcGVuaW5nJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZ3JhZGllbnRXaGVuT3Blbikge1xyXG5cdFx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdncmFkaWVudFdoZW5PcGVuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcclxuXHJcblx0XHR2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcblx0XHRcdG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbiwgaW5kZXgpIHtcclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0b2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25maWcud2lkZ2V0SWQpLCB7XHJcblx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0c3VidHJlZTogdHJ1ZSxcclxuXHRcdFx0YXR0cmlidXRlczogZmFsc2UsXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdGlmICghIXRoaXMuJGJvZHkuZmluZCgnPiBkaXYgLk1haW5JbnRlcmFjdGl2ZUNhcmQtYWJzb2x1dGUtYWN0aW9ucycpLmxlbmd0aCAmJiB0aGlzLmlzT3Blbikge1xyXG5cdFx0XHR2YXIgYWJzb2x1dGVBY3Rpb25zV2lkdGggPSBNYXRoLm1heC5hcHBseShNYXRoLCB0aGlzLiRib2R5LmZpbmQoJz4gZGl2IC5NYWluSW50ZXJhY3RpdmVDYXJkLWFic29sdXRlLWFjdGlvbnMnKS5tYXAoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHRcdH0pLmdldCgpKTtcclxuXHRcdFx0dmFyIGhlYWRlck1heFdpZHRoID0gdGhpcy4kaGVhZGVyLndpZHRoKCkgLSBhYnNvbHV0ZUFjdGlvbnNXaWR0aDtcclxuXHRcdFx0aWYgKGhlYWRlck1heFdpZHRoID4gMTApIHtcclxuXHRcdFx0XHR0aGlzLiRoZWFkZXJUZXh0LmNzcyh7XHJcblx0XHRcdFx0XHRtYXhXaWR0aDogaGVhZGVyTWF4V2lkdGggKyAncHgnXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4kYm9keS5maW5kKCc+IGRpdiAuTWFpbkludGVyYWN0aXZlQ2FyZC1hYnNvbHV0ZS1hY3Rpb25zIC5NYWluSW50ZXJhY3RpdmVDYXJkLS1jbG9zZScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRfdGhpcy5jbG9zZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGhlYWRlclRleHQuY3NzKHtcclxuXHRcdFx0XHRtYXhXaWR0aDogJzk5JSdcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGhlYWRlci5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC0tb3Blbjpub3QoW2Rpc2FibGVkXSknKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRfdGhpcy5vcGVuKHRydWUpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRoZWFkZXIuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtLWNsb3NlJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuYWxsb3dPcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMuJGhlYWRlclRleHQub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRpZiAoJChldnQudGFyZ2V0KS5oYXNDbGFzcygnQnV0dG9uJykpIHtcclxuXHRcdFx0XHRcdC8vIHRoZSB1c2VyIGNsaWNrZWQgb24gYSBCdXR0b24gaW5zaWRlIHRoZSBoZWFkZXIsIG5vdGhpbmcgdG8gZG8gaGVyZVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoX3RoaXMuaXNPcGVuKSB7XHJcblx0XHRcdFx0XHRcdGlmIChfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGRvIG5vdCBjbG9zZSB3aGVuIGFuZCBpZnJhbWUgZXhpc3RzXHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuJGFjdGlvbnMuZmluZCgnYScpLmxlbmd0aCA+IDAgJiZcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy4kYWN0aW9ucy5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC0tY2xvc2UnKS5sZW5ndGggPiAwXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGRvIG5vdCBjbG9zZSB3aGVuIHRoZSBjYXJkIGhhcyBhY3Rpb25zXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0X3RoaXMub3Blbih0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNTZWxlY3RhYmxlKSB7XHJcblx0XHRcdHRoaXMuJHNlbGVjdFRyaWdnZXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0aWYgKF90aGlzLiRzZWxlY3RQbGFjZWhvbGRlci5maW5kKCdhJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kc2VsZWN0UGxhY2Vob2xkZXIuZmluZCgnYScpLmNsaWNrKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybignWW91IG5lZWQgMSBsaW5rIGluIHRoaXMgcGxhY2Vob2xkZXIuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKHNlbmROb3RpZnksIGR1cmF0aW9uKSB7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkdXJhdGlvbiB8fCBkZWZhdWx0RHVyYXRpb247XHJcblx0XHR0aGlzLmlzT3BlbiA9IHRydWU7XHJcblx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdpc09wZW4nKTtcclxuXHRcdGlmICh0aGlzLmhpZGVBY3Rpb25zT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJGFjdGlvbnMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmhpZGVUaXRsZU9uT3Blbikge1xyXG5cdFx0XHR0aGlzLiR0aXRsZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJHN1YlRpdGxlLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlQ2FwdGlvbk9uT3Blbikge1xyXG5cdFx0XHR0aGlzLiRjYXB0aW9uLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5lbWl0Tm90aWZ5T25PcGVuKSB7XHJcblx0XHRcdGlmIChzZW5kTm90aWZ5KSB7XHJcblx0XHRcdFx0T3NOb3RpZnlXaWRnZXQodGhpcy5NYWluSW50ZXJhY3RpdmVDYXJkRmFrZU5vdGlmeUlkLCAnb3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGJvZHkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuJHRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy4kdHJpZ2dlci5jbGljaygpO1xyXG5cdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKGR1cmF0aW9uID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuJGJvZHkuc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmhhc0NsYXNzKCdja2Vfd3lzaXd5Z19mcmFtZScpKSB7XHJcblx0XHRcdHZhciBpZnJhbWVDb250ZW50cyA9IHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5jb250ZW50cygpO1xyXG5cdFx0XHRpZnJhbWVDb250ZW50cy5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC1pZnJhbWUtYWN0aW9ucycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy5hbGxvd011bHRpcGxlT3Blbikge1xyXG5cdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGl0ZW0gPT4gKGl0ZW0gIT09IHRoaXMgJiYgaXRlbS5hbGxvd09wZW5pbmcgPyBpdGVtLmNsb3NlKGR1cmF0aW9uKSA6IG51bGwpKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgZGVmYXVsdER1cmF0aW9uO1xyXG5cdFx0dGhpcy5pc09wZW4gPSBmYWxzZTtcclxuXHRcdHRoaXMuJGNhcmQucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0aWYgKHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEgJiYgIXRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5oYXNDbGFzcygnY2tlX3d5c2l3eWdfZnJhbWUnKSkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtaWZyYW1lLWFjdGlvbnMnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLiRib2R5LnNsaWRlVXAoZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHNlbGYuJGNhcmQuaGFzQ2xhc3MoJ2ZvcmNlT3BlbicpKSB7XHJcblx0XHRcdFx0c2VsZi4kY2FyZC5yZW1vdmVDbGFzcygnZm9yY2VPcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuaGlkZUFjdGlvbnNPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kYWN0aW9ucy5zaG93KCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlVGl0bGVPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kdGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlU3ViVGl0bGVPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kc3ViVGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlQ2FwdGlvbk9uT3Blbikge1xyXG5cdFx0XHR0aGlzLiRjYXB0aW9uLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kaGVhZGVyVGV4dC5jc3Moe1xyXG5cdFx0XHRtYXhXaWR0aDogdGhpcy4kaGVhZGVyLndpZHRoKCkgLSB0aGlzLiRhY3Rpb25zLndpZHRoKCkgKyAncHgnXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5pc09wZW47XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGFsbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYWxsTWFpbkludGVyYWN0aXZlQ2FyZHM7XHJcblx0XHR9LFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuXHJcbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoISEkKCcuTWFpbkludGVyYWN0aXZlQ2FyZCcpLmxlbmd0aCkge1xyXG5cdFx0aWYgKCEhIVNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQpIHtcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWxsKCk7XHJcblx0XHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hZnRlckFqYXhSZXF1ZXN0QmluZGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWxsKCk7XHJcblx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRcdGVsZW1lbnQuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xyXG5cdFx0fSk7XHJcblx0fSwgMTAwMCk7XHJcblxyXG59KTsiLCIvKiBDb21wb25lbnQgTWVudUJhciAqL1xyXG5TYXBwaGlyZVdpZGdldHMuTWVudUJhciA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdCQoZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgJG1lbnVXaWRnZXQgPSAkKCcjJyArIGNvbmZpZy5tZW51V2lkZ2V0KTtcclxuXHJcblx0XHR2YXIgbWVudVJlc2lkZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIG5hdldpZHRoID0gMDtcclxuXHRcdFx0dmFyIGF2YWlsYWJlRXNwYWNlID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbScpLndpZHRoKCk7XHJcblxyXG5cdFx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9pdGVtIC5NZW51SXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0bmF2V2lkdGggKz0gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChuYXZXaWR0aCA+IGF2YWlsYWJlRXNwYWNlKSB7XHJcblx0XHRcdFx0dmFyIGxhc3RJdGVtID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbSAuTWVudUl0ZW0nKS5sYXN0KCk7XHJcblx0XHRcdFx0bGFzdEl0ZW0uYXR0cignZGF0YS13aWR0aCcsIGxhc3RJdGVtLm91dGVyV2lkdGgodHJ1ZSkpO1xyXG5cdFx0XHRcdGxhc3RJdGVtLnByZXBlbmRUbygkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKSk7XHJcblx0XHRcdFx0bWVudVJlc2lkZXIoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZmlyc3RNb3JlRWxlbWVudCA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lciAuTWVudUl0ZW0nKS5maXJzdCgpO1xyXG5cdFx0XHRcdGlmIChuYXZXaWR0aCArIGZpcnN0TW9yZUVsZW1lbnQuZGF0YSgnd2lkdGgnKSA8IGF2YWlsYWJlRXNwYWNlKSB7XHJcblx0XHRcdFx0XHRmaXJzdE1vcmVFbGVtZW50Lmluc2VydEFmdGVyKCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykubGFzdCgpKTtcclxuXHRcdFx0XHRcdG1lbnVSZXNpZGVyKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoISRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lcicpLmlzKCc6ZW1wdHknKSkge1xyXG5cdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpLmFkZENsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfZXh0cmFJdGVtJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudUl0ZW0nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdCEkKHRoaXMpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5oYXNDbGFzcygnTWVudWJhcl9fZXh0cmFDb250YWluZXInKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpICYmICEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmVJbmRpY2F0b3InKSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQkbWVudVdpZGdldC5maW5kKCcuYWN0aXZlSW5kaWNhdG9yJykuYWRkQ2xhc3MoJ3NoYWRvdycpO1xyXG5cdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcclxuXHRcdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fSBlbHNlIGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykgJiYgJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlSW5kaWNhdG9yJykpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcclxuXHRcdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuTWVudUl0ZW1fc3ViSXRlbXMnKVxyXG5cdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbSAuaWNvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXIgJykudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoZG9jdW1lbnQpLm1vdXNldXAoZSA9PiB7XHJcblx0XHRcdHZhciAkbWVudSA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbS5hY3RpdmUnKTtcclxuXHRcdFx0dmFyICRtb3JlT3B0aW9ucyA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpO1xyXG5cclxuXHRcdFx0Ly8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIG1lbnUgb3IgYSBkZXNjZW5kYW50IG9mIHRoZSBtZW51XHJcblx0XHRcdGlmICgkbWVudS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0aWYgKCEkbWVudS5pcyhlLnRhcmdldCkgJiYgJG1lbnUuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdCRtZW51LmZpbmQoJy5NZW51SXRlbV9zdWJJdGVtcycpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdFx0XHQkKCcuYWN0aXZlSW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ3NoYWRvdycpO1xyXG5cdFx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnVJdGVtLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghJG1vcmVPcHRpb25zLmlzKGUudGFyZ2V0KSAmJiAkbW9yZU9wdGlvbnMuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHQkbW9yZU9wdGlvbnMuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHQkKCcuYWN0aXZlSW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ3NoYWRvdycpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZSBsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdG1lbnVSZXNpZGVyKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuIiwiLyogQ29tcG9uZW50IE11bHRpcGxlU2VsZWN0aW9uQnV0dG9uICovXHJcblNhcHBoaXJlV2lkZ2V0cy5NdWx0aXBsZVNlbGVjdGlvbkJ1dHRvbiA9IGZ1bmN0aW9uKFdyYXBwZXJJZCkge1xyXG5cdHZhciAkd2lkZ2V0ID0gJChXcmFwcGVySWQpO1xyXG5cdHZhciAkY29udHJvbCA9ICR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcblxyXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpkaXNhYmxlZCcpKSB7XHJcblx0XHQkKFdyYXBwZXJJZCkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHR9XHJcblxyXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdCQoV3JhcHBlcklkKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0fVxyXG5cclxuXHQkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCR3aWRnZXQuZmluZCgnLk11bHRpcGxlU2VsZWN0aW9uQnV0dG9uLWxhYmVsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHQvLyAkY29udHJvbC5wcm9wKFwiY2hlY2tlZFwiLCAhJGNvbnRyb2wucHJvcChcImNoZWNrZWRcIikpO1xyXG5cdFx0JGNvbnRyb2xbMF0uY2xpY2soKTtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICgkY29udHJvbC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdCR3aWRnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxMCk7XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBDb25maXJtYXRpb25QYW5lbDNPcHRpb25zIENvbmZpcm1hdGlvblBhbmVsIHNhbWUgamF2YXNjcmlwdCBjb2RlKi9cclxuXHJcblNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbCA9IHtcclxuXHRpc0FueVBhbmVsT3BlbmVkOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJykgJiYgJCgnLlBhbmVsQ29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcclxuXHRcdGlmICghT3NWYWxpZGF0b3JPblN1Ym1pdCgpKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKCFTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuaXNBbnlQYW5lbE9wZW5lZCgpKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnIycgKyBQYW5lbElkKS5mYWRlSW4oMTQwKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBQYW5lbElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVUb2dnbGUoMTUwKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRjbG9zZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XHJcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVPdXQoMTQwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpXHJcblx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0c2V0UGFuZWxCZWhhdmlvcjogZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRoaXNfcGFuZWwgPSAkKHRoaXMpO1xyXG5cdFx0XHQkKCcjJyArIHRoaXNfcGFuZWwuYXR0cigncGFuZWwtdHJpZ2dlci1lbGVtZW50aWQnKSArICcnKVxyXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwudG9nZ2xlUGFuZWwodGhpc19wYW5lbC5hdHRyKCdpZCcpKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuc2V0UGFuZWxCZWhhdmlvcigpO1xyXG5cdGlmIChvc0FqYXhCYWNrZW5kLkV2ZW50SGFuZGxlcnMuQWZ0ZXJBamF4UmVxdWVzdC50b1N0cmluZygpLmluZGV4T2YoJ3NldFBhbmVsQmVoYXZpb3InKSA9PSAtMSkge1xyXG5cdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuc2V0UGFuZWxCZWhhdmlvcik7XHJcblx0fVxyXG59KTtcclxuIiwiLyogQ29tcG9uZW50IENvbmZpcm1hdGlvblBvcHVwICovXHJcbnZhciBfaXNJbklmcmFtZSA9IHdpbmRvdy5mcmFtZUVsZW1lbnQgIT0gdW5kZWZpbmVkIHx8IGZhbHNlO1xyXG5TYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUG9wdXAgPSB7XHJcblx0aXNBbnlDb25maXJtYXRpb25PcGVuZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKF9pc0luSWZyYW1lKSB7XHJcblx0XHRcdHJldHVybiB3aW5kb3cudG9wLiQoJ2JvZHknKS5oYXNDbGFzcygnY29uZmlybWF0aW9uLW9wZW5lZCcpICYmIHdpbmRvdy50b3AuJCgnLmNvbmZpcm0tY29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdjb25maXJtYXRpb24tb3BlbmVkJykgJiYgJCgnLmNvbmZpcm0tY29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlQ29uZmlybTogZnVuY3Rpb24oX2lkLCBfcXVlc3Rpb24sIF9tZXNzYWdlLCBfbm90aWZ5SWQsIF9IYXNOb3RpZnlPbkNhbmNlbCkge1xyXG5cdFx0aWYgKCFPc1ZhbGlkYXRvck9uU3VibWl0KCkpIHJldHVybjtcclxuXHJcblx0XHRpZiAoIXRoaXMuaXNBbnlDb25maXJtYXRpb25PcGVuZWQoKSkge1xyXG5cdFx0XHR2YXIgX2JvZHkgPSAkKCdib2R5Jyk7XHJcblx0XHRcdHZhciBfYm9keUpTID0gZG9jdW1lbnQuYm9keTtcclxuXHRcdFx0aWYgKF9pc0luSWZyYW1lKSB7XHJcblx0XHRcdFx0X2JvZHkgPSB3aW5kb3cudG9wLiQoJ2JvZHknKTtcclxuXHRcdFx0XHRfYm9keUpTID0gd2luZG93LnRvcC5kb2N1bWVudC5ib2R5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRfYm9keS5hZGRDbGFzcygnY29uZmlybWF0aW9uLW9wZW5lZCcpO1xyXG5cclxuXHRcdFx0dmFyIF9jb25maXJtSWQgPSAnY29uZmlybV8nICsgX2lkO1xyXG5cclxuXHRcdFx0dmFyIF9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuXHRcdFx0X2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgX2NvbmZpcm1JZCk7XHJcblx0XHRcdF9jb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb25maXJtIGNvbmZpcm0td2InKTtcclxuXHRcdFx0X2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NvbmZpcm0tdHJpZ2dlci1lbGVtZW50aWQnLCBfaWQpO1xyXG5cclxuXHRcdFx0dmFyIF9iYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9iYWNrZ3JvdW5kLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1iYWNrZ3JvdW5kIGNvbmZpcm0td2InKTtcclxuXHRcdFx0X2JhY2tncm91bmQuc2V0QXR0cmlidXRlKCdpZCcsICdiZ18nICsgX2NvbmZpcm1JZCk7XHJcblx0XHRcdF9jb250YWluZXIuYXBwZW5kQ2hpbGQoX2JhY2tncm91bmQpO1xyXG5cclxuXHRcdFx0dmFyIF9jb25maXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1jb250YWluZXIgY29uZmlybS13YicpO1xyXG5cdFx0XHRfY29udGFpbmVyLmFwcGVuZENoaWxkKF9jb25maXJtKTtcclxuXHJcblx0XHRcdHZhciBfY29uZmlybVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtVGl0bGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjb25maXJtLXRpdGxlJyk7XHJcblx0XHRcdHZhciBfdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShfcXVlc3Rpb24pO1xyXG5cdFx0XHRfY29uZmlybVRpdGxlLmFwcGVuZENoaWxkKF90aXRsZSk7XHJcblx0XHRcdF9jb25maXJtLmFwcGVuZENoaWxkKF9jb25maXJtVGl0bGUpO1xyXG5cclxuXHRcdFx0dmFyIF9jb25maXJtTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtTXNnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG5cdFx0XHRfY29uZmlybU1zZy5pbm5lckhUTUwgPSBfbWVzc2FnZTsgLyogU2V0IEhUTUwgdG8gcmVuZGVyIHRoZSBtZXNzYWdlIEhUTUwgdGFncywgc2ltaWxhciB0byB0aGUgRXNjYXBlIENvbnRlbnQgc2V0IGFzIE5vLiAqL1xyXG5cdFx0XHRfY29uZmlybS5hcHBlbmRDaGlsZChfY29uZmlybU1zZyk7XHJcblxyXG5cdFx0XHR2YXIgX2NvbmZpcm1BY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdF9jb25maXJtQWN0aW9ucy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbmZpcm0tYWN0aW9ucycpO1xyXG5cdFx0XHRfY29uZmlybS5hcHBlbmRDaGlsZChfY29uZmlybUFjdGlvbnMpO1xyXG5cclxuXHRcdFx0dmFyIF9ub0J0bkxuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcclxuXHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnQnV0dG9uIFRoaXJkIE11bHRpTWFyZ2luUmlnaHQxMCcpO1xyXG5cdFx0XHRfbm9CdG5Mbmsuc2V0QXR0cmlidXRlKCdjYW5jZWwtYnV0dG9uJywgJ2NhbmNlbC1idXR0b24nKTtcclxuXHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZSgndWknLCAnQ29uZmlybU5vMScpO1xyXG5cdFx0XHRpZiAoX0hhc05vdGlmeU9uQ2FuY2VsID09ICdUcnVlJykge1xyXG5cdFx0XHRcdGlmIChfaXNJbklmcmFtZSkge1xyXG5cdFx0XHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdFx0J29uY2xpY2snLFxyXG5cdFx0XHRcdFx0XHQnZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCInICtcclxuXHRcdFx0XHRcdFx0XHQnaWZyYW1lXycgK1xyXG5cdFx0XHRcdFx0XHRcdF9pZCArXHJcblx0XHRcdFx0XHRcdFx0J1wiKS5jb250ZW50V2luZG93Lk9zTm90aWZ5V2lkZ2V0KFwiJyArXHJcblx0XHRcdFx0XHRcdFx0X25vdGlmeUlkICtcclxuXHRcdFx0XHRcdFx0XHQnXCIsXCJDQU5DRUxcIik7IFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25Qb3B1cC5jbG9zZUNvbmZpcm1Qb3B1cChcIicgK1xyXG5cdFx0XHRcdFx0XHRcdF9jb25maXJtSWQgK1xyXG5cdFx0XHRcdFx0XHRcdCdcIik7J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0X25vQnRuTG5rLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdFx0J29uY2xpY2snLFxyXG5cdFx0XHRcdFx0XHQnT3NOb3RpZnlXaWRnZXQoXCInICtcclxuXHRcdFx0XHRcdFx0XHRfbm90aWZ5SWQgK1xyXG5cdFx0XHRcdFx0XHRcdCdcIixcIkNBTkNFTFwiKTsgU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBvcHVwLmNsb3NlQ29uZmlybVBvcHVwKFwiJyArXHJcblx0XHRcdFx0XHRcdFx0X2NvbmZpcm1JZCArXHJcblx0XHRcdFx0XHRcdFx0J1wiKTsnXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAoX2lzSW5JZnJhbWUpIHtcclxuXHRcdFx0XHRcdF9ub0J0bkxuay5zZXRBdHRyaWJ1dGUoXHJcblx0XHRcdFx0XHRcdCdvbmNsaWNrJyxcclxuXHRcdFx0XHRcdFx0J1NhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25Qb3B1cC5jbG9zZUNvbmZpcm1Qb3B1cChcIicgKyBfY29uZmlybUlkICsgJ1wiKTsnXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRfbm9CdG5Mbmsuc2V0QXR0cmlidXRlKFxyXG5cdFx0XHRcdFx0XHQnb25jbGljaycsXHJcblx0XHRcdFx0XHRcdCdTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUG9wdXAuY2xvc2VDb25maXJtUG9wdXAoXCInICsgX2NvbmZpcm1JZCArICdcIik7J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBfbm9CdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnTm8nKTtcclxuXHRcdFx0X25vQnRuTG5rLmFwcGVuZENoaWxkKF9ub0J0bik7XHJcblx0XHRcdF9jb25maXJtQWN0aW9ucy5hcHBlbmRDaGlsZChfbm9CdG5MbmspO1xyXG5cclxuXHRcdFx0dmFyIF95ZXNCdG5MbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XHJcblx0XHRcdF95ZXNCdG5Mbmsuc2V0QXR0cmlidXRlKCdjbGFzcycsICdCdXR0b24gU2V0QXNWYWxpZCcpO1xyXG5cdFx0XHRfeWVzQnRuTG5rLnNldEF0dHJpYnV0ZSgnY2FuY2VsLWJ1dHRvbicsICcnKTtcclxuXHRcdFx0X3llc0J0bkxuay5zZXRBdHRyaWJ1dGUoJ3VpJywgJ0NvbmZpcm1ZZXMxJyk7XHJcblxyXG5cdFx0XHRpZiAoX2lzSW5JZnJhbWUpIHtcclxuXHRcdFx0XHRfeWVzQnRuTG5rLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdCdvbmNsaWNrJyxcclxuXHRcdFx0XHRcdCdkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIicgK1xyXG5cdFx0XHRcdFx0XHQnaWZyYW1lXycgK1xyXG5cdFx0XHRcdFx0XHRfaWQgK1xyXG5cdFx0XHRcdFx0XHQnXCIpLmNvbnRlbnRXaW5kb3cuT3NOb3RpZnlXaWRnZXQoXCInICtcclxuXHRcdFx0XHRcdFx0X25vdGlmeUlkICtcclxuXHRcdFx0XHRcdFx0J1wiLFwiT0tcIik7IFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25Qb3B1cC5jbG9zZUNvbmZpcm1Qb3B1cChcIicgK1xyXG5cdFx0XHRcdFx0XHRfY29uZmlybUlkICtcclxuXHRcdFx0XHRcdFx0J1wiKTsnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRfeWVzQnRuTG5rLnNldEF0dHJpYnV0ZShcclxuXHRcdFx0XHRcdCdvbmNsaWNrJyxcclxuXHRcdFx0XHRcdCdPc05vdGlmeVdpZGdldChcIicgK1xyXG5cdFx0XHRcdFx0XHRfbm90aWZ5SWQgK1xyXG5cdFx0XHRcdFx0XHQnXCIsXCJPS1wiKTsgU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBvcHVwLmNsb3NlQ29uZmlybVBvcHVwKFwiJyArXHJcblx0XHRcdFx0XHRcdF9jb25maXJtSWQgK1xyXG5cdFx0XHRcdFx0XHQnXCIpOydcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBfeWVzQnRuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1llcycpO1xyXG5cdFx0XHRfeWVzQnRuTG5rLmFwcGVuZENoaWxkKF95ZXNCdG4pO1xyXG5cdFx0XHRfY29uZmlybUFjdGlvbnMuYXBwZW5kQ2hpbGQoX3llc0J0bkxuayk7XHJcblxyXG5cdFx0XHRfY29uZmlybS5hcHBlbmRDaGlsZChfY29uZmlybUFjdGlvbnMpO1xyXG5cclxuXHRcdFx0X2NvbnRhaW5lci5hcHBlbmRDaGlsZChfY29uZmlybSk7XHJcblxyXG5cdFx0XHRfYm9keUpTLmFwcGVuZENoaWxkKF9jb250YWluZXIpO1xyXG5cclxuXHRcdFx0aWYgKF9pc0luSWZyYW1lKSB7XHJcblx0XHRcdFx0d2luZG93LnRvcC4kKCcjYmdfJyArIF9jb25maXJtSWQpLmZhZGVJbigxNDApO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR3aW5kb3cudG9wXHJcblx0XHRcdFx0XHRcdC4kKCcjJyArIF9jb25maXJtSWQpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuY29uZmlybS1jb250YWluZXInKVxyXG5cdFx0XHRcdFx0XHQuc2xpZGVUb2dnbGUoMTUwKTtcclxuXHRcdFx0XHRcdHdpbmRvdy50b3AuJCgnIycgKyBfY29uZmlybUlkICsgJyBbY2FuY2VsLWJ1dHRvbl0nKS5mb2N1cygpO1xyXG5cdFx0XHRcdH0sIDEwMCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCgnI2JnXycgKyBfY29uZmlybUlkKS5mYWRlSW4oMTQwKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JCgnIycgKyBfY29uZmlybUlkKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLmNvbmZpcm0tY29udGFpbmVyJylcclxuXHRcdFx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XHJcblx0XHRcdFx0XHQkKCcjJyArIF9jb25maXJtSWQgKyAnIFtjYW5jZWwtYnV0dG9uXScpLmZvY3VzKCk7XHJcblx0XHRcdFx0fSwgMTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNsb3NlQ29uZmlybVBvcHVwOiBmdW5jdGlvbihfY29uZmlybUlkKSB7XHJcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2NvbmZpcm1hdGlvbi1vcGVuZWQnKTtcclxuXHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblx0XHQkKCcjYmdfJyArIF9jb25maXJtSWQpLmZhZGVPdXQoMTQwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIF9jb25maXJtSWQpXHJcblx0XHRcdFx0LmZpbmQoJy5jb25maXJtLWNvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdFx0JCgnIycgKyBfY29uZmlybUlkKS5yZW1vdmUoKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlOiBmdW5jdGlvbihfaWQsIF9xdWVzdGlvbiwgX21lc3NhZ2UsIF9ub3RpZnlJZCwgX0hhc05vdGlmeU9uQ2FuY2VsKSB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnIycgKyBfaWQpXHJcblx0XHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25Qb3B1cC50b2dnbGVDb25maXJtKF9pZCwgX3F1ZXN0aW9uLCBfbWVzc2FnZSwgX25vdGlmeUlkLCBfSGFzTm90aWZ5T25DYW5jZWwpO1xyXG5cdFx0XHRcdFx0aWYgKF9pc0luSWZyYW1lKSB7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5mcmFtZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZW51LWlkJywgX2lkKTtcclxuXHRcdFx0XHRcdFx0d2luZG93LmZyYW1lRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2lmcmFtZV8nICsgX2lkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBQYW5lbEJ5SUROb3RpZnkgKi9cclxudmFyIHBhbmVsTm90aWZ5V2lkZ2V0O1xyXG5TYXBwaGlyZVdpZGdldHMuUGFuZWxCeUlkTm90aWZ5ID0ge1xyXG5cdGlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0fSxcclxuXHR0b2dnbGVQYW5lbEJ5Tm90aWZ5OiBmdW5jdGlvbihJZCkge1xyXG5cdFx0aWYgKCFpc0FueVBhbmVsT3BlbmVkRGVwcmVjYXRlZCgpKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5mYWRlSW4oMTQwKTtcclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGp1c3REcmFnZ2VkID09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHQkKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdtYXJnaW4tbGVmdCcsIHBhbmVsTWFyZ2luTGVmdClcclxuXHRcdFx0XHRcdFx0LmNzcygnbGVmdCcsIHBhbmVsTGVmdClcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKHBhbmVsQXJyb3dDbGFzcyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bigxNTApO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVPdXQoMTQwKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVVcCgxNTApO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0dG9nZ2xlUGFuZWxOb3RpZnlCeUlkOiBmdW5jdGlvbihJZCkge1xyXG5cdFx0JCgnYm9keScpLnRvZ2dsZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0JCgnIycgKyBJZClcclxuXHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHQucGFyZW50KClcclxuXHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHQuZmFkZVRvZ2dsZSgxNDApO1xyXG5cclxuXHRcdHBhbmVsTm90aWZ5V2lkZ2V0ID0gJCgnIycgKyBJZClcclxuXHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHQuYXR0cignTm90aWZ5SWQnKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdC5zbGlkZVRvZ2dsZSgxNTApO1xyXG5cdFx0fSwgMTAwKTtcclxuXHR9LFxyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgUGFuZWxCeUlEICovXHJcblNhcHBoaXJlV2lkZ2V0cy5QYW5lbEJ5SWQgPSB7XHJcblx0aXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuICQoJ2JvZHknKS5oYXNDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVCdXR0b246IGZ1bmN0aW9uKGlkKSB7XHJcblx0XHRjb25zdCAkdG9nZ2xlQnV0dG9uID0gJChgIyR7aWR9YCkucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpLmxlbmd0aFxyXG5cdFx0XHQ/ICQoYCMke2lkfWApLnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHQ6ICQoYCMke2lkfWApO1xyXG5cclxuXHRcdCR0b2dnbGVCdXR0b24uY2xpY2soKTtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVQYW5lbEJ5SWQ6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVJbigxNDApO1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGp1c3REcmFnZ2VkICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0aWYgKGp1c3REcmFnZ2VkID09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdCQoJy5QYW5lbEJ5SWROZXdfUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0XHRcdC5jc3MoJ21hcmdpbi1sZWZ0JywgcGFuZWxNYXJnaW5MZWZ0KVxyXG5cdFx0XHRcdFx0XHRcdC5jc3MoJ2xlZnQnLCBwYW5lbExlZnQpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKHBhbmVsQXJyb3dDbGFzcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bigxNTApO1xyXG5cclxuXHRcdFx0XHQkKGAjJHtJZH1gKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LmNsaWNrKCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblxyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVPdXQoMTQwKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHJcblx0XHRcdFx0JChgIyR7SWR9YClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5jbGljaygpO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBQb3BVcE1lbnUgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlBvcFVwTWVudSA9IHtcclxuXHRtZW51UG9zaXRpb246IGZ1bmN0aW9uKGlkLCBDb250ZXh0LCBMb2NhbGUpIHtcclxuXHRcdC8qIEhpZGUgYW55IG90aGVyIG1lbnVzIG9uIHBhZ2UgYW5kIHNldCBidXR0b24gYXMgY29sbGFwc2VkLiAqL1xyXG5cdFx0JCgnLnBvcHVwLW1lbnU6dmlzaWJsZScpLmhpZGUoKTtcclxuXHJcblx0XHQvL3ZhciBfdGhpcyA9ICQodGhpcyk7XHJcblx0XHR2YXIgX3RoaXMgPSAkKCcjJyArIGlkKTtcclxuXHRcdHZhciBYeCA9IDA7XHJcblx0XHR2YXIgWXkgPSAwO1xyXG5cdFx0dmFyIFd3ID0gMDtcclxuXHRcdHZhciBIaCA9IDA7XHJcblxyXG5cdFx0X3RoaXMuY2hpbGRyZW4oJy5idXR0b24tZXhwYW5kOnZpc2libGUnKS5oaWRlKCk7XHJcblxyXG5cdFx0LyogR2V0IHRoZSBtZW51IGVsZW1lbnQuICovXHJcblx0XHR2YXIgX2VsID0gX3RoaXMubmV4dCgnLnBvcHVwLW1lbnUnKTtcclxuXHJcblx0XHQvKiBEaXNwbGF5IHRoZSBtZW51LiAqL1xyXG5cdFx0X2VsLnNob3coKTtcclxuXHJcblx0XHQvKiBTZXQgYnV0dG9uIGNvbGxhcHNlLiAqL1xyXG5cdFx0X3RoaXMuY2hpbGRyZW4oJy5idXR0b24tY29sbGFwc2UnKS5zaG93KCk7XHJcblxyXG5cdFx0LyogR2V0IHRoZSBkaW1lbnNpb25zIG9mIHRoZSBidXR0b24uICovXHJcblx0XHRidXR0b25IaCA9IF90aGlzLm91dGVySGVpZ2h0KCk7XHJcblx0XHRidXR0b25XdyA9IF90aGlzLm91dGVyV2lkdGgoKTtcclxuXHJcblx0XHR2YXIgYnV0dG9uWSA9IF90aGlzLnBvc2l0aW9uKCkudG9wICsgYnV0dG9uSGg7XHJcblx0XHR2YXIgYnV0dG9uWCA9IF90aGlzLm9mZnNldCgpLmxlZnQ7XHJcblx0XHQvL3ZhciBidXR0b25YID0gX3RoaXMucG9zaXRpb24oKS5sZWZ0O1xyXG5cclxuXHRcdC8qIEdldCB0aGUgZGlzdGFuY2Ugb2YgbWVudSBidXR0b24gYW5kIHRoZSBwYXJlbnQgZWxlbWVudCAqL1xyXG5cdFx0dmFyIHBvcHVwUGFyZW50WHggPSBfdGhpcy5vZmZzZXQoKS5sZWZ0IC0gX3RoaXMucG9zaXRpb24oKS5sZWZ0O1xyXG5cclxuXHRcdHZhciBwb3B1cFh4ID0gX2VsLm9mZnNldCgpLmxlZnQ7XHJcblx0XHR2YXIgcG9wdXBXdyA9IF9lbC5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0WHggPSBNYXRoLmFicyhidXR0b25YIC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSAtIHBvcHVwUGFyZW50WHgpO1xyXG5cdFx0WXkgPSBNYXRoLmFicyhidXR0b25IaCAtIGJ1dHRvblkgLSAkKCdib2R5Jykuc2Nyb2xsVG9wKCkpO1xyXG5cclxuXHRcdGlmIChMb2NhbGUgIT0gJ0FSJykge1xyXG5cdFx0XHQvKiBDaGVjayBpZiBjbGlja2VkIHBvc2l0aW9uIHBsdXMgdGhlIHBvcHVwIHdpZHRoIGV4Y2VlZCB0aGUgd2luZG93IHdpZHRoLiAqL1xyXG5cdFx0XHRpZiAoYnV0dG9uWCArIHBvcHVwV3cgLSAkKCdib2R5Jykuc2Nyb2xsTGVmdCgpID4gJChDb250ZXh0KS53aWR0aCgpKSB7XHJcblx0XHRcdFx0WHggPSBidXR0b25YIC0gcG9wdXBXdyAtICQoJ2JvZHknKS5zY3JvbGxMZWZ0KCkgLSBwb3B1cFBhcmVudFh4ICsgYnV0dG9uV3c7XHJcblx0XHRcdFx0Ly9YeCA9ICgkKHdpbmRvdykud2lkdGgoKSAtIHBvcHVwV3cpIC0gJCgnYm9keScpLnNjcm9sbExlZnQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qIFNldCBtZW51IHBvc2l0aW9uLiAqL1xyXG5cdFx0X2VsLmNzcyh7XHJcblx0XHRcdGxlZnQ6IFh4ICsgJ3B4JyxcclxuXHRcdFx0dG9wOiBidXR0b25ZICsgJ3B4JyxcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qIFJlZnJlc2ggdmFsdWUgKi9cclxuXHRcdHBvcHVwWHggPSBfZWwub2Zmc2V0KCkubGVmdDtcclxuXHJcblx0XHR2YXIgX2JhbGxvb25FbCA9IF9lbC5jaGlsZHJlbignLnBvcHVwLW1lbnUtYmFsbG9vbicpO1xyXG5cclxuXHRcdHZhciBfYmFsbG9vblh4ID0gX2JhbGxvb25FbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIF9iYWxsb29uV3cgPSBfYmFsbG9vbkVsLm91dGVyV2lkdGgoKTtcclxuXHRcdHZhciBfYmFsbG9vblBvc1h4ID0gTWF0aC5hYnMoYnV0dG9uWCAtIFh4IC0gcG9wdXBQYXJlbnRYeCk7XHJcblxyXG5cdFx0LyogSXMgdGhlIGJhbGxvb24gaWNvbiBwb3NpdGlvbmVkIG91dCBvZiB0aGUgcG9wdXAgbWVudT8gKi9cclxuXHRcdGlmIChfYmFsbG9vblBvc1h4ICsgWHggKyBfYmFsbG9vbld3ID4gWHggKyBwb3B1cFd3KSB7XHJcblx0XHRcdF9iYWxsb29uUG9zWHggPSBfYmFsbG9vblBvc1h4IC0gX2JhbGxvb25XdztcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgcG9zaXRpb24gb2YgdGhlIGJhbGxvb24gZWZmZWN0LiAqL1xyXG5cdFx0X2JhbGxvb25FbC5jc3MoJ2xlZnQnLCBfYmFsbG9vblBvc1h4ICsgJ3B4Jyk7XHJcblx0fSxcclxuXHRtZW51RXZlbnRzOiBmdW5jdGlvbihDb250ZXh0LCBMb2NhbGUpIHtcclxuXHRcdCQoJy5wb3B1cC1idXR0b24nKVxyXG5cdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Qb3BVcE1lbnUubWVudVBvc2l0aW9uKGlkLCBDb250ZXh0LCBMb2NhbGUpO1xyXG5cclxuXHRcdFx0XHQvKmUuc3RvcFByb3BhZ2F0aW9uKCk7Ki9cclxuXHJcblx0XHRcdFx0LyogUHJldmVudCBsaW5rIHN1Ym1pc3Npb24gKi9cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdC8qIHYgKioqIEhpZGUgcG9wdXAgd2hlbiBjbGljayBvdXRzaWRlICoqKiB2ICovXHJcblx0XHRmdW5jdGlvbiBQTUNsaWNrT3V0c2lkZShldmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHQvKmlmICgodGFyZ2V0LnBhcmVudHMoKS5pbmRleCgkKCdhW3NhcHBoaXJlaG9zcGl0YWxdLCAuSG9zcGl0YWxQb3BVcCcpKSA9PSAtMSkpIHt9Ki9cclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHQhJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXHJcblx0XHRcdFx0XHRcdCcucG9wdXAtYnV0dG9uLCAucG9wdXAtbWVudSwgLm9zLWludGVybmFsLXVpLWF1dG9jb21wbGV0ZSwgLm9zLWludGVybmFsLXVpLW1lbnUtaXRlbSwgLm9zLWludGVybmFsLXVpLWNvcm5lci1hbGwsIHVpLWF1dG9jb21wbGV0ZS1pdGVtJ1xyXG5cdFx0XHRcdFx0KS5sZW5ndGhcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdCQoJy5wb3B1cC1tZW51OnZpc2libGUnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlOnZpc2libGUnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcuYnV0dG9uLWV4cGFuZCcpLnNob3coKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgX1BNSXNEcmFnID0gZmFsc2U7XHJcblx0XHR2YXIgX1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0JChkb2N1bWVudCkub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IHRydWU7XHJcblx0XHR9KTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRQTUNsaWNrT3V0c2lkZShldmVudCk7XHJcblx0XHRcdF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0XHRfUE1Jc0NsaWNrID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGlmICghX1BNSXNEcmFnICYmIF9QTUlzQ2xpY2spIHtcclxuXHRcdFx0XHRQTUNsaWNrT3V0c2lkZShldmVudCk7XHJcblx0XHRcdH1cclxuXHRcdFx0X1BNSXNEcmFnID0gZmFsc2U7XHJcblx0XHRcdF9QTUlzQ2xpY2sgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHQkKCdib2R5JykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQvKiBeICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogXiAqL1xyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTYXBwaGlyZVBhbmVsICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsID0ge1xyXG5cdGNoZWNrT3BlblBhbmVsOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1NhcHBoaXJlUGFuZWxPcGVuJykgJiYgJCgnLlNhcHBoaXJlUGFuZWxfQ29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlU2FwcGhpcmVQYW5lbDogZnVuY3Rpb24oUGFuZWxJZCkge1xyXG5cdFx0aWYgKCFPc1ZhbGlkYXRvck9uU3VibWl0KCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuY2hlY2tPcGVuUGFuZWwoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1NhcHBoaXJlUGFuZWxPcGVuJyk7XHJcblx0XHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZUluKDE0MCk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyMnICsgUGFuZWxJZClcclxuXHRcdFx0XHRcdC5maW5kKCcuU2FwcGhpcmVQYW5lbF9Db250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y2xvc2VTYXBwaGlyZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XHJcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1NhcHBoaXJlUGFuZWxPcGVuJyk7XHJcblx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVPdXQoMTQwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpXHJcblx0XHRcdFx0LmZpbmQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0c2V0UGFuZWxCZWhhdmlvcjogZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRoaXNfcGFuZWwgPSAkKHRoaXMpO1xyXG5cdFx0XHQkKCcjJyArIHRoaXNfcGFuZWwuYXR0cigncGFuZWwtdHJpZ2dlci1lbGVtZW50aWQnKSArICcnKVxyXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVQYW5lbC50b2dnbGVTYXBwaGlyZVBhbmVsKHRoaXNfcGFuZWwuYXR0cignaWQnKSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuc2V0UGFuZWxCZWhhdmlvcigpO1xyXG5cclxuXHRpZiAob3NBamF4QmFja2VuZC5FdmVudEhhbmRsZXJzLkFmdGVyQWpheFJlcXVlc3QudG9TdHJpbmcoKS5pbmRleE9mKCdzZXRQYW5lbEJlaGF2aW9yJykgPT0gLTEpIHtcclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuc2V0UGFuZWxCZWhhdmlvcik7XHJcblx0fVxyXG59KTtcclxuIiwicmVxdWlyZSgnLi9jb25maXJtYXRpb24tcGFuZWwnKTtcclxucmVxdWlyZSgnLi9wYW5lbC1ieS1pZCcpO1xyXG4vL3JlcXVpcmUoJy4vcGFuZWwtYnktaWQtbm90aWZ5Jyk7XHJcbnJlcXVpcmUoJy4vcG9wdXAtbWVudScpO1xyXG5yZXF1aXJlKCcuL3NhcHBoaXJlLXBhbmVsJyk7XHJcblxyXG4iLCIvKiBDb21wb25lbnQgUGF0aWVudENhbGxDYW5jZWwgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIGludGVydmFsO1xyXG5cdFx0dmFyIHRpbWVDb3VudGVyO1xyXG5cdFx0dmFyICR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCkuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsJyk7XHJcblx0XHR2YXIgJGNvdW50ZG93biA9ICR3aWRnZXQuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsLWNvdW50ZXInKTtcclxuXHRcdHZhciAkbGFiZWwgPSAkd2lkZ2V0LmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbC1sYWJlbCcpO1xyXG5cclxuXHRcdHZhciBzZXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZV9pbiwgdGV4dF9pbikge1xyXG5cdFx0XHQvL2pzLWlkbGUsIGpzLWNhbGxpbmdcclxuXHRcdFx0JHdpZGdldC5maW5kKCc+IGRpdicpLnByb3AoJ2NsYXNzJywgc3RhdGVfaW4pO1xyXG5cdFx0XHQkbGFiZWwudGV4dCh0ZXh0X2luKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIGNhbGxQYXRpZW50ID0gZnVuY3Rpb24gKCR3aWRnZXQpIHtcclxuXHRcdFx0c2V0U3RhdGUoJ2pzLWNhbGxpbmcnLCBjb25maWcudHh0Q2FsbFBhdGllbnQpO1xyXG5cdFx0XHRpZiAoY29uZmlnLnNob3dDb3VudGRvd24pIHtcclxuXHRcdFx0XHQkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxpbmdJbiArICcgJyArIGNvbmZpZy50aW1lVG9DYW5jZWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRjb3VudGRvd24udGV4dChjb25maWcudHh0Q2FsbGluZ0luKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdGFydENvdW50ZXIoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHN0YXJ0Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGltZUNvdW50ZXIgPSBjb25maWcudGltZVRvQ2FuY2VsO1xyXG5cdFx0XHRpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh1cGRhdGVDb3VudGVyLCAxMDAwKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHVwZGF0ZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRpbWVDb3VudGVyLS07XHJcblx0XHRcdGlmICh0aW1lQ291bnRlciA9PT0gMCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHZhciBub3RpZmljYXRpb24gPSAnJztcclxuXHRcdFx0XHRPc05vdGlmeVdpZGdldChjb25maWcucGF0aWVudENhbGxGYWtlTm90aWZ5SWQsIG5vdGlmaWNhdGlvbik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGNvbmZpZy5zaG93Q291bnRkb3duKSB7XHJcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4gKyAnICcgKyB0aW1lQ291bnRlcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdCR3aWRnZXQuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsLWNhbmNlbC0tbGFiZWwnKS50ZXh0KGNvbmZpZy50eHRDYW5jZWwpO1xyXG5cclxuXHRcdHNldFN0YXRlKCdqcy1pZGxlJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcclxuXHJcblx0XHRpZiAoY29uZmlnLnN0YXJ0Q291bnRpbmcpIHtcclxuXHRcdFx0Y2FsbFBhdGllbnQoJHdpZGdldCk7XHJcblx0XHR9XHJcblxyXG5cdFx0JHdpZGdldC5vbignY2xpY2snLCAnLmpzLWlkbGUgLlBhdGllbnRDYWxsQ2FuY2VsLWxhYmVsJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRjYWxsUGF0aWVudCgkd2lkZ2V0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCR3aWRnZXQub24oJ2NsaWNrJywgJy5qcy1pZGxlIC5QYXRpZW50Q2FsbENhbmNlbC1pY29uJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRjYWxsUGF0aWVudCgkd2lkZ2V0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCR3aWRnZXQub24oJ2NsaWNrJywgJy5qcy1jYWxsaW5nIC5QYXRpZW50Q2FsbENhbmNlbC1jYW5jZWwnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcclxuXHRcdFx0JGNvdW50ZG93bi50ZXh0KHRpbWVDb3VudGVyKTtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcblx0XHRcdHNldFN0YXRlKCdqcy1pZGxlJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5QYXRpZW50Q2FsbENhbmNlbCA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IFBlcnNvbkNhcmQgKi9cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0dmFyIFBlcnNvbkNhcmRFdmVudCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLklzRXhwYW5kYWJsZSAuUGVyc29uQ2FyZF9fdGl0bGUsIC5Jc0V4cGFuZGFibGUgLlBlcnNvbkNhcmRfX2NvbnRlbnQnKVxyXG5cdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkaGVhZGVyID0gJCh0aGlzKS5jbG9zZXN0KCcuUGVyc29uQ2FyZF9oZWFkZXInKTtcclxuXHRcdFx0XHQkY29udGVudCA9ICRoZWFkZXIubmV4dCgpO1xyXG5cdFx0XHRcdGlmICgkY29udGVudC5jaGlsZHJlbigpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdCRjb250ZW50LnNsaWRlVG9nZ2xlKDUwMCk7XHJcblx0XHRcdFx0XHRpZiAoJCgnLlBlcnNvbkNhcmQuSXNPcGVuJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5QZXJzb25DYXJkJylcclxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0lzT3BlbicpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuUGVyc29uQ2FyZCcpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdJc09wZW4nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdCQoJy5TdG9wUHJvcGFnYXRpb24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0fSk7XHJcblxyXG5cdFBlcnNvbkNhcmRFdmVudCgpO1xyXG5cclxuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFBlcnNvbkNhcmRFdmVudCk7XHJcbn0pO1xyXG4iLCIvKiBDb21wb25lbnQgUHJlc2NyaXB0aW9uQ2FyZCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4ge1xyXG5cdFx0JChgIyR7Y29uZmlnLndpZGdldElkfWApLmNsaWNrKCgpID0+IHtcclxuXHRcdFx0c2hvd01vcmUoJChgIyR7Y29uZmlnLndpZGdldElkfWApKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHNob3dNb3JlID0gZWxlbWVudCA9PiB7XHJcblx0XHRjb25zdCBwYXJlbnRzID0gZWxlbWVudC5wYXJlbnRzKCcuUHJlc2NyaXB0aW9uQ2FyZCcpO1xyXG5cclxuXHRcdGlmIChwYXJlbnRzLmZpbmQoJy5FeHBhbkRpdicpLmhhc0NsYXNzKCdJc09wZW4nKSkge1xyXG5cdFx0XHRwYXJlbnRzLmZpbmQoJy5FeHBhbkRpdicpLnJlbW92ZUNsYXNzKCdJc09wZW4nKTtcclxuXHJcblx0XHRcdGVsZW1lbnQudGV4dCgnU2VlIE1vcmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykuYWRkQ2xhc3MoJ0lzT3BlbicpO1xyXG5cclxuXHRcdFx0ZWxlbWVudC50ZXh0KCdTZWUgTGVzcycpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5QcmVzY3JpcHRpb25DYXJkID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBQcmVzY3JpcHRpb25FeHBhbmRhYmxlICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IFByZXNjcmlwdGlvbkV4cGFuZGFibGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdGNvbnN0IHdpZGdldElkID0gY29uZmlnLndpZGdldElkO1xyXG5cdFx0Y29uc3QgcHJldmlld3N0YXQgPSBbXTtcclxuXHRcdGNvbnN0IHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cclxuXHRcdGNvbnN0ICRlbGVtZW50V3JhcHBlciA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuXHJcblx0XHRjb25zdCBjbGlja0V2ZW50cyA9IG9iID0+IHtcclxuXHRcdFx0aWYgKCQob2IpLmhhc0NsYXNzKCdQcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlcl9fTGlua3NEaXYnKSkge1xyXG5cdFx0XHRcdHZhciBTZWN0aW9uID0gJChvYilcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQucGFyZW50KCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIFNlY3Rpb24gPSAkKG9iKS5wYXJlbnQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIFNlY3Rpb25Db250ZW50ID0gU2VjdGlvbi5jaGlsZHJlbignLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuaW5pdCA9ICgpID0+IHtcclxuXHRcdFx0Y29uc3QgJGhlYWRlciA9ICRlbGVtZW50V3JhcHBlci5maW5kKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXInKTtcclxuXHRcdFx0Y29uc3QgJGxpbmtzID0gJGhlYWRlci5maW5kKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXJfX0xpbmtzRGl2Jyk7XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgYXJyYXkgc3RhdFxyXG5cdFx0XHQkKCcuU2VjdGlvblByZXNjcmlwdGlvbkV4cGFuZGFibGVBcmVhJykuZWFjaCgoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgc3RhdCA9ICRoZWFkZXIuaGFzQ2xhc3MoJ2V4cGFuZGVkJykgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRcdFx0cHJldmlld3N0YXRbd2lkZ2V0SWRdID0geyBjbGllbnQ6IHN0YXQsIHNlcnZlcjogc3RhdCB9O1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmICgkaGVhZGVyLmhhc0NsYXNzKCdOb3RFeHBhbmRhYmxlJykpIHtcclxuXHRcdFx0XHQkaGVhZGVyLm9uKCdjbGljaycsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuXHRcdFx0fSBlbHNlIGlmICgkaGVhZGVyLmhhc0NsYXNzKCdpc0xpbmtFcGFuZGFibGVDbGljaycpKSB7XHJcblx0XHRcdFx0JGxpbmtzLm9uKCdjbGljaycsIGUgPT4gY2xpY2tFdmVudHMoJGxpbmtzKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGhlYWRlci5vbignY2xpY2snLCBlID0+IGNsaWNrRXZlbnRzKCRoZWFkZXIpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgZWxlbWVudHMgPVxyXG5cdFx0XHRcdCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgaW5wdXQsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBzZWxlY3QsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBhJztcclxuXHRcdFx0JChlbGVtZW50cykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Y29uc3QgYWpheFJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXInKS5vZmYoKTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoXHJcblx0XHRcdFx0Jy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBpbnB1dCwgLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIHNlbGVjdCwgLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIGEnXHJcblx0XHRcdCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9uc1xyXG5cdFx0XHQkKCcuU2VjdGlvblByZXNjcmlwdGlvbkV4cGFuZGFibGVBcmVhJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcclxuXHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2NvbnRlbnQnKVxyXG5cdFx0XHRcdFx0XHRcdC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID09IHRydWUgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSBjb25maWcgPT4ge1xyXG5cdFx0U2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlID0gbmV3IFByZXNjcmlwdGlvbkV4cGFuZGFibGUoY29uZmlnKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gV2ViUGF0dGVybnMvQ29udGVudC9TZWN0aW9uRXhwYW5kYWJsZScpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBTYXBwaGlyZUhlYWRlciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTYXBwaGlyZUhlYWRlcihjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xyXG5cdH07XHJcblxyXG5cdHZhciBoYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkXS5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgU2FwcGhpcmVIZWFkZXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmlzQ29uZmlkZW50aWFsID0gY29uZmlnLmlzQ29uZmlkZW50aWFsO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xyXG5cdFx0dGhpcy4kd2lkZ2V0LmNzcyh7XHJcblx0XHRcdGRpc3BsYXk6ICdibG9jaydcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlcicpO1xyXG5cdFx0dGhpcy4kZGVtb2dyYXBoaWMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWRlbW9ncmFwaGljcycpO1xyXG5cdFx0dGhpcy4kaW5mb3JtYXRpb24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWluZm9ybWF0aW9uJyk7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC10cmlnZ2VyJyk7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC1jb250ZW50Jyk7XHJcblxyXG5cdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuJGluZm9ybWF0aW9uLnRleHQoKSA9PT0gJycpIHtcclxuXHRcdFx0dGhpcy4kaW5mb3JtYXRpb24uaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlSGVhZGVyLnByb3RvdHlwZS5oYW5kbGVSZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLmhhbmRsZURlbW9ncmFwaGljcygpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChfdGhpcy4kaGVhZGVyLmhhc0NsYXNzKCdpc09wZW4nKSkge1xyXG5cdFx0XHRcdF90aGlzLiRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF90aGlzLiRoZWFkZXIuYWRkQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuaGFuZGxlRGVtb2dyYXBoaWNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGRlbW9ncmFwaGljLmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdHRoaXMuJGFkZGl0aW9uYWxUcmlnZ2VyLmhpZGUoKTtcclxuXHRcdHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmVtcHR5KCk7XHJcblx0XHR2YXIgZGVtb2dyYXBoaWNXaWR0aCA9IHRoaXMuJGRlbW9ncmFwaGljLm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHR2YXIgaXRlbXNUb3RhbCA9IDA7XHJcblx0XHR0aGlzLiRkZW1vZ3JhcGhpYy5maW5kKCcuRGVtb2dyYXBoaWMtaXRlbScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcblx0XHRcdGl0ZW1zVG90YWwgKz0gcGFyc2VJbnQoJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpLCAxMCk7XHJcblx0XHRcdGlmIChpdGVtc1RvdGFsICsgNjAgPCBkZW1vZ3JhcGhpY1dpZHRoKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9uZSgpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKS5hcHBlbmRUbyhfdGhpcy4kYWRkaXRpb25hbENvbnRlbnQpO1xyXG5cdFx0XHRcdF90aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHRoaXMuJGhlYWRlci5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLnNob3dBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5hZGRDbGFzcygnaXNPcGVuJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhpZGVBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRoYW5kbGVEZW1vZ3JhcGhpY3M6IGhhbmRsZURlbW9ncmFwaGljcyxcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdGlmICghIVNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZCkge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZF0uaGFuZGxlRGVtb2dyYXBoaWNzKCk7XHJcblx0fVxyXG5cdGlmICghISQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKS5sZW5ndGgpIHtcclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkXS5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7IiwiLyogQ29tcG9uZW50IFNhcHBoaXJlUmFkaW9CdXR0b24gKi9cclxuU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUmFkaW9CdXR0b24gPSB3aWRnZXRJZCA9PiB7XHJcblx0dmFyICR3aWRnZXQgPSAkKCcjJyArIHdpZGdldElkKTtcclxuXHR2YXIgJGNvbnRyb2wgPSAkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xyXG5cdHZhciBuYW1lID0gJGNvbnRyb2wucHJvcCgnbmFtZScpO1xyXG5cclxuXHQkY29udHJvbC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0JCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdW25hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0LmNsb3Nlc3QoJy5CdXR0b25SYWRpb0lucCcpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JHdpZGdldC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkd2lkZ2V0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JHdpZGdldC5maW5kKCcuQnV0dG9uUmFkaW9JbnBfcmFkaW9UZXh0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoXHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQuY2xvc2VzdCgnLkJ1dHRvblJhZGlvSW5wJylcclxuXHRcdFx0XHQuaGFzQ2xhc3MoJ2Rpc2FibGVkJylcclxuXHRcdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHQkY29udHJvbC50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0JGNvbnRyb2wudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdGlmICgkY29udHJvbC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgU2NhbGVNYWluU3RydWN0dXJlICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFx0c2V0dXBTY2FsZSgpO1xyXG5cdFx0XHRiaW5kQ2xpY2tzKCk7XHJcblxyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRiaW5kQ2xpY2tzKCk7XHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2NhbGVDb3VudCA9IGNvbmYgPT4ge1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIENhcmRTY2FsZSA9IGNvbmYuSXNDYXJkU2NhbGU7XHJcblx0XHRcdHZhciBSdWxlclNjYWxlID0gY29uZi5Jc1J1bGVyU2NhbGU7XHJcblx0XHRcdHZhciBNdWx0aXBsZVNjYWxlID0gY29uZi5Jc011bHRpcGxlU2NhbGU7XHJcblx0XHRcdHZhciAkdG90YWxQbGFjZSA9ICQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfZm9vdGVyUmVzdWx0IC5IZWFkaW5nMicpO1xyXG5cdFx0XHR2YXIgdG90YWxDYXJkU2NhbGUgPSAwO1xyXG5cdFx0XHR2YXIgdG90YWxNdWx0aXBsZVNjYWxlID0gMDtcclxuXHRcdFx0dmFyIHRvdGFsUnVsZXJTY2FsZSA9IDA7XHJcblxyXG5cdFx0XHR2YXIgU2NhbGVUeXBlQ2FyZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciB0b3RhbFNlbGVjdGVkID0gJCgnLlNjYWxlTGlzdC5DYXJkU2NhbGUnKS5maW5kKCcuU2NhbGVDYXJkLmFjdGl2ZScpLmxlbmd0aDtcclxuXHRcdFx0XHR2YXIgdG90YWxOdW1iZXIgPSAwO1xyXG5cdFx0XHRcdCQoXCIuU2NhbGVMaXN0LkNhcmRTY2FsZTpub3QoJy5pc1RpdGxlJylcIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmZpbmQoJy5TY2FsZUNhcmQnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHRvdGFsTnVtYmVyICs9IDE7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmICh0b3RhbE51bWJlciA9PT0gdG90YWxTZWxlY3RlZCkge1xyXG5cdFx0XHRcdFx0dmFyIHRvdGFsID0gW107XHJcblx0XHRcdFx0XHR2YXIgaW5wdXRWYWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0dmFyICRzY2FsZVJvdyA9ICQoJy5TY2FsZUxpc3QuQ2FyZFNjYWxlOm5vdCguaXNUaXRsZSknKTtcclxuXHRcdFx0XHRcdCRzY2FsZVJvdy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRpbnB1dFZhbHVlID0gJCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuU2NhbGVDYXJkLmFjdGl2ZScpXHJcblx0XHRcdFx0XHRcdFx0LmRhdGEoJ3ZhbHVlJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuZmluZCgnLlNjYWxlTGlzdF9pbnB1dFZhbHVlIGlucHV0JylcclxuXHRcdFx0XHRcdFx0XHQudmFsKGlucHV0VmFsdWUpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0JCgnLlNjYWxlTGlzdC5DYXJkU2NhbGUgLlNjYWxlQ2FyZC5hY3RpdmUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR0b3RhbC5wdXNoKCQodGhpcykuZGF0YSgndmFsdWUnKSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHZhciBmaW5hbFRvdGFsID0gZXZhbCh0b3RhbC5qb2luKCcrJykpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZpbmFsVG90YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIFNjYWxlVHlwZVJ1bGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGFjdGl2ZVJ1bGVyVmFsdWUgPSAnJztcclxuXHRcdFx0XHR2YXIgJGFjdGl2ZVJ1bGVyID0gJCgnLlJ1bGVyU2NhbGVfbnVtYmVyLmFjdGl2ZScpO1xyXG5cdFx0XHRcdGlmICgkYWN0aXZlUnVsZXIubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0dmFyIGFjdGl2ZVJ1bGVyVmFsdWUgPSAkKCcuUnVsZXJTY2FsZV9udW1iZXIuYWN0aXZlJylcclxuXHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5SdWxlclNjYWxlJylcclxuXHRcdFx0XHRcdFx0LmRhdGEoKS52YWx1ZTtcclxuXHRcdFx0XHRcdCQoJy5TY2FsZUxpc3QuUnVsZXInKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLlNjYWxlTGlzdF9pbnB1dFZhbHVlIGlucHV0JylcclxuXHRcdFx0XHRcdFx0LnZhbChhY3RpdmVSdWxlclZhbHVlKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gYWN0aXZlUnVsZXJWYWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGFjdGl2ZVJ1bGVyVmFsdWU7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgU2NhbGVUeXBlTXVsdGlwbGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgbnVtYmVyb2ZDb2xzID0gJCgnLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlJylcclxuXHRcdFx0XHRcdC5maXJzdCgpXHJcblx0XHRcdFx0XHQuZmluZCgnLkJ1dHRvbkdyb3VwU2NhbGUnKS5sZW5ndGg7XHJcblx0XHRcdFx0dmFyIG51bWJlcm9mUm93cyA9ICQoJy5CdXR0b25Hcm91cFNjYWxlJykuY2xvc2VzdCgnLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlOm5vdCguaXNUaXRsZSk6bm90KC5pc1N1YnRvdGFsKScpXHJcblx0XHRcdFx0XHQubGVuZ3RoO1xyXG5cdFx0XHRcdHZhciB0b3RhbCA9IFtdO1xyXG5cdFx0XHRcdHZhciBpID0gMDtcclxuXHRcdFx0XHR2YXIgaiA9IDA7XHJcblx0XHRcdFx0dmFyIGNvdW50QWN0aXZlID0gMDtcclxuXHRcdFx0XHR2YXIgY291bnRhbGxBY3RpdmVDb2xzID0gMDtcclxuXHRcdFx0XHR2YXIgdG90YWxPZkl0ZW1zID0gbnVtYmVyb2ZDb2xzICogbnVtYmVyb2ZSb3dzO1xyXG5cdFx0XHRcdHZhciB0b3RhbFNjb3JlID0gW107XHJcblxyXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBudW1iZXJvZkNvbHM7IGkrKykge1xyXG5cdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG51bWJlcm9mUm93czsgaisrKSB7XHJcblx0XHRcdFx0XHRcdHZhciBTY2FsZUxpc3RTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcblx0XHRcdFx0XHRcdFx0Jy5TY2FsZUxpc3QuTXVsdGlwbGVTY2FsZTpub3QoLmlzVGl0bGUpOm5vdCguaXNTdWJ0b3RhbCknXHJcblx0XHRcdFx0XHRcdClbal07XHJcblx0XHRcdFx0XHRcdHZhciBCdXR0b25TY2FsZVNlbGVjdGVkID0gU2NhbGVMaXN0U2VsZWN0ZWQucXVlcnlTZWxlY3RvckFsbCgnLkJ1dHRvbkdyb3VwU2NhbGUnKVtpXTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChCdXR0b25TY2FsZVNlbGVjdGVkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5CdXR0b25Hcm91cF9idXR0b24uYWN0aXZlJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBTY2FsZVZhbHVlID0gQnV0dG9uU2NhbGVTZWxlY3RlZC5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlJylbMF0uaW5uZXJUZXh0O1xyXG5cdFx0XHRcdFx0XHRcdHRvdGFsLnB1c2gocGFyc2VJbnQoU2NhbGVWYWx1ZSkpO1xyXG5cdFx0XHRcdFx0XHRcdHRvdGFsU2NvcmUucHVzaChwYXJzZUludChTY2FsZVZhbHVlKSk7XHJcblx0XHRcdFx0XHRcdFx0Y291bnRBY3RpdmUgPSBjb3VudEFjdGl2ZSArIDE7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICgkKCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGUuaXNTdWJ0b3RhbCcpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0aWYgKGNvdW50QWN0aXZlID09PSBudW1iZXJvZlJvd3MpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc3ViVG90YWwgPSBldmFsKHRvdGFsLmpvaW4oJysnKSk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHN1YnRvdGFsU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuU2NhbGVMaXN0Lk11bHRpcGxlU2NhbGUuaXNTdWJ0b3RhbCAuQnV0dG9uR3JvdXBTY2FsZScpW2ldO1xyXG5cdFx0XHRcdFx0XHRcdHN1YnRvdGFsU2NhbGUuaW5uZXJUZXh0ID0gc3ViVG90YWw7XHJcblx0XHRcdFx0XHRcdFx0Y291bnRhbGxBY3RpdmVDb2xzID0gY291bnRhbGxBY3RpdmVDb2xzICsgMTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y291bnRBY3RpdmUgPSAwO1xyXG5cdFx0XHRcdFx0dG90YWwgPSBbXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuQnV0dG9uR3JvdXBfYnV0dG9uLmFjdGl2ZScpLmxlbmd0aCA9PT0gdG90YWxPZkl0ZW1zKSB7XHJcblx0XHRcdFx0XHR2YXIgaSA9IDA7XHJcblx0XHRcdFx0XHR2YXIgaiA9IDA7XHJcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbnVtYmVyb2ZSb3dzOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIFNjYWxlTGlzdFJvdyA9ICQoJy5TY2FsZUxpc3QuTXVsdGlwbGVTY2FsZTpub3QoLmlzVGl0bGUpOm5vdCguaXNTdWJ0dG90YWwpJylbaV07XHJcblx0XHRcdFx0XHRcdHZhciAkU2NhbGVMaXN0SW5wdXQgPSAkKFNjYWxlTGlzdFJvdykuZmluZCgnLlNjYWxlTGlzdF9pbnB1dFZhbHVlIGlucHV0Jyk7XHJcblx0XHRcdFx0XHRcdHZhciB2YWx1ZXNTZWxlY3RlZCA9ICcnO1xyXG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbnVtYmVyb2ZDb2xzOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgQWN0aXZlQnV0dG9uID0gJChTY2FsZUxpc3RSb3cpLmZpbmQoJy5CdXR0b25Hcm91cF9idXR0b24uYWN0aXZlJylbal07XHJcblx0XHRcdFx0XHRcdFx0dmFyIEFjdGl2ZVZhbHVlID0gQWN0aXZlQnV0dG9uLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdFx0XHQvL3ZhbHVlc1NlbGVjdGVkPXZhbHVlc1NlbGVjdGVkKycsJytBY3RpdmVWYWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoaiA9PT0gbnVtYmVyb2ZDb2xzIC0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVzU2VsZWN0ZWQgKz0gQWN0aXZlVmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlc1NlbGVjdGVkICs9IEFjdGl2ZVZhbHVlICsgJywnO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQkU2NhbGVMaXN0SW5wdXQudmFsKHZhbHVlc1NlbGVjdGVkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBnZXRUb3RhbCA9IGV2YWwodG90YWxTY29yZS5qb2luKCcrJykpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGdldFRvdGFsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBUb3RhbENhbGMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoQ2FyZFNjYWxlID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0b3RhbENhcmRTY2FsZSA9IFNjYWxlVHlwZUNhcmQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKFJ1bGVyU2NhbGUgPT09IHRydWUpIHtcclxuXHRcdFx0XHRcdHRvdGFsUnVsZXJTY2FsZSA9IFNjYWxlVHlwZVJ1bGVyKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChNdWx0aXBsZVNjYWxlID09PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0b3RhbE11bHRpcGxlU2NhbGUgPSBTY2FsZVR5cGVNdWx0aXBsZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIWlzTmFOKHRvdGFsTXVsdGlwbGVTY2FsZSkgJiYgIWlzTmFOKHRvdGFsQ2FyZFNjYWxlKSAmJiAhaXNOYU4odG90YWxSdWxlclNjYWxlKSkge1xyXG5cdFx0XHRcdFx0dmFyIHRvdGFsQWJzb2x1dGVTY29yZSA9IHRvdGFsQ2FyZFNjYWxlICsgdG90YWxNdWx0aXBsZVNjYWxlICsgdG90YWxSdWxlclNjYWxlO1xyXG5cdFx0XHRcdFx0dmFyIHRvdGFsQWJzb2x1dGVMYWJlbCA9IHRvdGFsQWJzb2x1dGVTY29yZSA+IDExID8gJyAoSGlnaCknIDogJyAoTG93KSc7XHJcblxyXG5cdFx0XHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV90b3RhbFNjb3JlLkhlYWRpbmcyJykudGV4dCh0b3RhbEFic29sdXRlU2NvcmUgKyB0b3RhbEFic29sdXRlTGFiZWwpO1xyXG5cclxuXHRcdFx0XHRcdGlmICgkKCcuU2NhbGVNYWluU3RydWN0dXJlX2hpZGRpbmdMaW5rIGEnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdCQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfaGlkZGluZ0xpbmsgYScpLmNsaWNrKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKENhcmRTY2FsZSA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdCQoJy5TY2FsZUNhcmQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmICghJCh0aGlzKS5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkcGFyZW50U2NhbGVDYXJkID0gJCh0aGlzKS5jbG9zZXN0KCcuU2NhbGVMaXN0LkNhcmRTY2FsZScpO1xyXG5cdFx0XHRcdFx0XHQkcGFyZW50U2NhbGVDYXJkLmZpbmQoJy5TY2FsZUNhcmQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0XHRUb3RhbENhbGMoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRUb3RhbENhbGMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKFJ1bGVyU2NhbGUgPT09IHRydWUpIHtcclxuXHRcdFx0XHQkKCcuUnVsZXJTY2FsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuZmluZCgnLnZpZXdtb2RlJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHZhciAkcnVsZXJTY2FsZUxpc3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5TY2FsZUxpc3QuUnVsZXInKTtcclxuXHRcdFx0XHRcdFx0JHJ1bGVyU2NhbGVMaXN0LmZpbmQoJy5SdWxlclNjYWxlX251bWJlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuUnVsZXJTY2FsZV9udW1iZXInKVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdFRvdGFsQ2FsYygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFRvdGFsQ2FsYygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoTXVsdGlwbGVTY2FsZSA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHZhciBjb3VudGVyO1xyXG5cdFx0XHRcdHZhciBTY2FsZUxpc3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5TY2FsZUxpc3QuTXVsdGlwbGVTY2FsZS5pc1RpdGxlJyk7XHJcblx0XHRcdFx0dmFyIFNjYWxlTGlzdFN1YlRvdGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlLmlzU3VidG90YWwnKTtcclxuXHRcdFx0XHR2YXIgU2NhbGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlOm5vdCguaXNUaXRsZSk6bm90KC5pc1N1YnRvdGFsKScpO1xyXG5cclxuXHRcdFx0XHQkKCcuQnV0dG9uR3JvdXBTY2FsZScpXHJcblx0XHRcdFx0XHQuY2xvc2VzdCgnLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlOm50aC1jaGlsZCgybiknKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdFdmVuTGluZScpO1xyXG5cdFx0XHRcdHZhciBudW1iZXJPZkdyb3VwU2NhbGUgPSBTY2FsZUxpc3QucXVlcnlTZWxlY3RvckFsbCgnLkJ1dHRvbkdyb3VwU2NhbGUnKS5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdCQoJy5TY2FsZUxpc3QuTXVsdGlwbGVTY2FsZS5pc1N1YnRvdGFsIC5CdXR0b25Hcm91cFNjYWxlJykudGV4dCgwKTtcclxuXHRcdFx0XHQvLyBDaGVjayBpZiBNdWx0aXBsZSBTY2FsZSBUaXRsZSBleGlzdHMgdGhlbiBhZGp1c3QgdGl0bGUgd2lkdGhcclxuXHRcdFx0XHRpZiAoJCgnLlNjYWxlTGlzdC5NdWx0aXBsZVNjYWxlLmlzVGl0bGUnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRmb3IgKGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgbnVtYmVyT2ZHcm91cFNjYWxlOyBjb3VudGVyKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIFNjYWxlTGlzdFdpZHRoID0gU2NhbGVMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5CdXR0b25Hcm91cFNjYWxlJylbY291bnRlcl0ub2Zmc2V0V2lkdGg7XHJcblx0XHRcdFx0XHRcdFNjYWxlTGlzdFRpdGxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5CdXR0b25Hcm91cFNjYWxlJylbY291bnRlcl0uc3R5bGUud2lkdGggPSBTY2FsZUxpc3RXaWR0aCArICdweCc7XHJcblx0XHRcdFx0XHRcdFNjYWxlTGlzdFN1YlRvdGFsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5CdXR0b25Hcm91cFNjYWxlJylbY291bnRlcl0uc3R5bGUud2lkdGggPSBTY2FsZUxpc3RXaWR0aCArICdweCc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkKCcuQnV0dG9uR3JvdXBfYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRUb3RhbENhbGMoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRUb3RhbENhbGMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0c2V0dXBTY2FsZSA9ICgpID0+IHtcclxuXHRcdHZhciBJc0NhcmRTY2FsZTtcclxuXHRcdHZhciBJc1J1bGVyU2NhbGU7XHJcblx0XHR2YXIgSXNNdWx0aXBsZVNjYWxlO1xyXG5cclxuXHRcdCQoJy5TY2FsZUNhcmQnKS5sZW5ndGggPiAwID8gKElzQ2FyZFNjYWxlID0gdHJ1ZSkgOiAoSXNDYXJkU2NhbGUgPSBmYWxzZSk7XHJcblx0XHQkKCcuQnV0dG9uR3JvdXBTY2FsZScpLmxlbmd0aCA+IDAgPyAoSXNNdWx0aXBsZVNjYWxlID0gdHJ1ZSkgOiAoSXNNdWx0aXBsZVNjYWxlID0gZmFsc2UpO1xyXG5cdFx0JCgnLlJ1bGVyU2NhbGUnKS5sZW5ndGggPiAwID8gKElzUnVsZXJTY2FsZSA9IHRydWUpIDogKElzUnVsZXJTY2FsZSA9IGZhbHNlKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRTY2FsZUNvdW50KHtcclxuXHRcdFx0XHRJc0NhcmRTY2FsZTogSXNDYXJkU2NhbGUsXHJcblx0XHRcdFx0SXNSdWxlclNjYWxlOiBJc1J1bGVyU2NhbGUsXHJcblx0XHRcdFx0SXNNdWx0aXBsZVNjYWxlOiBJc011bHRpcGxlU2NhbGUsXHJcblx0XHRcdH0pO1xyXG5cdFx0fSwgNTAwKTtcclxuXHJcblx0XHRpZiAoJCgnLlNjYWxlTWFpblN0cnVjdHVyZV9vcHRpb25zIC5Ub2dnbGVJdGVtQ29udHJvbCcpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV9vcHRpb25zIC5Ub2dnbGVJdGVtQ29udHJvbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfdG90YWxTY29yZS5IZWFkaW5nMicpLnRleHQoJycpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRyZXNldFNjYWxlcyA9ICgpID0+IHtcclxuXHRcdCQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfY29udGVudCcpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdCQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfb3B0aW9ucyAuVG9nZ2xlSXRlbUNvbnRyb2wnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy5TY2FsZU1haW5TdHJ1Y3R1cmVfdG90YWxTY29yZS5IZWFkaW5nMicpLnRleHQoJycpO1xyXG5cdFx0XHRzZXR1cFNjYWxlKCk7XHJcblx0XHR9LCA2MDApO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV9jb250ZW50JykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZV9vcHRpb25zIC5Ub2dnbGVJdGVtQ29udHJvbCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fTtcclxuXHJcblx0YmluZENsaWNrcyA9ICgpID0+IHtcclxuXHRcdGlmICgkKCcuU2NhbGVNYWluU3RydWN0dXJlX29wdGlvbnMgLlRvZ2dsZUl0ZW1Db250cm9sICcpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0JCgnLlNjYWxlTWFpblN0cnVjdHVyZScpXHJcblx0XHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHRcdC5vbignY2xpY2snLCAnLlRvZ2dsZUl0ZW1Db250cm9sJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXNldFNjYWxlcygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgkKCcuTmF2aWdhdGlvbl9jb250cm9sJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHQkKCcuTmF2aWdhdGlvbl9yaWdodCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCEkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5maW5kKCdhJylbMF1cclxuXHRcdFx0XHRcdFx0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmVzZXRTY2FsZXMoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JCgnLk5hdmlnYXRpb25fbGVmdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCEkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5maW5kKCdhJylbMF1cclxuXHRcdFx0XHRcdFx0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmVzZXRTY2FsZXMoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TY2FsZU1haW5TdHJ1Y3R1cmUgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFRvZ2dsZUl0ZW1Db250cm9sICovXHJcblNhcHBoaXJlV2lkZ2V0cy5Ub2dnbGVJdGVtQ29udHJvbCA9ICgpID0+IHtcclxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdCQoJy5Ub2dnbGVJdGVtQ29udHJvbCBpbnB1dFt0eXBlPVwicmFkaW9cIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuVG9nZ2xlSXRlbUNvbnRyb2wnKVxyXG5cdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcuVG9nZ2xlSXRlbUNvbnRyb2wnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpXHJcblx0XHRcdFx0XHQubm90KCc6Y2hlY2tlZCcpXHJcblx0XHRcdFx0XHQucHJvcCgnY2hlY2tlZCcsIHRydWUpXHJcblx0XHRcdFx0XHQuY2xpY2soKTtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKVxyXG5cdFx0XHRcdFx0XHQuaXMoJzpjaGVja2VkJylcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy5Ub2dnbGVJdGVtQ29udHJvbCBpbnB1dFt0eXBlPVwicmFkaW9cIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JCgnLlRvZ2dsZUl0ZW1Db250cm9sJylcclxuXHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0JCgnLlRvZ2dsZUl0ZW1Db250cm9sJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKVxyXG5cdFx0XHRcdFx0XHRcdC5pcygnOmNoZWNrZWQnKVxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuIiwidmFyIFNlYXJjaFNlbGVjdERlZmluZSA9ICh3aW5kb3cuU2VhcmNoU2VsZWN0RGVmaW5lID0gd2luZG93LlNlYXJjaFNlbGVjdERlZmluZSB8fCB7fSk7XHJcblxyXG5TYXBwaGlyZVdpZGdldHMuU2VsZWN0U1NEID0gZnVuY3Rpb24gU1NEU2VsZWN0U2V0dXAoY29uZmlnKSB7XHJcblx0JChmdW5jdGlvbigpIHtcclxuXHRcdHZhciAkU1NEc2VsZWN0SWQgPSAkKCcjJyArIGNvbmZpZy5TU0RTZWxlY3RJZCk7XHJcblx0XHR2YXIgaXNNdWx0aXBsZSA9IGNvbmZpZy5pc011bHRpcGxlO1xyXG5cclxuXHRcdHZhciAkQ29tcG9uZW50U1NEID0gJFNTRHNlbGVjdElkLmNsb3Nlc3QoJy5TZWFyY2hTRCcpO1xyXG5cdFx0dmFyICRDb21wb25lbnRTU0RpbnB1dCA9ICRDb21wb25lbnRTU0QuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKTtcclxuXHRcdHZhciBDb21wb25lbnRpbnB1dGxlbmd0aCA9ICRDb21wb25lbnRTU0RpbnB1dC52YWwoKS5sZW5ndGg7XHJcblxyXG5cdFx0aWYgKENvbXBvbmVudGlucHV0bGVuZ3RoID4gMCkge1xyXG5cdFx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX19jb250ZW50VGl0bGUnKS5oaWdobGlnaHQoJENvbXBvbmVudFNTRGlucHV0LnZhbCgpLCB7XHJcblx0XHRcdFx0Y2xhc3NOYW1lOiAnU2VsZWN0U0Qtc2VhcmNoZWQtdGVybScsXHJcblx0XHRcdFx0Y2FzZVNlbnNpdGl2ZTogZmFsc2UsXHJcblx0XHRcdFx0d29yZHNPbmx5OiBmYWxzZSxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIE9wZW5Db25maXJtUG9wdXAgPSBmdW5jdGlvbigkU1NEc2VsZWN0SWQpIHtcclxuXHRcdFx0JENvbXBvbmVudFNTRCA9ICRTU0RzZWxlY3RJZC5jbG9zZXN0KCcuU2VhcmNoU0QnKTtcclxuXHRcdFx0JFBvcHVwSUQgPSAkQ29tcG9uZW50U1NELnNpYmxpbmdzKCcuU1NEUG9wdXBXcmFwcGVyJyk7XHJcblxyXG5cdFx0XHQkUG9wdXBJRC5mYWRlSW4oJ2Zhc3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkQ29tcG9uZW50U1NELmFkZENsYXNzKCdEb250X0Nsb3NlJyk7XHJcblx0XHRcdFx0JFBvcHVwSURcclxuXHRcdFx0XHRcdC5maW5kKCcuU1NEcG9wdXBPaycpXHJcblx0XHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRQb3B1cElELmZhZGVPdXQoJ2Zhc3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX19zdGFyVHJpZ2dlciA+IGEnKS5jbGljaygpO1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoJENvbXBvbmVudFNTRC5yZW1vdmVDbGFzcygnRG9udF9DbG9zZScpLCA1MDApO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQkUG9wdXBJRFxyXG5cdFx0XHRcdFx0LmZpbmQoJy5TU0Rwb3B1cENhbmNlbCcpXHJcblx0XHRcdFx0XHQub2ZmKCdjbGljaycpXHJcblx0XHRcdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdCRQb3B1cElELmZhZGVPdXQoJ2Zhc3QnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCRDb21wb25lbnRTU0QucmVtb3ZlQ2xhc3MoJ0RvbnRfQ2xvc2UnKSwgNTAwKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBTU0RDaGVja0JveFNlbGVjdCA9IGZ1bmN0aW9uKCR3aWRnZXRJZCkge1xyXG5cdFx0XHR2YXIgY2hlY2tCb3hDb3VudCA9IDA7XHJcblx0XHRcdGlmIChpc011bHRpcGxlID09PSAnVHJ1ZScpIHtcclxuXHRcdFx0XHRjaGVja0JveENvdW50ID0gJHdpZGdldElkXHJcblx0XHRcdFx0XHQuY2xvc2VzdCgnLlNlYXJjaFNELnNob3dGYXZvcml0ZScpXHJcblx0XHRcdFx0XHQuZmluZCgnLlNlbGVjdFNEX19tdWx0aXBsZSA+IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkJykubGVuZ3RoO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGNoZWNrQm94Q291bnQpO1xyXG5cdFx0XHRcdCRhbGxMaXN0Y2FyZCA9ICR3aWRnZXRJZC5jbG9zZXN0KCcuU2VhcmNoU0RfY29udGVudCcpO1xyXG5cclxuXHRcdFx0XHRpZiAoY2hlY2tCb3hDb3VudCA+IDApIHtcclxuXHRcdFx0XHRcdCR3aWRnZXRJZC5jbG9zZXN0KCcuU2VhcmNoU0Quc2hvd0Zhdm9yaXRlJykuYWRkQ2xhc3MoJ011bHRpU2VsZWN0QWN0aXZlJyk7XHJcblx0XHRcdFx0XHQkd2lkZ2V0SWQuY2xvc2VzdCgnLlNlYXJjaFNEX2NvbnRlbnQgLlNlbGVjdFNEJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuU2VsZWN0U0RfY29udGVudFdyYXBwZXInKVxyXG5cdFx0XHRcdFx0XHRcdC5vZmYoJ2NsaWNrJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuZmluZCgnLlNlbGVjdFNEX2FjdGlvbkxpbmsnKVxyXG5cdFx0XHRcdFx0XHRcdC5vZmYoJ2NsaWNrJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JHdpZGdldElkLmNsb3Nlc3QoJy5TZWFyY2hTRC5zaG93RmF2b3JpdGUnKS5yZW1vdmVDbGFzcygnTXVsdGlTZWxlY3RBY3RpdmUnKTtcclxuXHRcdFx0XHRcdCR3aWRnZXRJZC5jbG9zZXN0KCcuU2VhcmNoU0RfY29udGVudCAuU2VsZWN0U0QgJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuU2VsZWN0U0RfY29udGVudFdyYXBwZXInKVxyXG5cdFx0XHRcdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnY2xpY2sgNiAuU2VsZWN0U0RfY29udGVudFdyYXBwZXInLCBlKTtcclxuXHRcdFx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5MaW5lQWN0aW9uTElOSyA+IGEnKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuY2xpY2soKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKCcuU2VsZWN0U0RfYWN0aW9uTGluaycpXHJcblx0XHRcdFx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdjbGljayA1IC5TZWxlY3RTRF9hY3Rpb25MaW5rJywgZSk7XHJcblx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuTGluZUFjdGlvbkxJTksgPiBhJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LmNsaWNrKCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGlzTXVsdGlwbGUgPT09ICdUcnVlJykge1xyXG5cdFx0XHRjb25zb2xlLmxvZygkKCcuU2VsZWN0U0RfX211bHRpcGxlJykpO1xyXG5cdFx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX19tdWx0aXBsZSA+IGlucHV0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2NsaWNrIDQnLCB0aGlzKTtcclxuXHRcdFx0XHRTU0RDaGVja0JveFNlbGVjdCgkU1NEc2VsZWN0SWQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX19zdGFyTGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYgKCEkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEIC5TZWxlY3RTRF9fc3RhcldyYXBwZXInKS5oYXNDbGFzcygnc3RhckRpc2FibGVkJykpIHtcclxuXHRcdFx0XHRpZiAoJFNTRHNlbGVjdElkLmZpbmQoJy5TZWxlY3RTRCAuU2VsZWN0U0RfX3N0YXJXcmFwcGVyJykuaGFzQ2xhc3MoJ3N0YXJTZWxlY3RlZCcpKSB7XHJcblx0XHRcdFx0XHRPcGVuQ29uZmlybVBvcHVwKCRTU0RzZWxlY3RJZCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRTU0RzZWxlY3RJZC5maW5kKCcuU2VsZWN0U0RfX3N0YXJUcmlnZ2VyID4gYScpLmNsaWNrKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLlNlbGVjdFNEX2NvbnRlbnRXcmFwcGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHQkQ29tcG9uZW50U1NEID0gJFNTRHNlbGVjdElkLmNsb3Nlc3QoJy5TZWFyY2hTRCcpO1xyXG5cdFx0XHQkU1NEc2VsZWN0SWQuZmluZCgnLkxpbmVBY3Rpb25MSU5LID4gYScpLmNsaWNrKCk7XHJcblx0XHRcdGlmICghJENvbXBvbmVudFNTRC5oYXNDbGFzcygnTXVsdGlTZWxlY3RBY3RpdmUnKSkge1xyXG5cdFx0XHRcdFNlYXJjaFNlbGVjdERlZmluZS5TU0RTZWFyY2gucmV0dXJuVG9TZWFyY2goJFNTRHNlbGVjdElkLmNsb3Nlc3QoJy5TZWFyY2hTRCcpKTtcclxuXHRcdFx0XHRTZWFyY2hTZWxlY3REZWZpbmUuU1NEU2VhcmNoLmNsb3NlU1NEKCRTU0RzZWxlY3RJZC5jbG9zZXN0KCcuU2VhcmNoU0QnKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCRTU0RzZWxlY3RJZC5maW5kKCcuU2VsZWN0U0RfYWN0aW9uTGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0JENvbXBvbmVudFNTRCA9ICRTU0RzZWxlY3RJZC5jbG9zZXN0KCcuU2VhcmNoU0QnKTtcclxuXHRcdFx0JFNTRHNlbGVjdElkLmZpbmQoJy5MaW5lQWN0aW9uTElOSyA+IGEnKS5jbGljaygpO1xyXG5cdFx0XHRpZiAoISRDb21wb25lbnRTU0QuaGFzQ2xhc3MoJ011bHRpU2VsZWN0QWN0aXZlJykpIHtcclxuXHRcdFx0XHRTZWFyY2hTZWxlY3REZWZpbmUuU1NEU2VhcmNoLnJldHVyblRvU2VhcmNoKCRTU0RzZWxlY3RJZC5jbG9zZXN0KCcuU2VhcmNoU0QnKSk7XHJcblx0XHRcdFx0U2VhcmNoU2VsZWN0RGVmaW5lLlNTRFNlYXJjaC5jbG9zZVNTRCgkU1NEc2VsZWN0SWQuY2xvc2VzdCgnLlNlYXJjaFNEJykpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuIiwidmFyIFNlYXJjaFNlbGVjdERlZmluZSA9ICh3aW5kb3cuU2VhcmNoU2VsZWN0RGVmaW5lID0gd2luZG93LlNlYXJjaFNlbGVjdERlZmluZSB8fCB7fSk7XHJcblxyXG5TYXBwaGlyZVdpZGdldHMuU1NEU2VhcmNoID0gZnVuY3Rpb24gU1NEc2VhcmNoU2V0dXAoY29uZmlnKSB7XHJcblx0JChmdW5jdGlvbigpIHtcclxuXHRcdHZhciAkU1NEd2lkZ2V0ID0gJCgnIycgKyBjb25maWcuU1NEV2lkZ2V0SWQpOyAvLyBTU0RDb21wb25lbnQgbWFwIG5vdCB1c2VkIGFnYWluXHJcblx0XHR2YXIgJFNTRENvbXBvbmVudCA9ICRTU0R3aWRnZXQuZmluZCgnLlNlYXJjaFNEJyk7IC8vIFNTRFNlYXJjaCBDb21wb25lbnQgaWQgZm9yIHVzZSBpbiB0aGUgZnVuY3Rpb24gYW5kIG1hbmlwdWxhdGUgY2xhc3Nlc1xyXG5cdFx0dmFyICRTU0RDb21wb25lbnRDb250ZW50ID0gJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfY29udGVudCcpOyAvLyBTU0Rjb21wb25lbnQgY29udGVudFxyXG5cdFx0dmFyIGhhc0Nsb25lID0gY29uZmlnLkhhc0Nsb25lOyAvLyBIYXNDbG9uZSB2YXJpYWJsZSBpbnB1dCBwYXJhbWV0ZXIgdmFsdWVcclxuXHRcdHZhciBoYXNGYXZvcml0ZSA9IGNvbmZpZy5IYXNGYXZvcml0ZTsgLy8gSGFzRmF2b3JpdGUgdmFyaWFibGUgaW5wdXQgcGFyYW1ldGVyIHZhbHVlXHJcblx0XHR2YXIgc2hvd0Nsb25lcyA9IGNvbmZpZy5TaG93Q2xvbmVzOyAvLyBTaG93Q2xvbmVzIHZhcmlhYmxlIGlucHV0IHBhcmFtZXRlciB2YWx1ZVxyXG5cdFx0dmFyIGxldHRlckxpbWl0ID0gY29uZmlnLkxpbWl0TGV0dGVyOyAvLyBOdW1iZXIgb2YgbGV0dGVyIHRvIGVudGVyIGJlZm9yZSB0cmlnZ2VyIHRoZSBzZWFyY2ggYWN0aW9uXHJcblx0XHR2YXIgaGFzU2hpZWxkID0gY29uZmlnLkhhc1NoaWVsZDtcclxuXHRcdHZhciBzaGllbGRUaW1lb3V0ID0gY29uZmlnLlNoaWVsZFRpbWVvdXQ7XHJcblx0XHR2YXIgJHdpZGdldFNoaWVsZCA9ICRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNELS1zaGllbGQnKTtcclxuXHRcdHZhciBzZWFyY2hUcmlnZ2VyVGltZXI7XHJcblxyXG5cdFx0dmFyIGV4ZWN1dGVTZWFyY2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHNlYXJjaFRyaWdnZXJUaW1lcik7XHJcblx0XHRcdHNlYXJjaFRyaWdnZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0VHJpZ2dlclNlYXJjaCgkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0fSwgNzAwKTtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGhhc1NoaWVsZCkge1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkd2lkZ2V0U2hpZWxkLmhpZGUoKTtcclxuXHRcdFx0fSwgc2hpZWxkVGltZW91dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyogIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcclxuXHRcdCAqICAgYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxyXG5cdFx0ICogICBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcclxuXHRcdCAqICAgbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cclxuXHRcdCAqL1xyXG5cdFx0dmFyIGRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcblx0XHRcdHZhciB0aW1lb3V0O1xyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gZXhlY3V0ZWRGdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgY29udGV4dCA9IHRoaXM7XHJcblx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG5cdFx0XHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdFx0XHRpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xyXG5cdFx0XHRcdGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKioqKlxyXG5cdFx0ICogICBSZXNldCBTZWFyY2ggVUkgdG8gdGhlIGluaXRpYWwgc3RhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHJlc2V0VUkgPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19pbnB1dFdyYXBwZXInKS5zaG93KCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3NlYXJjaF9mYXZvcml0ZUxpbmsnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19fZ29Ub0Zhdm9yaXRlJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVDb3VudGVyJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVBY3Rpb25zJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVSZW1vdmUnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19jbG9uZVdyYXBwZXInKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19pbnB1dFdyYXBwZXIgLlNlYXJjaFNEX19yZXR1cm4nKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ3Nob3dGYXZvcml0ZScpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdzaG93Q2xvbmUnKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqXHJcblx0XHQgKiAgR28gdG8gRmF2b3JpdGVzIFVJXHJcblx0XHQgKiAgLS0gIHJlc3QgU1NEY29tcG9uZW50XHJcblx0XHQgKiAgLS0gIHNob3cgRmF2b3JpdGUgZmVhdHVyZXNcclxuXHRcdCAqICAtLSAgcmVtb3ZlIGNsYXNzIHNob3dDbG9uZSBpZiBjb21wb25lbnQgaGF2ZSB0aGF0IGNsYXNzXHJcblx0XHQgKiAgLS0gIGFkZCBjbGFzcyBzaG93RmF2b3JpdGUgdG8gaGF2ZSBjb21wb25lbnQgY29udHJvbFxyXG5cdFx0ICogIC0tICBhZGRDbGFzcyBPcGVuIHdpdGggc2xpZGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGdvVG9GYXZvcml0ZXMgPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdHJlc2V0VUkoJFNTRENvbXBvbmVudCk7XHJcblxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnT3BlbicpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fcmV0dXJuJykuaGlkZSgpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9faW5wdXRXcmFwcGVyJykuaGlkZSgpO1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5oYXNDbGFzcygnc2hvd0Nsb25lJykpIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdzaG93Q2xvbmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVDb3VudGVyJykuc2hvdygpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zZWFyY2hfZmF2b3JpdGVMaW5rICcpLnNob3coKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX0Zhdm9yaXRlUmVtb3ZlICcpLnNob3coKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX0Zhdm9yaXRlQWN0aW9ucycpLnNob3coKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5hZGRDbGFzcygnc2hvd0Zhdm9yaXRlJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlbGVjdFNELmhhc0Zhdm9yaXRlID4gYScpLmZvY3VzKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ09wZW4nKTtcclxuXHJcblx0XHRcdC8vIGxvYWRpbmcgc2hvdyBoaWRlIGxpc3RcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfY29udGVudExpc3QnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19sb2FkaW5nJykuc2hvdygpO1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2hvd01vcmUgYScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZScpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKioqKioqKioqKioqKipcclxuXHRcdCAqXHJcblx0XHQgKiAgR28gdG8gQ2xvbmUgVUlcclxuXHRcdCAqICAtLSAgcmVtb3ZlIGNsYXNzIE9wZW5cclxuXHRcdCAqICAtLSBBZGQgU2hvd0Nsb25lIGNsYXNzXHJcblx0XHQgKiAgLS0gU2xpZGVEb3duIGVmZmVjdCBhbmQgYWRkIE9wZW4gQ2xhc3NcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGdvVG9DbG9uZSA9IGZ1bmN0aW9uKCRTU0RDb21wb25lbnQpIHtcclxuXHRcdFx0Ly8gbG9hZGluZyBzaG93IGhpZGUgbGlzdFxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9jb250ZW50TGlzdCcpLmhpZGUoKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX2xvYWRpbmcnKS5zaG93KCk7XHJcblx0XHRcdGlmICgkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZSBhJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3Nob3dNb3JlJykuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0JykudmFsKCcnKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnT3BlbicpO1xyXG5cclxuXHRcdFx0aWYgKCEkU1NEQ29tcG9uZW50Lmhhc0NsYXNzKCdzaG93Q2xvbmUnKSkge1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ3Nob3dDbG9uZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ09wZW4nKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqIFJldHVybiB0byBzZWFyY2ggZnJvbSBmYXZvcml0ZSBvciBjbG9uZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgcmV0dXJuVG9TZWFyY2ggPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdC8vIGxvYWRpbmcgc2hvdyBoaWRlIGxpc3RcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfY29udGVudExpc3QnKS5oaWRlKCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19sb2FkaW5nJykuc2hvdygpO1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2hvd01vcmUgYScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZScpLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVzZXRVSSgkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnc2hvd0Nsb25lJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ3Nob3dGYXZvcml0ZScpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdPcGVuJyk7XHJcblxyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9faW5wdXRXcmFwcGVyIC5TZWFyY2hTRF9fcmV0dXJuJykuaGlkZSgpO1xyXG5cclxuXHRcdFx0aWYgKCRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ2hhc0Nsb25lJykpIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmFkZENsYXNzKCdoYXNDbG9uZScpO1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19jbG9uZVdyYXBwZXInKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ2hhc0Zhdm9yaXRlJykpIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmFkZENsYXNzKCdoYXNGYXZvcml0ZScpO1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX3NlYXJjaF9mYXZvcml0ZUxpbmsnKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgU1NEQ2xlYXIgY2xvc2VzIFNTRFNlYXJjaCBjb250YWluZXJcclxuXHRcdCAqICAgYW5kIGNsZWFyIHNzZCBmaWx0ZXIgaW5wdXRcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHNzZENsZWFyID0gZnVuY3Rpb24oJFNTRENvbXBvbmVudCkge1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdPcGVuJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKS52YWwoJycpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKlxyXG5cdFx0ICogICBDbG9zZVNTRCBjbG9zZXMgU1NEU2VhcmNoIGNvbnRhaW5lclxyXG5cdFx0ICogICBtdXN0IHJlbW92ZSBoaWdodGxpZ2h0U2VsZWN0aW9uIGRvbmUgYnkga2V5Ym9hcmQgbmF2aWdhdGlvblxyXG5cdFx0ICovXHJcblx0XHR2YXIgY2xvc2VTU0QgPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ09wZW4nKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudENvbnRlbnQuc2xpZGVVcCgnMjUwJyk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJy5zZWxlY3RlZCcpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX3JlbW92ZScpLmhpZGUoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgQWRkIE9wZW4gY2xhc3MgdG8gU1NEQ29tcG9uZW50XHJcblx0XHQgKiAgIGlmIFNTRENvbXBvbmVudCBoYXMgY2xhc3MgT3BlbiB0aGVuIGZvY3VzXHJcblx0XHQgKiAgIG1ha2VzIG9wZW4gZWZmZWN0LCBjaGVjayB0aGUgY2hhcmFjdGVycyBpbnNpZGUgdGhlIGlucHV0IHRvIGZpbHRlclxyXG5cdFx0ICovXHJcblx0XHR2YXIgc3NkRm9jdXMgPSBmdW5jdGlvbigkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdGlmICghJFNTRENvbXBvbmVudC5oYXNDbGFzcygnT3BlbicpKSB7XHJcblx0XHRcdFx0Ly8gbG9hZGluZyBzaG93IGhpZGUgbGlzdFxyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX2NvbnRlbnRMaXN0JykuaGlkZSgpO1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19sb2FkaW5nJykuc2hvdygpO1xyXG5cdFx0XHRcdGlmICgkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZSBhJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0Rfc2hvd01vcmUnKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdPcGVuJyk7XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnLnNob3dDbG9uZScpO1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJy5zaG93RmF2b3JpdGUnKTtcclxuXHJcblx0XHRcdFx0aWYgKCEkU1NEQ29tcG9uZW50Lmhhc0NsYXNzKCdPcGVuJykpIHtcclxuXHRcdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaExpbmtJbnB1dCBhJykuY2xpY2soKTtcclxuXHRcdFx0XHRcdCRTU0RDb21wb25lbnQuYWRkQ2xhc3MoJ09wZW4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgV2hlbiBjbGlja2luZyBjbGlja2luZyBvdXRzaWRlIHRoZSBjb21wb25lbnRcclxuXHRcdCAqICAgdGhlIFNTRCBtdXN0IGNsb3NlIGFuZCByZXR1cm4gdG8gaW5pdGlhbCBzdGF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgQ2xpY2tPdXQgPSBmdW5jdGlvbihlLCAkU1NEQ29tcG9uZW50KSB7XHJcblx0XHRcdGlmICghJFNTRENvbXBvbmVudC5pcyhlLnRhcmdldCkgJiYgJFNTRENvbXBvbmVudC5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVyblRvU2VhcmNoKCRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiAgIFRyaWdnZXJzIHRoZSBsaW5rIHRvIGluaXRpYWxpemVcclxuXHRcdCAqICAgdGhlIGRhdGFiYXNlIHNlYXJjaCBiYXNlZCBvbiBjdXJyZW50IGxlbmd0aCBvZiB0aGUgc3RyaW5nIGluc2VydGVkIG9uIHRoZSBpbnB1dFxyXG5cdFx0ICovXHJcblx0XHR2YXIgVHJpZ2dlclNlYXJjaCA9IGZ1bmN0aW9uKCRTU0RDb21wb25lbnQpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRXb3JkID0gJFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX19pbnB1dCBpbnB1dCcpLnZhbCgpO1xyXG5cdFx0XHR2YXIgY3VycmVudENvdW50ID0gY3VycmVudFdvcmQubGVuZ3RoO1xyXG5cdFx0XHRpZiAoY3VycmVudENvdW50ID49IGxldHRlckxpbWl0IHx8IGN1cnJlbnRDb3VudCA9PT0gMCkge1xyXG5cdFx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaExpbmtJbnB1dCA+IGEnKS5jbGljaygpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiAgIFJlbW92ZXMgYWxsIGZhdm9yaXRlIGNoZWNrZWQgYm94ZXNcclxuXHRcdCAqICAgYW5kIGVuZHMgTXVsdGlwbGVTZWxlY3RcclxuXHRcdCAqL1xyXG5cdFx0dmFyIE11bHRpVW5jaGVjayA9IGZ1bmN0aW9uKCRTU0RDb21wb25lbnQpIHtcclxuXHRcdFx0JGNoZWNrQm94ZXMgPSAkU1NEQ29tcG9uZW50LnBhcmVudCgpLmZpbmQoJy5TZWxlY3RTRF9fbXVsdGlwbGUgPiBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5yZW1vdmVDbGFzcygnTXVsdGlTZWxlY3RBY3RpdmUnKTtcclxuXHJcblx0XHRcdCRTU0RDb21wb25lbnRcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuZmluZCgnLlNlbGVjdFNEX19tdWx0aXBsZSA+IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpXHJcblx0XHRcdFx0LmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiAgIEtleUJvYXJkIGV2ZW50cyB1cCBkb3duIGFuZCBlbnRlciBpZiBub3QgZmlsdGVyXHJcblx0XHQgKi9cclxuXHRcdHZhciBrZXlib2FyZEV2ZW50cyA9IGZ1bmN0aW9uKGUsICRTU0RDb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKCRTU0RDb21wb25lbnQuaGFzQ2xhc3MoJ09wZW4nKSkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50U2VsZWN0ZWQgPSAkU1NEQ29tcG9uZW50Q29udGVudC5maW5kKCcuTGlzdFJlY29yZHMgPiBzcGFuLnNlbGVjdGVkJyk7IC8vIEN1cnJlbnQgc2VsZWN0YWJsZSBpdGVtXHJcblx0XHRcdFx0dmFyICRmaXJzdFNlbGVjdCA9ICRTU0RDb21wb25lbnRDb250ZW50LmZpbmQoJy5MaXN0UmVjb3JkcyA+IHNwYW46Zmlyc3QtY2hpbGQnKTsgLy8gRmlyc3Qgc2VsZWN0YWJsZSBpdGVtXHJcblx0XHRcdFx0dmFyICRsYXN0U2VsZWN0ID0gJFNTRENvbXBvbmVudENvbnRlbnQuZmluZCgnLkxpc3RSZWNvcmRzID4gc3BhbjpsYXN0LWNoaWxkJyk7IC8vIExhc3Qgc2VsZWN0YWJsZSBpdGVtXHJcblx0XHRcdFx0dmFyIGNvdW50U2VsZWN0ZWQgPSBjdXJyZW50U2VsZWN0ZWQubGVuZ3RoOyAvLyBOdW1iZXIgb2Ygc2VsZWN0ZWQgaXRlbVxyXG5cclxuXHRcdFx0XHRpZiAoZS53aGljaCA9PSAzOCkge1xyXG5cdFx0XHRcdFx0Ly8gaWYga2V5IHByZXNzZWQgaXMgdXAgYXJyb3dcclxuXHRcdFx0XHRcdGlmIChjb3VudFNlbGVjdGVkID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdGN1cnJlbnRTZWxlY3RlZCA9ICRsYXN0U2VsZWN0O1xyXG5cdFx0XHRcdFx0XHQkbGFzdFNlbGVjdC5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGN1cnJlbnRTZWxlY3RlZC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0bmV4dCA9IGN1cnJlbnRTZWxlY3RlZC5wcmV2KCk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAobmV4dC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudFNlbGVjdGVkID0gbmV4dC5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQgPSBjdXJyZW50U2VsZWN0ZWQubGFzdCgpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChlLndoaWNoID09IDQwKSB7XHJcblx0XHRcdFx0XHQvLyBpZiBrZXkgcHJlc3NlZCBpcyBkb3duIGFycm93XHJcblx0XHRcdFx0XHRpZiAoY291bnRTZWxlY3RlZCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHQkZmlyc3RTZWxlY3QuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRuZXh0ID0gY3VycmVudFNlbGVjdGVkLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0Y3VycmVudFNlbGVjdGVkLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKG5leHQubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRTZWxlY3RlZCA9IG5leHQuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudFNlbGVjdGVkID0gY3VycmVudFNlbGVjdGVkLmVxKDApLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIGlmIChlLndoaWNoID09IDEzKSB7XHJcblx0XHRcdFx0XHQvLyBpZiBrZXkgcHJlc3NlZCBpcyBlbnRlclxyXG5cdFx0XHRcdFx0aWYgKGNvdW50U2VsZWN0ZWQgPiAwKSB7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0Y3VycmVudFNlbGVjdGVkLmZpbmQoJy5TZWxlY3RTRCAuU2VsZWN0U0RfYWN0aW9uTGluaycpLmNsaWNrKCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICgkU1NEQ29tcG9uZW50LmZpbmQoJ1NlYXJjaFNEX19faW5wdXQgaW5wdXQnKS5pcygnOmFjdGl2ZScpICYmIGNvdW50U2VsZWN0ZWQgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZXhlY3V0ZVNlYXJjaCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKlxyXG5cdFx0ICogICBUaGUgZmlyc3Qgc3RlcCBpcyB0byByZXNldCB0aGUgc2VldGluZ3MgdG8gZGVmYXVsdFxyXG5cdFx0ICovXHJcblx0XHRyZXNldFVJKCRTU0RDb21wb25lbnQpO1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiAgUmVtb3ZlIGF1dG9Db21wbGV0ZSBmcm9tIHNlYXJjaCBpbnB1dFxyXG5cdFx0ICovXHJcblx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0JykuYXR0cignYXV0b2NvbXBsZXRlJywgJ29mZicpO1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiAgIElmIFNTRCBoYXMgQ2xvbmUgYW5kIHRoZSBjbG9uZSBsaXN0IGlzIHZpc2libGVcclxuXHRcdCAqICAgb25jbGljayBcIkNsb25lIHByZXZpb3VzIG1lZGljYXRpb25cIiB0aGVuXHJcblx0XHQgKiAgIHJlbW92ZSBPcGVuIGFuZCBzaG93IGl0ZW1zIHRvIGNsb25lIGxpc3RcclxuXHRcdCAqL1xyXG5cdFx0aWYgKGhhc0Nsb25lID09PSAnVHJ1ZScpIHtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5hZGRDbGFzcygnaGFzQ2xvbmUnKTtcclxuXHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX2Nsb25lV3JhcHBlcicpLnNob3coKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGFzRmF2b3JpdGUgPT09ICdUcnVlJykge1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmFkZENsYXNzKCdoYXNGYXZvcml0ZScpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zZWFyY2hfZmF2b3JpdGVMaW5rJykuc2hvdygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgoaGFzQ2xvbmUgPT09ICdUcnVlJykgJiAoc2hvd0Nsb25lcyA9PT0gJ1RydWUnKSkge1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9jbG9uZVdyYXBwZXInKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkU1NEQ29tcG9uZW50LmFkZENsYXNzKCdPcGVuJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19GYXZvcml0ZVJlbW92ZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzc2RDbGVhcigkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0cmV0dXJuVG9TZWFyY2goJFNTRENvbXBvbmVudCk7XHJcblx0XHRcdGRlYm91bmNlKFRyaWdnZXJTZWFyY2goJFNTRENvbXBvbmVudCksIDU1MCk7XHJcblx0XHRcdGRlYm91bmNlKCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKS5mb2N1cygpLCA1NjApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX2Nsb25lV3JhcHBlcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRnb1RvQ2xvbmUoJFNTRENvbXBvbmVudCk7XHJcblx0XHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19fZ29Ub0Nsb25lID4gYScpLmNsaWNrKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9faW5wdXRXcmFwcGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICgkU1NEQ29tcG9uZW50Lmhhc0NsYXNzKCdzaG93Q2xvbmUnKSkge1xyXG5cdFx0XHRcdHJldHVyblRvU2VhcmNoKCRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fRmF2b3JpdGVBY3Rpb25zQ2FuY2VsJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdE11bHRpVW5jaGVjaygkU1NEQ29tcG9uZW50KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCRTU0RDb21wb25lbnQuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKS5mb2N1cyhmdW5jdGlvbigpIHtcclxuXHRcdFx0ZGVib3VuY2Uoc3NkRm9jdXMoJFNTRENvbXBvbmVudCksIDYwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyAkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2lucHV0IGlucHV0Jykuc2VsZWN0KGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gXHRpZiAoJCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKS52YWwoKS5sZW5ndGggPiAwKSB7XHJcblx0XHQvLyBcdFx0c3NkQ2xlYXIoJFNTRENvbXBvbmVudCk7XHJcblx0XHQvLyBcdFx0ZGVib3VuY2Uoc3NkRm9jdXMoJFNTRENvbXBvbmVudCksIDYwMCk7XHJcblx0XHQvLyBcdH1cclxuXHRcdC8vIH0pO1xyXG5cclxuXHRcdCQoJ2JvZHknKS5tb3VzZXVwKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0Q2xpY2tPdXQoZSwgJFNTRENvbXBvbmVudCk7XHJcblx0XHR9KTtcclxuXHRcdC8qXHJcblx0XHQgKiAgIEtleUJvYXJkIGV2ZW50cyBvbiBrZXkgcHJlc3NcclxuXHRcdCAqL1xyXG5cdFx0JFNTRENvbXBvbmVudFxyXG5cdFx0XHQuZmluZCgnLlNlYXJjaFNEX19faW5wdXQgaW5wdXQnKVxyXG5cdFx0XHQuYWRkKCRTU0RDb21wb25lbnQuZmluZCgnLlNlbGVjdFNEX2FjdGlvbkxpbmsnKSlcclxuXHRcdFx0Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRpZiAoIWUud2hpY2ggIT0gMTMpIHtcclxuXHRcdFx0XHRcdGtleWJvYXJkRXZlbnRzKGUsICRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0LypcclxuXHRcdCAqICAgUHJldmVudCBmb3JtIHN1Ym1pc3Npb24gb24gZW50ZXIsXHJcblx0XHQgKiAgIGluc3RlYWQgZ28gdG8ga2V5Ym9hcmQgZXZlbnRzIHRvIHRyaWdnZXJcclxuXHRcdCAqICAgdGhlIHNlbGVjdGlvblxyXG5cdFx0ICovXHJcblx0XHQkKCRTU0RDb21wb25lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZiAoZS53aGljaCA9PSAxMykge1xyXG5cdFx0XHRcdGtleWJvYXJkRXZlbnRzKGUsICRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX3JlbW92ZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzc2RDbGVhcigkU1NEQ29tcG9uZW50KTtcclxuXHRcdFx0ZGVib3VuY2UocmV0dXJuVG9TZWFyY2goJFNTRENvbXBvbmVudCksIDYwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zZWFyY2hfZmF2b3JpdGVMaW5rJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNzZENsZWFyKCRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHRnb1RvRmF2b3JpdGVzKCRTU0RDb21wb25lbnQpO1xyXG5cdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9fX2dvVG9GYXZvcml0ZSA+IGEnKS5jbGljaygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX0Zhdm9yaXRlQWN0aW9uc0FkZCA+IGEnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0ZGVib3VuY2UoVHJpZ2dlclNlYXJjaCgkU1NEQ29tcG9uZW50KSwgMjAwKTtcclxuXHRcdFx0ZGVib3VuY2UocmV0dXJuVG9TZWFyY2goJFNTRENvbXBvbmVudCksIDM1MCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvKlxyXG5cdFx0ICogICBPbiBBamF4IFJlcXVlc3QgaGlkZSBsb2FkaW5nIGRpdiBpZiB0aGUgU1NEIGlzIG9wZW4gdGhlbiBzaG93IHRoZVxyXG5cdFx0ICogICBMaXN0UmVjb3Jkc1xyXG5cdFx0ICovXHJcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoJFNTRENvbXBvbmVudC5oYXNDbGFzcygnT3BlbicpKSB7XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudC5maW5kKCcuU2VhcmNoU0RfX2xvYWRpbmcnKS5oaWRlKCk7XHJcblx0XHRcdFx0JFNTRENvbXBvbmVudENvbnRlbnQuc2xpZGVEb3duKCcxMDAwJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9jb250ZW50TGlzdCcpLnNob3coKTtcclxuXHRcdFx0XHRcdGlmICgkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZSBhJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHQkU1NEQ29tcG9uZW50LmZpbmQoJy5TZWFyY2hTRF9zaG93TW9yZScpLnNob3coKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnZm9ybScpLmFwcGVuZCgnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3NkSW5wdXRcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiICBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIiAvPicpO1xyXG5cclxuXHRcdHdpbmRvdy5TZWFyY2hTZWxlY3REZWZpbmUuU1NEU2VhcmNoID0ge1xyXG5cdFx0XHRyZXR1cm5Ub1NlYXJjaDogcmV0dXJuVG9TZWFyY2gsXHJcblx0XHRcdHJlc2V0VUk6IHJlc2V0VUksXHJcblx0XHRcdGNsb3NlU1NEOiBjbG9zZVNTRCxcclxuXHRcdFx0c3NkRm9jdXM6IHNzZEZvY3VzLFxyXG5cdFx0XHRUcmlnZ2VyU2VhcmNoOiBUcmlnZ2VyU2VhcmNoLFxyXG5cdFx0XHRzc2RDbGVhcjogc3NkQ2xlYXIsXHJcblx0XHR9O1xyXG5cdH0pO1xyXG59O1xyXG4vLyBBZGRlZCB0byBjbG9zZSB0aGUgc2VsZWN0IGxpc3QgaWYgd2UgY2xpY2sgdGhlIHByZXNjcmlwdGlvbiBJZnJhbWU7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKGV2ZW50KSA9PiB7XHJcblx0dmFyIHJvb3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG5cdCdjbGljaycsXHJcblx0ZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVbc3JjKj0nUHJlc2NyaXB0aW9uc19DVyddXCIpICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVbc3JjKj0nUHJlc2NyaXB0aW9uc19DVyddXCIpLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuU2VhcmNoU0RcIikuY2xhc3NMaXN0LnJlbW92ZSgnT3BlbicpO1xyXG5cdFx0XHR2YXIgYWxsSW5wdXQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLlNlYXJjaFNEX19faW5wdXQnKS5jaGlsZHJlbjtcclxuXHRcdFx0Zm9yKGNvbnN0IGVsZW1lbnQgaW4gYWxsSW5wdXQpe1xyXG5cdFx0XHRcdHJldHVybiBhbGxJbnB1dFtlbGVtZW50XS52YWx1ZSE9dW5kZWZpbmVkP2FsbElucHV0W2VsZW1lbnRdLnZhbHVlPScnOm51bGw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0dHJ1ZVxyXG4pO1xyXG59KTtcclxuXHJcbiIsIi8qIENvbXBvbmVudCBTZWFyY2hDbGllbnRTaWRlICovXHJcblxyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblxyXG4gIGNsYXNzIFNlYXJjaENsaWVudFNpZGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgLi4uY29uZmlnLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdGhpcy5vbkNvbXBvbmVudEluaXQoKTtcclxuXHJcbiAgICAgICQod2luZG93KS5sb2FkKCgpID0+IHtcclxuICAgICAgICBvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KCgpID0+IHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAkKCcjJyArIHRoaXMub3B0aW9ucy5pbnB1dElkKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkNvbXBvbmVudEluaXQoKSB7XHJcbiAgICAgICQoJyMnICsgdGhpcy5vcHRpb25zLmlucHV0SWQpLm9uKCdjaGFuZ2Uga2V5ZG93biBwYXN0ZSBpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zZWFyY2hDbGllbnRTaWRlKHRoaXMub3B0aW9ucy5pbnB1dElkLCB0aGlzLm9wdGlvbnMuc2VhcmNoYWJsZUVsZW1lbnRTZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hDbGllbnRTaWRlKGlucHV0SWQsIHNlbGVjdG9yKSB7XHJcbiAgICAgIGlmICgkKCcjJyArIGlucHV0SWQpLmlzKCc6dmlzaWJsZScpKSB7XHJcbiAgICAgICAgdmFyIHNlYXJjaFRleHQgPSBvc2pzKCcjJyArIGlucHV0SWQpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIHNlYXJjaENvdW50ZXIgPSAwO1xyXG4gICAgICAgIHZhciBzZWxlY2lvbiA9IG9zanMoc2VsZWN0b3IpO1xyXG4gICAgICAgIHNlbGVjaW9uLnJlbW92ZUNsYXNzKCdzZWFyY2hOb3RGb3VuZCcpO1xyXG4gICAgICAgIHNlbGVjaW9uLnJlbW92ZUNsYXNzKCdzZWFyY2hGb3VuZCcpO1xyXG4gICAgICAgIHNlbGVjaW9uLnVuaGlnaGxpZ2h0KCk7XHJcbiAgICAgICAgaWYgKHNlYXJjaFRleHQubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgc2VsZWNpb24uZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlubmVyVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRleHQpID4gLTEpIHtcclxuICAgICAgICAgICAgICBvc2pzKHRoaXMpLmFkZENsYXNzKCdzZWFyY2hGb3VuZCcpO1xyXG4gICAgICAgICAgICAgIHNlYXJjaENvdW50ZXIrKztcclxuICAgICAgICAgICAgICBvc2pzKHRoaXMpLmhpZ2hsaWdodChzZWFyY2hUZXh0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBvc2pzKHRoaXMpLmFkZENsYXNzKCdzZWFyY2hOb3RGb3VuZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb25zdCBjcmVhdGUgPSBjb25maWcgPT4gKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IFNlYXJjaENsaWVudFNpZGUoY29uZmlnKSk7XHJcblxyXG4gIFNhcHBoaXJlV2lkZ2V0cy5TZWFyY2hDbGllbnRTaWRlID0ge1xyXG4gICAgY3JlYXRlLFxyXG4gIH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgU2VjdGlvbkV4cGFuZGFibGUgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU4JykgfHwgJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU5JykpIHtcclxuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFqYXggcmVmcmVzIGZ1bmN0aW9uXHJcblx0XHR0aGF0LmFqYXhSZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoKTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gc2VsZWN0LCAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIGEnKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgbmV3IGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxyXG5cdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID0ge1xyXG5cdFx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxyXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcclxuXHRcdFx0XHRpZiAoY3VyU3RhdGUgIT0gcHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10pIHtcclxuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gZmFsc2UgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpXHJcblx0XHRcdFx0XHRcdFx0LmhlaWdodCgwKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gdHJ1ZSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIHNldCBldmVudHNcclxuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7XHJcblx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRzZXJ2ZXI6IHN0YXQsXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ0hpZGVXaGVuRW1wdHknKSAmJiAkKHRoaXMpLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50JykudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBoYWNrIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gU2VjdGlvbkV4cGFuZGFibGVDdXN0b20gaGFzIG5vIGNoaWxkIGl0ZW1zXHJcblx0XHRcdFx0dmFyIGlzRW1wdHkgPSB0cnVlO1xyXG5cdFx0XHRcdCQodGhpcykuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tX2NvbnRlbnQgZGl2LCAuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCBzcGFuJykubm90KCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGlzRW1wdHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGlmICghaXNFbXB0eSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZScsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblx0XHRcdFx0dmFyICRleHBhbmRhYmxlSW5zdGFuY2UgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciAkdG9nZ2xlciA9ICQodGhpcykuZmluZCgnPiAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIC5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVyJyk7XHJcblx0XHRcdFx0aWYgKCR0b2dnbGVyLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyICR0b2dnbGVyU3RhdGUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0JHRvZ2dsZXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHQkdG9nZ2xlclN0YXRlID0gISR0b2dnbGVyU3RhdGU7XHJcblx0XHRcdFx0XHRcdGlmICgkdG9nZ2xlclN0YXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0JGV4cGFuZGFibGVJbnN0YW5jZS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGUtdG9nZ2xlZCcpLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHQkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHZhbHVlXScpLnRleHQoJHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWxoaWRlXScpLmRhdGEoJ2xhYmVsaGlkZScpKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQkZXhwYW5kYWJsZUluc3RhbmNlLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVkJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoXCJjbGlja1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gYScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkV4cGFuZGFibGVDdXN0b20oKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2lsa1VJRnJhbWV3b3JrL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2VjdGlvbkV4cGFuZGFibGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHQvLyB0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0Ly8gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdC8vIFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cclxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpLm9mZigpO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcclxuXHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zIHRvIGNyZWF0ZSBhcnJheSBzdGF0XHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7IGNsaWVudDogc3RhdCwgc2VydmVyOiBzdGF0IH07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpXHJcblx0XHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBzZXRPcGVuQ2xvc2VDbGFzcyA9IGlkID0+IHtcclxuXHRcdGlkLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoaWQucGFyZW50KCkuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLkhlYWRlckljb24nKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnY2xvc2VkJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnY2xvc2VkJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnb3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUoKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2lsa1VJRnJhbWV3b3JrL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRzZXRPcGVuQ2xvc2VDbGFzcyxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFNlbGVjdFN5c3RlbSAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU2VsZWN0U3lzdGVtID0gY29uZmlnID0+IHtcclxuXHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIFdpZGdldElkID0gY29uZmlnLldpZGdldElkOyAvL0NvbWJvIEJveCBJZCB0byBiZSB1c2VkLlxyXG5cdFx0dmFyIENsYXNzID0gY29uZmlnLkNsYXNzOyAvL0FsbCBDb21ibyBib3hlcyB3aXRoIHRoaXMgY2xhc3Mgd2lsbCBiZSBiZSB0cmFuc2Zvcm1lZC5cclxuXHRcdHZhciBOb1Jlc3VsdHNUZXh0ID0gY29uZmlnLk5vUmVzdWx0c1RleHQ7IC8vVGV4dCB0byBkaXNwbGF5IHdoZW4gdGhlcmUgYXJlIG5vIHJlc3VsdHMuXHJcblx0XHR2YXIgaW5wdXRUeXBlID0gY29uZmlnLklucHVUeXBlOyAvL09wdGlvbnM6IEZJbHRlcnMsIERyb3Bkb3duLCBTZWxlY3QyXHJcblx0XHR2YXIgUHJvbXB0ID0gY29uZmlnLlByb21wdDsgLy9Qcm9tcHQgaW4gc2VhcmNoXHJcblx0XHR2YXIgU2VsZWN0MlR5cGUgPSBjb25maWcuU2VsZWN0VHlwZTsgLy8gVHlwZSBvZiBzZWxlY3QyIGNvbmZpZ3VyYXRpb25cclxuXHRcdHZhciBIYXNTZWFyY2ggPSBjb25maWcuSGFzU2VhcmNoOyAvLyBoYXMgc2VhcmNoXHJcblx0XHR2YXIgT25TZWxlY3RpbmdKUyA9IGNvbmZpZy5PblNlbGVjdGluZ0pTO1xyXG5cdFx0dmFyIE9uVW5TZWxlY3RpbmdKUyA9IGNvbmZpZy5PblVuU2VsZWN0aW5nSlM7XHJcblx0XHR2YXIgTWF4aW11bUxlbmd0aCA9IGNvbmZpZy5NYXhpbXVtTGVuZ3RoO1xyXG5cdFx0dmFyIFNlbGVjdGVkVmFsdWUgPSBjb25maWcuU2VsZWN0ZWRWYWx1ZTtcclxuXHRcdHZhciBhbGxvd0NsZWFyID0gY29uZmlnLmFsbG93Q2xlYXI7XHJcblx0XHQvLyAgU2VsZWN0MiBBamF4IENvbmZpZ3VyYXRpb25cclxuXHRcdHZhciBBamF4VVJMID0gY29uZmlnLkFqYXhVUkw7XHJcblx0XHR2YXIgQWpheERlbGF5ID0gY29uZmlnLkFqYXhEZWxheTtcclxuXHRcdHZhciBQYWdpbmF0aW9uU2l6ZSA9IGNvbmZpZy5QYWdpbmF0aW9uU2l6ZTtcclxuXHRcdHZhciBNaW5pbXVtSW5wdXRMZW5naHQgPSBjb25maWcuTWluaW11bUlucHV0TGVuZ2h0O1xyXG5cdFx0dmFyIFNlYXJjaFRlcm0gPSBjb25maWcuU2VhcmNoVGVybTtcclxuXHRcdHZhciBTZWFyY2hFeHRyYVBhcmFtMSA9IGNvbmZpZy5TZWFyY2hFeHRyYVBhcmFtMTtcclxuXHRcdHZhciBQYWdlVGVybSA9IGNvbmZpZy5QYWdlVGVybTtcclxuXHRcdHZhciBBbW91bnRQYWdlID0gY29uZmlnLlBhZ2VBbW91bnQ7XHJcblx0XHR2YXIgaXNNdWx0aXBsZSA9IGNvbmZpZy5pc011bHRpcGxlO1xyXG5cdFx0dmFyIFNlbGVjdDJPcHRpb25zID0ge307XHJcblx0XHR2YXIgJFdpZGdldElkZW50aWZpZXI7XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5sb2NhbGUgPT09ICdBUicgfHwgY29uZmlnLmxvY2FsZSA9PT0gJ0ZBJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kaXIgPSAncnRsJztcclxuXHRcdH1cclxuXHJcblx0XHQvKiAgXHJcbiAgICAgICAgICBDaGFuZ2Ugc2VsZWN0MiBzZWFyY2ggZGlzcGxheSBcclxuICAgICAgICAgICAgICAtTXVsdGlwbGUgU2VsZWN0MiBzZWFyY2ggVUkgbGlrZSBTaW5nbGUgU2VsZWN0MlxyXG4gICAgICAqL1xyXG5cdFx0JC5mbi5zZWxlY3QyLmFtZC5kZWZpbmUoXHJcblx0XHRcdCdTZWFyY2hMaWtlU2luZ2xlJyxcclxuXHRcdFx0W1xyXG5cdFx0XHRcdCdzZWxlY3QyL3V0aWxzJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bicsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQm9keScsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQ29udGFpbmVyJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bi9zZWFyY2gnLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxcclxuXHRcdFx0XSxcclxuXHRcdFx0ZnVuY3Rpb24oVXRpbHMsIERyb3Bkb3duLCBBdHRhY2hCb2R5LCBBdHRhY2hDb250YWluZXIsIFNlYXJjaCwgbWluaW11bVJlc3VsdHNGb3JTZWFyY2gpIHtcclxuXHRcdFx0XHRsZXQgZHJvcGRvd25TZWFyY2ggPSBVdGlscy5EZWNvcmF0ZShEcm9wZG93biwgU2VhcmNoKTtcclxuXHRcdFx0XHRkcm9wZG93blNlYXJjaC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgJHJlbmRlcmVkID0gRHJvcGRvd24ucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdFx0Ly8gQWRkIGFiaWxpdHkgZm9yIGEgcGxhY2Vob2xkZXIgaW4gdGhlIHNlYXJjaCBib3hcclxuXHRcdFx0XHRcdGxldCBwbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5nZXQoJ3BsYWNlaG9sZGVyRm9yU2VhcmNoJykgfHwgJyc7XHJcblx0XHRcdFx0XHR2YXIgJHNlYXJjaCA9ICQoXHJcblx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VhcmNoIHNlbGVjdDItc2VhcmNoLS1kcm9wZG93blwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdCc8aW5wdXQgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaF9fZmllbGRcIiBwbGFjZWhvbGRlcj1cIicgK1xyXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyICtcclxuXHRcdFx0XHRcdFx0XHQnXCIgdHlwZT1cInNlYXJjaFwiJyArXHJcblx0XHRcdFx0XHRcdFx0JyB0YWJpbmRleD1cIi0xXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiJyArXHJcblx0XHRcdFx0XHRcdFx0JyBzcGVsbGNoZWNrPVwiZmFsc2VcIiByb2xlPVwidGV4dGJveFwiIC8+JyArXHJcblx0XHRcdFx0XHRcdFx0Jzwvc3Bhbj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJHNlYXJjaENvbnRhaW5lciA9ICRzZWFyY2g7XHJcblx0XHRcdFx0XHR0aGlzLiRzZWFyY2ggPSAkc2VhcmNoLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHRcdFx0XHQkc2VhcmNoLmFkZENsYXNzKCdNdWx0aXBsZVNlbGVjdCcpO1xyXG5cclxuXHRcdFx0XHRcdCRyZW5kZXJlZC5wcmVwZW5kKCRzZWFyY2gpO1xyXG5cdFx0XHRcdFx0JHNlYXJjaC5wYXJlbnQoKS5hZGRDbGFzcygnTXVsdGlwbGVTZWxlY3QnKTtcclxuXHRcdFx0XHRcdHJldHVybiAkcmVuZGVyZWQ7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gRGVjb3JhdGUgdGhlIGRyb3Bkb3duK3NlYXJjaCB3aXRoIHRoZSBjb250YWluZXJzXHJcblx0XHRcdFx0bGV0IGFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShkcm9wZG93blNlYXJjaCwgQXR0YWNoQ29udGFpbmVyKTtcclxuXHRcdFx0XHRhZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoYWRhcHRlciwgQXR0YWNoQm9keSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBhZGFwdGVyO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmYXVsdCBDb25maWd1cmF0aW9uIG5lZWRlZCB0byBhc3NvY2lhdGUgdGhlIHdpZGdldCB0byB0aGUgc2VsZWN0MiBwbHVnaW5cclxuXHRcdCAqL1xyXG5cdFx0aWYgKFdpZGdldElkID09PSAnJyAmJiBDbGFzcyAhPSAnJykge1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllciA9ICQoJy4nICsgQ2xhc3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JFdpZGdldElkZW50aWZpZXIgPSAkKCcjJyArIFdpZGdldElkKTtcclxuXHRcdH1cclxuXHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3NlbGVjdC1oaWRlICcgKyBpbnB1dFR5cGU7XHJcblxyXG5cdFx0Ly8gIFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duUGFyZW50PSAkKCcjJytQYXJlbnREaXYpO1xyXG5cclxuXHRcdHZhciBmb3JtYXRSZXN1bHQgPSBmdW5jdGlvbihyZXN1bHQpIHtcclxuXHRcdFx0dmFyICRzZWxlY3RlZE9wdGlvbnNWYWx1ZSA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gJHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmxlbmd0aDtcclxuXHRcdFx0dmFyIHRvdGFsT3B0aW9ucyA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbicpLmxlbmd0aDtcclxuXHRcdFx0dmFyIHNlbGVjdEFsbE9wdCA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZDpzZWxlY3RlZCcpLmxlbmd0aDtcclxuXHRcdFx0dmFyIGFjdGl2ZVZhbHVlcyA9ICcnO1xyXG5cdFx0XHR2YXIgYWxsT3B0RXhjZXB0QWxsID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnOnNlbGVjdGVkOm5vdChcIi5TZWxlY3RlZEFsbFwiKScpLmxlbmd0aDtcclxuXHRcdFx0dmFyICRhbGxPcHRFeGNlcHRBbGxPYmogPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCc6c2VsZWN0ZWQ6bm90KFwiLlNlbGVjdGVkQWxsXCIpJyk7XHJcblxyXG5cdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID09PSB0b3RhbE9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAodG90YWxPcHRpb25zIC0gMSA+IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiAnQWxsIFNlbGVjdGVkJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JGFsbE9wdEV4Y2VwdEFsbE9iai5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMgKyAnICcgKyAkKHRoaXMpWzBdLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0YWN0aXZlVmFsdWVzID0gYWN0aXZlVmFsdWVzLnJlcGxhY2UoLyxcXHMqJC8sICcnKTtcclxuXHRcdFx0XHRcdHJldHVybiBhY3RpdmVWYWx1ZXM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciB0b3RhbG9wdCA9IHRvdGFsT3B0aW9ucyAtIDE7XHJcblx0XHRcdFx0aWYgKHNlbGVjdGVkT3B0aW9ucyA+IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiBzZWxlY3RlZE9wdGlvbnMgKyAnIG9mICcgKyB0b3RhbG9wdCArICcgc2VsZWN0ZWQnO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID4gMCkge1xyXG5cdFx0XHRcdFx0XHQkc2VsZWN0ZWRPcHRpb25zVmFsdWUuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMgKyAnICcgKyAkKHRoaXMpWzBdLmlubmVyVGV4dCArICcsICc7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMucmVwbGFjZSgvLFxccyokLywgJycpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYWN0aXZlVmFsdWVzO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICdTZWxlY3QgYW4gb3B0aW9uJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKE5vUmVzdWx0c1RleHQgIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZm9ybWF0Tm9NYXRjaGVzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIE5vUmVzdWx0c1RleHQ7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlucHV0VHlwZSAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gaW5wdXRUeXBlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhbGxvd0NsZWFyID09PSAnVHJ1ZScpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuYWxsb3dDbGVhciA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE1heGltdW1MZW5ndGggIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMubWF4aW11bUlucHV0TGVuZ3RoID0gTWF4aW11bUxlbmd0aDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoUHJvbXB0ICE9ICcnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnBsYWNlaG9sZGVyID0gUHJvbXB0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMucGxhY2Vob2xkZXIgPSB7XHJcblx0XHRcdFx0aWQ6ICctMScsIC8vIHRoZSB2YWx1ZSBvZiB0aGUgb3B0aW9uXHJcblx0XHRcdFx0dGV4dDogJ1NlbGVjdCBhbiBvcHRpb24nLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzMnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgQWpheFxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cclxuXHRcdFx0aWYgKGNvbmZpZy5sb2NhbGUgPT09ICdBUicgfHwgY29uZmlnLmxvY2FsZSA9PT0gJ0ZBJykge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLmRpciA9ICdydGwnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0NsZWFyID0gZmFsc2U7XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50ZW1wbGF0ZVNlbGVjdGlvbiA9IGZ1bmN0aW9uKHJlcG8pIHtcclxuXHRcdFx0XHRpZiAoIXJlcG8uZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21wdDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiByZXBvLmZ1bGxfbmFtZSB8fCByZXBvLnRleHQ7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50ZW1wbGF0ZVJlc3VsdCA9IGZ1bmN0aW9uKHJlcG8pIHtcclxuXHRcdFx0XHRpZiAocmVwby5sb2FkaW5nKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVwby50ZXh0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgbWFya3VwID0gJzxkaXYgY2xhc3M9XCJcIkNsZWFyZml4XCJcIj4nICsgJzxkaXYgY2xhc3M9XCJcIlRoZW1lR3JpZF9XaWR0aDEyXCJcIj4nICsgcmVwby50ZXh0ICsgJzwvZGl2Pic7XHJcblx0XHRcdFx0aWYgKHJlcG8uZGVzY3JpcHRpb24pIHtcclxuXHRcdFx0XHRcdG1hcmt1cCArPSAnPGRpdiBjbGFzcz1cIlwiT1NBdXRvTWFyZ2luVG9wXCJcIj4nICsgcmVwby5kZXNjcmlwdGlvbiArICc8L2Rpdj4nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtYXJrdXAgKz0gJzwvZGl2Pic7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdChTZWxlY3QyT3B0aW9ucy5hamF4ID0ge1xyXG5cdFx0XHRcdHVybDogQWpheFVSTCxcclxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRcdGRlbGF5OiBBamF4RGVsYXksXHJcblx0XHRcdFx0ZGF0YTogZnVuY3Rpb24ocGFyYW1zKSB7XHJcblx0XHRcdFx0XHR2YXIgU2VsZWN0MkFqYXhPcHQgPSB7fTtcclxuXHRcdFx0XHRcdHZhciBTcGxpdFBhcmFtZXRlciA9IFNlYXJjaEV4dHJhUGFyYW0xLnNwbGl0KCcsJyk7XHJcblx0XHRcdFx0XHRTZWxlY3QyQWpheE9wdC5TZWFyY2hQYXJhbWV0ZXIgPSBwYXJhbXMudGVybTtcclxuXHRcdFx0XHRcdFNlbGVjdDJBamF4T3B0LlBhZ2UgPSBwYXJhbXMucGFnZSB8fCAxO1xyXG5cdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHQuUGFnZUFtb3VudCA9IEFtb3VudFBhZ2U7XHJcblxyXG5cdFx0XHRcdFx0U3BsaXRQYXJhbWV0ZXIuZm9yRWFjaChmdW5jdGlvbihlbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgc3BsaXRUZXh0ID0gZWwuc3BsaXQoJzonKTtcclxuXHRcdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHRbc3BsaXRUZXh0WzBdXSA9IHNwbGl0VGV4dFsxXTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBTZWxlY3QyQWpheE9wdDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbihkYXRhLCBwYXJhbXMpIHtcclxuXHRcdFx0XHRcdHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHRzOiBkYXRhLml0ZW1zLFxyXG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0bW9yZTogcGFyYW1zLnBhZ2UgKiBQYWdpbmF0aW9uU2l6ZSA8IGRhdGEudG90YWxfY291bnQsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FjaGU6IHRydWUsXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRcdChTZWxlY3QyT3B0aW9ucy5taW5pbXVtSW5wdXRMZW5ndGggPSBNaW5pbXVtSW5wdXRMZW5naHQpO1xyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZXNjYXBlTWFya3VwID0gZnVuY3Rpb24obWFya3VwKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmIChjb25maWcuaXNNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubXVsdGlwbGUgPSBmYWxzZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChTZWxlY3RlZFZhbHVlICE9PSAnJykge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gSlNPTi5wYXJzZShTZWxlY3RlZFZhbHVlKTtcclxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbiA9IG5ldyBPcHRpb24oZGF0YS5WYWx1ZSwgZGF0YS5JZCwgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuYXBwZW5kKG9wdGlvbikudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYENvbXBvbmVudCBTZWxlY3RTeXN0ZW0gKCR7V2lkZ2V0SWR9KTogU2VsZWN0ZWRWYWx1ZSBtdXN0IGJlIGEgdmFsaWQgSlNPTiFgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gMDtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IGNvbmZpZy5IYXNUYWdzO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jbG9zZU9uc2VsZWN0ID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICcyJykge1xyXG5cdFx0XHQvL1NlbGVjdDIgd2l0aCBDaGVja0JveFxyXG5cclxuXHRcdFx0dmFyIGlzQWxsU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0aWYgKCRXaWRnZXRJZGVudGlmaWVyWzBdLm9wdGlvbnMubGVuZ3RoID09PSAkV2lkZ2V0SWRlbnRpZmllclswXS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0aXNBbGxTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChXaWRnZXRJZCAhPSAnJykge1xyXG5cdFx0XHRcdG9wdGlvbiA9IG5ldyBPcHRpb24oJ1NlbGVjdCBBbGwnLCAnQWxsJywgdHJ1ZSwgaXNBbGxTZWxlY3RlZCk7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIucHJlcGVuZChvcHRpb24pO1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpLmFkZENsYXNzKCdTZWxlY3RlZEFsbCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY2xvc2VPblNlbGVjdCA9IGZhbHNlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0h0bWwgPSBmYWxzZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKEhhc1NlYXJjaCA9PT0gJ1RydWUnKSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gJC5mbi5zZWxlY3QyLmFtZC5yZXF1aXJlKCdTZWFyY2hMaWtlU2luZ2xlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnTXVsdGlwbGVTZWxlY3QnO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ011bHRpcGxlU2VsZWN0JztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGVtcGxhdGVTZWxlY3Rpb24gPSBmb3JtYXRSZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnNicpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBIdG1sT3B0aW9uc1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cdFx0XHRpZiAoY29uZmlnLmxvY2FsZSA9PT0gJ0FSJyB8fCBjb25maWcubG9jYWxlID09PSAnRkEnKSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZGlyID0gJ3J0bCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBkYXRhSHRtbE9wdGlvbiA9IFtdO1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0XHR2YXIgb3B0aW9uT2JqZWN0ID0ge1xyXG5cdFx0XHRcdFx0aWQ6ICQodGhpcykudmFsKCksXHJcblx0XHRcdFx0XHR0ZXh0OiAkKHRoaXMpLnRleHQoKSxcclxuXHRcdFx0XHRcdGh0bWw6ICQodGhpcykudGV4dCgpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZGF0YUh0bWxPcHRpb24ucHVzaChvcHRpb25PYmplY3QpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ2N1c3RvbVNlbGVjdCc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAnZHJvcGRvd25DdXN0b20nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kYXRhID0gZGF0YUh0bWxPcHRpb247XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmVzY2FwZU1hcmt1cCA9IGZ1bmN0aW9uKG1hcmt1cCkge1xyXG5cdFx0XHRcdHJldHVybiBtYXJrdXA7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoU2VsZWN0ZWRWYWx1ZSAhPSAnJykge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChTZWxlY3RlZFZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMScpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBUYWdDdXN0b21cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3RhZ0N1c3RvbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAndGFnQ3VzdG9tJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuVG9rZW5TZXBhcmF0b3MgPSBbJywnLCAnICddO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jcmVhdGVTZWFyY2hDaG9pY2UgPSBmdW5jdGlvbih0ZXJtLCBkYXRhKSB7XHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0JChkYXRhKS5maWx0ZXIoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnRleHQubG9jYWxlQ29tcGFyZSh0ZXJtKSA9PT0gMDtcclxuXHRcdFx0XHRcdH0pLmxlbmd0aCA9PT0gMFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0aWQ6IHRlcm0sXHJcblx0XHRcdFx0XHRcdHRleHQ6IHRlcm0sXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICc1Jykge1xyXG5cdFx0XHQvLyBTZWxlY3QyIFRhZ011bHRpcGxlXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRhZ3MgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICd0YWdTeXN0ZW0nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ3RhZ1N5c3RlbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNyZWF0ZVRhZyA9IGZ1bmN0aW9uKHBhcmFtcykge1xyXG5cdFx0XHRcdHZhciB0ZXJtID0gJC50cmltKHBhcmFtcy50ZXJtKTtcclxuXHRcdFx0XHRpZiAodGVybSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0aWQ6ICcjJyArIHRlcm0sXHJcblx0XHRcdFx0XHR0ZXh0OiB0ZXJtLFxyXG5cdFx0XHRcdFx0bmV3VGFnOiB0cnVlLCAvLyBhZGQgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoSGFzU2VhcmNoID09PSAnRmFsc2UnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE9uVW5TZWxlY3RpbmdKUyAhPSAnJyB8fCBPblNlbGVjdGluZ0pTICE9ICcnKSB7XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyXHJcblx0XHRcdFx0LnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5kYXRhKCd1bnNlbGVjdGluZycsIHRydWUpO1xyXG5cdFx0XHRcdFx0T25VblNlbGVjdGluZ0pTO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6c2VsZWN0aW5nJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0T25TZWxlY3RpbmdKUztcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignc2VsZWN0Om9wZW5pbmcnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5kYXRhKCd1bnNlbGVjdGluZycpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlRGF0YSgndW5zZWxlY3RpbmcnKTtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6b3BlbicsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oJ3NlbGVjdDI6Y2xvc2UnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMicpIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHR2YXIgaWR3aWRnZXQgPSAnIycgKyBXaWRnZXRJZDtcclxuXHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0VW5zZWxlY3RlZElkID0gZS5wYXJhbXMuZGF0YS5pZDtcclxuXHRcdFx0XHRcdGlmIChVbnNlbGVjdGVkSWQgPT09ICdBbGwnKSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZEl0ZW1zID0gW107XHJcblx0XHRcdFx0XHRcdHZhciBhbGxPcHRpb25zID0gJChpZHdpZGdldCArICcgb3B0aW9uJyk7XHJcblx0XHRcdFx0XHRcdGFsbE9wdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZEl0ZW1zLnB1c2goJCh0aGlzKS52YWwoKSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChzZWxlY3RlZEl0ZW1zKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZE9wdGlvbnMgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdHZhciB0b3RhbE9wdGlvbnMgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb24nKS5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdGlmIChzZWxlY3RlZE9wdGlvbnMgPT09IHRvdGFsT3B0aW9ucyAtIDEgJiYgJChpZHdpZGdldCArICcgPiAgb3B0aW9uOnNlbGVjdGVkOmZpcnN0LWNoaWxkJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkSXRlbXMgPSBbXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgYWxsT3B0aW9ucyA9ICQoaWR3aWRnZXQgKyAnIG9wdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRcdGFsbE9wdGlvbnMuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkSXRlbXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIudmFsKHNlbGVjdGVkSXRlbXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFVuc2VsZWN0ZWRJZCA9IGUucGFyYW1zLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRpZiAoVW5zZWxlY3RlZElkID09PSAnQWxsJykge1xyXG5cdFx0XHRcdFx0XHQkKGlkd2lkZ2V0ICsgJyA+IG9wdGlvbicpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldClcclxuXHRcdFx0XHRcdFx0XHQudmFsKCcnKVxyXG5cdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0Ly8kKGlkd2lkZ2V0ICsnID4gb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCBcInNlbGVjdGVkXCIpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldCArICcgPiBvcHRpb246Zmlyc3QtY2hpbGQnKS5yZW1vdmVBdHRyKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTaGlmdENvbnRhaW5lciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRsZXQgc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyO1xyXG5cdGxldCAkc2hpZnRDb250YWluZXJJZCA9ICQoKTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gc2hpZnRDb250YWluZXJJZCA9PiB7XHJcblxyXG5cdFx0Ly8gJCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcblx0XHQkc2hpZnRDb250YWluZXJJZCA9ICQoc2hpZnRDb250YWluZXJJZCk7XHJcblxyXG5cdFx0aGFzU2Nyb2xsQmFyKCk7XHJcblx0XHRoYW5kbGVTaGlmdFRhYmxlKCk7XHJcblxyXG5cdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyBcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0Ly8gXHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHQvLyB9LCAxNTAwKTtcclxuXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX19hcnJvdycpLm9mZignbW91c2Vkb3duJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmVkcmF3U2hpZnRUaW1lbGluZSgpO1xyXG5cdFx0XHR9LCAxNTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRjb25zdCBoYW5kbGVTaGlmdFRhYmxlID0gKCkgPT4ge1xyXG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xyXG5cdFx0XHR2YXIgJGVsRmxhZyA9ICQodGhpcykucGFyZW50KCkuZmluZCgnLkZsYWdMaW5lJyk7XHJcblx0XHRcdHZhciAkZWxGbGFnVGltZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnLkZsYWdMaW5lX3RpbWUnKTtcclxuXHRcdFx0dmFyICRjb2x1bW5GbGFnID0gJGVsRmxhZy5kYXRhKCdjb2x1bW4nKTtcclxuXHRcdFx0dmFyICRtaW51dGVzRmxhZyA9ICRlbEZsYWcuZGF0YSgnbWludXRlcycpO1xyXG5cdFx0XHR2YXIgJHNsb3RzID0gJCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykuZmluZCgnLlNoaWZ0Q2VsbENvbnRlbnQnKTtcclxuXHRcdFx0dmFyICRzbG90V2lkdGggPSBNYXRoLnJvdW5kKCRzbG90cy5lcSgwKS53aWR0aCgpKTtcclxuXHRcdFx0dmFyIG1pbnV0ZXNQb3NpdGlvbiA9ICgkbWludXRlc0ZsYWcgKiAkc2xvdFdpZHRoKSAvIDYwO1xyXG5cclxuXHRcdFx0Ly8gaGFuZGxlIGN1cnJlbnQgdGltZSBmbG9nIGhvcml6b250YWwgcG9zaXRpb25pbmdcclxuXHRcdFx0dmFyIHNsb3RzUG9zaXRpb24gPSBbXTtcclxuXHRcdFx0JHNsb3RzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xyXG5cdFx0XHRcdHNsb3RzUG9zaXRpb24ucHVzaCgkKHRoaXMpLnBvc2l0aW9uKCkubGVmdCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkZWxGbGFnLmNzcygnbGVmdCcsIHNsb3RzUG9zaXRpb25bJGNvbHVtbkZsYWcgLSAxXSArIG1pbnV0ZXNQb3NpdGlvbik7XHJcblx0XHRcdCRlbEZsYWcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdGlmICgkY29sdW1uRmxhZyA9PT0gJHNsb3RzLmxlbmd0aCkge1xyXG5cdFx0XHRcdCRlbEZsYWdUaW1lLmNzcyh7XHJcblx0XHRcdFx0XHRyaWdodDogJzFweCcsXHJcblx0XHRcdFx0XHRsZWZ0OiAnYXV0bycsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGhhbmRsZSBjZWxscyB0aGF0IG1pZ2h0IHNwYW4gb3ZlciBzZXZlcmFsIHNsb3RzXHJcblx0XHRcdCQodGhpcykuZmluZCgnLlNoaWZ0Q2FyZCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbFJvdykge1xyXG5cdFx0XHRcdHZhciByb3dIYXNTcGFubmVkQ2VsbCA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoZWxSb3cpLmZpbmQoJy5TaGlmdENlbGxDb250ZW50JykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsQ2VsbCkge1xyXG5cdFx0XHRcdFx0dmFyIGNvbHNwYW4gPSAkKGVsQ2VsbCkuZGF0YSgnY29sc3BhbicpO1xyXG5cdFx0XHRcdFx0aWYgKGNvbHNwYW4gPT09IHNsb3RzUG9zaXRpb24ubGVuZ3RoIHx8IHJvd0hhc1NwYW5uZWRDZWxsKSB7XHJcblx0XHRcdFx0XHRcdCQoZWxDZWxsKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRcdFx0XHRcdGZsZXg6ICcxIDEgYXV0bycsXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjb2xzcGFuID4gMSkge1xyXG5cdFx0XHRcdFx0XHRyb3dIYXNTcGFubmVkQ2VsbCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdCQoZWxDZWxsKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRcdFx0XHRcdGZsZXg6ICdub25lJyxcclxuXHRcdFx0XHRcdFx0XHR3aWR0aDogKyhzbG90c1Bvc2l0aW9uW2NvbHNwYW5dIC0gc2xvdHNQb3NpdGlvblswXSkgKyAncHgnLFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBoYW5kbGUgaG9yaXpvbnRhbCBzY3JvbGwgYmVoYXZpb3JcclxuXHRcdFx0aWYgKGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGgpIHtcclxuXHRcdFx0XHQkKGVsKS53aWR0aChlbC5zY3JvbGxXaWR0aCk7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykud2lkdGgoZWwuc2Nyb2xsV2lkdGgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoZWwpLndpZHRoKCdhdXRvJyk7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykud2lkdGgoJ2F1dG8nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaGFzU2Nyb2xsQmFyID0gKCkgPT4ge1xyXG5cdFx0dmFyICRTY3JvbGxhYmxlRGl2ID0gJHNoaWZ0Q29udGFpbmVySWQuZmluZCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXInKTtcclxuXHRcdGlmICgkc2hpZnRDb250YWluZXJJZC5maW5kKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0aWYgKCRTY3JvbGxhYmxlRGl2LmdldCgwKS5zY3JvbGxIZWlnaHQgPiAkU2Nyb2xsYWJsZURpdi5oZWlnaHQoKSkge1xyXG5cdFx0XHRcdHZhciAkbGFzdENlbGwgPSAkc2hpZnRDb250YWluZXJJZC5maW5kKCcuSXNUaW1lcjpsYXN0LWNoaWxkJyk7XHJcblx0XHRcdFx0JGxhc3RDZWxsLmNzcygncGFkZGluZy1yaWdodCcsICc3cHgnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlZHJhd1NoaWZ0VGltZWxpbmUgPSAoKSA9PiB7XHJcblx0XHRjbGVhclRpbWVvdXQoc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyKTtcclxuXHRcdHNoaWZ0VGltZWxpbmVSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRoYXNTY3JvbGxCYXIoKTtcclxuXHRcdFx0aGFuZGxlU2hpZnRUYWJsZSgpO1xyXG5cdFx0fSwgNDAwKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjaGVja1Njcm9sbCA9ICgpID0+IHtcclxuXHRcdHZhciBoQ29udGVudCA9ICQoJy5Db250ZW50JykuaGVpZ2h0KCk7XHJcblx0XHR2YXIgaFdpbmRvdyA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcblx0XHRpZiAoaENvbnRlbnQgPiBoV2luZG93KSByZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0Y2hlY2tTY3JvbGwsXHJcblx0XHRyZWRyYXdTaGlmdFRpbWVsaW5lXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuXHJcbiQod2luZG93KS5vZmYoJ3Jlc2l6ZS5HZW5lcmljR2FsbGVyeScpLm9uKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcclxuXHJcblx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIucmVkcmF3U2hpZnRUaW1lbGluZSk7XHJcblxyXG5cdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCAxMDAwKTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdH0sIDE1MDApO1xyXG5cclxufSk7XHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCEhJCgnLlNoaWZ0Q29udGFpbmVyJykubGVuZ3RoKSB7XHJcblxyXG5cdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5yZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblx0XHR9LCA0MDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9LCA2MDApO1xyXG5cclxuXHRcdCQoJy5uYXZpZ2F0aW9uLWNvbnRyb2wtaXRlbScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL1ZlcmlmeSB0aGUgc2Nyb2xsIGlmIHRvb2x0aXAgb3BlbmVkXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICgkKCcudG9vbHRpcHN0ZXItYmFzZScpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdFx0JCgnLnRvb2x0aXBzdGVyLWJhc2UnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcclxuXHRcdFx0fSwgNDAwKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdH0sIDYwMCk7XHJcblxyXG5cdFx0XHQvLyBTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIucmVkcmF3U2hpZnRUaW1lbGluZTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG59KTsiLCIvKiBDb21wb25lbnQgU2lkZU1lbnVTdHJ1Y3R1cmUgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNsYXNzIFNpZGVNZW51IHtcclxuXHRcdGNvbnN0cnVjdG9yKGNvbmZpZykge1xyXG5cdFx0XHR0aGlzLm9wdGlvbnMgPSB7XHJcblx0XHRcdFx0Li4uY29uZmlnXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLm9uQ29tcG9uZW50SW5pdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldE1haW5NZW51V2lkdGgoKSB7XHJcblx0XHRcdCQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCAkc2lkZUJhcklmcmFtZSA9ICQoJy5MYXlvdXRCYXNlLWlmcmFtZXNpZGViYXIubm90RXhwYW5kYWJsZScpO1xyXG5cdFx0XHRcdGNvbnN0ICRsYXlvdXRIYXNUYWJzID0gJCgnLkxheW91dEJhc2UtLXdpdGhUYWJzJyk7XHJcblxyXG5cdFx0XHRcdGlmICgkc2lkZUJhcklmcmFtZS5sZW5ndGggJiYgISRsYXlvdXRIYXNUYWJzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgJG1haW5NZW51ID0gJCgnLkxheW91dEJhc2UtTWFpbk1lbnUnKTtcclxuXHRcdFx0XHRcdCRtYWluTWVudS5jc3Moe1xyXG5cdFx0XHRcdFx0XHR3aWR0aDogJ2NhbGMoMTAwJSAtIDI2MnB4KSdcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0b3BlbkNsb3NlTWVudSh0b09wZW4pIHtcclxuXHRcdFx0aWYgKHRvT3Blbikge1xyXG5cdFx0XHRcdHRoaXMuJGNvbXBvbmVudC5hZGRDbGFzcygnU2lkZU1lbnUtLW9wZW4nKTtcclxuXHJcblx0XHRcdFx0JCgnLkxheW91dEJhc2UtaWZyYW1lc2lkZWJhcicpLmNzcyh7XHJcblx0XHRcdFx0XHR6SW5kZXg6IDBcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRjb21wb25lbnQucmVtb3ZlQ2xhc3MoJ1NpZGVNZW51LS1vcGVuJyk7XHJcblxyXG5cdFx0XHRcdCQoJy5MYXlvdXRCYXNlLWlmcmFtZXNpZGViYXInKS5jc3Moe1xyXG5cdFx0XHRcdFx0ekluZGV4OiA3MFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b25Db21wb25lbnRJbml0KCkge1xyXG5cdFx0XHR0aGlzLnNldE1haW5NZW51V2lkdGgoKTtcclxuXHJcblx0XHRcdHRoaXMuJGNvbXBvbmVudCA9ICQoYCMke3RoaXMub3B0aW9ucy53aWRnZXRJZH1gKTtcclxuXHRcdFx0dGhpcy4kdHJpZ2dlciA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCcuU2lkZU1lbnVfX1RyaWdnZXInKTtcclxuXHRcdFx0dGhpcy4kc2hpZWxkID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5TaWRlTWVudV9fU2hpZWxkJyk7XHJcblx0XHRcdHRoaXMuJGNsb3NlQnV0dG9uID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5TaWRlTWVudV9fTWVudUNsb3NlJyk7XHJcblx0XHRcdHRoaXMuJHRhYkl0ZW0gPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLlNpZGVNZW51X19UYWJJdGVtcyAuTWVudUl0ZW0nKTtcclxuXHRcdFx0dGhpcy4kbWVudUl0ZW0gPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLlNpZGVNZW51X19NZW51SXRlbXMgLk1lbnVJdGVtJyk7XHJcblx0XHRcdHRoaXMuJHN1Ykl0ZW0gPSB0aGlzLiRjb21wb25lbnQuZmluZCgnLlNpZGVNZW51X19NZW51SXRlbXMgLk1lbnVJdGVtX3N1Ykl0ZW1zJyk7XHJcblxyXG5cclxuXHRcdFx0dGhpcy4kaWZyYW1lQ29udGFpbmVyID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5pZnJhbWVDb250YWluZXInKTtcclxuXHRcdFx0dGhpcy4kaWZyYW1lQ29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxkcy1yaW5nXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj4nKTtcclxuXHRcdFx0dGhpcy4kaWZyYW1lQ29udGFpbmVyLmZpbmQoJ2lmcmFtZScpLmxvYWQoKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuJGlmcmFtZUNvbnRhaW5lci5maW5kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHJcblx0XHRcdHRoaXMuJHRyaWdnZXIub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5vcGVuQ2xvc2VNZW51KHRydWUpKTtcclxuXHRcdFx0dGhpcy4kc2hpZWxkLm9uKCdjbGljaycsICgpID0+IHRoaXMub3BlbkNsb3NlTWVudShmYWxzZSkpO1xyXG5cdFx0XHR0aGlzLiRjbG9zZUJ1dHRvbi5vbignY2xpY2snLCAoKSA9PiB0aGlzLm9wZW5DbG9zZU1lbnUoZmFsc2UpKTtcclxuXHJcblx0XHRcdHRoaXMuJHRhYkl0ZW0ub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG5cdFx0XHRcdGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0XHRcdGNvbnN0ICRsaW5rID0gJHRhcmdldC5maW5kKCcuTWVudUl0ZW1fbGFiZWwgYScpO1xyXG5cclxuXHRcdFx0XHRpZiAoJGxpbmsubGVuZ3RoKSAkbGluay5nZXQoMCkuY2xpY2soKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLiRtZW51SXRlbS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcblx0XHRcdFx0aWYgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHRcdFx0XHRjb25zdCAkc3ViSXRlbXMgPSAkdGFyZ2V0LmZpbmQoJy5NZW51SXRlbV9zdWJJdGVtcycpO1xyXG5cdFx0XHRcdGNvbnN0ICRsaW5rID0gJHRhcmdldC5maW5kKCcuTWVudUl0ZW1fbGFiZWwgYScpO1xyXG5cclxuXHRcdFx0XHRpZiAoJGxpbmsubGVuZ3RoKSAkbGluay5nZXQoMCkuY2xpY2soKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kY29tcG9uZW50XHJcblx0XHRcdFx0XHQuZmluZCgnLlNpZGVNZW51X19NZW51SXRlbXMgLmFjdGl2ZScpXHJcblx0XHRcdFx0XHQubm90KCR0YXJnZXQpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHR0aGlzLiRjb21wb25lbnRcclxuXHRcdFx0XHRcdC5maW5kKCcuU2lkZU1lbnVfX01lbnVJdGVtcyAuc2hvdycpXHJcblx0XHRcdFx0XHQubm90KCR0YXJnZXQpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHJcblx0XHRcdFx0JHRhcmdldC50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0JHN1Ykl0ZW1zLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy4kc3ViSXRlbS5vbignY2xpY2snLCBldmVudCA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKSk7XHJcblxyXG5cdFx0XHR0aGlzLiRjb21wb25lbnRcclxuXHRcdFx0XHQuZmluZCgnLlNpZGVNZW51X19UYWJJdGVtcyA+IGRpdjplbXB0eScpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmhpZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2lkZU1lbnUoY29uZmlnKSk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TaWRlTWVudSA9IHtcclxuXHRcdGNyZWF0ZVxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgSVNpZGViYXIgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2lkZWJhcihjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNpZGViYXIud2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0fTtcclxuXHJcblx0dmFyIGNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TaWRlYmFyLndpZGdldElkXS5jbG9zZSgpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTaWRlYmFyID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuaXNFeHBhbmRhYmxlID0gY29uZmlnLmlzRXhwYW5kYWJsZTtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyJyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyTWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuSVNpZGViYXItbWVudScpO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnVJdGVtID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TaWRlYmFyTWVudUl0ZW0nKTtcclxuXHRcdHRoaXMuJHNpZGViYXJTaGllbGQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLXNoaWVsZCcpO1xyXG5cdFx0dGhpcy4kc2lkZWJhckNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJz4gZGl2JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdQSCcpICYmICQodGhpcykudGV4dCgpID09PSAnJykge1xyXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcclxuXHRcdGlmICghdGhpcy5pc0V4cGFuZGFibGUpIHtcclxuXHRcdFx0dGhpcy5vcGVuTWVudUl0ZW0oMCk7XHJcblx0XHR9XHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC4kKCcuTGF5b3V0QmFzZS1pZnJhbWVzaWRlYmFyIC5sZHMtcmluZycpLmZhZGVPdXQoKTtcclxuXHRcdFx0aWYgKCF0aGlzLmlzRXhwYW5kYWJsZSkge1xyXG5cdFx0XHRcdCQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdOnZpc2libGUnKS5lcSgwKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQod2luZG93KS51bmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LiQoJy5MYXlvdXRCYXNlLWlmcmFtZXNpZGViYXIgLmxkcy1yaW5nJykuZmFkZU91dCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2lkZWJhci5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJHNpZGViYXJNZW51Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRpZiAoIV90aGlzLiRzaWRlYmFyLmhhc0NsYXNzKCdvcGVuJykpIHtcclxuXHRcdFx0XHRfdGhpcy5vcGVuTWVudUl0ZW0oMCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnVJdGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHNlbGVjdGVkUG9zaXRpb24gPSAkKHRoaXMpLmluZGV4KCk7XHJcblx0XHRcdF90aGlzLm9wZW5NZW51SXRlbShzZWxlY3RlZFBvc2l0aW9uKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhclNoaWVsZC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJHNpZGViYXIub24oJ2NsaWNrJywgJy5TZWFyY2hTaWRlQmFyRmllbGRzIC5CdXR0b25Hcm91cF9idXR0b246Zmlyc3QtY2hpbGQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLiRzaWRlYmFyLmZpbmQoJy5GaWVsZHNTbGlkZXInKS5hZGRDbGFzcygnVGFiMScpLnJlbW92ZUNsYXNzKCdUYWIyJyk7XHJcblx0XHRcdF90aGlzLnNldEZpZWxkRm9jdXMoX3RoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmVxKDApKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhci5vbignY2xpY2snLCAnLlNlYXJjaFNpZGVCYXJGaWVsZHMgLkJ1dHRvbkdyb3VwX2J1dHRvbjpsYXN0LWNoaWxkJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRfdGhpcy4kc2lkZWJhci5maW5kKCcuRmllbGRzU2xpZGVyJykuYWRkQ2xhc3MoJ1RhYjInKS5yZW1vdmVDbGFzcygnVGFiMScpO1xyXG5cdFx0XHRfdGhpcy5zZXRGaWVsZEZvY3VzKF90aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTaWRlYmFyLnByb3RvdHlwZS5vcGVuTWVudUl0ZW0gPSBmdW5jdGlvbiAoc2VsZWN0ZWRQb3NpdGlvbikge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJHNpZGViYXIuZmluZCgnLlNpZGViYXJNZW51SXRlbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5lcShzZWxlY3RlZFBvc2l0aW9uKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyLmZpbmQoJy5JU2lkZWJhci1jb250ZW50ID4gLklTaWRlYmFyLWNvbnRlbnQtcGFuZWwnKS5oaWRlKCkuZXEoc2VsZWN0ZWRQb3NpdGlvbikuc2hvdygpO1xyXG5cdFx0dGhpcy4kc2lkZWJhci5hZGRDbGFzcygnb3BlbicpO1xyXG5cdFx0aWYgKHdpbmRvdy5wYXJlbnQubGVuZ3RoICYmIHRoaXMuaXNFeHBhbmRhYmxlKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uub3BlblNpZGViYXJJZnJhbWUoMCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnLlRleHRJbnB1dDp2aXNpYmxlJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLnNldEZpZWxkRm9jdXModGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnLlRleHRJbnB1dDp2aXNpYmxlJykuZXEoMCkpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHdpbmRvdy5wYXJlbnQuJCgnLnNlbGVjdDItY29udGFpbmVyLS1vcGVuJykubGVuZ3RoKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuJCgnLnNlbGVjdDItaGlkZGVuLWFjY2Vzc2libGUnKS5zZWxlY3QyKCdjbG9zZScpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNpZGViYXIucHJvdG90eXBlLnNldEZpZWxkRm9jdXMgPSBmdW5jdGlvbiAoJGlucHV0KSB7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCRpbnB1dC5jbGljaygpLnNlbGVjdCgpO1xyXG5cdFx0fSwgMjUwKTtcclxuXHR9O1xyXG5cclxuXHRTaWRlYmFyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRpZiAod2luZG93LnBhcmVudC5sZW5ndGgpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5jbG9zZVNpZGViYXJJZnJhbWUoMCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0V4cGFuZGFibGUpIHtcclxuXHRcdFx0dGhpcy4kc2lkZWJhci5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG5cdFx0XHR0aGlzLiRzaWRlYmFyLmZpbmQoJy5TaWRlYmFyTWVudUl0ZW0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdHRoaXMuJHNpZGViYXIuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQgPiAuSVNpZGViYXItY29udGVudC1wYW5lbCcpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2lkZWJhciA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0Y2xvc2U6IGNsb3NlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgU3Bpbm5lckhvcml6b250YWwgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlNwaW5uZXJIb3Jpem9udGFsID0ge1xyXG5cdGNyZWF0ZTogY29uZmlnID0+IHtcclxuXHRcdGNvbnN0ICRpbnB1dCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH0gaW5wdXRgKTtcclxuXHJcblx0XHQkaW5wdXQub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0IHZhbCA9IE1hdGguYWJzKHBhcnNlSW50KHRoaXMudmFsdWUsIDEwKSB8fCArY29uZmlnLm1pblZhbHVlKTtcclxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbCA+ICtjb25maWcubWF4VmFsdWUgPyArY29uZmlnLm1heFZhbHVlIDogdmFsO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRpbmNyZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnRJZCwgbWluVmFsdWUsIG1heFZhbHVlLCB0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdHZhciBfZWxlbWVudCA9ICQoZWxlbWVudElkKVxyXG5cdFx0XHQuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXHJcblx0XHRcdC5maXJzdCgpO1xyXG5cdFx0aWYgKF9lbGVtZW50LnZhbCgpID09IHVuZGVmaW5lZCB8fCBfZWxlbWVudC52YWwoKSA9PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSkpIHtcclxuXHRcdFx0X2VsZW1lbnQudmFsKG1pblZhbHVlKTtcclxuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPCBtYXhWYWx1ZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnZhbChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSArIDEpO1xyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLk1pbnVzJylcclxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA+PSBtYXhWYWx1ZSkge1xyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuUGx1cycpXHJcblx0XHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGVjcmVtZW50OiBmdW5jdGlvbihlbGVtZW50SWQsIG1pblZhbHVlLCB0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdHZhciBfZWxlbWVudCA9ICQoZWxlbWVudElkKVxyXG5cdFx0XHQuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXHJcblx0XHRcdC5maXJzdCgpO1xyXG5cdFx0aWYgKF9lbGVtZW50LnZhbCgpID09IHVuZGVmaW5lZCB8fCBfZWxlbWVudC52YWwoKSA9PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSkpIHtcclxuXHRcdFx0X2VsZW1lbnQudmFsKG1pblZhbHVlKTtcclxuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPiBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnZhbChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSAtIDEpO1xyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLlBsdXMnKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpIDw9IG1pblZhbHVlKSB7XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5NaW51cycpXHJcblx0XHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTcGlubmVyVmVydGljYWwgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0ICRtaW51c1ZlcnRpY2FsID0gJChgIyR7Y29uZmlnLndpZGdldElkfWApLmZpbmQoJy5NaW51c1ZlcnRpY2FsJyk7XHJcblx0XHRcdGNvbnN0ICRpbnB1dFNwaW5uZXIgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9IC5TcGlubmVySW5wdXRWZXJ0aWNhbCBpbnB1dGApO1xyXG5cclxuXHRcdFx0JGlucHV0U3Bpbm5lci5vbignYmx1ciBrZXl1cCBpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0Y29uc3QgY3VycmVudElucHV0VmFsdWUgPSAkaW5wdXRTcGlubmVyLnZhbCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29uZmlnLm51bWJlckxpc3QgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInKSB7XHJcblx0XHRcdFx0XHRjb25zdCBpbnB1dFZhbHVlSW50ID0gcGFyc2VJbnQoY3VycmVudElucHV0VmFsdWUpO1xyXG5cdFx0XHRcdFx0Y29uc3QgYXJyYXlUb1NwaW4gPSBjb25maWcubnVtYmVyTGlzdDtcclxuXHRcdFx0XHRcdGNvbnN0ICRlcnJvck1lc3NhZ2UgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9IC5TcGlubmVyRXJyb3JNZXNzYWdlYCk7XHJcblxyXG5cdFx0XHRcdFx0JGVycm9yTWVzc2FnZS5jc3MoJ2Rpc3BsYXknLCBhcnJheVRvU3Bpbi5pbmRleE9mKGlucHV0VmFsdWVJbnQpID09PSAtMSA/ICdibG9jaycgOiAnbm9uZScpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGN1cnJlbnRJbnB1dFZhbHVlIDwgY29uZmlnLm1pblZhbHVlKSAkbWludXNWZXJ0aWNhbC5hZGRDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHRcdFx0ZWxzZSAkbWludXNWZXJ0aWNhbC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKCRpbnB1dFNwaW5uZXIudmFsKCkgPD0gY29uZmlnLm1pblZhbHVlKSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29uZmlnLm51bWJlckxpc3QgJiYgJGlucHV0U3Bpbm5lci52YWwoKSA9PT0gJycpIHtcclxuXHRcdFx0XHRsZXQgY3VycmVudE51bWJlciA9IDA7XHJcblx0XHRcdFx0Y29uc3QgYXJyYXlUb1NwaW4gPSBjb25maWcubnVtYmVyTGlzdC5zcGxpdCgnLCcpO1xyXG5cclxuXHRcdFx0XHQkaW5wdXRTcGlubmVyLnZhbChhcnJheVRvU3BpbltjdXJyZW50TnVtYmVyXSk7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29uZmlnLmlzQ3Vyc29yT25Gb2N1cykge1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5vbignZm9jdXMnLCBgIyR7Y29uZmlnLmlucHV0SUR9IGlucHV0YCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dGhhdC5mb2N1cygpO1xyXG5cdFx0XHRcdFx0XHR2YXIgdmFsID0gdGhhdC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0dGhhdC52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0XHR0aGF0LnZhbHVlID0gdmFsO1xyXG5cdFx0XHRcdFx0fSwgMSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb25maWcuaXNJbnB1dEVtcHR5KSB7XHJcblx0XHRcdFx0JGlucHV0U3Bpbm5lci5hdHRyKCd2YWx1ZScsICcnKTtcclxuXHRcdFx0XHQkbWludXNWZXJ0aWNhbC5hZGRDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGluY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCwgbGlzdFRvc3BpbiA9IFtdKSA9PiB7XHJcblx0XHRjb25zdCAkc3Bpbm5lciA9ICQoZWxlbWVudElkKTtcclxuXHRcdGxldCAkaW5wdXQgPSAkc3Bpbm5lci5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLmZpcnN0KCk7XHJcblxyXG5cdFx0dmFyIGZvcmNlSW50ZWdlciA9ICQoZWxlbWVudElkKS5kYXRhKCdmb3JjZWludGVnZXInKSA9PT0gJ1RydWUnID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoJGlucHV0LnZhbCgpKTtcclxuXHRcdHZhciBpbmNyZW1lbnRVbml0ID0gMTtcclxuXHRcdHZhciBpc0RlY2ltYWxzID0gY3VycmVudFZhbHVlICUgMSAhPSAwO1xyXG5cdFx0dmFyIGFycmF5dG9zcGluID0gbGlzdFRvc3BpbjtcclxuXHJcblx0XHRjb25zdCAkbWludXNWZXJ0aWNhbCA9ICQoZWxlbWVudElkKS5maW5kKCcuTWludXNWZXJ0aWNhbCcpO1xyXG5cdFx0Y29uc3QgJHBsdXNWZXJ0aWNhbCA9ICQoZWxlbWVudElkKS5maW5kKCcuUGx1c1ZlcnRpY2FsJyk7XHJcblxyXG5cdFx0JG1pbnVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdGlmIChhcnJheXRvc3Bpbi5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRQb3NpdGlvbiA9IGFycmF5dG9zcGluLmluZGV4T2YocGFyc2VJbnQoJGlucHV0LnZhbCgpKSk7XHJcblx0XHRcdHZhciBtYXhpbXVtVG9TcGluID0gYXJyYXl0b3NwaW4ubGFzdEluZGV4T2YoYXJyYXl0b3NwaW4uc2xpY2UoLTEpWzBdKTtcclxuXHJcblx0XHRcdCRwbHVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdFx0aWYgKG1heGltdW1Ub1NwaW4gLSAxID09PSBjdXJyZW50UG9zaXRpb24pIHtcclxuXHRcdFx0XHRjdXJyZW50UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb24gKyAxO1xyXG5cdFx0XHRcdCRpbnB1dC52YWwoYXJyYXl0b3NwaW5bY3VycmVudFBvc2l0aW9uXSk7XHJcblxyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpICRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRpZiAodHJpZ2dlck9uSW5wdXQpICRpbnB1dC50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG1heGltdW1Ub1NwaW4gPT09IGN1cnJlbnRQb3NpdGlvbikge1xyXG5cdFx0XHRcdGN1cnJlbnRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbiAlIG1heGltdW1Ub1NwaW47XHJcblx0XHRcdFx0JGlucHV0LnZhbChhcnJheXRvc3BpbltjdXJyZW50UG9zaXRpb25dKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGN1cnJlbnRQb3NpdGlvbiA9IChjdXJyZW50UG9zaXRpb24gKyAxKSAlIG1heGltdW1Ub1NwaW47XHJcblx0XHRcdFx0JGlucHV0LnZhbChhcnJheXRvc3BpbltjdXJyZW50UG9zaXRpb25dKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY3VycmVudFBvc2l0aW9uID09PSBtYXhpbXVtVG9TcGluKSAkcGx1c1ZlcnRpY2FsLmFkZENsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdFx0aWYgKGN1cnJlbnRQb3NpdGlvbiA9PT0gMCkgJG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdFx0JHNwaW5uZXIuZmluZCgnLlNwaW5uZXJFcnJvck1lc3NhZ2UnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSA8IG1pblZhbHVlKSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRtaW51c1ZlcnRpY2FsLnJlbW92ZUNsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFmb3JjZUludGVnZXIgJiYgaXNEZWNpbWFscykgaW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50VmFsdWUgPT09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSkpIHtcclxuXHRcdFx0XHQkaW5wdXQudmFsKG1pblZhbHVlKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkgPCBtYXhWYWx1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMCAmJiAhZm9yY2VJbnRlZ2VyKSBpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xyXG5cclxuXHRcdFx0XHRcdCRpbnB1dC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlICsgaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xyXG5cclxuXHRcdFx0XHRcdHRyaWdnZXJFdmVudHMoJGlucHV0LCB0cmlnZ2VyT25DaGFuZ2UsIHRyaWdnZXJPbklucHV0KTtcclxuXHJcblx0XHRcdFx0XHQkbWludXNWZXJ0aWNhbC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkcGx1c1ZlcnRpY2FsLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjaGVja0Rpc2FibGVkU3RhdHVzKGVsZW1lbnRJZCwgcGFyc2VGbG9hdCgkaW5wdXQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IGRlY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCwgbGlzdFRvc3BpbiA9IFtdKSA9PiB7XHJcblx0XHRjb25zdCAkc3Bpbm5lciA9ICQoZWxlbWVudElkKTtcclxuXHRcdGNvbnN0ICRpbnB1dCA9ICRzcGlubmVyLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJykuZmlyc3QoKTtcclxuXHJcblx0XHRsZXQgZm9yY2VJbnRlZ2VyID0gJChlbGVtZW50SWQpLmRhdGEoJ2ZvcmNlaW50ZWdlcicpID09PSAnVHJ1ZScgPyB0cnVlIDogZmFsc2U7XHJcblx0XHRsZXQgY3VycmVudFZhbHVlID0gcGFyc2VGbG9hdCgkaW5wdXQudmFsKCkpO1xyXG5cdFx0bGV0IGluY3JlbWVudFVuaXQgPSAxO1xyXG5cdFx0bGV0IGlzRGVjaW1hbHMgPSBjdXJyZW50VmFsdWUgJSAxICE9IDA7XHJcblx0XHRsZXQgYXJyYXl0b3NwaW4gPSBsaXN0VG9zcGluO1xyXG5cclxuXHRcdGNvbnN0ICRtaW51c1ZlcnRpY2FsID0gJChlbGVtZW50SWQpLmZpbmQoJy5NaW51c1ZlcnRpY2FsJyk7XHJcblx0XHRjb25zdCAkcGx1c1ZlcnRpY2FsID0gJChlbGVtZW50SWQpLmZpbmQoJy5QbHVzVmVydGljYWwnKTtcclxuXHJcblx0XHRpZiAoYXJyYXl0b3NwaW4ubGVuZ3RoKSB7XHJcblx0XHRcdGxldCBjdXJyZW50UG9zaXRpb24gPSBhcnJheXRvc3Bpbi5pbmRleE9mKHBhcnNlSW50KCRpbnB1dC52YWwoKSkpO1xyXG5cdFx0XHRsZXQgbWF4aW11bVRvU3BpbiA9IGFycmF5dG9zcGluLmxhc3RJbmRleE9mKGFycmF5dG9zcGluLnNsaWNlKC0xKVswXSk7XHJcblxyXG5cdFx0XHRjdXJyZW50UG9zaXRpb24gPSAobWF4aW11bVRvU3BpbiArIGN1cnJlbnRQb3NpdGlvbiAtIDEpICUgbWF4aW11bVRvU3BpbjtcclxuXHJcblx0XHRcdCRwbHVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRQb3NpdGlvbiA9PSAwKSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHRcdCRpbnB1dC52YWwoYXJyYXl0b3NwaW5bMF0pO1xyXG5cclxuXHRcdFx0XHR0cmlnZ2VyRXZlbnRzKCRpbnB1dCwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JG1pbnVzVmVydGljYWwucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHRcdCRpbnB1dC52YWwoYXJyYXl0b3NwaW5bY3VycmVudFBvc2l0aW9uXSk7XHJcblxyXG5cdFx0XHRcdHRyaWdnZXJFdmVudHMoJGlucHV0LCB0cmlnZ2VyT25DaGFuZ2UsIHRyaWdnZXJPbklucHV0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0JHNwaW5uZXIuZmluZCgnLlNwaW5uZXJFcnJvck1lc3NhZ2UnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKCFmb3JjZUludGVnZXIgJiYgaXNEZWNpbWFscykgaW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50VmFsdWUgPT09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSkpIHtcclxuXHRcdFx0XHQkaW5wdXQudmFsKG1pblZhbHVlKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlckV2ZW50cygkaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmIChwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkgPiBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMSAmJiAhZm9yY2VJbnRlZ2VyKSBpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xyXG5cclxuXHRcdFx0XHRcdCRpbnB1dC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlIC0gaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xyXG5cclxuXHRcdFx0XHRcdHRyaWdnZXJFdmVudHMoJGlucHV0LCB0cmlnZ2VyT25DaGFuZ2UsIHRyaWdnZXJPbklucHV0KTtcclxuXHJcblx0XHRcdFx0XHQkcGx1c1ZlcnRpY2FsLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRtaW51c1ZlcnRpY2FsLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjaGVja0Rpc2FibGVkU3RhdHVzKGVsZW1lbnRJZCwgcGFyc2VGbG9hdCgkaW5wdXQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHRyaWdnZXJFdmVudHMgPSAoaW5wdXQsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpID0+IHtcclxuXHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0aWYgKHRyaWdnZXJPbklucHV0KSBpbnB1dC50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGNoZWNrRGlzYWJsZWRTdGF0dXMgPSAoZWxlbWVudElkLCB2YWx1ZVRvQ2hlY2ssIG1pblZhbHVlLCBtYXhWYWx1ZSkgPT4ge1xyXG5cdFx0aWYgKHZhbHVlVG9DaGVjayA8PSBtaW5WYWx1ZSkge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHZhbHVlVG9DaGVjayA+PSBtYXhWYWx1ZSkge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0LmZpbmQoJ2EuUGx1c1ZlcnRpY2FsJylcclxuXHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU3Bpbm5lclZlcnRpY2FsID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0aW5jcmVtZW50LFxyXG5cdFx0ZGVjcmVtZW50LFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFNwbGl0QnV0dG9uICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTcGxpdEJ1dHRvbihjb25maWcpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTcGxpdEJ1dHRvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRidXR0b24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWJ1dHRvbicpO1xyXG5cdFx0dGhpcy4kYnV0dG9uTGluayA9IHRoaXMuJGJ1dHRvbi5maW5kKCc+IGEnKTtcclxuXHRcdHRoaXMuJHRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLXRyaWdnZXInKTtcclxuXHRcdHRoaXMuJGFjdGlvbnMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWFjdGlvbnMnKTtcclxuXHRcdGlmICghIXRoaXMuJGFjdGlvbnMudGV4dCgpKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCc+IC5TcGxpdEJ1dHRvbicpLmFkZENsYXNzKCdoYXNUcmlnZ2VyJyk7XHJcblx0XHRcdHRoaXMuYnVpbGRBY3Rpb25zVHJpZ2dlcigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNwbGl0QnV0dG9uLnByb3RvdHlwZS5idWlsZEFjdGlvbnNUcmlnZ2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGNsYXNzTGlzdCA9IHRoaXMuJGJ1dHRvbkxpbmtbMF0uY2xhc3NMaXN0LnZhbHVlO1xyXG5cdFx0dGhpcy4kdHJpZ2dlci5hZGRDbGFzcyhjbGFzc0xpc3QpO1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gaW5zaWRlIGEgZG9jdW1lbnQgcmVhZHkgZHVlIHRvIHNhcHBoaXJlIHBvcHVwIGJpbmRlZCBldmVudHNcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coX3RoaXMuY29uZmlnLndpZGdldElkLCBfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKTtcclxuXHRcdFx0aWYgKCFfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKSB7XHJcblx0XHRcdFx0X3RoaXMuJHRyaWdnZXIudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0YXJyb3c6IHRydWUsXHJcblx0XHRcdFx0XHRjb250ZW50OiAkKCc8c2VjdGlvbi8+JykuYXBwZW5kKF90aGlzLiRhY3Rpb25zLmNsb25lKHRydWUpKSxcclxuXHRcdFx0XHRcdHRyaWdnZXI6IF90aGlzLmNvbmZpZy50cmlnZ2VyRXZlbnQsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogX3RoaXMuY29uZmlnLnBvc2l0aW9uLFxyXG5cdFx0XHRcdFx0bWF4V2lkdGg6IF90aGlzLmNvbmZpZy5tYXhXaWR0aCxcclxuXHRcdFx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItc3BsaXRidXR0b24gUGFkZGluZy0nICsgX3RoaXMuY29uZmlnLnBhZGRpbmcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0X3RoaXMuJGFjdGlvbnMucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TcGxpdEJ1dHRvbiA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwidmFyIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG52YXIgc3RvcHRpbWVyID0gdHJ1ZTtcclxudmFyIG15VGltb3V0ICA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBvbktleWRvd25GdW5jdGlvbigpIHtcclxuICAgIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG4gIFxyXG4gICAgc3RvcHRpbWVyPXRydWU7XHJcbiAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgIG15VGltb3V0ID0gbnVsbDtcclxuICB9O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIG9uS2V5VXBGdW5jdGlvbihlbGVtZW50VG9DbGljaykge1xyXG4gIHN0b3B0aW1lciA9IGZhbHNlO1xyXG4gIFxyXG4gIGlmKG1pbGlzZWNvbmRwYXNzZWQgPT0gMCAmJiBteVRpbW91dD09bnVsbCl7XHJcbiAgICAgIG15VGltb3V0ID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBtaWxpc2Vjb25kcGFzc2VkKz0xMDA7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKG1pbGlzZWNvbmRwYXNzZWQgPj0gNDAwICYmIHN0b3B0aW1lcj09ZmFsc2UpIHtcclxuICAgICAgICAgICAgbWlsaXNlY29uZHBhc3NlZCA9IDA7XHJcbiAgICAgICAgICAgIHN0b3B0aW1lcj10cnVlO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3RvcHRpbWVyPT10cnVlKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteVRpbW91dCk7XHJcbiAgICAgICAgICAgIG15VGltb3V0ID0gbnVsbDtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5pZih0eXBlb2Yoc3NkQ29tcG9uZW50KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICBzc2RDb21wb25lbnQgPSB7XHJcbiAgICAgICAgbGVuZ3RoOiAwLFxyXG4gICAgICAgIG51bWJlck9mQWN0aXZlOiAwLFxyXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgdG9EZXN0cm95OiBmYWxzZSxcclxuICAgICAgICBvbkJsdXJEZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNzZENvbXBvbmVudC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSAkKCcjJyArIHNzZENvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3dyYXBwZXIgPSAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3NkQ29tcG9uZW50LnRvRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLmZpbmQoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhLnRvLWRlc3Ryb3knKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ1tkYXRhLXNzZC1wbGFjZWhvbGRlcj0nICsgc3NkQ29tcG9uZW50LmlkICsgJ10nKTtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudFdpZGdldCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudFdpZGdldCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5jaGlsZHJlbignZGl2LlNTRC1XcmFwcGVyOm5vdCguU2VsZWN0ZWQpJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vSWYgdGhpcyBTU0QtV3JhcHBlciBpcyBhbHJlYWR5IFNlbGVjdGVkLCByZXR1cm4uXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuYmx1cigpOyAvL0JsdXJzIHRoZSBvdGhlciBmb2N1c2VkIFNTRCdzLlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKys7XHJcbiAgICAgICAgICAgIGlmKCFfc3NkQ29tcG9uZW50V2lkZ2V0LnBhcmVudCgpLmhhc0NsYXNzKCdTU0RQb3B1cCcpKXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzc2RDb21wb25lbnQuaXNSVEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgLSAkKHRoaXMpLm91dGVyV2lkdGgoKSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuU1NELUJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuU1NELUxpc3QnKS5hdHRyKCdjdXJyZW50LWZvY3VzJywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLlNTRC1MaXN0JykuYXR0cignY3VycmVudC1mb2N1cycsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5wYXJlbnQoKS5oYXNDbGFzcygnU1NEUG9wdXAnKSl7XHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50V2lkZ2V0LmNsb3Nlc3QoJ2Zvcm0nKS5hcHBlbmQoX3NzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5hZGRDbGFzcygnUG9zaXRpb25lZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBibHVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoIXNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5Qb3NpdGlvbmVkLlNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfd3JhcHBlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQoJyMnICsgJCh0aGlzKS5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3dyYXBwZXIucmVtb3ZlQ2xhc3MoJ1Bvc2l0aW9uZWQnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdTZWFyY2hpbmcgRml4ZWQgS2V5Ym9hcmROYXYnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQmFyJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuU1NELUJhcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJzQ2xlYXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUtLTtcclxuICAgICAgICAgICAgJChcIi5TU0RfTGlzdFJlY29yZHMgc3BhbiwgLlNTRF9MaXN0TGluZS5TaG93TW9yZSwgLlNTRF9EZWxldGVPbkJsdXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZighc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL0lmIHRoZXJlJ3Mgbm8gU1NEIGFjdGl2ZSwgdGhlcmUncyBubyBuZWVkIHRvIHJlc2l6ZSBpdC5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfc3NkV3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJCgnIycgKyBfc3NkV3JhcHBlci5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKVswXTtcclxuICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSBfc3NkV3JhcHBlci5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoX3NzZENvbXBvbmVudFdpZGdldCkud2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LyosXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5pc1JUTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpIC0gJChfc3NkQ29tcG9uZW50V2lkZ2V0KS5vdXRlcldpZHRoKCkgLSBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9KS5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5jbG9zZXN0KCcuU1NELUNvbXBvbmVudCcpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiU2VsZWN0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsIHNzZEJhciwgc2VsZWN0ZWRUYWIsIGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NlbGVjdGVkVGFiID0gJChzZWxlY3RlZFRhYik7XHJcblxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmZvY3VzKHNzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRUYWIuaXMoJy5TZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQudGFic0NsZWFyKHNzZEJhcik7XHJcbiAgICAgICAgICAgICAgICBfc2VsZWN0ZWRUYWIuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKHNzZEJhcixpc0lucHV0RXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXNTZWxlY3RlZFRhYjogZnVuY3Rpb24oc3NkQmFyLGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNlYXJjaCBpbnB1dD9cclxuICAgICAgICAgICAgaWYoc3NkQmFyLmNoaWxkcmVuKCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyLlNlbGVjdGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFRvQ2xpY2sgPSBzc2RCYXIuc2libGluZ3MoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhOm5vdCgudG8tZGVzdHJveSknKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaXNJbnB1dEV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBvbktleVVwRnVuY3Rpb24oZWxlbWVudFRvQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5JbnB1dFBsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdCg6Zm9jdXMpJykuZmlyc3QoKS5zZWxlY3QoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNob3J0IGxpc3Q/XHJcbiAgICAgICAgICAgIGlmKHNzZEJhci5jaGlsZHJlbignLlNob3J0TGlzdFNlbGVjdG9yLUNvbnRhaW5lci5TZWxlY3RlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5TaG9ydExpc3RTZWxlY3Rvci1Db250YWluZXIgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBNZXRob2QgYmVpbmcgY2FsbGVkIGJ5IHVzZXIgYWN0aW9uIGpzX3NzZENvbXBvbmVudF9mb2N1c0N1cnJlbnRSb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb2N1c0N1cnJlbnRSb3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcbiAgICAgICAgICAgIHZhciBfY3VycmVudEZvY3VzID0gX3NzZExpc3QuYXR0cignY3VycmVudC1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOm50aC1jaGlsZCgnICsgX2N1cnJlbnRGb2N1cyArICcpJykuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJzQ2xlYXI6IGZ1bmN0aW9uKHNzZEJhcikge1xyXG4gICAgICAgICAgICAkKHNzZEJhcikuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlYXJjaEljb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJTZWxlY3QoZXZlbnQuZGF0YS5zc2RDb21wb25lbnRXaWRnZXQsIGV2ZW50LmRhdGEuc3NkQmFyLCAkKGV2ZW50LmRhdGEuc3NkQmFyKS5jaGlsZHJlbignLlNlYXJjaElucHV0LUNvbnRhaW5lcicpLGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogQG5hbWUgaW5wdXRFdmVudFxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnB1dEV2ZW50OiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0Q29udGFpbmVyID0gJChldmVudC5kYXRhLmlucHV0KS5jbG9zZXN0KCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudGFiU2VsZWN0KGV2ZW50LmRhdGEuc3NkQ29tcG9uZW50V2lkZ2V0LCBldmVudC5kYXRhLnNzZEJhciwgX2lucHV0Q29udGFpbmVyLHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoJChldmVudC5kYXRhLmlucHV0KS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykucmVtb3ZlQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykuYWRkQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgb25LZXlkb3duRnVuY3Rpb24oKTsgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGtleWJvYXJkSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiU2hpZnRcIiB8fCBldmVudC5rZXkgPT0gXCJDb250cm9sXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJFbnRlclwiICYmIF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJUYWJcIikge1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmF0dHIoJ2N1cnJlbnQtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRFbGVtZW50ID0gJChudWxsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKF9jdXJyZW50Rm9jdXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpudGgtY2hpbGQoJyArIF9jdXJyZW50Rm9jdXMgKyAnKScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LmFkZENsYXNzKCdLZXlib2FyZE5hdicpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50LmlzKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpLnByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbicpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3NlbGVjdGVkRWxlbWVudC5pcygnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9ICQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NlbGVjdGVkRWxlbWVudC5yZW1vdmVDbGFzcygnZm9jdXMnKS5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCAmJiBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1CYXInKSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghX3NlbGVjdGVkRWxlbWVudC5maW5kKCcuU1NEX0xpc3RMaW5lLkRpc2FibGVkJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkTGlzdC5maW5kKCdhLk90aGVyQ29udHJvbExpbmsnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgX2N1cnJlbnRGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhfc3NkQ29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyS2V5Ym9hcmROYXZTdGF0dXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoc3NkQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgdmFyIF9zc2RMaXN0ID0gX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdLZXlib2FyZE5hdicpO1xyXG4gICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgMClcclxuICAgICAgICAgICAgICAgIC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW4uZm9jdXMnKS5yZW1vdmVDbGFzcygnZm9jdXMnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmJsdXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgPD0gMTAyNCl7XHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkgKyAncHgnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLypOb3QgTW9iaWxlIGFwcGx5IGZpeGVkIGJlaGF2aW91ciovXHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICgkKCcuVG9wUGF0aWVudEhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJCgnLkhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJChcIi50b29sYmFyLXdyYXBwZXJcIikub3V0ZXJIZWlnaHQoKSsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpICkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsKCQoJy5Ub3BQYXRpZW50SGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKCcuSGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKFwiLnRvb2xiYXItd3JhcHBlclwiKS5vdXRlckhlaWdodCgpICsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpKSArICdweCcpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIF9zc2RDb21wb25lbnQuYWRkQ2xhc3MoJ0ZpeGVkJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbihfaW5wdXRJZCkgeyAvKiBVc2VkIHRvIGRlc3Ryb3kgYSBzcGVjaWZpYyBzc2QgY29tcG9uZW50IGJ5IHJlY2VpdmUgdGhlIGlucHV0IGlkZW50aWZpZXIgYXMgcGFyYW1ldGVyIGFuZCBkZXRlcm1pbmUgdGhlIHdyYXBwZXIgdG8gcmVtb3ZlLiAqL1xyXG4gICAgICAgICAgICAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsX3RvRGVzdHJveSkge1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubGVuZ3RoKys7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5pc1JUTCA9ICQoJ2h0bWwnKS5pcygnLnJ0bCcpO1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudG9EZXN0cm95ID0gX3RvRGVzdHJveTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzc2RDb21wb25lbnRXaWRnZXQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5pZCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJChzc2RDb21wb25lbnRXaWRnZXQpO1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9IF9zc2RDb21wb25lbnRXaWRnZXQuZmluZCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RCYXIgPSBfc3NkQ29tcG9uZW50LmNoaWxkcmVuKCcuU1NELUJhcicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc2VhcmNoSWNvbiA9IF9zc2RCYXIuZmluZCgnLlNlYXJjaEljb24nKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0ID0gX3NzZEJhci5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfY2xlYXJDb250cm9sID0gX3NzZEJhci5maW5kKCcuQ2xlYXJDb250cm9sJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9zZWFyY2hJY29uLm9mZignY2xpY2snKS5vbignY2xpY2snLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXJcclxuICAgICAgICAgICAgfSwgc3NkQ29tcG9uZW50LnNlYXJjaEljb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3NzZEJhci5jaGlsZHJlbignZGl2Jykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudFdpZGdldDogX3NzZENvbXBvbmVudFdpZGdldCxcclxuICAgICAgICAgICAgICAgIHNzZEJhcjogX3NzZEJhclxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LnRhYlNlbGVjdChldmVudC5kYXRhLnNzZENvbXBvbmVudFdpZGdldCwgZXZlbnQuZGF0YS5zc2RCYXIsIHRoaXMsZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9jbGVhckNvbnRyb2wub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9pbnB1dC5vZmYoJ2tleXVwJykub24oJ2tleXVwJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50V2lkZ2V0OiBfc3NkQ29tcG9uZW50V2lkZ2V0LFxyXG4gICAgICAgICAgICAgICAgc3NkQmFyOiBfc3NkQmFyLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IF9pbnB1dFxyXG4gICAgICAgICAgICB9LCBzc2RDb21wb25lbnQuaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfaW5wdXQub2ZmKCdrZXlkb3duJykub24oJ2tleWRvd24nLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dDogX2lucHV0XHJcbiAgICAgICAgICAgIH0sIHNzZENvbXBvbmVudC5rZXlkb3duRXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChfc3NkQ29tcG9uZW50KS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50OiBfc3NkQ29tcG9uZW50XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhldmVudC5kYXRhLnNzZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgc3NkQ29tcG9uZW50LnJlc2l6ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5pcygnOnZpc2libGUnKSkgeyAvKiBDbGlja3Mgb24gaGlkZGVuIGVsZW1lbnRzIGFyZSBkaXNtaXNzZWQuICovXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGUgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighZS5sZW5ndGgpIHsgLy8gVXNlciBjbGlja2VkIG91dHNpZGUgdGhlIFNTRC1Db21wb25lbnQ/XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gXCIyN1wiKSB7IC8vIFVzZXIgaGl0IEVzY2FwZVxyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm9uQmx1ckRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7IC8vIElmIHRoZXJlJ3MgYW4gU1NEIGNvbXBvbmVudCBhY3RpdmUsIGdvIGZvciBLZXlib2FyZCBoYW5kbGVyXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5rZXlib2FyZEhhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlID4gMCkgeyAvLyBJZiB0aGVyZSdzIGFuIFNTRCBjb21wb25lbnQgYWN0aXZlLCBnbyBmb3Igc2Nyb2xsIGhhbmRsZXJcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LnNjcm9sbEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBTU0RMaXN0TGluZSAqL1xyXG5TYXBwaGlyZVdpZGdldHMuU1NETGlzdExpbmUgPSB7XHJcblx0dG9nZ2xlOiAobGluZUlkLCBsaW5lSGFuZGxlciA9ICcnKSA9PiB7XHJcblx0XHR2YXIgX2xpbmUgPSAkKGxpbmVJZCkuaXMoJy5TU0RfTGlzdExpbmUnKVxyXG5cdFx0XHQ/ICQobGluZUlkKVxyXG5cdFx0XHQ6ICQobGluZUlkKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuU1NEX0xpc3RMaW5lJylcclxuXHRcdFx0XHRcdC5maXJzdCgpO1xyXG5cclxuXHRcdGlmICghX2xpbmUubGVuZ3RoKSByZXR1cm47XHJcblxyXG5cdFx0dmFyIF9leHBhbmRDb250cm9sID0gJCgnLmV4cGFuZC1jb250cm9sLWN1c3RvbS13aWR0aCcpO1xyXG5cclxuXHRcdGlmIChfZXhwYW5kQ29udHJvbC5sZW5ndGggIT0gMCkge1xyXG5cdFx0XHRfZXhwYW5kQ29udHJvbC5yZW1vdmVDbGFzcygnZXhwYW5kLWNvbnRyb2wtY3VzdG9tLXdpZHRoJyk7XHJcblx0XHRcdF9leHBhbmRDb250cm9sLmNzcygnd2lkdGgnLCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFfbGluZS5pcygnLkFjdGl2ZScpKSB7XHJcblx0XHRcdHZhciBfbGluZUhlYWRlciA9IF9saW5lXHJcblx0XHRcdFx0LmNsb3Nlc3QoJ2Rpdi5TZWxlY3RhYmxlTGlzdCwgLlNlbGVjdGFibGVMaXN0LUxpc3RSZWNvcmRzJylcclxuXHRcdFx0XHQuZmluZCgnZGl2LlNlbGVjdGFibGVMaXN0LUxpbmUuQWN0aXZlJylcclxuXHRcdFx0XHQubm90KF9saW5lKTtcclxuXHJcblx0XHRcdF9saW5lSGVhZGVyLmZpbmQoJ2FbaGlkZS1hY3Rpb25dJykuY2xpY2soKTtcclxuXHRcdFx0X2xpbmVIZWFkZXJcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0FjdGl2ZScpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCdzcGFuJylcclxuXHRcdFx0XHQuaGlkZSgyMDApO1xyXG5cdFx0XHRfbGluZS5hZGRDbGFzcygnQWN0aXZlJyk7XHJcblxyXG5cdFx0XHRpZiAoJChsaW5lSGFuZGxlcikubGVuZ3RoKSB7XHJcblx0XHRcdFx0JChsaW5lSGFuZGxlcikuY2xpY2soKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0X2xpbmUucmVtb3ZlQ2xhc3MoJ0FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBUYWJzRXh0ZW5kZWQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlRhYnNFeHRlbmRlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHQkKCcuVGFic19FeHRlbmRlZCAuVGFic19oZWFkZXIgPiAuVGFic19fdGFiJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoJCh0aGlzKS50ZXh0KCkgPT09ICcnKSB7XHJcblx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdCQoJy5UYWJzX0V4dGVuZGVkIC5UYWJzX2hlYWRlciAuVGFic19fdGFiOm5vdCguYWN0aXZlKScpXHJcblx0XHQub2ZmKCdtb3VzZWRvd24nKVxyXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xyXG5cdFx0XHQkdGFic0V4dGVuZGVkLnJlbW92ZUNsYXNzKCdpc0Nsb3NlZCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdCQoJy5UYWJzX0V4dGVuZGVkLkhpZGVBY3RpdmVPbkNsaWNrIC5UYWJzX2hlYWRlcicpXHJcblx0XHQub2ZmKCdtb3VzZWRvd24nKVxyXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCAnLlRhYnNfX3RhYi5hY3RpdmUnLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xyXG5cdFx0XHR2YXIgJHRhYnNCb2R5ID0gJHRhYnNFeHRlbmRlZC5maW5kKCcuVGFic19ib2R5Jyk7XHJcblxyXG5cdFx0XHRpZiAoJHRhYnNCb2R5Lmhhc0NsYXNzKCdUYWJzX2JvZHktLWNsb3NlZCcpKSB7XHJcblx0XHRcdFx0JHRhYnNCb2R5LnJlbW92ZUNsYXNzKCdUYWJzX2JvZHktLWNsb3NlZCcpO1xyXG5cdFx0XHRcdCR0YWJzRXh0ZW5kZWQucmVtb3ZlQ2xhc3MoJ2lzQ2xvc2VkJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JHRhYnNCb2R5LmFkZENsYXNzKCdUYWJzX2JvZHktLWNsb3NlZCcpO1xyXG5cdFx0XHRcdCR0YWJzRXh0ZW5kZWQuYWRkQ2xhc3MoJ2lzQ2xvc2VkJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHQkKCcuVGFic19FeHRlbmRlZC0tZGlzYWJsZWQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuXHRcdCQoZWwpXHJcblx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHQuY3NzKCdjdXJzb3InLCAnZGVmYXVsdCcpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJyk7XHJcblx0fSk7XHJcblxyXG5cdCQoJy5UYWJzX0V4dGVuZGVkJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XHJcblx0XHRpZiAoJChlbCkuaGFzQ2xhc3MoJ1RhYnNfRXh0ZW5kZWQtLWNsb3NlZG9uc3RhcnQnKSkge1xyXG5cdFx0XHQkKGVsKVxyXG5cdFx0XHRcdC5maW5kKCcuVGFic19ib2R5JylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdCQoZWwpLmFkZENsYXNzKCdpc0Nsb3NlZCcpO1xyXG5cdFx0XHQkKGVsKS5yZW1vdmVDbGFzcygnVGFic19FeHRlbmRlZC0tY2xvc2Vkb25zdGFydCcpO1xyXG5cdFx0fVxyXG5cdFx0JChlbClcclxuXHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHQub24oJ2NsaWNrJywgJy5UYWJzX0V4dGVuZGVkLS1jbG9zZScsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHQkKGV2dC50YXJnZXQpXHJcblx0XHRcdFx0XHQuY2xvc2VzdCgnLlRhYnNfYm9keScpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cdFNhcHBoaXJlV2lkZ2V0cy5UYWJzRXh0ZW5kZWQoKTtcclxuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5UYWJzRXh0ZW5kZWQpO1xyXG59KTsiLCIvKiBDb21wb25lbnQgVGFidWxhckxpc3QgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBhbGxUYWJ1bGFyTGlzdHMgPSBbXTtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy50YWJ1bGFyTGlzdElkXSA9IG5ldyBUYWJ1bGFyTGlzdChjb25maWcpO1xyXG5cdFx0YWxsVGFidWxhckxpc3RzLnB1c2god2luZG93W2NvbmZpZy50YWJ1bGFyTGlzdElkXSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBhbGxUYWJ1bGFyTGlzdHMgPSBTYXBwaGlyZVdpZGdldHMuVGFidWxhckxpc3QuYWxsKCk7XHJcblx0XHRcdGFsbFRhYnVsYXJMaXN0cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGkpIHtcclxuXHRcdFx0XHRlbGVtZW50LmhhbmRsZVRhYnVsYXJMaXN0Q29sdW1ucygpO1xyXG5cdFx0XHRcdGVsZW1lbnQuaGFuZGxlUmVzcG9uc2l2ZUNsYXNzZXMoMjAwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZS50YWJ1bGFybGlzdCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYWxsVGFidWxhckxpc3RzID0gU2FwcGhpcmVXaWRnZXRzLlRhYnVsYXJMaXN0LmFsbCgpO1xyXG5cdFx0XHRhbGxUYWJ1bGFyTGlzdHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5oYW5kbGVSZXNwb25zaXZlQ2xhc3NlcygyMDApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHZhciBUYWJ1bGFyTGlzdCA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy50YWJ1bGFyTGlzdFJlc2l6ZVRpbWVyID0gMDtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLnRhYnVsYXJMaXN0SWQpO1xyXG5cdFx0dGhpcy4kd2lkZ2V0TGlzdCA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5UYWJ1bGFyTGlzdCcpO1xyXG5cdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5UYWJ1bGFyTGlzdFJvdycpLmVhY2goZnVuY3Rpb24oaSwgcm93KSB7XHJcblx0XHRcdF90aGlzLmNvbHVtbnNDb3VudCA9IDA7XHJcblx0XHRcdCQocm93KVxyXG5cdFx0XHRcdC5maW5kKCcuVGFidWxhckxpc3RSb3ctdmFsdWVzIC5UYWJ1bGFyTGlzdFJvdy1pdGVtJylcclxuXHRcdFx0XHQuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG5cdFx0XHRcdFx0JChlbCkuYWRkQ2xhc3MoJ1RhYnVsYXJMaXN0Q29sdW1uJyArIChpICsgMSkpO1xyXG5cdFx0XHRcdFx0X3RoaXMuY29sdW1uc0NvdW50Kys7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICghIWNvbmZpZy5icmVha09uKSB7XHJcblx0XHRcdHRoaXMuYnJlYWtPbk9yZGVyID0gcGFyc2VJbnQoY29uZmlnLmJyZWFrT24pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5icmVha09uT3JkZXIgPSAwO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5oYW5kbGVUYWJ1bGFyTGlzdENvbHVtbnMoKTtcclxuXHR9O1xyXG5cclxuXHRUYWJ1bGFyTGlzdC5wcm90b3R5cGUuaGFuZGxlVGFidWxhckxpc3RDb2x1bW5zID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAodGhpcy5jb25maWcuY29sdW1uc1dpZHRoID09PSAnQXV0bycpIHtcclxuXHRcdFx0aWYgKHRoaXMuJHdpZGdldExpc3Qud2lkdGgoKSA+IDEpIHtcclxuXHRcdFx0XHRmb3IgKGkgPSAxOyBpIDw9IHRoaXMuY29sdW1uc0NvdW50OyBpKyspIHtcclxuXHRcdFx0XHRcdHZhciBtYXhXaWR0aENvbnRlbnQgPSBNYXRoLm1heC5hcHBseShcclxuXHRcdFx0XHRcdFx0bnVsbCxcclxuXHRcdFx0XHRcdFx0dGhpcy4kd2lkZ2V0XHJcblx0XHRcdFx0XHRcdFx0LmZpbmQoJy5UYWJ1bGFyTGlzdENvbHVtbicgKyBpKVxyXG5cdFx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LmdldCgpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5UYWJ1bGFyTGlzdENvbHVtbicgKyBpKS53aWR0aChtYXhXaWR0aENvbnRlbnQpO1xyXG5cdFx0XHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5UYWJ1bGFyTGlzdENvbHVtbicgKyBpKS5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICghIXRoaXMuY29uZmlnLnByb3BlcnR5TWluV2lkdGgpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5UYWJ1bGFyTGlzdFJvdy1wcm9wZXJ0eScpLmNzcygnbWluLXdpZHRoJywgY29udmVydEluQ1NTVmFsdWUodGhpcy5jb25maWcucHJvcGVydHlNaW5XaWR0aCkpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCEhdGhpcy5jb25maWcucHJvcGVydHlNYXhXaWR0aCkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLlRhYnVsYXJMaXN0Um93LXByb3BlcnR5JykuY3NzKCdtYXgtd2lkdGgnLCBjb252ZXJ0SW5DU1NWYWx1ZSh0aGlzLmNvbmZpZy5wcm9wZXJ0eU1heFdpZHRoKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoISF0aGlzLmNvbmZpZy5hY3Rpb25zTWluV2lkdGgpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5UYWJ1bGFyTGlzdFJvdy1hY3Rpb25zJykuY3NzKCdtaW4td2lkdGgnLCBjb252ZXJ0SW5DU1NWYWx1ZSh0aGlzLmNvbmZpZy5hY3Rpb25zTWluV2lkdGgpKTtcclxuXHRcdH1cclxuXHRcdGlmICghIXRoaXMuY29uZmlnLmFjdGlvbnNNYXhXaWR0aCkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLlRhYnVsYXJMaXN0Um93LWFjdGlvbnMnKS5jc3MoJ21heC13aWR0aCcsIGNvbnZlcnRJbkNTU1ZhbHVlKHRoaXMuY29uZmlnLmFjdGlvbnNNYXhXaWR0aCkpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFRhYnVsYXJMaXN0LnByb3RvdHlwZS5oYW5kbGVSZXNwb25zaXZlQ2xhc3NlcyA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGFidWxhckxpc3RSZXNpemVUaW1lcik7XHJcblx0XHR0aGlzLnRhYnVsYXJMaXN0UmVzaXplVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0X3RoaXMuJHdpZGdldExpc3QucmVtb3ZlQ2xhc3MoZnVuY3Rpb24oaW5kZXgsIGNsYXNzTmFtZSkge1xyXG5cdFx0XHRcdHJldHVybiAoY2xhc3NOYW1lLm1hdGNoKC8oXnxcXHMpc2NyZWVuLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5yZW1vdmVDbGFzcygnaXNCcmVha2luZycpO1xyXG5cclxuXHRcdFx0dmFyIHdpZGdldFdpZHRoID0gX3RoaXMuJHdpZGdldExpc3Qub3V0ZXJXaWR0aCh0cnVlKTtcclxuXHRcdFx0aWYgKHdpZGdldFdpZHRoID09PSAwKSB7XHJcblx0XHRcdFx0d2lkZ2V0V2lkdGggPSBfdGhpcy4kd2lkZ2V0TGlzdFxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJzp2aXNpYmxlJylcclxuXHRcdFx0XHRcdC5lcSgwKVxyXG5cdFx0XHRcdFx0Lm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh3aWRnZXRXaWR0aCA+PSAxOTAwKSB7XHJcblx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ3NjcmVlbi1EZXNrdG9wSEQnKTtcclxuXHRcdFx0XHRpZiAoX3RoaXMuYnJlYWtPbk9yZGVyID49IDYpIHtcclxuXHRcdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdpc0JyZWFraW5nJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHdpZGdldFdpZHRoID49IDE2MDApIHtcclxuXHRcdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5hZGRDbGFzcygnc2NyZWVuLURlc2t0b3BCaWcnKTtcclxuXHRcdFx0XHRpZiAoX3RoaXMuYnJlYWtPbk9yZGVyID49IDUpIHtcclxuXHRcdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdpc0JyZWFraW5nJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHdpZGdldFdpZHRoID49IDEzNjYpIHtcclxuXHRcdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5hZGRDbGFzcygnc2NyZWVuLURlc2t0b3AnKTtcclxuXHRcdFx0XHRpZiAoX3RoaXMuYnJlYWtPbk9yZGVyID49IDQpIHtcclxuXHRcdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdpc0JyZWFraW5nJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHdpZGdldFdpZHRoID49IDEwMjQpIHtcclxuXHRcdFx0XHRfdGhpcy4kd2lkZ2V0TGlzdC5hZGRDbGFzcygnc2NyZWVuLURlc2t0b3BTbWFsbCcpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5icmVha09uT3JkZXIgPj0gMykge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ2lzQnJlYWtpbmcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gNDIwKSB7XHJcblx0XHRcdFx0X3RoaXMuJHdpZGdldExpc3QuYWRkQ2xhc3MoJ3NjcmVlbi1UYWJsZXQnKTtcclxuXHRcdFx0XHRpZiAoX3RoaXMuYnJlYWtPbk9yZGVyID49IDIpIHtcclxuXHRcdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdpc0JyZWFraW5nJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdzY3JlZW4tUGhvbmUnKTtcclxuXHRcdFx0XHRpZiAoX3RoaXMuYnJlYWtPbk9yZGVyID49IDEpIHtcclxuXHRcdFx0XHRcdF90aGlzLiR3aWRnZXRMaXN0LmFkZENsYXNzKCdpc0JyZWFraW5nJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LCB0aW1lb3V0KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuVGFidWxhckxpc3QgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBhbGxUYWJ1bGFyTGlzdHM7XHJcblx0XHR9LFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnRJbkNTU1ZhbHVlKHZhbHVlX2luKSB7XHJcblx0dmFyIHJldHVybmVkO1xyXG5cdGlmICh2YWx1ZV9pbi5pbmNsdWRlcygncHgnKSB8fCB2YWx1ZV9pbi5pbmNsdWRlcygnJScpKSB7XHJcblx0XHRyZXR1cm5lZCA9IHZhbHVlX2luO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm5lZCA9IHZhbHVlX2luICsgJ3B4JztcclxuXHR9XHJcblx0cmV0dXJuIHJldHVybmVkO1xyXG59XHJcbiIsIi8qIENvbXBvbmVudCBUYWJ1bGFyU2Nyb2xsICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcuVGFidWxhclNjcm9sbCcpLmVhY2goZnVuY3Rpb24oaSwgZWwpIHtcclxuXHRcdFx0XHRzZXR1cFRhYnVsYXJTY3JvbGwoJChlbCkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG5cdFx0XHRcdFx0c2V0dXBUYWJ1bGFyU2Nyb2xsKCQoZWwpKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykub24oJ3Jlc2l6ZS50YWJ1bGFyc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG5cdFx0XHRcdHZhciAkY2VudGVyVGFibGUgPSAkKGVsKS5maW5kKCcuVGFidWxhclNjcm9sbC1jZW50ZXItdGFibGUnKTtcclxuXHRcdFx0XHR2YXIgdGFibGVXaWR0aCA9ICRjZW50ZXJUYWJsZS5maW5kKCd0YWJsZScpLndpZHRoKCk7XHJcblx0XHRcdFx0JChlbClcclxuXHRcdFx0XHRcdC5maW5kKCcuVGFidWxhclNjcm9sbC1jZW50ZXIgLlRvcFNjcm9sbERyYWdnZXInKVxyXG5cdFx0XHRcdFx0LndpZHRoKHRhYmxlV2lkdGgpO1xyXG5cdFx0XHRcdGlmICgkY2VudGVyVGFibGVbMF0uc2Nyb2xsV2lkdGggPiAkY2VudGVyVGFibGUud2lkdGgoKSkge1xyXG5cdFx0XHRcdFx0JChlbClcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJylcclxuXHRcdFx0XHRcdFx0LmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCQoZWwpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpXHJcblx0XHRcdFx0XHRcdC5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHNldHVwVGFidWxhclNjcm9sbCA9IGZ1bmN0aW9uKCR0YWJ1bGFyU2Nyb2xsKSB7XHJcblx0XHR2YXIgJHRvcFNjcm9sbFdyYXBwZXIgPSAkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpO1xyXG5cdFx0dmFyICRjZW50ZXJUYWJsZSA9ICR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlci10YWJsZScpO1xyXG5cdFx0JHRhYnVsYXJTY3JvbGwuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRjZW50ZXJUYWJsZS5zY3JvbGxMZWZ0KCR0b3BTY3JvbGxXcmFwcGVyLnNjcm9sbExlZnQoKSk7XHJcblx0XHR9KTtcclxuXHRcdCRjZW50ZXJUYWJsZS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCR0b3BTY3JvbGxXcmFwcGVyLnNjcm9sbExlZnQoJGNlbnRlclRhYmxlLnNjcm9sbExlZnQoKSk7XHJcblx0XHR9KTtcclxuXHRcdC8vIHNpbWlsYXIgdG8gUmVzaXplXHJcblx0XHR2YXIgdGFibGVXaWR0aCA9ICRjZW50ZXJUYWJsZS5maW5kKCd0YWJsZScpLndpZHRoKCk7XHJcblx0XHQkdGFidWxhclNjcm9sbC5maW5kKCcuVGFidWxhclNjcm9sbC1jZW50ZXIgLlRvcFNjcm9sbERyYWdnZXInKS53aWR0aCh0YWJsZVdpZHRoKTtcclxuXHRcdGlmICgkY2VudGVyVGFibGVbMF0uc2Nyb2xsV2lkdGggPiAkY2VudGVyVGFibGUud2lkdGgoKSkge1xyXG5cdFx0XHQkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuVGFidWxhclNjcm9sbCA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IFRyaWdnZXJJZnJhbWVUb29sdGlwICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHJcblx0XHR2YXIgJGVsZW1lbnRJZCA9ICQoJyMnICsgY29uZmlnLmVsZW1lbnRJZCk7XHJcblxyXG5cdFx0JGVsZW1lbnRJZC5hZGRDbGFzcygndG9vbHRpcCcpO1xyXG5cclxuXHRcdGlmIChjb25maWcudHJpZ2dlcklkID09PSAnY2xpY2snKSAkZWxlbWVudElkLmFkZENsYXNzKCd0b29sdGlwc3RlcmVkLS1wb2ludGVyJyk7XHJcblxyXG5cdFx0dmFyIGV4dHJhRGF0YVBhcmFtcyA9ICdkYXRhLWlmcmFtZXRvb2x0aXB0cmlnZ2VyaWQ9XCInICsgY29uZmlnLmVsZW1lbnRJZCArICdcIic7XHJcblx0XHR2YXIgd2lkZ2V0Tm90aWZ5RGl2ID0gJC5maW5kKCdbZGF0YS1pZnJhbWV0b29sdGlwdHJpZ2dlcmlkPVwiJyArIGNvbmZpZy5lbGVtZW50SWQgKyAnXCJdJyk7XHJcblx0XHRpZiAod2lkZ2V0Tm90aWZ5RGl2Lmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRleHRyYURhdGFQYXJhbXMgKz0gJyBkYXRhLWlmcmFtZXRvb2x0aXBub3RpZnlpZD0nICsgJCh3aWRnZXROb3RpZnlEaXYpLmRhdGEoJ2lmcmFtZXRvb2x0aXBub3RpZnlpZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCRlbGVtZW50SWQudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRjb250ZW50QXNIVE1MOiB0cnVlLFxyXG5cdFx0XHR0aGVtZTogY29uZmlnLnRoZW1lLFxyXG5cdFx0XHRpbnRlcmFjdGl2ZTogdHJ1ZSxcclxuXHRcdFx0cG9zaXRpb246IGNvbmZpZy5wb3NpdGlvbklkLFxyXG5cdFx0XHR0cmlnZ2VyOiBjb25maWcudHJpZ2dlcklkLFxyXG5cdFx0XHRtaW5XaWR0aDogY29uZmlnLm1pbldpZHRoLFxyXG5cdFx0XHRtYXhXaWR0aDogY29uZmlnLm1heFdpZHRoLFxyXG5cdFx0XHR6aW5kZXg6IGNvbmZpZy56aW5kZXgsXHJcblx0XHRcdGNvbnRlbnQ6ICc8aWZyYW1lIGlkPVwidG9vbHRpcHN0ZXItZnJhbWVcIiBkYXRhLXVpPVwiaWZyYW1lLXRvb2x0aXBcIiBzcmM9XCInICsgY29uZmlnLlVSTCArICdcIiBzdHlsZT1cImJvcmRlcjpub25lXCIgJyArIGV4dHJhRGF0YVBhcmFtcyArICc+PC9pZnJhbWU+JyxcclxuXHRcdFx0ZnVuY3Rpb25SZWFkeTogZnVuY3Rpb24gKGluc3RhbmNlLCBoZWxwZXIpIHtcclxuXHRcdFx0XHQkKGhlbHBlcikuY3NzKHtcclxuXHRcdFx0XHRcdHZpc2liaWxpdHk6ICdoaWRkZW4nLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0JCgnLnRvb2x0aXBzdGVyLWJhc2UnKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHR2aXNpYmlsaXR5OiAndmlzaWJsZScsXHJcblx0XHRcdFx0XHRcdFwibWluSGVpZ2h0XCI6IGNvbmZpZy5taW5IZWlnaHQgPiAwID8gY29uZmlnLm1pbkhlaWdodCA6ICdhdXRvJyxcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sIDUwMCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuVHJpZ2dlcklmcmFtZVRvb2x0aXAgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgVHJ1bmNhdGVkQ29udGVudCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnID0ge30pIHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgJGFsbFRydW5jYXRlZCA9ICQoW10pO1xyXG5cdFx0XHR2YXIgcm9vdFNlbGVjdG9yID0gYCMke2NvbmZpZy53aWRnZXRJZH1gO1xyXG5cdFx0XHR2YXIgb3BlbmVyU2VsZWN0b3IgPSAnLlRydW5jYXRlZENvbnRlbnQtLWFsbCc7XHJcblx0XHRcdHZhciBib2R5U2VsZWN0b3IgPSAnLlRydW5jYXRlZENvbnRlbnQtLWJvZHknO1xyXG5cclxuXHRcdFx0JChyb290U2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyICRlbCA9ICQodGhpcyk7XHJcblx0XHRcdFx0JGFsbFRydW5jYXRlZCA9ICRhbGxUcnVuY2F0ZWQuYWRkKCRlbCk7XHJcblx0XHRcdFx0dmFyICRlbEJvZHkgPSAkZWwuZmluZChib2R5U2VsZWN0b3IpO1xyXG5cdFx0XHRcdHZhciBtYXhMaW5lcyA9ICRlbC5kYXRhKCdtYXhsaW5lcycpO1xyXG5cdFx0XHRcdHZhciBsaW5lSGVpZ2h0ID0gd2luZG93XHJcblx0XHRcdFx0XHQuZ2V0Q29tcHV0ZWRTdHlsZSgkZWwuZmluZCgnPiBkaXYnKVswXSlcclxuXHRcdFx0XHRcdC5nZXRQcm9wZXJ0eVZhbHVlKCdsaW5lLWhlaWdodCcpXHJcblx0XHRcdFx0XHQucmVwbGFjZSgncHgnLCAnJyk7XHJcblx0XHRcdFx0dmFyIGxpbmVDb3VudCA9IE1hdGguY2VpbCgkZWwuaGVpZ2h0KCkgLyBsaW5lSGVpZ2h0KTtcclxuXHRcdFx0XHRpZiAobGluZUNvdW50ID4gbWF4TGluZXMpIHtcclxuXHRcdFx0XHRcdCRlbEJvZHkuY3NzKHtcclxuXHRcdFx0XHRcdFx0bWF4SGVpZ2h0OiBsaW5lSGVpZ2h0ICogbWF4TGluZXMgKyAncHgnLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR2YXIgc2VudGVuY2UgPSAkZWwuZGF0YSgnYWRkaXRpb25hbCcpLnJlcGxhY2UoJ3tufScsIGxpbmVDb3VudCAtIG1heExpbmVzKTtcclxuXHRcdFx0XHRcdCRlbC5hcHBlbmQoJzxwIGNsYXNzPVwiJyArIG9wZW5lclNlbGVjdG9yLnJlcGxhY2UoJy4nLCAnJykgKyAnXCI+JyArIHNlbnRlbmNlICsgJzwvcD4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0JChyb290U2VsZWN0b3IpLm9uKCdjbGljaycsIG9wZW5lclNlbGVjdG9yLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgZWwgPSAkKHRoaXMpLmNsb3Nlc3Qocm9vdFNlbGVjdG9yKTtcclxuXHRcdFx0XHRvcGVuVHJ1bmNhdGVkQ29udGVudChlbCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0b3BlblRydW5jYXRlZENvbnRlbnQgPSBmdW5jdGlvbihlbCkge1xyXG5cdFx0XHRcdCQoZWwpXHJcblx0XHRcdFx0XHQuZmluZChib2R5U2VsZWN0b3IpXHJcblx0XHRcdFx0XHQuY3NzKCdtYXgtaGVpZ2h0JywgJ25vbmUnKTtcclxuXHRcdFx0XHQkKGVsKVxyXG5cdFx0XHRcdFx0LmZpbmQob3BlbmVyU2VsZWN0b3IpXHJcblx0XHRcdFx0XHQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmICh3aW5kb3cuZnJhbWVFbGVtZW50ICYmIHdpbmRvdy5mcmFtZUVsZW1lbnQuaWQgPT09ICd0b29sdGlwc3Rlci1mcmFtZScpIHtcclxuXHRcdFx0XHQkKHJvb3RTZWxlY3Rvcikub2ZmKCdjbGljaycsIG9wZW5lclNlbGVjdG9yKTtcclxuXHRcdFx0XHQkKG9wZW5lclNlbGVjdG9yKS5hZGRDbGFzcygnaW4tdG9vbHRpcCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuVHJ1bmNhdGVkQ29udGVudCA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHRcdG9wZW46IGZ1bmN0aW9uKGVsKSB7XHJcblx0XHRcdG9wZW5UcnVuY2F0ZWRDb250ZW50KGVsKTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQWxsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0JGFsbFRydW5jYXRlZC5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdG9wZW5UcnVuY2F0ZWRDb250ZW50KCQodGhpcykpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgVmVydGljYWxDYXJvdXNlbCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHQkLmZuLnZlcnRpY2FsQ2Fyb3VzZWwgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0XHRcdHZhciBjYXJvdXNlbENvbnRhaW5lckNsYXNzID0gJ1ZlcnRpY2FsQ2Fyb3VzZWxfV3JhcHBlcic7XHJcblx0XHRcdHZhciBjYXJvdXNlbEdyb3VwQ2xhc3MgPSAnVmVydGljYWxDYXJvdXNlbF9fTGlzdCc7XHJcblx0XHRcdHZhciBjYXJvdXNlbEdvVXBDbGFzcyA9ICdWZXJ0aWNhbENhcm91c2VsX19fQ2hhbmdlVXAnO1xyXG5cdFx0XHR2YXIgY2Fyb3VzZWxHb0Rvd25DbGFzcyA9ICdWZXJ0aWNhbENhcm91c2VsX19fQ2hhbmdlRG93bic7XHJcblxyXG5cdFx0XHR2YXIgZGVmYXVsdHMgPSB7IGN1cnJlbnRJdGVtOiAxLCBzaG93SXRlbXM6IDEgfTtcclxuXHRcdFx0dmFyIG9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XHJcblxyXG5cdFx0XHR2YXIgY2Fyb3VzZWxDb250YWluZXI7XHJcblx0XHRcdHZhciBjYXJvdXNlbEdyb3VwO1xyXG5cdFx0XHR2YXIgY2Fyb3VzZWxVcDtcclxuXHRcdFx0dmFyIGNhcm91c2VsRG93bjtcclxuXHRcdFx0dmFyIHRvdGFsSXRlbXM7XHJcblxyXG5cdFx0XHR2YXIgc2V0Q29udGFpbmVySGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lckhlaWdodCA9IDA7XHJcblx0XHRcdFx0dmFyIG1hcmdpblRvcCA9IDA7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuc2hvd0l0ZW1zID09IDEpIHtcclxuXHRcdFx0XHRcdGNvbnRhaW5lckhlaWdodCA9ICQoJyA+IHNwYW4gPiBkaXY6bnRoLWNoaWxkKCcgKyBvcHRpb25zLmN1cnJlbnRJdGVtICsgJyknLCBjYXJvdXNlbEdyb3VwKS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Zm9yIChpID0gMTsgaSA9PSBvcHRpb25zLnNob3dJdGVtczsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lckhlaWdodCArICQoJyA+IGRpdjpudGgtY2hpbGQoJyArIGkgKyAnKScsIGNhcm91c2VsR3JvdXApLm91dGVySGVpZ2h0KHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgbmV4dEl0ZW0gPSBvcHRpb25zLnNob3dJdGVtcyArIG9wdGlvbnMuY3VycmVudEl0ZW07XHJcblx0XHRcdFx0bWFyZ2luVG9wID0gJCgnID4gc3BhbiA+IGRpdjpudGgtY2hpbGQoJyArIG5leHRJdGVtICsgJyknLCBjYXJvdXNlbEdyb3VwKS5jc3MoJ21hcmdpblRvcCcpO1xyXG5cdFx0XHRcdGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lckhlaWdodCAtIHBhcnNlSW50KG1hcmdpblRvcCk7XHJcblx0XHRcdFx0JChjYXJvdXNlbENvbnRhaW5lcikuY3NzKHsgaGVpZ2h0OiBjb250YWluZXJIZWlnaHQgfSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgc2V0T2Zmc2V0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGN1cnJlbnRJdGVtT2Zmc2V0ID0gJCgnID4gc3BhbiA+IGRpdjpudGgtY2hpbGQoJyArIG9wdGlvbnMuY3VycmVudEl0ZW0gKyAnKScsIGNhcm91c2VsR3JvdXApLm9mZnNldCgpO1xyXG5cclxuXHRcdFx0XHR2YXIgY2Fyb3VzZWxHcm91cE9mZnNldCA9ICQoY2Fyb3VzZWxHcm91cCkub2Zmc2V0KCk7XHJcblx0XHRcdFx0dmFyIG9mZnNldERpZmYgPSBjYXJvdXNlbEdyb3VwT2Zmc2V0LnRvcCAtIGN1cnJlbnRJdGVtT2Zmc2V0LnRvcDtcclxuXHJcblx0XHRcdFx0JCgnLlZlcnRpY2FsQ2Fyb3VzZWxfX0xpc3QgLlByZXNjcmlwdGlvbkNhcmQnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnI0RBRTBFNCcpO1xyXG5cclxuXHRcdFx0XHQkKGNhcm91c2VsR3JvdXApLmNzcyh7XHJcblx0XHRcdFx0XHRtc1RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoY2FsYygzNiUgKyAnICsgb2Zmc2V0RGlmZiArICdweCkpJyxcclxuXHRcdFx0XHRcdHdlYmtpdFRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoY2FsYygzNiUgKyAnICsgb2Zmc2V0RGlmZiArICdweCkpJyxcclxuXHRcdFx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoY2FsYygzNiUgKyAnICsgb2Zmc2V0RGlmZiArICdweCkpJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQkKCcgPiBzcGFuID4gZGl2Om50aC1jaGlsZCgnICsgb3B0aW9ucy5jdXJyZW50SXRlbSArICcpJywgY2Fyb3VzZWxHcm91cCkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNmZmYnKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHZhciBmZXRjaENhcmQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoJCgnIycgKyBDYXJkSWQpKSB7XHJcblx0XHRcdFx0XHRjdXJyZW50SXRlbSA9XHJcblx0XHRcdFx0XHRcdCQoJyMnICsgQ2FyZElkKVxyXG5cdFx0XHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0XHRcdC5pbmRleCgpICsgMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR2YXIgdXBkYXRlTmF2aWdhdGlvbiA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmN1cnJlbnRJdGVtID09IDEpIHtcclxuXHRcdFx0XHRcdCQoY2Fyb3VzZWxVcCkuYWRkQ2xhc3MoJ2lzRGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuY3VycmVudEl0ZW0gPiAxKSB7XHJcblx0XHRcdFx0XHQkKGNhcm91c2VsVXApLnJlbW92ZUNsYXNzKCdpc0Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChvcHRpb25zLmN1cnJlbnRJdGVtID09IHRvdGFsSXRlbXMgfHwgb3B0aW9ucy5jdXJyZW50SXRlbSArIG9wdGlvbnMuc2hvd0l0ZW1zID4gdG90YWxJdGVtcykge1xyXG5cdFx0XHRcdFx0JChjYXJvdXNlbERvd24pLmFkZENsYXNzKCdpc0Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLmN1cnJlbnRJdGVtIDwgdG90YWxJdGVtcykge1xyXG5cdFx0XHRcdFx0JChjYXJvdXNlbERvd24pLnJlbW92ZUNsYXNzKCdpc0Rpc2FibGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dmFyIG1vdmVDYXJvdXNlbCA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xyXG5cdFx0XHRcdGlmIChkaXJlY3Rpb24gPT0gJ3VwJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5jdXJyZW50SXRlbSA9IG9wdGlvbnMuY3VycmVudEl0ZW0gLSAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZGlyZWN0aW9uID09ICdkb3duJykge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5jdXJyZW50SXRlbSA9IG9wdGlvbnMuY3VycmVudEl0ZW0gKyAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR1cGRhdGVOYXZpZ2F0aW9uKCk7XHJcblx0XHRcdFx0c2V0Q29udGFpbmVySGVpZ2h0KCk7XHJcblx0XHRcdFx0c2V0T2Zmc2V0KCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuJyArIGNhcm91c2VsR3JvdXBDbGFzcyArICcsIC5WZXJ0aWNhbENhcm91c2VsX19Db250cm9sbGVycycpXHJcblx0XHRcdFx0XHQud3JhcEFsbCgnPGRpdiBjbGFzcz1cIicgKyBjYXJvdXNlbENvbnRhaW5lckNsYXNzICsgJ1wiPjwvZGl2PicpO1xyXG5cdFx0XHRcdGNhcm91c2VsQ29udGFpbmVyID0gJCh0aGlzKS5maW5kKCcuJyArIGNhcm91c2VsQ29udGFpbmVyQ2xhc3MpO1xyXG5cdFx0XHRcdGNhcm91c2VsR3JvdXAgPSAkKHRoaXMpLmZpbmQoJy4nICsgY2Fyb3VzZWxHcm91cENsYXNzKTtcclxuXHRcdFx0XHRjYXJvdXNlbFVwID0gJCh0aGlzKS5maW5kKCcuJyArIGNhcm91c2VsR29VcENsYXNzKTtcclxuXHRcdFx0XHRjYXJvdXNlbERvd24gPSAkKHRoaXMpLmZpbmQoJy4nICsgY2Fyb3VzZWxHb0Rvd25DbGFzcyk7XHJcblx0XHRcdFx0dG90YWxJdGVtcyA9ICQoJy4nICsgY2Fyb3VzZWxHcm91cENsYXNzICsgJyA+IHNwYW4nKS5jaGlsZHJlbigpLmxlbmd0aDtcclxuXHRcdFx0XHR1cGRhdGVOYXZpZ2F0aW9uKCk7XHJcblx0XHRcdFx0c2V0Q29udGFpbmVySGVpZ2h0KCk7XHJcblx0XHRcdFx0c2V0T2Zmc2V0KCk7XHJcblx0XHRcdFx0JChjYXJvdXNlbFVwKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5jdXJyZW50SXRlbSA+IDEpIHtcclxuXHRcdFx0XHRcdFx0bW92ZUNhcm91c2VsKCd1cCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdCQoY2Fyb3VzZWxEb3duKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5jdXJyZW50SXRlbSArIG9wdGlvbnMuc2hvd0l0ZW1zIDw9IHRvdGFsSXRlbXMpIHtcclxuXHRcdFx0XHRcdFx0bW92ZUNhcm91c2VsKCdkb3duJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdCQoJy5WZXJ0aWNhbENhcm91c2VsLk9wZW4nKS5iaW5kKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0aWYgKGUub3JpZ2luYWxFdmVudC53aGVlbERlbHRhIC8gMTIwID4gMCkge1xyXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5jdXJyZW50SXRlbSA+IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRtb3ZlQ2Fyb3VzZWwoJ3VwJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuY3VycmVudEl0ZW0gKyBvcHRpb25zLnNob3dJdGVtcyA8PSB0b3RhbEl0ZW1zKSB7XHJcblx0XHRcdFx0XHRcdFx0bW92ZUNhcm91c2VsKCdkb3duJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0Y29uc3Qgb25PcGVuID0gZnVuY3Rpb24oY2FyZE51bWJlcikge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJy5WZXJ0aWNhbENhcm91c2VsJykudmVydGljYWxDYXJvdXNlbCh7XHJcblx0XHRcdFx0Y3VycmVudEl0ZW06IGNhcmROdW1iZXIsXHJcblx0XHRcdFx0c2hvd0l0ZW1zOiAxLFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdCQoJy5QYWdlJykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdCQoJy5WZXJ0aWNhbENhcm91c2VsX19fQ2xvc2UnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcuVmVydGljYWxDYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdPcGVuJyk7XHJcblx0XHRcdFx0JCgnLlBhZ2UnKS5jc3MoJ292ZXJmbG93JywgJ2luaXRpYWwnKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuVmVydGljYWxDYXJvdXNlbCA9IHsgY3JlYXRlLCBvbk9wZW4gfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvL1NhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzIHx8IHt9O1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9