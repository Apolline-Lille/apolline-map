module.exports = { 
	user:{ 
		name:{type:String,required:true},
		password:{type:String,required:true}
	},
    capture:{
        'type': {type: String},
        'geometry' : {
            'type': {type: String},
            'coordinates' : {
                'type' : [Number],
                'index' : '2dsphere',
                'required' : true
            }
        },
        'properties' : {
            'name' : String
        }
    }
};