//=============================================================================
// main.js
//=============================================================================

// 加载插件
PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};
