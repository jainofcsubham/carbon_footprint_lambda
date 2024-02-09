export default {
    type: "object",
    properties: {
      email: { type: 'string' },
      password : {type :"string"},
      first_name : {type :"string"},
      last_name : {type :"string"},
      phone_number : {type :"string"},
      date_of_birth : {type :"string",format : "date"},
      gender : {enum : ["Male","Female","Other"]},
    },
    required: ['email','password','first_name','last_name','date_of_birth','gender']
  } as const;
  