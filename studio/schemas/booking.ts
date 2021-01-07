export default {
    name: "booking",
    title: "Booking",
    type: "object",
    fields: [
      {
        name: "url",
        title: "Booking url",
        type: "url",
      },
      {
        name: "location",
        title: "Location",
        type: "reference",
        to: [{type: 'location'}]
      }]
  };
  