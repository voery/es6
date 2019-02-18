<template>
    <div class="sidebar">
        <h2>ECMAScript 6入门</h2>
        <h5>目录</h5>
        <ol start="0">
            <li>
                <router-link to="/zero">前言</router-link>
            </li>
            <li>
                <router-link to="/one">ECMAScript 6简介</router-link>               
            </li>
            <li>
                <router-link to="/two">let和const命令</router-link>
            </li>
            <li>
                <router-link to="/three">变量的解构赋值</router-link>                
            </li>
            <li>
                <router-link to="/four">字符串的扩展</router-link>
            </li>
            <li>
                <router-link to="/five">正则的扩展</router-link>                
            </li>
            <li>
                <router-link to="/six">数值的扩展</router-link>                
            </li>
            <li>
                <router-link to="/seven">函数的扩展</router-link>                
            </li>
            <li>
                <router-link to="/eight">数组的扩展</router-link>               
            </li>
            <li>
                <router-link to="/nine">对象的扩展</router-link>                
            </li>
            <li>
                <router-link to="/ten">对象的新增方法</router-link>                
            </li>
            <li>
                <router-link to="/eleven">Symbol</router-link>                
            </li>
            <li>
                <router-link to="/twelve">Set和Map数据结构</router-link>
            </li>
            <li>
                <router-link to="/thirteen">Proxy</router-link>
            </li>
            <li>
                <router-link to="/fourteen">Reflect</router-link>                
            </li>
            <li>
                <router-link to="/fifteen">Promise对象</router-link>                
            </li>
            <li>
                <router-link to="/sixteen">Iterator和for...of循环</router-link>                
            </li>
            <li>
                <router-link to="/seventeen">Generator函数的语法</router-link>                
            </li>
            <li>
                <router-link to="/eighteen">Generator 函数的异步应用</router-link>
            </li>
            <li>
                <router-link to="/nineteen">async函数</router-link>
            </li>
            <li>
                <router-link to="/twenty">Class的基本语法</router-link>  
            </li>
            <li>
                <router-link to="/twentyOne">Class的继承</router-link>
                
            </li>
            <li>
                <router-link to="/twentyTwo">Decorator</router-link>          
            </li>
            <li>
                <router-link to="/twentyThree">Module的语法</router-link>            
            </li>
            <li>
                <router-link to="/twentyFour">Module的加载实现</router-link>            
            </li>
            <li>
                <router-link to="/twentyFive">编程风格</router-link>               
            </li>
            <li>
                <router-link to="/twentySix">读懂规格</router-link>              
            </li>
            <li>
                <router-link to="/twentySeven">ArrayBuffer</router-link>              
            </li>
            <li>
                <router-link to="/twentyEight">最新提案</router-link>               
            </li>
            <li>
                <router-link to="/twentyNine">参考链接</router-link>               
            </li>
        </ol>
        <h5>其他</h5>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    .sidebar{
        padding-left: 20px;
        h2{
            text-align: center;
        }
        ol{
            padding-left: 40px;
            line-height: 30px;
            a{
                color:#4682BE;
                text-decoration: none;
            }
        }
    }
</style>