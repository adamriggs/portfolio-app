"use strict"

function InfoCardControls(){
	//make the mesh, geometry, material, and texture for both buttons
	this.btnW = 75;
	this.btnH = 20;
	this.textX = 15;
	this.textY = 15;
	this.font = '12px Helvetica'
	
	//setup canvas
	this.bmpAbout = document.createElement('canvas');
	bmpAbout.width = btnW;
	bmpAbout.height = btnH;
	this.ctxAbout = bmpAbout.getContext('2d');
	
	
	// canvas contents will be used for a texture
	this.texAbout = new THREE.Texture(bmpAbout);
	
	//create the material for the mesh
	this.matAbout = new THREE.MeshBasicMaterial({
		map: texAbout,
		antialiasing:true,
		transparent:true
	});
	
	//chreate the mesh and set some properties
	this.meshAbout = new THREE.Mesh(new THREE.PlaneGeometry(btnW, btnH), matAbout);
	matAbout.opacity = .9;
	matAbout.needsUpdate = true;
	texAbout.needsUpdate = true;
	
	
	//setup canvas
	this.bmpPortfolio = document.createElement('canvas');
	bmpPortfolio.width = btnW;
	bmpPortfolio.height = btnH;
	this.ctxPortfolio = bmpPortfolio.getContext('2d');
	
	// canvas contents will be used for a texture
	this.texPortfolio = new THREE.Texture(bmpPortfolio);
	
	//create the material for the mesh
	this.matPortfolio = new THREE.MeshBasicMaterial({
		map: texPortfolio,
		antialiasing:true,
		transparent:true
	});
	
	//chreate the mesh and set some properties
	this.meshPortfolio = new THREE.Mesh(new THREE.PlaneGeometry(btnW, btnH), matPortfolio);
	matPortfolio.opacity = .9;
	matPortfolio.needsUpdate = true;
	texPortfolio.needsUpdate = true;
		
	focus(ctxAbout, 'About', texAbout, matAbout, bmpAbout);
	blur(ctxPortfolio, 'Portfolio', texPortfolio, matPortfolio, bmpPortfolio);
	
}

InfoCardControls.prototype.focusBkg = function(ctx){
	ctx.clearRect(0, 0, btnW, btnH);
	ctx.globalAlpha = .3;
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, btnW, btnH);
	ctx.globalAlpha = 1;
	ctx.fillStyle = '#ffffff';
	ctx.font = font;
	
	return ctx;
}

InfoCardControls.prototype.blurBkg = function(ctx){
	ctx.clearRect(0, 0, btnW, btnH);
	ctx.globalAlpha = .5;
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, btnW, btnH);
	ctx.globalAlpha = 1;
	ctx.fillStyle = '#ffffff';
	ctx.font = font;
	
	return ctx;
}
	
InfoCardControls.prototype.focus = function(ctx, txt, tex, mat, bmp){
	ctx = focusBkg(ctx);
	ctx.fillText(txt, textX, textY);
	applyTex(tex, mat, bmp);
}

InfoCardControls.prototype.blur = function(ctx, txt, tex, mat, bmp){
	ctx = blurBkg(ctx);
	ctx.fillText(txt, textX, textY);
	applyTex(tex, mat, bmp);
}

InfoCardControls.prototype.applyTex = function(tex, mat, bmp){
	tex = new THREE.Texture(bmp);
	mat.map = tex;
	mat.needsUpdate = true;
	tex.needsUpdate = true;	
}
	
InfoCardControls.prototype.onClick = function(type){
	//console.log('infoCardControls.onClick()');
	if(type==='about'){
		//console.log('about');
		//aboutFocus();
		//portfolioBlur();
		focus(ctxAbout, 'About', texAbout, matAbout, bmpAbout);
		blur(ctxPortfolio, 'Portfolio', texPortfolio, matPortfolio, bmpPortfolio);
		infoCard.showAbout();
	}
	
	if(type==='portfolio'){
		//console.log('portfolio');
		//aboutBlur();
		//portfolioFocus();
		blur(ctxAbout, 'About', texAbout, matAbout, bmpAbout);
		focus(ctxPortfolio, 'Portfolio', texPortfolio, matPortfolio, bmpPortfolio);
		if(planesAdvanceIndex===-1){planesAdvanceIndex=0;}
		infoCard.switchProjects(projectArray[planesAdvanceIndex], planesAdvanceIndex);
		planesAdvance = true;
	}
	
}
