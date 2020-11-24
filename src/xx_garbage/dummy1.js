function defineCanvas(canvas, jsonToLoad, canvasContainerid) {
	setTimeout(function() {
		if (jsonToLoad != '') canvas.loadFromJSON(jsonToLoad);

		// Background Color

		canvas.setHeight($('#' + canvasContainerid).height());
		canvas.setWidth($('#' + canvasContainerid).width());

		var imgObj = new Image();
		imgObj.src = canvas.initbackgroundurl;
		imgObj.onload = function() {
			canvas.setHeight($('#' + canvasContainerid).height());
			canvas.setWidth($('#' + canvasContainerid).width());
			var image = new fabric.Image(imgObj);
			image.set({
				originX: 'left',
				originY: 'top',
			});
			canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
			canvas.backgroundImage.scaleToHeight(canvas.height);

			canvas.renderAll();
			var newTop = (canvas.height - canvas.backgroundImage.height * canvas.backgroundImage.scaleY) / 2;
			var newLeft = (canvas.width - canvas.backgroundImage.width * canvas.backgroundImage.scaleX) / 2;
			if (newTop < 0) {
				newTop = 0;
			}
			if (newLeft < 0) {
				newLeft = 0;
			}
			canvas.backgroundImage.left = newLeft;
			canvas.backgroundImage.top = newTop;
			canvas.renderAll();
		};

		//Parameters
		canvas.isDrawingMode = 1;
		canvas.freeDrawingBrush.color = 'Black';
		canvas.freeDrawingBrush.width = 10;
		canvas.renderAll();
		canvas.counter = 0;
		canvas.selection = false;
		updateModifications(canvas);
		canvas.haschange = true;
		canvas.initfontSize = 10;
		canvas.fontSize = 10;

		canvas.on('object:selected', function() {
			deleteObject(canvas);
		});

		canvas.on('object:modified', function() {
			updateModifications(canvas);
			canvas.initdownload_milisecondpassed = 0;
			canvas.initdownload_stoptimer = true;
			clearInterval(canvas.initdownload_myTimout);
			canvas.initdownload_myTimout = null;
			canvas.haschange = true;
		});

		canvas.on('object:added', function() {
			updateModifications(canvas);
			canvas.initdownload_milisecondpassed = 0;
			canvas.initdownload_stoptimer = true;
			clearInterval(canvas.initdownload_myTimout);
			canvas.initdownload_myTimout = null;
			canvas.haschange = true;
		});

		// MOUSE DOWN
		canvas.on('mouse:down', function(o) {
			if (canvas.initdrawingMode == 'dashed' || canvas.initdrawingMode == 'line') {
				isDown = true;
				var pointer = canvas.getPointer(o.e);
				var points = [pointer.x, pointer.y, pointer.x, pointer.y];
				line = new fabric.Line(points, {
					strokeWidth: canvas.freeDrawingBrush.width,
					fill: canvas.freeDrawingBrush.color,
					stroke: canvas.freeDrawingBrush.color,
					originX: 'center',
					originY: 'center',
				});
				if (canvas.initdrawingMode == 'line') line.strokeDashArray = [];
				else line.strokeDashArray = [5, 5];
				canvas.add(line);
				line.arrowLine1 = null;
				line.arrowLine2 = null;
			}

			if (canvas.initdrawingMode == 'arrow') {
				isDown = true;
				var pointer = canvas.getPointer(o.e);
				var points = [pointer.x, pointer.y, pointer.x, pointer.y];
				fromx = pointer.x;
				fromy = pointer.y;

				line = new fabric.Line(points, {
					strokeWidth: canvas.freeDrawingBrush.width,
					fill: canvas.freeDrawingBrush.color,
					stroke: canvas.freeDrawingBrush.color,
					originX: 'center',
					originY: 'center',
				});
				canvas.add(line);

				/*add arrow lines*/
				arrowLine1 = new fabric.Line(points, {
					strokeWidth: canvas.freeDrawingBrush.width,
					fill: canvas.freeDrawingBrush.color,
					stroke: canvas.freeDrawingBrush.color,
					originX: 'center',
					originY: 'center',
				});
				canvas.add(arrowLine1);

				arrowLine2 = new fabric.Line(points, {
					strokeWidth: canvas.freeDrawingBrush.width,
					fill: canvas.freeDrawingBrush.color,
					stroke: canvas.freeDrawingBrush.color,
					originX: 'center',
					originY: 'center',
				});
				canvas.add(arrowLine2);
				line.arrowLine1 = arrowLine1;
				line.arrowLine2 = arrowLine2;
			}

			if (canvas.initdrawingMode == 'circle' || canvas.initdrawingMode == 'circlefilled') {
				isDown = true;
				var pointer = canvas.getPointer(o.e);
				origX = pointer.x;
				origY = pointer.y;
				ellipse = new fabric.Ellipse({
					left: origX,
					top: origY,
					originX: 'left',
					originY: 'top',
					rx: pointer.x - origX,
					ry: pointer.y - origY,
					angle: 0,
					strokeWidth: canvas.freeDrawingBrush.width,
					fill: '',
					stroke: canvas.freeDrawingBrush.color,
				});
				if (canvas.initdrawingMode == 'circlefilled') ellipse.fill = canvas.freeDrawingBrush.color;
				else ellipse.fill = '';
				canvas.add(ellipse);
			}

			if (canvas.initdrawingMode == 'square' || canvas.initdrawingMode == 'squarefilled') {
				isDown = true;
				var pointer = canvas.getPointer(o.e);
				origX = pointer.x;
				origY = pointer.y;
				rectangle = new fabric.Rect({
					left: origX,
					top: origY,
					strokeWidth: canvas.freeDrawingBrush.width,
					fill: '',
					stroke: canvas.freeDrawingBrush.color,
				});
				if (canvas.initdrawingMode == 'squarefilled') rectangle.fill = canvas.freeDrawingBrush.color;
				else rectangle.fill = '';
				canvas.add(rectangle);
			}
			canvas.haschange = true;
			hideSymbolsListing();
		});

		// MOUSE MOVE
		canvas.on('mouse:move', function(o) {
			if (canvas.initdrawingMode == 'line' || canvas.initdrawingMode == 'dashed') {
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				line.set({ x2: pointer.x, y2: pointer.y });
				canvas.renderAll();
			}

			if (canvas.initdrawingMode == 'arrow') {
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				tox = pointer.x;
				toy = pointer.y;
				line.set({ x2: pointer.x, y2: pointer.y });
				canvas_arrow(canvas);
				canvas.renderAll();
			}
			if (canvas.initdrawingMode == 'circle' || canvas.initdrawingMode == 'circlefilled') {
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				var rx = Math.abs(origX - pointer.x) / 2;
				var ry = Math.abs(origY - pointer.y) / 2;
				if (rx > ellipse.strokeWidth) {
					rx -= ellipse.strokeWidth / 2;
				}
				if (ry > ellipse.strokeWidth) {
					ry -= ellipse.strokeWidth / 2;
				}
				ellipse.set({ rx: rx, ry: ry });

				if (origX > pointer.x) {
					ellipse.set({ originX: 'right' });
				} else {
					ellipse.set({ originX: 'left' });
				}
				if (origY > pointer.y) {
					ellipse.set({ originY: 'bottom' });
				} else {
					ellipse.set({ originY: 'top' });
				}
				canvas.renderAll();
			}

			if (canvas.initdrawingMode == 'square' || canvas.initdrawingMode == 'squarefilled') {
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				if (origX > pointer.x) {
					rectangle.set({ left: Math.abs(pointer.x) });
				}
				if (origY > pointer.y) {
					rectangle.set({ top: Math.abs(pointer.y) });
				}

				rectangle.set({ width: Math.abs(origX - pointer.x) });
				rectangle.set({ height: Math.abs(origY - pointer.y) });
				canvas.renderAll();
			}
		});

		// MOUSE UP
		canvas.on('mouse:up', function(o) {
			isDown = false;
			canvas.haschange = true;
			if (canvas.initdrawingMode == 'text') {
				var pointer = canvas.getPointer(o.e);
				var iText = new fabric.IText('', { padding: 7 });
				iText.left = pointer.x;
				iText.top = pointer.y;
				iText.setColor(canvas.freeDrawingBrush.color);
				iText.fontSize = canvas.fontSize;
				canvas.add(iText).setActiveObject(iText);
				iText.enterEditing();
				/*canvas.initdrawingMode = 'shape';
									$('#"+Content.Id+" div.SelectionClass').click();*/
			} else {
				if (canvas.initdrawingMode == 'square' || canvas.initdrawingMode == 'squarefilled') {
					rectangle.selectable = false;
					canvas.remove(rectangle);
					canvas.add(rectangle);
				}
				if (canvas.initdrawingMode == 'dashed' || canvas.initdrawingMode == 'line') {
					line.selectable = false;
					canvas.remove(line);
					canvas.add(line);
				}

				if (canvas.initdrawingMode == 'arrow') {
					line.selectable = false;
					canvas.remove(line);
					canvas.add(line);
					arrowLine1.selectable = false;
					canvas.remove(arrowLine1);
					canvas.add(arrowLine1);
					arrowLine2.selectable = false;
					canvas.remove(arrowLine2);
					canvas.add(arrowLine2);
				}

				if (canvas.initdrawingMode == 'circle' || canvas.initdrawingMode == 'circlefilled') {
					ellipse.selectable = false;
					canvas.remove(ellipse);
					canvas.add(ellipse);
				}

				canvas.add();
				canvas.discardActiveObject();
				canvas.renderAll();
			}
		});

		canvas.on('mouse:out', function(e) {
			canvas.initdownload_stoptimer = false;
			if (canvas.initdownload_milisecondpassed == 0 && canvas.initdownload_myTimout == null) {
				canvas.initdownload_myTimout = setInterval(function() {
					canvas.initdownload_milisecondpassed += 100;

					if (canvas.initdownload_milisecondpassed >= 200 && canvas.initdownload_stoptimer == false) {
						canvas.initdownload_milisecondpassed = 0;
						canvas.initdownload_stoptimer = true;
						clearInterval(canvas.initdownload_myTimout);
						canvas.initdownload_myTimout = null;
						if (canvas.haschange && !e.target) {
							getJsonAndImage(canvas.FakeNotifyId, canvas);
							canvas.haschange = false;
						}
					} else {
						if (canvas.initdownload_stoptimer == true) {
							clearInterval(canvas.initdownload_myTimout);
							canvas.initdownload_myTimout = null;
						}
					}
				}, 100);

				if (canvas.initdownload_stoptimer == true) {
					clearInterval(canvas.initdownload_myTimout);
					canvas.initdownload_myTimout = null;
				}
			} else {
				if (canvas.initdownload_stoptimer == true) {
					clearInterval(canvas.initdownload_myTimout);
					canvas.initdownload_myTimout = null;
				}
			}
		});
	}, 1000);
}
