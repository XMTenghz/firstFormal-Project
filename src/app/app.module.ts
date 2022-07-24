import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//装饰器会出现在类定义的紧前方，用来声明该类具有指定的类型，并且提供适合该类型的元数据。如@NgModule
// @NgModule() 装饰器是一个函数，它接受一个元数据对象，该对象的属性用来描述这个模块
@NgModule({
  //1.那些属于本 NgModule 的组件、指令、管道。
  declarations: [ AppComponent ],
  //2.导入 本模块中的组件模板所需的类的其它模块。
  imports: [ BrowserModule, AppRoutingModule ],
  //3.本模块向全局服务中贡献的那些服务创建器。这些服务能被本应用中的任何部分使用。
  providers: [   ],
  //4.那些能在其它模块的组件模板中使用的可声明对象的子集。
  exports: [],
  //5.bootstrap属性，用来初始化和启动应用或系统的途径。用于指出该应用的的顶层组件
  //应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。
  bootstrap: [AppComponent]
})
//1.每个 Angular 应用都至少有一个 NgModule 类，也就是根模块，它习惯上命名为 AppModule，并位于一个名叫 app.module.ts 的文件中。
//引导这个根模块就可以启动你的应用，
//2.把 AppComponent 放到 exports 中是为了演示导出的语法，这在本例子中实际上是没必要的。
export class AppModule { }
