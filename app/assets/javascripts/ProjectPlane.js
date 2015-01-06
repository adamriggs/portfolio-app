"use strict"

function ProjectPlane(texPath, data){
	this.texPath = texPath;
	this.tex = THREE.ImageUtils.loadTexture(texPath);
	this.data = data;

	this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(projectPlaneW, projectPlaneH), new THREE.MeshBasicMaterial({
		map: this.tex,
		antialiasing:true/*
,
		side: THREE.DoubleSide
*/
	}));
	
	this.mesh.data = data;
	
	this.mesh.callback = function(){console.log("title=="+this.data.titleproj)};
};

ProjectPlane.prototype.windowResize = function(){

};