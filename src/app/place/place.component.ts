import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DndService } from '@ng-dnd/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit, OnDestroy {

  currentItem: any;
  @Input() index: number = 0;
  @Input() allDropList: any = []

  @Output() readonly changePos = new EventEmitter();
  dropTarget = this.dnd.dropTarget('指标', {
    canDrop: (monitor) => {
      const dropItem = monitor.getItem();
      // console.log(dropItem)
      // if (this.currentItem) {
      //   return false
      // }
      // if (dropItem && (dropItem as any).id !== this.currentItem.id) {
      //   return true;
      // }
      // return false
      return true;
    },
    drop: (monitor) => {
      const item = monitor.getItem()
      console.log(this.index)
      console.log(this.allDropList)
      this.changePos.emit({ index: this.index, data: item});
      return {}
    }
  })

  dragSource = this.dnd.dragSource('指标', {
    beginDrag: () => {
      return {
        from: this.index,
        data: {
          ...this.currentItem
        }
      };
    },
    endDrag: (monitor) => {
      
    }
  })
  isOver$!: Observable<boolean>;
  constructor(private dnd: DndService) { }

  ngOnInit() {
    this.currentItem = this.allDropList[this.index]
    this.isOver$ = this.dropTarget.listen(monitor => {
      return monitor.isOver()
    });
  }


  ngOnDestroy(): void {
    this.dragSource.unsubscribe();
    this.dropTarget.unsubscribe();
  }

}
