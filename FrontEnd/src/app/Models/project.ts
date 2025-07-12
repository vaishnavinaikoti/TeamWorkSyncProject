export interface ProjectModel {
    project_name:string;
    project_description:string;
    project_manager:string;
    total_story_points:Number;
    completed_story_points:Number;
    project_status:string;
    start_date:string;
    end_date:string;
    _id?:string;
}
