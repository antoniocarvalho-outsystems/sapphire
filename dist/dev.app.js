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
/******/ 	var hotCurrentHash = "55583a972661c3e18d2f";
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

/***/ "./src/components/05-components/v3-pat/line-details-expand-box/script.js":
/*!*******************************************************************************!*\
  !*** ./src/components/05-components/v3-pat/line-details-expand-box/script.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Component LineDetailsExpandBox */
(function($, window, SapphireWidgets) {
	const showHide = widgetId => $(widgetId).toggleClass('active');

	const init = config => {
		$('.LineDetailsExpandBox .ExpandableLinkWrapper_Header').off('click');

		$('.LineDetailsExpandBox_header')
			.off('click')
			.on('click', () => showHide(`#${config.widgetId}`));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzIHN5bmMgXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzAwLXNldHRpbmdzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmxhbmsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LXBvcHVwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtbWVudS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9jb21wLWxpbmUvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2RhdGV0aW1lLXJhbmdlLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3Bkb3duLWNhdGVnb3JpZXMvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wem9uZS9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZnVsbHNjcmVlbi10YWJzLXdyYXBwZXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3Jpem9udGFsLXRvb2xiYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3VyLXBpY2tlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2lucHV0LXdpdGgtY2xlYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9saW5lLWRldGFpbHMtZXhwYW5kLWJveC9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWFpbi1pbnRlcmFjdGl2ZS1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLW5vdGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wb3B1cC1tZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NhcHBoaXJlLXBhbmVsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGF0aWVudC1jYWxsLWNhbmNlbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BlcnNvbi1jYXJkL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcHJlc2NyaXB0aW9uLWNhcmQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tZXhwYW5kYWJsZS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLWhlYWRlci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLXJhZGlvLWJ1dHRvbi9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1jdXN0b20vc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtaW5zaWRlL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VsZWN0LXN5c3RlbS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NoaWZ0LWNvbnRhaW5lci9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NpZGViYXIvc2lkZWJhci1zdHJ1Y3R1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci1ob3Jpem9udGFsL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci12ZXJ0aWNhbC9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwbGl0LWJ1dHRvbi9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1jb21wb25lbnQtYmxvY2svc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtbGlzdC1saW5lL3NjcmlwdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFibGUtZGF0YS9zY3JpcHRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90cmlnZ2VyLWlmcmFtZS10b29sdGlwL3RyaWdnZXItaWZyYW1lLXRvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRzs7UUFFSDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGtCQUFrQiw4QkFBOEI7UUFDaEQ7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esb0JBQW9CLDJCQUEyQjtRQUMvQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxtQkFBbUIsY0FBYztRQUNqQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLEtBQUs7UUFDckI7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsWUFBWTtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBLGNBQWMsNEJBQTRCO1FBQzFDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTs7UUFFSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQix1Q0FBdUM7UUFDeEQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsdUNBQXVDO1FBQ3hEO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLHNCQUFzQjtRQUN2QztRQUNBO1FBQ0E7UUFDQSxRQUFRO1FBQ1I7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsVUFBVTtRQUNWO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLGNBQWMsd0NBQXdDO1FBQ3REO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFNBQVM7UUFDVDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLFFBQVE7UUFDUjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGVBQWU7UUFDZjtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLHNDQUFzQyx1QkFBdUI7OztRQUc3RDtRQUNBOzs7Ozs7Ozs7Ozs7QUN4eEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckJBLG1CQUFPLENBQUMsNERBQXlCOztBQUVqQztBQUNBO0FBQ0EsV0FBVyw2REFBOEM7Ozs7Ozs7Ozs7OztBQ0p6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkQ7Ozs7Ozs7Ozs7O0FDckVBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7Ozs7QUFJQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsNkM7Ozs7Ozs7Ozs7O0FDL1FEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDUEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUN4T0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUEsZ0NBQWdDO0FBQ2hDLENBQUM7Ozs7Ozs7Ozs7OztBQ3ZERDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNU5EOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsSTs7Ozs7Ozs7Ozs7QUN0Q0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxzRUFBc0U7QUFDdEUsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUN4Y0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMvQ0Q7QUFDYTs7QUFFYjtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1RkFBdUYsYUFBYTtBQUNwRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxFQUFFO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFVBQVUsU0FBUyxhQUFhO0FBQzNDO0FBQ0EseUNBQXlDLFVBQVUsc0JBQXNCLGFBQWE7O0FBRXRGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQSxpREFBaUQsWUFBWTs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaURBQWlEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHdDQUF3QztBQUN4QztBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdDQUFnQzs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04seURBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBLDJEQUEyRDs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsbURBQW1EO0FBQ25ELCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekM7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLG9DQUFvQyxzRUFBc0U7O0FBRTFHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1IsT0FBTztBQUNQLE1BQU07O0FBRU47O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdEO0FBQ3hEOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUIsb0JBQW9CLGFBQWE7QUFDakM7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ04sd0RBQXdELFVBQVU7QUFDbEU7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxLQUFLO0FBQ2I7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sS0FBSztBQUNaO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZCQUE2QjtBQUM3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLGlDQUFpQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixpQ0FBaUM7QUFDeEQ7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlDQUFpQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQ0FBaUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQsWUFBWTtBQUN6RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0EseURBQXlELDJCQUEyQjtBQUNwRjtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQSxJQUFJLEtBQTZCO0FBQ2pDO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM1NEhBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsU0FBUyxxREFBcUQsU0FBUztBQUMvRTs7QUFFQTs7QUFFQSxtQ0FBbUM7QUFDbkMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGdDQUFnQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEMsTUFBTTtBQUNOLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOzs7Ozs7Ozs7Ozs7QUM5SUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLG1DOzs7Ozs7Ozs7OztBQ3pGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0I7O0FBRWhFO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLGlCQUFpQixFQUFFLEtBQUs7QUFDckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSxNQUFNLEdBQUcsUUFBUSxHQUFHLFFBQVE7QUFDekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUN0SkQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixnQkFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsSTs7Ozs7Ozs7Ozs7QUNyREQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxnQkFBZ0I7QUFDbkQ7O0FBRUE7O0FBRUEseUNBQXlDO0FBQ3pDLENBQUM7Ozs7Ozs7Ozs7OztBQ2ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGLENBQUMsRTs7Ozs7Ozs7Ozs7QUM1UUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7OztBQzFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ25ERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCOztBQUUxQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckRELG1CQUFPLENBQUMsK0ZBQXNCO0FBQzlCLG1CQUFPLENBQUMsaUZBQWU7QUFDdkI7QUFDQSxtQkFBTyxDQUFDLCtFQUFjO0FBQ3RCLG1CQUFPLENBQUMsdUZBQWtCOzs7Ozs7Ozs7Ozs7O0FDSjFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDbkVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQzlCRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdCQUFnQjtBQUN4QixrQkFBa0IsZ0JBQWdCO0FBQ2xDLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQyxDQUFDOzs7Ozs7Ozs7Ozs7QUN2QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxnQkFBZ0I7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLElBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDO0FBQzNDLENBQUM7Ozs7Ozs7Ozs7OztBQ3hKRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7QUNqR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7Ozs7Ozs7O0FBU0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsbUM7Ozs7Ozs7Ozs7O0FDdE5EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDO0FBQ3ZDLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNwTEQ7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLDJCQUEyQjtBQUMzQiwyQ0FBMkM7QUFDM0Msa0NBQWtDO0FBQ2xDLDZCQUE2QjtBQUM3QixzQ0FBc0M7QUFDdEMsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsRTs7Ozs7Ozs7Ozs7QUM3WUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTCxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBLEdBQUc7O0FBRUg7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7O0FDeExEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw2Qzs7Ozs7Ozs7Ozs7QUNsSEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixFOzs7Ozs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMsZ0JBQWdCO0FBQ3pCLGtDQUFrQyxnQkFBZ0I7O0FBRWxEO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQTtBQUNBLEtBQUs7QUFDTCxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKLGFBQWEsZ0JBQWdCO0FBQzdCLFVBQVUsZ0JBQWdCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixlQUFlO0FBQzdDOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDM0tEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDNUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOzs7O0FBSVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtCOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsOEk7OztBQUdBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlSO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxTQUFTO0FBQ1QscUNBQXFDO0FBQ3JDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QztBQUM3QztBQUNBOztBQUVBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7QUMxZkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUM7Ozs7Ozs7Ozs7OztBQ2xERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDMUREOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUMsNkM7Ozs7Ozs7Ozs7O0FDekNEOzs7Ozs7Ozs7Ozs7QUNBQSx1QyIsImZpbGUiOiJkZXYuYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiNTU1ODNhOTcyNjYxYzNlMThkMmZcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiYXBwXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2FwcC5qc1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsInJlcXVpcmUoJy4vY29tcG9uZW50cy9pbmRleC5zY3NzJyk7XG5cbi8vSW1wb3J0IGFsbCBKUyBmaWxlc1xuY29uc3QgcmVxdWlyZUFsbCA9IHIgPT4gci5rZXlzKCkuZm9yRWFjaChyKTtcbnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMnLCB0cnVlLCAvXFwuanMkLykpO1xuIiwidmFyIG1hcCA9IHtcblx0XCIuLzAwLXNldHRpbmdzL2NvbmZpZy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDAtc2V0dGluZ3MvY29uZmlnLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtYmFzZS5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJhc2UuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1ibGFuay5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy9sYXlvdXQvbGF5b3V0LWJsYW5rLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL2xheW91dC9sYXlvdXQtcG9wdXAuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvbGF5b3V0L2xheW91dC1wb3B1cC5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvYWN0aW9ucy1tZW51L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtbWVudS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9hY3Rpb25zLXN1Yi1tZW51L3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2FjdGlvbnMtc3ViLW1lbnUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvY29tcC1saW5lL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2NvbXAtbGluZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRhLXRhYmxlcy9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kYXRldGltZS1yYW5nZS1waWNrZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZGF0ZXRpbWUtcmFuZ2UtcGlja2VyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3Bkb3duLWNhdGVnb3JpZXMvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZHJvcGRvd24tY2F0ZWdvcmllcy9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9kcm9wem9uZS9wbHVnaW4uanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2Ryb3B6b25lL3BsdWdpbi5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvZXhwYW5kYWJsZS1saW5rL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L2V4cGFuZGFibGUtbGluay9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9mdWxsc2NyZWVuLXRhYnMtd3JhcHBlci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9mdWxsc2NyZWVuLXRhYnMtd3JhcHBlci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9nZW5lcmljLWdhbGxlcnkvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvZ2VuZXJpYy1nYWxsZXJ5L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2hvcml6b250YWwtdG9vbGJhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9ob3Jpem9udGFsLXRvb2xiYXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvaG91ci1waWNrZXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvaW5wdXQtd2l0aC1jbGVhci9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9pbnB1dC13aXRoLWNsZWFyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L2xpbmUtZGV0YWlscy1leHBhbmQtYm94L3NjcmlwdC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbGluZS1kZXRhaWxzLWV4cGFuZC1ib3gvc2NyaXB0LmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9sb2NhdGlvbi1ib3gvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbG9jYXRpb24tYm94L3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L21haW4taW50ZXJhY3RpdmUtY2FyZC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tYWluLWludGVyYWN0aXZlLWNhcmQvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvbWVudS1iYXIvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvbXVsdGlwbGUtc2VsZWN0aW9uLWJ1dHRvbi9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9tdWx0aXBsZS1zZWxlY3Rpb24tYnV0dG9uL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL2NvbmZpcm1hdGlvbi1wYW5lbC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvY29uZmlybWF0aW9uLXBhbmVsLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wYW5lbC1ieS1pZC1ub3RpZnkuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLW5vdGlmeS5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvcGFuZWwtYnktaWQuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3BhbmVsLWJ5LWlkLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wb3B1cC1tZW51LmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9wb3B1cC1tZW51LmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wYW5lbC9zYXBwaGlyZS1wYW5lbC5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGFuZWwvc2FwcGhpcmUtcGFuZWwuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhbmVsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3BhdGllbnQtY2FsbC1jYW5jZWwvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvcGF0aWVudC1jYWxsLWNhbmNlbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wZXJzb24tY2FyZC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wZXJzb24tY2FyZC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tY2FyZC9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tY2FyZC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tZXhwYW5kYWJsZS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9wcmVzY3JpcHRpb24tZXhwYW5kYWJsZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1oZWFkZXIvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2FwcGhpcmUtaGVhZGVyL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NhcHBoaXJlLXJhZGlvLWJ1dHRvbi9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zYXBwaGlyZS1yYWRpby1idXR0b24vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWN1c3RvbS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWN0aW9uLWV4cGFuZGFibGUtY3VzdG9tL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlY3Rpb24tZXhwYW5kYWJsZS1pbnNpZGUvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc2VjdGlvbi1leHBhbmRhYmxlLWluc2lkZS9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zZWxlY3Qtc3lzdGVtL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NlbGVjdC1zeXN0ZW0vc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvc2hpZnQtY29udGFpbmVyL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NoaWZ0LWNvbnRhaW5lci9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zaWRlYmFyL3NpZGViYXItc3RydWN0dXJlLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC9zaWRlYmFyL3NpZGViYXItc3RydWN0dXJlLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGlubmVyLWhvcml6b250YWwvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci1ob3Jpem9udGFsL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NwaW5uZXItdmVydGljYWwvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3Bpbm5lci12ZXJ0aWNhbC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zcGxpdC1idXR0b24vc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3BsaXQtYnV0dG9uL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1jb21wb25lbnQtYmxvY2svc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvc3NkLWNvbXBvbmVudC1ibG9jay9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC9zc2QtbGlzdC1saW5lL3NjcmlwdHMuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3NzZC1saXN0LWxpbmUvc2NyaXB0cy5qc1wiLFxuXHRcIi4vMDUtY29tcG9uZW50cy92My1wYXQvdGFibGUtZGF0YS9zY3JpcHRzLmpzXCI6IFwiLi9zcmMvY29tcG9uZW50cy8wNS1jb21wb25lbnRzL3YzLXBhdC90YWJsZS1kYXRhL3NjcmlwdHMuanNcIixcblx0XCIuLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RhYnMtZXh0ZW5kZWQvc2NyaXB0cy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvMDUtY29tcG9uZW50cy92My1wYXQvdGFicy1leHRlbmRlZC9zY3JpcHRzLmpzXCIsXG5cdFwiLi8wNS1jb21wb25lbnRzL3YzLXBhdC90cmlnZ2VyLWlmcmFtZS10b29sdGlwL3RyaWdnZXItaWZyYW1lLXRvb2x0aXAuanNcIjogXCIuL3NyYy9jb21wb25lbnRzLzA1LWNvbXBvbmVudHMvdjMtcGF0L3RyaWdnZXItaWZyYW1lLXRvb2x0aXAvdHJpZ2dlci1pZnJhbWUtdG9vbHRpcC5qc1wiLFxuXHRcIi4vZ2xvYmFscy5qc1wiOiBcIi4vc3JjL2NvbXBvbmVudHMvZ2xvYmFscy5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9jb21wb25lbnRzIHN5bmMgcmVjdXJzaXZlIFxcXFwuanMkXCI7IiwiU2FwcGhpcmVXaWRnZXRzID0gd2luZG93LlNhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgfHwge307XG4iLCIvKiBDb21wb25lbnQgTGF5b3V0QmFzZSAqL1xyXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgTGF5b3V0QmFzZShjb25maWcpO1xyXG5cdFx0U2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XHJcblx0fTtcclxuXHJcblx0dmFyIG9wZW5TaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLm9wZW5TaWRlYmFySWZyYW1lKGR1cmF0aW9uKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgY2xvc2VTaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLkxheW91dEJhc2Uud2lkZ2V0SWRdLmNsb3NlU2lkZWJhcklmcmFtZShkdXJhdGlvbik7XHJcblx0fTtcclxuXHJcblx0dmFyIHNjcm9sbFRvRWxlbWVudCA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xyXG5cdFx0dmFyICR0YXJnZXRFbGVtZW50ID0gJGVsZW1lbnQ7XHJcblx0XHRpZiAoISEkdGFyZ2V0RWxlbWVudC5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWw7XHJcblx0XHRcdHNjcm9sbFRvT2Zmc2V0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS53aWRnZXRJZF0uZ2V0VGhyZXNob2xkcygpLnNlY29uZGFyeVRocmVzaG9sZCA+IDApIHtcclxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCk7XHJcblx0XHRcdFx0XHR2YXIgdGFyZ2V0RWxlbWVudE9mZnNldFRvcCA9ICR0YXJnZXRFbGVtZW50Lm9mZnNldCgpLnRvcDtcclxuXHRcdFx0XHRcdHZhciBkaXNjb3VudDtcclxuXHRcdFx0XHRcdGlmICghISQoJy5MYXlvdXRCYXNlLWVtZXJnZW5jeScpLnRleHQoKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoJCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5JykuaGFzQ2xhc3MoJ2lzRml4ZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gMTUwO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gODA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZGlzY291bnQgPSAzOTA7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAoJCgnLkxheW91dEJhc2Utc2Vjb25kYXJ5JykuaGFzQ2xhc3MoJ2lzRml4ZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgKz0gODA7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGFyZ2V0RWxlbWVudE9mZnNldFRvcCArPSAyMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRkaXNjb3VudCA9IDI2MDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQkKCdib2R5LCBodG1sJykuc2Nyb2xsVG9wKHRhcmdldEVsZW1lbnRPZmZzZXRUb3AgLSBkaXNjb3VudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHZhciBMYXlvdXRCYXNlID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyID0gMDtcclxuXHRcdHRoaXMuaGFzSGVhZGVyID0gY29uZmlnLmhhc0hlYWRlcjtcclxuXHRcdHRoaXMuaXNFeHBhbmRhYmxlID0gY29uZmlnLmlzRXhwYW5kYWJsZTtcclxuXHRcdHRoaXMuaXNUb3BXaW5kb3cgPSB3aW5kb3cudG9wID09PSB3aW5kb3cuc2VsZiA/IHRydWUgOiBmYWxzZTtcclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHdyYXBwZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtV3JhcHBlcicpO1xyXG5cdFx0dGhpcy4kc3BhY2VyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXNwYWNlcicpO1xyXG5cdFx0Ly8gdGhpcy4kbGF5b3V0QmFzZUNvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtQ29udGVudCcpO1xyXG5cdFx0dGhpcy4kbWFpbk1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtTWFpbk1lbnUnKTtcclxuXHRcdHRoaXMuJGhlYWRlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1oZWFkZXInKTtcclxuXHRcdHRoaXMuJGhlYWRlckJvZHkgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWJvZHknKTtcclxuXHRcdHRoaXMuJHByaW1hcnlNZW51ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXByaW1hcnktbWVudScpO1xyXG5cdFx0dGhpcy4kZW1lcmdlbmN5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLWVtZXJnZW5jeScpO1xyXG5cdFx0dGhpcy4kc2Vjb25kYXJ5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5MYXlvdXRCYXNlLXNlY29uZGFyeScpO1xyXG5cdFx0dGhpcy4kc2Vjb25kYXJ5TWVudSA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1zZWNvbmRhcnktbWVudScpO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhciA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1pZnJhbWVzaWRlYmFyJyk7XHJcblx0XHR0aGlzLiRoZWFkZXJBZGRpdGlvbmFsQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC1jb250ZW50Jyk7XHJcblx0XHR0aGlzLiR0b3BmaXhlZENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtdG9wZml4ZWRjb250ZW50Jyk7XHJcblx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkxheW91dEJhc2UtYm90dG9tZml4ZWRjb250ZW50Jyk7XHJcblx0XHR0aGlzLiRtYWluQ29udGVudCA9IHRoaXMuJHdpZGdldC5maW5kKCcuTGF5b3V0QmFzZS1NYWluQ29udGVudCcpO1xyXG5cdFx0dGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgPSAwO1xyXG5cdFx0dGhpcy5leHRyYVBhZGRpbmdTZWNvbmRhcnkgPSAwO1xyXG5cdFx0Ly8gdGhpcy5yZWZlcmVuY2VIZWlnaHQgPSBudWxsO1xyXG5cdFx0dGhpcy5zZXR1cFdpbmRvd0V2ZW50cygpO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJsZHMtcmluZ1wiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PC9kaXY+Jyk7XHJcblx0XHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdMYXlvdXRCYXNlJyk7XHJcblx0XHRcdGlmIChfdGhpcy5pc1RvcFdpbmRvdykge1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKCk7XHJcblx0XHRcdC8vIF90aGlzLnJlZmVyZW5jZUhlaWdodCA9ICQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQ7XHJcblx0XHR9KVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLnNldHVwV2luZG93RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0JCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLnVwZGF0ZVRocmVzaG9sZHMoKTtcclxuXHRcdFx0X3RoaXMuaGFuZGxlT3B0aW9uYWxDb250YWluZXJzKCk7XHJcblx0XHRcdF90aGlzLmhhbmRsZUxheW91dFRvcFBhZGRpbmcoKTtcclxuXHRcdFx0X3RoaXMuaGFuZGxlTGF5b3V0Qm90dG9tUGFkZGluZygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHdpbmRvdy5jbGVhclRpbWVvdXQoX3RoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyKTtcclxuXHRcdFx0X3RoaXMubGF5b3V0QmFzZVJlZHJhd1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCc9PT09PScpO1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCd3aW5kb3cnLCAkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdzY3JvbGxoZWlnaHQnLCAkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0KTtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygncmVmZXJlbmNlSGVpZ2h0JywgX3RoaXMucmVmZXJlbmNlSGVpZ2h0KTtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVUaHJlc2hvbGRzKCk7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlT3B0aW9uYWxDb250YWluZXJzKCk7XHJcblx0XHRcdFx0X3RoaXMuaGFuZGxlTGF5b3V0VG9wUGFkZGluZygpO1xyXG5cdFx0XHRcdF90aGlzLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcoKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5oYW5kbGVPcHRpb25hbENvbnRhaW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLiRlbWVyZ2VuY3kubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdGlmIChzY3JvbGxUb3AgKyB0aGlzLmNvbnRlbnRUaHJlc2hvbGQgPiB0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5hZGRDbGFzcygnaXNGaXhlZCcpO1xyXG5cdFx0XHRcdHRoaXMuJGVtZXJnZW5jeS5jc3Moe1xyXG5cdFx0XHRcdFx0dG9wOiB0aGlzLmNvbnRlbnRUaHJlc2hvbGQsXHJcblx0XHRcdFx0XHR3aWR0aDogdGhpcy4kaGVhZGVyLndpZHRoKCksXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgPSB0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LnJlbW92ZUNsYXNzKCdpc0ZpeGVkJyk7XHJcblx0XHRcdFx0dGhpcy4kZW1lcmdlbmN5LmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHdpZHRoOiAnMTAwJScsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuJHNlY29uZGFyeS5sZW5ndGggPT09IDEgJiYgdGhpcy4kc2Vjb25kYXJ5LnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblxyXG5cdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5TWVudS50ZXh0KCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmFkZENsYXNzKCdub1Rvb2xiYXInKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNjcm9sbFRvcCArIHRoaXMuY29udGVudFRocmVzaG9sZCArICh0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMCkgPiB0aGlzLnNlY29uZGFyeVRocmVzaG9sZCkge1xyXG5cdFx0XHRcdHRoaXMuJHNlY29uZGFyeS5hZGRDbGFzcygnaXNGaXhlZCcpLmNzcyh7XHJcblx0XHRcdFx0XHR0b3A6IHRoaXMuY29udGVudFRocmVzaG9sZCArICh0aGlzLiRlbWVyZ2VuY3kub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMCksXHJcblx0XHRcdFx0XHR3aWR0aDogdGhpcy4kaGVhZGVyLndpZHRoKCksXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5CdXR0b24uU2Vjb25kLCAuQnV0dG9uLlRoaXJkJykubm90KCcuUGFuZWwgLkJ1dHRvbi5TbWFsbCwgLlBhbmVsIC5CdXR0b24uVGhpcmQnKS5hZGRDbGFzcygnU21hbGwnKTtcclxuXHRcdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5LmZpbmQoJy5Ub29sYmFyJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHR2YXIgdGFyZ2V0VG9vbGJhcldpZHRoID0gJCgnLlNhcHBoaXJlSGVhZGVyJykub3V0ZXJXaWR0aCh0cnVlKSAqIDAuNjY7XHJcblx0XHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLlRvb2xiYXInKS53aWR0aCh0YXJnZXRUb29sYmFyV2lkdGgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy4kc2Vjb25kYXJ5TWVudS50ZXh0KCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuYWRkQ2xhc3MoJ25vVG9vbGJhcicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLiRwcmltYXJ5TWVudS5jc3MoJ29wYWNpdHknLCAwKTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeSA9IHRoaXMuJHNlY29uZGFyeS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHJcblx0XHRcdFx0Ly8gLy9cclxuXHRcdFx0XHQvLyB2YXIgY3VycmVudEhlaWdodCA9ICQoJ2JvZHknKVswXS5zY3JvbGxIZWlnaHQ7XHJcblx0XHRcdFx0Ly8gdmFyIGNvbXBlbnNhdGlvbiA9IHRoaXMucmVmZXJlbmNlSGVpZ2h0IC0gY3VycmVudEhlaWdodDtcclxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhjb21wZW5zYXRpb24pO1xyXG5cclxuXHRcdFx0XHQvLyBpZiAoY29tcGVuc2F0aW9uIDw9IDApIHtcclxuXHRcdFx0XHQvLyBcdC8vIHRoaXMuJGxheW91dEJhc2VDb250ZW50LmNzcygncGFkZGluZy1ib3R0b20nLCAnJyk7XHJcblx0XHRcdFx0Ly8gfSBlbHNlIHtcclxuXHRcdFx0XHQvLyBcdHRoaXMuJGxheW91dEJhc2VDb250ZW50LmNzcygncGFkZGluZy1ib3R0b20nLCBjb21wZW5zYXRpb24pO1xyXG5cdFx0XHRcdC8vIH1cclxuXHJcblxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gdGhpcy4kbGF5b3V0QmFzZUNvbnRlbnQuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHJcblx0XHRcdFx0dGhpcy4kc2Vjb25kYXJ5LnJlbW92ZUNsYXNzKCdpc0ZpeGVkJykuY3NzKHtcclxuXHRcdFx0XHRcdHRvcDogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLkJ1dHRvbi5TZWNvbmQsIC5CdXR0b24uVGhpcmQnKS5yZW1vdmVDbGFzcygnU21hbGwnKTtcclxuXHRcdFx0XHR0aGlzLiRwcmltYXJ5TWVudS5jc3MoJ29wYWNpdHknLCAxKTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuY3NzKHtcclxuXHRcdFx0XHRcdGhlaWdodDogJ3Vuc2V0JyxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnkuZmluZCgnLlRvb2xiYXInKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcclxuXHRcdFx0XHR0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeSA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLiRzZWNvbmRhcnlNZW51LnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJy5DbGluaWNpYW5Xb3JrQXJlYS1jb2x1bW5zLWJpZycpLmNzcygnbWFyZ2luLXRvcCcsICd1bnNldCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuQ2xpbmljaWFuV29ya0FyZWEtY29sdW1ucy1iaWcnKS5jc3MoJ21hcmdpbi10b3AnLCAtdGhpcy4kc2Vjb25kYXJ5Lm91dGVySGVpZ2h0KHRydWUpKTtcclxuXHRcdFx0XHR0aGlzLiRzZWNvbmRhcnlNZW51LmNzcygnYmFja2dyb3VuZC1jb2xvcicsICd0cmFuc3BhcmVudCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuaGFuZGxlTGF5b3V0VG9wUGFkZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBwYWRkaW5nVG9wID0gdGhpcy5jb250ZW50VGhyZXNob2xkICsgdGhpcy5leHRyYVBhZGRpbmdFbWVyZ2VuY3kgKyB0aGlzLmV4dHJhUGFkZGluZ1NlY29uZGFyeTtcclxuXHRcdHRoaXMuJHNwYWNlci5zdG9wKCkuYW5pbWF0ZSh7XHJcblx0XHRcdGhlaWdodDogcGFkZGluZ1RvcCxcclxuXHRcdH0sIDAsICdsaW5lYXInKTtcclxuXHRcdGlmICh0aGlzLiR0b3BmaXhlZENvbnRlbnQubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHRoaXMuJHRvcGZpeGVkQ29udGVudC5jc3Moe1xyXG5cdFx0XHRcdHdpZHRoOiAkKCcuTGF5b3V0QmFzZS1NYWluQ29udGVudCcpLndpZHRoKCksXHJcblx0XHRcdFx0dG9wOiB0aGlzLnRvcGZpeGVkQ29udGVudFRocmVzaG9sZCArICdweCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdExheW91dEJhc2UucHJvdG90eXBlLmhhbmRsZUxheW91dEJvdHRvbVBhZGRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy4kYm90dG9tZml4ZWRDb250ZW50Lmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRpZiAoJCgnYm9keScpWzBdLnNjcm9sbEhlaWdodCA+ICQoJ2JvZHknKS5oZWlnaHQoKSkge1xyXG5cdFx0XHRcdHZhciBib3R0b21GaXhlZEhlaWdodCA9IHRoaXMuJGJvdHRvbWZpeGVkQ29udGVudC5vdXRlckhlaWdodCh0cnVlKTtcclxuXHRcdFx0XHR0aGlzLiR3cmFwcGVyLmFkZENsYXNzKCdoYXNGaXhlZEJvdHRvbScpLmNzcygncGFkZGluZy1ib3R0b20nLCBib3R0b21GaXhlZEhlaWdodCArICdweCcpO1xyXG5cdFx0XHRcdHRoaXMuJGJvdHRvbWZpeGVkQ29udGVudC5jc3Moe1xyXG5cdFx0XHRcdFx0d2lkdGg6ICQoJy5MYXlvdXRCYXNlLU1haW5Db250ZW50Jykub3V0ZXJXaWR0aCh0cnVlKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2hhc0ZpeGVkQm90dG9tJykuY3NzKCdwYWRkaW5nLWJvdHRvbScsICcnKTtcclxuXHRcdFx0XHR0aGlzLiRib3R0b21maXhlZENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRcdHdpZHRoOiAnJ1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUudXBkYXRlVGhyZXNob2xkcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtYWluTWVudUhlaWdodCA9IHRoaXMuJG1haW5NZW51Lm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgaGVhZGVyQm9keUhlaWdodCA9IHRoaXMuJGhlYWRlckJvZHkub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgdGhpcy4kaGVhZGVyLm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgdG9wZml4ZWRDb250ZW50SGVpZ2h0ID0gdGhpcy4kdG9wZml4ZWRDb250ZW50Lm91dGVySGVpZ2h0KHRydWUpIHx8IDA7XHJcblx0XHR2YXIgcHJpbWFyeU1lbnVIZWlnaHQgPSB0aGlzLiRwcmltYXJ5TWVudS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dmFyIGVtZXJnZW5jeUhlaWdodCA9IHRoaXMuJGVtZXJnZW5jeS5vdXRlckhlaWdodCh0cnVlKSB8fCAwO1xyXG5cdFx0dGhpcy50b3BmaXhlZENvbnRlbnRUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQ7XHJcblx0XHR0aGlzLmNvbnRlbnRUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQ7XHJcblx0XHR0aGlzLmVtZXJnZW5jeVRocmVzaG9sZCA9IG1haW5NZW51SGVpZ2h0ICsgaGVhZGVyQm9keUhlaWdodCArIHRvcGZpeGVkQ29udGVudEhlaWdodCArIHByaW1hcnlNZW51SGVpZ2h0O1xyXG5cdFx0dGhpcy5zZWNvbmRhcnlUaHJlc2hvbGQgPSBtYWluTWVudUhlaWdodCArIGhlYWRlckJvZHlIZWlnaHQgKyB0b3BmaXhlZENvbnRlbnRIZWlnaHQgKyBwcmltYXJ5TWVudUhlaWdodCArIGVtZXJnZW5jeUhlaWdodDtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5nZXRUaHJlc2hvbGRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dG9wZml4ZWRDb250ZW50VGhyZXNob2xkOiB0aGlzLnRvcGZpeGVkQ29udGVudFRocmVzaG9sZCxcclxuXHRcdFx0Y29udGVudFRocmVzaG9sZDogdGhpcy5jb250ZW50VGhyZXNob2xkLFxyXG5cdFx0XHRlbWVyZ2VuY3lUaHJlc2hvbGQ6IHRoaXMuZW1lcmdlbmN5VGhyZXNob2xkLFxyXG5cdFx0XHRzZWNvbmRhcnlUaHJlc2hvbGQ6IHRoaXMuc2Vjb25kYXJ5VGhyZXNob2xkLFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRMYXlvdXRCYXNlLnByb3RvdHlwZS5vcGVuU2lkZWJhcklmcmFtZSA9IGZ1bmN0aW9uIChkdXJhdGlvbl9pbikge1xyXG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb25faW4gPj0gMCA/IGR1cmF0aW9uX2luIDogMTAwO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhci5hbmltYXRlKHtcclxuXHRcdFx0d2lkdGg6ICcxMDAlJyxcclxuXHRcdH0sIGR1cmF0aW9uKTtcclxuXHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnc2Nyb2xsJyk7XHJcblx0XHQkKCcudG9vbHRpcHN0ZXJlZCcpLnRvb2x0aXBzdGVyKCdoaWRlJyk7XHJcblx0fTtcclxuXHJcblx0TGF5b3V0QmFzZS5wcm90b3R5cGUuY2xvc2VTaWRlYmFySWZyYW1lID0gZnVuY3Rpb24gKGR1cmF0aW9uX2luKSB7XHJcblx0XHR2YXIgZHVyYXRpb24gPSBkdXJhdGlvbl9pbiA+PSAwID8gZHVyYXRpb25faW4gOiAxMDA7XHJcblx0XHR2YXIgdGFyZ2V0V2lkdGggPSB0aGlzLmlzRXhwYW5kYWJsZSA/IDQwIDogMjYyO1xyXG5cdFx0dGhpcy4kaWZyYW1lU2lkZWJhci5hbmltYXRlKHtcclxuXHRcdFx0d2lkdGg6IHRhcmdldFdpZHRoLFxyXG5cdFx0fSwgZHVyYXRpb24pO1xyXG5cdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZSA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdFx0Y2xvc2VTaWRlYmFySWZyYW1lOiBjbG9zZVNpZGViYXJJZnJhbWUsXHJcblx0XHRvcGVuU2lkZWJhcklmcmFtZTogb3BlblNpZGViYXJJZnJhbWUsXHJcblx0XHRzY3JvbGxUb0VsZW1lbnQ6IHNjcm9sbFRvRWxlbWVudCxcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBMYXlvdXRCbGFuayAqL1xuJChmdW5jdGlvbigpIHtcblx0aWYgKHdpbmRvdy5mcmFtZUVsZW1lbnQpIHtcblx0XHRpZiAoISEkKHRoaXMuZnJhbWVFbGVtZW50KS5jbG9zZXN0KCcuTWFpbkludGVyYWN0aXZlQ2FyZCcpLmxlbmd0aCkge1xuXHRcdFx0JCgnLkxheW91dEJsYW5rLlBhZ2UnKS5hZGRDbGFzcygnTWFpbkludGVyYWN0aXZlQ2FyZCcpO1xuXHRcdH1cblx0fVxufSk7XG4iLCIvKiBDb21wb25lbnQgTGF5b3V0UG9wdXAgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgcG9wdXBXaWR0aDtcclxuXHR2YXIgcG9wdXBNaW5XaWR0aDtcclxuXHR2YXIgcG9wdXBIZWlnaHQ7XHJcblx0dmFyIHBvcHVwTWluSGVpZ2h0O1xyXG5cdHZhciBwb3B1cE1heEhlaWdodDtcclxuXHR2YXIgcG9wdXBXaWR0aFBlcmNlbnRhZ2U7XHJcblx0dmFyIGxheW91dFBvcHVwUmVzaXplVGltZXI7XHJcblxyXG5cdHZhciAkcG9wdXAgPSAkKCcuTGF5b3V0UG9wdXAnKTtcclxuXHR2YXIgJG9zUG9wdXAgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC1Qb3B1cC5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKTtcclxuXHR2YXIgJG9zUG9wdXBDb250ZW50ID0gd2luZG93LnBhcmVudC4kKCcub3MtaW50ZXJuYWwtdWktZGlhbG9nLWNvbnRlbnQub3MtaW50ZXJuYWwtdWktd2lkZ2V0LWNvbnRlbnQnKTtcclxuXHR2YXIgJG92ZXJsYXkgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC11aS13aWRnZXQtb3ZlcmxheScpO1xyXG5cdHZhciBwb3B1cFNpemU7XHJcblxyXG5cdGNvbnN0IGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHJcblx0XHRTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0cG9wdXBTaXplID0gU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5Qb3B1cFNpemU7XHJcblxyXG5cdFx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnTGF5b3V0UG9wdXAnKTsgLy8gYmVjYXVzZSBkYXRldGltZXJhbmdlcGlja2VyIGlzIGF0dGFjaGVkIHRvIGJvZHlcclxuXHRcdFx0aWYgKFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNUb3VjaCkge1xyXG5cdFx0XHRcdCRwb3B1cC5hZGRDbGFzcygnaXNUb3VjaCcpO1xyXG5cdFx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnaXNUb3VjaCcpOyAvLyBiZWNhdXNlIHNlbGVjdDIgaXMgYXR0YWNoZWQgdG8gYm9keVxyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuXHRcdFx0XHRtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24sIGluZGV4KSB7XHJcblx0XHRcdFx0XHRyZWRyYXdEaWFsb2dXaW5kb3coKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xyXG5cdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcclxuXHRcdFx0XHRzdWJ0cmVlOiB0cnVlLFxyXG5cdFx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0JCgnYm9keScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0JCh0aGlzLmZyYW1lRWxlbWVudCkuY3NzKHtcclxuXHRcdFx0XHR3aWR0aDogJzEwMCUnLFxyXG5cdFx0XHRcdGhlaWdodDogJzEwMCUnXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXNpemVEaWFsb2coKTtcclxuXHRcdFx0XHRyZXNpemVDb250ZW50KCk7XHJcblx0XHRcdFx0JCgnYm9keScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdH0sIDE1MCk7XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLnJlZHJhd0RpYWxvZ1dpbmRvdyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdy5wYXJlbnQpLm9mZigncmVzaXplLkxheW91dFBvcHVwJykub24oJ3Jlc2l6ZS5MYXlvdXRQb3B1cCcsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmVkcmF3RGlhbG9nV2luZG93KCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZWRyYXdEaWFsb2dXaW5kb3cgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRjbGVhclRpbWVvdXQobGF5b3V0UG9wdXBSZXNpemVUaW1lcik7XHJcblx0XHRsYXlvdXRQb3B1cFJlc2l6ZVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJlc2l6ZURpYWxvZygpO1xyXG5cdFx0XHRyZXNpemVDb250ZW50KCk7XHJcblx0XHR9LCAzMDApO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHJlc2l6ZURpYWxvZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmhhc0Nsb3NlKSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLXVpLWRpYWxvZy10aXRsZWJhcicpLnNob3coKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2luZG93LnRvcC4kKCdib2R5JykuaGFzQ2xhc3MoJ0xheW91dEJhc2UnKSkge1xyXG5cdFx0XHR3aW5kb3cudG9wLiQoJ2JvZHknKS5jc3Moe1xyXG5cdFx0XHRcdG92ZXJmbG93WTogJ2hpZGRlbidcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0JG92ZXJsYXkud2lkdGgoJzEwMCUnKTtcclxuXHJcblx0XHR2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cucGFyZW50KS5oZWlnaHQoKTtcclxuXHRcdHZhciB3aW5kb3dXaWR0aCA9ICQod2luZG93LnBhcmVudCkud2lkdGgoKTtcclxuXHJcblx0XHRpZiAocG9wdXBTaXplID09PSAnU21hbGwnKSB7XHJcblx0XHRcdHBvcHVwV2lkdGggPSBwYXJzZUludCh3aW5kb3dXaWR0aCAqIDAuMzMpO1xyXG5cdFx0XHRwb3B1cE1pbldpZHRoID0gNDAwO1xyXG5cdFx0fSBlbHNlIGlmIChwb3B1cFNpemUgPT09ICdNZWRpdW0nKSB7XHJcblx0XHRcdHN3aXRjaCAoU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5Qb3B1cFdpZHRoKSB7XHJcblx0XHRcdFx0Y2FzZSAnWFNtYWxsJzpcclxuXHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSAyMDA7XHJcblx0XHRcdFx0XHRwb3B1cFdpZHRoUGVyY2VudGFnZSA9IDAuMjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ1NtYWxsJzpcclxuXHRcdFx0XHRcdHBvcHVwTWluV2lkdGggPSAzMDA7XHJcblx0XHRcdFx0XHRwb3B1cFdpZHRoUGVyY2VudGFnZSA9IDAuMztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ01lZGl1bSc6XHJcblx0XHRcdFx0XHRwb3B1cE1pbldpZHRoID0gNjAwO1xyXG5cdFx0XHRcdFx0cG9wdXBXaWR0aFBlcmNlbnRhZ2UgPSAwLjY7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cG9wdXBNaW5XaWR0aCA9IDcwMDtcclxuXHRcdFx0XHRcdHBvcHVwV2lkdGhQZXJjZW50YWdlID0gMC43O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwb3B1cFdpZHRoID0gU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc1RvdWNoID8gcGFyc2VJbnQod2luZG93V2lkdGggKiAwLjgpIDogcGFyc2VJbnQod2luZG93V2lkdGggKiBwb3B1cFdpZHRoUGVyY2VudGFnZSk7XHJcblx0XHRcdHBvcHVwTWluSGVpZ2h0ID0gMjAwO1xyXG5cdFx0XHRwb3B1cE1heEhlaWdodCA9IFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNUb3VjaCA/IHBhcnNlSW50KHdpbmRvd0hlaWdodCAqIDAuOSkgOiBwYXJzZUludCh3aW5kb3dIZWlnaHQgKiAwLjcpO1xyXG5cclxuXHRcdFx0aWYgKFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5jb25maWcuaXNGaXhlZEhlaWdodCkge1xyXG5cdFx0XHRcdHBvcHVwSGVpZ2h0ID0gcG9wdXBNYXhIZWlnaHQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cG9wdXBIZWlnaHQgPSB3aW5kb3cucGFyZW50LiQoJy5vcy1pbnRlcm5hbC1Qb3B1cC5vcy1pbnRlcm5hbC11aS1kaWFsb2cnKS5vdXRlckhlaWdodCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQkb3NQb3B1cENvbnRlbnQuY3NzKHtcclxuXHRcdFx0XHRtYXhIZWlnaHQ6IHBvcHVwTWF4SGVpZ2h0ICsgJ3B4JyxcclxuXHRcdFx0XHRtaW5IZWlnaHQ6IHBvcHVwTWluSGVpZ2h0ICsgJ3B4JyxcclxuXHRcdFx0XHRoZWlnaHQ6IHBvcHVwSGVpZ2h0ICsgJ3B4JyxcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2UgaWYgKHBvcHVwU2l6ZSA9PT0gJ0xhcmdlJykge1xyXG5cdFx0XHRwb3B1cE1pbldpZHRoID0gcGFyc2VJbnQod2luZG93V2lkdGggKiAwLjgpO1xyXG5cdFx0XHRwb3B1cE1heEhlaWdodCA9IHBhcnNlSW50KHdpbmRvd0hlaWdodCAqIDAuOSk7XHJcblx0XHR9XHJcblxyXG5cdFx0JG9zUG9wdXAuY3NzKHtcclxuXHRcdFx0cG9zaXRpb246ICdmaXhlZCcsXHJcblx0XHRcdGxlZnQ6ICc1MCUnLFxyXG5cdFx0XHR0b3A6ICc1MCUnLFxyXG5cdFx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxyXG5cdFx0XHRoZWlnaHQ6ICdhdXRvJyxcclxuXHRcdFx0bWluV2lkdGg6IHBvcHVwTWluV2lkdGggKyAncHgnLFxyXG5cdFx0XHR3aWR0aDogcG9wdXBXaWR0aCArICdweCcsXHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCByZXNpemVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyICRib2R5ID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50Jyk7XHJcblx0XHR2YXIgY29udGVudFNjcm9sbFRvcCA9ICRib2R5LnNjcm9sbFRvcCgpO1xyXG5cclxuXHRcdGlmIChwb3B1cFNpemUgPT09ICdTbWFsbCcgJiYgJCgnLmRhdGVyYW5nZXBpY2tlcjp2aXNpYmxlJykubGVuZ3RoID4gMCkge1xyXG5cdFx0XHQvLyBza2lwIHRoZSByZXNldCBvZiAuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCRib2R5LmNzcyh7XHJcblx0XHRcdFx0aGVpZ2h0OiAnYXV0bydcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGhlYWRlckhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9faGVhZGVyJykuaW5uZXJIZWlnaHQoKSB8fCAwO1xyXG5cdFx0dmFyIGludHJvSGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19pbnRybycpLmlubmVySGVpZ2h0KCkgfHwgMDtcclxuXHRcdHZhciBib2R5SGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19ib2R5X19jb250ZW50JylbMF0uc2Nyb2xsSGVpZ2h0IHx8IDA7XHJcblx0XHR2YXIgZm9vdGVySGVpZ2h0ID0gJCgnLkxheW91dFBvcHVwX19mb290ZXInKS5pbm5lckhlaWdodCgpIHx8IDA7XHJcblx0XHR2YXIgY29udGVudEhlaWdodCA9IGhlYWRlckhlaWdodCArIGludHJvSGVpZ2h0ICsgYm9keUhlaWdodCArIGZvb3RlckhlaWdodCArIDQwO1xyXG5cdFx0dmFyIGRpYWxvZ0hlaWdodCA9IHdpbmRvdy5wYXJlbnQuJCgnLm9zLWludGVybmFsLVBvcHVwLm9zLWludGVybmFsLXVpLWRpYWxvZycpLm91dGVySGVpZ2h0KCk7XHJcblxyXG5cdFx0aWYgKHBvcHVwU2l6ZSA9PT0gJ1NtYWxsJykge1xyXG5cdFx0XHQkb3NQb3B1cENvbnRlbnQuaGVpZ2h0KGNvbnRlbnRIZWlnaHQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPCBkaWFsb2dIZWlnaHQgJiYgU2FwcGhpcmVXaWRnZXRzLkxheW91dFBvcHVwLmNvbmZpZy5pc0ZpeGVkSGVpZ2h0KSB7XHJcblx0XHRcdFx0dmFyIGZvcmNlZEJvZHlIZWlnaHQgPSBkaWFsb2dIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnRyb0hlaWdodCAtIGZvb3RlckhlaWdodCAtIDQwO1xyXG5cdFx0XHRcdCRib2R5LmhlaWdodChmb3JjZWRCb2R5SGVpZ2h0KTtcclxuXHRcdFx0fSBlbHNlIGlmIChjb250ZW50SGVpZ2h0IDwgZGlhbG9nSGVpZ2h0KSB7XHJcblx0XHRcdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodChjb250ZW50SGVpZ2h0KTtcclxuXHRcdFx0XHRpZiAoY29udGVudEhlaWdodCA8IHBvcHVwTWluSGVpZ2h0KSB7XHJcblx0XHRcdFx0XHR2YXIgZGlmZXJlbmNlID0gcG9wdXBNaW5IZWlnaHQgLSBjb250ZW50SGVpZ2h0O1xyXG5cdFx0XHRcdFx0JGJvZHkuaGVpZ2h0KGJvZHlIZWlnaHQgKyBkaWZlcmVuY2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChjb250ZW50SGVpZ2h0ID49IGRpYWxvZ0hlaWdodCAmJiBTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAuY29uZmlnLmlzRml4ZWRIZWlnaHQpIHtcclxuXHRcdFx0XHR2YXIgZm9yY2VkQm9keUhlaWdodCA9IGRpYWxvZ0hlaWdodCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0IC0gZm9vdGVySGVpZ2h0IC0gNDA7XHJcblx0XHRcdFx0JGJvZHkuaGVpZ2h0KGZvcmNlZEJvZHlIZWlnaHQpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGNvbnRlbnRIZWlnaHQgPj0gZGlhbG9nSGVpZ2h0KSB7XHJcblx0XHRcdFx0aWYgKGNvbnRlbnRIZWlnaHQgPiBwb3B1cE1heEhlaWdodCkge1xyXG5cdFx0XHRcdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodChwb3B1cE1heEhlaWdodCk7XHJcblx0XHRcdFx0XHR2YXIgZm9yY2VkQm9keUhlaWdodCA9IHBvcHVwTWF4SGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW50cm9IZWlnaHQgLSBmb290ZXJIZWlnaHQgLSA0MDtcclxuXHRcdFx0XHRcdCRib2R5LmhlaWdodChmb3JjZWRCb2R5SGVpZ2h0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodChjb250ZW50SGVpZ2h0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKCdVbmV4cGVjdGVkIGNvbWJpbmF0aW9uLi4uJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBIYW5kbGUgd2hlbiBEYXRlVGltZVJhbmdlUGlja2VyIGlzIG9wZW5lZFxyXG5cdFx0dmFyIGRhdGVSYW5nZVBpY2tlciA9ICQoJy5kYXRlcmFuZ2VwaWNrZXI6dmlzaWJsZScpO1xyXG5cdFx0aWYgKGRhdGVSYW5nZVBpY2tlci5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0aWYgKGRhdGVSYW5nZVBpY2tlclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gPiBkaWFsb2dIZWlnaHQpIHtcclxuXHRcdFx0XHR2YXIgZGlmZmVyZW5jZSA9IGRhdGVSYW5nZVBpY2tlclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gLSBkaWFsb2dIZWlnaHQ7XHJcblx0XHRcdFx0dmFyIGJvZHlIZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKS5vdXRlckhlaWdodCh0cnVlKTtcclxuXHRcdFx0XHQkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKS5oZWlnaHQoYm9keUhlaWdodCArIGRpZmZlcmVuY2UgKyA0MCk7XHJcblx0XHRcdFx0JG9zUG9wdXBDb250ZW50LmhlaWdodCgkKCdib2R5JylbMF0uc2Nyb2xsSGVpZ2h0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdCRib2R5LnNjcm9sbFRvcChjb250ZW50U2Nyb2xsVG9wKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBpbmNyZWFzZUhlaWdodCA9IGZ1bmN0aW9uIChkaWZlcmVuY2UpIHtcclxuXHRcdCRvc1BvcHVwQ29udGVudC5oZWlnaHQoJG9zUG9wdXBDb250ZW50LmhlaWdodCgpICsgZGlmZXJlbmNlKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbiAoJGVsZW1lbnQpIHtcclxuXHRcdHZhciAkdGFyZ2V0RWxlbWVudCA9ICRlbGVtZW50O1xyXG5cdFx0aWYgKCEhJHRhcmdldEVsZW1lbnQubGVuZ3RoKSB7XHJcblx0XHRcdHZhciBzY3JvbGxUb09mZnNldEludGVydmFsO1xyXG5cdFx0XHRzY3JvbGxUb09mZnNldEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoc2Nyb2xsVG9PZmZzZXRJbnRlcnZhbCk7XHJcblx0XHRcdFx0dmFyIGhlYWRlckhlaWdodCA9ICQoJy5MYXlvdXRQb3B1cF9faGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdFx0XHR2YXIgaW50cm9IZWlnaHQgPSAkKCcuTGF5b3V0UG9wdXBfX2ludHJvJykub3V0ZXJIZWlnaHQodHJ1ZSkgfHwgMDtcclxuXHRcdFx0XHR2YXIgY3VycmVudEJvZHlTY3JvbGwgPSAkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKVswXS5zY3JvbGxUb3AgfHwgMDtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0RWxlbWVudE9mZnNldFRvcCA9ICR0YXJnZXRFbGVtZW50Lm9mZnNldCgpLnRvcCAtIGhlYWRlckhlaWdodCAtIGludHJvSGVpZ2h0ICsgY3VycmVudEJvZHlTY3JvbGwgLSAyMDtcclxuXHRcdFx0XHQkKCcuTGF5b3V0UG9wdXBfX2JvZHlfX2NvbnRlbnQnKS5zY3JvbGxUb3AodGFyZ2V0RWxlbWVudE9mZnNldFRvcCk7XHJcblx0XHRcdH0sIDI1MCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuTGF5b3V0UG9wdXAgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0XHRyZXNpemVEaWFsb2csXHJcblx0XHRyZXNpemVDb250ZW50LFxyXG5cdFx0aW5jcmVhc2VIZWlnaHQsXHJcblx0XHRyZWRyYXdEaWFsb2dXaW5kb3csXHJcblx0XHRzY3JvbGxUb0VsZW1lbnRcclxuXHR9O1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xyXG5cclxuJCh3aW5kb3cpLnVubG9hZChmdW5jdGlvbiAoKSB7XHJcblx0aWYgKCEhJCgnLkxheW91dFBvcHVwJykubGVuZ3RoKSB7XHJcblx0XHR3aW5kb3cudG9wLiQoJ2JvZHknKS5jc3Moe1xyXG5cdFx0XHRvdmVyZmxvd1k6ICdzY3JvbGwnXHJcblx0XHR9KTtcclxuXHR9XHJcbn0pOyIsIi8qIENvbXBvbmVudCBBY3Rpb25zTWVudSAqL1xuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcblx0XHR2YXIgJHRyaWdnZXJFbGVtZW50ID0gJCgnIycgKyBjb25maWcudHJpZ2dlckVsZW1lbnQpO1xuXHRcdHZhciAkY29udGVudEVsZW1lbnQgPSAkKCcjJyArIGNvbmZpZy5jb250ZW50RWxlbWVudCk7XG5cblx0XHRpZiAoJGNvbnRlbnRFbGVtZW50LnRleHQoKS5sZW5ndGggPCAxKSB7XG5cdFx0XHQkdHJpZ2dlckVsZW1lbnQuaGlkZSgpO1xuXHRcdH1cblxuXHRcdCQoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBpbnNpZGUgYSBkb2N1bWVudCByZWFkeSBkdWUgdG8gc2FwcGhpcmUgcG9wdXAgYmluZGVkIGV2ZW50c1xuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBwb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcblx0XHRcdFx0aWYgKGNvbmZpZy5sb2NhbGUgPT09ICdBUicpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKGNvbmZpZy5wb3NpdGlvbikge1xuXHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdsZWZ0Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAncmlnaHQnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ2JvdHRvbS1sZWZ0Jzpcblx0XHRcdFx0XHRcdFx0cG9zaXRpb24gPSAnYm90dG9tLXJpZ2h0Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdib3R0b20tcmlnaHQnOlxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdib3R0b20tbGVmdCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAndG9wLWxlZnQnOlxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICd0b3AtcmlnaHQnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ3RvcC1yaWdodCc6XG5cdFx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ3RvcC1sZWZ0Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCR0cmlnZ2VyRWxlbWVudC50b29sdGlwc3Rlcih7XG5cdFx0XHRcdFx0Y29udGVudDogJCgnPHNlY3Rpb24vPicpLmFwcGVuZCgkY29udGVudEVsZW1lbnQuY2xvbmUodHJ1ZSkpLFxuXHRcdFx0XHRcdHRyaWdnZXI6IGNvbmZpZy50cmlnZ2VyRXZlbnQsXG5cdFx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdFx0XHRcdG1heFdpZHRoOiBjb25maWcubWF4V2lkdGgsXG5cdFx0XHRcdFx0dGhlbWU6XG5cdFx0XHRcdFx0XHQndG9vbHRpcHN0ZXItbG9jYXRpb24tLScgK1xuXHRcdFx0XHRcdFx0Y29uZmlnLmxvY2F0aW9uICtcblx0XHRcdFx0XHRcdCcgQWN0aW9uc01lbnUtdG9vbHRpcCBQYWRkaW5nLS0nICtcblx0XHRcdFx0XHRcdGNvbmZpZy5wYWRkaW5nICtcblx0XHRcdFx0XHRcdCcgQm9yZGVyLS0nICtcblx0XHRcdFx0XHRcdGNvbmZpZy5ib3JkZXIsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQkY29udGVudEVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHR9LCA1MDApO1xuXHRcdH0pO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5BY3Rpb25zTWVudSA9IHsgY3JlYXRlIH07XG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcbiIsIi8qIENvbXBvbmVudCBBY3Rpb25zU3ViTWVudSAtIEBEZXByZWNhdGVkICovXG5TYXBwaGlyZVdpZGdldHMuQWN0aW9uc1N1Yk1lbnUgPSBmdW5jdGlvbihJY29uSWQpIHtcblx0aWYgKCQoJy5QYXRpZW50SGVhZGVyQWN0aW9uc19fc3ViTWVudScpLmhhc0NsYXNzKCdTdWJNZW51QmxvY2snKSkge1xuXHRcdCQoJy5QYXRpZW50SGVhZGVyQWN0aW9uc19fc3ViTWVudScpLnJlbW92ZUNsYXNzKCdTdWJNZW51QmxvY2snKTtcblx0fSBlbHNlIHtcblx0XHQkKEljb25JZClcblx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0LnNpYmxpbmdzKClcblx0XHRcdC5maW5kKCcuUGF0aWVudEhlYWRlckFjdGlvbnNfX3N1Yk1lbnUnKVxuXHRcdFx0LmFkZENsYXNzKCdTdWJNZW51QmxvY2snKTtcblx0fVxufTtcbiIsIi8qIENvbXBvbmVudCBDb21wTGluZSAqL1xuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdGZ1bmN0aW9uIFNlY3Rpb25Db21wbGluZSgpIHtcblx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xuXHRcdHZhciBwcmV2aWV3c3RhdCA9IFtdO1xuXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xuXHRcdC8vIHNldCBjbGljayBldmVudHNcblx0XHRmdW5jdGlvbiBjbGlja0V2ZW50cyhvYikge1xuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxuXHRcdFx0dmFyIGhvbGRlciA9ICQob2IpLmNsb3Nlc3QoJy5Db21wTGluZScpO1xuXHRcdFx0dmFyIFNlY3Rpb24gPSAkKG9iKS5jbG9zZXN0KCcuQ29tcExpbmVFeHBhbmRhYmxlJyk7XG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuQ29tcExpbmVfRXhwYW5kJyk7XG5cblx0XHRcdC8vIGdldCBpZFxuXHRcdFx0dmFyIGlkID0gaG9sZGVyLmF0dHIoJ2lkJyk7XG5cblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcblxuXHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHQsIGR1cmluZyB0aGlzIHByb2Nlc3MsIHRyYW5zaXRpb25zIGFyZSBkaXNhYmxlZFxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xuXG5cdFx0XHRcdC8vIENvbGxhcHNlIGNvbnRlbnRcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxuXHRcdFx0XHRwcmV2aWV3c3RhdFtpZF1bJ2NsaWVudCddID0gZmFsc2U7XG5cblx0XHRcdFx0aWYgKGhvbGRlci5oYXNDbGFzcygnbm90UmVuZGVySW50ZXJhY3Rpb25zJykpIHtcblx0XHRcdFx0XHRob2xkZXIuZmluZCgnLkNvbXBMaW5lLXRvZ2dsZS1pbnRlcmFjdGlvbnMnKS50cmlnZ2VyKCdjbGljaycpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XG5cdFx0XHRcdHRlbXBIZWlnaHQgPSBTZWN0aW9uQ29udGVudC5oZWlnaHQoKTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQodGVtcEhlaWdodCk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXG5cdFx0XHRcdFNlY3Rpb24uYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xuXG5cdFx0XHRcdGlmICgkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTgnKSB8fCAkKCcuUGFnZScpLmhhc0NsYXNzKCdpZTknKSkge1xuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gYWRkIGV2ZW50IHRyYW5zaXRpb24gZW5kIHRvIG92ZXJmbG93OnZpc2libGUgZm9yIHRvb2x0aXBzIGFuZCBkcm9wZG93bnMgaXNzdWVzXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoaG9sZGVyLmhhc0NsYXNzKCdub3RSZW5kZXJJbnRlcmFjdGlvbnMnKSkge1xuXHRcdFx0XHRcdGhvbGRlci5maW5kKCcuQ29tcExpbmUtdG9nZ2xlLWludGVyYWN0aW9ucycpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBhamF4IHJlZnJlcyBmdW5jdGlvblxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbigpIHtcblx0XHRcdC8vIHJlbW92ZSBjbGljayBldmVudHNcblx0XHRcdCQoJy5Db21wTGluZV9oZWFkTGluZScpLm9mZigpO1xuXG5cdFx0XHQvLyBhZGQgc3RvcCBwcmVwYWdhdGlvblxuXHRcdFx0JCgnLkNvbXBMaW5lX2hlYWRMaW5lIGlucHV0LCAuQ29tcExpbmVfaGVhZExpbmUgc2VsZWN0LCAuQ29tcExpbmVfaGVhZExpbmUgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXG5cdFx0XHQkKCcuQ29tcExpbmVfX2V4cGFuZEljb24nKS51bmJpbmQoJ2NsaWNrJyk7XG5cdFx0XHQkKCcuQ29tcExpbmVfX2V4cGFuZEljb24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcy5wYXJlbnRFbGVtZW50KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBlYWNoIGFsbCBzZWN0aW9uc1xuXHRcdFx0JCgnLkNvbXBMaW5lRXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbXG5cdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxuXHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxuXHRcdFx0XHRcdF0gPT0gbnVsbFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxuXHRcdFx0XHRcdHZhciBzdGF0ID0gZmFsc2U7XG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xuXHRcdFx0XHRcdHByZXZpZXdzdGF0W1xuXHRcdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcblx0XHRcdFx0XHRcdFx0LmF0dHIoJ2lkJylcblx0XHRcdFx0XHRdID0ge1xuXHRcdFx0XHRcdFx0Y2xpZW50OiBzdGF0LFxuXHRcdFx0XHRcdFx0c2VydmVyOiBzdGF0LFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxuXHRcdFx0XHR2YXIgY3VyU3RhdGUgPSBmYWxzZTtcblxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXG5cdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Y3VyU3RhdGUgIT1cblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcblx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXG5cdFx0XHRcdFx0XVsnc2VydmVyJ11cblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcblx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXG5cdFx0XHRcdFx0XVsnY2xpZW50J10gPSBjdXJTdGF0ZTtcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcblx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXG5cdFx0XHRcdFx0XVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRwcmV2aWV3c3RhdFtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuQ29tcExpbmUnKVxuXHRcdFx0XHRcdFx0XHRcdC5hdHRyKCdpZCcpXG5cdFx0XHRcdFx0XHRdWydjbGllbnQnXSA9PSBmYWxzZSAmJlxuXHRcdFx0XHRcdFx0JCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcblx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuQ29tcExpbmVfRXhwYW5kJylcblx0XHRcdFx0XHRcdFx0LmhlaWdodCgwKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRcdFx0cHJldmlld3N0YXRbXG5cdFx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0XHQuY2xvc2VzdCgnLkNvbXBMaW5lJylcblx0XHRcdFx0XHRcdFx0XHQuYXR0cignaWQnKVxuXHRcdFx0XHRcdFx0XVsnY2xpZW50J10gPT0gdHJ1ZSAmJlxuXHRcdFx0XHRcdFx0ISQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJylcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0Ly8gc2V0IGV2ZW50c1xuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcblx0XHRcdCQoJy5Db21wTGluZUV4cGFuZGFibGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIGlmIG9wZW5cblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRzdGF0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGFkZCByb3dcblx0XHRcdFx0cHJldmlld3N0YXRbXG5cdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5Db21wTGluZScpXG5cdFx0XHRcdFx0XHQuYXR0cignaWQnKVxuXHRcdFx0XHRdID0ge1xuXHRcdFx0XHRcdGNsaWVudDogc3RhdCxcblx0XHRcdFx0XHRzZXJ2ZXI6IHN0YXQsXG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gYWRkIGNsaWNrIGV2ZW50c1xuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykudW5iaW5kKCdjbGljaycpO1xuXHRcdFx0JCgnLkNvbXBMaW5lX19leHBhbmRJY29uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMucGFyZW50RWxlbWVudCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cblx0XHRcdCQoJy5Db21wTGluZV9oZWFkTGluZSBpbnB1dCwgLkNvbXBMaW5lX2hlYWRMaW5lIHNlbGVjdCwgLkNvbXBMaW5lX2hlYWRMaW5lIGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyByZW1vdmUgdW5lY2Vzc2FyeSBiZWhhdmlvcnNcblxuXHRcdFx0Ly8gZXZlbnQgYWpheFxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcblx0XHR9O1xuXHR9XG5cblx0Y29uc3QgY3JlYXRlID0gKCkgPT4ge1xuXHRcdFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZSA9IG5ldyBTZWN0aW9uQ29tcGxpbmUoKTtcblx0XHRTaWxrVUkuRXhlY3V0ZShTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUuaW5pdCwgJ0Vycm9yIG9uIFNhcHBoaXJldjJfUGF0dGVycy9Db21wTGluZScpO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5Db21wTGluZSA9IHsgY3JlYXRlIH07XG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgY2xhc3MgRGF0YVRhYmxlcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgdGhpcy4kd2lkZ2V0ID0gJChgIyR7Y29uZmlnLndpZGdldElkfWApO1xuICAgICAgdGhpcy4kdGFibGUgPSB0aGlzLiR3aWRnZXQuZmluZCgndGFibGUnKTtcbiAgICAgIHRoaXMuJHRhYmxlLmFkZENsYXNzKGNvbmZpZy5iYXNlU3R5bGUpO1xuICAgICAgdGhpcy5vbkluaXQoKTtcbiAgICB9XG5cbiAgICBvbkluaXQoKSB7XG5cbiAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICAgIGZpeGVkQ29sdW1uczogdHJ1ZSxcbiAgICAgICAgaW5mbzogZmFsc2UsXG4gICAgICAgIG9yZGVyaW5nOiBmYWxzZSxcbiAgICAgICAgcGFnaW5nOiBmYWxzZSxcbiAgICAgICAgc2Nyb2xsQ29sbGFwc2U6IHRydWUsXG4gICAgICAgIHNjcm9sbFg6IHRydWUsXG4gICAgICAgIHNlYXJjaGluZzogZmFsc2UsXG4gICAgICB9XG5cbiAgICAgICQoKCkgPT4ge1xuICAgICAgICB0aGlzLiR0YWJsZS5EYXRhVGFibGUodGhpcy5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgY29uc3QgY3JlYXRlID0gY29uZmlnID0+ICh3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBEYXRhVGFibGVzKGNvbmZpZykpO1xuXG4gIFNhcHBoaXJlV2lkZ2V0cy5EYXRhVGFibGVzID0ge1xuICAgIGNyZWF0ZVxuICB9O1xuXG59KSgpOyIsIi8qIENvbXBvbmVudCBEYXRlVGltZVJhbmdlUGlja2VyICovXHJcbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XHJcblx0dmFyIGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzID0gW107XHJcblxyXG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChhbGxEYXRlVGltZVJhbmdlUGlja2Vyc1tpXS5jb25maWcud2lkZ2V0SWQgPT09IGNvbmZpZy53aWRnZXRJZCkge1xyXG5cdFx0XHRcdGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgRGF0ZVRpbWVSYW5nZVBpY2tlcihjb25maWcpO1xyXG5cdFx0YWxsRGF0ZVRpbWVSYW5nZVBpY2tlcnMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XHJcblx0fTtcclxuXHJcblx0dmFyIERhdGVUaW1lUmFuZ2VQaWNrZXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuXHRcdHRoaXMuY3VycmVudExvY2FsZSA9IGNvbmZpZy5jdXJyZW50TG9jYWxlO1xyXG5cclxuXHRcdHRoaXMuJHdpZGdldCA9ICQoJyMnICsgY29uZmlnLndpZGdldElkKTtcclxuXHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnRGF0ZVRpbWVSYW5nZVBpY2tlcicpO1xyXG5cdFx0dGhpcy4kY2xlYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2xlYXInKTtcclxuXHRcdHRoaXMuJGxhYmVsID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWxhYmVsJyk7XHJcblxyXG5cdFx0dGhpcy5pc0VtcHR5SG91ciA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5hZGRDbGFzcygnYXR0YWNoZWRJbnB1dCcpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dCA9IHRoaXMuJHdpZGdldC5maW5kKFxyXG5cdFx0XHRcdCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1wbGFjZWhvbGRlciBpbnB1dFt0eXBlPVwidGV4dFwiXSdcclxuXHRcdFx0KTtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkID0gdGhpcy4kd2lkZ2V0LmZpbmQoXHJcblx0XHRcdFx0Jy5EYXRlVGltZVJhbmdlUGlja2VyLWRpc3BsYXllZCBpbnB1dFt0eXBlPVwidGV4dFwiXSdcclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKCF0aGlzLmNvbmZpZy5hbGxvd3NUeXBpbmcpIHtcclxuXHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQucHJvcCgncmVhZG9ubHknLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kaW5wdXQgPSAkKCcjJyArIGNvbmZpZy5pbnB1dElkKTtcclxuXHRcdFx0aWYgKCF0aGlzLmNvbmZpZy5hbGxvd3NUeXBpbmcpIHtcclxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScsIHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudExvY2FsZSA9PT0gJ0FSJykge1xyXG5cdFx0XHRtb21lbnQubG9jYWxlKCdhci1rdycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBvcHRpb25zID0ge307XHJcblx0XHRvcHRpb25zLnN0YXJ0RGF0ZSA9IGNvbmZpZy5zdGFydERhdGU7XHJcblx0XHRvcHRpb25zLnNpbmdsZURhdGVQaWNrZXIgPSBjb25maWcuc2luZ2xlRGF0ZVBpY2tlcjtcclxuXHRcdG9wdGlvbnMuYXV0b0FwcGx5ID0gY29uZmlnLmF1dG9BcHBseTtcclxuXHRcdG9wdGlvbnMuYXV0b1VwZGF0ZUlucHV0ID0gY29uZmlnLmF1dG9VcGRhdGVJbnB1dDtcclxuXHRcdG9wdGlvbnMudGltZVBpY2tlciA9IGNvbmZpZy50aW1lUGlja2VyO1xyXG5cdFx0b3B0aW9ucy50aW1lUGlja2VyMjRIb3VyID0gY29uZmlnLnRpbWVQaWNrZXIyNEhvdXI7XHJcblx0XHRvcHRpb25zLnRpbWVQaWNrZXJJbmNyZW1lbnQgPSBjb25maWcudGltZVBpY2tlckluY3JlbWVudDtcclxuXHRcdG9wdGlvbnMuc2hvd0Ryb3Bkb3ducyA9IGNvbmZpZy5oYXNEcm9wZG93bnM7XHJcblx0XHRvcHRpb25zLmRyb3BzID0gY29uZmlnLmRyb3BzO1xyXG5cdFx0b3B0aW9ucy5vcGVucyA9IGNvbmZpZy5vcGVucztcclxuXHJcblx0XHR2YXIgc3RyaW5nQ29ubmVjdGlvbiA9ICdbLCBhdF0nO1xyXG5cclxuXHRcdGlmIChjb25maWcudGltZVBpY2tlcikge1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZIEhIOk1NJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWSBISDpNTScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChvcHRpb25zLnRpbWVQaWNrZXIyNEhvdXIpIHtcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCA9ICdERC1NTS1ZWVlZIEhIOm1tJztcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1llYXJXaGVuVGV4dCA/XHJcblx0XHRcdFx0XHQnRCBNTU0gWVlZWScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBISDptbScgOlxyXG5cdFx0XHRcdFx0J0QgTU1NJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIEhIOm1tJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRJbnB1dCA9ICdERC1NTS1ZWVlZIGhoOm1tIEEnO1xyXG5cdFx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzWWVhcldoZW5UZXh0ID9cclxuXHRcdFx0XHRcdCdEIE1NTSBZWVlZJyArIHN0cmluZ0Nvbm5lY3Rpb24gKyAnIGhoOm1tIEEnIDpcclxuXHRcdFx0XHRcdCdEIE1NTScgKyBzdHJpbmdDb25uZWN0aW9uICsgJyBoaDptbSBBJztcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmFkZENsYXNzKCdvbmx5RGF0ZScpO1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMuJGRpc3BsYXllZC5wcm9wKCdwbGFjZWhvbGRlcicsICdERC1NTS1ZWVlZJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQucHJvcCgncGxhY2Vob2xkZXInLCAnREQtTU0tWVlZWScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY29uZmlnLmZvcm1hdElucHV0ID0gJ0RELU1NLVlZWVknO1xyXG5cdFx0XHR0aGlzLmNvbmZpZy5mb3JtYXRMYWJlbCA9IHRoaXMuY29uZmlnLmhhc1llYXJXaGVuVGV4dCA/XHJcblx0XHRcdFx0J0QgTU1NIFlZWVknIDpcclxuXHRcdFx0XHQnRCBNTU0nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29uZmlnLmZvcm1hdExhYmVsID0gdGhpcy5jb25maWcuaGFzV2Vla0RheU5hbWVXaGVuVGV4dCA/XHJcblx0XHRcdCdkZGRbLCBdJyArIHRoaXMuY29uZmlnLmZvcm1hdExhYmVsIDpcclxuXHRcdFx0dGhpcy5jb25maWcuZm9ybWF0TGFiZWw7XHJcblxyXG5cdFx0b3B0aW9ucy5sb2NhbGUgPSB7XHJcblx0XHRcdGRpcmVjdGlvbjogY29uZmlnLmN1cnJlbnRMb2NhbGUgPT09ICdBUicgPyAncnRsJyA6ICdsdHInLFxyXG5cdFx0XHRmb3JtYXQ6IHRoaXMuY29uZmlnLmZvcm1hdElucHV0LFxyXG5cdFx0XHRjYW5jZWxMYWJlbDogJ0NhbmNlbCcsXHJcblx0XHRcdGFwcGx5TGFiZWw6ICdBcHBseScsXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmIChjb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy4kd2lkZ2V0LmFkZENsYXNzKCd0ZXh0VHJpZ2dlcicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuZW5kRGF0ZSAmJiBjb25maWcuZW5kRGF0ZSAhPT0gJzAxLTAxLTE5MDAgMDA6MDA6MDAnKSB7XHJcblx0XHRcdG9wdGlvbnMuZW5kRGF0ZSA9IGNvbmZpZy5lbmREYXRlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNvbmZpZy5tYXhEYXRlICYmIGNvbmZpZy5tYXhEYXRlICE9PSAnMDEtMDEtMTkwMCAwMDowMDowMCcpIHtcclxuXHRcdFx0b3B0aW9ucy5tYXhEYXRlID0gY29uZmlnLm1heERhdGU7XHJcblx0XHR9XHJcblx0XHRpZiAoY29uZmlnLm1pbkRhdGUgJiYgY29uZmlnLm1pbkRhdGUgIT09ICcwMS0wMS0xOTAwIDAwOjAwOjAwJykge1xyXG5cdFx0XHRvcHRpb25zLm1pbkRhdGUgPSBjb25maWcubWluRGF0ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29uZmlnLkRpc2FibGVkV2Vla0RheXMpIHtcclxuXHRcdFx0dmFyIGRpc2FibGVkV2Vla0RheXMgPSBjb25maWcuRGlzYWJsZWRXZWVrRGF5cy5zcGxpdCgnLCcpO1xyXG5cdFx0XHRvcHRpb25zLmlzSW52YWxpZERhdGUgPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG5cdFx0XHRcdHJldHVybiBkaXNhYmxlZFdlZWtEYXlzLmluY2x1ZGVzKFxyXG5cdFx0XHRcdFx0bW9tZW50KGRhdGUpXHJcblx0XHRcdFx0XHQuZGF5KClcclxuXHRcdFx0XHRcdC50b1N0cmluZygpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLiRpbnB1dC5kYXRlcmFuZ2VwaWNrZXIob3B0aW9ucywgZnVuY3Rpb24gKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgbGFiZWwpIHtcclxuXHRcdFx0Ly8gYWZ0ZXIgYSBzZWxlY3Rpb24gaXMgbWFkZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gbm93IHdlIGhhdmUgYSBwcm9wZXIgaW5zdGFuY2VcclxuXHRcdHRoaXMucGlja2VyID0gdGhpcy4kaW5wdXQuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJyk7XHJcblxyXG5cdFx0dGhpcy4kY2FsZW5kYXIgPSAkKHRoaXMucGlja2VyLmNvbnRhaW5lcik7XHJcblxyXG5cdFx0aWYgKCEhdGhpcy5jb25maWcuY3NzQ2xhc3MpIHtcclxuXHRcdFx0dGhpcy4kY2FsZW5kYXIuYWRkQ2xhc3ModGhpcy5jb25maWcuY3NzQ2xhc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuJHRpbWVIb2xkZXIgPSB0aGlzLiRjYWxlbmRhci5maW5kKCcuY2FsZW5kYXItdGltZScpO1xyXG5cdFx0dGhpcy4kYnV0dG9uc0hvbGRlciA9IHRoaXMuJGNhbGVuZGFyLmZpbmQoJy5kcnAtYnV0dG9ucycpO1xyXG5cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5hdXRvQXBwbHkpIHtcclxuXHRcdFx0dGhpcy4kYnV0dG9uc0hvbGRlci5oaWRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbmZpZy5pc0VtcHR5U3RhcnREYXRlKSB7XHJcblx0XHRcdHRoaXMuY2xlYXIoZmFsc2UpO1xyXG5cdFx0fSBlbHNlIGlmIChjb25maWcuaXNFbXB0eVN0YXJ0SG91cikge1xyXG5cdFx0XHR0aGlzLmlzRW1wdHlIb3VyID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb25maWcuZW5hYmxlZCkge1xyXG5cdFx0XHR0aGlzLm5hdGl2ZUV2ZW50cygpO1xyXG5cdFx0XHR0aGlzLmN1c3RvbUV2ZW50cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy4kY2xlYXIuaGlkZSgpO1xyXG5cdFx0XHR0aGlzLiRpbnB1dC5vZmYoJ2NsaWNrIGZvY3VzIGtleWRvd24ga2V5dXAnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHR0aGlzLmhhbmRsZUN1c3RvbVZhbGlkYXRpb24oKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oYW5kbGVDdXN0b21WYWxpZGF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVycm9yTWVzc2FnZSA9IHRoaXMuJGlucHV0Lm5leHQoKS50ZXh0KCk7XHJcblx0XHRpZiAoISFlcnJvck1lc3NhZ2UubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5hZGRDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZFxyXG5cdFx0XHRcdC5uZXh0KClcclxuXHRcdFx0XHQuc2hvdygpXHJcblx0XHRcdFx0LnRleHQoZXJyb3JNZXNzYWdlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5yZW1vdmVDbGFzcygnTm90X1ZhbGlkJyk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5uZXh0KCkuaGlkZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLm5hdGl2ZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignc2hvd0NhbGVuZGFyLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuaGFzR29Ub2RheSkge1xyXG5cdFx0XHRcdF90aGlzLiRjYWxlbmRhclxyXG5cdFx0XHRcdFx0LmZpbmQoJy5jYWxlbmRhci10YWJsZSB0aGVhZCB0cicpXHJcblx0XHRcdFx0XHQuZXEoMClcclxuXHRcdFx0XHRcdC5hZnRlcihcclxuXHRcdFx0XHRcdFx0Jzx0cj48dGQgY29sc3Bhbj1cIjdcIiBjbGFzcz1cIkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItZ290b2RheVwiPicgK1xyXG5cdFx0XHRcdFx0XHQnVG9kYXknICtcclxuXHRcdFx0XHRcdFx0JzwvdGQ+PC90cj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdGlmIChfdGhpcy5jb25maWcuZHJvcHMgPT09ICd1cCcpIHtcclxuXHRcdFx0XHRcdF90aGlzLiRjYWxlbmRhci5jc3MoJ3RvcCcsIF90aGlzLiRjYWxlbmRhci5vZmZzZXQoKS50b3AgLSAyNCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmhhbmRsZVZpZXdwb3J0UG9zaXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ3Nob3cuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy50aW1lUGlja2VyICYmIF90aGlzLmNvbmZpZy5oYXNDbGVhckhvdXIpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2FsZW5kYXJcclxuXHRcdFx0XHRcdC5maW5kKCcuY2FsZW5kYXItdGltZScpXHJcblx0XHRcdFx0XHQuYXBwZW5kKCc8c3BhbiBjbGFzcz1cIkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXJcIj48L3NwYW4+Jyk7XHJcblx0XHRcdFx0aWYgKF90aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAwLjUpO1xyXG5cdFx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHRcdC5maW5kKCcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicpXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuaGFuZGxlVmlld3BvcnRQb3NpdGlvbigpO1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuRGF0ZVRpbWVSYW5nZVBpY2tlci5vcGVuZWRXaWRnZXRJZCA9IF90aGlzLmNvbmZpZy53aWRnZXRJZDtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2hpZGUuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyJykucmVtb3ZlKCk7XHJcblx0XHRcdF90aGlzLnVwZGF0ZVBhcmVudElmcmFtZSgpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignY2FuY2VsLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbignb3V0c2lkZUNsaWNrLmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7fSk7XHJcblx0XHR0aGlzLiRpbnB1dC5vbigndGltZWNoYW5nZWQuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0X3RoaXMuaXNFbXB0eUhvdXIgPSBmYWxzZTtcclxuXHRcdFx0X3RoaXMuJHRpbWVIb2xkZXIuY3NzKCdvcGFjaXR5JywgMSk7XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuaGFzQ2xlYXJIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyXHJcblx0XHRcdFx0XHQuZmluZCgnLmNhbGVuZGFyLXRpbWUnKVxyXG5cdFx0XHRcdFx0LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJEYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWNsZWFyXCI+PC9zcGFuPicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChfdGhpcy5jb25maWcuYXV0b0FwcGx5KSB7XHJcblx0XHRcdFx0X3RoaXMuJGNsZWFyLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHRcdF90aGlzLnVwZGF0ZUxhYmVsaW5nKCk7XHJcblx0XHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGlucHV0Lm9uKCdjbGlja0RhdGUuZGF0ZXJhbmdlcGlja2VyJywgZnVuY3Rpb24gKGV2ZW50LCBwaWNrZXIpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy5hdXRvQXBwbHkpIHtcclxuXHRcdFx0XHRfdGhpcy4kY2xlYXIucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0XHRfdGhpcy5zZW5kTm90aWZpY2F0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kaW5wdXQub24oJ2FwcGx5LmRhdGVyYW5nZXBpY2tlcicsIGZ1bmN0aW9uIChldmVudCwgcGlja2VyKSB7XHJcblx0XHRcdF90aGlzLiRjbGVhci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdFx0X3RoaXMudXBkYXRlTGFiZWxpbmcoKTtcclxuXHRcdFx0X3RoaXMuc2VuZE5vdGlmaWNhdGlvbigpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY3VzdG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuJGxhYmVsLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0X3RoaXMucGlja2VyLnRvZ2dsZSgpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLiRjbGVhci5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHRcdF90aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuJGNhbGVuZGFyLm9uKCdjbGljaycsICcuRGF0ZVRpbWVSYW5nZVBpY2tlci1jYWxlbmRhci1jbGVhcicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKF90aGlzLmNvbmZpZy50aW1lUGlja2VyMjRIb3VyKSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5ob3Vyc2VsZWN0JykudmFsKCcwJykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0X3RoaXMuJGNhbGVuZGFyLmZpbmQoJy5ob3Vyc2VsZWN0JykudmFsKCcxMicpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcubWludXRlc2VsZWN0JykudmFsKCcwJykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdF90aGlzLiRjYWxlbmRhci5maW5kKCcuYW1wbXNlbGVjdCcpLnZhbCgnQU0nKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0X3RoaXMuaXNFbXB0eUhvdXIgPSB0cnVlO1xyXG5cdFx0XHRfdGhpcy4kdGltZUhvbGRlci5jc3MoJ29wYWNpdHknLCAwLjUpO1xyXG5cdFx0XHRfdGhpcy4kY2FsZW5kYXIuZmluZCgnLkRhdGVUaW1lUmFuZ2VQaWNrZXItY2FsZW5kYXItY2xlYXInKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy4kY2FsZW5kYXIub24oJ2NsaWNrJywgJy5EYXRlVGltZVJhbmdlUGlja2VyLWNhbGVuZGFyLWdvdG9kYXknLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdF90aGlzLnBpY2tlci5zZXRTdGFydERhdGUobW9tZW50KCkpO1xyXG5cdFx0XHRfdGhpcy5waWNrZXIuc2V0RW5kRGF0ZShtb21lbnQoKSk7XHJcblx0XHRcdF90aGlzLnBpY2tlci5oaWRlKCk7XHJcblx0XHRcdGlmICghX3RoaXMuY29uZmlnLmF1dG9VcGRhdGVJbnB1dCB8fCBfdGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIgfHwgX3RoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0XHRfdGhpcy51cGRhdGVMYWJlbGluZygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLnNlbmROb3RpZmljYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmF0dGFjaFRvSW5wdXQpIHtcclxuXHRcdFx0dGhpcy4kZGlzcGxheWVkLm9uKCdjbGljayBmb2N1cycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRfdGhpcy4kaW5wdXQudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuJGRpc3BsYXllZC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZXZ0KSB7XHJcblx0XHRcdFx0X3RoaXMuJGlucHV0LnZhbChfdGhpcy4kZGlzcGxheWVkLnZhbCgpKS50cmlnZ2VyKCdrZXl1cCcpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGlucHV0Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRfdGhpcy51cGRhdGVQYXJlbnRJZnJhbWUoKTtcclxuXHRcdFx0XHR9LCA1MCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLnVwZGF0ZUxhYmVsaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGxhYmVsTWFzayA9IHRoaXMuY29uZmlnLmZvcm1hdExhYmVsO1xyXG5cdFx0dmFyIGlucHV0TWFzayA9IHRoaXMuY29uZmlnLmZvcm1hdElucHV0O1xyXG5cdFx0aWYgKG1vbWVudCh0aGlzLnBpY2tlci5zdGFydERhdGUpLmlzU2FtZShtb21lbnQoKSwgJ2RheScpKSB7XHJcblx0XHRcdGlmIChsYWJlbE1hc2suaW5jbHVkZXMoJ0QgTU1NIFlZWVknKSkge1xyXG5cdFx0XHRcdGxhYmVsTWFzayA9IGxhYmVsTWFzay5yZXBsYWNlKCdEIE1NTSBZWVlZJywgJ1tUb2RheV0nKTtcclxuXHRcdFx0fSBlbHNlIGlmIChsYWJlbE1hc2suaW5jbHVkZXMoJ0QgTU1NJykpIHtcclxuXHRcdFx0XHRsYWJlbE1hc2sgPSBsYWJlbE1hc2sucmVwbGFjZSgnRCBNTU0nLCAnW1RvZGF5XScpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdTb21ldGhpbmcgd3Jvbmcgd2l0aCB0aGUgbGFiZWxNYXNrJywgbGFiZWxNYXNrKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuaXNFbXB0eUhvdXIpIHtcclxuXHRcdFx0bGFiZWxNYXNrID0gbGFiZWxNYXNrXHJcblx0XHRcdFx0LnJlcGxhY2UoJ2hoOm1tIEEnLCAnWy0tOi0tXScpXHJcblx0XHRcdFx0LnJlcGxhY2UoJ0hIOm1tJywgJ1stLTotLV0nKTtcclxuXHRcdFx0aW5wdXRNYXNrID0gaW5wdXRNYXNrXHJcblx0XHRcdFx0LnJlcGxhY2UoJ2hoOm1tIEEnLCAnWy0tOi0tXScpXHJcblx0XHRcdFx0LnJlcGxhY2UoJ0hIOm1tJywgJ1stLTotLV0nKTtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdFx0dGhpcy4kbGFiZWwuaHRtbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KGxhYmVsTWFzaykpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoXHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgWzAwOjAwOjAwXScpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWScpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVkgWzAwOjAwOjAwXScpKTtcclxuXHRcdFx0XHRpZiAodGhpcy5jb25maWcuYXR0YWNoVG9JbnB1dCkge1xyXG5cdFx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KGlucHV0TWFzaykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmhhc1RleHRUcmlnZ2VyKSB7XHJcblx0XHRcdFx0dGhpcy4kbGFiZWwuaHRtbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KGxhYmVsTWFzaykpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwodGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBISDptbTpzcycpKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0XHR0aGlzLiRkaXNwbGF5ZWQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcuZm9ybWF0SW5wdXQpKTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdERC1NTS1ZWVlZIEhIOm1tOnNzJykpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy4kaW5wdXQudmFsKHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuJGlucHV0LnZhbCh0aGlzLnBpY2tlci5zdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLmZvcm1hdElucHV0KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuaGFuZGxlVmlld3BvcnRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh3aW5kb3cuZnJhbWVFbGVtZW50ICYmICgkKHdpbmRvdy5mcmFtZUVsZW1lbnQucGFyZW50RWxlbWVudCkuaGFzQ2xhc3MoJ3Rvb2x0aXBzdGVyLWNvbnRlbnQnKSB8fCAkKHdpbmRvdy5mcmFtZUVsZW1lbnQucGFyZW50RWxlbWVudCkuaGFzQ2xhc3MoJ29zLWludGVybmFsLXVpLWRpYWxvZy1jb250ZW50JykpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaXNJblZpZXdwb3J0KCkpIHtcclxuXHRcdFx0dmFyIGNvb3JkcyA9IHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRpZiAodGhpcy4kY2FsZW5kYXIuaGFzQ2xhc3MoJ2Ryb3AtdXAnKSAmJiB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPCAwKSB7XHJcblx0XHRcdFx0dmFyIHBvaW50ID0gd2luZG93LnNjcm9sbFkgKyBjb29yZHMuYm90dG9tICsgdGhpcy4kaW5wdXQuaGVpZ2h0KCkgKyA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyLnJlbW92ZUNsYXNzKCdkcm9wLXVwJykuYWRkQ2xhc3MoJ2Ryb3AtZG93bicpLmNzcygndG9wJywgcG9pbnQpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCF0aGlzLiRjYWxlbmRhci5oYXNDbGFzcygnZHJvcC11cCcpICYmIHRoaXMuJGNhbGVuZGFyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSA+ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkpIHtcclxuXHRcdFx0XHR2YXIgcG9pbnQgPSB3aW5kb3cuc2Nyb2xsWSArIGNvb3Jkcy50b3AgLSBjb29yZHMuaGVpZ2h0IC0gdGhpcy4kaW5wdXQuaGVpZ2h0KCkgLSA3O1xyXG5cdFx0XHRcdHRoaXMuJGNhbGVuZGFyLmFkZENsYXNzKCdkcm9wLXVwJykuY3NzKCd0b3AnLCBwb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5pc0luVmlld3BvcnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYm91bmRpbmcgPSB0aGlzLiRjYWxlbmRhclswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHJldHVybiAoYm91bmRpbmcudG9wID49IDAgJiYgYm91bmRpbmcuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKyA1IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKyA1KSk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoc2VuZE5vdGlmaWNhdGlvbikge1xyXG5cdFx0dGhpcy5waWNrZXIuc2V0U3RhcnREYXRlKG1vbWVudCgpKTtcclxuXHRcdHRoaXMucGlja2VyLnNldEVuZERhdGUobW9tZW50KCkpO1xyXG5cdFx0dGhpcy5pc0VtcHR5SG91ciA9IGZhbHNlO1xyXG5cdFx0dGhpcy4kY2xlYXIuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRpZiAodGhpcy5jb25maWcuaGFzVGV4dFRyaWdnZXIpIHtcclxuXHRcdFx0dGhpcy4kbGFiZWwuaHRtbCgnLS0gLS0gLS0nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuJGlucHV0LnZhbCgnJyk7XHJcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5hdHRhY2hUb0lucHV0KSB7XHJcblx0XHRcdFx0dGhpcy4kZGlzcGxheWVkLnZhbCgnJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChzZW5kTm90aWZpY2F0aW9uIHx8IHNlbmROb3RpZmljYXRpb24gPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuc2VuZE5vdGlmaWNhdGlvbihmYWxzZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMucGlja2VyLnNob3coKTtcclxuXHR9O1xyXG5cclxuXHREYXRlVGltZVJhbmdlUGlja2VyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5waWNrZXIuaGlkZSgpO1xyXG5cdH07XHJcblxyXG5cdERhdGVUaW1lUmFuZ2VQaWNrZXIucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMucGlja2VyLmNsaWNrQ2FuY2VsKCk7XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUuc2VuZE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uIChzZW5kRGF0ZSkge1xyXG5cdFx0aWYgKHRoaXMuJHdpZGdldC5oYXNDbGFzcygnYXR0YWNoZWRJbnB1dCcpKSB7XHJcblx0XHRcdHRoaXMuJGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoc2VuZERhdGUgfHwgc2VuZERhdGUgPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzRW1wdHlIb3VyKSB7XHJcblx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHR0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLFxyXG5cdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBbMDA6MDA6MDBdJykgK1xyXG5cdFx0XHRcdFx0J3wnICtcclxuXHRcdFx0XHRcdHRoaXMuaXNFbXB0eUhvdXJcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy50aW1lUGlja2VyKSB7XHJcblx0XHRcdFx0XHRPc05vdGlmeVdpZGdldChcclxuXHRcdFx0XHRcdFx0dGhpcy5jb25maWcuZGF0ZVRpbWVSYW5nZVBpY2tlckZha2VOb3RpZnlJZCxcclxuXHRcdFx0XHRcdFx0dGhpcy5waWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnREQtTU0tWVlZWSBISDptbTpzcycpICtcclxuXHRcdFx0XHRcdFx0J3wnICtcclxuXHRcdFx0XHRcdFx0dGhpcy5pc0VtcHR5SG91clxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0T3NOb3RpZnlXaWRnZXQoXHJcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLmRhdGVUaW1lUmFuZ2VQaWNrZXJGYWtlTm90aWZ5SWQsXHJcblx0XHRcdFx0XHRcdHRoaXMucGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ0RELU1NLVlZWVknKSArICd8JyArIHRoaXMuaXNFbXB0eUhvdXJcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRPc05vdGlmeVdpZGdldCh0aGlzLmNvbmZpZy5kYXRlVGltZVJhbmdlUGlja2VyRmFrZU5vdGlmeUlkLCAnbnVsbHx0cnVlJyk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0RGF0ZVRpbWVSYW5nZVBpY2tlci5wcm90b3R5cGUudXBkYXRlUGFyZW50SWZyYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHR5cGVvZiBTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lLnJlc2l6ZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCQoJy5QYWdlLkxheW91dFBvcHVwJykubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5MYXlvdXRQb3B1cC5yZWRyYXdEaWFsb2dXaW5kb3coKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5EYXRlVGltZVJhbmdlUGlja2VyID0ge1xyXG5cdFx0Y3JlYXRlOiBjcmVhdGUsXHJcblx0XHRhbGw6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGFsbERhdGVUaW1lUmFuZ2VQaWNrZXJzO1xyXG5cdFx0fSxcclxuXHR9O1xyXG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IERyb3Bkb3duQ2F0ZWdvcmllcyAqL1xuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdGZ1bmN0aW9uIG9wdEdyb3VwU2V0VmFsdWUoc2VsZWN0SWQsIGlucHV0Qm94SWQsIGJ1dHRvbklkKSB7XG5cdFx0dmFyIHYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RJZCkudmFsdWU7XG5cdFx0JCgnIycgKyBpbnB1dEJveElkKS52YWwodik7XG5cdFx0JCgnIycgKyBzZWxlY3RJZCArICcgb3B0aW9uW3NlbGVjdGVkXScpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XG5cblx0XHRpZiAodiA+IC0xKSB7XG5cdFx0XHQkKCcjJyArIHNlbGVjdElkICsgJyBvcHRpb25bdmFsdWU9XCInICsgdiArICdcIl0nKS5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuXHRcdH1cblxuXHRcdCQoJyMnICsgYnV0dG9uSWQpLmNsaWNrKCk7XG5cdFx0JCgnI3MyaWRfJyArIHNlbGVjdElkKS5yZW1vdmVDbGFzcygnc2VsZWN0Mi1jb250YWluZXItYWN0aXZlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBPc0N1c3RvbVZhbGlkYXRvck9wdEdyb3VwKGEsIGIpIHtcblx0XHR2YXIgX2UgPSAkKCcjJyArIGEuY29udHJvbHRvdmFsaWRhdGUpO1xuXHRcdHZhciBpc1ZhbGlkID0gX2UuZmluZCgnb3B0aW9uW3NlbGVjdGVkXScpLmxlbmd0aDtcblx0XHR2YXIgaGFzU2libGluZ19NYW5kYXRvcnlTZWxlY3QyID0gX2UucHJldignZGl2LnNlbGVjdDItY29udGFpbmVyLk1hbmRhdG9yeScpLmxlbmd0aDtcblxuXHRcdGlmIChoYXNTaWJsaW5nX01hbmRhdG9yeVNlbGVjdDIpIHtcblx0XHRcdGlmIChpc1ZhbGlkKSB7XG5cdFx0XHRcdF9lLnByZXYoJ2Rpdi5zZWxlY3QyLWNvbnRhaW5lci5NYW5kYXRvcnknKS5yZW1vdmVDbGFzcygnTm90X1ZhbGlkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfZS5wcmV2KCdkaXYuc2VsZWN0Mi1jb250YWluZXIuTWFuZGF0b3J5JykuYWRkQ2xhc3MoJ05vdF9WYWxpZCcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBpc1ZhbGlkO1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkT3B0R3JvdXBWYWxpZGF0b3Iob3B0R3JvdXBFbGVtZW50SWQpIHtcblx0XHRPc1BhZ2VfVmFsaWRhdG9ycy5wdXNoKHtcblx0XHRcdGNvbnRyb2x0b3ZhbGlkYXRlOiBvcHRHcm91cEVsZW1lbnRJZCxcblx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHRlcnJvcm1lc3NhZ2U6ICdSZXF1aXJlZCBmaWVsZCEnLFxuXHRcdFx0ZXZhbHVhdGlvbmZ1bmN0aW9uOiAnU2FwcGhpcmVXaWRnZXRzLkRyb3Bkb3duQ2F0ZWdvcmllcy5Pc0N1c3RvbVZhbGlkYXRvck9wdEdyb3VwJyxcblx0XHRcdGluaXRpYWx2YWx1ZTogJycsXG5cdFx0XHRpc3ZhbGlkOiB0cnVlLFxuXHRcdH0pO1xuXHR9XG5cblx0U2FwcGhpcmVXaWRnZXRzLkRyb3Bkb3duQ2F0ZWdvcmllcyA9IHtcblx0XHRvcHRHcm91cFNldFZhbHVlLFxuXHRcdE9zQ3VzdG9tVmFsaWRhdG9yT3B0R3JvdXAsXG5cdFx0YWRkT3B0R3JvdXBWYWxpZGF0b3IsXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcbiIsIi8qIENvbXBvbmVudCBEcm9wem9uZSAoUGx1Z2luKSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uKCkge1xuXHRmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuXHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuXHRcdFx0ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuXHRcdFx0aWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcblx0XHRpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuXHRcdGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuXHRcdHJldHVybiBDb25zdHJ1Y3Rvcjtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcblx0aWYgKCFzZWxmKSB7XG5cdFx0dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuXHR9XG5cdHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGNhbGwgPT09ICdmdW5jdGlvbicpID8gY2FsbCA6IHNlbGY7XG59XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuXHRpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTtcblx0fVxuXHRzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcblx0XHRjb25zdHJ1Y3Rvcjoge1xuXHRcdFx0dmFsdWU6IHN1YkNsYXNzLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHR9LFxuXHR9KTtcblx0aWYgKHN1cGVyQ2xhc3MpXG5cdFx0T2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IChzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzKTtcbn1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuXHRpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpO1xuXHR9XG59XG5cbi8qXG4gKlxuICogTW9yZSBpbmZvIGF0IFt3d3cuZHJvcHpvbmVqcy5jb21dKGh0dHA6Ly93d3cuZHJvcHpvbmVqcy5jb20pXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyLCBNYXRpYXMgTWVub1xuICpcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICpcbiAqL1xuXG4vLyBUaGUgRW1pdHRlciBjbGFzcyBwcm92aWRlcyB0aGUgYWJpbGl0eSB0byBjYWxsIGAub24oKWAgb24gRHJvcHpvbmUgdG8gbGlzdGVuXG4vLyB0byBldmVudHMuXG4vLyBJdCBpcyBzdHJvbmdseSBiYXNlZCBvbiBjb21wb25lbnQncyBlbWl0dGVyIGNsYXNzLCBhbmQgSSByZW1vdmVkIHRoZVxuLy8gZnVuY3Rpb25hbGl0eSBiZWNhdXNlIG9mIHRoZSBkZXBlbmRlbmN5IGhlbGwgd2l0aCBkaWZmZXJlbnQgZnJhbWV3b3Jrcy5cbnZhciBFbWl0dGVyID0gKGZ1bmN0aW9uKCkge1xuXHRmdW5jdGlvbiBFbWl0dGVyKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFbWl0dGVyKTtcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhFbWl0dGVyLCBbXG5cdFx0e1xuXHRcdFx0a2V5OiAnb24nLFxuXG5cdFx0XHQvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50XG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblx0XHRcdFx0Ly8gQ3JlYXRlIG5hbWVzcGFjZSBmb3IgdGhpcyBldmVudFxuXHRcdFx0XHRpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudF0pIHtcblx0XHRcdFx0XHR0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzW2V2ZW50XS5wdXNoKGZuKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0a2V5OiAnZW1pdCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW1pdChldmVudCkge1xuXHRcdFx0XHR0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cdFx0XHRcdHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG5cdFx0XHRcdGlmIChjYWxsYmFja3MpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRcdFx0XHRcdGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yID0gY2FsbGJhY2tzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheSA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdF9pID0gMCxcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjtcblxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pLmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmID0gX2kudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBjYWxsYmFjayA9IF9yZWY7XG5cblx0XHRcdFx0XHRcdGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyIGZvciBnaXZlbiBldmVudC4gSWYgZm4gaXMgbm90IHByb3ZpZGVkLCBhbGwgZXZlbnRcblx0XHRcdC8vIGxpc3RlbmVycyBmb3IgdGhhdCBldmVudCB3aWxsIGJlIHJlbW92ZWQuIElmIG5laXRoZXIgaXMgcHJvdmlkZWQsIGFsbFxuXHRcdFx0Ly8gZXZlbnQgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cblx0XHR9LFxuXHRcdHtcblx0XHRcdGtleTogJ29mZicsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50LCBmbikge1xuXHRcdFx0XHRpZiAoIXRoaXMuX2NhbGxiYWNrcyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5fY2FsbGJhY2tzID0ge307XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBzcGVjaWZpYyBldmVudFxuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblx0XHRcdFx0aWYgKCFjYWxsYmFja3MpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcblx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldO1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjayA9PT0gZm4pIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0fSxcblx0XSk7XG5cblx0cmV0dXJuIEVtaXR0ZXI7XG59KSgpO1xuXG52YXIgRHJvcHpvbmUgPSAoZnVuY3Rpb24oX0VtaXR0ZXIpIHtcblx0X2luaGVyaXRzKERyb3B6b25lLCBfRW1pdHRlcik7XG5cblx0X2NyZWF0ZUNsYXNzKERyb3B6b25lLCBudWxsLCBbXG5cdFx0e1xuXHRcdFx0a2V5OiAnaW5pdENsYXNzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbml0Q2xhc3MoKSB7XG5cdFx0XHRcdC8vIEV4cG9zaW5nIHRoZSBlbWl0dGVyIGNsYXNzLCBtYWlubHkgZm9yIHRlc3RzXG5cdFx0XHRcdHRoaXMucHJvdG90eXBlLkVtaXR0ZXIgPSBFbWl0dGVyO1xuXG5cdFx0XHRcdC8qXG4gICAgICAgVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSBldmVudHMgeW91IGNhbiByZWdpc3RlciBvbiBhIGRyb3B6b25lIG9iamVjdC5cbiAgICAgICAgWW91IGNhbiByZWdpc3RlciBhbiBldmVudCBoYW5kbGVyIGxpa2UgdGhpczpcbiAgICAgICAgZHJvcHpvbmUub24oXCJkcmFnRW50ZXJcIiwgZnVuY3Rpb24oKSB7IH0pO1xuICAgICAgICAqL1xuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5ldmVudHMgPSBbXG5cdFx0XHRcdFx0J2Ryb3AnLFxuXHRcdFx0XHRcdCdkcmFnc3RhcnQnLFxuXHRcdFx0XHRcdCdkcmFnZW5kJyxcblx0XHRcdFx0XHQnZHJhZ2VudGVyJyxcblx0XHRcdFx0XHQnZHJhZ292ZXInLFxuXHRcdFx0XHRcdCdkcmFnbGVhdmUnLFxuXHRcdFx0XHRcdCdhZGRlZGZpbGUnLFxuXHRcdFx0XHRcdCdhZGRlZGZpbGVzJyxcblx0XHRcdFx0XHQncmVtb3ZlZGZpbGUnLFxuXHRcdFx0XHRcdCd0aHVtYm5haWwnLFxuXHRcdFx0XHRcdCdlcnJvcicsXG5cdFx0XHRcdFx0J2Vycm9ybXVsdGlwbGUnLFxuXHRcdFx0XHRcdCdwcm9jZXNzaW5nJyxcblx0XHRcdFx0XHQncHJvY2Vzc2luZ211bHRpcGxlJyxcblx0XHRcdFx0XHQndXBsb2FkcHJvZ3Jlc3MnLFxuXHRcdFx0XHRcdCd0b3RhbHVwbG9hZHByb2dyZXNzJyxcblx0XHRcdFx0XHQnc2VuZGluZycsXG5cdFx0XHRcdFx0J3NlbmRpbmdtdWx0aXBsZScsXG5cdFx0XHRcdFx0J3N1Y2Nlc3MnLFxuXHRcdFx0XHRcdCdzdWNjZXNzbXVsdGlwbGUnLFxuXHRcdFx0XHRcdCdjYW5jZWxlZCcsXG5cdFx0XHRcdFx0J2NhbmNlbGVkbXVsdGlwbGUnLFxuXHRcdFx0XHRcdCdjb21wbGV0ZScsXG5cdFx0XHRcdFx0J2NvbXBsZXRlbXVsdGlwbGUnLFxuXHRcdFx0XHRcdCdyZXNldCcsXG5cdFx0XHRcdFx0J21heGZpbGVzZXhjZWVkZWQnLFxuXHRcdFx0XHRcdCdtYXhmaWxlc3JlYWNoZWQnLFxuXHRcdFx0XHRcdCdxdWV1ZWNvbXBsZXRlJyxcblx0XHRcdFx0XTtcblxuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5kZWZhdWx0T3B0aW9ucyA9IHtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBIYXMgdG8gYmUgc3BlY2lmaWVkIG9uIGVsZW1lbnRzIG90aGVyIHRoYW4gZm9ybSAob3Igd2hlbiB0aGUgZm9ybVxuXHRcdFx0XHRcdCAqIGRvZXNuJ3QgaGF2ZSBhbiBgYWN0aW9uYCBhdHRyaWJ1dGUpLiBZb3UgY2FuIGFsc29cblx0XHRcdFx0XHQgKiBwcm92aWRlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBmaWxlc2AgYW5kXG5cdFx0XHRcdFx0ICogbXVzdCByZXR1cm4gdGhlIHVybCAoc2luY2UgYHYzLjEyLjBgKVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHVybDogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIENhbiBiZSBjaGFuZ2VkIHRvIGBcInB1dFwiYCBpZiBuZWNlc3NhcnkuIFlvdSBjYW4gYWxzbyBwcm92aWRlIGEgZnVuY3Rpb25cblx0XHRcdFx0XHQgKiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggYGZpbGVzYCBhbmQgbXVzdCByZXR1cm4gdGhlIG1ldGhvZCAoc2luY2UgYHYzLjEyLjBgKS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0JyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFdpbGwgYmUgc2V0IG9uIHRoZSBYSFJlcXVlc3QuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0d2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSB0aW1lb3V0IGZvciB0aGUgWEhSIHJlcXVlc3RzIGluIG1pbGxpc2Vjb25kcyAoc2luY2UgYHY0LjQuMGApLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRpbWVvdXQ6IDMwMDAwLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSG93IG1hbnkgZmlsZSB1cGxvYWRzIHRvIHByb2Nlc3MgaW4gcGFyYWxsZWwgKFNlZSB0aGVcblx0XHRcdFx0XHQgKiBFbnF1ZXVpbmcgZmlsZSB1cGxvYWRzKiBkb2N1bWVudGF0aW9uIHNlY3Rpb24gZm9yIG1vcmUgaW5mbylcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRwYXJhbGxlbFVwbG9hZHM6IDIsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBXaGV0aGVyIHRvIHNlbmQgbXVsdGlwbGUgZmlsZXMgaW4gb25lIHJlcXVlc3QuIElmXG5cdFx0XHRcdFx0ICogdGhpcyBpdCBzZXQgdG8gdHJ1ZSwgdGhlbiB0aGUgZmFsbGJhY2sgZmlsZSBpbnB1dCBlbGVtZW50IHdpbGxcblx0XHRcdFx0XHQgKiBoYXZlIHRoZSBgbXVsdGlwbGVgIGF0dHJpYnV0ZSBhcyB3ZWxsLiBUaGlzIG9wdGlvbiB3aWxsXG5cdFx0XHRcdFx0ICogYWxzbyB0cmlnZ2VyIGFkZGl0aW9uYWwgZXZlbnRzIChsaWtlIGBwcm9jZXNzaW5nbXVsdGlwbGVgKS4gU2VlIHRoZSBldmVudHNcblx0XHRcdFx0XHQgKiBkb2N1bWVudGF0aW9uIHNlY3Rpb24gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dXBsb2FkTXVsdGlwbGU6IGZhbHNlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogV2hldGhlciB5b3Ugd2FudCBmaWxlcyB0byBiZSB1cGxvYWRlZCBpbiBjaHVua3MgdG8geW91ciBzZXJ2ZXIuIFRoaXMgY2FuJ3QgYmVcblx0XHRcdFx0XHQgKiB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggYHVwbG9hZE11bHRpcGxlYC5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIFNlZSBbY2h1bmtzVXBsb2FkZWRdKCNjb25maWctY2h1bmtzVXBsb2FkZWQpIGZvciB0aGUgY2FsbGJhY2sgdG8gZmluYWxpc2UgYW4gdXBsb2FkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGNodW5raW5nOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGBjaHVua2luZ2AgaXMgZW5hYmxlZCwgdGhpcyBkZWZpbmVzIHdoZXRoZXIgKipldmVyeSoqIGZpbGUgc2hvdWxkIGJlIGNodW5rZWQsXG5cdFx0XHRcdFx0ICogZXZlbiBpZiB0aGUgZmlsZSBzaXplIGlzIGJlbG93IGNodW5rU2l6ZS4gVGhpcyBtZWFucywgdGhhdCB0aGUgYWRkaXRpb25hbCBjaHVua1xuXHRcdFx0XHRcdCAqIGZvcm0gZGF0YSB3aWxsIGJlIHN1Ym1pdHRlZCBhbmQgdGhlIGBjaHVua3NVcGxvYWRlZGAgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGZvcmNlQ2h1bmtpbmc6IGZhbHNlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgYGNodW5raW5nYCBpcyBgdHJ1ZWAsIHRoZW4gdGhpcyBkZWZpbmVzIHRoZSBjaHVuayBzaXplIGluIGJ5dGVzLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGNodW5rU2l6ZTogMjAwMDAwMCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGB0cnVlYCwgdGhlIGluZGl2aWR1YWwgY2h1bmtzIG9mIGEgZmlsZSBhcmUgYmVpbmcgdXBsb2FkZWQgc2ltdWx0YW5lb3VzbHkuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cGFyYWxsZWxDaHVua1VwbG9hZHM6IGZhbHNlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogV2hldGhlciBhIGNodW5rIHNob3VsZCBiZSByZXRyaWVkIGlmIGl0IGZhaWxzLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJldHJ5Q2h1bmtzOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGByZXRyeUNodW5rc2AgaXMgdHJ1ZSwgaG93IG1hbnkgdGltZXMgc2hvdWxkIGl0IGJlIHJldHJpZWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmV0cnlDaHVua3NMaW1pdDogMyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIG5vdCBgbnVsbGAgZGVmaW5lcyBob3cgbWFueSBmaWxlcyB0aGlzIERyb3B6b25lIGhhbmRsZXMuIElmIGl0IGV4Y2VlZHMsXG5cdFx0XHRcdFx0ICogdGhlIGV2ZW50IGBtYXhmaWxlc2V4Y2VlZGVkYCB3aWxsIGJlIGNhbGxlZC4gVGhlIGRyb3B6b25lIGVsZW1lbnQgZ2V0cyB0aGVcblx0XHRcdFx0XHQgKiBjbGFzcyBgZHotbWF4LWZpbGVzLXJlYWNoZWRgIGFjY29yZGluZ2x5IHNvIHlvdSBjYW4gcHJvdmlkZSB2aXN1YWwgZmVlZGJhY2suXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0bWF4RmlsZXNpemU6IDI1NixcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSBuYW1lIG9mIHRoZSBmaWxlIHBhcmFtIHRoYXQgZ2V0cyB0cmFuc2ZlcnJlZC5cblx0XHRcdFx0XHQgKiAqKk5PVEUqKjogSWYgeW91IGhhdmUgdGhlIG9wdGlvbiAgYHVwbG9hZE11bHRpcGxlYCBzZXQgdG8gYHRydWVgLCB0aGVuXG5cdFx0XHRcdFx0ICogRHJvcHpvbmUgd2lsbCBhcHBlbmQgYFtdYCB0byB0aGUgbmFtZS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRwYXJhbU5hbWU6ICdmaWxlJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFdoZXRoZXIgdGh1bWJuYWlscyBmb3IgaW1hZ2VzIHNob3VsZCBiZSBnZW5lcmF0ZWRcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRjcmVhdGVJbWFnZVRodW1ibmFpbHM6IHRydWUsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJbiBNQi4gV2hlbiB0aGUgZmlsZW5hbWUgZXhjZWVkcyB0aGlzIGxpbWl0LCB0aGUgdGh1bWJuYWlsIHdpbGwgbm90IGJlIGdlbmVyYXRlZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRtYXhUaHVtYm5haWxGaWxlc2l6ZTogMTAsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgbnVsbGAsIHRoZSByYXRpbyBvZiB0aGUgaW1hZ2Ugd2lsbCBiZSB1c2VkIHRvIGNhbGN1bGF0ZSBpdC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aHVtYm5haWxXaWR0aDogMTIwLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVGhlIHNhbWUgYXMgYHRodW1ibmFpbFdpZHRoYC4gSWYgYm90aCBhcmUgbnVsbCwgaW1hZ2VzIHdpbGwgbm90IGJlIHJlc2l6ZWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dGh1bWJuYWlsSGVpZ2h0OiAxMjAsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBIb3cgdGhlIGltYWdlcyBzaG91bGQgYmUgc2NhbGVkIGRvd24gaW4gY2FzZSBib3RoLCBgdGh1bWJuYWlsV2lkdGhgIGFuZCBgdGh1bWJuYWlsSGVpZ2h0YCBhcmUgcHJvdmlkZWQuXG5cdFx0XHRcdFx0ICogQ2FuIGJlIGVpdGhlciBgY29udGFpbmAgb3IgYGNyb3BgLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRodW1ibmFpbE1ldGhvZDogJ2Nyb3AnLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgc2V0LCBpbWFnZXMgd2lsbCBiZSByZXNpemVkIHRvIHRoZXNlIGRpbWVuc2lvbnMgYmVmb3JlIGJlaW5nICoqdXBsb2FkZWQqKi5cblx0XHRcdFx0XHQgKiBJZiBvbmx5IG9uZSwgYHJlc2l6ZVdpZHRoYCAqKm9yKiogYHJlc2l6ZUhlaWdodGAgaXMgcHJvdmlkZWQsIHRoZSBvcmlnaW5hbCBhc3BlY3Rcblx0XHRcdFx0XHQgKiByYXRpbyBvZiB0aGUgZmlsZSB3aWxsIGJlIHByZXNlcnZlZC5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIFRoZSBgb3B0aW9ucy50cmFuc2Zvcm1GaWxlYCBmdW5jdGlvbiB1c2VzIHRoZXNlIG9wdGlvbnMsIHNvIGlmIHRoZSBgdHJhbnNmb3JtRmlsZWAgZnVuY3Rpb25cblx0XHRcdFx0XHQgKiBpcyBvdmVycmlkZGVuLCB0aGVzZSBvcHRpb25zIGRvbid0IGRvIGFueXRoaW5nLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHJlc2l6ZVdpZHRoOiBudWxsLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogU2VlIGByZXNpemVXaWR0aGAuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVzaXplSGVpZ2h0OiBudWxsLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVGhlIG1pbWUgdHlwZSBvZiB0aGUgcmVzaXplZCBpbWFnZSAoYmVmb3JlIGl0IGdldHMgdXBsb2FkZWQgdG8gdGhlIHNlcnZlcikuXG5cdFx0XHRcdFx0ICogSWYgYG51bGxgIHRoZSBvcmlnaW5hbCBtaW1lIHR5cGUgd2lsbCBiZSB1c2VkLiBUbyBmb3JjZSBqcGVnLCBmb3IgZXhhbXBsZSwgdXNlIGBpbWFnZS9qcGVnYC5cblx0XHRcdFx0XHQgKiBTZWUgYHJlc2l6ZVdpZHRoYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRyZXNpemVNaW1lVHlwZTogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSBxdWFsaXR5IG9mIHRoZSByZXNpemVkIGltYWdlcy4gU2VlIGByZXNpemVXaWR0aGAuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVzaXplUXVhbGl0eTogMC44LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSG93IHRoZSBpbWFnZXMgc2hvdWxkIGJlIHNjYWxlZCBkb3duIGluIGNhc2UgYm90aCwgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgYXJlIHByb3ZpZGVkLlxuXHRcdFx0XHRcdCAqIENhbiBiZSBlaXRoZXIgYGNvbnRhaW5gIG9yIGBjcm9wYC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRyZXNpemVNZXRob2Q6ICdjb250YWluJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSBiYXNlIHRoYXQgaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIGZpbGVzaXplLiBZb3UgY2FuIGNoYW5nZSB0aGlzIHRvXG5cdFx0XHRcdFx0ICogMTAyNCBpZiB5b3Ugd291bGQgcmF0aGVyIGRpc3BsYXkga2liaWJ5dGVzLCBtZWJpYnl0ZXMsIGV0Yy4uLlxuXHRcdFx0XHRcdCAqIDEwMjQgaXMgdGVjaG5pY2FsbHkgaW5jb3JyZWN0LCBiZWNhdXNlIGAxMDI0IGJ5dGVzYCBhcmUgYDEga2liaWJ5dGVgIG5vdCBgMSBraWxvYnl0ZWAuXG5cdFx0XHRcdFx0ICogWW91IGNhbiBjaGFuZ2UgdGhpcyB0byBgMTAyNGAgaWYgeW91IGRvbid0IGNhcmUgYWJvdXQgdmFsaWRpdHkuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZmlsZXNpemVCYXNlOiAxMDAwLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogQ2FuIGJlIHVzZWQgdG8gbGltaXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGZpbGVzIHRoYXQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoaXMgRHJvcHpvbmVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRtYXhGaWxlczogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEFuIG9wdGlvbmFsIG9iamVjdCB0byBzZW5kIGFkZGl0aW9uYWwgaGVhZGVycyB0byB0aGUgc2VydmVyLiBFZzpcblx0XHRcdFx0XHQgKiBgeyBcIk15LUF3ZXNvbWUtSGVhZGVyXCI6IFwiaGVhZGVyIHZhbHVlXCIgfWBcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRoZWFkZXJzOiBudWxsLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgYHRydWVgLCB0aGUgZHJvcHpvbmUgZWxlbWVudCBpdHNlbGYgd2lsbCBiZSBjbGlja2FibGUsIGlmIGBmYWxzZWBcblx0XHRcdFx0XHQgKiBub3RoaW5nIHdpbGwgYmUgY2xpY2thYmxlLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogWW91IGNhbiBhbHNvIHBhc3MgYW4gSFRNTCBlbGVtZW50LCBhIENTUyBzZWxlY3RvciAoZm9yIG11bHRpcGxlIGVsZW1lbnRzKVxuXHRcdFx0XHRcdCAqIG9yIGFuIGFycmF5IG9mIHRob3NlLiBJbiB0aGF0IGNhc2UsIGFsbCBvZiB0aG9zZSBlbGVtZW50cyB3aWxsIHRyaWdnZXIgYW5cblx0XHRcdFx0XHQgKiB1cGxvYWQgd2hlbiBjbGlja2VkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGNsaWNrYWJsZTogdHJ1ZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFdoZXRoZXIgaGlkZGVuIGZpbGVzIGluIGRpcmVjdG9yaWVzIHNob3VsZCBiZSBpZ25vcmVkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGlnbm9yZUhpZGRlbkZpbGVzOiB0cnVlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYGFjY2VwdGAgY2hlY2tzIHRoZSBmaWxlJ3MgbWltZSB0eXBlIG9yXG5cdFx0XHRcdFx0ICogZXh0ZW5zaW9uIGFnYWluc3QgdGhpcyBsaXN0LiBUaGlzIGlzIGEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgbWltZVxuXHRcdFx0XHRcdCAqIHR5cGVzIG9yIGZpbGUgZXh0ZW5zaW9ucy5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIEVnLjogYGltYWdlLyosYXBwbGljYXRpb24vcGRmLC5wc2RgXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB0aGUgRHJvcHpvbmUgaXMgYGNsaWNrYWJsZWAgdGhpcyBvcHRpb24gd2lsbCBhbHNvIGJlIHVzZWQgYXNcblx0XHRcdFx0XHQgKiBbYGFjY2VwdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSFRNTC9FbGVtZW50L2lucHV0I2F0dHItYWNjZXB0KVxuXHRcdFx0XHRcdCAqIHBhcmFtZXRlciBvbiB0aGUgaGlkZGVuIGZpbGUgaW5wdXQgYXMgd2VsbC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRhY2NlcHRlZEZpbGVzOiBudWxsLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogKipEZXByZWNhdGVkISoqXG5cdFx0XHRcdFx0ICogVXNlIGFjY2VwdGVkRmlsZXMgaW5zdGVhZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRhY2NlcHRlZE1pbWVUeXBlczogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGZhbHNlLCBmaWxlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBxdWV1ZSBidXQgdGhlIHF1ZXVlIHdpbGwgbm90IGJlXG5cdFx0XHRcdFx0ICogcHJvY2Vzc2VkIGF1dG9tYXRpY2FsbHkuXG5cdFx0XHRcdFx0ICogVGhpcyBjYW4gYmUgdXNlZnVsIGlmIHlvdSBuZWVkIHNvbWUgYWRkaXRpb25hbCB1c2VyIGlucHV0IGJlZm9yZSBzZW5kaW5nXG5cdFx0XHRcdFx0ICogZmlsZXMgKG9yIGlmIHlvdSB3YW50IHdhbnQgYWxsIGZpbGVzIHNlbnQgYXQgb25jZSkuXG5cdFx0XHRcdFx0ICogSWYgeW91J3JlIHJlYWR5IHRvIHNlbmQgdGhlIGZpbGUgc2ltcGx5IGNhbGwgYG15RHJvcHpvbmUucHJvY2Vzc1F1ZXVlKClgLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogU2VlIHRoZSBbZW5xdWV1aW5nIGZpbGUgdXBsb2Fkc10oI2VucXVldWluZy1maWxlLXVwbG9hZHMpIGRvY3VtZW50YXRpb25cblx0XHRcdFx0XHQgKiBzZWN0aW9uIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBmYWxzZSwgZmlsZXMgYWRkZWQgdG8gdGhlIGRyb3B6b25lIHdpbGwgbm90IGJlIHF1ZXVlZCBieSBkZWZhdWx0LlxuXHRcdFx0XHRcdCAqIFlvdSdsbCBoYXZlIHRvIGNhbGwgYGVucXVldWVGaWxlKGZpbGUpYCBtYW51YWxseS5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRhdXRvUXVldWU6IHRydWUsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBgdHJ1ZWAsIHRoaXMgd2lsbCBhZGQgYSBsaW5rIHRvIGV2ZXJ5IGZpbGUgcHJldmlldyB0byByZW1vdmUgb3IgY2FuY2VsIChpZlxuXHRcdFx0XHRcdCAqIGFscmVhZHkgdXBsb2FkaW5nKSB0aGUgZmlsZS4gVGhlIGBkaWN0Q2FuY2VsVXBsb2FkYCwgYGRpY3RDYW5jZWxVcGxvYWRDb25maXJtYXRpb25gXG5cdFx0XHRcdFx0ICogYW5kIGBkaWN0UmVtb3ZlRmlsZWAgb3B0aW9ucyBhcmUgdXNlZCBmb3IgdGhlIHdvcmRpbmcuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0YWRkUmVtb3ZlTGlua3M6IGZhbHNlLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogRGVmaW5lcyB3aGVyZSB0byBkaXNwbGF5IHRoZSBmaWxlIHByZXZpZXdzIOKAkyBpZiBgbnVsbGAgdGhlXG5cdFx0XHRcdFx0ICogRHJvcHpvbmUgZWxlbWVudCBpdHNlbGYgaXMgdXNlZC4gQ2FuIGJlIGEgcGxhaW4gYEhUTUxFbGVtZW50YCBvciBhIENTU1xuXHRcdFx0XHRcdCAqIHNlbGVjdG9yLiBUaGUgZWxlbWVudCBzaG91bGQgaGF2ZSB0aGUgYGRyb3B6b25lLXByZXZpZXdzYCBjbGFzcyBzb1xuXHRcdFx0XHRcdCAqIHRoZSBwcmV2aWV3cyBhcmUgZGlzcGxheWVkIHByb3Blcmx5LlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHByZXZpZXdzQ29udGFpbmVyOiBudWxsLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVGhpcyBpcyB0aGUgZWxlbWVudCB0aGUgaGlkZGVuIGlucHV0IGZpZWxkICh3aGljaCBpcyB1c2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlXG5cdFx0XHRcdFx0ICogZHJvcHpvbmUgdG8gdHJpZ2dlciBmaWxlIHNlbGVjdGlvbikgd2lsbCBiZSBhcHBlbmRlZCB0by4gVGhpcyBtaWdodFxuXHRcdFx0XHRcdCAqIGJlIGltcG9ydGFudCBpbiBjYXNlIHlvdSB1c2UgZnJhbWV3b3JrcyB0byBzd2l0Y2ggdGhlIGNvbnRlbnQgb2YgeW91ciBwYWdlLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGhpZGRlbklucHV0Q29udGFpbmVyOiAnYm9keScsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiBudWxsLCBubyBjYXB0dXJlIHR5cGUgd2lsbCBiZSBzcGVjaWZpZWRcblx0XHRcdFx0XHQgKiBJZiBjYW1lcmEsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSBjYW1lcmFcblx0XHRcdFx0XHQgKiBJZiBtaWNyb3Bob25lLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgdGhlIG1pY3JvcGhvbmVcblx0XHRcdFx0XHQgKiBJZiBjYW1jb3JkZXIsIG1vYmlsZSBkZXZpY2VzIHdpbGwgc2tpcCB0aGUgZmlsZSBzZWxlY3Rpb24gYW5kIGNob29zZSB0aGUgY2FtZXJhIGluIHZpZGVvIG1vZGVcblx0XHRcdFx0XHQgKiBPbiBhcHBsZSBkZXZpY2VzIG11bHRpcGxlIG11c3QgYmUgc2V0IHRvIGZhbHNlLiAgQWNjZXB0ZWRGaWxlcyBtYXkgbmVlZCB0b1xuXHRcdFx0XHRcdCAqIGJlIHNldCB0byBhbiBhcHByb3ByaWF0ZSBtaW1lIHR5cGUgKGUuZy4gXCJpbWFnZS8qXCIsIFwiYXVkaW8vKlwiLCBvciBcInZpZGVvLypcIikuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Y2FwdHVyZTogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqICoqRGVwcmVjYXRlZCoqLiBVc2UgYHJlbmFtZUZpbGVgIGluc3RlYWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVuYW1lRmlsZW5hbWU6IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBBIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZCBiZWZvcmUgdGhlIGZpbGUgaXMgdXBsb2FkZWQgdG8gdGhlIHNlcnZlciBhbmQgcmVuYW1lcyB0aGUgZmlsZS5cblx0XHRcdFx0XHQgKiBUaGlzIGZ1bmN0aW9uIGdldHMgdGhlIGBGaWxlYCBhcyBhcmd1bWVudCBhbmQgY2FuIHVzZSB0aGUgYGZpbGUubmFtZWAuIFRoZSBhY3R1YWwgbmFtZSBvZiB0aGVcblx0XHRcdFx0XHQgKiBmaWxlIHRoYXQgZ2V0cyB1c2VkIGR1cmluZyB0aGUgdXBsb2FkIGNhbiBiZSBhY2Nlc3NlZCB0aHJvdWdoIGBmaWxlLnVwbG9hZC5maWxlbmFtZWAuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVuYW1lRmlsZTogbnVsbCxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGB0cnVlYCB0aGUgZmFsbGJhY2sgd2lsbCBiZSBmb3JjZWQuIFRoaXMgaXMgdmVyeSB1c2VmdWwgdG8gdGVzdCB5b3VyIHNlcnZlclxuXHRcdFx0XHRcdCAqIGltcGxlbWVudGF0aW9ucyBmaXJzdCBhbmQgbWFrZSBzdXJlIHRoYXQgZXZlcnl0aGluZyB3b3JrcyBhc1xuXHRcdFx0XHRcdCAqIGV4cGVjdGVkIHdpdGhvdXQgZHJvcHpvbmUgaWYgeW91IGV4cGVyaWVuY2UgcHJvYmxlbXMsIGFuZCB0byB0ZXN0XG5cdFx0XHRcdFx0ICogaG93IHlvdXIgZmFsbGJhY2tzIHdpbGwgbG9vay5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRmb3JjZUZhbGxiYWNrOiBmYWxzZSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSB0ZXh0IHVzZWQgYmVmb3JlIGFueSBmaWxlcyBhcmUgZHJvcHBlZC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRkaWN0RGVmYXVsdE1lc3NhZ2U6ICdEcm9wIGZpbGVzIGhlcmUgdG8gdXBsb2FkJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFRoZSB0ZXh0IHRoYXQgcmVwbGFjZXMgdGhlIGRlZmF1bHQgbWVzc2FnZSB0ZXh0IGl0IHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdEZhbGxiYWNrTWVzc2FnZTogXCJZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBkcmFnJ24nZHJvcCBmaWxlIHVwbG9hZHMuXCIsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgdGV4dCB0aGF0IHdpbGwgYmUgYWRkZWQgYmVmb3JlIHRoZSBmYWxsYmFjayBmb3JtLlxuXHRcdFx0XHRcdCAqIElmIHlvdSBwcm92aWRlIGEgIGZhbGxiYWNrIGVsZW1lbnQgeW91cnNlbGYsIG9yIGlmIHRoaXMgb3B0aW9uIGlzIGBudWxsYCB0aGlzIHdpbGxcblx0XHRcdFx0XHQgKiBiZSBpZ25vcmVkLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RGYWxsYmFja1RleHQ6ICdQbGVhc2UgdXNlIHRoZSBmYWxsYmFjayBmb3JtIGJlbG93IHRvIHVwbG9hZCB5b3VyIGZpbGVzIGxpa2UgaW4gdGhlIG9sZGVuIGRheXMuJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIHRoZSBmaWxlc2l6ZSBpcyB0b28gYmlnLlxuXHRcdFx0XHRcdCAqIGB7e2ZpbGVzaXplfX1gIGFuZCBge3ttYXhGaWxlc2l6ZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHJlc3BlY3RpdmUgY29uZmlndXJhdGlvbiB2YWx1ZXMuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdEZpbGVUb29CaWc6ICdGaWxlIGlzIHRvbyBiaWcgKHt7ZmlsZXNpemV9fU1pQikuIE1heCBmaWxlc2l6ZToge3ttYXhGaWxlc2l6ZX19TWlCLicsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBJZiB0aGUgZmlsZSBkb2Vzbid0IG1hdGNoIHRoZSBmaWxlIHR5cGUuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdEludmFsaWRGaWxlVHlwZTogXCJZb3UgY2FuJ3QgdXBsb2FkIGZpbGVzIG9mIHRoaXMgdHlwZS5cIixcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIHRoZSBzZXJ2ZXIgcmVzcG9uc2Ugd2FzIGludmFsaWQuXG5cdFx0XHRcdFx0ICogYHt7c3RhdHVzQ29kZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHNlcnZlcnMgc3RhdHVzIGNvZGUuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdFJlc3BvbnNlRXJyb3I6ICdTZXJ2ZXIgcmVzcG9uZGVkIHdpdGgge3tzdGF0dXNDb2RlfX0gY29kZS4nLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIGZvciB0aGUgY2FuY2VsIHVwbG9hZCBsaW5rLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RDYW5jZWxVcGxvYWQ6ICdDYW5jZWwgdXBsb2FkJyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCBmb3IgY29uZmlybWF0aW9uIHdoZW4gY2FuY2VsbGluZyB1cGxvYWQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbjogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjYW5jZWwgdGhpcyB1cGxvYWQ/JyxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCB0byByZW1vdmUgYSBmaWxlLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RSZW1vdmVGaWxlOiAnUmVtb3ZlIGZpbGUnLFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogSWYgdGhpcyBpcyBub3QgbnVsbCwgdGhlbiB0aGUgdXNlciB3aWxsIGJlIHByb21wdGVkIGJlZm9yZSByZW1vdmluZyBhIGZpbGUuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb246IG51bGwsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBEaXNwbGF5ZWQgaWYgYG1heEZpbGVzYCBpcyBzdCBhbmQgZXhjZWVkZWQuXG5cdFx0XHRcdFx0ICogVGhlIHN0cmluZyBge3ttYXhGaWxlc319YCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHRoZSBjb25maWd1cmF0aW9uIHZhbHVlLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGRpY3RNYXhGaWxlc0V4Y2VlZGVkOiAnWW91IGNhbiBub3QgdXBsb2FkIGFueSBtb3JlIGZpbGVzLicsXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBBbGxvd3MgeW91IHRvIHRyYW5zbGF0ZSB0aGUgZGlmZmVyZW50IHVuaXRzLiBTdGFydGluZyB3aXRoIGB0YmAgZm9yIHRlcmFieXRlcyBhbmQgZ29pbmcgZG93biB0b1xuXHRcdFx0XHRcdCAqIGBiYCBmb3IgYnl0ZXMuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0ZGljdEZpbGVTaXplVW5pdHM6IHsgdGI6ICdUQicsIGdiOiAnR0InLCBtYjogJ01CJywga2I6ICdLQicsIGI6ICdiJyB9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogQ2FsbGVkIHdoZW4gZHJvcHpvbmUgaW5pdGlhbGl6ZWRcblx0XHRcdFx0XHQgKiBZb3UgY2FuIGFkZCBldmVudCBsaXN0ZW5lcnMgaGVyZVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7fSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIENhbiBiZSBhbiAqKm9iamVjdCoqIG9mIGFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byB0cmFuc2ZlciB0byB0aGUgc2VydmVyLCAqKm9yKiogYSBgRnVuY3Rpb25gXG5cdFx0XHRcdFx0ICogdGhhdCBnZXRzIGludm9rZWQgd2l0aCB0aGUgYGZpbGVzYCwgYHhocmAgYW5kLCBpZiBpdCdzIGEgY2h1bmtlZCB1cGxvYWQsIGBjaHVua2AgYXJndW1lbnRzLiBJbiBjYXNlXG5cdFx0XHRcdFx0ICogb2YgYSBmdW5jdGlvbiwgdGhpcyBuZWVkcyB0byByZXR1cm4gYSBtYXAuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdGhpbmcgZm9yIG5vcm1hbCB1cGxvYWRzLCBidXQgYWRkcyByZWxldmFudCBpbmZvcm1hdGlvbiBmb3Jcblx0XHRcdFx0XHQgKiBjaHVua2VkIHVwbG9hZHMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBUaGlzIGlzIHRoZSBzYW1lIGFzIGFkZGluZyBoaWRkZW4gaW5wdXQgZmllbGRzIGluIHRoZSBmb3JtIGVsZW1lbnQuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cGFyYW1zOiBmdW5jdGlvbiBwYXJhbXMoZmlsZXMsIHhociwgY2h1bmspIHtcblx0XHRcdFx0XHRcdGlmIChjaHVuaykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdGR6dXVpZDogY2h1bmsuZmlsZS51cGxvYWQudXVpZCxcblx0XHRcdFx0XHRcdFx0XHRkemNodW5raW5kZXg6IGNodW5rLmluZGV4LFxuXHRcdFx0XHRcdFx0XHRcdGR6dG90YWxmaWxlc2l6ZTogY2h1bmsuZmlsZS5zaXplLFxuXHRcdFx0XHRcdFx0XHRcdGR6Y2h1bmtzaXplOiB0aGlzLm9wdGlvbnMuY2h1bmtTaXplLFxuXHRcdFx0XHRcdFx0XHRcdGR6dG90YWxjaHVua2NvdW50OiBjaHVuay5maWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQsXG5cdFx0XHRcdFx0XHRcdFx0ZHpjaHVua2J5dGVvZmZzZXQ6IGNodW5rLmluZGV4ICogdGhpcy5vcHRpb25zLmNodW5rU2l6ZSxcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogQSBmdW5jdGlvbiB0aGF0IGdldHMgYSBbZmlsZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9ET00vRmlsZSlcblx0XHRcdFx0XHQgKiBhbmQgYSBgZG9uZWAgZnVuY3Rpb24gYXMgcGFyYW1ldGVycy5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHRoZSBkb25lIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIHRoZSBmaWxlIGlzIFwiYWNjZXB0ZWRcIiBhbmQgd2lsbFxuXHRcdFx0XHRcdCAqIGJlIHByb2Nlc3NlZC4gSWYgeW91IHBhc3MgYW4gZXJyb3IgbWVzc2FnZSwgdGhlIGZpbGUgaXMgcmVqZWN0ZWQsIGFuZCB0aGUgZXJyb3Jcblx0XHRcdFx0XHQgKiBtZXNzYWdlIHdpbGwgYmUgZGlzcGxheWVkLlxuXHRcdFx0XHRcdCAqIFRoaXMgZnVuY3Rpb24gd2lsbCBub3QgYmUgY2FsbGVkIGlmIHRoZSBmaWxlIGlzIHRvbyBiaWcgb3IgZG9lc24ndCBtYXRjaCB0aGUgbWltZSB0eXBlcy5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uIGFjY2VwdChmaWxlLCBkb25lKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZG9uZSgpO1xuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiBhbGwgY2h1bmtzIGhhdmUgYmVlbiB1cGxvYWRlZCBmb3IgYSBmaWxlLlxuXHRcdFx0XHRcdCAqIEl0IGdldHMgdGhlIGZpbGUgZm9yIHdoaWNoIHRoZSBjaHVua3MgaGF2ZSBiZWVuIHVwbG9hZGVkIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsXG5cdFx0XHRcdFx0ICogYW5kIHRoZSBgZG9uZWAgZnVuY3Rpb24gYXMgc2Vjb25kLiBgZG9uZSgpYCBuZWVkcyB0byBiZSBpbnZva2VkIHdoZW4gZXZlcnl0aGluZ1xuXHRcdFx0XHRcdCAqIG5lZWRlZCB0byBmaW5pc2ggdGhlIHVwbG9hZCBwcm9jZXNzIGlzIGRvbmUuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Y2h1bmtzVXBsb2FkZWQ6IGZ1bmN0aW9uIGNodW5rc1VwbG9hZGVkKGZpbGUsIGRvbmUpIHtcblx0XHRcdFx0XHRcdGRvbmUoKTtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogR2V0cyBjYWxsZWQgd2hlbiB0aGUgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkLlxuXHRcdFx0XHRcdCAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNob3dzIHRoZSBmYWxsYmFjayBpbnB1dCBmaWVsZCBhbmQgYWRkc1xuXHRcdFx0XHRcdCAqIGEgdGV4dC5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRmYWxsYmFjazogZnVuY3Rpb24gZmFsbGJhY2soKSB7XG5cdFx0XHRcdFx0XHQvLyBUaGlzIGNvZGUgc2hvdWxkIHBhc3MgaW4gSUU3Li4uIDooXG5cdFx0XHRcdFx0XHR2YXIgbWVzc2FnZUVsZW1lbnQgPSB2b2lkIDA7XG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy5lbGVtZW50LmNsYXNzTmFtZSArICcgZHotYnJvd3Nlci1ub3Qtc3VwcG9ydGVkJztcblxuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjIgPSB0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MiA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0X2kyID0gMCxcblx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyID0gX2lzQXJyYXkyID8gX2l0ZXJhdG9yMiA6IF9pdGVyYXRvcjJbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjI7XG5cblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5Mikge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYyID0gX2l0ZXJhdG9yMltfaTIrK107XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMi5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMiA9IF9pMi52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBjaGlsZCA9IF9yZWYyO1xuXG5cdFx0XHRcdFx0XHRcdGlmICgvKF58IClkei1tZXNzYWdlKCR8ICkvLnRlc3QoY2hpbGQuY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRcdG1lc3NhZ2VFbGVtZW50ID0gY2hpbGQ7XG5cdFx0XHRcdFx0XHRcdFx0Y2hpbGQuY2xhc3NOYW1lID0gJ2R6LW1lc3NhZ2UnOyAvLyBSZW1vdmVzIHRoZSAnZHotZGVmYXVsdCcgY2xhc3Ncblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCFtZXNzYWdlRWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRtZXNzYWdlRWxlbWVudCA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoJzxkaXYgY2xhc3M9XCJkei1tZXNzYWdlXCI+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZUVsZW1lbnQpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgc3BhbiA9IG1lc3NhZ2VFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF07XG5cdFx0XHRcdFx0XHRpZiAoc3Bhbikge1xuXHRcdFx0XHRcdFx0XHRpZiAoc3Bhbi50ZXh0Q29udGVudCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3Bhbi50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tNZXNzYWdlO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHNwYW4uaW5uZXJUZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHRzcGFuLmlubmVyVGV4dCA9IHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tNZXNzYWdlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRGYWxsYmFja0Zvcm0oKSk7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIEdldHMgY2FsbGVkIHRvIGNhbGN1bGF0ZSB0aGUgdGh1bWJuYWlsIGRpbWVuc2lvbnMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJdCBnZXRzIGBmaWxlYCwgYHdpZHRoYCBhbmQgYGhlaWdodGAgKGJvdGggbWF5IGJlIGBudWxsYCkgYXMgcGFyYW1ldGVycyBhbmQgbXVzdCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmc6XG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiAgLSBgc3JjV2lkdGhgICYgYHNyY0hlaWdodGAgKHJlcXVpcmVkKVxuXHRcdFx0XHRcdCAqICAtIGB0cmdXaWR0aGAgJiBgdHJnSGVpZ2h0YCAocmVxdWlyZWQpXG5cdFx0XHRcdFx0ICogIC0gYHNyY1hgICYgYHNyY1lgIChvcHRpb25hbCwgZGVmYXVsdCBgMGApXG5cdFx0XHRcdFx0ICogIC0gYHRyZ1hgICYgYHRyZ1lgIChvcHRpb25hbCwgZGVmYXVsdCBgMGApXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBUaG9zZSB2YWx1ZXMgYXJlIGdvaW5nIHRvIGJlIHVzZWQgYnkgYGN0eC5kcmF3SW1hZ2UoKWAuXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0cmVzaXplOiBmdW5jdGlvbiByZXNpemUoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5mbyA9IHtcblx0XHRcdFx0XHRcdFx0c3JjWDogMCxcblx0XHRcdFx0XHRcdFx0c3JjWTogMCxcblx0XHRcdFx0XHRcdFx0c3JjV2lkdGg6IGZpbGUud2lkdGgsXG5cdFx0XHRcdFx0XHRcdHNyY0hlaWdodDogZmlsZS5oZWlnaHQsXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHR2YXIgc3JjUmF0aW8gPSBmaWxlLndpZHRoIC8gZmlsZS5oZWlnaHQ7XG5cblx0XHRcdFx0XHRcdC8vIEF1dG9tYXRpY2FsbHkgY2FsY3VsYXRlIGRpbWVuc2lvbnMgaWYgbm90IHNwZWNpZmllZFxuXHRcdFx0XHRcdFx0aWYgKHdpZHRoID09IG51bGwgJiYgaGVpZ2h0ID09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0d2lkdGggPSBpbmZvLnNyY1dpZHRoO1xuXHRcdFx0XHRcdFx0XHRoZWlnaHQgPSBpbmZvLnNyY0hlaWdodDtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAod2lkdGggPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHR3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChoZWlnaHQgPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRoZWlnaHQgPSB3aWR0aCAvIHNyY1JhdGlvO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgaW1hZ2VzIGFyZW4ndCB1cHNjYWxlZFxuXHRcdFx0XHRcdFx0d2lkdGggPSBNYXRoLm1pbih3aWR0aCwgaW5mby5zcmNXaWR0aCk7XG5cdFx0XHRcdFx0XHRoZWlnaHQgPSBNYXRoLm1pbihoZWlnaHQsIGluZm8uc3JjSGVpZ2h0KTtcblxuXHRcdFx0XHRcdFx0dmFyIHRyZ1JhdGlvID0gd2lkdGggLyBoZWlnaHQ7XG5cblx0XHRcdFx0XHRcdGlmIChpbmZvLnNyY1dpZHRoID4gd2lkdGggfHwgaW5mby5zcmNIZWlnaHQgPiBoZWlnaHQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gSW1hZ2UgaXMgYmlnZ2VyIGFuZCBuZWVkcyByZXNjYWxpbmdcblx0XHRcdFx0XHRcdFx0aWYgKHJlc2l6ZU1ldGhvZCA9PT0gJ2Nyb3AnKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNyY1JhdGlvID4gdHJnUmF0aW8pIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluZm8uc3JjSGVpZ2h0ID0gZmlsZS5oZWlnaHQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbmZvLnNyY1dpZHRoID0gaW5mby5zcmNIZWlnaHQgKiB0cmdSYXRpbztcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aW5mby5zcmNXaWR0aCA9IGZpbGUud2lkdGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbmZvLnNyY0hlaWdodCA9IGluZm8uc3JjV2lkdGggLyB0cmdSYXRpbztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzaXplTWV0aG9kID09PSAnY29udGFpbicpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBNZXRob2QgJ2NvbnRhaW4nXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNyY1JhdGlvID4gdHJnUmF0aW8pIHtcblx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoID0gaGVpZ2h0ICogc3JjUmF0aW87XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVua25vd24gcmVzaXplTWV0aG9kICdcIiArIHJlc2l6ZU1ldGhvZCArIFwiJ1wiKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpbmZvLnNyY1ggPSAoZmlsZS53aWR0aCAtIGluZm8uc3JjV2lkdGgpIC8gMjtcblx0XHRcdFx0XHRcdGluZm8uc3JjWSA9IChmaWxlLmhlaWdodCAtIGluZm8uc3JjSGVpZ2h0KSAvIDI7XG5cblx0XHRcdFx0XHRcdGluZm8udHJnV2lkdGggPSB3aWR0aDtcblx0XHRcdFx0XHRcdGluZm8udHJnSGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gaW5mbztcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogQ2FuIGJlIHVzZWQgdG8gdHJhbnNmb3JtIHRoZSBmaWxlIChmb3IgZXhhbXBsZSwgcmVzaXplIGFuIGltYWdlIGlmIG5lY2Vzc2FyeSkuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiB1c2VzIGByZXNpemVXaWR0aGAgYW5kIGByZXNpemVIZWlnaHRgIChpZiBwcm92aWRlZCkgYW5kIHJlc2l6ZXNcblx0XHRcdFx0XHQgKiBpbWFnZXMgYWNjb3JkaW5nIHRvIHRob3NlIGRpbWVuc2lvbnMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBHZXRzIHRoZSBgZmlsZWAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgYW5kIGEgYGRvbmUoKWAgZnVuY3Rpb24gYXMgdGhlIHNlY29uZCwgdGhhdCBuZWVkc1xuXHRcdFx0XHRcdCAqIHRvIGJlIGludm9rZWQgd2l0aCB0aGUgZmlsZSB3aGVuIHRoZSB0cmFuc2Zvcm1hdGlvbiBpcyBkb25lLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRyYW5zZm9ybUZpbGU6IGZ1bmN0aW9uIHRyYW5zZm9ybUZpbGUoZmlsZSwgZG9uZSkge1xuXHRcdFx0XHRcdFx0aWYgKCh0aGlzLm9wdGlvbnMucmVzaXplV2lkdGggfHwgdGhpcy5vcHRpb25zLnJlc2l6ZUhlaWdodCkgJiYgZmlsZS50eXBlLm1hdGNoKC9pbWFnZS4qLykpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucmVzaXplSW1hZ2UoXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZSxcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMucmVzaXplV2lkdGgsXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnJlc2l6ZUhlaWdodCxcblx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMucmVzaXplTWV0aG9kLFxuXHRcdFx0XHRcdFx0XHRcdGRvbmVcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBkb25lKGZpbGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBBIHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSB0ZW1wbGF0ZSB1c2VkIGZvciBlYWNoIGRyb3BwZWRcblx0XHRcdFx0XHQgKiBmaWxlLiBDaGFuZ2UgaXQgdG8gZnVsZmlsbCB5b3VyIG5lZWRzIGJ1dCBtYWtlIHN1cmUgdG8gcHJvcGVybHlcblx0XHRcdFx0XHQgKiBwcm92aWRlIGFsbCBlbGVtZW50cy5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHlvdSB3YW50IHRvIHVzZSBhbiBhY3R1YWwgSFRNTCBlbGVtZW50IGluc3RlYWQgb2YgcHJvdmlkaW5nIGEgU3RyaW5nXG5cdFx0XHRcdFx0ICogYXMgYSBjb25maWcgb3B0aW9uLCB5b3UgY291bGQgY3JlYXRlIGEgZGl2IHdpdGggdGhlIGlkIGB0cGxgLFxuXHRcdFx0XHRcdCAqIHB1dCB0aGUgdGVtcGxhdGUgaW5zaWRlIGl0IGFuZCBwcm92aWRlIHRoZSBlbGVtZW50IGxpa2UgdGhpczpcblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqICAgICBkb2N1bWVudFxuXHRcdFx0XHRcdCAqICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjdHBsJylcblx0XHRcdFx0XHQgKiAgICAgICAuaW5uZXJIVE1MXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRwcmV2aWV3VGVtcGxhdGU6XG5cdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImR6LXByZXZpZXcgZHotZmlsZS1wcmV2aWV3XCI+XFxuICA8ZGl2IGNsYXNzPVwiZHotaW1hZ2VcIj48aW1nIGRhdGEtZHotdGh1bWJuYWlsIC8+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotZGV0YWlsc1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZHotc2l6ZVwiPjxzcGFuIGRhdGEtZHotc2l6ZT48L3NwYW4+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJkei1maWxlbmFtZVwiPjxzcGFuIGRhdGEtZHotbmFtZT48L3NwYW4+PC9kaXY+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJkei1wcm9ncmVzc1wiPjxzcGFuIGNsYXNzPVwiZHotdXBsb2FkXCIgZGF0YS1kei11cGxvYWRwcm9ncmVzcz48L3NwYW4+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVwiZHotZXJyb3ItbWVzc2FnZVwiPjxzcGFuIGRhdGEtZHotZXJyb3JtZXNzYWdlPjwvc3Bhbj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJkei1zdWNjZXNzLW1hcmtcIj5cXG4gICAgPHN2ZyB3aWR0aD1cIjU0cHhcIiBoZWlnaHQ9XCI1NHB4XCIgdmlld0JveD1cIjAgMCA1NCA1NFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeG1sbnM6c2tldGNoPVwiaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zXCI+XFxuICAgICAgPHRpdGxlPkNoZWNrPC90aXRsZT5cXG4gICAgICA8ZGVmcz48L2RlZnM+XFxuICAgICAgPGcgaWQ9XCJQYWdlLTFcIiBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIHNrZXRjaDp0eXBlPVwiTVNQYWdlXCI+XFxuICAgICAgICA8cGF0aCBkPVwiTTIzLjUsMzEuODQzMTQ1OCBMMTcuNTg1MjQxOSwyNS45MjgzODc3IEMxNi4wMjQ4MjUzLDI0LjM2Nzk3MTEgMTMuNDkxMDI5NCwyNC4zNjY4MzUgMTEuOTI4OTMyMiwyNS45Mjg5MzIyIEMxMC4zNzAwMTM2LDI3LjQ4Nzg1MDggMTAuMzY2NTkxMiwzMC4wMjM0NDU1IDExLjkyODM4NzcsMzEuNTg1MjQxOSBMMjAuNDE0NzU4MSw0MC4wNzE2MTIzIEMyMC41MTMzOTk5LDQwLjE3MDI1NDEgMjAuNjE1OTMxNSw0MC4yNjI2NjQ5IDIwLjcyMTg2MTUsNDAuMzQ4ODQzNSBDMjIuMjgzNTY2OSw0MS44NzI1NjUxIDI0Ljc5NDIzNCw0MS44NjI2MjAyIDI2LjM0NjE1NjQsNDAuMzEwNjk3OCBMNDMuMzEwNjk3OCwyMy4zNDYxNTY0IEM0NC44NzcxMDIxLDIxLjc3OTc1MjEgNDQuODc1ODA1NywxOS4yNDgzODg3IDQzLjMxMzcwODUsMTcuNjg2MjkxNSBDNDEuNzU0Nzg5OSwxNi4xMjczNzI5IDM5LjIxNzYwMzUsMTYuMTI1NTQyMiAzNy42NTM4NDM2LDE3LjY4OTMwMjIgTDIzLjUsMzEuODQzMTQ1OCBaIE0yNyw1MyBDNDEuMzU5NDAzNSw1MyA1Myw0MS4zNTk0MDM1IDUzLDI3IEM1MywxMi42NDA1OTY1IDQxLjM1OTQwMzUsMSAyNywxIEMxMi42NDA1OTY1LDEgMSwxMi42NDA1OTY1IDEsMjcgQzEsNDEuMzU5NDAzNSAxMi42NDA1OTY1LDUzIDI3LDUzIFpcIiBpZD1cIk92YWwtMlwiIHN0cm9rZS1vcGFjaXR5PVwiMC4xOTg3OTQxNThcIiBzdHJva2U9XCIjNzQ3NDc0XCIgZmlsbC1vcGFjaXR5PVwiMC44MTY1MTk0NzVcIiBmaWxsPVwiI0ZGRkZGRlwiIHNrZXRjaDp0eXBlPVwiTVNTaGFwZUdyb3VwXCI+PC9wYXRoPlxcbiAgICAgIDwvZz5cXG4gICAgPC9zdmc+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XCJkei1lcnJvci1tYXJrXCI+XFxuICAgIDxzdmcgd2lkdGg9XCI1NHB4XCIgaGVpZ2h0PVwiNTRweFwiIHZpZXdCb3g9XCIwIDAgNTQgNTRcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhtbG5zOnNrZXRjaD1cImh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9uc1wiPlxcbiAgICAgIDx0aXRsZT5FcnJvcjwvdGl0bGU+XFxuICAgICAgPGRlZnM+PC9kZWZzPlxcbiAgICAgIDxnIGlkPVwiUGFnZS0xXCIgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBza2V0Y2g6dHlwZT1cIk1TUGFnZVwiPlxcbiAgICAgICAgPGcgaWQ9XCJDaGVjay0rLU92YWwtMlwiIHNrZXRjaDp0eXBlPVwiTVNMYXllckdyb3VwXCIgc3Ryb2tlPVwiIzc0NzQ3NFwiIHN0cm9rZS1vcGFjaXR5PVwiMC4xOTg3OTQxNThcIiBmaWxsPVwiI0ZGRkZGRlwiIGZpbGwtb3BhY2l0eT1cIjAuODE2NTE5NDc1XCI+XFxuICAgICAgICAgIDxwYXRoIGQ9XCJNMzIuNjU2ODU0MiwyOSBMMzguMzEwNjk3OCwyMy4zNDYxNTY0IEMzOS44NzcxMDIxLDIxLjc3OTc1MjEgMzkuODc1ODA1NywxOS4yNDgzODg3IDM4LjMxMzcwODUsMTcuNjg2MjkxNSBDMzYuNzU0Nzg5OSwxNi4xMjczNzI5IDM0LjIxNzYwMzUsMTYuMTI1NTQyMiAzMi42NTM4NDM2LDE3LjY4OTMwMjIgTDI3LDIzLjM0MzE0NTggTDIxLjM0NjE1NjQsMTcuNjg5MzAyMiBDMTkuNzgyMzk2NSwxNi4xMjU1NDIyIDE3LjI0NTIxMDEsMTYuMTI3MzcyOSAxNS42ODYyOTE1LDE3LjY4NjI5MTUgQzE0LjEyNDE5NDMsMTkuMjQ4Mzg4NyAxNC4xMjI4OTc5LDIxLjc3OTc1MjEgMTUuNjg5MzAyMiwyMy4zNDYxNTY0IEwyMS4zNDMxNDU4LDI5IEwxNS42ODkzMDIyLDM0LjY1Mzg0MzYgQzE0LjEyMjg5NzksMzYuMjIwMjQ3OSAxNC4xMjQxOTQzLDM4Ljc1MTYxMTMgMTUuNjg2MjkxNSw0MC4zMTM3MDg1IEMxNy4yNDUyMTAxLDQxLjg3MjYyNzEgMTkuNzgyMzk2NSw0MS44NzQ0NTc4IDIxLjM0NjE1NjQsNDAuMzEwNjk3OCBMMjcsMzQuNjU2ODU0MiBMMzIuNjUzODQzNiw0MC4zMTA2OTc4IEMzNC4yMTc2MDM1LDQxLjg3NDQ1NzggMzYuNzU0Nzg5OSw0MS44NzI2MjcxIDM4LjMxMzcwODUsNDAuMzEzNzA4NSBDMzkuODc1ODA1NywzOC43NTE2MTEzIDM5Ljg3NzEwMjEsMzYuMjIwMjQ3OSAzOC4zMTA2OTc4LDM0LjY1Mzg0MzYgTDMyLjY1Njg1NDIsMjkgWiBNMjcsNTMgQzQxLjM1OTQwMzUsNTMgNTMsNDEuMzU5NDAzNSA1MywyNyBDNTMsMTIuNjQwNTk2NSA0MS4zNTk0MDM1LDEgMjcsMSBDMTIuNjQwNTk2NSwxIDEsMTIuNjQwNTk2NSAxLDI3IEMxLDQxLjM1OTQwMzUgMTIuNjQwNTk2NSw1MyAyNyw1MyBaXCIgaWQ9XCJPdmFsLTJcIiBza2V0Y2g6dHlwZT1cIk1TU2hhcGVHcm91cFwiPjwvcGF0aD5cXG4gICAgICAgIDwvZz5cXG4gICAgICA8L2c+XFxuICAgIDwvc3ZnPlxcbiAgPC9kaXY+XFxuPC9kaXY+JyxcblxuXHRcdFx0XHRcdC8vIEVORCBPUFRJT05TXG5cdFx0XHRcdFx0Ly8gKFJlcXVpcmVkIGJ5IHRoZSBkcm9wem9uZSBkb2N1bWVudGF0aW9uIHBhcnNlcilcblxuXHRcdFx0XHRcdC8qXG4gICAgICAgICBUaG9zZSBmdW5jdGlvbnMgcmVnaXN0ZXIgdGhlbXNlbHZlcyB0byB0aGUgZXZlbnRzIG9uIGluaXQgYW5kIGhhbmRsZSBhbGxcbiAgICAgICAgIHRoZSB1c2VyIGludGVyZmFjZSBzcGVjaWZpYyBzdHVmZi4gT3ZlcndyaXRpbmcgdGhlbSB3b24ndCBicmVhayB0aGUgdXBsb2FkXG4gICAgICAgICBidXQgY2FuIGJyZWFrIHRoZSB3YXkgaXQncyBkaXNwbGF5ZWQuXG4gICAgICAgICBZb3UgY2FuIG92ZXJ3cml0ZSB0aGVtIGlmIHlvdSBkb24ndCBsaWtlIHRoZSBkZWZhdWx0IGJlaGF2aW9yLiBJZiB5b3UganVzdFxuICAgICAgICAgd2FudCB0byBhZGQgYW4gYWRkaXRpb25hbCBldmVudCBoYW5kbGVyLCByZWdpc3RlciBpdCBvbiB0aGUgZHJvcHpvbmUgb2JqZWN0XG4gICAgICAgICBhbmQgZG9uJ3Qgb3ZlcndyaXRlIHRob3NlIG9wdGlvbnMuXG4gICAgICAgICAqL1xuXG5cdFx0XHRcdFx0Ly8gVGhvc2UgYXJlIHNlbGYgZXhwbGFuYXRvcnkgYW5kIHNpbXBseSBjb25jZXJuIHRoZSBEcmFnbkRyb3AuXG5cdFx0XHRcdFx0ZHJvcDogZnVuY3Rpb24gZHJvcChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWRyYWctaG92ZXInKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGRyYWdzdGFydDogZnVuY3Rpb24gZHJhZ3N0YXJ0KGUpIHt9LFxuXHRcdFx0XHRcdGRyYWdlbmQ6IGZ1bmN0aW9uIGRyYWdlbmQoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1kcmFnLWhvdmVyJyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkcmFnZW50ZXI6IGZ1bmN0aW9uIGRyYWdlbnRlcihlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LWRyYWctaG92ZXInKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGRyYWdvdmVyOiBmdW5jdGlvbiBkcmFnb3ZlcihlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LWRyYWctaG92ZXInKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGRyYWdsZWF2ZTogZnVuY3Rpb24gZHJhZ2xlYXZlKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotZHJhZy1ob3ZlcicpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cGFzdGU6IGZ1bmN0aW9uIHBhc3RlKGUpIHt9LFxuXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW5ldmVyIHRoZXJlIGFyZSBubyBmaWxlcyBsZWZ0IGluIHRoZSBkcm9wem9uZSBhbnltb3JlLCBhbmQgdGhlXG5cdFx0XHRcdFx0Ly8gZHJvcHpvbmUgc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBpZiBpbiB0aGUgaW5pdGlhbCBzdGF0ZS5cblx0XHRcdFx0XHRyZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LXN0YXJ0ZWQnKTtcblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdoZW4gYSBmaWxlIGlzIGFkZGVkIHRvIHRoZSBxdWV1ZVxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYFxuXHRcdFx0XHRcdGFkZGVkZmlsZTogZnVuY3Rpb24gYWRkZWRmaWxlKGZpbGUpIHtcblx0XHRcdFx0XHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5lbGVtZW50ID09PSB0aGlzLnByZXZpZXdzQ29udGFpbmVyKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1zdGFydGVkJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh0aGlzLnByZXZpZXdzQ29udGFpbmVyKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUudHJpbSgpKTtcblx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3VGVtcGxhdGUgPSBmaWxlLnByZXZpZXdFbGVtZW50OyAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXG5cdFx0XHRcdFx0XHRcdHRoaXMucHJldmlld3NDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsZS5wcmV2aWV3RWxlbWVudCk7XG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjMgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LW5hbWVdJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTMgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2kzID0gMCxcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjMgPSBfaXNBcnJheTMgPyBfaXRlcmF0b3IzIDogX2l0ZXJhdG9yM1tTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmMztcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTMgPj0gX2l0ZXJhdG9yMy5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2kzID0gX2l0ZXJhdG9yMy5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kzLmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjMgPSBfaTMudmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG5vZGUgPSBfcmVmMztcblxuXHRcdFx0XHRcdFx0XHRcdG5vZGUudGV4dENvbnRlbnQgPSBmaWxlLm5hbWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yNCA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHotc2l6ZV0nKSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5NCA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaTQgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yNCA9IF9pc0FycmF5NCA/IF9pdGVyYXRvcjQgOiBfaXRlcmF0b3I0W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5NCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNCA+PSBfaXRlcmF0b3I0Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRub2RlID0gX2l0ZXJhdG9yNFtfaTQrK107XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pNCA9IF9pdGVyYXRvcjQubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNC5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdG5vZGUgPSBfaTQudmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0bm9kZS5pbm5lckhUTUwgPSB0aGlzLmZpbGVzaXplKGZpbGUuc2l6ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmFkZFJlbW92ZUxpbmtzKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZmlsZS5fcmVtb3ZlTGluayA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRcdFx0XHQnPGEgY2xhc3M9XCJkei1yZW1vdmVcIiBocmVmPVwiamF2YXNjcmlwdDp1bmRlZmluZWQ7XCIgZGF0YS1kei1yZW1vdmU+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZSArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2E+J1xuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3RWxlbWVudC5hcHBlbmRDaGlsZChmaWxlLl9yZW1vdmVMaW5rKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciByZW1vdmVGaWxlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVGaWxlRXZlbnQoZSkge1xuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gRHJvcHpvbmUuY29uZmlybShfdGhpczIub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMi5yZW1vdmVGaWxlKGZpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfdGhpczIub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gRHJvcHpvbmUuY29uZmlybShfdGhpczIub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbiwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMi5yZW1vdmVGaWxlKGZpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczIucmVtb3ZlRmlsZShmaWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yNSA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHotcmVtb3ZlXScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXk1ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pNSA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I1ID0gX2lzQXJyYXk1ID8gX2l0ZXJhdG9yNSA6IF9pdGVyYXRvcjVbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjQ7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXk1KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k1ID49IF9pdGVyYXRvcjUubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY0ID0gX2l0ZXJhdG9yNVtfaTUrK107XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pNSA9IF9pdGVyYXRvcjUubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY0ID0gX2k1LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdHZhciByZW1vdmVMaW5rID0gX3JlZjQ7XG5cblx0XHRcdFx0XHRcdFx0XHRyZW1vdmVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlRmlsZUV2ZW50KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbmV2ZXIgYSBmaWxlIGlzIHJlbW92ZWQuXG5cdFx0XHRcdFx0cmVtb3ZlZGZpbGU6IGZ1bmN0aW9uIHJlbW92ZWRmaWxlKGZpbGUpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50ICE9IG51bGwgJiYgZmlsZS5wcmV2aWV3RWxlbWVudC5wYXJlbnROb2RlICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3RWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZpbGUucHJldmlld0VsZW1lbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XG5cdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuIGEgdGh1bWJuYWlsIGhhcyBiZWVuIGdlbmVyYXRlZFxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYCBhbmQgYGRhdGFVcmxgXG5cdFx0XHRcdFx0dGh1bWJuYWlsOiBmdW5jdGlvbiB0aHVtYm5haWwoZmlsZSwgZGF0YVVybCkge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkei1maWxlLXByZXZpZXcnKTtcblx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yNiA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHotdGh1bWJuYWlsXScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXk2ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pNiA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I2ID0gX2lzQXJyYXk2ID8gX2l0ZXJhdG9yNiA6IF9pdGVyYXRvcjZbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjU7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXk2KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k2ID49IF9pdGVyYXRvcjYubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY1ID0gX2l0ZXJhdG9yNltfaTYrK107XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pNiA9IF9pdGVyYXRvcjYubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pNi5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY1ID0gX2k2LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdHZhciB0aHVtYm5haWxFbGVtZW50ID0gX3JlZjU7XG5cblx0XHRcdFx0XHRcdFx0XHR0aHVtYm5haWxFbGVtZW50LmFsdCA9IGZpbGUubmFtZTtcblx0XHRcdFx0XHRcdFx0XHR0aHVtYm5haWxFbGVtZW50LnNyYyA9IGRhdGFVcmw7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1pbWFnZS1wcmV2aWV3Jyk7XG5cdFx0XHRcdFx0XHRcdH0sIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbmV2ZXIgYW4gZXJyb3Igb2NjdXJzXG5cdFx0XHRcdFx0Ly8gUmVjZWl2ZXMgYGZpbGVgIGFuZCBgbWVzc2FnZWBcblx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gZXJyb3IoZmlsZSwgbWVzc2FnZSkge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0ZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkei1lcnJvcicpO1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdTdHJpbmcnICYmIG1lc3NhZ2UuZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5lcnJvcjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3I3ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kei1lcnJvcm1lc3NhZ2VdJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTcgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2k3ID0gMCxcblx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjcgPSBfaXNBcnJheTcgPyBfaXRlcmF0b3I3IDogX2l0ZXJhdG9yN1tTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmNjtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTcgPj0gX2l0ZXJhdG9yNy5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjYgPSBfaXRlcmF0b3I3W19pNysrXTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2k3ID0gX2l0ZXJhdG9yNy5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k3LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjYgPSBfaTcudmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIG5vZGUgPSBfcmVmNjtcblxuXHRcdFx0XHRcdFx0XHRcdG5vZGUudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRlcnJvcm11bHRpcGxlOiBmdW5jdGlvbiBlcnJvcm11bHRpcGxlKCkge30sXG5cblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbiBhIGZpbGUgZ2V0cyBwcm9jZXNzZWQuIFNpbmNlIHRoZXJlIGlzIGEgY3VlLCBub3QgYWxsIGFkZGVkXG5cdFx0XHRcdFx0Ly8gZmlsZXMgYXJlIHByb2Nlc3NlZCBpbW1lZGlhdGVseS5cblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWBcblx0XHRcdFx0XHRwcm9jZXNzaW5nOiBmdW5jdGlvbiBwcm9jZXNzaW5nKGZpbGUpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotcHJvY2Vzc2luZycpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZmlsZS5fcmVtb3ZlTGluaykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoZmlsZS5fcmVtb3ZlTGluay50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy5kaWN0Q2FuY2VsVXBsb2FkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cHJvY2Vzc2luZ211bHRpcGxlOiBmdW5jdGlvbiBwcm9jZXNzaW5nbXVsdGlwbGUoKSB7fSxcblxuXHRcdFx0XHRcdC8vIENhbGxlZCB3aGVuZXZlciB0aGUgdXBsb2FkIHByb2dyZXNzIGdldHMgdXBkYXRlZC5cblx0XHRcdFx0XHQvLyBSZWNlaXZlcyBgZmlsZWAsIGBwcm9ncmVzc2AgKHBlcmNlbnRhZ2UgMC0xMDApIGFuZCBgYnl0ZXNTZW50YC5cblx0XHRcdFx0XHQvLyBUbyBnZXQgdGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyBvZiB0aGUgZmlsZSwgdXNlIGBmaWxlLnNpemVgXG5cdFx0XHRcdFx0dXBsb2FkcHJvZ3Jlc3M6IGZ1bmN0aW9uIHVwbG9hZHByb2dyZXNzKGZpbGUsIHByb2dyZXNzLCBieXRlc1NlbnQpIHtcblx0XHRcdFx0XHRcdGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjggPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWR6LXVwbG9hZHByb2dyZXNzXScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXk4ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9pOCA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3I4ID0gX2lzQXJyYXk4ID8gX2l0ZXJhdG9yOCA6IF9pdGVyYXRvcjhbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjc7XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXk4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2k4ID49IF9pdGVyYXRvcjgubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY3ID0gX2l0ZXJhdG9yOFtfaTgrK107XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdF9pOCA9IF9pdGVyYXRvcjgubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pOC5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdF9yZWY3ID0gX2k4LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdHZhciBub2RlID0gX3JlZjc7XG5cblx0XHRcdFx0XHRcdFx0XHRub2RlLm5vZGVOYW1lID09PSAnUFJPR1JFU1MnID8gKG5vZGUudmFsdWUgPSBwcm9ncmVzcykgOiAobm9kZS5zdHlsZS53aWR0aCA9IHByb2dyZXNzICsgJyUnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cblx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbmV2ZXIgdGhlIHRvdGFsIHVwbG9hZCBwcm9ncmVzcyBnZXRzIHVwZGF0ZWQuXG5cdFx0XHRcdFx0Ly8gQ2FsbGVkIHdpdGggdG90YWxVcGxvYWRQcm9ncmVzcyAoMC0xMDApLCB0b3RhbEJ5dGVzIGFuZCB0b3RhbEJ5dGVzU2VudFxuXHRcdFx0XHRcdHRvdGFsdXBsb2FkcHJvZ3Jlc3M6IGZ1bmN0aW9uIHRvdGFsdXBsb2FkcHJvZ3Jlc3MoKSB7fSxcblxuXHRcdFx0XHRcdC8vIENhbGxlZCBqdXN0IGJlZm9yZSB0aGUgZmlsZSBpcyBzZW50LiBHZXRzIHRoZSBgeGhyYCBvYmplY3QgYXMgc2Vjb25kXG5cdFx0XHRcdFx0Ly8gcGFyYW1ldGVyLCBzbyB5b3UgY2FuIG1vZGlmeSBpdCAoZm9yIGV4YW1wbGUgdG8gYWRkIGEgQ1NSRiB0b2tlbikgYW5kIGFcblx0XHRcdFx0XHQvLyBgZm9ybURhdGFgIG9iamVjdCB0byBhZGQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi5cblx0XHRcdFx0XHRzZW5kaW5nOiBmdW5jdGlvbiBzZW5kaW5nKCkge30sXG5cdFx0XHRcdFx0c2VuZGluZ211bHRpcGxlOiBmdW5jdGlvbiBzZW5kaW5nbXVsdGlwbGUoKSB7fSxcblxuXHRcdFx0XHRcdC8vIFdoZW4gdGhlIGNvbXBsZXRlIHVwbG9hZCBpcyBmaW5pc2hlZCBhbmQgc3VjY2Vzc2Z1bFxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoZmlsZSkge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotc3VjY2VzcycpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3VjY2Vzc211bHRpcGxlOiBmdW5jdGlvbiBzdWNjZXNzbXVsdGlwbGUoKSB7fSxcblxuXHRcdFx0XHRcdC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBjYW5jZWxlZC5cblx0XHRcdFx0XHRjYW5jZWxlZDogZnVuY3Rpb24gY2FuY2VsZWQoZmlsZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBmaWxlLCAnVXBsb2FkIGNhbmNlbGVkLicpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2FuY2VsZWRtdWx0aXBsZTogZnVuY3Rpb24gY2FuY2VsZWRtdWx0aXBsZSgpIHt9LFxuXG5cdFx0XHRcdFx0Ly8gV2hlbiB0aGUgdXBsb2FkIGlzIGZpbmlzaGVkLCBlaXRoZXIgd2l0aCBzdWNjZXNzIG9yIGFuIGVycm9yLlxuXHRcdFx0XHRcdC8vIFJlY2VpdmVzIGBmaWxlYFxuXHRcdFx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShmaWxlKSB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5fcmVtb3ZlTGluaykge1xuXHRcdFx0XHRcdFx0XHRmaWxlLl9yZW1vdmVMaW5rLnRleHRDb250ZW50ID0gdGhpcy5vcHRpb25zLmRpY3RSZW1vdmVGaWxlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUucHJldmlld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHotY29tcGxldGUnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNvbXBsZXRlbXVsdGlwbGU6IGZ1bmN0aW9uIGNvbXBsZXRlbXVsdGlwbGUoKSB7fSxcblx0XHRcdFx0XHRtYXhmaWxlc2V4Y2VlZGVkOiBmdW5jdGlvbiBtYXhmaWxlc2V4Y2VlZGVkKCkge30sXG5cdFx0XHRcdFx0bWF4ZmlsZXNyZWFjaGVkOiBmdW5jdGlvbiBtYXhmaWxlc3JlYWNoZWQoKSB7fSxcblx0XHRcdFx0XHRxdWV1ZWNvbXBsZXRlOiBmdW5jdGlvbiBxdWV1ZWNvbXBsZXRlKCkge30sXG5cdFx0XHRcdFx0YWRkZWRmaWxlczogZnVuY3Rpb24gYWRkZWRmaWxlcygpIHt9LFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHRoaXMucHJvdG90eXBlLl90aHVtYm5haWxRdWV1ZSA9IFtdO1xuXHRcdFx0XHR0aGlzLnByb3RvdHlwZS5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IGZhbHNlO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gZ2xvYmFsIHV0aWxpdHlcblx0XHR9LFxuXHRcdHtcblx0XHRcdGtleTogJ2V4dGVuZCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuXHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIG9iamVjdHMgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxO1xuXHRcdFx0XHRcdF9rZXkyIDwgX2xlbjI7XG5cdFx0XHRcdFx0X2tleTIrK1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRvYmplY3RzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yOSA9IG9iamVjdHMsXG5cdFx0XHRcdFx0XHRfaXNBcnJheTkgPSB0cnVlLFxuXHRcdFx0XHRcdFx0X2k5ID0gMCxcblx0XHRcdFx0XHRcdF9pdGVyYXRvcjkgPSBfaXNBcnJheTkgPyBfaXRlcmF0b3I5IDogX2l0ZXJhdG9yOVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0O1xuXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHZhciBfcmVmODtcblxuXHRcdFx0XHRcdGlmIChfaXNBcnJheTkpIHtcblx0XHRcdFx0XHRcdGlmIChfaTkgPj0gX2l0ZXJhdG9yOS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0X3JlZjggPSBfaXRlcmF0b3I5W19pOSsrXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X2k5ID0gX2l0ZXJhdG9yOS5uZXh0KCk7XG5cdFx0XHRcdFx0XHRpZiAoX2k5LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0X3JlZjggPSBfaTkudmFsdWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIG9iamVjdCA9IF9yZWY4O1xuXG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuXHRcdFx0XHRcdFx0dmFyIHZhbCA9IG9iamVjdFtrZXldO1xuXHRcdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSB2YWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdF0pO1xuXG5cdGZ1bmN0aW9uIERyb3B6b25lKGVsLCBvcHRpb25zKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyb3B6b25lKTtcblxuXHRcdHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChEcm9wem9uZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3B6b25lKSkuY2FsbCh0aGlzKSk7XG5cblx0XHR2YXIgZmFsbGJhY2sgPSB2b2lkIDAsXG5cdFx0XHRsZWZ0ID0gdm9pZCAwO1xuXHRcdF90aGlzLmVsZW1lbnQgPSBlbDtcblx0XHQvLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgc2luY2UgdGhlIHZlcnNpb24gd2FzIGluIHRoZSBwcm90b3R5cGUgcHJldmlvdXNseVxuXHRcdF90aGlzLnZlcnNpb24gPSBEcm9wem9uZS52ZXJzaW9uO1xuXG5cdFx0X3RoaXMuZGVmYXVsdE9wdGlvbnMucHJldmlld1RlbXBsYXRlID0gX3RoaXMuZGVmYXVsdE9wdGlvbnMucHJldmlld1RlbXBsYXRlLnJlcGxhY2UoL1xcbiovZywgJycpO1xuXG5cdFx0X3RoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBbXTtcblx0XHRfdGhpcy5saXN0ZW5lcnMgPSBbXTtcblx0XHRfdGhpcy5maWxlcyA9IFtdOyAvLyBBbGwgZmlsZXNcblxuXHRcdGlmICh0eXBlb2YgX3RoaXMuZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdF90aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKF90aGlzLmVsZW1lbnQpO1xuXHRcdH1cblxuXHRcdC8vIE5vdCBjaGVja2luZyBpZiBpbnN0YW5jZSBvZiBIVE1MRWxlbWVudCBvciBFbGVtZW50IHNpbmNlIElFOSBpcyBleHRyZW1lbHkgd2VpcmQuXG5cdFx0aWYgKCFfdGhpcy5lbGVtZW50IHx8IF90aGlzLmVsZW1lbnQubm9kZVR5cGUgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGRyb3B6b25lIGVsZW1lbnQuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKF90aGlzLmVsZW1lbnQuZHJvcHpvbmUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRHJvcHpvbmUgYWxyZWFkeSBhdHRhY2hlZC4nKTtcblx0XHR9XG5cblx0XHQvLyBOb3cgYWRkIHRoaXMgZHJvcHpvbmUgdG8gdGhlIGluc3RhbmNlcy5cblx0XHREcm9wem9uZS5pbnN0YW5jZXMucHVzaChfdGhpcyk7XG5cblx0XHQvLyBQdXQgdGhlIGRyb3B6b25lIGluc2lkZSB0aGUgZWxlbWVudCBpdHNlbGYuXG5cdFx0X3RoaXMuZWxlbWVudC5kcm9wem9uZSA9IF90aGlzO1xuXG5cdFx0dmFyIGVsZW1lbnRPcHRpb25zID0gKGxlZnQgPSBEcm9wem9uZS5vcHRpb25zRm9yRWxlbWVudChfdGhpcy5lbGVtZW50KSkgIT0gbnVsbCA/IGxlZnQgOiB7fTtcblxuXHRcdF90aGlzLm9wdGlvbnMgPSBEcm9wem9uZS5leHRlbmQoe30sIF90aGlzLmRlZmF1bHRPcHRpb25zLCBlbGVtZW50T3B0aW9ucywgb3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucyA6IHt9KTtcblxuXHRcdC8vIElmIHRoZSBicm93c2VyIGZhaWxlZCwganVzdCBjYWxsIHRoZSBmYWxsYmFjayBhbmQgbGVhdmVcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5mb3JjZUZhbGxiYWNrIHx8ICFEcm9wem9uZS5pc0Jyb3dzZXJTdXBwb3J0ZWQoKSkge1xuXHRcdFx0dmFyIF9yZXQ7XG5cblx0XHRcdHJldHVybiAoX3JldCA9IF90aGlzLm9wdGlvbnMuZmFsbGJhY2suY2FsbChfdGhpcykpLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG5cdFx0fVxuXG5cdFx0Ly8gQG9wdGlvbnMudXJsID0gQGVsZW1lbnQuZ2V0QXR0cmlidXRlIFwiYWN0aW9uXCIgdW5sZXNzIEBvcHRpb25zLnVybD9cblx0XHRpZiAoX3RoaXMub3B0aW9ucy51cmwgPT0gbnVsbCkge1xuXHRcdFx0X3RoaXMub3B0aW9ucy51cmwgPSBfdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnYWN0aW9uJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFfdGhpcy5vcHRpb25zLnVybCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdObyBVUkwgcHJvdmlkZWQuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAmJiBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiWW91IGNhbid0IHByb3ZpZGUgYm90aCAnYWNjZXB0ZWRGaWxlcycgYW5kICdhY2NlcHRlZE1pbWVUeXBlcycuICdhY2NlcHRlZE1pbWVUeXBlcycgaXMgZGVwcmVjYXRlZC5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoX3RoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSAmJiBfdGhpcy5vcHRpb25zLmNodW5raW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3Qgc2V0IGJvdGg6IHVwbG9hZE11bHRpcGxlIGFuZCBjaHVua2luZy4nKTtcblx0XHR9XG5cblx0XHQvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXHRcdGlmIChfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzKSB7XG5cdFx0XHRfdGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMgPSBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzO1xuXHRcdFx0ZGVsZXRlIF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRNaW1lVHlwZXM7XG5cdFx0fVxuXG5cdFx0Ly8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblx0XHRpZiAoX3RoaXMub3B0aW9ucy5yZW5hbWVGaWxlbmFtZSAhPSBudWxsKSB7XG5cdFx0XHRfdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUgPSBmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdHJldHVybiBfdGhpcy5vcHRpb25zLnJlbmFtZUZpbGVuYW1lLmNhbGwoX3RoaXMsIGZpbGUubmFtZSwgZmlsZSk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdF90aGlzLm9wdGlvbnMubWV0aG9kID0gX3RoaXMub3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKTtcblxuXHRcdGlmICgoZmFsbGJhY2sgPSBfdGhpcy5nZXRFeGlzdGluZ0ZhbGxiYWNrKCkpICYmIGZhbGxiYWNrLnBhcmVudE5vZGUpIHtcblx0XHRcdC8vIFJlbW92ZSB0aGUgZmFsbGJhY2tcblx0XHRcdGZhbGxiYWNrLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmFsbGJhY2spO1xuXHRcdH1cblxuXHRcdC8vIERpc3BsYXkgcHJldmlld3MgaW4gdGhlIHByZXZpZXdzQ29udGFpbmVyIGVsZW1lbnQgb3IgdGhlIERyb3B6b25lIGVsZW1lbnQgdW5sZXNzIGV4cGxpY2l0bHkgc2V0IHRvIGZhbHNlXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIgIT09IGZhbHNlKSB7XG5cdFx0XHRpZiAoX3RoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lcikge1xuXHRcdFx0XHRfdGhpcy5wcmV2aWV3c0NvbnRhaW5lciA9IERyb3B6b25lLmdldEVsZW1lbnQoX3RoaXMub3B0aW9ucy5wcmV2aWV3c0NvbnRhaW5lciwgJ3ByZXZpZXdzQ29udGFpbmVyJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfdGhpcy5wcmV2aWV3c0NvbnRhaW5lciA9IF90aGlzLmVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKF90aGlzLm9wdGlvbnMuY2xpY2thYmxlKSB7XG5cdFx0XHRpZiAoX3RoaXMub3B0aW9ucy5jbGlja2FibGUgPT09IHRydWUpIHtcblx0XHRcdFx0X3RoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBbX3RoaXMuZWxlbWVudF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfdGhpcy5jbGlja2FibGVFbGVtZW50cyA9IERyb3B6b25lLmdldEVsZW1lbnRzKF90aGlzLm9wdGlvbnMuY2xpY2thYmxlLCAnY2xpY2thYmxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0X3RoaXMuaW5pdCgpO1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdC8vIFJldHVybnMgYWxsIGZpbGVzIHRoYXQgaGF2ZSBiZWVuIGFjY2VwdGVkXG5cblx0X2NyZWF0ZUNsYXNzKFxuXHRcdERyb3B6b25lLFxuXHRcdFtcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZ2V0QWNjZXB0ZWRGaWxlcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRBY2NlcHRlZEZpbGVzKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbGVzXG5cdFx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGUuYWNjZXB0ZWQ7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmaWxlO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBoYXZlIGJlZW4gcmVqZWN0ZWRcblx0XHRcdFx0Ly8gTm90IHN1cmUgd2hlbiB0aGF0J3MgZ29pbmcgdG8gYmUgdXNlZnVsLCBidXQgYWRkZWQgZm9yIGNvbXBsZXRlbmVzcy5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2dldFJlamVjdGVkRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0UmVqZWN0ZWRGaWxlcygpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5maWxlc1xuXHRcdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAhZmlsZS5hY2NlcHRlZDtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGU7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2dldEZpbGVzV2l0aFN0YXR1cycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRGaWxlc1dpdGhTdGF0dXMoc3RhdHVzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZmlsZXNcblx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5zdGF0dXMgPT09IHN0YXR1cztcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGU7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSZXR1cm5zIGFsbCBmaWxlcyB0aGF0IGFyZSBpbiB0aGUgcXVldWVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2dldFF1ZXVlZEZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFF1ZXVlZEZpbGVzKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cyhEcm9wem9uZS5RVUVVRUQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZ2V0VXBsb2FkaW5nRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0VXBsb2FkaW5nRmlsZXMoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RmlsZXNXaXRoU3RhdHVzKERyb3B6b25lLlVQTE9BRElORyk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdnZXRBZGRlZEZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEFkZGVkRmlsZXMoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0RmlsZXNXaXRoU3RhdHVzKERyb3B6b25lLkFEREVEKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBGaWxlcyB0aGF0IGFyZSBlaXRoZXIgcXVldWVkIG9yIHVwbG9hZGluZ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZ2V0QWN0aXZlRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0QWN0aXZlRmlsZXMoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZmlsZXNcblx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORyB8fCBmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuUVVFVUVEO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIHdoZW4gRHJvcHpvbmUgaXMgaW5pdGlhbGl6ZWQuIFlvdVxuXHRcdFx0XHQvLyBjYW4gKGFuZCBzaG91bGQpIHNldHVwIGV2ZW50IGxpc3RlbmVycyBpbnNpZGUgdGhpcyBmdW5jdGlvbi5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2luaXQnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdFx0XHRcdC8vIEluIGNhc2UgaXQgaXNuJ3Qgc2V0IGFscmVhZHlcblx0XHRcdFx0XHRpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdmb3JtJykge1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZW5jdHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3B6b25lJykgJiYgIXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHotbWVzc2FnZScpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoXG5cdFx0XHRcdFx0XHRcdERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJkei1kZWZhdWx0IGR6LW1lc3NhZ2VcIj48c3Bhbj4nICsgdGhpcy5vcHRpb25zLmRpY3REZWZhdWx0TWVzc2FnZSArICc8L3NwYW4+PC9kaXY+J1xuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0dmFyIHNldHVwSGlkZGVuRmlsZUlucHV0ID0gZnVuY3Rpb24gc2V0dXBIaWRkZW5GaWxlSW5wdXQoKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfdGhpczMuaGlkZGVuRmlsZUlucHV0KSB7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzMy5oaWRkZW5GaWxlSW5wdXQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gdmFyIGRyb3Bab25lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHotaGlkZGVuLWlucHV0Jyk7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIChkcm9wWm9uZUlucHV0KSB7IGRyb3Bab25lSW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKSB9O1xuXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdmaWxlJyk7XG5cdFx0XHRcdFx0XHRcdGlmIChfdGhpczMub3B0aW9ucy5tYXhGaWxlcyA9PT0gbnVsbCB8fCBfdGhpczMub3B0aW9ucy5tYXhGaWxlcyA+IDEpIHtcblx0XHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCAnbXVsdGlwbGUnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LmNsYXNzTmFtZSA9ICdkei1oaWRkZW4taW5wdXQnO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfdGhpczMub3B0aW9ucy5hY2NlcHRlZEZpbGVzICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2FjY2VwdCcsIF90aGlzMy5vcHRpb25zLmFjY2VwdGVkRmlsZXMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChfdGhpczMub3B0aW9ucy5jYXB0dXJlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2NhcHR1cmUnLCBfdGhpczMub3B0aW9ucy5jYXB0dXJlKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIE5vdCBzZXR0aW5nIGBkaXNwbGF5PVwibm9uZVwiYCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgZG9uJ3QgYWNjZXB0IGNsaWNrc1xuXHRcdFx0XHRcdFx0XHQvLyBvbiBlbGVtZW50cyB0aGF0IGFyZW4ndCBkaXNwbGF5ZWQuXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXHRcdFx0XHRcdFx0XHRfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS50b3AgPSAnMCc7XG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUubGVmdCA9ICcwJztcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5oZWlnaHQgPSAnMCc7XG5cdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUud2lkdGggPSAnMCc7XG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoX3RoaXMzLm9wdGlvbnMuaGlkZGVuSW5wdXRDb250YWluZXIpLmFwcGVuZENoaWxkKF90aGlzMy5oaWRkZW5GaWxlSW5wdXQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZmlsZXMgPSBfdGhpczMuaGlkZGVuRmlsZUlucHV0LmZpbGVzO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGZpbGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjEwID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxMCA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X2kxMCA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTAgPSBfaXNBcnJheTEwID8gX2l0ZXJhdG9yMTAgOiBfaXRlcmF0b3IxMFtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmOTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxMCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTEwID49IF9pdGVyYXRvcjEwLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjkgPSBfaXRlcmF0b3IxMFtfaTEwKytdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdF9pMTAgPSBfaXRlcmF0b3IxMC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTAuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjkgPSBfaTEwLnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmOTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfdGhpczMuYWRkRmlsZShmaWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMzLmVtaXQoJ2FkZGVkZmlsZXMnLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldHVwSGlkZGVuRmlsZUlucHV0KCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHNldHVwSGlkZGVuRmlsZUlucHV0KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5VUkwgPSB3aW5kb3cuVVJMICE9PSBudWxsID8gd2luZG93LlVSTCA6IHdpbmRvdy53ZWJraXRVUkw7XG5cblx0XHRcdFx0XHQvLyBTZXR1cCBhbGwgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBEcm9wem9uZSBvYmplY3QgaXRzZWxmLlxuXHRcdFx0XHRcdC8vIFRoZXkncmUgbm90IGluIEBzZXR1cEV2ZW50TGlzdGVuZXJzKCkgYmVjYXVzZSB0aGV5IHNob3VsZG4ndCBiZSByZW1vdmVkXG5cdFx0XHRcdFx0Ly8gYWdhaW4gd2hlbiB0aGUgZHJvcHpvbmUgZ2V0cyBkaXNhYmxlZC5cblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjExID0gdGhpcy5ldmVudHMsXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MTEgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRfaTExID0gMCxcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTEgPSBfaXNBcnJheTExID8gX2l0ZXJhdG9yMTEgOiBfaXRlcmF0b3IxMVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHZhciBfcmVmMTA7XG5cblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTExKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTExID49IF9pdGVyYXRvcjExLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYxMCA9IF9pdGVyYXRvcjExW19pMTErK107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfaTExID0gX2l0ZXJhdG9yMTEubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kxMS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjEwID0gX2kxMS52YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGV2ZW50TmFtZSA9IF9yZWYxMDtcblxuXHRcdFx0XHRcdFx0dGhpcy5vbihldmVudE5hbWUsIHRoaXMub3B0aW9uc1tldmVudE5hbWVdKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLm9uKCd1cGxvYWRwcm9ncmVzcycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy51cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR0aGlzLm9uKCdyZW1vdmVkZmlsZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy51cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR0aGlzLm9uKCdjYW5jZWxlZCcsIGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnY29tcGxldGUnLCBmaWxlKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIEVtaXQgYSBgcXVldWVjb21wbGV0ZWAgZXZlbnQgaWYgYWxsIGZpbGVzIGZpbmlzaGVkIHVwbG9hZGluZy5cblx0XHRcdFx0XHR0aGlzLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmdldEFkZGVkRmlsZXMoKS5sZW5ndGggPT09IDAgJiZcblx0XHRcdFx0XHRcdFx0X3RoaXMzLmdldFVwbG9hZGluZ0ZpbGVzKCkubGVuZ3RoID09PSAwICYmXG5cdFx0XHRcdFx0XHRcdF90aGlzMy5nZXRRdWV1ZWRGaWxlcygpLmxlbmd0aCA9PT0gMFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVmZXJyZWQgc28gdGhhdCBgcXVldWVjb21wbGV0ZWAgcmVhbGx5IHRyaWdnZXJzIGFmdGVyIGBjb21wbGV0ZWBcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdxdWV1ZWNvbXBsZXRlJyk7XG5cdFx0XHRcdFx0XHRcdH0sIDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dmFyIG5vUHJvcGFnYXRpb24gPSBmdW5jdGlvbiBub1Byb3BhZ2F0aW9uKGUpIHtcblx0XHRcdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChlLnJldHVyblZhbHVlID0gZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQvLyBDcmVhdGUgdGhlIGxpc3RlbmVyc1xuXHRcdFx0XHRcdHRoaXMubGlzdGVuZXJzID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG5cdFx0XHRcdFx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHRcdFx0XHRcdGRyYWdzdGFydDogZnVuY3Rpb24gZHJhZ3N0YXJ0KGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZW1pdCgnZHJhZ3N0YXJ0JywgZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRkcmFnZW50ZXI6IGZ1bmN0aW9uIGRyYWdlbnRlcihlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRub1Byb3BhZ2F0aW9uKGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdkcmFnZW50ZXInLCBlKTtcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGRyYWdvdmVyOiBmdW5jdGlvbiBkcmFnb3ZlcihlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBNYWtlcyBpdCBwb3NzaWJsZSB0byBkcmFnIGZpbGVzIGZyb20gY2hyb21lJ3MgZG93bmxvYWQgYmFyXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NTI2NDMwL2RyYWctYW5kLWRyb3AtZmlsZS11cGxvYWRzLWZyb20tY2hyb21lLWRvd25sb2Fkcy1iYXJcblx0XHRcdFx0XHRcdFx0XHRcdC8vIFRyeSBpcyByZXF1aXJlZCB0byBwcmV2ZW50IGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMSAoU0NSSVBUNjU1MzUgZXhjZXB0aW9uKVxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGVmY3QgPSB2b2lkIDA7XG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlZmN0ID0gZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZDtcblx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJyA9PT0gZWZjdCB8fCAnbGlua01vdmUnID09PSBlZmN0ID8gJ21vdmUnIDogJ2NvcHknO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRub1Byb3BhZ2F0aW9uKGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdkcmFnb3ZlcicsIGUpO1xuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0ZHJhZ2xlYXZlOiBmdW5jdGlvbiBkcmFnbGVhdmUoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdkcmFnbGVhdmUnLCBlKTtcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGRyb3A6IGZ1bmN0aW9uIGRyb3AoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bm9Qcm9wYWdhdGlvbihlKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczMuZHJvcChlKTtcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdGRyYWdlbmQ6IGZ1bmN0aW9uIGRyYWdlbmQoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMy5lbWl0KCdkcmFnZW5kJywgZSk7XG5cdFx0XHRcdFx0XHRcdFx0fSxcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgZGlzYWJsZWQgcmlnaHQgbm93LCBiZWNhdXNlIHRoZSBicm93c2VycyBkb24ndCBpbXBsZW1lbnQgaXQgcHJvcGVybHkuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gXCJwYXN0ZVwiOiAoZSkgPT5cblx0XHRcdFx0XHRcdFx0XHQvLyAgIG5vUHJvcGFnYXRpb24gZVxuXHRcdFx0XHRcdFx0XHRcdC8vICAgQHBhc3RlIGVcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XTtcblxuXHRcdFx0XHRcdHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihjbGlja2FibGVFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLmxpc3RlbmVycy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogY2xpY2thYmxlRWxlbWVudCxcblx0XHRcdFx0XHRcdFx0ZXZlbnRzOiB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGV2dCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gT25seSB0aGUgYWN0dWFsIGRyb3B6b25lIG9yIHRoZSBtZXNzYWdlIGVsZW1lbnQgc2hvdWxkIHRyaWdnZXIgZmlsZSBzZWxlY3Rpb25cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xpY2thYmxlRWxlbWVudCAhPT0gX3RoaXMzLmVsZW1lbnQgfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZ0LnRhcmdldCA9PT0gX3RoaXMzLmVsZW1lbnQgfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0RHJvcHpvbmUuZWxlbWVudEluc2lkZShldnQudGFyZ2V0LCBfdGhpczMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHotbWVzc2FnZScpKVxuXHRcdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuY2xpY2soKTsgLy8gRm9yd2FyZCB0aGUgY2xpY2tcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHRoaXMuZW5hYmxlKCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmluaXQuY2FsbCh0aGlzKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBOb3QgZnVsbHkgdGVzdGVkIHlldFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZGVzdHJveScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdFx0XHRcdHRoaXMuZGlzYWJsZSgpO1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlQWxsRmlsZXModHJ1ZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaGlkZGVuRmlsZUlucHV0ICE9IG51bGwgPyB0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlIDogdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaGlkZGVuRmlsZUlucHV0KTtcblx0XHRcdFx0XHRcdHRoaXMuaGlkZGVuRmlsZUlucHV0ID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5kcm9wem9uZTtcblx0XHRcdFx0XHRyZXR1cm4gRHJvcHpvbmUuaW5zdGFuY2VzLnNwbGljZShEcm9wem9uZS5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKSwgMSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICd1cGRhdGVUb3RhbFVwbG9hZFByb2dyZXNzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKSB7XG5cdFx0XHRcdFx0dmFyIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSB2b2lkIDA7XG5cdFx0XHRcdFx0dmFyIHRvdGFsQnl0ZXNTZW50ID0gMDtcblx0XHRcdFx0XHR2YXIgdG90YWxCeXRlcyA9IDA7XG5cblx0XHRcdFx0XHR2YXIgYWN0aXZlRmlsZXMgPSB0aGlzLmdldEFjdGl2ZUZpbGVzKCk7XG5cblx0XHRcdFx0XHRpZiAoYWN0aXZlRmlsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTIgPSB0aGlzLmdldEFjdGl2ZUZpbGVzKCksXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkxMiA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0X2kxMiA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTIgPSBfaXNBcnJheTEyID8gX2l0ZXJhdG9yMTIgOiBfaXRlcmF0b3IxMltTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMTE7XG5cblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MTIpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxMiA+PSBfaXRlcmF0b3IxMi5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYxMSA9IF9pdGVyYXRvcjEyW19pMTIrK107XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X2kxMiA9IF9pdGVyYXRvcjEyLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxMi5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTEgPSBfaTEyLnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMTE7XG5cblx0XHRcdFx0XHRcdFx0dG90YWxCeXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuYnl0ZXNTZW50O1xuXHRcdFx0XHRcdFx0XHR0b3RhbEJ5dGVzICs9IGZpbGUudXBsb2FkLnRvdGFsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dG90YWxVcGxvYWRQcm9ncmVzcyA9ICgxMDAgKiB0b3RhbEJ5dGVzU2VudCkgLyB0b3RhbEJ5dGVzO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0b3RhbFVwbG9hZFByb2dyZXNzID0gMTAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmVtaXQoJ3RvdGFsdXBsb2FkcHJvZ3Jlc3MnLCB0b3RhbFVwbG9hZFByb2dyZXNzLCB0b3RhbEJ5dGVzLCB0b3RhbEJ5dGVzU2VudCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQG9wdGlvbnMucGFyYW1OYW1lIGNhbiBiZSBhIGZ1bmN0aW9uIHRha2luZyBvbmUgcGFyYW1ldGVyIHJhdGhlciB0aGFuIGEgc3RyaW5nLlxuXHRcdFx0XHQvLyBBIHBhcmFtZXRlciBuYW1lIGZvciBhIGZpbGUgaXMgb2J0YWluZWQgc2ltcGx5IGJ5IGNhbGxpbmcgdGhpcyB3aXRoIGFuIGluZGV4IG51bWJlci5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19nZXRQYXJhbU5hbWUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2dldFBhcmFtTmFtZShuKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucGFyYW1OYW1lID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnBhcmFtTmFtZShuKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuICcnICsgdGhpcy5vcHRpb25zLnBhcmFtTmFtZSArICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUgPyAnWycgKyBuICsgJ10nIDogJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBJZiBAb3B0aW9ucy5yZW5hbWVGaWxlIGlzIGEgZnVuY3Rpb24sXG5cdFx0XHRcdC8vIHRoZSBmdW5jdGlvbiB3aWxsIGJlIHVzZWQgdG8gcmVuYW1lIHRoZSBmaWxlLm5hbWUgYmVmb3JlIGFwcGVuZGluZyBpdCB0byB0aGUgZm9ybURhdGFcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19yZW5hbWVGaWxlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9yZW5hbWVGaWxlKGZpbGUpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5yZW5hbWVGaWxlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS5uYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUoZmlsZSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmV0dXJucyBhIGZvcm0gdGhhdCBjYW4gYmUgdXNlZCBhcyBmYWxsYmFjayBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IERyYWduRHJvcFxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBJZiB0aGUgZHJvcHpvbmUgaXMgYWxyZWFkeSBhIGZvcm0sIG9ubHkgdGhlIGlucHV0IGZpZWxkIGFuZCBidXR0b24gYXJlIHJldHVybmVkLiBPdGhlcndpc2UgYSBjb21wbGV0ZSBmb3JtIGVsZW1lbnQgaXMgcHJvdmlkZWQuXG5cdFx0XHRcdC8vIFRoaXMgY29kZSBoYXMgdG8gcGFzcyBpbiBJRTcgOihcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2dldEZhbGxiYWNrRm9ybScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRGYWxsYmFja0Zvcm0oKSB7XG5cdFx0XHRcdFx0dmFyIGV4aXN0aW5nRmFsbGJhY2sgPSB2b2lkIDAsXG5cdFx0XHRcdFx0XHRmb3JtID0gdm9pZCAwO1xuXHRcdFx0XHRcdGlmICgoZXhpc3RpbmdGYWxsYmFjayA9IHRoaXMuZ2V0RXhpc3RpbmdGYWxsYmFjaygpKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGV4aXN0aW5nRmFsbGJhY2s7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGZpZWxkc1N0cmluZyA9ICc8ZGl2IGNsYXNzPVwiZHotZmFsbGJhY2tcIj4nO1xuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZGljdEZhbGxiYWNrVGV4dCkge1xuXHRcdFx0XHRcdFx0ZmllbGRzU3RyaW5nICs9ICc8cD4nICsgdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHQgKyAnPC9wPic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZpZWxkc1N0cmluZyArPVxuXHRcdFx0XHRcdFx0JzxpbnB1dCB0eXBlPVwiZmlsZVwiIG5hbWU9XCInICtcblx0XHRcdFx0XHRcdHRoaXMuX2dldFBhcmFtTmFtZSgwKSArXG5cdFx0XHRcdFx0XHQnXCIgJyArXG5cdFx0XHRcdFx0XHQodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gJ211bHRpcGxlPVwibXVsdGlwbGVcIicgOiB1bmRlZmluZWQpICtcblx0XHRcdFx0XHRcdCcgLz48aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiVXBsb2FkIVwiPjwvZGl2Pic7XG5cblx0XHRcdFx0XHR2YXIgZmllbGRzID0gRHJvcHpvbmUuY3JlYXRlRWxlbWVudChmaWVsZHNTdHJpbmcpO1xuXHRcdFx0XHRcdGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSAhPT0gJ0ZPUk0nKSB7XG5cdFx0XHRcdFx0XHRmb3JtID0gRHJvcHpvbmUuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHRcdFx0Jzxmb3JtIGFjdGlvbj1cIicgK1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy51cmwgK1xuXHRcdFx0XHRcdFx0XHRcdCdcIiBlbmN0eXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiIG1ldGhvZD1cIicgK1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5tZXRob2QgK1xuXHRcdFx0XHRcdFx0XHRcdCdcIj48L2Zvcm0+J1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGVuY3R5cGUgYW5kIG1ldGhvZCBhdHRyaWJ1dGVzIGFyZSBzZXQgcHJvcGVybHlcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2VuY3R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpO1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgdGhpcy5vcHRpb25zLm1ldGhvZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBmb3JtICE9IG51bGwgPyBmb3JtIDogZmllbGRzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFJldHVybnMgdGhlIGZhbGxiYWNrIGVsZW1lbnRzIGlmIHRoZXkgZXhpc3QgYWxyZWFkeVxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBUaGlzIGNvZGUgaGFzIHRvIHBhc3MgaW4gSUU3IDooXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdnZXRFeGlzdGluZ0ZhbGxiYWNrJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEV4aXN0aW5nRmFsbGJhY2soKSB7XG5cdFx0XHRcdFx0dmFyIGdldEZhbGxiYWNrID0gZnVuY3Rpb24gZ2V0RmFsbGJhY2soZWxlbWVudHMpIHtcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxMyA9IGVsZW1lbnRzLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTMgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMTMgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjEzID0gX2lzQXJyYXkxMyA/IF9pdGVyYXRvcjEzIDogX2l0ZXJhdG9yMTNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjEyO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTEzKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTMgPj0gX2l0ZXJhdG9yMTMubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTIgPSBfaXRlcmF0b3IxM1tfaTEzKytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMTMgPSBfaXRlcmF0b3IxMy5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTMuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEyID0gX2kxMy52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBlbCA9IF9yZWYxMjtcblxuXHRcdFx0XHRcdFx0XHRpZiAoLyhefCApZmFsbGJhY2soJHwgKS8udGVzdChlbC5jbGFzc05hbWUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGVsO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHZhciBfYXJyID0gWydkaXYnLCAnZm9ybSddO1xuXHRcdFx0XHRcdGZvciAodmFyIF9pMTQgPSAwOyBfaTE0IDwgX2Fyci5sZW5ndGg7IF9pMTQrKykge1xuXHRcdFx0XHRcdFx0dmFyIHRhZ05hbWUgPSBfYXJyW19pMTRdO1xuXHRcdFx0XHRcdFx0dmFyIGZhbGxiYWNrO1xuXHRcdFx0XHRcdFx0aWYgKChmYWxsYmFjayA9IGdldEZhbGxiYWNrKHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSkpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxsYmFjaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQWN0aXZhdGVzIGFsbCBsaXN0ZW5lcnMgc3RvcmVkIGluIEBsaXN0ZW5lcnNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3NldHVwRXZlbnRMaXN0ZW5lcnMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKGZ1bmN0aW9uKGVsZW1lbnRMaXN0ZW5lcnMpIHtcblx0XHRcdFx0XHRcdHJldHVybiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2goZWxlbWVudExpc3RlbmVycy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIERlYWN0aXZhdGVzIGFsbCBsaXN0ZW5lcnMgc3RvcmVkIGluIEBsaXN0ZW5lcnNcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3JlbW92ZUV2ZW50TGlzdGVuZXJzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmxpc3RlbmVycy5tYXAoZnVuY3Rpb24oZWxlbWVudExpc3RlbmVycykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBldmVudCBpbiBlbGVtZW50TGlzdGVuZXJzLmV2ZW50cykge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBsaXN0ZW5lciA9IGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzW2V2ZW50XTtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucHVzaChlbGVtZW50TGlzdGVuZXJzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gUmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzIGFuZCBjYW5jZWxzIGFsbCBmaWxlcyBpbiB0aGUgcXVldWUgb3IgYmVpbmcgcHJvY2Vzc2VkLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZGlzYWJsZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuXHRcdFx0XHRcdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdFx0XHRcdFx0dGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2R6LWNsaWNrYWJsZScpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbGVzLm1hcChmdW5jdGlvbihmaWxlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM0LmNhbmNlbFVwbG9hZChmaWxlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2VuYWJsZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG5cdFx0XHRcdFx0dGhpcy5jbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LWNsaWNrYWJsZScpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSZXR1cm5zIGEgbmljZWx5IGZvcm1hdHRlZCBmaWxlc2l6ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZmlsZXNpemUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZmlsZXNpemUoc2l6ZSkge1xuXHRcdFx0XHRcdHZhciBzZWxlY3RlZFNpemUgPSAwO1xuXHRcdFx0XHRcdHZhciBzZWxlY3RlZFVuaXQgPSAnYic7XG5cblx0XHRcdFx0XHRpZiAoc2l6ZSA+IDApIHtcblx0XHRcdFx0XHRcdHZhciB1bml0cyA9IFsndGInLCAnZ2InLCAnbWInLCAna2InLCAnYiddO1xuXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHVuaXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB1bml0ID0gdW5pdHNbaV07XG5cdFx0XHRcdFx0XHRcdHZhciBjdXRvZmYgPSBNYXRoLnBvdyh0aGlzLm9wdGlvbnMuZmlsZXNpemVCYXNlLCA0IC0gaSkgLyAxMDtcblxuXHRcdFx0XHRcdFx0XHRpZiAoc2l6ZSA+PSBjdXRvZmYpIHtcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZFNpemUgPSBzaXplIC8gTWF0aC5wb3codGhpcy5vcHRpb25zLmZpbGVzaXplQmFzZSwgNCAtIGkpO1xuXHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkVW5pdCA9IHVuaXQ7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c2VsZWN0ZWRTaXplID0gTWF0aC5yb3VuZCgxMCAqIHNlbGVjdGVkU2l6ZSkgLyAxMDsgLy8gQ3V0dGluZyBvZiBkaWdpdHNcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gJzxzdHJvbmc+JyArIHNlbGVjdGVkU2l6ZSArICc8L3N0cm9uZz4gJyArIHRoaXMub3B0aW9ucy5kaWN0RmlsZVNpemVVbml0c1tzZWxlY3RlZFVuaXRdO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEFkZHMgb3IgcmVtb3ZlcyB0aGUgYGR6LW1heC1maWxlcy1yZWFjaGVkYCBjbGFzcyBmcm9tIHRoZSBmb3JtLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzcygpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzICE9IG51bGwgJiYgdGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZ2V0QWNjZXB0ZWRGaWxlcygpLmxlbmd0aCA9PT0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnbWF4ZmlsZXNyZWFjaGVkJywgdGhpcy5maWxlcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2R6LW1heC1maWxlcy1yZWFjaGVkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHotbWF4LWZpbGVzLXJlYWNoZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdkcm9wJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGRyb3AoZSkge1xuXHRcdFx0XHRcdGlmICghZS5kYXRhVHJhbnNmZXIpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5lbWl0KCdkcm9wJywgZSk7XG5cblx0XHRcdFx0XHR2YXIgZmlsZXMgPSBlLmRhdGFUcmFuc2Zlci5maWxlcztcblxuXHRcdFx0XHRcdHRoaXMuZW1pdCgnYWRkZWRmaWxlcycsIGZpbGVzKTtcblxuXHRcdFx0XHRcdC8vIEV2ZW4gaWYgaXQncyBhIGZvbGRlciwgZmlsZXMubGVuZ3RoIHdpbGwgY29udGFpbiB0aGUgZm9sZGVycy5cblx0XHRcdFx0XHRpZiAoZmlsZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHR2YXIgaXRlbXMgPSBlLmRhdGFUcmFuc2Zlci5pdGVtcztcblxuXHRcdFx0XHRcdFx0aWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCAmJiBpdGVtc1swXS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gVGhlIGJyb3dzZXIgc3VwcG9ydHMgZHJvcHBpbmcgb2YgZm9sZGVycywgc28gaGFuZGxlIGl0ZW1zIGluc3RlYWQgb2YgZmlsZXNcblx0XHRcdFx0XHRcdFx0dGhpcy5fYWRkRmlsZXNGcm9tSXRlbXMoaXRlbXMpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5oYW5kbGVGaWxlcyhmaWxlcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncGFzdGUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcGFzdGUoZSkge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdF9fZ3VhcmRfXyhlICE9IG51bGwgPyBlLmNsaXBib2FyZERhdGEgOiB1bmRlZmluZWQsIGZ1bmN0aW9uKHgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHguaXRlbXM7XG5cdFx0XHRcdFx0XHR9KSA9PSBudWxsXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5lbWl0KCdwYXN0ZScsIGUpO1xuXHRcdFx0XHRcdHZhciBpdGVtcyA9IGUuY2xpcGJvYXJkRGF0YS5pdGVtcztcblxuXHRcdFx0XHRcdGlmIChpdGVtcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnaGFuZGxlRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlRmlsZXMoZmlsZXMpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXM1ID0gdGhpcztcblxuXHRcdFx0XHRcdHJldHVybiBmaWxlcy5tYXAoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzNS5hZGRGaWxlKGZpbGUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFdoZW4gYSBmb2xkZXIgaXMgZHJvcHBlZCAob3IgZmlsZXMgYXJlIHBhc3RlZCksIGl0ZW1zIG11c3QgYmUgaGFuZGxlZFxuXHRcdFx0XHQvLyBpbnN0ZWFkIG9mIGZpbGVzLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX2FkZEZpbGVzRnJvbUl0ZW1zJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcykge1xuXHRcdFx0XHRcdHZhciBfdGhpczYgPSB0aGlzO1xuXG5cdFx0XHRcdFx0cmV0dXJuIChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxNCA9IGl0ZW1zLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTQgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMTUgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE0ID0gX2lzQXJyYXkxNCA/IF9pdGVyYXRvcjE0IDogX2l0ZXJhdG9yMTRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjEzO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTE0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTUgPj0gX2l0ZXJhdG9yMTQubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTMgPSBfaXRlcmF0b3IxNFtfaTE1KytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMTUgPSBfaXRlcmF0b3IxNC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTUuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjEzID0gX2kxNS52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBpdGVtID0gX3JlZjEzO1xuXG5cdFx0XHRcdFx0XHRcdHZhciBlbnRyeTtcblx0XHRcdFx0XHRcdFx0aWYgKGl0ZW0ud2Via2l0R2V0QXNFbnRyeSAhPSBudWxsICYmIChlbnRyeSA9IGl0ZW0ud2Via2l0R2V0QXNFbnRyeSgpKSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChlbnRyeS5pc0ZpbGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKF90aGlzNi5hZGRGaWxlKGl0ZW0uZ2V0QXNGaWxlKCkpKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBBcHBlbmQgYWxsIGZpbGVzIGZyb20gdGhhdCBkaXJlY3RvcnkgdG8gZmlsZXNcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKF90aGlzNi5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBlbnRyeS5uYW1lKSk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGl0ZW0uZ2V0QXNGaWxlICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaXRlbS5raW5kID09IG51bGwgfHwgaXRlbS5raW5kID09PSAnZmlsZScpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKF90aGlzNi5hZGRGaWxlKGl0ZW0uZ2V0QXNGaWxlKCkpKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godW5kZWZpbmVkKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnB1c2godW5kZWZpbmVkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEdvZXMgdGhyb3VnaCB0aGUgZGlyZWN0b3J5LCBhbmQgYWRkcyBlYWNoIGZpbGUgaXQgZmluZHMgcmVjdXJzaXZlbHlcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19hZGRGaWxlc0Zyb21EaXJlY3RvcnknLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2FkZEZpbGVzRnJvbURpcmVjdG9yeShkaXJlY3RvcnksIHBhdGgpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXM3ID0gdGhpcztcblxuXHRcdFx0XHRcdHZhciBkaXJSZWFkZXIgPSBkaXJlY3RvcnkuY3JlYXRlUmVhZGVyKCk7XG5cblx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX19ndWFyZE1ldGhvZF9fKGNvbnNvbGUsICdsb2cnLCBmdW5jdGlvbihvKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBvLmxvZyhlcnJvcik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0dmFyIHJlYWRFbnRyaWVzID0gZnVuY3Rpb24gcmVhZEVudHJpZXMoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGlyUmVhZGVyLnJlYWRFbnRyaWVzKGZ1bmN0aW9uKGVudHJpZXMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGVudHJpZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMTUgPSBlbnRyaWVzLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaXNBcnJheTE1ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2kxNiA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE1ID0gX2lzQXJyYXkxNSA/IF9pdGVyYXRvcjE1IDogX2l0ZXJhdG9yMTVbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgX3JlZjE0O1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxNSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kxNiA+PSBfaXRlcmF0b3IxNS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfcmVmMTQgPSBfaXRlcmF0b3IxNVtfaTE2KytdO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2kxNiA9IF9pdGVyYXRvcjE1Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKF9pMTYuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWYxNCA9IF9pMTYudmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdHZhciBlbnRyeSA9IF9yZWYxNDtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVudHJ5LmlzRmlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbnRyeS5maWxlKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX3RoaXM3Lm9wdGlvbnMuaWdub3JlSGlkZGVuRmlsZXMgJiYgZmlsZS5uYW1lLnN1YnN0cmluZygwLCAxKSA9PT0gJy4nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpbGUuZnVsbFBhdGggPSBwYXRoICsgJy8nICsgZmlsZS5uYW1lO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczcuYWRkRmlsZShmaWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF90aGlzNy5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBwYXRoICsgJy8nICsgZW50cnkubmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gUmVjdXJzaXZlbHkgY2FsbCByZWFkRW50cmllcygpIGFnYWluLCBzaW5jZSBicm93c2VyIG9ubHkgaGFuZGxlXG5cdFx0XHRcdFx0XHRcdFx0Ly8gdGhlIGZpcnN0IDEwMCBlbnRyaWVzLlxuXHRcdFx0XHRcdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RpcmVjdG9yeVJlYWRlciNyZWFkRW50cmllc1xuXHRcdFx0XHRcdFx0XHRcdHJlYWRFbnRyaWVzKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHR9LCBlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRyZXR1cm4gcmVhZEVudHJpZXMoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBJZiBgZG9uZSgpYCBpcyBjYWxsZWQgd2l0aG91dCBhcmd1bWVudCB0aGUgZmlsZSBpcyBhY2NlcHRlZFxuXHRcdFx0XHQvLyBJZiB5b3UgY2FsbCBpdCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UsIHRoZSBmaWxlIGlzIHJlamVjdGVkXG5cdFx0XHRcdC8vIChUaGlzIGFsbG93cyBmb3IgYXN5bmNocm9ub3VzIHZhbGlkYXRpb24pXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHRoZSBmaWxlc2l6ZSwgYW5kIGlmIHRoZSBmaWxlLnR5cGUgcGFzc2VzIHRoZVxuXHRcdFx0XHQvLyBgYWNjZXB0ZWRGaWxlc2AgY2hlY2suXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdhY2NlcHQnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gYWNjZXB0KGZpbGUsIGRvbmUpIHtcblx0XHRcdFx0XHRpZiAoZmlsZS5zaXplID4gdGhpcy5vcHRpb25zLm1heEZpbGVzaXplICogMTAyNCAqIDEwMjQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBkb25lKFxuXHRcdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuZGljdEZpbGVUb29CaWdcblx0XHRcdFx0XHRcdFx0XHQucmVwbGFjZSgne3tmaWxlc2l6ZX19JywgTWF0aC5yb3VuZChmaWxlLnNpemUgLyAxMDI0IC8gMTAuMjQpIC8gMTAwKVxuXHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKCd7e21heEZpbGVzaXplfX0nLCB0aGlzLm9wdGlvbnMubWF4RmlsZXNpemUpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIURyb3B6b25lLmlzVmFsaWRGaWxlKGZpbGUsIHRoaXMub3B0aW9ucy5hY2NlcHRlZEZpbGVzKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUodGhpcy5vcHRpb25zLmRpY3RJbnZhbGlkRmlsZVR5cGUpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzICE9IG51bGwgJiYgdGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xuXHRcdFx0XHRcdFx0ZG9uZSh0aGlzLm9wdGlvbnMuZGljdE1heEZpbGVzRXhjZWVkZWQucmVwbGFjZSgne3ttYXhGaWxlc319JywgdGhpcy5vcHRpb25zLm1heEZpbGVzKSk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbWl0KCdtYXhmaWxlc2V4Y2VlZGVkJywgZmlsZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnMuYWNjZXB0LmNhbGwodGhpcywgZmlsZSwgZG9uZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnYWRkRmlsZScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBhZGRGaWxlKGZpbGUpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXM4ID0gdGhpcztcblxuXHRcdFx0XHRcdGZpbGUudXBsb2FkID0ge1xuXHRcdFx0XHRcdFx0dXVpZDogRHJvcHpvbmUudXVpZHY0KCksXG5cdFx0XHRcdFx0XHRwcm9ncmVzczogMCxcblx0XHRcdFx0XHRcdC8vIFNldHRpbmcgdGhlIHRvdGFsIHVwbG9hZCBzaXplIHRvIGZpbGUuc2l6ZSBmb3IgdGhlIGJlZ2lubmluZ1xuXHRcdFx0XHRcdFx0Ly8gSXQncyBhY3R1YWwgZGlmZmVyZW50IHRoYW4gdGhlIHNpemUgdG8gYmUgdHJhbnNtaXR0ZWQuXG5cdFx0XHRcdFx0XHR0b3RhbDogZmlsZS5zaXplLFxuXHRcdFx0XHRcdFx0Ynl0ZXNTZW50OiAwLFxuXHRcdFx0XHRcdFx0ZmlsZW5hbWU6IHRoaXMuX3JlbmFtZUZpbGUoZmlsZSksXG5cdFx0XHRcdFx0XHRjaHVua2VkOiB0aGlzLm9wdGlvbnMuY2h1bmtpbmcgJiYgKHRoaXMub3B0aW9ucy5mb3JjZUNodW5raW5nIHx8IGZpbGUuc2l6ZSA+IHRoaXMub3B0aW9ucy5jaHVua1NpemUpLFxuXHRcdFx0XHRcdFx0dG90YWxDaHVua0NvdW50OiBNYXRoLmNlaWwoZmlsZS5zaXplIC8gdGhpcy5vcHRpb25zLmNodW5rU2l6ZSksXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR0aGlzLmZpbGVzLnB1c2goZmlsZSk7XG5cblx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLkFEREVEO1xuXG5cdFx0XHRcdFx0dGhpcy5lbWl0KCdhZGRlZGZpbGUnLCBmaWxlKTtcblxuXHRcdFx0XHRcdHRoaXMuX2VucXVldWVUaHVtYm5haWwoZmlsZSk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5hY2NlcHQoZmlsZSwgZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRmaWxlLmFjY2VwdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdF90aGlzOC5fZXJyb3JQcm9jZXNzaW5nKFtmaWxlXSwgZXJyb3IpOyAvLyBXaWxsIHNldCB0aGUgZmlsZS5zdGF0dXNcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUuYWNjZXB0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXM4Lm9wdGlvbnMuYXV0b1F1ZXVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXM4LmVucXVldWVGaWxlKGZpbGUpO1xuXHRcdFx0XHRcdFx0XHR9IC8vIFdpbGwgc2V0IC5hY2NlcHRlZCA9IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczguX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gV3JhcHBlciBmb3IgZW5xdWV1ZUZpbGVcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2VucXVldWVGaWxlcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbnF1ZXVlRmlsZXMoZmlsZXMpIHtcblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjE2ID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MTYgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRfaTE3ID0gMCxcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMTYgPSBfaXNBcnJheTE2ID8gX2l0ZXJhdG9yMTYgOiBfaXRlcmF0b3IxNltTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHZhciBfcmVmMTU7XG5cblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTE2KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTE3ID49IF9pdGVyYXRvcjE2Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYxNSA9IF9pdGVyYXRvcjE2W19pMTcrK107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfaTE3ID0gX2l0ZXJhdG9yMTYubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kxNy5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjE1ID0gX2kxNy52YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMTU7XG5cblx0XHRcdFx0XHRcdHRoaXMuZW5xdWV1ZUZpbGUoZmlsZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnZW5xdWV1ZUZpbGUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW5xdWV1ZUZpbGUoZmlsZSkge1xuXHRcdFx0XHRcdHZhciBfdGhpczkgPSB0aGlzO1xuXG5cdFx0XHRcdFx0aWYgKGZpbGUuc3RhdHVzID09PSBEcm9wem9uZS5BRERFRCAmJiBmaWxlLmFjY2VwdGVkID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLlFVRVVFRDtcblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM5LnByb2Nlc3NRdWV1ZSgpO1xuXHRcdFx0XHRcdFx0XHR9LCAwKTsgLy8gRGVmZXJyaW5nIHRoZSBjYWxsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoaXMgZmlsZSBjYW4ndCBiZSBxdWV1ZWQgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIHByb2Nlc3NlZCBvciB3YXMgcmVqZWN0ZWQuXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19lbnF1ZXVlVGh1bWJuYWlsJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9lbnF1ZXVlVGh1bWJuYWlsKGZpbGUpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXMxMCA9IHRoaXM7XG5cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuY3JlYXRlSW1hZ2VUaHVtYm5haWxzICYmXG5cdFx0XHRcdFx0XHRmaWxlLnR5cGUubWF0Y2goL2ltYWdlLiovKSAmJlxuXHRcdFx0XHRcdFx0ZmlsZS5zaXplIDw9IHRoaXMub3B0aW9ucy5tYXhUaHVtYm5haWxGaWxlc2l6ZSAqIDEwMjQgKiAxMDI0XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl90aHVtYm5haWxRdWV1ZS5wdXNoKGZpbGUpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczEwLl9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKTtcblx0XHRcdFx0XHRcdH0sIDApOyAvLyBEZWZlcnJpbmcgdGhlIGNhbGxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfcHJvY2Vzc1RodW1ibmFpbFF1ZXVlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9wcm9jZXNzVGh1bWJuYWlsUXVldWUoKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzMTEgPSB0aGlzO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3Byb2Nlc3NpbmdUaHVtYm5haWwgfHwgdGhpcy5fdGh1bWJuYWlsUXVldWUubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IHRydWU7XG5cdFx0XHRcdFx0dmFyIGZpbGUgPSB0aGlzLl90aHVtYm5haWxRdWV1ZS5zaGlmdCgpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZVRodW1ibmFpbChcblx0XHRcdFx0XHRcdGZpbGUsXG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMudGh1bWJuYWlsV2lkdGgsXG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMudGh1bWJuYWlsSGVpZ2h0LFxuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLnRodW1ibmFpbE1ldGhvZCxcblx0XHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0XHRmdW5jdGlvbihkYXRhVXJsKSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzMTEuZW1pdCgndGh1bWJuYWlsJywgZmlsZSwgZGF0YVVybCk7XG5cdFx0XHRcdFx0XHRcdF90aGlzMTEuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMTEuX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FuIGJlIGNhbGxlZCBieSB0aGUgdXNlciB0byByZW1vdmUgYSBmaWxlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdyZW1vdmVGaWxlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUZpbGUoZmlsZSkge1xuXHRcdFx0XHRcdGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNhbmNlbFVwbG9hZChmaWxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5maWxlcyA9IHdpdGhvdXQodGhpcy5maWxlcywgZmlsZSk7XG5cblx0XHRcdFx0XHR0aGlzLmVtaXQoJ3JlbW92ZWRmaWxlJywgZmlsZSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuZmlsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5lbWl0KCdyZXNldCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSZW1vdmVzIGFsbCBmaWxlcyB0aGF0IGFyZW4ndCBjdXJyZW50bHkgcHJvY2Vzc2VkIGZyb20gdGhlIGxpc3Rcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ3JlbW92ZUFsbEZpbGVzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUFsbEZpbGVzKGNhbmNlbElmTmVjZXNzYXJ5KSB7XG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgY29weSBvZiBmaWxlcyBzaW5jZSByZW1vdmVGaWxlKCkgY2hhbmdlcyB0aGUgQGZpbGVzIGFycmF5LlxuXHRcdFx0XHRcdGlmIChjYW5jZWxJZk5lY2Vzc2FyeSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRjYW5jZWxJZk5lY2Vzc2FyeSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjE3ID0gdGhpcy5maWxlcy5zbGljZSgpLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTE3ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kxOCA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE3ID0gX2lzQXJyYXkxNyA/IF9pdGVyYXRvcjE3IDogX2l0ZXJhdG9yMTdbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjE2O1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxNykge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kxOCA+PSBfaXRlcmF0b3IxNy5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMTYgPSBfaXRlcmF0b3IxN1tfaTE4KytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kxOCA9IF9pdGVyYXRvcjE3Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTguZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYxNiA9IF9pMTgudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjE2O1xuXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5zdGF0dXMgIT09IERyb3B6b25lLlVQTE9BRElORyB8fCBjYW5jZWxJZk5lY2Vzc2FyeSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFJlc2l6ZXMgYW4gaW1hZ2UgYmVmb3JlIGl0IGdldHMgc2VudCB0byB0aGUgc2VydmVyLiBUaGlzIGZ1bmN0aW9uIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mXG5cdFx0XHRcdC8vIGBvcHRpb25zLnRyYW5zZm9ybUZpbGVgIGlmIGByZXNpemVXaWR0aGAgb3IgYHJlc2l6ZUhlaWdodGAgYXJlIHNldC4gVGhlIGNhbGxiYWNrIGlzIGludm9rZWQgd2l0aFxuXHRcdFx0XHQvLyB0aGUgcmVzaXplZCBibG9iLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncmVzaXplSW1hZ2UnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcmVzaXplSW1hZ2UoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdHZhciBfdGhpczEyID0gdGhpcztcblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZVRodW1ibmFpbChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZhbHNlLCBmdW5jdGlvbihkYXRhVXJsLCBjYW52YXMpIHtcblx0XHRcdFx0XHRcdGlmIChjYW52YXMgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gVGhlIGltYWdlIGhhcyBub3QgYmVlbiByZXNpemVkXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhmaWxlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXNpemVNaW1lVHlwZSA9IF90aGlzMTIub3B0aW9ucy5yZXNpemVNaW1lVHlwZTtcblxuXHRcdFx0XHRcdFx0XHRpZiAocmVzaXplTWltZVR5cGUgPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZU1pbWVUeXBlID0gZmlsZS50eXBlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHZhciByZXNpemVkRGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwocmVzaXplTWltZVR5cGUsIF90aGlzMTIub3B0aW9ucy5yZXNpemVRdWFsaXR5KTtcblx0XHRcdFx0XHRcdFx0aWYgKHJlc2l6ZU1pbWVUeXBlID09PSAnaW1hZ2UvanBlZycgfHwgcmVzaXplTWltZVR5cGUgPT09ICdpbWFnZS9qcGcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gTm93IGFkZCB0aGUgb3JpZ2luYWwgRVhJRiBpbmZvcm1hdGlvblxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZWREYXRhVVJMID0gRXhpZlJlc3RvcmUucmVzdG9yZShmaWxlLmRhdGFVUkwsIHJlc2l6ZWREYXRhVVJMKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soRHJvcHpvbmUuZGF0YVVSSXRvQmxvYihyZXNpemVkRGF0YVVSTCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnY3JlYXRlVGh1bWJuYWlsJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVRodW1ibmFpbChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdHZhciBfdGhpczEzID0gdGhpcztcblxuXHRcdFx0XHRcdHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuXHRcdFx0XHRcdGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRmaWxlLmRhdGFVUkwgPSBmaWxlUmVhZGVyLnJlc3VsdDtcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgYm90aGVyIGNyZWF0aW5nIGEgdGh1bWJuYWlsIGZvciBTVkcgaW1hZ2VzIHNpbmNlIHRoZXkncmUgdmVjdG9yXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS50eXBlID09PSAnaW1hZ2Uvc3ZnK3htbCcpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjayhmaWxlUmVhZGVyLnJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMxMy5jcmVhdGVUaHVtYm5haWxGcm9tVXJsKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgZml4T3JpZW50YXRpb24sIGNhbGxiYWNrKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0cmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ2NyZWF0ZVRodW1ibmFpbEZyb21VcmwnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlVGh1bWJuYWlsRnJvbVVybChcblx0XHRcdFx0XHRmaWxlLFxuXHRcdFx0XHRcdHdpZHRoLFxuXHRcdFx0XHRcdGhlaWdodCxcblx0XHRcdFx0XHRyZXNpemVNZXRob2QsXG5cdFx0XHRcdFx0Zml4T3JpZW50YXRpb24sXG5cdFx0XHRcdFx0Y2FsbGJhY2ssXG5cdFx0XHRcdFx0Y3Jvc3NPcmlnaW5cblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzMTQgPSB0aGlzO1xuXG5cdFx0XHRcdFx0Ly8gTm90IHVzaW5nIGBuZXcgSW1hZ2VgIGhlcmUgYmVjYXVzZSBvZiBhIGJ1ZyBpbiBsYXRlc3QgQ2hyb21lIHZlcnNpb25zLlxuXHRcdFx0XHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZW55by9kcm9wem9uZS9wdWxsLzIyNlxuXHRcdFx0XHRcdHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuXHRcdFx0XHRcdGlmIChjcm9zc09yaWdpbikge1xuXHRcdFx0XHRcdFx0aW1nLmNyb3NzT3JpZ2luID0gY3Jvc3NPcmlnaW47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGxvYWRFeGlmID0gZnVuY3Rpb24gbG9hZEV4aWYoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKDEpO1xuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgRVhJRiAhPT0gJ3VuZGVmaW5lZCcgJiYgRVhJRiAhPT0gbnVsbCAmJiBmaXhPcmllbnRhdGlvbikge1xuXHRcdFx0XHRcdFx0XHRsb2FkRXhpZiA9IGZ1bmN0aW9uIGxvYWRFeGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIEVYSUYuZ2V0RGF0YShpbWcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKEVYSUYuZ2V0VGFnKHRoaXMsICdPcmllbnRhdGlvbicpKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIGxvYWRFeGlmKGZ1bmN0aW9uKG9yaWVudGF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUud2lkdGggPSBpbWcud2lkdGg7XG5cdFx0XHRcdFx0XHRcdGZpbGUuaGVpZ2h0ID0gaW1nLmhlaWdodDtcblxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzaXplSW5mbyA9IF90aGlzMTQub3B0aW9ucy5yZXNpemUuY2FsbChfdGhpczE0LCBmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QpO1xuXG5cdFx0XHRcdFx0XHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblx0XHRcdFx0XHRcdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0XHRcdFx0XHRcdGNhbnZhcy53aWR0aCA9IHJlc2l6ZUluZm8udHJnV2lkdGg7XG5cdFx0XHRcdFx0XHRcdGNhbnZhcy5oZWlnaHQgPSByZXNpemVJbmZvLnRyZ0hlaWdodDtcblxuXHRcdFx0XHRcdFx0XHRpZiAob3JpZW50YXRpb24gPiA0KSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FudmFzLndpZHRoID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XG5cdFx0XHRcdFx0XHRcdFx0Y2FudmFzLmhlaWdodCA9IHJlc2l6ZUluZm8udHJnV2lkdGg7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRzd2l0Y2ggKG9yaWVudGF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaG9yaXpvbnRhbCBmbGlwXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKGNhbnZhcy53aWR0aCwgMCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHguc2NhbGUoLTEsIDEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gMTgwwrAgcm90YXRlIGxlZnRcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoTWF0aC5QSSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyB2ZXJ0aWNhbCBmbGlwXG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKDAsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnNjYWxlKDEsIC0xKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgNTpcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHZlcnRpY2FsIGZsaXAgKyA5MCByb3RhdGUgcmlnaHRcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHguc2NhbGUoMSwgLTEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSA2OlxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gOTDCsCByb3RhdGUgcmlnaHRcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKDAsIC1jYW52YXMuaGVpZ2h0KTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgNzpcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGhvcml6b250YWwgZmxpcCArIDkwIHJvdGF0ZSByaWdodFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcblx0XHRcdFx0XHRcdFx0XHRcdGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAtY2FudmFzLmhlaWdodCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHguc2NhbGUoLTEsIDEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSA4OlxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gOTDCsCByb3RhdGUgbGVmdFxuXHRcdFx0XHRcdFx0XHRcdFx0Y3R4LnJvdGF0ZSgtMC41ICogTWF0aC5QSSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdHgudHJhbnNsYXRlKC1jYW52YXMud2lkdGgsIDApO1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgYnVnZml4IGZvciBpT1MnIHNjYWxpbmcgYnVnLlxuXHRcdFx0XHRcdFx0XHRkcmF3SW1hZ2VJT1NGaXgoXG5cdFx0XHRcdFx0XHRcdFx0Y3R4LFxuXHRcdFx0XHRcdFx0XHRcdGltZyxcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnNyY1ggIT0gbnVsbCA/IHJlc2l6ZUluZm8uc3JjWCA6IDAsXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby5zcmNZICE9IG51bGwgPyByZXNpemVJbmZvLnNyY1kgOiAwLFxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8uc3JjV2lkdGgsXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby5zcmNIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdFx0cmVzaXplSW5mby50cmdYICE9IG51bGwgPyByZXNpemVJbmZvLnRyZ1ggOiAwLFxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8udHJnWSAhPSBudWxsID8gcmVzaXplSW5mby50cmdZIDogMCxcblx0XHRcdFx0XHRcdFx0XHRyZXNpemVJbmZvLnRyZ1dpZHRoLFxuXHRcdFx0XHRcdFx0XHRcdHJlc2l6ZUluZm8udHJnSGVpZ2h0XG5cdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0dmFyIHRodW1ibmFpbCA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFjayAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKHRodW1ibmFpbCwgY2FudmFzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGlmIChjYWxsYmFjayAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRpbWcub25lcnJvciA9IGNhbGxiYWNrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiAoaW1nLnNyYyA9IGZpbGUuZGF0YVVSTCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gR29lcyB0aHJvdWdoIHRoZSBxdWV1ZSBhbmQgcHJvY2Vzc2VzIGZpbGVzIGlmIHRoZXJlIGFyZW4ndCB0b28gbWFueSBhbHJlYWR5LlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncHJvY2Vzc1F1ZXVlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3NRdWV1ZSgpIHtcblx0XHRcdFx0XHR2YXIgcGFyYWxsZWxVcGxvYWRzID0gdGhpcy5vcHRpb25zLnBhcmFsbGVsVXBsb2FkcztcblxuXHRcdFx0XHRcdHZhciBwcm9jZXNzaW5nTGVuZ3RoID0gdGhpcy5nZXRVcGxvYWRpbmdGaWxlcygpLmxlbmd0aDtcblx0XHRcdFx0XHR2YXIgaSA9IHByb2Nlc3NpbmdMZW5ndGg7XG5cblx0XHRcdFx0XHQvLyBUaGVyZSBhcmUgYWxyZWFkeSBhdCBsZWFzdCBhcyBtYW55IGZpbGVzIHVwbG9hZGluZyB0aGFuIHNob3VsZCBiZVxuXHRcdFx0XHRcdGlmIChwcm9jZXNzaW5nTGVuZ3RoID49IHBhcmFsbGVsVXBsb2Fkcykge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBxdWV1ZWRGaWxlcyA9IHRoaXMuZ2V0UXVldWVkRmlsZXMoKTtcblxuXHRcdFx0XHRcdGlmICghKHF1ZXVlZEZpbGVzLmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0Ly8gVGhlIGZpbGVzIHNob3VsZCBiZSB1cGxvYWRlZCBpbiBvbmUgcmVxdWVzdFxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc0ZpbGVzKHF1ZXVlZEZpbGVzLnNsaWNlKDAsIHBhcmFsbGVsVXBsb2FkcyAtIHByb2Nlc3NpbmdMZW5ndGgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2hpbGUgKGkgPCBwYXJhbGxlbFVwbG9hZHMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKCFxdWV1ZWRGaWxlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH0gLy8gTm90aGluZyBsZWZ0IHRvIHByb2Nlc3Ncblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9jZXNzRmlsZShxdWV1ZWRGaWxlcy5zaGlmdCgpKTtcblx0XHRcdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBXcmFwcGVyIGZvciBgcHJvY2Vzc0ZpbGVzYFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncHJvY2Vzc0ZpbGUnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc0ZpbGUoZmlsZSkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhbZmlsZV0pO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIExvYWRzIHRoZSBmaWxlLCB0aGVuIGNhbGxzIGZpbmlzaGVkTG9hZGluZygpXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdwcm9jZXNzRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc0ZpbGVzKGZpbGVzKSB7XG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IxOCA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTE4ID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kxOSA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE4ID0gX2lzQXJyYXkxOCA/IF9pdGVyYXRvcjE4IDogX2l0ZXJhdG9yMThbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjE3O1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkxOCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kxOSA+PSBfaXRlcmF0b3IxOC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMTcgPSBfaXRlcmF0b3IxOFtfaTE5KytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kxOSA9IF9pdGVyYXRvcjE4Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMTkuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYxNyA9IF9pMTkudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjE3O1xuXG5cdFx0XHRcdFx0XHRmaWxlLnByb2Nlc3NpbmcgPSB0cnVlOyAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXHRcdFx0XHRcdFx0ZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5VUExPQURJTkc7XG5cblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgncHJvY2Vzc2luZycsIGZpbGUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgncHJvY2Vzc2luZ211bHRpcGxlJywgZmlsZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLnVwbG9hZEZpbGVzKGZpbGVzKTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19nZXRGaWxlc1dpdGhYaHInLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2dldEZpbGVzV2l0aFhocih4aHIpIHtcblx0XHRcdFx0XHR2YXIgZmlsZXMgPSB2b2lkIDA7XG5cdFx0XHRcdFx0cmV0dXJuIChmaWxlcyA9IHRoaXMuZmlsZXNcblx0XHRcdFx0XHRcdC5maWx0ZXIoZnVuY3Rpb24oZmlsZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS54aHIgPT09IHhocjtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGZpbGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbGU7XG5cdFx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gQ2FuY2VscyB0aGUgZmlsZSB1cGxvYWQgYW5kIHNldHMgdGhlIHN0YXR1cyB0byBDQU5DRUxFRFxuXHRcdFx0XHQvLyAqKmlmKiogdGhlIGZpbGUgaXMgYWN0dWFsbHkgYmVpbmcgdXBsb2FkZWQuXG5cdFx0XHRcdC8vIElmIGl0J3Mgc3RpbGwgaW4gdGhlIHF1ZXVlLCB0aGUgZmlsZSBpcyBiZWluZyByZW1vdmVkIGZyb20gaXQgYW5kIHRoZSBzdGF0dXNcblx0XHRcdFx0Ly8gc2V0IHRvIENBTkNFTEVELlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnY2FuY2VsVXBsb2FkJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGNhbmNlbFVwbG9hZChmaWxlKSB7XG5cdFx0XHRcdFx0aWYgKGZpbGUuc3RhdHVzID09PSBEcm9wem9uZS5VUExPQURJTkcpIHtcblx0XHRcdFx0XHRcdHZhciBncm91cGVkRmlsZXMgPSB0aGlzLl9nZXRGaWxlc1dpdGhYaHIoZmlsZS54aHIpO1xuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjE5ID0gZ3JvdXBlZEZpbGVzLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MTkgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMjAgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjE5ID0gX2lzQXJyYXkxOSA/IF9pdGVyYXRvcjE5IDogX2l0ZXJhdG9yMTlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjE4O1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTE5KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjAgPj0gX2l0ZXJhdG9yMTkubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTggPSBfaXRlcmF0b3IxOVtfaTIwKytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMjAgPSBfaXRlcmF0b3IxOS5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjAuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjE4ID0gX2kyMC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBncm91cGVkRmlsZSA9IF9yZWYxODtcblxuXHRcdFx0XHRcdFx0XHRncm91cGVkRmlsZS5zdGF0dXMgPSBEcm9wem9uZS5DQU5DRUxFRDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZmlsZS54aHIgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGUueGhyLmFib3J0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjAgPSBncm91cGVkRmlsZXMsXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyMCA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0X2kyMSA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjAgPSBfaXNBcnJheTIwID8gX2l0ZXJhdG9yMjAgOiBfaXRlcmF0b3IyMFtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMTk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyMSA+PSBfaXRlcmF0b3IyMC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYxOSA9IF9pdGVyYXRvcjIwW19pMjErK107XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X2kyMSA9IF9pdGVyYXRvcjIwLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyMS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMTkgPSBfaTIxLnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dmFyIF9ncm91cGVkRmlsZSA9IF9yZWYxOTtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NhbmNlbGVkJywgX2dyb3VwZWRGaWxlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZG11bHRpcGxlJywgZ3JvdXBlZEZpbGVzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGZpbGUuc3RhdHVzID09PSBEcm9wem9uZS5BRERFRCB8fCBmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuUVVFVUVEKSB7XG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLkNBTkNFTEVEO1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjYW5jZWxlZCcsIGZpbGUpO1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NhbmNlbGVkbXVsdGlwbGUnLCBbZmlsZV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAncmVzb2x2ZU9wdGlvbicsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlT3B0aW9uKG9wdGlvbikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHR2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjMgPiAxID8gX2xlbjMgLSAxIDogMCksIF9rZXkzID0gMTtcblx0XHRcdFx0XHRcdFx0X2tleTMgPCBfbGVuMztcblx0XHRcdFx0XHRcdFx0X2tleTMrK1xuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdGFyZ3NbX2tleTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5M107XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBvcHRpb24uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBvcHRpb247XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICd1cGxvYWRGaWxlJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVwbG9hZEZpbGUoZmlsZSkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnVwbG9hZEZpbGVzKFtmaWxlXSk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICd1cGxvYWRGaWxlcycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1cGxvYWRGaWxlcyhmaWxlcykge1xuXHRcdFx0XHRcdHZhciBfdGhpczE1ID0gdGhpcztcblxuXHRcdFx0XHRcdHRoaXMuX3RyYW5zZm9ybUZpbGVzKGZpbGVzLCBmdW5jdGlvbih0cmFuc2Zvcm1lZEZpbGVzKSB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIHtcblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBmaWxlIHNob3VsZCBiZSBzZW50IGluIGNodW5rcyFcblxuXHRcdFx0XHRcdFx0XHQvLyBJZiB0aGUgY2h1bmtpbmcgb3B0aW9uIGlzIHNldCwgd2UgKiprbm93KiogdGhhdCB0aGVyZSBjYW4gb25seSBiZSAqKm9uZSoqIGZpbGUsIHNpbmNlXG5cdFx0XHRcdFx0XHRcdC8vIHVwbG9hZE11bHRpcGxlIGlzIG5vdCBhbGxvd2VkIHdpdGggdGhpcyBvcHRpb24uXG5cdFx0XHRcdFx0XHRcdHZhciBmaWxlID0gZmlsZXNbMF07XG5cdFx0XHRcdFx0XHRcdHZhciB0cmFuc2Zvcm1lZEZpbGUgPSB0cmFuc2Zvcm1lZEZpbGVzWzBdO1xuXHRcdFx0XHRcdFx0XHR2YXIgc3RhcnRlZENodW5rQ291bnQgPSAwO1xuXG5cdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLmNodW5rcyA9IFtdO1xuXG5cdFx0XHRcdFx0XHRcdHZhciBoYW5kbGVOZXh0Q2h1bmsgPSBmdW5jdGlvbiBoYW5kbGVOZXh0Q2h1bmsoKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNodW5rSW5kZXggPSAwO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gRmluZCB0aGUgbmV4dCBpdGVtIGluIGZpbGUudXBsb2FkLmNodW5rcyB0aGF0IGlzIG5vdCBkZWZpbmVkIHlldC5cblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoZmlsZS51cGxvYWQuY2h1bmtzW2NodW5rSW5kZXhdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNodW5rSW5kZXgrKztcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBUaGlzIG1lYW5zLCB0aGF0IGFsbCBjaHVua3MgaGF2ZSBhbHJlYWR5IGJlZW4gc3RhcnRlZC5cblx0XHRcdFx0XHRcdFx0XHRpZiAoY2h1bmtJbmRleCA+PSBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQpIHJldHVybjtcblxuXHRcdFx0XHRcdFx0XHRcdHN0YXJ0ZWRDaHVua0NvdW50Kys7XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgc3RhcnQgPSBjaHVua0luZGV4ICogX3RoaXMxNS5vcHRpb25zLmNodW5rU2l6ZTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZW5kID0gTWF0aC5taW4oc3RhcnQgKyBfdGhpczE1Lm9wdGlvbnMuY2h1bmtTaXplLCBmaWxlLnNpemUpO1xuXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGRhdGFCbG9jayA9IHtcblx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IF90aGlzMTUuX2dldFBhcmFtTmFtZSgwKSxcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IHRyYW5zZm9ybWVkRmlsZS53ZWJraXRTbGljZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ/IHRyYW5zZm9ybWVkRmlsZS53ZWJraXRTbGljZShzdGFydCwgZW5kKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IHRyYW5zZm9ybWVkRmlsZS5zbGljZShzdGFydCwgZW5kKSxcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGVuYW1lOiBmaWxlLnVwbG9hZC5maWxlbmFtZSxcblx0XHRcdFx0XHRcdFx0XHRcdGNodW5rSW5kZXg6IGNodW5rSW5kZXgsXG5cdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLmNodW5rc1tjaHVua0luZGV4XSA9IHtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGU6IGZpbGUsXG5cdFx0XHRcdFx0XHRcdFx0XHRpbmRleDogY2h1bmtJbmRleCxcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGFCbG9jazogZGF0YUJsb2NrLCAvLyBJbiBjYXNlIHdlIHdhbnQgdG8gcmV0cnkuXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXM6IERyb3B6b25lLlVQTE9BRElORyxcblx0XHRcdFx0XHRcdFx0XHRcdHByb2dyZXNzOiAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0cmllczogMCwgLy8gVGhlIG51bWJlciBvZiB0aW1lcyB0aGlzIGJsb2NrIGhhcyBiZWVuIHJldHJpZWQuXG5cdFx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHRcdF90aGlzMTUuX3VwbG9hZERhdGEoZmlsZXMsIFtkYXRhQmxvY2tdKTtcblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5maW5pc2hlZENodW5rVXBsb2FkID0gZnVuY3Rpb24oY2h1bmspIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgYWxsRmluaXNoZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdGNodW5rLnN0YXR1cyA9IERyb3B6b25lLlNVQ0NFU1M7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBDbGVhciB0aGUgZGF0YSBmcm9tIHRoZSBjaHVua1xuXHRcdFx0XHRcdFx0XHRcdGNodW5rLmRhdGFCbG9jayA9IG51bGw7XG5cblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGhhbmRsZU5leHRDaHVuaygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXS5zdGF0dXMgIT09IERyb3B6b25lLlNVQ0NFU1MpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YWxsRmluaXNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRpZiAoYWxsRmluaXNoZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMTUub3B0aW9ucy5jaHVua3NVcGxvYWRlZChmaWxlLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMxNS5fZmluaXNoZWQoZmlsZXMsICcnLCBudWxsKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoX3RoaXMxNS5vcHRpb25zLnBhcmFsbGVsQ2h1bmtVcGxvYWRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aGFuZGxlTmV4dENodW5rKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZU5leHRDaHVuaygpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgZGF0YUJsb2NrcyA9IFtdO1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBfaTIyID0gMDsgX2kyMiA8IGZpbGVzLmxlbmd0aDsgX2kyMisrKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUJsb2Nrc1tfaTIyXSA9IHtcblx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IF90aGlzMTUuX2dldFBhcmFtTmFtZShfaTIyKSxcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IHRyYW5zZm9ybWVkRmlsZXNbX2kyMl0sXG5cdFx0XHRcdFx0XHRcdFx0XHRmaWxlbmFtZTogZmlsZXNbX2kyMl0udXBsb2FkLmZpbGVuYW1lLFxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0X3RoaXMxNS5fdXBsb2FkRGF0YShmaWxlcywgZGF0YUJsb2Nrcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8vIFJldHVybnMgdGhlIHJpZ2h0IGNodW5rIGZvciBnaXZlbiBmaWxlIGFuZCB4aHJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ19nZXRDaHVuaycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZ2V0Q2h1bmsoZmlsZSwgeGhyKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAhPT0gdW5kZWZpbmVkICYmIGZpbGUudXBsb2FkLmNodW5rc1tpXS54aHIgPT09IHhocikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmlsZS51cGxvYWQuY2h1bmtzW2ldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBUaGlzIGZ1bmN0aW9uIGFjdHVhbGx5IHVwbG9hZHMgdGhlIGZpbGUocykgdG8gdGhlIHNlcnZlci5cblx0XHRcdFx0Ly8gSWYgZGF0YUJsb2NrcyBjb250YWlucyB0aGUgYWN0dWFsIGRhdGEgdG8gdXBsb2FkIChtZWFuaW5nLCB0aGF0IHRoaXMgY291bGQgZWl0aGVyIGJlIHRyYW5zZm9ybWVkXG5cdFx0XHRcdC8vIGZpbGVzLCBvciBpbmRpdmlkdWFsIGNodW5rcyBmb3IgY2h1bmtlZCB1cGxvYWQpLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX3VwbG9hZERhdGEnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX3VwbG9hZERhdGEoZmlsZXMsIGRhdGFCbG9ja3MpIHtcblx0XHRcdFx0XHR2YXIgX3RoaXMxNiA9IHRoaXM7XG5cblx0XHRcdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0XHRcdFx0XHQvLyBQdXQgdGhlIHhociBvYmplY3QgaW4gdGhlIGZpbGUgb2JqZWN0cyB0byBiZSBhYmxlIHRvIHJlZmVyZW5jZSBpdCBsYXRlci5cblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjIxID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MjEgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRfaTIzID0gMCxcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjEgPSBfaXNBcnJheTIxID8gX2l0ZXJhdG9yMjEgOiBfaXRlcmF0b3IyMVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHZhciBfcmVmMjA7XG5cblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTIxKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTIzID49IF9pdGVyYXRvcjIxLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYyMCA9IF9pdGVyYXRvcjIxW19pMjMrK107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfaTIzID0gX2l0ZXJhdG9yMjEubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kyMy5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjIwID0gX2kyMy52YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMjA7XG5cblx0XHRcdFx0XHRcdGZpbGUueGhyID0geGhyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIHtcblx0XHRcdFx0XHRcdC8vIFB1dCB0aGUgeGhyIG9iamVjdCBpbiB0aGUgcmlnaHQgY2h1bmsgb2JqZWN0LCBzbyBpdCBjYW4gYmUgYXNzb2NpYXRlZCBsYXRlciwgYW5kIGZvdW5kIHdpdGggX2dldENodW5rXG5cdFx0XHRcdFx0XHRmaWxlc1swXS51cGxvYWQuY2h1bmtzW2RhdGFCbG9ja3NbMF0uY2h1bmtJbmRleF0ueGhyID0geGhyO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBtZXRob2QgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLm1ldGhvZCwgZmlsZXMpO1xuXHRcdFx0XHRcdHZhciB1cmwgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnVybCwgZmlsZXMpO1xuXHRcdFx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuXHRcdFx0XHRcdC8vIFNldHRpbmcgdGhlIHRpbWVvdXQgYWZ0ZXIgb3BlbiBiZWNhdXNlIG9mIElFMTEgaXNzdWU6IGh0dHBzOi8vZ2l0bGFiLmNvbS9tZW5vL2Ryb3B6b25lL2lzc3Vlcy84XG5cdFx0XHRcdFx0eGhyLnRpbWVvdXQgPSB0aGlzLnJlc29sdmVPcHRpb24odGhpcy5vcHRpb25zLnRpbWVvdXQsIGZpbGVzKTtcblxuXHRcdFx0XHRcdC8vIEhhcyB0byBiZSBhZnRlciBgLm9wZW4oKWAuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZW55by9kcm9wem9uZS9pc3N1ZXMvMTc5XG5cdFx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9ICEhdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscztcblxuXHRcdFx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRfdGhpczE2Ll9maW5pc2hlZFVwbG9hZGluZyhmaWxlcywgeGhyLCBlKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdF90aGlzMTYuX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQvLyBTb21lIGJyb3dzZXJzIGRvIG5vdCBoYXZlIHRoZSAudXBsb2FkIHByb3BlcnR5XG5cdFx0XHRcdFx0dmFyIHByb2dyZXNzT2JqID0geGhyLnVwbG9hZCAhPSBudWxsID8geGhyLnVwbG9hZCA6IHhocjtcblx0XHRcdFx0XHRwcm9ncmVzc09iai5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMTYuX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3MoZmlsZXMsIHhociwgZSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHZhciBoZWFkZXJzID0ge1xuXHRcdFx0XHRcdFx0QWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG5cdFx0XHRcdFx0XHQnQ2FjaGUtQ29udHJvbCc6ICduby1jYWNoZScsXG5cdFx0XHRcdFx0XHQnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuaGVhZGVycykge1xuXHRcdFx0XHRcdFx0RHJvcHpvbmUuZXh0ZW5kKGhlYWRlcnMsIHRoaXMub3B0aW9ucy5oZWFkZXJzKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKHZhciBoZWFkZXJOYW1lIGluIGhlYWRlcnMpIHtcblx0XHRcdFx0XHRcdHZhciBoZWFkZXJWYWx1ZSA9IGhlYWRlcnNbaGVhZGVyTmFtZV07XG5cdFx0XHRcdFx0XHRpZiAoaGVhZGVyVmFsdWUpIHtcblx0XHRcdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyTmFtZSwgaGVhZGVyVmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG5cdFx0XHRcdFx0Ly8gQWRkaW5nIGFsbCBAb3B0aW9ucyBwYXJhbWV0ZXJzXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5wYXJhbXMpIHtcblx0XHRcdFx0XHRcdHZhciBhZGRpdGlvbmFsUGFyYW1zID0gdGhpcy5vcHRpb25zLnBhcmFtcztcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgYWRkaXRpb25hbFBhcmFtcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHRhZGRpdGlvbmFsUGFyYW1zID0gYWRkaXRpb25hbFBhcmFtcy5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZXMsXG5cdFx0XHRcdFx0XHRcdFx0eGhyLFxuXHRcdFx0XHRcdFx0XHRcdGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkID8gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocikgOiBudWxsXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBhZGRpdGlvbmFsUGFyYW1zKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB2YWx1ZSA9IGFkZGl0aW9uYWxQYXJhbXNba2V5XTtcblx0XHRcdFx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIExldCB0aGUgdXNlciBhZGQgYWRkaXRpb25hbCBkYXRhIGlmIG5lY2Vzc2FyeVxuXHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjIgPSBmaWxlcyxcblx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyMiA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdF9pMjQgPSAwLFxuXHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyMiA9IF9pc0FycmF5MjIgPyBfaXRlcmF0b3IyMiA6IF9pdGVyYXRvcjIyW1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dmFyIF9yZWYyMTtcblxuXHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMjQgPj0gX2l0ZXJhdG9yMjIubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjIxID0gX2l0ZXJhdG9yMjJbX2kyNCsrXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF9pMjQgPSBfaXRlcmF0b3IyMi5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTI0LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMjEgPSBfaTI0LnZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgX2ZpbGUgPSBfcmVmMjE7XG5cblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnc2VuZGluZycsIF9maWxlLCB4aHIsIGZvcm1EYXRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdzZW5kaW5nbXVsdGlwbGUnLCBmaWxlcywgeGhyLCBmb3JtRGF0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fYWRkRm9ybUVsZW1lbnREYXRhKGZvcm1EYXRhKTtcblxuXHRcdFx0XHRcdC8vIEZpbmFsbHkgYWRkIHRoZSBmaWxlc1xuXHRcdFx0XHRcdC8vIEhhcyB0byBiZSBsYXN0IGJlY2F1c2Ugc29tZSBzZXJ2ZXJzIChlZzogUzMpIGV4cGVjdCB0aGUgZmlsZSB0byBiZSB0aGUgbGFzdCBwYXJhbWV0ZXJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFCbG9ja3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBkYXRhQmxvY2sgPSBkYXRhQmxvY2tzW2ldO1xuXHRcdFx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKGRhdGFCbG9jay5uYW1lLCBkYXRhQmxvY2suZGF0YSwgZGF0YUJsb2NrLmZpbGVuYW1lKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLnN1Ym1pdFJlcXVlc3QoeGhyLCBmb3JtRGF0YSwgZmlsZXMpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIFRyYW5zZm9ybXMgYWxsIGZpbGVzIHdpdGggdGhpcy5vcHRpb25zLnRyYW5zZm9ybUZpbGUgYW5kIGludm9rZXMgZG9uZSB3aXRoIHRoZSB0cmFuc2Zvcm1lZCBmaWxlcyB3aGVuIGRvbmUuXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfdHJhbnNmb3JtRmlsZXMnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX3RyYW5zZm9ybUZpbGVzKGZpbGVzLCBkb25lKSB7XG5cdFx0XHRcdFx0dmFyIF90aGlzMTcgPSB0aGlzO1xuXG5cdFx0XHRcdFx0dmFyIHRyYW5zZm9ybWVkRmlsZXMgPSBbXTtcblx0XHRcdFx0XHQvLyBDbHVtc3kgd2F5IG9mIGhhbmRsaW5nIGFzeW5jaHJvbm91cyBjYWxscywgdW50aWwgSSBnZXQgdG8gYWRkIGEgcHJvcGVyIEZ1dHVyZSBsaWJyYXJ5LlxuXHRcdFx0XHRcdHZhciBkb25lQ291bnRlciA9IDA7XG5cblx0XHRcdFx0XHR2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XG5cdFx0XHRcdFx0XHRfdGhpczE3Lm9wdGlvbnMudHJhbnNmb3JtRmlsZS5jYWxsKF90aGlzMTcsIGZpbGVzW2ldLCBmdW5jdGlvbih0cmFuc2Zvcm1lZEZpbGUpIHtcblx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtZWRGaWxlc1tpXSA9IHRyYW5zZm9ybWVkRmlsZTtcblx0XHRcdFx0XHRcdFx0aWYgKCsrZG9uZUNvdW50ZXIgPT09IGZpbGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdGRvbmUodHJhbnNmb3JtZWRGaWxlcyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRfbG9vcChpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Ly8gVGFrZXMgY2FyZSBvZiBhZGRpbmcgb3RoZXIgaW5wdXQgZWxlbWVudHMgb2YgdGhlIGZvcm0gdG8gdGhlIEFKQVggcmVxdWVzdFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX2FkZEZvcm1FbGVtZW50RGF0YScsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfYWRkRm9ybUVsZW1lbnREYXRhKGZvcm1EYXRhKSB7XG5cdFx0XHRcdFx0Ly8gVGFrZSBjYXJlIG9mIG90aGVyIGlucHV0IGVsZW1lbnRzXG5cdFx0XHRcdFx0aWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSAnRk9STScpIHtcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyMyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJyksXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyMyA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0X2kyNSA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjMgPSBfaXNBcnJheTIzID8gX2l0ZXJhdG9yMjMgOiBfaXRlcmF0b3IyM1tTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMjI7XG5cblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjMpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNSA+PSBfaXRlcmF0b3IyMy5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYyMiA9IF9pdGVyYXRvcjIzW19pMjUrK107XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X2kyNSA9IF9pdGVyYXRvcjIzLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjIgPSBfaTI1LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dmFyIGlucHV0ID0gX3JlZjIyO1xuXG5cdFx0XHRcdFx0XHRcdHZhciBpbnB1dE5hbWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRcdFx0XHRcdFx0dmFyIGlucHV0VHlwZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpO1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5wdXRUeXBlKSBpbnB1dFR5cGUgPSBpbnB1dFR5cGUudG9Mb3dlckNhc2UoKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBJZiB0aGUgaW5wdXQgZG9lc24ndCBoYXZlIGEgbmFtZSwgd2UgY2FuJ3QgdXNlIGl0LlxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGlucHV0TmFtZSA9PT0gJ3VuZGVmaW5lZCcgfHwgaW5wdXROYW1lID09PSBudWxsKSBjb250aW51ZTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoaW5wdXQudGFnTmFtZSA9PT0gJ1NFTEVDVCcgJiYgaW5wdXQuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gUG9zc2libHkgbXVsdGlwbGUgdmFsdWVzXG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyNCA9IGlucHV0Lm9wdGlvbnMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjQgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaTI2ID0gMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjQgPSBfaXNBcnJheTI0ID8gX2l0ZXJhdG9yMjQgOiBfaXRlcmF0b3IyNFtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBfcmVmMjM7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTI2ID49IF9pdGVyYXRvcjI0Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9yZWYyMyA9IF9pdGVyYXRvcjI0W19pMjYrK107XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRfaTI2ID0gX2l0ZXJhdG9yMjQubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNi5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3JlZjIzID0gX2kyNi52YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIG9wdGlvbiA9IF9yZWYyMztcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoaW5wdXROYW1lLCBvcHRpb24udmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICghaW5wdXRUeXBlIHx8IChpbnB1dFR5cGUgIT09ICdjaGVja2JveCcgJiYgaW5wdXRUeXBlICE9PSAncmFkaW8nKSB8fCBpbnB1dC5jaGVja2VkKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9ybURhdGEuYXBwZW5kKGlucHV0TmFtZSwgaW5wdXQudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIEludm9rZWQgd2hlbiB0aGVyZSBpcyBuZXcgcHJvZ3Jlc3MgaW5mb3JtYXRpb24gYWJvdXQgZ2l2ZW4gZmlsZXMuXG5cdFx0XHRcdC8vIElmIGUgaXMgbm90IHByb3ZpZGVkLCBpdCBpcyBhc3N1bWVkIHRoYXQgdGhlIHVwbG9hZCBpcyBmaW5pc2hlZC5cblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGtleTogJ191cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpIHtcblx0XHRcdFx0XHR2YXIgcHJvZ3Jlc3MgPSB2b2lkIDA7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cHJvZ3Jlc3MgPSAoMTAwICogZS5sb2FkZWQpIC8gZS50b3RhbDtcblxuXHRcdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBmaWxlID0gZmlsZXNbMF07XG5cdFx0XHRcdFx0XHRcdC8vIFNpbmNlIHRoaXMgaXMgYSBjaHVua2VkIHVwbG9hZCwgd2UgbmVlZCB0byB1cGRhdGUgdGhlIGFwcHJvcHJpYXRlIGNodW5rIHByb2dyZXNzLlxuXHRcdFx0XHRcdFx0XHR2YXIgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlLCB4aHIpO1xuXHRcdFx0XHRcdFx0XHRjaHVuay5wcm9ncmVzcyA9IHByb2dyZXNzO1xuXHRcdFx0XHRcdFx0XHRjaHVuay50b3RhbCA9IGUudG90YWw7XG5cdFx0XHRcdFx0XHRcdGNodW5rLmJ5dGVzU2VudCA9IGUubG9hZGVkO1xuXHRcdFx0XHRcdFx0XHR2YXIgZmlsZVByb2dyZXNzID0gMCxcblx0XHRcdFx0XHRcdFx0XHRmaWxlVG90YWwgPSB2b2lkIDAsXG5cdFx0XHRcdFx0XHRcdFx0ZmlsZUJ5dGVzU2VudCA9IHZvaWQgMDtcblx0XHRcdFx0XHRcdFx0ZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSAwO1xuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC50b3RhbCA9IDA7XG5cdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLmJ5dGVzU2VudCA9IDA7XG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZmlsZS51cGxvYWQuY2h1bmtzW2ldICE9PSB1bmRlZmluZWQgJiYgZmlsZS51cGxvYWQuY2h1bmtzW2ldLnByb2dyZXNzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLnByb2dyZXNzICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS5wcm9ncmVzcztcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLnRvdGFsICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS50b3RhbDtcblx0XHRcdFx0XHRcdFx0XHRcdGZpbGUudXBsb2FkLmJ5dGVzU2VudCArPSBmaWxlLnVwbG9hZC5jaHVua3NbaV0uYnl0ZXNTZW50O1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IGZpbGUudXBsb2FkLnByb2dyZXNzIC8gZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50O1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHR2YXIgX2l0ZXJhdG9yMjUgPSBmaWxlcyxcblx0XHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjUgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0X2kyNyA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRfaXRlcmF0b3IyNSA9IF9pc0FycmF5MjUgPyBfaXRlcmF0b3IyNSA6IF9pdGVyYXRvcjI1W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIF9yZWYyNDtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI1KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyNyA+PSBfaXRlcmF0b3IyNS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjI0ID0gX2l0ZXJhdG9yMjVbX2kyNysrXTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0X2kyNyA9IF9pdGVyYXRvcjI1Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChfaTI3LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3JlZjI0ID0gX2kyNy52YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHR2YXIgX2ZpbGUyID0gX3JlZjI0O1xuXG5cdFx0XHRcdFx0XHRcdFx0X2ZpbGUyLnVwbG9hZC5wcm9ncmVzcyA9IHByb2dyZXNzO1xuXHRcdFx0XHRcdFx0XHRcdF9maWxlMi51cGxvYWQudG90YWwgPSBlLnRvdGFsO1xuXHRcdFx0XHRcdFx0XHRcdF9maWxlMi51cGxvYWQuYnl0ZXNTZW50ID0gZS5sb2FkZWQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyNiA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjYgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMjggPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI2ID0gX2lzQXJyYXkyNiA/IF9pdGVyYXRvcjI2IDogX2l0ZXJhdG9yMjZbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjI1O1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI2KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjggPj0gX2l0ZXJhdG9yMjYubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjUgPSBfaXRlcmF0b3IyNltfaTI4KytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMjggPSBfaXRlcmF0b3IyNi5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMjguZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI1ID0gX2kyOC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBfZmlsZTMgPSBfcmVmMjU7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCd1cGxvYWRwcm9ncmVzcycsIF9maWxlMywgX2ZpbGUzLnVwbG9hZC5wcm9ncmVzcywgX2ZpbGUzLnVwbG9hZC5ieXRlc1NlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBDYWxsZWQgd2hlbiB0aGUgZmlsZSBmaW5pc2hlZCB1cGxvYWRpbmdcblxuXHRcdFx0XHRcdFx0dmFyIGFsbEZpbGVzRmluaXNoZWQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0XHRwcm9ncmVzcyA9IDEwMDtcblxuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI3ID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdFx0X2lzQXJyYXkyNyA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0X2kyOSA9IDAsXG5cdFx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjcgPSBfaXNBcnJheTI3ID8gX2l0ZXJhdG9yMjcgOiBfaXRlcmF0b3IyN1tTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHRcdDtcblxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHZhciBfcmVmMjY7XG5cblx0XHRcdFx0XHRcdFx0aWYgKF9pc0FycmF5MjcpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyOSA+PSBfaXRlcmF0b3IyNy5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdF9yZWYyNiA9IF9pdGVyYXRvcjI3W19pMjkrK107XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0X2kyOSA9IF9pdGVyYXRvcjI3Lm5leHQoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoX2kyOS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjYgPSBfaTI5LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dmFyIF9maWxlNCA9IF9yZWYyNjtcblxuXHRcdFx0XHRcdFx0XHRpZiAoX2ZpbGU0LnVwbG9hZC5wcm9ncmVzcyAhPT0gMTAwIHx8IF9maWxlNC51cGxvYWQuYnl0ZXNTZW50ICE9PSBfZmlsZTQudXBsb2FkLnRvdGFsKSB7XG5cdFx0XHRcdFx0XHRcdFx0YWxsRmlsZXNGaW5pc2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdF9maWxlNC51cGxvYWQucHJvZ3Jlc3MgPSBwcm9ncmVzcztcblx0XHRcdFx0XHRcdFx0X2ZpbGU0LnVwbG9hZC5ieXRlc1NlbnQgPSBfZmlsZTQudXBsb2FkLnRvdGFsO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOb3RoaW5nIHRvIGRvLCBhbGwgZmlsZXMgYWxyZWFkeSBhdCAxMDAlXG5cdFx0XHRcdFx0XHRpZiAoYWxsRmlsZXNGaW5pc2hlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IyOCA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRcdF9pc0FycmF5MjggPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdF9pMzAgPSAwLFxuXHRcdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjI4ID0gX2lzQXJyYXkyOCA/IF9pdGVyYXRvcjI4IDogX2l0ZXJhdG9yMjhbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgX3JlZjI3O1xuXG5cdFx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI4KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMzAgPj0gX2l0ZXJhdG9yMjgubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0XHRcdFx0XHRfcmVmMjcgPSBfaXRlcmF0b3IyOFtfaTMwKytdO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdF9pMzAgPSBfaXRlcmF0b3IyOC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKF9pMzAuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0X3JlZjI3ID0gX2kzMC52YWx1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHZhciBfZmlsZTUgPSBfcmVmMjc7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5lbWl0KCd1cGxvYWRwcm9ncmVzcycsIF9maWxlNSwgcHJvZ3Jlc3MsIF9maWxlNS51cGxvYWQuYnl0ZXNTZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICdfZmluaXNoZWRVcGxvYWRpbmcnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gX2ZpbmlzaGVkVXBsb2FkaW5nKGZpbGVzLCB4aHIsIGUpIHtcblx0XHRcdFx0XHR2YXIgcmVzcG9uc2UgPSB2b2lkIDA7XG5cblx0XHRcdFx0XHRpZiAoZmlsZXNbMF0uc3RhdHVzID09PSBEcm9wem9uZS5DQU5DRUxFRCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gNCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh4aHIucmVzcG9uc2VUeXBlICE9PSAnYXJyYXlidWZmZXInICYmIHhoci5yZXNwb25zZVR5cGUgIT09ICdibG9iJykge1xuXHRcdFx0XHRcdFx0cmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xuXG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJykgJiZcblx0XHRcdFx0XHRcdFx0fnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJykuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdGUgPSBlcnJvcjtcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9ICdJbnZhbGlkIEpTT04gcmVzcG9uc2UgZnJvbSBzZXJ2ZXIuJztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3MoZmlsZXMpO1xuXG5cdFx0XHRcdFx0aWYgKCEoMjAwIDw9IHhoci5zdGF0dXMgJiYgeGhyLnN0YXR1cyA8IDMwMCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XG5cdFx0XHRcdFx0XHRcdGZpbGVzWzBdLnVwbG9hZC5maW5pc2hlZENodW5rVXBsb2FkKHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2ZpbmlzaGVkKGZpbGVzLCByZXNwb25zZSwgZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX2hhbmRsZVVwbG9hZEVycm9yJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVVcGxvYWRFcnJvcihmaWxlcywgeGhyLCByZXNwb25zZSkge1xuXHRcdFx0XHRcdGlmIChmaWxlc1swXS5zdGF0dXMgPT09IERyb3B6b25lLkNBTkNFTEVEKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkICYmIHRoaXMub3B0aW9ucy5yZXRyeUNodW5rcykge1xuXHRcdFx0XHRcdFx0dmFyIGNodW5rID0gdGhpcy5fZ2V0Q2h1bmsoZmlsZXNbMF0sIHhocik7XG5cdFx0XHRcdFx0XHRpZiAoY2h1bmsucmV0cmllcysrIDwgdGhpcy5vcHRpb25zLnJldHJ5Q2h1bmtzTGltaXQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fdXBsb2FkRGF0YShmaWxlcywgW2NodW5rLmRhdGFCbG9ja10pO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ1JldHJpZWQgdGhpcyBjaHVuayB0b28gb2Z0ZW4uIEdpdmluZyB1cC4nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjI5ID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MjkgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRfaTMxID0gMCxcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMjkgPSBfaXNBcnJheTI5ID8gX2l0ZXJhdG9yMjkgOiBfaXRlcmF0b3IyOVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHZhciBfcmVmMjg7XG5cblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTI5KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTMxID49IF9pdGVyYXRvcjI5Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYyOCA9IF9pdGVyYXRvcjI5W19pMzErK107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfaTMxID0gX2l0ZXJhdG9yMjkubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kzMS5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjI4ID0gX2kzMS52YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMjg7XG5cblx0XHRcdFx0XHRcdHRoaXMuX2Vycm9yUHJvY2Vzc2luZyhcblx0XHRcdFx0XHRcdFx0ZmlsZXMsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlIHx8IHRoaXMub3B0aW9ucy5kaWN0UmVzcG9uc2VFcnJvci5yZXBsYWNlKCd7e3N0YXR1c0NvZGV9fScsIHhoci5zdGF0dXMpLFxuXHRcdFx0XHRcdFx0XHR4aHJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnc3VibWl0UmVxdWVzdCcsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdWJtaXRSZXF1ZXN0KHhociwgZm9ybURhdGEsIGZpbGVzKSB7XG5cdFx0XHRcdFx0eGhyLnNlbmQoZm9ybURhdGEpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cblx0XHRcdFx0Ly8gSW5kaXZpZHVhbCBjYWxsYmFja3MgaGF2ZSB0byBiZSBjYWxsZWQgaW4gdGhlIGFwcHJvcHJpYXRlIHNlY3Rpb25zLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX2ZpbmlzaGVkJyxcblx0XHRcdFx0dmFsdWU6IGZ1bmN0aW9uIF9maW5pc2hlZChmaWxlcywgcmVzcG9uc2VUZXh0LCBlKSB7XG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdHZhciBfaXRlcmF0b3IzMCA9IGZpbGVzLFxuXHRcdFx0XHRcdFx0XHRfaXNBcnJheTMwID0gdHJ1ZSxcblx0XHRcdFx0XHRcdFx0X2kzMiA9IDAsXG5cdFx0XHRcdFx0XHRcdF9pdGVyYXRvcjMwID0gX2lzQXJyYXkzMCA/IF9pdGVyYXRvcjMwIDogX2l0ZXJhdG9yMzBbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdFx0O1xuXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR2YXIgX3JlZjI5O1xuXG5cdFx0XHRcdFx0XHRpZiAoX2lzQXJyYXkzMCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kzMiA+PSBfaXRlcmF0b3IzMC5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRfcmVmMjkgPSBfaXRlcmF0b3IzMFtfaTMyKytdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X2kzMiA9IF9pdGVyYXRvcjMwLm5leHQoKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9pMzIuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYyOSA9IF9pMzIudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBmaWxlID0gX3JlZjI5O1xuXG5cdFx0XHRcdFx0XHRmaWxlLnN0YXR1cyA9IERyb3B6b25lLlNVQ0NFU1M7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3N1Y2Nlc3MnLCBmaWxlLCByZXNwb25zZVRleHQsIGUpO1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjb21wbGV0ZScsIGZpbGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ3N1Y2Nlc3NtdWx0aXBsZScsIGZpbGVzLCByZXNwb25zZVRleHQsIGUpO1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdjb21wbGV0ZW11bHRpcGxlJywgZmlsZXMpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cblx0XHRcdFx0Ly8gSW5kaXZpZHVhbCBjYWxsYmFja3MgaGF2ZSB0byBiZSBjYWxsZWQgaW4gdGhlIGFwcHJvcHJpYXRlIHNlY3Rpb25zLlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0a2V5OiAnX2Vycm9yUHJvY2Vzc2luZycsXG5cdFx0XHRcdHZhbHVlOiBmdW5jdGlvbiBfZXJyb3JQcm9jZXNzaW5nKGZpbGVzLCBtZXNzYWdlLCB4aHIpIHtcblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0dmFyIF9pdGVyYXRvcjMxID0gZmlsZXMsXG5cdFx0XHRcdFx0XHRcdF9pc0FycmF5MzEgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHRfaTMzID0gMCxcblx0XHRcdFx0XHRcdFx0X2l0ZXJhdG9yMzEgPSBfaXNBcnJheTMxID8gX2l0ZXJhdG9yMzEgOiBfaXRlcmF0b3IzMVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdFx0XHRcdFx0XHQ7XG5cblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHZhciBfcmVmMzA7XG5cblx0XHRcdFx0XHRcdGlmIChfaXNBcnJheTMxKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChfaTMzID49IF9pdGVyYXRvcjMxLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRcdF9yZWYzMCA9IF9pdGVyYXRvcjMxW19pMzMrK107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfaTMzID0gX2l0ZXJhdG9yMzEubmV4dCgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoX2kzMy5kb25lKSBicmVhaztcblx0XHRcdFx0XHRcdFx0X3JlZjMwID0gX2kzMy52YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZpbGUgPSBfcmVmMzA7XG5cblx0XHRcdFx0XHRcdGZpbGUuc3RhdHVzID0gRHJvcHpvbmUuRVJST1I7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2Vycm9yJywgZmlsZSwgbWVzc2FnZSwgeGhyKTtcblx0XHRcdFx0XHRcdHRoaXMuZW1pdCgnY29tcGxldGUnLCBmaWxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5lbWl0KCdlcnJvcm11bHRpcGxlJywgZmlsZXMsIG1lc3NhZ2UsIHhocik7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoJ2NvbXBsZXRlbXVsdGlwbGUnLCBmaWxlcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9jZXNzUXVldWUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0W1xuXHRcdFx0e1xuXHRcdFx0XHRrZXk6ICd1dWlkdjQnLFxuXHRcdFx0XHR2YWx1ZTogZnVuY3Rpb24gdXVpZHY0KCkge1xuXHRcdFx0XHRcdHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcblx0XHRcdFx0XHRcdHZhciByID0gKE1hdGgucmFuZG9tKCkgKiAxNikgfCAwLFxuXHRcdFx0XHRcdFx0XHR2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcblx0XHRcdFx0XHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XVxuXHQpO1xuXG5cdHJldHVybiBEcm9wem9uZTtcbn0pKEVtaXR0ZXIpO1xuXG5Ecm9wem9uZS5pbml0Q2xhc3MoKTtcblxuRHJvcHpvbmUudmVyc2lvbiA9ICc1LjIuMCc7XG5cbi8vIFRoaXMgaXMgYSBtYXAgb2Ygb3B0aW9ucyBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmVzLiBBZGQgY29uZmlndXJhdGlvbnNcbi8vIHRvIHRoaXMgb2JqZWN0IGZvciB5b3VyIGRpZmZlcmVudCBkcm9wem9uZSBlbGVtZW5zLlxuLy9cbi8vIEV4YW1wbGU6XG4vL1xuLy8gICAgIERyb3B6b25lLm9wdGlvbnMubXlEcm9wem9uZUVsZW1lbnRJZCA9IHsgbWF4RmlsZXNpemU6IDEgfTtcbi8vXG4vLyBUbyBkaXNhYmxlIGF1dG9EaXNjb3ZlciBmb3IgYSBzcGVjaWZpYyBlbGVtZW50LCB5b3UgY2FuIHNldCBgZmFsc2VgIGFzIGFuIG9wdGlvbjpcbi8vXG4vLyAgICAgRHJvcHpvbmUub3B0aW9ucy5teURpc2FibGVkRWxlbWVudElkID0gZmFsc2U7XG4vL1xuLy8gQW5kIGluIGh0bWw6XG4vL1xuLy8gICAgIDxmb3JtIGFjdGlvbj1cIi91cGxvYWRcIiBpZD1cIm15LWRyb3B6b25lLWVsZW1lbnQtaWRcIiBjbGFzcz1cImRyb3B6b25lXCI+PC9mb3JtPlxuRHJvcHpvbmUub3B0aW9ucyA9IHt9O1xuXG4vLyBSZXR1cm5zIHRoZSBvcHRpb25zIGZvciBhbiBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiBub25lIGF2YWlsYWJsZS5cbkRyb3B6b25lLm9wdGlvbnNGb3JFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuXHQvLyBHZXQgdGhlIGBEcm9wem9uZS5vcHRpb25zLmVsZW1lbnRJZGAgZm9yIHRoaXMgZWxlbWVudCBpZiBpdCBleGlzdHNcblx0aWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpKSB7XG5cdFx0cmV0dXJuIERyb3B6b25lLm9wdGlvbnNbY2FtZWxpemUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykpXTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG4vLyBIb2xkcyBhIGxpc3Qgb2YgYWxsIGRyb3B6b25lIGluc3RhbmNlc1xuRHJvcHpvbmUuaW5zdGFuY2VzID0gW107XG5cbi8vIFJldHVybnMgdGhlIGRyb3B6b25lIGZvciBnaXZlbiBlbGVtZW50IGlmIGFueVxuRHJvcHpvbmUuZm9yRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0aWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuXHRcdGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuXHR9XG5cdGlmICgoZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5kcm9wem9uZSA6IHVuZGVmaW5lZCkgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFwiTm8gRHJvcHpvbmUgZm91bmQgZm9yIGdpdmVuIGVsZW1lbnQuIFRoaXMgaXMgcHJvYmFibHkgYmVjYXVzZSB5b3UncmUgdHJ5aW5nIHRvIGFjY2VzcyBpdCBiZWZvcmUgRHJvcHpvbmUgaGFkIHRoZSB0aW1lIHRvIGluaXRpYWxpemUuIFVzZSB0aGUgYGluaXRgIG9wdGlvbiB0byBzZXR1cCBhbnkgYWRkaXRpb25hbCBvYnNlcnZlcnMgb24geW91ciBEcm9wem9uZS5cIlxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGVsZW1lbnQuZHJvcHpvbmU7XG59O1xuXG4vLyBTZXQgdG8gZmFsc2UgaWYgeW91IGRvbid0IHdhbnQgRHJvcHpvbmUgdG8gYXV0b21hdGljYWxseSBmaW5kIGFuZCBhdHRhY2ggdG8gLmRyb3B6b25lIGVsZW1lbnRzLlxuRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gdHJ1ZTtcblxuLy8gTG9va3MgZm9yIGFsbCAuZHJvcHpvbmUgZWxlbWVudHMgYW5kIGNyZWF0ZXMgYSBkcm9wem9uZSBmb3IgdGhlbVxuRHJvcHpvbmUuZGlzY292ZXIgPSBmdW5jdGlvbigpIHtcblx0dmFyIGRyb3B6b25lcyA9IHZvaWQgMDtcblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwpIHtcblx0XHRkcm9wem9uZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcHpvbmUnKTtcblx0fSBlbHNlIHtcblx0XHRkcm9wem9uZXMgPSBbXTtcblx0XHQvLyBJRSA6KFxuXHRcdHZhciBjaGVja0VsZW1lbnRzID0gZnVuY3Rpb24gY2hlY2tFbGVtZW50cyhlbGVtZW50cykge1xuXHRcdFx0cmV0dXJuIChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdHZhciBfaXRlcmF0b3IzMiA9IGVsZW1lbnRzLFxuXHRcdFx0XHRcdFx0X2lzQXJyYXkzMiA9IHRydWUsXG5cdFx0XHRcdFx0XHRfaTM0ID0gMCxcblx0XHRcdFx0XHRcdF9pdGVyYXRvcjMyID0gX2lzQXJyYXkzMiA/IF9pdGVyYXRvcjMyIDogX2l0ZXJhdG9yMzJbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0XHRcdDtcblxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHR2YXIgX3JlZjMxO1xuXG5cdFx0XHRcdFx0aWYgKF9pc0FycmF5MzIpIHtcblx0XHRcdFx0XHRcdGlmIChfaTM0ID49IF9pdGVyYXRvcjMyLmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRfcmVmMzEgPSBfaXRlcmF0b3IzMltfaTM0KytdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfaTM0ID0gX2l0ZXJhdG9yMzIubmV4dCgpO1xuXHRcdFx0XHRcdFx0aWYgKF9pMzQuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdFx0XHRfcmVmMzEgPSBfaTM0LnZhbHVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBlbCA9IF9yZWYzMTtcblxuXHRcdFx0XHRcdGlmICgvKF58IClkcm9wem9uZSgkfCApLy50ZXN0KGVsLmNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKGRyb3B6b25lcy5wdXNoKGVsKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9KSgpO1xuXHRcdH07XG5cdFx0Y2hlY2tFbGVtZW50cyhkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JykpO1xuXHRcdGNoZWNrRWxlbWVudHMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvcm0nKSk7XG5cdH1cblxuXHRyZXR1cm4gKGZ1bmN0aW9uKCkge1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHRmb3IgKFxuXHRcdFx0dmFyIF9pdGVyYXRvcjMzID0gZHJvcHpvbmVzLFxuXHRcdFx0XHRfaXNBcnJheTMzID0gdHJ1ZSxcblx0XHRcdFx0X2kzNSA9IDAsXG5cdFx0XHRcdF9pdGVyYXRvcjMzID0gX2lzQXJyYXkzMyA/IF9pdGVyYXRvcjMzIDogX2l0ZXJhdG9yMzNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdFx0O1xuXG5cdFx0KSB7XG5cdFx0XHR2YXIgX3JlZjMyO1xuXG5cdFx0XHRpZiAoX2lzQXJyYXkzMykge1xuXHRcdFx0XHRpZiAoX2kzNSA+PSBfaXRlcmF0b3IzMy5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRfcmVmMzIgPSBfaXRlcmF0b3IzM1tfaTM1KytdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X2kzNSA9IF9pdGVyYXRvcjMzLm5leHQoKTtcblx0XHRcdFx0aWYgKF9pMzUuZG9uZSkgYnJlYWs7XG5cdFx0XHRcdF9yZWYzMiA9IF9pMzUudmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBkcm9wem9uZSA9IF9yZWYzMjtcblxuXHRcdFx0Ly8gQ3JlYXRlIGEgZHJvcHpvbmUgdW5sZXNzIGF1dG8gZGlzY292ZXIgaGFzIGJlZW4gZGlzYWJsZWQgZm9yIHNwZWNpZmljIGVsZW1lbnRcblx0XHRcdGlmIChEcm9wem9uZS5vcHRpb25zRm9yRWxlbWVudChkcm9wem9uZSkgIT09IGZhbHNlKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG5ldyBEcm9wem9uZShkcm9wem9uZSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godW5kZWZpbmVkKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSkoKTtcbn07XG5cbi8vIFNpbmNlIHRoZSB3aG9sZSBEcmFnJ24nRHJvcCBBUEkgaXMgcHJldHR5IG5ldywgc29tZSBicm93c2VycyBpbXBsZW1lbnQgaXQsXG4vLyBidXQgbm90IGNvcnJlY3RseS5cbi8vIFNvIEkgY3JlYXRlZCBhIGJsYWNrbGlzdCBvZiB1c2VyQWdlbnRzLiBZZXMsIHllcy4gQnJvd3NlciBzbmlmZmluZywgSSBrbm93LlxuLy8gQnV0IHdoYXQgdG8gZG8gd2hlbiBicm93c2VycyAqdGhlb3JldGljYWxseSogc3VwcG9ydCBhbiBBUEksIGJ1dCBjcmFzaFxuLy8gd2hlbiB1c2luZyBpdC5cbi8vXG4vLyBUaGlzIGlzIGEgbGlzdCBvZiByZWd1bGFyIGV4cHJlc3Npb25zIHRlc3RlZCBhZ2FpbnN0IG5hdmlnYXRvci51c2VyQWdlbnRcbi8vXG4vLyAqKiBJdCBzaG91bGQgb25seSBiZSB1c2VkIG9uIGJyb3dzZXIgdGhhdCAqZG8qIHN1cHBvcnQgdGhlIEFQSSwgYnV0XG4vLyBpbmNvcnJlY3RseSAqKlxuLy9cbkRyb3B6b25lLmJsYWNrbGlzdGVkQnJvd3NlcnMgPSBbXG5cdC8vIFRoZSBtYWMgb3MgYW5kIHdpbmRvd3MgcGhvbmUgdmVyc2lvbiBvZiBvcGVyYSAxMiBzZWVtcyB0byBoYXZlIGEgcHJvYmxlbSB3aXRoIHRoZSBGaWxlIGRyYWcnbidkcm9wIEFQSS5cblx0L29wZXJhLiooTWFjaW50b3NofFdpbmRvd3MgUGhvbmUpLip2ZXJzaW9uXFwvMTIvaSxcbl07XG5cbi8vIENoZWNrcyBpZiB0aGUgYnJvd3NlciBpcyBzdXBwb3J0ZWRcbkRyb3B6b25lLmlzQnJvd3NlclN1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgY2FwYWJsZUJyb3dzZXIgPSB0cnVlO1xuXG5cdGlmICh3aW5kb3cuRmlsZSAmJiB3aW5kb3cuRmlsZVJlYWRlciAmJiB3aW5kb3cuRmlsZUxpc3QgJiYgd2luZG93LkJsb2IgJiYgd2luZG93LkZvcm1EYXRhICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpIHtcblx0XHRpZiAoISgnY2xhc3NMaXN0JyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJykpKSB7XG5cdFx0XHRjYXBhYmxlQnJvd3NlciA9IGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBUaGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgQVBJLCBidXQgbWF5IGJlIGJsYWNrbGlzdGVkLlxuXHRcdFx0Zm9yIChcblx0XHRcdFx0dmFyIF9pdGVyYXRvcjM0ID0gRHJvcHpvbmUuYmxhY2tsaXN0ZWRCcm93c2Vycyxcblx0XHRcdFx0XHRfaXNBcnJheTM0ID0gdHJ1ZSxcblx0XHRcdFx0XHRfaTM2ID0gMCxcblx0XHRcdFx0XHRfaXRlcmF0b3IzNCA9IF9pc0FycmF5MzQgPyBfaXRlcmF0b3IzNCA6IF9pdGVyYXRvcjM0W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0O1xuXG5cdFx0XHQpIHtcblx0XHRcdFx0dmFyIF9yZWYzMztcblxuXHRcdFx0XHRpZiAoX2lzQXJyYXkzNCkge1xuXHRcdFx0XHRcdGlmIChfaTM2ID49IF9pdGVyYXRvcjM0Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRcdFx0X3JlZjMzID0gX2l0ZXJhdG9yMzRbX2kzNisrXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfaTM2ID0gX2l0ZXJhdG9yMzQubmV4dCgpO1xuXHRcdFx0XHRcdGlmIChfaTM2LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdF9yZWYzMyA9IF9pMzYudmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcmVnZXggPSBfcmVmMzM7XG5cblx0XHRcdFx0aWYgKHJlZ2V4LnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHRcdFx0XHRjYXBhYmxlQnJvd3NlciA9IGZhbHNlO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNhcGFibGVCcm93c2VyID0gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gY2FwYWJsZUJyb3dzZXI7XG59O1xuXG5Ecm9wem9uZS5kYXRhVVJJdG9CbG9iID0gZnVuY3Rpb24oZGF0YVVSSSkge1xuXHQvLyBjb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZ1xuXHQvLyBkb2Vzbid0IGhhbmRsZSBVUkxFbmNvZGVkIERhdGFVUklzIC0gc2VlIFNPIGFuc3dlciAjNjg1MDI3NiBmb3IgY29kZSB0aGF0IGRvZXMgdGhpc1xuXHR2YXIgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcblxuXHQvLyBzZXBhcmF0ZSBvdXQgdGhlIG1pbWUgY29tcG9uZW50XG5cdHZhciBtaW1lU3RyaW5nID0gZGF0YVVSSVxuXHRcdC5zcGxpdCgnLCcpWzBdXG5cdFx0LnNwbGl0KCc6JylbMV1cblx0XHQuc3BsaXQoJzsnKVswXTtcblxuXHQvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhbiBBcnJheUJ1ZmZlclxuXHR2YXIgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xuXHR2YXIgaWEgPSBuZXcgVWludDhBcnJheShhYik7XG5cdGZvciAodmFyIGkgPSAwLCBlbmQgPSBieXRlU3RyaW5nLmxlbmd0aCwgYXNjID0gMCA8PSBlbmQ7IGFzYyA/IGkgPD0gZW5kIDogaSA+PSBlbmQ7IGFzYyA/IGkrKyA6IGktLSkge1xuXHRcdGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXHR9XG5cblx0Ly8gd3JpdGUgdGhlIEFycmF5QnVmZmVyIHRvIGEgYmxvYlxuXHRyZXR1cm4gbmV3IEJsb2IoW2FiXSwgeyB0eXBlOiBtaW1lU3RyaW5nIH0pO1xufTtcblxuLy8gUmV0dXJucyBhbiBhcnJheSB3aXRob3V0IHRoZSByZWplY3RlZCBpdGVtXG52YXIgd2l0aG91dCA9IGZ1bmN0aW9uIHdpdGhvdXQobGlzdCwgcmVqZWN0ZWRJdGVtKSB7XG5cdHJldHVybiBsaXN0XG5cdFx0LmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRyZXR1cm4gaXRlbSAhPT0gcmVqZWN0ZWRJdGVtO1xuXHRcdH0pXG5cdFx0Lm1hcChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9KTtcbn07XG5cbi8vIGFiYy1kZWZfZ2hpIC0+IGFiY0RlZkdoaVxudmFyIGNhbWVsaXplID0gZnVuY3Rpb24gY2FtZWxpemUoc3RyKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZSgvW1xcLV9dKFxcdykvZywgZnVuY3Rpb24obWF0Y2gpIHtcblx0XHRyZXR1cm4gbWF0Y2guY2hhckF0KDEpLnRvVXBwZXJDYXNlKCk7XG5cdH0pO1xufTtcblxuLy8gQ3JlYXRlcyBhbiBlbGVtZW50IGZyb20gc3RyaW5nXG5Ecm9wem9uZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24oc3RyaW5nKSB7XG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LmlubmVySFRNTCA9IHN0cmluZztcblx0cmV0dXJuIGRpdi5jaGlsZE5vZGVzWzBdO1xufTtcblxuLy8gVGVzdHMgaWYgZ2l2ZW4gZWxlbWVudCBpcyBpbnNpZGUgKG9yIHNpbXBseSBpcykgdGhlIGNvbnRhaW5lclxuRHJvcHpvbmUuZWxlbWVudEluc2lkZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNvbnRhaW5lcikge1xuXHRpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gLy8gQ29mZmVlc2NyaXB0IGRvZXNuJ3Qgc3VwcG9ydCBkby93aGlsZSBsb29wc1xuXHR3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpKSB7XG5cdFx0aWYgKGVsZW1lbnQgPT09IGNvbnRhaW5lcikge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbkRyb3B6b25lLmdldEVsZW1lbnQgPSBmdW5jdGlvbihlbCwgbmFtZSkge1xuXHR2YXIgZWxlbWVudCA9IHZvaWQgMDtcblx0aWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcblx0XHRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdH0gZWxzZSBpZiAoZWwubm9kZVR5cGUgIT0gbnVsbCkge1xuXHRcdGVsZW1lbnQgPSBlbDtcblx0fVxuXHRpZiAoZWxlbWVudCA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGAnICsgbmFtZSArICdgIG9wdGlvbiBwcm92aWRlZC4gUGxlYXNlIHByb3ZpZGUgYSBDU1Mgc2VsZWN0b3Igb3IgYSBwbGFpbiBIVE1MIGVsZW1lbnQuJyk7XG5cdH1cblx0cmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5Ecm9wem9uZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uKGVscywgbmFtZSkge1xuXHR2YXIgZWwgPSB2b2lkIDAsXG5cdFx0ZWxlbWVudHMgPSB2b2lkIDA7XG5cdGlmIChlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdGVsZW1lbnRzID0gW107XG5cdFx0dHJ5IHtcblx0XHRcdGZvciAoXG5cdFx0XHRcdHZhciBfaXRlcmF0b3IzNSA9IGVscyxcblx0XHRcdFx0XHRfaXNBcnJheTM1ID0gdHJ1ZSxcblx0XHRcdFx0XHRfaTM3ID0gMCxcblx0XHRcdFx0XHRfaXRlcmF0b3IzNSA9IF9pc0FycmF5MzUgPyBfaXRlcmF0b3IzNSA6IF9pdGVyYXRvcjM1W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdFx0O1xuXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKF9pc0FycmF5MzUpIHtcblx0XHRcdFx0XHRpZiAoX2kzNyA+PSBfaXRlcmF0b3IzNS5sZW5ndGgpIGJyZWFrO1xuXHRcdFx0XHRcdGVsID0gX2l0ZXJhdG9yMzVbX2kzNysrXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfaTM3ID0gX2l0ZXJhdG9yMzUubmV4dCgpO1xuXHRcdFx0XHRcdGlmIChfaTM3LmRvbmUpIGJyZWFrO1xuXHRcdFx0XHRcdGVsID0gX2kzNy52YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnRzLnB1c2godGhpcy5nZXRFbGVtZW50KGVsLCBuYW1lKSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0ZWxlbWVudHMgPSBudWxsO1xuXHRcdH1cblx0fSBlbHNlIGlmICh0eXBlb2YgZWxzID09PSAnc3RyaW5nJykge1xuXHRcdGVsZW1lbnRzID0gW107XG5cdFx0Zm9yIChcblx0XHRcdHZhciBfaXRlcmF0b3IzNiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxzKSxcblx0XHRcdFx0X2lzQXJyYXkzNiA9IHRydWUsXG5cdFx0XHRcdF9pMzggPSAwLFxuXHRcdFx0XHRfaXRlcmF0b3IzNiA9IF9pc0FycmF5MzYgPyBfaXRlcmF0b3IzNiA6IF9pdGVyYXRvcjM2W1N5bWJvbC5pdGVyYXRvcl0oKTtcblx0XHRcdDtcblxuXHRcdCkge1xuXHRcdFx0aWYgKF9pc0FycmF5MzYpIHtcblx0XHRcdFx0aWYgKF9pMzggPj0gX2l0ZXJhdG9yMzYubGVuZ3RoKSBicmVhaztcblx0XHRcdFx0ZWwgPSBfaXRlcmF0b3IzNltfaTM4KytdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X2kzOCA9IF9pdGVyYXRvcjM2Lm5leHQoKTtcblx0XHRcdFx0aWYgKF9pMzguZG9uZSkgYnJlYWs7XG5cdFx0XHRcdGVsID0gX2kzOC52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudHMucHVzaChlbCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGVscy5ub2RlVHlwZSAhPSBudWxsKSB7XG5cdFx0ZWxlbWVudHMgPSBbZWxzXTtcblx0fVxuXG5cdGlmIChlbGVtZW50cyA9PSBudWxsIHx8ICFlbGVtZW50cy5sZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHQnSW52YWxpZCBgJyArIG5hbWUgKyAnYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yLCBhIHBsYWluIEhUTUwgZWxlbWVudCBvciBhIGxpc3Qgb2YgdGhvc2UuJ1xuXHRcdCk7XG5cdH1cblxuXHRyZXR1cm4gZWxlbWVudHM7XG59O1xuXG4vLyBBc2tzIHRoZSB1c2VyIHRoZSBxdWVzdGlvbiBhbmQgY2FsbHMgYWNjZXB0ZWQgb3IgcmVqZWN0ZWQgYWNjb3JkaW5nbHlcbi8vXG4vLyBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBqdXN0IHVzZXMgYHdpbmRvdy5jb25maXJtYCBhbmQgdGhlbiBjYWxscyB0aGVcbi8vIGFwcHJvcHJpYXRlIGNhbGxiYWNrLlxuRHJvcHpvbmUuY29uZmlybSA9IGZ1bmN0aW9uKHF1ZXN0aW9uLCBhY2NlcHRlZCwgcmVqZWN0ZWQpIHtcblx0aWYgKHdpbmRvdy5jb25maXJtKHF1ZXN0aW9uKSkge1xuXHRcdHJldHVybiBhY2NlcHRlZCgpO1xuXHR9IGVsc2UgaWYgKHJlamVjdGVkICE9IG51bGwpIHtcblx0XHRyZXR1cm4gcmVqZWN0ZWQoKTtcblx0fVxufTtcblxuLy8gVmFsaWRhdGVzIHRoZSBtaW1lIHR5cGUgbGlrZSB0aGlzOlxuLy9cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSFRNTC9FbGVtZW50L2lucHV0I2F0dHItYWNjZXB0XG5Ecm9wem9uZS5pc1ZhbGlkRmlsZSA9IGZ1bmN0aW9uKGZpbGUsIGFjY2VwdGVkRmlsZXMpIHtcblx0aWYgKCFhY2NlcHRlZEZpbGVzKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gLy8gSWYgdGhlcmUgYXJlIG5vIGFjY2VwdGVkIG1pbWUgdHlwZXMsIGl0J3MgT0tcblx0YWNjZXB0ZWRGaWxlcyA9IGFjY2VwdGVkRmlsZXMuc3BsaXQoJywnKTtcblxuXHR2YXIgbWltZVR5cGUgPSBmaWxlLnR5cGU7XG5cdHZhciBiYXNlTWltZVR5cGUgPSBtaW1lVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCAnJyk7XG5cblx0Zm9yIChcblx0XHR2YXIgX2l0ZXJhdG9yMzcgPSBhY2NlcHRlZEZpbGVzLFxuXHRcdFx0X2lzQXJyYXkzNyA9IHRydWUsXG5cdFx0XHRfaTM5ID0gMCxcblx0XHRcdF9pdGVyYXRvcjM3ID0gX2lzQXJyYXkzNyA/IF9pdGVyYXRvcjM3IDogX2l0ZXJhdG9yMzdbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdDtcblxuXHQpIHtcblx0XHR2YXIgX3JlZjM0O1xuXG5cdFx0aWYgKF9pc0FycmF5MzcpIHtcblx0XHRcdGlmIChfaTM5ID49IF9pdGVyYXRvcjM3Lmxlbmd0aCkgYnJlYWs7XG5cdFx0XHRfcmVmMzQgPSBfaXRlcmF0b3IzN1tfaTM5KytdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRfaTM5ID0gX2l0ZXJhdG9yMzcubmV4dCgpO1xuXHRcdFx0aWYgKF9pMzkuZG9uZSkgYnJlYWs7XG5cdFx0XHRfcmVmMzQgPSBfaTM5LnZhbHVlO1xuXHRcdH1cblxuXHRcdHZhciB2YWxpZFR5cGUgPSBfcmVmMzQ7XG5cblx0XHR2YWxpZFR5cGUgPSB2YWxpZFR5cGUudHJpbSgpO1xuXHRcdGlmICh2YWxpZFR5cGUuY2hhckF0KDApID09PSAnLicpIHtcblx0XHRcdGlmIChmaWxlLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHZhbGlkVHlwZS50b0xvd2VyQ2FzZSgpLCBmaWxlLm5hbWUubGVuZ3RoIC0gdmFsaWRUeXBlLmxlbmd0aCkgIT09IC0xKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoL1xcL1xcKiQvLnRlc3QodmFsaWRUeXBlKSkge1xuXHRcdFx0Ly8gVGhpcyBpcyBzb21ldGhpbmcgbGlrZSBhIGltYWdlLyogbWltZSB0eXBlXG5cdFx0XHRpZiAoYmFzZU1pbWVUeXBlID09PSB2YWxpZFR5cGUucmVwbGFjZSgvXFwvLiokLywgJycpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAobWltZVR5cGUgPT09IHZhbGlkVHlwZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBBdWdtZW50IGpRdWVyeVxuaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGpRdWVyeSAhPT0gbnVsbCkge1xuXHRqUXVlcnkuZm4uZHJvcHpvbmUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBuZXcgRHJvcHpvbmUodGhpcywgb3B0aW9ucyk7XG5cdFx0fSk7XG5cdH07XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUgIT09IG51bGwpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBEcm9wem9uZTtcbn0gZWxzZSB7XG5cdHdpbmRvdy5Ecm9wem9uZSA9IERyb3B6b25lO1xufVxuXG4vLyBEcm9wem9uZSBmaWxlIHN0YXR1cyBjb2Rlc1xuRHJvcHpvbmUuQURERUQgPSAnYWRkZWQnO1xuXG5Ecm9wem9uZS5RVUVVRUQgPSAncXVldWVkJztcbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gTm93LCBpZiBhIGZpbGUgaXMgYWNjZXB0ZWQsIGl0J3MgZWl0aGVyIHF1ZXVlZFxuLy8gb3IgdXBsb2FkaW5nLlxuRHJvcHpvbmUuQUNDRVBURUQgPSBEcm9wem9uZS5RVUVVRUQ7XG5cbkRyb3B6b25lLlVQTE9BRElORyA9ICd1cGxvYWRpbmcnO1xuRHJvcHpvbmUuUFJPQ0VTU0lORyA9IERyb3B6b25lLlVQTE9BRElORzsgLy8gYWxpYXNcblxuRHJvcHpvbmUuQ0FOQ0VMRUQgPSAnY2FuY2VsZWQnO1xuRHJvcHpvbmUuRVJST1IgPSAnZXJyb3InO1xuRHJvcHpvbmUuU1VDQ0VTUyA9ICdzdWNjZXNzJztcblxuLypcblxuIEJ1Z2ZpeCBmb3IgaU9TIDYgYW5kIDdcbiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTE5MjkwOTkvaHRtbDUtY2FudmFzLWRyYXdpbWFnZS1yYXRpby1idWctaW9zXG4gYmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL3N0b21pdGEvaW9zLWltYWdlZmlsZS1tZWdhcGl4ZWxcblxuICovXG5cbi8vIERldGVjdGluZyB2ZXJ0aWNhbCBzcXVhc2ggaW4gbG9hZGVkIGltYWdlLlxuLy8gRml4ZXMgYSBidWcgd2hpY2ggc3F1YXNoIGltYWdlIHZlcnRpY2FsbHkgd2hpbGUgZHJhd2luZyBpbnRvIGNhbnZhcyBmb3Igc29tZSBpbWFnZXMuXG4vLyBUaGlzIGlzIGEgYnVnIGluIGlPUzYgZGV2aWNlcy4gVGhpcyBmdW5jdGlvbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXG52YXIgZGV0ZWN0VmVydGljYWxTcXVhc2ggPSBmdW5jdGlvbiBkZXRlY3RWZXJ0aWNhbFNxdWFzaChpbWcpIHtcblx0dmFyIGl3ID0gaW1nLm5hdHVyYWxXaWR0aDtcblx0dmFyIGloID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG5cdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblx0Y2FudmFzLndpZHRoID0gMTtcblx0Y2FudmFzLmhlaWdodCA9IGloO1xuXHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcblxuXHR2YXIgX2N0eCRnZXRJbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDEsIDAsIDEsIGloKSxcblx0XHRkYXRhID0gX2N0eCRnZXRJbWFnZURhdGEuZGF0YTtcblxuXHQvLyBzZWFyY2ggaW1hZ2UgZWRnZSBwaXhlbCBwb3NpdGlvbiBpbiBjYXNlIGl0IGlzIHNxdWFzaGVkIHZlcnRpY2FsbHkuXG5cblx0dmFyIHN5ID0gMDtcblx0dmFyIGV5ID0gaWg7XG5cdHZhciBweSA9IGloO1xuXHR3aGlsZSAocHkgPiBzeSkge1xuXHRcdHZhciBhbHBoYSA9IGRhdGFbKHB5IC0gMSkgKiA0ICsgM107XG5cblx0XHRpZiAoYWxwaGEgPT09IDApIHtcblx0XHRcdGV5ID0gcHk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN5ID0gcHk7XG5cdFx0fVxuXG5cdFx0cHkgPSAoZXkgKyBzeSkgPj4gMTtcblx0fVxuXHR2YXIgcmF0aW8gPSBweSAvIGloO1xuXG5cdGlmIChyYXRpbyA9PT0gMCkge1xuXHRcdHJldHVybiAxO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiByYXRpbztcblx0fVxufTtcblxuLy8gQSByZXBsYWNlbWVudCBmb3IgY29udGV4dC5kcmF3SW1hZ2Vcbi8vIChhcmdzIGFyZSBmb3Igc291cmNlIGFuZCBkZXN0aW5hdGlvbikuXG52YXIgZHJhd0ltYWdlSU9TRml4ID0gZnVuY3Rpb24gZHJhd0ltYWdlSU9TRml4KGN0eCwgaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcblx0dmFyIHZlcnRTcXVhc2hSYXRpbyA9IGRldGVjdFZlcnRpY2FsU3F1YXNoKGltZyk7XG5cdHJldHVybiBjdHguZHJhd0ltYWdlKGltZywgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoIC8gdmVydFNxdWFzaFJhdGlvKTtcbn07XG5cbi8vIEJhc2VkIG9uIE1pbmlmeUpwZWdcbi8vIFNvdXJjZTogaHR0cDovL3d3dy5wZXJyeS5jei9maWxlcy9FeGlmUmVzdG9yZXIuanNcbi8vIGh0dHA6Ly9lbGljb24uYmxvZzU3LmZjMi5jb20vYmxvZy1lbnRyeS0yMDYuaHRtbFxuXG52YXIgRXhpZlJlc3RvcmUgPSAoZnVuY3Rpb24oKSB7XG5cdGZ1bmN0aW9uIEV4aWZSZXN0b3JlKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeGlmUmVzdG9yZSk7XG5cdH1cblxuXHRfY3JlYXRlQ2xhc3MoRXhpZlJlc3RvcmUsIG51bGwsIFtcblx0XHR7XG5cdFx0XHRrZXk6ICdpbml0Q2xhc3MnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXRDbGFzcygpIHtcblx0XHRcdFx0dGhpcy5LRVlfU1RSID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89Jztcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdlbmNvZGU2NCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW5jb2RlNjQoaW5wdXQpIHtcblx0XHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0XHR2YXIgY2hyMSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIGNocjIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBjaHIzID0gJyc7XG5cdFx0XHRcdHZhciBlbmMxID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR2YXIgZW5jMiA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIGVuYzMgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBlbmM0ID0gJyc7XG5cdFx0XHRcdHZhciBpID0gMDtcblx0XHRcdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdFx0XHRjaHIxID0gaW5wdXRbaSsrXTtcblx0XHRcdFx0XHRjaHIyID0gaW5wdXRbaSsrXTtcblx0XHRcdFx0XHRjaHIzID0gaW5wdXRbaSsrXTtcblx0XHRcdFx0XHRlbmMxID0gY2hyMSA+PiAyO1xuXHRcdFx0XHRcdGVuYzIgPSAoKGNocjEgJiAzKSA8PCA0KSB8IChjaHIyID4+IDQpO1xuXHRcdFx0XHRcdGVuYzMgPSAoKGNocjIgJiAxNSkgPDwgMikgfCAoY2hyMyA+PiA2KTtcblx0XHRcdFx0XHRlbmM0ID0gY2hyMyAmIDYzO1xuXHRcdFx0XHRcdGlmIChpc05hTihjaHIyKSkge1xuXHRcdFx0XHRcdFx0ZW5jMyA9IGVuYzQgPSA2NDtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGlzTmFOKGNocjMpKSB7XG5cdFx0XHRcdFx0XHRlbmM0ID0gNjQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG91dHB1dCA9XG5cdFx0XHRcdFx0XHRvdXRwdXQgK1xuXHRcdFx0XHRcdFx0dGhpcy5LRVlfU1RSLmNoYXJBdChlbmMxKSArXG5cdFx0XHRcdFx0XHR0aGlzLktFWV9TVFIuY2hhckF0KGVuYzIpICtcblx0XHRcdFx0XHRcdHRoaXMuS0VZX1NUUi5jaGFyQXQoZW5jMykgK1xuXHRcdFx0XHRcdFx0dGhpcy5LRVlfU1RSLmNoYXJBdChlbmM0KTtcblx0XHRcdFx0XHRjaHIxID0gY2hyMiA9IGNocjMgPSAnJztcblx0XHRcdFx0XHRlbmMxID0gZW5jMiA9IGVuYzMgPSBlbmM0ID0gJyc7XG5cdFx0XHRcdFx0aWYgKCEoaSA8IGlucHV0Lmxlbmd0aCkpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGtleTogJ3Jlc3RvcmUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlc3RvcmUob3JpZ0ZpbGVCYXNlNjQsIHJlc2l6ZWRGaWxlQmFzZTY0KSB7XG5cdFx0XHRcdGlmICghb3JpZ0ZpbGVCYXNlNjQubWF0Y2goJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJykpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzaXplZEZpbGVCYXNlNjQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHJhd0ltYWdlID0gdGhpcy5kZWNvZGU2NChvcmlnRmlsZUJhc2U2NC5yZXBsYWNlKCdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcsICcnKSk7XG5cdFx0XHRcdHZhciBzZWdtZW50cyA9IHRoaXMuc2xpY2UyU2VnbWVudHMocmF3SW1hZ2UpO1xuXHRcdFx0XHR2YXIgaW1hZ2UgPSB0aGlzLmV4aWZNYW5pcHVsYXRpb24ocmVzaXplZEZpbGVCYXNlNjQsIHNlZ21lbnRzKTtcblx0XHRcdFx0cmV0dXJuICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyB0aGlzLmVuY29kZTY0KGltYWdlKTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdleGlmTWFuaXB1bGF0aW9uJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBleGlmTWFuaXB1bGF0aW9uKHJlc2l6ZWRGaWxlQmFzZTY0LCBzZWdtZW50cykge1xuXHRcdFx0XHR2YXIgZXhpZkFycmF5ID0gdGhpcy5nZXRFeGlmQXJyYXkoc2VnbWVudHMpO1xuXHRcdFx0XHR2YXIgbmV3SW1hZ2VBcnJheSA9IHRoaXMuaW5zZXJ0RXhpZihyZXNpemVkRmlsZUJhc2U2NCwgZXhpZkFycmF5KTtcblx0XHRcdFx0dmFyIGFCdWZmZXIgPSBuZXcgVWludDhBcnJheShuZXdJbWFnZUFycmF5KTtcblx0XHRcdFx0cmV0dXJuIGFCdWZmZXI7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0a2V5OiAnZ2V0RXhpZkFycmF5Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRFeGlmQXJyYXkoc2VnbWVudHMpIHtcblx0XHRcdFx0dmFyIHNlZyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIHggPSAwO1xuXHRcdFx0XHR3aGlsZSAoeCA8IHNlZ21lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHNlZyA9IHNlZ21lbnRzW3hdO1xuXHRcdFx0XHRcdGlmICgoc2VnWzBdID09PSAyNTUpICYgKHNlZ1sxXSA9PT0gMjI1KSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlZztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0eCsrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH0sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRrZXk6ICdpbnNlcnRFeGlmJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbnNlcnRFeGlmKHJlc2l6ZWRGaWxlQmFzZTY0LCBleGlmQXJyYXkpIHtcblx0XHRcdFx0dmFyIGltYWdlRGF0YSA9IHJlc2l6ZWRGaWxlQmFzZTY0LnJlcGxhY2UoJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJywgJycpO1xuXHRcdFx0XHR2YXIgYnVmID0gdGhpcy5kZWNvZGU2NChpbWFnZURhdGEpO1xuXHRcdFx0XHR2YXIgc2VwYXJhdGVQb2ludCA9IGJ1Zi5pbmRleE9mKDI1NSwgMyk7XG5cdFx0XHRcdHZhciBtYWUgPSBidWYuc2xpY2UoMCwgc2VwYXJhdGVQb2ludCk7XG5cdFx0XHRcdHZhciBhdG8gPSBidWYuc2xpY2Uoc2VwYXJhdGVQb2ludCk7XG5cdFx0XHRcdHZhciBhcnJheSA9IG1hZTtcblx0XHRcdFx0YXJyYXkgPSBhcnJheS5jb25jYXQoZXhpZkFycmF5KTtcblx0XHRcdFx0YXJyYXkgPSBhcnJheS5jb25jYXQoYXRvKTtcblx0XHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGtleTogJ3NsaWNlMlNlZ21lbnRzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzbGljZTJTZWdtZW50cyhyYXdJbWFnZUFycmF5KSB7XG5cdFx0XHRcdHZhciBoZWFkID0gMDtcblx0XHRcdFx0dmFyIHNlZ21lbnRzID0gW107XG5cdFx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdFx0dmFyIGxlbmd0aDtcblx0XHRcdFx0XHRpZiAoKHJhd0ltYWdlQXJyYXlbaGVhZF0gPT09IDI1NSkgJiAocmF3SW1hZ2VBcnJheVtoZWFkICsgMV0gPT09IDIxOCkpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoKHJhd0ltYWdlQXJyYXlbaGVhZF0gPT09IDI1NSkgJiAocmF3SW1hZ2VBcnJheVtoZWFkICsgMV0gPT09IDIxNikpIHtcblx0XHRcdFx0XHRcdGhlYWQgKz0gMjtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGVuZ3RoID0gcmF3SW1hZ2VBcnJheVtoZWFkICsgMl0gKiAyNTYgKyByYXdJbWFnZUFycmF5W2hlYWQgKyAzXTtcblx0XHRcdFx0XHRcdHZhciBlbmRQb2ludCA9IGhlYWQgKyBsZW5ndGggKyAyO1xuXHRcdFx0XHRcdFx0dmFyIHNlZyA9IHJhd0ltYWdlQXJyYXkuc2xpY2UoaGVhZCwgZW5kUG9pbnQpO1xuXHRcdFx0XHRcdFx0c2VnbWVudHMucHVzaChzZWcpO1xuXHRcdFx0XHRcdFx0aGVhZCA9IGVuZFBvaW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoaGVhZCA+IHJhd0ltYWdlQXJyYXkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHNlZ21lbnRzO1xuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGtleTogJ2RlY29kZTY0Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkZWNvZGU2NChpbnB1dCkge1xuXHRcdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRcdHZhciBjaHIxID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR2YXIgY2hyMiA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIGNocjMgPSAnJztcblx0XHRcdFx0dmFyIGVuYzEgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHZhciBlbmMyID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR2YXIgZW5jMyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0dmFyIGVuYzQgPSAnJztcblx0XHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0XHR2YXIgYnVmID0gW107XG5cdFx0XHRcdC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgKywgLywgb3IgPVxuXHRcdFx0XHR2YXIgYmFzZTY0dGVzdCA9IC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZztcblx0XHRcdFx0aWYgKGJhc2U2NHRlc3QuZXhlYyhpbnB1dCkpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XHRcIlRoZXJlIHdlcmUgaW52YWxpZCBiYXNlNjQgY2hhcmFjdGVycyBpbiB0aGUgaW5wdXQgdGV4dC5cXG5WYWxpZCBiYXNlNjQgY2hhcmFjdGVycyBhcmUgQS1aLCBhLXosIDAtOSwgJysnLCAnLycsYW5kICc9J1xcbkV4cGVjdCBlcnJvcnMgaW4gZGVjb2RpbmcuXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csICcnKTtcblx0XHRcdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdFx0XHRlbmMxID0gdGhpcy5LRVlfU1RSLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuXHRcdFx0XHRcdGVuYzIgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG5cdFx0XHRcdFx0ZW5jMyA9IHRoaXMuS0VZX1NUUi5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcblx0XHRcdFx0XHRlbmM0ID0gdGhpcy5LRVlfU1RSLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuXHRcdFx0XHRcdGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xuXHRcdFx0XHRcdGNocjIgPSAoKGVuYzIgJiAxNSkgPDwgNCkgfCAoZW5jMyA+PiAyKTtcblx0XHRcdFx0XHRjaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0O1xuXHRcdFx0XHRcdGJ1Zi5wdXNoKGNocjEpO1xuXHRcdFx0XHRcdGlmIChlbmMzICE9PSA2NCkge1xuXHRcdFx0XHRcdFx0YnVmLnB1c2goY2hyMik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChlbmM0ICE9PSA2NCkge1xuXHRcdFx0XHRcdFx0YnVmLnB1c2goY2hyMyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNocjEgPSBjaHIyID0gY2hyMyA9ICcnO1xuXHRcdFx0XHRcdGVuYzEgPSBlbmMyID0gZW5jMyA9IGVuYzQgPSAnJztcblx0XHRcdFx0XHRpZiAoIShpIDwgaW5wdXQubGVuZ3RoKSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBidWY7XG5cdFx0XHR9LFxuXHRcdH0sXG5cdF0pO1xuXG5cdHJldHVybiBFeGlmUmVzdG9yZTtcbn0pKCk7XG5cbkV4aWZSZXN0b3JlLmluaXRDbGFzcygpO1xuXG4vKlxuICogY29udGVudGxvYWRlZC5qc1xuICpcbiAqIEF1dGhvcjogRGllZ28gUGVyaW5pIChkaWVnby5wZXJpbmkgYXQgZ21haWwuY29tKVxuICogU3VtbWFyeTogY3Jvc3MtYnJvd3NlciB3cmFwcGVyIGZvciBET01Db250ZW50TG9hZGVkXG4gKiBVcGRhdGVkOiAyMDEwMTAyMFxuICogTGljZW5zZTogTUlUXG4gKiBWZXJzaW9uOiAxLjJcbiAqXG4gKiBVUkw6XG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9cbiAqIGh0dHA6Ly9qYXZhc2NyaXB0Lm53Ym94LmNvbS9Db250ZW50TG9hZGVkL01JVC1MSUNFTlNFXG4gKi9cblxuLy8gQHdpbiB3aW5kb3cgcmVmZXJlbmNlXG4vLyBAZm4gZnVuY3Rpb24gcmVmZXJlbmNlXG52YXIgY29udGVudExvYWRlZCA9IGZ1bmN0aW9uIGNvbnRlbnRMb2FkZWQod2luLCBmbikge1xuXHR2YXIgZG9uZSA9IGZhbHNlO1xuXHR2YXIgdG9wID0gdHJ1ZTtcblx0dmFyIGRvYyA9IHdpbi5kb2N1bWVudDtcblx0dmFyIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXHR2YXIgYWRkID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnO1xuXHR2YXIgcmVtID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnO1xuXHR2YXIgcHJlID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyAnJyA6ICdvbic7XG5cdHZhciBpbml0ID0gZnVuY3Rpb24gaW5pdChlKSB7XG5cdFx0aWYgKGUudHlwZSA9PT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9PSAnY29tcGxldGUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdChlLnR5cGUgPT09ICdsb2FkJyA/IHdpbiA6IGRvYylbcmVtXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcblx0XHRpZiAoIWRvbmUgJiYgKGRvbmUgPSB0cnVlKSkge1xuXHRcdFx0cmV0dXJuIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBwb2xsID0gZnVuY3Rpb24gcG9sbCgpIHtcblx0XHR0cnkge1xuXHRcdFx0cm9vdC5kb1Njcm9sbCgnbGVmdCcpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHNldFRpbWVvdXQocG9sbCwgNTApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRyZXR1cm4gaW5pdCgncG9sbCcpO1xuXHR9O1xuXG5cdGlmIChkb2MucmVhZHlTdGF0ZSAhPT0gJ2NvbXBsZXRlJykge1xuXHRcdGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QgJiYgcm9vdC5kb1Njcm9sbCkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dG9wID0gIXdpbi5mcmFtZUVsZW1lbnQ7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge31cblx0XHRcdGlmICh0b3ApIHtcblx0XHRcdFx0cG9sbCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRkb2NbYWRkXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcblx0XHRkb2NbYWRkXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcblx0XHRyZXR1cm4gd2luW2FkZF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG5cdH1cbn07XG5cbi8vIEFzIGEgc2luZ2xlIGZ1bmN0aW9uIHRvIGJlIGFibGUgdG8gd3JpdGUgdGVzdHMuXG5Ecm9wem9uZS5fYXV0b0Rpc2NvdmVyRnVuY3Rpb24gPSBmdW5jdGlvbigpIHtcblx0aWYgKERyb3B6b25lLmF1dG9EaXNjb3Zlcikge1xuXHRcdHJldHVybiBEcm9wem9uZS5kaXNjb3ZlcigpO1xuXHR9XG59O1xuY29udGVudExvYWRlZCh3aW5kb3csIERyb3B6b25lLl9hdXRvRGlzY292ZXJGdW5jdGlvbik7XG5cbmZ1bmN0aW9uIF9fZ3VhcmRfXyh2YWx1ZSwgdHJhbnNmb3JtKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsID8gdHJhbnNmb3JtKHZhbHVlKSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIF9fZ3VhcmRNZXRob2RfXyhvYmosIG1ldGhvZE5hbWUsIHRyYW5zZm9ybSkge1xuXHRpZiAodHlwZW9mIG9iaiAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmpbbWV0aG9kTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gdHJhbnNmb3JtKG9iaiwgbWV0aG9kTmFtZSk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxufVxuXG5TYXBwaGlyZVdpZGdldHMuRHJvcHpvbmUgPSBEcm9wem9uZTtcbiIsIi8qIENvbXBvbmVudCBFeHBhbmRhYmxlTGluayAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRjb25zdCBjcmVhdGUgPSB3aWRnZXRJRCA9PiB7XHJcblx0XHRjb25zdCAkZWxlbWVudFdyYXBwZXIgPSAkKGAjJHt3aWRnZXRJRH1gKTtcclxuXHJcblx0XHRpZiAoJGVsZW1lbnRXcmFwcGVyLnBhcmVudCgnLkV4cGFuZGFibGVMaXN0JykuaGFzQ2xhc3MoJ0hpZGVXaGVuRW1wdHknKSkge1xyXG5cdFx0XHRjb25zdCB0ZXh0ID0gJGVsZW1lbnRXcmFwcGVyLmZpbmQoJy5FeHBhbmRhYmxlTGlua19fQ29udGVudCcpLnRleHQoKTtcclxuXHJcblx0XHRcdGlmICh0ZXh0Lmxlbmd0aCA9PT0gMCkgJGVsZW1lbnRXcmFwcGVyLnBhcmVudCgnLkV4cGFuZGFibGVMaXN0JykuaGlkZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJpbmRFdmVudHMod2lkZ2V0SUQpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IGJpbmRFdmVudHMgPSB3aWRnZXRJRCA9PiB7XHJcblx0XHQkKGAjJHt3aWRnZXRJRH0gLkV4cGFuZGFibGVMaW5rX19IZWFkZXJgKS5jbGljaygoKSA9PiBvcGVuQ2xvc2UoYCMke3dpZGdldElEfWApKTtcclxuXHR9O1xyXG5cclxuXHRjb25zdCBvcGVuQ2xvc2UgPSBlbGVtZW50SUQgPT4gJChlbGVtZW50SUQpLnRvZ2dsZUNsYXNzKCdFeHBhbmRhYmxlTGluay0tZXhwYW5kZWQnKTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLkV4cGFuZGFibGVMaW5rID0geyBjcmVhdGUgfTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBGdWxsU2NyZWVuVGFic1dyYXBwZXIgKi9cblNhcHBoaXJlV2lkZ2V0cy5GdWxsU2NyZWVuVGFic1dyYXBwZXIgPSAoKSA9PiB7XG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdCQoJy5UYWJXcmFwcGVyJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpXG5cdFx0XHRcdC5zaWJsaW5ncygpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnQWN0aXZlJyk7XG5cdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdBY3RpdmUnKTtcblx0XHR9KTtcblx0fSk7XG59O1xuIiwiLyogQ29tcG9uZW50IEdlbmVyaWNHYWxsZXJ5ICovXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdHZhciBhbGxHZW5lcmljR2FsbGVyaWVzID0gW107XG5cblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKGNvbmZpZykge1xuXHRcdGJpbmRHZW5lcmljR2FsbGVyeShjb25maWcpO1xuXHRcdGlmIChvc0FqYXhCYWNrZW5kKSB7XG5cdFx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRiaW5kR2VuZXJpY0dhbGxlcnkoY29uZmlnKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblx0XHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRiaW5kR2VuZXJpY0dhbGxlcnkoY29uZmlnKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0dmFyIGJpbmRHZW5lcmljR2FsbGVyeSA9IGZ1bmN0aW9uKGNvbmZpZykge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWxsR2VuZXJpY0dhbGxlcmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGFsbEdlbmVyaWNHYWxsZXJpZXNbaV0uY29uZmlnLndpZGdldElkID09PSBjb25maWcud2lkZ2V0SWQpIHtcblx0XHRcdFx0YWxsR2VuZXJpY0dhbGxlcmllcy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IEdlbmVyaWNHYWxsZXJ5KGNvbmZpZyk7XG5cdFx0YWxsR2VuZXJpY0dhbGxlcmllcy5wdXNoKHdpbmRvd1tjb25maWcud2lkZ2V0SWRdKTtcblx0fTtcblxuXHR2YXIgR2VuZXJpY0dhbGxlcnkgPSBmdW5jdGlvbihjb25maWcpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xuXHRcdHRoaXMuZ2VuZXJpY0dhbGxlcnlSZXNpemVUaW1lciA9IDA7XG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0dGhpcy5lcXVhbEhlaWdodCA9IHRoaXMuY29uZmlnLmVxdWFsSGVpZ2h0O1xuXHRcdGlmIChcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4nKS5sZW5ndGggPT09IDEgJiZcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4nKS5oYXNDbGFzcygnTGlzdFJlY29yZHMnKVxuXHRcdCkge1xuXHRcdFx0dGhpcy4kZ2FsbGVyeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCA+IHNwYW4uTGlzdFJlY29yZHMnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy4kZ2FsbGVyeSA9IHRoaXMuJHdpZGdldC5maW5kKCcuR2VuZXJpY0dhbGxlcnktY29udGVudCcpO1xuXHRcdH1cblx0XHR0aGlzLiRnYWxsZXJ5SXRlbXMgPSB0aGlzLiRnYWxsZXJ5LmNoaWxkcmVuKCk7XG5cdFx0dGhpcy4kZ2FsbGVyeUl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoISQodGhpcykuaGFzQ2xhc3MoJ0dlbmVyaWNHYWxsZXJ5LWl0ZW0nKSkge1xuXHRcdFx0XHQkKHRoaXMpLndyYXAoJzxkaXYgY2xhc3M9XCJHZW5lcmljR2FsbGVyeS1pdGVtXCI+PC9kaXY+Jyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0JChmdW5jdGlvbigpIHtcblx0XHRcdF90aGlzLmNhbGN1bGF0ZSgwKTtcblx0XHR9KTtcblx0fTtcblxuXHRHZW5lcmljR2FsbGVyeS5wcm90b3R5cGUuY2FsY3VsYXRlID0gZnVuY3Rpb24odGltZW91dCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0d2luZG93LmNsZWFyVGltZW91dCh0aGlzLmdlbmVyaWNHYWxsZXJ5UmVzaXplVGltZXIpO1xuXHRcdHRoaXMuZ2VuZXJpY0dhbGxlcnlSZXNpemVUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHdpZGdldFdpZHRoID0gX3RoaXMuJHdpZGdldC5vdXRlcldpZHRoKHRydWUpO1xuXHRcdFx0dmFyIHBlckxpbmU7XG5cdFx0XHRpZiAod2lkZ2V0V2lkdGggPj0gMTkwMCkge1xuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zRGVza3RvcEhEO1xuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSAxNjAwKSB7XG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNEZXNrdG9wQmlnO1xuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSAxMzY2KSB7XG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNEZXNrdG9wO1xuXHRcdFx0fSBlbHNlIGlmICh3aWRnZXRXaWR0aCA+PSAxMDI0KSB7XG5cdFx0XHRcdHBlckxpbmUgPSBfdGhpcy5jb25maWcuaXRlbXNEZXNrdG9wU21hbGw7XG5cdFx0XHR9IGVsc2UgaWYgKHdpZGdldFdpZHRoID49IDQyMCkge1xuXHRcdFx0XHRwZXJMaW5lID0gX3RoaXMuY29uZmlnLml0ZW1zVGFibGV0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGVyTGluZSA9IF90aGlzLmNvbmZpZy5pdGVtc1Bob25lO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaXRlbVdpZHRoID0gMTAwIC8gcGVyTGluZTtcblxuXHRcdFx0dmFyIG1hcmdpbkxlZnQgPSBfdGhpcy4kZ2FsbGVyeS5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbScpLmNzcygnbWFyZ2luLWxlZnQnKTtcblxuXHRcdFx0X3RoaXMuJGdhbGxlcnkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuXHRcdFx0XHRpZiAoJChlbCkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0tLXRyaXBsZScpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQkKGVsKS5jc3MoJ3dpZHRoJywgaXRlbVdpZHRoICogMyArICclJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJChlbCkuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0tLWRvdWJsZScpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQkKGVsKS5jc3MoJ3dpZHRoJywgJ2NhbGMoJyArIGl0ZW1XaWR0aCAqIDIgKyAnJSknKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkKGVsKS5jc3MoJ3dpZHRoJywgJ2NhbGMoJyArIGl0ZW1XaWR0aCArICclIC0gJyArIG1hcmdpbkxlZnQgKyAnKScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChfdGhpcy5jb25maWcuaXRlbXNCb3JkZXIgPT09ICdSaWdodCcpIHtcblx0XHRcdFx0XHRpZiAoKGluZGV4ICsgMSkgJSBwZXJMaW5lID09PSAwKSB7XG5cdFx0XHRcdFx0XHQkKGVsKS5jc3MoeyBib3JkZXJSaWdodDogMCB9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JChlbCkuY3NzKHsgYm9yZGVyUmlnaHQ6ICcnIH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQkKGVsKS5jc3MoJ29wYWNpdHknLCAxKTtcblx0XHRcdFx0JChlbClcblx0XHRcdFx0XHQuZmluZCgnPiBzcGFuJylcblx0XHRcdFx0XHQuY3NzKCdvcGFjaXR5JywgMSk7XG5cdFx0XHRcdCQoZWwpLmFkZENsYXNzKF90aGlzLmNvbmZpZy5pdGVtc0JnQ29sb3IpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChfdGhpcy5jb25maWcuaXRlbXNCb3JkZXIgPT09ICdSaWdodCcpIHtcblx0XHRcdFx0X3RoaXMuJGdhbGxlcnlcblx0XHRcdFx0XHQuZmluZCgnLkdlbmVyaWNHYWxsZXJ5LWl0ZW0nKVxuXHRcdFx0XHRcdC5sYXN0KClcblx0XHRcdFx0XHQuY3NzKHsgYm9yZGVyUmlnaHQ6IDAgfSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChfdGhpcy5jb25maWcuZXF1YWxIZWlnaHQpIHtcblx0XHRcdFx0X3RoaXMuc2FtZUhlaWdodCgpO1xuXHRcdFx0fVxuXHRcdH0sIHRpbWVvdXQpO1xuXHR9O1xuXG5cdEdlbmVyaWNHYWxsZXJ5LnByb3RvdHlwZS5zYW1lSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy4kZ2FsbGVyeS5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbScpLmNzcygnbWluLWhlaWdodCcsICdhdXRvJyk7XG5cdFx0dmFyIG1heEhlaWdodCA9IE1hdGgubWF4LmFwcGx5KFxuXHRcdFx0bnVsbCxcblx0XHRcdHRoaXMuJGdhbGxlcnlcblx0XHRcdFx0LmZpbmQoJy5HZW5lcmljR2FsbGVyeS1pdGVtJylcblx0XHRcdFx0Lm1hcChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gJCh0aGlzKS5vdXRlckhlaWdodChmYWxzZSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5nZXQoKVxuXHRcdCk7XG5cdFx0dGhpcy4kZ2FsbGVyeS5maW5kKCcuR2VuZXJpY0dhbGxlcnktaXRlbScpLmNzcygnbWluLWhlaWdodCcsIG1heEhlaWdodCk7XG5cdH07XG5cblx0U2FwcGhpcmVXaWRnZXRzLkdlbmVyaWNHYWxsZXJ5ID0ge1xuXHRcdGNyZWF0ZTogY3JlYXRlLFxuXHRcdGFsbDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYWxsR2VuZXJpY0dhbGxlcmllcztcblx0XHR9LFxuXHR9O1xufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xuXG4kKHdpbmRvdylcblx0Lm9mZigncmVzaXplLkdlbmVyaWNHYWxsZXJ5Jylcblx0Lm9uKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgYWxsR2VuZXJpY0dhbGxlcmllcyA9IFNhcHBoaXJlV2lkZ2V0cy5HZW5lcmljR2FsbGVyeS5hbGwoKTtcblx0XHRhbGxHZW5lcmljR2FsbGVyaWVzLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudC5jYWxjdWxhdGUoMjAwKTtcblx0XHR9KTtcblx0fSk7XG4iLCIvKiBDb21wb25lbnQgSG9yaXpvbnRhbFRvb2xiYXIgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiBpbml0KCkpO1xyXG5cdFx0JCh3aW5kb3cpLmxvYWQoKCkgPT4ge1xyXG5cdFx0XHQkKCcuTWVudUl0ZW1XcmFwcGVyLkFjdGl2ZScpWzBdLnNjcm9sbEludG9WaWV3KHtcclxuXHRcdFx0XHRiZWhhdmlvcjogJ2F1dG8nLFxyXG5cdFx0XHRcdGJsb2NrOiAnZW5kJ1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgaW5pdCA9ICgpID0+IHtcclxuXHJcblx0XHRoYW5kbGVBcnJvd3MoKTtcclxuXHJcblx0XHQkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGwoKCkgPT4ge1xyXG5cdFx0XHRoYW5kbGVBcnJvd3MoKVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudFNjcm9sbCA9ICQoJy5Ub29sYmFyX19JdGVtcycpLnNjcm9sbExlZnQoKTtcclxuXHRcdFx0dmFyIG1heFNjcm9sbGwgPSAkKCcuVG9vbGJhcl9fSXRlbXMgLkxpc3RSZWNvcmRzJykud2lkdGgoKSAtICQoJy5Ub29sYmFyX19JdGVtcycpLndpZHRoKCk7XHJcblx0XHRcdHZhciBzaWRlV2lkdGggPSBtYXhTY3JvbGxsIC0gNTA7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19JdGVtcycpLnNjcm9sbExlZnQoY3VycmVudFNjcm9sbCArIDUwKTtcclxuXHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgPT0gc2lkZVdpZHRoKSB7XHJcblx0XHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykuYWRkQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGN1cnJlbnRTY3JvbGwgIT0gNTApIHtcclxuXHRcdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRTY3JvbGwgPSAkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KCk7XHJcblx0XHRcdHZhciBtYXhTY3JvbGxsID0gJCgnLlRvb2xiYXJfX0l0ZW1zIC5MaXN0UmVjb3JkcycpLndpZHRoKCkgLSAkKCcuVG9vbGJhcl9fSXRlbXMnKS53aWR0aCgpO1xyXG5cdFx0XHR2YXIgc2lkZVdpZHRoID0gbWF4U2Nyb2xsbCAtIDUwO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fSXRlbXMnKS5zY3JvbGxMZWZ0KGN1cnJlbnRTY3JvbGwgLSA1MCk7XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsICE9IHNpZGVXaWR0aCkge1xyXG5cdFx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLnJlbW92ZUNsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChjdXJyZW50U2Nyb2xsID09IDUwKSB7XHJcblx0XHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5hZGRDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCh3aW5kb3cpLm9uKCdyZXNpemUudG9vbGJhcicsICgpID0+IHtcclxuXHRcdFx0aGFuZGxlQXJyb3dzKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblxyXG5cdGhhbmRsZUFycm93cyA9ICgpID0+IHtcclxuXHRcdGxldCBjdXJyZW50U2Nyb2xsID0gJCgnLlRvb2xiYXJfX0l0ZW1zJykuc2Nyb2xsTGVmdCgpO1xyXG5cdFx0bGV0IG1lbnVXaWR0aCA9ICQoJy5Ub29sYmFyX19JdGVtcyAuTGlzdFJlY29yZHMnKS53aWR0aCgpO1xyXG5cdFx0bGV0IGV4dGVybmFsV2lkdGggPSAkKCcuVG9vbGJhcl9fSXRlbXMnKS53aWR0aCgpO1xyXG5cdFx0dmFyIG1heFNjcm9sbGwgPSBtZW51V2lkdGggLSBleHRlcm5hbFdpZHRoO1xyXG5cclxuXHRcdGlmIChleHRlcm5hbFdpZHRoID4gbWVudVdpZHRoKSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykuaGlkZSgpO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5oaWRlKCk7XHJcblx0XHRcdCQoJy5Ub29sYmFyX2NvbnRhaW5lcicpLmFkZENsYXNzKCdUb29sYmFyX2NvbnRhaW5lci0tbm9hcnJvd3MnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19sZWZ0QnRuJykuc2hvdygpO1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fcmlnaHRCdG4nKS5zaG93KCk7XHJcblx0XHRcdCQoJy5Ub29sYmFyX2NvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdUb29sYmFyX2NvbnRhaW5lci0tbm9hcnJvd3MnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY3VycmVudFNjcm9sbCA9PT0gMCkge1xyXG5cdFx0XHQkKCcuVG9vbGJhcl9fbGVmdEJ0bicpLmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX2xlZnRCdG4nKS5yZW1vdmVDbGFzcygnRGlzYWJsZWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY3VycmVudFNjcm9sbCA+PSBtYXhTY3JvbGxsKSB7XHJcblx0XHRcdCQoJy5Ub29sYmFyX19yaWdodEJ0bicpLmFkZENsYXNzKCdEaXNhYmxlZCcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0JCgnLlRvb2xiYXJfX3JpZ2h0QnRuJykucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5Ib3Jpem9udGFsVG9vbGJhciA9IHtcclxuXHRcdGNyZWF0ZVxyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTsiLCIvKiBDb21wb25lbnQgSG91clBpY2tlciAqL1xuKGZ1bmN0aW9uKCQsIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdGNsYXNzIEhvdXJQaWNrZXIge1xuXHRcdGNvbnN0cnVjdG9yKGNvbmZpZykge1xuXHRcdFx0Ly8gT3B0aW9ucyB1c2VkIGJ5IGpRdWVyeSBUaW1lcnBpY2tlciAoRXh0ZXJuYWwgTGliKVxuXHRcdFx0dGhpcy5vcHRpb25zID0ge1xuXHRcdFx0XHQuLi5jb25maWcsXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLm9uQ29tcG9uZW50SW5pdCgpO1xuXHRcdH1cblxuXHRcdGlzQ29tcG9uZW50VmFsaWQoKSB7XG5cdFx0XHRsZXQgdmFsaWQgPSB0cnVlO1xuXHRcdFx0bGV0IG1lc3NhZ2UgPSBgQ29tcG9uZW50IEhvdXJQaWNrZXIgKCR7dGhpcy5vcHRpb25zLndpZGdldElkfSk6YDtcblxuXHRcdFx0aWYgKCF0aGlzLiRpbnB1dC5sZW5ndGggfHwgdGhpcy4kaW5wdXQubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRtZXNzYWdlID0gYCR7bWVzc2FnZX0gbmVlZHMgb25lIC0gYW5kIGp1c3Qgb25lIC0gSU5QVVQgZWxlbWVudCFgO1xuXHRcdFx0XHR2YWxpZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXZhbGlkKSBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuXG5cdFx0XHRyZXR1cm4gdmFsaWQ7XG5cdFx0fVxuXG5cdFx0c2V0Q29tcG9uZW50UG9zaXRpb24oKSB7XG5cdFx0XHRjb25zdCAkd2lkZ2V0ID0gJCgnLnVpLXRpbWVwaWNrZXItY29udGFpbmVyJyk7XG5cdFx0XHRjb25zdCBsYWJlbExlZnQgPSB0aGlzLiRsYWJlbC5vZmZzZXQoKS5sZWZ0O1xuXHRcdFx0Y29uc3QgbGFiZWxXaWR0aCA9IHRoaXMuJGxhYmVsLndpZHRoKCk7XG5cdFx0XHRjb25zdCBsYWJlbE91dGVyV2lkdGggPSB0aGlzLiRsYWJlbC5vdXRlcldpZHRoKCk7XG5cdFx0XHRjb25zdCB3aWRnZXRPdXRlcldpZHRoID0gJHdpZGdldC5vdXRlcldpZHRoKCk7XG5cdFx0XHRjb25zdCB3aWRnZXRNaW5XaWR0aCA9ICskd2lkZ2V0LmNzcygnbWluLXdpZHRoJykucmVwbGFjZSgncHgnLCAnJyk7XG5cdFx0XHRjb25zdCBpc091dHNpZGVXaW5kb3cgPVxuXHRcdFx0XHRsYWJlbExlZnQgKyBsYWJlbE91dGVyV2lkdGggPiAkKHdpbmRvdykuc2Nyb2xsTGVmdCgpICsgJCh3aW5kb3cpLndpZHRoKCkgLSB3aWRnZXRPdXRlcldpZHRoO1xuXG5cdFx0XHQkd2lkZ2V0LmNzcyh7XG5cdFx0XHRcdGxlZnQ6ICgpID0+IHtcblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBsYWJlbExlZnQgLSAod2lkZ2V0TWluV2lkdGggLSBsYWJlbFdpZHRoKSAvIDI7XG5cblx0XHRcdFx0XHRpZiAoaXNPdXRzaWRlV2luZG93KSB2YWx1ZSA9IGxhYmVsTGVmdCArIGxhYmVsV2lkdGggLSB3aWRnZXRPdXRlcldpZHRoO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSBsYWJlbExlZnQ7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH0sXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzZXRFbGVtZW50Q2xhc3Moc2VsZWN0b3IsIGNsYXNzTmFtZSkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZSA/ICQoc2VsZWN0b3IpLmFkZENsYXNzKGNsYXNzTmFtZSkgOiBmYWxzZTtcblx0XHR9XG5cblx0XHRkZWZpbmVUaW1lRm9ybWF0KCkge1xuXHRcdFx0bGV0IGZvcm1hdCA9IFtdO1xuXHRcdFx0bGV0IGFtUG0gPSAnJztcblxuXHRcdFx0Zm9ybWF0LnB1c2godGhpcy5vcHRpb25zLmlzMjRoRm9ybWF0ID8gJ0hIJyA6ICdoaCcpO1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5zaG93TWludXRlcykgZm9ybWF0LnB1c2goJ21tJyk7XG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnNob3dTZWNvbmRzKSBmb3JtYXQucHVzaCgnc3MnKTtcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLmlzMjRoRm9ybWF0KSBhbVBtID0gJyBwJztcblxuXHRcdFx0cmV0dXJuIGAke2Zvcm1hdC5qb2luKCc6Jyl9JHthbVBtfWA7XG5cdFx0fVxuXG5cdFx0Y29udmVydFRpbWUxMnRvMjQodmFsdWUpIHtcblx0XHRcdGNvbnN0IFt0aW1lLCBtb2RpZmllcl0gPSB2YWx1ZS5zcGxpdCgnICcpO1xuXHRcdFx0bGV0IFtob3VycywgbWludXRlcyA9ICcwMCcsIHNlY29uZHMgPSAnMDAnXSA9IHRpbWUuc3BsaXQoJzonKTtcblxuXHRcdFx0aWYgKGhvdXJzID09PSAnMTInKSBob3VycyA9ICcwMCc7XG5cdFx0XHRpZiAobW9kaWZpZXIgPT09ICdQTScpIGhvdXJzID0gcGFyc2VJbnQoaG91cnMsIDEwKSArIDEyO1xuXG5cdFx0XHRyZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWA7XG5cdFx0fVxuXG5cdFx0Y29udmVydFRpbWVGb3JtYXRUb01hc2sodmFsdWUgPSAnJykge1xuXHRcdFx0cmV0dXJuIHZhbHVlLnJlcGxhY2UoL1thLXpBLVpdKy9nLCAnLS0nKTtcblx0XHR9XG5cblx0XHRvbkNoYW5nZUV2ZW50KHZhbHVlID0gJycpIHtcblx0XHRcdGxldCBtb2RlbCA9ICcwMS0wMS0xOTAwIDAwOjAwOjAwJzsgLy9pLmUuIG51bGxcblx0XHRcdGxldCBsYWJlbCA9IHRoaXMuY29udmVydFRpbWVGb3JtYXRUb01hc2sodGhpcy5vcHRpb25zLnRpbWVGb3JtYXQpO1xuXG5cdFx0XHRpZiAodmFsdWUgJiYgISF2YWx1ZS50cmltKCkpIHtcblx0XHRcdFx0bW9kZWwgPSB0aGlzLm9wdGlvbnMuaXMyNGhGb3JtYXQgPyB2YWx1ZSA6IHRoaXMuY29udmVydFRpbWUxMnRvMjQodmFsdWUpO1xuXHRcdFx0XHRsYWJlbCA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzTm90aWZ5RW5hYmxlZCkgT3NOb3RpZnlXaWRnZXQodGhpcy5vcHRpb25zLmhvdXJQaWNrZXJGYWtlTm90aWZ5SWQsIG1vZGVsKTtcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuaXNUZXh0VHJpZ2dlcmFibGUpIHRoaXMuJGxhYmVsLnRleHQobGFiZWwpO1xuXG5cdFx0XHR0aGlzLiRtb2RlbC52YWwobW9kZWwpO1xuXHRcdFx0dGhpcy4kbW9kZWwuY2hhbmdlKCk7XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRvbkNvbXBvbmVudEluaXQoKSB7XG5cdFx0XHR0aGlzLiRjb21wb25lbnQgPSAkKGAjJHt0aGlzLm9wdGlvbnMud2lkZ2V0SWR9YCk7XG5cdFx0XHR0aGlzLiRtb2RlbCA9IHRoaXMuJGNvbXBvbmVudC5maW5kKCcuSG91clBpY2tlcl9fUGxhY2Vob2xkZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcblx0XHRcdHRoaXMuJGlucHV0ID0gdGhpcy4kY29tcG9uZW50LmZpbmQoJy5Ib3VyUGlja2VyX19EaXNwbGF5ZWQgLkhvdXJQaWNrZXJfX0lucHV0VmFsdWUnKTtcblx0XHRcdHRoaXMuJGVsZW1lbnQgPSB0aGlzLiRpbnB1dDtcblxuXHRcdFx0dGhpcy5vcHRpb25zLnRpbWVGb3JtYXQgPSB0aGlzLmRlZmluZVRpbWVGb3JtYXQoKTtcblxuXHRcdFx0aWYgKCF0aGlzLmlzQ29tcG9uZW50VmFsaWQoKSkgcmV0dXJuO1xuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGNvbnN0ICRjb250YWluZXIgPSB0aGlzLiRjb21wb25lbnQuZmluZCgnZGl2LkhvdXJQaWNrZXInKTtcblxuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzVGV4dFRyaWdnZXJhYmxlKSB7XG5cdFx0XHRcdFx0JGNvbnRhaW5lci5hZGRDbGFzcygnSG91clBpY2tlci0tdGV4dFRyaWdnZXInKTtcblxuXHRcdFx0XHRcdHRoaXMuJGxhYmVsID0gJGNvbnRhaW5lci5maW5kKCcuSG91clBpY2tlcl9fRGlzcGxheWVkIC5Ib3VyUGlja2VyX19MYWJlbFZhbHVlJyk7XG5cdFx0XHRcdFx0dGhpcy4kZWxlbWVudCA9IHRoaXMuJGxhYmVsO1xuXG5cdFx0XHRcdFx0dGhpcy4kbGFiZWwudGV4dCh0aGlzLmNvbnZlcnRUaW1lRm9ybWF0VG9NYXNrKHRoaXMub3B0aW9ucy50aW1lRm9ybWF0KSk7XG5cblx0XHRcdFx0XHR0aGlzLiRsYWJlbC5vbignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLiRsYWJlbC50aW1lcGlja2VyKCkub3BlbigpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLnNldENvbXBvbmVudFBvc2l0aW9uKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmlzQ2xlYXJhYmxlKSB7XG5cdFx0XHRcdFx0dGhpcy4kYnV0dG9uQ2xlYXIgPSAkY29udGFpbmVyLmZpbmQoJy5Ib3VyUGlja2VyX19EaXNwbGF5ZWQgLkhvdXJQaWNrZXJfX0J1dHRvbkNsZWFyJyk7XG5cblx0XHRcdFx0XHR0aGlzLiRidXR0b25DbGVhci5vbignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLiRpbnB1dC52YWwoJycpO1xuXHRcdFx0XHRcdFx0dGhpcy5vbkNoYW5nZUV2ZW50KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLiRlbGVtZW50LnRpbWVwaWNrZXIoe1xuXHRcdFx0XHRcdC4uLnRoaXMub3B0aW9ucyxcblx0XHRcdFx0XHRjaGFuZ2U6IHRpbWUgPT4gdGhpcy5vbkNoYW5nZUV2ZW50KHRpbWUgPyAkKCkudGltZXBpY2tlci5mb3JtYXRUaW1lKHRoaXMub3B0aW9ucy50aW1lRm9ybWF0LCB0aW1lKSA6IG51bGwpLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLnNldEVsZW1lbnRDbGFzcygnLnVpLXRpbWVwaWNrZXItY29udGFpbmVyJywgdGhpcy5vcHRpb25zLmN1cnJlbnRMb2NhbGUgPT09ICdBUicgPyAncnRsJyA6ICdsdHInKTtcblxuXHRcdFx0XHR0aGlzLiRpbnB1dC5wcm9wKCdyZWFkb25seScsICF0aGlzLm9wdGlvbnMuaXNUeXBlRW5hYmxlZCk7XG5cdFx0XHRcdHRoaXMuJGlucHV0LnByb3AoJ3BsYWNlaG9sZGVyJywgdGhpcy5vcHRpb25zLnRpbWVGb3JtYXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGNyZWF0ZSA9IGNvbmZpZyA9PiAod2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgSG91clBpY2tlcihjb25maWcpKTtcblxuXHRTYXBwaGlyZVdpZGdldHMuSG91clBpY2tlciA9IHtcblx0XHRjcmVhdGUsXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgU2FwcGhpcmVXaWRnZXRzKTtcbiIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gIGNsYXNzIElucHV0V2l0aENsZWFyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcclxuICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICAgIHRoaXMuJHdpZGdldCA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcclxuICAgICAgdGhpcy4kaW5wdXQgPSB0aGlzLiR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZV0nKTtcclxuICAgICAgdGhpcy4kY2xlYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLWNsZWFyJyk7XHJcbiAgICAgIHRoaXMuJG5vdGlmeUxpbmsgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklucHV0V2l0aENsZWFyLW5vdGlmeS1saW5rJyk7XHJcbiAgICAgIHRoaXMuJHdpZGdldFNoaWVsZCA9IHRoaXMuJHdpZGdldC5maW5kKCcuSW5wdXRXaXRoQ2xlYXItLXNoaWVsZCcpO1xyXG4gICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCgpIHtcclxuICAgICAgdGhpcy4kaW5wdXQub24oJ2ZvY3VzJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuJGNsZWFyLnNob3coKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJGlucHV0Lm9uKCdibHVyJywgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycpIHtcclxuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQoJy5kYXRlcmFuZ2VwaWNrZXI6dmlzaWJsZScpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRjbGVhci5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuJG5vdGlmeUxpbmsudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJGNsZWFyLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLiRpbnB1dC52YWwoJycpO1xyXG4gICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuICAgICAgICB0aGlzLiRub3RpZnlMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5jb25maWcuaGFzU2hpZWxkKSB7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kd2lkZ2V0U2hpZWxkLmhpZGUoKTtcclxuICAgICAgICB9LCB0aGlzLmNvbmZpZy5zaGllbGRUaW1lb3V0KTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2hpZWxkVGltZW91dCA+IDApIHtcclxuICAgICAgICAgIHRoaXMuJHdpZGdldFNoaWVsZC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNsZWFyLmhpZGUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgY3JlYXRlID0gY29uZmlnID0+ICh3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBJbnB1dFdpdGhDbGVhcihjb25maWcpKTtcclxuXHJcbiAgU2FwcGhpcmVXaWRnZXRzLklucHV0V2l0aENsZWFyID0ge1xyXG4gICAgY3JlYXRlXHJcbiAgfTtcclxuXHJcbn0pKCk7IiwiLyogQ29tcG9uZW50IExpbmVEZXRhaWxzRXhwYW5kQm94ICovXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcblx0Y29uc3Qgc2hvd0hpZGUgPSB3aWRnZXRJZCA9PiAkKHdpZGdldElkKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cblx0Y29uc3QgaW5pdCA9IGNvbmZpZyA9PiB7XG5cdFx0JCgnLkxpbmVEZXRhaWxzRXhwYW5kQm94IC5FeHBhbmRhYmxlTGlua1dyYXBwZXJfSGVhZGVyJykub2ZmKCdjbGljaycpO1xuXG5cdFx0JCgnLkxpbmVEZXRhaWxzRXhwYW5kQm94X2hlYWRlcicpXG5cdFx0XHQub2ZmKCdjbGljaycpXG5cdFx0XHQub24oJ2NsaWNrJywgKCkgPT4gc2hvd0hpZGUoYCMke2NvbmZpZy53aWRnZXRJZH1gKSk7XG5cdH07XG5cblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+ICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IGluaXQoY29uZmlnKSk7XG5cblx0U2FwcGhpcmVXaWRnZXRzLkxpbmVEZXRhaWxzRXhwYW5kQm94ID0geyBjcmVhdGUgfTtcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xuIiwiLyogQ29tcG9uZW50IExvY2F0aW9uQm94ICovXG5TYXBwaGlyZVdpZGdldHMuTG9jYXRpb25Cb3ggPSBmdW5jdGlvbihjbGlja2VkRWxlbWVudElkKSB7XG5cdGlmICgkKCcjJyArIGNsaWNrZWRFbGVtZW50SWQgKyAnJykuaGFzQ2xhc3MoJ09uJykpIHtcblx0XHQkKCcuRGlzYWJsZVJvb20nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0JCh0aGlzKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ09mZicpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnT24nKTtcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxuXHRcdFx0XHQuY3NzKHtcblx0XHRcdFx0XHRvcGFjaXR5OiAnMScsXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHQkKCcjJyArIGNsaWNrZWRFbGVtZW50SWQgKyAnJylcblx0XHRcdC5hZGRDbGFzcygnT24nKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdPZmYnKVxuXHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxuXHRcdFx0LmNzcyh7XG5cdFx0XHRcdG9wYWNpdHk6ICcxJyxcblx0XHRcdH0pXG5cdFx0XHQuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XG5cblx0XHQkKCcuRGlzYWJsZVJvb206bm90KCMnICsgY2xpY2tlZEVsZW1lbnRJZCArICcpJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ09mZicpO1xuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnT24nKTtcblx0XHR9KTtcblxuXHRcdCQoJy5EaXNhYmxlUm9vbS5PZmYnKVxuXHRcdFx0LnBhcmVudCgnLlJvb21Cb3gnKVxuXHRcdFx0LmNzcyh7XG5cdFx0XHRcdG9wYWNpdHk6ICcwLjI1Jyxcblx0XHRcdH0pXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ1NlbGVjdGVkJyk7XG5cdH1cbn07XG4iLCIvKiBDb21wb25lbnQgTWFpbkludGVyYWN0aXZlQ2FyZCAqL1xuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcblx0dmFyIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzID0gW107XG5cdHZhciBkZWZhdWx0RHVyYXRpb24gPSAzMDA7XG5cblx0dmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoYWxsTWFpbkludGVyYWN0aXZlQ2FyZHNbaV0uY29uZmlnLndpZGdldElkID09PSBjb25maWcud2lkZ2V0SWQpIHtcblx0XHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBNYWluSW50ZXJhY3RpdmVDYXJkKGNvbmZpZyk7XG5cdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMucHVzaCh3aW5kb3dbY29uZmlnLndpZGdldElkXSk7XG5cblx0XHRpZiAoISEhU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCAmJiAhIW9zQWpheEJhY2tlbmQpIHtcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMgPSBTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hbGwoKTtcblx0XHRcdFx0YWxsTWFpbkludGVyYWN0aXZlQ2FyZHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdGVsZW1lbnQuaGFuZGxlSGVhZGVyV2l0aEFic29sdXRlQnV0dG9ucygpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCA9IHRydWU7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBNYWluSW50ZXJhY3RpdmVDYXJkID0gZnVuY3Rpb24gKGNvbmZpZykge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cdFx0dGhpcy5pc0xvY2tlZE9uQ2xvc2UgPSBmYWxzZTtcblx0XHR0aGlzLmlzT3BlbiA9IGNvbmZpZy5pc09wZW47XG5cdFx0dGhpcy5pc0VuYWJsZWQgPSBjb25maWcuaXNFbmFibGVkO1xuXHRcdHRoaXMuaXNTZWxlY3RhYmxlID0gY29uZmlnLmlzU2VsZWN0YWJsZTtcblx0XHR0aGlzLmFsbG93T3BlbmluZyA9IGNvbmZpZy5hbGxvd09wZW5pbmc7XG5cdFx0dGhpcy5ncmFkaWVudFdoZW5PcGVuID0gY29uZmlnLmdyYWRpZW50V2hlbk9wZW47XG5cdFx0dGhpcy5hbGxvd011bHRpcGxlT3BlbiA9IGNvbmZpZy5hbGxvd011bHRpcGxlT3Blbjtcblx0XHR0aGlzLmVtaXROb3RpZnlPbk9wZW4gPSBjb25maWcuZW1pdE5vdGlmeU9uT3Blbjtcblx0XHR0aGlzLmhpZGVBY3Rpb25zT25PcGVuID0gY29uZmlnLmhpZGVBY3Rpb25zT25PcGVuO1xuXHRcdHRoaXMuaGlkZUNhcHRpb25Pbk9wZW4gPSBjb25maWcuaGlkZUNhcHRpb25Pbk9wZW47XG5cdFx0dGhpcy5oaWRlVGl0bGVPbk9wZW4gPSBjb25maWcuaGlkZVRpdGxlT25PcGVuO1xuXHRcdHRoaXMuaGlkZVN1YlRpdGxlT25PcGVuID0gY29uZmlnLmhpZGVTdWJUaXRsZU9uT3Blbjtcblx0XHR0aGlzLmhlYWRlckhlaWdodFdoZW5PcGVuID0gY29uZmlnLmhlYWRlckhlaWdodFdoZW5PcGVuO1xuXHRcdHRoaXMuTWFpbkludGVyYWN0aXZlQ2FyZEZha2VOb3RpZnlJZCA9IGNvbmZpZy5tYWluSW50ZXJhY3RpdmVDYXJkRmFrZU5vdGlmeUlkO1xuXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xuXHRcdHRoaXMuJHdpZGdldC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblx0XHR0aGlzLiRjYXJkID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQnKTtcblx0XHR0aGlzLiRoZWFkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlcicpO1xuXHRcdHRoaXMuJGhlYWRlclRleHQgPSB0aGlzLiRoZWFkZXIuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXRleHQnKTtcblx0XHR0aGlzLiRib2R5ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiBkaXYgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1ib2R5Jyk7XG5cdFx0dGhpcy4kYWN0aW9ucyA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1hY3Rpb25zJyk7XG5cdFx0dGhpcy4kY2FwdGlvbiA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0LWNhcHRpb24nKTtcblx0XHR0aGlzLiR0aXRsZSA9IHRoaXMuJHdpZGdldC5maW5kKCc+IC5NYWluSW50ZXJhY3RpdmVDYXJkID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyIC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10ZXh0LXRpdGxlJyk7XG5cdFx0dGhpcy4kc3ViVGl0bGUgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXItdGV4dC1zdWJ0aXRsZScpO1xuXHRcdHRoaXMuJHNlbGVjdFRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlciA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci1zZWxlY3RhYmxlID4gLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXNlbGVjdGFibGUtdHJpZ2dlcicpO1xuXHRcdHRoaXMuJHNlbGVjdFBsYWNlaG9sZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJz4gLk1haW5JbnRlcmFjdGl2ZUNhcmQgPiAuTWFpbkludGVyYWN0aXZlQ2FyZC1oZWFkZXIgLk1haW5JbnRlcmFjdGl2ZUNhcmQtaGVhZGVyLXNlbGVjdGFibGUtcGxhY2Vob2xkZXInKTtcblx0XHR0aGlzLiR0cmlnZ2VyUGxhY2Vob2xkZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnPiAuTWFpbkludGVyYWN0aXZlQ2FyZCA+IC5NYWluSW50ZXJhY3RpdmVDYXJkLWhlYWRlci10cmlnZ2VyQWN0aW9uLXBsYWNlaG9sZGVyJyk7XG5cblx0XHRpZiAodGhpcy4kdHJpZ2dlclBsYWNlaG9sZGVyLmZpbmQoJ2EnKS5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXMuJHRyaWdnZXIgPSB0aGlzLiR0cmlnZ2VyUGxhY2Vob2xkZXIuZmluZCgnYScpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmlzT3Blbikge1xuXHRcdFx0dGhpcy5vcGVuKGZhbHNlLCAtMSk7XG5cdFx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKCdmb3JjZU9wZW4nKTtcblx0XHR9XG5cblx0XHR0aGlzLiRjYXJkLmFkZENsYXNzKHRoaXMuaGVhZGVySGVpZ2h0V2hlbk9wZW4gKyAnSGVhZGVyJyk7XG5cblx0XHRpZiAodGhpcy5hbGxvd09wZW5pbmcpIHtcblx0XHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2FsbG93T3BlbmluZycpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmdyYWRpZW50V2hlbk9wZW4pIHtcblx0XHRcdHRoaXMuJGNhcmQuYWRkQ2xhc3MoJ2dyYWRpZW50V2hlbk9wZW4nKTtcblx0XHR9XG5cblx0XHR0aGlzLmF0dGFjaEV2ZW50cygpO1xuXG5cdFx0dmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuXHRcdFx0bXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uLCBpbmRleCkge1xuXHRcdFx0XHRfdGhpcy5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uZmlnLndpZGdldElkKSwge1xuXHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxuXHRcdFx0c3VidHJlZTogdHJ1ZSxcblx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxuXHRcdH0pO1xuXHR9O1xuXG5cdE1haW5JbnRlcmFjdGl2ZUNhcmQucHJvdG90eXBlLmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHRpZiAoISF0aGlzLiRib2R5LmZpbmQoJz4gZGl2IC5NYWluSW50ZXJhY3RpdmVDYXJkLWFic29sdXRlLWFjdGlvbnMnKS5sZW5ndGggJiYgdGhpcy5pc09wZW4pIHtcblx0XHRcdHZhciBhYnNvbHV0ZUFjdGlvbnNXaWR0aCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIHRoaXMuJGJvZHkuZmluZCgnPiBkaXYgLk1haW5JbnRlcmFjdGl2ZUNhcmQtYWJzb2x1dGUtYWN0aW9ucycpLm1hcChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgodHJ1ZSk7XG5cdFx0XHR9KS5nZXQoKSk7XG5cdFx0XHR2YXIgaGVhZGVyTWF4V2lkdGggPSB0aGlzLiRoZWFkZXIud2lkdGgoKSAtIGFic29sdXRlQWN0aW9uc1dpZHRoO1xuXHRcdFx0aWYgKGhlYWRlck1heFdpZHRoID4gMTApIHtcblx0XHRcdFx0dGhpcy4kaGVhZGVyVGV4dC5jc3Moe1xuXHRcdFx0XHRcdG1heFdpZHRoOiBoZWFkZXJNYXhXaWR0aCArICdweCdcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLiRib2R5LmZpbmQoJz4gZGl2IC5NYWluSW50ZXJhY3RpdmVDYXJkLWFic29sdXRlLWFjdGlvbnMgLk1haW5JbnRlcmFjdGl2ZUNhcmQtLWNsb3NlJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLiRoZWFkZXJUZXh0LmNzcyh7XG5cdFx0XHRcdG1heFdpZHRoOiAnOTklJ1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAodGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoISFfdGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpWzBdICYmICEhX3RoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKVswXS5jb250ZW50V2luZG93ICYmIF90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0uY29udGVudFdpbmRvdy5TYXBwaGlyZVdpZGdldHMgJiYgX3RoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKVswXS5jb250ZW50V2luZG93LlNhcHBoaXJlV2lkZ2V0cy5SZXNpemVQYXJlbnRJZnJhbWUpIHtcblx0XHRcdFx0XHRcdF90aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJylbMF0uY29udGVudFdpbmRvdy5TYXBwaGlyZVdpZGdldHMuUmVzaXplUGFyZW50SWZyYW1lLnJlc2l6ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgNTAwKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dGhpcy4kaGVhZGVyLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLS1vcGVuOm5vdChbZGlzYWJsZWRdKScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0X3RoaXMub3Blbih0cnVlKTtcblx0XHR9KTtcblx0XHR0aGlzLiRoZWFkZXIuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtLWNsb3NlJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRfdGhpcy5jbG9zZSgpO1xuXHRcdH0pO1xuXHRcdGlmICh0aGlzLmFsbG93T3BlbmluZykge1xuXHRcdFx0dGhpcy4kaGVhZGVyVGV4dC5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHRpZiAoJChldnQudGFyZ2V0KS5oYXNDbGFzcygnQnV0dG9uJykpIHtcblx0XHRcdFx0XHQvLyB0aGUgdXNlciBjbGlja2VkIG9uIGEgQnV0dG9uIGluc2lkZSB0aGUgaGVhZGVyLCBub3RoaW5nIHRvIGRvIGhlcmVcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoX3RoaXMuaXNPcGVuKSB7XG5cdFx0XHRcdFx0XHRpZiAoX3RoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0Ly8gZG8gbm90IGNsb3NlIHdoZW4gYW5kIGlmcmFtZSBleGlzdHNcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdFx0XHRcdF90aGlzLiRhY3Rpb25zLmZpbmQoJ2EnKS5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0XHRcdF90aGlzLiRhY3Rpb25zLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLS1jbG9zZScpLmxlbmd0aCA+IDBcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHQvLyBkbyBub3QgY2xvc2Ugd2hlbiB0aGUgY2FyZCBoYXMgYWN0aW9uc1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0X3RoaXMuY2xvc2UoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMub3Blbih0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAodGhpcy5pc1NlbGVjdGFibGUpIHtcblx0XHRcdHRoaXMuJHNlbGVjdFRyaWdnZXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmIChfdGhpcy4kc2VsZWN0UGxhY2Vob2xkZXIuZmluZCgnYScpLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdF90aGlzLiRzZWxlY3RQbGFjZWhvbGRlci5maW5kKCdhJykuY2xpY2soKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ1lvdSBuZWVkIDEgbGluayBpbiB0aGlzIHBsYWNlaG9sZGVyLicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIChzZW5kTm90aWZ5LCBkdXJhdGlvbikge1xuXHRcdHZhciBkdXJhdGlvbiA9IGR1cmF0aW9uIHx8IGRlZmF1bHREdXJhdGlvbjtcblx0XHR0aGlzLmlzT3BlbiA9IHRydWU7XG5cdFx0dGhpcy4kY2FyZC5hZGRDbGFzcygnaXNPcGVuJyk7XG5cdFx0aWYgKHRoaXMuaGlkZUFjdGlvbnNPbk9wZW4pIHtcblx0XHRcdHRoaXMuJGFjdGlvbnMuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuaGlkZVRpdGxlT25PcGVuKSB7XG5cdFx0XHR0aGlzLiR0aXRsZS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5oaWRlU3ViVGl0bGVPbk9wZW4pIHtcblx0XHRcdHRoaXMuJHN1YlRpdGxlLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVDYXB0aW9uT25PcGVuKSB7XG5cdFx0XHR0aGlzLiRjYXB0aW9uLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmVtaXROb3RpZnlPbk9wZW4pIHtcblx0XHRcdGlmIChzZW5kTm90aWZ5KSB7XG5cdFx0XHRcdE9zTm90aWZ5V2lkZ2V0KHRoaXMuTWFpbkludGVyYWN0aXZlQ2FyZEZha2VOb3RpZnlJZCwgJ29wZW4nKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuJGJvZHkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLiR0cmlnZ2VyKSB7XG5cdFx0XHR0aGlzLiR0cmlnZ2VyLmNsaWNrKCk7XG5cdFx0XHR0aGlzLiRib2R5LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZHVyYXRpb24gPiAwKSB7XG5cdFx0XHRcdHRoaXMuJGJvZHkuc2xpZGVEb3duKGR1cmF0aW9uKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuJGJvZHkuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykubGVuZ3RoID09PSAxICYmICF0aGlzLiR3aWRnZXQuZmluZCgnaWZyYW1lJykuaGFzQ2xhc3MoJ2NrZV93eXNpd3lnX2ZyYW1lJykpIHtcblx0XHRcdHZhciBpZnJhbWVDb250ZW50cyA9IHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5jb250ZW50cygpO1xuXHRcdFx0aWZyYW1lQ29udGVudHMuZmluZCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQtaWZyYW1lLWFjdGlvbnMnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmFsbG93TXVsdGlwbGVPcGVuKSB7XG5cdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGl0ZW0gPT4gKGl0ZW0gIT09IHRoaXMgJiYgaXRlbS5hbGxvd09wZW5pbmcgPyBpdGVtLmNsb3NlKGR1cmF0aW9uKSA6IG51bGwpKTtcblx0XHR9XG5cdH07XG5cblx0TWFpbkludGVyYWN0aXZlQ2FyZC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIGR1cmF0aW9uID0gZHVyYXRpb24gfHwgZGVmYXVsdER1cmF0aW9uO1xuXHRcdHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy4kY2FyZC5yZW1vdmVDbGFzcygnaXNPcGVuJyk7XG5cdFx0aWYgKHRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5sZW5ndGggPT09IDEgJiYgIXRoaXMuJHdpZGdldC5maW5kKCdpZnJhbWUnKS5oYXNDbGFzcygnY2tlX3d5c2l3eWdfZnJhbWUnKSkge1xuXHRcdFx0dGhpcy4kd2lkZ2V0LmZpbmQoJ2lmcmFtZScpLmZpbmQoJy5NYWluSW50ZXJhY3RpdmVDYXJkLWlmcmFtZS1hY3Rpb25zJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdH1cblx0XHR0aGlzLiRib2R5LnNsaWRlVXAoZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChzZWxmLiRjYXJkLmhhc0NsYXNzKCdmb3JjZU9wZW4nKSkge1xuXHRcdFx0XHRzZWxmLiRjYXJkLnJlbW92ZUNsYXNzKCdmb3JjZU9wZW4nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZiAodGhpcy5oaWRlQWN0aW9uc09uT3Blbikge1xuXHRcdFx0dGhpcy4kYWN0aW9ucy5zaG93KCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVUaXRsZU9uT3Blbikge1xuXHRcdFx0dGhpcy4kdGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVTdWJUaXRsZU9uT3Blbikge1xuXHRcdFx0dGhpcy4kc3ViVGl0bGUuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmhpZGVDYXB0aW9uT25PcGVuKSB7XG5cdFx0XHR0aGlzLiRjYXB0aW9uLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdH1cblx0XHR0aGlzLiRoZWFkZXJUZXh0LmNzcyh7XG5cdFx0XHRtYXhXaWR0aDogJzk5JSdcblx0XHR9KTtcblx0fTtcblxuXHRNYWluSW50ZXJhY3RpdmVDYXJkLnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaXNPcGVuO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkID0ge1xuXHRcdGNyZWF0ZTogY3JlYXRlLFxuXHRcdGFsbDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGFsbE1haW5JbnRlcmFjdGl2ZUNhcmRzO1xuXHRcdH0sXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcblx0aWYgKCEhJCgnLk1haW5JbnRlcmFjdGl2ZUNhcmQnKS5sZW5ndGgpIHtcblx0XHRpZiAoISEhU2FwcGhpcmVXaWRnZXRzLk1haW5JbnRlcmFjdGl2ZUNhcmQuYWZ0ZXJBamF4UmVxdWVzdEJpbmRlZCkge1xuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBhbGxNYWluSW50ZXJhY3RpdmVDYXJkcyA9IFNhcHBoaXJlV2lkZ2V0cy5NYWluSW50ZXJhY3RpdmVDYXJkLmFsbCgpO1xuXHRcdFx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5oYW5kbGVIZWFkZXJXaXRoQWJzb2x1dGVCdXR0b25zKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHRTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hZnRlckFqYXhSZXF1ZXN0QmluZGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgYWxsTWFpbkludGVyYWN0aXZlQ2FyZHMgPSBTYXBwaGlyZVdpZGdldHMuTWFpbkludGVyYWN0aXZlQ2FyZC5hbGwoKTtcblx0XHRhbGxNYWluSW50ZXJhY3RpdmVDYXJkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50LmhhbmRsZUhlYWRlcldpdGhBYnNvbHV0ZUJ1dHRvbnMoKTtcblx0XHR9KTtcblx0fSwgMTAwMCk7XG5cbn0pOyIsIi8qIENvbXBvbmVudCBNZW51QmFyICovXG5TYXBwaGlyZVdpZGdldHMuTWVudUJhciA9IGZ1bmN0aW9uKGNvbmZpZykge1xuXHQkKGZ1bmN0aW9uKCkge1xuXHRcdHZhciAkbWVudVdpZGdldCA9ICQoJyMnICsgY29uZmlnLm1lbnVXaWRnZXQpO1xuXG5cdFx0dmFyIG1lbnVSZXNpZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmF2V2lkdGggPSAwO1xuXHRcdFx0dmFyIGF2YWlsYWJlRXNwYWNlID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbScpLndpZHRoKCk7XG5cblx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0bmF2V2lkdGggKz0gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChuYXZXaWR0aCA+IGF2YWlsYWJlRXNwYWNlKSB7XG5cdFx0XHRcdHZhciBsYXN0SXRlbSA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2l0ZW0gLk1lbnVJdGVtJykubGFzdCgpO1xuXHRcdFx0XHRsYXN0SXRlbS5hdHRyKCdkYXRhLXdpZHRoJywgbGFzdEl0ZW0ub3V0ZXJXaWR0aCh0cnVlKSk7XG5cdFx0XHRcdGxhc3RJdGVtLnByZXBlbmRUbygkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKSk7XG5cdFx0XHRcdG1lbnVSZXNpZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgZmlyc3RNb3JlRWxlbWVudCA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX19leHRyYUNvbnRhaW5lciAuTWVudUl0ZW0nKS5maXJzdCgpO1xuXHRcdFx0XHRpZiAobmF2V2lkdGggKyBmaXJzdE1vcmVFbGVtZW50LmRhdGEoJ3dpZHRoJykgPCBhdmFpbGFiZUVzcGFjZSkge1xuXHRcdFx0XHRcdGZpcnN0TW9yZUVsZW1lbnQuaW5zZXJ0QWZ0ZXIoJG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfaXRlbSAuTWVudUl0ZW0nKS5sYXN0KCkpO1xuXHRcdFx0XHRcdG1lbnVSZXNpZGVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCEkbWVudVdpZGdldC5maW5kKCcuTWVudWJhcl9fZXh0cmFDb250YWluZXInKS5pcygnOmVtcHR5JykpIHtcblx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfZXh0cmFJdGVtJykuYWRkQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhJCh0aGlzKVxuXHRcdFx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0XHRcdC5oYXNDbGFzcygnTWVudWJhcl9fZXh0cmFDb250YWluZXInKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGlmICghJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykgJiYgISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZUluZGljYXRvcicpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLmFjdGl2ZUluZGljYXRvcicpLmFkZENsYXNzKCdzaGFkb3cnKTtcblx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcblx0XHRcdFx0XHRcdC50b2dnbGVDbGFzcygnc2hvdycpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmVJbmRpY2F0b3InKSkge1xuXHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdC5maW5kKCcuTWVudUl0ZW1fc3ViSXRlbXMnKVxuXHRcdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHQuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJylcblx0XHRcdFx0XHQudG9nZ2xlQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbSAuaWNvbicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0JG1lbnVXaWRnZXQuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyICcpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG5cdFx0fSk7XG5cblx0XHQkKGRvY3VtZW50KS5tb3VzZXVwKGUgPT4ge1xuXHRcdFx0dmFyICRtZW51ID0gJG1lbnVXaWRnZXQuZmluZCgnLk1lbnVJdGVtLmFjdGl2ZScpO1xuXHRcdFx0dmFyICRtb3JlT3B0aW9ucyA9ICRtZW51V2lkZ2V0LmZpbmQoJy5NZW51YmFyX2V4dHJhSXRlbScpO1xuXG5cdFx0XHQvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgbWVudSBvciBhIGRlc2NlbmRhbnQgb2YgdGhlIG1lbnVcblx0XHRcdGlmICgkbWVudS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGlmICghJG1lbnUuaXMoZS50YXJnZXQpICYmICRtZW51LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0JG1lbnUuZmluZCgnLk1lbnVJdGVtX3N1Ykl0ZW1zJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdFx0XHQkKCcuYWN0aXZlSW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ3NoYWRvdycpO1xuXHRcdFx0XHRcdCRtZW51V2lkZ2V0LmZpbmQoJy5NZW51SXRlbS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCEkbW9yZU9wdGlvbnMuaXMoZS50YXJnZXQpICYmICRtb3JlT3B0aW9ucy5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHQkbW9yZU9wdGlvbnMuZmluZCgnLk1lbnViYXJfX2V4dHJhQ29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcblx0XHRcdFx0JCgnLmFjdGl2ZUluZGljYXRvcicpLnJlbW92ZUNsYXNzKCdzaGFkb3cnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCQod2luZG93KS5vbigncmVzaXplIGxvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdG1lbnVSZXNpZGVyKCk7XG5cdFx0fSk7XG5cdH0pO1xufTtcbiIsIi8qIENvbXBvbmVudCBNdWx0aXBsZVNlbGVjdGlvbkJ1dHRvbiAqL1xuU2FwcGhpcmVXaWRnZXRzLk11bHRpcGxlU2VsZWN0aW9uQnV0dG9uID0gZnVuY3Rpb24oV3JhcHBlcklkKSB7XG5cdHZhciAkd2lkZ2V0ID0gJChXcmFwcGVySWQpO1xuXHR2YXIgJGNvbnRyb2wgPSAkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpkaXNhYmxlZCcpKSB7XG5cdFx0JChXcmFwcGVySWQpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuXHR9IGVsc2Uge1xuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0fVxuXG5cdGlmICgkKFdyYXBwZXJJZCArICcgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuaXMoJzpjaGVja2VkJykpIHtcblx0XHQkKFdyYXBwZXJJZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHR9IGVsc2Uge1xuXHRcdCQoV3JhcHBlcklkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdH1cblxuXHQkd2lkZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoYW5nZShmdW5jdGlvbigpIHtcblx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuXHRcdFx0JCh0aGlzKVxuXHRcdFx0XHQucGFyZW50KClcblx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH1cblx0fSk7XG5cblx0JHdpZGdldC5maW5kKCcuTXVsdGlwbGVTZWxlY3Rpb25CdXR0b24tbGFiZWwnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHQvLyAkY29udHJvbC5wcm9wKFwiY2hlY2tlZFwiLCAhJGNvbnRyb2wucHJvcChcImNoZWNrZWRcIikpO1xuXHRcdCRjb250cm9sWzBdLmNsaWNrKCk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGlmICgkY29udHJvbC5pcygnOmNoZWNrZWQnKSkge1xuXHRcdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0fVxuXHRcdH0sIDEwKTtcblx0fSk7XG59O1xuIiwiLyogQ29tcG9uZW50IENvbmZpcm1hdGlvblBhbmVsM09wdGlvbnMgQ29uZmlybWF0aW9uUGFuZWwgc2FtZSBqYXZhc2NyaXB0IGNvZGUqL1xuXG5TYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwgPSB7XG5cdGlzQW55UGFuZWxPcGVuZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJykgJiYgJCgnLlBhbmVsQ29udGFpbmVyOnZpc2libGUnKS5sZW5ndGg7XG5cdH0sXG5cblx0dG9nZ2xlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcblx0XHRpZiAoIU9zVmFsaWRhdG9yT25TdWJtaXQoKSkgcmV0dXJuO1xuXG5cdFx0aWYgKCFTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuaXNBbnlQYW5lbE9wZW5lZCgpKSB7XG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XG5cdFx0XHQkKCcjJyArIFBhbmVsSWQpLmZhZGVJbigxNDApO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKCcjJyArIFBhbmVsSWQpXG5cdFx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXG5cdFx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XG5cdFx0XHR9LCAxMDApO1xuXHRcdH1cblx0fSxcblxuXHRjbG9zZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdQYW5lbE9wZW5lZCcpO1xuXHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZU91dCgxNDApO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCQoJyMnICsgUGFuZWxJZClcblx0XHRcdFx0LmZpbmQoJy5QYW5lbENvbnRhaW5lcicpXG5cdFx0XHRcdC5zbGlkZVVwKDE1MCk7XG5cdFx0fSwgMTAwKTtcblx0fSxcblxuXHRzZXRQYW5lbEJlaGF2aW9yOiBmdW5jdGlvbigpIHtcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0aGlzX3BhbmVsID0gJCh0aGlzKTtcblx0XHRcdCQoJyMnICsgdGhpc19wYW5lbC5hdHRyKCdwYW5lbC10cmlnZ2VyLWVsZW1lbnRpZCcpICsgJycpXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Db25maXJtYXRpb25QYW5lbC50b2dnbGVQYW5lbCh0aGlzX3BhbmVsLmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0U2FwcGhpcmVXaWRnZXRzLkNvbmZpcm1hdGlvblBhbmVsLnNldFBhbmVsQmVoYXZpb3IoKTtcblx0aWYgKG9zQWpheEJhY2tlbmQuRXZlbnRIYW5kbGVycy5BZnRlckFqYXhSZXF1ZXN0LnRvU3RyaW5nKCkuaW5kZXhPZignc2V0UGFuZWxCZWhhdmlvcicpID09IC0xKSB7XG5cdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdChTYXBwaGlyZVdpZGdldHMuQ29uZmlybWF0aW9uUGFuZWwuc2V0UGFuZWxCZWhhdmlvcik7XG5cdH1cbn0pO1xuIiwiLyogQ29tcG9uZW50IFBhbmVsQnlJRE5vdGlmeSAqL1xyXG52YXIgcGFuZWxOb3RpZnlXaWRnZXQ7XHJcblNhcHBoaXJlV2lkZ2V0cy5QYW5lbEJ5SWROb3RpZnkgPSB7XHJcblx0aXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuICQoJ2JvZHknKS5oYXNDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHR9LFxyXG5cdHRvZ2dsZVBhbmVsQnlOb3RpZnk6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHRpZiAoIWlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkKCkpIHtcclxuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdQYW5lbE9wZW5lZCcpO1xyXG5cdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0LmZhZGVJbigxNDApO1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoanVzdERyYWdnZWQgPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdCQoJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHRcdC5jc3MoJ21hcmdpbi1sZWZ0JywgcGFuZWxNYXJnaW5MZWZ0KVxyXG5cdFx0XHRcdFx0XHQuY3NzKCdsZWZ0JywgcGFuZWxMZWZ0KVxyXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MocGFuZWxBcnJvd0NsYXNzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0XHQuc2xpZGVEb3duKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuZmFkZU91dCgxNDApO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQucGFyZW50KClcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdC5zbGlkZVVwKDE1MCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR0b2dnbGVQYW5lbE5vdGlmeUJ5SWQ6IGZ1bmN0aW9uKElkKSB7XHJcblx0XHQkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHQuY2hpbGRyZW4oJy5QYW5lbCcpXHJcblx0XHRcdC5mYWRlVG9nZ2xlKDE0MCk7XHJcblxyXG5cdFx0cGFuZWxOb3RpZnlXaWRnZXQgPSAkKCcjJyArIElkKVxyXG5cdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdC5hdHRyKCdOb3RpZnlJZCcpO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuY2hpbGRyZW4oJy5QYW5lbENvbnRhaW5lcicpXHJcblx0XHRcdFx0LnNsaWRlVG9nZ2xlKDE1MCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcbn07XHJcbiIsIi8qIENvbXBvbmVudCBQYW5lbEJ5SUQgKi9cclxuU2FwcGhpcmVXaWRnZXRzLlBhbmVsQnlJZCA9e1xyXG5cdGlzQW55UGFuZWxPcGVuZWREZXByZWNhdGVkOmZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAkKCdib2R5JykuaGFzQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0fSxcclxuXHRcclxuXHR0b2dnbGVQYW5lbEJ5SWQ6ZnVuY3Rpb24gKElkKSB7XHJcblx0XHRpZiAoIXRoaXMuaXNBbnlQYW5lbE9wZW5lZERlcHJlY2F0ZWQoKSkge1xyXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ1BhbmVsT3BlbmVkJyk7XHJcblx0XHRcdCQoJ2JvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcblx0XHJcblx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdC5jaGlsZHJlbignLlBhbmVsJylcclxuXHRcdFx0XHQuZmFkZUluKDE0MCk7XHJcblx0XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBqdXN0RHJhZ2dlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdGlmIChqdXN0RHJhZ2dlZCA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0XHQkKCcuUGFuZWxCeUlkTmV3X1BhbmVsQ29udGFpbmVyJylcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdtYXJnaW4tbGVmdCcsIHBhbmVsTWFyZ2luTGVmdClcclxuXHRcdFx0XHRcdFx0XHQuY3NzKCdsZWZ0JywgcGFuZWxMZWZ0KVxyXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhwYW5lbEFycm93Q2xhc3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xyXG5cdFx0XHR9XHJcblx0XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlRG93bigxNTApO1xyXG5cdFx0XHRcdCQoJyMnICsgSWQpXHJcblx0XHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0XHQuY2xpY2soKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnUGFuZWxPcGVuZWQnKTtcclxuXHRcdFx0JCgnYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdzY3JvbGwnKTtcclxuXHRcclxuXHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHQucGFyZW50cygnLlRvZ2dsZUJ1dHRvbicpXHJcblx0XHRcdFx0LnBhcmVudCgpXHJcblx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdC5mYWRlT3V0KDE0MCk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCgnIycgKyBJZClcclxuXHRcdFx0XHRcdC5wYXJlbnRzKCcuVG9nZ2xlQnV0dG9uJylcclxuXHRcdFx0XHRcdC5wYXJlbnQoKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWwnKVxyXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuUGFuZWxDb250YWluZXInKVxyXG5cdFx0XHRcdFx0LnNsaWRlVXAoMTUwKTtcclxuXHRcdFx0XHQkKCcjJyArIElkKVxyXG5cdFx0XHRcdFx0LnBhcmVudHMoJy5Ub2dnbGVCdXR0b24nKVxyXG5cdFx0XHRcdFx0LmNsaWNrKCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4iLCIvKiBDb21wb25lbnQgUG9wVXBNZW51ICovXHJcblxyXG5TYXBwaGlyZVdpZGdldHMuUG9wVXBNZW51ID0ge1xyXG5cdG1lbnVQb3NpdGlvbjogZnVuY3Rpb24gKGlkLCBDb250ZXh0KSB7XHJcblx0XHQvKiBIaWRlIGFueSBvdGhlciBtZW51cyBvbiBwYWdlIGFuZCBzZXQgYnV0dG9uIGFzIGNvbGxhcHNlZC4gKi9cclxuXHRcdCQoJy5wb3B1cC1tZW51OnZpc2libGUnKS5oaWRlKCk7XHJcblxyXG5cdFx0Ly92YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG5cdFx0dmFyIF90aGlzID0gJCgnIycgKyBpZCk7XHJcblx0XHR2YXIgWHggPSAwO1xyXG5cdFx0dmFyIFl5ID0gMDtcclxuXHRcdHZhciBXdyA9IDA7XHJcblx0XHR2YXIgSGggPSAwO1xyXG5cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWV4cGFuZDp2aXNpYmxlJykuaGlkZSgpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgbWVudSBlbGVtZW50LiAqL1xyXG5cdFx0dmFyIF9lbCA9IF90aGlzLm5leHQoJy5wb3B1cC1tZW51Jyk7XHJcblxyXG5cdFx0LyogRGlzcGxheSB0aGUgbWVudS4gKi9cclxuXHRcdF9lbC5zaG93KCk7XHJcblxyXG5cdFx0LyogU2V0IGJ1dHRvbiBjb2xsYXBzZS4gKi9cclxuXHRcdF90aGlzLmNoaWxkcmVuKCcuYnV0dG9uLWNvbGxhcHNlJykuc2hvdygpO1xyXG5cclxuXHRcdC8qIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgYnV0dG9uLiAqL1xyXG5cdFx0YnV0dG9uSGggPSBfdGhpcy5vdXRlckhlaWdodCgpO1xyXG5cdFx0YnV0dG9uV3cgPSBfdGhpcy5vdXRlcldpZHRoKCk7XHJcblxyXG5cdFx0dmFyIGJ1dHRvblkgPSBfdGhpcy5wb3NpdGlvbigpLnRvcCArIGJ1dHRvbkhoO1xyXG5cdFx0dmFyIGJ1dHRvblggPSBfdGhpcy5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0Ly92YXIgYnV0dG9uWCA9IF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHQvKiBHZXQgdGhlIGRpc3RhbmNlIG9mIG1lbnUgYnV0dG9uIGFuZCB0aGUgcGFyZW50IGVsZW1lbnQgKi9cclxuXHRcdHZhciBwb3B1cFBhcmVudFh4ID0gX3RoaXMub2Zmc2V0KCkubGVmdCAtIF90aGlzLnBvc2l0aW9uKCkubGVmdDtcclxuXHJcblx0XHR2YXIgcG9wdXBYeCA9IF9lbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIHBvcHVwV3cgPSBfZWwub3V0ZXJXaWR0aCgpO1xyXG5cclxuXHRcdFh4ID0gTWF0aC5hYnMoYnV0dG9uWCAtICQoJ2JvZHknKS5zY3JvbGxMZWZ0KCkgLSBwb3B1cFBhcmVudFh4KTtcclxuXHRcdFl5ID0gTWF0aC5hYnMoYnV0dG9uSGggLSBidXR0b25ZIC0gJCgnYm9keScpLnNjcm9sbFRvcCgpKTtcclxuXHJcblx0XHQvKiBDaGVjayBpZiBjbGlja2VkIHBvc2l0aW9uIHBsdXMgdGhlIHBvcHVwIHdpZHRoIGV4Y2VlZCB0aGUgd2luZG93IHdpZHRoLiAqL1xyXG5cdFx0aWYgKGJ1dHRvblggKyBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSA+ICQoQ29udGV4dCkud2lkdGgoKSkge1xyXG5cdFx0XHRYeCA9IGJ1dHRvblggLSBwb3B1cFd3IC0gJCgnYm9keScpLnNjcm9sbExlZnQoKSAtIHBvcHVwUGFyZW50WHggKyBidXR0b25XdztcclxuXHRcdFx0Ly9YeCA9ICgkKHdpbmRvdykud2lkdGgoKSAtIHBvcHVwV3cpIC0gJCgnYm9keScpLnNjcm9sbExlZnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgbWVudSBwb3NpdGlvbi4gKi9cclxuXHRcdF9lbC5jc3Moe1xyXG5cdFx0XHRsZWZ0OiBYeCArICdweCcsXHJcblx0XHRcdHRvcDogYnV0dG9uWSArICdweCdcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qIFJlZnJlc2ggdmFsdWUgKi9cclxuXHRcdHBvcHVwWHggPSBfZWwub2Zmc2V0KCkubGVmdDtcclxuXHJcblx0XHR2YXIgX2JhbGxvb25FbCA9IF9lbC5jaGlsZHJlbignLnBvcHVwLW1lbnUtYmFsbG9vbicpO1xyXG5cclxuXHRcdHZhciBfYmFsbG9vblh4ID0gX2JhbGxvb25FbC5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIF9iYWxsb29uV3cgPSBfYmFsbG9vbkVsLm91dGVyV2lkdGgoKTtcclxuXHRcdHZhciBfYmFsbG9vblBvc1h4ID0gTWF0aC5hYnMoYnV0dG9uWCAtIFh4IC0gcG9wdXBQYXJlbnRYeCk7XHJcblxyXG5cdFx0LyogSXMgdGhlIGJhbGxvb24gaWNvbiBwb3NpdGlvbmVkIG91dCBvZiB0aGUgcG9wdXAgbWVudT8gKi9cclxuXHRcdGlmIChfYmFsbG9vblBvc1h4ICsgWHggKyBfYmFsbG9vbld3ID4gWHggKyBwb3B1cFd3KSB7XHJcblx0XHRcdF9iYWxsb29uUG9zWHggPSBfYmFsbG9vblBvc1h4IC0gX2JhbGxvb25XdztcclxuXHRcdH1cclxuXHJcblx0XHQvKiBTZXQgcG9zaXRpb24gb2YgdGhlIGJhbGxvb24gZWZmZWN0LiAqL1xyXG5cdFx0X2JhbGxvb25FbC5jc3MoJ2xlZnQnLCBfYmFsbG9vblBvc1h4ICsgJ3B4Jyk7XHJcblx0fSxcclxuXHRtZW51RXZlbnRzOiBmdW5jdGlvbiAoQ29udGV4dCkge1xyXG5cdFx0JCgnLnBvcHVwLWJ1dHRvbicpXHJcblx0XHRcdC5vZmYoJ2NsaWNrJylcclxuXHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIGlkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xyXG5cdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5Qb3BVcE1lbnUubWVudVBvc2l0aW9uKGlkLCBDb250ZXh0KTtcclxuXHJcblx0XHRcdFx0LyplLnN0b3BQcm9wYWdhdGlvbigpOyovXHJcblxyXG5cdFx0XHRcdC8qIFByZXZlbnQgbGluayBzdWJtaXNzaW9uICovXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHQvKiB2ICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogdiAqL1xyXG5cdFx0ZnVuY3Rpb24gUE1DbGlja091dHNpZGUoZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50Lmhhc093blByb3BlcnR5KCd0YXJnZXQnKSkge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcblx0XHRcdFx0LyppZiAoKHRhcmdldC5wYXJlbnRzKCkuaW5kZXgoJCgnYVtzYXBwaGlyZWhvc3BpdGFsXSwgLkhvc3BpdGFsUG9wVXAnKSkgPT0gLTEpKSB7fSovXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0ISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KFxyXG5cdFx0XHRcdFx0XHQnLnBvcHVwLWJ1dHRvbiwgLnBvcHVwLW1lbnUsIC5vcy1pbnRlcm5hbC11aS1hdXRvY29tcGxldGUsIC5vcy1pbnRlcm5hbC11aS1tZW51LWl0ZW0sIC5vcy1pbnRlcm5hbC11aS1jb3JuZXItYWxsLCB1aS1hdXRvY29tcGxldGUtaXRlbSdcclxuXHRcdFx0XHRcdCkubGVuZ3RoXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHQkKCcucG9wdXAtbWVudTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZTp2aXNpYmxlJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0JCgnLmJ1dHRvbi1leHBhbmQnKS5zaG93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0dmFyIF9QTUlzQ2xpY2sgPSBmYWxzZTtcclxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdF9QTUlzRHJhZyA9IGZhbHNlO1xyXG5cdFx0XHRfUE1Jc0NsaWNrID0gdHJ1ZTtcclxuXHRcdH0pO1xyXG5cdFx0JChkb2N1bWVudCkub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSB0cnVlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0UE1DbGlja091dHNpZGUoZXZlbnQpO1xyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0aWYgKCFfUE1Jc0RyYWcgJiYgX1BNSXNDbGljaykge1xyXG5cdFx0XHRcdFBNQ2xpY2tPdXRzaWRlKGV2ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfUE1Jc0RyYWcgPSBmYWxzZTtcclxuXHRcdFx0X1BNSXNDbGljayA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnLmJ1dHRvbi1jb2xsYXBzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHQkKCdib2R5JykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQvKiBeICoqKiBIaWRlIHBvcHVwIHdoZW4gY2xpY2sgb3V0c2lkZSAqKiogXiAqL1xyXG5cdH1cclxufTsiLCIvKiBDb21wb25lbnQgU2FwcGhpcmVQYW5lbCAqL1xuU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwgPSB7XG5cdGNoZWNrT3BlblBhbmVsOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gJCgnYm9keScpLmhhc0NsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpICYmICQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcjp2aXNpYmxlJykubGVuZ3RoO1xuXHR9LFxuXG5cdHRvZ2dsZVNhcHBoaXJlUGFuZWw6IGZ1bmN0aW9uKFBhbmVsSWQpIHtcblx0XHRpZiAoIU9zVmFsaWRhdG9yT25TdWJtaXQoKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUGFuZWwuY2hlY2tPcGVuUGFuZWwoKSkge1xuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xuXHRcdFx0JCgnIycgKyBQYW5lbElkKS5mYWRlSW4oMTQwKTtcblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnIycgKyBQYW5lbElkKVxuXHRcdFx0XHRcdC5maW5kKCcuU2FwcGhpcmVQYW5lbF9Db250YWluZXInKVxuXHRcdFx0XHRcdC5zbGlkZVRvZ2dsZSgxNTApO1xuXHRcdFx0fSwgMTAwKTtcblx0XHR9XG5cdH0sXG5cblx0Y2xvc2VTYXBwaGlyZVBhbmVsOiBmdW5jdGlvbihQYW5lbElkKSB7XG5cdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdTYXBwaGlyZVBhbmVsT3BlbicpO1xuXHRcdCQoJyMnICsgUGFuZWxJZCkuZmFkZU91dCgxNDApO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCQoJyMnICsgUGFuZWxJZClcblx0XHRcdFx0LmZpbmQoJy5TYXBwaGlyZVBhbmVsX0NvbnRhaW5lcicpXG5cdFx0XHRcdC5zbGlkZVVwKDE1MCk7XG5cdFx0fSwgMTAwKTtcblx0fSxcblxuXHRzZXRQYW5lbEJlaGF2aW9yOiBmdW5jdGlvbigpIHtcblx0XHQkKCcuUGFuZWxbcGFuZWwtdHJpZ2dlci1lbGVtZW50aWRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0aGlzX3BhbmVsID0gJCh0aGlzKTtcblx0XHRcdCQoJyMnICsgdGhpc19wYW5lbC5hdHRyKCdwYW5lbC10cmlnZ2VyLWVsZW1lbnRpZCcpICsgJycpXG5cdFx0XHRcdC5vZmYoJ2NsaWNrJylcblx0XHRcdFx0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnRvZ2dsZVNhcHBoaXJlUGFuZWwodGhpc19wYW5lbC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IoKTtcblxuXHRpZiAob3NBamF4QmFja2VuZC5FdmVudEhhbmRsZXJzLkFmdGVyQWpheFJlcXVlc3QudG9TdHJpbmcoKS5pbmRleE9mKCdzZXRQYW5lbEJlaGF2aW9yJykgPT0gLTEpIHtcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IpO1xuXHR9XG59KTtcbiIsInJlcXVpcmUoJy4vY29uZmlybWF0aW9uLXBhbmVsJyk7XHJcbnJlcXVpcmUoJy4vcGFuZWwtYnktaWQnKTtcclxuLy9yZXF1aXJlKCcuL3BhbmVsLWJ5LWlkLW5vdGlmeScpO1xyXG5yZXF1aXJlKCcuL3BvcHVwLW1lbnUnKTtcclxucmVxdWlyZSgnLi9zYXBwaGlyZS1wYW5lbCcpO1xyXG5cclxuIiwiLyogQ29tcG9uZW50IFBhdGllbnRDYWxsQ2FuY2VsICovXG4oZnVuY3Rpb24oJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbihjb25maWcpIHtcblx0XHR2YXIgaW50ZXJ2YWw7XG5cdFx0dmFyIHRpbWVDb3VudGVyO1xuXHRcdHZhciAkd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpLmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbCcpO1xuXHRcdHZhciAkY291bnRkb3duID0gJHdpZGdldC5maW5kKCcuUGF0aWVudENhbGxDYW5jZWwtY291bnRlcicpO1xuXHRcdHZhciAkbGFiZWwgPSAkd2lkZ2V0LmZpbmQoJy5QYXRpZW50Q2FsbENhbmNlbC1sYWJlbCcpO1xuXG5cdFx0dmFyIHNldFN0YXRlID0gZnVuY3Rpb24oc3RhdGVfaW4sIHRleHRfaW4pIHtcblx0XHRcdC8vanMtaWRsZSwganMtY2FsbGluZ1xuXHRcdFx0JHdpZGdldC5maW5kKCc+IGRpdicpLnByb3AoJ2NsYXNzJywgc3RhdGVfaW4pO1xuXHRcdFx0JGxhYmVsLnRleHQodGV4dF9pbik7XG5cdFx0fTtcblxuXHRcdHZhciBjYWxsUGF0aWVudCA9IGZ1bmN0aW9uKCR3aWRnZXQpIHtcblx0XHRcdHNldFN0YXRlKCdqcy1jYWxsaW5nJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcblx0XHRcdGlmIChjb25maWcuc2hvd0NvdW50ZG93bikge1xuXHRcdFx0XHQkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxpbmdJbiArICcgJyArIGNvbmZpZy50aW1lVG9DYW5jZWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4pO1xuXHRcdFx0fVxuXHRcdFx0c3RhcnRDb3VudGVyKCk7XG5cdFx0fTtcblxuXHRcdHZhciBzdGFydENvdW50ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcblx0XHRcdGludGVydmFsID0gd2luZG93LnNldEludGVydmFsKHVwZGF0ZUNvdW50ZXIsIDEwMDApO1xuXHRcdH07XG5cblx0XHR2YXIgdXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZUNvdW50ZXItLTtcblx0XHRcdGlmICh0aW1lQ291bnRlciA9PT0gMCkge1xuXHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcblx0XHRcdFx0dmFyIG5vdGlmaWNhdGlvbiA9ICcnO1xuXHRcdFx0XHRPc05vdGlmeVdpZGdldChjb25maWcucGF0aWVudENhbGxGYWtlTm90aWZ5SWQsIG5vdGlmaWNhdGlvbik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY29uZmlnLnNob3dDb3VudGRvd24pIHtcblx0XHRcdFx0JGNvdW50ZG93bi50ZXh0KGNvbmZpZy50eHRDYWxsaW5nSW4gKyAnICcgKyB0aW1lQ291bnRlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkY291bnRkb3duLnRleHQoY29uZmlnLnR4dENhbGxpbmdJbik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdCR3aWRnZXQuZmluZCgnLlBhdGllbnRDYWxsQ2FuY2VsLWNhbmNlbC0tbGFiZWwnKS50ZXh0KGNvbmZpZy50eHRDYW5jZWwpO1xuXG5cdFx0c2V0U3RhdGUoJ2pzLWlkbGUnLCBjb25maWcudHh0Q2FsbFBhdGllbnQpO1xuXG5cdFx0JHdpZGdldC5vbignY2xpY2snLCAnLmpzLWlkbGUgLlBhdGllbnRDYWxsQ2FuY2VsLWxhYmVsJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWxsUGF0aWVudCgkd2lkZ2V0KTtcblx0XHR9KTtcblxuXHRcdCR3aWRnZXQub24oJ2NsaWNrJywgJy5qcy1pZGxlIC5QYXRpZW50Q2FsbENhbmNlbC1pY29uJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRjYWxsUGF0aWVudCgkd2lkZ2V0KTtcblx0XHR9KTtcblxuXHRcdCR3aWRnZXQub24oJ2NsaWNrJywgJy5qcy1jYWxsaW5nIC5QYXRpZW50Q2FsbENhbmNlbC1jYW5jZWwnLCBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVDb3VudGVyID0gY29uZmlnLnRpbWVUb0NhbmNlbDtcblx0XHRcdCRjb3VudGRvd24udGV4dCh0aW1lQ291bnRlcik7XG5cdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcblx0XHRcdHNldFN0YXRlKCdqcy1pZGxlJywgY29uZmlnLnR4dENhbGxQYXRpZW50KTtcblx0XHR9KTtcblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuUGF0aWVudENhbGxDYW5jZWwgPSB7XG5cdFx0Y3JlYXRlOiBjcmVhdGUsXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7XG4iLCIvKiBDb21wb25lbnQgUGVyc29uQ2FyZCAqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdHZhciBQZXJzb25DYXJkRXZlbnQgPSBmdW5jdGlvbigpIHtcblx0XHQkKCcuUGVyc29uQ2FyZF9fdGl0bGUsIC5QZXJzb25DYXJkX19jb250ZW50Jylcblx0XHRcdC5vZmYoJ2NsaWNrJylcblx0XHRcdC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0JGhlYWRlciA9ICQodGhpcykuY2xvc2VzdCgnLlBlcnNvbkNhcmRfaGVhZGVyJyk7XG5cdFx0XHRcdCRjb250ZW50ID0gJGhlYWRlci5uZXh0KCk7XG5cdFx0XHRcdGlmICgkY29udGVudC5jaGlsZHJlbigpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQkY29udGVudC5zbGlkZVRvZ2dsZSg1MDApO1xuXHRcdFx0XHRcdGlmICgkKCcuUGVyc29uQ2FyZC5Jc09wZW4nKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHRcdC5jbG9zZXN0KCcuUGVyc29uQ2FyZCcpXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnSXNPcGVuJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQodGhpcylcblx0XHRcdFx0XHRcdFx0LmNsb3Nlc3QoJy5QZXJzb25DYXJkJylcblx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdJc09wZW4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9O1xuXG5cdCQoJy5TdG9wUHJvcGFnYXRpb24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9KTtcblxuXHRQZXJzb25DYXJkRXZlbnQoKTtcblxuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFBlcnNvbkNhcmRFdmVudCk7XG59KTtcbiIsIi8qIENvbXBvbmVudCBQcmVzY3JpcHRpb25DYXJkICovXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcblx0XHQkKGAjJHtjb25maWcud2lkZ2V0SWR9YCkuY2xpY2soKCkgPT4ge1xuXHRcdFx0c2hvd01vcmUoJChgIyR7Y29uZmlnLndpZGdldElkfWApKTtcblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBzaG93TW9yZSA9IGVsZW1lbnQgPT4ge1xuXHRcdGNvbnN0IHBhcmVudHMgPSBlbGVtZW50LnBhcmVudHMoJy5QcmVzY3JpcHRpb25DYXJkJyk7XG5cblx0XHRpZiAocGFyZW50cy5maW5kKCcuRXhwYW5EaXYnKS5oYXNDbGFzcygnSXNPcGVuJykpIHtcblx0XHRcdHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykucmVtb3ZlQ2xhc3MoJ0lzT3BlbicpO1xuXG5cdFx0XHRlbGVtZW50LnRleHQoJ1NlZSBNb3JlJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcmVudHMuZmluZCgnLkV4cGFuRGl2JykuYWRkQ2xhc3MoJ0lzT3BlbicpO1xuXG5cdFx0XHRlbGVtZW50LnRleHQoJ1NlZSBMZXNzJyk7XG5cdFx0fVxuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5QcmVzY3JpcHRpb25DYXJkID0geyBjcmVhdGUgfTtcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xuIiwiLyogQ29tcG9uZW50IFByZXNjcmlwdGlvbkV4cGFuZGFibGUgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xuXHRjb25zdCBQcmVzY3JpcHRpb25FeHBhbmRhYmxlID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0Y29uc3Qgd2lkZ2V0SWQgPSBjb25maWcud2lkZ2V0SWQ7XG5cdFx0Y29uc3QgcHJldmlld3N0YXQgPSBbXTtcblx0XHRjb25zdCB0cmFuc2l0aW9uRXZlbnQgPSBTaWxrVUkud2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcblxuXHRcdGNvbnN0ICRlbGVtZW50V3JhcHBlciA9ICQoYCMke2NvbmZpZy53aWRnZXRJZH1gKTtcblxuXHRcdGNvbnN0IGNsaWNrRXZlbnRzID0gb2IgPT4ge1xuXHRcdFx0aWYgKCQob2IpLmhhc0NsYXNzKCdQcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlcl9fTGlua3NEaXYnKSkge1xuXHRcdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpXG5cdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0LnBhcmVudCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIFNlY3Rpb24gPSAkKG9iKS5wYXJlbnQoKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIFNlY3Rpb25Db250ZW50ID0gU2VjdGlvbi5jaGlsZHJlbignLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfY29udGVudCcpO1xuXG5cdFx0XHQvLyBnZXQgaWRcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcblxuXHRcdFx0dmFyIHRlbXBIZWlnaHQgPSAwO1xuXG5cdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcblx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KFNlY3Rpb25Db250ZW50LmhlaWdodCgpKTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XG5cblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XG5cdFx0XHRcdFNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGNsYXNzLCBzZXQgaGVpZ2h0IGFuZCBzYXZlIHN0YXRlXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodFxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcblx0XHRcdFx0dGVtcEhlaWdodCA9IFNlY3Rpb25Db250ZW50LmhlaWdodCgpO1xuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoMCk7XG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcblxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcblx0XHRcdFx0U2VjdGlvbi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblx0XHRcdFx0cHJldmlld3N0YXRbaWRdWydjbGllbnQnXSA9IHRydWU7XG5cblx0XHRcdFx0Ly8gYWRkIGV2ZW50IHRyYW5zaXRpb24gZW5kIHRvIG92ZXJmbG93OnZpc2libGUgZm9yIHRvb2x0aXBzIGFuZCBkcm9wZG93bnMgaXNzdWVzXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50Lm9uKHRyYW5zaXRpb25FdmVudCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5yZW1vdmVDbGFzcygnbm9UcmFuc2l0aW9uJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5pbml0ID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgJGhlYWRlciA9ICRlbGVtZW50V3JhcHBlci5maW5kKCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXInKTtcblx0XHRcdGNvbnN0ICRsaW5rcyA9ICRoZWFkZXIuZmluZCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyX19MaW5rc0RpdicpO1xuXG5cdFx0XHQvLyBDcmVhdGUgYXJyYXkgc3RhdFxuXHRcdFx0JCgnLlNlY3Rpb25QcmVzY3JpcHRpb25FeHBhbmRhYmxlQXJlYScpLmVhY2goKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBzdGF0ID0gJGhlYWRlci5oYXNDbGFzcygnZXhwYW5kZWQnKSA/IHRydWUgOiBmYWxzZTtcblx0XHRcdFx0cHJldmlld3N0YXRbd2lkZ2V0SWRdID0geyBjbGllbnQ6IHN0YXQsIHNlcnZlcjogc3RhdCB9O1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICgkaGVhZGVyLmhhc0NsYXNzKCdOb3RFeHBhbmRhYmxlJykpIHtcblx0XHRcdFx0JGhlYWRlci5vbignY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cdFx0XHR9IGVsc2UgaWYgKCRoZWFkZXIuaGFzQ2xhc3MoJ2lzTGlua0VwYW5kYWJsZUNsaWNrJykpIHtcblx0XHRcdFx0JGxpbmtzLm9uKCdjbGljaycsIGUgPT4gY2xpY2tFdmVudHMoJGxpbmtzKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkaGVhZGVyLm9uKCdjbGljaycsIGUgPT4gY2xpY2tFdmVudHMoJGhlYWRlcikpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbGVtZW50cyA9XG5cdFx0XHRcdCcuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgaW5wdXQsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBzZWxlY3QsIC5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2hlYWRlciBhJztcblx0XHRcdCQoZWxlbWVudHMpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoYWpheFJlZnJlc2gpO1xuXHRcdH07XG5cblx0XHRjb25zdCBhamF4UmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xuXHRcdFx0JCgnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyJykub2ZmKCk7XG5cblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXG5cdFx0XHQkKFxuXHRcdFx0XHQnLlByZXNjcmlwdGlvbkV4cGFuZGFibGVfaGVhZGVyIGlucHV0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgc2VsZWN0LCAuUHJlc2NyaXB0aW9uRXhwYW5kYWJsZV9oZWFkZXIgYSdcblx0XHRcdCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcblx0XHRcdCQoJy5TZWN0aW9uUHJlc2NyaXB0aW9uRXhwYW5kYWJsZUFyZWEnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcblx0XHRcdFx0aWYgKHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPT0gbnVsbCkge1xuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcblx0XHRcdFx0XHQvLyBpZiBvcGVuXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBhZGQgcm93XG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblx0XHRcdFx0XHRjdXJTdGF0ZSA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBjaGVjayBpZiBhamF4ICE9IGluaXRpYWwgc2VydmVyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPSBjdXJTdGF0ZTtcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlX2NvbnRlbnQnKVxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gdHJ1ZSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgY3JlYXRlID0gY29uZmlnID0+IHtcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgUHJlc2NyaXB0aW9uRXhwYW5kYWJsZShjb25maWcpO1xuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gV2ViUGF0dGVybnMvQ29udGVudC9TZWN0aW9uRXhwYW5kYWJsZScpO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5QcmVzY3JpcHRpb25FeHBhbmRhYmxlID0geyBjcmVhdGUgfTtcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpO1xuIiwiLyogQ29tcG9uZW50IFNhcHBoaXJlSGVhZGVyICovXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24gKGNvbmZpZykge1xuXHRcdHdpbmRvd1tjb25maWcud2lkZ2V0SWRdID0gbmV3IFNhcHBoaXJlSGVhZGVyKGNvbmZpZyk7XG5cdFx0U2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlSGVhZGVyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xuXHR9O1xuXG5cdHZhciBoYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0d2luZG93W1NhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlci53aWRnZXRJZF0uaGFuZGxlRGVtb2dyYXBoaWNzKCk7XG5cdH07XG5cblx0dmFyIFNhcHBoaXJlSGVhZGVyID0gZnVuY3Rpb24gKGNvbmZpZykge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cdFx0dGhpcy5pc0NvbmZpZGVudGlhbCA9IGNvbmZpZy5pc0NvbmZpZGVudGlhbDtcblx0XHR0aGlzLiR3aWRnZXQgPSAkKCcjJyArIGNvbmZpZy53aWRnZXRJZCk7XG5cdFx0dGhpcy4kd2lkZ2V0LmNzcyh7XG5cdFx0XHRkaXNwbGF5OiAnYmxvY2snXG5cdFx0fSk7XG5cdFx0dGhpcy4kaGVhZGVyID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlcicpO1xuXHRcdHRoaXMuJGRlbW9ncmFwaGljID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKTtcblx0XHR0aGlzLiRpbmZvcm1hdGlvbiA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItaW5mb3JtYXRpb24nKTtcblx0XHR0aGlzLiRhZGRpdGlvbmFsVHJpZ2dlciA9IHRoaXMuJHdpZGdldC5maW5kKCcuU2FwcGhpcmVIZWFkZXItYWRkaXRpb25hbC10cmlnZ2VyJyk7XG5cdFx0dGhpcy4kYWRkaXRpb25hbENvbnRlbnQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNhcHBoaXJlSGVhZGVyLWFkZGl0aW9uYWwtY29udGVudCcpO1xuXHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XG5cdFx0dGhpcy5hdHRhY2hFdmVudHMoKTtcblx0XHQkKGZ1bmN0aW9uICgpIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRfdGhpcy5oYW5kbGVEZW1vZ3JhcGhpY3MoKTtcblx0XHRcdH0sIDUwMCk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWc7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhhbmRsZVJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuXHRcdFx0X3RoaXMuaGFuZGxlRGVtb2dyYXBoaWNzKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMuJGFkZGl0aW9uYWxUcmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChfdGhpcy4kaGVhZGVyLmhhc0NsYXNzKCdpc09wZW4nKSkge1xuXHRcdFx0XHRfdGhpcy4kaGVhZGVyLnJlbW92ZUNsYXNzKCdpc09wZW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF90aGlzLiRoZWFkZXIuYWRkQ2xhc3MoJ2lzT3BlbicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdFNhcHBoaXJlSGVhZGVyLnByb3RvdHlwZS5oYW5kbGVEZW1vZ3JhcGhpY3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHR0aGlzLiRkZW1vZ3JhcGhpYy5maW5kKCcuRGVtb2dyYXBoaWMtaXRlbScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cdFx0dGhpcy4kYWRkaXRpb25hbFRyaWdnZXIuaGlkZSgpO1xuXHRcdHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmVtcHR5KCk7XG5cdFx0dmFyIGRlbW9ncmFwaGljV2lkdGggPSB0aGlzLiRkZW1vZ3JhcGhpYy5vdXRlcldpZHRoKHRydWUpO1xuXHRcdHZhciBpdGVtc1RvdGFsID0gMDtcblx0XHR0aGlzLiRkZW1vZ3JhcGhpYy5maW5kKCcuRGVtb2dyYXBoaWMtaXRlbScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG5cdFx0XHRpdGVtc1RvdGFsICs9IHBhcnNlSW50KCQodGhpcykub3V0ZXJXaWR0aCh0cnVlKSwgMTApO1xuXHRcdFx0aWYgKGl0ZW1zVG90YWwgKyA2MCA8IGRlbW9ncmFwaGljV2lkdGgpIHtcblx0XHRcdFx0JCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKHRoaXMpLmNsb25lKCkuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpLmFwcGVuZFRvKF90aGlzLiRhZGRpdGlvbmFsQ29udGVudCk7XG5cdFx0XHRcdF90aGlzLiRhZGRpdGlvbmFsVHJpZ2dlci5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKHRoaXMuJGFkZGl0aW9uYWxDb250ZW50LmZpbmQoJy5EZW1vZ3JhcGhpYy1pdGVtJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLiRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xuXHRcdH1cblx0fTtcblxuXHRTYXBwaGlyZUhlYWRlci5wcm90b3R5cGUuc2hvd0FkZGl0aW9uYWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJGhlYWRlci5hZGRDbGFzcygnaXNPcGVuJyk7XG5cdH07XG5cblx0U2FwcGhpcmVIZWFkZXIucHJvdG90eXBlLmhpZGVBZGRpdGlvbmFsID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLiRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2lzT3BlbicpO1xuXHR9O1xuXG5cdFNhcHBoaXJlV2lkZ2V0cy5TYXBwaGlyZUhlYWRlciA9IHtcblx0XHRjcmVhdGU6IGNyZWF0ZSxcblx0XHRoYW5kbGVEZW1vZ3JhcGhpY3M6IGhhbmRsZURlbW9ncmFwaGljcyxcblx0fTtcblxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xuXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XG5cdGlmICghISQoJy5TYXBwaGlyZUhlYWRlci1kZW1vZ3JhcGhpY3MnKS5sZW5ndGgpIHtcblx0XHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvd1tTYXBwaGlyZVdpZGdldHMuU2FwcGhpcmVIZWFkZXIud2lkZ2V0SWRdLmhhbmRsZURlbW9ncmFwaGljcygpO1xuXHRcdH0pO1xuXHR9XG59KTsiLCIvKiBDb21wb25lbnQgU2FwcGhpcmVSYWRpb0J1dHRvbiAqL1xuU2FwcGhpcmVXaWRnZXRzLlNhcHBoaXJlUmFkaW9CdXR0b24gPSB3aWRnZXRJZCA9PiB7XG5cdHZhciAkd2lkZ2V0ID0gJCgnIycgKyB3aWRnZXRJZCk7XG5cdHZhciAkY29udHJvbCA9ICR3aWRnZXQuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XG5cdHZhciBuYW1lID0gJGNvbnRyb2wucHJvcCgnbmFtZScpO1xuXG5cdCRjb250cm9sLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdCR3aWRnZXQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdCQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXVtuYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LmNsb3Nlc3QoJy5CdXR0b25SYWRpb0lucCcpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSk7XG5cdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcblx0XHRcdCR3aWRnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkd2lkZ2V0LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHR9XG5cdH0pO1xuXG5cdCR3aWRnZXQuZmluZCgnLkJ1dHRvblJhZGlvSW5wX3JhZGlvVGV4dCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdGlmIChcblx0XHRcdCQodGhpcylcblx0XHRcdFx0LmNsb3Nlc3QoJy5CdXR0b25SYWRpb0lucCcpXG5cdFx0XHRcdC5oYXNDbGFzcygnZGlzYWJsZWQnKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHQkY29udHJvbC50cmlnZ2VyKCdjbGljaycpO1xuXHRcdCRjb250cm9sLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0aWYgKCRjb250cm9sLmlzKCc6Y2hlY2tlZCcpKSB7XG5cdFx0XHQkd2lkZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JHdpZGdldC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fVxuXHR9KTtcbn07XG4iLCIvKiBDb21wb25lbnQgU2VjdGlvbkV4cGFuZGFibGUgKi9cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cykge1xyXG5cclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUN1c3RvbSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRpZiAoJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU4JykgfHwgJCgnLlBhZ2UnKS5oYXNDbGFzcygnaWU5JykpIHtcclxuXHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmIChTZWN0aW9uLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudC5hZGRDbGFzcygnbm9UcmFuc2l0aW9uJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgnYXV0bycpO1xyXG5cdFx0XHRcdFx0XHRTZWN0aW9uQ29udGVudFswXS5vZmZzZXRIZWlnaHQ7IC8vIGhhY2sgdG8gZm9yY2UgYSByZXBhaW50XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFqYXggcmVmcmVzIGZ1bmN0aW9uXHJcblx0XHR0aGF0LmFqYXhSZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyByZW1vdmUgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoKTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gc2VsZWN0LCAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIGEnKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgbmV3IGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdC8vIGlmIG5ldyBTZWN0aW9uRXhwYW5kYWJsZSB0aGVuIGFkZCB0byBwcmV2aWV3c3RhdCBhcnJheVxyXG5cdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIGFkZCBzdGF0IG9uIGFycmF5XHJcblx0XHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0Ly8gaWYgb3BlblxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0c3RhdCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBhZGQgcm93XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldID0ge1xyXG5cdFx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRcdHNlcnZlcjogc3RhdCxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBjdXJlbnQgc3RhdGUgKGFqYXggc3RhdGUgeCBpbml0aWFsIHN0YXRlKVxyXG5cdFx0XHRcdHZhciBjdXJTdGF0ZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBjaGVjayBpZiBzdGFydCBleHBhbmRhYmxlXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdGN1clN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIGFqYXggIT0gaW5pdGlhbCBzZXJ2ZXJcclxuXHRcdFx0XHRpZiAoY3VyU3RhdGUgIT0gcHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10pIHtcclxuXHRcdFx0XHRcdC8vIGN1cnN0YXRlXHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnc2VydmVyJ10gPSBjdXJTdGF0ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gaGFzIGNsYXNzIGV4cGFuZGVkXHJcblx0XHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gZmFsc2UgJiYgJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCcpXHJcblx0XHRcdFx0XHRcdFx0LmhlaWdodCgwKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXVsnY2xpZW50J10gPT0gdHJ1ZSAmJiAhJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIHNldCBldmVudHNcclxuXHRcdHRoYXQuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnMgdG8gY3JlYXRlIGFycmF5IHN0YXRcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7XHJcblx0XHRcdFx0XHRjbGllbnQ6IHN0YXQsXHJcblx0XHRcdFx0XHRzZXJ2ZXI6IHN0YXQsXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ0hpZGVXaGVuRW1wdHknKSAmJiAkKHRoaXMpLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZUN1c3RvbV9jb250ZW50JykudGV4dCgpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBoYWNrIHRvIGRpc3BsYXkgYSBtZXNzYWdlIHdoZW4gU2VjdGlvbkV4cGFuZGFibGVDdXN0b20gaGFzIG5vIGNoaWxkIGl0ZW1zXHJcblx0XHRcdFx0dmFyIGlzRW1wdHkgPSB0cnVlO1xyXG5cdFx0XHRcdCQodGhpcykuZmluZCgnLlNlY3Rpb25FeHBhbmRhYmxlQ3VzdG9tX2NvbnRlbnQgZGl2LCAuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudCBzcGFuJykubm90KCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLnRleHQoKS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGlzRW1wdHkgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGlmICghaXNFbXB0eSkge1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGVDdXN0b21fY29udGVudC0tZW1wdHknKS5jc3Moe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnbm9uZScsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblx0XHRcdFx0dmFyICRleHBhbmRhYmxlSW5zdGFuY2UgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHZhciAkdG9nZ2xlciA9ICQodGhpcykuZmluZCgnPiAuU2VjdGlvbkV4cGFuZGFibGVfaGVhZGVyQ3VzdG9tIC5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVyJyk7XHJcblx0XHRcdFx0aWYgKCR0b2dnbGVyLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0dmFyICR0b2dnbGVyU3RhdGUgPSBmYWxzZTtcclxuXHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0JHRvZ2dsZXIub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHQkdG9nZ2xlclN0YXRlID0gISR0b2dnbGVyU3RhdGU7XHJcblx0XHRcdFx0XHRcdGlmICgkdG9nZ2xlclN0YXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0JGV4cGFuZGFibGVJbnN0YW5jZS5maW5kKCcuU2VjdGlvbkV4cGFuZGFibGUtdG9nZ2xlZCcpLnNob3coKTtcclxuXHRcdFx0XHRcdFx0XHQkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHZhbHVlXScpLnRleHQoJHRvZ2dsZXIuZmluZCgnW2RhdGEtbGFiZWxoaWRlXScpLmRhdGEoJ2xhYmVsaGlkZScpKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQkZXhwYW5kYWJsZUluc3RhbmNlLmZpbmQoJy5TZWN0aW9uRXhwYW5kYWJsZS10b2dnbGVkJykuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHRcdCR0b2dnbGVyLmZpbmQoJ1tkYXRhLWxhYmVsdmFsdWVdJykudGV4dCgkdG9nZ2xlci5maW5kKCdbZGF0YS1sYWJlbHNob3ddJykuZGF0YSgnbGFiZWxzaG93JykpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBhZGQgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20nKS5vZmYoXCJjbGlja1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBpbnB1dCwgLlNlY3Rpb25FeHBhbmRhYmxlX2hlYWRlckN1c3RvbSBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZV9oZWFkZXJDdXN0b20gYScpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGV2ZW50IGFqYXhcclxuXHRcdFx0b3NBamF4QmFja2VuZC5CaW5kQWZ0ZXJBamF4UmVxdWVzdCh0aGF0LmFqYXhSZWZyZXNoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRjb25zdCBjcmVhdGUgPSAoKSA9PiB7XHJcblx0XHRTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUgPSBuZXcgU2VjdGlvbkV4cGFuZGFibGVDdXN0b20oKTtcclxuXHRcdFNpbGtVSS5FeGVjdXRlKFNpbGtVSS5TZWN0aW9uRXhwYW5kYWJsZS5pbml0LCAnRXJyb3Igb24gU2lsa1VJRnJhbWV3b3JrL0NvbnRlbnQvU2VjdGlvbkV4cGFuZGFibGUnKTtcclxuXHR9O1xyXG5cclxuXHRTYXBwaGlyZVdpZGdldHMuU2VjdGlvbkV4cGFuZGFibGUgPSB7XHJcblx0XHRjcmVhdGUsXHJcblx0fTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpOyIsIi8qIENvbXBvbmVudCBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAqL1xyXG4oZnVuY3Rpb24oJCwgd2luZG93LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHRmdW5jdGlvbiBTZWN0aW9uRXhwYW5kYWJsZUluc2lkZSgpIHtcclxuXHRcdHZhciB0aGF0ID0gdGhpcztcclxuXHJcblx0XHQvLyBPYmplY3QgdG8gc2F2ZSBzdGF0c1xyXG5cdFx0dmFyIHByZXZpZXdzdGF0ID0gW107XHJcblxyXG5cdFx0dmFyIHRyYW5zaXRpb25FdmVudCA9IFNpbGtVSS53aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdFx0Ly8gc2V0IGNsaWNrIGV2ZW50c1xyXG5cdFx0ZnVuY3Rpb24gY2xpY2tFdmVudHMob2IpIHtcclxuXHRcdFx0Ly8gc3RvcmUgcXVlcnlzIGluIGEgc2luZ2xlIHZhclxyXG5cdFx0XHR2YXIgU2VjdGlvbiA9ICQob2IpLnBhcmVudCgpO1xyXG5cdFx0XHR2YXIgU2VjdGlvbkNvbnRlbnQgPSBTZWN0aW9uLmNoaWxkcmVuKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfY29udGVudCcpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGlkXHJcblx0XHRcdHZhciBpZCA9IFNlY3Rpb24uYXR0cignaWQnKTtcclxuXHJcblx0XHRcdHZhciB0ZW1wSGVpZ2h0ID0gMDtcclxuXHJcblx0XHRcdC8vIGhhcyBjbGFzcyBleHBhbmRlZFxyXG5cdFx0XHRpZiAoU2VjdGlvbi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdC8vIENhbGMgYW5kIHNldCBhIGZpeGVkIGhlaWdodCwgZHVyaW5nIHRoaXMgcHJvY2VzcywgdHJhbnNpdGlvbnMgYXJlIGRpc2FibGVkXHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuYWRkQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodChTZWN0aW9uQ29udGVudC5oZWlnaHQoKSk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnRbMF0ub2Zmc2V0SGVpZ2h0OyAvLyBoYWNrIHRvIGZvcmNlIGEgcmVwYWludFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LnJlbW92ZUNsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ29sbGFwc2UgY29udGVudFxyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCgwKTtcclxuXHRcdFx0XHRTZWN0aW9uLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBjbGFzcywgc2V0IGhlaWdodCBhbmQgc2F2ZSBzdGF0ZVxyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBDYWxjIGFuZCBzZXQgYSBmaXhlZCBoZWlnaHRcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5oZWlnaHQoJ2F1dG8nKTtcclxuXHRcdFx0XHR0ZW1wSGVpZ2h0ID0gU2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCk7XHJcblx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFNlY3Rpb25Db250ZW50LmhlaWdodCh0ZW1wSGVpZ2h0KTtcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgY2xhc3MsIHNldCBoZWlnaHQgYW5kIHNhdmUgc3RhdGVcclxuXHRcdFx0XHRTZWN0aW9uLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0W2lkXVsnY2xpZW50J10gPSB0cnVlO1xyXG5cclxuXHRcdFx0XHQvLyBhZGQgZXZlbnQgdHJhbnNpdGlvbiBlbmQgdG8gb3ZlcmZsb3c6dmlzaWJsZSBmb3IgdG9vbHRpcHMgYW5kIGRyb3Bkb3ducyBpc3N1ZXNcclxuXHRcdFx0XHRTZWN0aW9uQ29udGVudC5vbih0cmFuc2l0aW9uRXZlbnQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKFNlY3Rpb24uaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuY3NzKCdvdmVyZmxvdycsICd2aXNpYmxlJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50LmFkZENsYXNzKCdub1RyYW5zaXRpb24nKTtcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQuaGVpZ2h0KCdhdXRvJyk7XHJcblx0XHRcdFx0XHRcdFNlY3Rpb25Db250ZW50WzBdLm9mZnNldEhlaWdodDsgLy8gaGFjayB0byBmb3JjZSBhIHJlcGFpbnRcclxuXHRcdFx0XHRcdFx0U2VjdGlvbkNvbnRlbnQucmVtb3ZlQ2xhc3MoJ25vVHJhbnNpdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWpheCByZWZyZXMgZnVuY3Rpb25cclxuXHRcdHRoYXQuYWpheFJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gcmVtb3ZlIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpLm9mZigpO1xyXG5cclxuXHRcdFx0Ly8gYWRkIHN0b3AgcHJlcGFnYXRpb25cclxuXHRcdFx0JChcclxuXHRcdFx0XHQnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgaW5wdXQsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIHNlbGVjdCwgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9oZWFkZXIgYSdcclxuXHRcdFx0KS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBuZXcgY2xpY2sgZXZlbnRzXHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2xpY2tFdmVudHModGhpcyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gZWFjaCBhbGwgc2VjdGlvbnNcclxuXHRcdFx0JCgnLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBpZiBuZXcgU2VjdGlvbkV4cGFuZGFibGUgdGhlbiBhZGQgdG8gcHJldmlld3N0YXQgYXJyYXlcclxuXHRcdFx0XHRpZiAocHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9PSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyBhZGQgc3RhdCBvbiBhcnJheVxyXG5cdFx0XHRcdFx0dmFyIHN0YXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdC8vIGlmIG9wZW5cclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdFx0cHJldmlld3N0YXRbJCh0aGlzKS5hdHRyKCdpZCcpXSA9IHsgY2xpZW50OiBzdGF0LCBzZXJ2ZXI6IHN0YXQgfTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGN1cmVudCBzdGF0ZSAoYWpheCBzdGF0ZSB4IGluaXRpYWwgc3RhdGUpXHJcblx0XHRcdFx0dmFyIGN1clN0YXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIHN0YXJ0IGV4cGFuZGFibGVcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xyXG5cdFx0XHRcdFx0Y3VyU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgYWpheCAhPSBpbml0aWFsIHNlcnZlclxyXG5cdFx0XHRcdGlmIChjdXJTdGF0ZSAhPSBwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc3RhdGVcclxuXHRcdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV1bJ2NsaWVudCddID0gY3VyU3RhdGU7XHJcblx0XHRcdFx0XHRwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydzZXJ2ZXInXSA9IGN1clN0YXRlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBoYXMgY2xhc3MgZXhwYW5kZWRcclxuXHRcdFx0XHRcdGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSBmYWxzZSAmJiAkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZV9jb250ZW50JylcclxuXHRcdFx0XHRcdFx0XHQuaGVpZ2h0KDApO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwcmV2aWV3c3RhdFskKHRoaXMpLmF0dHIoJ2lkJyldWydjbGllbnQnXSA9PSB0cnVlICYmICEkKHRoaXMpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gc2V0IGV2ZW50c1xyXG5cdFx0dGhhdC5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIGVhY2ggYWxsIHNlY3Rpb25zIHRvIGNyZWF0ZSBhcnJheSBzdGF0XHJcblx0XHRcdCQoJy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gYWRkIHN0YXQgb24gYXJyYXlcclxuXHRcdFx0XHR2YXIgc3RhdCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBpZiBvcGVuXHJcblx0XHRcdFx0aWYgKCQodGhpcykuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuXHRcdFx0XHRcdHN0YXQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gYWRkIHJvd1xyXG5cdFx0XHRcdHByZXZpZXdzdGF0WyQodGhpcykuYXR0cignaWQnKV0gPSB7IGNsaWVudDogc3RhdCwgc2VydmVyOiBzdGF0IH07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gYWRkIGNsaWNrIGV2ZW50c1xyXG5cdFx0XHQkKCcuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlcicpLm9mZihcImNsaWNrXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNsaWNrRXZlbnRzKHRoaXMpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFkZCBzdG9wIHByZXBhZ2F0aW9uXHJcblx0XHRcdCQoXHJcblx0XHRcdFx0Jy5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIGlucHV0LCAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGUgLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlX2hlYWRlciBzZWxlY3QsIC5TZWN0aW9uRXhwYW5kYWJsZUluc2lkZSAuU2VjdGlvbkV4cGFuZGFibGVJbnNpZGVfaGVhZGVyIGEnXHJcblx0XHRcdCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBldmVudCBhamF4XHJcblx0XHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QodGhhdC5hamF4UmVmcmVzaCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Y29uc3Qgc2V0T3BlbkNsb3NlQ2xhc3MgPSBpZCA9PiB7XHJcblx0XHRpZC5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGlkLnBhcmVudCgpLmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XHJcblx0XHRcdFx0JCh0aGlzKVxyXG5cdFx0XHRcdFx0LmZpbmQoJy5IZWFkZXJJY29uJylcclxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuSGVhZGVySWNvbicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2Nsb3NlZCcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuSGVhZGVySWNvbicpXHJcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2Nsb3NlZCcpO1xyXG5cdFx0XHRcdCQodGhpcylcclxuXHRcdFx0XHRcdC5maW5kKCcuSGVhZGVySWNvbicpXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ29wZW4nKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Y29uc3QgY3JlYXRlID0gKCkgPT4ge1xyXG5cdFx0U2lsa1VJLlNlY3Rpb25FeHBhbmRhYmxlID0gbmV3IFNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlKCk7XHJcblx0XHRTaWxrVUkuRXhlY3V0ZShTaWxrVUkuU2VjdGlvbkV4cGFuZGFibGUuaW5pdCwgJ0Vycm9yIG9uIFNpbGtVSUZyYW1ld29yay9Db250ZW50L1NlY3Rpb25FeHBhbmRhYmxlJyk7XHJcblx0fTtcclxuXHJcblx0U2FwcGhpcmVXaWRnZXRzLlNlY3Rpb25FeHBhbmRhYmxlSW5zaWRlID0ge1xyXG5cdFx0Y3JlYXRlLFxyXG5cdFx0c2V0T3BlbkNsb3NlQ2xhc3MsXHJcblx0fTtcclxufSkoalF1ZXJ5LCB3aW5kb3csIFNhcHBoaXJlV2lkZ2V0cyk7XHJcbiIsIi8qIENvbXBvbmVudCBTZWxlY3RTeXN0ZW0gKi9cclxuU2FwcGhpcmVXaWRnZXRzLlNlbGVjdFN5c3RlbSA9IGNvbmZpZyA9PiB7XHJcblx0JChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgV2lkZ2V0SWQgPSBjb25maWcuV2lkZ2V0SWQ7IC8vQ29tYm8gQm94IElkIHRvIGJlIHVzZWQuXHJcblx0XHR2YXIgQ2xhc3MgPSBjb25maWcuQ2xhc3M7IC8vQWxsIENvbWJvIGJveGVzIHdpdGggdGhpcyBjbGFzcyB3aWxsIGJlIGJlIHRyYW5zZm9ybWVkLlxyXG5cdFx0dmFyIE5vUmVzdWx0c1RleHQgPSBjb25maWcuTm9SZXN1bHRzVGV4dDsgLy9UZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGVyZSBhcmUgbm8gcmVzdWx0cy5cclxuXHRcdHZhciBpbnB1dFR5cGUgPSBjb25maWcuSW5wdVR5cGU7IC8vT3B0aW9uczogRklsdGVycywgRHJvcGRvd24sIFNlbGVjdDJcclxuXHRcdHZhciBQcm9tcHQgPSBjb25maWcuUHJvbXB0OyAvL1Byb21wdCBpbiBzZWFyY2hcclxuXHRcdHZhciBTZWxlY3QyVHlwZSA9IGNvbmZpZy5TZWxlY3RUeXBlOyAvLyBUeXBlIG9mIHNlbGVjdDIgY29uZmlndXJhdGlvblxyXG5cdFx0dmFyIEhhc1NlYXJjaCA9IGNvbmZpZy5IYXNTZWFyY2g7IC8vIGhhcyBzZWFyY2hcclxuXHRcdHZhciBPblNlbGVjdGluZ0pTID0gY29uZmlnLk9uU2VsZWN0aW5nSlM7XHJcblx0XHR2YXIgT25VblNlbGVjdGluZ0pTID0gY29uZmlnLk9uVW5TZWxlY3RpbmdKUztcclxuXHRcdHZhciBNYXhpbXVtTGVuZ3RoID0gY29uZmlnLk1heGltdW1MZW5ndGg7XHJcblx0XHR2YXIgU2VsZWN0ZWRWYWx1ZSA9IGNvbmZpZy5TZWxlY3RlZFZhbHVlO1xyXG5cdFx0dmFyIGFsbG93Q2xlYXIgPSBjb25maWcuYWxsb3dDbGVhcjtcclxuXHRcdC8vICBTZWxlY3QyIEFqYXggQ29uZmlndXJhdGlvblxyXG5cdFx0dmFyIEFqYXhVUkwgPSBjb25maWcuQWpheFVSTDtcclxuXHRcdHZhciBBamF4RGVsYXkgPSBjb25maWcuQWpheERlbGF5O1xyXG5cdFx0dmFyIFBhZ2luYXRpb25TaXplID0gY29uZmlnLlBhZ2luYXRpb25TaXplO1xyXG5cdFx0dmFyIE1pbmltdW1JbnB1dExlbmdodCA9IGNvbmZpZy5NaW5pbXVtSW5wdXRMZW5naHQ7XHJcblx0XHR2YXIgU2VhcmNoVGVybSA9IGNvbmZpZy5TZWFyY2hUZXJtO1xyXG5cdFx0dmFyIFNlYXJjaEV4dHJhUGFyYW0xID0gY29uZmlnLlNlYXJjaEV4dHJhUGFyYW0xO1xyXG5cdFx0dmFyIFBhZ2VUZXJtID0gY29uZmlnLlBhZ2VUZXJtO1xyXG5cdFx0dmFyIEFtb3VudFBhZ2UgPSBjb25maWcuUGFnZUFtb3VudDtcclxuXHRcdHZhciBpc011bHRpcGxlID0gY29uZmlnLmlzTXVsdGlwbGU7XHJcblx0XHR2YXIgU2VsZWN0Mk9wdGlvbnMgPSB7fTtcclxuXHRcdHZhciAkV2lkZ2V0SWRlbnRpZmllcjtcclxuXHJcblx0XHQvKiAgXHJcbiAgICAgICAgICBDaGFuZ2Ugc2VsZWN0MiBzZWFyY2ggZGlzcGxheSBcclxuICAgICAgICAgICAgICAtTXVsdGlwbGUgU2VsZWN0MiBzZWFyY2ggVUkgbGlrZSBTaW5nbGUgU2VsZWN0MlxyXG4gICAgICAqL1xyXG5cdFx0JC5mbi5zZWxlY3QyLmFtZC5kZWZpbmUoXHJcblx0XHRcdCdTZWFyY2hMaWtlU2luZ2xlJyxcclxuXHRcdFx0W1xyXG5cdFx0XHRcdCdzZWxlY3QyL3V0aWxzJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bicsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQm9keScsXHJcblx0XHRcdFx0J3NlbGVjdDIvZHJvcGRvd24vYXR0YWNoQ29udGFpbmVyJyxcclxuXHRcdFx0XHQnc2VsZWN0Mi9kcm9wZG93bi9zZWFyY2gnLFxyXG5cdFx0XHRcdCdzZWxlY3QyL2Ryb3Bkb3duL21pbmltdW1SZXN1bHRzRm9yU2VhcmNoJyxcclxuXHRcdFx0XSxcclxuXHRcdFx0ZnVuY3Rpb24gKFV0aWxzLCBEcm9wZG93biwgQXR0YWNoQm9keSwgQXR0YWNoQ29udGFpbmVyLCBTZWFyY2gsIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoKSB7XHJcblx0XHRcdFx0bGV0IGRyb3Bkb3duU2VhcmNoID0gVXRpbHMuRGVjb3JhdGUoRHJvcGRvd24sIFNlYXJjaCk7XHJcblx0XHRcdFx0ZHJvcGRvd25TZWFyY2gucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHZhciAkcmVuZGVyZWQgPSBEcm9wZG93bi5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0XHQvLyBBZGQgYWJpbGl0eSBmb3IgYSBwbGFjZWhvbGRlciBpbiB0aGUgc2VhcmNoIGJveFxyXG5cdFx0XHRcdFx0bGV0IHBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLmdldCgncGxhY2Vob2xkZXJGb3JTZWFyY2gnKSB8fCAnJztcclxuXHRcdFx0XHRcdHZhciAkc2VhcmNoID0gJChcclxuXHRcdFx0XHRcdFx0JzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2ggc2VsZWN0Mi1zZWFyY2gtLWRyb3Bkb3duXCI+JyArXHJcblx0XHRcdFx0XHRcdCc8aW5wdXQgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaF9fZmllbGRcIiBwbGFjZWhvbGRlcj1cIicgK1xyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlciArXHJcblx0XHRcdFx0XHRcdCdcIiB0eXBlPVwic2VhcmNoXCInICtcclxuXHRcdFx0XHRcdFx0JyB0YWJpbmRleD1cIi0xXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBhdXRvY2FwaXRhbGl6ZT1cIm9mZlwiJyArXHJcblx0XHRcdFx0XHRcdCcgc3BlbGxjaGVjaz1cImZhbHNlXCIgcm9sZT1cInRleHRib3hcIiAvPicgK1xyXG5cdFx0XHRcdFx0XHQnPC9zcGFuPidcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy4kc2VhcmNoQ29udGFpbmVyID0gJHNlYXJjaDtcclxuXHRcdFx0XHRcdHRoaXMuJHNlYXJjaCA9ICRzZWFyY2guZmluZCgnaW5wdXQnKTtcclxuXHRcdFx0XHRcdCRzZWFyY2guYWRkQ2xhc3MoJ011bHRpcGxlU2VsZWN0Jyk7XHJcblxyXG5cdFx0XHRcdFx0JHJlbmRlcmVkLnByZXBlbmQoJHNlYXJjaCk7XHJcblx0XHRcdFx0XHQkc2VhcmNoLnBhcmVudCgpLmFkZENsYXNzKCdNdWx0aXBsZVNlbGVjdCcpO1xyXG5cdFx0XHRcdFx0cmV0dXJuICRyZW5kZXJlZDtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBEZWNvcmF0ZSB0aGUgZHJvcGRvd24rc2VhcmNoIHdpdGggdGhlIGNvbnRhaW5lcnNcclxuXHRcdFx0XHRsZXQgYWRhcHRlciA9IFV0aWxzLkRlY29yYXRlKGRyb3Bkb3duU2VhcmNoLCBBdHRhY2hDb250YWluZXIpO1xyXG5cdFx0XHRcdGFkYXB0ZXIgPSBVdGlscy5EZWNvcmF0ZShhZGFwdGVyLCBBdHRhY2hCb2R5KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGFkYXB0ZXI7XHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZWZhdWx0IENvbmZpZ3VyYXRpb24gbmVlZGVkIHRvIGFzc29jaWF0ZSB0aGUgd2lkZ2V0IHRvIHRoZSBzZWxlY3QyIHBsdWdpblxyXG5cdFx0ICovXHJcblx0XHRpZiAoV2lkZ2V0SWQgPT09ICcnICYmIENsYXNzICE9ICcnKSB7XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyID0gJCgnLicgKyBDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkV2lkZ2V0SWRlbnRpZmllciA9ICQoJyMnICsgV2lkZ2V0SWQpO1xyXG5cdFx0fVxyXG5cdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnc2VsZWN0LWhpZGUgJyArIGlucHV0VHlwZTtcclxuXHJcblx0XHQvLyAgU2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25QYXJlbnQ9ICQoJyMnK1BhcmVudERpdik7XHJcblxyXG5cdFx0dmFyIGZvcm1hdFJlc3VsdCA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0dmFyICRzZWxlY3RlZE9wdGlvbnNWYWx1ZSA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJzpzZWxlY3RlZCcpO1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gJHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmxlbmd0aDtcclxuXHRcdFx0dmFyIHRvdGFsT3B0aW9ucyA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbicpLmxlbmd0aDtcclxuXHRcdFx0dmFyIHNlbGVjdEFsbE9wdCA9ICRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZDpzZWxlY3RlZCcpLmxlbmd0aDtcclxuXHRcdFx0dmFyIGFjdGl2ZVZhbHVlcyA9ICcnO1xyXG5cdFx0XHR2YXIgYWxsT3B0RXhjZXB0QWxsID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnOnNlbGVjdGVkOm5vdChcIi5TZWxlY3RlZEFsbFwiKScpLmxlbmd0aDtcclxuXHRcdFx0dmFyICRhbGxPcHRFeGNlcHRBbGxPYmogPSAkV2lkZ2V0SWRlbnRpZmllci5maW5kKCc6c2VsZWN0ZWQ6bm90KFwiLlNlbGVjdGVkQWxsXCIpJyk7XHJcblxyXG5cdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID09PSB0b3RhbE9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAodG90YWxPcHRpb25zIC0gMSA+IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiAnQWxsIFNlbGVjdGVkJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JGFsbE9wdEV4Y2VwdEFsbE9iai5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0YWN0aXZlVmFsdWVzID0gYWN0aXZlVmFsdWVzICsgJyAnICsgJCh0aGlzKVswXS5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGFjdGl2ZVZhbHVlcyA9IGFjdGl2ZVZhbHVlcy5yZXBsYWNlKC8sXFxzKiQvLCAnJyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gYWN0aXZlVmFsdWVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgdG90YWxvcHQgPSB0b3RhbE9wdGlvbnMgLSAxO1xyXG5cdFx0XHRcdGlmIChzZWxlY3RlZE9wdGlvbnMgPiAzKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2VsZWN0ZWRPcHRpb25zICsgJyBvZiAnICsgdG90YWxvcHQgKyAnIHNlbGVjdGVkJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKHNlbGVjdGVkT3B0aW9ucyA+IDApIHtcclxuXHRcdFx0XHRcdFx0JHNlbGVjdGVkT3B0aW9uc1ZhbHVlLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdGFjdGl2ZVZhbHVlcyA9IGFjdGl2ZVZhbHVlcyArICcgJyArICQodGhpcylbMF0uaW5uZXJUZXh0ICsgJywgJztcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZVZhbHVlcyA9IGFjdGl2ZVZhbHVlcy5yZXBsYWNlKC8sXFxzKiQvLCAnJyk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBhY3RpdmVWYWx1ZXM7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJ1NlbGVjdCBhbiBvcHRpb24nO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoTm9SZXN1bHRzVGV4dCAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5mb3JtYXROb01hdGNoZXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIE5vUmVzdWx0c1RleHQ7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlucHV0VHlwZSAhPSAnJykge1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gaW5wdXRUeXBlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhbGxvd0NsZWFyID09PSAnVHJ1ZScpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuYWxsb3dDbGVhciA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE1heGltdW1MZW5ndGggIT0gJycpIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMubWF4aW11bUlucHV0TGVuZ3RoID0gTWF4aW11bUxlbmd0aDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoUHJvbXB0ICE9ICcnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnBsYWNlaG9sZGVyID0gUHJvbXB0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMucGxhY2Vob2xkZXIgPSB7XHJcblx0XHRcdFx0aWQ6ICctMScsIC8vIHRoZSB2YWx1ZSBvZiB0aGUgb3B0aW9uXHJcblx0XHRcdFx0dGV4dDogJ1NlbGVjdCBhbiBvcHRpb24nLFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzMnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgQWpheFxyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cdFx0XHQvKiBTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcz0nOmFsbCc7Ki9cclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmFsbG93Q2xlYXIgPSBmYWxzZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGVtcGxhdGVTZWxlY3Rpb24gPSBmdW5jdGlvbiAocmVwbykge1xyXG5cdFx0XHRcdHJldHVybiByZXBvLmZ1bGxfbmFtZSB8fCByZXBvLnRleHQ7XHJcblx0XHRcdH07XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLnRlbXBsYXRlUmVzdWx0ID0gZnVuY3Rpb24gKHJlcG8pIHtcclxuXHRcdFx0XHRpZiAocmVwby5sb2FkaW5nKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVwby50ZXh0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgbWFya3VwID0gJzxkaXYgY2xhc3M9XCJcIkNsZWFyZml4XCJcIj4nICsgJzxkaXYgY2xhc3M9XCJcIlRoZW1lR3JpZF9XaWR0aDEyXCJcIj4nICsgcmVwby50ZXh0ICsgJzwvZGl2Pic7XHJcblx0XHRcdFx0aWYgKHJlcG8uZGVzY3JpcHRpb24pIHtcclxuXHRcdFx0XHRcdG1hcmt1cCArPSAnPGRpdiBjbGFzcz1cIlwiT1NBdXRvTWFyZ2luVG9wXCJcIj4nICsgcmVwby5kZXNjcmlwdGlvbiArICc8L2Rpdj4nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtYXJrdXAgKz0gJzwvZGl2Pic7XHJcblx0XHRcdFx0cmV0dXJuIG1hcmt1cDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdChTZWxlY3QyT3B0aW9ucy5hamF4ID0ge1xyXG5cdFx0XHRcdHVybDogQWpheFVSTCxcclxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxyXG5cdFx0XHRcdGRlbGF5OiBBamF4RGVsYXksXHJcblx0XHRcdFx0ZGF0YTogZnVuY3Rpb24gKHBhcmFtcykge1xyXG5cdFx0XHRcdFx0dmFyIFNlbGVjdDJBamF4T3B0ID0ge307XHJcblx0XHRcdFx0XHR2YXIgU3BsaXRQYXJhbWV0ZXIgPSBTZWFyY2hFeHRyYVBhcmFtMS5zcGxpdCgnLCcpO1xyXG5cdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHQuU2VhcmNoVGVybSA9IHBhcmFtcy50ZXJtO1xyXG5cdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHQuUGFnZSA9IHBhcmFtcy5wYWdlIHx8IDE7XHJcblx0XHRcdFx0XHRTZWxlY3QyQWpheE9wdC5QYWdlQW1vdW50ID0gQW1vdW50UGFnZTtcclxuXHJcblx0XHRcdFx0XHRTcGxpdFBhcmFtZXRlci5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgc3BsaXRUZXh0ID0gZWwuc3BsaXQoJzonKTtcclxuXHRcdFx0XHRcdFx0U2VsZWN0MkFqYXhPcHRbc3BsaXRUZXh0WzBdXSA9IHNwbGl0VGV4dFsxXTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBTZWxlY3QyQWpheE9wdDtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbiAoZGF0YSwgcGFyYW1zKSB7XHJcblx0XHRcdFx0XHRwYXJhbXMucGFnZSA9IHBhcmFtcy5wYWdlIHx8IDE7XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHRzOiBkYXRhLml0ZW1zLFxyXG5cdFx0XHRcdFx0XHRwYWdpbmF0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0bW9yZTogcGFyYW1zLnBhZ2UgKiBQYWdpbmF0aW9uU2l6ZSA8IGRhdGEudG90YWxfY291bnQsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2FjaGU6IHRydWUsXHJcblx0XHRcdH0pLFxyXG5cdFx0XHQoU2VsZWN0Mk9wdGlvbnMubWluaW11bUlucHV0TGVuZ3RoID0gTWluaW11bUlucHV0TGVuZ2h0KTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZXNjYXBlTWFya3VwID0gZnVuY3Rpb24gKG1hcmt1cCkge1xyXG5cdFx0XHRcdHJldHVybiBtYXJrdXA7XHJcblx0XHRcdH07XHJcblx0XHRcdGlmIChjb25maWcuaXNNdWx0aXBsZSkge1xyXG5cdFx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCBNdWx0aXBsZSc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubXVsdGlwbGUgPSBmYWxzZTtcclxuXHRcdFx0XHRTZWxlY3QyT3B0aW9ucy5jb250YWluZXJDc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdTZWxlY3QyQWpheCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gMDtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNsb3NlT25zZWxlY3QgPSB0cnVlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5wbGFjZWhvbGRlciA9IFByb21wdDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICcyJykge1xyXG5cdFx0XHQvL1NlbGVjdDIgd2l0aCBDaGVja0JveFxyXG5cclxuXHRcdFx0dmFyIGlzQWxsU2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0aWYgKCRXaWRnZXRJZGVudGlmaWVyWzBdLm9wdGlvbnMubGVuZ3RoID09PSAkV2lkZ2V0SWRlbnRpZmllclswXS5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoKSB7XHJcblx0XHRcdFx0aXNBbGxTZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChXaWRnZXRJZCAhPSAnJykge1xyXG5cdFx0XHRcdG9wdGlvbiA9IG5ldyBPcHRpb24oJ1NlbGVjdCBBbGwnLCAnQWxsJywgdHJ1ZSwgaXNBbGxTZWxlY3RlZCk7XHJcblx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIucHJlcGVuZChvcHRpb24pO1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLmZpbmQoJ29wdGlvbjpmaXJzdC1jaGlsZCcpLmFkZENsYXNzKCdTZWxlY3RlZEFsbCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm11bHRpcGxlID0gdHJ1ZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY2xvc2VPblNlbGVjdCA9IGZhbHNlO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5hbGxvd0h0bWwgPSBmYWxzZTtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKEhhc1NlYXJjaCA9PT0gJ1RydWUnKSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25BZGFwdGVyID0gJC5mbi5zZWxlY3QyLmFtZC5yZXF1aXJlKCdTZWFyY2hMaWtlU2luZ2xlJyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0U2VsZWN0Mk9wdGlvbnMubWluaW11bVJlc3VsdHNGb3JTZWFyY2ggPSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnTXVsdGlwbGVTZWxlY3QnO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5kcm9wZG93bkNzc0NsYXNzID0gJ011bHRpcGxlU2VsZWN0JztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGVtcGxhdGVTZWxlY3Rpb24gPSBmb3JtYXRSZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnNicpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBIdG1sT3B0aW9uc1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucyA9IHt9O1xyXG5cdFx0XHR2YXIgZGF0YUh0bWxPcHRpb24gPSBbXTtcclxuXHRcdFx0JFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRcdHZhciBvcHRpb25PYmplY3QgPSB7XHJcblx0XHRcdFx0XHRpZDogJCh0aGlzKS52YWwoKSxcclxuXHRcdFx0XHRcdHRleHQ6ICQodGhpcykudGV4dCgpLFxyXG5cdFx0XHRcdFx0aHRtbDogJCh0aGlzKS50ZXh0KCksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRkYXRhSHRtbE9wdGlvbi5wdXNoKG9wdGlvbk9iamVjdCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY29udGFpbmVyQ3NzQ2xhc3MgPSAnY3VzdG9tU2VsZWN0JztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZHJvcGRvd25Dc3NDbGFzcyA9ICdkcm9wZG93bkN1c3RvbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRhdGEgPSBkYXRhSHRtbE9wdGlvbjtcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuZXNjYXBlTWFya3VwID0gZnVuY3Rpb24gKG1hcmt1cCkge1xyXG5cdFx0XHRcdHJldHVybiBtYXJrdXA7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoU2VsZWN0ZWRWYWx1ZSAhPSAnJykge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnZhbChTZWxlY3RlZFZhbHVlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKFNlbGVjdDJUeXBlID09PSAnMScpIHtcclxuXHRcdFx0Ly8gU2VsZWN0MiBUYWdDdXN0b21cclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3RhZ0N1c3RvbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAndGFnQ3VzdG9tJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuVG9rZW5TZXBhcmF0b3MgPSBbJywnLCAnICddO1xyXG5cdFx0XHRTZWxlY3QyT3B0aW9ucy5jcmVhdGVTZWFyY2hDaG9pY2UgPSBmdW5jdGlvbiAodGVybSwgZGF0YSkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCQoZGF0YSkuZmlsdGVyKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMudGV4dC5sb2NhbGVDb21wYXJlKHRlcm0pID09PSAwO1xyXG5cdFx0XHRcdFx0fSkubGVuZ3RoID09PSAwXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRpZDogdGVybSxcclxuXHRcdFx0XHRcdFx0dGV4dDogdGVybSxcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChTZWxlY3QyVHlwZSA9PT0gJzUnKSB7XHJcblx0XHRcdC8vIFNlbGVjdDIgVGFnTXVsdGlwbGVcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMudGFncyA9IHRydWU7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmNvbnRhaW5lckNzc0NsYXNzID0gJ3RhZ1N5c3RlbSc7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLmRyb3Bkb3duQ3NzQ2xhc3MgPSAndGFnU3lzdGVtJztcclxuXHRcdFx0U2VsZWN0Mk9wdGlvbnMuY3JlYXRlVGFnID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG5cdFx0XHRcdHZhciB0ZXJtID0gJC50cmltKHBhcmFtcy50ZXJtKTtcclxuXHRcdFx0XHRpZiAodGVybSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0aWQ6ICcjJyArIHRlcm0sXHJcblx0XHRcdFx0XHR0ZXh0OiB0ZXJtLFxyXG5cdFx0XHRcdFx0bmV3VGFnOiB0cnVlLCAvLyBhZGQgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoSGFzU2VhcmNoID09PSAnRmFsc2UnKSB7XHJcblx0XHRcdFNlbGVjdDJPcHRpb25zLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoID0gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKE9uVW5TZWxlY3RpbmdKUyAhPSAnJyB8fCBPblNlbGVjdGluZ0pTICE9ICcnKSB7XHJcblx0XHRcdCRXaWRnZXRJZGVudGlmaWVyXHJcblx0XHRcdFx0LnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3QyOnVuc2VsZWN0aW5nJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdCQodGhpcykuZGF0YSgndW5zZWxlY3RpbmcnLCB0cnVlKTtcclxuXHRcdFx0XHRcdE9uVW5TZWxlY3RpbmdKUztcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbignc2VsZWN0OnNlbGVjdGluZycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRPblNlbGVjdGluZ0pTO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6b3BlbmluZycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5kYXRhKCd1bnNlbGVjdGluZycpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlRGF0YSgndW5zZWxlY3RpbmcnKTtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3Q6b3BlbicsIGZ1bmN0aW9uIChldnQpIHtcclxuXHRcdFx0XHRcdGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKCdzZWxlY3QyOmNsb3NlJywgZnVuY3Rpb24gKGV2dCkge1xyXG5cdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoU2VsZWN0MlR5cGUgPT09ICcyJykge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdHZhciBpZHdpZGdldCA9ICcjJyArIFdpZGdldElkO1xyXG5cclxuXHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0VW5zZWxlY3RlZElkID0gZS5wYXJhbXMuZGF0YS5pZDtcclxuXHRcdFx0XHRcdGlmIChVbnNlbGVjdGVkSWQgPT09ICdBbGwnKSB7XHJcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZEl0ZW1zID0gW107XHJcblx0XHRcdFx0XHRcdHZhciBhbGxPcHRpb25zID0gJChpZHdpZGdldCArICcgb3B0aW9uJyk7XHJcblx0XHRcdFx0XHRcdGFsbE9wdGlvbnMuZWFjaChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRJdGVtcy5wdXNoKCQodGhpcykudmFsKCkpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MignZGVzdHJveScpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoc2VsZWN0ZWRJdGVtcykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKCdvcGVuJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRPcHRpb25zID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHR2YXIgdG90YWxPcHRpb25zID0gJFdpZGdldElkZW50aWZpZXIuZmluZCgnb3B0aW9uJykubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRPcHRpb25zID09PSB0b3RhbE9wdGlvbnMgLSAxICYmICQoaWR3aWRnZXQgKyAnID4gIG9wdGlvbjpzZWxlY3RlZDpmaXJzdC1jaGlsZCcpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZEl0ZW1zID0gW107XHJcblx0XHRcdFx0XHRcdFx0dmFyIGFsbE9wdGlvbnMgPSAkKGlkd2lkZ2V0ICsgJyBvcHRpb24nKTtcclxuXHRcdFx0XHRcdFx0XHRhbGxPcHRpb25zLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRJdGVtcy5wdXNoKCQodGhpcykudmFsKCkpO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci52YWwoc2VsZWN0ZWRJdGVtcykudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLm9uKCdzZWxlY3QyOnVuc2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFVuc2VsZWN0ZWRJZCA9IGUucGFyYW1zLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRpZiAoVW5zZWxlY3RlZElkID09PSAnQWxsJykge1xyXG5cdFx0XHRcdFx0XHQkKGlkd2lkZ2V0ICsgJyA+IG9wdGlvbicpLnJlbW92ZUF0dHIoJ3NlbGVjdGVkJyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0MihTZWxlY3QyT3B0aW9ucyk7XHJcblx0XHRcdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoJ29wZW4nKTtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldClcclxuXHRcdFx0XHRcdFx0XHQudmFsKCcnKVxyXG5cdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHRcdFx0Ly8kKGlkd2lkZ2V0ICsnID4gb3B0aW9uJykuYXR0cignc2VsZWN0ZWQnLCBcInNlbGVjdGVkXCIpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JChpZHdpZGdldCArICcgPiBvcHRpb246Zmlyc3QtY2hpbGQnKS5yZW1vdmVBdHRyKCdzZWxlY3RlZCcpO1xyXG5cdFx0XHRcdFx0XHQkV2lkZ2V0SWRlbnRpZmllci5zZWxlY3QyKFNlbGVjdDJPcHRpb25zKTtcclxuXHRcdFx0XHRcdFx0JFdpZGdldElkZW50aWZpZXIuc2VsZWN0Mignb3BlbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRXaWRnZXRJZGVudGlmaWVyLnNlbGVjdDIoU2VsZWN0Mk9wdGlvbnMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn07IiwiLyogQ29tcG9uZW50IFNoaWZ0Q29udGFpbmVyICovXG4oZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cykge1xuXG5cdGxldCBzaGlmdFRpbWVsaW5lUmVzaXplVGltZXI7XG5cdGxldCAkc2hpZnRDb250YWluZXJJZCA9ICQoKTtcblxuXHRjb25zdCBjcmVhdGUgPSBzaGlmdENvbnRhaW5lcklkID0+IHtcblxuXHRcdC8vICQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdCRzaGlmdENvbnRhaW5lcklkID0gJChzaGlmdENvbnRhaW5lcklkKTtcblxuXHRcdGhhc1Njcm9sbEJhcigpO1xuXHRcdGhhbmRsZVNoaWZ0VGFibGUoKTtcblxuXHRcdC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdC8vIFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdFx0Ly8gXHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lciAuQWN0aW9uc01lbnUgJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0Ly8gfSwgMTUwMCk7XG5cblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX19hcnJvdycpLm9mZignbW91c2Vkb3duJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZWRyYXdTaGlmdFRpbWVsaW5lKCk7XG5cdFx0XHR9LCAxNTAwKTtcblx0XHR9KTtcblxuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZVNoaWZ0VGFibGUgPSAoKSA9PiB7XG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuXHRcdFx0dmFyICRlbEZsYWcgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy5GbGFnTGluZScpO1xuXHRcdFx0dmFyICRlbEZsYWdUaW1lID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuRmxhZ0xpbmVfdGltZScpO1xuXHRcdFx0dmFyICRjb2x1bW5GbGFnID0gJGVsRmxhZy5kYXRhKCdjb2x1bW4nKTtcblx0XHRcdHZhciAkbWludXRlc0ZsYWcgPSAkZWxGbGFnLmRhdGEoJ21pbnV0ZXMnKTtcblx0XHRcdHZhciAkc2xvdHMgPSAkKHRoaXMpLmNsb3Nlc3QoJy5TaGlmdENvbnRhaW5lcicpLmZpbmQoJy5TaGlmdENvbnRhaW5lcl9oZWFkZXInKS5maW5kKCcuU2hpZnRDZWxsQ29udGVudCcpO1xuXHRcdFx0dmFyICRzbG90V2lkdGggPSBNYXRoLnJvdW5kKCRzbG90cy5lcSgwKS53aWR0aCgpKTtcblx0XHRcdHZhciBtaW51dGVzUG9zaXRpb24gPSAoJG1pbnV0ZXNGbGFnICogJHNsb3RXaWR0aCkgLyA2MDtcblxuXHRcdFx0Ly8gaGFuZGxlIGN1cnJlbnQgdGltZSBmbG9nIGhvcml6b250YWwgcG9zaXRpb25pbmdcblx0XHRcdHZhciBzbG90c1Bvc2l0aW9uID0gW107XG5cdFx0XHQkc2xvdHMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG5cdFx0XHRcdHNsb3RzUG9zaXRpb24ucHVzaCgkKHRoaXMpLnBvc2l0aW9uKCkubGVmdCk7XG5cdFx0XHR9KTtcblx0XHRcdCRlbEZsYWcuY3NzKCdsZWZ0Jywgc2xvdHNQb3NpdGlvblskY29sdW1uRmxhZyAtIDFdICsgbWludXRlc1Bvc2l0aW9uKTtcblx0XHRcdCRlbEZsYWcuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0XHRpZiAoJGNvbHVtbkZsYWcgPT09ICRzbG90cy5sZW5ndGgpIHtcblx0XHRcdFx0JGVsRmxhZ1RpbWUuY3NzKHtcblx0XHRcdFx0XHRyaWdodDogJzFweCcsXG5cdFx0XHRcdFx0bGVmdDogJ2F1dG8nLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaGFuZGxlIGNlbGxzIHRoYXQgbWlnaHQgc3BhbiBvdmVyIHNldmVyYWwgc2xvdHNcblx0XHRcdCQodGhpcykuZmluZCgnLlNoaWZ0Q2FyZCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbFJvdykge1xuXHRcdFx0XHR2YXIgcm93SGFzU3Bhbm5lZENlbGwgPSBmYWxzZTtcblx0XHRcdFx0JChlbFJvdykuZmluZCgnLlNoaWZ0Q2VsbENvbnRlbnQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxDZWxsKSB7XG5cdFx0XHRcdFx0dmFyIGNvbHNwYW4gPSAkKGVsQ2VsbCkuZGF0YSgnY29sc3BhbicpO1xuXHRcdFx0XHRcdGlmIChjb2xzcGFuID09PSBzbG90c1Bvc2l0aW9uLmxlbmd0aCB8fCByb3dIYXNTcGFubmVkQ2VsbCkge1xuXHRcdFx0XHRcdFx0JChlbENlbGwpLmNzcyh7XG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdFx0XHRcdFx0XHRmbGV4OiAnMSAxIGF1dG8nLFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChjb2xzcGFuID4gMSkge1xuXHRcdFx0XHRcdFx0cm93SGFzU3Bhbm5lZENlbGwgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JChlbENlbGwpLmNzcyh7XG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdFx0XHRcdFx0XHRmbGV4OiAnbm9uZScsXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiArKHNsb3RzUG9zaXRpb25bY29sc3Bhbl0gLSBzbG90c1Bvc2l0aW9uWzBdKSArICdweCcsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGhhbmRsZSBob3Jpem9udGFsIHNjcm9sbCBiZWhhdmlvclxuXHRcdFx0aWYgKGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGgpIHtcblx0XHRcdFx0JChlbCkud2lkdGgoZWwuc2Nyb2xsV2lkdGgpO1xuXHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5TaGlmdENvbnRhaW5lcicpLmZpbmQoJy5TaGlmdENvbnRhaW5lcl9oZWFkZXInKS53aWR0aChlbC5zY3JvbGxXaWR0aCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKGVsKS53aWR0aCgnYXV0bycpO1xuXHRcdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5TaGlmdENvbnRhaW5lcicpLmZpbmQoJy5TaGlmdENvbnRhaW5lcl9oZWFkZXInKS53aWR0aCgnYXV0bycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdGNvbnN0IGhhc1Njcm9sbEJhciA9ICgpID0+IHtcblx0XHR2YXIgJFNjcm9sbGFibGVEaXYgPSAkc2hpZnRDb250YWluZXJJZC5maW5kKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpO1xuXHRcdGlmICgkc2hpZnRDb250YWluZXJJZC5maW5kKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLmxlbmd0aCA+IDApIHtcblx0XHRcdGlmICgkU2Nyb2xsYWJsZURpdi5nZXQoMCkuc2Nyb2xsSGVpZ2h0ID4gJFNjcm9sbGFibGVEaXYuaGVpZ2h0KCkpIHtcblx0XHRcdFx0dmFyICRsYXN0Q2VsbCA9ICRzaGlmdENvbnRhaW5lcklkLmZpbmQoJy5Jc1RpbWVyOmxhc3QtY2hpbGQnKTtcblx0XHRcdFx0JGxhc3RDZWxsLmNzcygncGFkZGluZy1yaWdodCcsICc3cHgnKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0Y29uc3QgcmVkcmF3U2hpZnRUaW1lbGluZSA9ICgpID0+IHtcblx0XHRjbGVhclRpbWVvdXQoc2hpZnRUaW1lbGluZVJlc2l6ZVRpbWVyKTtcblx0XHRzaGlmdFRpbWVsaW5lUmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdGhhc1Njcm9sbEJhcigpO1xuXHRcdFx0aGFuZGxlU2hpZnRUYWJsZSgpO1xuXHRcdH0sIDQwMCk7XG5cdH07XG5cblx0Y29uc3QgY2hlY2tTY3JvbGwgPSAoKSA9PiB7XG5cdFx0dmFyIGhDb250ZW50ID0gJCgnLkNvbnRlbnQnKS5oZWlnaHQoKTtcblx0XHR2YXIgaFdpbmRvdyA9ICQod2luZG93KS5oZWlnaHQoKTtcblxuXHRcdGlmIChoQ29udGVudCA+IGhXaW5kb3cpIHJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIgPSB7XG5cdFx0Y3JlYXRlLFxuXHRcdGNoZWNrU2Nyb2xsLFxuXHRcdHJlZHJhd1NoaWZ0VGltZWxpbmVcblx0fTtcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcblxuXG4kKHdpbmRvdykub2ZmKCdyZXNpemUuR2VuZXJpY0dhbGxlcnknKS5vbigncmVzaXplLkdlbmVyaWNHYWxsZXJ5JywgZnVuY3Rpb24gKCkge1xuXG5cdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XG5cblx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblxuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5yZWRyYXdTaGlmdFRpbWVsaW5lKTtcblxuXHRzZXRUaW1lb3V0KFNhcHBoaXJlV2lkZ2V0cy5TaGlmdENvbnRhaW5lci5jaGVja1Njcm9sbCwgMTAwMCk7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdH0sIDE1MDApO1xuXG59KTtcblxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xuXHRpZiAoISEkKCcuU2hpZnRDb250YWluZXInKS5sZW5ndGgpIHtcblxuXHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblx0XHR9LCA0MDApO1xuXG5cdFx0c2V0VGltZW91dChTYXBwaGlyZVdpZGdldHMuU2hpZnRDb250YWluZXIuY2hlY2tTY3JvbGwsIDUwMCk7XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoJy5TaGlmdENhcmRfdGltZUxpbmUnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cdFx0fSwgNjAwKTtcblxuXHRcdCQoJy5uYXZpZ2F0aW9uLWNvbnRyb2wtaXRlbScpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKCcuU2hpZnRDYXJkX3RpbWVMaW5lJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdFx0JCgnLlNoaWZ0RXhwYW5kYWJsZV9jb250YWluZXIgLkFjdGlvbnNNZW51JykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcblx0XHR9KTtcblxuXHRcdC8vVmVyaWZ5IHRoZSBzY3JvbGwgaWYgdG9vbHRpcCBvcGVuZWRcblx0XHQkKCcuU2hpZnRFeHBhbmRhYmxlX2NvbnRhaW5lcicpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoJCgnLnRvb2x0aXBzdGVyLWJhc2UnKS5pcygnOnZpc2libGUnKSkge1xuXHRcdFx0XHQkKCcudG9vbHRpcHN0ZXItYmFzZScpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0U2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmUoKTtcblx0XHRcdH0sIDQwMCk7XG5cblx0XHRcdHNldFRpbWVvdXQoU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLmNoZWNrU2Nyb2xsLCA1MDApO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0JCgnLlNoaWZ0Q2FyZF90aW1lTGluZScpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdFx0XHRcdCQoJy5TaGlmdEV4cGFuZGFibGVfY29udGFpbmVyIC5BY3Rpb25zTWVudScpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuXHRcdFx0fSwgNjAwKTtcblxuXHRcdFx0Ly8gU2FwcGhpcmVXaWRnZXRzLlNoaWZ0Q29udGFpbmVyLnJlZHJhd1NoaWZ0VGltZWxpbmU7XG5cblx0XHR9KTtcblxuXHR9XG59KTsiLCIvKiBDb21wb25lbnQgSVNpZGViYXIgKi9cbihmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKSB7XG5cdHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0d2luZG93W2NvbmZpZy53aWRnZXRJZF0gPSBuZXcgU2lkZWJhcihjb25maWcpO1xuXHRcdFNhcHBoaXJlV2lkZ2V0cy5TaWRlYmFyLndpZGdldElkID0gY29uZmlnLndpZGdldElkO1xuXHR9O1xuXG5cdHZhciBjbG9zZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR3aW5kb3dbU2FwcGhpcmVXaWRnZXRzLlNpZGViYXIud2lkZ2V0SWRdLmNsb3NlKCk7XG5cdH07XG5cblx0dmFyIFNpZGViYXIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHR0aGlzLmlzRXhwYW5kYWJsZSA9IGNvbmZpZy5pc0V4cGFuZGFibGU7XG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyBjb25maWcud2lkZ2V0SWQpO1xuXHRcdHRoaXMuJHNpZGViYXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyJyk7XG5cdFx0dGhpcy4kc2lkZWJhck1lbnUgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLW1lbnUnKTtcblx0XHR0aGlzLiRzaWRlYmFyTWVudUl0ZW0gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNpZGViYXJNZW51SXRlbScpO1xuXHRcdHRoaXMuJHNpZGViYXJTaGllbGQgPSB0aGlzLiR3aWRnZXQuZmluZCgnLklTaWRlYmFyLXNoaWVsZCcpO1xuXHRcdHRoaXMuJHNpZGViYXJDb250ZW50ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5JU2lkZWJhci1jb250ZW50Jyk7XG5cdFx0dGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnPiBkaXYnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzKCdQSCcpICYmICQodGhpcykudGV4dCgpID09PSAnJykge1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuYXR0YWNoRXZlbnRzKCk7XG5cdFx0aWYgKCF0aGlzLmlzRXhwYW5kYWJsZSkge1xuXHRcdFx0dGhpcy5vcGVuTWVudUl0ZW0oMCk7XG5cdFx0fVxuXHRcdCQoZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LnBhcmVudC4kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XG5cdFx0XHRpZiAoIXRoaXMuaXNFeHBhbmRhYmxlKSB7XG5cdFx0XHRcdCQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdOnZpc2libGUnKS5lcSgwKS5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdCQod2luZG93KS51bmxvYWQoZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LnBhcmVudC4kKCcubGRzLXJpbmcnKS5mYWRlT3V0KCk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2lkZWJhci5wcm90b3R5cGUuYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0dGhpcy4kc2lkZWJhck1lbnUub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0aWYgKCFfdGhpcy4kc2lkZWJhci5oYXNDbGFzcygnb3BlbicpKSB7XG5cdFx0XHRcdF90aGlzLm9wZW5NZW51SXRlbSgwKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLiRzaWRlYmFyTWVudUl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHNlbGVjdGVkUG9zaXRpb24gPSAkKHRoaXMpLmluZGV4KCk7XG5cdFx0XHRfdGhpcy5vcGVuTWVudUl0ZW0oc2VsZWN0ZWRQb3NpdGlvbik7XG5cdFx0fSk7XG5cdFx0dGhpcy4kc2lkZWJhclNoaWVsZC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfdGhpcy5jbG9zZSgpO1xuXHRcdH0pO1xuXHRcdHRoaXMuJHNpZGViYXIub24oJ2NsaWNrJywgJy5TZWFyY2hTaWRlQmFyRmllbGRzIC5CdXR0b25Hcm91cF9idXR0b246Zmlyc3QtY2hpbGQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfdGhpcy4kc2lkZWJhclxuXHRcdFx0XHQuZmluZCgnLkZpZWxkc1NsaWRlcicpXG5cdFx0XHRcdC5hZGRDbGFzcygnVGFiMScpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnVGFiMicpO1xuXHRcdFx0X3RoaXMuc2V0RmllbGRGb2N1cyhfdGhpcy4kc2lkZWJhckNvbnRlbnQuZmluZCgnLlRleHRJbnB1dDp2aXNpYmxlJykuZXEoMCkpO1xuXHRcdH0pO1xuXHRcdHRoaXMuJHNpZGViYXIub24oJ2NsaWNrJywgJy5TZWFyY2hTaWRlQmFyRmllbGRzIC5CdXR0b25Hcm91cF9idXR0b246bGFzdC1jaGlsZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdF90aGlzLiRzaWRlYmFyXG5cdFx0XHRcdC5maW5kKCcuRmllbGRzU2xpZGVyJylcblx0XHRcdFx0LmFkZENsYXNzKCdUYWIyJylcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdUYWIxJyk7XG5cdFx0XHRfdGhpcy5zZXRGaWVsZEZvY3VzKF90aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XG5cdFx0fSk7XG5cdH07XG5cblx0U2lkZWJhci5wcm90b3R5cGUub3Blbk1lbnVJdGVtID0gZnVuY3Rpb24gKHNlbGVjdGVkUG9zaXRpb24pIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMuJHNpZGViYXJcblx0XHRcdC5maW5kKCcuU2lkZWJhck1lbnVJdGVtJylcblx0XHRcdC5yZW1vdmVDbGFzcygnYWN0aXZlJylcblx0XHRcdC5lcShzZWxlY3RlZFBvc2l0aW9uKVxuXHRcdFx0LmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHR0aGlzLiRzaWRlYmFyXG5cdFx0XHQuZmluZCgnLklTaWRlYmFyLWNvbnRlbnQgPiAuSVNpZGViYXItY29udGVudC1wYW5lbCcpXG5cdFx0XHQuaGlkZSgpXG5cdFx0XHQuZXEoc2VsZWN0ZWRQb3NpdGlvbilcblx0XHRcdC5zaG93KCk7XG5cdFx0dGhpcy4kc2lkZWJhci5hZGRDbGFzcygnb3BlbicpO1xuXHRcdGlmICh3aW5kb3cucGFyZW50Lmxlbmd0aCAmJiB0aGlzLmlzRXhwYW5kYWJsZSkge1xuXHRcdFx0d2luZG93LnBhcmVudC5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5vcGVuU2lkZWJhcklmcmFtZSgwKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuJHNpZGViYXJDb250ZW50LmZpbmQoJy5UZXh0SW5wdXQ6dmlzaWJsZScpLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuc2V0RmllbGRGb2N1cyh0aGlzLiRzaWRlYmFyQ29udGVudC5maW5kKCcuVGV4dElucHV0OnZpc2libGUnKS5lcSgwKSk7XG5cdFx0fVxuXHR9O1xuXG5cdFNpZGViYXIucHJvdG90eXBlLnNldEZpZWxkRm9jdXMgPSBmdW5jdGlvbiAoJGlucHV0KSB7XG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0JGlucHV0LmNsaWNrKCkuc2VsZWN0KCk7XG5cdFx0fSwgMjUwKTtcblx0fTtcblxuXHRTaWRlYmFyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdGlmICh3aW5kb3cucGFyZW50Lmxlbmd0aCkge1xuXHRcdFx0d2luZG93LnBhcmVudC5TYXBwaGlyZVdpZGdldHMuTGF5b3V0QmFzZS5jbG9zZVNpZGViYXJJZnJhbWUoMCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmlzRXhwYW5kYWJsZSkge1xuXHRcdFx0dGhpcy4kc2lkZWJhci5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHRcdFx0dGhpcy4kc2lkZWJhci5maW5kKCcuU2lkZWJhck1lbnVJdGVtJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0dGhpcy4kc2lkZWJhci5maW5kKCcuSVNpZGViYXItY29udGVudCA+IC5JU2lkZWJhci1jb250ZW50LXBhbmVsJykuaGlkZSgpO1xuXHRcdH1cblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuU2lkZWJhciA9IHtcblx0XHRjcmVhdGU6IGNyZWF0ZSxcblx0XHRjbG9zZTogY2xvc2UsXG5cdH07XG59KShqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQsIFNhcHBoaXJlV2lkZ2V0cyk7IiwiLyogQ29tcG9uZW50IFNwaW5uZXJIb3Jpem9udGFsICovXHJcblNhcHBoaXJlV2lkZ2V0cy5TcGlubmVySG9yaXpvbnRhbCA9IHtcclxuXHRpbmNyZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHR2YXIgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZCkuZmluZCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLmZpcnN0KCk7XHJcblx0XHRpZiAoX2VsZW1lbnQudmFsKCkgPT0gdW5kZWZpbmVkIHx8IF9lbGVtZW50LnZhbCgpID09ICcnIHx8IGlzTmFOKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpKSkge1xyXG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xyXG5cdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA8IG1heFZhbHVlKSB7XHJcblx0XHRcdFx0X2VsZW1lbnQudmFsKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpICsgMSk7XHJcblx0XHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xyXG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdCQoZWxlbWVudElkKS5maW5kKCdhLk1pbnVzJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgPj0gbWF4VmFsdWUpIHtcclxuXHRcdFx0XHQkKGVsZW1lbnRJZCkuZmluZCgnYS5QbHVzJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGVjcmVtZW50OiBmdW5jdGlvbiAoZWxlbWVudElkLCBtaW5WYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHR2YXIgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZClcclxuXHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJudW1iZXJcIl0nKVxyXG5cdFx0XHQuZmlyc3QoKTtcclxuXHRcdGlmIChfZWxlbWVudC52YWwoKSA9PSB1bmRlZmluZWQgfHwgX2VsZW1lbnQudmFsKCkgPT0gJycgfHwgaXNOYU4ocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkpKSB7XHJcblx0XHRcdF9lbGVtZW50LnZhbChtaW5WYWx1ZSk7XHJcblx0XHRcdGlmICh0cmlnZ2VyT25DaGFuZ2UpIHtcclxuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpID4gbWluVmFsdWUpIHtcclxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSkgLSAxKTtcclxuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XHJcblx0XHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0JChlbGVtZW50SWQpXHJcblx0XHRcdFx0XHQuZmluZCgnYS5QbHVzJylcclxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KF9lbGVtZW50LnZhbCgpKSA8PSBtaW5WYWx1ZSkge1xyXG5cdFx0XHRcdCQoZWxlbWVudElkKVxyXG5cdFx0XHRcdFx0LmZpbmQoJ2EuTWludXMnKVxyXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG59OyIsIi8qIENvbXBvbmVudCBTcGlubmVyVmVydGljYWwgKi9cbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcblx0Y29uc3QgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgTWluVmFsdWUgPSAnICsgTWluVmFsdWUgKyAnO1xuXG5cdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9IC5TcGlubmVySW5wdXRWZXJ0aWNhbCBpbnB1dGApLm9uKCdibHVyIGtleXVwIGlucHV0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBDdXJyZW50SW5wdXRWYWx1ZSA9ICQoYCMke2NvbmZpZy53aWRnZXRJRH0gLlNwaW5uZXJJbnB1dFZlcnRpY2FsIGlucHV0YCkudmFsKCk7XG5cblx0XHRcdFx0aWYgKEN1cnJlbnRJbnB1dFZhbHVlIDwgTWluVmFsdWUpIHtcblx0XHRcdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9YClcblx0XHRcdFx0XHRcdC5maW5kKCcuTWludXNWZXJ0aWNhbCcpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQoYCMke2NvbmZpZy53aWRnZXRJRH1gKVxuXHRcdFx0XHRcdFx0LmZpbmQoJy5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoJChgIyR7Y29uZmlnLndpZGdldElEfSAuU3Bpbm5lcklucHV0VmVydGljYWwgaW5wdXRgKS52YWwoKSA8PSBNaW5WYWx1ZSkge1xuXHRcdFx0XHQkKGAjJHtjb25maWcud2lkZ2V0SUR9YClcblx0XHRcdFx0XHQuZmluZCgnLk1pbnVzVmVydGljYWwnKVxuXHRcdFx0XHRcdC5hZGRDbGFzcygnRGlzYWJsZWRTcGluJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb25maWcuaXNDdXJzb3JPbkZvY3VzKSB7XG5cdFx0XHRcdCQoJ2JvZHknKS5vbignZm9jdXMnLCBgIyR7Y29uZmlnLmlucHV0SUR9IGlucHV0YCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHRoYXQuc2VsZWN0aW9uU3RhcnQgPSB0aGF0LnNlbGVjdGlvbkVuZCA9IDEwMDAwMDtcblx0XHRcdFx0XHR9LCAzMDApO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fTtcblxuXHRjb25zdCBpbmNyZW1lbnQgPSAoZWxlbWVudElkLCBtaW5WYWx1ZSwgbWF4VmFsdWUsIHRyaWdnZXJPbkNoYW5nZSwgdHJpZ2dlck9uSW5wdXQpID0+IHtcblx0XHRsZXQgX2VsZW1lbnQgPSAkKGVsZW1lbnRJZClcblx0XHRcdC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXScpXG5cdFx0XHQuZmlyc3QoKTtcblx0XHR2YXIgZm9yY2VJbnRlZ2VyID0gJChlbGVtZW50SWQpLmRhdGEoJ2ZvcmNlaW50ZWdlcicpID09PSAnVHJ1ZScgPyB0cnVlIDogZmFsc2U7XG5cdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpO1xuXHRcdHZhciBpbmNyZW1lbnRVbml0ID0gMTtcblx0XHR2YXIgaXNEZWNpbWFscyA9IGN1cnJlbnRWYWx1ZSAlIDEgIT0gMDtcblxuXHRcdCQoZWxlbWVudElkKVxuXHRcdFx0LmZpbmQoJy5NaW51c1ZlcnRpY2FsJylcblx0XHRcdC5yZW1vdmVDbGFzcygnRGlzYWJsZWRTcGluJyk7XG5cblx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpIDwgbWluVmFsdWUpIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0LmFkZENsYXNzKCdEaXNhYmxlZFNwaW4nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JChlbGVtZW50SWQpXG5cdFx0XHRcdC5maW5kKCdhLk1pbnVzVmVydGljYWwnKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ0Rpc2FibGVkU3BpbicpO1xuXHRcdH1cblxuXHRcdGlmICghZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRpZiAoaXNEZWNpbWFscykge1xuXHRcdFx0XHRpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQgfHwgY3VycmVudFZhbHVlID09PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkpKSB7XG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0cmlnZ2VyT25JbnB1dCkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpIDwgbWF4VmFsdWUpIHtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMCAmJiAhZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRcdFx0aW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlICsgaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRyaWdnZXJPbklucHV0KSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignaW5wdXQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKGVsZW1lbnRJZClcblx0XHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0XHQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHRcdC5maW5kKCdhLlBsdXNWZXJ0aWNhbCcpXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2hlY2tTcGlubmVyVmVydGljYWxEaXNhYmxlZFN0YXR1cyhlbGVtZW50SWQsIHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuXHR9O1xuXG5cdGNvbnN0IGRlY3JlbWVudCA9IChlbGVtZW50SWQsIG1pblZhbHVlLCBtYXhWYWx1ZSwgdHJpZ2dlck9uQ2hhbmdlLCB0cmlnZ2VyT25JbnB1dCkgPT4ge1xuXHRcdHZhciBfZWxlbWVudCA9ICQoZWxlbWVudElkKVxuXHRcdFx0LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdJylcblx0XHRcdC5maXJzdCgpO1xuXHRcdHZhciBmb3JjZUludGVnZXIgPSAkKGVsZW1lbnRJZCkuZGF0YSgnZm9yY2VpbnRlZ2VyJykgPT09ICdUcnVlJyA/IHRydWUgOiBmYWxzZTtcblx0XHR2YXIgY3VycmVudFZhbHVlID0gcGFyc2VGbG9hdChfZWxlbWVudC52YWwoKSk7XG5cdFx0dmFyIGluY3JlbWVudFVuaXQgPSAxO1xuXHRcdHZhciBpc0RlY2ltYWxzID0gY3VycmVudFZhbHVlICUgMSAhPSAwO1xuXHRcdGlmICghZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRpZiAoaXNEZWNpbWFscykge1xuXHRcdFx0XHRpbmNyZW1lbnRVbml0ID0gcGFyc2VGbG9hdCgwLjEpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoY3VycmVudFZhbHVlID09PSB1bmRlZmluZWQgfHwgY3VycmVudFZhbHVlID09PSAnJyB8fCBpc05hTihwYXJzZUZsb2F0KGN1cnJlbnRWYWx1ZSkpKSB7XG5cdFx0XHRfZWxlbWVudC52YWwobWluVmFsdWUpO1xuXHRcdFx0aWYgKHRyaWdnZXJPbkNoYW5nZSkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0cmlnZ2VyT25JbnB1dCkge1xuXHRcdFx0XHRfZWxlbWVudC50cmlnZ2VyKCdpbnB1dCcpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocGFyc2VGbG9hdChjdXJyZW50VmFsdWUpID4gbWluVmFsdWUpIHtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PT0gMSAmJiAhZm9yY2VJbnRlZ2VyKSB7XG5cdFx0XHRcdFx0aW5jcmVtZW50VW5pdCA9IHBhcnNlRmxvYXQoMC4xKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfZWxlbWVudC52YWwocGFyc2VGbG9hdCgoY3VycmVudFZhbHVlIC0gaW5jcmVtZW50VW5pdCkudG9GaXhlZCgxKSkpO1xuXHRcdFx0XHRpZiAodHJpZ2dlck9uQ2hhbmdlKSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRyaWdnZXJPbklucHV0KSB7XG5cdFx0XHRcdFx0X2VsZW1lbnQudHJpZ2dlcignaW5wdXQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKGVsZW1lbnRJZClcblx0XHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxuXHRcdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JChlbGVtZW50SWQpXG5cdFx0XHRcdFx0LmZpbmQoJ2EuTWludXNWZXJ0aWNhbCcpXG5cdFx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y2hlY2tTcGlubmVyVmVydGljYWxEaXNhYmxlZFN0YXR1cyhlbGVtZW50SWQsIHBhcnNlRmxvYXQoX2VsZW1lbnQudmFsKCkpLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuXHR9O1xuXG5cdGNvbnN0IGNoZWNrU3Bpbm5lclZlcnRpY2FsRGlzYWJsZWRTdGF0dXMgPSAoZWxlbWVudElkLCB2YWx1ZVRvQ2hlY2ssIG1pblZhbHVlLCBtYXhWYWx1ZSkgPT4ge1xuXHRcdGlmICh2YWx1ZVRvQ2hlY2sgPD0gbWluVmFsdWUpIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5NaW51c1ZlcnRpY2FsJylcblx0XHRcdFx0LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0fVxuXHRcdGlmICh2YWx1ZVRvQ2hlY2sgPj0gbWF4VmFsdWUpIHtcblx0XHRcdCQoZWxlbWVudElkKVxuXHRcdFx0XHQuZmluZCgnYS5QbHVzVmVydGljYWwnKVxuXHRcdFx0XHQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JChlbGVtZW50SWQpXG5cdFx0XHRcdC5maW5kKCdhLlBsdXNWZXJ0aWNhbCcpXG5cdFx0XHRcdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdH1cblx0fTtcblxuXHRTYXBwaGlyZVdpZGdldHMuU3Bpbm5lclZlcnRpY2FsID0ge1xuXHRcdGNyZWF0ZSxcblx0XHRpbmNyZW1lbnQsXG5cdFx0ZGVjcmVtZW50LFxuXHR9O1xufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpO1xuIiwiLyogQ29tcG9uZW50IFNwbGl0QnV0dG9uICovXHJcbihmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHR2YXIgY3JlYXRlID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcblx0XHR3aW5kb3dbY29uZmlnLndpZGdldElkXSA9IG5ldyBTcGxpdEJ1dHRvbihjb25maWcpO1xyXG5cdH07XHJcblxyXG5cdHZhciBTcGxpdEJ1dHRvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG5cdFx0dGhpcy4kd2lkZ2V0ID0gJCgnIycgKyB0aGlzLmNvbmZpZy53aWRnZXRJZCk7XHJcblx0XHR0aGlzLiRidXR0b24gPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWJ1dHRvbicpO1xyXG5cdFx0dGhpcy4kYnV0dG9uTGluayA9IHRoaXMuJGJ1dHRvbi5maW5kKCc+IGEnKTtcclxuXHRcdHRoaXMuJHRyaWdnZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLXRyaWdnZXInKTtcclxuXHRcdHRoaXMuJGFjdGlvbnMgPSB0aGlzLiR3aWRnZXQuZmluZCgnLlNwbGl0QnV0dG9uLWFjdGlvbnMnKTtcclxuXHRcdGlmICghIXRoaXMuJGFjdGlvbnMudGV4dCgpKSB7XHJcblx0XHRcdHRoaXMuJHdpZGdldC5maW5kKCc+IC5TcGxpdEJ1dHRvbicpLmFkZENsYXNzKCdoYXNUcmlnZ2VyJyk7XHJcblx0XHRcdHRoaXMuYnVpbGRBY3Rpb25zVHJpZ2dlcigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdFNwbGl0QnV0dG9uLnByb3RvdHlwZS5idWlsZEFjdGlvbnNUcmlnZ2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGNsYXNzTGlzdCA9IHRoaXMuJGJ1dHRvbkxpbmtbMF0uY2xhc3NMaXN0LnZhbHVlO1xyXG5cdFx0dGhpcy4kdHJpZ2dlci5hZGRDbGFzcyhjbGFzc0xpc3QpO1xyXG5cdFx0JChmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gaW5zaWRlIGEgZG9jdW1lbnQgcmVhZHkgZHVlIHRvIHNhcHBoaXJlIHBvcHVwIGJpbmRlZCBldmVudHNcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coX3RoaXMuY29uZmlnLndpZGdldElkLCBfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKTtcclxuXHRcdFx0aWYgKCFfdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygndG9vbHRpcHN0ZXJlZCcpKSB7XHJcblx0XHRcdFx0X3RoaXMuJHRyaWdnZXIudG9vbHRpcHN0ZXIoe1xyXG5cdFx0XHRcdFx0YXJyb3c6IHRydWUsXHJcblx0XHRcdFx0XHRjb250ZW50OiAkKCc8c2VjdGlvbi8+JykuYXBwZW5kKF90aGlzLiRhY3Rpb25zLmNsb25lKHRydWUpKSxcclxuXHRcdFx0XHRcdHRyaWdnZXI6IF90aGlzLmNvbmZpZy50cmlnZ2VyRXZlbnQsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogX3RoaXMuY29uZmlnLnBvc2l0aW9uLFxyXG5cdFx0XHRcdFx0bWF4V2lkdGg6IF90aGlzLmNvbmZpZy5tYXhXaWR0aCxcclxuXHRcdFx0XHRcdHRoZW1lOiAndG9vbHRpcHN0ZXItc3BsaXRidXR0b24gUGFkZGluZy0nICsgX3RoaXMuY29uZmlnLnBhZGRpbmcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0X3RoaXMuJGFjdGlvbnMucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdFNhcHBoaXJlV2lkZ2V0cy5TcGxpdEJ1dHRvbiA9IHtcclxuXHRcdGNyZWF0ZTogY3JlYXRlLFxyXG5cdH07XHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTtcclxuIiwidmFyIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG52YXIgc3RvcHRpbWVyID0gdHJ1ZTtcclxudmFyIG15VGltb3V0ICA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBvbktleWRvd25GdW5jdGlvbigpIHtcclxuICAgIG1pbGlzZWNvbmRwYXNzZWQgPSAwO1xyXG4gIFxyXG4gICAgc3RvcHRpbWVyPXRydWU7XHJcbiAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgIG15VGltb3V0ID0gbnVsbDtcclxuICB9O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIG9uS2V5VXBGdW5jdGlvbihlbGVtZW50VG9DbGljaykge1xyXG4gIHN0b3B0aW1lciA9IGZhbHNlO1xyXG4gIFxyXG4gIGlmKG1pbGlzZWNvbmRwYXNzZWQgPT0gMCAmJiBteVRpbW91dD09bnVsbCl7XHJcbiAgICAgIG15VGltb3V0ID0gc2V0SW50ZXJ2YWwoXHJcbiAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBtaWxpc2Vjb25kcGFzc2VkKz0xMDA7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKG1pbGlzZWNvbmRwYXNzZWQgPj0gNDAwICYmIHN0b3B0aW1lcj09ZmFsc2UpIHtcclxuICAgICAgICAgICAgbWlsaXNlY29uZHBhc3NlZCA9IDA7XHJcbiAgICAgICAgICAgIHN0b3B0aW1lcj10cnVlO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICBpZihzdG9wdGltZXI9PXRydWUpe1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG15VGltb3V0KTtcclxuICAgICAgICAgICAgbXlUaW1vdXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3RvcHRpbWVyPT10cnVlKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChteVRpbW91dCk7XHJcbiAgICAgICAgICAgIG15VGltb3V0ID0gbnVsbDtcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbn07XHJcblxyXG5pZih0eXBlb2Yoc3NkQ29tcG9uZW50KSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICBzc2RDb21wb25lbnQgPSB7XHJcbiAgICAgICAgbGVuZ3RoOiAwLFxyXG4gICAgICAgIG51bWJlck9mQWN0aXZlOiAwLFxyXG4gICAgICAgIGlzUlRMOiBmYWxzZSxcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgdG9EZXN0cm95OiBmYWxzZSxcclxuICAgICAgICBvbkJsdXJEZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNzZENvbXBvbmVudC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSAkKCcjJyArIHNzZENvbXBvbmVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3dyYXBwZXIgPSAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3NkQ29tcG9uZW50LnRvRGVzdHJveSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLmZpbmQoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhLnRvLWRlc3Ryb3knKS5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIF93cmFwcGVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ1tkYXRhLXNzZC1wbGFjZWhvbGRlcj0nICsgc3NkQ29tcG9uZW50LmlkICsgJ10nKTtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudFdpZGdldCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudFdpZGdldCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5jaGlsZHJlbignZGl2LlNTRC1XcmFwcGVyOm5vdCguU2VsZWN0ZWQpJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vSWYgdGhpcyBTU0QtV3JhcHBlciBpcyBhbHJlYWR5IFNlbGVjdGVkLCByZXR1cm4uXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUpXHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuYmx1cigpOyAvL0JsdXJzIHRoZSBvdGhlciBmb2N1c2VkIFNTRCdzLlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKys7XHJcbiAgICAgICAgICAgIGlmKCFfc3NkQ29tcG9uZW50V2lkZ2V0LnBhcmVudCgpLmhhc0NsYXNzKCdTU0RQb3B1cCcpKXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzc2RDb21wb25lbnQuaXNSVEwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCkgLSAkKHRoaXMpLm91dGVyV2lkdGgoKSAtIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdXRvJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCcuU1NELUJhcicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcuU1NELUxpc3QnKS5hdHRyKCdjdXJyZW50LWZvY3VzJywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygnLlNTRC1MaXN0JykuYXR0cignY3VycmVudC1mb2N1cycsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighX3NzZENvbXBvbmVudFdpZGdldC5wYXJlbnQoKS5oYXNDbGFzcygnU1NEUG9wdXAnKSl7XHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50V2lkZ2V0LmNsb3Nlc3QoJ2Zvcm0nKS5hcHBlbmQoX3NzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudFdpZGdldC5hZGRDbGFzcygnUG9zaXRpb25lZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnRXaWRnZXQuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBibHVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYoIXNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfd3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5Qb3NpdGlvbmVkLlNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfd3JhcHBlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQoJyMnICsgJCh0aGlzKS5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3dyYXBwZXIucmVtb3ZlQ2xhc3MoJ1Bvc2l0aW9uZWQnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQ29tcG9uZW50JylcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyaWdodCc6ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdTZWFyY2hpbmcgRml4ZWQgS2V5Ym9hcmROYXYnKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oJy5TU0QtQmFyJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBfd3JhcHBlci5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuU1NELUJhcicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJzQ2xlYXIodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUtLTtcclxuICAgICAgICAgICAgJChcIi5TU0RfTGlzdFJlY29yZHMgc3BhbiwgLlNTRF9MaXN0TGluZS5TaG93TW9yZSwgLlNTRF9EZWxldGVPbkJsdXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZighc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvL0lmIHRoZXJlJ3Mgbm8gU1NEIGFjdGl2ZSwgdGhlcmUncyBubyBuZWVkIHRvIHJlc2l6ZSBpdC5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBfc3NkV3JhcHBlciA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJCgnIycgKyBfc3NkV3JhcHBlci5hdHRyKCdkYXRhLXNzZC1wbGFjZWhvbGRlcicpKVswXTtcclxuICAgICAgICAgICAgdmFyIF9zc2RDb21wb25lbnQgPSBfc3NkV3JhcHBlci5jaGlsZHJlbignLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIF9zc2RDb21wb25lbnQuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoX3NzZENvbXBvbmVudFdpZGdldCkud2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LyosXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NzZENvbXBvbmVudFdpZGdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNzZENvbXBvbmVudC5pc1JUTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAncmlnaHQnOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3NkQ29tcG9uZW50LmlzUlRMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpIC0gJChfc3NkQ29tcG9uZW50V2lkZ2V0KS5vdXRlcldpZHRoKCkgLSBfc3NkQ29tcG9uZW50V2lkZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXV0byc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9KS5jaGlsZHJlbignLlNTRC1CYXInKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS5jbG9zZXN0KCcuU1NELUNvbXBvbmVudCcpLmlubmVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiU2VsZWN0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsIHNzZEJhciwgc2VsZWN0ZWRUYWIsIGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NlbGVjdGVkVGFiID0gJChzZWxlY3RlZFRhYik7XHJcblxyXG4gICAgICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LmZvY3VzKHNzZENvbXBvbmVudFdpZGdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRUYWIuaXMoJy5TZWxlY3RlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQudGFic0NsZWFyKHNzZEJhcik7XHJcbiAgICAgICAgICAgICAgICBfc2VsZWN0ZWRUYWIuYWRkQ2xhc3MoJ1NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKHNzZEJhcixpc0lucHV0RXZlbnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9jdXNTZWxlY3RlZFRhYjogZnVuY3Rpb24oc3NkQmFyLGlzSW5wdXRFdmVudCkge1xyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNlYXJjaCBpbnB1dD9cclxuICAgICAgICAgICAgaWYoc3NkQmFyLmNoaWxkcmVuKCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyLlNlbGVjdGVkJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudFRvQ2xpY2sgPSBzc2RCYXIuc2libGluZ3MoJy5TU0RMaXN0UmVmcmVzaEhhbmRsZXInKS5maW5kKCdhOm5vdCgudG8tZGVzdHJveSknKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoaXNJbnB1dEV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBvbktleVVwRnVuY3Rpb24oZWxlbWVudFRvQ2xpY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50VG9DbGljay5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5JbnB1dFBsYWNlaG9sZGVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdOm5vdCg6Zm9jdXMpJykuZmlyc3QoKS5zZWxlY3QoKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBTZWxlY3RlZCB0YWIgaXMgdGhlIFNob3J0IGxpc3Q/XHJcbiAgICAgICAgICAgIGlmKHNzZEJhci5jaGlsZHJlbignLlNob3J0TGlzdFNlbGVjdG9yLUNvbnRhaW5lci5TZWxlY3RlZCcpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQmFyLmZpbmQoJy5TaG9ydExpc3RTZWxlY3Rvci1Db250YWluZXIgPiBhJykuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBNZXRob2QgYmVpbmcgY2FsbGVkIGJ5IHVzZXIgYWN0aW9uIGpzX3NzZENvbXBvbmVudF9mb2N1c0N1cnJlbnRSb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb2N1c0N1cnJlbnRSb3c6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcbiAgICAgICAgICAgIHZhciBfY3VycmVudEZvY3VzID0gX3NzZExpc3QuYXR0cignY3VycmVudC1mb2N1cycpO1xyXG5cclxuICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOm50aC1jaGlsZCgnICsgX2N1cnJlbnRGb2N1cyArICcpJykuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJzQ2xlYXI6IGZ1bmN0aW9uKHNzZEJhcikge1xyXG4gICAgICAgICAgICAkKHNzZEJhcikuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnU2VsZWN0ZWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlYXJjaEljb246IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC50YWJTZWxlY3QoZXZlbnQuZGF0YS5zc2RDb21wb25lbnRXaWRnZXQsIGV2ZW50LmRhdGEuc3NkQmFyLCAkKGV2ZW50LmRhdGEuc3NkQmFyKS5jaGlsZHJlbignLlNlYXJjaElucHV0LUNvbnRhaW5lcicpLGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogQG5hbWUgaW5wdXRFdmVudFxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnB1dEV2ZW50OiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0Q29udGFpbmVyID0gJChldmVudC5kYXRhLmlucHV0KS5jbG9zZXN0KCcuU2VhcmNoSW5wdXQtQ29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudGFiU2VsZWN0KGV2ZW50LmRhdGEuc3NkQ29tcG9uZW50V2lkZ2V0LCBldmVudC5kYXRhLnNzZEJhciwgX2lucHV0Q29udGFpbmVyLHRydWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoJChldmVudC5kYXRhLmlucHV0KS52YWwoKSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykucmVtb3ZlQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2lucHV0Q29udGFpbmVyLmNsb3Nlc3QoJy5TU0QtQ29tcG9uZW50JykuYWRkQ2xhc3MoJ1NlYXJjaGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBrZXlkb3duRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgb25LZXlkb3duRnVuY3Rpb24oKTsgICAgICAgICAgXHJcbiAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGtleWJvYXJkSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiU2hpZnRcIiB8fCBldmVudC5rZXkgPT0gXCJDb250cm9sXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc3NkTGlzdCA9IF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1MaXN0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJFbnRlclwiICYmIF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJUYWJcIikge1xyXG4gICAgICAgICAgICAgICAgX3NzZENvbXBvbmVudC5hZGRDbGFzcygnS2V5Ym9hcmROYXYnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dVcFwiIHx8IGV2ZW50LmtleSA9PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmF0dHIoJ2N1cnJlbnQtZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRFbGVtZW50ID0gJChudWxsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoX3NzZExpc3QuZmluZCgnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKF9jdXJyZW50Rm9jdXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpudGgtY2hpbGQoJyArIF9jdXJyZW50Rm9jdXMgKyAnKScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LmFkZENsYXNzKCdLZXlib2FyZE5hdicpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKF9zZWxlY3RlZEVsZW1lbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50LmlzKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlLmZvY3VzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpLnByZXYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbicpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQgPSBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NzZExpc3QuZmluZCgnc3Bhbi5TU0RfTGlzdFJlY29yZHMgPiBzcGFuOmxhc3QtY2hpbGQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3NlbGVjdGVkRWxlbWVudC5pcygnLlNTRF9MaXN0TGluZS5TaG93TW9yZS5mb2N1cycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LnJlbW92ZUNsYXNzKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9ICQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50ID0gX3NlbGVjdGVkRWxlbWVudC5yZW1vdmVDbGFzcygnZm9jdXMnKS5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCAmJiBfc3NkTGlzdC5maW5kKCcuU1NEX0xpc3RMaW5lLlNob3dNb3JlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGVjdGVkRWxlbWVudCA9IF9zc2RMaXN0LmZpbmQoJ3NwYW4uU1NEX0xpc3RSZWNvcmRzID4gc3BhbjpmaXJzdC1jaGlsZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY3VycmVudEZvY3VzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF9zZWxlY3RlZEVsZW1lbnQuYWRkQ2xhc3MoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKCFfc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5mb2N1c1NlbGVjdGVkVGFiKF9zc2RDb21wb25lbnQuZmluZCgnLlNTRC1CYXInKSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRGb2N1cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghX3NlbGVjdGVkRWxlbWVudC5maW5kKCcuU1NEX0xpc3RMaW5lLkRpc2FibGVkJykubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBfc2VsZWN0ZWRFbGVtZW50LmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkTGlzdC5maW5kKCdhLk90aGVyQ29udHJvbExpbmsnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgX2N1cnJlbnRGb2N1cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhfc3NkQ29tcG9uZW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyS2V5Ym9hcmROYXZTdGF0dXM6IGZ1bmN0aW9uKHNzZENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoc3NkQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgdmFyIF9zc2RMaXN0ID0gX3NzZENvbXBvbmVudC5maW5kKCcuU1NELUxpc3QnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKF9zc2RMaXN0LmZpbmQoJy5TU0RfTGlzdExpbmUuU2hvd01vcmUuZm9jdXMnKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdLZXlib2FyZE5hdicpO1xyXG4gICAgICAgICAgICBfc3NkTGlzdC5hdHRyKCdjdXJyZW50LWZvY3VzJywgMClcclxuICAgICAgICAgICAgICAgIC5maW5kKCdzcGFuLlNTRF9MaXN0UmVjb3JkcyA+IHNwYW4uZm9jdXMnKS5yZW1vdmVDbGFzcygnZm9jdXMnKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5FeHBhbmRDb250cm9sID4gYScpLmJsdXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9ICQoJ2Rpdi5TU0QtV3JhcHBlci5TZWxlY3RlZCAuU1NELUNvbXBvbmVudCcpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIGlmKE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCkgPD0gMTAyNCl7XHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsICQoXCIudG9vbGJhci13cmFwcGVyLkZpeGVkXCIpLm91dGVySGVpZ2h0KCkgKyAncHgnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLypOb3QgTW9iaWxlIGFwcGx5IGZpeGVkIGJlaGF2aW91ciovXHJcbiAgICAgICAgICAgICAgICBpZihfc3NkQ29tcG9uZW50WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+ICgkKCcuVG9wUGF0aWVudEhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJCgnLkhlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpICsgJChcIi50b29sYmFyLXdyYXBwZXJcIikub3V0ZXJIZWlnaHQoKSsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpICkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3NkQ29tcG9uZW50LnJlbW92ZUNsYXNzKCdGaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5TU0QtV3JhcHBlci5TZWxlY3RlZCA+IC5TU0QtQ29tcG9uZW50LkZpeGVkID4gLlNTRC1CYXInKS5jc3MoJ3RvcCcsKCQoJy5Ub3BQYXRpZW50SGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKCcuSGVhZGVyJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKFwiLnRvb2xiYXItd3JhcHBlclwiKS5vdXRlckhlaWdodCgpICsgJCgnLkNUVEFTTGV2ZWxBc3Nlc3NtZW50TWFpbkNvbnRhaW5lcicpLm91dGVySGVpZ2h0KHRydWUpKSArICdweCcpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIF9zc2RDb21wb25lbnQuYWRkQ2xhc3MoJ0ZpeGVkJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbihfaW5wdXRJZCkgeyAvKiBVc2VkIHRvIGRlc3Ryb3kgYSBzcGVjaWZpYyBzc2QgY29tcG9uZW50IGJ5IHJlY2VpdmUgdGhlIGlucHV0IGlkZW50aWZpZXIgYXMgcGFyYW1ldGVyIGFuZCBkZXRlcm1pbmUgdGhlIHdyYXBwZXIgdG8gcmVtb3ZlLiAqL1xyXG4gICAgICAgICAgICAkKCdbZGF0YS1zc2QtcGxhY2Vob2xkZXI9JyArIHNzZENvbXBvbmVudC5pZCArICddJykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbihzc2RDb21wb25lbnRXaWRnZXQsX3RvRGVzdHJveSkge1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQubGVuZ3RoKys7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5udW1iZXJPZkFjdGl2ZSA9IDA7XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5pc1JUTCA9ICQoJ2h0bWwnKS5pcygnLnJ0bCcpO1xyXG4gICAgICAgICAgICBzc2RDb21wb25lbnQudG9EZXN0cm95ID0gX3RvRGVzdHJveTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzc2RDb21wb25lbnRXaWRnZXQgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudC5pZCA9ICQoc3NkQ29tcG9uZW50V2lkZ2V0KS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfc3NkQ29tcG9uZW50V2lkZ2V0ID0gJChzc2RDb21wb25lbnRXaWRnZXQpO1xyXG4gICAgICAgICAgICB2YXIgX3NzZENvbXBvbmVudCA9IF9zc2RDb21wb25lbnRXaWRnZXQuZmluZCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICAgICAgdmFyIF9zc2RCYXIgPSBfc3NkQ29tcG9uZW50LmNoaWxkcmVuKCcuU1NELUJhcicpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfc2VhcmNoSWNvbiA9IF9zc2RCYXIuZmluZCgnLlNlYXJjaEljb24nKS5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgX2lucHV0ID0gX3NzZEJhci5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHZhciBfY2xlYXJDb250cm9sID0gX3NzZEJhci5maW5kKCcuQ2xlYXJDb250cm9sJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9zZWFyY2hJY29uLm9mZignY2xpY2snKS5vbignY2xpY2snLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXJcclxuICAgICAgICAgICAgfSwgc3NkQ29tcG9uZW50LnNlYXJjaEljb24pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgX3NzZEJhci5jaGlsZHJlbignZGl2Jykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHtcclxuICAgICAgICAgICAgICAgIHNzZENvbXBvbmVudFdpZGdldDogX3NzZENvbXBvbmVudFdpZGdldCxcclxuICAgICAgICAgICAgICAgIHNzZEJhcjogX3NzZEJhclxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50LnRhYlNlbGVjdChldmVudC5kYXRhLnNzZENvbXBvbmVudFdpZGdldCwgZXZlbnQuZGF0YS5zc2RCYXIsIHRoaXMsZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9jbGVhckNvbnRyb2wub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF9pbnB1dC5vZmYoJ2tleXVwJykub24oJ2tleXVwJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50V2lkZ2V0OiBfc3NkQ29tcG9uZW50V2lkZ2V0LFxyXG4gICAgICAgICAgICAgICAgc3NkQmFyOiBfc3NkQmFyLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IF9pbnB1dFxyXG4gICAgICAgICAgICB9LCBzc2RDb21wb25lbnQuaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBfaW5wdXQub2ZmKCdrZXlkb3duJykub24oJ2tleWRvd24nLCB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnRXaWRnZXQ6IF9zc2RDb21wb25lbnRXaWRnZXQsXHJcbiAgICAgICAgICAgICAgICBzc2RCYXI6IF9zc2RCYXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dDogX2lucHV0XHJcbiAgICAgICAgICAgIH0sIHNzZENvbXBvbmVudC5rZXlkb3duRXZlbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChfc3NkQ29tcG9uZW50KS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywge1xyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50OiBfc3NkQ29tcG9uZW50XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzc2RDb21wb25lbnQuY2xlYXJLZXlib2FyZE5hdlN0YXR1cyhldmVudC5kYXRhLnNzZENvbXBvbmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgc3NkQ29tcG9uZW50LnJlc2l6ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYoISQoZXZlbnQudGFyZ2V0KS5pcygnOnZpc2libGUnKSkgeyAvKiBDbGlja3Mgb24gaGlkZGVuIGVsZW1lbnRzIGFyZSBkaXNtaXNzZWQuICovXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGUgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLlNTRC1Db21wb25lbnQnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighZS5sZW5ndGgpIHsgLy8gVXNlciBjbGlja2VkIG91dHNpZGUgdGhlIFNTRC1Db21wb25lbnQ/XHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5vbkJsdXJEZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LmtleUNvZGUgPT0gXCIyN1wiKSB7IC8vIFVzZXIgaGl0IEVzY2FwZVxyXG4gICAgICAgICAgICAgICAgc3NkQ29tcG9uZW50Lm9uQmx1ckRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihldmVudC5rZXkgPT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZihzc2RDb21wb25lbnQubnVtYmVyT2ZBY3RpdmUgPiAwKSB7IC8vIElmIHRoZXJlJ3MgYW4gU1NEIGNvbXBvbmVudCBhY3RpdmUsIGdvIGZvciBLZXlib2FyZCBoYW5kbGVyXHJcbiAgICAgICAgICAgIHNzZENvbXBvbmVudC5rZXlib2FyZEhhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoc3NkQ29tcG9uZW50Lm51bWJlck9mQWN0aXZlID4gMCkgeyAvLyBJZiB0aGVyZSdzIGFuIFNTRCBjb21wb25lbnQgYWN0aXZlLCBnbyBmb3Igc2Nyb2xsIGhhbmRsZXJcclxuICAgICAgICAgICAgc3NkQ29tcG9uZW50LnNjcm9sbEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbiIsIi8qIENvbXBvbmVudCBTU0RMaXN0TGluZSAqL1xuU2FwcGhpcmVXaWRnZXRzLlNTRExpc3RMaW5lID0ge1xuXHR0b2dnbGU6IChsaW5lSWQsIGxpbmVIYW5kbGVyID0gJycpID0+IHtcblx0XHR2YXIgX2xpbmUgPSAkKGxpbmVJZCkuaXMoJy5TU0RfTGlzdExpbmUnKVxuXHRcdFx0PyAkKGxpbmVJZClcblx0XHRcdDogJChsaW5lSWQpXG5cdFx0XHRcdFx0LmNoaWxkcmVuKCcuU1NEX0xpc3RMaW5lJylcblx0XHRcdFx0XHQuZmlyc3QoKTtcblxuXHRcdGlmICghX2xpbmUubGVuZ3RoKSByZXR1cm47XG5cblx0XHR2YXIgX2V4cGFuZENvbnRyb2wgPSAkKCcuZXhwYW5kLWNvbnRyb2wtY3VzdG9tLXdpZHRoJyk7XG5cblx0XHRpZiAoX2V4cGFuZENvbnRyb2wubGVuZ3RoICE9IDApIHtcblx0XHRcdF9leHBhbmRDb250cm9sLnJlbW92ZUNsYXNzKCdleHBhbmQtY29udHJvbC1jdXN0b20td2lkdGgnKTtcblx0XHRcdF9leHBhbmRDb250cm9sLmNzcygnd2lkdGgnLCAnJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFfbGluZS5pcygnLkFjdGl2ZScpKSB7XG5cdFx0XHR2YXIgX2xpbmVIZWFkZXIgPSBfbGluZVxuXHRcdFx0XHQuY2xvc2VzdCgnZGl2LlNlbGVjdGFibGVMaXN0LCAuU2VsZWN0YWJsZUxpc3QtTGlzdFJlY29yZHMnKVxuXHRcdFx0XHQuZmluZCgnZGl2LlNlbGVjdGFibGVMaXN0LUxpbmUuQWN0aXZlJylcblx0XHRcdFx0Lm5vdChfbGluZSk7XG5cblx0XHRcdF9saW5lSGVhZGVyLmZpbmQoJ2FbaGlkZS1hY3Rpb25dJykuY2xpY2soKTtcblx0XHRcdF9saW5lSGVhZGVyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcygnQWN0aXZlJylcblx0XHRcdFx0LmNoaWxkcmVuKCdzcGFuJylcblx0XHRcdFx0LmhpZGUoMjAwKTtcblx0XHRcdF9saW5lLmFkZENsYXNzKCdBY3RpdmUnKTtcblxuXHRcdFx0aWYgKCQobGluZUhhbmRsZXIpLmxlbmd0aCkge1xuXHRcdFx0XHQkKGxpbmVIYW5kbGVyKS5jbGljaygpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRfbGluZS5yZW1vdmVDbGFzcygnQWN0aXZlJyk7XG5cdFx0fVxuXHR9LFxufTtcbiIsInZhciBzZXR1cFRhYnVsYXJTY3JvbGwgPSBmdW5jdGlvbigkdGFidWxhclNjcm9sbCkge1xuXHR2YXIgJHRvcFNjcm9sbFdyYXBwZXIgPSAkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpO1xuXHR2YXIgJGNlbnRlclRhYmxlID0gJHRhYnVsYXJTY3JvbGwuZmluZCgnLlRhYnVsYXJTY3JvbGwtY2VudGVyLXRhYmxlJyk7XG5cdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdCRjZW50ZXJUYWJsZS5zY3JvbGxMZWZ0KCR0b3BTY3JvbGxXcmFwcGVyLnNjcm9sbExlZnQoKSk7XG5cdH0pO1xuXHQkY2VudGVyVGFibGUuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdCR0b3BTY3JvbGxXcmFwcGVyLnNjcm9sbExlZnQoJGNlbnRlclRhYmxlLnNjcm9sbExlZnQoKSk7XG5cdH0pO1xuXHQvLyBzaW1pbGFyIHRvIFJlc2l6ZVxuXHR2YXIgdGFibGVXaWR0aCA9ICRjZW50ZXJUYWJsZS5maW5kKCd0YWJsZScpLndpZHRoKCk7XG5cdCR0YWJ1bGFyU2Nyb2xsLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpLndpZHRoKHRhYmxlV2lkdGgpO1xuXHRpZiAoJGNlbnRlclRhYmxlWzBdLnNjcm9sbFdpZHRoID4gJGNlbnRlclRhYmxlLndpZHRoKCkpIHtcblx0XHQkdGFidWxhclNjcm9sbC5maW5kKCcuVG9wU2Nyb2xsV3JhcHBlcicpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdH0gZWxzZSB7XG5cdFx0JHRhYnVsYXJTY3JvbGwuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdH1cbn07XG5cbiQoZnVuY3Rpb24oKSB7XG5cdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuXHRcdHNldHVwVGFidWxhclNjcm9sbCgkKGVsKSk7XG5cdH0pO1xufSk7XG5cbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xuXHRvc0FqYXhCYWNrZW5kLkJpbmRBZnRlckFqYXhSZXF1ZXN0KGZ1bmN0aW9uKCkge1xuXHRcdCQoJy5UYWJ1bGFyU2Nyb2xsJykuZWFjaChmdW5jdGlvbihpLCBlbCkge1xuXHRcdFx0c2V0dXBUYWJ1bGFyU2Nyb2xsKCQoZWwpKTtcblx0XHR9KTtcblx0fSk7XG59KTtcblxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcblx0JCgnLlRhYnVsYXJTY3JvbGwnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XG5cdFx0dmFyICRjZW50ZXJUYWJsZSA9ICQoZWwpLmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlci10YWJsZScpO1xuXHRcdHZhciB0YWJsZVdpZHRoID0gJGNlbnRlclRhYmxlLmZpbmQoJ3RhYmxlJykud2lkdGgoKTtcblx0XHQkKGVsKVxuXHRcdFx0LmZpbmQoJy5UYWJ1bGFyU2Nyb2xsLWNlbnRlciAuVG9wU2Nyb2xsRHJhZ2dlcicpXG5cdFx0XHQud2lkdGgodGFibGVXaWR0aCk7XG5cdFx0aWYgKCRjZW50ZXJUYWJsZVswXS5zY3JvbGxXaWR0aCA+ICRjZW50ZXJUYWJsZS53aWR0aCgpKSB7XG5cdFx0XHQkKGVsKVxuXHRcdFx0XHQuZmluZCgnLlRvcFNjcm9sbFdyYXBwZXInKVxuXHRcdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JChlbClcblx0XHRcdFx0LmZpbmQoJy5Ub3BTY3JvbGxXcmFwcGVyJylcblx0XHRcdFx0LmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHR9XG5cdH0pO1xufSk7XG4iLCIvKiBDb21wb25lbnQgVGFic0V4dGVuZGVkICovXG5TYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkID0gZnVuY3Rpb24oKSB7XG5cdCQoJy5UYWJzX0V4dGVuZGVkIC5UYWJzX2hlYWRlciA+IC5UYWJzX190YWInKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkKHRoaXMpLnRleHQoKSA9PT0gJycpIHtcblx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcuVGFic19FeHRlbmRlZCAuVGFic19oZWFkZXIgLlRhYnNfX3RhYjpub3QoLmFjdGl2ZSknKVxuXHRcdC5vZmYoJ21vdXNlZG93bicpXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihldnQpIHtcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xuXHRcdFx0JHRhYnNFeHRlbmRlZC5yZW1vdmVDbGFzcygnaXNDbG9zZWQnKTtcblx0XHR9KTtcblxuXHQkKCcuVGFic19FeHRlbmRlZC5IaWRlQWN0aXZlT25DbGljayAuVGFic19oZWFkZXInKVxuXHRcdC5vZmYoJ21vdXNlZG93bicpXG5cdFx0Lm9uKCdtb3VzZWRvd24nLCAnLlRhYnNfX3RhYi5hY3RpdmUnLCBmdW5jdGlvbihldnQpIHtcblx0XHRcdHZhciAkdGFic0V4dGVuZGVkID0gJChldnQudGFyZ2V0KS5jbG9zZXN0KCcuVGFic19FeHRlbmRlZCcpO1xuXHRcdFx0dmFyICR0YWJzQm9keSA9ICR0YWJzRXh0ZW5kZWQuZmluZCgnLlRhYnNfYm9keScpO1xuXG5cdFx0XHRpZiAoJHRhYnNCb2R5Lmhhc0NsYXNzKCdUYWJzX2JvZHktLWNsb3NlZCcpKSB7XG5cdFx0XHRcdCR0YWJzQm9keS5yZW1vdmVDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5yZW1vdmVDbGFzcygnaXNDbG9zZWQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCR0YWJzQm9keS5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcblx0XHRcdFx0JHRhYnNFeHRlbmRlZC5hZGRDbGFzcygnaXNDbG9zZWQnKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHQkKCcuVGFic19FeHRlbmRlZC0tZGlzYWJsZWQnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbCkge1xuXHRcdCQoZWwpXG5cdFx0XHQucGFyZW50KClcblx0XHRcdC5jc3MoJ2N1cnNvcicsICdkZWZhdWx0Jylcblx0XHRcdC5vZmYoJ2NsaWNrJyk7XG5cdH0pO1xuXG5cdCQoJy5UYWJzX0V4dGVuZGVkJykuZWFjaChmdW5jdGlvbihpbmRleCwgZWwpIHtcblx0XHRpZiAoJChlbCkuaGFzQ2xhc3MoJ1RhYnNfRXh0ZW5kZWQtLWNsb3NlZG9uc3RhcnQnKSkge1xuXHRcdFx0JChlbClcblx0XHRcdFx0LmZpbmQoJy5UYWJzX2JvZHknKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ1RhYnNfYm9keS0tY2xvc2VkJyk7XG5cdFx0XHQkKGVsKS5hZGRDbGFzcygnaXNDbG9zZWQnKTtcblx0XHRcdCQoZWwpLnJlbW92ZUNsYXNzKCdUYWJzX0V4dGVuZGVkLS1jbG9zZWRvbnN0YXJ0Jyk7XG5cdFx0fVxuXHRcdCQoZWwpXG5cdFx0XHQub2ZmKCdjbGljaycpXG5cdFx0XHQub24oJ2NsaWNrJywgJy5UYWJzX0V4dGVuZGVkLS1jbG9zZScsIGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHQkKGV2dC50YXJnZXQpXG5cdFx0XHRcdFx0LmNsb3Nlc3QoJy5UYWJzX2JvZHknKVxuXHRcdFx0XHRcdC5hZGRDbGFzcygnVGFic19ib2R5LS1jbG9zZWQnKTtcblx0XHRcdH0pO1xuXHR9KTtcbn07XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRTYXBwaGlyZVdpZGdldHMuVGFic0V4dGVuZGVkKCk7XG5cdG9zQWpheEJhY2tlbmQuQmluZEFmdGVyQWpheFJlcXVlc3QoU2FwcGhpcmVXaWRnZXRzLlRhYnNFeHRlbmRlZCk7XG59KTtcbiIsIi8qIENvbXBvbmVudCBUcmlnZ2VySWZyYW1lVG9vbHRpcCAqL1xyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCBTYXBwaGlyZVdpZGdldHMpIHtcclxuXHJcbiAgdmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgIHZhciAkZWxlbWVudElkID0gJCgnIycgKyBjb25maWcuZWxlbWVudElkKTtcclxuICAgICRlbGVtZW50SWQuYWRkQ2xhc3MoJ3Rvb2x0aXAnKTtcclxuXHJcbiAgICB2YXIgZXh0cmFEYXRhUGFyYW1zID0gJ2RhdGEtaWZyYW1ldG9vbHRpcHRyaWdnZXJpZD1cIicgKyBjb25maWcuZWxlbWVudElkICsgJ1wiJztcclxuICAgIHZhciB3aWRnZXROb3RpZnlEaXYgPSAkLmZpbmQoJ1tkYXRhLWlmcmFtZXRvb2x0aXB0cmlnZ2VyaWQ9XCInICsgY29uZmlnLmVsZW1lbnRJZCArICdcIl0nKTtcclxuICAgIGlmICh3aWRnZXROb3RpZnlEaXYubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGV4dHJhRGF0YVBhcmFtcyArPSBcIiBkYXRhLWlmcmFtZXRvb2x0aXBub3RpZnlpZD1cIiArICQod2lkZ2V0Tm90aWZ5RGl2KS5kYXRhKCdpZnJhbWV0b29sdGlwbm90aWZ5aWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAkZWxlbWVudElkLnRvb2x0aXBzdGVyKHtcclxuICAgICAgY29udGVudEFzSFRNTDogdHJ1ZSxcclxuICAgICAgdGhlbWU6IGNvbmZpZy50aGVtZSxcclxuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXHJcbiAgICAgIHBvc2l0aW9uOiBjb25maWcucG9zaXRpb25JZCxcclxuICAgICAgdHJpZ2dlcjogY29uZmlnLnRyaWdnZXJJZCxcclxuICAgICAgbWluV2lkdGg6IGNvbmZpZy5taW5XaWR0aCxcclxuICAgICAgbWF4V2lkdGg6IGNvbmZpZy5tYXhXaWR0aCxcclxuICAgICAgemluZGV4OiBjb25maWcuemluZGV4LFxyXG4gICAgICBjb250ZW50OiAnPGlmcmFtZSBzcmM9XCInICsgY29uZmlnLlVSTCArICdcIiBzdHlsZT1cImJvcmRlcjpub25lXCIgaWQ9XCJ0b29sdGlwc3Rlci1mcmFtZVwiICcgKyBleHRyYURhdGFQYXJhbXMgKyAnPjwvaWZyYW1lPicsXHJcbiAgICAgIGZ1bmN0aW9uUmVhZHk6IGZ1bmN0aW9uIChpbnN0YW5jZSwgaGVscGVyKSB7XHJcbiAgICAgICAgJChoZWxwZXIpLmNzcyh7XHJcbiAgICAgICAgICAndmlzaWJpbGl0eSc6ICdoaWRkZW4nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkKCcudG9vbHRpcHN0ZXItYmFzZScpLmNzcyh7XHJcbiAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIFNhcHBoaXJlV2lkZ2V0cy5UcmlnZ2VySWZyYW1lVG9vbHRpcCA9IHtcclxuICAgIGNyZWF0ZVxyXG4gIH1cclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCwgU2FwcGhpcmVXaWRnZXRzKTsiLCIvL1NhcHBoaXJlV2lkZ2V0cyA9IHdpbmRvdy5TYXBwaGlyZVdpZGdldHMgPSB3aW5kb3cuU2FwcGhpcmVXaWRnZXRzIHx8IHt9O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==