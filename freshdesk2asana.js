/**
 * Freshdesk 2 Asana
 * Send ticket to a project in Asana.
 * @author Valentin Alexeev <valentin.alekseev@gmail.com>
 */

function a2l_createTask(workspace, project, name, notes, tags, comments) {
  asanaClient.workspaces.findAll().done(function (resp) {
    var wIds = resp.data.filter(function (e) {
      return jQuery.inArray(e.name, [workspace]) != -1;
    }).map(function (e) {
      return e.id;
    });
    if (wIds.length == 1) {
      a2l_createTaskFindProject(wIds[0], project, name, notes, tags, comments);
    }
  });
}
                                        
function a2l_createTaskFindProject(workspaceId, project, name, notes, tags, comments) {
  asanaClient.projects.findByWorkspace(workspaceId).done(function (resp) {
    var pIds = resp.data.filter(function (e) {
      return jQuery.inArray(e.name, [project]) != -1;
    }).map(function (e) {
      return e.id;
    });
    if (pIds.length == 1) {
      a2l_createTaskByIds(workspaceId, pIds[0], name, notes, tags, comments);
    }
  });
}

function a2l_createTaskByIds(workspaceId, projectId, name, notes, tags, comments) {
  // fetch requested tag IDs
  asanaClient.tags.findByWorkspace(workspaceId).done(function (resp) {
    var tagIds = resp.data.filter(function(e) {
      return jQuery.inArray(e.name, tags) != -1;
    }).map(function (e) {
      return e.id
    });
    a2l_createTaskWithTags(workspaceId, projectId, name, notes, tagIds, comments);
  });
}

function a2l_createTaskWithTags(workspaceId, projectId, name, notes, tagIds, comments) {
asanaClient.tasks.createInWorkspace(workspaceId,
                                 {
                                   name: name,
                                   notes: notes,
                                   projects: "" + projectId
                                 }).done(function (resp) {
    a2l_createTaskSetTags(resp.id, tagIds);
    a2l_createTaskAddComments(resp.id, comments);
  });
}

function a2l_createTaskSetTags(taskId, tagIds) {
  tagIds.each(function (e) {
  asanaClient.tasks.addTag(taskId, {tag: e});
  });
}

function a2l_createTaskAddComments(taskId, comments) {
  comments.each(function (e) {
  asanaClient.tasks.addComment(taskId, {text: e});
  });
}