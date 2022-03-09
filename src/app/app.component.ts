import { Component } from '@angular/core';
import { DndService, DragSource, DropTarget } from '@ng-dnd/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list1 = [
    {
      id: 1,
      name: '小明',
    },
    {
      id: 2,
      name: '小红',
    },
    {
      id: 3,
      name: '小黑',
    },
    {
      id: 4,
      name: '小新',
    },
    {
      id: 5,
      name: '小周',
    },
    {
      id: 6,
      name: '小欢',
    },
  ];

  list2 = [
    {
      id: 10,
      name: 'lisa',
    },
    {
      id: 20,
      name: 'jack',
    },
    {
      id: 30,
      name: 'tom',
    },
  ];

  // 指标字段
  sourceList: DragSource<{}, {}>[] = []
  // 可放置指标的占位符
  targetList = [1, 2, 3, 4]

  // 已经放置在指标中的字段
  allDropList: any[] = []

  changePos(event: { index: number, data: any }): void {
    console.log(event.index, event.data)
    this.allDropList.splice(event.index, event.data)
  }

  constructor(private dnd: DndService) { }

  ngOnInit(): void {
    // 指标字段变成可拖拽的
    this.list1.forEach((item, index) => {
      this.sourceList.push(this.dnd.dragSource('指标', {
        beginDrag: () => {
          const data = {
            from: -1,
            data: {
              ...item,
              index
            }
          }
          this.allDropList.push(data)
          return data
        },
        canDrag: () => {
          console.log('判断是否可以拖动')
          return true
        },
      }));
    });


  }
}
