<template>
    <div class="site-footer">
        <div class="footer-container">
            <div class="slogan">
                <h2>To Alice Margatroid</h2>
                <p>记录魔法、人偶与生活的碎片。</p>
                <p>在这里，每一行文字都是一段咒语。</p>
            </div>
            <div class="links">
                <h4>NAVIGATE</h4>
                <ul>
                    <li><a href="https://mloluyu.github.io/" target="_blank" rel="noopener">ABOUT / 关于</a></li>
                    <li><a href="#">FRIENDS / 友達</a></li>
                </ul>
            </div>
            <div class="connect">
                <h4>CONNECT</h4>
                <ul>
                    <li><a href="https://twitter.com/mloluyu" target="_blank" rel="noopener">Twitter</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-extra">
            <p class="copyright">©2026-NOW mloluyu. All Right Reserved</p>
            <p class="powered">POWERED BY&nbsp;<a href="#">MAGIC</a>&nbsp;& 紅茶</p>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
a {
    color: #555;
    text-decoration: none;
    
    &:hover {   
        text-decoration: underline;
    }
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;

    & li {
        text-align: left;
        margin-bottom: 8px;
    }
}

h4 {
    color: #A6A6A6;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    margin-bottom: 12px;
    text-align: left;
    letter-spacing: 2px;
}

.site-footer {
    /* --offset-x: calc(50% - 50vw); */
    /* width: 100vw; */
    min-height: 284px;
    /* background-color: #F0F0F0; */
    margin-left: var(--offset-x);
    display: flex;
    background-image: url('../assets/shanghai_doll.webp');
    background-size: 320px;
    background-repeat: no-repeat;
    background-position: 106% center;
    flex-direction: column;

    & .footer-container {
        border-bottom: #A6A6A6 1px solid;
        margin-top: 32px;
        min-height: 166px;
        max-width: 1215px;
        display: grid;
        flex-direction: row;
        grid-template-columns: repeat(auto-fit, minmax(250px, 405px));
        
        & .slogan {
            flex: 1;
            font-family: 'Inria Sans', sans-serif;
            /* width: 405px; */
            max-width: 405px;
            min-height: 166px;

            & h2 {
                font-size: 24px;
                font-weight: bold;
                margin: 0;
                margin-bottom: 12px;
                text-align: left;
            }

            & p {
                width: 70%;
                font-size: 16px;
                color: #818181;
                line-height: 1.5;
                margin: 0;
                text-align: left;
            }
        }

        & .links {
            flex: 1;
            /* width: 405px; */
            font-family: 'Inria Sans', sans-serif;
            min-height: 166px;
            max-width: 405px;
        }

        & .connect {
            flex: 1;
            font-family: 'Inria Sans', sans-serif;
            min-height: 166px;
            max-width: 405px;
        }
    }

    & .footer-extra {
        display: flex;
        /* justify-content: space-between; */
        flex-direction: column;
        align-items: baseline;
        max-width: 1215px;
        min-height: 35px;
        height: 100%;
        width: 100%;
        color: #8a8888;

        & p {
            margin: 0;
            height: 35px;
            line-height: 35px;
        }
    }
}

@media (max-width: 900px) {
    .site-footer .footer-container,
    .site-footer .footer-extra {
        flex-direction: column;
        align-items: flex-start;
        grid-template-columns: 1fr;
    }
    .site-footer .links,
    .site-footer .slogan,
    .site-footer .connect {
        max-width: 405px;
        /* margin-left: 0; */
    }
}
</style>