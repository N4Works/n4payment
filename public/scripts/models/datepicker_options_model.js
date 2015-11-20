"use strict";
var DatepickerOptionsModel = (function () {
    function DatepickerOptionsModel(datepickerOptionsData) {
        this.labelMonthNext = "Próximo mês";
        this.labelMonthPrev = "Mês anterior";
        this.labelMonthSelect = "Selecione um mês";
        this.labelYearSelect = "Selecione um ano";
        this.monthsFull = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        this.monthsShort = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        this.weekdaysFull = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        this.weekdaysShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        this.weekdaysLetter = ["D", "S", "T", "Q", "Q", "S", "S"];
        this.today = "Hoje";
        this.clear = "Limpar";
        this.close = "Fechar";
        this.format = "dd/mm/yyyy";
        this.selectYears = 100;
        this.selectMonths = true;
        this.closeOnSelect = true;
        angular.extend(this, datepickerOptionsData);
    }
    return DatepickerOptionsModel;
})();
angular.module("n4_payment")
    .factory("DatepickerOptionsModel", function () { return DatepickerOptionsModel; });
