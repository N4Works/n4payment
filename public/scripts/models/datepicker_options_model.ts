"use strict";

class DatepickerOptionsModel {
    labelMonthNext:string = "Próximo mês";
    labelMonthPrev:string = "Mês anterior";

    labelMonthSelect:string = "Selecione um mês";
    labelYearSelect:string = "Selecione um ano";

    monthsFull:Array<string> = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ];
    monthsShort:Array<string> = [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez" ];
    weekdaysFull:Array<string> = [ "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado" ];
    weekdaysShort:Array<string> = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" ];
    showMonthsShort:boolean;
    showWeekdaysFull:boolean;

    weekdaysLetter:Array<string> = [ "D", "S", "T", "Q", "Q", "S", "S" ];

    today:string = "Hoje";
    clear:string = "Limpar";
    close:string = "Fechar";

    format:string = "dd/mm/yyyy";
    formatSubmit:string;
    hiddenPrefix:string;
    hiddenSuffix:string;
    hiddenName:string;

    editable:boolean;

    selectYears:number = 100;
    selectMonths:boolean = true;

    firstDay:number;

    min:Date|boolean;
    max:Date|boolean;

    disable:Array<Date>|Array<number>|{from:Date|boolean,to:Date|boolean};

    container:string;

    containerHidden:boolean;

    closeOnSelect:boolean = true;
    closeOnClear:boolean;

    onStart:Function;
    onRender:Function;
    onOpen:Function;
    onClose:Function;
    onSet:(context:any) => void;
    onStop:Function;
    constructor(datepickerOptionsData?:any) {
        angular.extend(this, datepickerOptionsData);
    }
}

angular.module("n4_payment")
.factory("DatepickerOptionsModel", () => DatepickerOptionsModel);
