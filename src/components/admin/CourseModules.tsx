import React, { useState } from "react";

interface ModuleType {
  id?: number;
  title: string;
  description: string;
  order: number;
  topics: TopicType[];
}

interface TopicType {
  id?: number;
  title: string;
  description: string;
  order: number;
  duration: number;
}

interface CourseModulesProps {
  courseData: any;
  setCourseData: React.Dispatch<React.SetStateAction<any>>;
}

const CourseModules: React.FC<CourseModulesProps> = ({ courseData, setCourseData }) => {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const toggleModuleExpansion = (index: number) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter((i) => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  const handleAddModule = () => {
    const newModule: ModuleType = {
      title: "",
      description: "",
      order: courseData.modules.length + 1,
      topics: [],
    };
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, newModule],
    });
    // Automatically expand the new module
    setExpandedModules([...expandedModules, courseData.modules.length]);
  };

  const handleRemoveModule = (index: number) => {
    if (!window.confirm("Are you sure you want to remove this module?")) return;

    const updatedModules = [...courseData.modules];
    updatedModules.splice(index, 1);
    
    // Reorder remaining modules
    updatedModules.forEach((module, idx) => {
      module.order = idx + 1;
    });
    
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
    
    // Update expanded modules array
    setExpandedModules(expandedModules.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const handleModuleChange = (index: number, field: string, value: string) => {
    const updatedModules = [...courseData.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value,
    };
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
  };

  const handleAddTopic = (moduleIndex: number) => {
    const updatedModules = [...courseData.modules];
    const newTopic: TopicType = {
      title: "",
      description: "",
      order: updatedModules[moduleIndex].topics.length + 1,
      duration: 0,
    };
    updatedModules[moduleIndex].topics = [...updatedModules[moduleIndex].topics, newTopic];
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
  };

  const handleRemoveTopic = (moduleIndex: number, topicIndex: number) => {
    if (!window.confirm("Are you sure you want to remove this topic?")) return;

    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].topics.splice(topicIndex, 1);
    
    // Reorder remaining topics
    updatedModules[moduleIndex].topics.forEach((topic, idx) => {
      topic.order = idx + 1;
    });
    
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
  };

  const handleTopicChange = (moduleIndex: number, topicIndex: number, field: string, value: string | number) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].topics[topicIndex] = {
      ...updatedModules[moduleIndex].topics[topicIndex],
      [field]: field === "duration" ? Number(value) : value,
    };
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
  };

  const moveModule = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === courseData.modules.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updatedModules = [...courseData.modules];
    
    // Swap modules
    [updatedModules[index], updatedModules[newIndex]] = [updatedModules[newIndex], updatedModules[index]];
    
    // Update order
    updatedModules.forEach((module, idx) => {
      module.order = idx + 1;
    });
    
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
    
    // Update expanded modules indices
    if (expandedModules.includes(index) && !expandedModules.includes(newIndex)) {
      setExpandedModules(
        expandedModules.map(i => i === index ? newIndex : (i === newIndex ? index : i))
      );
    }
  };

  const moveTopic = (moduleIndex: number, topicIndex: number, direction: "up" | "down") => {
    const topics = courseData.modules[moduleIndex].topics;
    if (
      (direction === "up" && topicIndex === 0) ||
      (direction === "down" && topicIndex === topics.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? topicIndex - 1 : topicIndex + 1;
    const updatedModules = [...courseData.modules];
    
    // Swap topics
    [updatedModules[moduleIndex].topics[topicIndex], updatedModules[moduleIndex].topics[newIndex]] = 
      [updatedModules[moduleIndex].topics[newIndex], updatedModules[moduleIndex].topics[topicIndex]];
    
    // Update order
    updatedModules[moduleIndex].topics.forEach((topic, idx) => {
      topic.order = idx + 1;
    });
    
    setCourseData({
      ...courseData,
      modules: updatedModules,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Course Modules</h3>
            <p className="mt-1 text-sm text-gray-500">
              Organize your course content into modules and topics.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="space-y-4">
              {courseData.modules.length === 0 ? (
                <div className="text-center py-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No modules added yet.</p>
                </div>
              ) : (
                courseData.modules.map((module: ModuleType, moduleIndex: number) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => toggleModuleExpansion(moduleIndex)}
                          className="mr-2 text-gray-500 focus:outline-none"
                        >
                          <svg
                            className={`h-5 w-5 transform ${expandedModules.includes(moduleIndex) ? "rotate-90" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <span className="text-sm font-medium text-gray-900">
                          Module {module.order}: {module.title || "(Untitled Module)"}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => moveModule(moduleIndex, "up")}
                          disabled={moduleIndex === 0}
                          className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveModule(moduleIndex, "down")}
                          disabled={moduleIndex === courseData.modules.length - 1}
                          className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(moduleIndex)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {expandedModules.includes(moduleIndex) && (
                      <div className="p-4 bg-white">
                        <div className="space-y-4">
                          <div>
                            <label htmlFor={`module-${moduleIndex}-title`} className="block text-sm font-medium text-gray-700">
                              Module Title*
                            </label>
                            <input
                              type="text"
                              id={`module-${moduleIndex}-title`}
                              value={module.title}
                              onChange={(e) => handleModuleChange(moduleIndex, "title", e.target.value)}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter module title"
                              required
                            />
                          </div>

                          <div>
                            <label htmlFor={`module-${moduleIndex}-description`} className="block text-sm font-medium text-gray-700">
                              Module Description
                            </label>
                            <textarea
                              id={`module-${moduleIndex}-description`}
                              value={module.description}
                              onChange={(e) => handleModuleChange(moduleIndex, "description", e.target.value)}
                              rows={3}
                              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter module description"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium text-gray-700">Topics</h4>
                              <button
                                type="button"
                                onClick={() => handleAddTopic(moduleIndex)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Add Topic
                              </button>
                            </div>

                            {module.topics.length === 0 ? (
                              <div className="text-center py-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-500">No topics added yet.</p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {module.topics.map((topic: TopicType, topicIndex: number) => (
                                  <div key={topicIndex} className="border border-gray-200 rounded-md p-3">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="text-xs font-medium text-gray-500">
                                        Topic {topic.order}
                                      </span>
                                      <div className="flex space-x-2">
                                        <button
                                          type="button"
                                          onClick={() => moveTopic(moduleIndex, topicIndex, "up")}
                                          disabled={topicIndex === 0}
                                          className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                                        >
                                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => moveTopic(moduleIndex, topicIndex, "down")}
                                          disabled={topicIndex === module.topics.length - 1}
                                          className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                                        >
                                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveTopic(moduleIndex, topicIndex)}
                                          className="text-red-500 hover:text-red-700 focus:outline-none"
                                        >
                                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                      <div>
                                        <label
                                          htmlFor={`topic-${moduleIndex}-${topicIndex}-title`}
                                          className="block text-xs font-medium text-gray-700"
                                        >
                                          Topic Title*
                                        </label>
                                        <input
                                          type="text"
                                          id={`topic-${moduleIndex}-${topicIndex}-title`}
                                          value={topic.title}
                                          onChange={(e) =>
                                            handleTopicChange(moduleIndex, topicIndex, "title", e.target.value)
                                          }
                                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-gray-300 rounded-md"
                                          placeholder="Enter topic title"
                                          required
                                        />
                                      </div>

                                      <div>
                                        <label
                                          htmlFor={`topic-${moduleIndex}-${topicIndex}-description`}
                                          className="block text-xs font-medium text-gray-700"
                                        >
                                          Topic Description
                                        </label>
                                        <textarea
                                          id={`topic-${moduleIndex}-${topicIndex}-description`}
                                          value={topic.description}
                                          onChange={(e) =>
                                            handleTopicChange(moduleIndex, topicIndex, "description", e.target.value)
                                          }
                                          rows={2}
                                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-gray-300 rounded-md"
                                          placeholder="Enter topic description"
                                        />
                                      </div>

                                      <div>
                                        <label
                                          htmlFor={`topic-${moduleIndex}-${topicIndex}-duration`}
                                          className="block text-xs font-medium text-gray-700"
                                        >
                                          Duration (minutes)
                                        </label>
                                        <input
                                          type="number"
                                          id={`topic-${moduleIndex}-${topicIndex}-duration`}
                                          value={topic.duration}
                                          onChange={(e) =>
                                            handleTopicChange(moduleIndex, topicIndex, "duration", e.target.value)
                                          }
                                          min="0"
                                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-xs border-gray-300 rounded-md"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddModule}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Module
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModules;
