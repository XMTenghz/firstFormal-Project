# Angular 入门
Angular 框架功能的四大基本概念：组件、模板、指令及依赖注入
<h4>组件</h4>    
    组件概念：组件是 Angular 应用的主要构造块，控制屏幕上被称为视图的一小片区域。在类中定义组件的应用逻辑，通过一些由属性和方法组成的 API 与视图交互。每个组件包括如下部分：
        一个 HTML 模板，用于声明页面要渲染的内容；
        一个用于定义行为的 TypeScript 类；
        一个 CSS 选择器，用于定义组件在模板中的使用方式；
        （可选）要应用在模板上的 CSS 样式；
    组件创建：
        前提：(node\npm等)
            一：安装angular cli
                npm install -g @angular/cli
                Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned//在 Windows 客户端计算机上，默认禁用 PowerShell 脚 本的执行，故须开启内    容执行策略。
            二：创建带有初始项目的Angular工作区
                ng new <project-name>
        创建一个组件：通过CLI方式构建（也可手动创建，参考https://angular.cn/guide/component-overview）
            ng generate component <component-name>，每个组件包含标准4部分内容
            一个组件文件 <component-name>.component.ts(核心TS类)；
            一个模板文件 <component-name>.component.html；
            一个 CSS 文件，<component-name>.component.css；
            测试文件 <component-name>.component.spec.ts；
    组件的元数据（Metadata）:
        何为元数据：如
            @Component({
                //一些基础元数据
                selector:    'app-hero-list',
                templateUrl: './hero-list.component.html',
                providers:  [ HeroService ]
            })
        元数据作用：
            组件的元数据告诉Angular从何处获取它需要的主要构造块，从而创建和展示这个组件及其视图；
            具体来说，它把一个模板（无论是直接内联在代码中还是引用的外部文件）和该组件关联起来。该组件及其模板，共同描述了一个视图；
            除了包含或指向模板之外，@Component 的元数据还会配置要如何在 HTML 中引用该组件，以及该组件需要哪些服务等等；
        常用的 @Component 配置选项：
            selector：CSS选择器，一旦在模板HTML中找到了该选择器对应的标签，就创建并插入该组件的一个实例，如<app-hero-list></app-hero-list>；
            templateUrl：定义了该组件的宿主视图，还可用template属性来提供内联的HTML模板；
            providers：当前组件所需的服务提供者的一个数组；
<h4>模板与视图</h4>  
    模板与视图：
        模板就是一种 HTML，它会告诉 Angular 如何渲染该组件；
        视图通常会分层次进行组织，其能以 UI 分区或页面为单位进行修改、显示或隐藏。与组件直接关联的模板会定义该组件的宿主视图；
        该组件还可以定义一个带层次结构的视图，它包含一些内嵌的视图作为其它组件的宿主；
        带层次结构的视图可以包含同一模块（NgModule）中组件的视图，也可以（而且经常会）包含其它模块中定义的组件的视图；
    模板语法：
        模板很像标准的 HTML，但是它还包含 Angular 的模板语法，这些模板语法可以根据你的应用逻辑、应用状态和 DOM 数据来修改这些 HTML；
        模板可以使用数据绑定来协调应用和 DOM 中的数据，使用管道在显示出来之前对其进行转换，使用指令来把程序逻辑应用到要显示的内容上。
        模板语法相关内容：
            插值:学习如何在 HTML 中使用插值和表达式。
            模板语句:响应模板中的事件。
            绑定语法:使用绑定来协调应用程序中的值。
            property 绑定:设置目标元素的属性或指令中带 @Input() 装饰器的属性。
            属性（Attribute），类和样式绑定:设置 Attribute、类和样式的值。
            事件绑定:监听事件和 HTML。
            双向绑定:在类及其模板之间共享数据。
            内置指令:监听和修改 HTML 的行为和布局。
            模板引用变量:U 使用特殊变量来引用模板中的 DOM 元素。
            输入和输出:在父级上下文和子指令或组件之间共享数据
            模板表达式运算符:了解管道运算符 |，以及如何防范空值 null 或 undefined。
            模板中的 SVG:动态生成交互式图形。
        如：【示例】：
        <ul>
            <li *ngFor="let hero of heroes">
                <button type="button" (click)="selectHero(hero)">
                    {{hero.name}}
                </button>
            </li>
        </ul>
        <app-hero-detail *ngIf="selectedHero" [hero]="selectedHero"></app-hero-detail>
        【示例注释】：
        *ngFor 指令告诉 Angular 在一个列表上进行迭代；
        {{hero.name}}、(click) 和 [hero] 把程序数据绑定到及绑定回 DOM，以响应用户的输入；
        模板中的 <app-hero-detail> 标签是一个代表新组件 HeroDetailComponent 的元素。HeroDetailComponent定义了 HeroListComponent 的英雄详情子视图。注意观察像这样的自定义组件是如何与原生 HTML 元素无缝的混合在一起的；
    数据绑定：
        数据绑定的背景：
            如果没有框架，你就要自己负责把数据值推送到 HTML 控件中，并把来自用户的响应转换成动作和对值的更新。手动写这种数据推拉逻辑会很枯燥、容易出错，难以阅读 —— 有前端 JavaScript 开发经验的程序员一定深有体会。
        数据绑定的概念：
            Angular 支持双向数据绑定，这是一种对模板中的各个部件与组件中的各个部件进行协调的机制。往模板 HTML 中添加绑定标记可以告诉 Angular 该如何连接它们。
        数据绑定的形式：
            下面展示了数据绑定标记的四种形式。每种形式都有一个方向 —— 从组件到 DOM、从 DOM 到组件或双向。
            1.{{value}}__(从组件到 DOM)
            2.[property] = "value"__(从组件到 DOM)
            3.(event) = "handler"__(从 DOM 到组件)
            4.[(ng-model)] = "property"__(双向绑定)
        【示例】：
        <app-hero-detail [hero]="selectedHero"></app-hero-detail>
        <button type="button" (click)="selectHero(hero)">
            {{hero.name}}
        </button>
        【示例注释】：
            [hero]属性绑定：把父组件 HeroListComponent 的 selectedHero 的值传到子组件 HeroDetailComponent 的 hero 属性中；
            (click)事件绑定：当用户单击英雄的名字时，调用组件的 selectHero 方法；
            {{hero.name}}插值：在 <button> 元素中显示组件的 hero.name 属性值。
            4'.双向数据绑定：
                双向数据绑定（主要用于模板驱动表单中），它会把属性绑定和事件绑定组合成一种单独的写法；
                在双向绑定中，数据属性值通过属性绑定从组件流到输入框。用户的修改通过事件绑定流回组件，把属性值设置为最新的值。如：
                <input type="text" id="hero-name" [(ngModel)]="hero.name">
        数据绑定的重要性：
            Angular 在每个 JavaScript 事件循环中处理所有的数据绑定，它会从组件树的根部开始，递归处理全部子组件；
            数据绑定在模板及其组件之间的通讯中扮演了非常重要的角色，它对于父组件和子组件之间的通讯也同样重要；

    管道（Pipes）：
        概念：
            Angular 的管道可以让你在模板中声明显示值的转换逻辑。带有 @Pipe 装饰器的类中会定义一个转换函数，用来把输入值转换成供视图显示用的输出值；
            Angular 自带了很多管道，比如 date 管道和 currency 管道等，也可以自己定义一些新管道；
        使用方式：
            要在 HTML 模板中指定值的转换方式，使用管道操作符 ( | )，即：
            {{interpolated_value | pipe_name}}
            可以把管道串联起来，把一个管道函数的输出送给另一个管道函数进行转换。 管道还能接收一些参数，来控制它该如何进行转换。比如，你可以把要使用的日期格式传给 date 管道，如：
            【示例】：
            <!-- Default format: output 'Jun 15, 2015'-->
            <p>Today is {{today | date}}</p>
            <!-- fullDate format: output 'Monday, June 15, 2015'-->
            <p>The date is {{today | date:'fullDate'}}</p>
            <!-- shortTime format: output '9:43 AM'-->
            <p>The time is {{today | date:'shortTime'}}</p>
<h4>指令</h4>  
    指令（Directives）：
        概念：
            Angular 的模板是动态的。当 Angular 渲染它们的时候，会根据指令给出的指示对 DOM 进行转换。指令就是一个带有 @Directive() 装饰器的类；
            组件从技术角度上说就是一个指令，但是由于组件对 Angular 应用来说非常独特、非常重要，因此 Angular 专门定义了 @Component() 装饰器，它使用一些面向模板的特性扩展了 @Directive() 装饰器；
        类型：
            组件（带有模板的指令），及其他两种指令：结构型指令和属性型指令；
            Angular 本身定义了一系列这两种类型的指令，你也可以使用 @Directive() 装饰器来定义自己的指令；
            像组件一样，指令的元数据把它所装饰的指令类和一个 selector 关联起来，selector 用来把该指令插入到 HTML 中。在模板中，指令通常作为属性出现在元素标签上，可能仅仅作为名字出现，也可能作为赋值目标或绑定目标出现；
        结构型指令：
            结构型指令通过添加、移除或替换 DOM 元素来修改布局。
            下例模板使用了两个内置的结构型指令来为要渲染的视图添加程序逻辑。常见的内置结构型指令：
            NgIf ： 有条件地从模板创建或销毁子视图。
                用 NgIf 添加或删除元素(防止 null)
            NgFor : 为列表中的每个条目重复渲染一个节点。
                NgFor 条目列表(复写组件视图、获取 *ngFor 的 index)
                当条件为真时复写元素（用 *ngFor 的 trackBy 跟踪条目、为没有 DOM 元素的指令安排宿主）
            NgSwitch : 一组在备用视图之间切换的指令。
                像 JavaScript 的 switch 语句一样。NgSwitch 会根据切换条件显示几个可能的元素中的一个。Angular 只会将选定的元素放入 DOM。
                NgSwitch 是一组指令（共三个）：
                    NgSwitch：一个属性型指令，会更改其伴生指令的行为。
                    NgSwitchCase：当其绑定值等于开关值时将其元素添加到 DOM 中，而在其不等于开关值时将其绑定值移除。
                    NgSwitchDefault	：当没有选中的 NgSwitchCase 时，将其宿主元素添加到 DOM 中。
            【示例】：
            <li *ngFor="let hero of heroes"></li>
            <app-hero-detail *ngIf="selectedHero"></app-hero-detail>
            【示例注释】：
            *ngFor：一个迭代器；它要求 Angular 为 heroes 列表中的每个英雄拓印出一个 <li>。
            *ngIf：是个条件语句，只有当选中的英雄存在时，它才会包含 HeroDetail 组件。  
        属性型指令：
            属性型指令会修改现有元素的外观或行为。在模板中，它们看起来就像普通的 HTML 属性一样，因此得名“属性型指令”。常见有：
            NgClass	：添加和删除一组 CSS 类；
                将 NgClass 与表达式一起使用
                将 NgClass 与方法一起使用
            NgStyle	：添加和删除一组 HTML 样式；
                用 NgStyle 设置内联样式
            NgModel	：将双向数据绑定添加到 HTML 表单元素；
                用 ngModel 显示和更新属性（NgModel 和值访问器）
            【示例】：
            <input type="text" id="hero-name" [(ngModel)]="hero.name">
            【示例注释】：
            ngModel 指令就是属性型指令的一个例子，它实现了双向数据绑定。ngModel 修改现有元素（一般是 <input>）的行为：设置其显示属性值，并响应 change 事件；
            Angular 还有很多预定义指令，有些修改布局结构（比如 ngSwitch），有些修改 DOM 元素和组件的样子（比如 ngStyle 和 ngClass）。
【22/7/25，理解Angular 概述中模板————下次开始】

<h4>依赖注入</h4>  
    依赖注入（DI）：
        概念：
            依赖项是指某个类执行其功能所需的服务或对象。依赖项注入是一种设计模式，在这种设计模式中，类会从外部源请求依赖项而不是创建它们；
            Angular 的 DI 框架会在实例化某个类时为其提供依赖，通过使用 Angular DI 来提高应用程序的灵活性和模块化程度；
        创建可注入服务：
            Angular CLI 命令：ng generate service heroes/hero
        【示例】：
            import { Injectable } from '@angular/core';
            import { HEROES } from './mock-heroes';
            @Injectable({
              providedIn: 'root',
            })
            export class HeroService {
              getHeroes() { return HEROES; }
            }
        【示例注释】：
            @Injectable() 装饰器会指定 Angular 可以在 DI 体系中使用此类；
            元数据 providedIn: 'root' 表示 HeroService 在整个应用程序中都是可见的；
            getHeroes() 方法，该方法会从 mock.heroes.ts 中返回英雄；
            【注意：】当把组件和服务合并在同一个文件中，必须先定义服务，再定义组件，若在服务之前定义组件，Angular 将返回运行时的空引用错误。
        注入服务：
            功能：注入某些服务会使它们对组件可见；
            注入方式：要将依赖项注入到组件的 constructor() 中，并提供具有此依赖项类型的构造函数参数。如：
               constructor(heroService: HeroService) 
        在其他服务中使用这些服务：
            当某个服务依赖于另一个服务时，请遵循与注入组件相同的模式。


# Angular 生命周期钩子
    生命周期钩子
        概念：
            当 Angular 实例化组件类并渲染组件视图及其子视图时，组件实例的生命周期就开始了；
            生命周期一直伴随着变更检测，Angular 会检查数据绑定属性何时发生变化，并按需更新视图和组件实例；
            当 Angular 销毁组件实例并从 DOM 中移除它渲染的模板时，生命周期就结束了；
            当 Angular 在执行过程中创建、更新和销毁实例时，指令就有了类似的生命周期。
        钩子方法：
            1	ngOnChanges	：当输入或输出绑定值更改时。
            2	ngOnInit	：在第一个 ngOnChanges 之后。
            3	ngDoCheck	：开发人员的自定义变更检测。
            4	ngAfterContentInit	：组件内容初始化后。
            5	ngAfterContentChecked	：在每次检查组件内容之后。
            6	ngAfterViewInit	：在组件的视图被初始化之后。
            7	ngAfterViewChecked	：在每次检查组件视图之后。
            8	ngOnDestroy	：就在指令被销毁之前。
        
        响应生命周期事件：
            功能:
                可以通过实现一个或多个Angular core库中定义的生命周期钩子接口来响应组件或指令生命周期中的事件；
                钩子可以在适当的时候对组件或指令实例进行操作，比如 Angular 创建、更新或销毁这个实例时。
            方法构成：
                每个接口都有唯一的一个钩子方法，它们的名字是由接口名再加上 ng 前缀构成的。比如，OnInit 接口的钩子方法叫做 ngOnInit()。               
            生命周期的顺序：同上
        初始化组件或指令：
            使用 ngOnInit() 方法执行以下初始化任务。
            1.在构造函数外部执行复杂的初始化，
            2.在 Angular 设置好输入属性之后设置组件
        在实例销毁时进行清理：
            把清理逻辑放进 ngOnDestroy() 中，这个逻辑就必然会在 Angular 销毁该指令之前运行。
            这里是释放资源的地方，这些资源不会自动被垃圾回收。如果不这样做，就存在内存泄漏的风险。可实现如：
                1.取消订阅可观察对象和 DOM 事件。
                2.停止 interval 计时器。
                3.反注册该指令在全局或应用服务中注册过的所有回调。
                4.ngOnDestroy() 方法也可以用来通知应用程序的其它部分，该组件即将消失。

        一般性例子：
            目的：展示各个生命周期事件的调用顺序和相对频率，以及如何在组件和指令中单独使用或同时使用钩子；
            例1.所有生命周期事件的顺序和频率
            例2.使用指令来监视 DOM( @Directive({selector: '[appSpy]'}) )
            例3.同时使用组件和指令的钩子

        使用变更检测钩子:
            一旦检测到该组件或指令的输入属性发生了变化，Angular 就会调用它的 ngOnChanges() 方法。
            【示例】：
            ngOnChanges(changes: SimpleChanges) {
                for (const propName in changes) {
                    const chng = changes[propName];
                    const cur  = JSON.stringify(chng.currentValue);
                    const prev = JSON.stringify(chng.previousValue);
                    this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
                }
            }
            【示例注释】：
                ngOnChanges() 方法获取了一个对象，它把每个发生变化的属性名都映射到了一个SimpleChange对象，该对象中有属性的当前值和前一个值。这个钩子会在这些发生了变化的属性上进行迭代，并记录它们。
            响应视图的变更：
                当 Angular 在变更检测期间遍历视图树时，需要确保子组件中的某个变更不会尝试更改其父组件中的属性。因为单向数据流的工作原理就是这样的，这样的更改将无法正常渲染；
                如果需要做一个与预期数据流反方向的修改，就必须触发一个新的变更检测周期，以允许渲染这种变更；
            响应被投影内容的变更：
                Angular 会在把外部内容投影进该组件时调用它们。

        自定义变更检测逻辑：
            要监控 ngOnChanges() 无法捕获的变更，可以实现自己的变更检查逻辑；



# Angular 视图封装
        在 Angular 中，组件的样式可以封装在组件的宿主元素中，这样它们就不会影响应用程序的其余部。
        Component 的装饰器提供了 encapsulation 选项，可用来控制如何基于每个组件应用视图封装,即：
        encapsulation: ViewEncapsulation.None,
        ViewEncapsulation.ShadowDom	：Angular 使用浏览器内置的 Shadow DOM API 将组件的视图包含在ShadowRoot（用作组件的宿主元素）中，并以隔离的方式应用所提供的样式。
        
        ViewEncapsulation.Emulated：Angular 会修改组件的 CSS 选择器，使它们只应用于组件的视图，不影响应用程序中的其他元素（模拟 Shadow DOM 行为）。
        
        ViewEncapsulation.None：Angular 不应用任何形式的视图封装，这意味着为组件指定的任何样式实际上都是全局应用的，并且可以影响应用程序中存在的任何 HTML 元素。这种模式本质上与将样式包含在 HTML 本身中是一样的。

# Angular 组件之间的交互
        通过输入型绑定把数据从父组件传到子组件。
            测试它，以了解如何借助输入绑定将数据从父级传递给子级
        通过 setter 截听输入属性值的变化
            测试它，以了解如何使用设置器拦截输入属性更改
        通过 ngOnChanges() 来截听输入属性值的变化
            测试它，以了解如何使用 ngOnChanges() 来拦截输入属性更改
        父组件监听子组件的事件
            测试它，以了解如何用父级监听子级的事件
        父组件与子组件通过本地变量互动
            测试它，以了解父级如何使用局部变量与其子级交互
        父级调用 @ViewChild()
            测试它，以了解父级如何调用 @ViewChild()
        父组件和子组件通过服务来通讯
            测试它，以了解父级和子级如何使用服务进行通信

# Angular 组件样式
        使用组件样式
        组件样式最佳实践
            创作支持自定义样式的组件
        特殊的选择器
            :host
            :host-context
            已弃用 /deep/、>>> 和 ::ng-deep
        把样式加载进组件中
            元数据中的样式
            组件元数据中的样式文件
            模板内联样式
            模板中的 link 标签
            CSS @imports 语法
            外部以及全局样式文件
            非 CSS 样式文件

# Angular 在父子指令及组件之间共享数据
        把数据发送到子组件
            配置子组件
            配置父组件
            监视 @Input() 的变更
        把数据发送到父组件
            配置子组件
            配置子组件的模板
            配置父组件
            配置父组件的模板
        同时使用 @Input() 和 @Output()

# Angular 内容投影
        内容投影：使用内容投影来创建灵活的可复用组件。内容投影是一种模式，你可以在其中插入或投影要
        
        在另一个组件中使用的内容。
        单插槽内容投影
        多插槽内容投影
        有条件的内容投影
        在更复杂的环境中投影内容

# Angular 动态组件加载器
        动态组件加载
        指令
        加载组件
        解析组件
        AdComponent 接口
        最终的广告栏

# Angular 元素（Elements）概览
        Angular 元素就是打包成自定义元素的 Angular 组件。所谓自定义元素就是一套与具体框架无关的用于定义新 HTML 元素的 Web 标准。
        
        使用自定义元素
            工作原理
        把组件转换成自定义元素
            映射
        自定义元素的浏览器支持
        范例：弹窗服务
        为自定义元素添加类型支持