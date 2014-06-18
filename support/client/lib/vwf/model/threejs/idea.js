(function(){
		function cylinder(childID, childSource, childName)
		{
			
			this.radius = 1;
			this.height = 1;
            this.url = 'https://nhs-citizen.yrpri.org/ideas/528-free-wifi-at-all-nhs-facilities.json'

			this.EditorData = {};
			
			this.EditorData.radius = {displayname:'Radius',property:'radius',type:'slider',min:0,max:10,step:.01};
			this.EditorData.height = {displayname:'Height',property:'height',type:'slider',min:0,max:10,step:.01};
            this.EditorData.height = {displayname:'url',property:'url',type:'text'};

			this.inherits = ['vwf/model/threejs/prim.js'];
			//the node constructor
			this.settingProperty = function(propertyName,propertyValue)
			{
				if(propertyName == 'height' || propertyName == 'radius' || propertyName== 'url' )
				{
					this[propertyName] = propertyValue;
					this.dirtyStack(true);
				}
			}
			this.initializingNode = function()
			{
				this.dirtyStack(true);
			}
			this.gettingProperty = function(propertyName)
			{
				if(propertyName == 'height' || propertyName == 'radius' || propertyName =='EditorData')
				return this[propertyName];
			}
			this.BuildMesh = function(mat)
			{
                // create a canvas element
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                context.font = "Bold 25px Arial";
                context.fillStyle = "rgba(0,100,100,0.85)";
                canvas.width=1200;
                canvas.heigh=900;
                //context.fillText('Hello, world!', 0, 50);

                // canvas contents will be used for a texture
                var texture = new THREE.Texture(canvas)
                texture.needsUpdate = true;

                var material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
                material.transparent = true;

                var textMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(canvas.width, canvas.height),
                    material
                );

                textMesh.rotation.x = Math.PI/2;
                textMesh.scale.x = 0.05;
                textMesh.scale.y = 0.05;
                textMesh.scale.z = 0.05;

                $.getJSON( this.url, function( data ) {
                    context.fillText(data.name+' '+data.description, 0, 90);
                    texture.needsUpdate = true;
                });
                return textMesh;
			}
			
			//must be defined by the object
			this.getRoot = function()
			{
				return this.rootnode;
			}
			this.rootnode = new THREE.Object3D();
			//this.Build();
		}
		//default factory code
        return function(childID, childSource, childName) {
			//name of the node constructor
            return new cylinder(childID, childSource, childName);
        }
})();