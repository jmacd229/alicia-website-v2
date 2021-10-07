const DAYS_LIST = [
  {title: 'Monday', value: 'mon'},
  {title: 'Tuesday', value: 'tue'},
  {title: 'Wednesday', value: 'wed'},
  {title: 'Thursday', value: 'thu'},
  {title: 'Friday', value: 'fri'},
  {title: 'Saturday', value: 'sat'},
  {title: 'Sunday', value: 'sun'},
];

export default {
    name: "location",
    title: "Location",
    type: "document",
    fields: [
        {
          title: "Title",
          name: "title",
          type: "string",
        },
        {
          title: "Id",
          name: "id",
          type: "string",
          hidden: true
        },
        {
          title: "Label",
          name: "label",
          type: "array",
          of: [
            {
              type: "string",
            },
          ],
        },
        {
          title: "Link",
          name: "url",
          type: "url",
        },
        {
          title: 'Days in-person',
          name: 'days',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            list: DAYS_LIST
          }
        },
        {
          title: 'Days virtual',
          name: 'daysVirtual',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            list: DAYS_LIST
          }
        }
      ],
  };
