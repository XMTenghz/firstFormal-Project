import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {//顶层组件
  // 这里 title 的值来自组件类：
  title = 'first-project';
  fontColor = 'red';//属性绑定
}
