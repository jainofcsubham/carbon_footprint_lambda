export default {
  type: "object",
  properties: {
    start_date : {type : "string",pattern: "^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$"},
    end_date : {type : "string",pattern: "^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$"},
    answers: { 
      type: "array",
      items : {
        type : "object",
        properties : {
          question_id : {type : "string"},
          answer : {type : "string"}
        }
      }
    },
  },
  required: ["answers","start_date","end_date"],
} as const;
