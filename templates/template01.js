const invoiceTableLayout = {
  hLineWidth: (i, node) =>
    i === 0 || i === node.table.body.length ? 0.5 : 0.5,
  vLineWidth: () => 0, // remove vertical lines
  hLineColor: () => "#4A6182",
  paddingLeft: () => 0,
  paddingRight: () => 0,
  paddingTop: () => 6,
  paddingBottom: () => 6,
};

const borderBottom = [false, false, false, true];
const borderY = [false, true, false, true];
const borderNone = [false, false, false, false];

const text =
  (alignment = "left") =>
  (text, extra = {}) => ({ text, alignment, ...extra });

const createTable = (
  body = [],
  options = { isFirstRowAsHeader: false, headerRows: 0 }
) => {
  const header = options.isFirstRowAsHeader ? body[0] : null;

  body = options.isFirstRowAsHeader ? body.slice(1) : body;

  const {
    widths = Array(body[0]?.length).fill("*"),
    layout = "lightHorizontalLines",
    headerStyle = { bold: true },
    cellStyle = { fontSize: 12 },
    margin = [0, 0, 0, 0],
  } = options;

  body = [
    // header
    ...(header
      ? [header.map((h) => ({ text: String(h), style: headerStyle }))]
      : []),

    // body
    ...body.map((row = []) =>
      row.map((cell) => {
        if (typeof cell === "object" && cell !== null) {
          return cell;
        }

        return {
          text: cell,
          style: cellStyle,
        };
      })
    ),
  ];

  return {
    table: {
      headerRows: options.headerRows,
      widths: widths,
      body: body,
    },
    layout,
    margin,
  };
};

var dd = {
  pageSize: "A4",
  //  pageSize: { width:420.94, height:  595.28 },
  pageMargins: [0, 20, 0, 61],

  content: [
    createTable(
      [
        [
          "",
          text()("Studio Shadowe", {
            style: ["textLg", "textPrimary", "bold"],
          }),
        ],
      ],
      {
        headerRows: 0,
        widths: ["auto", "*"],
        margin: [32, 0, 32, 16],
        layout: "noBorders",
      }
    ),

    {
      table: {
        widths: ["auto", "*", "auto"],
        body: [
          [
            text("right")("I N V O I C E", {
              style: ["textPrimary", "textMd", "bold"],
              color: "#fff",
              fillColor: "#000",
              fontSize: 24,
              verticalAlignment: "middle",
              margin: [32, 12, 12, 12],
            }),

            {
              stack: [
                text("right")("Invoice No 00123", {
                  style: ["textPrimary", "textMd"],
                }),

                text("right")("10/12/2025", {
                  style: ["textSecondary", "textMd"],
                }),
              ],
              alignment: "right",
              margin: [0, 8, 24, 0],
            },

            {
              text: "",
              fillColor: "#000",
            },
          ],
        ],
      },
      layout: "noBorders",
    },

    {
      table: {
        widths: ["*"],
        body: [
          // Company and Customer Address info
          [
            {
              table: {
                widths: ["*", "*"],
                body: [
                  [
                    {
                      stack: [
                        text("left")("From", {
                          style: ["textSecondary", "textSm"],
                          margin: [0, 0, 0, 8],
                        }),

                        text("left")("Studio Shadowe", {
                          style: ["textPrimary", "textMd", "bold"],
                          margin: [0, 0, 0, 4],
                        }),

                        text("left")("NO 039, Anywhere St, Any City", {
                          style: ["textSecondary", "textSm"],
                          margin: [0, 0, 0, 4],
                        }),

                        text("left")("abccompany@any.com", {
                          style: ["textSecondary", "textSm"],
                          margin: [0, 0, 0, 4],
                        }),

                        text("left")("011-22546836", {
                          style: ["textSecondary", "textSm"],
                          margin: [0, 0, 0, 4],
                        }),
                      ],
                      alignment: "left",
                      margin: [0, 0, 0, 0],
                    },

                    {
                      stack: [
                        text("left")("To", {
                          style: ["textSecondary", "textSm"],
                          margin: [0, 0, 0, 8],
                        }),

                        text("left")("ABC Company", {
                          style: ["textPrimary", "textMd", "bold"],
                          margin: [0, 0, 0, 4],
                        }),

                        text("left")("NO 039, Anywhere St, Any City", {
                          style: ["textSecondary", "textSm"],
                          margin: [0, 0, 0, 4],
                        }),

                        text("left")("abccompany@any.com", {
                          style: ["textSecondary", "textSm"],
                          margin: [0, 0, 0, 4],
                        }),
                      ],
                      alignment: "left",
                      margin: [32, 0, 0, 0],
                    },
                  ],
                ],
              },
              margin: [0, 16, 0, 0],
              layout: "noBorders",
            },
          ],

          // Items
          [
            {
              table: {
                widths: ["*", 80, 80, 120],
                body: [
                  // Header
                  [
                    text("left")("Item", {
                      style: ["textSecondary", "textSm", "bold"],
                      border: borderY,
                    }),
                    text("left")("Qty", {
                      style: ["textSecondary", "textSm", "bold"],
                      border: borderY,
                    }),
                    text("right")("Price", {
                      style: ["textSecondary", "textSm", "bold"],
                      border: borderY,
                    }),
                    text("right")("Amount", {
                      style: ["textSecondary", "textSm", "bold"],
                      border: borderY,
                    }),
                  ],

                  //  Table Dynamic Contents
                  [
                    text("left")("Logo Design", {
                      style: ["textPrimary", "textSm"],
                      border: borderBottom,
                    }),

                    text("left")("1", {
                      style: ["textPrimary", "textSm"],
                      border: borderBottom,
                    }),

                    text("right")("120,000", {
                      style: ["textPrimary", "textSm"],
                      border: borderBottom,
                    }),

                    text("right")("120,000", {
                      style: ["textPrimary", "textSm"],
                      border: borderBottom,
                    }),
                  ],
                ],
              },

              margin: [0, 24, 0, 0],
              layout: invoiceTableLayout,
            },
          ],

          // Table final totals
          [
            {
              table: {
                widths: ["*", "auto"],
                body: [
                  [
                    "",
                    {
                      table: {
                        widths: ["*", 120],
                        body: [
                          [
                            text("left")("Sub Total", {
                              border: borderNone,
                              style: ["textPrimary"],
                            }),
                            text("right")("120,000", { border: borderNone }),
                          ],
                          [
                            text("left")("Discount", {
                              border: borderNone,
                              style: ["textPrimary"],
                            }),
                            text("right")("0", { border: borderNone }),
                          ],
                          [
                            text("left")("Total", {
                              style: ["textPrimary", "bold"],
                              border: [false, true, false, true],
                            }),
                            text("right")("120,000", {
                              style: ["textPrimary", "bold"],
                              border: [false, true, false, true],
                            }),
                          ],
                        ],
                      },
                      layout: invoiceTableLayout,
                      //   margin: [0, 0, 0, 0],
                    },
                  ],
                ],
              },
              layout: "noBorders",
              margin: [0, 4, 0, 16],
            },
          ],

          // Payment methods
          [
            {
              table: {
                widths: ["*"],
                body: [
                  [
                    text("left")("Payment Method", {
                      style: ["textPrimary", "textBase", "bold"],
                      margin: [0, 0, 0, 4],
                    }),
                  ],
                  [
                    {
                      stack: [
                        text("left")("Cash", {
                          style: ["textPrimary", "textMd"],
                          margin: [0, 0, 0, 2],
                        }),
                        text("left")(
                          "Bank Name BOC \n Account No 123-1232-13121",
                          {
                            style: ["textPrimary", "textMd"],
                          }
                        ),
                      ],
                    },
                  ],
                ],
              },
              layout: "noBorders",
              margin: [0, 0, 0, 16],
            },
          ],
        ],
      },
      margin: [32, 0, 32, 0],
      layout: "noBorders",
    },
  ],

  footer: function (currentPage, pageCount, pageSize) {
    if (currentPage !== pageCount) return "";

    const pageWidth = pageSize.width - 64;

    return {
      stack: [
        {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  canvas: [
                    {
                      type: "line",
                      x1: 0,
                      y1: 0,
                      x2: pageWidth,
                      y2: 0,
                      lineWidth: 1,
                    },
                  ],
                },
              ],
              [
                text("left")("Terms & Conditions", {
                  style: ["textPrimary", "textSm", "bold"],
                  margin: [0, 4, 0, 0],
                }),
              ],
              [
                text("left")(
                  "Payment is due within 14 days of the invoice date. Late payments may incur additional charges.",
                  {
                    style: ["textSecondary", "textSm"],
                  }
                ),
              ],
            ],
          },
          layout: "noBorders", // optional
          margin: [32, 0, 32, 0],
        },
      ],
    };
  },

  styles: {
    textPrimary: {
      color: "#1F2937",
    },
    textSecondary: {
      color: "#4A6182",
    },
    textSm: {
      fontSize: 12,
    },
    textMd: {
      fontSize: 14,
    },
    textBase: {
      fontSize: 16,
    },
    textLg: {
      fontSize: 24,
    },
    bold: {
      bold: true,
    },
    bBottom: {
      border: [false, true, true, false],
    },
    textRight: {
      alignment: "right",
    },
  },
};
