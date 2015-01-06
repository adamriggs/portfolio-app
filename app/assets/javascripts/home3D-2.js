"use strict"

function HomePage(){
	
	//basics
	this.camera, scene, renderer;
	this.container;
	this.cameraDistance = 1000;
	this.cameraSpeed = .01;
	this.cameraHorzAngle = Math.PI / 2;
	this.cameraVertAngle = Math.PI / 2;
	
	this.directionalLight, hemisphereLight;
	this.pointLights = [];
	this.pointLightAngle = Math.PI / 2;
	
	this.cameraMove = true;
	this.mouseX = ($(window).width())/2;
	this.mouseY = ($(window).height())/2;
	
	this.animating = false;
	this.animationComplete = true;
	
	this.mouseOver = true;
	this.planesScrolling = false;
	this.planesAdvance = false;
	this.planesAdvanceIndex = -1;
	this.planeRate = 0;
	
	this.projector;
	this.mouse_vector;
	this.mouse;
	this.ray;
	this.intersects;
	
	//specifics
	this.backgroundPlane;
	this.namePlane;
	this.shadowPlane;
	
	//parameters
	this.backgroundPlaneW;
	this.backgroundPlaneH;
	
	this.namePlaneW;
	this.namePlaneH;
	
	this.shadowPlaneW;
	this.shadowPlaneH;
	
	this.projectPlaneW = 192;
	this.projectPlaneH = 144;
	this.projectPlaneArray = [];
	
	this.projectArray = [];
	
	this.planeZSpacer = 200;
	
	this.topScrollArea_top = 0;
	this.topScrollArea_bottom = ($(window).height()/2)-100;
	
	this.bottomScrollArea_top = ($(window).height()/2)+100;
	this.bottomScrollArea_bottom = $(window).height();
	
	this.infoCard;
	
};

HomePage.prototype.windowResize = function(){
	
};

HomePage.prototype.mouseMove = function(){
	
};