
//-----------------------------------------------------------------------------
// PluginManager
//
// The static class that manages the plugins.

function PluginManager() {
    throw new Error('This is a static class');
}

PluginManager._path = 'js/plugins/';
// 记录已加载插件的名称，区分大小写
PluginManager._scripts = [];
// 记录加载失败的插件URL
PluginManager._errorUrls = [];
// 插件名称转换为全小写
PluginManager._parameters = {};

// 加载插件
PluginManager.setup = function (plugins) {
    plugins.forEach(function (plugin) {
		// 检测状态是否开启，每个插件只处理一次
        if (plugin.status && !this._scripts.contains(plugin.name)) {
            this.setParameters(plugin.name, plugin.parameters);
            this.loadScript(plugin.name + '.js');
            this._scripts.push(plugin.name);
        }
    }, this);
};

PluginManager.checkErrors = function () {
    var url = this._errorUrls.shift();
    if (url) {
        throw new Error('Failed to load: ' + url);
    }
};

// 获取插件的所有参数
PluginManager.parameters = function (name) {
    return this._parameters[name.toLowerCase()] || {};
};

// 设置插件参数
PluginManager.setParameters = function (name, parameters) {
    this._parameters[name.toLowerCase()] = parameters;
};

// 读取脚本，并在加载完成时立即执行
PluginManager.loadScript = function (name) {
    var url = this._path + name;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
};

// 记录加载失败的插件
PluginManager.onError = function (e) {
    this._errorUrls.push(e.target._url);
};
