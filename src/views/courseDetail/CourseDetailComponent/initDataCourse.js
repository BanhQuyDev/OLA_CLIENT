

// const initDataCourseSample={
//     // COURSE
//     courseData: {
//         courseName: "React Course",
//         startDate: (new Date()).toLocaleDateString(),
//         endDate: (new Date()).toLocaleDateString(),
//         coursePicture: "src/assets/imgs/react.png",
//         courseDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
//         courseLearningPath: ["module1","module2","module3","module4"]

//     },

//     // MODULE
//     modulesData: {
//         'module1': {
//             id: 'module1', 
//             moduleName: 'Javascript',
//             moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum",
//             modulePicture: "src/assets/imgs/khoahocpic.jpg",
//             teacherName: "John Doe",
//             unitList: ["unit1", "unit2","unit3","unit4"]
//         },
//         'module2': {
//             id: 'module2', 
//             moduleName: 'Python',
//             moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
//             modulePicture: "src/assets/imgs/khoahocpic.jpg",
//             teacherName: "John Doe",
//             unitList: ["unit1", "unit2","unit3","unit4"]
//         },
//         'module3': {
//             id: 'module3', 
//             moduleName: 'C++',
//             moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
//             modulePicture: "src/assets/imgs/khoahocpic.jpg",
//             teacherName: "John Doe",
//             unitList: ["unit1", "unit2","unit3","unit4"]
//         },
//         'module4': {
//             id: 'module4', 
//             moduleName: 'Cobol',
//             moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
//             modulePicture: "src/assets/imgs/khoahocpic.jpg",
//             teacherName: "John Doe",
//             unitList: ["unit1", "unit2","unit3","unit4"]
//         },
//     },

//     // UNIT
//     unitsData: {
//         'unit1': {
//             id: 'unit1', 
//             unitName: 'Basic Concept Of Javascript',
//             totalTime: "8h"
//         },
//         'unit2': {
//             id: 'unit2', 
//             unitName: 'Basic Syntax Of Javascript',
//             totalTime: "8h"
//         },
//         'unit3': {
//             id: 'unit3', 
//             unitName: 'Advanced Concept Of Javascript',
//             totalTime: "8h"
//         },
//         'unit4': {
//             id: 'unit4', 
//             unitName: 'Advanced Syntax Of Javascript',
//             totalTime: "8h"
//         },
//     }
// }



const initDataCourse={
    // COURSE
    courseData: {
        courseID : "1",
        courseName: "Advanced English Course",
        startDate: (new Date()).toLocaleDateString(),
        endDate: (new Date()).toLocaleDateString(),
        coursePicture: "src/assets/imgs/react.png",
        courseShortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
        courseDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum."    
    },

    // MODULE
    modulesData: [
        {
            id: 'module1', 
            moduleName: 'English 1',
            moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum",
            modulePicture: "src/assets/imgs/khoahocpic.jpg",
            teacherName: "John Doe",
        },
        {
            id: 'module2', 
            moduleName: 'English 2',
            moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
            modulePicture: "src/assets/imgs/khoahocpic.jpg",
            teacherName: "John Doe",
        },
        {
            id: 'module3', 
            moduleName: 'English 3',
            moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
            modulePicture: "src/assets/imgs/khoahocpic.jpg",
            teacherName: "John Doe",
        },
        {
            id: 'module4', 
            moduleName: 'English 4',
            moduleDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.",
            modulePicture: "src/assets/imgs/khoahocpic.jpg",
            teacherName: "John Doe",
        },
    ]
}


export default initDataCourse;