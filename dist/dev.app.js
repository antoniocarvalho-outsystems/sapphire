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
/******/ 	var hotCurrentHash = "67cf82db38a1b40490d0";
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
	"./05-components/v3-pat/line-details-expand-box/script.js": "./src/components/05-components/v3-pat/line-details-expand-box/script.js",
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
(function($, window, SapphireWidgets) {
	const create = () => {
		$(document).ready(() => init());
		$(window).load(() => {
			const $itemWrapper = $('.MenuItemWrapper.Active');

			if ($itemWrapper.length) {
				$itemWrapper[0].scrollIntoView({
					behavior: 'auto',
					block: 'end',
				});
			}
		});
	};

	const init = () => {
		handleArrows();

		$('.Toolbar__Items').scroll(() => {
			handleArrows();
		});

		$('.Toolbar__rightBtn').click(function() {
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

		$('.Toolbar__leftBtn').click(function() {
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
	menuPosition: function(id, Context) {
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
	menuEvents: function(Context) {
		$('.popup-button')
			.off('click')
			.on('click', function(e) {
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

	const setNoBorder = widget => {
		widget.addClass('SectionExpandableInside_header--noBorder');
	};

	const create = () => {
		SilkUI.SectionExpandable = new SectionExpandableInside();
		SilkUI.Execute(SilkUI.SectionExpandable.init, 'Error on SilkUIFramework/Content/SectionExpandable');
	};

	SapphireWidgets.SectionExpandableInside = {
		create,
		setNoBorder,
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
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		var $elementId = $('#' + config.elementId);
		$elementId.addClass('tooltip');

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
			content:
				'<iframe src="' + config.URL + '" style="border:none" id="tooltipster-frame" ' + extraDataParams + '></iframe>',
			functionReady: function(instance, helper) {
				$(helper).css({
					visibility: 'hidden',
				});
				setTimeout(function() {
					$('.tooltipster-base').css({
						visibility: 'visible',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzIHN5bmMgXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzAwLXNldHRpbmdzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtbWVudS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGV0aW1lLXJhbmdlLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3Bkb3duLWNhdGVnb3JpZXMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wem9uZS9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZnVsbHNjcmVlbi10YWJzLXdyYXBwZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3Jpem9udGFsLXRvb2xiYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LXdpdGgtY2xlYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWRldGFpbHMtZXhwYW5kLWJveC9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLW5vdGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wb3B1cC1tZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NhcHBoaXJlLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGF0aWVudC1jYWxsLWNhbmNlbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWNhcmQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tZXhwYW5kYWJsZS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLXJhZGlvLWJ1dHRvbi9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1jdXN0b20vc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtaW5zaWRlL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VsZWN0LXN5c3RlbS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NoaWZ0LWNvbnRhaW5lci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci1ob3Jpem9udGFsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci12ZXJ0aWNhbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwbGl0LWJ1dHRvbi9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1jb21wb25lbnQtYmxvY2svc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtbGlzdC1saW5lL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFibGUtZGF0YS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90cmlnZ2VyLWlmcmFtZS10b29sdGlwL3RyaWdnZXItaWZyYW1lLXRvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRzs7UUFFSDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGtCQUFrQiw4QkFBOEI7UUFDaEQ7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esb0JBQW9CLDJCQUEyQjtRQUMvQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxtQkFBbUIsY0FBYztRQUNqQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLEtBQUs7UUFDckI7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsWUFBWTtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGNBQWMsNEJBQTRCO1FBQzFDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTs7UUFFSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHNCQUFzQjtRQUN2QztRQUNBO1FBQ0E7UUFDQSxRQUFRO1FBQ1I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsVUFBVTtRQUNWO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLGNBQWMsd0NBQXdDO1FBQ3REO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFNBQVM7UUFDVDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGVBQWU7UUFDZjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLHNDQUFzQyx1QkFBdUI7OztRQUc3RDtRQUNBOzs7Ozs7Ozs7Ozs7QUN4eEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckJBLG1CQUFPLENBQUMsNERBQXlCOztBQUVqQztBQUNBO0FBQ0EsV0FBVyw2REFBOEM7Ozs7Ozs7Ozs7OztBQ0p6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkQ7Ozs7Ozs7Ozs7O0FDckVBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7Ozs7QUFJQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsNkM7Ozs7Ozs7Ozs7O0FDL1FEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDUEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN4T0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUEsZ0NBQWdDO0FBQ2hDLENBQUM7Ozs7Ozs7Ozs7OztBQ3ZERDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNU5EOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsSTs7Ozs7Ozs7Ozs7QUN0Q0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxzRUFBc0U7QUFDdEUsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUN4Y0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMvQ0Q7QUFDYTs7QUFFYjtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1RkFBdUYsYUFBYTtBQUNwRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxFQUFFO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFVBQVUsU0FBUyxhQUFhO0FBQzNDO0FBQ0EseUNBQXlDLFVBQVUsc0JBQXNCLGFBQWE7O0FBRXRGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQSxpREFBaUQsWUFBWTs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaURBQWlEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04seURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBLDJEQUEyRDs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsbURBQW1EO0FBQ25ELCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekM7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLG9DQUFvQyxzRUFBc0U7O0FBRTFHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1IsT0FBTztBQUNQLE1BQU07O0FBRU47O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdEO0FBQ3hEOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUIsb0JBQW9CLGFBQWE7QUFDakM7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ04sd0RBQXdELFVBQVU7QUFDbEU7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxLQUFLO0FBQ2I7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sS0FBSztBQUNaO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLGlDQUFpQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixpQ0FBaUM7QUFDeEQ7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlDQUFpQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQ0FBaUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0EseURBQXlELDJCQUEyQjtBQUNwRjtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxJQUFJLEtBQTZCO0FBQ2pDO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM1NEhBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsU0FBUyxxREFBcUQsU0FBUztBQUMvRTs7QUFFQTs7QUFFQSxtQ0FBbUM7QUFDbkMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGdDQUFnQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEMsTUFBTTtBQUNOLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOzs7Ozs7Ozs7Ozs7QUM5SUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUN0RkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCOztBQUVoRTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxpQkFBaUIsRUFBRSxLQUFLO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWEsTUFBTSxHQUFHLFFBQVEsR0FBRyxRQUFRO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdEpEOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEk7Ozs7Ozs7Ozs7O0FDckREO0FBQ0E7QUFDQTtBQUNBLFFBQVEsZ0JBQWdCO0FBQ3hCO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBLHlDQUF5QztBQUN6QyxDQUFDOzs7Ozs7Ozs7Ozs7QUNYRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixvQ0FBb0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRixDQUFDLEU7Ozs7Ozs7Ozs7O0FDNVFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUMxQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNuREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3JERCxtQkFBTyxDQUFDLCtGQUFzQjtBQUM5QixtQkFBTyxDQUFDLGlGQUFlO0FBQ3ZCO0FBQ0EsbUJBQU8sQ0FBQywrRUFBYztBQUN0QixtQkFBTyxDQUFDLHVGQUFrQjs7Ozs7Ozs7Ozs7OztBQ0oxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ25FRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUM5QkQ7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnQkFBZ0I7QUFDeEIsa0JBQWtCLGdCQUFnQjtBQUNsQyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdkJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0MsZ0JBQWdCOztBQUVoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixJQUFJOztBQUVKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQztBQUMzQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN4SkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDakdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047Ozs7Ozs7OztBQVNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLG1DOzs7Ozs7Ozs7OztBQ3RORDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2QyxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzNMRDtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLDJDQUEyQztBQUMzQyxrQ0FBa0M7QUFDbEMsNkJBQTZCO0FBQzdCLHNDQUFzQztBQUN0QyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixFOzs7Ozs7Ozs7OztBQzdZQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUEsR0FBRzs7QUFFSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN4TEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDZDOzs7Ozs7Ozs7OztBQ2xIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLEU7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxnQkFBZ0I7QUFDekIsa0NBQWtDLGdCQUFnQjs7QUFFbEQ7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0EsS0FBSztBQUNMLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUosYUFBYSxnQkFBZ0I7QUFDN0IsVUFBVSxnQkFBZ0I7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLGVBQWU7QUFDN0M7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMzS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUM1Q0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7Ozs7QUFJVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0I7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiw4STs7O0FBR0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsaVI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFNBQVM7QUFDVCxxQ0FBcUM7QUFDckM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7O0FBRUE7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7OztBQzFmRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbEREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUMxREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3ZDRDs7Ozs7Ozs7Ozs7O0FDQUEsdUMiLCJmaWxlIjoiZGV2LmFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjY3Y2Y4MmRiMzhhMWI0MDQ5MGQwXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImFwcFwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9hcHAuanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAuanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJyZXF1aXJlKCcuL2NvbXBvbmVudHMvaW5kZXguc2NzcycpO1xyXG5cclxuLy9JbXBvcnQgYWxsIEpTIGZpbGVzXHJcbmNvbnN0IHJlcXVpcmVBbGwgPSByID0+IHIua2V5cygpLmZvckVhY2gocik7XHJcbnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMnLCB0cnVlLCAvXFwuanMkLykpO1xyXG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vMDAtc2V0dGluZ3MvY29uZmlnLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wMC1zZXR0aW5ncy9jb25maWcuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1iYXNlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1tZW51L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1zdWItbWVudS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvY29tcC1saW5lL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGEtdGFibGVzL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGEtdGFibGVzL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGV0aW1lLXJhbmdlLXBpY2tlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZHJvcGRvd24tY2F0ZWdvcmllcy9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wZG93bi1jYXRlZ29yaWVzL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3B6b25lL3BsdWdpbi5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZHJvcHpvbmUvcGx1Z2luLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9leHBhbmRhYmxlLWxpbmsvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Z1bGxzY3JlZW4tdGFicy13cmFwcGVyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Z1bGxzY3JlZW4tdGFicy13cmFwcGVyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2dlbmVyaWMtZ2FsbGVyeS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaG9yaXpvbnRhbC10b29sYmFyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2hvcml6b250YWwtdG9vbGJhci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC13aXRoLWNsZWFyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LXdpdGgtY2xlYXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbGluZS1kZXRhaWxzLWV4cGFuZC1ib3gvc2NyaXB0LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWRldGFpbHMtZXhwYW5kLWJveC9zY3JpcHQuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xvY2F0aW9uLWJveC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9sb2NhdGlvbi1ib3gvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L21haW4taW50ZXJhY3RpdmUtY2FyZC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9tZW51LWJhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tZW51LWJhci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L211bHRpcGxlLXNlbGVjdGlvbi1idXR0b24vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9jb25maXJtYXRpb24tcGFuZWwuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLW5vdGlmeS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQtbm90aWZ5LmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BvcHVwLW1lbnUuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NhcHBoaXJlLXBhbmVsLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zYXBwaGlyZS1wYW5lbC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGF0aWVudC1jYWxsLWNhbmNlbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYXRpZW50LWNhbGwtY2FuY2VsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1jYXJkL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1jYXJkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3ByZXNjcmlwdGlvbi1leHBhbmRhYmxlL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1oZWFkZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtcmFkaW8tYnV0dG9uL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLXJhZGlvLWJ1dHRvbi9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtY3VzdG9tL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1jdXN0b20vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWluc2lkZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtaW5zaWRlL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlbGVjdC1zeXN0ZW0vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VsZWN0LXN5c3RlbS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zaGlmdC1jb250YWluZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItaG9yaXpvbnRhbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLWhvcml6b250YWwvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci12ZXJ0aWNhbC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLXZlcnRpY2FsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwbGl0LWJ1dHRvbi9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGxpdC1idXR0b24vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWNvbXBvbmVudC1ibG9jay9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtY29tcG9uZW50LWJsb2NrL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1saXN0LWxpbmUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWxpc3QtbGluZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJsZS1kYXRhL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYmxlLWRhdGEvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvdGFicy1leHRlbmRlZC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJzLWV4dGVuZGVkL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RyaWdnZXItaWZyYW1lLXRvb2x0aXAvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC90cmlnZ2VyLWlmcmFtZS10b29sdGlwLmpzXCIsXG5cdFwiLi9nbG9iYWxzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy9nbG9iYWxzLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL2NvbXBvbmVudHMgc3luYyByZWN1cnNpdmUgXFxcXC5qcyRcIjsiLCJTYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzID0gd2luZG93LlNhcHBoaXJlV2lkZ2V0cyB8fCB7fTtcclxuIiwiLyogQ29tcG9uZW50IExheW91dEJhc2UgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IExheW91dEJhc2UoY29uZmlnKTtcclxuXHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xyXG5cdH07XHJcblxyXG5cdHZhciBvcGVuU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLndpZGdldElkXS5vcGVuU2lkZWJhcklmcmFtZShkdXJhdGlvbik7XHJcblx0fTtcclxuXHJcblx0dmFyIGNsb3NlU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLndpZGdldElkXS5jbG9zZVNpZGViYXJJZnJhbWUoZHVyYXRpb24pO1xyXG5cdH07XHJcblxyXG5cdHZhciBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcclxuXHRcdHZhciAkdGFyZ2V0RWxlbWVudCA9ICRlbGVtZW50O1xyXG5cdFx0aWYgKCEhJHRhcmdldEVsZW1lbnQubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBzY3JvbGxUb09mZnNldEludGVydmFsO1xyXG5cdFx0XHRzY3JvbGxUb09mZnNldEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmICh3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLmdldFRocmVzaG9sZHMoKS5zZWNvbmRhcnlUaHJlc2hvbGQgPiAwKSB7XHJcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwpO1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgPSAkdGFyZ2V0RWxlbWVudC5vZmZzZXQoKS50b3A7XHJcblx0XHRcdFx0XHR2YXIgZGlzY291bnQ7XHJcblx0XHRcdFx0XHRpZiAoISEkKCcuTGF5b3V0QmFzZS1lbWVyZ2VuY3knKS50ZXh0KCkpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCQoJy5MYXlvdXRCYXNlLXNlY29uZGFyeScpLmhhc0NsYXNzKCdpc0ZpeGVkJykpIHtcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50T2Zmc2V0VG9wICs9IDE1MDtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50T2Zmc2V0VG9wICs9IDgwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGRpc2NvdW50ID0gMzkwO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKCQoJy5MYXlvdXRCYXNlLXNlY29uZGFyeScpLmhhc0NsYXNzKCdpc0ZpeGVkJykpIHtcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFbGVtZW50T2Zmc2V0VG9wICs9IDgwO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gMjA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZGlzY291bnQgPSAyNjA7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0JCgnYm9keSwgaHRtbCcpLnNjcm9sbFRvcCh0YXJnZXRFbGVtZW50T2Zmc2V0VG9wIC0gZGlzY291bnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMjUwKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR2YXIgTGF5b3V0QmFzZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lciA9IDA7XHJcblx0XHR0aGlzLmhhc0hlYWRlciA9IGNvbmZpZy5oYXNIZWFkZXI7XHJcblx0XHR0aGlzLmlzRXhwYW5kYWJsZSA9IGNvbmZpZy5pc0V4cGFuZGFibGU7XHJcblx0XHR0aGlzLmlzVG9wV2luZG93ID0gd2luZG93LnRvcCA9PT0gd2luZG93LnNlbGYgPyB0cnVlIDogZmFsc2U7XHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiR3cmFwcGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLVdyYXBwZXInKTtcclxuXHRcdHRoaXMuJHNwYWNlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zcGFjZXInKTtcclxuXHRcdC8vIHRoaXMuJGxheW91dEJhc2VDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLUNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJG1haW5NZW51ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLU1haW5NZW51Jyk7XHJcblx0XHR0aGlzLiRoZWFkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtaGVhZGVyJyk7XHJcblx0XHR0aGlzLiRoZWFkZXJCb2R5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1ib2R5Jyk7XHJcblx0XHR0aGlzLiRwcmltYXJ5TWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1wcmltYXJ5LW1lbnUnKTtcclxuXHRcdHRoaXMuJGVtZXJnZW5jeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1lbWVyZ2VuY3knKTtcclxuXHRcdHRoaXMuJHNlY29uZGFyeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zZWNvbmRhcnknKTtcclxuXHRcdHRoaXMuJHNlY29uZGFyeU1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5LW1lbnUnKTtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtaWZyYW1lc2lkZWJhcicpO1xyXG5cdFx0dGhpcy4kaGVhZGVyQWRkaXRpb25hbENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWFkZGl0aW9uYWwtY29udGVudCcpO1xyXG5cdFx0dGhpcy4kdG9wZml4ZWRDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXRvcGZpeGVkY29udGVudCcpO1xyXG5cdFx0dGhpcy4kYm90dG9tZml4ZWRDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLWJvdHRvbWZpeGVkY29udGVudCcpO1xyXG5cdFx0dGhpcy4kbWFpbkNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtTWFpbkNvbnRlbnQnKTtcclxuXHRcdHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ID0gMDtcclxuXHRcdHRoaXMuZXh0cmFQYWRkaW5nU2Vjb25kYXJ5ID0gMDtcclxuXHRcdC8vIHRoaXMucmVmZXJlbmNlSGVpZ2h0ID0gbnVsbDtcclxuXHRcdHRoaXMuc2V0dXBXaW5kb3dFdmVudHMoKTtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibGRzLXJpbmdcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PicpO1xyXG5cdFx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnTGF5b3V0QmFzZScpO1xyXG5cdFx0XHRpZiAoX3RoaXMuaXNUb3BXaW5kb3cpIHtcclxuXHRcdFx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbCgpO1xyXG5cdFx0XHQvLyBfdGhpcy5yZWZlcmVuY2VIZWlnaHQgPSAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0fSlcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5zZXR1cFdpbmRvd0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRfdGhpcy51cGRhdGVUaHJlc2hvbGRzKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycygpO1xyXG5cdFx0XHRfdGhpcy5oYW5kbGVMYXlvdXRUb3BQYWRkaW5nKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR3aW5kb3cuY2xlYXJUaW1lb3V0KF90aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lcik7XHJcblx0XHRcdF90aGlzLmxheW91dEJhc2VSZWRyYXdUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnPT09PT0nKTtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnd2luZG93JywgJCh3aW5kb3cpLmhlaWdodCgpKTtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnc2Nyb2xsaGVpZ2h0JywgJCgnYm9keScpWzBdLnNjcm9sbEhlaWdodCk7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ3JlZmVyZW5jZUhlaWdodCcsIF90aGlzLnJlZmVyZW5jZUhlaWdodCk7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlVGhyZXNob2xkcygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZU9wdGlvbmFsQ29udGFpbmVycygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZUxheW91dFRvcFBhZGRpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5oYW5kbGVMYXlvdXRCb3R0b21QYWRkaW5nKCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuaGFuZGxlT3B0aW9uYWxDb250YWluZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcblx0XHRpZiAodGhpcy4kZW1lcmdlbmN5Lmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRpZiAoc2Nyb2xsVG9wICsgdGhpcy5jb250ZW50VGhyZXNob2xkID4gdGhpcy5lbWVyZ2VuY3lUaHJlc2hvbGQpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kuYWRkQ2xhc3MoJ2lzRml4ZWQnKTtcclxuXHRcdFx0XHR0aGlzLiRlbWVyZ2VuY3kuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogdGhpcy5jb250ZW50VGhyZXNob2xkLFxyXG5cdFx0XHRcdFx0d2lkdGg6IHRoaXMuJGhlYWRlci53aWR0aCgpLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ID0gdGhpcy4kZW1lcmdlbmN5Lm91dGVySGVpZ2h0KHRydWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5yZW1vdmVDbGFzcygnaXNGaXhlZCcpO1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiAnYXV0bycsXHJcblx0XHRcdFx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLiRzZWNvbmRhcnkubGVuZ3RoID09PSAxICYmIHRoaXMuJHNlY29uZGFyeS50ZXh0KCkubGVuZ3RoID4gMCkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeU1lbnUudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5hZGRDbGFzcygnbm9Ub29sYmFyJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzY3JvbGxUb3AgKyB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgKyAodGhpcy4kZW1lcmdlbmN5Lm91dGVySGVpZ2h0KHRydWUpIHx8IDApID4gdGhpcy5zZWNvbmRhcnlUaHJlc2hvbGQpIHtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuYWRkQ2xhc3MoJ2lzRml4ZWQnKS5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgKyAodGhpcy4kZW1lcmdlbmN5Lm91dGVySGVpZ2h0KHRydWUpIHx8IDApLFxyXG5cdFx0XHRcdFx0d2lkdGg6IHRoaXMuJGhlYWRlci53aWR0aCgpLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5maW5kKCcuQnV0dG9uLlNlY29uZCwgLkJ1dHRvbi5UaGlyZCcpLm5vdCgnLlBhbmVsIC5CdXR0b24uU21hbGwsIC5QYW5lbCAuQnV0dG9uLlRoaXJkJykuYWRkQ2xhc3MoJ1NtYWxsJyk7XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeS5maW5kKCcuVG9vbGJhcicpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyIHRhcmdldFRvb2xiYXJXaWR0aCA9ICQoJy5TYXBwaGlyZUhlYWRlcicpLm91dGVyV2lkdGgodHJ1ZSkgKiAwLjY2O1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykud2lkdGgodGFyZ2V0VG9vbGJhcldpZHRoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuJHNlY29uZGFyeU1lbnUudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdub1Rvb2xiYXInKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy4kcHJpbWFyeU1lbnUuY3NzKCdvcGFjaXR5JywgMCk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSB0aGlzLiRzZWNvbmRhcnkub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblxyXG5cdFx0XHRcdC8vIC8vXHJcblx0XHRcdFx0Ly8gdmFyIGN1cnJlbnRIZWlnaHQgPSAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0XHRcdC8vIHZhciBjb21wZW5zYXRpb24gPSB0aGlzLnJlZmVyZW5jZUhlaWdodCAtIGN1cnJlbnRIZWlnaHQ7XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coY29tcGVuc2F0aW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gaWYgKGNvbXBlbnNhdGlvbiA8PSAwKSB7XHJcblx0XHRcdFx0Ly8gXHQvLyB0aGlzLiRsYXlvdXRCYXNlQ29udGVudC5jc3MoJ3BhZGRpbmctYm90dG9tJywgJycpO1xyXG5cdFx0XHRcdC8vIH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gXHR0aGlzLiRsYXlvdXRCYXNlQ29udGVudC5jc3MoJ3BhZGRpbmctYm90dG9tJywgY29tcGVuc2F0aW9uKTtcclxuXHRcdFx0XHQvLyB9XHJcblxyXG5cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdC8vIHRoaXMuJGxheW91dEJhc2VDb250ZW50LmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5yZW1vdmVDbGFzcygnaXNGaXhlZCcpLmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5CdXR0b24uU2Vjb25kLCAuQnV0dG9uLlRoaXJkJykucmVtb3ZlQ2xhc3MoJ1NtYWxsJyk7XHJcblx0XHRcdFx0dGhpcy4kcHJpbWFyeU1lbnUuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmNzcyh7XHJcblx0XHRcdFx0XHRoZWlnaHQ6ICd1bnNldCcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykuY3NzKCd3aWR0aCcsICcxMDAlJyk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5TWVudS50ZXh0KCkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuQ2xpbmljaWFuV29ya0FyZWEtY29sdW1ucy1iaWcnKS5jc3MoJ21hcmdpbi10b3AnLCAndW5zZXQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnLkNsaW5pY2lhbldvcmtBcmVhLWNvbHVtbnMtYmlnJykuY3NzKCdtYXJnaW4tdG9wJywgLXRoaXMuJHNlY29uZGFyeS5vdXRlckhlaWdodCh0cnVlKSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5TWVudS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAndHJhbnNwYXJlbnQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmhhbmRsZUxheW91dFRvcFBhZGRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcGFkZGluZ1RvcCA9IHRoaXMuY29udGVudFRocmVzaG9sZCArIHRoaXMuZXh0cmFQYWRkaW5nRW1lcmdlbmN5ICsgdGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnk7XHJcblx0XHR0aGlzLiRzcGFjZXIuc3RvcCgpLmFuaW1hdGUoe1xyXG5cdFx0XHRoZWlnaHQ6IHBhZGRpbmdUb3AsXHJcblx0XHR9LCAwLCAnbGluZWFyJyk7XHJcblx0XHRpZiAodGhpcy4kdG9wZml4ZWRDb250ZW50Lmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHR0aGlzLiR0b3BmaXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHR3aWR0aDogJCgnLkxheW91dEJhc2UtTWFpbkNvbnRlbnQnKS53aWR0aCgpLFxyXG5cdFx0XHRcdHRvcDogdGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQgKyAncHgnLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVMYXlvdXRCb3R0b21QYWRkaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuJGJvdHRvbWZpeGVkQ29udGVudC5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0aWYgKCQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQgPiAkKCdib2R5JykuaGVpZ2h0KCkpIHtcclxuXHRcdFx0XHR2YXIgYm90dG9tRml4ZWRIZWlnaHQgPSB0aGlzLiRib3R0b21maXhlZENvbnRlbnQub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdFx0dGhpcy4kd3JhcHBlci5hZGRDbGFzcygnaGFzRml4ZWRCb3R0b20nKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgYm90dG9tRml4ZWRIZWlnaHQgKyAncHgnKTtcclxuXHRcdFx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRcdHdpZHRoOiAkKCcuTGF5b3V0QmFzZS1NYWluQ29udGVudCcpLm91dGVyV2lkdGgodHJ1ZSlcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiR3cmFwcGVyLnJlbW92ZUNsYXNzKCdoYXNGaXhlZEJvdHRvbScpLmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7XHJcblx0XHRcdFx0dGhpcy4kYm90dG9tZml4ZWRDb250ZW50LmNzcyh7XHJcblx0XHRcdFx0XHR3aWR0aDogJydcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLnVwZGF0ZVRocmVzaG9sZHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFpbk1lbnVIZWlnaHQgPSB0aGlzLiRtYWluTWVudS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIGhlYWRlckJvZHlIZWlnaHQgPSB0aGlzLiRoZWFkZXJCb2R5Lm91dGVySGVpZ2h0KHRydWUpIHx8IHRoaXMuJGhlYWRlci5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIHRvcGZpeGVkQ29udGVudEhlaWdodCA9IHRoaXMuJHRvcGZpeGVkQ29udGVudC5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIHByaW1hcnlNZW51SGVpZ2h0ID0gdGhpcy4kcHJpbWFyeU1lbnUub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdHZhciBlbWVyZ2VuY3lIZWlnaHQgPSB0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdHRoaXMudG9wZml4ZWRDb250ZW50VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0O1xyXG5cdFx0dGhpcy5jb250ZW50VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0ICsgdG9wZml4ZWRDb250ZW50SGVpZ2h0O1xyXG5cdFx0dGhpcy5lbWVyZ2VuY3lUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQgKyBwcmltYXJ5TWVudUhlaWdodDtcclxuXHRcdHRoaXMuc2Vjb25kYXJ5VGhyZXNob2xkID0gbWFpbk1lbnVIZWlnaHQgKyBoZWFkZXJCb2R5SGVpZ2h0ICsgdG9wZml4ZWRDb250ZW50SGVpZ2h0ICsgcHJpbWFyeU1lbnVIZWlnaHQgKyBlbWVyZ2VuY3lIZWlnaHQ7XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuZ2V0VGhyZXNob2xkcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHRvcGZpeGVkQ29udGVudFRocmVzaG9sZDogdGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQsXHJcblx0XHRcdGNvbnRlbnRUaHJlc2hvbGQ6IHRoaXMuY29udGVudFRocmVzaG9sZCxcclxuXHRcdFx0ZW1lcmdlbmN5VGhyZXNob2xkOiB0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCxcclxuXHRcdFx0c2Vjb25kYXJ5VGhyZXNob2xkOiB0aGlzLnNlY29uZGFyeVRocmVzaG9sZCxcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUub3BlblNpZGViYXJJZnJhbWUgPSBmdW5jdGlvbiAoZHVyYXRpb25faW4pIHtcclxuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uX2luID49IDAgPyBkdXJhdGlvbl9pbiA6IDEwMDtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYW5pbWF0ZSh7XHJcblx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHR9LCBkdXJhdGlvbik7XHJcblx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFx0JCgnLnRvb2x0aXBzdGVyZWQnKS50b29sdGlwc3RlcignaGlkZScpO1xyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmNsb3NlU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbl9pbikge1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb25faW4gPj0gMCA/IGR1cmF0aW9uX2luIDogMTAwO1xyXG5cdFx0dmFyIHRhcmdldFdpZHRoID0gdGhpcy5pc0V4cGFuZGFibGUgPyA0MCA6IDI2MjtcclxuXHRcdHRoaXMuJGlmcmFtZVNpZGViYXIuYW5pbWF0ZSh7XHJcblx0XHRcdHdpZHRoOiB0YXJnZXRXaWR0aCxcclxuXHRcdH0sIGR1cmF0aW9uKTtcclxuXHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2UgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGNsb3NlU2lkZWJhcklmcmFtZTogY2xvc2VTaWRlYmFySWZyYW1lLFxyXG5cdFx0b3BlblNpZGViYXJJZnJhbWU6IG9wZW5TaWRlYmFySWZyYW1lLFxyXG5cdFx0c2Nyb2xsVG9FbGVtZW50OiBzY3JvbGxUb0VsZW1lbnQsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgTGF5b3V0QmxhbmsgKi9cclxuJChmdW5jdGlvbigpIHtcclxuXHRpZiAod2luZG93LmZyYW1lRWxlbWVudCkge1xyXG5cdFx0aWYgKCEhJCh0aGlzLmZyYW1lRWxlbWVudCkuY2xvc2VzdCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQnKS5sZW5ndGgpIHtcclxuXHRcdFx0JCgnLkxheW91dEJsYW5rLlBhZ2UnKS5hZGRDbGFzcygnTWFpbkludGVyYWN0aXZlQ2FyZCcpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBMYXlvdXRQb3B1cCAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBwb3B1cFdpZHRoO1xyXG5cdHZhciBwb3B1cE1pbldpZHRoO1xyXG5cdHZhciBwb3B1cEhlaWdodDtcclxuXHR2YXIgcG9wdXBNaW5IZWlnaHQ7XHJcblx0dmFyIHBvcHVwTWF4SGVpZ2h0O1xyXG5cdHZhciBwb3B1cFdpZHRoUGVyY2VudGFnZTtcclxuXHR2YXIgbGF5b3V0UG9wdXBSZXNpemVUaW1lcjtcclxuXHJcblx0dmFyICRwb3B1cCA9ICQoJy5MYXlvdXRQb3B1cCcpO1xyXG5cdHZhciAkb3NQb3B1cCA9IHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLVBvcHVwLm9zLWludGVybmFsLXVpLWRpYWxvZycpO1xyXG5cdHZhciAkb3NQb3B1cENvbnRlbnQgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC11aS1kaWFsb2ctY29udGVudC5vcy1pbnRlcm5hbC11aS13aWRnZXQtY29udGVudCcpO1xyXG5cdHZhciAkb3ZlcmxheSA9IHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLXVpLXdpZGdldC1vdmVybGF5Jyk7XHJcblx0dmFyIHBvcHVwU2l6ZTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cclxuXHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcgPSBjb25maWc7XHJcblx0XHRwb3B1cFNpemUgPSBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLlBvcHVwU2l6ZTtcclxuXHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdMYXlvdXRQb3B1cCcpOyAvLyBiZWNhdXNlIGRhdGV0aW1lcmFuZ2VwaWNrZXIgaXMgYXR0YWNoZWQgdG8gYm9keVxyXG5cdFx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc1RvdWNoKSB7XHJcblx0XHRcdFx0JHBvcHVwLmFkZENsYXNzKCdpc1RvdWNoJyk7XHJcblx0XHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdpc1RvdWNoJyk7IC8vIGJlY2F1c2Ugc2VsZWN0MiBpcyBhdHRhY2hlZCB0byBib2R5XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG5cdFx0XHRcdG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbiwgaW5kZXgpIHtcclxuXHRcdFx0XHRcdHJlZHJhd0RpYWxvZ1dpbmRvdygpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XHJcblx0XHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxyXG5cdFx0XHRcdHN1YnRyZWU6IHRydWUsXHJcblx0XHRcdFx0YXR0cmlidXRlczogZmFsc2UsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKCdib2R5JykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKHRoaXMuZnJhbWVFbGVtZW50KS5jc3Moe1xyXG5cdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0aGVpZ2h0OiAnMTAwJSdcclxuXHRcdFx0fSk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJlc2l6ZURpYWxvZygpO1xyXG5cdFx0XHRcdHJlc2l6ZUNvbnRlbnQoKTtcclxuXHRcdFx0XHQkKCdib2R5JykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0fSwgMTUwKTtcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAucmVkcmF3RGlhbG9nV2luZG93KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93LnBhcmVudCkub2ZmKCdyZXNpemUuTGF5b3V0UG9wdXAnKS5vbigncmVzaXplLkxheW91dFBvcHVwJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZWRyYXdEaWFsb2dXaW5kb3coKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlZHJhd0RpYWxvZ1dpbmRvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNsZWFyVGltZW91dChsYXlvdXRQb3B1cFJlc2l6ZVRpbWVyKTtcclxuXHRcdGxheW91dFBvcHVwUmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmVzaXplRGlhbG9nKCk7XHJcblx0XHRcdHJlc2l6ZUNvbnRlbnQoKTtcclxuXHRcdH0sIDMwMCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgcmVzaXplRGlhbG9nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaGFzQ2xvc2UpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLXRpdGxlYmFyJykuc2hvdygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh3aW5kb3cudG9wLiQoJ2JvZHknKS5oYXNDbGFzcygnTGF5b3V0QmFzZScpKSB7XHJcblx0XHRcdHdpbmRvdy50b3AuJCgnYm9keScpLmNzcyh7XHJcblx0XHRcdFx0b3ZlcmZsb3dZOiAnaGlkZGVuJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQkb3ZlcmxheS53aWR0aCgnMTAwJScpO1xyXG5cclxuXHRcdHZhciB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdy5wYXJlbnQpLmhlaWdodCgpO1xyXG5cdFx0dmFyIHdpbmRvd1dpZHRoID0gJCh3aW5kb3cucGFyZW50KS53aWR0aCgpO1xyXG5cclxuXHRcdGlmIChwb3B1cFNpemUgPT09ICdTbWFsbCcpIHtcclxuXHRcdFx0cG9wdXBXaWR0aCA9IHBhcnNlSW50KHdpbmRvd1dpZHRoICogMC4zMyk7XHJcblx0XHRcdHBvcHVwTWluV2lkdGggPSA0MDA7XHJcblx0XHR9IGVsc2UgaWYgKHBvcHVwU2l6ZSA9PT0gJ01lZGl1bScpIHtcclxuXHRcdFx0c3dpdGNoIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLlBvcHVwV2lkdGgpIHtcclxuXHRcdFx0XHRjYXNlICdYU21hbGwnOlxyXG5cdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDIwMDtcclxuXHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC4yO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnU21hbGwnOlxyXG5cdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDMwMDtcclxuXHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC4zO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnTWVkaXVtJzpcclxuXHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSA2MDA7XHJcblx0XHRcdFx0XHRwb3B1cFdpZHRoUGVyY2VudGFnZSA9IDAuNjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRwb3B1cE1pbldpZHRoID0gNzAwO1xyXG5cdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBvcHVwV2lkdGggPSBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzVG91Y2ggPyBwYXJzZUludCh3aW5kb3dXaWR0aCAqIDAuOCkgOiBwYXJzZUludCh3aW5kb3dXaWR0aCAqIHBvcHVwV2lkdGhQZXJjZW50YWdlKTtcclxuXHRcdFx0cG9wdXBNaW5IZWlnaHQgPSAyMDA7XHJcblx0XHRcdHBvcHVwTWF4SGVpZ2h0ID0gU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc1RvdWNoID8gcGFyc2VJbnQod2luZG93SGVpZ2h0ICogMC45KSA6IHBhcnNlSW50KHdpbmRvd0hlaWdodCAqIDAuNyk7XHJcblxyXG5cdFx0XHRpZiAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc0ZpeGVkSGVpZ2h0KSB7XHJcblx0XHRcdFx0cG9wdXBIZWlnaHQgPSBwb3B1cE1heEhlaWdodDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwb3B1cEhlaWdodCA9IHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLVBvcHVwLm9zLWludGVybmFsLXVpLWRpYWxvZycpLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdCRvc1BvcHVwQ29udGVudC5jc3Moe1xyXG5cdFx0XHRcdG1heEhlaWdodDogcG9wdXBNYXhIZWlnaHQgKyAncHgnLFxyXG5cdFx0XHRcdG1pbkhlaWdodDogcG9wdXBNaW5IZWlnaHQgKyAncHgnLFxyXG5cdFx0XHRcdGhlaWdodDogcG9wdXBIZWlnaHQgKyAncHgnLFxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSBpZiAocG9wdXBTaXplID09PSAnTGFyZ2UnKSB7XHJcblx0XHRcdHBvcHVwTWluV2lkdGggPSBwYXJzZUludCh3aW5kb3dXaWR0aCAqIDAuOCk7XHJcblx0XHRcdHBvcHVwTWF4SGVpZ2h0ID0gcGFyc2VJbnQod2luZG93SGVpZ2h0ICogMC45KTtcclxuXHRcdH1cclxuXHJcblx0XHQkb3NQb3B1cC5jc3Moe1xyXG5cdFx0XHRwb3NpdGlvbjogJ2ZpeGVkJyxcclxuXHRcdFx0bGVmdDogJzUwJScsXHJcblx0XHRcdHRvcDogJzUwJScsXHJcblx0XHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXHJcblx0XHRcdGhlaWdodDogJ2F1dG8nLFxyXG5cdFx0XHRtaW5XaWR0aDogcG9wdXBNaW5XaWR0aCArICdweCcsXHJcblx0XHRcdHdpZHRoOiBwb3B1cFdpZHRoICsgJ3B4JyxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlc2l6ZUNvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgJGJvZHkgPSAkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKTtcclxuXHRcdHZhciBjb250ZW50U2Nyb2xsVG9wID0gJGJvZHkuc2Nyb2xsVG9wKCk7XHJcblxyXG5cdFx0aWYgKHBvcHVwU2l6ZSA9PT0gJ1NtYWxsJyAmJiAkKCcuZGF0ZXJhbmdlcGlja2VyOnZpc2libGUnKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdC8vIHNraXAgdGhlIHJlc2V0IG9mIC5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JGJvZHkuY3NzKHtcclxuXHRcdFx0XHRoZWlnaHQ6ICdhdXRvJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgaGVhZGVySGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19oZWFkZXInKS5pbm5lckhlaWdodCgpIHx8IDA7XHJcblx0XHR2YXIgaW50cm9IZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2ludHJvJykuaW5uZXJIZWlnaHQoKSB8fCAwO1xyXG5cdFx0dmFyIGJvZHlIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKVswXS5zY3JvbGxIZWlnaHQgfHwgMDtcclxuXHRcdHZhciBmb290ZXJIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2Zvb3RlcicpLmlubmVySGVpZ2h0KCkgfHwgMDtcclxuXHRcdHZhciBjb250ZW50SGVpZ2h0ID0gaGVhZGVySGVpZ2h0ICsgaW50cm9IZWlnaHQgKyBib2R5SGVpZ2h0ICsgZm9vdGVySGVpZ2h0ICsgNDA7XHJcblx0XHR2YXIgZGlhbG9nSGVpZ2h0ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtUG9wdXAub3MtaW50ZXJuYWwtdWktZGlhbG9nJykub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnKSB7XHJcblx0XHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoY29udGVudEhlaWdodCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoY29udGVudEhlaWdodCA8IGRpYWxvZ0hlaWdodCAmJiBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzRml4ZWRIZWlnaHQpIHtcclxuXHRcdFx0XHR2YXIgZm9yY2VkQm9keUhlaWdodCA9IGRpYWxvZ0hlaWdodCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0IC0gZm9vdGVySGVpZ2h0IC0gNDA7XHJcblx0XHRcdFx0JGJvZHkuaGVpZ2h0KGZvcmNlZEJvZHlIZWlnaHQpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGNvbnRlbnRIZWlnaHQgPCBkaWFsb2dIZWlnaHQpIHtcclxuXHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KGNvbnRlbnRIZWlnaHQpO1xyXG5cdFx0XHRcdGlmIChjb250ZW50SGVpZ2h0IDwgcG9wdXBNaW5IZWlnaHQpIHtcclxuXHRcdFx0XHRcdHZhciBkaWZlcmVuY2UgPSBwb3B1cE1pbkhlaWdodCAtIGNvbnRlbnRIZWlnaHQ7XHJcblx0XHRcdFx0XHQkYm9keS5oZWlnaHQoYm9keUhlaWdodCArIGRpZmVyZW5jZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKGNvbnRlbnRIZWlnaHQgPj0gZGlhbG9nSGVpZ2h0ICYmIFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNGaXhlZEhlaWdodCkge1xyXG5cdFx0XHRcdHZhciBmb3JjZWRCb2R5SGVpZ2h0ID0gZGlhbG9nSGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW50cm9IZWlnaHQgLSBmb290ZXJIZWlnaHQgLSA0MDtcclxuXHRcdFx0XHQkYm9keS5oZWlnaHQoZm9yY2VkQm9keUhlaWdodCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29udGVudEhlaWdodCA+PSBkaWFsb2dIZWlnaHQpIHtcclxuXHRcdFx0XHRpZiAoY29udGVudEhlaWdodCA+IHBvcHVwTWF4SGVpZ2h0KSB7XHJcblx0XHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KHBvcHVwTWF4SGVpZ2h0KTtcclxuXHRcdFx0XHRcdHZhciBmb3JjZWRCb2R5SGVpZ2h0ID0gcG9wdXBNYXhIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCAtIGZvb3RlckhlaWdodCAtIDQwO1xyXG5cdFx0XHRcdFx0JGJvZHkuaGVpZ2h0KGZvcmNlZEJvZHlIZWlnaHQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KGNvbnRlbnRIZWlnaHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1VuZXhwZWN0ZWQgY29tYmluYXRpb24uLi4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEhhbmRsZSB3aGVuIERhdGVUaW1lUmFuZ2VQaWNrZXIgaXMgb3BlbmVkXHJcblx0XHR2YXIgZGF0ZVJhbmdlUGlja2VyID0gJCgnLmRhdGVyYW5nZXBpY2tlcjp2aXNpYmxlJyk7XHJcblx0XHRpZiAoZGF0ZVJhbmdlUGlja2VyLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRpZiAoZGF0ZVJhbmdlUGlja2VyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA+IGRpYWxvZ0hlaWdodCkge1xyXG5cdFx0XHRcdHZhciBkaWZmZXJlbmNlID0gZGF0ZVJhbmdlUGlja2VyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSAtIGRpYWxvZ0hlaWdodDtcclxuXHRcdFx0XHR2YXIgYm9keUhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpLm91dGVySGVpZ2h0KHRydWUpO1xyXG5cdFx0XHRcdCQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpLmhlaWdodChib2R5SGVpZ2h0ICsgZGlmZmVyZW5jZSArIDQwKTtcclxuXHRcdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KCQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0JGJvZHkuc2Nyb2xsVG9wKGNvbnRlbnRTY3JvbGxUb3ApO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGluY3JlYXNlSGVpZ2h0ID0gZnVuY3Rpb24gKGRpZmVyZW5jZSkge1xyXG5cdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodCgkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KCkgKyBkaWZlcmVuY2UpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHNjcm9sbFRvRWxlbWVudCA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xyXG5cdFx0dmFyICR0YXJnZXRFbGVtZW50ID0gJGVsZW1lbnQ7XHJcblx0XHRpZiAoISEkdGFyZ2V0RWxlbWVudC5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWw7XHJcblx0XHRcdHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChzY3JvbGxUb09mZnNldEludGVydmFsKTtcclxuXHRcdFx0XHR2YXIgaGVhZGVySGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19oZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0XHRcdHZhciBpbnRyb0hlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9faW50cm8nKS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0XHRcdHZhciBjdXJyZW50Qm9keVNjcm9sbCA9ICQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpWzBdLnNjcm9sbFRvcCB8fCAwO1xyXG5cdFx0XHRcdHZhciB0YXJnZXRFbGVtZW50T2Zmc2V0VG9wID0gJHRhcmdldEVsZW1lbnQub2Zmc2V0KCkudG9wIC0gaGVhZGVySGVpZ2h0IC0gaW50cm9IZWlnaHQgKyBjdXJyZW50Qm9keVNjcm9sbCAtIDIwO1xyXG5cdFx0XHRcdCQoJy5MYXlvdXRQb3B1cF9fYm9keV9fY29udGVudCcpLnNjcm9sbFRvcCh0YXJnZXRFbGVtZW50T2Zmc2V0VG9wKTtcclxuXHRcdFx0fSwgMjUwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cCA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHRcdHJlc2l6ZURpYWxvZyxcclxuXHRcdHJlc2l6ZUNvbnRlbnQsXHJcblx0XHRpbmNyZWFzZUhlaWdodCxcclxuXHRcdHJlZHJhd0RpYWxvZ1dpbmRvdyxcclxuXHRcdHNjcm9sbFRvRWxlbWVudFxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcblxyXG4kKHdpbmRvdykudW5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoISEkKCcuTGF5b3V0UG9wdXAnKS5sZW5ndGgpIHtcclxuXHRcdHdpbmRvdy50b3AuJCgnYm9keScpLmNzcyh7XHJcblx0XHRcdG92ZXJmbG93WTogJ3Njcm9sbCdcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7IiwiLyogQ29tcG9uZW50IEFjdGlvbnNNZW51ICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdHZhciAkdHJpZ2dlckVsZW1lbnQgPSAkKCcjJyArIGNvbmZpZy50cmlnZ2VyRWxlbWVudCk7XHJcblx0XHR2YXIgJGNvbnRlbnRFbGVtZW50ID0gJCgnIycgKyBjb25maWcuY29udGVudEVsZW1lbnQpO1xyXG5cclxuXHRcdGlmICgkY29udGVudEVsZW1lbnQudGV4dCgpLmxlbmd0aCA8IDEpIHtcclxuXHRcdFx0JHRyaWdnZXJFbGVtZW50LmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBpbnNpZGUgYSBkb2N1bWVudCByZWFkeSBkdWUgdG8gc2FwcGhpcmUgcG9wdXAgYmluZGVkIGV2ZW50c1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgcG9zaXRpb24gPSBjb25maWcucG9zaXRpb247XHJcblx0XHRcdFx0aWYgKGNvbmZpZy5sb2NhbGUgPT09ICdBUicpIHtcclxuXHRcdFx0XHRcdHN3aXRjaCAoY29uZmlnLnBvc2l0aW9uKSB7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3JpZ2h0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdsZWZ0JztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAncmlnaHQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICdib3R0b20tbGVmdCc6XHJcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAnYm90dG9tLXJpZ2h0JztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAnYm90dG9tLXJpZ2h0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdib3R0b20tbGVmdCc7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3RvcC1sZWZ0JzpcclxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICd0b3AtcmlnaHQnO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICd0b3AtcmlnaHQnOlxyXG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ3RvcC1sZWZ0JztcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JHRyaWdnZXJFbGVtZW50LnRvb2x0aXBzdGVyKHtcclxuXHRcdFx0XHRcdGNvbnRlbnQ6ICQoJzxzZWN0aW9uLz4nKS5hcHBlbmQoJGNvbnRlbnRFbGVtZW50LmNsb25lKHRydWUpKSxcclxuXHRcdFx0XHRcdHRyaWdnZXI6IGNvbmZpZy50cmlnZ2VyRXZlbnQsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24sXHJcblx0XHRcdFx0XHRtYXhXaWR0aDogY29uZmlnLm1heFdpZHRoLFxyXG5cdFx0XHRcdFx0dGhlbWU6XHJcblx0XHRcdFx0XHRcdCd0b29sdGlwc3Rlci1sb2NhdGlvbi0tJyArXHJcblx0XHRcdFx0XHRcdGNvbmZpZy5sb2NhdGlvbiArXHJcblx0XHRcdFx0XHRcdCcgQWN0aW9uc01lbnUtdG9vbHRpcCBQYWRkaW5nLS0nICtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLnBhZGRpbmcgK1xyXG5cdFx0XHRcdFx0XHQnIEJvcmRlci0tJyArXHJcblx0XHRcdFx0XHRcdGNvbmZpZy5ib3JkZXIsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0JGNvbnRlbnRFbGVtZW50LnJlbW92ZSgpO1xyXG5cdFx0XHR9LCA1MDApO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkFjdGlvbnNNZW51ID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBBY3Rpb25zU3ViTWVudSAtIEBEZXByZWNhdGVkICovXHJcblNhcHBoaXJlV2lkZ2V0cy5BY3Rpb25zU3ViTWVudSA9IGZ1bmN0aW9uKEljb25JZCkge1xyXG5cdGlmICgkKCcuUGF0aWVudEhlYWRlckFjdGlvbnNfX3N1Yk1lbnUnKS5oYXNDbGFzcygnU3ViTWVudUJsb2NrJykpIHtcclxuXHRcdCQoJy5QYXRpZW50SGVhZGVyQWN0aW9uc19fc3ViTWVudScpLnJlbW92ZUNsYXNzKCdTdWJNZW51QmxvY2snKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JChJY29uSWQpXHJcblx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHQuc2libGluZ3MoKVxyXG5cdFx0XHQuZmluZCgnLlBhdGllbnRIZWFkZXJBY3Rpb25zX19zdWJNZW51JylcclxuXHRcdFx0LmFkZENsYXNzKCdTdWJNZW51QmxvY2snKTtcclxuXHR9XHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBDb21wTGluZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRmdW5jdGlvbiBTZWN0aW9uQ29tcGxpbmUoKSB7XHJcblx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gT2JqZWN0IHRvIHNhdmUgc3RhdHNcclxuXHRcdHZhciBwcmV2aWV3c3RhdCA9IFtdO1xyXG5cclxuXHRcdHZhciB0cmFuc2l0aW9uRXZlbnQgPSBTaWxrVUkud2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuXHRcdC8vIHNldCBjbGljayBldmVudHNcclxuXHRcdGZ1bmN0aW9uIGNsaWNrRXZlbnRzKG9iKSB7XHJcblx0XHRcdC8vIHN0b3JlIHF1ZXJ5cyBpbiBhIHNpbmdsZSB2YXJcclxuXHRcdFx0dmFyIGhvbGRlciA9ICQob2IpLmNsb3Nlc3QoJy5Db21wTGluZScpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLmNsb3Nlc3QoJy5Db21wTGluZUV4cGFuZGFibGUnKTtcclxuXHRcdFx0dmFyIFNlY3Rpb25Db250ZW50ID0gU2VjdGlvbi5jaGlsZHJlbignLkNvbXBMaW5lX0V4cGFuZCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IGhvbGRlci5hdHRyKCdpZCcpO1xyXG5cclxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xyXG5cclxuXHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0LCBkdXJpbmcgdGhpcyBwcm9jZXNzLCB0cmFuc2l0aW9ucyBhcmUgZGlzYWJsZWRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cclxuXHRcdFx0XHQvLyBDb2xsYXBzZSBjb250ZW50XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRpZiAoaG9sZGVyLmhhc0NsYXNzKCdub3RSZW5kZXJJbnRlcmFjdGlvbnMnKSkge1xyXG5cdFx0XHRcdFx0aG9sZGVyLmZpbmQoJy5Db21wTGluZS10b2dnbGUtaW50ZXJhY3Rpb25zJykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0dGVtcEhlaWdodCA9IFNlY3Rpb25Db250ZW50LmhlaWdodCgpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQodGVtcEhlaWdodCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gcmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0U2VjdGlvbi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0aWYgKCQoJy5QYWdlJykuaGFzQ2xhc3MoJ2llOCcpIHx8ICQoJy5QYWdlJykuaGFzQ2xhc3MoJ2llOScpKSB7XHJcblx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIGV2ZW50IHRyYW5zaXRpb24gZW5kIHRvIG92ZXJmbG93OnZpc2libGUgZm9yIHRvb2x0aXBzIGFuZCBkcm9wZG93bnMgaXNzdWVzXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQub24odHJhbnNpdGlvbkV2ZW50LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKGhvbGRlci5oYXNDbGFzcygnbm90UmVuZGVySW50ZXJhY3Rpb25zJykpIHtcclxuXHRcdFx0XHRcdGhvbGRlci5maW5kKCcuQ29tcExpbmUtdG9nZ2xlLWludGVyYWN0aW9ucycpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cclxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuQ29tcExpbmVfaGVhZExpbmUnKS5vZmYoKTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoJy5Db21wTGluZV9oZWFkTGluZSBpbnB1dCwgLkNvbXBMaW5lX2hlYWRMaW5lIHNlbGVjdCwgLkNvbXBMaW5lX2hlYWRMaW5lIGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5Db21wTGluZV9fZXhwYW5kSWNvbicpLnVuYmluZCgnY2xpY2snKTtcclxuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcy5wYXJlbnRFbGVtZW50KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9uc1xyXG5cdFx0XHQkKCcuQ29tcExpbmVFeHBhbmRhYmxlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XHRdID09IG51bGxcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XHRdID0ge1xyXG5cdFx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxyXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRjdXJTdGF0ZSAhPVxyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdFx0XVsnc2VydmVyJ11cclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XHRdWydjbGllbnQnXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdFx0XVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdHByZXZpZXdzdGF0W1xyXG5cdFx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcclxuXHRcdFx0XHRcdFx0XVsnY2xpZW50J10gPT0gZmFsc2UgJiZcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKVxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5Db21wTGluZV9FeHBhbmQnKVxyXG5cdFx0XHRcdFx0XHRcdC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxyXG5cdFx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcclxuXHRcdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXHJcblx0XHRcdFx0XHRcdF1bJ2NsaWVudCddID09IHRydWUgJiZcclxuXHRcdFx0XHRcdFx0ISQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJylcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIHNldCBldmVudHNcclxuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9ucyB0byBjcmVhdGUgYXJyYXkgc3RhdFxyXG5cdFx0XHQkKCcuQ29tcExpbmVFeHBhbmRhYmxlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0cHJldmlld3N0YXRbXHJcblx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxyXG5cdFx0XHRcdFx0XHQuYXR0cignaWQnKVxyXG5cdFx0XHRcdF0gPSB7XHJcblx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRzZXJ2ZXI6IHN0YXQsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5Db21wTGluZV9fZXhwYW5kSWNvbicpLnVuYmluZCgnY2xpY2snKTtcclxuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcy5wYXJlbnRFbGVtZW50KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKCcuQ29tcExpbmVfaGVhZExpbmUgaW5wdXQsIC5Db21wTGluZV9oZWFkTGluZSBzZWxlY3QsIC5Db21wTGluZV9oZWFkTGluZSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyByZW1vdmUgdW5lY2Vzc2FyeSBiZWhhdmlvcnNcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkNvbXBsaW5lKCk7XHJcblx0XHRTaWxrVUkuRXhlY3V0ZShTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUuaW5pdCwgJ0Vycm9yIG9uIFNhcHBoaXJldjJfUGF0dGVycy9Db21wTGluZScpO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Db21wTGluZSA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICBjbGFzcyBEYXRhVGFibGVzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgIHRoaXMuJHdpZGdldCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuICAgICAgdGhpcy4kdGFibGUgPSB0aGlzLiR3aWRnZXQuZmluZCgndGFibGUnKTtcclxuICAgICAgdGhpcy4kdGFibGUuYWRkQ2xhc3MoY29uZmlnLmJhc2VTdHlsZSk7XHJcbiAgICAgIHRoaXMub25Jbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0KCkge1xyXG5cclxuICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgIC4uLnRoaXMuY29uZmlnLFxyXG4gICAgICAgIGZpeGVkQ29sdW1uczogdHJ1ZSxcclxuICAgICAgICBpbmZvOiBmYWxzZSxcclxuICAgICAgICBvcmRlcmluZzogZmFsc2UsXHJcbiAgICAgICAgcGFnaW5nOiBmYWxzZSxcclxuICAgICAgICBzY3JvbGxDb2xsYXBzZTogdHJ1ZSxcclxuICAgICAgICBzY3JvbGxYOiB0cnVlLFxyXG4gICAgICAgIHNlYXJjaGluZzogZmFsc2UsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJHRhYmxlLkRhdGFUYWJsZSh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBjb25zdCBjcmVhdGUgPSBjb25maWcgPT4gKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IERhdGFUYWJsZXMoY29uZmlnKSk7XHJcblxyXG4gIFNhcHBoaXJlV2lkZ2V0cy5EYXRhVGFibGVzID0ge1xyXG4gICAgY3JlYXRlXHJcbiAgfTtcclxuXHJcbn0pKCk7IiwiLyogQ29tcG9uZW50IERhdGVUaW1lUmFuZ2VQaWNrZXIgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgYWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMgPSBbXTtcclxuXHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzW2ldLmNvbmZpZy53aWRnZXRJZCA9PT0gY29uZmlnLndpZGdldElkKSB7XHJcblx0XHRcdFx0YWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMuc3BsaWNlKGksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBEYXRlVGltZVJhbmdlUGlja2VyKGNvbmZpZyk7XHJcblx0XHRhbGxEYXRlVGltZVJhbmdlUGlja2Vycy5wdXNoKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgRGF0ZVRpbWVSYW5nZVBpY2tlciA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy5jdXJyZW50TG9jYWxlID0gY29uZmlnLmN1cnJlbnRMb2NhbGU7XHJcblxyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xyXG5cdFx0dGhpcy4kd2lkZ2V0LmFkZENsYXNzKCdEYXRlVGltZVJhbmdlUGlja2VyJyk7XHJcblx0XHR0aGlzLiRjbGVhciA9IHRoaXMuJHdpZGdldC5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jbGVhcicpO1xyXG5cdFx0dGhpcy4kbGFiZWwgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItbGFiZWwnKTtcclxuXHJcblx0XHR0aGlzLmlzRW1wdHlIb3VyID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmFkZENsYXNzKCdhdHRhY2hlZElucHV0Jyk7XHJcblx0XHRcdHRoaXMuJGlucHV0ID0gdGhpcy4kd2lkZ2V0LmZpbmQoXHJcblx0XHRcdFx0Jy5EYXRlVGltZVJhbmdlUGlja2VyLXBsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJ1xyXG5cdFx0XHQpO1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQgPSB0aGlzLiR3aWRnZXQuZmluZChcclxuXHRcdFx0XHQnLkRhdGVUaW1lUmFuZ2VQaWNrZXItZGlzcGxheWVkIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJ1xyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoIXRoaXMuY29uZmlnLmFsbG93c1R5cGluZykge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC5wcm9wKCdyZWFkb25seScsIHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRpbnB1dCA9ICQoJyMnICsgY29uZmlnLmlucHV0SWQpO1xyXG5cdFx0XHRpZiAoIXRoaXMuY29uZmlnLmFsbG93c1R5cGluZykge1xyXG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3JlYWRvbmx5JywgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5jdXJyZW50TG9jYWxlID09PSAnQVInKSB7XHJcblx0XHRcdG1vbWVudC5sb2NhbGUoJ2FyLWt3Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG9wdGlvbnMgPSB7fTtcclxuXHRcdG9wdGlvbnMuc3RhcnREYXRlID0gY29uZmlnLnN0YXJ0RGF0ZTtcclxuXHRcdG9wdGlvbnMuc2luZ2xlRGF0ZVBpY2tlciA9IGNvbmZpZy5zaW5nbGVEYXRlUGlja2VyO1xyXG5cdFx0b3B0aW9ucy5hdXRvQXBwbHkgPSBjb25maWcuYXV0b0FwcGx5O1xyXG5cdFx0b3B0aW9ucy5hdXRvVXBkYXRlSW5wdXQgPSBjb25maWcuYXV0b1VwZGF0ZUlucHV0O1xyXG5cdFx0b3B0aW9ucy50aW1lUGlja2VyID0gY29uZmlnLnRpbWVQaWNrZXI7XHJcblx0XHRvcHRpb25zLnRpbWVQaWNrZXIyNEhvdXIgPSBjb25maWcudGltZVBpY2tlcjI0SG91cjtcclxuXHRcdG9wdGlvbnMudGltZVBpY2tlckluY3JlbWVudCA9IGNvbmZpZy50aW1lUGlja2VySW5jcmVtZW50O1xyXG5cdFx0b3B0aW9ucy5zaG93RHJvcGRvd25zID0gY29uZmlnLmhhc0Ryb3Bkb3ducztcclxuXHRcdG9wdGlvbnMuZHJvcHMgPSBjb25maWcuZHJvcHM7XHJcblx0XHRvcHRpb25zLm9wZW5zID0gY29uZmlnLm9wZW5zO1xyXG5cclxuXHRcdHZhciBzdHJpbmdDb25uZWN0aW9uID0gJ1ssIGF0XSc7XHJcblxyXG5cdFx0aWYgKGNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVkgSEg6TU0nKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZIEhIOk1NJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG9wdGlvbnMudGltZVBpY2tlcjI0SG91cikge1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdElucHV0ID0gJ0RELU1NLVlZWVkgSEg6bW0nO1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzWWVhcldoZW5UZXh0ID9cclxuXHRcdFx0XHRcdCdEIE1NTSBZWVlZJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIEhIOm1tJyA6XHJcblx0XHRcdFx0XHQnRCBNTU0nICsgc3RyaW5nQ29ubmVjdGlvbiArICcgSEg6bW0nO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdElucHV0ID0gJ0RELU1NLVlZWVkgaGg6bW0gQSc7XHJcblx0XHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNZZWFyV2hlblRleHQgP1xyXG5cdFx0XHRcdFx0J0QgTU1NIFlZWVknICsgc3RyaW5nQ29ubmVjdGlvbiArICcgaGg6bW0gQScgOlxyXG5cdFx0XHRcdFx0J0QgTU1NJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIGhoOm1tIEEnO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ29ubHlEYXRlJyk7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnByb3AoJ3BsYWNlaG9sZGVyJywgJ0RELU1NLVlZWVknKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jb25maWcuZm9ybWF0SW5wdXQgPSAnREQtTU0tWVlZWSc7XHJcblx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzWWVhcldoZW5UZXh0ID9cclxuXHRcdFx0XHQnRCBNTU0gWVlZWScgOlxyXG5cdFx0XHRcdCdEIE1NTSc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWwgPSB0aGlzLmNvbmZpZy5oYXNXZWVrRGF5TmFtZVdoZW5UZXh0ID9cclxuXHRcdFx0J2RkZFssIF0nICsgdGhpcy5jb25maWcuZm9ybWF0TGFiZWwgOlxyXG5cdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbDtcclxuXHJcblx0XHRvcHRpb25zLmxvY2FsZSA9IHtcclxuXHRcdFx0ZGlyZWN0aW9uOiBjb25maWcuY3VycmVudExvY2FsZSA9PT0gJ0FSJyA/ICdydGwnIDogJ2x0cicsXHJcblx0XHRcdGZvcm1hdDogdGhpcy5jb25maWcuZm9ybWF0SW5wdXQsXHJcblx0XHRcdGNhbmNlbExhYmVsOiAnQ2FuY2VsJyxcclxuXHRcdFx0YXBwbHlMYWJlbDogJ0FwcGx5JyxcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5oYXNUZXh0VHJpZ2dlcikge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuYWRkQ2xhc3MoJ3RleHRUcmlnZ2VyJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5lbmREYXRlICYmIGNvbmZpZy5lbmREYXRlICE9PSAnMDEtMDEtMTkwMCAwMDowMDowMCcpIHtcclxuXHRcdFx0b3B0aW9ucy5lbmREYXRlID0gY29uZmlnLmVuZERhdGU7XHJcblx0XHR9XHJcblx0XHRpZiAoY29uZmlnLm1heERhdGUgJiYgY29uZmlnLm1heERhdGUgIT09ICcwMS0wMS0xOTAwIDAwOjAwOjAwJykge1xyXG5cdFx0XHRvcHRpb25zLm1heERhdGUgPSBjb25maWcubWF4RGF0ZTtcclxuXHRcdH1cclxuXHRcdGlmIChjb25maWcubWluRGF0ZSAmJiBjb25maWcubWluRGF0ZSAhPT0gJzAxLTAxLTE5MDAgMDA6MDA6MDAnKSB7XHJcblx0XHRcdG9wdGlvbnMubWluRGF0ZSA9IGNvbmZpZy5taW5EYXRlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuRGlzYWJsZWRXZWVrRGF5cykge1xyXG5cdFx0XHR2YXIgZGlzYWJsZWRXZWVrRGF5cyA9IGNvbmZpZy5EaXNhYmxlZFdlZWtEYXlzLnNwbGl0KCcsJyk7XHJcblx0XHRcdG9wdGlvbnMuaXNJbnZhbGlkRGF0ZSA9IGZ1bmN0aW9uIChkYXRlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRpc2FibGVkV2Vla0RheXMuaW5jbHVkZXMoXHJcblx0XHRcdFx0XHRtb21lbnQoZGF0ZSlcclxuXHRcdFx0XHRcdC5kYXkoKVxyXG5cdFx0XHRcdFx0LnRvU3RyaW5nKClcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuJGlucHV0LmRhdGVyYW5nZXBpY2tlcihvcHRpb25zLCBmdW5jdGlvbiAoc3RhcnREYXRlLCBlbmREYXRlLCBsYWJlbCkge1xyXG5cdFx0XHQvLyBhZnRlciBhIHNlbGVjdGlvbiBpcyBtYWRlXHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBub3cgd2UgaGF2ZSBhIHByb3BlciBpbnN0YW5jZVxyXG5cdFx0dGhpcy5waWNrZXIgPSB0aGlzLiRpbnB1dC5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInKTtcclxuXHJcblx0XHR0aGlzLiRjYWxlbmRhciA9ICQodGhpcy5waWNrZXIuY29udGFpbmVyKTtcclxuXHJcblx0XHRpZiAoISF0aGlzLmNvbmZpZy5jc3NDbGFzcykge1xyXG5cdFx0XHR0aGlzLiRjYWxlbmRhci5hZGRDbGFzcyh0aGlzLmNvbmZpZy5jc3NDbGFzcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy4kdGltZUhvbGRlciA9IHRoaXMuJGNhbGVuZGFyLmZpbmQoJy5jYWxlbmRhci10aW1lJyk7XHJcblx0XHR0aGlzLiRidXR0b25zSG9sZGVyID0gdGhpcy4kY2FsZW5kYXIuZmluZCgnLmRycC1idXR0b25zJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmF1dG9BcHBseSkge1xyXG5cdFx0XHR0aGlzLiRidXR0b25zSG9sZGVyLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29uZmlnLmlzRW1wdHlTdGFydERhdGUpIHtcclxuXHRcdFx0dGhpcy5jbGVhcihmYWxzZSk7XHJcblx0XHR9IGVsc2UgaWYgKGNvbmZpZy5pc0VtcHR5U3RhcnRIb3VyKSB7XHJcblx0XHRcdHRoaXMuaXNFbXB0eUhvdXIgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5lbmFibGVkKSB7XHJcblx0XHRcdHRoaXMubmF0aXZlRXZlbnRzKCk7XHJcblx0XHRcdHRoaXMuY3VzdG9tRXZlbnRzKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLiRjbGVhci5oaWRlKCk7XHJcblx0XHRcdHRoaXMuJGlucHV0Lm9mZignY2xpY2sgZm9jdXMga2V5ZG93biBrZXl1cCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdHRoaXMuaGFuZGxlQ3VzdG9tVmFsaWRhdGlvbigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmhhbmRsZUN1c3RvbVZhbGlkYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZXJyb3JNZXNzYWdlID0gdGhpcy4kaW5wdXQubmV4dCgpLnRleHQoKTtcclxuXHRcdGlmICghIWVycm9yTWVzc2FnZS5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLmFkZENsYXNzKCdOb3RfVmFsaWQnKTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkXHJcblx0XHRcdFx0Lm5leHQoKVxyXG5cdFx0XHRcdC5zaG93KClcclxuXHRcdFx0XHQudGV4dChlcnJvck1lc3NhZ2UpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLnJlbW92ZUNsYXNzKCdOb3RfVmFsaWQnKTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLm5leHQoKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUubmF0aXZlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdzaG93Q2FsZW5kYXIuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5oYXNHb1RvZGF5KSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQuZmluZCgnLmNhbGVuZGFyLXRhYmxlIHRoZWFkIHRyJylcclxuXHRcdFx0XHRcdC5lcSgwKVxyXG5cdFx0XHRcdFx0LmFmdGVyKFxyXG5cdFx0XHRcdFx0XHQnPHRyPjx0ZCBjb2xzcGFuPVwiN1wiIGNsYXNzPVwiRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1nb3RvZGF5XCI+JyArXHJcblx0XHRcdFx0XHRcdCdUb2RheScgK1xyXG5cdFx0XHRcdFx0XHQnPC90ZD48L3RyPidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0aWYgKF90aGlzLmNvbmZpZy5kcm9wcyA9PT0gJ3VwJykge1xyXG5cdFx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmNzcygndG9wJywgX3RoaXMuJGNhbGVuZGFyLm9mZnNldCgpLnRvcCAtIDI0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuaGFuZGxlVmlld3BvcnRQb3NpdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignc2hvdy5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLnRpbWVQaWNrZXIgJiYgX3RoaXMuY29uZmlnLmhhc0NsZWFySG91cikge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdFx0LmZpbmQoJy5jYWxlbmRhci10aW1lJylcclxuXHRcdFx0XHRcdC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhclwiPjwvc3Bhbj4nKTtcclxuXHRcdFx0XHRpZiAoX3RoaXMuaXNFbXB0eUhvdXIpIHtcclxuXHRcdFx0XHRcdF90aGlzLiR0aW1lSG9sZGVyLmNzcygnb3BhY2l0eScsIDAuNSk7XHJcblx0XHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJylcclxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5oYW5kbGVWaWV3cG9ydFBvc2l0aW9uKCk7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5EYXRlVGltZVJhbmdlUGlja2VyLm9wZW5lZFdpZGdldElkID0gX3RoaXMuY29uZmlnLndpZGdldElkO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignaGlkZS5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInKS5yZW1vdmUoKTtcclxuXHRcdFx0X3RoaXMudXBkYXRlUGFyZW50SWZyYW1lKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdjYW5jZWwuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHt9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdvdXRzaWRlQ2xpY2suZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHt9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCd0aW1lY2hhbmdlZC5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRfdGhpcy5pc0VtcHR5SG91ciA9IGZhbHNlO1xyXG5cdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5oYXNDbGVhckhvdXIpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdC5maW5kKCcuY2FsZW5kYXItdGltZScpXHJcblx0XHRcdFx0XHQuYXBwZW5kKCc8c3BhbiBjbGFzcz1cIkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXJcIj48L3NwYW4+Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5hdXRvQXBwbHkpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2xlYXIucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5zZW5kTm90aWZpY2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2NsaWNrRGF0ZS5kYXRlcmFuZ2VwaWNrZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBpY2tlcikge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmF1dG9BcHBseSkge1xyXG5cdFx0XHRcdF90aGlzLiRjbGVhci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0XHRcdF90aGlzLnNlbmROb3RpZmljYXRpb24oKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0X3RoaXMuJGNsZWFyLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRfdGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0XHRfdGhpcy5zZW5kTm90aWZpY2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5jdXN0b21FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kbGFiZWwub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRfdGhpcy5waWNrZXIudG9nZ2xlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGNsZWFyLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdFx0X3RoaXMucGlja2VyLmhpZGUoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIub24oJ2NsaWNrJywgJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLmhvdXJzZWxlY3QnKS52YWwoJzAnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLmhvdXJzZWxlY3QnKS52YWwoJzEyJykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5taW51dGVzZWxlY3QnKS52YWwoJzAnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5hbXBtc2VsZWN0JykudmFsKCdBTScpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRfdGhpcy5pc0VtcHR5SG91ciA9IHRydWU7XHJcblx0XHRcdF90aGlzLiR0aW1lSG9sZGVyLmNzcygnb3BhY2l0eScsIDAuNSk7XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRjYWxlbmRhci5vbignY2xpY2snLCAnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItZ290b2RheScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0X3RoaXMucGlja2VyLnNldFN0YXJ0RGF0ZShtb21lbnQoKSk7XHJcblx0XHRcdF90aGlzLnBpY2tlci5zZXRFbmREYXRlKG1vbWVudCgpKTtcclxuXHRcdFx0X3RoaXMucGlja2VyLmhpZGUoKTtcclxuXHRcdFx0aWYgKCFfdGhpcy5jb25maWcuYXV0b1VwZGF0ZUlucHV0IHx8IF90aGlzLmNvbmZpZy5oYXNUZXh0VHJpZ2dlciB8fCBfdGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHR0aGlzLiRkaXNwbGF5ZWQub24oJ2NsaWNrIGZvY3VzJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdF90aGlzLiRpbnB1dC50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRfdGhpcy4kaW5wdXQudmFsKF90aGlzLiRkaXNwbGF5ZWQudmFsKCkpLnRyaWdnZXIoJ2tleXVwJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kaW5wdXQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdF90aGlzLnVwZGF0ZVBhcmVudElmcmFtZSgpO1xyXG5cdFx0XHRcdH0sIDUwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUudXBkYXRlTGFiZWxpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbGFiZWxNYXNrID0gdGhpcy5jb25maWcuZm9ybWF0TGFiZWw7XHJcblx0XHR2YXIgaW5wdXRNYXNrID0gdGhpcy5jb25maWcuZm9ybWF0SW5wdXQ7XHJcblx0XHRpZiAobW9tZW50KHRoaXMucGlja2VyLnN0YXJ0RGF0ZSkuaXNTYW1lKG1vbWVudCgpLCAnZGF5JykpIHtcclxuXHRcdFx0aWYgKGxhYmVsTWFzay5pbmNsdWRlcygnRCBNTU0gWVlZWScpKSB7XHJcblx0XHRcdFx0bGFiZWxNYXNrID0gbGFiZWxNYXNrLnJlcGxhY2UoJ0QgTU1NIFlZWVknLCAnW1RvZGF5XScpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGxhYmVsTWFzay5pbmNsdWRlcygnRCBNTU0nKSkge1xyXG5cdFx0XHRcdGxhYmVsTWFzayA9IGxhYmVsTWFzay5yZXBsYWNlKCdEIE1NTScsICdbVG9kYXldJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1NvbWV0aGluZyB3cm9uZyB3aXRoIHRoZSBsYWJlbE1hc2snLCBsYWJlbE1hc2spO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5pc0VtcHR5SG91cikge1xyXG5cdFx0XHRsYWJlbE1hc2sgPSBsYWJlbE1hc2tcclxuXHRcdFx0XHQucmVwbGFjZSgnaGg6bW0gQScsICdbLS06LS1dJylcclxuXHRcdFx0XHQucmVwbGFjZSgnSEg6bW0nLCAnWy0tOi0tXScpO1xyXG5cdFx0XHRpbnB1dE1hc2sgPSBpbnB1dE1hc2tcclxuXHRcdFx0XHQucmVwbGFjZSgnaGg6bW0gQScsICdbLS06LS1dJylcclxuXHRcdFx0XHQucmVwbGFjZSgnSEg6bW0nLCAnWy0tOi0tXScpO1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0XHR0aGlzLiRsYWJlbC5odG1sKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQobGFiZWxNYXNrKSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbChcclxuXHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBbMDA6MDA6MDBdJylcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZJykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBbMDA6MDA6MDBdJykpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoaW5wdXRNYXNrKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0XHR0aGlzLiRsYWJlbC5odG1sKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQobGFiZWxNYXNrKSk7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJykpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHRcdHRoaXMuJGRpc3BsYXllZC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCkpO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgSEg6bW06c3MnKSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcuZm9ybWF0SW5wdXQpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oYW5kbGVWaWV3cG9ydFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHdpbmRvdy5mcmFtZUVsZW1lbnQgJiYgKCQod2luZG93LmZyYW1lRWxlbWVudC5wYXJlbnRFbGVtZW50KS5oYXNDbGFzcygndG9vbHRpcHN0ZXItY29udGVudCcpIHx8ICQod2luZG93LmZyYW1lRWxlbWVudC5wYXJlbnRFbGVtZW50KS5oYXNDbGFzcygnb3MtaW50ZXJuYWwtdWktZGlhbG9nLWNvbnRlbnQnKSkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5pc0luVmlld3BvcnQoKSkge1xyXG5cdFx0XHR2YXIgY29vcmRzID0gdGhpcy4kY2FsZW5kYXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdGlmICh0aGlzLiRjYWxlbmRhci5oYXNDbGFzcygnZHJvcC11cCcpICYmIHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IDApIHtcclxuXHRcdFx0XHR2YXIgcG9pbnQgPSB3aW5kb3cuc2Nyb2xsWSArIGNvb3Jkcy5ib3R0b20gKyB0aGlzLiRpbnB1dC5oZWlnaHQoKSArIDc7XHJcblx0XHRcdFx0dGhpcy4kY2FsZW5kYXIucmVtb3ZlQ2xhc3MoJ2Ryb3AtdXAnKS5hZGRDbGFzcygnZHJvcC1kb3duJykuY3NzKCd0b3AnLCBwb2ludCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoIXRoaXMuJGNhbGVuZGFyLmhhc0NsYXNzKCdkcm9wLXVwJykgJiYgdGhpcy4kY2FsZW5kYXJbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSkge1xyXG5cdFx0XHRcdHZhciBwb2ludCA9IHdpbmRvdy5zY3JvbGxZICsgY29vcmRzLnRvcCAtIGNvb3Jkcy5oZWlnaHQgLSB0aGlzLiRpbnB1dC5oZWlnaHQoKSAtIDc7XHJcblx0XHRcdFx0dGhpcy4kY2FsZW5kYXIuYWRkQ2xhc3MoJ2Ryb3AtdXAnKS5jc3MoJ3RvcCcsIHBvaW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmlzSW5WaWV3cG9ydCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBib3VuZGluZyA9IHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0cmV0dXJuIChib3VuZGluZy50b3AgPj0gMCAmJiBib3VuZGluZy5ib3R0b20gPD0gKHdpbmRvdy5pbm5lckhlaWdodCArIDUgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCArIDUpKTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChzZW5kTm90aWZpY2F0aW9uKSB7XHJcblx0XHR0aGlzLnBpY2tlci5zZXRTdGFydERhdGUobW9tZW50KCkpO1xyXG5cdFx0dGhpcy5waWNrZXIuc2V0RW5kRGF0ZShtb21lbnQoKSk7XHJcblx0XHR0aGlzLmlzRW1wdHlIb3VyID0gZmFsc2U7XHJcblx0XHR0aGlzLiRjbGVhci5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5oYXNUZXh0VHJpZ2dlcikge1xyXG5cdFx0XHR0aGlzLiRsYWJlbC5odG1sKCctLSAtLSAtLScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kaW5wdXQudmFsKCcnKTtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQudmFsKCcnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHNlbmROb3RpZmljYXRpb24gfHwgc2VuZE5vdGlmaWNhdGlvbiA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5zZW5kTm90aWZpY2F0aW9uKGZhbHNlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5waWNrZXIuc2hvdygpO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5waWNrZXIuY2xpY2tDYW5jZWwoKTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5zZW5kTm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKHNlbmREYXRlKSB7XHJcblx0XHRpZiAodGhpcy4kd2lkZ2V0Lmhhc0NsYXNzKCdhdHRhY2hlZElucHV0JykpIHtcclxuXHRcdFx0dGhpcy4kaW5wdXQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmIChzZW5kRGF0ZSB8fCBzZW5kRGF0ZSA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNFbXB0eUhvdXIpIHtcclxuXHRcdFx0XHRPc05vdGlmeVdpZGdldChcclxuXHRcdFx0XHRcdHRoaXMuY29uZmlnLmRhdGVUaW1lUmFuZ2VQaWNrZXJGYWtlTm90aWZ5SWQsXHJcblx0XHRcdFx0XHR0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIFswMDowMDowMF0nKSArXHJcblx0XHRcdFx0XHQnfCcgK1xyXG5cdFx0XHRcdFx0dGhpcy5pc0VtcHR5SG91clxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVQaWNrZXIpIHtcclxuXHRcdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KFxyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0XHR0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJykgK1xyXG5cdFx0XHRcdFx0XHQnfCcgK1xyXG5cdFx0XHRcdFx0XHR0aGlzLmlzRW1wdHlIb3VyXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRPc05vdGlmeVdpZGdldChcclxuXHRcdFx0XHRcdFx0dGhpcy5jb25maWcuZGF0ZVRpbWVSYW5nZVBpY2tlckZha2VOb3RpZnlJZCxcclxuXHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpICsgJ3wnICsgdGhpcy5pc0VtcHR5SG91clxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdE9zTm90aWZ5V2lkZ2V0KHRoaXMuY29uZmlnLmRhdGVUaW1lUmFuZ2VQaWNrZXJGYWtlTm90aWZ5SWQsICdudWxsfHRydWUnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS51cGRhdGVQYXJlbnRJZnJhbWUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodHlwZW9mIFNhcHBoaXJlV2lkZ2V0cy5SZXNpemVQYXJlbnRJZnJhbWUgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5SZXNpemVQYXJlbnRJZnJhbWUucmVzaXplKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoJCgnLlBhZ2UuTGF5b3V0UG9wdXAnKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLnJlZHJhd0RpYWxvZ1dpbmRvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkRhdGVUaW1lUmFuZ2VQaWNrZXIgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGFsbDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnM7XHJcblx0XHR9LFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgRHJvcGRvd25DYXRlZ29yaWVzICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGZ1bmN0aW9uIG9wdEdyb3VwU2V0VmFsdWUoc2VsZWN0SWQsIGlucHV0Qm94SWQsIGJ1dHRvbklkKSB7XHJcblx0XHR2YXIgdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdElkKS52YWx1ZTtcclxuXHRcdCQoJyMnICsgaW5wdXRCb3hJZCkudmFsKHYpO1xyXG5cdFx0JCgnIycgKyBzZWxlY3RJZCArICcgb3B0aW9uW3NlbGVjdGVkXScpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XHJcblxyXG5cdFx0aWYgKHYgPiAtMSkge1xyXG5cdFx0XHQkKCcjJyArIHNlbGVjdElkICsgJyBvcHRpb25bdmFsdWU9XCInICsgdiArICdcIl0nKS5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQoJyMnICsgYnV0dG9uSWQpLmNsaWNrKCk7XHJcblx0XHQkKCcjczJpZF8nICsgc2VsZWN0SWQpLnJlbW92ZUNsYXNzKCdzZWxlY3QyLWNvbnRhaW5lci1hY3RpdmUnKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIE9zQ3VzdG9tVmFsaWRhdG9yT3B0R3JvdXAoYSwgYikge1xyXG5cdFx0dmFyIF9lID0gJCgnIycgKyBhLmNvbnRyb2x0b3ZhbGlkYXRlKTtcclxuXHRcdHZhciBpc1ZhbGlkID0gX2UuZmluZCgnb3B0aW9uW3NlbGVjdGVkXScpLmxlbmd0aDtcclxuXHRcdHZhciBoYXNTaWJsaW5nX01hbmRhdG9yeVNlbGVjdDIgPSBfZS5wcmV2KCdkaXYuc2VsZWN0Mi1jb250YWluZXIuTWFuZGF0b3J5JykubGVuZ3RoO1xyXG5cclxuXHRcdGlmIChoYXNTaWJsaW5nX01hbmRhdG9yeVNlbGVjdDIpIHtcclxuXHRcdFx0aWYgKGlzVmFsaWQpIHtcclxuXHRcdFx0XHRfZS5wcmV2KCdkaXYuc2VsZWN0Mi1jb250YWluZXIuTWFuZGF0b3J5JykucmVtb3ZlQ2xhc3MoJ05vdF9WYWxpZCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF9lLnByZXYoJ2Rpdi5zZWxlY3QyLWNvbnRhaW5lci5NYW5kYXRvcnknKS5hZGRDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaXNWYWxpZDtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFkZE9wdEdyb3VwVmFsaWRhdG9yKG9wdEdyb3VwRWxlbWVudElkKSB7XHJcblx0XHRPc1BhZ2VfVmFsaWRhdG9ycy5wdXNoKHtcclxuXHRcdFx0Y29udHJvbHRvdmFsaWRhdGU6IG9wdEdyb3VwRWxlbWVudElkLFxyXG5cdFx0XHRlbmFibGVkOiB0cnVlLFxyXG5cdFx0XHRlcnJvcm1lc3NhZ2U6ICdSZXF1aXJlZCBmaWVsZCEnLFxyXG5cdFx0XHRldmFsdWF0aW9uZnVuY3Rpb246ICdTYXBwaGlyZVdpZGdldHMuRHJvcGRvd25DYXRlZ29yaWVzLk9zQ3VzdG9tVmFsaWRhdG9yT3B0R3JvdXAnLFxyXG5cdFx0XHRpbml0aWFsdmFsdWU6ICcnLFxyXG5cdFx0XHRpc3ZhbGlkOiB0cnVlLFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRHJvcGRvd25DYXRlZ29yaWVzID0ge1xyXG5cdFx0b3B0R3JvdXBTZXRWYWx1ZSxcclxuXHRcdE9zQ3VzdG9tVmFsaWRhdG9yT3B0R3JvdXAsXHJcblx0XHRhZGRPcHRHcm91cFZhbGlkYXRvcixcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IERyb3B6b25lIChQbHVnaW4pICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24oKSB7XHJcblx0ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XHJcblx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcclxuXHRcdFx0ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xyXG5cdFx0XHRpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gZnVuY3Rpb24oQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XHJcblx0XHRpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xyXG5cdFx0aWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XHJcblx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcclxuXHRpZiAoIXNlbGYpIHtcclxuXHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcclxuXHR9XHJcblx0cmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgY2FsbCA9PT0gJ2Z1bmN0aW9uJykgPyBjYWxsIDogc2VsZjtcclxufVxyXG5cclxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XHJcblx0aWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcclxuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTtcclxuXHR9XHJcblx0c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XHJcblx0XHRjb25zdHJ1Y3Rvcjoge1xyXG5cdFx0XHR2YWx1ZTogc3ViQ2xhc3MsXHJcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxyXG5cdFx0XHR3cml0YWJsZTogdHJ1ZSxcclxuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG5cdFx0fSxcclxuXHR9KTtcclxuXHRpZiAoc3VwZXJDbGFzcylcclxuXHRcdE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiAoc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcclxuXHRpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xyXG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7XHJcblx0fVxyXG59XHJcblxyXG4vKlxyXG4gKlxyXG4gKiBNb3JlIGluZm8gYXQgW3d3dy5kcm9wem9uZWpzLmNvbV0oaHR0cDovL3d3dy5kcm9wem9uZWpzLmNvbSlcclxuICpcclxuICogQ29weXJpZ2h0IChjKSAyMDEyLCBNYXRpYXMgTWVub1xyXG4gKlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqXHJcbiAqL1xyXG5cclxuLy8gVGhlIEVtaXR0ZXIgY2xhc3MgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gY2FsbCBgLm9uKClgIG9uIERyb3B6b25lIHRvIGxpc3RlblxyXG4vLyB0byBldmVudHMuXHJcbi8vIEl0IGlzIHN0cm9uZ2x5IGJhc2VkIG9uIGNvbXBvbmVudCdzIGVtaXR0ZXIgY2xhc3MsIGFuZCBJIHJlbW92ZWQgdGhlXHJcbi8vIGZ1bmN0aW9uYWxpdHkgYmVjYXVzZSBvZiB0aGUgZGVwZW5kZW5jeSBoZWxsIHdpdGggZGlmZmVyZW50IGZyYW1ld29ya3MuXHJcbnZhciBFbWl0dGVyID0gKGZ1bmN0aW9uKCkge1xyXG5cdGZ1bmN0aW9uIEVtaXR0ZXIoKSB7XHJcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW1pdHRlcik7XHJcblx0fVxyXG5cclxuXHRfY3JlYXRlQ2xhc3MoRW1pdHRlciwgW1xyXG5cdFx0e1xyXG5cdFx0XHRrZXk6ICdvbicsXHJcblxyXG5cdFx0XHQvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50XHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBvbihldmVudCwgZm4pIHtcclxuXHRcdFx0XHR0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblx0XHRcdFx0Ly8gQ3JlYXRlIG5hbWVzcGFjZSBmb3IgdGhpcyBldmVudFxyXG5cdFx0XHRcdGlmICghdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IFtdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLl9jYWxsYmFja3NbZXZlbnRdLnB1c2goZm4pO1xyXG5cdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAnZW1pdCcsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XHJcblx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cdFx0XHRcdHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG5cclxuXHRcdFx0XHRpZiAoY2FsbGJhY2tzKSB7XHJcblx0XHRcdFx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcclxuXHRcdFx0XHRcdFx0YXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvciA9IGNhbGxiYWNrcyxcclxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheSA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0X2kgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3JlZjtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZiA9IF9pLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgY2FsbGJhY2sgPSBfcmVmO1xyXG5cclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lciBmb3IgZ2l2ZW4gZXZlbnQuIElmIGZuIGlzIG5vdCBwcm92aWRlZCwgYWxsIGV2ZW50XHJcblx0XHRcdC8vIGxpc3RlbmVycyBmb3IgdGhhdCBldmVudCB3aWxsIGJlIHJlbW92ZWQuIElmIG5laXRoZXIgaXMgcHJvdmlkZWQsIGFsbFxyXG5cdFx0XHQvLyBldmVudCBsaXN0ZW5lcnMgd2lsbCBiZSByZW1vdmVkLlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAnb2ZmJyxcclxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG9mZihldmVudCwgZm4pIHtcclxuXHRcdFx0XHRpZiAoIXRoaXMuX2NhbGxiYWNrcyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gc3BlY2lmaWMgZXZlbnRcclxuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuXHRcdFx0XHRpZiAoIWNhbGxiYWNrcykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcblx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV07XHJcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT09IGZuKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdF0pO1xyXG5cclxuXHRyZXR1cm4gRW1pdHRlcjtcclxufSkoKTtcclxuXHJcbnZhciBEcm9wem9uZSA9IChmdW5jdGlvbihfRW1pdHRlcikge1xyXG5cdF9pbmhlcml0cyhEcm9wem9uZSwgX0VtaXR0ZXIpO1xyXG5cclxuXHRfY3JlYXRlQ2xhc3MoRHJvcHpvbmUsIG51bGwsIFtcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAnaW5pdENsYXNzJyxcclxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXRDbGFzcygpIHtcclxuXHRcdFx0XHQvLyBFeHBvc2luZyB0aGUgZW1pdHRlciBjbGFzcywgbWFpbmx5IGZvciB0ZXN0c1xyXG5cdFx0XHRcdHRoaXMucHJvdG90eXBlLkVtaXR0ZXIgPSBFbWl0dGVyO1xyXG5cclxuXHRcdFx0XHQvKlxyXG4gICAgICAgVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSBldmVudHMgeW91IGNhbiByZWdpc3RlciBvbiBhIGRyb3B6b25lIG9iamVjdC5cclxuICAgICAgICBZb3UgY2FuIHJlZ2lzdGVyIGFuIGV2ZW50IGhhbmRsZXIgbGlrZSB0aGlzOlxyXG4gICAgICAgIGRyb3B6b25lLm9uKFwiZHJhZ0VudGVyXCIsIGZ1bmN0aW9uKCkgeyB9KTtcclxuICAgICAgICAqL1xyXG5cdFx0XHRcdHRoaXMucHJvdG90eXBlLmV2ZW50cyA9IFtcclxuXHRcdFx0XHRcdCdkcm9wJyxcclxuXHRcdFx0XHRcdCdkcmFnc3RhcnQnLFxyXG5cdFx0XHRcdFx0J2RyYWdlbmQnLFxyXG5cdFx0XHRcdFx0J2RyYWdlbnRlcicsXHJcblx0XHRcdFx0XHQnZHJhZ292ZXInLFxyXG5cdFx0XHRcdFx0J2RyYWdsZWF2ZScsXHJcblx0XHRcdFx0XHQnYWRkZWRmaWxlJyxcclxuXHRcdFx0XHRcdCdhZGRlZGZpbGVzJyxcclxuXHRcdFx0XHRcdCdyZW1vdmVkZmlsZScsXHJcblx0XHRcdFx0XHQndGh1bWJuYWlsJyxcclxuXHRcdFx0XHRcdCdlcnJvcicsXHJcblx0XHRcdFx0XHQnZXJyb3JtdWx0aXBsZScsXHJcblx0XHRcdFx0XHQncHJvY2Vzc2luZycsXHJcblx0XHRcdFx0XHQncHJvY2Vzc2luZ211bHRpcGxlJyxcclxuXHRcdFx0XHRcdCd1cGxvYWRwcm9ncmVzcycsXHJcblx0XHRcdFx0XHQndG90YWx1cGxvYWRwcm9ncmVzcycsXHJcblx0XHRcdFx0XHQnc2VuZGluZycsXHJcblx0XHRcdFx0XHQnc2VuZGluZ211bHRpcGxlJyxcclxuXHRcdFx0XHRcdCdzdWNjZXNzJyxcclxuXHRcdFx0XHRcdCdzdWNjZXNzbXVsdGlwbGUnLFxyXG5cdFx0XHRcdFx0J2NhbmNlbGVkJyxcclxuXHRcdFx0XHRcdCdjYW5jZWxlZG11bHRpcGxlJyxcclxuXHRcdFx0XHRcdCdjb21wbGV0ZScsXHJcblx0XHRcdFx0XHQnY29tcGxldGVtdWx0aXBsZScsXHJcblx0XHRcdFx0XHQncmVzZXQnLFxyXG5cdFx0XHRcdFx0J21heGZpbGVzZXhjZWVkZWQnLFxyXG5cdFx0XHRcdFx0J21heGZpbGVzcmVhY2hlZCcsXHJcblx0XHRcdFx0XHQncXVldWVjb21wbGV0ZScsXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0dGhpcy5wcm90b3R5cGUuZGVmYXVsdE9wdGlvbnMgPSB7XHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEhhcyB0byBiZSBzcGVjaWZpZWQgb24gZWxlbWVudHMgb3RoZXIgdGhhbiBmb3JtIChvciB3aGVuIHRoZSBmb3JtXHJcblx0XHRcdFx0XHQgKiBkb2Vzbid0IGhhdmUgYW4gYGFjdGlvbmAgYXR0cmlidXRlKS4gWW91IGNhbiBhbHNvXHJcblx0XHRcdFx0XHQgKiBwcm92aWRlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBmaWxlc2AgYW5kXHJcblx0XHRcdFx0XHQgKiBtdXN0IHJldHVybiB0aGUgdXJsIChzaW5jZSBgdjMuMTIuMGApXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHVybDogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIENhbiBiZSBjaGFuZ2VkIHRvIGBcInB1dFwiYCBpZiBuZWNlc3NhcnkuIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgZnVuY3Rpb25cclxuXHRcdFx0XHRcdCAqIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBgZmlsZXNgIGFuZCBtdXN0IHJldHVybiB0aGUgbWV0aG9kIChzaW5jZSBgdjMuMTIuMGApLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0JyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFdpbGwgYmUgc2V0IG9uIHRoZSBYSFJlcXVlc3QuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHdpdGhDcmVkZW50aWFsczogZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBUaGUgdGltZW91dCBmb3IgdGhlIFhIUiByZXF1ZXN0cyBpbiBtaWxsaXNlY29uZHMgKHNpbmNlIGB2NC40LjBgKS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0dGltZW91dDogMzAwMDAsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBIb3cgbWFueSBmaWxlIHVwbG9hZHMgdG8gcHJvY2VzcyBpbiBwYXJhbGxlbCAoU2VlIHRoZVxyXG5cdFx0XHRcdFx0ICogRW5xdWV1aW5nIGZpbGUgdXBsb2FkcyogZG9jdW1lbnRhdGlvbiBzZWN0aW9uIGZvciBtb3JlIGluZm8pXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHBhcmFsbGVsVXBsb2FkczogMixcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFdoZXRoZXIgdG8gc2VuZCBtdWx0aXBsZSBmaWxlcyBpbiBvbmUgcmVxdWVzdC4gSWZcclxuXHRcdFx0XHRcdCAqIHRoaXMgaXQgc2V0IHRvIHRydWUsIHRoZW4gdGhlIGZhbGxiYWNrIGZpbGUgaW5wdXQgZWxlbWVudCB3aWxsXHJcblx0XHRcdFx0XHQgKiBoYXZlIHRoZSBgbXVsdGlwbGVgIGF0dHJpYnV0ZSBhcyB3ZWxsLiBUaGlzIG9wdGlvbiB3aWxsXHJcblx0XHRcdFx0XHQgKiBhbHNvIHRyaWdnZXIgYWRkaXRpb25hbCBldmVudHMgKGxpa2UgYHByb2Nlc3NpbmdtdWx0aXBsZWApLiBTZWUgdGhlIGV2ZW50c1xyXG5cdFx0XHRcdFx0ICogZG9jdW1lbnRhdGlvbiBzZWN0aW9uIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHR1cGxvYWRNdWx0aXBsZTogZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBXaGV0aGVyIHlvdSB3YW50IGZpbGVzIHRvIGJlIHVwbG9hZGVkIGluIGNodW5rcyB0byB5b3VyIHNlcnZlci4gVGhpcyBjYW4ndCBiZVxyXG5cdFx0XHRcdFx0ICogdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGB1cGxvYWRNdWx0aXBsZWAuXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogU2VlIFtjaHVua3NVcGxvYWRlZF0oI2NvbmZpZy1jaHVua3NVcGxvYWRlZCkgZm9yIHRoZSBjYWxsYmFjayB0byBmaW5hbGlzZSBhbiB1cGxvYWQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGNodW5raW5nOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGBjaHVua2luZ2AgaXMgZW5hYmxlZCwgdGhpcyBkZWZpbmVzIHdoZXRoZXIgKipldmVyeSoqIGZpbGUgc2hvdWxkIGJlIGNodW5rZWQsXHJcblx0XHRcdFx0XHQgKiBldmVuIGlmIHRoZSBmaWxlIHNpemUgaXMgYmVsb3cgY2h1bmtTaXplLiBUaGlzIG1lYW5zLCB0aGF0IHRoZSBhZGRpdGlvbmFsIGNodW5rXHJcblx0XHRcdFx0XHQgKiBmb3JtIGRhdGEgd2lsbCBiZSBzdWJtaXR0ZWQgYW5kIHRoZSBgY2h1bmtzVXBsb2FkZWRgIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0Zm9yY2VDaHVua2luZzogZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgY2h1bmtpbmdgIGlzIGB0cnVlYCwgdGhlbiB0aGlzIGRlZmluZXMgdGhlIGNodW5rIHNpemUgaW4gYnl0ZXMuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGNodW5rU2l6ZTogMjAwMDAwMCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGB0cnVlYCwgdGhlIGluZGl2aWR1YWwgY2h1bmtzIG9mIGEgZmlsZSBhcmUgYmVpbmcgdXBsb2FkZWQgc2ltdWx0YW5lb3VzbHkuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHBhcmFsbGVsQ2h1bmtVcGxvYWRzOiBmYWxzZSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFdoZXRoZXIgYSBjaHVuayBzaG91bGQgYmUgcmV0cmllZCBpZiBpdCBmYWlscy5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmV0cnlDaHVua3M6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgYHJldHJ5Q2h1bmtzYCBpcyB0cnVlLCBob3cgbWFueSB0aW1lcyBzaG91bGQgaXQgYmUgcmV0cmllZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmV0cnlDaHVua3NMaW1pdDogMyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIG5vdCBgbnVsbGAgZGVmaW5lcyBob3cgbWFueSBmaWxlcyB0aGlzIERyb3B6b25lIGhhbmRsZXMuIElmIGl0IGV4Y2VlZHMsXHJcblx0XHRcdFx0XHQgKiB0aGUgZXZlbnQgYG1heGZpbGVzZXhjZWVkZWRgIHdpbGwgYmUgY2FsbGVkLiBUaGUgZHJvcHpvbmUgZWxlbWVudCBnZXRzIHRoZVxyXG5cdFx0XHRcdFx0ICogY2xhc3MgYGR6LW1heC1maWxlcy1yZWFjaGVkYCBhY2NvcmRpbmdseSBzbyB5b3UgY2FuIHByb3ZpZGUgdmlzdWFsIGZlZWRiYWNrLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRtYXhGaWxlc2l6ZTogMjU2LFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhlIG5hbWUgb2YgdGhlIGZpbGUgcGFyYW0gdGhhdCBnZXRzIHRyYW5zZmVycmVkLlxyXG5cdFx0XHRcdFx0ICogKipOT1RFKio6IElmIHlvdSBoYXZlIHRoZSBvcHRpb24gIGB1cGxvYWRNdWx0aXBsZWAgc2V0IHRvIGB0cnVlYCwgdGhlblxyXG5cdFx0XHRcdFx0ICogRHJvcHpvbmUgd2lsbCBhcHBlbmQgYFtdYCB0byB0aGUgbmFtZS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cGFyYW1OYW1lOiAnZmlsZScsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBXaGV0aGVyIHRodW1ibmFpbHMgZm9yIGltYWdlcyBzaG91bGQgYmUgZ2VuZXJhdGVkXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGNyZWF0ZUltYWdlVGh1bWJuYWlsczogdHJ1ZSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEluIE1CLiBXaGVuIHRoZSBmaWxlbmFtZSBleGNlZWRzIHRoaXMgbGltaXQsIHRoZSB0aHVtYm5haWwgd2lsbCBub3QgYmUgZ2VuZXJhdGVkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRtYXhUaHVtYm5haWxGaWxlc2l6ZTogMTAsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgbnVsbGAsIHRoZSByYXRpbyBvZiB0aGUgaW1hZ2Ugd2lsbCBiZSB1c2VkIHRvIGNhbGN1bGF0ZSBpdC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0dGh1bWJuYWlsV2lkdGg6IDEyMCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSBzYW1lIGFzIGB0aHVtYm5haWxXaWR0aGAuIElmIGJvdGggYXJlIG51bGwsIGltYWdlcyB3aWxsIG5vdCBiZSByZXNpemVkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHR0aHVtYm5haWxIZWlnaHQ6IDEyMCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEhvdyB0aGUgaW1hZ2VzIHNob3VsZCBiZSBzY2FsZWQgZG93biBpbiBjYXNlIGJvdGgsIGB0aHVtYm5haWxXaWR0aGAgYW5kIGB0aHVtYm5haWxIZWlnaHRgIGFyZSBwcm92aWRlZC5cclxuXHRcdFx0XHRcdCAqIENhbiBiZSBlaXRoZXIgYGNvbnRhaW5gIG9yIGBjcm9wYC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0dGh1bWJuYWlsTWV0aG9kOiAnY3JvcCcsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBzZXQsIGltYWdlcyB3aWxsIGJlIHJlc2l6ZWQgdG8gdGhlc2UgZGltZW5zaW9ucyBiZWZvcmUgYmVpbmcgKip1cGxvYWRlZCoqLlxyXG5cdFx0XHRcdFx0ICogSWYgb25seSBvbmUsIGByZXNpemVXaWR0aGAgKipvcioqIGByZXNpemVIZWlnaHRgIGlzIHByb3ZpZGVkLCB0aGUgb3JpZ2luYWwgYXNwZWN0XHJcblx0XHRcdFx0XHQgKiByYXRpbyBvZiB0aGUgZmlsZSB3aWxsIGJlIHByZXNlcnZlZC5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBUaGUgYG9wdGlvbnMudHJhbnNmb3JtRmlsZWAgZnVuY3Rpb24gdXNlcyB0aGVzZSBvcHRpb25zLCBzbyBpZiB0aGUgYHRyYW5zZm9ybUZpbGVgIGZ1bmN0aW9uXHJcblx0XHRcdFx0XHQgKiBpcyBvdmVycmlkZGVuLCB0aGVzZSBvcHRpb25zIGRvbid0IGRvIGFueXRoaW5nLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRyZXNpemVXaWR0aDogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFNlZSBgcmVzaXplV2lkdGhgLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRyZXNpemVIZWlnaHQ6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBUaGUgbWltZSB0eXBlIG9mIHRoZSByZXNpemVkIGltYWdlIChiZWZvcmUgaXQgZ2V0cyB1cGxvYWRlZCB0byB0aGUgc2VydmVyKS5cclxuXHRcdFx0XHRcdCAqIElmIGBudWxsYCB0aGUgb3JpZ2luYWwgbWltZSB0eXBlIHdpbGwgYmUgdXNlZC4gVG8gZm9yY2UganBlZywgZm9yIGV4YW1wbGUsIHVzZSBgaW1hZ2UvanBlZ2AuXHJcblx0XHRcdFx0XHQgKiBTZWUgYHJlc2l6ZVdpZHRoYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cmVzaXplTWltZVR5cGU6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBUaGUgcXVhbGl0eSBvZiB0aGUgcmVzaXplZCBpbWFnZXMuIFNlZSBgcmVzaXplV2lkdGhgLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRyZXNpemVRdWFsaXR5OiAwLjgsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBIb3cgdGhlIGltYWdlcyBzaG91bGQgYmUgc2NhbGVkIGRvd24gaW4gY2FzZSBib3RoLCBgcmVzaXplV2lkdGhgIGFuZCBgcmVzaXplSGVpZ2h0YCBhcmUgcHJvdmlkZWQuXHJcblx0XHRcdFx0XHQgKiBDYW4gYmUgZWl0aGVyIGBjb250YWluYCBvciBgY3JvcGAuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHJlc2l6ZU1ldGhvZDogJ2NvbnRhaW4nLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhlIGJhc2UgdGhhdCBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgZmlsZXNpemUuIFlvdSBjYW4gY2hhbmdlIHRoaXMgdG9cclxuXHRcdFx0XHRcdCAqIDEwMjQgaWYgeW91IHdvdWxkIHJhdGhlciBkaXNwbGF5IGtpYmlieXRlcywgbWViaWJ5dGVzLCBldGMuLi5cclxuXHRcdFx0XHRcdCAqIDEwMjQgaXMgdGVjaG5pY2FsbHkgaW5jb3JyZWN0LCBiZWNhdXNlIGAxMDI0IGJ5dGVzYCBhcmUgYDEga2liaWJ5dGVgIG5vdCBgMSBraWxvYnl0ZWAuXHJcblx0XHRcdFx0XHQgKiBZb3UgY2FuIGNoYW5nZSB0aGlzIHRvIGAxMDI0YCBpZiB5b3UgZG9uJ3QgY2FyZSBhYm91dCB2YWxpZGl0eS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZmlsZXNpemVCYXNlOiAxMDAwLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogQ2FuIGJlIHVzZWQgdG8gbGltaXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGZpbGVzIHRoYXQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoaXMgRHJvcHpvbmVcclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0bWF4RmlsZXM6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBBbiBvcHRpb25hbCBvYmplY3QgdG8gc2VuZCBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gdGhlIHNlcnZlci4gRWc6XHJcblx0XHRcdFx0XHQgKiBgeyBcIk15LUF3ZXNvbWUtSGVhZGVyXCI6IFwiaGVhZGVyIHZhbHVlXCIgfWBcclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0aGVhZGVyczogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGB0cnVlYCwgdGhlIGRyb3B6b25lIGVsZW1lbnQgaXRzZWxmIHdpbGwgYmUgY2xpY2thYmxlLCBpZiBgZmFsc2VgXHJcblx0XHRcdFx0XHQgKiBub3RoaW5nIHdpbGwgYmUgY2xpY2thYmxlLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIFlvdSBjYW4gYWxzbyBwYXNzIGFuIEhUTUwgZWxlbWVudCwgYSBDU1Mgc2VsZWN0b3IgKGZvciBtdWx0aXBsZSBlbGVtZW50cylcclxuXHRcdFx0XHRcdCAqIG9yIGFuIGFycmF5IG9mIHRob3NlLiBJbiB0aGF0IGNhc2UsIGFsbCBvZiB0aG9zZSBlbGVtZW50cyB3aWxsIHRyaWdnZXIgYW5cclxuXHRcdFx0XHRcdCAqIHVwbG9hZCB3aGVuIGNsaWNrZWQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFdoZXRoZXIgaGlkZGVuIGZpbGVzIGluIGRpcmVjdG9yaWVzIHNob3VsZCBiZSBpZ25vcmVkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRpZ25vcmVIaWRkZW5GaWxlczogdHJ1ZSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBhY2NlcHRgIGNoZWNrcyB0aGUgZmlsZSdzIG1pbWUgdHlwZSBvclxyXG5cdFx0XHRcdFx0ICogZXh0ZW5zaW9uIGFnYWluc3QgdGhpcyBsaXN0LiBUaGlzIGlzIGEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgbWltZVxyXG5cdFx0XHRcdFx0ICogdHlwZXMgb3IgZmlsZSBleHRlbnNpb25zLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIEVnLjogYGltYWdlLyosYXBwbGljYXRpb24vcGRmLC5wc2RgXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogSWYgdGhlIERyb3B6b25lIGlzIGBjbGlja2FibGVgIHRoaXMgb3B0aW9uIHdpbGwgYWxzbyBiZSB1c2VkIGFzXHJcblx0XHRcdFx0XHQgKiBbYGFjY2VwdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSFRNTC9FbGVtZW50L2lucHV0I2F0dHItYWNjZXB0KVxyXG5cdFx0XHRcdFx0ICogcGFyYW1ldGVyIG9uIHRoZSBoaWRkZW4gZmlsZSBpbnB1dCBhcyB3ZWxsLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRhY2NlcHRlZEZpbGVzOiBudWxsLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogKipEZXByZWNhdGVkISoqXHJcblx0XHRcdFx0XHQgKiBVc2UgYWNjZXB0ZWRGaWxlcyBpbnN0ZWFkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRhY2NlcHRlZE1pbWVUeXBlczogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGZhbHNlLCBmaWxlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBxdWV1ZSBidXQgdGhlIHF1ZXVlIHdpbGwgbm90IGJlXHJcblx0XHRcdFx0XHQgKiBwcm9jZXNzZWQgYXV0b21hdGljYWxseS5cclxuXHRcdFx0XHRcdCAqIFRoaXMgY2FuIGJlIHVzZWZ1bCBpZiB5b3UgbmVlZCBzb21lIGFkZGl0aW9uYWwgdXNlciBpbnB1dCBiZWZvcmUgc2VuZGluZ1xyXG5cdFx0XHRcdFx0ICogZmlsZXMgKG9yIGlmIHlvdSB3YW50IHdhbnQgYWxsIGZpbGVzIHNlbnQgYXQgb25jZSkuXHJcblx0XHRcdFx0XHQgKiBJZiB5b3UncmUgcmVhZHkgdG8gc2VuZCB0aGUgZmlsZSBzaW1wbHkgY2FsbCBgbXlEcm9wem9uZS5wcm9jZXNzUXVldWUoKWAuXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogU2VlIHRoZSBbZW5xdWV1aW5nIGZpbGUgdXBsb2Fkc10oI2VucXVldWluZy1maWxlLXVwbG9hZHMpIGRvY3VtZW50YXRpb25cclxuXHRcdFx0XHRcdCAqIHNlY3Rpb24gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBmYWxzZSwgZmlsZXMgYWRkZWQgdG8gdGhlIGRyb3B6b25lIHdpbGwgbm90IGJlIHF1ZXVlZCBieSBkZWZhdWx0LlxyXG5cdFx0XHRcdFx0ICogWW91J2xsIGhhdmUgdG8gY2FsbCBgZW5xdWV1ZUZpbGUoZmlsZSlgIG1hbnVhbGx5LlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRhdXRvUXVldWU6IHRydWUsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgdHJ1ZWAsIHRoaXMgd2lsbCBhZGQgYSBsaW5rIHRvIGV2ZXJ5IGZpbGUgcHJldmlldyB0byByZW1vdmUgb3IgY2FuY2VsIChpZlxyXG5cdFx0XHRcdFx0ICogYWxyZWFkeSB1cGxvYWRpbmcpIHRoZSBmaWxlLiBUaGUgYGRpY3RDYW5jZWxVcGxvYWRgLCBgZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbmBcclxuXHRcdFx0XHRcdCAqIGFuZCBgZGljdFJlbW92ZUZpbGVgIG9wdGlvbnMgYXJlIHVzZWQgZm9yIHRoZSB3b3JkaW5nLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRhZGRSZW1vdmVMaW5rczogZmFsc2UsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBEZWZpbmVzIHdoZXJlIHRvIGRpc3BsYXkgdGhlIGZpbGUgcHJldmlld3Mg4oCTIGlmIGBudWxsYCB0aGVcclxuXHRcdFx0XHRcdCAqIERyb3B6b25lIGVsZW1lbnQgaXRzZWxmIGlzIHVzZWQuIENhbiBiZSBhIHBsYWluIGBIVE1MRWxlbWVudGAgb3IgYSBDU1NcclxuXHRcdFx0XHRcdCAqIHNlbGVjdG9yLiBUaGUgZWxlbWVudCBzaG91bGQgaGF2ZSB0aGUgYGRyb3B6b25lLXByZXZpZXdzYCBjbGFzcyBzb1xyXG5cdFx0XHRcdFx0ICogdGhlIHByZXZpZXdzIGFyZSBkaXNwbGF5ZWQgcHJvcGVybHkuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHByZXZpZXdzQ29udGFpbmVyOiBudWxsLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhpcyBpcyB0aGUgZWxlbWVudCB0aGUgaGlkZGVuIGlucHV0IGZpZWxkICh3aGljaCBpcyB1c2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlXHJcblx0XHRcdFx0XHQgKiBkcm9wem9uZSB0byB0cmlnZ2VyIGZpbGUgc2VsZWN0aW9uKSB3aWxsIGJlIGFwcGVuZGVkIHRvLiBUaGlzIG1pZ2h0XHJcblx0XHRcdFx0XHQgKiBiZSBpbXBvcnRhbnQgaW4gY2FzZSB5b3UgdXNlIGZyYW1ld29ya3MgdG8gc3dpdGNoIHRoZSBjb250ZW50IG9mIHlvdXIgcGFnZS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0aGlkZGVuSW5wdXRDb250YWluZXI6ICdib2R5JyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIG51bGwsIG5vIGNhcHR1cmUgdHlwZSB3aWxsIGJlIHNwZWNpZmllZFxyXG5cdFx0XHRcdFx0ICogSWYgY2FtZXJhLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgY2FtZXJhXHJcblx0XHRcdFx0XHQgKiBJZiBtaWNyb3Bob25lLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgdGhlIG1pY3JvcGhvbmVcclxuXHRcdFx0XHRcdCAqIElmIGNhbWNvcmRlciwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIHRoZSBjYW1lcmEgaW4gdmlkZW8gbW9kZVxyXG5cdFx0XHRcdFx0ICogT24gYXBwbGUgZGV2aWNlcyBtdWx0aXBsZSBtdXN0IGJlIHNldCB0byBmYWxzZS4gIEFjY2VwdGVkRmlsZXMgbWF5IG5lZWQgdG9cclxuXHRcdFx0XHRcdCAqIGJlIHNldCB0byBhbiBhcHByb3ByaWF0ZSBtaW1lIHR5cGUgKGUuZy4gXCJpbWFnZS8qXCIsIFwiYXVkaW8vKlwiLCBvciBcInZpZGVvLypcIikuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGNhcHR1cmU6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiAqKkRlcHJlY2F0ZWQqKi4gVXNlIGByZW5hbWVGaWxlYCBpbnN0ZWFkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRyZW5hbWVGaWxlbmFtZTogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEEgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkIGJlZm9yZSB0aGUgZmlsZSBpcyB1cGxvYWRlZCB0byB0aGUgc2VydmVyIGFuZCByZW5hbWVzIHRoZSBmaWxlLlxyXG5cdFx0XHRcdFx0ICogVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBgRmlsZWAgYXMgYXJndW1lbnQgYW5kIGNhbiB1c2UgdGhlIGBmaWxlLm5hbWVgLiBUaGUgYWN0dWFsIG5hbWUgb2YgdGhlXHJcblx0XHRcdFx0XHQgKiBmaWxlIHRoYXQgZ2V0cyB1c2VkIGR1cmluZyB0aGUgdXBsb2FkIGNhbiBiZSBhY2Nlc3NlZCB0aHJvdWdoIGBmaWxlLnVwbG9hZC5maWxlbmFtZWAuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdHJlbmFtZUZpbGU6IG51bGwsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiBgdHJ1ZWAgdGhlIGZhbGxiYWNrIHdpbGwgYmUgZm9yY2VkLiBUaGlzIGlzIHZlcnkgdXNlZnVsIHRvIHRlc3QgeW91ciBzZXJ2ZXJcclxuXHRcdFx0XHRcdCAqIGltcGxlbWVudGF0aW9ucyBmaXJzdCBhbmQgbWFrZSBzdXJlIHRoYXQgZXZlcnl0aGluZyB3b3JrcyBhc1xyXG5cdFx0XHRcdFx0ICogZXhwZWN0ZWQgd2l0aG91dCBkcm9wem9uZSBpZiB5b3UgZXhwZXJpZW5jZSBwcm9ibGVtcywgYW5kIHRvIHRlc3RcclxuXHRcdFx0XHRcdCAqIGhvdyB5b3VyIGZhbGxiYWNrcyB3aWxsIGxvb2suXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGZvcmNlRmFsbGJhY2s6IGZhbHNlLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhlIHRleHQgdXNlZCBiZWZvcmUgYW55IGZpbGVzIGFyZSBkcm9wcGVkLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0RGVmYXVsdE1lc3NhZ2U6ICdEcm9wIGZpbGVzIGhlcmUgdG8gdXBsb2FkJyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSB0ZXh0IHRoYXQgcmVwbGFjZXMgdGhlIGRlZmF1bHQgbWVzc2FnZSB0ZXh0IGl0IHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RGYWxsYmFja01lc3NhZ2U6IFwiWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgZHJhZyduJ2Ryb3AgZmlsZSB1cGxvYWRzLlwiLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogVGhlIHRleHQgdGhhdCB3aWxsIGJlIGFkZGVkIGJlZm9yZSB0aGUgZmFsbGJhY2sgZm9ybS5cclxuXHRcdFx0XHRcdCAqIElmIHlvdSBwcm92aWRlIGEgIGZhbGxiYWNrIGVsZW1lbnQgeW91cnNlbGYsIG9yIGlmIHRoaXMgb3B0aW9uIGlzIGBudWxsYCB0aGlzIHdpbGxcclxuXHRcdFx0XHRcdCAqIGJlIGlnbm9yZWQuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RGYWxsYmFja1RleHQ6ICdQbGVhc2UgdXNlIHRoZSBmYWxsYmFjayBmb3JtIGJlbG93IHRvIHVwbG9hZCB5b3VyIGZpbGVzIGxpa2UgaW4gdGhlIG9sZGVuIGRheXMuJyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIHRoZSBmaWxlc2l6ZSBpcyB0b28gYmlnLlxyXG5cdFx0XHRcdFx0ICogYHt7ZmlsZXNpemV9fWAgYW5kIGB7e21heEZpbGVzaXplfX1gIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgcmVzcGVjdGl2ZSBjb25maWd1cmF0aW9uIHZhbHVlcy5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdEZpbGVUb29CaWc6ICdGaWxlIGlzIHRvbyBiaWcgKHt7ZmlsZXNpemV9fU1pQikuIE1heCBmaWxlc2l6ZToge3ttYXhGaWxlc2l6ZX19TWlCLicsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiB0aGUgZmlsZSBkb2Vzbid0IG1hdGNoIHRoZSBmaWxlIHR5cGUuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RJbnZhbGlkRmlsZVR5cGU6IFwiWW91IGNhbid0IHVwbG9hZCBmaWxlcyBvZiB0aGlzIHR5cGUuXCIsXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBJZiB0aGUgc2VydmVyIHJlc3BvbnNlIHdhcyBpbnZhbGlkLlxyXG5cdFx0XHRcdFx0ICogYHt7c3RhdHVzQ29kZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHNlcnZlcnMgc3RhdHVzIGNvZGUuXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdGRpY3RSZXNwb25zZUVycm9yOiAnU2VydmVyIHJlc3BvbmRlZCB3aXRoIHt7c3RhdHVzQ29kZX19IGNvZGUuJyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCBmb3IgdGhlIGNhbmNlbCB1cGxvYWQgbGluay5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdENhbmNlbFVwbG9hZDogJ0NhbmNlbCB1cGxvYWQnLFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIGZvciBjb25maXJtYXRpb24gd2hlbiBjYW5jZWxsaW5nIHVwbG9hZC5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbjogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjYW5jZWwgdGhpcyB1cGxvYWQ/JyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCB0byByZW1vdmUgYSBmaWxlLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0UmVtb3ZlRmlsZTogJ1JlbW92ZSBmaWxlJyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIElmIHRoaXMgaXMgbm90IG51bGwsIHRoZW4gdGhlIHVzZXIgd2lsbCBiZSBwcm9tcHRlZCBiZWZvcmUgcmVtb3ZpbmcgYSBmaWxlLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbjogbnVsbCxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIERpc3BsYXllZCBpZiBgbWF4RmlsZXNgIGlzIHN0IGFuZCBleGNlZWRlZC5cclxuXHRcdFx0XHRcdCAqIFRoZSBzdHJpbmcgYHt7bWF4RmlsZXN9fWAgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0ZGljdE1heEZpbGVzRXhjZWVkZWQ6ICdZb3UgY2FuIG5vdCB1cGxvYWQgYW55IG1vcmUgZmlsZXMuJyxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEFsbG93cyB5b3UgdG8gdHJhbnNsYXRlIHRoZSBkaWZmZXJlbnQgdW5pdHMuIFN0YXJ0aW5nIHdpdGggYHRiYCBmb3IgdGVyYWJ5dGVzIGFuZCBnb2luZyBkb3duIHRvXHJcblx0XHRcdFx0XHQgKiBgYmAgZm9yIGJ5dGVzLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRkaWN0RmlsZVNpemVVbml0czogeyB0YjogJ1RCJywgZ2I6ICdHQicsIG1iOiAnTUInLCBrYjogJ0tCJywgYjogJ2InIH0sXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBDYWxsZWQgd2hlbiBkcm9wem9uZSBpbml0aWFsaXplZFxyXG5cdFx0XHRcdFx0ICogWW91IGNhbiBhZGQgZXZlbnQgbGlzdGVuZXJzIGhlcmVcclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0aW5pdDogZnVuY3Rpb24gaW5pdCgpIHt9LFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogQ2FuIGJlIGFuICoqb2JqZWN0Kiogb2YgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIHRvIHRyYW5zZmVyIHRvIHRoZSBzZXJ2ZXIsICoqb3IqKiBhIGBGdW5jdGlvbmBcclxuXHRcdFx0XHRcdCAqIHRoYXQgZ2V0cyBpbnZva2VkIHdpdGggdGhlIGBmaWxlc2AsIGB4aHJgIGFuZCwgaWYgaXQncyBhIGNodW5rZWQgdXBsb2FkLCBgY2h1bmtgIGFyZ3VtZW50cy4gSW4gY2FzZVxyXG5cdFx0XHRcdFx0ICogb2YgYSBmdW5jdGlvbiwgdGhpcyBuZWVkcyB0byByZXR1cm4gYSBtYXAuXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3RoaW5nIGZvciBub3JtYWwgdXBsb2FkcywgYnV0IGFkZHMgcmVsZXZhbnQgaW5mb3JtYXRpb24gZm9yXHJcblx0XHRcdFx0XHQgKiBjaHVua2VkIHVwbG9hZHMuXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogVGhpcyBpcyB0aGUgc2FtZSBhcyBhZGRpbmcgaGlkZGVuIGlucHV0IGZpZWxkcyBpbiB0aGUgZm9ybSBlbGVtZW50LlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRwYXJhbXM6IGZ1bmN0aW9uIHBhcmFtcyhmaWxlcywgeGhyLCBjaHVuaykge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2h1bmspIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZHp1dWlkOiBjaHVuay5maWxlLnVwbG9hZC51dWlkLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHpjaHVua2luZGV4OiBjaHVuay5pbmRleCxcclxuXHRcdFx0XHRcdFx0XHRcdGR6dG90YWxmaWxlc2l6ZTogY2h1bmsuZmlsZS5zaXplLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHpjaHVua3NpemU6IHRoaXMub3B0aW9ucy5jaHVua1NpemUsXHJcblx0XHRcdFx0XHRcdFx0XHRkenRvdGFsY2h1bmtjb3VudDogY2h1bmsuZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50LFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHpjaHVua2J5dGVvZmZzZXQ6IGNodW5rLmluZGV4ICogdGhpcy5vcHRpb25zLmNodW5rU2l6ZSxcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0ICogQSBmdW5jdGlvbiB0aGF0IGdldHMgYSBbZmlsZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9ET00vRmlsZSlcclxuXHRcdFx0XHRcdCAqIGFuZCBhIGBkb25lYCBmdW5jdGlvbiBhcyBwYXJhbWV0ZXJzLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIElmIHRoZSBkb25lIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIHRoZSBmaWxlIGlzIFwiYWNjZXB0ZWRcIiBhbmQgd2lsbFxyXG5cdFx0XHRcdFx0ICogYmUgcHJvY2Vzc2VkLiBJZiB5b3UgcGFzcyBhbiBlcnJvciBtZXNzYWdlLCB0aGUgZmlsZSBpcyByZWplY3RlZCwgYW5kIHRoZSBlcnJvclxyXG5cdFx0XHRcdFx0ICogbWVzc2FnZSB3aWxsIGJlIGRpc3BsYXllZC5cclxuXHRcdFx0XHRcdCAqIFRoaXMgZnVuY3Rpb24gd2lsbCBub3QgYmUgY2FsbGVkIGlmIHRoZSBmaWxlIGlzIHRvbyBiaWcgb3IgZG9lc24ndCBtYXRjaCB0aGUgbWltZSB0eXBlcy5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0YWNjZXB0OiBmdW5jdGlvbiBhY2NlcHQoZmlsZSwgZG9uZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9uZSgpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIGFsbCBjaHVua3MgaGF2ZSBiZWVuIHVwbG9hZGVkIGZvciBhIGZpbGUuXHJcblx0XHRcdFx0XHQgKiBJdCBnZXRzIHRoZSBmaWxlIGZvciB3aGljaCB0aGUgY2h1bmtzIGhhdmUgYmVlbiB1cGxvYWRlZCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLFxyXG5cdFx0XHRcdFx0ICogYW5kIHRoZSBgZG9uZWAgZnVuY3Rpb24gYXMgc2Vjb25kLiBgZG9uZSgpYCBuZWVkcyB0byBiZSBpbnZva2VkIHdoZW4gZXZlcnl0aGluZ1xyXG5cdFx0XHRcdFx0ICogbmVlZGVkIHRvIGZpbmlzaCB0aGUgdXBsb2FkIHByb2Nlc3MgaXMgZG9uZS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0Y2h1bmtzVXBsb2FkZWQ6IGZ1bmN0aW9uIGNodW5rc1VwbG9hZGVkKGZpbGUsIGRvbmUpIHtcclxuXHRcdFx0XHRcdFx0ZG9uZSgpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEdldHMgY2FsbGVkIHdoZW4gdGhlIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZC5cclxuXHRcdFx0XHRcdCAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNob3dzIHRoZSBmYWxsYmFjayBpbnB1dCBmaWVsZCBhbmQgYWRkc1xyXG5cdFx0XHRcdFx0ICogYSB0ZXh0LlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRmYWxsYmFjazogZnVuY3Rpb24gZmFsbGJhY2soKSB7XHJcblx0XHRcdFx0XHRcdC8vIFRoaXMgY29kZSBzaG91bGQgcGFzcyBpbiBJRTcuLi4gOihcclxuXHRcdFx0XHRcdFx0dmFyIG1lc3NhZ2VFbGVtZW50ID0gdm9pZCAwO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy5lbGVtZW50LmNsYXNzTmFtZSArICcgZHotYnJvd3Nlci1ub3Qtc3VwcG9ydGVkJztcclxuXHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjIgPSB0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMiA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyID0gX2lzQXJyYXkyID8gX2l0ZXJhdG9yMiA6IF9pdGVyYXRvcjJbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMjtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5Mikge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTIgPSBfaXRlcmF0b3IyLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMiA9IF9pMi52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBjaGlsZCA9IF9yZWYyO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoLyhefCApZHotbWVzc2FnZSgkfCApLy50ZXN0KGNoaWxkLmNsYXNzTmFtZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2VFbGVtZW50ID0gY2hpbGQ7XHJcblx0XHRcdFx0XHRcdFx0XHRjaGlsZC5jbGFzc05hbWUgPSAnZHotbWVzc2FnZSc7IC8vIFJlbW92ZXMgdGhlICdkei1kZWZhdWx0JyBjbGFzc1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmICghbWVzc2FnZUVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRtZXNzYWdlRWxlbWVudCA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoJzxkaXYgY2xhc3M9XCJkei1tZXNzYWdlXCI+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBzcGFuID0gbWVzc2FnZUVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKVswXTtcclxuXHRcdFx0XHRcdFx0aWYgKHNwYW4pIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoc3Bhbi50ZXh0Q29udGVudCAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzcGFuLnRleHRDb250ZW50ID0gdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja01lc3NhZ2U7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChzcGFuLmlubmVyVGV4dCAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzcGFuLmlubmVyVGV4dCA9IHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tNZXNzYWdlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmdldEZhbGxiYWNrRm9ybSgpKTtcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0LyoqXHJcblx0XHRcdFx0XHQgKiBHZXRzIGNhbGxlZCB0byBjYWxjdWxhdGUgdGhlIHRodW1ibmFpbCBkaW1lbnNpb25zLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIEl0IGdldHMgYGZpbGVgLCBgd2lkdGhgIGFuZCBgaGVpZ2h0YCAoYm90aCBtYXkgYmUgYG51bGxgKSBhcyBwYXJhbWV0ZXJzIGFuZCBtdXN0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZzpcclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiAgLSBgc3JjV2lkdGhgICYgYHNyY0hlaWdodGAgKHJlcXVpcmVkKVxyXG5cdFx0XHRcdFx0ICogIC0gYHRyZ1dpZHRoYCAmIGB0cmdIZWlnaHRgIChyZXF1aXJlZClcclxuXHRcdFx0XHRcdCAqICAtIGBzcmNYYCAmIGBzcmNZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxyXG5cdFx0XHRcdFx0ICogIC0gYHRyZ1hgICYgYHRyZ1lgIChvcHRpb25hbCwgZGVmYXVsdCBgMGApXHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICogVGhvc2UgdmFsdWVzIGFyZSBnb2luZyB0byBiZSB1c2VkIGJ5IGBjdHguZHJhd0ltYWdlKClgLlxyXG5cdFx0XHRcdFx0ICovXHJcblx0XHRcdFx0XHRyZXNpemU6IGZ1bmN0aW9uIHJlc2l6ZShmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGluZm8gPSB7XHJcblx0XHRcdFx0XHRcdFx0c3JjWDogMCxcclxuXHRcdFx0XHRcdFx0XHRzcmNZOiAwLFxyXG5cdFx0XHRcdFx0XHRcdHNyY1dpZHRoOiBmaWxlLndpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdHNyY0hlaWdodDogZmlsZS5oZWlnaHQsXHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgc3JjUmF0aW8gPSBmaWxlLndpZHRoIC8gZmlsZS5oZWlnaHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBBdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZSBkaW1lbnNpb25zIGlmIG5vdCBzcGVjaWZpZWRcclxuXHRcdFx0XHRcdFx0aWYgKHdpZHRoID09IG51bGwgJiYgaGVpZ2h0ID09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHR3aWR0aCA9IGluZm8uc3JjV2lkdGg7XHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gaW5mby5zcmNIZWlnaHQ7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAod2lkdGggPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdHdpZHRoID0gaGVpZ2h0ICogc3JjUmF0aW87XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaGVpZ2h0ID09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQgPSB3aWR0aCAvIHNyY1JhdGlvO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgaW1hZ2VzIGFyZW4ndCB1cHNjYWxlZFxyXG5cdFx0XHRcdFx0XHR3aWR0aCA9IE1hdGgubWluKHdpZHRoLCBpbmZvLnNyY1dpZHRoKTtcclxuXHRcdFx0XHRcdFx0aGVpZ2h0ID0gTWF0aC5taW4oaGVpZ2h0LCBpbmZvLnNyY0hlaWdodCk7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgdHJnUmF0aW8gPSB3aWR0aCAvIGhlaWdodDtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChpbmZvLnNyY1dpZHRoID4gd2lkdGggfHwgaW5mby5zcmNIZWlnaHQgPiBoZWlnaHQpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBJbWFnZSBpcyBiaWdnZXIgYW5kIG5lZWRzIHJlc2NhbGluZ1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNpemVNZXRob2QgPT09ICdjcm9wJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNyY1JhdGlvID4gdHJnUmF0aW8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5zcmNIZWlnaHQgPSBmaWxlLmhlaWdodDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5zcmNXaWR0aCA9IGluZm8uc3JjSGVpZ2h0ICogdHJnUmF0aW87XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpbmZvLnNyY1dpZHRoID0gZmlsZS53aWR0aDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5zcmNIZWlnaHQgPSBpbmZvLnNyY1dpZHRoIC8gdHJnUmF0aW87XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyZXNpemVNZXRob2QgPT09ICdjb250YWluJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gTWV0aG9kICdjb250YWluJ1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNyY1JhdGlvID4gdHJnUmF0aW8pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gd2lkdGggLyBzcmNSYXRpbztcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoID0gaGVpZ2h0ICogc3JjUmF0aW87XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVua25vd24gcmVzaXplTWV0aG9kICdcIiArIHJlc2l6ZU1ldGhvZCArIFwiJ1wiKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGluZm8uc3JjWCA9IChmaWxlLndpZHRoIC0gaW5mby5zcmNXaWR0aCkgLyAyO1xyXG5cdFx0XHRcdFx0XHRpbmZvLnNyY1kgPSAoZmlsZS5oZWlnaHQgLSBpbmZvLnNyY0hlaWdodCkgLyAyO1xyXG5cclxuXHRcdFx0XHRcdFx0aW5mby50cmdXaWR0aCA9IHdpZHRoO1xyXG5cdFx0XHRcdFx0XHRpbmZvLnRyZ0hlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBpbmZvO1xyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIENhbiBiZSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgZmlsZSAoZm9yIGV4YW1wbGUsIHJlc2l6ZSBhbiBpbWFnZSBpZiBuZWNlc3NhcnkpLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHVzZXMgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgKGlmIHByb3ZpZGVkKSBhbmQgcmVzaXplc1xyXG5cdFx0XHRcdFx0ICogaW1hZ2VzIGFjY29yZGluZyB0byB0aG9zZSBkaW1lbnNpb25zLlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqIEdldHMgdGhlIGBmaWxlYCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLCBhbmQgYSBgZG9uZSgpYCBmdW5jdGlvbiBhcyB0aGUgc2Vjb25kLCB0aGF0IG5lZWRzXHJcblx0XHRcdFx0XHQgKiB0byBiZSBpbnZva2VkIHdpdGggdGhlIGZpbGUgd2hlbiB0aGUgdHJhbnNmb3JtYXRpb24gaXMgZG9uZS5cclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0dHJhbnNmb3JtRmlsZTogZnVuY3Rpb24gdHJhbnNmb3JtRmlsZShmaWxlLCBkb25lKSB7XHJcblx0XHRcdFx0XHRcdGlmICgodGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoIHx8IHRoaXMub3B0aW9ucy5yZXNpemVIZWlnaHQpICYmIGZpbGUudHlwZS5tYXRjaCgvaW1hZ2UuKi8pKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVzaXplSW1hZ2UoXHJcblx0XHRcdFx0XHRcdFx0XHRmaWxlLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnJlc2l6ZUhlaWdodCxcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5yZXNpemVNZXRob2QsXHJcblx0XHRcdFx0XHRcdFx0XHRkb25lXHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShmaWxlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHQvKipcclxuXHRcdFx0XHRcdCAqIEEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIHRlbXBsYXRlIHVzZWQgZm9yIGVhY2ggZHJvcHBlZFxyXG5cdFx0XHRcdFx0ICogZmlsZS4gQ2hhbmdlIGl0IHRvIGZ1bGZpbGwgeW91ciBuZWVkcyBidXQgbWFrZSBzdXJlIHRvIHByb3Blcmx5XHJcblx0XHRcdFx0XHQgKiBwcm92aWRlIGFsbCBlbGVtZW50cy5cclxuXHRcdFx0XHRcdCAqXHJcblx0XHRcdFx0XHQgKiBJZiB5b3Ugd2FudCB0byB1c2UgYW4gYWN0dWFsIEhUTUwgZWxlbWVudCBpbnN0ZWFkIG9mIHByb3ZpZGluZyBhIFN0cmluZ1xyXG5cdFx0XHRcdFx0ICogYXMgYSBjb25maWcgb3B0aW9uLCB5b3UgY291bGQgY3JlYXRlIGEgZGl2IHdpdGggdGhlIGlkIGB0cGxgLFxyXG5cdFx0XHRcdFx0ICogcHV0IHRoZSB0ZW1wbGF0ZSBpbnNpZGUgaXQgYW5kIHByb3ZpZGUgdGhlIGVsZW1lbnQgbGlrZSB0aGlzOlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqICAgICBkb2N1bWVudFxyXG5cdFx0XHRcdFx0ICogICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyN0cGwnKVxyXG5cdFx0XHRcdFx0ICogICAgICAgLmlubmVySFRNTFxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0cHJldmlld1RlbXBsYXRlOlxyXG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImR6LXByZXZpZXcgZHotZmlsZS1wcmV2aWV3XCI+XFxuICA8ZGl2IGNsYXNzPVwiZHotaW1hZ2VcIj48aW1nIGRhdGEtZHotdGh1bWJuYWlsIC8+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotZGV0YWlsc1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZHotc2l6ZVwiPjxzcGFuIGRhdGEtZHotc2l6ZT48L3NwYW4+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJkei1maWxlbmFtZVwiPjxzcGFuIGRhdGEtZHotbmFtZT48L3NwYW4+PC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJkei1wcm9ncmVzc1wiPjxzcGFuIGNsYXNzPVwiZHotdXBsb2FkXCIgZGF0YS1kei11cGxvYWRwcm9ncmVzcz48L3NwYW4+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotZXJyb3ItbWVzc2FnZVwiPjxzcGFuIGRhdGEtZHotZXJyb3JtZXNzYWdlPjwvc3Bhbj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJkei1zdWNjZXNzLW1hcmtcIj5cXG4gICAgPHN2ZyB3aWR0aD1cIjU0cHhcIiBoZWlnaHQ9XCI1NHB4XCIgdmlld0JveD1cIjAgMCA1NCA1NFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sbnM6c2tldGNoPVwiaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zXCI+XFxuICAgICAgPHRpdGxlPkNoZWNrPC90aXRsZT5cXG4gICAgICA8ZGVmcz48L2RlZnM+XFxuICAgICAgPGcgaWQ9XCJQYWdlLTFcIiBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHNrZXRjaDp0eXBlPVwiTVNQYWdlXCI+XFxuICAgICAgICA8cGF0aCBkPVwiTTIzLjUsMzEuODQzMTQ1OCBMMTcuNTg1MjQxOSwyNS45MjgzODc3IEMxNi4wMjQ4MjUzLDI0LjM2Nzk3MTEgMTMuNDkxMDI5NCwyNC4zNjY4MzUgMTEuOTI4OTMyMiwyNS45Mjg5MzIyIEMxMC4zNzAwMTM2LDI3LjQ4Nzg1MDggMTAuMzY2NTkxMiwzMC4wMjM0NDU1IDExLjkyODM4NzcsMzEuNTg1MjQxOSBMMjAuNDE0NzU4MSw0MC4wNzE2MTIzIEMyMC41MTMzOTk5LDQwLjE3MDI1NDEgMjAuNjE1OTMxNSw0MC4yNjI2NjQ5IDIwLjcyMTg2MTUsNDAuMzQ4ODQzNSBDMjIuMjgzNTY2OSw0MS44NzI1NjUxIDI0Ljc5NDIzNCw0MS44NjI2MjAyIDI2LjM0NjE1NjQsNDAuMzEwNjk3OCBMNDMuMzEwNjk3OCwyMy4zNDYxNTY0IEM0NC44NzcxMDIxLDIxLjc3OTc1MjEgNDQuODc1ODA1NywxOS4yNDgzODg3IDQzLjMxMzcwODUsMTcuNjg2MjkxNSBDNDEuNzU0Nzg5OSwxNi4xMjczNzI5IDM5LjIxNzYwMzUsMTYuMTI1NTQyMiAzNy42NTM4NDM2LDE3LjY4OTMwMjIgTDIzLjUsMzEuODQzMTQ1OCBaIE0yNyw1MyBDNDEuMzU5NDAzNSw1MyA1Myw0MS4zNTk0MDM1IDUzLDI3IEM1MywxMi42NDA1OTY1IDQxLjM1OTQwMzUsMSAyNywxIEMxMi42NDA1OTY1LDEgMSwxMi42NDA1OTY1IDEsMjcgQzEsNDEuMzU5NDAzNSAxMi42NDA1OTY1LDUzIDI3LDUzIFpcIiBpZD1cIk92YWwtMlwiIHN0cm9rZS1vcGFjaXR5PVwiMC4xOTg3OTQxNThcIiBzdHJva2U9XCIjNzQ3NDc0XCIgZmlsbC1vcGFjaXR5PVwiMC44MTY1MTk0NzVcIiBmaWxsPVwiI0ZGRkZGRlwiIHNrZXRjaDp0eXBlPVwiTVNTaGFwZUdyb3VwXCI+PC9wYXRoPlxcbiAgICAgIDwvZz5cXG4gICAgPC9zdmc+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJkei1lcnJvci1tYXJrXCI+XFxuICAgIDxzdmcgd2lkdGg9XCI1NHB4XCIgaGVpZ2h0PVwiNTRweFwiIHZpZXdCb3g9XCIwIDAgNTQgNTRcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbG5zOnNrZXRjaD1cImh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9uc1wiPlxcbiAgICAgIDx0aXRsZT5FcnJvcjwvdGl0bGU+XFxuICAgICAgPGRlZnM+PC9kZWZzPlxcbiAgICAgIDxnIGlkPVwiUGFnZS0xXCIgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBza2V0Y2g6dHlwZT1cIk1TUGFnZVwiPlxcbiAgICAgICAgPGcgaWQ9XCJDaGVjay0rLU92YWwtMlwiIHNrZXRjaDp0eXBlPVwiTVNMYXllckdyb3VwXCIgc3Ryb2tlPVwiIzc0NzQ3NFwiIHN0cm9rZS1vcGFjaXR5PVwiMC4xOTg3OTQxNThcIiBmaWxsPVwiI0ZGRkZGRlwiIGZpbGwtb3BhY2l0eT1cIjAuODE2NTE5NDc1XCI+XFxuICAgICAgICAgIDxwYXRoIGQ9XCJNMzIuNjU2ODU0MiwyOSBMMzguMzEwNjk3OCwyMy4zNDYxNTY0IEMzOS44NzcxMDIxLDIxLjc3OTc1MjEgMzkuODc1ODA1NywxOS4yNDgzODg3IDM4LjMxMzcwODUsMTcuNjg2MjkxNSBDMzYuNzU0Nzg5OSwxNi4xMjczNzI5IDM0LjIxNzYwMzUsMTYuMTI1NTQyMiAzMi42NTM4NDM2LDE3LjY4OTMwMjIgTDI3LDIzLjM0MzE0NTggTDIxLjM0NjE1NjQsMTcuNjg5MzAyMiBDMTkuNzgyMzk2NSwxNi4xMjU1NDIyIDE3LjI0NTIxMDEsMTYuMTI3MzcyOSAxNS42ODYyOTE1LDE3LjY4NjI5MTUgQzE0LjEyNDE5NDMsMTkuMjQ4Mzg4NyAxNC4xMjI4OTc5LDIxLjc3OTc1MjEgMTUuNjg5MzAyMiwyMy4zNDYxNTY0IEwyMS4zNDMxNDU4LDI5IEwxNS42ODkzMDIyLDM0LjY1Mzg0MzYgQzE0LjEyMjg5NzksMzYuMjIwMjQ3OSAxNC4xMjQxOTQzLDM4Ljc1MTYxMTMgMTUuNjg2MjkxNSw0MC4zMTM3MDg1IEMxNy4yNDUyMTAxLDQxLjg3MjYyNzEgMTkuNzgyMzk2NSw0MS44NzQ0NTc4IDIxLjM0NjE1NjQsNDAuMzEwNjk3OCBMMjcsMzQuNjU2ODU0MiBMMzIuNjUzODQzNiw0MC4zMTA2OTc4IEMzNC4yMTc2MDM1LDQxLjg3NDQ1NzggMzYuNzU0Nzg5OSw0MS44NzI2MjcxIDM4LjMxMzcwODUsNDAuMzEzNzA4NSBDMzkuODc1ODA1NywzOC43NTE2MTEzIDM5Ljg3NzEwMjEsMzYuMjIwMjQ3OSAzOC4zMTA2OTc4LDM0LjY1Mzg0MzYgTDMyLjY1Njg1NDIsMjkgWiBNMjcsNTMgQzQxLjM1OTQwMzUsNTMgNTMsNDEuMzU5NDAzNSA1MywyNyBDNTMsMTIuNjQwNTk2NSA0MS4zNTk0MDM1LDEgMjcsMSBDMTIuNjQwNTk2NSwxIDEsMTIuNjQwNTk2NSAxLDI3IEMxLDQxLjM1OTQwMzUgMTIuNjQwNTk2NSw1MyAyNyw1MyBaXCIgaWQ9XCJPdmFsLTJcIiBza2V0Y2g6dHlwZT1cIk1TU2hhcGVHcm91cFwiPjwvcGF0aD5cXG4gICAgICAgIDwvZz5cXG4gICAgICA8L2c+XFxuICAgIDwvc3ZnPlxcbiAgPC9kaXY+XFxuPC9kaXY+JyxcclxuXHJcblx0XHRcdFx0XHQvLyBFTkQgT1BUSU9OU1xyXG5cdFx0XHRcdFx0Ly8gKFJlcXVpcmVkIGJ5IHRoZSBkcm9wem9uZSBkb2N1bWVudGF0aW9uIHBhcnNlcilcclxuXHJcblx0XHRcdFx0XHQvKlxyXG4gICAgICAgICBUaG9zZSBmdW5jdGlvbnMgcmVnaXN0ZXIgdGhlbXNlbHZlcyB0byB0aGUgZXZlbnRzIG9uIGluaXQgYW5kIGhhbmRsZSBhbGxcclxuICAgICAgICAgdGhlIHVzZXIgaW50ZXJmYWNlIHNwZWNpZmljIHN0dWZmLiBPdmVyd3JpdGluZyB0aGVtIHdvbid0IGJyZWFrIHRoZSB1cGxvYWRcclxuICAgICAgICAgYnV0IGNhbiBicmVhayB0aGUgd2F5IGl0J3MgZGlzcGxheWVkLlxyXG4gICAgICAgICBZb3UgY2FuIG92ZXJ3cml0ZSB0aGVtIGlmIHlvdSBkb24ndCBsaWtlIHRoZSBkZWZhdWx0IGJlaGF2aW9yLiBJZiB5b3UganVzdFxyXG4gICAgICAgICB3YW50IHRvIGFkZCBhbiBhZGRpdGlvbmFsIGV2ZW50IGhhbmRsZXIsIHJlZ2lzdGVyIGl0IG9uIHRoZSBkcm9wem9uZSBvYmplY3RcclxuICAgICAgICAgYW5kIGRvbid0IG92ZXJ3cml0ZSB0aG9zZSBvcHRpb25zLlxyXG4gICAgICAgICAqL1xyXG5cclxuXHRcdFx0XHRcdC8vIFRob3NlIGFyZSBzZWxmIGV4cGxhbmF0b3J5IGFuZCBzaW1wbHkgY29uY2VybiB0aGUgRHJhZ25Ecm9wLlxyXG5cdFx0XHRcdFx0ZHJvcDogZnVuY3Rpb24gZHJvcChlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotZHJhZy1ob3ZlcicpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGRyYWdzdGFydDogZnVuY3Rpb24gZHJhZ3N0YXJ0KGUpIHt9LFxyXG5cdFx0XHRcdFx0ZHJhZ2VuZDogZnVuY3Rpb24gZHJhZ2VuZChlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotZHJhZy1ob3ZlcicpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGRyYWdlbnRlcjogZnVuY3Rpb24gZHJhZ2VudGVyKGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1kcmFnLWhvdmVyJyk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZHJhZ292ZXI6IGZ1bmN0aW9uIGRyYWdvdmVyKGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1kcmFnLWhvdmVyJyk7XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZHJhZ2xlYXZlOiBmdW5jdGlvbiBkcmFnbGVhdmUoZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWRyYWctaG92ZXInKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRwYXN0ZTogZnVuY3Rpb24gcGFzdGUoZSkge30sXHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIHRoZXJlIGFyZSBubyBmaWxlcyBsZWZ0IGluIHRoZSBkcm9wem9uZSBhbnltb3JlLCBhbmQgdGhlXHJcblx0XHRcdFx0XHQvLyBkcm9wem9uZSBzaG91bGQgYmUgZGlzcGxheWVkIGFzIGlmIGluIHRoZSBpbml0aWFsIHN0YXRlLlxyXG5cdFx0XHRcdFx0cmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LXN0YXJ0ZWQnKTtcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW4gYSBmaWxlIGlzIGFkZGVkIHRvIHRoZSBxdWV1ZVxyXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgXHJcblx0XHRcdFx0XHRhZGRlZGZpbGU6IGZ1bmN0aW9uIGFkZGVkZmlsZShmaWxlKSB7XHJcblx0XHRcdFx0XHRcdHZhciBfdGhpczIgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZWxlbWVudCA9PT0gdGhpcy5wcmV2aWV3c0NvbnRhaW5lcikge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1zdGFydGVkJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLnByZXZpZXdzQ29udGFpbmVyKSB7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3RWxlbWVudCA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQodGhpcy5vcHRpb25zLnByZXZpZXdUZW1wbGF0ZS50cmltKCkpO1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld1RlbXBsYXRlID0gZmlsZS5wcmV2aWV3RWxlbWVudDsgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcclxuXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wcmV2aWV3c0NvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxlLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjMgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LW5hbWVdJyksXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MyA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pMyA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjMgPSBfaXNBcnJheTMgPyBfaXRlcmF0b3IzIDogX2l0ZXJhdG9yM1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWYzO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMyA+PSBfaXRlcmF0b3IzLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWYzID0gX2l0ZXJhdG9yM1tfaTMrK107XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTMgPSBfaXRlcmF0b3IzLm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMy5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjMgPSBfaTMudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG5vZGUgPSBfcmVmMztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRub2RlLnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjQgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LXNpemVdJyksXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5NCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pNCA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjQgPSBfaXNBcnJheTQgPyBfaXRlcmF0b3I0IDogX2l0ZXJhdG9yNFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5NCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k0ID49IF9pdGVyYXRvcjQubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0bm9kZSA9IF9pdGVyYXRvcjRbX2k0KytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2k0ID0gX2l0ZXJhdG9yNC5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTQuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBfaTQudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0bm9kZS5pbm5lckhUTUwgPSB0aGlzLmZpbGVzaXplKGZpbGUuc2l6ZSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmFkZFJlbW92ZUxpbmtzKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRmaWxlLl9yZW1vdmVMaW5rID0gRHJvcHpvbmUuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0XHRcdFx0XHRcdFx0JzxhIGNsYXNzPVwiZHotcmVtb3ZlXCIgaHJlZj1cImphdmFzY3JpcHQ6dW5kZWZpbmVkO1wiIGRhdGEtZHotcmVtb3ZlPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZSArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvYT4nXHJcblx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChmaWxlLl9yZW1vdmVMaW5rKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciByZW1vdmVGaWxlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVGaWxlRXZlbnQoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBEcm9wem9uZS5jb25maXJtKF90aGlzMi5vcHRpb25zLmRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb24sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczIucmVtb3ZlRmlsZShmaWxlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMyLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gRHJvcHpvbmUuY29uZmlybShfdGhpczIub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLnJlbW92ZUZpbGUoZmlsZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMi5yZW1vdmVGaWxlKGZpbGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3I1ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei1yZW1vdmVdJyksXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5NSA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pNSA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjUgPSBfaXNBcnJheTUgPyBfaXRlcmF0b3I1IDogX2l0ZXJhdG9yNVtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWY0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNSA+PSBfaXRlcmF0b3I1Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY0ID0gX2l0ZXJhdG9yNVtfaTUrK107XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTUgPSBfaXRlcmF0b3I1Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjQgPSBfaTUudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlbW92ZUxpbmsgPSBfcmVmNDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRyZW1vdmVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlRmlsZUV2ZW50KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIGEgZmlsZSBpcyByZW1vdmVkLlxyXG5cdFx0XHRcdFx0cmVtb3ZlZGZpbGU6IGZ1bmN0aW9uIHJlbW92ZWRmaWxlKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQgIT0gbnVsbCAmJiBmaWxlLnByZXZpZXdFbGVtZW50LnBhcmVudE5vZGUgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmaWxlLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKTtcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW4gYSB0aHVtYm5haWwgaGFzIGJlZW4gZ2VuZXJhdGVkXHJcblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWAgYW5kIGBkYXRhVXJsYFxyXG5cdFx0XHRcdFx0dGh1bWJuYWlsOiBmdW5jdGlvbiB0aHVtYm5haWwoZmlsZSwgZGF0YVVybCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotZmlsZS1wcmV2aWV3Jyk7XHJcblx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3I2ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei10aHVtYm5haWxdJyksXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5NiA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pNiA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjYgPSBfaXNBcnJheTYgPyBfaXRlcmF0b3I2IDogX2l0ZXJhdG9yNltTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWY1O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTYpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNiA+PSBfaXRlcmF0b3I2Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY1ID0gX2l0ZXJhdG9yNltfaTYrK107XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTYgPSBfaXRlcmF0b3I2Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNi5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjUgPSBfaTYudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHRodW1ibmFpbEVsZW1lbnQgPSBfcmVmNTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHR0aHVtYm5haWxFbGVtZW50LmFsdCA9IGZpbGUubmFtZTtcclxuXHRcdFx0XHRcdFx0XHRcdHRodW1ibmFpbEVsZW1lbnQuc3JjID0gZGF0YVVybDtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotaW1hZ2UtcHJldmlldycpO1xyXG5cdFx0XHRcdFx0XHRcdH0sIDEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuZXZlciBhbiBlcnJvciBvY2N1cnNcclxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYCBhbmQgYG1lc3NhZ2VgXHJcblx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gZXJyb3IoZmlsZSwgbWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotZXJyb3InKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdTdHJpbmcnICYmIG1lc3NhZ2UuZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2UgPSBtZXNzYWdlLmVycm9yO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjcgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LWVycm9ybWVzc2FnZV0nKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXk3ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2k3ID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yNyA9IF9pc0FycmF5NyA/IF9pdGVyYXRvcjcgOiBfaXRlcmF0b3I3W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjY7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5Nykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k3ID49IF9pdGVyYXRvcjcubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjYgPSBfaXRlcmF0b3I3W19pNysrXTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pNyA9IF9pdGVyYXRvcjcubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k3LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmNiA9IF9pNy52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgbm9kZSA9IF9yZWY2O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdG5vZGUudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9ybXVsdGlwbGU6IGZ1bmN0aW9uIGVycm9ybXVsdGlwbGUoKSB7fSxcclxuXHJcblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbiBhIGZpbGUgZ2V0cyBwcm9jZXNzZWQuIFNpbmNlIHRoZXJlIGlzIGEgY3VlLCBub3QgYWxsIGFkZGVkXHJcblx0XHRcdFx0XHQvLyBmaWxlcyBhcmUgcHJvY2Vzc2VkIGltbWVkaWF0ZWx5LlxyXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgXHJcblx0XHRcdFx0XHRwcm9jZXNzaW5nOiBmdW5jdGlvbiBwcm9jZXNzaW5nKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LXByb2Nlc3NpbmcnKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZmlsZS5fcmVtb3ZlTGluaykge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChmaWxlLl9yZW1vdmVMaW5rLnRleHRDb250ZW50ID0gdGhpcy5vcHRpb25zLmRpY3RDYW5jZWxVcGxvYWQpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHByb2Nlc3NpbmdtdWx0aXBsZTogZnVuY3Rpb24gcHJvY2Vzc2luZ211bHRpcGxlKCkge30sXHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIHRoZSB1cGxvYWQgcHJvZ3Jlc3MgZ2V0cyB1cGRhdGVkLlxyXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgLCBgcHJvZ3Jlc3NgIChwZXJjZW50YWdlIDAtMTAwKSBhbmQgYGJ5dGVzU2VudGAuXHJcblx0XHRcdFx0XHQvLyBUbyBnZXQgdGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyBvZiB0aGUgZmlsZSwgdXNlIGBmaWxlLnNpemVgXHJcblx0XHRcdFx0XHR1cGxvYWRwcm9ncmVzczogZnVuY3Rpb24gdXBsb2FkcHJvZ3Jlc3MoZmlsZSwgcHJvZ3Jlc3MsIGJ5dGVzU2VudCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yOCA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHotdXBsb2FkcHJvZ3Jlc3NdJyksXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5OCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pOCA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjggPSBfaXNBcnJheTggPyBfaXRlcmF0b3I4IDogX2l0ZXJhdG9yOFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWY3O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pOCA+PSBfaXRlcmF0b3I4Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY3ID0gX2l0ZXJhdG9yOFtfaTgrK107XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTggPSBfaXRlcmF0b3I4Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pOC5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjcgPSBfaTgudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG5vZGUgPSBfcmVmNztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lID09PSAnUFJPR1JFU1MnID8gKG5vZGUudmFsdWUgPSBwcm9ncmVzcykgOiAobm9kZS5zdHlsZS53aWR0aCA9IHByb2dyZXNzICsgJyUnKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIHRoZSB0b3RhbCB1cGxvYWQgcHJvZ3Jlc3MgZ2V0cyB1cGRhdGVkLlxyXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdpdGggdG90YWxVcGxvYWRQcm9ncmVzcyAoMC0xMDApLCB0b3RhbEJ5dGVzIGFuZCB0b3RhbEJ5dGVzU2VudFxyXG5cdFx0XHRcdFx0dG90YWx1cGxvYWRwcm9ncmVzczogZnVuY3Rpb24gdG90YWx1cGxvYWRwcm9ncmVzcygpIHt9LFxyXG5cclxuXHRcdFx0XHRcdC8vIENhbGxlZCBqdXN0IGJlZm9yZSB0aGUgZmlsZSBpcyBzZW50LiBHZXRzIHRoZSBgeGhyYCBvYmplY3QgYXMgc2Vjb25kXHJcblx0XHRcdFx0XHQvLyBwYXJhbWV0ZXIsIHNvIHlvdSBjYW4gbW9kaWZ5IGl0IChmb3IgZXhhbXBsZSB0byBhZGQgYSBDU1JGIHRva2VuKSBhbmQgYVxyXG5cdFx0XHRcdFx0Ly8gYGZvcm1EYXRhYCBvYmplY3QgdG8gYWRkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXHJcblx0XHRcdFx0XHRzZW5kaW5nOiBmdW5jdGlvbiBzZW5kaW5nKCkge30sXHJcblx0XHRcdFx0XHRzZW5kaW5nbXVsdGlwbGU6IGZ1bmN0aW9uIHNlbmRpbmdtdWx0aXBsZSgpIHt9LFxyXG5cclxuXHRcdFx0XHRcdC8vIFdoZW4gdGhlIGNvbXBsZXRlIHVwbG9hZCBpcyBmaW5pc2hlZCBhbmQgc3VjY2Vzc2Z1bFxyXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgXHJcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1zdWNjZXNzJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRzdWNjZXNzbXVsdGlwbGU6IGZ1bmN0aW9uIHN1Y2Nlc3NtdWx0aXBsZSgpIHt9LFxyXG5cclxuXHRcdFx0XHRcdC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBjYW5jZWxlZC5cclxuXHRcdFx0XHRcdGNhbmNlbGVkOiBmdW5jdGlvbiBjYW5jZWxlZChmaWxlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgZmlsZSwgJ1VwbG9hZCBjYW5jZWxlZC4nKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjYW5jZWxlZG11bHRpcGxlOiBmdW5jdGlvbiBjYW5jZWxlZG11bHRpcGxlKCkge30sXHJcblxyXG5cdFx0XHRcdFx0Ly8gV2hlbiB0aGUgdXBsb2FkIGlzIGZpbmlzaGVkLCBlaXRoZXIgd2l0aCBzdWNjZXNzIG9yIGFuIGVycm9yLlxyXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgXHJcblx0XHRcdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5fcmVtb3ZlTGluaykge1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUuX3JlbW92ZUxpbmsudGV4dENvbnRlbnQgPSB0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1jb21wbGV0ZScpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y29tcGxldGVtdWx0aXBsZTogZnVuY3Rpb24gY29tcGxldGVtdWx0aXBsZSgpIHt9LFxyXG5cdFx0XHRcdFx0bWF4ZmlsZXNleGNlZWRlZDogZnVuY3Rpb24gbWF4ZmlsZXNleGNlZWRlZCgpIHt9LFxyXG5cdFx0XHRcdFx0bWF4ZmlsZXNyZWFjaGVkOiBmdW5jdGlvbiBtYXhmaWxlc3JlYWNoZWQoKSB7fSxcclxuXHRcdFx0XHRcdHF1ZXVlY29tcGxldGU6IGZ1bmN0aW9uIHF1ZXVlY29tcGxldGUoKSB7fSxcclxuXHRcdFx0XHRcdGFkZGVkZmlsZXM6IGZ1bmN0aW9uIGFkZGVkZmlsZXMoKSB7fSxcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5fdGh1bWJuYWlsUXVldWUgPSBbXTtcclxuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IGZhbHNlO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gZ2xvYmFsIHV0aWxpdHlcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2V4dGVuZCcsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBleHRlbmQodGFyZ2V0KSB7XHJcblx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIG9iamVjdHMgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxO1xyXG5cdFx0XHRcdFx0X2tleTIgPCBfbGVuMjtcclxuXHRcdFx0XHRcdF9rZXkyKytcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdG9iamVjdHNbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjkgPSBvYmplY3RzLFxyXG5cdFx0XHRcdFx0XHRfaXNBcnJheTkgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRfaTkgPSAwLFxyXG5cdFx0XHRcdFx0XHRfaXRlcmF0b3I5ID0gX2lzQXJyYXk5ID8gX2l0ZXJhdG9yOSA6IF9pdGVyYXRvcjlbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdHZhciBfcmVmODtcclxuXHJcblx0XHRcdFx0XHRpZiAoX2lzQXJyYXk5KSB7XHJcblx0XHRcdFx0XHRcdGlmIChfaTkgPj0gX2l0ZXJhdG9yOS5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRfcmVmOCA9IF9pdGVyYXRvcjlbX2k5KytdO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0X2k5ID0gX2l0ZXJhdG9yOS5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdGlmIChfaTkuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdF9yZWY4ID0gX2k5LnZhbHVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBvYmplY3QgPSBfcmVmODtcclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XHJcblx0XHRcdFx0XHRcdHZhciB2YWwgPSBvYmplY3Rba2V5XTtcclxuXHRcdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSB2YWw7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiB0YXJnZXQ7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdF0pO1xyXG5cclxuXHRmdW5jdGlvbiBEcm9wem9uZShlbCwgb3B0aW9ucykge1xyXG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyb3B6b25lKTtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRHJvcHpvbmUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEcm9wem9uZSkpLmNhbGwodGhpcykpO1xyXG5cclxuXHRcdHZhciBmYWxsYmFjayA9IHZvaWQgMCxcclxuXHRcdFx0bGVmdCA9IHZvaWQgMDtcclxuXHRcdF90aGlzLmVsZW1lbnQgPSBlbDtcclxuXHRcdC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBzaW5jZSB0aGUgdmVyc2lvbiB3YXMgaW4gdGhlIHByb3RvdHlwZSBwcmV2aW91c2x5XHJcblx0XHRfdGhpcy52ZXJzaW9uID0gRHJvcHpvbmUudmVyc2lvbjtcclxuXHJcblx0XHRfdGhpcy5kZWZhdWx0T3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUgPSBfdGhpcy5kZWZhdWx0T3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUucmVwbGFjZSgvXFxuKi9nLCAnJyk7XHJcblxyXG5cdFx0X3RoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBbXTtcclxuXHRcdF90aGlzLmxpc3RlbmVycyA9IFtdO1xyXG5cdFx0X3RoaXMuZmlsZXMgPSBbXTsgLy8gQWxsIGZpbGVzXHJcblxyXG5cdFx0aWYgKHR5cGVvZiBfdGhpcy5lbGVtZW50ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRfdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihfdGhpcy5lbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOb3QgY2hlY2tpbmcgaWYgaW5zdGFuY2Ugb2YgSFRNTEVsZW1lbnQgb3IgRWxlbWVudCBzaW5jZSBJRTkgaXMgZXh0cmVtZWx5IHdlaXJkLlxyXG5cdFx0aWYgKCFfdGhpcy5lbGVtZW50IHx8IF90aGlzLmVsZW1lbnQubm9kZVR5cGUgPT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZHJvcHpvbmUgZWxlbWVudC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoX3RoaXMuZWxlbWVudC5kcm9wem9uZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Ryb3B6b25lIGFscmVhZHkgYXR0YWNoZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTm93IGFkZCB0aGlzIGRyb3B6b25lIHRvIHRoZSBpbnN0YW5jZXMuXHJcblx0XHREcm9wem9uZS5pbnN0YW5jZXMucHVzaChfdGhpcyk7XHJcblxyXG5cdFx0Ly8gUHV0IHRoZSBkcm9wem9uZSBpbnNpZGUgdGhlIGVsZW1lbnQgaXRzZWxmLlxyXG5cdFx0X3RoaXMuZWxlbWVudC5kcm9wem9uZSA9IF90aGlzO1xyXG5cclxuXHRcdHZhciBlbGVtZW50T3B0aW9ucyA9IChsZWZ0ID0gRHJvcHpvbmUub3B0aW9uc0ZvckVsZW1lbnQoX3RoaXMuZWxlbWVudCkpICE9IG51bGwgPyBsZWZ0IDoge307XHJcblxyXG5cdFx0X3RoaXMub3B0aW9ucyA9IERyb3B6b25lLmV4dGVuZCh7fSwgX3RoaXMuZGVmYXVsdE9wdGlvbnMsIGVsZW1lbnRPcHRpb25zLCBvcHRpb25zICE9IG51bGwgPyBvcHRpb25zIDoge30pO1xyXG5cclxuXHRcdC8vIElmIHRoZSBicm93c2VyIGZhaWxlZCwganVzdCBjYWxsIHRoZSBmYWxsYmFjayBhbmQgbGVhdmVcclxuXHRcdGlmIChfdGhpcy5vcHRpb25zLmZvcmNlRmFsbGJhY2sgfHwgIURyb3B6b25lLmlzQnJvd3NlclN1cHBvcnRlZCgpKSB7XHJcblx0XHRcdHZhciBfcmV0O1xyXG5cclxuXHRcdFx0cmV0dXJuIChfcmV0ID0gX3RoaXMub3B0aW9ucy5mYWxsYmFjay5jYWxsKF90aGlzKSksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBAb3B0aW9ucy51cmwgPSBAZWxlbWVudC5nZXRBdHRyaWJ1dGUgXCJhY3Rpb25cIiB1bmxlc3MgQG9wdGlvbnMudXJsP1xyXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMudXJsID09IG51bGwpIHtcclxuXHRcdFx0X3RoaXMub3B0aW9ucy51cmwgPSBfdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnYWN0aW9uJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFfdGhpcy5vcHRpb25zLnVybCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vIFVSTCBwcm92aWRlZC4nKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5hY2NlcHRlZEZpbGVzICYmIF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRNaW1lVHlwZXMpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxyXG5cdFx0XHRcdFwiWW91IGNhbid0IHByb3ZpZGUgYm90aCAnYWNjZXB0ZWRGaWxlcycgYW5kICdhY2NlcHRlZE1pbWVUeXBlcycuICdhY2NlcHRlZE1pbWVUeXBlcycgaXMgZGVwcmVjYXRlZC5cIlxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChfdGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlICYmIF90aGlzLm9wdGlvbnMuY2h1bmtpbmcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdZb3UgY2Fubm90IHNldCBib3RoOiB1cGxvYWRNdWx0aXBsZSBhbmQgY2h1bmtpbmcuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcclxuXHRcdGlmIChfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzKSB7XHJcblx0XHRcdF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyA9IF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRNaW1lVHlwZXM7XHJcblx0XHRcdGRlbGV0ZSBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XHJcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5yZW5hbWVGaWxlbmFtZSAhPSBudWxsKSB7XHJcblx0XHRcdF90aGlzLm9wdGlvbnMucmVuYW1lRmlsZSA9IGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gX3RoaXMub3B0aW9ucy5yZW5hbWVGaWxlbmFtZS5jYWxsKF90aGlzLCBmaWxlLm5hbWUsIGZpbGUpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdF90aGlzLm9wdGlvbnMubWV0aG9kID0gX3RoaXMub3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHRpZiAoKGZhbGxiYWNrID0gX3RoaXMuZ2V0RXhpc3RpbmdGYWxsYmFjaygpKSAmJiBmYWxsYmFjay5wYXJlbnROb2RlKSB7XHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgZmFsbGJhY2tcclxuXHRcdFx0ZmFsbGJhY2sucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmYWxsYmFjayk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGlzcGxheSBwcmV2aWV3cyBpbiB0aGUgcHJldmlld3NDb250YWluZXIgZWxlbWVudCBvciB0aGUgRHJvcHpvbmUgZWxlbWVudCB1bmxlc3MgZXhwbGljaXRseSBzZXQgdG8gZmFsc2VcclxuXHRcdGlmIChfdGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyICE9PSBmYWxzZSkge1xyXG5cdFx0XHRpZiAoX3RoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lcikge1xyXG5cdFx0XHRcdF90aGlzLnByZXZpZXdzQ29udGFpbmVyID0gRHJvcHpvbmUuZ2V0RWxlbWVudChfdGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyLCAncHJldmlld3NDb250YWluZXInKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRfdGhpcy5wcmV2aWV3c0NvbnRhaW5lciA9IF90aGlzLmVsZW1lbnQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5jbGlja2FibGUpIHtcclxuXHRcdFx0aWYgKF90aGlzLm9wdGlvbnMuY2xpY2thYmxlID09PSB0cnVlKSB7XHJcblx0XHRcdFx0X3RoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBbX3RoaXMuZWxlbWVudF07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3RoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBEcm9wem9uZS5nZXRFbGVtZW50cyhfdGhpcy5vcHRpb25zLmNsaWNrYWJsZSwgJ2NsaWNrYWJsZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0X3RoaXMuaW5pdCgpO1xyXG5cdFx0cmV0dXJuIF90aGlzO1xyXG5cdH1cclxuXHJcblx0Ly8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBoYXZlIGJlZW4gYWNjZXB0ZWRcclxuXHJcblx0X2NyZWF0ZUNsYXNzKFxyXG5cdFx0RHJvcHpvbmUsXHJcblx0XHRbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdnZXRBY2NlcHRlZEZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0QWNjZXB0ZWRGaWxlcygpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbGVzXHJcblx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlLmFjY2VwdGVkO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBoYXZlIGJlZW4gcmVqZWN0ZWRcclxuXHRcdFx0XHQvLyBOb3Qgc3VyZSB3aGVuIHRoYXQncyBnb2luZyB0byBiZSB1c2VmdWwsIGJ1dCBhZGRlZCBmb3IgY29tcGxldGVuZXNzLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZ2V0UmVqZWN0ZWRGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFJlamVjdGVkRmlsZXMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maWxlc1xyXG5cdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gIWZpbGUuYWNjZXB0ZWQ7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZ2V0RmlsZXNXaXRoU3RhdHVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0RmlsZXNXaXRoU3RhdHVzKHN0YXR1cykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZmlsZXNcclxuXHRcdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUuc3RhdHVzID09PSBzdGF0dXM7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGFyZSBpbiB0aGUgcXVldWVcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2dldFF1ZXVlZEZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0UXVldWVkRmlsZXMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoRHJvcHpvbmUuUVVFVUVEKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnZ2V0VXBsb2FkaW5nRmlsZXMnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRVcGxvYWRpbmdGaWxlcygpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cyhEcm9wem9uZS5VUExPQURJTkcpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdnZXRBZGRlZEZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0QWRkZWRGaWxlcygpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cyhEcm9wem9uZS5BRERFRCk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gRmlsZXMgdGhhdCBhcmUgZWl0aGVyIHF1ZXVlZCBvciB1cGxvYWRpbmdcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2dldEFjdGl2ZUZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0QWN0aXZlRmlsZXMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maWxlc1xyXG5cdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORyB8fCBmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuUVVFVUVEO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiBEcm9wem9uZSBpcyBpbml0aWFsaXplZC4gWW91XHJcblx0XHRcdFx0Ly8gY2FuIChhbmQgc2hvdWxkKSBzZXR1cCBldmVudCBsaXN0ZW5lcnMgaW5zaWRlIHRoaXMgZnVuY3Rpb24uXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdpbml0JyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczMgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdC8vIEluIGNhc2UgaXQgaXNuJ3Qgc2V0IGFscmVhZHlcclxuXHRcdFx0XHRcdGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gJ2Zvcm0nKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2VuY3R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wem9uZScpICYmICF0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR6LW1lc3NhZ2UnKSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcblx0XHRcdFx0XHRcdFx0RHJvcHpvbmUuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZHotZGVmYXVsdCBkei1tZXNzYWdlXCI+PHNwYW4+JyArIHRoaXMub3B0aW9ucy5kaWN0RGVmYXVsdE1lc3NhZ2UgKyAnPC9zcGFuPjwvZGl2PidcclxuXHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY2xpY2thYmxlRWxlbWVudHMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZXR1cEhpZGRlbkZpbGVJbnB1dCA9IGZ1bmN0aW9uIHNldHVwSGlkZGVuRmlsZUlucHV0KCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfdGhpczMuaGlkZGVuRmlsZUlucHV0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoX3RoaXMzLmhpZGRlbkZpbGVJbnB1dCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyB2YXIgZHJvcFpvbmVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kei1oaWRkZW4taW5wdXQnKTtcclxuXHRcdFx0XHRcdFx0XHQvLyBpZiAoZHJvcFpvbmVJbnB1dCkgeyBkcm9wWm9uZUlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSkgfTtcclxuXHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZmlsZScpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfdGhpczMub3B0aW9ucy5tYXhGaWxlcyA9PT0gbnVsbCB8fCBfdGhpczMub3B0aW9ucy5tYXhGaWxlcyA+IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKCdtdWx0aXBsZScsICdtdWx0aXBsZScpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LmNsYXNzTmFtZSA9ICdkei1oaWRkZW4taW5wdXQnO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2FjY2VwdCcsIF90aGlzMy5vcHRpb25zLmFjY2VwdGVkRmlsZXMpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMzLm9wdGlvbnMuY2FwdHVyZSAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NhcHR1cmUnLCBfdGhpczMub3B0aW9ucy5jYXB0dXJlKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIE5vdCBzZXR0aW5nIGBkaXNwbGF5PVwibm9uZVwiYCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgZG9uJ3QgYWNjZXB0IGNsaWNrc1xyXG5cdFx0XHRcdFx0XHRcdC8vIG9uIGVsZW1lbnRzIHRoYXQgYXJlbid0IGRpc3BsYXllZC5cclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnRvcCA9ICcwJztcclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLmxlZnQgPSAnMCc7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5oZWlnaHQgPSAnMCc7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS53aWR0aCA9ICcwJztcclxuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKF90aGlzMy5vcHRpb25zLmhpZGRlbklucHV0Q29udGFpbmVyKS5hcHBlbmRDaGlsZChfdGhpczMuaGlkZGVuRmlsZUlucHV0KTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBmaWxlcyA9IF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuZmlsZXM7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGZpbGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxMCA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxMCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfaTEwID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjEwID0gX2lzQXJyYXkxMCA/IF9pdGVyYXRvcjEwIDogX2l0ZXJhdG9yMTBbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmOTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTEwID49IF9pdGVyYXRvcjEwLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmOSA9IF9pdGVyYXRvcjEwW19pMTArK107XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9pMTAgPSBfaXRlcmF0b3IxMC5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxMC5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWY5ID0gX2kxMC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMy5hZGRGaWxlKGZpbGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRfdGhpczMuZW1pdCgnYWRkZWRmaWxlcycsIGZpbGVzKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHRzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuVVJMID0gd2luZG93LlVSTCAhPT0gbnVsbCA/IHdpbmRvdy5VUkwgOiB3aW5kb3cud2Via2l0VVJMO1xyXG5cclxuXHRcdFx0XHRcdC8vIFNldHVwIGFsbCBldmVudCBsaXN0ZW5lcnMgb24gdGhlIERyb3B6b25lIG9iamVjdCBpdHNlbGYuXHJcblx0XHRcdFx0XHQvLyBUaGV5J3JlIG5vdCBpbiBAc2V0dXBFdmVudExpc3RlbmVycygpIGJlY2F1c2UgdGhleSBzaG91bGRuJ3QgYmUgcmVtb3ZlZFxyXG5cdFx0XHRcdFx0Ly8gYWdhaW4gd2hlbiB0aGUgZHJvcHpvbmUgZ2V0cyBkaXNhYmxlZC5cclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxMSA9IHRoaXMuZXZlbnRzLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MTEgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMTEgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjExID0gX2lzQXJyYXkxMSA/IF9pdGVyYXRvcjExIDogX2l0ZXJhdG9yMTFbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMTA7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxMSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTExID49IF9pdGVyYXRvcjExLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjEwID0gX2l0ZXJhdG9yMTFbX2kxMSsrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTExID0gX2l0ZXJhdG9yMTEubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTExLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYxMCA9IF9pMTEudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBldmVudE5hbWUgPSBfcmVmMTA7XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLm9uKGV2ZW50TmFtZSwgdGhpcy5vcHRpb25zW2V2ZW50TmFtZV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMub24oJ3VwbG9hZHByb2dyZXNzJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMudXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5vbigncmVtb3ZlZGZpbGUnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy51cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLm9uKCdjYW5jZWxlZCcsIGZ1bmN0aW9uKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdjb21wbGV0ZScsIGZpbGUpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRW1pdCBhIGBxdWV1ZWNvbXBsZXRlYCBldmVudCBpZiBhbGwgZmlsZXMgZmluaXNoZWQgdXBsb2FkaW5nLlxyXG5cdFx0XHRcdFx0dGhpcy5vbignY29tcGxldGUnLCBmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0XHRfdGhpczMuZ2V0QWRkZWRGaWxlcygpLmxlbmd0aCA9PT0gMCAmJlxyXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aCA9PT0gMCAmJlxyXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5nZXRRdWV1ZWRGaWxlcygpLmxlbmd0aCA9PT0gMFxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIG5lZWRzIHRvIGJlIGRlZmVycmVkIHNvIHRoYXQgYHF1ZXVlY29tcGxldGVgIHJlYWxseSB0cmlnZ2VycyBhZnRlciBgY29tcGxldGVgXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmVtaXQoJ3F1ZXVlY29tcGxldGUnKTtcclxuXHRcdFx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0dmFyIG5vUHJvcGFnYXRpb24gPSBmdW5jdGlvbiBub1Byb3BhZ2F0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdFx0aWYgKGUucHJldmVudERlZmF1bHQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiAoZS5yZXR1cm5WYWx1ZSA9IGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyBDcmVhdGUgdGhlIGxpc3RlbmVyc1xyXG5cdFx0XHRcdFx0dGhpcy5saXN0ZW5lcnMgPSBbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiB0aGlzLmVsZW1lbnQsXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnRzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRkcmFnc3RhcnQ6IGZ1bmN0aW9uIGRyYWdzdGFydChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ3N0YXJ0JywgZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ2VudGVyOiBmdW5jdGlvbiBkcmFnZW50ZXIoZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRub1Byb3BhZ2F0aW9uKGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmVtaXQoJ2RyYWdlbnRlcicsIGUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRcdGRyYWdvdmVyOiBmdW5jdGlvbiBkcmFnb3ZlcihlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIE1ha2VzIGl0IHBvc3NpYmxlIHRvIGRyYWcgZmlsZXMgZnJvbSBjaHJvbWUncyBkb3dubG9hZCBiYXJcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xOTUyNjQzMC9kcmFnLWFuZC1kcm9wLWZpbGUtdXBsb2Fkcy1mcm9tLWNocm9tZS1kb3dubG9hZHMtYmFyXHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIFRyeSBpcyByZXF1aXJlZCB0byBwcmV2ZW50IGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMSAoU0NSSVBUNjU1MzUgZXhjZXB0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgZWZjdCA9IHZvaWQgMDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlZmN0ID0gZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHt9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZScgPT09IGVmY3QgfHwgJ2xpbmtNb3ZlJyA9PT0gZWZjdCA/ICdtb3ZlJyA6ICdjb3B5JztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdG5vUHJvcGFnYXRpb24oZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ292ZXInLCBlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRkcmFnbGVhdmU6IGZ1bmN0aW9uIGRyYWdsZWF2ZShlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ2xlYXZlJywgZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdFx0ZHJvcDogZnVuY3Rpb24gZHJvcChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG5vUHJvcGFnYXRpb24oZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZHJvcChlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0XHRkcmFnZW5kOiBmdW5jdGlvbiBkcmFnZW5kKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdkcmFnZW5kJywgZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgZGlzYWJsZWQgcmlnaHQgbm93LCBiZWNhdXNlIHRoZSBicm93c2VycyBkb24ndCBpbXBsZW1lbnQgaXQgcHJvcGVybHkuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBcInBhc3RlXCI6IChlKSA9PlxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gICBub1Byb3BhZ2F0aW9uIGVcclxuXHRcdFx0XHRcdFx0XHRcdC8vICAgQHBhc3RlIGVcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oY2xpY2thYmxlRWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmxpc3RlbmVycy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiBjbGlja2FibGVFbGVtZW50LFxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50czoge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGV2dCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IHRoZSBhY3R1YWwgZHJvcHpvbmUgb3IgdGhlIG1lc3NhZ2UgZWxlbWVudCBzaG91bGQgdHJpZ2dlciBmaWxlIHNlbGVjdGlvblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xpY2thYmxlRWxlbWVudCAhPT0gX3RoaXMzLmVsZW1lbnQgfHxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRldnQudGFyZ2V0ID09PSBfdGhpczMuZWxlbWVudCB8fFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdERyb3B6b25lLmVsZW1lbnRJbnNpZGUoZXZ0LnRhcmdldCwgX3RoaXMzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmR6LW1lc3NhZ2UnKSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5jbGljaygpOyAvLyBGb3J3YXJkIHRoZSBjbGlja1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuZW5hYmxlKCk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5pbml0LmNhbGwodGhpcyk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gTm90IGZ1bGx5IHRlc3RlZCB5ZXRcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2Rlc3Ryb3knLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG5cdFx0XHRcdFx0dGhpcy5kaXNhYmxlKCk7XHJcblx0XHRcdFx0XHR0aGlzLnJlbW92ZUFsbEZpbGVzKHRydWUpO1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaGlkZGVuRmlsZUlucHV0ICE9IG51bGwgPyB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlIDogdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaGlkZGVuRmlsZUlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5oaWRkZW5GaWxlSW5wdXQpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmhpZGRlbkZpbGVJbnB1dCA9IG51bGw7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50LmRyb3B6b25lO1xyXG5cdFx0XHRcdFx0cmV0dXJuIERyb3B6b25lLmluc3RhbmNlcy5zcGxpY2UoRHJvcHpvbmUuaW5zdGFuY2VzLmluZGV4T2YodGhpcyksIDEpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICd1cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpIHtcclxuXHRcdFx0XHRcdHZhciB0b3RhbFVwbG9hZFByb2dyZXNzID0gdm9pZCAwO1xyXG5cdFx0XHRcdFx0dmFyIHRvdGFsQnl0ZXNTZW50ID0gMDtcclxuXHRcdFx0XHRcdHZhciB0b3RhbEJ5dGVzID0gMDtcclxuXHJcblx0XHRcdFx0XHR2YXIgYWN0aXZlRmlsZXMgPSB0aGlzLmdldEFjdGl2ZUZpbGVzKCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGFjdGl2ZUZpbGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxMiA9IHRoaXMuZ2V0QWN0aXZlRmlsZXMoKSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTIgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2kxMiA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxMiA9IF9pc0FycmF5MTIgPyBfaXRlcmF0b3IxMiA6IF9pdGVyYXRvcjEyW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjExO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxMikge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTIgPj0gX2l0ZXJhdG9yMTIubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYxMSA9IF9pdGVyYXRvcjEyW19pMTIrK107XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdF9pMTIgPSBfaXRlcmF0b3IxMi5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxMi5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYxMSA9IF9pMTIudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYxMTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dG90YWxCeXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuYnl0ZXNTZW50O1xyXG5cdFx0XHRcdFx0XHRcdHRvdGFsQnl0ZXMgKz0gZmlsZS51cGxvYWQudG90YWw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dG90YWxVcGxvYWRQcm9ncmVzcyA9ICgxMDAgKiB0b3RhbEJ5dGVzU2VudCkgLyB0b3RhbEJ5dGVzO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dG90YWxVcGxvYWRQcm9ncmVzcyA9IDEwMDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbWl0KCd0b3RhbHVwbG9hZHByb2dyZXNzJywgdG90YWxVcGxvYWRQcm9ncmVzcywgdG90YWxCeXRlcywgdG90YWxCeXRlc1NlbnQpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIEBvcHRpb25zLnBhcmFtTmFtZSBjYW4gYmUgYSBmdW5jdGlvbiB0YWtpbmcgb25lIHBhcmFtZXRlciByYXRoZXIgdGhhbiBhIHN0cmluZy5cclxuXHRcdFx0XHQvLyBBIHBhcmFtZXRlciBuYW1lIGZvciBhIGZpbGUgaXMgb2J0YWluZWQgc2ltcGx5IGJ5IGNhbGxpbmcgdGhpcyB3aXRoIGFuIGluZGV4IG51bWJlci5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19nZXRQYXJhbU5hbWUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZ2V0UGFyYW1OYW1lKG4pIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnBhcmFtTmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtTmFtZShuKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAnJyArIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUgKyAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gJ1snICsgbiArICddJyA6ICcnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBJZiBAb3B0aW9ucy5yZW5hbWVGaWxlIGlzIGEgZnVuY3Rpb24sXHJcblx0XHRcdFx0Ly8gdGhlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCB0byByZW5hbWUgdGhlIGZpbGUubmFtZSBiZWZvcmUgYXBwZW5kaW5nIGl0IHRvIHRoZSBmb3JtRGF0YVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX3JlbmFtZUZpbGUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfcmVuYW1lRmlsZShmaWxlKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmaWxlLm5hbWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUoZmlsZSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gUmV0dXJucyBhIGZvcm0gdGhhdCBjYW4gYmUgdXNlZCBhcyBmYWxsYmFjayBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IERyYWduRHJvcFxyXG5cdFx0XHRcdC8vXHJcblx0XHRcdFx0Ly8gSWYgdGhlIGRyb3B6b25lIGlzIGFscmVhZHkgYSBmb3JtLCBvbmx5IHRoZSBpbnB1dCBmaWVsZCBhbmQgYnV0dG9uIGFyZSByZXR1cm5lZC4gT3RoZXJ3aXNlIGEgY29tcGxldGUgZm9ybSBlbGVtZW50IGlzIHByb3ZpZGVkLlxyXG5cdFx0XHRcdC8vIFRoaXMgY29kZSBoYXMgdG8gcGFzcyBpbiBJRTcgOihcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2dldEZhbGxiYWNrRm9ybScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEZhbGxiYWNrRm9ybSgpIHtcclxuXHRcdFx0XHRcdHZhciBleGlzdGluZ0ZhbGxiYWNrID0gdm9pZCAwLFxyXG5cdFx0XHRcdFx0XHRmb3JtID0gdm9pZCAwO1xyXG5cdFx0XHRcdFx0aWYgKChleGlzdGluZ0ZhbGxiYWNrID0gdGhpcy5nZXRFeGlzdGluZ0ZhbGxiYWNrKCkpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBleGlzdGluZ0ZhbGxiYWNrO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBmaWVsZHNTdHJpbmcgPSAnPGRpdiBjbGFzcz1cImR6LWZhbGxiYWNrXCI+JztcclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrVGV4dCkge1xyXG5cdFx0XHRcdFx0XHRmaWVsZHNTdHJpbmcgKz0gJzxwPicgKyB0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrVGV4dCArICc8L3A+JztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGZpZWxkc1N0cmluZyArPVxyXG5cdFx0XHRcdFx0XHQnPGlucHV0IHR5cGU9XCJmaWxlXCIgbmFtZT1cIicgK1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9nZXRQYXJhbU5hbWUoMCkgK1xyXG5cdFx0XHRcdFx0XHQnXCIgJyArXHJcblx0XHRcdFx0XHRcdCh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUgPyAnbXVsdGlwbGU9XCJtdWx0aXBsZVwiJyA6IHVuZGVmaW5lZCkgK1xyXG5cdFx0XHRcdFx0XHQnIC8+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlVwbG9hZCFcIj48L2Rpdj4nO1xyXG5cclxuXHRcdFx0XHRcdHZhciBmaWVsZHMgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KGZpZWxkc1N0cmluZyk7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgIT09ICdGT1JNJykge1xyXG5cdFx0XHRcdFx0XHRmb3JtID0gRHJvcHpvbmUuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0XHRcdFx0XHQnPGZvcm0gYWN0aW9uPVwiJyArXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMudXJsICtcclxuXHRcdFx0XHRcdFx0XHRcdCdcIiBlbmN0eXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIG1ldGhvZD1cIicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLm1ldGhvZCArXHJcblx0XHRcdFx0XHRcdFx0XHQnXCI+PC9mb3JtPidcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0Zm9ybS5hcHBlbmRDaGlsZChmaWVsZHMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGVuY3R5cGUgYW5kIG1ldGhvZCBhdHRyaWJ1dGVzIGFyZSBzZXQgcHJvcGVybHlcclxuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZW5jdHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJyk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsIHRoaXMub3B0aW9ucy5tZXRob2QpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZvcm0gIT0gbnVsbCA/IGZvcm0gOiBmaWVsZHM7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gUmV0dXJucyB0aGUgZmFsbGJhY2sgZWxlbWVudHMgaWYgdGhleSBleGlzdCBhbHJlYWR5XHJcblx0XHRcdFx0Ly9cclxuXHRcdFx0XHQvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdnZXRFeGlzdGluZ0ZhbGxiYWNrJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0RXhpc3RpbmdGYWxsYmFjaygpIHtcclxuXHRcdFx0XHRcdHZhciBnZXRGYWxsYmFjayA9IGZ1bmN0aW9uIGdldEZhbGxiYWNrKGVsZW1lbnRzKSB7XHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjEzID0gZWxlbWVudHMsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTEzID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMTMgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTMgPSBfaXNBcnJheTEzID8gX2l0ZXJhdG9yMTMgOiBfaXRlcmF0b3IxM1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxMjtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTEzID49IF9pdGVyYXRvcjEzLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTIgPSBfaXRlcmF0b3IxM1tfaTEzKytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTEzID0gX2l0ZXJhdG9yMTMubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTMuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTIgPSBfaTEzLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGVsID0gX3JlZjEyO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoLyhefCApZmFsbGJhY2soJHwgKS8udGVzdChlbC5jbGFzc05hbWUpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZWw7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHZhciBfYXJyID0gWydkaXYnLCAnZm9ybSddO1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgX2kxNCA9IDA7IF9pMTQgPCBfYXJyLmxlbmd0aDsgX2kxNCsrKSB7XHJcblx0XHRcdFx0XHRcdHZhciB0YWdOYW1lID0gX2FycltfaTE0XTtcclxuXHRcdFx0XHRcdFx0dmFyIGZhbGxiYWNrO1xyXG5cdFx0XHRcdFx0XHRpZiAoKGZhbGxiYWNrID0gZ2V0RmFsbGJhY2sodGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpKSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsbGJhY2s7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBBY3RpdmF0ZXMgYWxsIGxpc3RlbmVycyBzdG9yZWQgaW4gQGxpc3RlbmVyc1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnc2V0dXBFdmVudExpc3RlbmVycycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKGZ1bmN0aW9uKGVsZW1lbnRMaXN0ZW5lcnMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBsaXN0ZW5lciA9IGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzW2V2ZW50XTtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGVsZW1lbnRMaXN0ZW5lcnMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdFx0XHRcdFx0fSkoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIERlYWN0aXZhdGVzIGFsbCBsaXN0ZW5lcnMgc3RvcmVkIGluIEBsaXN0ZW5lcnNcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKGZ1bmN0aW9uKGVsZW1lbnRMaXN0ZW5lcnMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBsaXN0ZW5lciA9IGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzW2V2ZW50XTtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGVsZW1lbnRMaXN0ZW5lcnMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdFx0XHRcdFx0fSkoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBhbmQgY2FuY2VscyBhbGwgZmlsZXMgaW4gdGhlIHF1ZXVlIG9yIGJlaW5nIHByb2Nlc3NlZC5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2Rpc2FibGUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzNCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotY2xpY2thYmxlJyk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maWxlcy5tYXAoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM0LmNhbmNlbFVwbG9hZChmaWxlKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdlbmFibGUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1jbGlja2FibGUnKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFJldHVybnMgYSBuaWNlbHkgZm9ybWF0dGVkIGZpbGVzaXplXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdmaWxlc2l6ZScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGZpbGVzaXplKHNpemUpIHtcclxuXHRcdFx0XHRcdHZhciBzZWxlY3RlZFNpemUgPSAwO1xyXG5cdFx0XHRcdFx0dmFyIHNlbGVjdGVkVW5pdCA9ICdiJztcclxuXHJcblx0XHRcdFx0XHRpZiAoc2l6ZSA+IDApIHtcclxuXHRcdFx0XHRcdFx0dmFyIHVuaXRzID0gWyd0YicsICdnYicsICdtYicsICdrYicsICdiJ107XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHVuaXRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHVuaXQgPSB1bml0c1tpXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY3V0b2ZmID0gTWF0aC5wb3codGhpcy5vcHRpb25zLmZpbGVzaXplQmFzZSwgNCAtIGkpIC8gMTA7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChzaXplID49IGN1dG9mZikge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRTaXplID0gc2l6ZSAvIE1hdGgucG93KHRoaXMub3B0aW9ucy5maWxlc2l6ZUJhc2UsIDQgLSBpKTtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkVW5pdCA9IHVuaXQ7XHJcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHNlbGVjdGVkU2l6ZSA9IE1hdGgucm91bmQoMTAgKiBzZWxlY3RlZFNpemUpIC8gMTA7IC8vIEN1dHRpbmcgb2YgZGlnaXRzXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuICc8c3Ryb25nPicgKyBzZWxlY3RlZFNpemUgKyAnPC9zdHJvbmc+ICcgKyB0aGlzLm9wdGlvbnMuZGljdEZpbGVTaXplVW5pdHNbc2VsZWN0ZWRVbml0XTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgY2xhc3MgZnJvbSB0aGUgZm9ybS5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ191cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcygpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgIT0gbnVsbCAmJiB0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPj0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPT09IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnbWF4ZmlsZXNyZWFjaGVkJywgdGhpcy5maWxlcyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1tYXgtZmlsZXMtcmVhY2hlZCcpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1tYXgtZmlsZXMtcmVhY2hlZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdkcm9wJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZHJvcChlKSB7XHJcblx0XHRcdFx0XHRpZiAoIWUuZGF0YVRyYW5zZmVyKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuZW1pdCgnZHJvcCcsIGUpO1xyXG5cclxuXHRcdFx0XHRcdHZhciBmaWxlcyA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuZW1pdCgnYWRkZWRmaWxlcycsIGZpbGVzKTtcclxuXHJcblx0XHRcdFx0XHQvLyBFdmVuIGlmIGl0J3MgYSBmb2xkZXIsIGZpbGVzLmxlbmd0aCB3aWxsIGNvbnRhaW4gdGhlIGZvbGRlcnMuXHJcblx0XHRcdFx0XHRpZiAoZmlsZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHZhciBpdGVtcyA9IGUuZGF0YVRyYW5zZmVyLml0ZW1zO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCAmJiBpdGVtc1swXS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBUaGUgYnJvd3NlciBzdXBwb3J0cyBkcm9wcGluZyBvZiBmb2xkZXJzLCBzbyBoYW5kbGUgaXRlbXMgaW5zdGVhZCBvZiBmaWxlc1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmhhbmRsZUZpbGVzKGZpbGVzKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdwYXN0ZScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHBhc3RlKGUpIHtcclxuXHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0X19ndWFyZF9fKGUgIT0gbnVsbCA/IGUuY2xpcGJvYXJkRGF0YSA6IHVuZGVmaW5lZCwgZnVuY3Rpb24oeCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB4Lml0ZW1zO1xyXG5cdFx0XHRcdFx0XHR9KSA9PSBudWxsXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuZW1pdCgncGFzdGUnLCBlKTtcclxuXHRcdFx0XHRcdHZhciBpdGVtcyA9IGUuY2xpcGJvYXJkRGF0YS5pdGVtcztcclxuXHJcblx0XHRcdFx0XHRpZiAoaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ2hhbmRsZUZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlRmlsZXMoZmlsZXMpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczUgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBmaWxlcy5tYXAoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM1LmFkZEZpbGUoZmlsZSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBXaGVuIGEgZm9sZGVyIGlzIGRyb3BwZWQgKG9yIGZpbGVzIGFyZSBwYXN0ZWQpLCBpdGVtcyBtdXN0IGJlIGhhbmRsZWRcclxuXHRcdFx0XHQvLyBpbnN0ZWFkIG9mIGZpbGVzLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX2FkZEZpbGVzRnJvbUl0ZW1zJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXM2ID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjE0ID0gaXRlbXMsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTE0ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMTUgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTQgPSBfaXNBcnJheTE0ID8gX2l0ZXJhdG9yMTQgOiBfaXRlcmF0b3IxNFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxMztcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTE1ID49IF9pdGVyYXRvcjE0Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTMgPSBfaXRlcmF0b3IxNFtfaTE1KytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTE1ID0gX2l0ZXJhdG9yMTQubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTUuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTMgPSBfaTE1LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGl0ZW0gPSBfcmVmMTM7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBlbnRyeTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwgJiYgKGVudHJ5ID0gaXRlbS53ZWJraXRHZXRBc0VudHJ5KCkpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZW50cnkuaXNGaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKF90aGlzNi5hZGRGaWxlKGl0ZW0uZ2V0QXNGaWxlKCkpKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gQXBwZW5kIGFsbCBmaWxlcyBmcm9tIHRoYXQgZGlyZWN0b3J5IHRvIGZpbGVzXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKF90aGlzNi5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBlbnRyeS5uYW1lKSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaCh1bmRlZmluZWQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaXRlbS5nZXRBc0ZpbGUgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGl0ZW0ua2luZCA9PSBudWxsIHx8IGl0ZW0ua2luZCA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKF90aGlzNi5hZGRGaWxlKGl0ZW0uZ2V0QXNGaWxlKCkpKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHRcdFx0XHR9KSgpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIEdvZXMgdGhyb3VnaCB0aGUgZGlyZWN0b3J5LCBhbmQgYWRkcyBlYWNoIGZpbGUgaXQgZmluZHMgcmVjdXJzaXZlbHlcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19hZGRGaWxlc0Zyb21EaXJlY3RvcnknLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGRpcmVjdG9yeSwgcGF0aCkge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzNyA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGRpclJlYWRlciA9IGRpcmVjdG9yeS5jcmVhdGVSZWFkZXIoKTtcclxuXHJcblx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfX2d1YXJkTWV0aG9kX18oY29uc29sZSwgJ2xvZycsIGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gby5sb2coZXJyb3IpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0dmFyIHJlYWRFbnRyaWVzID0gZnVuY3Rpb24gcmVhZEVudHJpZXMoKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkaXJSZWFkZXIucmVhZEVudHJpZXMoZnVuY3Rpb24oZW50cmllcykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChlbnRyaWVzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxNSA9IGVudHJpZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxNSA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2kxNiA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTUgPSBfaXNBcnJheTE1ID8gX2l0ZXJhdG9yMTUgOiBfaXRlcmF0b3IxNVtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWYxNDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTE1KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTYgPj0gX2l0ZXJhdG9yMTUubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmMTQgPSBfaXRlcmF0b3IxNVtfaTE2KytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pMTYgPSBfaXRlcmF0b3IxNS5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTYuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjE0ID0gX2kxNi52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGVudHJ5ID0gX3JlZjE0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVudHJ5LmlzRmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVudHJ5LmZpbGUoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF90aGlzNy5vcHRpb25zLmlnbm9yZUhpZGRlbkZpbGVzICYmIGZpbGUubmFtZS5zdWJzdHJpbmcoMCwgMSkgPT09ICcuJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaWxlLmZ1bGxQYXRoID0gcGF0aCArICcvJyArIGZpbGUubmFtZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczcuYWRkRmlsZShmaWxlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzNy5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBwYXRoICsgJy8nICsgZW50cnkubmFtZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBSZWN1cnNpdmVseSBjYWxsIHJlYWRFbnRyaWVzKCkgYWdhaW4sIHNpbmNlIGJyb3dzZXIgb25seSBoYW5kbGVcclxuXHRcdFx0XHRcdFx0XHRcdC8vIHRoZSBmaXJzdCAxMDAgZW50cmllcy5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RpcmVjdG9yeVJlYWRlciNyZWFkRW50cmllc1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVhZEVudHJpZXMoKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHRcdH0sIGVycm9ySGFuZGxlcik7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiByZWFkRW50cmllcygpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIElmIGBkb25lKClgIGlzIGNhbGxlZCB3aXRob3V0IGFyZ3VtZW50IHRoZSBmaWxlIGlzIGFjY2VwdGVkXHJcblx0XHRcdFx0Ly8gSWYgeW91IGNhbGwgaXQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLCB0aGUgZmlsZSBpcyByZWplY3RlZFxyXG5cdFx0XHRcdC8vIChUaGlzIGFsbG93cyBmb3IgYXN5bmNocm9ub3VzIHZhbGlkYXRpb24pXHJcblx0XHRcdFx0Ly9cclxuXHRcdFx0XHQvLyBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB0aGUgZmlsZXNpemUsIGFuZCBpZiB0aGUgZmlsZS50eXBlIHBhc3NlcyB0aGVcclxuXHRcdFx0XHQvLyBgYWNjZXB0ZWRGaWxlc2AgY2hlY2suXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdhY2NlcHQnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBhY2NlcHQoZmlsZSwgZG9uZSkge1xyXG5cdFx0XHRcdFx0aWYgKGZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5tYXhGaWxlc2l6ZSAqIDEwMjQgKiAxMDI0KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkb25lKFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5kaWN0RmlsZVRvb0JpZ1xyXG5cdFx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoJ3t7ZmlsZXNpemV9fScsIE1hdGgucm91bmQoZmlsZS5zaXplIC8gMTAyNCAvIDEwLjI0KSAvIDEwMClcclxuXHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKCd7e21heEZpbGVzaXplfX0nLCB0aGlzLm9wdGlvbnMubWF4RmlsZXNpemUpXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCFEcm9wem9uZS5pc1ZhbGlkRmlsZShmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcykpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUodGhpcy5vcHRpb25zLmRpY3RJbnZhbGlkRmlsZVR5cGUpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgIT0gbnVsbCAmJiB0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPj0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XHJcblx0XHRcdFx0XHRcdGRvbmUodGhpcy5vcHRpb25zLmRpY3RNYXhGaWxlc0V4Y2VlZGVkLnJlcGxhY2UoJ3t7bWF4RmlsZXN9fScsIHRoaXMub3B0aW9ucy5tYXhGaWxlcykpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbWl0KCdtYXhmaWxlc2V4Y2VlZGVkJywgZmlsZSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmFjY2VwdC5jYWxsKHRoaXMsIGZpbGUsIGRvbmUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdhZGRGaWxlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gYWRkRmlsZShmaWxlKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXM4ID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHRmaWxlLnVwbG9hZCA9IHtcclxuXHRcdFx0XHRcdFx0dXVpZDogRHJvcHpvbmUudXVpZHY0KCksXHJcblx0XHRcdFx0XHRcdHByb2dyZXNzOiAwLFxyXG5cdFx0XHRcdFx0XHQvLyBTZXR0aW5nIHRoZSB0b3RhbCB1cGxvYWQgc2l6ZSB0byBmaWxlLnNpemUgZm9yIHRoZSBiZWdpbm5pbmdcclxuXHRcdFx0XHRcdFx0Ly8gSXQncyBhY3R1YWwgZGlmZmVyZW50IHRoYW4gdGhlIHNpemUgdG8gYmUgdHJhbnNtaXR0ZWQuXHJcblx0XHRcdFx0XHRcdHRvdGFsOiBmaWxlLnNpemUsXHJcblx0XHRcdFx0XHRcdGJ5dGVzU2VudDogMCxcclxuXHRcdFx0XHRcdFx0ZmlsZW5hbWU6IHRoaXMuX3JlbmFtZUZpbGUoZmlsZSksXHJcblx0XHRcdFx0XHRcdGNodW5rZWQ6IHRoaXMub3B0aW9ucy5jaHVua2luZyAmJiAodGhpcy5vcHRpb25zLmZvcmNlQ2h1bmtpbmcgfHwgZmlsZS5zaXplID4gdGhpcy5vcHRpb25zLmNodW5rU2l6ZSksXHJcblx0XHRcdFx0XHRcdHRvdGFsQ2h1bmtDb3VudDogTWF0aC5jZWlsKGZpbGUuc2l6ZSAvIHRoaXMub3B0aW9ucy5jaHVua1NpemUpLFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHRoaXMuZmlsZXMucHVzaChmaWxlKTtcclxuXHJcblx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLkFEREVEO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuZW1pdCgnYWRkZWRmaWxlJywgZmlsZSk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fZW5xdWV1ZVRodW1ibmFpbChmaWxlKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5hY2NlcHQoZmlsZSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS5hY2NlcHRlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzOC5fZXJyb3JQcm9jZXNzaW5nKFtmaWxlXSwgZXJyb3IpOyAvLyBXaWxsIHNldCB0aGUgZmlsZS5zdGF0dXNcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLmFjY2VwdGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXM4Lm9wdGlvbnMuYXV0b1F1ZXVlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfdGhpczguZW5xdWV1ZUZpbGUoZmlsZSk7XHJcblx0XHRcdFx0XHRcdFx0fSAvLyBXaWxsIHNldCAuYWNjZXB0ZWQgPSB0cnVlXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzOC5fdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFdyYXBwZXIgZm9yIGVucXVldWVGaWxlXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdlbnF1ZXVlRmlsZXMnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbnF1ZXVlRmlsZXMoZmlsZXMpIHtcclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxNiA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MTYgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMTcgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE2ID0gX2lzQXJyYXkxNiA/IF9pdGVyYXRvcjE2IDogX2l0ZXJhdG9yMTZbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMTU7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxNikge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTE3ID49IF9pdGVyYXRvcjE2Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjE1ID0gX2l0ZXJhdG9yMTZbX2kxNysrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTE3ID0gX2l0ZXJhdG9yMTYubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTE3LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYxNSA9IF9pMTcudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjE1O1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5lbnF1ZXVlRmlsZShmaWxlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdlbnF1ZXVlRmlsZScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGVucXVldWVGaWxlKGZpbGUpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczkgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuQURERUQgJiYgZmlsZS5hY2NlcHRlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLlFVRVVFRDtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM5LnByb2Nlc3NRdWV1ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdH0sIDApOyAvLyBEZWZlcnJpbmcgdGhlIGNhbGxcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBmaWxlIGNhbid0IGJlIHF1ZXVlZCBiZWNhdXNlIGl0IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkIG9yIHdhcyByZWplY3RlZC5cIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19lbnF1ZXVlVGh1bWJuYWlsJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2VucXVldWVUaHVtYm5haWwoZmlsZSkge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzMTAgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLmNyZWF0ZUltYWdlVGh1bWJuYWlscyAmJlxyXG5cdFx0XHRcdFx0XHRmaWxlLnR5cGUubWF0Y2goL2ltYWdlLiovKSAmJlxyXG5cdFx0XHRcdFx0XHRmaWxlLnNpemUgPD0gdGhpcy5vcHRpb25zLm1heFRodW1ibmFpbEZpbGVzaXplICogMTAyNCAqIDEwMjRcclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl90aHVtYm5haWxRdWV1ZS5wdXNoKGZpbGUpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMxMC5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCk7XHJcblx0XHRcdFx0XHRcdH0sIDApOyAvLyBEZWZlcnJpbmcgdGhlIGNhbGxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXMxMSA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3Byb2Nlc3NpbmdUaHVtYm5haWwgfHwgdGhpcy5fdGh1bWJuYWlsUXVldWUubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHZhciBmaWxlID0gdGhpcy5fdGh1bWJuYWlsUXVldWUuc2hpZnQoKTtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZVRodW1ibmFpbChcclxuXHRcdFx0XHRcdFx0ZmlsZSxcclxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnRodW1ibmFpbFdpZHRoLFxyXG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMudGh1bWJuYWlsSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMudGh1bWJuYWlsTWV0aG9kLFxyXG5cdFx0XHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdFx0XHRmdW5jdGlvbihkYXRhVXJsKSB7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMxMS5lbWl0KCd0aHVtYm5haWwnLCBmaWxlLCBkYXRhVXJsKTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpczExLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMTEuX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIENhbiBiZSBjYWxsZWQgYnkgdGhlIHVzZXIgdG8gcmVtb3ZlIGEgZmlsZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAncmVtb3ZlRmlsZScsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUZpbGUoZmlsZSkge1xyXG5cdFx0XHRcdFx0aWYgKGZpbGUuc3RhdHVzID09PSBEcm9wem9uZS5VUExPQURJTkcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jYW5jZWxVcGxvYWQoZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLmZpbGVzID0gd2l0aG91dCh0aGlzLmZpbGVzLCBmaWxlKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmVtaXQoJ3JlbW92ZWRmaWxlJywgZmlsZSk7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5maWxlcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZW1pdCgncmVzZXQnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmVzIGFsbCBmaWxlcyB0aGF0IGFyZW4ndCBjdXJyZW50bHkgcHJvY2Vzc2VkIGZyb20gdGhlIGxpc3RcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3JlbW92ZUFsbEZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlQWxsRmlsZXMoY2FuY2VsSWZOZWNlc3NhcnkpIHtcclxuXHRcdFx0XHRcdC8vIENyZWF0ZSBhIGNvcHkgb2YgZmlsZXMgc2luY2UgcmVtb3ZlRmlsZSgpIGNoYW5nZXMgdGhlIEBmaWxlcyBhcnJheS5cclxuXHRcdFx0XHRcdGlmIChjYW5jZWxJZk5lY2Vzc2FyeSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGNhbmNlbElmTmVjZXNzYXJ5ID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTcgPSB0aGlzLmZpbGVzLnNsaWNlKCksXHJcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxNyA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0X2kxOCA9IDAsXHJcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTcgPSBfaXNBcnJheTE3ID8gX2l0ZXJhdG9yMTcgOiBfaXRlcmF0b3IxN1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9yZWYxNjtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTE3KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTggPj0gX2l0ZXJhdG9yMTcubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMTYgPSBfaXRlcmF0b3IxN1tfaTE4KytdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdF9pMTggPSBfaXRlcmF0b3IxNy5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTguZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjE2ID0gX2kxOC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMTY7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5zdGF0dXMgIT09IERyb3B6b25lLlVQTE9BRElORyB8fCBjYW5jZWxJZk5lY2Vzc2FyeSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlRmlsZShmaWxlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gUmVzaXplcyBhbiBpbWFnZSBiZWZvcmUgaXQgZ2V0cyBzZW50IHRvIHRoZSBzZXJ2ZXIuIFRoaXMgZnVuY3Rpb24gaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2ZcclxuXHRcdFx0XHQvLyBgb3B0aW9ucy50cmFuc2Zvcm1GaWxlYCBpZiBgcmVzaXplV2lkdGhgIG9yIGByZXNpemVIZWlnaHRgIGFyZSBzZXQuIFRoZSBjYWxsYmFjayBpcyBpbnZva2VkIHdpdGhcclxuXHRcdFx0XHQvLyB0aGUgcmVzaXplZCBibG9iLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAncmVzaXplSW1hZ2UnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZXNpemVJbWFnZShmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXMxMiA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlVGh1bWJuYWlsKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgZmFsc2UsIGZ1bmN0aW9uKGRhdGFVcmwsIGNhbnZhcykge1xyXG5cdFx0XHRcdFx0XHRpZiAoY2FudmFzID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gVGhlIGltYWdlIGhhcyBub3QgYmVlbiByZXNpemVkXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKGZpbGUpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHZhciByZXNpemVNaW1lVHlwZSA9IF90aGlzMTIub3B0aW9ucy5yZXNpemVNaW1lVHlwZTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc2l6ZU1pbWVUeXBlID09IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZU1pbWVUeXBlID0gZmlsZS50eXBlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzaXplZERhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKHJlc2l6ZU1pbWVUeXBlLCBfdGhpczEyLm9wdGlvbnMucmVzaXplUXVhbGl0eSk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc2l6ZU1pbWVUeXBlID09PSAnaW1hZ2UvanBlZycgfHwgcmVzaXplTWltZVR5cGUgPT09ICdpbWFnZS9qcGcnKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBOb3cgYWRkIHRoZSBvcmlnaW5hbCBFWElGIGluZm9ybWF0aW9uXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVkRGF0YVVSTCA9IEV4aWZSZXN0b3JlLnJlc3RvcmUoZmlsZS5kYXRhVVJMLCByZXNpemVkRGF0YVVSTCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhEcm9wem9uZS5kYXRhVVJJdG9CbG9iKHJlc2l6ZWREYXRhVVJMKSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdjcmVhdGVUaHVtYm5haWwnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVUaHVtYm5haWwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczEzID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHR2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG5cdFx0XHRcdFx0ZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZmlsZS5kYXRhVVJMID0gZmlsZVJlYWRlci5yZXN1bHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBEb24ndCBib3RoZXIgY3JlYXRpbmcgYSB0aHVtYm5haWwgZm9yIFNWRyBpbWFnZXMgc2luY2UgdGhleSdyZSB2ZWN0b3JcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUudHlwZSA9PT0gJ2ltYWdlL3N2Zyt4bWwnKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrKGZpbGVSZWFkZXIucmVzdWx0KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMxMy5jcmVhdGVUaHVtYm5haWxGcm9tVXJsKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgZml4T3JpZW50YXRpb24sIGNhbGxiYWNrKTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnY3JlYXRlVGh1bWJuYWlsRnJvbVVybCcsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVRodW1ibmFpbEZyb21VcmwoXHJcblx0XHRcdFx0XHRmaWxlLFxyXG5cdFx0XHRcdFx0d2lkdGgsXHJcblx0XHRcdFx0XHRoZWlnaHQsXHJcblx0XHRcdFx0XHRyZXNpemVNZXRob2QsXHJcblx0XHRcdFx0XHRmaXhPcmllbnRhdGlvbixcclxuXHRcdFx0XHRcdGNhbGxiYWNrLFxyXG5cdFx0XHRcdFx0Y3Jvc3NPcmlnaW5cclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpczE0ID0gdGhpcztcclxuXHJcblx0XHRcdFx0XHQvLyBOb3QgdXNpbmcgYG5ldyBJbWFnZWAgaGVyZSBiZWNhdXNlIG9mIGEgYnVnIGluIGxhdGVzdCBDaHJvbWUgdmVyc2lvbnMuXHJcblx0XHRcdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VueW8vZHJvcHpvbmUvcHVsbC8yMjZcclxuXHRcdFx0XHRcdHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoY3Jvc3NPcmlnaW4pIHtcclxuXHRcdFx0XHRcdFx0aW1nLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgbG9hZEV4aWYgPSBmdW5jdGlvbiBsb2FkRXhpZihjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjaygxKTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBFWElGICE9PSAndW5kZWZpbmVkJyAmJiBFWElGICE9PSBudWxsICYmIGZpeE9yaWVudGF0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0bG9hZEV4aWYgPSBmdW5jdGlvbiBsb2FkRXhpZihjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIEVYSUYuZ2V0RGF0YShpbWcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soRVhJRi5nZXRUYWcodGhpcywgJ09yaWVudGF0aW9uJykpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGxvYWRFeGlmKGZ1bmN0aW9uKG9yaWVudGF0aW9uKSB7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS53aWR0aCA9IGltZy53aWR0aDtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLmhlaWdodCA9IGltZy5oZWlnaHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciByZXNpemVJbmZvID0gX3RoaXMxNC5vcHRpb25zLnJlc2l6ZS5jYWxsKF90aGlzMTQsIGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNhbnZhcy53aWR0aCA9IHJlc2l6ZUluZm8udHJnV2lkdGg7XHJcblx0XHRcdFx0XHRcdFx0Y2FudmFzLmhlaWdodCA9IHJlc2l6ZUluZm8udHJnSGVpZ2h0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAob3JpZW50YXRpb24gPiA0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjYW52YXMud2lkdGggPSByZXNpemVJbmZvLnRyZ0hlaWdodDtcclxuXHRcdFx0XHRcdFx0XHRcdGNhbnZhcy5oZWlnaHQgPSByZXNpemVJbmZvLnRyZ1dpZHRoO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0c3dpdGNoIChvcmllbnRhdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAyOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBob3Jpem9udGFsIGZsaXBcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIDApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHguc2NhbGUoLTEsIDEpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgMzpcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gMTgwwrAgcm90YXRlIGxlZnRcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgucm90YXRlKE1hdGguUEkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgNDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gdmVydGljYWwgZmxpcFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKDAsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHguc2NhbGUoMSwgLTEpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgNTpcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gdmVydGljYWwgZmxpcCArIDkwIHJvdGF0ZSByaWdodFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgucm90YXRlKDAuNSAqIE1hdGguUEkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHguc2NhbGUoMSwgLTEpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgNjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gOTDCsCByb3RhdGUgcmlnaHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZSgwLCAtY2FudmFzLmhlaWdodCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSA3OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBob3Jpem9udGFsIGZsaXAgKyA5MCByb3RhdGUgcmlnaHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIC1jYW52YXMuaGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKC0xLCAxKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDg6XHJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIDkwwrAgcm90YXRlIGxlZnRcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnJvdGF0ZSgtMC41ICogTWF0aC5QSSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC50cmFuc2xhdGUoLWNhbnZhcy53aWR0aCwgMCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIGJ1Z2ZpeCBmb3IgaU9TJyBzY2FsaW5nIGJ1Zy5cclxuXHRcdFx0XHRcdFx0XHRkcmF3SW1hZ2VJT1NGaXgoXHJcblx0XHRcdFx0XHRcdFx0XHRjdHgsXHJcblx0XHRcdFx0XHRcdFx0XHRpbWcsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnNyY1ggIT0gbnVsbCA/IHJlc2l6ZUluZm8uc3JjWCA6IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnNyY1kgIT0gbnVsbCA/IHJlc2l6ZUluZm8uc3JjWSA6IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnNyY1dpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby5zcmNIZWlnaHQsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnRyZ1ggIT0gbnVsbCA/IHJlc2l6ZUluZm8udHJnWCA6IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnRyZ1kgIT0gbnVsbCA/IHJlc2l6ZUluZm8udHJnWSA6IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnRyZ1dpZHRoLFxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby50cmdIZWlnaHRcclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgdGh1bWJuYWlsID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sodGh1bWJuYWlsLCBjYW52YXMpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRcdGltZy5vbmVycm9yID0gY2FsbGJhY2s7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIChpbWcuc3JjID0gZmlsZS5kYXRhVVJMKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBHb2VzIHRocm91Z2ggdGhlIHF1ZXVlIGFuZCBwcm9jZXNzZXMgZmlsZXMgaWYgdGhlcmUgYXJlbid0IHRvbyBtYW55IGFscmVhZHkuXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdwcm9jZXNzUXVldWUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBwcm9jZXNzUXVldWUoKSB7XHJcblx0XHRcdFx0XHR2YXIgcGFyYWxsZWxVcGxvYWRzID0gdGhpcy5vcHRpb25zLnBhcmFsbGVsVXBsb2FkcztcclxuXHJcblx0XHRcdFx0XHR2YXIgcHJvY2Vzc2luZ0xlbmd0aCA9IHRoaXMuZ2V0VXBsb2FkaW5nRmlsZXMoKS5sZW5ndGg7XHJcblx0XHRcdFx0XHR2YXIgaSA9IHByb2Nlc3NpbmdMZW5ndGg7XHJcblxyXG5cdFx0XHRcdFx0Ly8gVGhlcmUgYXJlIGFscmVhZHkgYXQgbGVhc3QgYXMgbWFueSBmaWxlcyB1cGxvYWRpbmcgdGhhbiBzaG91bGQgYmVcclxuXHRcdFx0XHRcdGlmIChwcm9jZXNzaW5nTGVuZ3RoID49IHBhcmFsbGVsVXBsb2Fkcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIHF1ZXVlZEZpbGVzID0gdGhpcy5nZXRRdWV1ZWRGaWxlcygpO1xyXG5cclxuXHRcdFx0XHRcdGlmICghKHF1ZXVlZEZpbGVzLmxlbmd0aCA+IDApKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XHJcblx0XHRcdFx0XHRcdC8vIFRoZSBmaWxlcyBzaG91bGQgYmUgdXBsb2FkZWQgaW4gb25lIHJlcXVlc3RcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc0ZpbGVzKHF1ZXVlZEZpbGVzLnNsaWNlKDAsIHBhcmFsbGVsVXBsb2FkcyAtIHByb2Nlc3NpbmdMZW5ndGgpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHdoaWxlIChpIDwgcGFyYWxsZWxVcGxvYWRzKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFxdWV1ZWRGaWxlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9IC8vIE5vdGhpbmcgbGVmdCB0byBwcm9jZXNzXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9jZXNzRmlsZShxdWV1ZWRGaWxlcy5zaGlmdCgpKTtcclxuXHRcdFx0XHRcdFx0XHRpKys7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBXcmFwcGVyIGZvciBgcHJvY2Vzc0ZpbGVzYFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAncHJvY2Vzc0ZpbGUnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBwcm9jZXNzRmlsZShmaWxlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9jZXNzRmlsZXMoW2ZpbGVdKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBMb2FkcyB0aGUgZmlsZSwgdGhlbiBjYWxscyBmaW5pc2hlZExvYWRpbmcoKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAncHJvY2Vzc0ZpbGVzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc0ZpbGVzKGZpbGVzKSB7XHJcblx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTggPSBmaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTE4ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRfaTE5ID0gMCxcclxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxOCA9IF9pc0FycmF5MTggPyBfaXRlcmF0b3IxOCA6IF9pdGVyYXRvcjE4W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgX3JlZjE3O1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTgpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kxOSA+PSBfaXRlcmF0b3IxOC5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYxNyA9IF9pdGVyYXRvcjE4W19pMTkrK107XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0X2kxOSA9IF9pdGVyYXRvcjE4Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2kxOS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMTcgPSBfaTE5LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgZmlsZSA9IF9yZWYxNztcclxuXHJcblx0XHRcdFx0XHRcdGZpbGUucHJvY2Vzc2luZyA9IHRydWU7IC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XHJcblx0XHRcdFx0XHRcdGZpbGUuc3RhdHVzID0gRHJvcHpvbmUuVVBMT0FESU5HO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdwcm9jZXNzaW5nJywgZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3Byb2Nlc3NpbmdtdWx0aXBsZScsIGZpbGVzKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhmaWxlcyk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19nZXRGaWxlc1dpdGhYaHInLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZ2V0RmlsZXNXaXRoWGhyKHhocikge1xyXG5cdFx0XHRcdFx0dmFyIGZpbGVzID0gdm9pZCAwO1xyXG5cdFx0XHRcdFx0cmV0dXJuIChmaWxlcyA9IHRoaXMuZmlsZXNcclxuXHRcdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbihmaWxlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUueGhyID09PSB4aHI7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24oZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlO1xyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gQ2FuY2VscyB0aGUgZmlsZSB1cGxvYWQgYW5kIHNldHMgdGhlIHN0YXR1cyB0byBDQU5DRUxFRFxyXG5cdFx0XHRcdC8vICoqaWYqKiB0aGUgZmlsZSBpcyBhY3R1YWxseSBiZWluZyB1cGxvYWRlZC5cclxuXHRcdFx0XHQvLyBJZiBpdCdzIHN0aWxsIGluIHRoZSBxdWV1ZSwgdGhlIGZpbGUgaXMgYmVpbmcgcmVtb3ZlZCBmcm9tIGl0IGFuZCB0aGUgc3RhdHVzXHJcblx0XHRcdFx0Ly8gc2V0IHRvIENBTkNFTEVELlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnY2FuY2VsVXBsb2FkJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gY2FuY2VsVXBsb2FkKGZpbGUpIHtcclxuXHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XHJcblx0XHRcdFx0XHRcdHZhciBncm91cGVkRmlsZXMgPSB0aGlzLl9nZXRGaWxlc1dpdGhYaHIoZmlsZS54aHIpO1xyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxOSA9IGdyb3VwZWRGaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTkgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2kyMCA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IxOSA9IF9pc0FycmF5MTkgPyBfaXRlcmF0b3IxOSA6IF9pdGVyYXRvcjE5W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjE4O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxOSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjAgPj0gX2l0ZXJhdG9yMTkubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYxOCA9IF9pdGVyYXRvcjE5W19pMjArK107XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjAgPSBfaXRlcmF0b3IxOS5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyMC5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYxOCA9IF9pMjAudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgZ3JvdXBlZEZpbGUgPSBfcmVmMTg7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGdyb3VwZWRGaWxlLnN0YXR1cyA9IERyb3B6b25lLkNBTkNFTEVEO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZmlsZS54aHIgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS54aHIuYWJvcnQoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyMCA9IGdyb3VwZWRGaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjAgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2kyMSA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyMCA9IF9pc0FycmF5MjAgPyBfaXRlcmF0b3IyMCA6IF9pdGVyYXRvcjIwW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjE5O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjEgPj0gX2l0ZXJhdG9yMjAubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYxOSA9IF9pdGVyYXRvcjIwW19pMjErK107XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjEgPSBfaXRlcmF0b3IyMC5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyMS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYxOSA9IF9pMjEudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgX2dyb3VwZWRGaWxlID0gX3JlZjE5O1xyXG5cclxuXHRcdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NhbmNlbGVkJywgX2dyb3VwZWRGaWxlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZG11bHRpcGxlJywgZ3JvdXBlZEZpbGVzKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuQURERUQgfHwgZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlFVRVVFRCkge1xyXG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLkNBTkNFTEVEO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NhbmNlbGVkJywgZmlsZSk7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NhbmNlbGVkbXVsdGlwbGUnLCBbZmlsZV0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdyZXNvbHZlT3B0aW9uJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcmVzb2x2ZU9wdGlvbihvcHRpb24pIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7XHJcblx0XHRcdFx0XHRcdFx0X2tleTMgPCBfbGVuMztcclxuXHRcdFx0XHRcdFx0XHRfa2V5MysrXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdGFyZ3NbX2tleTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5M107XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBvcHRpb24uYXBwbHkodGhpcywgYXJncyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICd1cGxvYWRGaWxlJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gdXBsb2FkRmlsZShmaWxlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhbZmlsZV0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICd1cGxvYWRGaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVwbG9hZEZpbGVzKGZpbGVzKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXMxNSA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fdHJhbnNmb3JtRmlsZXMoZmlsZXMsIGZ1bmN0aW9uKHRyYW5zZm9ybWVkRmlsZXMpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBmaWxlIHNob3VsZCBiZSBzZW50IGluIGNodW5rcyFcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGNodW5raW5nIG9wdGlvbiBpcyBzZXQsIHdlICoqa25vdyoqIHRoYXQgdGhlcmUgY2FuIG9ubHkgYmUgKipvbmUqKiBmaWxlLCBzaW5jZVxyXG5cdFx0XHRcdFx0XHRcdC8vIHVwbG9hZE11bHRpcGxlIGlzIG5vdCBhbGxvd2VkIHdpdGggdGhpcyBvcHRpb24uXHJcblx0XHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBmaWxlc1swXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgdHJhbnNmb3JtZWRGaWxlID0gdHJhbnNmb3JtZWRGaWxlc1swXTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc3RhcnRlZENodW5rQ291bnQgPSAwO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5jaHVua3MgPSBbXTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIGhhbmRsZU5leHRDaHVuayA9IGZ1bmN0aW9uIGhhbmRsZU5leHRDaHVuaygpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBjaHVua0luZGV4ID0gMDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBGaW5kIHRoZSBuZXh0IGl0ZW0gaW4gZmlsZS51cGxvYWQuY2h1bmtzIHRoYXQgaXMgbm90IGRlZmluZWQgeWV0LlxyXG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUgKGZpbGUudXBsb2FkLmNodW5rc1tjaHVua0luZGV4XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNodW5rSW5kZXgrKztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIG1lYW5zLCB0aGF0IGFsbCBjaHVua3MgaGF2ZSBhbHJlYWR5IGJlZW4gc3RhcnRlZC5cclxuXHRcdFx0XHRcdFx0XHRcdGlmIChjaHVua0luZGV4ID49IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudCkgcmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHN0YXJ0ZWRDaHVua0NvdW50Kys7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHN0YXJ0ID0gY2h1bmtJbmRleCAqIF90aGlzMTUub3B0aW9ucy5jaHVua1NpemU7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oc3RhcnQgKyBfdGhpczE1Lm9wdGlvbnMuY2h1bmtTaXplLCBmaWxlLnNpemUpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHZhciBkYXRhQmxvY2sgPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IF90aGlzMTUuX2dldFBhcmFtTmFtZSgwKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YTogdHJhbnNmb3JtZWRGaWxlLndlYmtpdFNsaWNlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PyB0cmFuc2Zvcm1lZEZpbGUud2Via2l0U2xpY2Uoc3RhcnQsIGVuZClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IHRyYW5zZm9ybWVkRmlsZS5zbGljZShzdGFydCwgZW5kKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZW5hbWU6IGZpbGUudXBsb2FkLmZpbGVuYW1lLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjaHVua0luZGV4OiBjaHVua0luZGV4LFxyXG5cdFx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGU6IGZpbGUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGluZGV4OiBjaHVua0luZGV4LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhQmxvY2s6IGRhdGFCbG9jaywgLy8gSW4gY2FzZSB3ZSB3YW50IHRvIHJldHJ5LlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXM6IERyb3B6b25lLlVQTE9BRElORyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0cHJvZ3Jlc3M6IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHJpZXM6IDAsIC8vIFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBibG9jayBoYXMgYmVlbiByZXRyaWVkLlxyXG5cdFx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRfdGhpczE1Ll91cGxvYWREYXRhKGZpbGVzLCBbZGF0YUJsb2NrXSk7XHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQuZmluaXNoZWRDaHVua1VwbG9hZCA9IGZ1bmN0aW9uKGNodW5rKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgYWxsRmluaXNoZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2h1bmsuc3RhdHVzID0gRHJvcHpvbmUuU1VDQ0VTUztcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBDbGVhciB0aGUgZGF0YSBmcm9tIHRoZSBjaHVua1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2h1bmsuZGF0YUJsb2NrID0gbnVsbDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBoYW5kbGVOZXh0Q2h1bmsoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldLnN0YXR1cyAhPT0gRHJvcHpvbmUuU1VDQ0VTUykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFsbEZpbmlzaGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoYWxsRmluaXNoZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMxNS5vcHRpb25zLmNodW5rc1VwbG9hZGVkKGZpbGUsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMTUuX2ZpbmlzaGVkKGZpbGVzLCAnJywgbnVsbCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChfdGhpczE1Lm9wdGlvbnMucGFyYWxsZWxDaHVua1VwbG9hZHMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aGFuZGxlTmV4dENodW5rKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZU5leHRDaHVuaygpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZGF0YUJsb2NrcyA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIF9pMjIgPSAwOyBfaTIyIDwgZmlsZXMubGVuZ3RoOyBfaTIyKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRhdGFCbG9ja3NbX2kyMl0gPSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IF90aGlzMTUuX2dldFBhcmFtTmFtZShfaTIyKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YTogdHJhbnNmb3JtZWRGaWxlc1tfaTIyXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZW5hbWU6IGZpbGVzW19pMjJdLnVwbG9hZC5maWxlbmFtZSxcclxuXHRcdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdF90aGlzMTUuX3VwbG9hZERhdGEoZmlsZXMsIGRhdGFCbG9ja3MpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLy8gUmV0dXJucyB0aGUgcmlnaHQgY2h1bmsgZm9yIGdpdmVuIGZpbGUgYW5kIHhoclxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX2dldENodW5rJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2dldENodW5rKGZpbGUsIHhocikge1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldICE9PSB1bmRlZmluZWQgJiYgZmlsZS51cGxvYWQuY2h1bmtzW2ldLnhociA9PT0geGhyKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUudXBsb2FkLmNodW5rc1tpXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFRoaXMgZnVuY3Rpb24gYWN0dWFsbHkgdXBsb2FkcyB0aGUgZmlsZShzKSB0byB0aGUgc2VydmVyLlxyXG5cdFx0XHRcdC8vIElmIGRhdGFCbG9ja3MgY29udGFpbnMgdGhlIGFjdHVhbCBkYXRhIHRvIHVwbG9hZCAobWVhbmluZywgdGhhdCB0aGlzIGNvdWxkIGVpdGhlciBiZSB0cmFuc2Zvcm1lZFxyXG5cdFx0XHRcdC8vIGZpbGVzLCBvciBpbmRpdmlkdWFsIGNodW5rcyBmb3IgY2h1bmtlZCB1cGxvYWQpLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX3VwbG9hZERhdGEnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfdXBsb2FkRGF0YShmaWxlcywgZGF0YUJsb2Nrcykge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzMTYgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRcdFx0XHQvLyBQdXQgdGhlIHhociBvYmplY3QgaW4gdGhlIGZpbGUgb2JqZWN0cyB0byBiZSBhYmxlIHRvIHJlZmVyZW5jZSBpdCBsYXRlci5cclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyMSA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MjEgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMjMgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjIxID0gX2lzQXJyYXkyMSA/IF9pdGVyYXRvcjIxIDogX2l0ZXJhdG9yMjFbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMjA7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyMSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTIzID49IF9pdGVyYXRvcjIxLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjIwID0gX2l0ZXJhdG9yMjFbX2kyMysrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTIzID0gX2l0ZXJhdG9yMjEubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTIzLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYyMCA9IF9pMjMudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjIwO1xyXG5cclxuXHRcdFx0XHRcdFx0ZmlsZS54aHIgPSB4aHI7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIHtcclxuXHRcdFx0XHRcdFx0Ly8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSByaWdodCBjaHVuayBvYmplY3QsIHNvIGl0IGNhbiBiZSBhc3NvY2lhdGVkIGxhdGVyLCBhbmQgZm91bmQgd2l0aCBfZ2V0Q2h1bmtcclxuXHRcdFx0XHRcdFx0ZmlsZXNbMF0udXBsb2FkLmNodW5rc1tkYXRhQmxvY2tzWzBdLmNodW5rSW5kZXhdLnhociA9IHhocjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgbWV0aG9kID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy5tZXRob2QsIGZpbGVzKTtcclxuXHRcdFx0XHRcdHZhciB1cmwgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnVybCwgZmlsZXMpO1xyXG5cdFx0XHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdC8vIFNldHRpbmcgdGhlIHRpbWVvdXQgYWZ0ZXIgb3BlbiBiZWNhdXNlIG9mIElFMTEgaXNzdWU6IGh0dHBzOi8vZ2l0bGFiLmNvbS9tZW5vL2Ryb3B6b25lL2lzc3Vlcy84XHJcblx0XHRcdFx0XHR4aHIudGltZW91dCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMudGltZW91dCwgZmlsZXMpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEhhcyB0byBiZSBhZnRlciBgLm9wZW4oKWAuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZW55by9kcm9wem9uZS9pc3N1ZXMvMTc5XHJcblx0XHRcdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gISF0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xyXG5cclxuXHRcdFx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdF90aGlzMTYuX2ZpbmlzaGVkVXBsb2FkaW5nKGZpbGVzLCB4aHIsIGUpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRfdGhpczE2Ll9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyKTtcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8gU29tZSBicm93c2VycyBkbyBub3QgaGF2ZSB0aGUgLnVwbG9hZCBwcm9wZXJ0eVxyXG5cdFx0XHRcdFx0dmFyIHByb2dyZXNzT2JqID0geGhyLnVwbG9hZCAhPSBudWxsID8geGhyLnVwbG9hZCA6IHhocjtcclxuXHRcdFx0XHRcdHByb2dyZXNzT2JqLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczE2Ll91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR2YXIgaGVhZGVycyA9IHtcclxuXHRcdFx0XHRcdFx0QWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcblx0XHRcdFx0XHRcdCdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcclxuXHRcdFx0XHRcdFx0J1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcclxuXHRcdFx0XHRcdFx0RHJvcHpvbmUuZXh0ZW5kKGhlYWRlcnMsIHRoaXMub3B0aW9ucy5oZWFkZXJzKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBoZWFkZXJOYW1lIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGhlYWRlclZhbHVlID0gaGVhZGVyc1toZWFkZXJOYW1lXTtcclxuXHRcdFx0XHRcdFx0aWYgKGhlYWRlclZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWUpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWRkaW5nIGFsbCBAb3B0aW9ucyBwYXJhbWV0ZXJzXHJcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnBhcmFtcykge1xyXG5cdFx0XHRcdFx0XHR2YXIgYWRkaXRpb25hbFBhcmFtcyA9IHRoaXMub3B0aW9ucy5wYXJhbXM7XHJcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgYWRkaXRpb25hbFBhcmFtcyA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRcdGFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zLmNhbGwoXHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHR4aHIsXHJcblx0XHRcdFx0XHRcdFx0XHRmaWxlc1swXS51cGxvYWQuY2h1bmtlZCA/IHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpIDogbnVsbFxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBhZGRpdGlvbmFsUGFyYW1zKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIHZhbHVlID0gYWRkaXRpb25hbFBhcmFtc1trZXldO1xyXG5cdFx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIExldCB0aGUgdXNlciBhZGQgYWRkaXRpb25hbCBkYXRhIGlmIG5lY2Vzc2FyeVxyXG5cdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjIyID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyMiA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0X2kyNCA9IDAsXHJcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjIgPSBfaXNBcnJheTIyID8gX2l0ZXJhdG9yMjIgOiBfaXRlcmF0b3IyMltTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9yZWYyMTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTIyKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMjQgPj0gX2l0ZXJhdG9yMjIubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMjEgPSBfaXRlcmF0b3IyMltfaTI0KytdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdF9pMjQgPSBfaXRlcmF0b3IyMi5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMjQuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjIxID0gX2kyNC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIF9maWxlID0gX3JlZjIxO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdzZW5kaW5nJywgX2ZpbGUsIHhociwgZm9ybURhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3NlbmRpbmdtdWx0aXBsZScsIGZpbGVzLCB4aHIsIGZvcm1EYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLl9hZGRGb3JtRWxlbWVudERhdGEoZm9ybURhdGEpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEZpbmFsbHkgYWRkIHRoZSBmaWxlc1xyXG5cdFx0XHRcdFx0Ly8gSGFzIHRvIGJlIGxhc3QgYmVjYXVzZSBzb21lIHNlcnZlcnMgKGVnOiBTMykgZXhwZWN0IHRoZSBmaWxlIHRvIGJlIHRoZSBsYXN0IHBhcmFtZXRlclxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhQmxvY2tzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdHZhciBkYXRhQmxvY2sgPSBkYXRhQmxvY2tzW2ldO1xyXG5cdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoZGF0YUJsb2NrLm5hbWUsIGRhdGFCbG9jay5kYXRhLCBkYXRhQmxvY2suZmlsZW5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcyk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gVHJhbnNmb3JtcyBhbGwgZmlsZXMgd2l0aCB0aGlzLm9wdGlvbnMudHJhbnNmb3JtRmlsZSBhbmQgaW52b2tlcyBkb25lIHdpdGggdGhlIHRyYW5zZm9ybWVkIGZpbGVzIHdoZW4gZG9uZS5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ190cmFuc2Zvcm1GaWxlcycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF90cmFuc2Zvcm1GaWxlcyhmaWxlcywgZG9uZSkge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzMTcgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRcdHZhciB0cmFuc2Zvcm1lZEZpbGVzID0gW107XHJcblx0XHRcdFx0XHQvLyBDbHVtc3kgd2F5IG9mIGhhbmRsaW5nIGFzeW5jaHJvbm91cyBjYWxscywgdW50aWwgSSBnZXQgdG8gYWRkIGEgcHJvcGVyIEZ1dHVyZSBsaWJyYXJ5LlxyXG5cdFx0XHRcdFx0dmFyIGRvbmVDb3VudGVyID0gMDtcclxuXHJcblx0XHRcdFx0XHR2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XHJcblx0XHRcdFx0XHRcdF90aGlzMTcub3B0aW9ucy50cmFuc2Zvcm1GaWxlLmNhbGwoX3RoaXMxNywgZmlsZXNbaV0sIGZ1bmN0aW9uKHRyYW5zZm9ybWVkRmlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdHRyYW5zZm9ybWVkRmlsZXNbaV0gPSB0cmFuc2Zvcm1lZEZpbGU7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCsrZG9uZUNvdW50ZXIgPT09IGZpbGVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZG9uZSh0cmFuc2Zvcm1lZEZpbGVzKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdF9sb29wKGkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFRha2VzIGNhcmUgb2YgYWRkaW5nIG90aGVyIGlucHV0IGVsZW1lbnRzIG9mIHRoZSBmb3JtIHRvIHRoZSBBSkFYIHJlcXVlc3RcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ19hZGRGb3JtRWxlbWVudERhdGEnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfYWRkRm9ybUVsZW1lbnREYXRhKGZvcm1EYXRhKSB7XHJcblx0XHRcdFx0XHQvLyBUYWtlIGNhcmUgb2Ygb3RoZXIgaW5wdXQgZWxlbWVudHNcclxuXHRcdFx0XHRcdGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSA9PT0gJ0ZPUk0nKSB7XHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjIzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjMgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2kyNSA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyMyA9IF9pc0FycmF5MjMgPyBfaXRlcmF0b3IyMyA6IF9pdGVyYXRvcjIzW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjIyO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyMykge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjUgPj0gX2l0ZXJhdG9yMjMubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYyMiA9IF9pdGVyYXRvcjIzW19pMjUrK107XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjUgPSBfaXRlcmF0b3IyMy5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYyMiA9IF9pMjUudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgaW5wdXQgPSBfcmVmMjI7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBpbnB1dE5hbWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgaW5wdXRUeXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJyk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGlucHV0VHlwZSkgaW5wdXRUeXBlID0gaW5wdXRUeXBlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBpbnB1dCBkb2Vzbid0IGhhdmUgYSBuYW1lLCB3ZSBjYW4ndCB1c2UgaXQuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBpbnB1dE5hbWUgPT09ICd1bmRlZmluZWQnIHx8IGlucHV0TmFtZSA9PT0gbnVsbCkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChpbnB1dC50YWdOYW1lID09PSAnU0VMRUNUJyAmJiBpbnB1dC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIFBvc3NpYmx5IG11bHRpcGxlIHZhbHVlc1xyXG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI0ID0gaW5wdXQub3B0aW9ucyxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI0ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaTI2ID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyNCA9IF9pc0FycmF5MjQgPyBfaXRlcmF0b3IyNCA6IF9pdGVyYXRvcjI0W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjIzO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNiA+PSBfaXRlcmF0b3IyNC5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWYyMyA9IF9pdGVyYXRvcjI0W19pMjYrK107XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2kyNiA9IF9pdGVyYXRvcjI0Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNi5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmMjMgPSBfaTI2LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgb3B0aW9uID0gX3JlZjIzO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbi5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZChpbnB1dE5hbWUsIG9wdGlvbi52YWx1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCFpbnB1dFR5cGUgfHwgKGlucHV0VHlwZSAhPT0gJ2NoZWNrYm94JyAmJiBpbnB1dFR5cGUgIT09ICdyYWRpbycpIHx8IGlucHV0LmNoZWNrZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZChpbnB1dE5hbWUsIGlucHV0LnZhbHVlKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBJbnZva2VkIHdoZW4gdGhlcmUgaXMgbmV3IHByb2dyZXNzIGluZm9ybWF0aW9uIGFib3V0IGdpdmVuIGZpbGVzLlxyXG5cdFx0XHRcdC8vIElmIGUgaXMgbm90IHByb3ZpZGVkLCBpdCBpcyBhc3N1bWVkIHRoYXQgdGhlIHVwbG9hZCBpcyBmaW5pc2hlZC5cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ191cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3MoZmlsZXMsIHhociwgZSkge1xyXG5cdFx0XHRcdFx0dmFyIHByb2dyZXNzID0gdm9pZCAwO1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBlICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHRwcm9ncmVzcyA9ICgxMDAgKiBlLmxvYWRlZCkgLyBlLnRvdGFsO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBmaWxlc1swXTtcclxuXHRcdFx0XHRcdFx0XHQvLyBTaW5jZSB0aGlzIGlzIGEgY2h1bmtlZCB1cGxvYWQsIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBhcHByb3ByaWF0ZSBjaHVuayBwcm9ncmVzcy5cclxuXHRcdFx0XHRcdFx0XHR2YXIgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlLCB4aHIpO1xyXG5cdFx0XHRcdFx0XHRcdGNodW5rLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcblx0XHRcdFx0XHRcdFx0Y2h1bmsudG90YWwgPSBlLnRvdGFsO1xyXG5cdFx0XHRcdFx0XHRcdGNodW5rLmJ5dGVzU2VudCA9IGUubG9hZGVkO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBmaWxlUHJvZ3Jlc3MgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZVRvdGFsID0gdm9pZCAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZUJ5dGVzU2VudCA9IHZvaWQgMDtcclxuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IDA7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQudG90YWwgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLmJ5dGVzU2VudCA9IDA7XHJcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAhPT0gdW5kZWZpbmVkICYmIGZpbGUudXBsb2FkLmNodW5rc1tpXS5wcm9ncmVzcyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLnByb2dyZXNzICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS5wcm9ncmVzcztcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQudG90YWwgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLnRvdGFsO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5ieXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLmJ5dGVzU2VudDtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSBmaWxlLnVwbG9hZC5wcm9ncmVzcyAvIGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKFxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI1ID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjUgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTI3ID0gMCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjUgPSBfaXNBcnJheTI1ID8gX2l0ZXJhdG9yMjUgOiBfaXRlcmF0b3IyNVtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyNDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyNSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNyA+PSBfaXRlcmF0b3IyNS5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRfcmVmMjQgPSBfaXRlcmF0b3IyNVtfaTI3KytdO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0X2kyNyA9IF9pdGVyYXRvcjI1Lm5leHQoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjcuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWYyNCA9IF9pMjcudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9maWxlMiA9IF9yZWYyNDtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRfZmlsZTIudXBsb2FkLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcblx0XHRcdFx0XHRcdFx0XHRfZmlsZTIudXBsb2FkLnRvdGFsID0gZS50b3RhbDtcclxuXHRcdFx0XHRcdFx0XHRcdF9maWxlMi51cGxvYWQuYnl0ZXNTZW50ID0gZS5sb2FkZWQ7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI2ID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI2ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjggPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjYgPSBfaXNBcnJheTI2ID8gX2l0ZXJhdG9yMjYgOiBfaXRlcmF0b3IyNltTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyNTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjYpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTI4ID49IF9pdGVyYXRvcjI2Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjUgPSBfaXRlcmF0b3IyNltfaTI4KytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTI4ID0gX2l0ZXJhdG9yMjYubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjguZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjUgPSBfaTI4LnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9maWxlMyA9IF9yZWYyNTtcclxuXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCd1cGxvYWRwcm9ncmVzcycsIF9maWxlMywgX2ZpbGUzLnVwbG9hZC5wcm9ncmVzcywgX2ZpbGUzLnVwbG9hZC5ieXRlc1NlbnQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbiB0aGUgZmlsZSBmaW5pc2hlZCB1cGxvYWRpbmdcclxuXHJcblx0XHRcdFx0XHRcdHZhciBhbGxGaWxlc0ZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRcdHByb2dyZXNzID0gMTAwO1xyXG5cclxuXHRcdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjcgPSBmaWxlcyxcclxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjcgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2kyOSA9IDAsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyNyA9IF9pc0FycmF5MjcgPyBfaXRlcmF0b3IyNyA6IF9pdGVyYXRvcjI3W1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjI2O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyNykge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjkgPj0gX2l0ZXJhdG9yMjcubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYyNiA9IF9pdGVyYXRvcjI3W19pMjkrK107XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdF9pMjkgPSBfaXRlcmF0b3IyNy5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyOS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdF9yZWYyNiA9IF9pMjkudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgX2ZpbGU0ID0gX3JlZjI2O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoX2ZpbGU0LnVwbG9hZC5wcm9ncmVzcyAhPT0gMTAwIHx8IF9maWxlNC51cGxvYWQuYnl0ZXNTZW50ICE9PSBfZmlsZTQudXBsb2FkLnRvdGFsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRhbGxGaWxlc0ZpbmlzaGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdF9maWxlNC51cGxvYWQucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuXHRcdFx0XHRcdFx0XHRfZmlsZTQudXBsb2FkLmJ5dGVzU2VudCA9IF9maWxlNC51cGxvYWQudG90YWw7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdC8vIE5vdGhpbmcgdG8gZG8sIGFsbCBmaWxlcyBhbHJlYWR5IGF0IDEwMCVcclxuXHRcdFx0XHRcdFx0aWYgKGFsbEZpbGVzRmluaXNoZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI4ID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTI4ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHRcdF9pMzAgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjggPSBfaXNBcnJheTI4ID8gX2l0ZXJhdG9yMjggOiBfaXRlcmF0b3IyOFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdFx0O1xyXG5cclxuXHRcdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyNztcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTMwID49IF9pdGVyYXRvcjI4Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjcgPSBfaXRlcmF0b3IyOFtfaTMwKytdO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfaTMwID0gX2l0ZXJhdG9yMjgubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMzAuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjcgPSBfaTMwLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0dmFyIF9maWxlNSA9IF9yZWYyNztcclxuXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCd1cGxvYWRwcm9ncmVzcycsIF9maWxlNSwgcHJvZ3Jlc3MsIF9maWxlNS51cGxvYWQuYnl0ZXNTZW50KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfZmluaXNoZWRVcGxvYWRpbmcnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZmluaXNoZWRVcGxvYWRpbmcoZmlsZXMsIHhociwgZSkge1xyXG5cdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gdm9pZCAwO1xyXG5cclxuXHRcdFx0XHRcdGlmIChmaWxlc1swXS5zdGF0dXMgPT09IERyb3B6b25lLkNBTkNFTEVEKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh4aHIucmVzcG9uc2VUeXBlICE9PSAnYXJyYXlidWZmZXInICYmIHhoci5yZXNwb25zZVR5cGUgIT09ICdibG9iJykge1xyXG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRcdFx0eGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKSAmJlxyXG5cdFx0XHRcdFx0XHRcdH54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKVxyXG5cdFx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZSA9IGVycm9yO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSAnSW52YWxpZCBKU09OIHJlc3BvbnNlIGZyb20gc2VydmVyLic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCEoMjAwIDw9IHhoci5zdGF0dXMgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgcmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0ZmlsZXNbMF0udXBsb2FkLmZpbmlzaGVkQ2h1bmtVcGxvYWQodGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocikpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2ZpbmlzaGVkKGZpbGVzLCByZXNwb25zZSwgZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX2hhbmRsZVVwbG9hZEVycm9yJyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRpZiAoZmlsZXNbMF0uc3RhdHVzID09PSBEcm9wem9uZS5DQU5DRUxFRCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkICYmIHRoaXMub3B0aW9ucy5yZXRyeUNodW5rcykge1xyXG5cdFx0XHRcdFx0XHR2YXIgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKTtcclxuXHRcdFx0XHRcdFx0aWYgKGNodW5rLnJldHJpZXMrKyA8IHRoaXMub3B0aW9ucy5yZXRyeUNodW5rc0xpbWl0KSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBsb2FkRGF0YShmaWxlcywgW2NodW5rLmRhdGFCbG9ja10pO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ1JldHJpZWQgdGhpcyBjaHVuayB0b28gb2Z0ZW4uIEdpdmluZyB1cC4nKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyOSA9IGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MjkgPSB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdF9pMzEgPSAwLFxyXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI5ID0gX2lzQXJyYXkyOSA/IF9pdGVyYXRvcjI5IDogX2l0ZXJhdG9yMjlbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdFx0XHQ7XHJcblxyXG5cdFx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRcdHZhciBfcmVmMjg7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkyOSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTMxID49IF9pdGVyYXRvcjI5Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjI4ID0gX2l0ZXJhdG9yMjlbX2kzMSsrXTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRfaTMxID0gX2l0ZXJhdG9yMjkubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChfaTMxLmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdF9yZWYyOCA9IF9pMzEudmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjI4O1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5fZXJyb3JQcm9jZXNzaW5nKFxyXG5cdFx0XHRcdFx0XHRcdGZpbGVzLFxyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlIHx8IHRoaXMub3B0aW9ucy5kaWN0UmVzcG9uc2VFcnJvci5yZXBsYWNlKCd7e3N0YXR1c0NvZGV9fScsIHhoci5zdGF0dXMpLFxyXG5cdFx0XHRcdFx0XHRcdHhoclxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdzdWJtaXRSZXF1ZXN0JyxcclxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcykge1xyXG5cdFx0XHRcdFx0eGhyLnNlbmQoZm9ybURhdGEpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cclxuXHRcdFx0XHQvLyBJbmRpdmlkdWFsIGNhbGxiYWNrcyBoYXZlIHRvIGJlIGNhbGxlZCBpbiB0aGUgYXBwcm9wcmlhdGUgc2VjdGlvbnMuXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRrZXk6ICdfZmluaXNoZWQnLFxyXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZmluaXNoZWQoZmlsZXMsIHJlc3BvbnNlVGV4dCwgZSkge1xyXG5cdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjMwID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkzMCA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0X2kzMiA9IDAsXHJcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMzAgPSBfaXNBcnJheTMwID8gX2l0ZXJhdG9yMzAgOiBfaXRlcmF0b3IzMFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9yZWYyOTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTMwKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzIgPj0gX2l0ZXJhdG9yMzAubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMjkgPSBfaXRlcmF0b3IzMFtfaTMyKytdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdF9pMzIgPSBfaXRlcmF0b3IzMC5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzIuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjI5ID0gX2kzMi52YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMjk7XHJcblxyXG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLlNVQ0NFU1M7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnc3VjY2VzcycsIGZpbGUsIHJlc3BvbnNlVGV4dCwgZSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGUnLCBmaWxlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdzdWNjZXNzbXVsdGlwbGUnLCBmaWxlcywgcmVzcG9uc2VUZXh0LCBlKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjb21wbGV0ZW11bHRpcGxlJywgZmlsZXMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBDYWxsZWQgaW50ZXJuYWxseSB3aGVuIHByb2Nlc3NpbmcgaXMgZmluaXNoZWQuXHJcblx0XHRcdFx0Ly8gSW5kaXZpZHVhbCBjYWxsYmFja3MgaGF2ZSB0byBiZSBjYWxsZWQgaW4gdGhlIGFwcHJvcHJpYXRlIHNlY3Rpb25zLlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0a2V5OiAnX2Vycm9yUHJvY2Vzc2luZycsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9lcnJvclByb2Nlc3NpbmcoZmlsZXMsIG1lc3NhZ2UsIHhocikge1xyXG5cdFx0XHRcdFx0Zm9yIChcclxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjMxID0gZmlsZXMsXHJcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkzMSA9IHRydWUsXHJcblx0XHRcdFx0XHRcdFx0X2kzMyA9IDAsXHJcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMzEgPSBfaXNBcnJheTMxID8gX2l0ZXJhdG9yMzEgOiBfaXRlcmF0b3IzMVtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9yZWYzMDtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTMxKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzMgPj0gX2l0ZXJhdG9yMzEubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRcdFx0XHRfcmVmMzAgPSBfaXRlcmF0b3IzMVtfaTMzKytdO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdF9pMzMgPSBfaXRlcmF0b3IzMS5uZXh0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzMuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0X3JlZjMwID0gX2kzMy52YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMzA7XHJcblxyXG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLkVSUk9SO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2Vycm9yJywgZmlsZSwgbWVzc2FnZSwgeGhyKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjb21wbGV0ZScsIGZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2Vycm9ybXVsdGlwbGUnLCBmaWxlcywgbWVzc2FnZSwgeGhyKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjb21wbGV0ZW11bHRpcGxlJywgZmlsZXMpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XSxcclxuXHRcdFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGtleTogJ3V1aWR2NCcsXHJcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHV1aWR2NCgpIHtcclxuXHRcdFx0XHRcdHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsXHJcblx0XHRcdFx0XHRcdFx0diA9IGMgPT09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XHJcblx0XHRcdFx0XHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRdXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIERyb3B6b25lO1xyXG59KShFbWl0dGVyKTtcclxuXHJcbkRyb3B6b25lLmluaXRDbGFzcygpO1xyXG5cclxuRHJvcHpvbmUudmVyc2lvbiA9ICc1LjIuMCc7XHJcblxyXG4vLyBUaGlzIGlzIGEgbWFwIG9mIG9wdGlvbnMgZm9yIHlvdXIgZGlmZmVyZW50IGRyb3B6b25lcy4gQWRkIGNvbmZpZ3VyYXRpb25zXHJcbi8vIHRvIHRoaXMgb2JqZWN0IGZvciB5b3VyIGRpZmZlcmVudCBkcm9wem9uZSBlbGVtZW5zLlxyXG4vL1xyXG4vLyBFeGFtcGxlOlxyXG4vL1xyXG4vLyAgICAgRHJvcHpvbmUub3B0aW9ucy5teURyb3B6b25lRWxlbWVudElkID0geyBtYXhGaWxlc2l6ZTogMSB9O1xyXG4vL1xyXG4vLyBUbyBkaXNhYmxlIGF1dG9EaXNjb3ZlciBmb3IgYSBzcGVjaWZpYyBlbGVtZW50LCB5b3UgY2FuIHNldCBgZmFsc2VgIGFzIGFuIG9wdGlvbjpcclxuLy9cclxuLy8gICAgIERyb3B6b25lLm9wdGlvbnMubXlEaXNhYmxlZEVsZW1lbnRJZCA9IGZhbHNlO1xyXG4vL1xyXG4vLyBBbmQgaW4gaHRtbDpcclxuLy9cclxuLy8gICAgIDxmb3JtIGFjdGlvbj1cIi91cGxvYWRcIiBpZD1cIm15LWRyb3B6b25lLWVsZW1lbnQtaWRcIiBjbGFzcz1cImRyb3B6b25lXCI+PC9mb3JtPlxyXG5Ecm9wem9uZS5vcHRpb25zID0ge307XHJcblxyXG4vLyBSZXR1cm5zIHRoZSBvcHRpb25zIGZvciBhbiBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiBub25lIGF2YWlsYWJsZS5cclxuRHJvcHpvbmUub3B0aW9uc0ZvckVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0Ly8gR2V0IHRoZSBgRHJvcHpvbmUub3B0aW9ucy5lbGVtZW50SWRgIGZvciB0aGlzIGVsZW1lbnQgaWYgaXQgZXhpc3RzXHJcblx0aWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpKSB7XHJcblx0XHRyZXR1cm4gRHJvcHpvbmUub3B0aW9uc1tjYW1lbGl6ZShlbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKSldO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdH1cclxufTtcclxuXHJcbi8vIEhvbGRzIGEgbGlzdCBvZiBhbGwgZHJvcHpvbmUgaW5zdGFuY2VzXHJcbkRyb3B6b25lLmluc3RhbmNlcyA9IFtdO1xyXG5cclxuLy8gUmV0dXJucyB0aGUgZHJvcHpvbmUgZm9yIGdpdmVuIGVsZW1lbnQgaWYgYW55XHJcbkRyb3B6b25lLmZvckVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0aWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xyXG5cdFx0ZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XHJcblx0fVxyXG5cdGlmICgoZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5kcm9wem9uZSA6IHVuZGVmaW5lZCkgPT0gbnVsbCkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFxyXG5cdFx0XHRcIk5vIERyb3B6b25lIGZvdW5kIGZvciBnaXZlbiBlbGVtZW50LiBUaGlzIGlzIHByb2JhYmx5IGJlY2F1c2UgeW91J3JlIHRyeWluZyB0byBhY2Nlc3MgaXQgYmVmb3JlIERyb3B6b25lIGhhZCB0aGUgdGltZSB0byBpbml0aWFsaXplLiBVc2UgdGhlIGBpbml0YCBvcHRpb24gdG8gc2V0dXAgYW55IGFkZGl0aW9uYWwgb2JzZXJ2ZXJzIG9uIHlvdXIgRHJvcHpvbmUuXCJcclxuXHRcdCk7XHJcblx0fVxyXG5cdHJldHVybiBlbGVtZW50LmRyb3B6b25lO1xyXG59O1xyXG5cclxuLy8gU2V0IHRvIGZhbHNlIGlmIHlvdSBkb24ndCB3YW50IERyb3B6b25lIHRvIGF1dG9tYXRpY2FsbHkgZmluZCBhbmQgYXR0YWNoIHRvIC5kcm9wem9uZSBlbGVtZW50cy5cclxuRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gdHJ1ZTtcclxuXHJcbi8vIExvb2tzIGZvciBhbGwgLmRyb3B6b25lIGVsZW1lbnRzIGFuZCBjcmVhdGVzIGEgZHJvcHpvbmUgZm9yIHRoZW1cclxuRHJvcHpvbmUuZGlzY292ZXIgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgZHJvcHpvbmVzID0gdm9pZCAwO1xyXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSB7XHJcblx0XHRkcm9wem9uZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcHpvbmUnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZHJvcHpvbmVzID0gW107XHJcblx0XHQvLyBJRSA6KFxyXG5cdFx0dmFyIGNoZWNrRWxlbWVudHMgPSBmdW5jdGlvbiBjaGVja0VsZW1lbnRzKGVsZW1lbnRzKSB7XHJcblx0XHRcdHJldHVybiAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRcdGZvciAoXHJcblx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMzIgPSBlbGVtZW50cyxcclxuXHRcdFx0XHRcdFx0X2lzQXJyYXkzMiA9IHRydWUsXHJcblx0XHRcdFx0XHRcdF9pMzQgPSAwLFxyXG5cdFx0XHRcdFx0XHRfaXRlcmF0b3IzMiA9IF9pc0FycmF5MzIgPyBfaXRlcmF0b3IzMiA6IF9pdGVyYXRvcjMyW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0XHRcdDtcclxuXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHR2YXIgX3JlZjMxO1xyXG5cclxuXHRcdFx0XHRcdGlmIChfaXNBcnJheTMyKSB7XHJcblx0XHRcdFx0XHRcdGlmIChfaTM0ID49IF9pdGVyYXRvcjMyLmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRcdF9yZWYzMSA9IF9pdGVyYXRvcjMyW19pMzQrK107XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRfaTM0ID0gX2l0ZXJhdG9yMzIubmV4dCgpO1xyXG5cdFx0XHRcdFx0XHRpZiAoX2kzNC5kb25lKSBicmVhaztcclxuXHRcdFx0XHRcdFx0X3JlZjMxID0gX2kzNC52YWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgZWwgPSBfcmVmMzE7XHJcblxyXG5cdFx0XHRcdFx0aWYgKC8oXnwgKWRyb3B6b25lKCR8ICkvLnRlc3QoZWwuY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHQucHVzaChkcm9wem9uZXMucHVzaChlbCkpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godW5kZWZpbmVkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdFx0fSkoKTtcclxuXHRcdH07XHJcblx0XHRjaGVja0VsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSk7XHJcblx0XHRjaGVja0VsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJykpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChmdW5jdGlvbigpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvciAoXHJcblx0XHRcdHZhciBfaXRlcmF0b3IzMyA9IGRyb3B6b25lcyxcclxuXHRcdFx0XHRfaXNBcnJheTMzID0gdHJ1ZSxcclxuXHRcdFx0XHRfaTM1ID0gMCxcclxuXHRcdFx0XHRfaXRlcmF0b3IzMyA9IF9pc0FycmF5MzMgPyBfaXRlcmF0b3IzMyA6IF9pdGVyYXRvcjMzW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxuXHRcdFx0O1xyXG5cclxuXHRcdCkge1xyXG5cdFx0XHR2YXIgX3JlZjMyO1xyXG5cclxuXHRcdFx0aWYgKF9pc0FycmF5MzMpIHtcclxuXHRcdFx0XHRpZiAoX2kzNSA+PSBfaXRlcmF0b3IzMy5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdF9yZWYzMiA9IF9pdGVyYXRvcjMzW19pMzUrK107XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X2kzNSA9IF9pdGVyYXRvcjMzLm5leHQoKTtcclxuXHRcdFx0XHRpZiAoX2kzNS5kb25lKSBicmVhaztcclxuXHRcdFx0XHRfcmVmMzIgPSBfaTM1LnZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgZHJvcHpvbmUgPSBfcmVmMzI7XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgYSBkcm9wem9uZSB1bmxlc3MgYXV0byBkaXNjb3ZlciBoYXMgYmVlbiBkaXNhYmxlZCBmb3Igc3BlY2lmaWMgZWxlbWVudFxyXG5cdFx0XHRpZiAoRHJvcHpvbmUub3B0aW9uc0ZvckVsZW1lbnQoZHJvcHpvbmUpICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKG5ldyBEcm9wem9uZShkcm9wem9uZSkpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fSkoKTtcclxufTtcclxuXHJcbi8vIFNpbmNlIHRoZSB3aG9sZSBEcmFnJ24nRHJvcCBBUEkgaXMgcHJldHR5IG5ldywgc29tZSBicm93c2VycyBpbXBsZW1lbnQgaXQsXHJcbi8vIGJ1dCBub3QgY29ycmVjdGx5LlxyXG4vLyBTbyBJIGNyZWF0ZWQgYSBibGFja2xpc3Qgb2YgdXNlckFnZW50cy4gWWVzLCB5ZXMuIEJyb3dzZXIgc25pZmZpbmcsIEkga25vdy5cclxuLy8gQnV0IHdoYXQgdG8gZG8gd2hlbiBicm93c2VycyAqdGhlb3JldGljYWxseSogc3VwcG9ydCBhbiBBUEksIGJ1dCBjcmFzaFxyXG4vLyB3aGVuIHVzaW5nIGl0LlxyXG4vL1xyXG4vLyBUaGlzIGlzIGEgbGlzdCBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRlc3RlZCBhZ2FpbnN0IG5hdmlnYXRvci51c2VyQWdlbnRcclxuLy9cclxuLy8gKiogSXQgc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiBicm93c2VyIHRoYXQgKmRvKiBzdXBwb3J0IHRoZSBBUEksIGJ1dFxyXG4vLyBpbmNvcnJlY3RseSAqKlxyXG4vL1xyXG5Ecm9wem9uZS5ibGFja2xpc3RlZEJyb3dzZXJzID0gW1xyXG5cdC8vIFRoZSBtYWMgb3MgYW5kIHdpbmRvd3MgcGhvbmUgdmVyc2lvbiBvZiBvcGVyYSAxMiBzZWVtcyB0byBoYXZlIGEgcHJvYmxlbSB3aXRoIHRoZSBGaWxlIGRyYWcnbidkcm9wIEFQSS5cclxuXHQvb3BlcmEuKihNYWNpbnRvc2h8V2luZG93cyBQaG9uZSkuKnZlcnNpb25cXC8xMi9pLFxyXG5dO1xyXG5cclxuLy8gQ2hlY2tzIGlmIHRoZSBicm93c2VyIGlzIHN1cHBvcnRlZFxyXG5Ecm9wem9uZS5pc0Jyb3dzZXJTdXBwb3J0ZWQgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgY2FwYWJsZUJyb3dzZXIgPSB0cnVlO1xyXG5cclxuXHRpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iICYmIHdpbmRvdy5Gb3JtRGF0YSAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSB7XHJcblx0XHRpZiAoISgnY2xhc3NMaXN0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJykpKSB7XHJcblx0XHRcdGNhcGFibGVCcm93c2VyID0gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBUaGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgQVBJLCBidXQgbWF5IGJlIGJsYWNrbGlzdGVkLlxyXG5cdFx0XHRmb3IgKFxyXG5cdFx0XHRcdHZhciBfaXRlcmF0b3IzNCA9IERyb3B6b25lLmJsYWNrbGlzdGVkQnJvd3NlcnMsXHJcblx0XHRcdFx0XHRfaXNBcnJheTM0ID0gdHJ1ZSxcclxuXHRcdFx0XHRcdF9pMzYgPSAwLFxyXG5cdFx0XHRcdFx0X2l0ZXJhdG9yMzQgPSBfaXNBcnJheTM0ID8gX2l0ZXJhdG9yMzQgOiBfaXRlcmF0b3IzNFtTeW1ib2wuaXRlcmF0b3JdKCk7XHJcblx0XHRcdFx0O1xyXG5cclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0dmFyIF9yZWYzMztcclxuXHJcblx0XHRcdFx0aWYgKF9pc0FycmF5MzQpIHtcclxuXHRcdFx0XHRcdGlmIChfaTM2ID49IF9pdGVyYXRvcjM0Lmxlbmd0aCkgYnJlYWs7XHJcblx0XHRcdFx0XHRfcmVmMzMgPSBfaXRlcmF0b3IzNFtfaTM2KytdO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRfaTM2ID0gX2l0ZXJhdG9yMzQubmV4dCgpO1xyXG5cdFx0XHRcdFx0aWYgKF9pMzYuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRfcmVmMzMgPSBfaTM2LnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIHJlZ2V4ID0gX3JlZjMzO1xyXG5cclxuXHRcdFx0XHRpZiAocmVnZXgudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xyXG5cdFx0XHRcdFx0Y2FwYWJsZUJyb3dzZXIgPSBmYWxzZTtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRjYXBhYmxlQnJvd3NlciA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNhcGFibGVCcm93c2VyO1xyXG59O1xyXG5cclxuRHJvcHpvbmUuZGF0YVVSSXRvQmxvYiA9IGZ1bmN0aW9uKGRhdGFVUkkpIHtcclxuXHQvLyBjb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xyXG5cdC8vIGRvZXNuJ3QgaGFuZGxlIFVSTEVuY29kZWQgRGF0YVVSSXMgLSBzZWUgU08gYW5zd2VyICM2ODUwMjc2IGZvciBjb2RlIHRoYXQgZG9lcyB0aGlzXHJcblx0dmFyIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XHJcblxyXG5cdC8vIHNlcGFyYXRlIG91dCB0aGUgbWltZSBjb21wb25lbnRcclxuXHR2YXIgbWltZVN0cmluZyA9IGRhdGFVUklcclxuXHRcdC5zcGxpdCgnLCcpWzBdXHJcblx0XHQuc3BsaXQoJzonKVsxXVxyXG5cdFx0LnNwbGl0KCc7JylbMF07XHJcblxyXG5cdC8vIHdyaXRlIHRoZSBieXRlcyBvZiB0aGUgc3RyaW5nIHRvIGFuIEFycmF5QnVmZmVyXHJcblx0dmFyIGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcclxuXHR2YXIgaWEgPSBuZXcgVWludDhBcnJheShhYik7XHJcblx0Zm9yICh2YXIgaSA9IDAsIGVuZCA9IGJ5dGVTdHJpbmcubGVuZ3RoLCBhc2MgPSAwIDw9IGVuZDsgYXNjID8gaSA8PSBlbmQgOiBpID49IGVuZDsgYXNjID8gaSsrIDogaS0tKSB7XHJcblx0XHRpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcclxuXHR9XHJcblxyXG5cdC8vIHdyaXRlIHRoZSBBcnJheUJ1ZmZlciB0byBhIGJsb2JcclxuXHRyZXR1cm4gbmV3IEJsb2IoW2FiXSwgeyB0eXBlOiBtaW1lU3RyaW5nIH0pO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSByZWplY3RlZCBpdGVtXHJcbnZhciB3aXRob3V0ID0gZnVuY3Rpb24gd2l0aG91dChsaXN0LCByZWplY3RlZEl0ZW0pIHtcclxuXHRyZXR1cm4gbGlzdFxyXG5cdFx0LmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdHJldHVybiBpdGVtICE9PSByZWplY3RlZEl0ZW07XHJcblx0XHR9KVxyXG5cdFx0Lm1hcChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0fSk7XHJcbn07XHJcblxyXG4vLyBhYmMtZGVmX2doaSAtPiBhYmNEZWZHaGlcclxudmFyIGNhbWVsaXplID0gZnVuY3Rpb24gY2FtZWxpemUoc3RyKSB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtX10oXFx3KS9nLCBmdW5jdGlvbihtYXRjaCkge1xyXG5cdFx0cmV0dXJuIG1hdGNoLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBhbiBlbGVtZW50IGZyb20gc3RyaW5nXHJcbkRyb3B6b25lLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbihzdHJpbmcpIHtcclxuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0ZGl2LmlubmVySFRNTCA9IHN0cmluZztcclxuXHRyZXR1cm4gZGl2LmNoaWxkTm9kZXNbMF07XHJcbn07XHJcblxyXG4vLyBUZXN0cyBpZiBnaXZlbiBlbGVtZW50IGlzIGluc2lkZSAob3Igc2ltcGx5IGlzKSB0aGUgY29udGFpbmVyXHJcbkRyb3B6b25lLmVsZW1lbnRJbnNpZGUgPSBmdW5jdGlvbihlbGVtZW50LCBjb250YWluZXIpIHtcclxuXHRpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IC8vIENvZmZlZXNjcmlwdCBkb2Vzbid0IHN1cHBvcnQgZG8vd2hpbGUgbG9vcHNcclxuXHR3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpKSB7XHJcblx0XHRpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5Ecm9wem9uZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24oZWwsIG5hbWUpIHtcclxuXHR2YXIgZWxlbWVudCA9IHZvaWQgMDtcclxuXHRpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xyXG5cdFx0ZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xyXG5cdH0gZWxzZSBpZiAoZWwubm9kZVR5cGUgIT0gbnVsbCkge1xyXG5cdFx0ZWxlbWVudCA9IGVsO1xyXG5cdH1cclxuXHRpZiAoZWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYCcgKyBuYW1lICsgJ2Agb3B0aW9uIHByb3ZpZGVkLiBQbGVhc2UgcHJvdmlkZSBhIENTUyBzZWxlY3RvciBvciBhIHBsYWluIEhUTUwgZWxlbWVudC4nKTtcclxuXHR9XHJcblx0cmV0dXJuIGVsZW1lbnQ7XHJcbn07XHJcblxyXG5Ecm9wem9uZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uKGVscywgbmFtZSkge1xyXG5cdHZhciBlbCA9IHZvaWQgMCxcclxuXHRcdGVsZW1lbnRzID0gdm9pZCAwO1xyXG5cdGlmIChlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0ZWxlbWVudHMgPSBbXTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGZvciAoXHJcblx0XHRcdFx0dmFyIF9pdGVyYXRvcjM1ID0gZWxzLFxyXG5cdFx0XHRcdFx0X2lzQXJyYXkzNSA9IHRydWUsXHJcblx0XHRcdFx0XHRfaTM3ID0gMCxcclxuXHRcdFx0XHRcdF9pdGVyYXRvcjM1ID0gX2lzQXJyYXkzNSA/IF9pdGVyYXRvcjM1IDogX2l0ZXJhdG9yMzVbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHRcdDtcclxuXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdGlmIChfaXNBcnJheTM1KSB7XHJcblx0XHRcdFx0XHRpZiAoX2kzNyA+PSBfaXRlcmF0b3IzNS5sZW5ndGgpIGJyZWFrO1xyXG5cdFx0XHRcdFx0ZWwgPSBfaXRlcmF0b3IzNVtfaTM3KytdO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRfaTM3ID0gX2l0ZXJhdG9yMzUubmV4dCgpO1xyXG5cdFx0XHRcdFx0aWYgKF9pMzcuZG9uZSkgYnJlYWs7XHJcblx0XHRcdFx0XHRlbCA9IF9pMzcudmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbGVtZW50cy5wdXNoKHRoaXMuZ2V0RWxlbWVudChlbCwgbmFtZSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGVsZW1lbnRzID0gbnVsbDtcclxuXHRcdH1cclxuXHR9IGVsc2UgaWYgKHR5cGVvZiBlbHMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRlbGVtZW50cyA9IFtdO1xyXG5cdFx0Zm9yIChcclxuXHRcdFx0dmFyIF9pdGVyYXRvcjM2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbHMpLFxyXG5cdFx0XHRcdF9pc0FycmF5MzYgPSB0cnVlLFxyXG5cdFx0XHRcdF9pMzggPSAwLFxyXG5cdFx0XHRcdF9pdGVyYXRvcjM2ID0gX2lzQXJyYXkzNiA/IF9pdGVyYXRvcjM2IDogX2l0ZXJhdG9yMzZbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0XHQ7XHJcblxyXG5cdFx0KSB7XHJcblx0XHRcdGlmIChfaXNBcnJheTM2KSB7XHJcblx0XHRcdFx0aWYgKF9pMzggPj0gX2l0ZXJhdG9yMzYubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0XHRlbCA9IF9pdGVyYXRvcjM2W19pMzgrK107XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X2kzOCA9IF9pdGVyYXRvcjM2Lm5leHQoKTtcclxuXHRcdFx0XHRpZiAoX2kzOC5kb25lKSBicmVhaztcclxuXHRcdFx0XHRlbCA9IF9pMzgudmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsZW1lbnRzLnB1c2goZWwpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoZWxzLm5vZGVUeXBlICE9IG51bGwpIHtcclxuXHRcdGVsZW1lbnRzID0gW2Vsc107XHJcblx0fVxyXG5cclxuXHRpZiAoZWxlbWVudHMgPT0gbnVsbCB8fCAhZWxlbWVudHMubGVuZ3RoKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXHJcblx0XHRcdCdJbnZhbGlkIGAnICsgbmFtZSArICdgIG9wdGlvbiBwcm92aWRlZC4gUGxlYXNlIHByb3ZpZGUgYSBDU1Mgc2VsZWN0b3IsIGEgcGxhaW4gSFRNTCBlbGVtZW50IG9yIGEgbGlzdCBvZiB0aG9zZS4nXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGVsZW1lbnRzO1xyXG59O1xyXG5cclxuLy8gQXNrcyB0aGUgdXNlciB0aGUgcXVlc3Rpb24gYW5kIGNhbGxzIGFjY2VwdGVkIG9yIHJlamVjdGVkIGFjY29yZGluZ2x5XHJcbi8vXHJcbi8vIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGp1c3QgdXNlcyBgd2luZG93LmNvbmZpcm1gIGFuZCB0aGVuIGNhbGxzIHRoZVxyXG4vLyBhcHByb3ByaWF0ZSBjYWxsYmFjay5cclxuRHJvcHpvbmUuY29uZmlybSA9IGZ1bmN0aW9uKHF1ZXN0aW9uLCBhY2NlcHRlZCwgcmVqZWN0ZWQpIHtcclxuXHRpZiAod2luZG93LmNvbmZpcm0ocXVlc3Rpb24pKSB7XHJcblx0XHRyZXR1cm4gYWNjZXB0ZWQoKTtcclxuXHR9IGVsc2UgaWYgKHJlamVjdGVkICE9IG51bGwpIHtcclxuXHRcdHJldHVybiByZWplY3RlZCgpO1xyXG5cdH1cclxufTtcclxuXHJcbi8vIFZhbGlkYXRlcyB0aGUgbWltZSB0eXBlIGxpa2UgdGhpczpcclxuLy9cclxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9IVE1ML0VsZW1lbnQvaW5wdXQjYXR0ci1hY2NlcHRcclxuRHJvcHpvbmUuaXNWYWxpZEZpbGUgPSBmdW5jdGlvbihmaWxlLCBhY2NlcHRlZEZpbGVzKSB7XHJcblx0aWYgKCFhY2NlcHRlZEZpbGVzKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IC8vIElmIHRoZXJlIGFyZSBubyBhY2NlcHRlZCBtaW1lIHR5cGVzLCBpdCdzIE9LXHJcblx0YWNjZXB0ZWRGaWxlcyA9IGFjY2VwdGVkRmlsZXMuc3BsaXQoJywnKTtcclxuXHJcblx0dmFyIG1pbWVUeXBlID0gZmlsZS50eXBlO1xyXG5cdHZhciBiYXNlTWltZVR5cGUgPSBtaW1lVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCAnJyk7XHJcblxyXG5cdGZvciAoXHJcblx0XHR2YXIgX2l0ZXJhdG9yMzcgPSBhY2NlcHRlZEZpbGVzLFxyXG5cdFx0XHRfaXNBcnJheTM3ID0gdHJ1ZSxcclxuXHRcdFx0X2kzOSA9IDAsXHJcblx0XHRcdF9pdGVyYXRvcjM3ID0gX2lzQXJyYXkzNyA/IF9pdGVyYXRvcjM3IDogX2l0ZXJhdG9yMzdbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG5cdFx0O1xyXG5cclxuXHQpIHtcclxuXHRcdHZhciBfcmVmMzQ7XHJcblxyXG5cdFx0aWYgKF9pc0FycmF5MzcpIHtcclxuXHRcdFx0aWYgKF9pMzkgPj0gX2l0ZXJhdG9yMzcubGVuZ3RoKSBicmVhaztcclxuXHRcdFx0X3JlZjM0ID0gX2l0ZXJhdG9yMzdbX2kzOSsrXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdF9pMzkgPSBfaXRlcmF0b3IzNy5uZXh0KCk7XHJcblx0XHRcdGlmIChfaTM5LmRvbmUpIGJyZWFrO1xyXG5cdFx0XHRfcmVmMzQgPSBfaTM5LnZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB2YWxpZFR5cGUgPSBfcmVmMzQ7XHJcblxyXG5cdFx0dmFsaWRUeXBlID0gdmFsaWRUeXBlLnRyaW0oKTtcclxuXHRcdGlmICh2YWxpZFR5cGUuY2hhckF0KDApID09PSAnLicpIHtcclxuXHRcdFx0aWYgKGZpbGUubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsaWRUeXBlLnRvTG93ZXJDYXNlKCksIGZpbGUubmFtZS5sZW5ndGggLSB2YWxpZFR5cGUubGVuZ3RoKSAhPT0gLTEpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICgvXFwvXFwqJC8udGVzdCh2YWxpZFR5cGUpKSB7XHJcblx0XHRcdC8vIFRoaXMgaXMgc29tZXRoaW5nIGxpa2UgYSBpbWFnZS8qIG1pbWUgdHlwZVxyXG5cdFx0XHRpZiAoYmFzZU1pbWVUeXBlID09PSB2YWxpZFR5cGUucmVwbGFjZSgvXFwvLiokLywgJycpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChtaW1lVHlwZSA9PT0gdmFsaWRUeXBlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8vIEF1Z21lbnQgalF1ZXJ5XHJcbmlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiBqUXVlcnkgIT09IG51bGwpIHtcclxuXHRqUXVlcnkuZm4uZHJvcHpvbmUgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IERyb3B6b25lKHRoaXMsIG9wdGlvbnMpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZSAhPT0gbnVsbCkge1xyXG5cdG1vZHVsZS5leHBvcnRzID0gRHJvcHpvbmU7XHJcbn0gZWxzZSB7XHJcblx0d2luZG93LkRyb3B6b25lID0gRHJvcHpvbmU7XHJcbn1cclxuXHJcbi8vIERyb3B6b25lIGZpbGUgc3RhdHVzIGNvZGVzXHJcbkRyb3B6b25lLkFEREVEID0gJ2FkZGVkJztcclxuXHJcbkRyb3B6b25lLlFVRVVFRCA9ICdxdWV1ZWQnO1xyXG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIE5vdywgaWYgYSBmaWxlIGlzIGFjY2VwdGVkLCBpdCdzIGVpdGhlciBxdWV1ZWRcclxuLy8gb3IgdXBsb2FkaW5nLlxyXG5Ecm9wem9uZS5BQ0NFUFRFRCA9IERyb3B6b25lLlFVRVVFRDtcclxuXHJcbkRyb3B6b25lLlVQTE9BRElORyA9ICd1cGxvYWRpbmcnO1xyXG5Ecm9wem9uZS5QUk9DRVNTSU5HID0gRHJvcHpvbmUuVVBMT0FESU5HOyAvLyBhbGlhc1xyXG5cclxuRHJvcHpvbmUuQ0FOQ0VMRUQgPSAnY2FuY2VsZWQnO1xyXG5Ecm9wem9uZS5FUlJPUiA9ICdlcnJvcic7XHJcbkRyb3B6b25lLlNVQ0NFU1MgPSAnc3VjY2Vzcyc7XHJcblxyXG4vKlxyXG5cclxuIEJ1Z2ZpeCBmb3IgaU9TIDYgYW5kIDdcclxuIFNvdXJjZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTkyOTA5OS9odG1sNS1jYW52YXMtZHJhd2ltYWdlLXJhdGlvLWJ1Zy1pb3NcclxuIGJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXHJcblxyXG4gKi9cclxuXHJcbi8vIERldGVjdGluZyB2ZXJ0aWNhbCBzcXVhc2ggaW4gbG9hZGVkIGltYWdlLlxyXG4vLyBGaXhlcyBhIGJ1ZyB3aGljaCBzcXVhc2ggaW1hZ2UgdmVydGljYWxseSB3aGlsZSBkcmF3aW5nIGludG8gY2FudmFzIGZvciBzb21lIGltYWdlcy5cclxuLy8gVGhpcyBpcyBhIGJ1ZyBpbiBpT1M2IGRldmljZXMuIFRoaXMgZnVuY3Rpb24gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc3RvbWl0YS9pb3MtaW1hZ2VmaWxlLW1lZ2FwaXhlbFxyXG52YXIgZGV0ZWN0VmVydGljYWxTcXVhc2ggPSBmdW5jdGlvbiBkZXRlY3RWZXJ0aWNhbFNxdWFzaChpbWcpIHtcclxuXHR2YXIgaXcgPSBpbWcubmF0dXJhbFdpZHRoO1xyXG5cdHZhciBpaCA9IGltZy5uYXR1cmFsSGVpZ2h0O1xyXG5cdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRjYW52YXMud2lkdGggPSAxO1xyXG5cdGNhbnZhcy5oZWlnaHQgPSBpaDtcclxuXHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG5cclxuXHR2YXIgX2N0eCRnZXRJbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDEsIDAsIDEsIGloKSxcclxuXHRcdGRhdGEgPSBfY3R4JGdldEltYWdlRGF0YS5kYXRhO1xyXG5cclxuXHQvLyBzZWFyY2ggaW1hZ2UgZWRnZSBwaXhlbCBwb3NpdGlvbiBpbiBjYXNlIGl0IGlzIHNxdWFzaGVkIHZlcnRpY2FsbHkuXHJcblxyXG5cdHZhciBzeSA9IDA7XHJcblx0dmFyIGV5ID0gaWg7XHJcblx0dmFyIHB5ID0gaWg7XHJcblx0d2hpbGUgKHB5ID4gc3kpIHtcclxuXHRcdHZhciBhbHBoYSA9IGRhdGFbKHB5IC0gMSkgKiA0ICsgM107XHJcblxyXG5cdFx0aWYgKGFscGhhID09PSAwKSB7XHJcblx0XHRcdGV5ID0gcHk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzeSA9IHB5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHB5ID0gKGV5ICsgc3kpID4+IDE7XHJcblx0fVxyXG5cdHZhciByYXRpbyA9IHB5IC8gaWg7XHJcblxyXG5cdGlmIChyYXRpbyA9PT0gMCkge1xyXG5cdFx0cmV0dXJuIDE7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiByYXRpbztcclxuXHR9XHJcbn07XHJcblxyXG4vLyBBIHJlcGxhY2VtZW50IGZvciBjb250ZXh0LmRyYXdJbWFnZVxyXG4vLyAoYXJncyBhcmUgZm9yIHNvdXJjZSBhbmQgZGVzdGluYXRpb24pLlxyXG52YXIgZHJhd0ltYWdlSU9TRml4ID0gZnVuY3Rpb24gZHJhd0ltYWdlSU9TRml4KGN0eCwgaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcclxuXHR2YXIgdmVydFNxdWFzaFJhdGlvID0gZGV0ZWN0VmVydGljYWxTcXVhc2goaW1nKTtcclxuXHRyZXR1cm4gY3R4LmRyYXdJbWFnZShpbWcsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCAvIHZlcnRTcXVhc2hSYXRpbyk7XHJcbn07XHJcblxyXG4vLyBCYXNlZCBvbiBNaW5pZnlKcGVnXHJcbi8vIFNvdXJjZTogaHR0cDovL3d3dy5wZXJyeS5jei9maWxlcy9FeGlmUmVzdG9yZXIuanNcclxuLy8gaHR0cDovL2VsaWNvbi5ibG9nNTcuZmMyLmNvbS9ibG9nLWVudHJ5LTIwNi5odG1sXHJcblxyXG52YXIgRXhpZlJlc3RvcmUgPSAoZnVuY3Rpb24oKSB7XHJcblx0ZnVuY3Rpb24gRXhpZlJlc3RvcmUoKSB7XHJcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhpZlJlc3RvcmUpO1xyXG5cdH1cclxuXHJcblx0X2NyZWF0ZUNsYXNzKEV4aWZSZXN0b3JlLCBudWxsLCBbXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2luaXRDbGFzcycsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbml0Q2xhc3MoKSB7XHJcblx0XHRcdFx0dGhpcy5LRVlfU1RSID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2VuY29kZTY0JyxcclxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGVuY29kZTY0KGlucHV0KSB7XHJcblx0XHRcdFx0dmFyIG91dHB1dCA9ICcnO1xyXG5cdFx0XHRcdHZhciBjaHIxID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBjaHIyID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBjaHIzID0gJyc7XHJcblx0XHRcdFx0dmFyIGVuYzEgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0dmFyIGVuYzIgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0dmFyIGVuYzMgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0dmFyIGVuYzQgPSAnJztcclxuXHRcdFx0XHR2YXIgaSA9IDA7XHJcblx0XHRcdFx0d2hpbGUgKHRydWUpIHtcclxuXHRcdFx0XHRcdGNocjEgPSBpbnB1dFtpKytdO1xyXG5cdFx0XHRcdFx0Y2hyMiA9IGlucHV0W2krK107XHJcblx0XHRcdFx0XHRjaHIzID0gaW5wdXRbaSsrXTtcclxuXHRcdFx0XHRcdGVuYzEgPSBjaHIxID4+IDI7XHJcblx0XHRcdFx0XHRlbmMyID0gKChjaHIxICYgMykgPDwgNCkgfCAoY2hyMiA+PiA0KTtcclxuXHRcdFx0XHRcdGVuYzMgPSAoKGNocjIgJiAxNSkgPDwgMikgfCAoY2hyMyA+PiA2KTtcclxuXHRcdFx0XHRcdGVuYzQgPSBjaHIzICYgNjM7XHJcblx0XHRcdFx0XHRpZiAoaXNOYU4oY2hyMikpIHtcclxuXHRcdFx0XHRcdFx0ZW5jMyA9IGVuYzQgPSA2NDtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaXNOYU4oY2hyMykpIHtcclxuXHRcdFx0XHRcdFx0ZW5jNCA9IDY0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0b3V0cHV0ID1cclxuXHRcdFx0XHRcdFx0b3V0cHV0ICtcclxuXHRcdFx0XHRcdFx0dGhpcy5LRVlfU1RSLmNoYXJBdChlbmMxKSArXHJcblx0XHRcdFx0XHRcdHRoaXMuS0VZX1NUUi5jaGFyQXQoZW5jMikgK1xyXG5cdFx0XHRcdFx0XHR0aGlzLktFWV9TVFIuY2hhckF0KGVuYzMpICtcclxuXHRcdFx0XHRcdFx0dGhpcy5LRVlfU1RSLmNoYXJBdChlbmM0KTtcclxuXHRcdFx0XHRcdGNocjEgPSBjaHIyID0gY2hyMyA9ICcnO1xyXG5cdFx0XHRcdFx0ZW5jMSA9IGVuYzIgPSBlbmMzID0gZW5jNCA9ICcnO1xyXG5cdFx0XHRcdFx0aWYgKCEoaSA8IGlucHV0Lmxlbmd0aCkpIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBvdXRwdXQ7XHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRrZXk6ICdyZXN0b3JlJyxcclxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlc3RvcmUob3JpZ0ZpbGVCYXNlNjQsIHJlc2l6ZWRGaWxlQmFzZTY0KSB7XHJcblx0XHRcdFx0aWYgKCFvcmlnRmlsZUJhc2U2NC5tYXRjaCgnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlc2l6ZWRGaWxlQmFzZTY0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgcmF3SW1hZ2UgPSB0aGlzLmRlY29kZTY0KG9yaWdGaWxlQmFzZTY0LnJlcGxhY2UoJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJywgJycpKTtcclxuXHRcdFx0XHR2YXIgc2VnbWVudHMgPSB0aGlzLnNsaWNlMlNlZ21lbnRzKHJhd0ltYWdlKTtcclxuXHRcdFx0XHR2YXIgaW1hZ2UgPSB0aGlzLmV4aWZNYW5pcHVsYXRpb24ocmVzaXplZEZpbGVCYXNlNjQsIHNlZ21lbnRzKTtcclxuXHRcdFx0XHRyZXR1cm4gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIHRoaXMuZW5jb2RlNjQoaW1hZ2UpO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAnZXhpZk1hbmlwdWxhdGlvbicsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBleGlmTWFuaXB1bGF0aW9uKHJlc2l6ZWRGaWxlQmFzZTY0LCBzZWdtZW50cykge1xyXG5cdFx0XHRcdHZhciBleGlmQXJyYXkgPSB0aGlzLmdldEV4aWZBcnJheShzZWdtZW50cyk7XHJcblx0XHRcdFx0dmFyIG5ld0ltYWdlQXJyYXkgPSB0aGlzLmluc2VydEV4aWYocmVzaXplZEZpbGVCYXNlNjQsIGV4aWZBcnJheSk7XHJcblx0XHRcdFx0dmFyIGFCdWZmZXIgPSBuZXcgVWludDhBcnJheShuZXdJbWFnZUFycmF5KTtcclxuXHRcdFx0XHRyZXR1cm4gYUJ1ZmZlcjtcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2dldEV4aWZBcnJheScsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRFeGlmQXJyYXkoc2VnbWVudHMpIHtcclxuXHRcdFx0XHR2YXIgc2VnID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciB4ID0gMDtcclxuXHRcdFx0XHR3aGlsZSAoeCA8IHNlZ21lbnRzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0c2VnID0gc2VnbWVudHNbeF07XHJcblx0XHRcdFx0XHRpZiAoKHNlZ1swXSA9PT0gMjU1KSAmIChzZWdbMV0gPT09IDIyNSkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlZztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHgrKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAnaW5zZXJ0RXhpZicsXHJcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbnNlcnRFeGlmKHJlc2l6ZWRGaWxlQmFzZTY0LCBleGlmQXJyYXkpIHtcclxuXHRcdFx0XHR2YXIgaW1hZ2VEYXRhID0gcmVzaXplZEZpbGVCYXNlNjQucmVwbGFjZSgnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnLCAnJyk7XHJcblx0XHRcdFx0dmFyIGJ1ZiA9IHRoaXMuZGVjb2RlNjQoaW1hZ2VEYXRhKTtcclxuXHRcdFx0XHR2YXIgc2VwYXJhdGVQb2ludCA9IGJ1Zi5pbmRleE9mKDI1NSwgMyk7XHJcblx0XHRcdFx0dmFyIG1hZSA9IGJ1Zi5zbGljZSgwLCBzZXBhcmF0ZVBvaW50KTtcclxuXHRcdFx0XHR2YXIgYXRvID0gYnVmLnNsaWNlKHNlcGFyYXRlUG9pbnQpO1xyXG5cdFx0XHRcdHZhciBhcnJheSA9IG1hZTtcclxuXHRcdFx0XHRhcnJheSA9IGFycmF5LmNvbmNhdChleGlmQXJyYXkpO1xyXG5cdFx0XHRcdGFycmF5ID0gYXJyYXkuY29uY2F0KGF0byk7XHJcblx0XHRcdFx0cmV0dXJuIGFycmF5O1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0a2V5OiAnc2xpY2UyU2VnbWVudHMnLFxyXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gc2xpY2UyU2VnbWVudHMocmF3SW1hZ2VBcnJheSkge1xyXG5cdFx0XHRcdHZhciBoZWFkID0gMDtcclxuXHRcdFx0XHR2YXIgc2VnbWVudHMgPSBbXTtcclxuXHRcdFx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFx0XHRcdFx0dmFyIGxlbmd0aDtcclxuXHRcdFx0XHRcdGlmICgocmF3SW1hZ2VBcnJheVtoZWFkXSA9PT0gMjU1KSAmIChyYXdJbWFnZUFycmF5W2hlYWQgKyAxXSA9PT0gMjE4KSkge1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICgocmF3SW1hZ2VBcnJheVtoZWFkXSA9PT0gMjU1KSAmIChyYXdJbWFnZUFycmF5W2hlYWQgKyAxXSA9PT0gMjE2KSkge1xyXG5cdFx0XHRcdFx0XHRoZWFkICs9IDI7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRsZW5ndGggPSByYXdJbWFnZUFycmF5W2hlYWQgKyAyXSAqIDI1NiArIHJhd0ltYWdlQXJyYXlbaGVhZCArIDNdO1xyXG5cdFx0XHRcdFx0XHR2YXIgZW5kUG9pbnQgPSBoZWFkICsgbGVuZ3RoICsgMjtcclxuXHRcdFx0XHRcdFx0dmFyIHNlZyA9IHJhd0ltYWdlQXJyYXkuc2xpY2UoaGVhZCwgZW5kUG9pbnQpO1xyXG5cdFx0XHRcdFx0XHRzZWdtZW50cy5wdXNoKHNlZyk7XHJcblx0XHRcdFx0XHRcdGhlYWQgPSBlbmRQb2ludDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChoZWFkID4gcmF3SW1hZ2VBcnJheS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBzZWdtZW50cztcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGtleTogJ2RlY29kZTY0JyxcclxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGRlY29kZTY0KGlucHV0KSB7XHJcblx0XHRcdFx0dmFyIG91dHB1dCA9ICcnO1xyXG5cdFx0XHRcdHZhciBjaHIxID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBjaHIyID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdHZhciBjaHIzID0gJyc7XHJcblx0XHRcdFx0dmFyIGVuYzEgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0dmFyIGVuYzIgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0dmFyIGVuYzMgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0dmFyIGVuYzQgPSAnJztcclxuXHRcdFx0XHR2YXIgaSA9IDA7XHJcblx0XHRcdFx0dmFyIGJ1ZiA9IFtdO1xyXG5cdFx0XHRcdC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgKywgLywgb3IgPVxyXG5cdFx0XHRcdHZhciBiYXNlNjR0ZXN0ID0gL1teQS1aYS16MC05XFwrXFwvXFw9XS9nO1xyXG5cdFx0XHRcdGlmIChiYXNlNjR0ZXN0LmV4ZWMoaW5wdXQpKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXHJcblx0XHRcdFx0XHRcdFwiVGhlcmUgd2VyZSBpbnZhbGlkIGJhc2U2NCBjaGFyYWN0ZXJzIGluIHRoZSBpbnB1dCB0ZXh0LlxcblZhbGlkIGJhc2U2NCBjaGFyYWN0ZXJzIGFyZSBBLVosIGEteiwgMC05LCAnKycsICcvJyxhbmQgJz0nXFxuRXhwZWN0IGVycm9ycyBpbiBkZWNvZGluZy5cIlxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZywgJycpO1xyXG5cdFx0XHRcdHdoaWxlICh0cnVlKSB7XHJcblx0XHRcdFx0XHRlbmMxID0gdGhpcy5LRVlfU1RSLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xyXG5cdFx0XHRcdFx0ZW5jMiA9IHRoaXMuS0VZX1NUUi5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcclxuXHRcdFx0XHRcdGVuYzMgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XHJcblx0XHRcdFx0XHRlbmM0ID0gdGhpcy5LRVlfU1RSLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xyXG5cdFx0XHRcdFx0Y2hyMSA9IChlbmMxIDw8IDIpIHwgKGVuYzIgPj4gNCk7XHJcblx0XHRcdFx0XHRjaHIyID0gKChlbmMyICYgMTUpIDw8IDQpIHwgKGVuYzMgPj4gMik7XHJcblx0XHRcdFx0XHRjaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0O1xyXG5cdFx0XHRcdFx0YnVmLnB1c2goY2hyMSk7XHJcblx0XHRcdFx0XHRpZiAoZW5jMyAhPT0gNjQpIHtcclxuXHRcdFx0XHRcdFx0YnVmLnB1c2goY2hyMik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoZW5jNCAhPT0gNjQpIHtcclxuXHRcdFx0XHRcdFx0YnVmLnB1c2goY2hyMyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjaHIxID0gY2hyMiA9IGNocjMgPSAnJztcclxuXHRcdFx0XHRcdGVuYzEgPSBlbmMyID0gZW5jMyA9IGVuYzQgPSAnJztcclxuXHRcdFx0XHRcdGlmICghKGkgPCBpbnB1dC5sZW5ndGgpKSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gYnVmO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRdKTtcclxuXHJcblx0cmV0dXJuIEV4aWZSZXN0b3JlO1xyXG59KSgpO1xyXG5cclxuRXhpZlJlc3RvcmUuaW5pdENsYXNzKCk7XHJcblxyXG4vKlxyXG4gKiBjb250ZW50bG9hZGVkLmpzXHJcbiAqXHJcbiAqIEF1dGhvcjogRGllZ28gUGVyaW5pIChkaWVnby5wZXJpbmkgYXQgZ21haWwuY29tKVxyXG4gKiBTdW1tYXJ5OiBjcm9zcy1icm93c2VyIHdyYXBwZXIgZm9yIERPTUNvbnRlbnRMb2FkZWRcclxuICogVXBkYXRlZDogMjAxMDEwMjBcclxuICogTGljZW5zZTogTUlUXHJcbiAqIFZlcnNpb246IDEuMlxyXG4gKlxyXG4gKiBVUkw6XHJcbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL1xyXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxyXG4gKi9cclxuXHJcbi8vIEB3aW4gd2luZG93IHJlZmVyZW5jZVxyXG4vLyBAZm4gZnVuY3Rpb24gcmVmZXJlbmNlXHJcbnZhciBjb250ZW50TG9hZGVkID0gZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XHJcblx0dmFyIGRvbmUgPSBmYWxzZTtcclxuXHR2YXIgdG9wID0gdHJ1ZTtcclxuXHR2YXIgZG9jID0gd2luLmRvY3VtZW50O1xyXG5cdHZhciByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudDtcclxuXHR2YXIgYWRkID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnO1xyXG5cdHZhciByZW0gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCc7XHJcblx0dmFyIHByZSA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gJycgOiAnb24nO1xyXG5cdHZhciBpbml0ID0gZnVuY3Rpb24gaW5pdChlKSB7XHJcblx0XHRpZiAoZS50eXBlID09PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0KGUudHlwZSA9PT0gJ2xvYWQnID8gd2luIDogZG9jKVtyZW1dKHByZSArIGUudHlwZSwgaW5pdCwgZmFsc2UpO1xyXG5cdFx0aWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIHtcclxuXHRcdFx0cmV0dXJuIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0dmFyIHBvbGwgPSBmdW5jdGlvbiBwb2xsKCkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cm9vdC5kb1Njcm9sbCgnbGVmdCcpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRzZXRUaW1lb3V0KHBvbGwsIDUwKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGluaXQoJ3BvbGwnKTtcclxuXHR9O1xyXG5cclxuXHRpZiAoZG9jLnJlYWR5U3RhdGUgIT09ICdjb21wbGV0ZScpIHtcclxuXHRcdGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QgJiYgcm9vdC5kb1Njcm9sbCkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50O1xyXG5cdFx0XHR9IGNhdGNoIChlcnJvcikge31cclxuXHRcdFx0aWYgKHRvcCkge1xyXG5cdFx0XHRcdHBvbGwoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZG9jW2FkZF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XHJcblx0XHRkb2NbYWRkXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcclxuXHRcdHJldHVybiB3aW5bYWRkXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBBcyBhIHNpbmdsZSBmdW5jdGlvbiB0byBiZSBhYmxlIHRvIHdyaXRlIHRlc3RzLlxyXG5Ecm9wem9uZS5fYXV0b0Rpc2NvdmVyRnVuY3Rpb24gPSBmdW5jdGlvbigpIHtcclxuXHRpZiAoRHJvcHpvbmUuYXV0b0Rpc2NvdmVyKSB7XHJcblx0XHRyZXR1cm4gRHJvcHpvbmUuZGlzY292ZXIoKTtcclxuXHR9XHJcbn07XHJcbmNvbnRlbnRMb2FkZWQod2luZG93LCBEcm9wem9uZS5fYXV0b0Rpc2NvdmVyRnVuY3Rpb24pO1xyXG5cclxuZnVuY3Rpb24gX19ndWFyZF9fKHZhbHVlLCB0cmFuc2Zvcm0pIHtcclxuXHRyZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbCA/IHRyYW5zZm9ybSh2YWx1ZSkgOiB1bmRlZmluZWQ7XHJcbn1cclxuZnVuY3Rpb24gX19ndWFyZE1ldGhvZF9fKG9iaiwgbWV0aG9kTmFtZSwgdHJhbnNmb3JtKSB7XHJcblx0aWYgKHR5cGVvZiBvYmogIT09ICd1bmRlZmluZWQnICYmIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqW21ldGhvZE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRyZXR1cm4gdHJhbnNmb3JtKG9iaiwgbWV0aG9kTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG59XHJcblxyXG5TYXBwaGlyZVdpZGdldHMuRHJvcHpvbmUgPSBEcm9wem9uZTtcclxuIiwiLyogQ29tcG9uZW50IEV4cGFuZGFibGVMaW5rICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IHdpZGdldElEID0+IHtcclxuXHRcdGNvbnN0ICRlbGVtZW50V3JhcHBlciA9ICQoYCMke3dpZGdldElEfWApO1xyXG5cclxuXHRcdGlmICgkZWxlbWVudFdyYXBwZXIucGFyZW50KCcuRXhwYW5kYWJsZUxpc3QnKS5oYXNDbGFzcygnSGlkZVdoZW5FbXB0eScpKSB7XHJcblx0XHRcdGNvbnN0IHRleHQgPSAkZWxlbWVudFdyYXBwZXIuZmluZCgnLkV4cGFuZGFibGVMaW5rX19Db250ZW50JykudGV4dCgpO1xyXG5cclxuXHRcdFx0aWYgKHRleHQubGVuZ3RoID09PSAwKSAkZWxlbWVudFdyYXBwZXIucGFyZW50KCcuRXhwYW5kYWJsZUxpc3QnKS5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0YmluZEV2ZW50cyh3aWRnZXRJRCk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgYmluZEV2ZW50cyA9IHdpZGdldElEID0+IHtcclxuXHRcdCQoYCMke3dpZGdldElEfSAuRXhwYW5kYWJsZUxpbmtfX0hlYWRlcmApLmNsaWNrKCgpID0+IG9wZW5DbG9zZShgIyR7d2lkZ2V0SUR9YCkpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IG9wZW5DbG9zZSA9IGVsZW1lbnRJRCA9PiAkKGVsZW1lbnRJRCkudG9nZ2xlQ2xhc3MoJ0V4cGFuZGFibGVMaW5rLS1leHBhbmRlZCcpO1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuRXhwYW5kYWJsZUxpbmsgPSB7IGNyZWF0ZSB9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IEZ1bGxTY3JlZW5UYWJzV3JhcHBlciAqL1xyXG5TYXBwaGlyZVdpZGdldHMuRnVsbFNjcmVlblRhYnNXcmFwcGVyID0gKCkgPT4ge1xyXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLlRhYldyYXBwZXInKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5zaWJsaW5ncygpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdBY3RpdmUnKTtcclxuXHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnQWN0aXZlJyk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufTtcclxuIiwiLyogQ29tcG9uZW50IEdlbmVyaWNHYWxsZXJ5ICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgYWxsR2VuZXJpY0dhbGxlcmllcyA9IFtdO1xyXG5cclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHRiaW5kR2VuZXJpY0dhbGxlcnkoY29uZmlnKTtcclxuXHRcdGlmIChvc0FqYXhCYWNrZW5kKSB7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0YmluZEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGJpbmRHZW5lcmljR2FsbGVyeShjb25maWcpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR2YXIgYmluZEdlbmVyaWNHYWxsZXJ5ID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbEdlbmVyaWNHYWxsZXJpZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKGFsbEdlbmVyaWNHYWxsZXJpZXNbaV0uY29uZmlnLndpZGdldElkID09PSBjb25maWcud2lkZ2V0SWQpIHtcclxuXHRcdFx0XHRhbGxHZW5lcmljR2FsbGVyaWVzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgR2VuZXJpY0dhbGxlcnkoY29uZmlnKTtcclxuXHRcdGFsbEdlbmVyaWNHYWxsZXJpZXMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblx0fTtcclxuXHJcblx0dmFyIEdlbmVyaWNHYWxsZXJ5ID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLmdlbmVyaWNHYWxsZXJ5UmVzaXplVGltZXIgPSAwO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR0aGlzLmVxdWFsSGVpZ2h0ID0gdGhpcy5jb25maWcuZXF1YWxIZWlnaHQ7XHJcblx0XHRpZiAoXHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4nKS5sZW5ndGggPT09IDEgJiZcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1jb250ZW50ID4gc3BhbicpLmhhc0NsYXNzKCdMaXN0UmVjb3JkcycpXHJcblx0XHQpIHtcclxuXHRcdFx0dGhpcy4kZ2FsbGVyeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4uTGlzdFJlY29yZHMnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGdhbGxlcnkgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWNvbnRlbnQnKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuJGdhbGxlcnlJdGVtcyA9IHRoaXMuJGdhbGxlcnkuY2hpbGRyZW4oKTtcclxuXHRcdHRoaXMuJGdhbGxlcnlJdGVtcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoISQodGhpcykuaGFzQ2xhc3MoJ0dlbmVyaWNHYWxsZXJ5LWl0ZW0nKSkge1xyXG5cdFx0XHRcdCQodGhpcykud3JhcCgnPGRpdiBjbGFzcz1cIkdlbmVyaWNHYWxsZXJ5LWl0ZW1cIj48L2Rpdj4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRfdGhpcy5jYWxjdWxhdGUoMCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRHZW5lcmljR2FsbGVyeS5wcm90b3R5cGUuY2FsY3VsYXRlID0gZnVuY3Rpb24odGltZW91dCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5nZW5lcmljR2FsbGVyeVJlc2l6ZVRpbWVyKTtcclxuXHRcdHRoaXMuZ2VuZXJpY0dhbGxlcnlSZXNpemVUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgd2lkZ2V0V2lkdGggPSBfdGhpcy4kd2lkZ2V0Lm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHRcdHZhciBwZXJMaW5lO1xyXG5cdFx0XHRpZiAod2lkZ2V0V2lkdGggPj0gMTkwMCkge1xyXG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNEZXNrdG9wSEQ7XHJcblx0XHRcdH0gZWxzZSBpZiAod2lkZ2V0V2lkdGggPj0gMTYwMCkge1xyXG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNEZXNrdG9wQmlnO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHdpZGdldFdpZHRoID49IDEzNjYpIHtcclxuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zRGVza3RvcDtcclxuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSAxMDI0KSB7XHJcblx0XHRcdFx0cGVyTGluZSA9IF90aGlzLmNvbmZpZy5pdGVtc0Rlc2t0b3BTbWFsbDtcclxuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSA0MjApIHtcclxuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zVGFibGV0O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNQaG9uZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGl0ZW1XaWR0aCA9IDEwMCAvIHBlckxpbmU7XHJcblxyXG5cdFx0XHR2YXIgbWFyZ2luTGVmdCA9IF90aGlzLiRnYWxsZXJ5LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJykuY3NzKCdtYXJnaW4tbGVmdCcpO1xyXG5cclxuXHRcdFx0X3RoaXMuJGdhbGxlcnkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbCkge1xyXG5cdFx0XHRcdGlmICgkKGVsKS5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbS0tdHJpcGxlJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0JChlbCkuY3NzKCd3aWR0aCcsIGl0ZW1XaWR0aCAqIDMgKyAnJScpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoJChlbCkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0tLWRvdWJsZScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdCQoZWwpLmNzcygnd2lkdGgnLCAnY2FsYygnICsgaXRlbVdpZHRoICogMiArICclKScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKGVsKS5jc3MoJ3dpZHRoJywgJ2NhbGMoJyArIGl0ZW1XaWR0aCArICclIC0gJyArIG1hcmdpbkxlZnQgKyAnKScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoX3RoaXMuY29uZmlnLml0ZW1zQm9yZGVyID09PSAnUmlnaHQnKSB7XHJcblx0XHRcdFx0XHRpZiAoKGluZGV4ICsgMSkgJSBwZXJMaW5lID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdCQoZWwpLmNzcyh7IGJvcmRlclJpZ2h0OiAwIH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JChlbCkuY3NzKHsgYm9yZGVyUmlnaHQ6ICcnIH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKGVsKS5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0XHQkKGVsKVxyXG5cdFx0XHRcdFx0LmZpbmQoJz4gc3BhbicpXHJcblx0XHRcdFx0XHQuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdFx0JChlbCkuYWRkQ2xhc3MoX3RoaXMuY29uZmlnLml0ZW1zQmdDb2xvcik7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5pdGVtc0JvcmRlciA9PT0gJ1JpZ2h0Jykge1xyXG5cdFx0XHRcdF90aGlzLiRnYWxsZXJ5XHJcblx0XHRcdFx0XHQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKVxyXG5cdFx0XHRcdFx0Lmxhc3QoKVxyXG5cdFx0XHRcdFx0LmNzcyh7IGJvcmRlclJpZ2h0OiAwIH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoX3RoaXMuY29uZmlnLmVxdWFsSGVpZ2h0KSB7XHJcblx0XHRcdFx0X3RoaXMuc2FtZUhlaWdodCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aW1lb3V0KTtcclxuXHR9O1xyXG5cclxuXHRHZW5lcmljR2FsbGVyeS5wcm90b3R5cGUuc2FtZUhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy4kZ2FsbGVyeS5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbScpLmNzcygnbWluLWhlaWdodCcsICdhdXRvJyk7XHJcblx0XHR2YXIgbWF4SGVpZ2h0ID0gTWF0aC5tYXguYXBwbHkoXHJcblx0XHRcdG51bGwsXHJcblx0XHRcdHRoaXMuJGdhbGxlcnlcclxuXHRcdFx0XHQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKVxyXG5cdFx0XHRcdC5tYXAoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5vdXRlckhlaWdodChmYWxzZSk7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuZ2V0KClcclxuXHRcdCk7XHJcblx0XHR0aGlzLiRnYWxsZXJ5LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJykuY3NzKCdtaW4taGVpZ2h0JywgbWF4SGVpZ2h0KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuR2VuZXJpY0dhbGxlcnkgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBhbGxHZW5lcmljR2FsbGVyaWVzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcblxyXG4kKHdpbmRvdylcclxuXHQub2ZmKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknKVxyXG5cdC5vbigncmVzaXplLkdlbmVyaWNHYWxsZXJ5JywgZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgYWxsR2VuZXJpY0dhbGxlcmllcyA9IFNhcHBoaXJlV2lkZ2V0cy5HZW5lcmljR2FsbGVyeS5hbGwoKTtcclxuXHRcdGFsbEdlbmVyaWNHYWxsZXJpZXMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KSB7XHJcblx0XHRcdGVsZW1lbnQuY2FsY3VsYXRlKDIwMCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxuIiwiLyogQ29tcG9uZW50IEhvcml6b250YWxUb29sYmFyICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9ICgpID0+IHtcclxuXHRcdCQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IGluaXQoKSk7XHJcblx0XHQkKHdpbmRvdykubG9hZCgoKSA9PiB7XHJcblx0XHRcdGNvbnN0ICRpdGVtV3JhcHBlciA9ICQoJy5NZW51SXRlbVdyYXBwZXIuQWN0aXZlJyk7XHJcblxyXG5cdFx0XHRpZiAoJGl0ZW1XcmFwcGVyLmxlbmd0aCkge1xyXG5cdFx0XHRcdCRpdGVtV3JhcHBlclswXS5zY3JvbGxJbnRvVmlldyh7XHJcblx0XHRcdFx0XHRiZWhhdmlvcjogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0YmxvY2s6ICdlbmQnLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBpbml0ID0gKCkgPT4ge1xyXG5cdFx0aGFuZGxlQXJyb3dzKCk7XHJcblxyXG5cdFx0JCgnLlRvb2xiYXJfX0l0ZW1zJykuc2Nyb2xsKCgpID0+IHtcclxuXHRcdFx0aGFuZGxlQXJyb3dzKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRTY3JvbGwgPSAkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KCk7XHJcblx0XHRcdHZhciBtYXhTY3JvbGxsID0gJCgnLlRvb2xiYXJfX0l0ZW1zIC5MaXN0UmVjb3JkcycpLndpZHRoKCkgLSAkKCcuVG9vbGJhcl9fSXRlbXMnKS53aWR0aCgpO1xyXG5cdFx0XHR2YXIgc2lkZVdpZHRoID0gbWF4U2Nyb2xsbCAtIDUwO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KGN1cnJlbnRTY3JvbGwgKyA1MCk7XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsID09IHNpZGVXaWR0aCkge1xyXG5cdFx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsICE9IDUwKSB7XHJcblx0XHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRTY3JvbGwgPSAkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KCk7XHJcblx0XHRcdHZhciBtYXhTY3JvbGxsID0gJCgnLlRvb2xiYXJfX0l0ZW1zIC5MaXN0UmVjb3JkcycpLndpZHRoKCkgLSAkKCcuVG9vbGJhcl9fSXRlbXMnKS53aWR0aCgpO1xyXG5cdFx0XHR2YXIgc2lkZVdpZHRoID0gbWF4U2Nyb2xsbCAtIDUwO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KGN1cnJlbnRTY3JvbGwgLSA1MCk7XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsICE9IHNpZGVXaWR0aCkge1xyXG5cdFx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsID09IDUwKSB7XHJcblx0XHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUudG9vbGJhcicsICgpID0+IHtcclxuXHRcdFx0aGFuZGxlQXJyb3dzKCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRoYW5kbGVBcnJvd3MgPSAoKSA9PiB7XHJcblx0XHRsZXQgY3VycmVudFNjcm9sbCA9ICQoJy5Ub29sYmFyX19JdGVtcycpLnNjcm9sbExlZnQoKTtcclxuXHRcdGxldCBtZW51V2lkdGggPSAkKCcuVG9vbGJhcl9fSXRlbXMgLkxpc3RSZWNvcmRzJykud2lkdGgoKTtcclxuXHRcdGxldCBleHRlcm5hbFdpZHRoID0gJCgnLlRvb2xiYXJfX0l0ZW1zJykud2lkdGgoKTtcclxuXHRcdHZhciBtYXhTY3JvbGxsID0gbWVudVdpZHRoIC0gZXh0ZXJuYWxXaWR0aDtcclxuXHJcblx0XHRpZiAoZXh0ZXJuYWxXaWR0aCA+IG1lbnVXaWR0aCkge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLmhpZGUoKTtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykuaGlkZSgpO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9jb250YWluZXInKS5hZGRDbGFzcygnVG9vbGJhcl9jb250YWluZXItLW5vYXJyb3dzJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLnNob3coKTtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykuc2hvdygpO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9jb250YWluZXInKS5yZW1vdmVDbGFzcygnVG9vbGJhcl9jb250YWluZXItLW5vYXJyb3dzJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRTY3JvbGwgPT09IDApIHtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGN1cnJlbnRTY3JvbGwgPj0gbWF4U2Nyb2xsbCkge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Ib3Jpem9udGFsVG9vbGJhciA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwiLyogQ29tcG9uZW50IEhvdXJQaWNrZXIgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y2xhc3MgSG91clBpY2tlciB7XHJcblx0XHRjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuXHRcdFx0Ly8gT3B0aW9ucyB1c2VkIGJ5IGpRdWVyeSBUaW1lcnBpY2tlciAoRXh0ZXJuYWwgTGliKVxyXG5cdFx0XHR0aGlzLm9wdGlvbnMgPSB7XHJcblx0XHRcdFx0Li4uY29uZmlnLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5vbkNvbXBvbmVudEluaXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpc0NvbXBvbmVudFZhbGlkKCkge1xyXG5cdFx0XHRsZXQgdmFsaWQgPSB0cnVlO1xyXG5cdFx0XHRsZXQgbWVzc2FnZSA9IGBDb21wb25lbnQgSG91clBpY2tlciAoJHt0aGlzLm9wdGlvbnMud2lkZ2V0SWR9KTpgO1xyXG5cclxuXHRcdFx0aWYgKCF0aGlzLiRpbnB1dC5sZW5ndGggfHwgdGhpcy4kaW5wdXQubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdG1lc3NhZ2UgPSBgJHttZXNzYWdlfSBuZWVkcyBvbmUgLSBhbmQganVzdCBvbmUgLSBJTlBVVCBlbGVtZW50IWA7XHJcblx0XHRcdFx0dmFsaWQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCF2YWxpZCkgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcclxuXHJcblx0XHRcdHJldHVybiB2YWxpZDtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRDb21wb25lbnRQb3NpdGlvbigpIHtcclxuXHRcdFx0Y29uc3QgJHdpZGdldCA9ICQoJy51aS10aW1lcGlja2VyLWNvbnRhaW5lcicpO1xyXG5cdFx0XHRjb25zdCBsYWJlbExlZnQgPSB0aGlzLiRsYWJlbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0XHRjb25zdCBsYWJlbFdpZHRoID0gdGhpcy4kbGFiZWwud2lkdGgoKTtcclxuXHRcdFx0Y29uc3QgbGFiZWxPdXRlcldpZHRoID0gdGhpcy4kbGFiZWwub3V0ZXJXaWR0aCgpO1xyXG5cdFx0XHRjb25zdCB3aWRnZXRPdXRlcldpZHRoID0gJHdpZGdldC5vdXRlcldpZHRoKCk7XHJcblx0XHRcdGNvbnN0IHdpZGdldE1pbldpZHRoID0gKyR3aWRnZXQuY3NzKCdtaW4td2lkdGgnKS5yZXBsYWNlKCdweCcsICcnKTtcclxuXHRcdFx0Y29uc3QgaXNPdXRzaWRlV2luZG93ID1cclxuXHRcdFx0XHRsYWJlbExlZnQgKyBsYWJlbE91dGVyV2lkdGggPiAkKHdpbmRvdykuc2Nyb2xsTGVmdCgpICsgJCh3aW5kb3cpLndpZHRoKCkgLSB3aWRnZXRPdXRlcldpZHRoO1xyXG5cclxuXHRcdFx0JHdpZGdldC5jc3Moe1xyXG5cdFx0XHRcdGxlZnQ6ICgpID0+IHtcclxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGxhYmVsTGVmdCAtICh3aWRnZXRNaW5XaWR0aCAtIGxhYmVsV2lkdGgpIC8gMjtcclxuXHJcblx0XHRcdFx0XHRpZiAoaXNPdXRzaWRlV2luZG93KSB2YWx1ZSA9IGxhYmVsTGVmdCArIGxhYmVsV2lkdGggLSB3aWRnZXRPdXRlcldpZHRoO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IGxhYmVsTGVmdDtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0RWxlbWVudENsYXNzKHNlbGVjdG9yLCBjbGFzc05hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZSA/ICQoc2VsZWN0b3IpLmFkZENsYXNzKGNsYXNzTmFtZSkgOiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRkZWZpbmVUaW1lRm9ybWF0KCkge1xyXG5cdFx0XHRsZXQgZm9ybWF0ID0gW107XHJcblx0XHRcdGxldCBhbVBtID0gJyc7XHJcblxyXG5cdFx0XHRmb3JtYXQucHVzaCh0aGlzLm9wdGlvbnMuaXMyNGhGb3JtYXQgPyAnSEgnIDogJ2hoJyk7XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuc2hvd01pbnV0ZXMpIGZvcm1hdC5wdXNoKCdtbScpO1xyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnNob3dTZWNvbmRzKSBmb3JtYXQucHVzaCgnc3MnKTtcclxuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMuaXMyNGhGb3JtYXQpIGFtUG0gPSAnIHAnO1xyXG5cclxuXHRcdFx0cmV0dXJuIGAke2Zvcm1hdC5qb2luKCc6Jyl9JHthbVBtfWA7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udmVydFRpbWUxMnRvMjQodmFsdWUpIHtcclxuXHRcdFx0Y29uc3QgW3RpbWUsIG1vZGlmaWVyXSA9IHZhbHVlLnNwbGl0KCcgJyk7XHJcblx0XHRcdGxldCBbaG91cnMsIG1pbnV0ZXMgPSAnMDAnLCBzZWNvbmRzID0gJzAwJ10gPSB0aW1lLnNwbGl0KCc6Jyk7XHJcblxyXG5cdFx0XHRpZiAoaG91cnMgPT09ICcxMicpIGhvdXJzID0gJzAwJztcclxuXHRcdFx0aWYgKG1vZGlmaWVyID09PSAnUE0nKSBob3VycyA9IHBhcnNlSW50KGhvdXJzLCAxMCkgKyAxMjtcclxuXHJcblx0XHRcdHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9YDtcclxuXHRcdH1cclxuXHJcblx0XHRjb252ZXJ0VGltZUZvcm1hdFRvTWFzayh2YWx1ZSA9ICcnKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bYS16QS1aXSsvZywgJy0tJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0b25DaGFuZ2VFdmVudCh2YWx1ZSA9ICcnKSB7XHJcblx0XHRcdGxldCBtb2RlbCA9ICcwMS0wMS0xOTAwIDAwOjAwOjAwJzsgLy9pLmUuIG51bGxcclxuXHRcdFx0bGV0IGxhYmVsID0gdGhpcy5jb252ZXJ0VGltZUZvcm1hdFRvTWFzayh0aGlzLm9wdGlvbnMudGltZUZvcm1hdCk7XHJcblxyXG5cdFx0XHRpZiAodmFsdWUgJiYgISF2YWx1ZS50cmltKCkpIHtcclxuXHRcdFx0XHRtb2RlbCA9IHRoaXMub3B0aW9ucy5pczI0aEZvcm1hdCA/IHZhbHVlIDogdGhpcy5jb252ZXJ0VGltZTEydG8yNCh2YWx1ZSk7XHJcblx0XHRcdFx0bGFiZWwgPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc05vdGlmeUVuYWJsZWQpIE9zTm90aWZ5V2lkZ2V0KHRoaXMub3B0aW9ucy5ob3VyUGlja2VyRmFrZU5vdGlmeUlkLCBtb2RlbCk7XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuaXNUZXh0VHJpZ2dlcmFibGUpIHRoaXMuJGxhYmVsLnRleHQobGFiZWwpO1xyXG5cclxuXHRcdFx0dGhpcy4kbW9kZWwudmFsKG1vZGVsKTtcclxuXHRcdFx0dGhpcy4kbW9kZWwuY2hhbmdlKCk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0b25Db21wb25lbnRJbml0KCkge1xyXG5cdFx0XHR0aGlzLiRjb21wb25lbnQgPSAkKGAjJHt0aGlzLm9wdGlvbnMud2lkZ2V0SWR9YCk7XHJcblx0XHRcdHRoaXMuJG1vZGVsID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5Ib3VyUGlja2VyX19QbGFjZWhvbGRlciBpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dCA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCcuSG91clBpY2tlcl9fRGlzcGxheWVkIC5Ib3VyUGlja2VyX19JbnB1dFZhbHVlJyk7XHJcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSB0aGlzLiRpbnB1dDtcclxuXHJcblx0XHRcdHRoaXMub3B0aW9ucy50aW1lRm9ybWF0ID0gdGhpcy5kZWZpbmVUaW1lRm9ybWF0KCk7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuaXNDb21wb25lbnRWYWxpZCgpKSByZXR1cm47XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0ICRjb250YWluZXIgPSB0aGlzLiRjb21wb25lbnQuZmluZCgnZGl2LkhvdXJQaWNrZXInKTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc1RleHRUcmlnZ2VyYWJsZSkge1xyXG5cdFx0XHRcdFx0JGNvbnRhaW5lci5hZGRDbGFzcygnSG91clBpY2tlci0tdGV4dFRyaWdnZXInKTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLiRsYWJlbCA9ICRjb250YWluZXIuZmluZCgnLkhvdXJQaWNrZXJfX0Rpc3BsYXllZCAuSG91clBpY2tlcl9fTGFiZWxWYWx1ZScpO1xyXG5cdFx0XHRcdFx0dGhpcy4kZWxlbWVudCA9IHRoaXMuJGxhYmVsO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJGxhYmVsLnRleHQodGhpcy5jb252ZXJ0VGltZUZvcm1hdFRvTWFzayh0aGlzLm9wdGlvbnMudGltZUZvcm1hdCkpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJGxhYmVsLm9uKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kbGFiZWwudGltZXBpY2tlcigpLm9wZW4oKTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0Q29tcG9uZW50UG9zaXRpb24oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5pc0NsZWFyYWJsZSkge1xyXG5cdFx0XHRcdFx0dGhpcy4kYnV0dG9uQ2xlYXIgPSAkY29udGFpbmVyLmZpbmQoJy5Ib3VyUGlja2VyX19EaXNwbGF5ZWQgLkhvdXJQaWNrZXJfX0J1dHRvbkNsZWFyJyk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4kYnV0dG9uQ2xlYXIub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLm9uQ2hhbmdlRXZlbnQoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy4kZWxlbWVudC50aW1lcGlja2VyKHtcclxuXHRcdFx0XHRcdC4uLnRoaXMub3B0aW9ucyxcclxuXHRcdFx0XHRcdGNoYW5nZTogdGltZSA9PiB0aGlzLm9uQ2hhbmdlRXZlbnQodGltZSA/ICQoKS50aW1lcGlja2VyLmZvcm1hdFRpbWUodGhpcy5vcHRpb25zLnRpbWVGb3JtYXQsIHRpbWUpIDogbnVsbCksXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc2V0RWxlbWVudENsYXNzKCcudWktdGltZXBpY2tlci1jb250YWluZXInLCB0aGlzLm9wdGlvbnMuY3VycmVudExvY2FsZSA9PT0gJ0FSJyA/ICdydGwnIDogJ2x0cicpO1xyXG5cclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScsICF0aGlzLm9wdGlvbnMuaXNUeXBlRW5hYmxlZCk7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncGxhY2Vob2xkZXInLCB0aGlzLm9wdGlvbnMudGltZUZvcm1hdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgSG91clBpY2tlcihjb25maWcpKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkhvdXJQaWNrZXIgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gIGNsYXNzIElucHV0V2l0aENsZWFyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgIHRoaXMuJHdpZGdldCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuICAgICAgdGhpcy4kaW5wdXQgPSB0aGlzLiR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZV0nKTtcclxuICAgICAgdGhpcy4kY2xlYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLWNsZWFyJyk7XHJcbiAgICAgIHRoaXMuJG5vdGlmeUxpbmsgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLW5vdGlmeS1saW5rJyk7XHJcbiAgICAgIHRoaXMuJHdpZGdldFNoaWVsZCA9IHRoaXMuJHdpZGdldC5maW5kKCcuSW5wdXRXaXRoQ2xlYXItLXNoaWVsZCcpO1xyXG4gICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgpIHtcclxuICAgICAgdGhpcy4kaW5wdXQub24oJ2ZvY3VzJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGNsZWFyLnNob3coKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdibHVyJywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycpIHtcclxuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoJy5kYXRlcmFuZ2VwaWNrZXI6dmlzaWJsZScpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRjbGVhci5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeUxpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJGNsZWFyLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLiRpbnB1dC52YWwoJycpO1xyXG4gICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuICAgICAgICB0aGlzLiRub3RpZnlMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5jb25maWcuaGFzU2hpZWxkKSB7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kd2lkZ2V0U2hpZWxkLmhpZGUoKTtcclxuICAgICAgICB9LCB0aGlzLmNvbmZpZy5zaGllbGRUaW1lb3V0KTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2hpZWxkVGltZW91dCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuJHdpZGdldFNoaWVsZC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgY3JlYXRlID0gY29uZmlnID0+ICh3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBJbnB1dFdpdGhDbGVhcihjb25maWcpKTtcclxuXHJcbiAgU2FwcGhpcmVXaWRnZXRzLklucHV0V2l0aENsZWFyID0ge1xyXG4gICAgY3JlYXRlXHJcbiAgfTtcclxuXHJcbn0pKCk7IiwiLyogQ29tcG9uZW50IExpbmVEZXRhaWxzRXhwYW5kQm94ICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGluaXQgPSBjb25maWcgPT4ge1xyXG5cdFx0JChgIyR7Y29uZmlnLndpZGdldElkfSArIC5MaW5lRGV0YWlsc0V4cGFuZEJveF9hY3Rpb25gKS5jbGljayhldmVudCA9PiB7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+ICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IGluaXQoY29uZmlnKSk7XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5MaW5lRGV0YWlsc0V4cGFuZEJveCA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgTG9jYXRpb25Cb3ggKi9cclxuU2FwcGhpcmVXaWRnZXRzLkxvY2F0aW9uQm94ID0gZnVuY3Rpb24oY2xpY2tlZEVsZW1lbnRJZCkge1xyXG5cdGlmICgkKCcjJyArIGNsaWNrZWRFbGVtZW50SWQgKyAnJykuaGFzQ2xhc3MoJ09uJykpIHtcclxuXHRcdCQoJy5EaXNhYmxlUm9vbScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ09mZicpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdPbicpO1xyXG5cdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxyXG5cdFx0XHRcdC5jc3Moe1xyXG5cdFx0XHRcdFx0b3BhY2l0eTogJzEnLFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdTZWxlY3RlZCcpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJyMnICsgY2xpY2tlZEVsZW1lbnRJZCArICcnKVxyXG5cdFx0XHQuYWRkQ2xhc3MoJ09uJylcclxuXHRcdFx0LnJlbW92ZUNsYXNzKCdPZmYnKVxyXG5cdFx0XHQucGFyZW50KCcuUm9vbUJveCcpXHJcblx0XHRcdC5jc3Moe1xyXG5cdFx0XHRcdG9wYWNpdHk6ICcxJyxcclxuXHRcdFx0fSlcclxuXHRcdFx0LmFkZENsYXNzKCdTZWxlY3RlZCcpO1xyXG5cclxuXHRcdCQoJy5EaXNhYmxlUm9vbTpub3QoIycgKyBjbGlja2VkRWxlbWVudElkICsgJyknKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdPZmYnKTtcclxuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnT24nKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJy5EaXNhYmxlUm9vbS5PZmYnKVxyXG5cdFx0XHQucGFyZW50KCcuUm9vbUJveCcpXHJcblx0XHRcdC5jc3Moe1xyXG5cdFx0XHRcdG9wYWNpdHk6ICcwLjI1JyxcclxuXHRcdFx0fSlcclxuXHRcdFx0LnJlbW92ZUNsYXNzKCdTZWxlY3RlZCcpO1xyXG5cdH1cclxufTtcclxuIiwiLyogQ29tcG9uZW50IE1haW5JbnRlcmFjdGl2ZUNhcmQgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMgPSBbXTtcclxuXHR2YXIgZGVmYXVsdER1cmF0aW9uID0gMzAwO1xyXG5cclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoYWxsTWFpbkludGVyYWN0aXZlQ2FyZHNbaV0uY29uZmlnLndpZGdldElkID09PSBjb25maWcud2lkZ2V0SWQpIHtcclxuXHRcdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IE1haW5JbnRlcmFjdGl2ZUNhcmQoY29uZmlnKTtcclxuXHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLnB1c2god2luZG93W2NvbmZpZy53aWRnZXRJZF0pO1xyXG5cclxuXHRcdGlmICghISFTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hZnRlckFqYXhSZXF1ZXN0QmluZGVkICYmICEhb3NBamF4QmFja2VuZCkge1xyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMgPSBTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hbGwoKTtcclxuXHRcdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRlbGVtZW50LmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHZhciBNYWluSW50ZXJhY3RpdmVDYXJkID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy5pc0xvY2tlZE9uQ2xvc2UgPSBmYWxzZTtcclxuXHRcdHRoaXMuaXNPcGVuID0gY29uZmlnLmlzT3BlbjtcclxuXHRcdHRoaXMuaXNFbmFibGVkID0gY29uZmlnLmlzRW5hYmxlZDtcclxuXHRcdHRoaXMuaXNTZWxlY3RhYmxlID0gY29uZmlnLmlzU2VsZWN0YWJsZTtcclxuXHRcdHRoaXMuYWxsb3dPcGVuaW5nID0gY29uZmlnLmFsbG93T3BlbmluZztcclxuXHRcdHRoaXMuZ3JhZGllbnRXaGVuT3BlbiA9IGNvbmZpZy5ncmFkaWVudFdoZW5PcGVuO1xyXG5cdFx0dGhpcy5hbGxvd011bHRpcGxlT3BlbiA9IGNvbmZpZy5hbGxvd011bHRpcGxlT3BlbjtcclxuXHRcdHRoaXMuZW1pdE5vdGlmeU9uT3BlbiA9IGNvbmZpZy5lbWl0Tm90aWZ5T25PcGVuO1xyXG5cdFx0dGhpcy5oaWRlQWN0aW9uc09uT3BlbiA9IGNvbmZpZy5oaWRlQWN0aW9uc09uT3BlbjtcclxuXHRcdHRoaXMuaGlkZUNhcHRpb25Pbk9wZW4gPSBjb25maWcuaGlkZUNhcHRpb25Pbk9wZW47XHJcblx0XHR0aGlzLmhpZGVUaXRsZU9uT3BlbiA9IGNvbmZpZy5oaWRlVGl0bGVPbk9wZW47XHJcblx0XHR0aGlzLmhpZGVTdWJUaXRsZU9uT3BlbiA9IGNvbmZpZy5oaWRlU3ViVGl0bGVPbk9wZW47XHJcblx0XHR0aGlzLmhlYWRlckhlaWdodFdoZW5PcGVuID0gY29uZmlnLmhlYWRlckhlaWdodFdoZW5PcGVuO1xyXG5cdFx0dGhpcy5NYWluSW50ZXJhY3RpdmVDYXJkRmFrZU5vdGlmeUlkID0gY29uZmlnLm1haW5JbnRlcmFjdGl2ZUNhcmRGYWtlTm90aWZ5SWQ7XHJcblxyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xyXG5cdFx0dGhpcy4kd2lkZ2V0LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0dGhpcy4kY2FyZCA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkJyk7XHJcblx0XHR0aGlzLiRoZWFkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlcicpO1xyXG5cdFx0dGhpcy4kaGVhZGVyVGV4dCA9IHRoaXMuJGhlYWRlci5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dCcpO1xyXG5cdFx0dGhpcy4kYm9keSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gZGl2ID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtYm9keScpO1xyXG5cdFx0dGhpcy4kYWN0aW9ucyA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1hY3Rpb25zJyk7XHJcblx0XHR0aGlzLiRjYXB0aW9uID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRleHQtY2FwdGlvbicpO1xyXG5cdFx0dGhpcy4kdGl0bGUgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dC10aXRsZScpO1xyXG5cdFx0dGhpcy4kc3ViVGl0bGUgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dC1zdWJ0aXRsZScpO1xyXG5cdFx0dGhpcy4kc2VsZWN0VHJpZ2dlciA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXNlbGVjdGFibGUgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItc2VsZWN0YWJsZS10cmlnZ2VyJyk7XHJcblx0XHR0aGlzLiRzZWxlY3RQbGFjZWhvbGRlciA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1zZWxlY3RhYmxlLXBsYWNlaG9sZGVyJyk7XHJcblx0XHR0aGlzLiR0cmlnZ2VyUGxhY2Vob2xkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10cmlnZ2VyQWN0aW9uLXBsYWNlaG9sZGVyJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuJHRyaWdnZXJQbGFjZWhvbGRlci5maW5kKCdhJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHRoaXMuJHRyaWdnZXIgPSB0aGlzLiR0cmlnZ2VyUGxhY2Vob2xkZXIuZmluZCgnYScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmlzT3Blbikge1xyXG5cdFx0XHR0aGlzLm9wZW4oZmFsc2UsIC0xKTtcclxuXHRcdFx0dGhpcy4kY2FyZC5hZGRDbGFzcygnZm9yY2VPcGVuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy4kY2FyZC5hZGRDbGFzcyh0aGlzLmhlYWRlckhlaWdodFdoZW5PcGVuICsgJ0hlYWRlcicpO1xyXG5cclxuXHRcdGlmICh0aGlzLmFsbG93T3BlbmluZykge1xyXG5cdFx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdhbGxvd09wZW5pbmcnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5ncmFkaWVudFdoZW5PcGVuKSB7XHJcblx0XHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2dyYWRpZW50V2hlbk9wZW4nKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF0dGFjaEV2ZW50cygpO1xyXG5cclxuXHRcdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuXHRcdFx0bXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uLCBpbmRleCkge1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbmZpZy53aWRnZXRJZCksIHtcclxuXHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxyXG5cdFx0XHRzdWJ0cmVlOiB0cnVlLFxyXG5cdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0aWYgKCEhdGhpcy4kYm9keS5maW5kKCc+IGRpdiAuTWFpbkludGVyYWN0aXZlQ2FyZC1hYnNvbHV0ZS1hY3Rpb25zJykubGVuZ3RoICYmIHRoaXMuaXNPcGVuKSB7XHJcblx0XHRcdHZhciBhYnNvbHV0ZUFjdGlvbnNXaWR0aCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIHRoaXMuJGJvZHkuZmluZCgnPiBkaXYgLk1haW5JbnRlcmFjdGl2ZUNhcmQtYWJzb2x1dGUtYWN0aW9ucycpLm1hcChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuICQodGhpcykub3V0ZXJXaWR0aCh0cnVlKTtcclxuXHRcdFx0fSkuZ2V0KCkpO1xyXG5cdFx0XHR2YXIgaGVhZGVyTWF4V2lkdGggPSB0aGlzLiRoZWFkZXIud2lkdGgoKSAtIGFic29sdXRlQWN0aW9uc1dpZHRoO1xyXG5cdFx0XHRpZiAoaGVhZGVyTWF4V2lkdGggPiAxMCkge1xyXG5cdFx0XHRcdHRoaXMuJGhlYWRlclRleHQuY3NzKHtcclxuXHRcdFx0XHRcdG1heFdpZHRoOiBoZWFkZXJNYXhXaWR0aCArICdweCdcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRib2R5LmZpbmQoJz4gZGl2IC5NYWluSW50ZXJhY3RpdmVDYXJkLWFic29sdXRlLWFjdGlvbnMgLk1haW5JbnRlcmFjdGl2ZUNhcmQtLWNsb3NlJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdF90aGlzLmNsb3NlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kaGVhZGVyVGV4dC5jc3Moe1xyXG5cdFx0XHRcdG1heFdpZHRoOiAnOTklJ1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICghIV90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0gJiYgISFfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpWzBdLmNvbnRlbnRXaW5kb3cgJiYgX3RoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKVswXS5jb250ZW50V2luZG93LlNhcHBoaXJlV2lkZ2V0cyAmJiBfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpWzBdLmNvbnRlbnRXaW5kb3cuU2FwcGhpcmVXaWRnZXRzLlJlc2l6ZVBhcmVudElmcmFtZSkge1xyXG5cdFx0XHRcdFx0XHRfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpWzBdLmNvbnRlbnRXaW5kb3cuU2FwcGhpcmVXaWRnZXRzLlJlc2l6ZVBhcmVudElmcmFtZS5yZXNpemUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LCA1MDApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGhlYWRlci5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC0tb3Blbjpub3QoW2Rpc2FibGVkXSknKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRfdGhpcy5vcGVuKHRydWUpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRoZWFkZXIuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtLWNsb3NlJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuYWxsb3dPcGVuaW5nKSB7XHJcblx0XHRcdHRoaXMuJGhlYWRlclRleHQub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRpZiAoJChldnQudGFyZ2V0KS5oYXNDbGFzcygnQnV0dG9uJykpIHtcclxuXHRcdFx0XHRcdC8vIHRoZSB1c2VyIGNsaWNrZWQgb24gYSBCdXR0b24gaW5zaWRlIHRoZSBoZWFkZXIsIG5vdGhpbmcgdG8gZG8gaGVyZVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoX3RoaXMuaXNPcGVuKSB7XHJcblx0XHRcdFx0XHRcdGlmIChfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGRvIG5vdCBjbG9zZSB3aGVuIGFuZCBpZnJhbWUgZXhpc3RzXHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoXHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuJGFjdGlvbnMuZmluZCgnYScpLmxlbmd0aCA+IDAgJiZcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy4kYWN0aW9ucy5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC0tY2xvc2UnKS5sZW5ndGggPiAwXHJcblx0XHRcdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGRvIG5vdCBjbG9zZSB3aGVuIHRoZSBjYXJkIGhhcyBhY3Rpb25zXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0X3RoaXMub3Blbih0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNTZWxlY3RhYmxlKSB7XHJcblx0XHRcdHRoaXMuJHNlbGVjdFRyaWdnZXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0aWYgKF90aGlzLiRzZWxlY3RQbGFjZWhvbGRlci5maW5kKCdhJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kc2VsZWN0UGxhY2Vob2xkZXIuZmluZCgnYScpLmNsaWNrKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybignWW91IG5lZWQgMSBsaW5rIGluIHRoaXMgcGxhY2Vob2xkZXIuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKHNlbmROb3RpZnksIGR1cmF0aW9uKSB7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkdXJhdGlvbiB8fCBkZWZhdWx0RHVyYXRpb247XHJcblx0XHR0aGlzLmlzT3BlbiA9IHRydWU7XHJcblx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdpc09wZW4nKTtcclxuXHRcdGlmICh0aGlzLmhpZGVBY3Rpb25zT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJGFjdGlvbnMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmhpZGVUaXRsZU9uT3Blbikge1xyXG5cdFx0XHR0aGlzLiR0aXRsZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuKSB7XHJcblx0XHRcdHRoaXMuJHN1YlRpdGxlLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlQ2FwdGlvbk9uT3Blbikge1xyXG5cdFx0XHR0aGlzLiRjYXB0aW9uLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5lbWl0Tm90aWZ5T25PcGVuKSB7XHJcblx0XHRcdGlmIChzZW5kTm90aWZ5KSB7XHJcblx0XHRcdFx0T3NOb3RpZnlXaWRnZXQodGhpcy5NYWluSW50ZXJhY3RpdmVDYXJkRmFrZU5vdGlmeUlkLCAnb3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGJvZHkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuJHRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy4kdHJpZ2dlci5jbGljaygpO1xyXG5cdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKGR1cmF0aW9uID4gMCkge1xyXG5cdFx0XHRcdHRoaXMuJGJvZHkuc2xpZGVEb3duKGR1cmF0aW9uKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmhhc0NsYXNzKCdja2Vfd3lzaXd5Z19mcmFtZScpKSB7XHJcblx0XHRcdHZhciBpZnJhbWVDb250ZW50cyA9IHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5jb250ZW50cygpO1xyXG5cdFx0XHRpZnJhbWVDb250ZW50cy5maW5kKCcuTWFpbkludGVyYWN0aXZlQ2FyZC1pZnJhbWUtYWN0aW9ucycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy5hbGxvd011bHRpcGxlT3Blbikge1xyXG5cdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGl0ZW0gPT4gKGl0ZW0gIT09IHRoaXMgJiYgaXRlbS5hbGxvd09wZW5pbmcgPyBpdGVtLmNsb3NlKGR1cmF0aW9uKSA6IG51bGwpKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgZGVmYXVsdER1cmF0aW9uO1xyXG5cdFx0dGhpcy5pc09wZW4gPSBmYWxzZTtcclxuXHRcdHRoaXMuJGNhcmQucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0aWYgKHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEgJiYgIXRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5oYXNDbGFzcygnY2tlX3d5c2l3eWdfZnJhbWUnKSkge1xyXG5cdFx0XHR0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtaWZyYW1lLWFjdGlvbnMnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLiRib2R5LnNsaWRlVXAoZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHNlbGYuJGNhcmQuaGFzQ2xhc3MoJ2ZvcmNlT3BlbicpKSB7XHJcblx0XHRcdFx0c2VsZi4kY2FyZC5yZW1vdmVDbGFzcygnZm9yY2VPcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuaGlkZUFjdGlvbnNPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kYWN0aW9ucy5zaG93KCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlVGl0bGVPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kdGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlU3ViVGl0bGVPbk9wZW4pIHtcclxuXHRcdFx0dGhpcy4kc3ViVGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5oaWRlQ2FwdGlvbk9uT3Blbikge1xyXG5cdFx0XHR0aGlzLiRjYXB0aW9uLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy4kaGVhZGVyVGV4dC5jc3Moe1xyXG5cdFx0XHRtYXhXaWR0aDogJzk5JSdcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLmlzT3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmlzT3BlbjtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZCA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0YWxsOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcztcclxuXHRcdH0sXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdGlmICghISQoJy5NYWluSW50ZXJhY3RpdmVDYXJkJykubGVuZ3RoKSB7XHJcblx0XHRpZiAoISEhU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCkge1xyXG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMgPSBTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hbGwoKTtcclxuXHRcdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRlbGVtZW50LmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFmdGVyQWpheFJlcXVlc3RCaW5kZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMgPSBTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hbGwoKTtcclxuXHRcdGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRcdFx0ZWxlbWVudC5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XHJcblx0XHR9KTtcclxuXHR9LCAxMDAwKTtcclxuXHJcbn0pOyIsIi8qIENvbXBvbmVudCBNZW51QmFyICovXHJcblNhcHBoaXJlV2lkZ2V0cy5NZW51QmFyID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0JChmdW5jdGlvbigpIHtcclxuXHRcdHZhciAkbWVudVdpZGdldCA9ICQoJyMnICsgY29uZmlnLm1lbnVXaWRnZXQpO1xyXG5cclxuXHRcdHZhciBtZW51UmVzaWRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgbmF2V2lkdGggPSAwO1xyXG5cdFx0XHR2YXIgYXZhaWxhYmVFc3BhY2UgPSAkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9pdGVtJykud2lkdGgoKTtcclxuXHJcblx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRuYXZXaWR0aCArPSAkKHRoaXMpLm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKG5hdldpZHRoID4gYXZhaWxhYmVFc3BhY2UpIHtcclxuXHRcdFx0XHR2YXIgbGFzdEl0ZW0gPSAkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9pdGVtIC5NZW51SXRlbScpLmxhc3QoKTtcclxuXHRcdFx0XHRsYXN0SXRlbS5hdHRyKCdkYXRhLXdpZHRoJywgbGFzdEl0ZW0ub3V0ZXJXaWR0aCh0cnVlKSk7XHJcblx0XHRcdFx0bGFzdEl0ZW0ucHJlcGVuZFRvKCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lcicpKTtcclxuXHRcdFx0XHRtZW51UmVzaWRlcigpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBmaXJzdE1vcmVFbGVtZW50ID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyIC5NZW51SXRlbScpLmZpcnN0KCk7XHJcblx0XHRcdFx0aWYgKG5hdldpZHRoICsgZmlyc3RNb3JlRWxlbWVudC5kYXRhKCd3aWR0aCcpIDwgYXZhaWxhYmVFc3BhY2UpIHtcclxuXHRcdFx0XHRcdGZpcnN0TW9yZUVsZW1lbnQuaW5zZXJ0QWZ0ZXIoJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbSAuTWVudUl0ZW0nKS5sYXN0KCkpO1xyXG5cdFx0XHRcdFx0bWVudVJlc2lkZXIoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyJykuaXMoJzplbXB0eScpKSB7XHJcblx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfZXh0cmFJdGVtJykuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9leHRyYUl0ZW0nKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0ISQodGhpcylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0Lmhhc0NsYXNzKCdNZW51YmFyX19leHRyYUNvbnRhaW5lcicpXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZUluZGljYXRvcicpKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5hY3RpdmVJbmRpY2F0b3InKS5hZGRDbGFzcygnc2hhZG93Jyk7XHJcblx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuTWVudUl0ZW1fc3ViSXRlbXMnKVxyXG5cdFx0XHRcdFx0XHQudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmVJbmRpY2F0b3InKSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuTWVudUl0ZW1fc3ViSXRlbXMnKVxyXG5cdFx0XHRcdFx0XHQudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5NZW51SXRlbV9zdWJJdGVtcycpXHJcblx0XHRcdFx0XHQudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfZXh0cmFJdGVtIC5pY29uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lciAnKS50b2dnbGVDbGFzcygnc2hvdycpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JChkb2N1bWVudCkubW91c2V1cChlID0+IHtcclxuXHRcdFx0dmFyICRtZW51ID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnVJdGVtLmFjdGl2ZScpO1xyXG5cdFx0XHR2YXIgJG1vcmVPcHRpb25zID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfZXh0cmFJdGVtJyk7XHJcblxyXG5cdFx0XHQvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgbWVudSBvciBhIGRlc2NlbmRhbnQgb2YgdGhlIG1lbnVcclxuXHRcdFx0aWYgKCRtZW51Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRpZiAoISRtZW51LmlzKGUudGFyZ2V0KSAmJiAkbWVudS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0JG1lbnUuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuXHRcdFx0XHRcdCQoJy5hY3RpdmVJbmRpY2F0b3InKS5yZW1vdmVDbGFzcygnc2hhZG93Jyk7XHJcblx0XHRcdFx0XHQkbWVudVdpZGdldC5maW5kKCcuTWVudUl0ZW0uYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCEkbW9yZU9wdGlvbnMuaXMoZS50YXJnZXQpICYmICRtb3JlT3B0aW9ucy5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdCRtb3JlT3B0aW9ucy5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG5cdFx0XHRcdCQoJy5hY3RpdmVJbmRpY2F0b3InKS5yZW1vdmVDbGFzcygnc2hhZG93Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5vbigncmVzaXplIGxvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0bWVudVJlc2lkZXIoKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgTXVsdGlwbGVTZWxlY3Rpb25CdXR0b24gKi9cclxuU2FwcGhpcmVXaWRnZXRzLk11bHRpcGxlU2VsZWN0aW9uQnV0dG9uID0gZnVuY3Rpb24oV3JhcHBlcklkKSB7XHJcblx0dmFyICR3aWRnZXQgPSAkKFdyYXBwZXJJZCk7XHJcblx0dmFyICRjb250cm9sID0gJHdpZGdldC5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuXHJcblx0aWYgKCQoV3JhcHBlcklkICsgJyBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5pcygnOmRpc2FibGVkJykpIHtcclxuXHRcdCQoV3JhcHBlcklkKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JChXcmFwcGVySWQpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdH1cclxuXHJcblx0aWYgKCQoV3JhcHBlcklkICsgJyBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0JChXcmFwcGVySWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JChXcmFwcGVySWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHR9XHJcblxyXG5cdCR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JHdpZGdldC5maW5kKCcuTXVsdGlwbGVTZWxlY3Rpb25CdXR0b24tbGFiZWwnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdC8vICRjb250cm9sLnByb3AoXCJjaGVja2VkXCIsICEkY29udHJvbC5wcm9wKFwiY2hlY2tlZFwiKSk7XHJcblx0XHQkY29udHJvbFswXS5jbGljaygpO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCRjb250cm9sLmlzKCc6Y2hlY2tlZCcpKSB7XHJcblx0XHRcdFx0JHdpZGdldC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JHdpZGdldC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDEwKTtcclxuXHR9KTtcclxufTtcclxuIiwiLyogQ29tcG9uZW50IENvbmZpcm1hdGlvblBhbmVsM09wdGlvbnMgQ29uZmlybWF0aW9uUGFuZWwgc2FtZSBqYXZhc2NyaXB0IGNvZGUqL1xyXG5cclxuU2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBhbmVsID0ge1xyXG5cdGlzQW55UGFuZWxPcGVuZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuICQoJ2JvZHknKS5oYXNDbGFzcygnUGFuZWxPcGVuZWQnKSAmJiAkKCcuUGFuZWxDb250YWluZXI6dmlzaWJsZScpLmxlbmd0aDtcclxuXHR9LFxyXG5cclxuXHR0b2dnbGVQYW5lbDogZnVuY3Rpb24oUGFuZWxJZCkge1xyXG5cdFx0aWYgKCFPc1ZhbGlkYXRvck9uU3VibWl0KCkpIHJldHVybjtcclxuXHJcblx0XHRpZiAoIVNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbC5pc0FueVBhbmVsT3BlbmVkKCkpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVJbigxNDApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIFBhbmVsSWQpXHJcblx0XHRcdFx0XHQuZmluZCgnLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdC5zbGlkZVRvZ2dsZSgxNTApO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNsb3NlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcclxuXHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZU91dCgxNDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyMnICsgUGFuZWxJZClcclxuXHRcdFx0XHQuZmluZCgnLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHQuc2xpZGVVcCgxNTApO1xyXG5cdFx0fSwgMTAwKTtcclxuXHR9LFxyXG5cclxuXHRzZXRQYW5lbEJlaGF2aW9yOiBmdW5jdGlvbigpIHtcclxuXHRcdCQoJy5QYW5lbFtwYW5lbC10cmlnZ2VyLWVsZW1lbnRpZF0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdGhpc19wYW5lbCA9ICQodGhpcyk7XHJcblx0XHRcdCQoJyMnICsgdGhpc19wYW5lbC5hdHRyKCdwYW5lbC10cmlnZ2VyLWVsZW1lbnRpZCcpICsgJycpXHJcblx0XHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbC50b2dnbGVQYW5lbCh0aGlzX3BhbmVsLmF0dHIoJ2lkJykpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbC5zZXRQYW5lbEJlaGF2aW9yKCk7XHJcblx0aWYgKG9zQWpheEJhY2tlbmQuRXZlbnRIYW5kbGVycy5BZnRlckFqYXhSZXF1ZXN0LnRvU3RyaW5nKCkuaW5kZXhPZignc2V0UGFuZWxCZWhhdmlvcicpID09IC0xKSB7XHJcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbC5zZXRQYW5lbEJlaGF2aW9yKTtcclxuXHR9XHJcbn0pO1xyXG4iLCIvKiBDb21wb25lbnQgUGFuZWxCeUlETm90aWZ5ICovXHJcbnZhciBwYW5lbE5vdGlmeVdpZGdldDtcclxuU2FwcGhpcmVXaWRnZXRzLlBhbmVsQnlJZE5vdGlmeSA9IHtcclxuXHRpc0FueVBhbmVsT3BlbmVkRGVwcmVjYXRlZDogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdH0sXHJcblx0dG9nZ2xlUGFuZWxCeU5vdGlmeTogZnVuY3Rpb24oSWQpIHtcclxuXHRcdGlmICghaXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuZmFkZUluKDE0MCk7XHJcblxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChqdXN0RHJhZ2dlZCA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0JCgnLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdFx0LmNzcygnbWFyZ2luLWxlZnQnLCBwYW5lbE1hcmdpbkxlZnQpXHJcblx0XHRcdFx0XHRcdC5jc3MoJ2xlZnQnLCBwYW5lbExlZnQpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyhwYW5lbEFycm93Q2xhc3MpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdC5zbGlkZURvd24oMTUwKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5mYWRlT3V0KDE0MCk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHRvZ2dsZVBhbmVsTm90aWZ5QnlJZDogZnVuY3Rpb24oSWQpIHtcclxuXHRcdCQoJ2JvZHknKS50b2dnbGVDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0LmZhZGVUb2dnbGUoMTQwKTtcclxuXHJcblx0XHRwYW5lbE5vdGlmeVdpZGdldCA9ICQoJyMnICsgSWQpXHJcblx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0LmF0dHIoJ05vdGlmeUlkJyk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHQuc2xpZGVUb2dnbGUoMTUwKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxufTtcclxuIiwiLyogQ29tcG9uZW50IFBhbmVsQnlJRCAqL1xyXG5TYXBwaGlyZVdpZGdldHMuUGFuZWxCeUlkID17XHJcblx0aXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQ6ZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuICQoJ2JvZHknKS5oYXNDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHR9LFxyXG5cdFxyXG5cdHRvZ2dsZVBhbmVsQnlJZDpmdW5jdGlvbiAoSWQpIHtcclxuXHRcdGlmICghdGhpcy5pc0FueVBhbmVsT3BlbmVkRGVwcmVjYXRlZCgpKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuXHRcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5mYWRlSW4oMTQwKTtcclxuXHRcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGp1c3REcmFnZ2VkICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0aWYgKGp1c3REcmFnZ2VkID09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRcdCQoJy5QYW5lbEJ5SWROZXdfUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0XHRcdC5jc3MoJ21hcmdpbi1sZWZ0JywgcGFuZWxNYXJnaW5MZWZ0KVxyXG5cdFx0XHRcdFx0XHRcdC5jc3MoJ2xlZnQnLCBwYW5lbExlZnQpXHJcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKHBhbmVsQXJyb3dDbGFzcyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdH1cclxuXHRcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVEb3duKDE1MCk7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5jbGljaygpO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0XHQkKCdib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ3Njcm9sbCcpO1xyXG5cdFxyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVPdXQoMTQwKTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVVcCgxNTApO1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQuY2xpY2soKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbiIsIi8qIENvbXBvbmVudCBQb3BVcE1lbnUgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlBvcFVwTWVudSA9IHtcclxuXHRtZW51UG9zaXRpb246IGZ1bmN0aW9uKGlkLCBDb250ZXh0KSB7XHJcblx0XHQvKiBIaWRlIGFueSBvdGhlciBtZW51cyBvbiBwYWdlIGFuZCBzZXQgYnV0dG9uIGFzIGNvbGxhcHNlZC4gKi9cclxuXHRcdCQoJy5wb3B1cC1tZW51OnZpc2libGUnKS5oaWRlKCk7XHJcblxyXG5cdFx0Ly92YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIF90aGlzID0gJCgnIycgKyBpZCk7XHJcblx0XHR2YXIgWHggPSAwO1xyXG5cdFx0dmFyIFl5ID0gMDtcclxuXHRcdHZhciBXdyA9IDA7XHJcblx0XHR2YXIgSGggPSAwO1xyXG5cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWV4cGFuZDp2aXNpYmxlJykuaGlkZSgpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgbWVudSBlbGVtZW50LiAqL1xyXG5cdFx0dmFyIF9lbCA9IF90aGlzLm5leHQoJy5wb3B1cC1tZW51Jyk7XHJcblxyXG5cdFx0LyogRGlzcGxheSB0aGUgbWVudS4gKi9cclxuXHRcdF9lbC5zaG93KCk7XHJcblxyXG5cdFx0LyogU2V0IGJ1dHRvbiBjb2xsYXBzZS4gKi9cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWNvbGxhcHNlJykuc2hvdygpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYnV0dG9uLiAqL1xyXG5cdFx0YnV0dG9uSGggPSBfdGhpcy5vdXRlckhlaWdodCgpO1xyXG5cdFx0YnV0dG9uV3cgPSBfdGhpcy5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvblkgPSBfdGhpcy5wb3NpdGlvbigpLnRvcCArIGJ1dHRvbkhoO1xyXG5cdFx0dmFyIGJ1dHRvblggPSBfdGhpcy5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0Ly92YXIgYnV0dG9uWCA9IF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHQvKiBHZXQgdGhlIGRpc3RhbmNlIG9mIG1lbnUgYnV0dG9uIGFuZCB0aGUgcGFyZW50IGVsZW1lbnQgKi9cclxuXHRcdHZhciBwb3B1cFBhcmVudFh4ID0gX3RoaXMub2Zmc2V0KCkubGVmdCAtIF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHR2YXIgcG9wdXBYeCA9IF9lbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIHBvcHVwV3cgPSBfZWwub3V0ZXJXaWR0aCgpO1xyXG5cclxuXHRcdFh4ID0gTWF0aC5hYnMoYnV0dG9uWCAtICQoJ2JvZHknKS5zY3JvbGxMZWZ0KCkgLSBwb3B1cFBhcmVudFh4KTtcclxuXHRcdFl5ID0gTWF0aC5hYnMoYnV0dG9uSGggLSBidXR0b25ZIC0gJCgnYm9keScpLnNjcm9sbFRvcCgpKTtcclxuXHJcblx0XHQvKiBDaGVjayBpZiBjbGlja2VkIHBvc2l0aW9uIHBsdXMgdGhlIHBvcHVwIHdpZHRoIGV4Y2VlZCB0aGUgd2luZG93IHdpZHRoLiAqL1xyXG5cdFx0aWYgKGJ1dHRvblggKyBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSA+ICQoQ29udGV4dCkud2lkdGgoKSkge1xyXG5cdFx0XHRYeCA9IGJ1dHRvblggLSBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSAtIHBvcHVwUGFyZW50WHggKyBidXR0b25XdztcclxuXHRcdFx0Ly9YeCA9ICgkKHdpbmRvdykud2lkdGgoKSAtIHBvcHVwV3cpIC0gJCgnYm9keScpLnNjcm9sbExlZnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgbWVudSBwb3NpdGlvbi4gKi9cclxuXHRcdF9lbC5jc3Moe1xyXG5cdFx0XHRsZWZ0OiBYeCArICdweCcsXHJcblx0XHRcdHRvcDogYnV0dG9uWSArICdweCcsXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKiBSZWZyZXNoIHZhbHVlICovXHJcblx0XHRwb3B1cFh4ID0gX2VsLm9mZnNldCgpLmxlZnQ7XHJcblxyXG5cdFx0dmFyIF9iYWxsb29uRWwgPSBfZWwuY2hpbGRyZW4oJy5wb3B1cC1tZW51LWJhbGxvb24nKTtcclxuXHJcblx0XHR2YXIgX2JhbGxvb25YeCA9IF9iYWxsb29uRWwub2Zmc2V0KCkubGVmdDtcclxuXHRcdHZhciBfYmFsbG9vbld3ID0gX2JhbGxvb25FbC5vdXRlcldpZHRoKCk7XHJcblx0XHR2YXIgX2JhbGxvb25Qb3NYeCA9IE1hdGguYWJzKGJ1dHRvblggLSBYeCAtIHBvcHVwUGFyZW50WHgpO1xyXG5cclxuXHRcdC8qIElzIHRoZSBiYWxsb29uIGljb24gcG9zaXRpb25lZCBvdXQgb2YgdGhlIHBvcHVwIG1lbnU/ICovXHJcblx0XHRpZiAoX2JhbGxvb25Qb3NYeCArIFh4ICsgX2JhbGxvb25XdyA+IFh4ICsgcG9wdXBXdykge1xyXG5cdFx0XHRfYmFsbG9vblBvc1h4ID0gX2JhbGxvb25Qb3NYeCAtIF9iYWxsb29uV3c7XHJcblx0XHR9XHJcblxyXG5cdFx0LyogU2V0IHBvc2l0aW9uIG9mIHRoZSBiYWxsb29uIGVmZmVjdC4gKi9cclxuXHRcdF9iYWxsb29uRWwuY3NzKCdsZWZ0JywgX2JhbGxvb25Qb3NYeCArICdweCcpO1xyXG5cdH0sXHJcblx0bWVudUV2ZW50czogZnVuY3Rpb24oQ29udGV4dCkge1xyXG5cdFx0JCgnLnBvcHVwLWJ1dHRvbicpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XHJcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlBvcFVwTWVudS5tZW51UG9zaXRpb24oaWQsIENvbnRleHQpO1xyXG5cclxuXHRcdFx0XHQvKmUuc3RvcFByb3BhZ2F0aW9uKCk7Ki9cclxuXHJcblx0XHRcdFx0LyogUHJldmVudCBsaW5rIHN1Ym1pc3Npb24gKi9cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdC8qIHYgKioqIEhpZGUgcG9wdXAgd2hlbiBjbGljayBvdXRzaWRlICoqKiB2ICovXHJcblx0XHRmdW5jdGlvbiBQTUNsaWNrT3V0c2lkZShldmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQuaGFzT3duUHJvcGVydHkoJ3RhcmdldCcpKSB7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcclxuXHRcdFx0XHQvKmlmICgodGFyZ2V0LnBhcmVudHMoKS5pbmRleCgkKCdhW3NhcHBoaXJlaG9zcGl0YWxdLCAuSG9zcGl0YWxQb3BVcCcpKSA9PSAtMSkpIHt9Ki9cclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHQhJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXHJcblx0XHRcdFx0XHRcdCcucG9wdXAtYnV0dG9uLCAucG9wdXAtbWVudSwgLm9zLWludGVybmFsLXVpLWF1dG9jb21wbGV0ZSwgLm9zLWludGVybmFsLXVpLW1lbnUtaXRlbSwgLm9zLWludGVybmFsLXVpLWNvcm5lci1hbGwsIHVpLWF1dG9jb21wbGV0ZS1pdGVtJ1xyXG5cdFx0XHRcdFx0KS5sZW5ndGhcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdCQoJy5wb3B1cC1tZW51OnZpc2libGUnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcuYnV0dG9uLWNvbGxhcHNlOnZpc2libGUnKS5oaWRlKCk7XHJcblx0XHRcdFx0XHQkKCcuYnV0dG9uLWV4cGFuZCcpLnNob3coKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgX1BNSXNEcmFnID0gZmFsc2U7XHJcblx0XHR2YXIgX1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0JChkb2N1bWVudCkub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IHRydWU7XHJcblx0XHR9KTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRQTUNsaWNrT3V0c2lkZShldmVudCk7XHJcblx0XHRcdF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0XHRfUE1Jc0NsaWNrID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGlmICghX1BNSXNEcmFnICYmIF9QTUlzQ2xpY2spIHtcclxuXHRcdFx0XHRQTUNsaWNrT3V0c2lkZShldmVudCk7XHJcblx0XHRcdH1cclxuXHRcdFx0X1BNSXNEcmFnID0gZmFsc2U7XHJcblx0XHRcdF9QTUlzQ2xpY2sgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJy5idXR0b24tY29sbGFwc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHQkKCdib2R5JykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQvKiBeICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogXiAqL1xyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBTYXBwaGlyZVBhbmVsICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsID0ge1xyXG5cdGNoZWNrT3BlblBhbmVsOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1NhcHBoaXJlUGFuZWxPcGVuJykgJiYgJCgnLlNhcHBoaXJlUGFuZWxfQ29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlU2FwcGhpcmVQYW5lbDogZnVuY3Rpb24oUGFuZWxJZCkge1xyXG5cdFx0aWYgKCFPc1ZhbGlkYXRvck9uU3VibWl0KCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuY2hlY2tPcGVuUGFuZWwoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1NhcHBoaXJlUGFuZWxPcGVuJyk7XHJcblx0XHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZUluKDE0MCk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyMnICsgUGFuZWxJZClcclxuXHRcdFx0XHRcdC5maW5kKCcuU2FwcGhpcmVQYW5lbF9Db250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Y2xvc2VTYXBwaGlyZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XHJcblx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1NhcHBoaXJlUGFuZWxPcGVuJyk7XHJcblx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVPdXQoMTQwKTtcclxuXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpXHJcblx0XHRcdFx0LmZpbmQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0c2V0UGFuZWxCZWhhdmlvcjogZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRoaXNfcGFuZWwgPSAkKHRoaXMpO1xyXG5cdFx0XHQkKCcjJyArIHRoaXNfcGFuZWwuYXR0cigncGFuZWwtdHJpZ2dlci1lbGVtZW50aWQnKSArICcnKVxyXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRTYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVQYW5lbC50b2dnbGVTYXBwaGlyZVBhbmVsKHRoaXNfcGFuZWwuYXR0cignaWQnKSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG59O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuc2V0UGFuZWxCZWhhdmlvcigpO1xyXG5cclxuXHRpZiAob3NBamF4QmFja2VuZC5FdmVudEhhbmRsZXJzLkFmdGVyQWpheFJlcXVlc3QudG9TdHJpbmcoKS5pbmRleE9mKCdzZXRQYW5lbEJlaGF2aW9yJykgPT0gLTEpIHtcclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuc2V0UGFuZWxCZWhhdmlvcik7XHJcblx0fVxyXG59KTtcclxuIiwicmVxdWlyZSgnLi9jb25maXJtYXRpb24tcGFuZWwnKTtcclxucmVxdWlyZSgnLi9wYW5lbC1ieS1pZCcpO1xyXG4vL3JlcXVpcmUoJy4vcGFuZWwtYnktaWQtbm90aWZ5Jyk7XHJcbnJlcXVpcmUoJy4vcG9wdXAtbWVudScpO1xyXG5yZXF1aXJlKCcuL3NhcHBoaXJlLXBhbmVsJyk7XHJcblxyXG4iLCIvKiBDb21wb25lbnQgUGF0aWVudENhbGxDYW5jZWwgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdHZhciBpbnRlcnZhbDtcclxuXHRcdHZhciB0aW1lQ291bnRlcjtcclxuXHRcdHZhciAkd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpLmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbCcpO1xyXG5cdFx0dmFyICRjb3VudGRvd24gPSAkd2lkZ2V0LmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbC1jb3VudGVyJyk7XHJcblx0XHR2YXIgJGxhYmVsID0gJHdpZGdldC5maW5kKCcuUGF0aWVudENhbGxDYW5jZWwtbGFiZWwnKTtcclxuXHJcblx0XHR2YXIgc2V0U3RhdGUgPSBmdW5jdGlvbihzdGF0ZV9pbiwgdGV4dF9pbikge1xyXG5cdFx0XHQvL2pzLWlkbGUsIGpzLWNhbGxpbmdcclxuXHRcdFx0JHdpZGdldC5maW5kKCc+IGRpdicpLnByb3AoJ2NsYXNzJywgc3RhdGVfaW4pO1xyXG5cdFx0XHQkbGFiZWwudGV4dCh0ZXh0X2luKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIGNhbGxQYXRpZW50ID0gZnVuY3Rpb24oJHdpZGdldCkge1xyXG5cdFx0XHRzZXRTdGF0ZSgnanMtY2FsbGluZycsIGNvbmZpZy50eHRDYWxsUGF0aWVudCk7XHJcblx0XHRcdGlmIChjb25maWcuc2hvd0NvdW50ZG93bikge1xyXG5cdFx0XHRcdCRjb3VudGRvd24udGV4dChjb25maWcudHh0Q2FsbGluZ0luICsgJyAnICsgY29uZmlnLnRpbWVUb0NhbmNlbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0YXJ0Q291bnRlcigpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgc3RhcnRDb3VudGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcclxuXHRcdFx0aW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodXBkYXRlQ291bnRlciwgMTAwMCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciB1cGRhdGVDb3VudGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRpbWVDb3VudGVyLS07XHJcblx0XHRcdGlmICh0aW1lQ291bnRlciA9PT0gMCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG5cdFx0XHRcdHZhciBub3RpZmljYXRpb24gPSAnJztcclxuXHRcdFx0XHRPc05vdGlmeVdpZGdldChjb25maWcucGF0aWVudENhbGxGYWtlTm90aWZ5SWQsIG5vdGlmaWNhdGlvbik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGNvbmZpZy5zaG93Q291bnRkb3duKSB7XHJcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4gKyAnICcgKyB0aW1lQ291bnRlcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdCR3aWRnZXQuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsLWNhbmNlbC0tbGFiZWwnKS50ZXh0KGNvbmZpZy50eHRDYW5jZWwpO1xyXG5cclxuXHRcdHNldFN0YXRlKCdqcy1pZGxlJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcclxuXHJcblx0XHQkd2lkZ2V0Lm9uKCdjbGljaycsICcuanMtaWRsZSAuUGF0aWVudENhbGxDYW5jZWwtbGFiZWwnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0Y2FsbFBhdGllbnQoJHdpZGdldCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkd2lkZ2V0Lm9uKCdjbGljaycsICcuanMtaWRsZSAuUGF0aWVudENhbGxDYW5jZWwtaWNvbicsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjYWxsUGF0aWVudCgkd2lkZ2V0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCR3aWRnZXQub24oJ2NsaWNrJywgJy5qcy1jYWxsaW5nIC5QYXRpZW50Q2FsbENhbmNlbC1jYW5jZWwnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0dGltZUNvdW50ZXIgPSBjb25maWcudGltZVRvQ2FuY2VsO1xyXG5cdFx0XHQkY291bnRkb3duLnRleHQodGltZUNvdW50ZXIpO1xyXG5cdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcclxuXHRcdFx0c2V0U3RhdGUoJ2pzLWlkbGUnLCBjb25maWcudHh0Q2FsbFBhdGllbnQpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlBhdGllbnRDYWxsQ2FuY2VsID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgUGVyc29uQ2FyZCAqL1xyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHR2YXIgUGVyc29uQ2FyZEV2ZW50ID0gZnVuY3Rpb24oKSB7XHJcblx0XHQkKCcuUGVyc29uQ2FyZF9fdGl0bGUsIC5QZXJzb25DYXJkX19jb250ZW50JylcclxuXHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JGhlYWRlciA9ICQodGhpcykuY2xvc2VzdCgnLlBlcnNvbkNhcmRfaGVhZGVyJyk7XHJcblx0XHRcdFx0JGNvbnRlbnQgPSAkaGVhZGVyLm5leHQoKTtcclxuXHRcdFx0XHRpZiAoJGNvbnRlbnQuY2hpbGRyZW4oKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHQkY29udGVudC5zbGlkZVRvZ2dsZSg1MDApO1xyXG5cdFx0XHRcdFx0aWYgKCQoJy5QZXJzb25DYXJkLklzT3BlbicpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuUGVyc29uQ2FyZCcpXHJcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdJc09wZW4nKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLlBlcnNvbkNhcmQnKVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnSXNPcGVuJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQkKCcuU3RvcFByb3BhZ2F0aW9uJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdH0pO1xyXG5cclxuXHRQZXJzb25DYXJkRXZlbnQoKTtcclxuXHJcblx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChQZXJzb25DYXJkRXZlbnQpO1xyXG59KTtcclxuIiwiLyogQ29tcG9uZW50IFByZXNjcmlwdGlvbkNhcmQgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdCQoYCMke2NvbmZpZy53aWRnZXRJZH1gKS5jbGljaygoKSA9PiB7XHJcblx0XHRcdHNob3dNb3JlKCQoYCMke2NvbmZpZy53aWRnZXRJZH1gKSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBzaG93TW9yZSA9IGVsZW1lbnQgPT4ge1xyXG5cdFx0Y29uc3QgcGFyZW50cyA9IGVsZW1lbnQucGFyZW50cygnLlByZXNjcmlwdGlvbkNhcmQnKTtcclxuXHJcblx0XHRpZiAocGFyZW50cy5maW5kKCcuRXhwYW5EaXYnKS5oYXNDbGFzcygnSXNPcGVuJykpIHtcclxuXHRcdFx0cGFyZW50cy5maW5kKCcuRXhwYW5EaXYnKS5yZW1vdmVDbGFzcygnSXNPcGVuJyk7XHJcblxyXG5cdFx0XHRlbGVtZW50LnRleHQoJ1NlZSBNb3JlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXJlbnRzLmZpbmQoJy5FeHBhbkRpdicpLmFkZENsYXNzKCdJc09wZW4nKTtcclxuXHJcblx0XHRcdGVsZW1lbnQudGV4dCgnU2VlIExlc3MnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuUHJlc2NyaXB0aW9uQ2FyZCA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgUHJlc2NyaXB0aW9uRXhwYW5kYWJsZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBQcmVzY3JpcHRpb25FeHBhbmRhYmxlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHRjb25zdCB3aWRnZXRJZCA9IGNvbmZpZy53aWRnZXRJZDtcclxuXHRcdGNvbnN0IHByZXZpZXdzdGF0ID0gW107XHJcblx0XHRjb25zdCB0cmFuc2l0aW9uRXZlbnQgPSBTaWxrVUkud2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuXHJcblx0XHRjb25zdCAkZWxlbWVudFdyYXBwZXIgPSAkKGAjJHtjb25maWcud2lkZ2V0SWR9YCk7XHJcblxyXG5cdFx0Y29uc3QgY2xpY2tFdmVudHMgPSBvYiA9PiB7XHJcblx0XHRcdGlmICgkKG9iKS5oYXNDbGFzcygnUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXJfX0xpbmtzRGl2JykpIHtcclxuXHRcdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBTZWN0aW9uID0gJChvYikucGFyZW50KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBTZWN0aW9uQ29udGVudCA9IFNlY3Rpb24uY2hpbGRyZW4oJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2NvbnRlbnQnKTtcclxuXHJcblx0XHRcdC8vIGdldCBpZFxyXG5cdFx0XHR2YXIgaWQgPSBTZWN0aW9uLmF0dHIoJ2lkJyk7XHJcblxyXG5cdFx0XHR2YXIgdGVtcEhlaWdodCA9IDA7XHJcblxyXG5cdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHQsIGR1cmluZyB0aGlzIHByb2Nlc3MsIHRyYW5zaXRpb25zIGFyZSBkaXNhYmxlZFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCkpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblxyXG5cdFx0XHRcdC8vIENvbGxhcHNlIGNvbnRlbnRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XHJcblx0XHRcdFx0U2VjdGlvbi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gZmFsc2U7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ2FsYyBhbmQgc2V0IGEgZml4ZWQgaGVpZ2h0XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0dGVtcEhlaWdodCA9IFNlY3Rpb25Db250ZW50LmhlaWdodCgpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQodGVtcEhlaWdodCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcclxuXHJcblx0XHRcdFx0Ly8gcmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXHJcblx0XHRcdFx0U2VjdGlvbi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcclxuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0Ly8gYWRkIGV2ZW50IHRyYW5zaXRpb24gZW5kIHRvIG92ZXJmbG93OnZpc2libGUgZm9yIHRvb2x0aXBzIGFuZCBkcm9wZG93bnMgaXNzdWVzXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQub24odHJhbnNpdGlvbkV2ZW50LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmluaXQgPSAoKSA9PiB7XHJcblx0XHRcdGNvbnN0ICRoZWFkZXIgPSAkZWxlbWVudFdyYXBwZXIuZmluZCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyJyk7XHJcblx0XHRcdGNvbnN0ICRsaW5rcyA9ICRoZWFkZXIuZmluZCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyX19MaW5rc0RpdicpO1xyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLlNlY3Rpb25QcmVzY3JpcHRpb25FeHBhbmRhYmxlQXJlYScpLmVhY2goKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHN0YXQgPSAkaGVhZGVyLmhhc0NsYXNzKCdleHBhbmRlZCcpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W3dpZGdldElkXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAoJGhlYWRlci5oYXNDbGFzcygnTm90RXhwYW5kYWJsZScpKSB7XHJcblx0XHRcdFx0JGhlYWRlci5vbignY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoJGhlYWRlci5oYXNDbGFzcygnaXNMaW5rRXBhbmRhYmxlQ2xpY2snKSkge1xyXG5cdFx0XHRcdCRsaW5rcy5vbignY2xpY2snLCBlID0+IGNsaWNrRXZlbnRzKCRsaW5rcykpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRoZWFkZXIub24oJ2NsaWNrJywgZSA9PiBjbGlja0V2ZW50cygkaGVhZGVyKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGVsZW1lbnRzID1cclxuXHRcdFx0XHQnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIGlucHV0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgc2VsZWN0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgYSc7XHJcblx0XHRcdCQoZWxlbWVudHMpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChhamF4UmVmcmVzaCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGNvbnN0IGFqYXhSZWZyZXNoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIHJlbW92ZSBjbGljayBldmVudHNcclxuXHRcdFx0JCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyJykub2ZmKCk7XHJcblxyXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxyXG5cdFx0XHQkKFxyXG5cdFx0XHRcdCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgaW5wdXQsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBzZWxlY3QsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBhJ1xyXG5cdFx0XHQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25QcmVzY3JpcHRpb25FeHBhbmRhYmxlQXJlYScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gaWYgbmV3IFNlY3Rpb25FeHBhbmRhYmxlIHRoZW4gYWRkIHRvIHByZXZpZXdzdGF0IGFycmF5XHJcblx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIGFkZCByb3dcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7IGNsaWVudDogc3RhdCwgc2VydmVyOiBzdGF0IH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxyXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcclxuXHRcdFx0XHRpZiAoY3VyU3RhdGUgIT0gcHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10pIHtcclxuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gZmFsc2UgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcclxuXHRcdFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZSA9IG5ldyBQcmVzY3JpcHRpb25FeHBhbmRhYmxlKGNvbmZpZyk7XHJcblx0XHRTaWxrVUkuRXhlY3V0ZShTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUuaW5pdCwgJ0Vycm9yIG9uIFdlYlBhdHRlcm5zL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZSA9IHsgY3JlYXRlIH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgU2FwcGhpcmVIZWFkZXIgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2FwcGhpcmVIZWFkZXIoY29uZmlnKTtcclxuXHRcdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZCA9IGNvbmZpZy53aWRnZXRJZDtcclxuXHR9O1xyXG5cclxuXHR2YXIgaGFuZGxlRGVtb2dyYXBoaWNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZF0uaGFuZGxlRGVtb2dyYXBoaWNzKCk7XHJcblx0fTtcclxuXHJcblx0dmFyIFNhcHBoaXJlSGVhZGVyID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy5pc0NvbmZpZGVudGlhbCA9IGNvbmZpZy5pc0NvbmZpZGVudGlhbDtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHdpZGdldC5jc3Moe1xyXG5cdFx0XHRkaXNwbGF5OiAnYmxvY2snXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGhlYWRlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXInKTtcclxuXHRcdHRoaXMuJGRlbW9ncmFwaGljID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKTtcclxuXHRcdHRoaXMuJGluZm9ybWF0aW9uID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1pbmZvcm1hdGlvbicpO1xyXG5cdFx0dGhpcy4kYWRkaXRpb25hbFRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWFkZGl0aW9uYWwtdHJpZ2dlcicpO1xyXG5cdFx0dGhpcy4kYWRkaXRpb25hbENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWFkZGl0aW9uYWwtY29udGVudCcpO1xyXG5cdFx0dGhpcy5oYW5kbGVSZXNpemUoKTtcclxuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlRGVtb2dyYXBoaWNzKCk7XHJcblx0XHRcdH0sIDUwMCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlSGVhZGVyLnByb3RvdHlwZS5oYW5kbGVSZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLmhhbmRsZURlbW9ncmFwaGljcygpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChfdGhpcy4kaGVhZGVyLmhhc0NsYXNzKCdpc09wZW4nKSkge1xyXG5cdFx0XHRcdF90aGlzLiRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdF90aGlzLiRoZWFkZXIuYWRkQ2xhc3MoJ2lzT3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuaGFuZGxlRGVtb2dyYXBoaWNzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGRlbW9ncmFwaGljLmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdHRoaXMuJGFkZGl0aW9uYWxUcmlnZ2VyLmhpZGUoKTtcclxuXHRcdHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmVtcHR5KCk7XHJcblx0XHR2YXIgZGVtb2dyYXBoaWNXaWR0aCA9IHRoaXMuJGRlbW9ncmFwaGljLm91dGVyV2lkdGgodHJ1ZSk7XHJcblx0XHR2YXIgaXRlbXNUb3RhbCA9IDA7XHJcblx0XHR0aGlzLiRkZW1vZ3JhcGhpYy5maW5kKCcuRGVtb2dyYXBoaWMtaXRlbScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcblx0XHRcdGl0ZW1zVG90YWwgKz0gcGFyc2VJbnQoJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpLCAxMCk7XHJcblx0XHRcdGlmIChpdGVtc1RvdGFsICsgNjAgPCBkZW1vZ3JhcGhpY1dpZHRoKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9uZSgpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKS5hcHBlbmRUbyhfdGhpcy4kYWRkaXRpb25hbENvbnRlbnQpO1xyXG5cdFx0XHRcdF90aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHRoaXMuJGhlYWRlci5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLnNob3dBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5hZGRDbGFzcygnaXNPcGVuJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhpZGVBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRoYW5kbGVEZW1vZ3JhcGhpY3M6IGhhbmRsZURlbW9ncmFwaGljcyxcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdGlmICghISQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKS5sZW5ndGgpIHtcclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkXS5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7IiwiLyogQ29tcG9uZW50IFNhcHBoaXJlUmFkaW9CdXR0b24gKi9cclxuU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUmFkaW9CdXR0b24gPSB3aWRnZXRJZCA9PiB7XHJcblx0dmFyICR3aWRnZXQgPSAkKCcjJyArIHdpZGdldElkKTtcclxuXHR2YXIgJGNvbnRyb2wgPSAkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpO1xyXG5cdHZhciBuYW1lID0gJGNvbnRyb2wucHJvcCgnbmFtZScpO1xyXG5cclxuXHQkY29udHJvbC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0JCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdW25hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0LmNsb3Nlc3QoJy5CdXR0b25SYWRpb0lucCcpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcclxuXHRcdFx0JHdpZGdldC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkd2lkZ2V0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JHdpZGdldC5maW5kKCcuQnV0dG9uUmFkaW9JbnBfcmFkaW9UZXh0JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoXHJcblx0XHRcdCQodGhpcylcclxuXHRcdFx0XHQuY2xvc2VzdCgnLkJ1dHRvblJhZGlvSW5wJylcclxuXHRcdFx0XHQuaGFzQ2xhc3MoJ2Rpc2FibGVkJylcclxuXHRcdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHQkY29udHJvbC50cmlnZ2VyKCdjbGljaycpO1xyXG5cdFx0JGNvbnRyb2wudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdGlmICgkY29udHJvbC5pcygnOmNoZWNrZWQnKSkge1xyXG5cdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG4iLCIvKiBDb21wb25lbnQgU2VjdGlvbkV4cGFuZGFibGUgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU4JykgfHwgJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU5JykpIHtcclxuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFqYXggcmVmcmVzIGZ1bmN0aW9uXHJcblx0XHR0aGF0LmFqYXhSZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoKTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gc2VsZWN0LCAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIGEnKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgbmV3IGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxyXG5cdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID0ge1xyXG5cdFx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxyXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcclxuXHRcdFx0XHRpZiAoY3VyU3RhdGUgIT0gcHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10pIHtcclxuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gZmFsc2UgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpXHJcblx0XHRcdFx0XHRcdFx0LmhlaWdodCgwKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gdHJ1ZSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIHNldCBldmVudHNcclxuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7XHJcblx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRzZXJ2ZXI6IHN0YXQsXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ0hpZGVXaGVuRW1wdHknKSAmJiAkKHRoaXMpLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50JykudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBoYWNrIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gU2VjdGlvbkV4cGFuZGFibGVDdXN0b20gaGFzIG5vIGNoaWxkIGl0ZW1zXHJcblx0XHRcdFx0dmFyIGlzRW1wdHkgPSB0cnVlO1xyXG5cdFx0XHRcdCQodGhpcykuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tX2NvbnRlbnQgZGl2LCAuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCBzcGFuJykubm90KCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGlzRW1wdHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGlmICghaXNFbXB0eSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZScsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblx0XHRcdFx0dmFyICRleHBhbmRhYmxlSW5zdGFuY2UgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciAkdG9nZ2xlciA9ICQodGhpcykuZmluZCgnPiAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIC5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVyJyk7XHJcblx0XHRcdFx0aWYgKCR0b2dnbGVyLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyICR0b2dnbGVyU3RhdGUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0JHRvZ2dsZXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHQkdG9nZ2xlclN0YXRlID0gISR0b2dnbGVyU3RhdGU7XHJcblx0XHRcdFx0XHRcdGlmICgkdG9nZ2xlclN0YXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0JGV4cGFuZGFibGVJbnN0YW5jZS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGUtdG9nZ2xlZCcpLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHQkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHZhbHVlXScpLnRleHQoJHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWxoaWRlXScpLmRhdGEoJ2xhYmVsaGlkZScpKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQkZXhwYW5kYWJsZUluc3RhbmNlLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVkJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoXCJjbGlja1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gYScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkV4cGFuZGFibGVDdXN0b20oKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2lsa1VJRnJhbWV3b3JrL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2VjdGlvbkV4cGFuZGFibGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cclxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpLm9mZigpO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcclxuXHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zIHRvIGNyZWF0ZSBhcnJheSBzdGF0XHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7IGNsaWVudDogc3RhdCwgc2VydmVyOiBzdGF0IH07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpXHJcblx0XHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBzZXRPcGVuQ2xvc2VDbGFzcyA9IGlkID0+IHtcclxuXHRcdGlkLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoaWQucGFyZW50KCkuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHQuZmluZCgnLkhlYWRlckljb24nKVxyXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnY2xvc2VkJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnY2xvc2VkJyk7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnb3BlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBzZXROb0JvcmRlciA9IHdpZGdldCA9PiB7XHJcblx0XHR3aWRnZXQuYWRkQ2xhc3MoJ1NlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlci0tbm9Cb3JkZXInKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUoKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2lsa1VJRnJhbWV3b3JrL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRzZXROb0JvcmRlcixcclxuXHRcdHNldE9wZW5DbG9zZUNsYXNzLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgU2VsZWN0U3lzdGVtICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TZWxlY3RTeXN0ZW0gPSBjb25maWcgPT4ge1xyXG5cdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIFdpZGdldElkID0gY29uZmlnLldpZGdldElkOyAvL0NvbWJvIEJveCBJZCB0byBiZSB1c2VkLlxyXG5cdFx0dmFyIENsYXNzID0gY29uZmlnLkNsYXNzOyAvL0FsbCBDb21ibyBib3hlcyB3aXRoIHRoaXMgY2xhc3Mgd2lsbCBiZSBiZSB0cmFuc2Zvcm1lZC5cclxuXHRcdHZhciBOb1Jlc3VsdHNUZXh0ID0gY29uZmlnLk5vUmVzdWx0c1RleHQ7IC8vVGV4dCB0byBkaXNwbGF5IHdoZW4gdGhlcmUgYXJlIG5vIHJlc3VsdHMuXHJcblx0XHR2YXIgaW5wdXRUeXBlID0gY29uZmlnLklucHVUeXBlOyAvL09wdGlvbnM6IEZJbHRlcnMsIERyb3Bkb3duLCBTZWxlY3QyXHJcblx0XHR2YXIgUHJvbXB0ID0gY29uZmlnLlByb21wdDsgLy9Qcm9tcHQgaW4gc2VhcmNoXHJcblx0XHR2YXIgU2VsZWN0MlR5cGUgPSBjb25maWcuU2VsZWN0VHlwZTsgLy8gVHlwZSBvZiBzZWxlY3QyIGNvbmZpZ3VyYXRpb25cclxuXHRcdHZhciBIYXNTZWFyY2ggPSBjb25maWcuSGFzU2VhcmNoOyAvLyBoYXMgc2VhcmNoXHJcblx0XHR2YXIgT25TZWxlY3RpbmdKUyA9IGNvbmZpZy5PblNlbGVjdGluZ0pTO1xyXG5cdFx0dmFyIE9uVW5TZWxlY3RpbmdKUyA9IGNvbmZpZy5PblVuU2VsZWN0aW5nSlM7XHJcblx0XHR2YXIgTWF4aW11bUxlbmd0aCA9IGNvbmZpZy5NYXhpbXVtTGVuZ3RoO1xyXG5cdFx0dmFyIFNlbGVjdGVkVmFsdWUgPSBjb25maWcuU2VsZWN0ZWRWYWx1ZTtcclxuXHRcdHZhciBhbGxvd0NsZWFyID0gY29uZmlnLmFsbG93Q2xlYXI7XHJcblx0XHQvLyAgU2VsZWN0MiBBamF4IENvbmZpZ3VyYXRpb25cclxuXHRcdHZhciBBamF4VVJMID0gY29uZmlnLkFqYXhVUkw7XHJcblx0XHR2YXIgQWpheERlbGF5ID0gY29uZmlnLkFqYXhEZWxheTtcclxuXHRcdHZhciBQYWdpbmF0aW9uU2l6ZSA9IGNvbmZpZy5QYWdpbmF0aW9uU2l6ZTtcclxuXHRcdHZhciBNaW5pbXVtSW5wdXRMZW5naHQgPSBjb25maWcuTWluaW11bUlucHV0TGVuZ2h0O1xyXG5cdFx0dmFyIFNlYXJjaFRlcm0gPSBjb25maWcuU2VhcmNoVGVybTtcclxuXHRcdHZhciBTZWFyY2hFeHRyYVBhcmFtMSA9IGNvbmZpZy5TZWFyY2hFeHRyYVBhcmFtMTtcclxuXHRcdHZhciBQYWdlVGVybSA9IGNvbmZpZy5QYWdlVGVybTtcclxuXHRcdHZhciBBbW91bnRQYWdlID0gY29uZmlnLlBhZ2VBbW91bnQ7XHJcblx0XHR2YXIgaXNNdWx0aXBsZSA9IGNvbmZpZy5pc011bHRpcGxlO1xyXG5cdFx0dmFyIFNlbGVjdDJPcHRpb25zID0ge307XHJcblx0XHR2YXIgJFdpZGdldElkZW50aWZpZXI7XHJcblxyXG5cdFx0LyogIFxyXG4gICAgICAgICAgQ2hhbmdlIHNlbGVjdDIgc2VhcmNoIGRpc3BsYXkgXHJcbiAgICAgICAgICAgICAgLU11bHRpcGxlIFNlbGVjdDIgc2VhcmNoIFVJIGxpa2UgU2luZ2xlIFNlbGVjdDJcclxuICAgICAgKi9cclxuXHRcdCQuZm4uc2VsZWN0Mi5hbWQuZGVmaW5lKFxyXG5cdFx0XHQnU2VhcmNoTGlrZVNpbmdsZScsXHJcblx0XHRcdFtcclxuXHRcdFx0XHQnc2VsZWN0Mi91dGlscycsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24nLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duL2F0dGFjaEJvZHknLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duL2F0dGFjaENvbnRhaW5lcicsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vc2VhcmNoJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bi9taW5pbXVtUmVzdWx0c0ZvclNlYXJjaCcsXHJcblx0XHRcdF0sXHJcblx0XHRcdGZ1bmN0aW9uIChVdGlscywgRHJvcGRvd24sIEF0dGFjaEJvZHksIEF0dGFjaENvbnRhaW5lciwgU2VhcmNoLCBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaCkge1xyXG5cdFx0XHRcdGxldCBkcm9wZG93blNlYXJjaCA9IFV0aWxzLkRlY29yYXRlKERyb3Bkb3duLCBTZWFyY2gpO1xyXG5cdFx0XHRcdGRyb3Bkb3duU2VhcmNoLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHR2YXIgJHJlbmRlcmVkID0gRHJvcGRvd24ucHJvdG90eXBlLnJlbmRlci5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdFx0Ly8gQWRkIGFiaWxpdHkgZm9yIGEgcGxhY2Vob2xkZXIgaW4gdGhlIHNlYXJjaCBib3hcclxuXHRcdFx0XHRcdGxldCBwbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5nZXQoJ3BsYWNlaG9sZGVyRm9yU2VhcmNoJykgfHwgJyc7XHJcblx0XHRcdFx0XHR2YXIgJHNlYXJjaCA9ICQoXHJcblx0XHRcdFx0XHRcdCc8c3BhbiBjbGFzcz1cInNlbGVjdDItc2VhcmNoIHNlbGVjdDItc2VhcmNoLS1kcm9wZG93blwiPicgK1xyXG5cdFx0XHRcdFx0XHQnPGlucHV0IGNsYXNzPVwic2VsZWN0Mi1zZWFyY2hfX2ZpZWxkXCIgcGxhY2Vob2xkZXI9XCInICtcclxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXIgK1xyXG5cdFx0XHRcdFx0XHQnXCIgdHlwZT1cInNlYXJjaFwiJyArXHJcblx0XHRcdFx0XHRcdCcgdGFiaW5kZXg9XCItMVwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGF1dG9jb3JyZWN0PVwib2ZmXCIgYXV0b2NhcGl0YWxpemU9XCJvZmZcIicgK1xyXG5cdFx0XHRcdFx0XHQnIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHJvbGU9XCJ0ZXh0Ym94XCIgLz4nICtcclxuXHRcdFx0XHRcdFx0Jzwvc3Bhbj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuJHNlYXJjaENvbnRhaW5lciA9ICRzZWFyY2g7XHJcblx0XHRcdFx0XHR0aGlzLiRzZWFyY2ggPSAkc2VhcmNoLmZpbmQoJ2lucHV0Jyk7XHJcblx0XHRcdFx0XHQkc2VhcmNoLmFkZENsYXNzKCdNdWx0aXBsZVNlbGVjdCcpO1xyXG5cclxuXHRcdFx0XHRcdCRyZW5kZXJlZC5wcmVwZW5kKCRzZWFyY2gpO1xyXG5cdFx0XHRcdFx0JHNlYXJjaC5wYXJlbnQoKS5hZGRDbGFzcygnTXVsdGlwbGVTZWxlY3QnKTtcclxuXHRcdFx0XHRcdHJldHVybiAkcmVuZGVyZWQ7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gRGVjb3JhdGUgdGhlIGRyb3Bkb3duK3NlYXJjaCB3aXRoIHRoZSBjb250YWluZXJzXHJcblx0XHRcdFx0bGV0IGFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShkcm9wZG93blNlYXJjaCwgQXR0YWNoQ29udGFpbmVyKTtcclxuXHRcdFx0XHRhZGFwdGVyID0gVXRpbHMuRGVjb3JhdGUoYWRhcHRlciwgQXR0YWNoQm9keSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBhZGFwdGVyO1xyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVmYXVsdCBDb25maWd1cmF0aW9uIG5lZWRlZCB0byBhc3NvY2lhdGUgdGhlIHdpZGdldCB0byB0aGUgc2VsZWN0MiBwbHVnaW5cclxuXHRcdCAqL1xyXG5cdFx0aWYgKFdpZGdldElkID09PSAnJyAmJiBDbGFzcyAhPSAnJykge1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllciA9ICQoJy4nICsgQ2xhc3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JFdpZGdldElkZW50aWZpZXIgPSAkKCcjJyArIFdpZGdldElkKTtcclxuXHRcdH1cclxuXHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3NlbGVjdC1oaWRlICcgKyBpbnB1dFR5cGU7XHJcblxyXG5cdFx0Ly8gIFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duUGFyZW50PSAkKCcjJytQYXJlbnREaXYpO1xyXG5cclxuXHRcdHZhciBmb3JtYXRSZXN1bHQgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdHZhciAkc2VsZWN0ZWRPcHRpb25zVmFsdWUgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCc6c2VsZWN0ZWQnKTtcclxuXHRcdFx0dmFyIHNlbGVjdGVkT3B0aW9ucyA9ICRzZWxlY3RlZE9wdGlvbnNWYWx1ZS5sZW5ndGg7XHJcblx0XHRcdHZhciB0b3RhbE9wdGlvbnMgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb24nKS5sZW5ndGg7XHJcblx0XHRcdHZhciBzZWxlY3RBbGxPcHQgPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb246Zmlyc3QtY2hpbGQ6c2VsZWN0ZWQnKS5sZW5ndGg7XHJcblx0XHRcdHZhciBhY3RpdmVWYWx1ZXMgPSAnJztcclxuXHRcdFx0dmFyIGFsbE9wdEV4Y2VwdEFsbCA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJzpzZWxlY3RlZDpub3QoXCIuU2VsZWN0ZWRBbGxcIiknKS5sZW5ndGg7XHJcblx0XHRcdHZhciAkYWxsT3B0RXhjZXB0QWxsT2JqID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnOnNlbGVjdGVkOm5vdChcIi5TZWxlY3RlZEFsbFwiKScpO1xyXG5cclxuXHRcdFx0aWYgKHNlbGVjdGVkT3B0aW9ucyA9PT0gdG90YWxPcHRpb25zKSB7XHJcblx0XHRcdFx0aWYgKHRvdGFsT3B0aW9ucyAtIDEgPiAzKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gJ0FsbCBTZWxlY3RlZCc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCRhbGxPcHRFeGNlcHRBbGxPYmouZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZVZhbHVlcyA9IGFjdGl2ZVZhbHVlcyArICcgJyArICQodGhpcylbMF0uaW5uZXJUZXh0O1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMucmVwbGFjZSgvLFxccyokLywgJycpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFjdGl2ZVZhbHVlcztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIHRvdGFsb3B0ID0gdG90YWxPcHRpb25zIC0gMTtcclxuXHRcdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID4gMykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNlbGVjdGVkT3B0aW9ucyArICcgb2YgJyArIHRvdGFsb3B0ICsgJyBzZWxlY3RlZCc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmIChzZWxlY3RlZE9wdGlvbnMgPiAwKSB7XHJcblx0XHRcdFx0XHRcdCRzZWxlY3RlZE9wdGlvbnNWYWx1ZS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMgKyAnICcgKyAkKHRoaXMpWzBdLmlubmVyVGV4dCArICcsICc7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRhY3RpdmVWYWx1ZXMgPSBhY3RpdmVWYWx1ZXMucmVwbGFjZSgvLFxccyokLywgJycpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYWN0aXZlVmFsdWVzO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICdTZWxlY3QgYW4gb3B0aW9uJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKE5vUmVzdWx0c1RleHQgIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZm9ybWF0Tm9NYXRjaGVzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBOb1Jlc3VsdHNUZXh0O1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbnB1dFR5cGUgIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9IGlucHV0VHlwZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYWxsb3dDbGVhciA9PT0gJ1RydWUnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmFsbG93Q2xlYXIgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChNYXhpbXVtTGVuZ3RoICE9ICcnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1heGltdW1JbnB1dExlbmd0aCA9IE1heGltdW1MZW5ndGg7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFByb21wdCAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5wbGFjZWhvbGRlciA9IFByb21wdDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnBsYWNlaG9sZGVyID0ge1xyXG5cdFx0XHRcdGlkOiAnLTEnLCAvLyB0aGUgdmFsdWUgb2YgdGhlIG9wdGlvblxyXG5cdFx0XHRcdHRleHQ6ICdTZWxlY3QgYW4gb3B0aW9uJyxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICczJykge1xyXG5cdFx0XHQvLyBTZWxlY3QyIEFqYXhcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMgPSB7fTtcclxuXHRcdFx0LyogU2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3M9JzphbGwnOyovXHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0NsZWFyID0gZmFsc2U7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRlbXBsYXRlU2VsZWN0aW9uID0gZnVuY3Rpb24gKHJlcG8pIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVwby5mdWxsX25hbWUgfHwgcmVwby50ZXh0O1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy50ZW1wbGF0ZVJlc3VsdCA9IGZ1bmN0aW9uIChyZXBvKSB7XHJcblx0XHRcdFx0aWYgKHJlcG8ubG9hZGluZykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlcG8udGV4dDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIG1hcmt1cCA9ICc8ZGl2IGNsYXNzPVwiXCJDbGVhcmZpeFwiXCI+JyArICc8ZGl2IGNsYXNzPVwiXCJUaGVtZUdyaWRfV2lkdGgxMlwiXCI+JyArIHJlcG8udGV4dCArICc8L2Rpdj4nO1xyXG5cdFx0XHRcdGlmIChyZXBvLmRlc2NyaXB0aW9uKSB7XHJcblx0XHRcdFx0XHRtYXJrdXAgKz0gJzxkaXYgY2xhc3M9XCJcIk9TQXV0b01hcmdpblRvcFwiXCI+JyArIHJlcG8uZGVzY3JpcHRpb24gKyAnPC9kaXY+JztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bWFya3VwICs9ICc8L2Rpdj4nO1xyXG5cdFx0XHRcdHJldHVybiBtYXJrdXA7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQoU2VsZWN0Mk9wdGlvbnMuYWpheCA9IHtcclxuXHRcdFx0XHR1cmw6IEFqYXhVUkwsXHJcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcclxuXHRcdFx0XHRkZWxheTogQWpheERlbGF5LFxyXG5cdFx0XHRcdGRhdGE6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuXHRcdFx0XHRcdHZhciBTZWxlY3QyQWpheE9wdCA9IHt9O1xyXG5cdFx0XHRcdFx0dmFyIFNwbGl0UGFyYW1ldGVyID0gU2VhcmNoRXh0cmFQYXJhbTEuc3BsaXQoJywnKTtcclxuXHRcdFx0XHRcdFNlbGVjdDJBamF4T3B0LlNlYXJjaFRlcm0gPSBwYXJhbXMudGVybTtcclxuXHRcdFx0XHRcdFNlbGVjdDJBamF4T3B0LlBhZ2UgPSBwYXJhbXMucGFnZSB8fCAxO1xyXG5cdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHQuUGFnZUFtb3VudCA9IEFtb3VudFBhZ2U7XHJcblxyXG5cdFx0XHRcdFx0U3BsaXRQYXJhbWV0ZXIuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNwbGl0VGV4dCA9IGVsLnNwbGl0KCc6Jyk7XHJcblx0XHRcdFx0XHRcdFNlbGVjdDJBamF4T3B0W3NwbGl0VGV4dFswXV0gPSBzcGxpdFRleHRbMV07XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gU2VsZWN0MkFqYXhPcHQ7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24gKGRhdGEsIHBhcmFtcykge1xyXG5cdFx0XHRcdFx0cGFyYW1zLnBhZ2UgPSBwYXJhbXMucGFnZSB8fCAxO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0cmVzdWx0czogZGF0YS5pdGVtcyxcclxuXHRcdFx0XHRcdFx0cGFnaW5hdGlvbjoge1xyXG5cdFx0XHRcdFx0XHRcdG1vcmU6IHBhcmFtcy5wYWdlICogUGFnaW5hdGlvblNpemUgPCBkYXRhLnRvdGFsX2NvdW50LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNhY2hlOiB0cnVlLFxyXG5cdFx0XHR9KSxcclxuXHRcdFx0KFNlbGVjdDJPcHRpb25zLm1pbmltdW1JbnB1dExlbmd0aCA9IE1pbmltdW1JbnB1dExlbmdodCk7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmVzY2FwZU1hcmt1cCA9IGZ1bmN0aW9uIChtYXJrdXApIHtcclxuXHRcdFx0XHRyZXR1cm4gbWFya3VwO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRpZiAoY29uZmlnLmlzTXVsdGlwbGUpIHtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5tdWx0aXBsZSA9IHRydWU7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnU2VsZWN0MkFqYXggTXVsdGlwbGUnO1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAnU2VsZWN0MkFqYXggTXVsdGlwbGUnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gZmFsc2U7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnU2VsZWN0MkFqYXgnO1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAnU2VsZWN0MkFqYXgnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5taW5pbXVtUmVzdWx0c0ZvclNlYXJjaCA9IDA7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRhZ3MgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jbG9zZU9uc2VsZWN0ID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMucGxhY2Vob2xkZXIgPSBQcm9tcHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMicpIHtcclxuXHRcdFx0Ly9TZWxlY3QyIHdpdGggQ2hlY2tCb3hcclxuXHJcblx0XHRcdHZhciBpc0FsbFNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdGlmICgkV2lkZ2V0SWRlbnRpZmllclswXS5vcHRpb25zLmxlbmd0aCA9PT0gJFdpZGdldElkZW50aWZpZXJbMF0uc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCkge1xyXG5cdFx0XHRcdGlzQWxsU2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoV2lkZ2V0SWQgIT0gJycpIHtcclxuXHRcdFx0XHRvcHRpb24gPSBuZXcgT3B0aW9uKCdTZWxlY3QgQWxsJywgJ0FsbCcsIHRydWUsIGlzQWxsU2VsZWN0ZWQpO1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnByZXBlbmQob3B0aW9uKTtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5maW5kKCdvcHRpb246Zmlyc3QtY2hpbGQnKS5hZGRDbGFzcygnU2VsZWN0ZWRBbGwnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5tdWx0aXBsZSA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNsb3NlT25TZWxlY3QgPSBmYWxzZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuYWxsb3dIdG1sID0gZmFsc2U7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRhZ3MgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmIChIYXNTZWFyY2ggPT09ICdUcnVlJykge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQWRhcHRlciA9ICQuZm4uc2VsZWN0Mi5hbWQucmVxdWlyZSgnU2VhcmNoTGlrZVNpbmdsZScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ011bHRpcGxlU2VsZWN0JztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdNdWx0aXBsZVNlbGVjdCc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRlbXBsYXRlU2VsZWN0aW9uID0gZm9ybWF0UmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzYnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgSHRtbE9wdGlvbnNcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMgPSB7fTtcclxuXHRcdFx0dmFyIGRhdGFIdG1sT3B0aW9uID0gW107XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0XHR2YXIgb3B0aW9uT2JqZWN0ID0ge1xyXG5cdFx0XHRcdFx0aWQ6ICQodGhpcykudmFsKCksXHJcblx0XHRcdFx0XHR0ZXh0OiAkKHRoaXMpLnRleHQoKSxcclxuXHRcdFx0XHRcdGh0bWw6ICQodGhpcykudGV4dCgpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0ZGF0YUh0bWxPcHRpb24ucHVzaChvcHRpb25PYmplY3QpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ2N1c3RvbVNlbGVjdCc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAnZHJvcGRvd25DdXN0b20nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kYXRhID0gZGF0YUh0bWxPcHRpb247XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmVzY2FwZU1hcmt1cCA9IGZ1bmN0aW9uIChtYXJrdXApIHtcclxuXHRcdFx0XHRyZXR1cm4gbWFya3VwO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKFNlbGVjdGVkVmFsdWUgIT0gJycpIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoU2VsZWN0ZWRWYWx1ZSkudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIudmFsKCcnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzEnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgVGFnQ3VzdG9tXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRhZ3MgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICd0YWdDdXN0b20nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ3RhZ0N1c3RvbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLlRva2VuU2VwYXJhdG9zID0gWycsJywgJyAnXTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY3JlYXRlU2VhcmNoQ2hvaWNlID0gZnVuY3Rpb24gKHRlcm0sIGRhdGEpIHtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHQkKGRhdGEpLmZpbHRlcihmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnRleHQubG9jYWxlQ29tcGFyZSh0ZXJtKSA9PT0gMDtcclxuXHRcdFx0XHRcdH0pLmxlbmd0aCA9PT0gMFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0aWQ6IHRlcm0sXHJcblx0XHRcdFx0XHRcdHRleHQ6IHRlcm0sXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICc1Jykge1xyXG5cdFx0XHQvLyBTZWxlY3QyIFRhZ011bHRpcGxlXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRhZ3MgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICd0YWdTeXN0ZW0nO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ3RhZ1N5c3RlbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNyZWF0ZVRhZyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuXHRcdFx0XHR2YXIgdGVybSA9ICQudHJpbShwYXJhbXMudGVybSk7XHJcblx0XHRcdFx0aWYgKHRlcm0gPT09ICcnKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGlkOiAnIycgKyB0ZXJtLFxyXG5cdFx0XHRcdFx0dGV4dDogdGVybSxcclxuXHRcdFx0XHRcdG5ld1RhZzogdHJ1ZSwgLy8gYWRkIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKEhhc1NlYXJjaCA9PT0gJ0ZhbHNlJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5taW5pbXVtUmVzdWx0c0ZvclNlYXJjaCA9IC0xO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChPblVuU2VsZWN0aW5nSlMgIT0gJycgfHwgT25TZWxlY3RpbmdKUyAhPSAnJykge1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllclxyXG5cdFx0XHRcdC5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKVxyXG5cdFx0XHRcdC5vbignc2VsZWN0Mjp1bnNlbGVjdGluZycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHQkKHRoaXMpLmRhdGEoJ3Vuc2VsZWN0aW5nJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHRPblVuU2VsZWN0aW5nSlM7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oJ3NlbGVjdDpzZWxlY3RpbmcnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0T25TZWxlY3RpbmdKUztcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignc2VsZWN0Om9wZW5pbmcnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuZGF0YSgndW5zZWxlY3RpbmcnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZURhdGEoJ3Vuc2VsZWN0aW5nJyk7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignc2VsZWN0Om9wZW4nLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignc2VsZWN0MjpjbG9zZScsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMicpIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHR2YXIgaWR3aWRnZXQgPSAnIycgKyBXaWRnZXRJZDtcclxuXHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFVuc2VsZWN0ZWRJZCA9IGUucGFyYW1zLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRpZiAoVW5zZWxlY3RlZElkID09PSAnQWxsJykge1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG5cdFx0XHRcdFx0XHR2YXIgYWxsT3B0aW9ucyA9ICQoaWR3aWRnZXQgKyAnIG9wdGlvbicpO1xyXG5cdFx0XHRcdFx0XHRhbGxPcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkSXRlbXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIudmFsKHNlbGVjdGVkSXRlbXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkT3B0aW9ucyA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLmxlbmd0aDtcclxuXHRcdFx0XHRcdFx0dmFyIHRvdGFsT3B0aW9ucyA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbicpLmxlbmd0aDtcclxuXHRcdFx0XHRcdFx0aWYgKHNlbGVjdGVkT3B0aW9ucyA9PT0gdG90YWxPcHRpb25zIC0gMSAmJiAkKGlkd2lkZ2V0ICsgJyA+ICBvcHRpb246c2VsZWN0ZWQ6Zmlyc3QtY2hpbGQnKS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBhbGxPcHRpb25zID0gJChpZHdpZGdldCArICcgb3B0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFx0YWxsT3B0aW9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkSXRlbXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIudmFsKHNlbGVjdGVkSXRlbXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5vbignc2VsZWN0Mjp1bnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRVbnNlbGVjdGVkSWQgPSBlLnBhcmFtcy5kYXRhLmlkO1xyXG5cdFx0XHRcdFx0aWYgKFVuc2VsZWN0ZWRJZCA9PT0gJ0FsbCcpIHtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldCArICcgPiBvcHRpb24nKS5yZW1vdmVBdHRyKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdvcGVuJyk7XHJcblx0XHRcdFx0XHRcdCQoaWR3aWRnZXQpXHJcblx0XHRcdFx0XHRcdFx0LnZhbCgnJylcclxuXHRcdFx0XHRcdFx0XHQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0XHRcdC8vJChpZHdpZGdldCArJyA+IG9wdGlvbicpLmF0dHIoJ3NlbGVjdGVkJywgXCJzZWxlY3RlZFwiKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdCQoaWR3aWRnZXQgKyAnID4gb3B0aW9uOmZpcnN0LWNoaWxkJykucmVtb3ZlQXR0cignc2VsZWN0ZWQnKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59OyIsIi8qIENvbXBvbmVudCBTaGlmdENvbnRhaW5lciAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRsZXQgc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyO1xyXG5cdGxldCAkc2hpZnRDb250YWluZXJJZCA9ICQoKTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gc2hpZnRDb250YWluZXJJZCA9PiB7XHJcblxyXG5cdFx0Ly8gJCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcblx0XHQkc2hpZnRDb250YWluZXJJZCA9ICQoc2hpZnRDb250YWluZXJJZCk7XHJcblxyXG5cdFx0aGFzU2Nyb2xsQmFyKCk7XHJcblx0XHRoYW5kbGVTaGlmdFRhYmxlKCk7XHJcblxyXG5cdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyBcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdFx0Ly8gXHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHQvLyB9LCAxNTAwKTtcclxuXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX19hcnJvdycpLm9mZignbW91c2Vkb3duJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmVkcmF3U2hpZnRUaW1lbGluZSgpO1xyXG5cdFx0XHR9LCAxNTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRjb25zdCBoYW5kbGVTaGlmdFRhYmxlID0gKCkgPT4ge1xyXG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xyXG5cdFx0XHR2YXIgJGVsRmxhZyA9ICQodGhpcykucGFyZW50KCkuZmluZCgnLkZsYWdMaW5lJyk7XHJcblx0XHRcdHZhciAkZWxGbGFnVGltZSA9ICQodGhpcykucGFyZW50KCkuZmluZCgnLkZsYWdMaW5lX3RpbWUnKTtcclxuXHRcdFx0dmFyICRjb2x1bW5GbGFnID0gJGVsRmxhZy5kYXRhKCdjb2x1bW4nKTtcclxuXHRcdFx0dmFyICRtaW51dGVzRmxhZyA9ICRlbEZsYWcuZGF0YSgnbWludXRlcycpO1xyXG5cdFx0XHR2YXIgJHNsb3RzID0gJCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykuZmluZCgnLlNoaWZ0Q2VsbENvbnRlbnQnKTtcclxuXHRcdFx0dmFyICRzbG90V2lkdGggPSBNYXRoLnJvdW5kKCRzbG90cy5lcSgwKS53aWR0aCgpKTtcclxuXHRcdFx0dmFyIG1pbnV0ZXNQb3NpdGlvbiA9ICgkbWludXRlc0ZsYWcgKiAkc2xvdFdpZHRoKSAvIDYwO1xyXG5cclxuXHRcdFx0Ly8gaGFuZGxlIGN1cnJlbnQgdGltZSBmbG9nIGhvcml6b250YWwgcG9zaXRpb25pbmdcclxuXHRcdFx0dmFyIHNsb3RzUG9zaXRpb24gPSBbXTtcclxuXHRcdFx0JHNsb3RzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xyXG5cdFx0XHRcdHNsb3RzUG9zaXRpb24ucHVzaCgkKHRoaXMpLnBvc2l0aW9uKCkubGVmdCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkZWxGbGFnLmNzcygnbGVmdCcsIHNsb3RzUG9zaXRpb25bJGNvbHVtbkZsYWcgLSAxXSArIG1pbnV0ZXNQb3NpdGlvbik7XHJcblx0XHRcdCRlbEZsYWcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdGlmICgkY29sdW1uRmxhZyA9PT0gJHNsb3RzLmxlbmd0aCkge1xyXG5cdFx0XHRcdCRlbEZsYWdUaW1lLmNzcyh7XHJcblx0XHRcdFx0XHRyaWdodDogJzFweCcsXHJcblx0XHRcdFx0XHRsZWZ0OiAnYXV0bycsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGhhbmRsZSBjZWxscyB0aGF0IG1pZ2h0IHNwYW4gb3ZlciBzZXZlcmFsIHNsb3RzXHJcblx0XHRcdCQodGhpcykuZmluZCgnLlNoaWZ0Q2FyZCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbFJvdykge1xyXG5cdFx0XHRcdHZhciByb3dIYXNTcGFubmVkQ2VsbCA9IGZhbHNlO1xyXG5cdFx0XHRcdCQoZWxSb3cpLmZpbmQoJy5TaGlmdENlbGxDb250ZW50JykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsQ2VsbCkge1xyXG5cdFx0XHRcdFx0dmFyIGNvbHNwYW4gPSAkKGVsQ2VsbCkuZGF0YSgnY29sc3BhbicpO1xyXG5cdFx0XHRcdFx0aWYgKGNvbHNwYW4gPT09IHNsb3RzUG9zaXRpb24ubGVuZ3RoIHx8IHJvd0hhc1NwYW5uZWRDZWxsKSB7XHJcblx0XHRcdFx0XHRcdCQoZWxDZWxsKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRcdFx0XHRcdGZsZXg6ICcxIDEgYXV0bycsXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjb2xzcGFuID4gMSkge1xyXG5cdFx0XHRcdFx0XHRyb3dIYXNTcGFubmVkQ2VsbCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdCQoZWxDZWxsKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG5cdFx0XHRcdFx0XHRcdGZsZXg6ICdub25lJyxcclxuXHRcdFx0XHRcdFx0XHR3aWR0aDogKyhzbG90c1Bvc2l0aW9uW2NvbHNwYW5dIC0gc2xvdHNQb3NpdGlvblswXSkgKyAncHgnLFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBoYW5kbGUgaG9yaXpvbnRhbCBzY3JvbGwgYmVoYXZpb3JcclxuXHRcdFx0aWYgKGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGgpIHtcclxuXHRcdFx0XHQkKGVsKS53aWR0aChlbC5zY3JvbGxXaWR0aCk7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykud2lkdGgoZWwuc2Nyb2xsV2lkdGgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoZWwpLndpZHRoKCdhdXRvJyk7XHJcblx0XHRcdFx0JCh0aGlzKS5jbG9zZXN0KCcuU2hpZnRDb250YWluZXInKS5maW5kKCcuU2hpZnRDb250YWluZXJfaGVhZGVyJykud2lkdGgoJ2F1dG8nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaGFzU2Nyb2xsQmFyID0gKCkgPT4ge1xyXG5cdFx0dmFyICRTY3JvbGxhYmxlRGl2ID0gJHNoaWZ0Q29udGFpbmVySWQuZmluZCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXInKTtcclxuXHRcdGlmICgkc2hpZnRDb250YWluZXJJZC5maW5kKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0aWYgKCRTY3JvbGxhYmxlRGl2LmdldCgwKS5zY3JvbGxIZWlnaHQgPiAkU2Nyb2xsYWJsZURpdi5oZWlnaHQoKSkge1xyXG5cdFx0XHRcdHZhciAkbGFzdENlbGwgPSAkc2hpZnRDb250YWluZXJJZC5maW5kKCcuSXNUaW1lcjpsYXN0LWNoaWxkJyk7XHJcblx0XHRcdFx0JGxhc3RDZWxsLmNzcygncGFkZGluZy1yaWdodCcsICc3cHgnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlZHJhd1NoaWZ0VGltZWxpbmUgPSAoKSA9PiB7XHJcblx0XHRjbGVhclRpbWVvdXQoc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyKTtcclxuXHRcdHNoaWZ0VGltZWxpbmVSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRoYXNTY3JvbGxCYXIoKTtcclxuXHRcdFx0aGFuZGxlU2hpZnRUYWJsZSgpO1xyXG5cdFx0fSwgNDAwKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBjaGVja1Njcm9sbCA9ICgpID0+IHtcclxuXHRcdHZhciBoQ29udGVudCA9ICQoJy5Db250ZW50JykuaGVpZ2h0KCk7XHJcblx0XHR2YXIgaFdpbmRvdyA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcblx0XHRpZiAoaENvbnRlbnQgPiBoV2luZG93KSByZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0Y2hlY2tTY3JvbGwsXHJcblx0XHRyZWRyYXdTaGlmdFRpbWVsaW5lXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuXHJcbiQod2luZG93KS5vZmYoJ3Jlc2l6ZS5HZW5lcmljR2FsbGVyeScpLm9uKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcclxuXHJcblx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIucmVkcmF3U2hpZnRUaW1lbGluZSk7XHJcblxyXG5cdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCAxMDAwKTtcclxuXHJcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG5cdH0sIDE1MDApO1xyXG5cclxufSk7XHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCEhJCgnLlNoaWZ0Q29udGFpbmVyJykubGVuZ3RoKSB7XHJcblxyXG5cdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5yZWRyYXdTaGlmdFRpbWVsaW5lKCk7XHJcblx0XHR9LCA0MDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuXHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHR9LCA2MDApO1xyXG5cclxuXHRcdCQoJy5uYXZpZ2F0aW9uLWNvbnRyb2wtaXRlbScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvL1ZlcmlmeSB0aGUgc2Nyb2xsIGlmIHRvb2x0aXAgb3BlbmVkXHJcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICgkKCcudG9vbHRpcHN0ZXItYmFzZScpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdFx0JCgnLnRvb2x0aXBzdGVyLWJhc2UnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcclxuXHRcdFx0fSwgNDAwKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdH0sIDYwMCk7XHJcblxyXG5cdFx0XHQvLyBTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIucmVkcmF3U2hpZnRUaW1lbGluZTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG59KTsiLCIvKiBDb21wb25lbnQgSVNpZGViYXIgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2lkZWJhcihjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNpZGViYXIud2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0fTtcclxuXHJcblx0dmFyIGNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TaWRlYmFyLndpZGdldElkXS5jbG9zZSgpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTaWRlYmFyID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuaXNFeHBhbmRhYmxlID0gY29uZmlnLmlzRXhwYW5kYWJsZTtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyJyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyTWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuSVNpZGViYXItbWVudScpO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnVJdGVtID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TaWRlYmFyTWVudUl0ZW0nKTtcclxuXHRcdHRoaXMuJHNpZGViYXJTaGllbGQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLXNoaWVsZCcpO1xyXG5cdFx0dGhpcy4kc2lkZWJhckNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQnKTtcclxuXHRcdHRoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJz4gZGl2JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdQSCcpICYmICQodGhpcykudGV4dCgpID09PSAnJykge1xyXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcclxuXHRcdGlmICghdGhpcy5pc0V4cGFuZGFibGUpIHtcclxuXHRcdFx0dGhpcy5vcGVuTWVudUl0ZW0oMCk7XHJcblx0XHR9XHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC4kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XHJcblx0XHRcdGlmICghdGhpcy5pc0V4cGFuZGFibGUpIHtcclxuXHRcdFx0XHQkKCdpbnB1dFt0eXBlPVwidGV4dFwiXTp2aXNpYmxlJykuZXEoMCkuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQkKHdpbmRvdykudW5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC4kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRTaWRlYmFyLnByb3RvdHlwZS5hdHRhY2hFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kc2lkZWJhck1lbnUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGlmICghX3RoaXMuJHNpZGViYXIuaGFzQ2xhc3MoJ29wZW4nKSkge1xyXG5cdFx0XHRcdF90aGlzLm9wZW5NZW51SXRlbSgwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRzaWRlYmFyTWVudUl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWRQb3NpdGlvbiA9ICQodGhpcykuaW5kZXgoKTtcclxuXHRcdFx0X3RoaXMub3Blbk1lbnVJdGVtKHNlbGVjdGVkUG9zaXRpb24pO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRzaWRlYmFyU2hpZWxkLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0X3RoaXMuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kc2lkZWJhci5vbignY2xpY2snLCAnLlNlYXJjaFNpZGVCYXJGaWVsZHMgLkJ1dHRvbkdyb3VwX2J1dHRvbjpmaXJzdC1jaGlsZCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0X3RoaXMuJHNpZGViYXJcclxuXHRcdFx0XHQuZmluZCgnLkZpZWxkc1NsaWRlcicpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdUYWIxJylcclxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ1RhYjInKTtcclxuXHRcdFx0X3RoaXMuc2V0RmllbGRGb2N1cyhfdGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnLlRleHRJbnB1dDp2aXNpYmxlJykuZXEoMCkpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRzaWRlYmFyLm9uKCdjbGljaycsICcuU2VhcmNoU2lkZUJhckZpZWxkcyAuQnV0dG9uR3JvdXBfYnV0dG9uOmxhc3QtY2hpbGQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLiRzaWRlYmFyXHJcblx0XHRcdFx0LmZpbmQoJy5GaWVsZHNTbGlkZXInKVxyXG5cdFx0XHRcdC5hZGRDbGFzcygnVGFiMicpXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdUYWIxJyk7XHJcblx0XHRcdF90aGlzLnNldEZpZWxkRm9jdXMoX3RoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmVxKDApKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNpZGViYXIucHJvdG90eXBlLm9wZW5NZW51SXRlbSA9IGZ1bmN0aW9uIChzZWxlY3RlZFBvc2l0aW9uKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy4kc2lkZWJhclxyXG5cdFx0XHQuZmluZCgnLlNpZGViYXJNZW51SXRlbScpXHJcblx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJylcclxuXHRcdFx0LmVxKHNlbGVjdGVkUG9zaXRpb24pXHJcblx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHR0aGlzLiRzaWRlYmFyXHJcblx0XHRcdC5maW5kKCcuSVNpZGViYXItY29udGVudCA+IC5JU2lkZWJhci1jb250ZW50LXBhbmVsJylcclxuXHRcdFx0LmhpZGUoKVxyXG5cdFx0XHQuZXEoc2VsZWN0ZWRQb3NpdGlvbilcclxuXHRcdFx0LnNob3coKTtcclxuXHRcdHRoaXMuJHNpZGViYXIuYWRkQ2xhc3MoJ29wZW4nKTtcclxuXHRcdGlmICh3aW5kb3cucGFyZW50Lmxlbmd0aCAmJiB0aGlzLmlzRXhwYW5kYWJsZSkge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LlNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRCYXNlLm9wZW5TaWRlYmFySWZyYW1lKDApO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0dGhpcy5zZXRGaWVsZEZvY3VzKHRoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmVxKDApKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTaWRlYmFyLnByb3RvdHlwZS5zZXRGaWVsZEZvY3VzID0gZnVuY3Rpb24gKCRpbnB1dCkge1xyXG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkaW5wdXQuY2xpY2soKS5zZWxlY3QoKTtcclxuXHRcdH0sIDI1MCk7XHJcblx0fTtcclxuXHJcblx0U2lkZWJhci5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0aWYgKHdpbmRvdy5wYXJlbnQubGVuZ3RoKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2UuY2xvc2VTaWRlYmFySWZyYW1lKDApO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNFeHBhbmRhYmxlKSB7XHJcblx0XHRcdHRoaXMuJHNpZGViYXIucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuXHRcdFx0dGhpcy4kc2lkZWJhci5maW5kKCcuU2lkZWJhck1lbnVJdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHR0aGlzLiRzaWRlYmFyLmZpbmQoJy5JU2lkZWJhci1jb250ZW50ID4gLklTaWRlYmFyLWNvbnRlbnQtcGFuZWwnKS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNpZGViYXIgPSB7XHJcblx0XHRjcmVhdGU6IGNyZWF0ZSxcclxuXHRcdGNsb3NlOiBjbG9zZSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IFNwaW5uZXJIb3Jpem9udGFsICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TcGlubmVySG9yaXpvbnRhbCA9IHtcclxuXHRpbmNyZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHR2YXIgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZCkuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLmZpcnN0KCk7XHJcblx0XHRpZiAoX2VsZW1lbnQudmFsKCkgPT0gdW5kZWZpbmVkIHx8IF9lbGVtZW50LnZhbCgpID09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpKSkge1xyXG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xyXG5cdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA8IG1heFZhbHVlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudmFsKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpICsgMSk7XHJcblx0XHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoZWxlbWVudElkKS5maW5kKCdhLk1pbnVzJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPj0gbWF4VmFsdWUpIHtcclxuXHRcdFx0XHQkKGVsZW1lbnRJZCkuZmluZCgnYS5QbHVzJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGVjcmVtZW50OiBmdW5jdGlvbiAoZWxlbWVudElkLCBtaW5WYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHR2YXIgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZClcclxuXHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKVxyXG5cdFx0XHQuZmlyc3QoKTtcclxuXHRcdGlmIChfZWxlbWVudC52YWwoKSA9PSB1bmRlZmluZWQgfHwgX2VsZW1lbnQudmFsKCkgPT0gJycgfHwgaXNOYU4ocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkpKSB7XHJcblx0XHRcdF9lbGVtZW50LnZhbChtaW5WYWx1ZSk7XHJcblx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpID4gbWluVmFsdWUpIHtcclxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgLSAxKTtcclxuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5QbHVzJylcclxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA8PSBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuTWludXMnKVxyXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG59OyIsIi8qIENvbXBvbmVudCBTcGlubmVyVmVydGljYWwgKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdGNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBNaW5WYWx1ZSA9ICcgKyBNaW5WYWx1ZSArICc7XHJcblxyXG5cdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9IC5TcGlubmVySW5wdXRWZXJ0aWNhbCBpbnB1dGApLm9uKCdibHVyIGtleXVwIGlucHV0JywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIEN1cnJlbnRJbnB1dFZhbHVlID0gJChgIyR7Y29uZmlnLndpZGdldElEfSAuU3Bpbm5lcklucHV0VmVydGljYWwgaW5wdXRgKS52YWwoKTtcclxuXHJcblx0XHRcdFx0aWYgKEN1cnJlbnRJbnB1dFZhbHVlIDwgTWluVmFsdWUpIHtcclxuXHRcdFx0XHRcdCQoYCMke2NvbmZpZy53aWRnZXRJRH1gKVxyXG5cdFx0XHRcdFx0XHQuZmluZCgnLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9YClcclxuXHRcdFx0XHRcdFx0LmZpbmQoJy5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKCQoYCMke2NvbmZpZy53aWRnZXRJRH0gLlNwaW5uZXJJbnB1dFZlcnRpY2FsIGlucHV0YCkudmFsKCkgPD0gTWluVmFsdWUpIHtcclxuXHRcdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9YClcclxuXHRcdFx0XHRcdC5maW5kKCcuTWludXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29uZmlnLmlzQ3Vyc29yT25Gb2N1cykge1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5vbignZm9jdXMnLCBgIyR7Y29uZmlnLmlucHV0SUR9IGlucHV0YCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0dGhhdC5zZWxlY3Rpb25TdGFydCA9IHRoYXQuc2VsZWN0aW9uRW5kID0gMTAwMDAwO1xyXG5cdFx0XHRcdFx0fSwgMzAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgaW5jcmVtZW50ID0gKGVsZW1lbnRJZCwgbWluVmFsdWUsIG1heFZhbHVlLCB0cmlnZ2VyT25DaGFuZ2UsIHRyaWdnZXJPbklucHV0KSA9PiB7XHJcblx0XHRsZXQgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZClcclxuXHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJylcclxuXHRcdFx0LmZpcnN0KCk7XHJcblx0XHR2YXIgZm9yY2VJbnRlZ2VyID0gJChlbGVtZW50SWQpLmRhdGEoJ2ZvcmNlaW50ZWdlcicpID09PSAnVHJ1ZScgPyB0cnVlIDogZmFsc2U7XHJcblx0XHR2YXIgY3VycmVudFZhbHVlID0gcGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSk7XHJcblx0XHR2YXIgaW5jcmVtZW50VW5pdCA9IDE7XHJcblx0XHR2YXIgaXNEZWNpbWFscyA9IGN1cnJlbnRWYWx1ZSAlIDEgIT0gMDtcclxuXHJcblx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0LmZpbmQoJy5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0LnJlbW92ZUNsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHJcblx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpIDwgbWluVmFsdWUpIHtcclxuXHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0LmZpbmQoJ2EuTWludXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0LmFkZENsYXNzKCdEaXNhYmxlZFNwaW4nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFmb3JjZUludGVnZXIpIHtcclxuXHRcdFx0aWYgKGlzRGVjaW1hbHMpIHtcclxuXHRcdFx0XHRpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQgfHwgY3VycmVudFZhbHVlID09PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkpKSB7XHJcblx0XHRcdF9lbGVtZW50LnZhbChtaW5WYWx1ZSk7XHJcblx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodHJpZ2dlck9uSW5wdXQpIHtcclxuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpIDwgbWF4VmFsdWUpIHtcclxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09PSAwICYmICFmb3JjZUludGVnZXIpIHtcclxuXHRcdFx0XHRcdGluY3JlbWVudFVuaXQgPSBwYXJzZUZsb2F0KDAuMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdF9lbGVtZW50LnZhbChwYXJzZUZsb2F0KChjdXJyZW50VmFsdWUgKyBpbmNyZW1lbnRVbml0KS50b0ZpeGVkKDEpKSk7XHJcblx0XHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0cmlnZ2VyT25JbnB1dCkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignaW5wdXQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcclxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuUGx1c1ZlcnRpY2FsJylcclxuXHRcdFx0XHRcdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y2hlY2tTcGlubmVyVmVydGljYWxEaXNhYmxlZFN0YXR1cyhlbGVtZW50SWQsIHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGRlY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCkgPT4ge1xyXG5cdFx0dmFyIF9lbGVtZW50ID0gJChlbGVtZW50SWQpXHJcblx0XHRcdC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXHJcblx0XHRcdC5maXJzdCgpO1xyXG5cdFx0dmFyIGZvcmNlSW50ZWdlciA9ICQoZWxlbWVudElkKS5kYXRhKCdmb3JjZWludGVnZXInKSA9PT0gJ1RydWUnID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpO1xyXG5cdFx0dmFyIGluY3JlbWVudFVuaXQgPSAxO1xyXG5cdFx0dmFyIGlzRGVjaW1hbHMgPSBjdXJyZW50VmFsdWUgJSAxICE9IDA7XHJcblx0XHRpZiAoIWZvcmNlSW50ZWdlcikge1xyXG5cdFx0XHRpZiAoaXNEZWNpbWFscykge1xyXG5cdFx0XHRcdGluY3JlbWVudFVuaXQgPSBwYXJzZUZsb2F0KDAuMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChjdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50VmFsdWUgPT09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoY3VycmVudFZhbHVlKSkpIHtcclxuXHRcdFx0X2VsZW1lbnQudmFsKG1pblZhbHVlKTtcclxuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0cmlnZ2VyT25JbnB1dCkge1xyXG5cdFx0XHRcdF9lbGVtZW50LnRyaWdnZXIoJ2lucHV0Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkgPiBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT09IDEgJiYgIWZvcmNlSW50ZWdlcikge1xyXG5cdFx0XHRcdFx0aW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0X2VsZW1lbnQudmFsKHBhcnNlRmxvYXQoKGN1cnJlbnRWYWx1ZSAtIGluY3JlbWVudFVuaXQpLnRvRml4ZWQoMSkpKTtcclxuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRyaWdnZXJPbklucHV0KSB7XHJcblx0XHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLlBsdXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjaGVja1NwaW5uZXJWZXJ0aWNhbERpc2FibGVkU3RhdHVzKGVsZW1lbnRJZCwgcGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSksIG1pblZhbHVlLCBtYXhWYWx1ZSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY2hlY2tTcGlubmVyVmVydGljYWxEaXNhYmxlZFN0YXR1cyA9IChlbGVtZW50SWQsIHZhbHVlVG9DaGVjaywgbWluVmFsdWUsIG1heFZhbHVlKSA9PiB7XHJcblx0XHRpZiAodmFsdWVUb0NoZWNrIDw9IG1pblZhbHVlKSB7XHJcblx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0LmZpbmQoJ2EuTWludXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodmFsdWVUb0NoZWNrID49IG1heFZhbHVlKSB7XHJcblx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdC5maW5kKCdhLlBsdXNWZXJ0aWNhbCcpXHJcblx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKGVsZW1lbnRJZClcclxuXHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxyXG5cdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TcGlubmVyVmVydGljYWwgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRpbmNyZW1lbnQsXHJcblx0XHRkZWNyZW1lbnQsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCIvKiBDb21wb25lbnQgU3BsaXRCdXR0b24gKi9cclxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcclxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IFNwbGl0QnV0dG9uKGNvbmZpZyk7XHJcblx0fTtcclxuXHJcblx0dmFyIFNwbGl0QnV0dG9uID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XHJcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIHRoaXMuY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJGJ1dHRvbiA9IHRoaXMuJHdpZGdldC5maW5kKCcuU3BsaXRCdXR0b24tYnV0dG9uJyk7XHJcblx0XHR0aGlzLiRidXR0b25MaW5rID0gdGhpcy4kYnV0dG9uLmZpbmQoJz4gYScpO1xyXG5cdFx0dGhpcy4kdHJpZ2dlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuU3BsaXRCdXR0b24tdHJpZ2dlcicpO1xyXG5cdFx0dGhpcy4kYWN0aW9ucyA9IHRoaXMuJHdpZGdldC5maW5kKCcuU3BsaXRCdXR0b24tYWN0aW9ucycpO1xyXG5cdFx0aWYgKCEhdGhpcy4kYWN0aW9ucy50ZXh0KCkpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJz4gLlNwbGl0QnV0dG9uJykuYWRkQ2xhc3MoJ2hhc1RyaWdnZXInKTtcclxuXHRcdFx0dGhpcy5idWlsZEFjdGlvbnNUcmlnZ2VyKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0U3BsaXRCdXR0b24ucHJvdG90eXBlLmJ1aWxkQWN0aW9uc1RyaWdnZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgY2xhc3NMaXN0ID0gdGhpcy4kYnV0dG9uTGlua1swXS5jbGFzc0xpc3QudmFsdWU7XHJcblx0XHR0aGlzLiR0cmlnZ2VyLmFkZENsYXNzKGNsYXNzTGlzdCk7XHJcblx0XHQkKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBpbnNpZGUgYSBkb2N1bWVudCByZWFkeSBkdWUgdG8gc2FwcGhpcmUgcG9wdXAgYmluZGVkIGV2ZW50c1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhfdGhpcy5jb25maWcud2lkZ2V0SWQsIF90aGlzLiR0cmlnZ2VyLmhhc0NsYXNzKCd0b29sdGlwc3RlcmVkJykpO1xyXG5cdFx0XHRpZiAoIV90aGlzLiR0cmlnZ2VyLmhhc0NsYXNzKCd0b29sdGlwc3RlcmVkJykpIHtcclxuXHRcdFx0XHRfdGhpcy4kdHJpZ2dlci50b29sdGlwc3Rlcih7XHJcblx0XHRcdFx0XHRhcnJvdzogdHJ1ZSxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6ICQoJzxzZWN0aW9uLz4nKS5hcHBlbmQoX3RoaXMuJGFjdGlvbnMuY2xvbmUodHJ1ZSkpLFxyXG5cdFx0XHRcdFx0dHJpZ2dlcjogX3RoaXMuY29uZmlnLnRyaWdnZXJFdmVudCxcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBfdGhpcy5jb25maWcucG9zaXRpb24sXHJcblx0XHRcdFx0XHRtYXhXaWR0aDogX3RoaXMuY29uZmlnLm1heFdpZHRoLFxyXG5cdFx0XHRcdFx0dGhlbWU6ICd0b29sdGlwc3Rlci1zcGxpdGJ1dHRvbiBQYWRkaW5nLScgKyBfdGhpcy5jb25maWcucGFkZGluZyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRfdGhpcy4kYWN0aW9ucy5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNwbGl0QnV0dG9uID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG4iLCJ2YXIgbWlsaXNlY29uZHBhc3NlZCA9IDA7XHJcbnZhciBzdG9wdGltZXIgPSB0cnVlO1xyXG52YXIgbXlUaW1vdXQgID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIG9uS2V5ZG93bkZ1bmN0aW9uKCkge1xyXG4gICAgbWlsaXNlY29uZHBhc3NlZCA9IDA7XHJcbiAgXHJcbiAgICBzdG9wdGltZXI9dHJ1ZTtcclxuICAgIGNsZWFySW50ZXJ2YWwobXlUaW1vdXQpO1xyXG4gICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gIH07XHJcbiAgXHJcbiAgZnVuY3Rpb24gb25LZXlVcEZ1bmN0aW9uKGVsZW1lbnRUb0NsaWNrKSB7XHJcbiAgc3RvcHRpbWVyID0gZmFsc2U7XHJcbiAgXHJcbiAgaWYobWlsaXNlY29uZHBhc3NlZCA9PSAwICYmIG15VGltb3V0PT1udWxsKXtcclxuICAgICAgbXlUaW1vdXQgPSBzZXRJbnRlcnZhbChcclxuICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIG1pbGlzZWNvbmRwYXNzZWQrPTEwMDtcclxuICAgICAgICAgXHJcbiAgICAgICAgICBpZiAobWlsaXNlY29uZHBhc3NlZCA+PSA0MDAgJiYgc3RvcHRpbWVyPT1mYWxzZSkge1xyXG4gICAgICAgICAgICBtaWxpc2Vjb25kcGFzc2VkID0gMDtcclxuICAgICAgICAgICAgc3RvcHRpbWVyPXRydWU7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobXlUaW1vdXQpO1xyXG4gICAgICAgICAgICBteVRpbW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUb0NsaWNrLmNsaWNrKCk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGlmKHN0b3B0aW1lcj09dHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobXlUaW1vdXQpO1xyXG4gICAgICAgICAgICBteVRpbW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIGlmKHN0b3B0aW1lcj09dHJ1ZSl7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobXlUaW1vdXQpO1xyXG4gICAgICAgICAgICBteVRpbW91dCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxufTtcclxuXHJcbmlmKHR5cGVvZihzc2RDb21wb25lbnQpID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgIHNzZENvbXBvbmVudCA9IHtcclxuICAgICAgICBsZW5ndGg6IDAsXHJcbiAgICAgICAgbnVtYmVyT2ZBY3RpdmU6IDAsXHJcbiAgICAgICAgaXNSVEw6IGZhbHNlLFxyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICB0b0Rlc3Ryb3k6IGZhbHNlLFxyXG4gICAgICAgIG9uQmx1ckRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoc3NkQ29tcG9uZW50LmlkICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJyMnICsgc3NkQ29tcG9uZW50LmlkKTtcclxuICAgICAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ1tkYXRhLXNzZC1wbGFjZWhvbGRlcj0nICsgc3NkQ29tcG9uZW50LmlkICsgJ10nKTtcclxuICAgICAgICAgICAgICAgIGlmIChzc2RDb21wb25lbnQudG9EZXN0cm95KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3dyYXBwZXIuZmluZCgnLlNTRExpc3RSZWZyZXNoSGFuZGxlcicpLmZpbmQoJ2EudG8tZGVzdHJveScpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3dyYXBwZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIF93cmFwcGVyID0gJCgnW2RhdGEtc3NkLXBsYWNlaG9sZGVyPScgKyBzc2RDb21wb25lbnQuaWQgKyAnXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb2N1czogZnVuY3Rpb24oc3NkQ29tcG9uZW50V2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJChzc2RDb21wb25lbnRXaWRnZXQpLmNoaWxkcmVuKCdkaXYuU1NELVdyYXBwZXI6bm90KC5TZWxlY3RlZCknKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFfc3NkQ29tcG9uZW50V2lkZ2V0Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy9JZiB0aGlzIFNTRC1XcmFwcGVyIGlzIGFscmVhZHkgU2VsZWN0ZWQsIHJldHVybi5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5ibHVyKCk7IC8vQmx1cnMgdGhlIG90aGVyIGZvY3VzZWQgU1NEJ3MuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUrKztcclxuICAgICAgICAgICAgaWYoIV9zc2RDb21wb25lbnRXaWRnZXQucGFyZW50KCkuaGFzQ2xhc3MoJ1NTRFBvcHVwJykpe1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKVxyXG4gICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgJChkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzc2RDb21wb25lbnQuaXNSVEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5pc1JUTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHdpbmRvdykud2lkdGgoKSAtICQodGhpcykub3V0ZXJXaWR0aCgpIC0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQmFyJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQodGhpcykub3V0ZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc2libGluZ3MoJy5TU0QtTGlzdCcpLmF0dHIoJ2N1cnJlbnQtZm9jdXMnLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKVxyXG4gICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuU1NELUJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuU1NELUxpc3QnKS5hdHRyKCdjdXJyZW50LWZvY3VzJywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFfc3NkQ29tcG9uZW50V2lkZ2V0LnBhcmVudCgpLmhhc0NsYXNzKCdTU0RQb3B1cCcpKXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2xvc2VzdCgnZm9ybScpLmFwcGVuZChfc3NkQ29tcG9uZW50V2lkZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfc3NkQ29tcG9uZW50V2lkZ2V0LmFkZENsYXNzKCdQb3NpdGlvbmVkJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5hZGRDbGFzcygnU2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGJsdXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZighc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIF93cmFwcGVyID0gJCgnZGl2LlNTRC1XcmFwcGVyLlBvc2l0aW9uZWQuU2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF93cmFwcGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gJCgnIycgKyAkKHRoaXMpLmF0dHIoJ2RhdGEtc3NkLXBsYWNlaG9sZGVyJykpO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZCgkKHRoaXMpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfd3JhcHBlci5yZW1vdmVDbGFzcygnUG9zaXRpb25lZCcpXHJcbiAgICAgICAgICAgIC5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKVxyXG4gICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJydcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ1NlYXJjaGluZyBGaXhlZCBLZXlib2FyZE5hdicpXHJcbiAgICAgICAgICAgIC5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogJydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLnJlbW92ZUNsYXNzKCdTZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5TU0QtQmFyJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LnRhYnNDbGVhcih0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZS0tO1xyXG4gICAgICAgICAgICAkKFwiLlNTRF9MaXN0UmVjb3JkcyBzcGFuLCAuU1NEX0xpc3RMaW5lLlNob3dNb3JlLCAuU1NEX0RlbGV0ZU9uQmx1clwiKS5yZW1vdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmKCFzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vSWYgdGhlcmUncyBubyBTU0QgYWN0aXZlLCB0aGVyZSdzIG5vIG5lZWQgdG8gcmVzaXplIGl0LlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIF9zc2RXcmFwcGVyID0gJCgnZGl2LlNTRC1XcmFwcGVyLlNlbGVjdGVkJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnRXaWRnZXQgPSAkKCcjJyArIF9zc2RXcmFwcGVyLmF0dHIoJ2RhdGEtc3NkLXBsYWNlaG9sZGVyJykpWzBdO1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9IF9zc2RXcmFwcGVyLmNoaWxkcmVuKCcuU1NELUNvbXBvbmVudCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChfc3NkQ29tcG9uZW50V2lkZ2V0KS53aWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0vKixcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zc2RDb21wb25lbnRXaWRnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzc2RDb21wb25lbnQuaXNSVEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgLSAkKF9zc2RDb21wb25lbnRXaWRnZXQpLm91dGVyV2lkdGgoKSAtIF9zc2RDb21wb25lbnRXaWRnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgIH0pLmNoaWxkcmVuKCcuU1NELUJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykuaW5uZXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJTZWxlY3Q6IGZ1bmN0aW9uKHNzZENvbXBvbmVudFdpZGdldCwgc3NkQmFyLCBzZWxlY3RlZFRhYiwgaXNJbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRUYWIgPSAkKHNlbGVjdGVkVGFiKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuZm9jdXMoc3NkQ29tcG9uZW50V2lkZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIV9zZWxlY3RlZFRhYi5pcygnLlNlbGVjdGVkJykpIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJzQ2xlYXIoc3NkQmFyKTtcclxuICAgICAgICAgICAgICAgIF9zZWxlY3RlZFRhYi5hZGRDbGFzcygnU2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LmZvY3VzU2VsZWN0ZWRUYWIoc3NkQmFyLGlzSW5wdXRFdmVudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb2N1c1NlbGVjdGVkVGFiOiBmdW5jdGlvbihzc2RCYXIsaXNJbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIFNlbGVjdGVkIHRhYiBpcyB0aGUgU2VhcmNoIGlucHV0P1xyXG4gICAgICAgICAgICBpZihzc2RCYXIuY2hpbGRyZW4oJy5TZWFyY2hJbnB1dC1Db250YWluZXIuU2VsZWN0ZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50VG9DbGljayA9IHNzZEJhci5zaWJsaW5ncygnLlNTRExpc3RSZWZyZXNoSGFuZGxlcicpLmZpbmQoJ2E6bm90KC50by1kZXN0cm95KScpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihpc0lucHV0RXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5VXBGdW5jdGlvbihlbGVtZW50VG9DbGljayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUb0NsaWNrLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzc2RCYXIuZmluZCgnLklucHV0UGxhY2Vob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl06bm90KDpmb2N1cyknKS5maXJzdCgpLnNlbGVjdCgpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFNlbGVjdGVkIHRhYiBpcyB0aGUgU2hvcnQgbGlzdD9cclxuICAgICAgICAgICAgaWYoc3NkQmFyLmNoaWxkcmVuKCcuU2hvcnRMaXN0U2VsZWN0b3ItQ29udGFpbmVyLlNlbGVjdGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzc2RCYXIuZmluZCgnLlNob3J0TGlzdFNlbGVjdG9yLUNvbnRhaW5lciA+IGEnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIE1ldGhvZCBiZWluZyBjYWxsZWQgYnkgdXNlciBhY3Rpb24ganNfc3NkQ29tcG9uZW50X2ZvY3VzQ3VycmVudFJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvY3VzQ3VycmVudFJvdzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50ID0gJCgnZGl2LlNTRC1XcmFwcGVyLlNlbGVjdGVkIC5TU0QtQ29tcG9uZW50JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RMaXN0ID0gX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUxpc3QnKTtcclxuICAgICAgICAgICAgdmFyIF9jdXJyZW50Rm9jdXMgPSBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJyk7XHJcblxyXG4gICAgICAgICAgICBfc3NkQ29tcG9uZW50LmFkZENsYXNzKCdLZXlib2FyZE5hdicpO1xyXG4gICAgICAgICAgICBfc3NkTGlzdC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW46bnRoLWNoaWxkKCcgKyBfY3VycmVudEZvY3VzICsgJyknKS5hZGRDbGFzcygnZm9jdXMnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRhYnNDbGVhcjogZnVuY3Rpb24oc3NkQmFyKSB7XHJcbiAgICAgICAgICAgICQoc3NkQmFyKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCdTZWxlY3RlZCcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VhcmNoSWNvbjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LnRhYlNlbGVjdChldmVudC5kYXRhLnNzZENvbXBvbmVudFdpZGdldCwgZXZlbnQuZGF0YS5zc2RCYXIsICQoZXZlbnQuZGF0YS5zc2RCYXIpLmNoaWxkcmVuKCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyJyksZmFsc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBAbmFtZSBpbnB1dEV2ZW50XHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlucHV0RXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfaW5wdXRDb250YWluZXIgPSAkKGV2ZW50LmRhdGEuaW5wdXQpLmNsb3Nlc3QoJy5TZWFyY2hJbnB1dC1Db250YWluZXInKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJTZWxlY3QoZXZlbnQuZGF0YS5zc2RDb21wb25lbnRXaWRnZXQsIGV2ZW50LmRhdGEuc3NkQmFyLCBfaW5wdXRDb250YWluZXIsdHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZigkKGV2ZW50LmRhdGEuaW5wdXQpLnZhbCgpID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBfaW5wdXRDb250YWluZXIuY2xvc2VzdCgnLlNTRC1Db21wb25lbnQnKS5yZW1vdmVDbGFzcygnU2VhcmNoaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfaW5wdXRDb250YWluZXIuY2xvc2VzdCgnLlNTRC1Db21wb25lbnQnKS5hZGRDbGFzcygnU2VhcmNoaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGtleWRvd25FdmVudDogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICBvbktleWRvd25GdW5jdGlvbigpOyAgICAgICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAga2V5Ym9hcmRIYW5kbGVyOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJTaGlmdFwiIHx8IGV2ZW50LmtleSA9PSBcIkNvbnRyb2xcIilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50ID0gJCgnZGl2LlNTRC1XcmFwcGVyLlNlbGVjdGVkIC5TU0QtQ29tcG9uZW50JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RMaXN0ID0gX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIkVudGVyXCIgJiYgX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIlRhYlwiKSB7XHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LmFkZENsYXNzKCdLZXlib2FyZE5hdicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfY3VycmVudEZvY3VzID0gX3NzZExpc3QuYXR0cignY3VycmVudC1mb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zZWxlY3RlZEVsZW1lbnQgPSAkKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoX2N1cnJlbnRGb2N1cyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOm50aC1jaGlsZCgnICsgX2N1cnJlbnRGb2N1cyArICcpJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQuYWRkQ2xhc3MoJ0tleWJvYXJkTmF2JylcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dVcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoX3NlbGVjdGVkRWxlbWVudC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9zZWxlY3RlZEVsZW1lbnQuaXMoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudC5yZW1vdmVDbGFzcygnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW46bGFzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zZWxlY3RlZEVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZvY3VzJykucHJldigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuJykubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZScpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jdXJyZW50Rm9jdXMrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW46bGFzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJBcnJvd0Rvd25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50LmlzKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gJChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpLm5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIV9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoICYmIF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmZpcnN0LWNoaWxkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jdXJyZW50Rm9jdXMgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudC5hZGRDbGFzcygnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoIV9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmZvY3VzU2VsZWN0ZWRUYWIoX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUJhcicpLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFfc2VsZWN0ZWRFbGVtZW50LmZpbmQoJy5TU0RfTGlzdExpbmUuRGlzYWJsZWQnKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQuZmluZCgnLkV4cGFuZENvbnRyb2wgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RMaXN0LmZpbmQoJ2EuT3RoZXJDb250cm9sTGluaycpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF9zc2RMaXN0LmF0dHIoJ2N1cnJlbnQtZm9jdXMnLCBfY3VycmVudEZvY3VzKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5jbGVhcktleWJvYXJkTmF2U3RhdHVzKF9zc2RDb21wb25lbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXJLZXlib2FyZE5hdlN0YXR1czogZnVuY3Rpb24oc3NkQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50ID0gJChzc2RDb21wb25lbnQpO1xyXG4gICAgICAgICAgICB2YXIgX3NzZExpc3QgPSBfc3NkQ29tcG9uZW50LmZpbmQoJy5TU0QtTGlzdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYoX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIF9zc2RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ0tleWJvYXJkTmF2Jyk7XHJcbiAgICAgICAgICAgIF9zc2RMaXN0LmF0dHIoJ2N1cnJlbnQtZm9jdXMnLCAwKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3Bhbi5mb2N1cycpLnJlbW92ZUNsYXNzKCdmb2N1cycpXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLkV4cGFuZENvbnRyb2wgPiBhJykuYmx1cigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsSGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50ID0gJCgnZGl2LlNTRC1XcmFwcGVyLlNlbGVjdGVkIC5TU0QtQ29tcG9uZW50JykuZmlyc3QoKTtcclxuICAgICAgICAgICAgaWYoTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKSA8PSAxMDI0KXtcclxuICAgICAgICAgICAgICAgIGlmKF9zc2RDb21wb25lbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gJChcIi50b29sYmFyLXdyYXBwZXIuRml4ZWRcIikub3V0ZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ0ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLlNTRC1XcmFwcGVyLlNlbGVjdGVkID4gLlNTRC1Db21wb25lbnQuRml4ZWQgPiAuU1NELUJhcicpLmNzcygndG9wJywgJChcIi50b29sYmFyLXdyYXBwZXIuRml4ZWRcIikub3V0ZXJIZWlnaHQoKSArICdweCcpOyBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvKk5vdCBNb2JpbGUgYXBwbHkgZml4ZWQgYmVoYXZpb3VyKi9cclxuICAgICAgICAgICAgICAgIGlmKF9zc2RDb21wb25lbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gKCQoJy5Ub3BQYXRpZW50SGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKCcuSGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKFwiLnRvb2xiYXItd3JhcHBlclwiKS5vdXRlckhlaWdodCgpKyAkKCcuQ1RUQVNMZXZlbEFzc2Vzc21lbnRNYWluQ29udGFpbmVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQucmVtb3ZlQ2xhc3MoJ0ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLlNTRC1XcmFwcGVyLlNlbGVjdGVkID4gLlNTRC1Db21wb25lbnQuRml4ZWQgPiAuU1NELUJhcicpLmNzcygndG9wJywoJCgnLlRvcFBhdGllbnRIZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKSArICQoJy5IZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKSArICQoXCIudG9vbGJhci13cmFwcGVyXCIpLm91dGVySGVpZ2h0KCkgKyAkKCcuQ1RUQVNMZXZlbEFzc2Vzc21lbnRNYWluQ29udGFpbmVyJykub3V0ZXJIZWlnaHQodHJ1ZSkpICsgJ3B4Jyk7IFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnRml4ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKF9pbnB1dElkKSB7IC8qIFVzZWQgdG8gZGVzdHJveSBhIHNwZWNpZmljIHNzZCBjb21wb25lbnQgYnkgcmVjZWl2ZSB0aGUgaW5wdXQgaWRlbnRpZmllciBhcyBwYXJhbWV0ZXIgYW5kIGRldGVybWluZSB0aGUgd3JhcHBlciB0byByZW1vdmUuICovXHJcbiAgICAgICAgICAgICQoJ1tkYXRhLXNzZC1wbGFjZWhvbGRlcj0nICsgc3NkQ29tcG9uZW50LmlkICsgJ10nKS5yZW1vdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHNzZENvbXBvbmVudFdpZGdldCxfdG9EZXN0cm95KSB7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5sZW5ndGgrKztcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlID0gMDtcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LmlzUlRMID0gJCgnaHRtbCcpLmlzKCcucnRsJyk7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC50b0Rlc3Ryb3kgPSBfdG9EZXN0cm95O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNzZENvbXBvbmVudFdpZGdldCAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmlkID0gJChzc2RDb21wb25lbnRXaWRnZXQpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnRXaWRnZXQgPSAkKHNzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50ID0gX3NzZENvbXBvbmVudFdpZGdldC5maW5kKCcuU1NELUNvbXBvbmVudCcpO1xyXG4gICAgICAgICAgICB2YXIgX3NzZEJhciA9IF9zc2RDb21wb25lbnQuY2hpbGRyZW4oJy5TU0QtQmFyJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIF9zZWFyY2hJY29uID0gX3NzZEJhci5maW5kKCcuU2VhcmNoSWNvbicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfaW5wdXQgPSBfc3NkQmFyLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdmFyIF9jbGVhckNvbnRyb2wgPSBfc3NkQmFyLmZpbmQoJy5DbGVhckNvbnRyb2wnKS5maXJzdCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3NlYXJjaEljb24ub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudFdpZGdldDogX3NzZENvbXBvbmVudFdpZGdldCxcclxuICAgICAgICAgICAgICAgIHNzZEJhcjogX3NzZEJhclxyXG4gICAgICAgICAgICB9LCBzc2RDb21wb25lbnQuc2VhcmNoSWNvbik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfc3NkQmFyLmNoaWxkcmVuKCdkaXYnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50V2lkZ2V0OiBfc3NkQ29tcG9uZW50V2lkZ2V0LFxyXG4gICAgICAgICAgICAgICAgc3NkQmFyOiBfc3NkQmFyXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQudGFiU2VsZWN0KGV2ZW50LmRhdGEuc3NkQ29tcG9uZW50V2lkZ2V0LCBldmVudC5kYXRhLnNzZEJhciwgdGhpcyxmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX2NsZWFyQ29udHJvbC5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgc3NkQ29tcG9uZW50Lm9uQmx1ckRlc3Ryb3kpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX2lucHV0Lm9mZigna2V5dXAnKS5vbigna2V5dXAnLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dDogX2lucHV0XHJcbiAgICAgICAgICAgIH0sIHNzZENvbXBvbmVudC5pbnB1dEV2ZW50KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9pbnB1dC5vZmYoJ2tleWRvd24nKS5vbigna2V5ZG93bicsIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudFdpZGdldDogX3NzZENvbXBvbmVudFdpZGdldCxcclxuICAgICAgICAgICAgICAgIHNzZEJhcjogX3NzZEJhcixcclxuICAgICAgICAgICAgICAgIGlucHV0OiBfaW5wdXRcclxuICAgICAgICAgICAgfSwgc3NkQ29tcG9uZW50LmtleWRvd25FdmVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKF9zc2RDb21wb25lbnQpLm9mZignY2xpY2snKS5vbignY2xpY2snLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQ6IF9zc2RDb21wb25lbnRcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5jbGVhcktleWJvYXJkTmF2U3RhdHVzKGV2ZW50LmRhdGEuc3NkQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBzc2RDb21wb25lbnQucmVzaXplKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZighJChldmVudC50YXJnZXQpLmlzKCc6dmlzaWJsZScpKSB7IC8qIENsaWNrcyBvbiBoaWRkZW4gZWxlbWVudHMgYXJlIGRpc21pc3NlZC4gKi9cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgZSA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuU1NELUNvbXBvbmVudCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFlLmxlbmd0aCkgeyAvLyBVc2VyIGNsaWNrZWQgb3V0c2lkZSB0aGUgU1NELUNvbXBvbmVudD9cclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm9uQmx1ckRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmKHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA+IDApIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PSBcIjI3XCIpIHsgLy8gVXNlciBoaXQgRXNjYXBlXHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQub25CbHVyRGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIiB8fCBldmVudC5rZXkgPT0gXCJBcnJvd0Rvd25cIikge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmKHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA+IDApIHsgLy8gSWYgdGhlcmUncyBhbiBTU0QgY29tcG9uZW50IGFjdGl2ZSwgZ28gZm9yIEtleWJvYXJkIGhhbmRsZXJcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LmtleWJvYXJkSGFuZGxlcihldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7IC8vIElmIHRoZXJlJ3MgYW4gU1NEIGNvbXBvbmVudCBhY3RpdmUsIGdvIGZvciBzY3JvbGwgaGFuZGxlclxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQuc2Nyb2xsSGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuIiwiLyogQ29tcG9uZW50IFNTRExpc3RMaW5lICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TU0RMaXN0TGluZSA9IHtcclxuXHR0b2dnbGU6IChsaW5lSWQsIGxpbmVIYW5kbGVyID0gJycpID0+IHtcclxuXHRcdHZhciBfbGluZSA9ICQobGluZUlkKS5pcygnLlNTRF9MaXN0TGluZScpXHJcblx0XHRcdD8gJChsaW5lSWQpXHJcblx0XHRcdDogJChsaW5lSWQpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5TU0RfTGlzdExpbmUnKVxyXG5cdFx0XHRcdFx0LmZpcnN0KCk7XHJcblxyXG5cdFx0aWYgKCFfbGluZS5sZW5ndGgpIHJldHVybjtcclxuXHJcblx0XHR2YXIgX2V4cGFuZENvbnRyb2wgPSAkKCcuZXhwYW5kLWNvbnRyb2wtY3VzdG9tLXdpZHRoJyk7XHJcblxyXG5cdFx0aWYgKF9leHBhbmRDb250cm9sLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdF9leHBhbmRDb250cm9sLnJlbW92ZUNsYXNzKCdleHBhbmQtY29udHJvbC1jdXN0b20td2lkdGgnKTtcclxuXHRcdFx0X2V4cGFuZENvbnRyb2wuY3NzKCd3aWR0aCcsICcnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIV9saW5lLmlzKCcuQWN0aXZlJykpIHtcclxuXHRcdFx0dmFyIF9saW5lSGVhZGVyID0gX2xpbmVcclxuXHRcdFx0XHQuY2xvc2VzdCgnZGl2LlNlbGVjdGFibGVMaXN0LCAuU2VsZWN0YWJsZUxpc3QtTGlzdFJlY29yZHMnKVxyXG5cdFx0XHRcdC5maW5kKCdkaXYuU2VsZWN0YWJsZUxpc3QtTGluZS5BY3RpdmUnKVxyXG5cdFx0XHRcdC5ub3QoX2xpbmUpO1xyXG5cclxuXHRcdFx0X2xpbmVIZWFkZXIuZmluZCgnYVtoaWRlLWFjdGlvbl0nKS5jbGljaygpO1xyXG5cdFx0XHRfbGluZUhlYWRlclxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnQWN0aXZlJylcclxuXHRcdFx0XHQuY2hpbGRyZW4oJ3NwYW4nKVxyXG5cdFx0XHRcdC5oaWRlKDIwMCk7XHJcblx0XHRcdF9saW5lLmFkZENsYXNzKCdBY3RpdmUnKTtcclxuXHJcblx0XHRcdGlmICgkKGxpbmVIYW5kbGVyKS5sZW5ndGgpIHtcclxuXHRcdFx0XHQkKGxpbmVIYW5kbGVyKS5jbGljaygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRfbGluZS5yZW1vdmVDbGFzcygnQWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSxcclxufTtcclxuIiwidmFyIHNldHVwVGFidWxhclNjcm9sbCA9IGZ1bmN0aW9uKCR0YWJ1bGFyU2Nyb2xsKSB7XHJcblx0dmFyICR0b3BTY3JvbGxXcmFwcGVyID0gJHRhYnVsYXJTY3JvbGwuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKTtcclxuXHR2YXIgJGNlbnRlclRhYmxlID0gJHRhYnVsYXJTY3JvbGwuZmluZCgnLlRhYnVsYXJTY3JvbGwtY2VudGVyLXRhYmxlJyk7XHJcblx0JHRhYnVsYXJTY3JvbGwuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHQkY2VudGVyVGFibGUuc2Nyb2xsTGVmdCgkdG9wU2Nyb2xsV3JhcHBlci5zY3JvbGxMZWZ0KCkpO1xyXG5cdH0pO1xyXG5cdCRjZW50ZXJUYWJsZS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcblx0XHQkdG9wU2Nyb2xsV3JhcHBlci5zY3JvbGxMZWZ0KCRjZW50ZXJUYWJsZS5zY3JvbGxMZWZ0KCkpO1xyXG5cdH0pO1xyXG5cdC8vIHNpbWlsYXIgdG8gUmVzaXplXHJcblx0dmFyIHRhYmxlV2lkdGggPSAkY2VudGVyVGFibGUuZmluZCgndGFibGUnKS53aWR0aCgpO1xyXG5cdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpLndpZHRoKHRhYmxlV2lkdGgpO1xyXG5cdGlmICgkY2VudGVyVGFibGVbMF0uc2Nyb2xsV2lkdGggPiAkY2VudGVyVGFibGUud2lkdGgoKSkge1xyXG5cdFx0JHRhYnVsYXJTY3JvbGwuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHR9XHJcbn07XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG5cdFx0c2V0dXBUYWJ1bGFyU2Nyb2xsKCQoZWwpKTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcclxuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xyXG5cdFx0JCgnLlRhYnVsYXJTY3JvbGwnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XHJcblx0XHRcdHNldHVwVGFidWxhclNjcm9sbCgkKGVsKSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcblxyXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG5cdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xyXG5cdFx0dmFyICRjZW50ZXJUYWJsZSA9ICQoZWwpLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlci10YWJsZScpO1xyXG5cdFx0dmFyIHRhYmxlV2lkdGggPSAkY2VudGVyVGFibGUuZmluZCgndGFibGUnKS53aWR0aCgpO1xyXG5cdFx0JChlbClcclxuXHRcdFx0LmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpXHJcblx0XHRcdC53aWR0aCh0YWJsZVdpZHRoKTtcclxuXHRcdGlmICgkY2VudGVyVGFibGVbMF0uc2Nyb2xsV2lkdGggPiAkY2VudGVyVGFibGUud2lkdGgoKSkge1xyXG5cdFx0XHQkKGVsKVxyXG5cdFx0XHRcdC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpXHJcblx0XHRcdFx0LmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKGVsKVxyXG5cdFx0XHRcdC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpXHJcblx0XHRcdFx0LmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdH1cclxuXHR9KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBUYWJzRXh0ZW5kZWQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlRhYnNFeHRlbmRlZCA9IGZ1bmN0aW9uKCkge1xyXG5cdCQoJy5UYWJzX0V4dGVuZGVkIC5UYWJzX2hlYWRlciA+IC5UYWJzX190YWInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKCQodGhpcykudGV4dCgpID09PSAnJykge1xyXG5cdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcuVGFic19FeHRlbmRlZCAuVGFic19oZWFkZXIgLlRhYnNfX3RhYjpub3QoLmFjdGl2ZSknKVxyXG5cdFx0Lm9mZignbW91c2Vkb3duJylcclxuXHRcdC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZXZ0KSB7XHJcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xyXG5cdFx0XHQkdGFic0V4dGVuZGVkLnJlbW92ZUNsYXNzKCdpc0Nsb3NlZCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdCQoJy5UYWJzX0V4dGVuZGVkLkhpZGVBY3RpdmVPbkNsaWNrIC5UYWJzX2hlYWRlcicpXHJcblx0XHQub2ZmKCdtb3VzZWRvd24nKVxyXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCAnLlRhYnNfX3RhYi5hY3RpdmUnLCBmdW5jdGlvbihldnQpIHtcclxuXHRcdFx0dmFyICR0YWJzRXh0ZW5kZWQgPSAkKGV2dC50YXJnZXQpLmNsb3Nlc3QoJy5UYWJzX0V4dGVuZGVkJyk7XHJcblx0XHRcdHZhciAkdGFic0JvZHkgPSAkdGFic0V4dGVuZGVkLmZpbmQoJy5UYWJzX2JvZHknKTtcclxuXHJcblx0XHRcdGlmICgkdGFic0JvZHkuaGFzQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJykpIHtcclxuXHRcdFx0XHQkdGFic0JvZHkucmVtb3ZlQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5yZW1vdmVDbGFzcygnaXNDbG9zZWQnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkdGFic0JvZHkuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5hZGRDbGFzcygnaXNDbG9zZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdCQoJy5UYWJzX0V4dGVuZGVkLS1kaXNhYmxlZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcblx0XHQkKGVsKVxyXG5cdFx0XHQucGFyZW50KClcclxuXHRcdFx0LmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKVxyXG5cdFx0XHQub2ZmKCdjbGljaycpO1xyXG5cdH0pO1xyXG5cclxuXHQkKCcuVGFic19FeHRlbmRlZCcpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcblx0XHRpZiAoJChlbCkuaGFzQ2xhc3MoJ1RhYnNfRXh0ZW5kZWQtLWNsb3NlZG9uc3RhcnQnKSkge1xyXG5cdFx0XHQkKGVsKVxyXG5cdFx0XHRcdC5maW5kKCcuVGFic19ib2R5JylcclxuXHRcdFx0XHQuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XHJcblx0XHRcdCQoZWwpLmFkZENsYXNzKCdpc0Nsb3NlZCcpO1xyXG5cdFx0XHQkKGVsKS5yZW1vdmVDbGFzcygnVGFic19FeHRlbmRlZC0tY2xvc2Vkb25zdGFydCcpO1xyXG5cdFx0fVxyXG5cdFx0JChlbClcclxuXHRcdFx0Lm9mZignY2xpY2snKVxyXG5cdFx0XHQub24oJ2NsaWNrJywgJy5UYWJzX0V4dGVuZGVkLS1jbG9zZScsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdFx0XHRcdCQoZXZ0LnRhcmdldClcclxuXHRcdFx0XHRcdC5jbG9zZXN0KCcuVGFic19ib2R5JylcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcclxuXHRcdFx0fSk7XHJcblx0fSk7XHJcbn07XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRTYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkKCk7XHJcblx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkKTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBUcmlnZ2VySWZyYW1lVG9vbHRpcCAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyICRlbGVtZW50SWQgPSAkKCcjJyArIGNvbmZpZy5lbGVtZW50SWQpO1xyXG5cdFx0JGVsZW1lbnRJZC5hZGRDbGFzcygndG9vbHRpcCcpO1xyXG5cclxuXHRcdHZhciBleHRyYURhdGFQYXJhbXMgPSAnZGF0YS1pZnJhbWV0b29sdGlwdHJpZ2dlcmlkPVwiJyArIGNvbmZpZy5lbGVtZW50SWQgKyAnXCInO1xyXG5cdFx0dmFyIHdpZGdldE5vdGlmeURpdiA9ICQuZmluZCgnW2RhdGEtaWZyYW1ldG9vbHRpcHRyaWdnZXJpZD1cIicgKyBjb25maWcuZWxlbWVudElkICsgJ1wiXScpO1xyXG5cdFx0aWYgKHdpZGdldE5vdGlmeURpdi5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0ZXh0cmFEYXRhUGFyYW1zICs9ICcgZGF0YS1pZnJhbWV0b29sdGlwbm90aWZ5aWQ9JyArICQod2lkZ2V0Tm90aWZ5RGl2KS5kYXRhKCdpZnJhbWV0b29sdGlwbm90aWZ5aWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHQkZWxlbWVudElkLnRvb2x0aXBzdGVyKHtcclxuXHRcdFx0Y29udGVudEFzSFRNTDogdHJ1ZSxcclxuXHRcdFx0dGhlbWU6IGNvbmZpZy50aGVtZSxcclxuXHRcdFx0aW50ZXJhY3RpdmU6IHRydWUsXHJcblx0XHRcdHBvc2l0aW9uOiBjb25maWcucG9zaXRpb25JZCxcclxuXHRcdFx0dHJpZ2dlcjogY29uZmlnLnRyaWdnZXJJZCxcclxuXHRcdFx0bWluV2lkdGg6IGNvbmZpZy5taW5XaWR0aCxcclxuXHRcdFx0bWF4V2lkdGg6IGNvbmZpZy5tYXhXaWR0aCxcclxuXHRcdFx0emluZGV4OiBjb25maWcuemluZGV4LFxyXG5cdFx0XHRjb250ZW50OlxyXG5cdFx0XHRcdCc8aWZyYW1lIHNyYz1cIicgKyBjb25maWcuVVJMICsgJ1wiIHN0eWxlPVwiYm9yZGVyOm5vbmVcIiBpZD1cInRvb2x0aXBzdGVyLWZyYW1lXCIgJyArIGV4dHJhRGF0YVBhcmFtcyArICc+PC9pZnJhbWU+JyxcclxuXHRcdFx0ZnVuY3Rpb25SZWFkeTogZnVuY3Rpb24oaW5zdGFuY2UsIGhlbHBlcikge1xyXG5cdFx0XHRcdCQoaGVscGVyKS5jc3Moe1xyXG5cdFx0XHRcdFx0dmlzaWJpbGl0eTogJ2hpZGRlbicsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCQoJy50b29sdGlwc3Rlci1iYXNlJykuY3NzKHtcclxuXHRcdFx0XHRcdFx0dmlzaWJpbGl0eTogJ3Zpc2libGUnLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSwgNTAwKTtcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5UcmlnZ2VySWZyYW1lVG9vbHRpcCA9IHtcclxuXHRcdGNyZWF0ZSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8vU2FwcGhpcmVXaWRnZXRzID0gd2luZG93LlNhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgfHwge307XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=