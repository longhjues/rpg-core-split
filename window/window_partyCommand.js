
//-----------------------------------------------------------------------------
// Window_PartyCommand
//
// The window for selecting whether to fight or escape on the battle screen.
// 战斗界面选择人物行动之前的战斗或逃跑命令的窗口

function Window_PartyCommand() {
    this.initialize.apply(this, arguments);
}

Window_PartyCommand.prototype = Object.create(Window_Command.prototype);
Window_PartyCommand.prototype.constructor = Window_PartyCommand;

Window_PartyCommand.prototype.initialize = function () {
    var y = (Graphics.boxHeight - this.windowHeight()) / 2
    Window_Command.prototype.initialize.call(this, 0, y);
    this.openness = 0;
    this.deactivate();
};

Window_PartyCommand.prototype.windowWidth = function () {
    return Graphics.boxWidth
};

Window_PartyCommand.prototype.numVisibleRows = function () {
    return 2;
};

Window_PartyCommand.prototype.makeCommandList = function () {
    this.addCommand(TextManager.fight, 'fight');
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
};

Window_PartyCommand.prototype.setup = function () {
    this.clearCommandList();
    this.makeCommandList();
    this.refresh();
    this.select(0);
    this.activate();
    this.open();
};

Window_PartyCommand.prototype.itemTextAlign = function () {
    return 'center'
}
