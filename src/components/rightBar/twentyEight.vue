<template>
    <div class="content">
        <h1>最新提案</h1>
        <div class="sideSonBar">
            <ul>
                <li>
                    <router-link to="/twentyEight#twentyEight1">1.do 表达式</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight2">2.throw 表达式</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight3">3.链判断运算符</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight4">4.直接输入 U+2028 和 U+2029</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight5">5.函数的部分执行</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight6">6.管道运算符</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight7">7.数值分隔符</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight8">8.BigInt 数据类型</router-link>
                </li>
                <li>
                    <router-link to="/twentyEight#twentyEight9">9.Math.signbit()</router-link>
                </li>
            </ul>    
        </div>
        <div class="mainContent">
            <p>本章介绍一些尚未进入标准、但很有希望的最新提案。</p>
            <ul>
                <li id="twentyEight1">
                    <h3>1.do 表达式</h3>
                    <div class="mainBox">
                        <p>本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。</p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token punctuation">{</span>
  <span class="token keyword">let</span> t <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  t <span class="token operator">=</span> t <span class="token operator">*</span> t <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到<code>t</code>的值，因为块级作用域不返回值，除非<code>t</code>是全局变量。</p>
                        <p>现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-do-expressions">提案</a>，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上<code>do</code>，使它变为<code>do</code>表达式，然后就会返回内部最后执行的表达式的值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token keyword">do</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> t <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  t <span class="token operator">*</span> t <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>上面代码中，变量<code>x</code>会得到整个块级作用域的返回值（<code>t * t + 1</code>）。</p>
                        <p><code>do</code>表达式的逻辑非常简单：封装的是什么，就会返回什么。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 等同于 &lt;表达式&gt;
</span><span class="token keyword">do</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>表达式<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// 等同于 &lt;语句&gt;
</span><span class="token keyword">do</span> <span class="token punctuation">{</span> <span class="token operator">&lt;</span>语句<span class="token operator">&gt;</span> <span class="token punctuation">}</span>
</code></pre>
                        <p><code>do</code>表达式的好处是可以封装多个语句，让程序更加模块化，就像乐高积木那样一块块拼装起来。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token keyword">do</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">foo<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">bar<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">g<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token function">h<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
                        <p>上面代码的本质，就是根据函数<code>foo</code>的执行结果，调用不同的函数，将返回结果赋给变量<code>x</code>。使用<code>do</code>表达式，就将这个操作的意图表达得非常简洁清晰。而且，<code>do</code>块级作用域提供了单独的作用域，内部操作可以与全局作用域隔绝。</p>
                        <p>值得一提的是，<code>do</code>表达式在 JSX 语法中非常好用。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">return</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>nav<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Home <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">do</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>loggedIn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token operator">&lt;</span>LogoutButton <span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token operator">&lt;</span>LoginButton <span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>nav<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre>
                        <p>上面代码中，如果不用<code>do</code>表达式，就只能用三元判断运算符（<code>?:</code>）。那样的话，一旦判断逻辑复杂，代码就会变得很不易读。</p>
                    </div>
                </li>
                <li id="twentyEight2">
                    <h3>2.throw 表达式</h3>
                    <div class="mainBox">
                        <p>JavaScript 语法规定<code>throw</code>是一个命令，用来抛出错误，不能用于表达式之中。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 报错
</span>console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>上面代码中，<code>console.log</code>的参数必须是一个表达式，如果是一个<code>throw</code>语句就会报错。</p>
                        <p>现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-throw-expressions">提案</a>，允许<code>throw</code>用于表达式。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 参数的默认值
</span><span class="token keyword">function</span> <span class="token function">save<span class="token punctuation">(</span></span>filename <span class="token operator">=</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"Argument required"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// 箭头函数的返回值
</span><span class="token function">lint<span class="token punctuation">(</span></span>ast<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token keyword">with</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"avoid using 'with' statements."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 条件表达式
</span><span class="token keyword">function</span> <span class="token function">getEncoder<span class="token punctuation">(</span></span>encoding<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  const encoder <span class="token operator">=</span> encoding <span class="token operator">===</span> <span class="token string">"utf8"</span> <span class="token operator">?</span>
    <span class="token keyword">new</span> <span class="token class-name">UTF8Encoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span>
    encoding <span class="token operator">===</span> <span class="token string">"utf16le"</span> <span class="token operator">?</span>
      <span class="token keyword">new</span> <span class="token class-name">UTF16Encoder</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">:</span>
      encoding <span class="token operator">===</span> <span class="token string">"utf16be"</span> <span class="token operator">?</span>
        <span class="token keyword">new</span> <span class="token class-name">UTF16Encoder</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Unsupported encoding"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment" spellcheck="true">
// 逻辑表达式
</span>class <span class="token class-name">Product</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span> <span class="token function">id<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_id<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">set</span> <span class="token function">id<span class="token punctuation">(</span></span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_id <span class="token operator">=</span> value <span class="token operator">||</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Invalid value"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>上面代码中，<code>throw</code>都出现在表达式里面。</p>
                        <p>语法上，<code>throw</code>表达式里面的<code>throw</code>不再是一个命令，而是一个运算符。为了避免与<code>throw</code>命令混淆，规定<code>throw</code>出现在行首，一律解释为<code>throw</code>语句，而不是<code>throw</code>表达式。</p>

                    </div>
                </li>
                <li id="twentyEight3">
                    <h3>3.链判断运算符</h3>
                    <div class="mainBox">
                        <p>编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取<code>message.body.user.firstName</code>，安全的写法是写成下面这样。</p>
			            <pre class=" language-javascript"><code class=" language-javascript">const firstName <span class="token operator">=</span> <span class="token punctuation">(</span>message
  <span class="token operator">&amp;&amp;</span> message<span class="token punctuation">.</span>body
  <span class="token operator">&amp;&amp;</span> message<span class="token punctuation">.</span>body<span class="token punctuation">.</span>user
  <span class="token operator">&amp;&amp;</span> message<span class="token punctuation">.</span>body<span class="token punctuation">.</span>user<span class="token punctuation">.</span>firstName<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token string">'default'</span><span class="token punctuation">;</span>
</code></pre>
                        <p>这样的层层判断非常麻烦，因此现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-optional-chaining">提案</a>，引入了“链判断运算符”（optional chaining operator）<code>?.</code>，简化上面的写法。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">const firstName <span class="token operator">=</span> message<span class="token operator">?</span><span class="token punctuation">.</span>body<span class="token operator">?</span><span class="token punctuation">.</span>user<span class="token operator">?</span><span class="token punctuation">.</span>firstName <span class="token operator">||</span> <span class="token string">'default'</span><span class="token punctuation">;</span>
</code></pre>
                        <p>上面代码有三个<code>?.</code>运算符，直接在链式调用的时候判断，左侧的对象是否为<code>null</code>或<code>undefined</code>。如果是的，就不再往下运算，而是返回<code>undefined</code>。</p>
                        <p>链判断运算符号有三种用法。</p>
                        <ul class="list">
                            <li><code>obj?.prop</code> // 读取对象属性</li>
                            <li><code>obj?.[expr]</code> // 同上</li>
                            <li><code>func?.(...args)</code> // 函数或对象方法的调用</li>
                        </ul>
                        <p>下面是判断函数是否存在的例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">iterator<span class="token punctuation">.</span><span class="token keyword">return</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
                        <p>上面代码中，<code>iterator.return</code>如果有定义，就会调用该方法，否则直接返回<code>undefined</code>。</p>
                        <p>下面是更多的例子。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">a<span class="token operator">?</span><span class="token punctuation">.</span>b<span class="token comment" spellcheck="true">
// 等同于
</span>a <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> undefined <span class="token punctuation">:</span> a<span class="token punctuation">.</span>b

a<span class="token operator">?</span><span class="token punctuation">.</span><span class="token punctuation">[</span>x<span class="token punctuation">]</span><span class="token comment" spellcheck="true">
// 等同于
</span>a <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> undefined <span class="token punctuation">:</span> a<span class="token punctuation">[</span>x<span class="token punctuation">]</span>

a<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">b<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 等同于
</span>a <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> undefined <span class="token punctuation">:</span> a<span class="token punctuation">.</span><span class="token function">b<span class="token punctuation">(</span></span><span class="token punctuation">)</span>

a<span class="token operator">?</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 等同于
</span>a <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> undefined <span class="token punctuation">:</span> <span class="token function">a<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
</code></pre>
                        <p>使用这个运算符，有几个注意点。</p>
                        <p>（1）短路机制</p>
                        <pre class=" language-javascript"><code class=" language-javascript">a<span class="token operator">?</span><span class="token punctuation">.</span><span class="token punctuation">[</span><span class="token operator">++</span>x<span class="token punctuation">]</span><span class="token comment" spellcheck="true">
// 等同于
</span>a <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> undefined <span class="token punctuation">:</span> a<span class="token punctuation">[</span><span class="token operator">++</span>x<span class="token punctuation">]</span>
</code></pre>
                        <p>上面代码中，如果<code>a</code>是<code>undefined</code>或<code>null</code>，那么<code>x</code>不会进行递增运算。也就是说，链判断运算符一旦为真，右侧的表达式就不再求值。</p>
                        <p>（2）delete 运算符</p>
                        <pre class=" language-javascript"><code class=" language-javascript">delete a<span class="token operator">?</span><span class="token punctuation">.</span>b<span class="token comment" spellcheck="true">
// 等同于
</span>a <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> undefined <span class="token punctuation">:</span> delete a<span class="token punctuation">.</span>b
</code></pre>
                        <p>上面代码中，如果<code>a</code>是<code>undefined</code>或<code>null</code>，会直接返回<code>undefined</code>，而不会进行<code>delete</code>运算。</p>
                        <p>（3）报错场合</p>
                        <p>以下写法是禁止，会报错。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 构造函数判断
</span><span class="token keyword">new</span> <span class="token class-name">a</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment" spellcheck="true">
// 运算符右侧是模板字符串
</span>a<span class="token operator">?</span><span class="token punctuation">.</span>`<span class="token punctuation">{</span>b<span class="token punctuation">}</span>`
<span class="token comment" spellcheck="true">
// 链判断运算符前后有构造函数或模板字符串
</span><span class="token keyword">new</span> <span class="token class-name">a</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">b<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
a<span class="token operator">?</span><span class="token punctuation">.</span>b`<span class="token punctuation">{</span>c<span class="token punctuation">}</span>`
<span class="token comment" spellcheck="true">
// 链运算符用于赋值运算符左侧
</span>a<span class="token operator">?</span><span class="token punctuation">.</span>b <span class="token operator">=</span> c
</code></pre>
                        <p>（4）右侧不得为十进制数值</p>
                        <p>为了保证兼容以前的代码，允许<code>foo?.3:0</code>被解析成<code>foo ? .3 : 0</code>，因此规定如果<code>?.</code>后面紧跟一个十进制数字，那么<code>?.</code>不再被看成是一个完整的运算符，而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。</p>
                    </div>
                </li>
                <li id="twentyEight4">
                    <h3>4.直接输入 U+2028 和 U+2029</h3>
                    <div class="mainBox">
                        <p>JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式<code>\u4e2d</code>，两者是等价的。</p>
			            <pre class=" language-javascript"><code class=" language-javascript"><span class="token string">'中'</span> <span class="token operator">===</span> <span class="token string">'\u4e2d'</span><span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>但是，JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。</p>
                        <ul class="list">
                            <li>U+005C：反斜杠（reverse solidus)</li>
                            <li>U+000D：回车（carriage return）</li>
                            <li>U+2028：行分隔符（line separator）</li>
                            <li>U+2029：段分隔符（paragraph separator）</li>
                            <li>U+000A：换行符（line feed）</li>
                        </ul>
                        <p>举例来说，字符串里面不能直接包含反斜杠，一定要转义写成<code>\\</code>或者<code>\u005c</code>。</p>
                        <p>这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被<code>JSON.parse</code>解析，就有可能直接报错。</p>
                        <p>JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-json-superset">提案</a>，允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">const PS <span class="token operator">=</span> <span class="token function">eval<span class="token punctuation">(</span></span><span class="token string">"'\u2029'"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                        <p>根据这个提案，上面的代码不会报错。</p>
                        <p>注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。</p>
                    </div>
                </li>
                <li id="twentyEight5">
                    <h3>5.函数的部分执行</h3>
                    <div class="mainBox">
                        <ul class="baseList">
                            <li>
                                <h4>语法</h4>
                                <p>多参数的函数有时需要绑定其中的一个或多个参数，然后返回一个新函数。</p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">add<span class="token punctuation">(</span></span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">add7<span class="token punctuation">(</span></span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> <span class="token number">7</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre>
                                <p>上面代码中，<code>add7</code>函数其实是<code>add</code>函数的一个特殊版本，通过将一个参数绑定为<code>7</code>，就可以从<code>add</code>得到<code>add7</code>。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// bind 方法
</span>const add7 <span class="token operator">=</span> add<span class="token punctuation">.</span><span class="token function">bind<span class="token punctuation">(</span></span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// 箭头函数
</span>const add7 <span class="token operator">=</span> x <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">add<span class="token punctuation">(</span></span>x<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                                <p>上面两种写法都有些冗余。其中，<code>bind</code>方法的局限更加明显，它必须提供<code>this</code>，并且只能从前到后一个个绑定参数，无法只绑定非头部的参数。</p>
                                <p>现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-partial-application">提案</a>，使得绑定参数并返回一个新函数更加容易。这叫做函数的部分执行（partial application）。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">const add <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
const addOne <span class="token operator">=</span> <span class="token function">add<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

const maxGreaterThanZero <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max<span class="token punctuation">(</span></span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                                <p>根据新提案，<code>?</code>是单个参数的占位符，<code>...</code>是多个参数的占位符。以下的形式都属于函数的部分执行。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token function">f<span class="token punctuation">(</span></span>x<span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">)</span>
<span class="token function">f<span class="token punctuation">(</span></span>x<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
<span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
<span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
<span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">)</span>
<span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
</code></pre>
                                <p><code>?</code>和<code>...</code>只能出现在函数的调用之中，并且会返回一个新函数。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">const g <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// 等同于
</span>const g <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">f<span class="token punctuation">(</span></span>x<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                                <p>函数的部分执行，也可以用于对象的方法。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">f<span class="token punctuation">(</span></span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

const g <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 4
</span></code></pre>
                            </li>
                            <li>
                                <h4>注意点</h4>
                                <p>函数的部分执行有一些特别注意的地方。</p>
                                <p>（1）函数的部分执行是基于原函数的。如果原函数发生变化，部分执行生成的新函数也会立即反映这种变化。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> f <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>

const g <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 4
</span><span class="token comment" spellcheck="true">
// 替换函数 f
</span>f <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> x <span class="token operator">*</span> y<span class="token punctuation">;</span>

<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 3
</span></code></pre>
                                <p>上面代码中，定义了函数的部分执行以后，更换原函数会立即影响到新函数。</p>
                                <p>（2）如果预先提供的那个值是一个表达式，那么这个表达式并不会在定义时求值，而是在每次调用时求值。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
const f <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>

const g <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 4
</span><span class="token comment" spellcheck="true">
// 改变 a 的值
</span>a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // 11
</span></code></pre>
                                <p>上面代码中，预先提供的参数是变量<code>a</code>，那么每次调用函数<code>g</code>的时候，才会对<code>a</code>进行求值。</p>
                                <p>（3）如果新函数的参数多于占位符的数量，那么多余的参数将被忽略。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">const f <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>y<span class="token punctuation">]</span><span class="token punctuation">;</span>
const g <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [2, 1]
</span></code></pre>
                                <p>上面代码中，函数<code>g</code>只有一个占位符，也就意味着它只能接受一个参数，多余的参数都会被忽略。</p>
                                <p>写成下面这样，多余的参数就没有问题。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">const f <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>y<span class="token punctuation">]</span><span class="token punctuation">;</span>
const g <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token operator">?</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [2, 1, 3, 4];
</span></code></pre>
                                <p>（4）<code>...</code>只会被采集一次，如果函数的部分执行使用了多个<code>...</code>，那么每个<code>...</code>的值都将相同。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">const f <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> x<span class="token punctuation">;</span>
const g <span class="token operator">=</span> <span class="token function">f<span class="token punctuation">(</span></span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">g<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment" spellcheck="true"> // [1, 2, 3, 9, 1, 2, 3]
</span></code></pre>
			                    <p>上面代码中，<code>g</code>定义了两个<code>...</code>占位符，真正执行的时候，它们的值是一样的。</p>
                            </li>
                        </ul>
                    </div>
                </li>
                <li id="twentyEight6">
                    <h3>6.管道运算符</h3>
                    <div class="mainBox">
                        <p>Unix 操作系统有一个管道机制（pipeline），可以把前一个操作的值传给后一个操作。这个机制非常有用，使得简单的操作可以组合成为复杂的操作。许多语言都有管道的实现，现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-pipeline-operator">提案</a>，让 JavaScript 也拥有管道机制。</p>
                        <p>JavaScript 的管道是一个运算符，写作<code>|&gt;</code>。它的左边是一个表达式，右边是一个函数。管道运算符把左边表达式的值，传入右边的函数进行求值。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">x <span class="token operator">|</span><span class="token operator">&gt;</span> f<span class="token comment" spellcheck="true">
// 等同于
</span><span class="token function">f<span class="token punctuation">(</span></span>x<span class="token punctuation">)</span>
</code></pre>
                        <p>管道运算符最大的好处，就是可以把嵌套的函数，写成从左到右的链式表达式。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> doubleSay <span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str <span class="token operator">+</span> <span class="token string">", "</span> <span class="token operator">+</span> str<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> capitalize <span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toUpperCase<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token function">substring<span class="token punctuation">(</span></span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> exclaim <span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str <span class="token operator">+</span> <span class="token string">'!'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
                        <p>上面是三个简单的函数。如果要嵌套执行，传统的写法和管道的写法分别如下。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 传统的写法
</span><span class="token function">exclaim<span class="token punctuation">(</span></span><span class="token function">capitalize<span class="token punctuation">(</span></span><span class="token function">doubleSay<span class="token punctuation">(</span></span><span class="token string">'hello'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// "Hello, hello!"
</span><span class="token comment" spellcheck="true">
// 管道的写法
</span><span class="token string">'hello'</span>
  <span class="token operator">|</span><span class="token operator">&gt;</span> doubleSay
  <span class="token operator">|</span><span class="token operator">&gt;</span> capitalize
  <span class="token operator">|</span><span class="token operator">&gt;</span> exclaim<span class="token comment" spellcheck="true">
// "Hello, hello!"
</span></code></pre>
                        <p>管道运算符只能传递一个值，这意味着它右边的函数必须是一个单参数函数。如果是多参数函数，就必须进行柯里化，改成单参数的版本。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> double <span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> x<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">function</span> add <span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span> score<span class="token punctuation">:</span> <span class="token number">25</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span>score
  <span class="token operator">|</span><span class="token operator">&gt;</span> double
  <span class="token operator">|</span><span class="token operator">&gt;</span> <span class="token punctuation">(</span>_ <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token function">add<span class="token punctuation">(</span></span><span class="token number">7</span><span class="token punctuation">,</span> _<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 57
</span></code></pre>
                        <p>上面代码中，<code>add</code>函数需要两个参数。但是，管道运算符只能传入一个值，因此需要事先提供另一个参数，并将其改成单参数的箭头函数<code>_ =&gt; add(7, _)</code>。这个函数里面的下划线并没有特别的含义，可以用其他符号代替，使用下划线只是因为，它能够形象地表示这里是占位符。</p>
                        <p>管道运算符对于<code>await</code>函数也适用。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">x <span class="token operator">|</span><span class="token operator">&gt;</span> await f<span class="token comment" spellcheck="true">
// 等同于
</span>await <span class="token function">f<span class="token punctuation">(</span></span>x<span class="token punctuation">)</span>

const userAge <span class="token operator">=</span> userId <span class="token operator">|</span><span class="token operator">&gt;</span> await fetchUserById <span class="token operator">|</span><span class="token operator">&gt;</span> getAgeFromUser<span class="token punctuation">;</span><span class="token comment" spellcheck="true">
// 等同于
</span>const userAge <span class="token operator">=</span> <span class="token function">getAgeFromUser<span class="token punctuation">(</span></span>await <span class="token function">fetchUserById<span class="token punctuation">(</span></span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
                    </div>
                </li>
                <li id="twentyEight7">
                    <h3>7.数值分隔符</h3>
                    <div class="mainBox">
                        <p>欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，<code>1000</code>可以写作<code>1,000</code>。</p>
                        <p>现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-numeric-separator">提案</a>，允许 JavaScript 的数值使用下划线（<code>_</code>）作为分隔符。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> budget <span class="token operator">=</span> 1_000_000_000_000<span class="token punctuation">;</span>
budget <span class="token operator">===</span> <span class="token number">10</span> <span class="token operator">*</span><span class="token operator">*</span> <span class="token number">12</span><span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>JavaScript 的数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">123_00 <span class="token operator">===</span> 12_300<span class="token comment" spellcheck="true"> // true
</span>
12345_00 <span class="token operator">===</span> 123_4500<span class="token comment" spellcheck="true"> // true
</span>12345_00 <span class="token operator">===</span> 1_234_500<span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>小数和科学计数法也可以使用数值分隔符。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 小数
</span><span class="token number">0</span><span class="token punctuation">.</span>000_001<span class="token comment" spellcheck="true">
// 科学计数法
</span>1e10_000
</code></pre>
                        <p>数值分隔符有几个使用注意点。</p>
                        <ul class="list">
                            <li>不能在数值的最前面（leading）或最后面（trailing）。</li>
                            <li>不能两个或两个以上的分隔符连在一起。</li>
                            <li>小数点的前后不能有分隔符。</li>
                            <li>科学计数法里面，表示指数的<code>e</code>或<code>E</code>前后不能有分隔符。</li>
                        </ul>
                        <p>下面的写法都会报错。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 全部报错
</span>3_<span class="token number">.141</span>
<span class="token number">3</span><span class="token punctuation">.</span>_141
1_e12
1e_12
123__456
_1464301
1464301_
</code></pre>
                        <p>除了十进制，其他进制的数值也可以使用分隔符。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 二进制
</span>0b1010_0001_1000_0101<span class="token comment" spellcheck="true">
// 十六进制
</span>0xA0_B0_C0
</code></pre>
                        <p>注意，分隔符不能紧跟着进制的前缀<code>0b</code>、<code>0B</code>、<code>0o</code>、<code>0O</code>、<code>0x</code>、<code>0X</code>。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 报错
</span>0_b111111000
0b_111111000
</code></pre>
                        <p>下面三个将字符串转成数值的函数，不支持数值分隔符。主要原因是提案的设计者认为，数值分隔符主要是为了编码时书写数值的方便，而不是为了处理外部输入的数据。</p>
                        <ul class="list">
                            <li>Number()</li>
                            <li>parseInt()</li>
                            <li>parseFloat()</li>
                        </ul>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token function">Number<span class="token punctuation">(</span></span><span class="token string">'123_456'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // NaN
</span><span class="token function">parseInt<span class="token punctuation">(</span></span><span class="token string">'123_456'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 123
</span></code></pre>
                    </div>
                </li>
                <li id="twentyEight8">
                    <h3>8.BigInt 数据类型</h3>
                    <div class="mainBox">
                        <ul class="baseList">
                            <li>
                                <h4>简介</h4>
                                <p>JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回<code>Infinity</code>。</p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 超过 53 个二进制位的数值，无法保持精度
</span>Math<span class="token punctuation">.</span><span class="token function">pow<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">53</span><span class="token punctuation">)</span> <span class="token operator">===</span> Math<span class="token punctuation">.</span><span class="token function">pow<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">53</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token comment" spellcheck="true"> // true
</span><span class="token comment" spellcheck="true">
// 超过 2 的 1024 次方的数值，无法表示
</span>Math<span class="token punctuation">.</span><span class="token function">pow<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // Infinity
</span></code></pre>
                                <p>现在有一个 <a target="_blank" href="https://github.com/tc39/proposal-bigint">提案</a>，引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">const a <span class="token operator">=</span> 2172141653n<span class="token punctuation">;</span>
const b <span class="token operator">=</span> 15346349309n<span class="token punctuation">;</span>
<span class="token comment" spellcheck="true">
// BigInt 可以保持精度
</span>a <span class="token operator">*</span> b<span class="token comment" spellcheck="true"> // 33334444555566667777n
</span><span class="token comment" spellcheck="true">
// 普通整数无法保持精度
</span><span class="token function">Number<span class="token punctuation">(</span></span>a<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token function">Number<span class="token punctuation">(</span></span>b<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 33334444555566670000
</span></code></pre>
                                <p>为了与 Number 类型区别，BigInt 类型的数据必须添加后缀<code>n</code>。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token number">1234</span><span class="token comment" spellcheck="true"> // 普通整数
</span>1234n<span class="token comment" spellcheck="true"> // BigInt
</span><span class="token comment" spellcheck="true">
// BigInt 的运算
</span>1n <span class="token operator">+</span> 2n<span class="token comment" spellcheck="true"> // 3n
</span></code></pre>
                                <p>BigInt 同样可以使用各种进制表示，都要加上后缀<code>n</code>。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">0b1101n<span class="token comment" spellcheck="true"> // 二进制
</span>0o777n<span class="token comment" spellcheck="true"> // 八进制
</span>0xFFn<span class="token comment" spellcheck="true"> // 十六进制
</span></code></pre>
                                <p>BigInt 与普通整数是两种值，它们之间并不相等。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">42n <span class="token operator">===</span> <span class="token number">42</span><span class="token comment" spellcheck="true"> // false
</span></code></pre>
                                <p><code>typeof</code>运算符对于 BigInt 类型的数据返回<code>bigint</code>。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">typeof</span> 123n<span class="token comment" spellcheck="true"> // 'bigint'
</span></code></pre>
                                <p>BigInt 可以使用负号（<code>-</code>），但是不能使用正号（<code>+</code>），因为会与 asm.js 冲突。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token operator">-</span>42n<span class="token comment" spellcheck="true"> // 正确
</span><span class="token operator">+</span>42n<span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                            </li>
                            <li>
                                <h4>BigInt 对象</h4>
                                <p>JavaScript 原生提供<code>BigInt</code>对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与<code>Number()</code>一致，将其他类型的值转为 BigInt。</p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token number">123</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 123n
</span><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token string">'123'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 123n
</span><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 0n
</span><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 1n
</span></code></pre>
                                <p><code>BigInt()</code>构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">new</span> <span class="token class-name">BigInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // TypeError
</span><span class="token function">BigInt<span class="token punctuation">(</span></span>undefined<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> //TypeError
</span><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // TypeError
</span><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token string">'123n'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // SyntaxError
</span><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token string">'abc'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // SyntaxError
</span></code></pre>
                                <p>上面代码中，尤其值得注意字符串<code>123n</code>无法解析成 Number 类型，所以会报错。</p>
                                <p>参数如果是小数，也会报错。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token number">1.5</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // RangeError
</span><span class="token function">BigInt<span class="token punctuation">(</span></span><span class="token string">'1.5'</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // SyntaxError
</span></code></pre>
                                <p>BigInt 对象继承了 Object 提供的实例方法。</p>
                                <ul class="list">
                                    <li><code>BigInt.prototype.toLocaleString()</code></li>
                                    <li><code>BigInt.prototype.toString()</code></li>
                                    <li><code>BigInt.prototype.valueOf()</code></li>
                                </ul>
                                <p>此外，还提供了三个静态方法。</p>
                                <ul class="list">
                                    <li><code>BigInt.asUintN(width, BigInt)</code>： 给定的 BigInt 转为 0 到 2<sup>width</sup> - 1 之间对应的值。</li>
                                    <li><code>BigInt.asIntN(width, BigInt)</code>：给定的 BigInt 转为 -2<sup>width - 1</sup> 到 2<sup>width - 1</sup> - 1 之间对应的值。</li>
                                    <li><code>BigInt.parseInt(string[, radix])</code>：近似于<code>Number.parseInt()</code>，将一个字符串转换成指定进制的 BigInt。</li>
                                </ul>
                                <pre class=" language-javascript"><code class=" language-javascript">const max <span class="token operator">=</span> 2n <span class="token operator">*</span><span class="token operator">*</span> <span class="token punctuation">(</span>64n <span class="token operator">-</span> 1n<span class="token punctuation">)</span> <span class="token operator">-</span> 1n<span class="token punctuation">;</span>

BigInt<span class="token punctuation">.</span><span class="token function">asIntN<span class="token punctuation">(</span></span><span class="token number">64</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 9223372036854775807n
</span>BigInt<span class="token punctuation">.</span><span class="token function">asIntN<span class="token punctuation">(</span></span><span class="token number">64</span><span class="token punctuation">,</span> max <span class="token operator">+</span> 1n<span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// -9223372036854775808n
</span>BigInt<span class="token punctuation">.</span><span class="token function">asUintN<span class="token punctuation">(</span></span><span class="token number">64</span><span class="token punctuation">,</span> max <span class="token operator">+</span> 1n<span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 9223372036854775808n
</span></code></pre>
                                <p>上面代码中，<code>max</code>是64位带符号的 BigInt 所能表示的最大值。如果对这个值加<code>1n</code>，<code>BigInt.asIntN()</code>将会返回一个负值，因为这时新增的一位将被解释为符号位。而<code>BigInt.asUintN()</code>方法由于不存在符号位，所以可以正确返回结果。</p>
                                <p>如果<code>BigInt.asIntN()</code>和<code>BigInt.asUintN()</code>指定的位数，小于数值本身的位数，那么头部的位将被舍弃。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">const max <span class="token operator">=</span> 2n <span class="token operator">*</span><span class="token operator">*</span> <span class="token punctuation">(</span>64n <span class="token operator">-</span> 1n<span class="token punctuation">)</span> <span class="token operator">-</span> 1n<span class="token punctuation">;</span>

BigInt<span class="token punctuation">.</span><span class="token function">asIntN<span class="token punctuation">(</span></span><span class="token number">32</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // -1n
</span>BigInt<span class="token punctuation">.</span><span class="token function">asUintN<span class="token punctuation">(</span></span><span class="token number">32</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 4294967295n
</span></code></pre>
                                <p>上面代码中，<code>max</code>是一个64位的 BigInt，如果转为32位，前面的32位都会被舍弃。</p>
                                <p>下面是<code>BigInt.parseInt()</code>的例子。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// Number.parseInt() 与 BigInt.parseInt() 的对比
</span>Number<span class="token punctuation">.</span><span class="token function">parseInt<span class="token punctuation">(</span></span><span class="token string">'9007199254740993'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 9007199254740992
</span>BigInt<span class="token punctuation">.</span><span class="token function">parseInt<span class="token punctuation">(</span></span><span class="token string">'9007199254740993'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true">
// 9007199254740993n
</span></code></pre>
                                <p>上面代码中，由于有效数字超出了最大限度，<code>Number.parseInt</code>方法返回的结果是不精确的，而<code>BigInt.parseInt</code>方法正确返回了对应的 BigInt。</p>
                                <p>对于二进制数组，BigInt 新增了两个类型<code>BigUint64Array</code>和<code>BigInt64Array</code>，这两种数据类型返回的都是64位 BigInt。<code>DataView</code>对象的实例方法<code>DataView.prototype.getBigInt64()</code>和<code>DataView.prototype.getBigUint64()</code>，返回的也是 BigInt。</p>
                            </li>
                            <li>
                                <h4>转换规则</h4>
                                <p>可以使用<code>Boolean()</code>、<code>Number()</code>和<code>String()</code>这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。</p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token function">Boolean<span class="token punctuation">(</span></span>0n<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // false
</span><span class="token function">Boolean<span class="token punctuation">(</span></span>1n<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // true
</span><span class="token function">Number<span class="token punctuation">(</span></span>1n<span class="token punctuation">)</span> <span class="token comment" spellcheck="true"> // 1
</span><span class="token function">String<span class="token punctuation">(</span></span>1n<span class="token punctuation">)</span> <span class="token comment" spellcheck="true"> // "1"
</span></code></pre>
                                <p>上面代码中，注意最后一个例子，转为字符串时后缀<code>n</code>会消失。</p>
                                <p>另外，取反运算符（<code>!</code>）也可以将 BigInt 转为布尔值。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token operator">!</span>0n<span class="token comment" spellcheck="true"> // true
</span><span class="token operator">!</span>1n<span class="token comment" spellcheck="true"> // false
</span></code></pre>
                            </li>
                            <li>
                                <h4>数学运算</h4>
                                <p>数学运算方面，BigInt 类型的<code>+</code>、<code>-</code>、<code>*</code>和<code>**</code>这四个二元运算符，与 Number 类型的行为一致。除法运算<code>/</code>会舍去小数部分，返回一个整数。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">9n <span class="token operator">/</span> 5n<span class="token comment" spellcheck="true">
// 1n
</span></code></pre>
                                <p>几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。</p>
                                <ul class="list">
                                    <li>不带符号的右移位运算符<code>&gt;&gt;&gt;</code></li>
                                    <li>一元的求正运算符<code>+</code></li>
                                </ul>
                                <p>上面两个运算符用在 BigInt 会报错。前者是因为<code>&gt;&gt;&gt;</code>运算符是不带符号的，但是 BigInt 总是带有符号的，导致该运算无意义，完全等同于右移运算符<code>&gt;&gt;</code>。后者是因为一元运算符<code>+</code>在 asm.js 里面总是返回 Number 类型，为了不破坏 asm.js 就规定<code>+1n</code>会报错。</p>
                                <p>BigInt 不能与普通数值进行混合运算。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">1n <span class="token operator">+</span> <span class="token number">1.3</span><span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                                <p>上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如<code>(2n**53n + 1n) + 0.5</code>这个表达式，如果返回 BigInt 类型，<code>0.5</code>这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。</p>
                                <p>同样的原因，如果一个标准库函数的参数预期是 Number 类型，但是得到的是一个 BigInt，就会报错。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token comment" spellcheck="true">// 错误的写法
</span>Math<span class="token punctuation">.</span><span class="token function">sqrt<span class="token punctuation">(</span></span>4n<span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 报错
</span><span class="token comment" spellcheck="true">
// 正确的写法
</span>Math<span class="token punctuation">.</span><span class="token function">sqrt<span class="token punctuation">(</span></span><span class="token function">Number<span class="token punctuation">(</span></span>4n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // 2
</span></code></pre>
                                <p>上面代码中，<code>Math.sqrt</code>的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用<code>Number</code>方法转一下类型，才能进行计算。</p>
                                <p>asm.js 里面，<code>|0</code>跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与<code>|0</code>进行运算会报错。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">1n <span class="token operator">|</span> <span class="token number">0</span><span class="token comment" spellcheck="true"> // 报错
</span></code></pre>
                            </li>
                            <li>
                                <h4>其他运算</h4>
                                <p>BigInt 对应的布尔值，与 Number 类型一致，即<code>0n</code>会转为<code>false</code>，其他值转为<code>true</code>。</p>
			                    <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">if</span> <span class="token punctuation">(</span>0n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'if'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'else'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token comment" spellcheck="true">
// else
</span></code></pre>
                                <p>上面代码中，<code>0n</code>对应<code>false</code>，所以会进入<code>else</code>子句。</p>
                                <p>比较运算符（比如<code>&gt;</code>）和相等运算符（<code>==</code>）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。</p>
                                <pre class=" language-javascript"><code class=" language-javascript">0n <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token comment" spellcheck="true"> // true
</span>0n <span class="token operator">&lt;</span> <span class="token boolean">true</span><span class="token comment" spellcheck="true"> // true
</span>0n <span class="token operator">==</span> <span class="token number">0</span><span class="token comment" spellcheck="true"> // true
</span>0n <span class="token operator">==</span> <span class="token boolean">false</span><span class="token comment" spellcheck="true"> // true
</span>0n <span class="token operator">===</span> <span class="token number">0</span><span class="token comment" spellcheck="true"> // false
</span></code></pre>
                                <p>BigInt 与字符串混合运算时，会先转为字符串，再进行运算。</p>
                                <pre class=" language-javascript"><code class=" language-javascript"><span class="token string">''</span> <span class="token operator">+</span> 123n<span class="token comment" spellcheck="true"> // "123"
</span></code></pre>
                            </li>
                        </ul>
                    </div>
                </li>
                <li id="twentyEight9">
                    <h3>9.Math.signbit()</h3>
                    <div class="mainBox">
                        <p><code>Math.sign()</code>用来判断一个值的正负，但是如果参数是<code>-0</code>，它会返回<code>-0</code>。</p>
			            <pre class=" language-javascript"><code class=" language-javascript">Math<span class="token punctuation">.</span><span class="token function">sign<span class="token punctuation">(</span></span><span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> // -0
</span></code></pre>
                        <p>这导致对于判断符号位的正负，<code>Math.sign()</code>不是很有用。JavaScript 内部使用 64 位浮点数（国际标准 IEEE 754）表示数值，IEEE 754 规定第一位是符号位，<code>0</code>表示正数，<code>1</code>表示负数。所以会有两种零，<code>+0</code>是符号位为<code>0</code>时的零值，<code>-0</code>是符号位为<code>1</code>时的零值。实际编程中，判断一个值是<code>+0</code>还是<code>-0</code>非常麻烦，因为它们是相等的。</p>
                        <pre class=" language-javascript"><code class=" language-javascript"><span class="token operator">+</span><span class="token number">0</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">0</span><span class="token comment" spellcheck="true"> // true
</span></code></pre>
                        <p>目前，有一个 <a target="_blank" href="http://jfbastien.github.io/papers/Math.signbit.html">提案</a>，引入了<code>Math.signbit()</code>方法判断一个数的符号位是否设置了。</p>
                        <pre class=" language-javascript"><code class=" language-javascript">Math<span class="token punctuation">.</span><span class="token function">signbit<span class="token punctuation">(</span></span><span class="token number">2</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> //false
</span>Math<span class="token punctuation">.</span><span class="token function">signbit<span class="token punctuation">(</span></span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> //true
</span>Math<span class="token punctuation">.</span><span class="token function">signbit<span class="token punctuation">(</span></span><span class="token number">0</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> //false
</span>Math<span class="token punctuation">.</span><span class="token function">signbit<span class="token punctuation">(</span></span><span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token comment" spellcheck="true"> //true
</span></code></pre>
                        <p>可以看到，该方法正确返回了<code>-0</code>的符号位是设置了的。</p>
                        <p>该方法的算法如下。</p>
                        <ul class="list">
                            <li>如果参数是<code>NaN</code>，返回<code>false</code></li>
                            <li>如果参数是<code>-0</code>，返回<code>true</code></li>
                            <li>如果参数是负值，返回<code>true</code></li>
                            <li>其他情况返回<code>false</code></li>
                        </ul>
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