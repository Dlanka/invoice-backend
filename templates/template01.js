// playground requires you to assign document definition to a variable called dd

var dd = {
  pageSize: "A4",
  pageMargins: [0, 20, 0, 20],
  content: [
    {
      table: {
        widths: [230, "*", 16],
        body: [
          [
            {
              text: "I N V O I C E",
              // font: 'Courier',
              color: "#fff",
              alignment: "right",
              fillColor: "#000",
              bold: true,
              fontSize: 22,
              verticalAlignment: "middle",
              margin: [0, 12, 12, 12],
            },

            {
              stack: [
                {
                  text: "INVOICE #",
                  fontSize: 16,
                  bold: true,
                  margin: [0, 0, 0, 0],
                },
                { text: "00012", fontSize: 14, color: "#777" },
              ],
              alignment: "right",
              margin: [0, 8, 16, 0],
            },

            {
              margin: [0, 16, 0, 0],
              table: {
                widths: ["*"],
                heights: 12,
                body: [
                  [
                    {
                      text: "",
                      fillColor: "#000",
                    },
                  ],
                ],
              },
            },
          ],
        ],
      },
      layout: "noBorders",
    },
  ],
  styles: {
    header: {
      fontSize: 18,
      color: "red",
      bold: true,
      // 			margin: [0, 0, 0, 10]
    },
    itemTable: {},
  },
};
