"use strict"

function InfoCard(){
	//vars
	this.cardW = 500;
	this.cardH = 400;
	this.titleFont = '18px Helvetica';
	this.bodyFont = '14px Helvetica';
	this.textX = 20;
	this.titleTextY = 20;
	this.bodyTextY = 170;
	this.planeIndex = -1;
	
	//setup canvas
	this.bitmap = document.createElement('canvas');
	bitmap.width = cardW;
	bitmap.height = cardH;
	this.context = bitmap.getContext('2d');
	clearCard();
	
	// canvas contents will be used for a texture
	this.tex = new THREE.Texture(bitmap);
	
	//create the material for the mesh
	this.mat = new THREE.MeshBasicMaterial({
		map: tex,
		antialiasing:true,
		transparent:true
	});
	
	//chreate the mesh and set some properties
	this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(cardW, cardH), mat);
	mat.opacity = .9;
	mat.needsUpdate = true;
	tex.needsUpdate = true;
	
	
	
	//after all the functions, variables, and states are initialized - put the infoCard in it's initial state
	this.showAbout();

};

//clear the card
InfoCard.prototype.clearCard = function(){
	context.clearRect(0, 0, cardW, cardH);
	context.globalAlpha = .3;
	context.fillStyle = '#000000';
	context.fillRect(0, 0, cardW, cardH);
	context.globalAlpha = 1;
	
	context.fillStyle = '#ffffff';
	context.font = bodyFont;
	context.textBaseLine = "bottom";
	context.fillText("next >", textX+430, titleTextY);
	context.fillText("< prev", textX+370, titleTextY);
}

//apply the texture to the material
InfoCard.prototype.applyTex = function(){
	tex = new THREE.Texture(bitmap);
	mat.map = tex;
	mat.needsUpdate = true;
	tex.needsUpdate = true;
	//renderer.render(scene, camera);
}

InfoCard.prototype.setTitle = function(){
	textX = 20;
	textY = 20;
	context.fillStyle = '#ffffff';
	context.font = titleFont;
	context.textBaseLine = "bottom";
}

InfoCard.prototype.setBody = function(){
	textX = 20;
	textY = 70;
	context.fillStyle = '#ffffff';
	context.font = bodyFont;
	context.textBaseLine = "bottom";
}

//copypasta from http://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
InfoCard.prototype.getLines = function(ctx,phrase,maxPxLength,textStyle) {
    var wa=phrase.split(" "),
        phraseArray=[],
        lastPhrase=wa[0],
        l=maxPxLength,
        measure=0;
    ctx.font = textStyle;
    for (var i=1;i<wa.length;i++) {
        var w=wa[i];
        measure=ctx.measureText(lastPhrase+w).width;
        if (measure<l) {
            lastPhrase+=(" "+w);
        }else {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i===wa.length-1) {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    
    return phraseArray;
}
	
//format the text on for the texture
InfoCard.prototype.switchProjects = function(data, index){
	planeIndex = index;
	
	var imgW = cardW - (textX*2);
	var imgH = (((cardW - (textX*2))*155)/662);	//this uses the original dimensions of the image which are 662x155
	
	this.clearCard();
	
	this.setTitle();
	context.fillText(data.title, textX, titleTextY);
	
	context.drawImage(data.imgObj, textX, titleTextY+20, imgW, imgH);
	
	this.setBody();
	var lines = getLines(context, decodeURIComponent(data.description), cardW - (textX*2), bodyFont);
	for(var i = 0; i < lines.length; i++){
		//console.log(i);
		context.fillText(lines[i], textX, bodyTextY + (i*15));
	}
	
	this.applyTex();
}

//show the about info 
InfoCard.prototype.showAbout = function(){
	//console.log('infoCard.showAbout()');
	this.clearCard();
	this.setTitle();
	context.fillText('Experience, bitches.  What?', textX, textY);
	this.applyTex();
}

InfoCard.prototype.onClick = function(vector){
	//console.log(vector);
	
	//next button
	if(vector.x > 100 && vector.x < 150 && vector.y < 150 && vector.y > 120){
		//next x ranges from 100 to 150
		//next y ranges from 150 to 120
		//console.log('next click');
		
		if(planeIndex+1 < projectArray.length){
			planeIndex++;
		} else {
			planeIndex=0;
		}
		
		this.switchProjects(projectArray[planeIndex], planeIndex);
		planesAdvance = true;
		planesAdvanceIndex = planeIndex;
		//scrollToPlane(planeIndex);
		
		infoCardControls.onClick('portfolio');
	}
	
	//prev button
	if(vector.x > 40 && vector.x < 85 && vector.y < 150 && vector.y > 120){
		//prev x ranges from 40 to 85
		//prev y ranges from 150 to 120
		//console.log('prev click');
		
		if(planeIndex-1 >= 0){
			planeIndex--;
		} else {
			planeIndex = projectArray.length-1;
		}
		
		this.switchProjects(projectArray[planeIndex], planeIndex);
		planesAdvance = true;
		planesAdvanceIndex = planeIndex;
		//scrollToPlane(planeIndex);
		
		infoCardControls.onClick('portfolio');
	}
	
}

InfoCard.prototype.windowResize = function(){

};