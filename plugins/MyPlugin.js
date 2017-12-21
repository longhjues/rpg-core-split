/*:
 * @plugindesc this is my plugin
 * @author longhjues
 * 
 * @param p1
 * @desc this is param 1
 * @default hello
 * 
 * @help
 * 
 * this is my plugin
 * 
 * Plugin Command:
 *   MyPlugin open              # open the window
 * 
 */


(function () {

    var parameters = PluginManager.parameters('MyPlugin')
    var p1 = String(parameters['p1'] || 'hello')

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args)
        if (command === 'MyPlugin') {
            switch (args[0]) {
                case 'open':
                    SceneManager.push(Scene_HelloWindow)
                    break
            }
        }
    }

    function Scene_HelloWindow() {
        this.initialize.apply(this, arguments)
    }

    Scene_HelloWindow.prototype = Object.create(Scene_MenuBase.prototype)
    Scene_HelloWindow.prototype.constructor = Scene_HelloWindow

    Scene_HelloWindow.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this)
    }

    Scene_HelloWindow.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this)
        this._indexWindow = new Window_HelloWindowIndex(0, 0)
        this._indexWindow.setHandler('cancel', this.popScene.bind(this))
        var wy = this._indexWindow.height
        var ww = Graphics.boxWidth
        var wh = Graphics.boxHeight - wy
        this.addWindow(this._indexWindow)
        // this.addWindow(this._statusWindow)
        // this._indexWindow.setStatusWindow(this._statusWindow)
    }

    function Window_HelloWindowIndex() {
        this.initialize.apply(this, arguments)
    }

    Window_HelloWindowIndex.prototype = Object.create(Window_Selectable.prototype)
    Window_HelloWindowIndex.prototype.constructor = Window_HelloWindowIndex

    Window_HelloWindowIndex.lastTopRow = 0
    Window_HelloWindowIndex.lastIndex = 0

    Window_HelloWindowIndex.prototype.initialize = function (x, y) {
        var width = Graphics.boxWidth
        var height = this.fittingHeight(6)
        Window_Selectable.prototype.initialize.call(this, x, y, width, height)
        this.refresh()
        this.setTopRow(Window_HelloWindowIndex.lastTopRow)
        this.select(Window_HelloWindowIndex.lastIndex)
        this.activate()
    }

    Window_HelloWindowIndex.prototype.maxCols = function () {
        return 3
    }

    Window_HelloWindowIndex.prototype.maxItems = function () {
        return this._list ? this._list.length : 0
    }

    Window_HelloWindowIndex.prototype.setStatusWindow = function (statusWindow) {
        this._statusWindow = statusWindow
        this.updateStatus()
    }

    Window_HelloWindowIndex.prototype.update = function () {
        Window_Selectable.prototype.update.call(this)
        // this.updateStatus()
    }

    Window_HelloWindowIndex.prototype.refresh = function () {
        this._list = []
        for (var i = 1; i < $dataEnemies.length; i++) {
            var enemy = $dataEnemies[i]
            if (enemy.name && enemy.meta.book !== 'no') {
                this._list.push(enemy)
            }
        }
        this.createContents()
        this.drawAllItems()
    }

    Window_HelloWindowIndex.prototype.drawItem = function (index) {
        var enemy = this._list[index]
        var rect = this.itemRectForText(index)
        this.drawText(enemy.name, rect.x, rect.y, rect.width)
    }

    Window_HelloWindowIndex.prototype.processCancel = function () {
        Window_Selectable.prototype.processCancel.call(this)
        Window_HelloWindowIndex.lastTopRow = this.topRow()
        Window_HelloWindowIndex.lastIndex = this.index()
    }

}())