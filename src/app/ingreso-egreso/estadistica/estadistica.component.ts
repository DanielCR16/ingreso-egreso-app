import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from 'src/app/store/reducers/app.reducer';


import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {
  ingresos:number=0;
  egresos:number=0;
  totalEgresos:number=0;
  totalIngresos:number=0;
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
     datalabels: {
       formatter: (value: any, ctx: any) => {
         if (ctx.chart.data.labels) {
           return ctx.chart.data.labels[ctx.dataIndex];
         }
       },
     },
    },
  };
  public pieChartPlugins = [DatalabelsPlugin];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Ingreso'], ['Egreso']],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
constructor(private store:Store<AppState>){

}
  ngOnInit(): void {
   this.store.select('ingreso_egreso').subscribe(({items})=>this.generarEstadistica(items))
  }
  generarEstadistica(items:IngresoEgreso[]){
    this.totalEgresos=0;
    this.totalIngresos=0;
    this.egresos=0;
    this.ingresos=0;
    for (const item of items) {
      if(item.tipo==="ingreso"){
        this.totalIngresos+=item.monto;
        this.ingresos ++;
      }else{
        this.totalEgresos+=item.monto;
        this.egresos ++;
      }
    }
    this.pieChartData.datasets[0].data=[this.totalIngresos,this.totalEgresos]
  }
}
