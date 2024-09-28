import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from '../../../products/services/product.service';
import {ModalService} from '../../../shared/services/modal.service';
import {Router} from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'Đợi xử lý'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'Đợi xử lý'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Đợi xử lý'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Đợi xử lý'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'Đợi xử lý'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'Đợi xử lý'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'Đợi xử lý'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'Đợi xử lý'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'Đợi xử lý'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Đợi xử lý'}
];

@Component({
  selector: 'graceful-florist-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  dailyChartOptions: any;
  monthlyChartOptions: any;

  constructor(
    private readonly router: Router,
    private readonly modalService: ModalService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initDailyChartOptions();
    this.initMonthlyChartOptions();
  }

  // eslint-disable-next-line max-lines-per-function
  initDailyChartOptions(): void {
    this.dailyChartOptions = {
      series: [
        {
          name: 'Daily Sales',
          data: this.generateDailyData()
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      xaxis: {
        categories: Array.from({length: 31}, (_, i) => i + 1),
        title: {
          text: 'Ngày trong tháng'
        }
      },
      yaxis: {
        title: {
          text: 'Doanh số (₫)'
        }
      },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        x: {
          show: true
        },
        y: {
          formatter(value: number): string {
            return `$${value.toFixed(2)}`;
          }
        }
      },
      colors: ['#FF6F91'],
      stroke: {
        curve: 'smooth',
        width: 2
      }
    };
  }

  // eslint-disable-next-line max-lines-per-function
  initMonthlyChartOptions(): void {
    this.monthlyChartOptions = {
      series: [
        {
          name: 'Monthly Total Sales',
          data: this.generateMonthlyData()
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        fontFamily: 'Nunito, sans-serif',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        title: {
          text: 'Tháng'
        }
      },
      yaxis: {
        title: {
          text: 'Tổng doanh số (₫)'
        }
      },
      tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        x: {
          show: true
        },
        y: {
          formatter(value: number): string {
            return `$${value.toFixed(2)}`;
          }
        }
      },
      colors: ['#FF6F91'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      legend: {
        show: true,
        position: 'top'
      }
    };
  }

  generateDailyData(): number[] {
    return Array.from(
      {length: 31},
      () => Math.floor(Math.random() * 1000) + 100
    );
  }

  generateMonthlyData(): number[] {
    return Array.from(
      {length: 12},
      () => Math.floor(Math.random() * 50000) + 10000
    );
  }
}
