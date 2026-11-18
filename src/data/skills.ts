export type SkillCellData = {
  id: string;
  code: string[];
  output: string[];
};

export const skillCells: SkillCellData[] = [
  {
    id: "languages",
    code: [
      'languages = [  # ordered by proficiency',
      '    "JavaScript", "TypeScript", "Python",',
      '    "HTML/CSS", "SQL (MySQL)", "NoSQL",',
      '    "PHP", "Java", "C#", "C++",',
      ']',
      ' ',
      'print(languages[:3])',
    ],
    output: ["['JavaScript', 'TypeScript', 'Python']"],
  },
  {
    id: "web",
    code: ["!npm install react express tailwindcss", "!npx shadcn@latest init"],
    output: ["+ react", "+ express", "+ tailwindcss", "+ shadcn/ui", "done: 4 skills added"],
  },
  {
    id: "tools",
    code: ["!winget install OpenJS.NodeJS Git.Git Figma.Figma"],
    output: ["+ Node.js", "+ Git", "+ Figma", "done: 3 tools added"],
  },
  {
    id: "data",
    code: ["!pip install torch pandas numpy"],
    output: ["+ torch (PyTorch)", "+ pandas", "+ numpy", "done: 3 skills added"],
  },
];