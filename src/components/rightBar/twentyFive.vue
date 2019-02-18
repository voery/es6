<template>
    <div class="content">
        <h1>编程风格</h1>
        <div class="sideSonBar">
            <ul>
                <li>
                    <router-link to="/twentyFive#twentyFive1">1.块级作用域</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive2">2.字符串</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive3">3.解构赋值</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive4">4.对象</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive5">5.数组</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive6">6.函数</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive7">7.Map 结构</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive8">8.Class</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive9">9.模块</router-link>
                </li>
                <li>
                    <router-link to="/twentyFive#twentyFive10">10.ESLint 的使用</router-link>
                </li>
            </ul>    
        </div>
        <div class="mainContent">
            <ul>
                <li id="twentyFive1">
                    <h3>1.块级作用域</h3>
                    <div class="mainBox">
                        <p><strong>（1）let 取代 var</strong></p>
                        <p>
                            ES6 提出了两个新的声明变量的命令：<code>let</code>和<code>const</code>。其中，<code>let</code>完全可以取代<code>var</code>，因为两者语义相同，而且<code>let</code>没有副作用。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token string">'use strict'</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码如果用<code>var</code>替代<code>let</code>，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，<code>var</code>命令做不到这一点。
                        </p>
                        <p>
                            <code>var</code>命令存在变量提升效用，<code>let</code>命令没有这个问题。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token string">'use strict'</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>x<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // ReferenceError
</span>  <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token string">'hello'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            上面代码如果使用<code>var</code>替代<code>let</code>，<code>console.log</code>那一行就不会报错，而是会输出<code>undefined</code>，因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。
                        </p>
                        <p>
                            所以，建议不再使用<code>var</code>命令，而是使用<code>let</code>命令取代。
                        </p>
                        <p><strong>（2）全局常量和线程安全</strong></p>
                        <p>
                            在<code>let</code>和<code>const</code>之间，建议优先使用<code>const</code>，尤其是在全局环境，不应该设置变量，只应设置常量。
                        </p>
                        <p>
                            <code>const</code>优于<code>let</code>有几个原因。一个是<code>const</code>可以提醒阅读程序的人，这个变量不应该改变；另一个是<code>const</code>比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；最后一个原因是 JavaScript 编译器会对<code>const</code>进行优化，所以多使用<code>const</code>，有利于提高程序的运行效率，也就是说<code>let</code>和<code>const</code>的本质区别，其实是编译器内部的处理不同。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>const a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
const b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
const c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// best
</span>const <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            <code>const</code>声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。
                        </p>
                        <p>所有的函数都应该设置为常量。</p>
                        <p>
                            长远来看，JavaScript 可能会有多线程的实现（比如 Intel 公司的 River Trail 那一类的项目），这时<code>let</code>表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。
                        </p>
                    </div>
                </li>
                <li id="twentyFive2">
                    <h3>2.字符串</h3>
                    <div class="mainBox">
                        <p>
                            静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const a <span class="token operator">=</span> <span class="token string">"foobar"</span><span class="token punctuation">;</span>
const b <span class="token operator">=</span> <span class="token string">'foo'</span> <span class="token operator">+</span> a <span class="token operator">+</span> <span class="token string">'bar'</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// acceptable
</span>const c <span class="token operator">=</span> `foobar`<span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>const a <span class="token operator">=</span> <span class="token string">'foobar'</span><span class="token punctuation">;</span>
const b <span class="token operator">=</span> `foo$<span class="token punctuation">{</span>a<span class="token punctuation">}</span>bar`<span class="token punctuation">;</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive3">
                    <h3>3.解构赋值</h3>
                    <div class="mainBox">
                        <p>
                            使用数组成员对变量赋值时，优先使用解构赋值。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript">const arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// bad
</span>const first <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
const second <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>const <span class="token punctuation">[</span>first<span class="token punctuation">,</span> second<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span>
</code></pre>
                        <p>函数的参数如果是对象的成员，优先使用解构赋值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token keyword">function</span> <span class="token function">getFullName<span class="token punctuation">(</span></span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  const firstName <span class="token operator">=</span> user<span class="token punctuation">.</span>firstName<span class="token punctuation">;</span>
  const lastName <span class="token operator">=</span> user<span class="token punctuation">.</span>lastName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span><span class="token keyword">function</span> <span class="token function">getFullName<span class="token punctuation">(</span></span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  const <span class="token punctuation">{</span> firstName<span class="token punctuation">,</span> lastName <span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// best
</span><span class="token keyword">function</span> <span class="token function">getFullName<span class="token punctuation">(</span></span><span class="token punctuation">{</span> firstName<span class="token punctuation">,</span> lastName <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token keyword">function</span> <span class="token function">processInput<span class="token punctuation">(</span></span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>left<span class="token punctuation">,</span> right<span class="token punctuation">,</span> top<span class="token punctuation">,</span> bottom<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span><span class="token keyword">function</span> <span class="token function">processInput<span class="token punctuation">(</span></span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> left<span class="token punctuation">,</span> right<span class="token punctuation">,</span> top<span class="token punctuation">,</span> bottom <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

const <span class="token punctuation">{</span> left<span class="token punctuation">,</span> right <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">processInput<span class="token punctuation">(</span></span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive4">
                    <h3>4.对象</h3>
                    <div class="mainBox">
                        <p>
                            单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const a <span class="token operator">=</span> <span class="token punctuation">{</span> k1<span class="token punctuation">:</span> v1<span class="token punctuation">,</span> k2<span class="token punctuation">:</span> v2<span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
const b <span class="token operator">=</span> <span class="token punctuation">{</span>
  k1<span class="token punctuation">:</span> v1<span class="token punctuation">,</span>
  k2<span class="token punctuation">:</span> v2
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>const a <span class="token operator">=</span> <span class="token punctuation">{</span> k1<span class="token punctuation">:</span> v1<span class="token punctuation">,</span> k2<span class="token punctuation">:</span> v2 <span class="token punctuation">}</span><span class="token punctuation">;</span>
const b <span class="token operator">=</span> <span class="token punctuation">{</span>
  k1<span class="token punctuation">:</span> v1<span class="token punctuation">,</span>
  k2<span class="token punctuation">:</span> v2<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用<code>Object.assign</code>方法。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// if reshape unavoidable
</span>const a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">assign<span class="token punctuation">(</span></span>a<span class="token punctuation">,</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>const a <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token keyword">null</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  id<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  name<span class="token punctuation">:</span> <span class="token string">'San Francisco'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
obj<span class="token punctuation">[</span><span class="token function">getKey<span class="token punctuation">(</span></span><span class="token string">'enabled'</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>const obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  id<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  name<span class="token punctuation">:</span> <span class="token string">'San Francisco'</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token function">getKey<span class="token punctuation">(</span></span><span class="token string">'enabled'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码中，对象<code>obj</code>的最后一个属性名，需要计算得到。这时最好采用属性表达式，在新建<code>obj</code>的时候，将该属性与其他属性定义在一起。这样一来，所有属性就在一个地方定义了。
                        </p>
                        <p>
                            另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> ref <span class="token operator">=</span> <span class="token string">'some value'</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// bad
</span>const atom <span class="token operator">=</span> <span class="token punctuation">{</span>
  ref<span class="token punctuation">:</span> ref<span class="token punctuation">,</span>

  value<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>

  addValue<span class="token punctuation">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> atom<span class="token punctuation">.</span>value <span class="token operator">+</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>const atom <span class="token operator">=</span> <span class="token punctuation">{</span>
  ref<span class="token punctuation">,</span>

  value<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>

  <span class="token function">addValue<span class="token punctuation">(</span></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> atom<span class="token punctuation">.</span>value <span class="token operator">+</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive5">
                    <h3>5.数组</h3>
                    <div class="mainBox">
                        <p>使用扩展运算符（...）拷贝数组。</p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const len <span class="token operator">=</span> items<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
const itemsCopy <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> i<span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  itemsCopy<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span>const itemsCopy <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>items<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
                        <p>使用 Array.from 方法，将类似数组的对象转为数组。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">const foo <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll<span class="token punctuation">(</span></span><span class="token string">'.foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
const nodes <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from<span class="token punctuation">(</span></span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive6">
                    <h3>6.函数</h3>
                    <div class="mainBox">
                        <p>立即执行函数可以写成箭头函数的形式。</p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'Welcome to the Internet.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map<span class="token punctuation">(</span></span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// best
</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map<span class="token punctuation">(</span></span>x <span class="token operator">=</span><span class="token operator">&gt;</span> x <span class="token operator">*</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            箭头函数取代<code>Function.prototype.bind</code>，不应再用 self/_this/that 绑定 this。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
const boundMethod <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>params<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> method<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span>self<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// acceptable
</span>const boundMethod <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">bind<span class="token punctuation">(</span></span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// best
</span>const boundMethod <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>params<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> method<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span><span class="token keyword">this</span><span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
                        </p>
                        <p>
                            所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token keyword">function</span> <span class="token function">divide<span class="token punctuation">(</span></span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> option <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span><span class="token keyword">function</span> <span class="token function">divide<span class="token punctuation">(</span></span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token punctuation">{</span> option <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token keyword">function</span> <span class="token function">concatenateAll<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  const args <span class="token operator">=</span> Array<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>slice<span class="token punctuation">.</span><span class="token function">call<span class="token punctuation">(</span></span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">join<span class="token punctuation">(</span></span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span><span class="token keyword">function</span> <span class="token function">concatenateAll<span class="token punctuation">(</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">join<span class="token punctuation">(</span></span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>使用默认值语法设置函数参数的默认值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token keyword">function</span> <span class="token function">handleThings<span class="token punctuation">(</span></span>opts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  opts <span class="token operator">=</span> opts <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span><span class="token keyword">function</span> <span class="token function">handleThings<span class="token punctuation">(</span></span>opts <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // ...
</span><span class="token punctuation">}</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive7">
                    <h3>7.Map 结构</h3>
                    <div class="mainBox">
                        <p>
                            注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要<code>key: value</code>的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key of map<span class="token punctuation">.</span><span class="token function">keys<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> value of map<span class="token punctuation">.</span><span class="token function">values<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item of map<span class="token punctuation">.</span><span class="token function">entries<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive8">
                    <h3>8.Class</h3>
                    <div class="mainBox">
                        <p>
                            总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span><span class="token keyword">function</span> <span class="token function">Queue<span class="token punctuation">(</span></span>contents <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>_queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>contents<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
Queue<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>pop <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  const value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span><span class="token function">splice<span class="token punctuation">(</span></span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span>class <span class="token class-name">Queue</span> <span class="token punctuation">{</span>
  <span class="token function">constructor<span class="token punctuation">(</span></span>contents <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>contents<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">pop<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    const value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span><span class="token function">splice<span class="token punctuation">(</span></span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            使用<code>extends</code>实现继承，因为这样更简单，不会有破坏<code>instanceof</code>运算的危险。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const inherits <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'inherits'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">PeekableQueue<span class="token punctuation">(</span></span>contents<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Queue<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span><span class="token keyword">this</span><span class="token punctuation">,</span> contents<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">inherits<span class="token punctuation">(</span></span>PeekableQueue<span class="token punctuation">,</span> Queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
PeekableQueue<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>peek <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// good
</span>class <span class="token class-name">PeekableQueue</span> extends <span class="token class-name">Queue</span> <span class="token punctuation">{</span>
  <span class="token function">peek<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive9">
                    <h3>9.模块</h3>
                    <div class="mainBox">
                        <p>
                            首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用<code>import</code>取代<code>require</code>。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>const moduleA <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'moduleA'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
const func1 <span class="token operator">=</span> moduleA<span class="token punctuation">.</span>func1<span class="token punctuation">;</span>
const func2 <span class="token operator">=</span> moduleA<span class="token punctuation">.</span>func2<span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>import <span class="token punctuation">{</span> func1<span class="token punctuation">,</span> func2 <span class="token punctuation">}</span> from <span class="token string">'moduleA'</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            使用<code>export</code>取代<code>module.exports</code>。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// commonJS的写法
</span><span class="token keyword">var</span> React <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'react'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> Breadcrumbs <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createClass<span class="token punctuation">(</span></span><span class="token punctuation">{</span>
  <span class="token function">render<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>nav <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> Breadcrumbs<span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// ES6的写法
</span>import React from <span class="token string">'react'</span><span class="token punctuation">;</span>

class <span class="token class-name">Breadcrumbs</span> extends <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">render<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>nav <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

export default Breadcrumbs<span class="token punctuation">;</span>
</code></pre>
                        <p>
                            如果模块只有一个输出值，就使用<code>export default</code>，如果模块有多个输出值，就不使用<code>export default</code>，<code>export default</code>与普通的<code>export</code>不要同时使用。
                        </p>
                        <p>
                            不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。

                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bad
</span>import <span class="token operator">*</span> as myObject from <span class="token string">'./importModule'</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// good
</span>import myObject from <span class="token string">'./importModule'</span><span class="token punctuation">;</span>
</code></pre>
                        <p>如果模块默认输出一个函数，函数名的首字母应该小写。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">makeStyleGuide<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

export default makeStyleGuide<span class="token punctuation">;</span>
</code></pre>
                        <p>如果模块默认输出一个对象，对象名的首字母应该大写。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">const StyleGuide <span class="token operator">=</span> <span class="token punctuation">{</span>
  es6<span class="token punctuation">:</span> <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

export default StyleGuide<span class="token punctuation">;</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyFive10">
                    <h3>10.ESLint 的使用</h3>
                    <div class="mainBox">
                        <p>
                            ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。
                        </p>
                        <p>首先，安装 ESLint。</p>
                        <pre class=" languageBash"><code class=" language-bash">$ npm i <span class="token operator">-</span>g eslint
</code></pre>
                        <p>
                            然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。
                        </p>
                        <pre class=" languageBash"><code class=" language-bash">$ npm i <span class="token operator">-</span>g eslint<span class="token operator">-</span>config<span class="token operator">-</span>airbnb
$ npm i <span class="token operator">-</span>g eslint<span class="token operator">-</span>plugin<span class="token operator">-</span>import eslint<span class="token operator">-</span>plugin<span class="token operator">-</span>jsx<span class="token operator">-</span>a11y eslint<span class="token operator">-</span>plugin<span class="token operator">-</span>react
</code></pre>
			<p>最后，在项目的根目录下新建一个<code>.eslintrc</code>文件，配置 ESLint。</p>
			<pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">{</span>
  <span class="token string">"extends"</span><span class="token punctuation">:</span> <span class="token string">"eslint-config-airbnb"</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>
                            现在就可以检查，当前项目的代码是否符合预设的规则。
                        </p>
                        <p>
                            <code>index.js</code>文件的代码如下。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> unusued <span class="token operator">=</span> <span class="token string">'I have no purpose!'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">greet<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> message <span class="token operator">=</span> <span class="token string">'Hello, World!'</span><span class="token punctuation">;</span>
    <span class="token function">alert<span class="token punctuation">(</span></span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">greet<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>使用 ESLint 检查这个文件，就会报出错误。</p>
                        <pre class=" languageBash"><code class=" language-bash">$ eslint index<span class="token punctuation">.</span>js
index<span class="token punctuation">.</span>js
  <span class="token number">1</span><span class="token punctuation">:</span><span class="token number">1</span>  error  Unexpected var<span class="token punctuation">,</span> use let or const instead          no<span class="token operator">-</span>var
  <span class="token number">1</span><span class="token punctuation">:</span><span class="token number">5</span>  error  unusued is defined but never used                 no<span class="token operator">-</span>unused<span class="token operator">-</span>vars
  <span class="token number">4</span><span class="token punctuation">:</span><span class="token number">5</span>  error  Expected indentation of <span class="token number">2</span> characters but found <span class="token number">4</span>  indent
  <span class="token number">4</span><span class="token punctuation">:</span><span class="token number">5</span>  error  Unexpected var<span class="token punctuation">,</span> use let or const instead          no<span class="token operator">-</span>var
  <span class="token number">5</span><span class="token punctuation">:</span><span class="token number">5</span>  error  Expected indentation of <span class="token number">2</span> characters but found <span class="token number">4</span>  indent

✖ <span class="token number">5</span> problems <span class="token punctuation">(</span><span class="token number">5</span> errors<span class="token punctuation">,</span> <span class="token number">0</span> warnings<span class="token punctuation">)</span>
</code></pre>
			            <p>
                            上面代码说明，原文件有五个错误，其中两个是不应该使用<code>var</code>命令，而要使用<code>let</code>或<code>const</code>；一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。
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