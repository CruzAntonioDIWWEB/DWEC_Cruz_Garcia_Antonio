export default{
    presets:[
        [
            '@babel/preset-env', {
                targets:'> 0.25%, firefox>10, not dead', //navegadores a los que se dirige
                useBuiltIns: 'usage', //incluye polyfills
                corejs:3 //version de js
            }
        ]
    ]
};