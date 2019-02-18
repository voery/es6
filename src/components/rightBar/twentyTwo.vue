<template>
    <div class="content">
        <h1>修饰器</h1>
        <div class="sideSonBar">
            <ul>
                <li>
                    <router-link to="/twentyTwo#twentyTwo1">1.类的修饰</router-link>
                </li>
                <li>
                    <router-link to="/twentyTwo#twentyTwo2">2.方法的修饰</router-link>
                </li>
                <li>
                    <router-link to="/twentyTwo#twentyTwo3">3.为什么修饰器不能用于函数？</router-link>
                </li>
                <li>
                    <router-link to="/twentyTwo#twentyTwo4">4.core-decorators.js</router-link>
                </li>
                <li>
                    <router-link to="/twentyTwo#twentyTwo5">5.使用修饰器实现自动发布事件</router-link>
                </li>
                <li>
                    <router-link to="/twentyTwo#twentyTwo6">6.Mixin</router-link>
                </li>
                <li>
                    <router-link to="/twentyTwo#twentyTwo7">7.Trait</router-link>
                </li>
                <li>
                    <router-link to="/twentyTwo#twentyTwo8">8.Babel 转码器的支持</router-link>
                </li>
            </ul>    
        </div>
        <div class="mainContent">
            <ul>
                <li id="twentyTwo1">
                    <h3>1.类的修饰</h3>
                    <div class="mainBox">
                        <p>
                            许多面向对象的语言都有修饰器（Decorator）函数，用来修改类的行为。目前，有一个<a target="_blank" href="https://github.com/tc39/proposal-decorators">提案</a>将这项功能，引入了 ECMAScript。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript">@testable
class <span class="token class-name">MyTestableClass</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // ...
</span><span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">testable<span class="token punctuation">(</span></span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span>isTestable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

MyTestableClass<span class="token punctuation">.</span>isTestable<span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>
                            上面代码中，<code>@testable</code>就是一个修饰器。它修改了<code>MyTestableClass</code>这个类的行为，为它加上了静态属性<code>isTestable</code>。<code>testable</code>函数的参数<code>target</code>是<code>MyTestableClass</code>类本身。
                        </p>
                        <p>基本上，修饰器的行为就是下面这样。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">@decorator
class <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// 等同于
</span>
class <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
A <span class="token operator">=</span> <span class="token function">decorator<span class="token punctuation">(</span></span>A<span class="token punctuation">)</span> <span class="token operator">||</span> A<span class="token punctuation">;</span>
</code></pre>
                        <p>
                            也就是说，修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">testable<span class="token punctuation">(</span></span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // ...
</span><span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码中，<code>testable</code>函数的参数<code>target</code>，就是会被修饰的类。
                        </p>
                        <p>如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">testable<span class="token punctuation">(</span></span>isTestable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    target<span class="token punctuation">.</span>isTestable <span class="token operator">=</span> isTestable<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

@<span class="token function">testable<span class="token punctuation">(</span></span><span class="token boolean">true</span><span class="token punctuation">)</span>
class <span class="token class-name">MyTestableClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
MyTestableClass<span class="token punctuation">.</span>isTestable<span class="token comment" spellcheck="true"> // true
</span>
@<span class="token function">testable<span class="token punctuation">(</span></span><span class="token boolean">false</span><span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
MyClass<span class="token punctuation">.</span>isTestable<span class="token comment" spellcheck="true"> // false
</span></code></pre>
                        <p>
                            上面代码中，修饰器<code>testable</code>可以接受参数，这就等于可以修改修饰器的行为。</p>
                        <p>
                            注意，修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。
                        </p>
                        <p>
                            前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的<code>prototype</code>对象操作。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">testable<span class="token punctuation">(</span></span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>isTestable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

@testable
class <span class="token class-name">MyTestableClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyTestableClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>isTestable<span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>
                            上面代码中，修饰器函数<code>testable</code>是在目标类的<code>prototype</code>对象上添加属性，因此就可以在实例上调用。
                        </p>
                        <p>下面是另外一个例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// mixins.js
</span>export <span class="token keyword">function</span> <span class="token function">mixins<span class="token punctuation">(</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">assign<span class="token punctuation">(</span></span>target<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>list<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// main.js
</span>import <span class="token punctuation">{</span> mixins <span class="token punctuation">}</span> from <span class="token string">'./mixins'</span>

const Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">mixins<span class="token punctuation">(</span></span>Foo<span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 'foo'
</span></code></pre>
                        <p>
                            上面代码通过修饰器<code>mixins</code>，把<code>Foo</code>对象的方法添加到了<code>MyClass</code>的实例上面。可以用<code>Object.assign()</code>模拟这个功能。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">const Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">assign<span class="token punctuation">(</span></span>MyClass<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> Foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 'foo'
</span></code></pre>
                        <p>
                            实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">class <span class="token class-name">MyReactComponent</span> extends <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

export default <span class="token function">connect<span class="token punctuation">(</span></span>mapStateToProps<span class="token punctuation">,</span> mapDispatchToProps<span class="token punctuation">)</span><span class="token punctuation">(</span>MyReactComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>有了装饰器，就可以改写上面的代码。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">@<span class="token function">connect<span class="token punctuation">(</span></span>mapStateToProps<span class="token punctuation">,</span> mapDispatchToProps<span class="token punctuation">)</span>
export default class <span class="token class-name">MyReactComponent</span> extends <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre>
			            <p>相对来说，后一种写法看上去更容易理解。</p>
                    </div>
                </li>
                <li id="twentyTwo2">
                    <h3>2.方法的修饰</h3>
                    <div class="mainBox">
                        <p>修饰器不仅可以修饰类，还可以修饰类的属性。</p>
			            <pre class=" language-javascript"><code class=" language-javascript">class <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @readonly
  <span class="token function">name<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> `$<span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>first<span class="token punctuation">}</span> $<span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>last<span class="token punctuation">}</span>` <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码中，修饰器<code>readonly</code>用来修饰“类”的<code>name</code>方法。
                        </p>
                        <p>
                            修饰器函数<code>readonly</code>一共可以接受三个参数。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">readonly<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // descriptor对象原来的值如下
</span> <span class="token comment" spellcheck="true"> // {
</span> <span class="token comment" spellcheck="true"> //   value: specifiedFunction,
</span> <span class="token comment" spellcheck="true"> //   enumerable: false,
</span> <span class="token comment" spellcheck="true"> //   configurable: true,
</span> <span class="token comment" spellcheck="true"> //   writable: true
</span> <span class="token comment" spellcheck="true"> // };
</span>  descriptor<span class="token punctuation">.</span>writable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> descriptor<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">readonly<span class="token punctuation">(</span></span>Person<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// 类似于
</span>Object<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>Person<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            修饰器第一个参数是类的原型对象，上例是<code>Person.prototype</code>，修饰器的本意是要“修饰”类的实例，但是这个时候实例还没生成，所以只能去修饰原型（这不同于类的修饰，那种情况时<code>target</code>参数指的是类本身）；第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。
                        </p>
                        <p>
                            另外，上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。
                        </p>
                        <p>
                            下面是另一个例子，修改属性描述对象的<code>enumerable</code>属性，使得该属性不可遍历。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">class <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @nonenumerable
  <span class="token keyword">get</span> <span class="token function">kidCount<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">nonenumerable<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  descriptor<span class="token punctuation">.</span>enumerable <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> descriptor<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            下面的<code>@log</code>修饰器，可以起到输出日志的作用。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">class <span class="token class-name">Math</span> <span class="token punctuation">{</span>
  @log
  <span class="token function">add<span class="token punctuation">(</span></span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">log<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> oldValue <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>value<span class="token punctuation">;</span>

  descriptor<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>`Calling $<span class="token punctuation">{</span>name<span class="token punctuation">}</span> <span class="token keyword">with</span>`<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> oldValue<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> descriptor<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

const math <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Math</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// passed parameters should get logged now
</span>math<span class="token punctuation">.</span><span class="token function">add<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码中，<code>@log</code>修饰器的作用就是在执行原始的操作之前，执行一次<code>console.log</code>，从而达到输出日志的目的。
                        </p>
                        <p>修饰器有注释的作用。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">@testable
class <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @readonly
  @nonenumerable
  <span class="token function">name<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> `$<span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>first<span class="token punctuation">}</span> $<span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>last<span class="token punctuation">}</span>` <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            从上面代码中，我们一眼就能看出，<code>Person</code>类是可测试的，而<code>name</code>方法是只读和不可枚举的。
                        </p>
                        <p>
                            下面是使用 Decorator 写法的<a target="_blank" href="https://github.com/ionic-team/stencil">组件</a>，看上去一目了然。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">@<span class="token function">Component<span class="token punctuation">(</span></span><span class="token punctuation">{</span>
  tag<span class="token punctuation">:</span> <span class="token string">'my-component'</span><span class="token punctuation">,</span>
  styleUrl<span class="token punctuation">:</span> <span class="token string">'my-component.scss'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
export class <span class="token class-name">MyComponent</span> <span class="token punctuation">{</span>
  @<span class="token function">Prop<span class="token punctuation">(</span></span><span class="token punctuation">)</span> first<span class="token punctuation">:</span> string<span class="token punctuation">;</span>
  @<span class="token function">Prop<span class="token punctuation">(</span></span><span class="token punctuation">)</span> last<span class="token punctuation">:</span> string<span class="token punctuation">;</span>
  @<span class="token function">State<span class="token punctuation">(</span></span><span class="token punctuation">)</span> isVisible<span class="token punctuation">:</span> boolean <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

  <span class="token function">render<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>Hello<span class="token punctuation">,</span> my name is <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>first<span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>last<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">dec<span class="token punctuation">(</span></span>id<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'evaluated'</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>target<span class="token punctuation">,</span> property<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'executed'</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

class <span class="token class-name">Example</span> <span class="token punctuation">{</span>
    @<span class="token function">dec<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span>
    @<span class="token function">dec<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token function">method<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token comment" spellcheck="true">
// evaluated 1
</span><span class="token comment" spellcheck="true">// evaluated 2
</span><span class="token comment" spellcheck="true">// executed 2
</span><span class="token comment" spellcheck="true">// executed 1
</span></code></pre>
                        <p>
                            上面代码中，外层修饰器<code>@dec(1)</code>先进入，但是内层修饰器<code>@dec(2)</code>先执行。
                        </p>
                        <p>
                            除了注释，修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。
                        </p>
                    </div>
                </li>
                <li id="twentyTwo3">
                    <h3>3.为什么修饰器不能用于函数？</h3>
                    <div class="mainBox">
                        <p>修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。</p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> add <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  counter<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@add
<span class="token keyword">function</span> <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面的代码，意图是执行后<code>counter</code>等于 1，但是实际上结果是<code>counter</code>等于 0。因为函数提升，使得实际执行的代码是下面这样。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">@add
<span class="token keyword">function</span> <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> counter<span class="token punctuation">;</span>
<span class="token keyword">var</span> add<span class="token punctuation">;</span>

counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

add <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  counter<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>下面是另一个例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> readOnly <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">"some-decorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

@readOnly
<span class="token keyword">function</span> <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>上面代码也有问题，因为实际执行是下面这样。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> readOnly<span class="token punctuation">;</span>

@readOnly
<span class="token keyword">function</span> <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

readOnly <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">"some-decorator"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            总之，由于存在函数提升，使得修饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。
                        </p>
                        <p>另一方面，如果一定要修饰函数，可以采用高阶函数的形式直接执行。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">doSomething<span class="token punctuation">(</span></span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'Hello, '</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">loggingDecorator<span class="token punctuation">(</span></span>wrapped<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'Starting'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    const result <span class="token operator">=</span> wrapped<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'Finished'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

const wrapped <span class="token operator">=</span> <span class="token function">loggingDecorator<span class="token punctuation">(</span></span>doSomething<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyTwo4">
                    <h3>4.core-decorators.js</h3>
                    <div class="mainBox">
                        <p>
                            <a target="_blank" href="https://github.com/jayphelps/core-decorators.js">core-decorators.js</a>是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器。
                        </p>
                        <p><strong>（1）@autobind</strong></p>
                        <p>
                            <code>autobind</code>修饰器使得方法中的<code>this</code>对象，绑定原始对象。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> autobind <span class="token punctuation">}</span> from <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

class <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @autobind
  <span class="token function">getPerson<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> getPerson <span class="token operator">=</span> person<span class="token punctuation">.</span>getPerson<span class="token punctuation">;</span>

<span class="token function">getPerson<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token operator">===</span> person<span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// true
</span></code></pre>
                        <p><strong>（2）@readonly</strong></p>
                        <p><code>readonly</code>修饰器使得属性或方法不可写。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> readonly <span class="token punctuation">}</span> from <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

class <span class="token class-name">Meal</span> <span class="token punctuation">{</span>
  @readonly
  entree <span class="token operator">=</span> <span class="token string">'steak'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> dinner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Meal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dinner<span class="token punctuation">.</span>entree <span class="token operator">=</span> <span class="token string">'salmon'</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// Cannot assign to read only property 'entree' of [object Object]
</span></code></pre>
                        <p><strong>（3）@override</strong></p>
                        <p>
                            <code>override</code>修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> override <span class="token punctuation">}</span> from <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

class <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  <span class="token function">speak<span class="token punctuation">(</span></span>first<span class="token punctuation">,</span> second<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

class <span class="token class-name">Child</span> extends <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  @override
  <span class="token function">speak<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token comment" spellcheck="true"> // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
</span><span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// or
</span>
class <span class="token class-name">Child</span> extends <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  @override
  <span class="token function">speaks<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
 <span class="token comment" spellcheck="true"> // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
</span> <span class="token comment" spellcheck="true"> //
</span> <span class="token comment" spellcheck="true"> //   Did you mean "speak"?
</span><span class="token punctuation">}</span>
</code></pre>
                        <p><strong>（4）@deprecate (别名@deprecated)</strong></p>
                        <p>
                            <code>deprecate</code>或<code>deprecated</code>修饰器在控制台显示一条警告，表示该方法将废除。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> deprecate <span class="token punctuation">}</span> from <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

class <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @deprecate
  <span class="token function">facepalm<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  @<span class="token function">deprecate<span class="token punctuation">(</span></span><span class="token string">'We stopped facepalming'</span><span class="token punctuation">)</span>
  <span class="token function">facepalmHard<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  @<span class="token function">deprecate<span class="token punctuation">(</span></span><span class="token string">'We stopped facepalming'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> url<span class="token punctuation">:</span> <span class="token string">'http://knowyourmeme.com/memes/facepalm'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function">facepalmHarder<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

person<span class="token punctuation">.</span><span class="token function">facepalm<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// DEPRECATION Person#facepalm: This function will be removed in future versions.
</span>
person<span class="token punctuation">.</span><span class="token function">facepalmHard<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// DEPRECATION Person#facepalmHard: We stopped facepalming
</span>
person<span class="token punctuation">.</span><span class="token function">facepalmHarder<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// DEPRECATION Person#facepalmHarder: We stopped facepalming
</span><span class="token comment" spellcheck="true">//
</span><span class="token comment" spellcheck="true">//     See http://knowyourmeme.com/memes/facepalm for more details.
</span><span class="token comment" spellcheck="true">//
</span></code></pre>
                        <p><strong>（5）@suppressWarnings</strong></p>
                        <p>
                            <code>suppressWarnings</code>修饰器抑制<code>deprecated</code>修饰器导致的<code>console.warn()</code>调用。但是，异步代码发出的调用除外。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> suppressWarnings <span class="token punctuation">}</span> from <span class="token string">'core-decorators'</span><span class="token punctuation">;</span>

class <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  @deprecated
  <span class="token function">facepalm<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  @suppressWarnings
  <span class="token function">facepalmWithoutWarning<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">facepalm<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

person<span class="token punctuation">.</span><span class="token function">facepalmWithoutWarning<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// no warning is logged
</span></code></pre>
                    </div>
                </li>
                <li id="twentyTwo5">
                    <h3>5.使用修饰器实现自动发布事件</h3>
                    <div class="mainBox">
                        <p>我们可以使用修饰器，使得对象的方法被调用时，自动发出一个事件。</p>
			            <pre class=" language-javascript"><code class=" language-javascript">const postal <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">"postal/lib/postal.lodash"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

export default <span class="token keyword">function</span> <span class="token function">publish<span class="token punctuation">(</span></span>topic<span class="token punctuation">,</span> channel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  const channelName <span class="token operator">=</span> channel <span class="token operator">||</span> <span class="token string">'/'</span><span class="token punctuation">;</span>
  const msgChannel <span class="token operator">=</span> postal<span class="token punctuation">.</span><span class="token function">channel<span class="token punctuation">(</span></span>channelName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  msgChannel<span class="token punctuation">.</span><span class="token function">subscribe<span class="token punctuation">(</span></span>topic<span class="token punctuation">,</span> v <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'频道: '</span><span class="token punctuation">,</span> channelName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'事件: '</span><span class="token punctuation">,</span> topic<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'数据: '</span><span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    const fn <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>value<span class="token punctuation">;</span>

    descriptor<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> value <span class="token operator">=</span> fn<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
      msgChannel<span class="token punctuation">.</span><span class="token function">publish<span class="token punctuation">(</span></span>topic<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码定义了一个名为<code>publish</code>的修饰器，它通过改写<code>descriptor.value</code>，使得原方法被调用时，会自动发出一个事件。它使用的事件“发布/订阅”库是<a target="_blank" href="https://github.com/postaljs/postal.js">Postal.js</a>。
                        </p>
                        <p>它的用法如下。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// index.js
</span>import publish from <span class="token string">'./publish'</span><span class="token punctuation">;</span>

class <span class="token class-name">FooComponent</span> <span class="token punctuation">{</span>
  @<span class="token function">publish<span class="token punctuation">(</span></span><span class="token string">'foo.some.message'</span><span class="token punctuation">,</span> <span class="token string">'component'</span><span class="token punctuation">)</span>
  <span class="token function">someMethod<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> my<span class="token punctuation">:</span> <span class="token string">'data'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  @<span class="token function">publish<span class="token punctuation">(</span></span><span class="token string">'foo.some.other'</span><span class="token punctuation">)</span>
  <span class="token function">anotherMethod<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment" spellcheck="true"> // ...
</span>  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FooComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

foo<span class="token punctuation">.</span><span class="token function">someMethod<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">anotherMethod<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            以后，只要调用<code>someMethod</code>或者<code>anotherMethod</code>，就会自动发出一个事件。
                        </p>
                        <pre class=" languageBash"><code class=" language-bash">$ bash<span class="token operator">-</span>node index<span class="token punctuation">.</span>js
频道<span class="token punctuation">:</span>  component
事件<span class="token punctuation">:</span>  foo<span class="token punctuation">.</span>some<span class="token punctuation">.</span>message
数据<span class="token punctuation">:</span>  <span class="token punctuation">{</span> my<span class="token punctuation">:</span> <span class="token string">'data'</span> <span class="token punctuation">}</span>

频道<span class="token punctuation">:</span>  <span class="token operator">/</span>
事件<span class="token punctuation">:</span>  foo<span class="token punctuation">.</span>some<span class="token punctuation">.</span>other
数据<span class="token punctuation">:</span>  undefined
</code></pre>
                    </div>
                </li>
                <li id="twentyTwo6">
                    <h3>6.Mixin</h3>
                    <div class="mainBox">
                        <p>
                            在修饰器的基础上，可以实现<code>Mixin</code>模式。所谓<code>Mixin</code>模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。
                        </p>
                        <p>请看下面的例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">const Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">assign<span class="token punctuation">(</span></span>MyClass<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> Foo<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 'foo'
</span></code></pre>
                        <p>
                            上面代码之中，对象<code>Foo</code>有一个<code>foo</code>方法，通过<code>Object.assign</code>方法，可以将<code>foo</code>方法“混入”<code>MyClass</code>类，导致<code>MyClass</code>的实例<code>obj</code>对象都具有<code>foo</code>方法。这就是“混入”模式的一个简单实现。
                        </p>
                        <p>
                            下面，我们部署一个通用脚本<code>mixins.js</code>，将 Mixin 写成一个修饰器。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">export <span class="token keyword">function</span> <span class="token function">mixins<span class="token punctuation">(</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">assign<span class="token punctuation">(</span></span>target<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>然后，就可以使用上面这个修饰器，为类“混入”各种方法。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> mixins <span class="token punctuation">}</span> from <span class="token string">'./mixins'</span><span class="token punctuation">;</span>

const Foo <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">mixins<span class="token punctuation">(</span></span>Foo<span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // "foo"
</span></code></pre>
                        <p>
                            通过<code>mixins</code>这个修饰器，实现了在<code>MyClass</code>类上面“混入”<code>Foo</code>对象的<code>foo</code>方法。
                        </p>
                        <p>
                            不过，上面的方法会改写<code>MyClass</code>类的<code>prototype</code>对象，如果不喜欢这一点，也可以通过类的继承实现 Mixin。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">class <span class="token class-name">MyClass</span> extends <span class="token class-name">MyBaseClass</span> <span class="token punctuation">{</span>
  <span class="token comment" spellcheck="true">/* ... */</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码中，<code>MyClass</code>继承了<code>MyBaseClass</code>。如果我们想在<code>MyClass</code>里面“混入”一个<code>foo</code>方法，一个办法是在<code>MyClass</code>和<code>MyBaseClass</code>之间插入一个混入类，这个类具有<code>foo</code>方法，并且继承了<code>MyBaseClass</code>的所有方法，然后<code>MyClass</code>再继承这个类。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> MyMixin <span class="token operator">=</span> <span class="token punctuation">(</span>superclass<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> class <span class="token class-name">extends</span> superclass <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo from MyMixin'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码中，<code>MyMixin</code>是一个混入类生成器，接受<code>superclass</code>作为参数，然后返回一个继承<code>superclass</code>的子类，该子类包含一个<code>foo</code>方法。
                        </p>
                        <p>
                            接着，目标类再去继承这个混入类，就达到了“混入”<code>foo</code>方法的目的。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">class <span class="token class-name">MyClass</span> extends <span class="token class-name">MyMixin</span><span class="token punctuation">(</span>MyBaseClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment" spellcheck="true">/* ... */</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // "foo from MyMixin"
</span></code></pre>
                        <p>如果需要“混入”多个方法，就生成多个混入类。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">class <span class="token class-name">MyClass</span> extends <span class="token class-name">Mixin1</span><span class="token punctuation">(</span><span class="token function">Mixin2<span class="token punctuation">(</span></span>MyBaseClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment" spellcheck="true">/* ... */</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            这种写法的一个好处，是可以调用<code>super</code>，因此可以避免在“混入”过程中覆盖父类的同名方法。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> Mixin1 <span class="token operator">=</span> <span class="token punctuation">(</span>superclass<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> class <span class="token class-name">extends</span> superclass <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo from Mixin1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>super<span class="token punctuation">.</span>foo<span class="token punctuation">)</span> super<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> Mixin2 <span class="token operator">=</span> <span class="token punctuation">(</span>superclass<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> class <span class="token class-name">extends</span> superclass <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo from Mixin2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>super<span class="token punctuation">.</span>foo<span class="token punctuation">)</span> super<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

class <span class="token class-name">S</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo from S'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

class <span class="token class-name">C</span> extends <span class="token class-name">Mixin1</span><span class="token punctuation">(</span><span class="token function">Mixin2<span class="token punctuation">(</span></span>S<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo from C'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    super<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码中，每一次<code>混入</code>发生时，都调用了父类的<code>super.foo</code>方法，导致父类的同名方法没有被覆盖，行为被保留了下来。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">new</span> <span class="token class-name">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// foo from C
</span><span class="token comment" spellcheck="true">// foo from Mixin1
</span><span class="token comment" spellcheck="true">// foo from Mixin2
</span><span class="token comment" spellcheck="true">// foo from S
</span></code></pre>
                    </div>
                </li>
                <li id="twentyTwo7">
                    <h3>7.Trait</h3>
                    <div class="mainBox">
                        <p>
                            Trait 也是一种修饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。
                        </p>
                        <p>
                            下面采用<a target="_blank
                        " href="https://github.com/CocktailJS/traits-decorator">traits-decorator</a>这个第三方模块作为例子。这个模块提供的<code>traits</code>修饰器，不仅可以接受对象，还可以接受 ES6 类作为参数。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> traits <span class="token punctuation">}</span> from <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

class <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

const TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits<span class="token punctuation">(</span></span>TFoo<span class="token punctuation">,</span> TBar<span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // foo
</span>obj<span class="token punctuation">.</span><span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // bar
</span></code></pre>
                        <p>
                            上面代码中，通过<code>traits</code>修饰器，在<code>MyClass</code>类上面“混入”了<code>TFoo</code>类的<code>foo</code>方法和<code>TBar</code>对象的<code>bar</code>方法。
                        </p>
                        <p>Trait 不允许“混入”同名方法。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> traits <span class="token punctuation">}</span> from <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

class <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

const TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits<span class="token punctuation">(</span></span>TFoo<span class="token punctuation">,</span> TBar<span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token comment" spellcheck="true">
// 报错
</span><span class="token comment" spellcheck="true">// throw new Error('Method named: ' + methodName + ' is defined twice.');
</span><span class="token comment" spellcheck="true">//        ^
</span><span class="token comment" spellcheck="true">// Error: Method named: foo is defined twice.
</span></code></pre>
                        <p>
                            上面代码中，<code>TFoo</code>和<code>TBar</code>都有<code>foo</code>方法，结果<code>traits</code>修饰器报错。
                        </p>
                        <p>
                            一种解决方法是排除<code>TBar</code>的<code>foo</code>方法。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> traits<span class="token punctuation">,</span> excludes <span class="token punctuation">}</span> from <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

class <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

const TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits<span class="token punctuation">(</span></span>TFoo<span class="token punctuation">,</span> TBar<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">excludes<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // foo
</span>obj<span class="token punctuation">.</span><span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // bar
</span></code></pre>
                        <p>
                            上面代码使用绑定运算符（::）在<code>TBar</code>上排除<code>foo</code>方法，混入时就不会报错了。
                        </p>
                        <p>
                            另一种方法是为<code>TBar</code>的<code>foo</code>方法起一个别名。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">import <span class="token punctuation">{</span> traits<span class="token punctuation">,</span> alias <span class="token punctuation">}</span> from <span class="token string">'traits-decorator'</span><span class="token punctuation">;</span>

class <span class="token class-name">TFoo</span> <span class="token punctuation">{</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

const TBar <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

@<span class="token function">traits<span class="token punctuation">(</span></span>TFoo<span class="token punctuation">,</span> TBar<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">alias<span class="token punctuation">(</span></span><span class="token punctuation">{</span>foo<span class="token punctuation">:</span> <span class="token string">'aliasFoo'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // foo
</span>obj<span class="token punctuation">.</span><span class="token function">aliasFoo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // foo
</span>obj<span class="token punctuation">.</span><span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // bar
</span></code></pre>
                        <p>
                            上面代码为<code>TBar</code>的<code>foo</code>方法起了别名<code>aliasFoo</code>，于是<code>MyClass</code>也可以混入<code>TBar</code>的<code>foo</code>方法了。
                        </p>
                        <p>
                            <code>alias</code>和<code>excludes</code>方法，可以结合起来使用。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">@<span class="token function">traits<span class="token punctuation">(</span></span>TExample<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">excludes<span class="token punctuation">(</span></span><span class="token string">'foo'</span><span class="token punctuation">,</span><span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">alias<span class="token punctuation">(</span></span><span class="token punctuation">{</span>baz<span class="token punctuation">:</span><span class="token string">'exampleBaz'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码排除了<code>TExample</code>的<code>foo</code>方法和<code>bar</code>方法，为<code>baz</code>方法起了别名<code>exampleBaz</code>。
                        </p>
                        <p>
                            <code>as</code>方法则为上面的代码提供了另一种写法。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">@<span class="token function">traits<span class="token punctuation">(</span></span>TExample<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token function">as<span class="token punctuation">(</span></span><span class="token punctuation">{</span>excludes<span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> alias<span class="token punctuation">:</span> <span class="token punctuation">{</span>baz<span class="token punctuation">:</span> <span class="token string">'exampleBaz'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
class <span class="token class-name">MyClass</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyTwo8">
                    <h3>8.Babel 转码器的支持</h3>
                    <div class="mainBox">
                        <p>目前，Babel 转码器已经支持 Decorator。</p>
                        <p>
                            首先，安装<code>babel-core</code>和<code>babel-plugin-transform-decorators</code>。由于后者包括在<code>babel-preset-stage-0</code>之中，所以改为安装<code>babel-preset-stage-0</code>亦可。
                        </p>
                        <pre class=" language-bash"><code class=" language-bash">$ npm install babel<span class="token operator">-</span>core babel<span class="token operator">-</span>plugin<span class="token operator">-</span>transform<span class="token operator">-</span>decorators
</code></pre>
                        <p>
                            然后，设置配置文件<code>.babelrc</code>。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">{</span>
  <span class="token string">"plugins"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"transform-decorators"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>这时，Babel 就可以对 Decorator 转码了。</p>
                        <p>脚本中打开的命令如下。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">babel<span class="token punctuation">.</span><span class="token function">transform<span class="token punctuation">(</span></span><span class="token string">"code"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"transform-decorators"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
			            <p>
                            Babel 的官方网站提供一个<a target="_blank" href="https://babeljs.io/repl/">在线转码器</a>，只要勾选 Experimental，就能支持 Decorator 的在线转码。
                        </p>
                    </div>
                </li>
                <li></li>
            </ul>
        </div>  
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
@import url('../../less/common.less'); 
</style>