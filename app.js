//1design data
const TODOLIST_APP = "TODOLIST_APP";//tạo tên hằng số để dùng chung(key)
let data = [
    {
        task: 'Run 2km',
        is_complete: true
    }
]
//2.save data()
//input: data

const saveData = (data) => {
    localStorage.setItem(TODOLIST_APP, JSON.stringify(data));
}
// saveData(data);

//3.loaddata
//output: array
const loadData = () => {
    let data = JSON.parse(localStorage.getItem(TODOLIST_APP));
    data = data ? data : [];//nếu ko có dl trong data thì trả về 1 mảng rỗng, nếu ko làm vậy thì nó sẽ trả về giá trị null
    return data;
}
// data =loadData();
// console.log(data);

//4. add Task
const addTask = (new_task) => {
    let data;
    data = loadData();
    //data.push(new_task)
    data = [...data, new_task]; //thêm data vào truowecs và thêm task mới vào sau
    saveData(data);//và lại lưu data vào localstorage
}
//ở phần 4 này sẽ đưa  form xuống dưới   cùng để xử lý cùng edit

//tạo hàm createTaskItem(); để đưa vào hàm render cho gọn
const createTaskItem = (task, is_complete, index) => {
    return `
    <li class="task-item" index = ${index} is-complete=${is_complete}>
    <span class='task' onclick="markTaskComplete(${index})">${task}</span> 
        <div class="task-action" >
            <button onclick="pushEditTask(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>

            </button>
            <button onclick="deleteTask(this,${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
          
            </button>
        </div>
    </li>
    `;
}
//6. xuất ra html renderTasks()
const renderTasks = () => {
    let data, ulTasksHtml, ulTasks,task_result,count_complete;
    task_result=document.querySelector('.task-result') //lấy để đếm số cv
    ulTasks = document.querySelector('ul.tasks');
    data = loadData();
    // console.log(data);
    count_complete=0; //cho ban đầu đếm =0;
    ulTasksHtml = data.map((element, index) => { //element là các ptu trong data, index là các key của data
        if(element.is_complete == true) count_complete ++; //nếu công việc hoant hành thì đếm xem bao nhiêu
        return createTaskItem(element.task,element.is_complete,index);

    })
    task_result.textContent =  count_complete>0?`Yeah ${count_complete} tasks completed by Nghĩa!`:`No tasks completed by Nghĩa!`;
    ulTasks.innerHTML = ulTasksHtml.join('');


}//và gán hàm render này vào addtassk phía trên để khỉ add thì chạy ra html

//8.đánh dấu công việc hoàn thành
const markTaskComplete =(index)=>{
    let data;
    data=loadData();//loaddata từ localsto lên để làm việc
    data[index].is_complete  =  data[index].is_complete ==  true ? false:true;
    
    saveData(data);
    // console.log(data[index]);
    renderTasks(); 
}

//9.xóa công việc deleteTask
const deleteTask = (element,index)=>{
    // console.log(element);
    let data;
    let confirm_delete = confirm('Bạn có chắc chắn xóa công việc này không?');
    // console.log(confirm_delete);
    if(confirm_delete == false) return false; //nếu bằng chưa click thì cứ false, còn click thì thực thiện chương trình bên dưới
    data =loadData();
    data.splice(index,1) // xóa key bao nhiêu là index, và 1 là xóa chỉ mình nó, xóa 1 phần tử
    // console.log(data);
    saveData(data);

    //có 2 cách để render ra htmnl mới
    element.closest('.task-item').remove(); //c1; chỉ xóa ptu cần xóa, closest là tìm đến thằng cha và xóa nó, ở đây là li
    //renderTasks(); //cách 2, load lại cả trang
}

//10.edit task

//tạo hàm push để đẩy  giá trị cần edit len input
const pushEditTask = (index) =>{
    // console.log(index);
   const task = document.querySelector('#task');  //để gọi value của input lên để edit
   const btn = document.querySelector('#add_task button');//gọi button ra để thay add task tahnhf edit task
    let data;
    data = loadData();
    task.value=data[index].task;//gọi giá trị cảu task lên và đẩy lên input
    task.setAttribute('index',index);//gọi thawngf  index(key)  của thằng cần edit đưa lên inputđể edit
    btn.innerText="EDIT TASK";
    // console.log(btn);
}

//phần lưu khi đá edit
const editTask =(task,index) =>{
    const btn = document.querySelector('#add_task button');//gọi button ra để thay edit task tahnhf add task khi edit ok
    let data =loadData();
    data[index].task=task;//cập nhật tên cong việc ở index thành task mới
    saveData(data);
    btn.innerText="ADD TASK";
}

// const formAddTask = document.querySelector('#add_task');

const formAddTask = document.forms.add_task;
formAddTask.addEventListener('submit', (e) => {
    // console.log('submit');
    let new_task;
    const task = document.querySelector('#task'); //để lấy giá trị nhập trong input ra
    const index=task.getAttribute('index');//lấy index trong task ra đểlàm
    // console.log(index);
    //edit
    if(index){
      
            editTask(task.value,index) //task.value là giá trị mới người dùng nhập lại và index để cập nhật
            task.removeAttribute('index'); //xóa chỉ số index (key)  trên inputkhi đã edit xonmg
    }else{
        //add  task
        new_task = {
            task: task.value,
            is_complete: false  //khi mới thêm công việc vào thì chó nó là trạng thái chưa hoàn thành
        }
        // console.log(loadData());
        addTask(new_task);
    }
    
    renderTasks();
    task.value = ''; //khi đã thêm giá trị input rồi thì trả về input chuỗi ban đầu
    // console.log(loadData());
    e.preventDefault();
})
// console.log(formAddTask);

//tạo sự kiện khi nguoi  dùng lỡ bấm edit mà muốn quay addtask thì ta tạo  sự kiện  nhấn phím esc để quay lại
document.addEventListener('keyup',(e)=>{
   // console.log(e.which); //sự kiện keyup để nhấn phím từ bàn phím, và e.which để biết mà ascii của các ký tự mình ấn trên bàn phím
    if(e.which == 27){ //muốn dùng esc thì mã ascii của nó là 27
        task.value=''; //cho input trở lại mảng rỗng khi add
        task.removeAttribute('index'); //xóa index ở iput form khi đã esc quay lại add
        const btn = document.querySelector('#add_task button');
        btn.innerText="ADD TASK"; // và chuyển btn qua add
    }
})
renderTasks(); 
