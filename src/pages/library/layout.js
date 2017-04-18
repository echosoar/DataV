'use strict';
import { connect } from 'react-redux';
import { Component } from 'react';
import { mapStateToProps } from '../../connect/libraryLayoutConnect.js';

require('./layout.less');

let mockData = [
  {
    "name": "无限横向布局模板",
    "introduction": "暂无简介",
    "enName": "horizontal",
    "version": "1.0.0",
    "datavVersion": "1.0.0",
    "previewImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACMCAYAAABCtSQoAAACO0lEQVR4nO3c3W0aURCA0blpgHTgdEA6oASXQEpIB3YHTglJBS7B6cDpwEkFVioYvzgIIQF77SvCLOc8rlbDj/QtWhATAQAAAAAAAAAAAAAAAAAAAAAAAP9XGz0wM3P0TJiL1trQ5j6MHAacloChMAFDYQKGwgQMhQkYChMwFCZgKEzAAAAAAAAAAAAAwAWzEwtOyE4sYEPAUJiAoTABQ2EChsIEDIUJGAoTMBQmYAAAAAAAAAAAAOCC2YkFJ2QnFrAhYChMwFCYgKEwAUNhAobCBAyFCRgKEzAAAAAAAAAAAABwwezEghOyEwvYEDAUJmAoTMBQmIChMAFDYQKGwgQMhQkYAAAAAAAAAAAAuGB2YsEJ2YkFbAgYChMwFCZgKEzAUJiAoTABQ2EChsIEDAAAAAAAAAAAAFyw4TuxeJ/MXEfEl53D31trP94waxURXyPi49bhnxHxrbX2t3PWVUTcRsSnrcO/I+K2tfan97nB7GTmTe530zlrdWDWQ+esRWY+75n1nJmLvlcKM3MkuH9WE2cdCq77gpCZD0dmdV0QYHYy83FCwI8TZ91NmJU54ZMzM68nzrp+/7tAL38nPB+fB50z+rzRj8lAAobCBHw+fg06Z/R5ox8T5mfiveak+8zMvMrjX2LddTy3Y/fnk+7NYdby8JdPk4N7nbU+EPFDdvz0k5nLzHzaM+spM5f9rxZm6DW8p51A1m+ctdz59HzuvRBszVpk5v1OvPc9FwIAAAAAAAAAAAA4Py+Yx5ElJSG0iAAAAABJRU5ErkJggg==",
    "layout": {
      "repeat-x": "1",
      "repeat-y": "unlimited"
    },
    "template": {
      "component": "div",
      "props": {
        "className": "template-container",
      },
      "childs": [
        {
          "template": {
            "component": "div",
            "props": {
              "className": "template-item",
            },
            "childs": []
          }
        },
        {
          "template": {
            "component": "div",
            "props": {
              "className": "template-item",
            },
            "childs": []
          }
        }
      ],
      "item": {
        "template": {
          "component": "div",
          "props": {
            "className": "template-item",
          }
        }
      }
    }
  },
  {
    "name": "无限纵向布局模板",
    "introduction": "暂无简介",
    "enName": "vertical",
    "version": "1.0.0",
    "datavVersion": "1.0.0",
    "previewImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACMCAYAAABCtSQoAAADEUlEQVR4nO3c0U1UURCA4Rnju9rBdiAdSAl2AC1YgdABJUAH0IF2gB1sB2IF4wM3SggClwzZHfN9j3dP5vDy5+wucCIAAAAAAAAAAAAAAAAAAAAAAABgt7J7YFXVszbOfNbe5pm3y3n77s2ufwDg5QQMgwkYBhMwDCZgGEzAMJiAYTABw2AChsEEDIMJGAYTMAwmYBhMwDCYgGEwAcNgAobBBAyDCRgGEzAMJmAYTMAw2Ntd/wDwP6mqo4g4vvf4PDMvXmM/AUOTqvoaEScPvHRYVZvMPO3e08Xu5pnXoKo+RcS3J5YdZub3zn19BoYeZ01rVnECm2deg13t6wSGwQQMPa6b1qwiYOhx0rRmFQFDg8y8ise/pDpb1rQSMDTJzC9x+0cc2zuPtxFxvLzWv2f3wH3/VtE889bM23dOYBhMwDCYgGEwAcNgAobBBAyDCRgGEzAMJmAYTMAwmIBhMJfaQbPlfqw/uu/BukvA0KSqPkbEZURs7j3fRsTnzPzRvae30NCgqt5FxHnci3exiYjzZU0rAUOPk4g4eOT1g3iFGzn8P7B55jWoqp8R8f6JZTeZ+aFzXycw9Hgq3ueuWUXA0OOmac0qAoYel01rVvEZ2DzzGizfMG/j32+TbyJik5m/Ovd1AkODJcyDePjy9uuIOOiON8IJbJ55rZaT+HP8/X3wNiIuXyPeCAGbZ95o3kLDYAKGwQQMgwkYBhMwDCZgGEzAMJiAYTABw2AChsEEDIO5lRIaVdVRRBzfe3yemRevsZ+AoUlVfY2HL647rKpNZp527+m/kcwzr8Fymfu3J5Yddl/y7jMw9DhrWrOKE9g88xrsal8nMAwmYOjx0F1YL1mzioChx0nTmlUEDA0y8yoe/5LqbFnTSsDQJDO/xO0fcWzvPN5GxPHyWv+e3QP3/VtF88xbM2/fOYFhMAHDYAKGwQQMgwkYBhMwDCZgGEzAMJiAYTABw2AChsEEDIMJGAYTMAwmYBhMwDCYgGEwAcNgAobBBAyDCRgAAAAAAAAAAAAAAAAAAAAAAACAF/sNgI76MGsrjlIAAAAASUVORK5CYII=",
    "layout": {
      "repeat-x": "unlimited",
      "repeat-y": "1"
    },
    "template": {
      "component": "div",
      "props": {
        "className": "template-container",
        "style": {
          "white-space": "nowrap"
        }
      },
      "childs": [
        {
          "template": {
            "component": "div",
            "props": {
              "className": "template-item",
              "style": {
                "display": " inline-block",
                "width": "25%"
              }
            },
            "childs": []
          }
        }
      ],
      "item": {
        "template": {
          "component": "div",
          "props": {
            "className": "template-item",
            "style": {
              "display": " inline-block",
              "width": "25%"
            }
          },
          "childs": []
        }
      }
    }
  },
  {
    "name": "卍字形布局模板",
    "introduction": "暂无简介",
    "enName": "wantype",
    "version": "1.0.0",
    "datavVersion": "1.0.0",
    "previewImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACMCAYAAABCtSQoAAABuUlEQVR4nO3cQW4CMRQFQTviXoibz82cFVsSRYahQ9UBnrxpeffHAAAAAAAAAAAAAAAAAAAAAAAAgHPNnWNrresY49i5ScIx57ztHFxrrZ1772DOubW3Mcb42j0IvI6AIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBC2/UYP7OAm1u/4gSFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGMAFDmIAhTMAQJmAIu+wedMvosbXWdYxx7Np7E8ec83b2Iz6RHxjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAECZgCBMwhAkYwgQMYQKGsG23nu7cxILX8QNDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAIUzAEHY5+wGf6D/eDeNnz7it5geGMAFDmIAhTMAQJmAIEzCECRjCBAxhAoYwAUOYgCFMwBAmYAgTMIQJGMIEDGEChjABQ5iAAQAAAAAAAAAAAAAAAAAAAAAAAPizb6jPHsqNBCD5AAAAAElFTkSuQmCC",
    "layout": {
      "repeat-x": "1",
      "repeat-y": "1"
    },
    "template": {
      "component": "table",
      "props": {
        "className": "template-container",
      },
      "childs": [
        {
          "template": {
            "component": "tr",
            "props": {
              "className": "template-middle",
            },
            "childs": [
              {
                "template": {
                  "component": "td",
                  "props": {
                    "className": "template-item",
                    "colSpan": "2"
                  },
                  "childs": []
                }
              },
              {
                "template": {
                  "component": "td",
                  "props": {
                    "className": "template-item",
                    "rowSpan": "2"
                  },
                  "childs": []
                }
              }
            ]
          }
        },
        {
          "template": {
            "component": "tr",
            "props": {
              "className": "template-middle",
            },
            "childs": [
              {
                "template": {
                  "component": "td",
                  "props": {
                    "className": "template-item",
                    "rowSpan": "2"
                  },
                  "childs": []
                }
              },
              {
                "template": {
                  "component": "td",
                  "props": {
                    "className": "template-item"
                  },
                  "childs": []
                }
              }
            ]
          }
        },
        {
          "template": {
            "component": "tr",
            "props": {
              "className": "template-middle",
            },
            "childs": [
              {
                "template": {
                  "component": "td",
                  "props": {
                    "className": "template-item",
                    "colSpan": "2"
                  },
                  "childs": []
                }
              }
            ]
          }
        }
      ],
      "item": {

      }
    }
  }

];

class LibraryLayout extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      layout: mockData
    }
  }

  handleItemClick(item) {
    this.props.dispatch({type: 'LIBRARY_CLOSE'});
    this.props.dispatch({type: 'ADD_LIBRARY', data: item});
  }

  render() {
    let { layout } = this.state;
    return <div>
    {
      layout && layout.map(item => {
        return <div className="libraryLayout-item">
          <div className="libraryLayout-item-name">{ item.name }</div>
          <div className="libraryLayout-item-introduction">{ item.introduction }</div>
          <div className="libraryLayout-item-preview" style={{background: '#eee url(' + item.previewImg +') center center/contain no-repeat'}}></div>
          <div
            className="libraryLayout-item-add-button"
            onClick={this.handleItemClick.bind(this, item)}
            >
            添加
          </div>
        </div>
      })
    }
    </div>
  }

}

module.exports = connect(mapStateToProps)(LibraryLayout);
