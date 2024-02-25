interface ChecklistItem {
  checklistItem: string;
  isDone: boolean;
  _id: string;
}

interface Attachment {
  link: string;
  displayText: string;
  _id: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  checklists: ChecklistItem[];
  attachments: Attachment[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TaskDataResponse {
  resultMessage: {
    en: string;
  };
  resultCode: string;
  data: {
    tasks: Task[];
  };
}

export const dummyData: TaskDataResponse = {
  resultMessage: {
    en: "The task has gotten successfully.",
  },
  resultCode: "00108",
  data: {
    tasks: [
      {
        _id: "65d8a84a2abcc90a4c67b542",
        title: "Test Title",
        description: "Test Description",
        tags: ["test 1", "test 2"],
        dueDate: "2022-03-01T00:00:00.000Z",
        checklists: [
          {
            checklistItem: "test checklist",
            isDone: false,
            _id: "65d8a84a2abcc90a4c67b543",
          },
        ],
        attachments: [
          {
            link: "https://google.com",
            displayText: "google",
            _id: "65d8a84a2abcc90a4c67b544",
          },
        ],
        status: "",
        createdAt: "2024-02-23T14:14:34.650Z",
        updatedAt: "2024-02-23T14:14:34.650Z",
        __v: 0,
      },
      {
        _id: "65d8a84a2abcc90a4c67b542",
        title: "Bangg",
        description: "Test Description",
        tags: ["test 1", "test 2"],
        dueDate: "2022-03-01T00:00:00.000Z",
        checklists: [
          {
            checklistItem: "test checklist",
            isDone: false,
            _id: "65d8a84a2abcc90a4c67b543",
          },
        ],
        attachments: [
          {
            link: "https://google.com",
            displayText: "google",
            _id: "65d8a84a2abcc90a4c67b544",
          },
        ],
        status: "To Do",
        createdAt: "2024-02-23T14:14:34.650Z",
        updatedAt: "2024-02-23T14:14:34.650Z",
        __v: 0,
      },
      {
        _id: "65d8a84a2abcc90a4c67b542",
        title: "Uhuy",
        description: "Test Description",
        tags: ["test 1", "test 2"],
        dueDate: "2022-03-01T00:00:00.000Z",
        checklists: [
          {
            checklistItem: "test checklist",
            isDone: false,
            _id: "65d8a84a2abcc90a4c67b543",
          },
        ],
        attachments: [
          {
            link: "https://google.com",
            displayText: "google",
            _id: "65d8a84a2abcc90a4c67b544",
          },
        ],
        status: "In Progress",
        createdAt: "2024-02-23T14:14:34.650Z",
        updatedAt: "2024-02-23T14:14:34.650Z",
        __v: 0,
      },
      {
        _id: "65d8a84a2abcc90a4c67b542",
        title: "Gacor Kang",
        description: "Test Description",
        tags: ["test 1", "test 2"],
        dueDate: "2022-03-01T00:00:00.000Z",
        checklists: [
          {
            checklistItem: "test checklist",
            isDone: false,
            _id: "65d8a84a2abcc90a4c67b543",
          },
        ],
        attachments: [
          {
            link: "https://google.com",
            displayText: "google",
            _id: "65d8a84a2abcc90a4c67b544",
          },
        ],
        status: "Done",
        createdAt: "2024-02-23T14:14:34.650Z",
        updatedAt: "2024-02-23T14:14:34.650Z",
        __v: 0,
      },
      {
        _id: "65d8a84a2abcc90a4c67b542",
        title: "Reyy",
        description: "Test Description",
        tags: ["test 1", "test 2"],
        dueDate: "2022-03-01T00:00:00.000Z",
        checklists: [
          {
            checklistItem: "test checklist",
            isDone: false,
            _id: "65d8a84a2abcc90a4c67b543",
          },
        ],
        attachments: [
          {
            link: "https://google.com",
            displayText: "google",
            _id: "65d8a84a2abcc90a4c67b544",
          },
        ],
        status: "In Progress",
        createdAt: "2024-02-23T14:14:34.650Z",
        updatedAt: "2024-02-23T14:14:34.650Z",
        __v: 0,
      },
    ],
  },
};
