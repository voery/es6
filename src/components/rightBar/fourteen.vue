<template>
    <div class="content">
        <h1>Reflect</h1>
        <div class="sideSonBar">
            <ul>
                <li>
                    <router-link to="/four#four1">1.概述</router-link>
                </li>
                <li>
                    <router-link to="/four#four2">2.静态方法</router-link>
                </li>
                <li>
                    <router-link to="/four#four3">3.实例：使用 Proxy 实现观察者模式</router-link>
                </li>
            </ul>    
        </div>
        <div class="mainContent">
            <ul>
                <li id="four1">
                    <h3>1.概述</h3>
                    <div class="mainBox">
                        <p>
                            <code>Reflect</code>对象与<code>Proxy</code>对象一样，也是 ES6 为了操作对象而提供的新 API。<code>Reflect</code>对象的设计目的有这样几个。
                        </p>
                        <p>
                            （1） 将<code>Object</code>对象的一些明显属于语言内部的方法（比如<code>Object.defineProperty</code>），放到<code>Reflect</code>对象上。现阶段，某些方法同时在<code>Object</code>和<code>Reflect</code>对象上部署，未来的新方法将只部署在<code>Reflect</code>对象上。也就是说，从<code>Reflect</code>对象上可以拿到语言内部的方法。
                        </p>
                        <p>
                            （2） 修改某些<code>Object</code>方法的返回结果，让其变得更合理。比如，<code>Object.defineProperty(obj, name, desc)</code>在无法定义属性时，会抛出一个错误，而<code>Reflect.defineProperty(obj, name, desc)</code>则会返回<code>false</code>。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 老写法
</span><span class="token keyword">try</span> <span class="token punctuation">{</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> property<span class="token punctuation">,</span> attributes<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment" spellcheck="true"> // success
</span><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // failure
</span><span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// 新写法
</span><span class="token keyword">if</span> <span class="token punctuation">(</span>Reflect<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> property<span class="token punctuation">,</span> attributes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // success
</span><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
 <span class="token comment" spellcheck="true"> // failure
</span><span class="token punctuation">}</span>
</code></pre>
                        <p>
                            （3） 让<code>Object</code>操作都变成函数行为。某些<code>Object</code>操作是命令式，比如<code>name in obj</code>和<code>delete obj[name]</code>，而<code>Reflect.has(obj, name)</code>和<code>Reflect.deleteProperty(obj, name)</code>让它们变成了函数行为。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 老写法
</span><span class="token string">'assign'</span> <span class="token keyword">in</span> Object<span class="token comment" spellcheck="true"> // true
</span><span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">has<span class="token punctuation">(</span></span>Object<span class="token punctuation">,</span> <span class="token string">'assign'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>
                            （4）<code>Reflect</code>对象的方法与<code>Proxy</code>对象的方法一一对应，只要是<code>Proxy</code>对象的方法，就能在<code>Reflect</code>对象上找到对应的方法。这就让<code>Proxy</code>对象可以方便地调用对应的<code>Reflect</code>方法，完成默认行为，作为修改行为的基础。也就是说，不管<code>Proxy</code>怎么修改默认行为，你总可以在<code>Reflect</code>上获取默认行为。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token function">Proxy<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token keyword">set</span><span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> success <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>name<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'property '</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">' on '</span> <span class="token operator">+</span> target <span class="token operator">+</span> <span class="token string">' set to '</span> <span class="token operator">+</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> success<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码中，<code>Proxy</code>方法拦截<code>target</code>对象的属性赋值行为。它采用<code>Reflect.set</code>方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。
                        </p>
                        <p>下面是另一个例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> loggedObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'get'</span><span class="token punctuation">,</span> target<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">deleteProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'delete'</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">deleteProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">has<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'has'</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">has<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>
                            上面代码中，每一个<code>Proxy</code>对象的拦截操作（<code>get</code>、<code>delete</code>、<code>has</code>），内部都调用对应的<code>Reflect</code>方法，保证原生行为能够正常执行。添加的工作，就是将每一个操作输出一行日志。
                        </p>
                        <p>
                            有了<code>Reflect</code>对象以后，很多操作会更易读。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 老写法
</span>Function<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>apply<span class="token punctuation">.</span><span class="token function">call<span class="token punctuation">(</span></span>Math<span class="token punctuation">.</span>floor<span class="token punctuation">,</span> undefined<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1.75</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 1
</span><span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span>Math<span class="token punctuation">.</span>floor<span class="token punctuation">,</span> undefined<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1.75</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 1
</span></code></pre>
                    </div>
                </li>
                <li id="four2">
                    <h3>2.静态方法</h3>
                    <div class="mainBox">
                        <p>
                            <code>Reflect</code>对象一共有 13 个静态方法。
                        </p>
                        <ul class="list">
                            <li>Reflect.apply(target, thisArg, args)</li>
                            <li>Reflect.construct(target, args)</li>
                            <li>Reflect.get(target, name, receiver)</li>
                            <li>Reflect.set(target, name, value, receiver)</li>
                            <li>Reflect.defineProperty(target, name, desc)</li>
                            <li>Reflect.deleteProperty(target, name)</li>
                            <li>Reflect.has(target, name)</li>
                            <li>Reflect.ownKeys(target)</li>
                            <li>Reflect.isExtensible(target)</li>
                            <li>Reflect.preventExtensions(target)</li>
                            <li>Reflect.getOwnPropertyDescriptor(target, name)</li>
                            <li>Reflect.getPrototypeOf(target)</li>
                            <li>Reflect.setPrototypeOf(target, prototype)</li>
                        </ul>
                        <p>
                            上面这些方法的作用，大部分与<code>Object</code>对象的同名方法的作用都是相同的，而且它与<code>Proxy</code>对象的方法是一一对应的。下面是对它们的解释。
                        </p>
                        <ul class="baseList">
                            <li>
                                <h4>Reflect.get(target, name, receiver)</h4>
                                <p>
                                    <code>Reflect.get</code>方法查找并返回<code>target</code>对象的<code>name</code>属性，如果没有该属性，则返回<code>undefined</code>。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  bar<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token keyword">get</span> <span class="token function">baz<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>bar<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

Reflect<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 1
</span>Reflect<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 2
</span>Reflect<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'baz'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 3
</span></code></pre>
                                <p>
                                    如果<code>name</code>属性部署了读取函数（getter），则读取函数的<code>this</code>绑定<code>receiver</code>。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  bar<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token keyword">get</span> <span class="token function">baz<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>bar<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> myReceiverObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  bar<span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Reflect<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'baz'</span><span class="token punctuation">,</span> myReceiverObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 8
</span></code></pre>
                                <p>
                                    如果第一个参数不是对象，<code>Reflect.get</code>方法会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">Reflect<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span>Reflect<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                            </li>
                            <li>
                                <h4>Reflect.set(target, name, value, receiver)</h4>
                                <p>
                                    <code>Reflect.set</code>方法设置<code>target</code>对象的<code>name</code>属性等于<code>value</code>。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token keyword">set</span> <span class="token function">bar<span class="token punctuation">(</span></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

myObject<span class="token punctuation">.</span>foo<span class="token comment" spellcheck="true"> // 1
</span>
Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>foo<span class="token comment" spellcheck="true"> // 2
</span>
Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
myObject<span class="token punctuation">.</span>foo<span class="token comment" spellcheck="true"> // 3
</span></code></pre>
                                <p>
                                    如果<code>name</code>属性设置了赋值函数，则赋值函数的<code>this</code>绑定<code>receiver</code>。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token keyword">set</span> <span class="token function">bar<span class="token punctuation">(</span></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> myReceiverObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> myReceiverObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>foo<span class="token comment" spellcheck="true"> // 4
</span>myReceiverObject<span class="token punctuation">.</span>foo<span class="token comment" spellcheck="true"> // 1
</span></code></pre>
                                <p>
                                    注意，如果 <code>Proxy</code>对象和 <code>Reflect</code>对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了<code>receiver</code>，那么<code>Reflect.set</code>会触发<code>Proxy.defineProperty</code>拦截。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token punctuation">:</span> <span class="token string">'a'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'set'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> attribute<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'defineProperty'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Reflect<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> attribute<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">'A'</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// set
</span><span class="token comment" spellcheck="true">// defineProperty
</span></code></pre>
                                <p>
                                    上面代码中，<code>Proxy.set</code>拦截里面使用了<code>Reflect.set</code>，而且传入了<code>receiver</code>，导致触发<code>Proxy.defineProperty</code>拦截。这是因为<code>Proxy.set</code>的<code>receiver</code>参数总是指向当前的 <code>Proxy</code>实例（即上例的<code>obj</code>），而<code>Reflect.set</code>一旦传入<code>receiver</code>，就会将属性赋值到<code>receiver</code>上面（即<code>obj</code>），导致触发<code>defineProperty</code>拦截。如果<code>Reflect.set</code>没有传入<code>receiver</code>，那么就不会触发<code>defineProperty</code>拦截。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> p <span class="token operator">=</span> <span class="token punctuation">{</span>
  a<span class="token punctuation">:</span> <span class="token string">'a'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> handler <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'set'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> attribute<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'defineProperty'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Reflect<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> attribute<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>p<span class="token punctuation">,</span> handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">'A'</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// set
</span></code></pre>
                                <p>
                                    如果第一个参数不是对象，<code>Reflect.set</code>会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span>Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                            </li>
                            <li>
                                <h4>Reflect.has(obj, name)</h4>
                                <p>
                                    <code>Reflect.has</code>方法对应<code>name in obj</code>里面的<code>in</code>运算符。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span><span class="token string">'foo'</span> <span class="token keyword">in</span> myObject<span class="token comment" spellcheck="true"> // true
</span><span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">has<span class="token punctuation">(</span></span>myObject<span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // true
</span></code></pre>
			                    <p>
                                    如果第一个参数不是对象，<code>Reflect.has</code>和<code>in</code>运算符都会报错。
                                </p>
                            </li>
                            <li>
                                <h4>Reflect.deleteProperty(obj, name)</h4>
                                <p>
                                    <code>Reflect.deleteProperty</code>方法等同于<code>delete obj[name]</code>，用于删除对象的属性。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript">const myObj <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token string">'bar'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>delete myObj<span class="token punctuation">.</span>foo<span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">deleteProperty<span class="token punctuation">(</span></span>myObj<span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
			                    <p>
                                    该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回<code>true</code>；删除失败，被删除的属性依然存在，返回<code>false</code>。
                                </p>
                            </li>
                            <li>
                                <h4>Reflect.construct(target, args)</h4>
                                <p>
                                    <code>Reflect.construct</code>方法等同于<code>new target(...args)</code>，这提供了一种不使用<code>new</code>，来调用构造函数的方法。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">Greeting<span class="token punctuation">(</span></span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// new 的写法
</span>const instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Greeting</span><span class="token punctuation">(</span><span class="token string">'张三'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// Reflect.construct 的写法
</span>const instance <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">construct<span class="token punctuation">(</span></span>Greeting<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'张三'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                            </li>
                            <li>
                                <h4>Reflect.getPrototypeOf(obj)</h4>
                                <p>
                                    <code>Reflect.getPrototypeOf</code>方法用于读取对象的<code>__proto__</code>属性，对应<code>Object.getPrototypeOf(obj)</code>。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript">const myObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FancyThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf<span class="token punctuation">(</span></span>myObj<span class="token punctuation">)</span> <span class="token operator">===</span> FancyThing<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">getPrototypeOf<span class="token punctuation">(</span></span>myObj<span class="token punctuation">)</span> <span class="token operator">===</span> FancyThing<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
</code></pre>
                                <p>
                                    <code>Reflect.getPrototypeOf</code>和<code>Object.getPrototypeOf</code>的一个区别是，如果参数不是对象，<code>Object.getPrototypeOf</code>会将这个参数转为对象，然后再运行，而<code>Reflect.getPrototypeOf</code>会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // Number {[[PrimitiveValue]]: 0}
</span>Reflect<span class="token punctuation">.</span><span class="token function">getPrototypeOf<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                            </li>
                            <li>
                                <h4>Reflect.setPrototypeOf(obj, newProto)</h4>
                                <p>
                                    <code>Reflect.setPrototypeOf</code>方法用于设置目标对象的原型（prototype），对应<code>Object.setPrototypeOf(obj, newProto)</code>方法。它返回一个布尔值，表示是否设置成功。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript">const myObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span>myObj<span class="token punctuation">,</span> Array<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span>myObj<span class="token punctuation">,</span> Array<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>

myObj<span class="token punctuation">.</span>length<span class="token comment" spellcheck="true"> // 0
</span></code></pre>
                                <p>
                                    如果无法设置目标对象的原型（比如，目标对象禁止扩展），<code>Reflect.setPrototypeOf</code>方法返回<code>false</code>。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">Reflect<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// true
</span>Reflect<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span>Object<span class="token punctuation">.</span><span class="token function">freeze<span class="token punctuation">(</span></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// false
</span></code></pre>
                                <p>
                                    如果第一个参数不是对象，<code>Object.setPrototypeOf</code>会返回第一个参数本身，而<code>Reflect.setPrototypeOf</code>会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 1
</span>
Reflect<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// TypeError: Reflect.setPrototypeOf called on non-object
</span></code></pre>
                                <p>
                                    如果第一个参数是<code>undefined</code>或<code>null</code>，<code>Object.setPrototypeOf</code>和<code>Reflect.setPrototypeOf</code>都会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// TypeError: Object.setPrototypeOf called on null or undefined
</span>
Reflect<span class="token punctuation">.</span><span class="token function">setPrototypeOf<span class="token punctuation">(</span></span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// TypeError: Reflect.setPrototypeOf called on non-object
</span></code></pre>
                            </li>
                            <li>
                                <h4>Reflect.apply(func, thisArg, args)</h4>
                                <p>
                                    <code>Reflect.apply</code>方法等同于<code>Function.prototype.apply.call(func, thisArg, args)</code>，用于绑定<code>this</code>对象后执行给定函数。
                                </p>
                                <p>
                                    一般来说，如果要绑定一个函数的<code>this</code>对象，可以这样写<code>fn.apply(obj, args)</code>，但是如果函数定义了自己的<code>apply</code>方法，就只能写成<code>Function.prototype.apply.call(fn, obj, args)</code>，采用<code>Reflect</code>对象可以简化这种操作。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">const ages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">54</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">96</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>const youngest <span class="token operator">=</span> Math<span class="token punctuation">.</span>min<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span>Math<span class="token punctuation">,</span> ages<span class="token punctuation">)</span><span class="token punctuation">;</span>
const oldest <span class="token operator">=</span> Math<span class="token punctuation">.</span>max<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span>Math<span class="token punctuation">,</span> ages<span class="token punctuation">)</span><span class="token punctuation">;</span>
const type <span class="token operator">=</span> Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">.</span><span class="token function">call<span class="token punctuation">(</span></span>youngest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 新写法
</span>const youngest <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span>Math<span class="token punctuation">.</span>min<span class="token punctuation">,</span> Math<span class="token punctuation">,</span> ages<span class="token punctuation">)</span><span class="token punctuation">;</span>
const oldest <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span>Math<span class="token punctuation">.</span>max<span class="token punctuation">,</span> Math<span class="token punctuation">,</span> ages<span class="token punctuation">)</span><span class="token punctuation">;</span>
const type <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">apply<span class="token punctuation">(</span></span>Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">,</span> youngest<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                            </li>
                            <li>
                                <h4>Reflect.defineProperty(target, propertyKey, attributes)</h4>
                                <p>
                                    <code>Reflect.defineProperty</code>方法基本等同于<code>Object.defineProperty</code>，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用<code>Reflect.defineProperty</code>代替它。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">MyDate<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment" spellcheck="true">/*…*/</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>Object<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>MyDate<span class="token punctuation">,</span> <span class="token string">'now'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  value<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> Date<span class="token punctuation">.</span><span class="token function">now<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>MyDate<span class="token punctuation">,</span> <span class="token string">'now'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  value<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> Date<span class="token punctuation">.</span><span class="token function">now<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                                <p>
                                    如果<code>Reflect.defineProperty</code>的第一个参数不是对象，就会抛出错误，比如<code>Reflect.defineProperty(1, 'foo')</code>。
                                </p>
                                <p>
                                    这个方法可以与<code>Proxy.defineProperty</code>配合使用。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">const p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>target<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'bar'</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// {value: "bar", writable: true, enumerable: true, configurable: true}
</span>
p<span class="token punctuation">.</span>foo<span class="token comment" spellcheck="true"> // "bar"
</span></code></pre>
			                    <p>
                                    上面代码中，<code>Proxy.defineProperty</code>对属性赋值设置了拦截，然后使用<code>Reflect.defineProperty</code>完成了赋值。
                                </p> 
                            </li>
                            <li>
                                <h4>Reflect.getOwnPropertyDescriptor(target, propertyKey)</h4>
                                <p>
                                    <code>Reflect.getOwnPropertyDescriptor</code>基本等同于<code>Object.getOwnPropertyDescriptor</code>，用于得到指定属性的描述对象，将来会替代掉后者。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty<span class="token punctuation">(</span></span>myObject<span class="token punctuation">,</span> <span class="token string">'hidden'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  value<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  enumerable<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span><span class="token keyword">var</span> theDescriptor <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor<span class="token punctuation">(</span></span>myObject<span class="token punctuation">,</span> <span class="token string">'hidden'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 新写法
</span><span class="token keyword">var</span> theDescriptor <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor<span class="token punctuation">(</span></span>myObject<span class="token punctuation">,</span> <span class="token string">'hidden'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
			                    <p>
                                    <code>Reflect.getOwnPropertyDescriptor</code>和<code>Object.getOwnPropertyDescriptor</code>的一个区别是，如果第一个参数不是对象，<code>Object.getOwnPropertyDescriptor(1, 'foo')</code>不报错，返回<code>undefined</code>，而<code>Reflect.getOwnPropertyDescriptor(1, 'foo')</code>会抛出错误，表示参数非法。
                                </p>
                            </li>
                            <li>
                                <h4>Reflect.isExtensible (target)</h4>
                                <p>
                                    <code>Reflect.isExtensible</code>方法对应<code>Object.isExtensible</code>，返回一个布尔值，表示当前对象是否可扩展。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript">const myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>Object<span class="token punctuation">.</span><span class="token function">isExtensible<span class="token punctuation">(</span></span>myObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // true
</span><span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">isExtensible<span class="token punctuation">(</span></span>myObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // true
</span></code></pre>
                                <p>
                                    如果参数不是对象，<code>Object.isExtensible</code>会返回<code>false</code>，因为非对象本来就是不可扩展的，而<code>Reflect.isExtensible</code>会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript">Object<span class="token punctuation">.</span><span class="token function">isExtensible<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // false
</span>Reflect<span class="token punctuation">.</span><span class="token function">isExtensible<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                            </li>
                            <li>
                                <h4>Reflect.preventExtensions(target)</h4>
                                <p>
                                    <code>Reflect.preventExtensions</code>对应<code>Object.preventExtensions</code>方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>Object<span class="token punctuation">.</span><span class="token function">preventExtensions<span class="token punctuation">(</span></span>myObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // Object {}
</span><span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">preventExtensions<span class="token punctuation">(</span></span>myObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // true
</span></code></pre>
                                <p>
                                    如果参数不是对象，<code>Object.preventExtensions</code>在 ES5 环境报错，在 ES6 环境返回传入的参数，而<code>Reflect.preventExtensions</code>会报错。
                                </p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// ES5 环境
</span>Object<span class="token punctuation">.</span><span class="token function">preventExtensions<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span><span class="token comment" spellcheck="true">
// ES6 环境
</span>Object<span class="token punctuation">.</span><span class="token function">preventExtensions<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 1
</span><span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">preventExtensions<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                            </li>
                            <li>
                                <h4>Reflect.ownKeys (target)</h4>
                                <p>
                                    <code>Reflect.ownKeys</code>方法用于返回对象的所有属性，基本等同于<code>Object.getOwnPropertyNames</code>与<code>Object.getOwnPropertySymbols</code>之和。
                                </p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  foo<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  bar<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token string">'baz'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token string">'bing'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 旧写法
</span>Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames<span class="token punctuation">(</span></span>myObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// ['foo', 'bar']
</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertySymbols<span class="token punctuation">(</span></span>myObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true">
//[Symbol(baz), Symbol(bing)]
</span><span class="token comment" spellcheck="true">
// 新写法
</span>Reflect<span class="token punctuation">.</span><span class="token function">ownKeys<span class="token punctuation">(</span></span>myObject<span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
</span></code></pre>
                            </li>
                        </ul>
                    </div>
                </li>
                <li id="four3">
                    <h3>3.实例：使用 Proxy 实现观察者模式</h3>
                    <div class="mainBox">
                        <p>
                            观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
                        </p>
			            <pre class=" language-javascript"><code class=" language-javascript">const person <span class="token operator">=</span> <span class="token function">observable<span class="token punctuation">(</span></span><span class="token punctuation">{</span>
  name<span class="token punctuation">:</span> <span class="token string">'张三'</span><span class="token punctuation">,</span>
  age<span class="token punctuation">:</span> <span class="token number">20</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">print<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span>`$<span class="token punctuation">{</span>person<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">,</span> $<span class="token punctuation">{</span>person<span class="token punctuation">.</span>age<span class="token punctuation">}</span>`<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">observe<span class="token punctuation">(</span></span>print<span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'李四'</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// 输出
</span><span class="token comment" spellcheck="true">// 李四, 20
</span></code></pre>
                        <p>
                            上面代码中，数据对象<code>person</code>是观察目标，函数<code>print</code>是观察者。一旦数据对象发生变化，<code>print</code>就会自动执行。
                        </p>
                        <p>
                            下面，使用 Proxy 写一个观察者模式的最简单实现，即实现<code>observable</code>和<code>observe</code>这两个函数。思路是<code>observable</code>函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
                        </p>
                        <pre class=" language-javascript"><code class=" language-javascript">const queuedObservers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

const observe <span class="token operator">=</span> fn <span class="token operator">=</span><span class="token operator">&gt;</span> queuedObservers<span class="token punctuation">.</span><span class="token function">add<span class="token punctuation">(</span></span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
const observable <span class="token operator">=</span> obj <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token keyword">set</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token keyword">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  const result <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
  queuedObservers<span class="token punctuation">.</span><span class="token function">forEach<span class="token punctuation">(</span></span>observer <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">observer<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
			            <p>
                            上面代码中，先定义了一个<code>Set</code>集合，所有观察者函数都放进这个集合。然后，<code>observable</code>函数返回原始对象的代理，拦截赋值操作。拦截函数<code>set</code>之中，会自动执行所有观察者。
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