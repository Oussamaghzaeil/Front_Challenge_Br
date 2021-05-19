import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {task} from '../../../core/Models/task.interface';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {MainServicesService} from '../../../core/services/main-services.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = ['taskname','username', 'deadline', 'detail', 'status', 'action'];
  dataSource = new MatTableDataSource<task>();
  taskForm: FormGroup;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('AddTask') AddTaskTemplate :TemplateRef<any>
  buttonLabel:String
  constructor(private formbuilder: FormBuilder, public dialog: MatDialog, private services: MainServicesService) {
  }

  ngOnInit(): void {
    this.services.getTask().subscribe(data => this.dataSource.data = data);
    this.taskForm = this.formbuilder.group(
      {
        TaskName: ['', Validators.required],
        Username: ['', Validators.required],
        Deadline: [''],
        Detail: [''],
        Status: [''],

      });
  }

  openDialog( task?:task) {
    if(task) {
      this.buttonLabel = 'Editar';
      this.taskForm.patchValue(task);
    }
    else {
      this.buttonLabel = 'Adicionar';
      this.taskForm.reset();
    }
    this.dialog.open(this.AddTaskTemplate);
  }

  addTask() {

    if (this.taskForm.invalid) {
      return;
    }
    let task = this.taskForm.getRawValue();
    this.services.addTask(task)
      .subscribe(
        data => {
          this.dataSource.data.unshift(task);
          this.dataSource._updateChangeSubscription()
          this.dialog.closeAll();
        });
  }

  deleteTask(taskId: number) {
    Swal.fire({
      text: 'Você quer deletar esta tarefa?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sim deletar`,
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.services.deleteTask(taskId.toString()).subscribe(() => {
          let index: number = this.dataSource.data.findIndex(d => d.id == taskId);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<task>(this.dataSource.data);
          this.dataSource.sort = this.sort;

        });
      }
    })


  }

  editTask() {
    if (this.taskForm.invalid) {
      return;
    }
    let task = this.taskForm.getRawValue();
    this.services.modifyTask(task)
      .subscribe(
        data => {
          let index: number = this.dataSource.data.findIndex(d => d.id == task.id);
          this.dataSource.data[index]=task
          this.dataSource._updateChangeSubscription()
          this.dialog.closeAll();
        });
  }
}
