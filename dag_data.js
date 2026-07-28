// Auto-generated from /docs/DAGS/graph_data.json
window.GRAPH_DATA = {
  "nodes": [
    {
      "id": "appinsight_daily",
      "schedule": "0 0 * * *",
      "owner": "Shan",
      "file": "appinsight/dags_appinsight_daily.py",
      "layer": "ingest",
      "sources": [
        "Azure App Insights API (Companion-prod, Display-Web, entity-insight-prod, mvbF, mvbx, myviewboard.com, myviewboard.com-v2-prod, originals-web, manager-service-prod)"
      ],
      "destinations": [
        "S3: appinsight/raw/{app}/customEvents/",
        "Redshift: log.insight_event_log"
      ],
      "flow": "[Azure App Insights API] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "azure_app_insights"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "dbrix_appinsight_to_s3",
      "schedule": "0 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "appinsight/dags_databricks.py",
      "layer": "ingest",
      "sources": [
        "Azure Blob (AppInsight Continuous Export) — 13 apps"
      ],
      "destinations": [
        "S3: appinsight/raw/{app}/customEvents/ (parquet)"
      ],
      "flow": "[Azure Blob] --> [Databricks] --> [S3 Raw]",
      "source_resources": [
        "azure_app_insights"
      ],
      "dest_resources": [
        "s3"
      ]
    },
    {
      "id": "emr_v2",
      "schedule": "0 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "emr/dags_emr_v2.py",
      "layer": "compute",
      "sources": [
        "S3: appinsight/raw/{app}/customEvents/ (13 apps)",
        "EDLA RDS PG (myviewboard-dm-log)"
      ],
      "destinations": [
        "Redshift: ifp.ifp_viewboard_ux_agg, ifp.launcher3_agg, teamwork_prod.teamwork_prod_event, airsync.airsync_sender_event, airsync.airsync_receiver_event, edla.device_session_duration",
        "S3 Processed (parquet)"
      ],
      "flow": "[S3 Raw] --> [EMR PySpark] --> [S3 Processed] --> [Redshift COPY]",
      "source_resources": [
        "s3",
        "pg_edla"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "event_session_instance",
      "schedule": "15 1 * * *",
      "owner": "Vance",
      "file": "appinsight/dags_event_session_instance.py",
      "layer": "session",
      "sources": [
        "S3 (appinsight raw mvbx)",
        "S3 (emr_v2 filtered mvbA, mvbW-prod)"
      ],
      "destinations": [
        "Redshift: appinsight.operation_session_windows/android/flutter, appinsight.device_session_duration, appinsight.operation_event_windows_two_year_lower"
      ],
      "flow": "[S3] --> [EC2 Python session cut] --> [Redshift]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "event_session_instance_v3",
      "schedule": "15 1 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/event_session_instance_v3/dags_event_session_instance_v3.py",
      "layer": "session",
      "sources": [
        "S3 (emr_v2 filtered mvbA-v3-prod, mvbW-v3-prod, mvbF-v3-prod)"
      ],
      "destinations": [
        "Redshift: appinsight.operation_session_windows_v3/android_v3/flutter_v3"
      ],
      "flow": "[S3] --> [EC2 Python session cut] --> [Redshift]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "event_session_classroom_whiteboard",
      "schedule": "15 0 * * *",
      "owner": "Shan",
      "file": "appinsight/dags_event_session_classroom_whiteboard.py",
      "layer": "session",
      "sources": [
        "S3 (appinsight raw mvbx)"
      ],
      "destinations": [
        "Redshift: appinsight.operation_session_classroom, appinsight.operation_session_whiteboard"
      ],
      "flow": "[S3] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "event_session_companion",
      "schedule": "15 0 * * *",
      "owner": "Shan",
      "file": "appinsight/dags_event_session_companion.py",
      "layer": "session",
      "sources": [
        "S3 (appinsight raw mvbx / Companion-prod)"
      ],
      "destinations": [
        "Redshift: datamart_companion.companion_session_*"
      ],
      "flow": "[S3] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "original_content",
      "schedule": "15 1 * * *",
      "owner": "Shan",
      "file": "appinsight/dags_original_content.py",
      "layer": "session",
      "sources": [
        "S3 (appinsight raw)",
        "S3 (emr_v2 filtered mvbA, mvbW-prod)",
        "Product PG (OC metadata)"
      ],
      "destinations": [
        "Redshift: datamart_oc.oc_windows/android/flutter/classroom/whiteboard/games/resources"
      ],
      "flow": "[S3 + PG] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "s3",
        "pg_product"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "entity_insight_prod_to_insight_event_log",
      "schedule": "15 0 * * *",
      "owner": "Jackie",
      "file": "appinsight/dags_insight_event_log.py",
      "layer": "session",
      "sources": [
        "S3 (appinsight raw entity-insight-prod)"
      ],
      "destinations": [
        "Redshift: log.insight_event_log, insight.insight_event_count_all_time_v"
      ],
      "flow": "[S3] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "myviewboard_com",
      "schedule": "15 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/myviewboard_com/dags_myviewboard_com.py",
      "layer": "session",
      "sources": [
        "S3 (appinsight raw myviewboard.com, myviewboard.com-v2-prod)"
      ],
      "destinations": [
        "Redshift: mvbcom.myviewboard_com_tiles_click, mvbcom.myviewboard_com_2"
      ],
      "flow": "[S3] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "device_relation",
      "schedule": "15 0 * * *",
      "owner": "Shan",
      "file": "device_manager/dags_device.py",
      "layer": "ingest",
      "sources": [
        "Device Manager PG (myviewboard-dm): device_info_raw, usage_log, device_mac, app_action_log, broadcast_type, launch_country_log",
        "S3 (appinsight raw)"
      ],
      "destinations": [
        "Redshift: device_manager.app_action_log, api_request_log, function_type, broadcast_size, usage_log, launch_country_log, device_mac, broadcast"
      ],
      "flow": "[PG + S3] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_dm",
        "s3"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "instance_relation",
      "schedule": "15 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "instance/dags_instance.py",
      "layer": "ingest",
      "sources": [
        "Product PG (myviewboard-product): instance_info, instance_info_modify_log, login_log, instance_entity_account"
      ],
      "destinations": [
        "Redshift: instance.instance_entity_account, instance.instance_info_modify_log, instance.instance_registered_fixed"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "instance_android_launcher_device_entity",
      "schedule": "0 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "instance_android_launcher_device_entity/dags_instance_android_launcher_device.py",
      "layer": "ingest",
      "sources": [
        "Product PG (myviewboard-product): application.register_app, application.extend_app",
        "Device Manager PG (myviewboard-dm): public.device_mac"
      ],
      "destinations": [
        "Redshift: instance.instance_android_launcher_device_entity"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product",
        "pg_dm"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "entity_account",
      "schedule": "0 0 * * *",
      "owner": "Shan",
      "file": "entity/dags_entity_account.py",
      "layer": "ingest",
      "sources": [
        "Product PG (myviewboard-product): event_entity_log, entity_profile, entity_profile_location, account, account_deleted, login_log"
      ],
      "destinations": [
        "Redshift: entity.event_entity_log_all, entity.account_deleted, entity.account_fixed, users.account_login_count"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "account_related",
      "schedule": "0 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "users/dags_account_related.py",
      "layer": "ingest",
      "sources": [
        "Product PG (myviewboard-product): user_account_role, account_questionnaire, login, survey"
      ],
      "destinations": [
        "Redshift: users.account_role, users.user_login, log.insight_survey"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "viewsonic_migration",
      "schedule": "0 0 * * *",
      "owner": "vance",
      "file": "dags/viewsonic_migration/dags_viewsonic_migration.py",
      "layer": "ingest",
      "sources": [
        "S3: vs-account-export bucket (VS Account PG dump)"
      ],
      "destinations": [
        "Redshift: vs_account.*, vs_entity.*, public.eventdb_entity_log_all"
      ],
      "flow": "[S3 dump] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "subscription",
      "schedule": "0 0 * * *",
      "owner": "Shan",
      "file": "subscription/dags_subscription.py",
      "layer": "ingest",
      "sources": [
        "Product PG (myviewboard-product): entity_subscription, service_instance, user_subscription, feature_label_list"
      ],
      "destinations": [
        "Redshift: subscription.entity_subscription, subscription.service_instance, subscription.user_subscription, subscription.feature_label_list"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "teamwork",
      "schedule": "15 1 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/teamwork/dags_teamwork.py",
      "layer": "session",
      "sources": [
        "Teamwork PG (postgres_prod_teamwork): board, project, team, event, mvb_id_relation, subscription_log, board_log, team_log, *_collaborator",
        "S3 (emr_v2 teamwork_prod preprocess)"
      ],
      "destinations": [
        "Redshift: teamwork_prod.teamwork_prod_event, board, project, team, mvb_id_relation, board_log, subscription_log, team_log, subscription_users, subscription_collaborator, team_collaborator, project_collaborator, board_collaborator"
      ],
      "flow": "[PG + S3] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_teamwork",
        "s3"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "salesforce",
      "schedule": "0 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/salesforce/dags_salesforce.py",
      "layer": "ingest",
      "sources": [
        "S3 (Salesforce raw, external process)"
      ],
      "destinations": [
        "Redshift: salesforce.entity_sales_relation"
      ],
      "flow": "[S3] --> [Redshift COPY]",
      "source_resources": [
        "salesforce",
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "oracle_ifp",
      "schedule": "0 0 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/ifp/dags_oracle_ifp.py",
      "layer": "ingest",
      "sources": [
        "S3 (Oracle IFP sales, external process)"
      ],
      "destinations": [
        "Redshift: oracle.ifp_qty_extend"
      ],
      "flow": "[S3] --> [Redshift COPY]",
      "source_resources": [
        "oracle_ifp_src",
        "s3"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "email_campaign",
      "schedule": "45 2 * * *",
      "owner": "Arthur",
      "file": "dags/email_compaign/dags_email_campaign.py",
      "layer": "ingest",
      "sources": [
        "Email Service PG",
        "DynamoDB",
        "Redshift"
      ],
      "destinations": [
        "Redshift: email_campaign.action, template, target_user_list, click_event_url"
      ],
      "flow": "[PG + DDB + RS] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_email",
        "dynamodb",
        "redshift"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "email_alert_list",
      "schedule": "30 3 * * *",
      "owner": "vance",
      "file": "email_alert/dags_email_alert_list.py",
      "layer": "app",
      "sources": [
        "Redshift (savvy snapshots from entity_insight_migration)"
      ],
      "destinations": [
        "Savvy PG: savvy.alert_list_user_login, savvy.alert_list_device_turn_on"
      ],
      "flow": "[Redshift] --> [EC2 Python] --> [Savvy PG]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "savvy_pg"
      ]
    },
    {
      "id": "email_alert_condition",
      "schedule": "30 0 * * *",
      "owner": "vance",
      "file": "email_alert/dags_email_alert_condition.py",
      "layer": "app",
      "sources": [
        "Redshift (entity_insight tables)"
      ],
      "destinations": [
        "Redshift: email_alert.alert_condition_user_login, email_alert.alert_condition_device_turn_on"
      ],
      "flow": "[Redshift] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "email_log",
      "schedule": "0 2 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/email_log/dags_system_email_log.py",
      "layer": "ingest",
      "sources": [
        "Product PG (myviewboard-product): system_email_log.account_log, email_info"
      ],
      "destinations": [
        "Redshift: email_log.account_log, email_log.email_info"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "community",
      "schedule": "0 0 * * *",
      "owner": "vance",
      "file": "community/dags_community.py",
      "layer": "ingest",
      "sources": [
        "Bettermode GraphQL API (members, spaces, posts, badges)"
      ],
      "destinations": [
        "Redshift: community.*"
      ],
      "flow": "[Bettermode API] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "bettermode"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "msp",
      "schedule": "0 0 * * *",
      "owner": "Penny",
      "file": "msp/dags_msp.py",
      "layer": "ingest",
      "sources": [
        "Product PG (myviewboard-product): account_msp, entity_account_msp, entity_msp_managed, entity_requirement_msp"
      ],
      "destinations": [
        "Redshift: msp.account_msp, msp.entity_account_msp, msp.entity_msp_managed, msp.entity_requirement_msp"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "pbi_activity",
      "schedule": "0 4 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "pbi_activity/dags_pbi_activity.py",
      "layer": "ingest",
      "sources": [
        "Power BI Admin REST API (ExportReport, ExportActivityEvents, ExportArtifact, ExportDataflow, ExportTile)"
      ],
      "destinations": [
        "Redshift: public.pbi_activity",
        "S3: pbi_activity/"
      ],
      "flow": "[Power BI API] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pbi_api"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "originals_ai_tags",
      "schedule": "0 4 * * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/originals_ai_tags/dags_originals_ai_tags.py",
      "layer": "app",
      "sources": [
        "S3 (p1.myviewboard.com/uploads/originals/**)"
      ],
      "destinations": [
        "S3 (Gemini AI tagged metadata)"
      ],
      "flow": "[S3] --> [EC2 Python + Gemini API] --> [S3]",
      "source_resources": [
        "s3",
        "gemini_api"
      ],
      "dest_resources": [
        "s3"
      ]
    },
    {
      "id": "originals_recommend",
      "schedule": "30 3 1 * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "originals_recommendation/dags_oc_recommend_list.py",
      "layer": "app",
      "sources": [
        "Redshift (OC 使用歷史)"
      ],
      "destinations": [
        "DynamoDB (OC 推薦清單)"
      ],
      "flow": "[Redshift] --> [EC2 Python] --> [DynamoDB]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "dynamodb"
      ]
    },
    {
      "id": "oc_modified_daily_monitor",
      "schedule": "0 0 * * *",
      "owner": "airflow",
      "file": "dags/oc_modified_daily_monitor/dags_oc_modified_daily_monitor.py",
      "layer": "app",
      "sources": [
        "S3 (p1.myviewboard.com/uploads/originals)"
      ],
      "destinations": [
        "Email 通知"
      ],
      "flow": "[S3 diff] --> [EC2 Python] --> [Email]",
      "source_resources": [
        "s3"
      ],
      "dest_resources": [
        "email_output"
      ]
    },
    {
      "id": "active_canvas_hour",
      "schedule": "30 4 1 * *",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "canvas_hour/dags_canvas_hour_aggregate.py",
      "layer": "app",
      "sources": [
        "Redshift (Canvas 事件)"
      ],
      "destinations": [
        "Redshift (Canvas Hour datamart)"
      ],
      "flow": "[Redshift] --> [EC2 Python monthly agg] --> [Redshift]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "Sales_Benchmark_ETL",
      "schedule": "0 1 * * *",
      "owner": "Shan",
      "file": "sales_benchmark/dags_sales_rank_.py",
      "layer": "app",
      "sources": [
        "Redshift: salesforce.*, entity.*"
      ],
      "destinations": [
        "Redshift (Sales Benchmark datamart)"
      ],
      "flow": "[Redshift] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "target_audience_tags",
      "schedule": "0 12 * * MON",
      "owner": "jackie.js.lo@viewsonic.com",
      "file": "dags/user_segmentation/dags_user_segmentation.py",
      "layer": "app",
      "sources": [
        "Redshift datamart (users / entity / instance / subscription / teamwork / community)"
      ],
      "destinations": [
        "Redshift: user_segmentation.application, classroom_host, entity_device_binded, manager_active, user_status, operation_role, customer_type, sign_up_type, original_content_engagement, user_country, user_subscription, user_premium_tool, entity_application, entity_type, user_highest_badges, user_community_status, entity_purpose, teamone_user_tags, teamone_utm"
      ],
      "flow": "[Redshift] --> [EC2 Python] --> [Redshift]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "user_tag_v11",
      "schedule": "50 0 * * MON",
      "owner": "Vance",
      "file": "usertag/dags_user_tag_v11.py",
      "layer": "app",
      "sources": [
        "Redshift (user 行為 + entity)"
      ],
      "destinations": [
        "Redshift: usertag.*"
      ],
      "flow": "[Redshift] --> [EC2 Python] --> [Redshift]",
      "paused": true,
      "paused_reason": "2026-06-16 paused — upstream preprocess S3 gap",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "entity_insight_migration",
      "schedule": "0 3 * * *",
      "owner": "vance",
      "file": "entity_insight/dags_entity_insight.py",
      "layer": "publish",
      "sources": [
        "Redshift: 28 tables (savvy.* + daco.entity_account)"
      ],
      "destinations": [
        "Savvy PG (myviewboard-product-orm-prod write endpoint): savvy.* (27) + daco.entity_account"
      ],
      "flow": "[Redshift] --> [EC2 Python migration] --> [Savvy PG + daco PG]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "savvy_pg"
      ]
    },
    {
      "id": "entity_insight_stage_migration",
      "schedule": "0 0 * * *",
      "owner": "vance",
      "file": "entity_insight/dags_entity_insight_stage.py",
      "layer": "publish",
      "sources": [
        "Redshift: 30 tables (prod 28 set + alert_list_user_login, alert_list_device_turn_on)"
      ],
      "destinations": [
        "Stage Savvy PG: savvy.*, daco.entity_account"
      ],
      "flow": "[Redshift] --> [EC2 Python] --> [Stage Savvy PG]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "stage_savvy_pg"
      ]
    },
    {
      "id": "dags_dbt_users",
      "schedule": "0 1 * * *",
      "owner": "vance",
      "file": "dags/dbt_dag/dags_dbt_users.py",
      "layer": "transform",
      "sources": [
        "Redshift: entity.account_login_count, entity.account_fixed, public.eventdb_entity_log_all"
      ],
      "destinations": [
        "Redshift: users.user_entity_country_all_time (+deps), users.mvb_id_chosen_country"
      ],
      "flow": "[Redshift] --> [DBT run on EC2] --> [Redshift (users models)]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "dags_dbt_instance",
      "schedule": "0 2 * * *",
      "owner": "vance",
      "file": "dags/dbt_dag/dags_dbt_instance.py",
      "layer": "transform",
      "sources": [
        "Redshift: instance.instance_entity_account, instance.instance_registered_fixed, appinsight.operation_session_* (v2 & v3)"
      ],
      "destinations": [
        "Redshift: instance.instance_android_launcher_device_entity_all_time, instance_entity_account_all, instance_location_all_time (+deps), operation_event_windows_two_year_lower"
      ],
      "flow": "[Redshift] --> [DBT run on EC2] --> [Redshift (instance models)]",
      "source_resources": [
        "redshift"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "manual_rerun",
      "schedule": null,
      "owner": "airflow",
      "file": "dags/manual_rerun/dags_manual_rerun.py",
      "layer": "util",
      "sources": [
        "Parameterized (script_path)"
      ],
      "destinations": [
        "Parameterized (usually Redshift)"
      ],
      "flow": "[parameterized] --> [EC2 Python] --> [parameterized]",
      "source_resources": [],
      "dest_resources": []
    },
    {
      "id": "daily_common_data_update",
      "schedule": "0 0 * * *",
      "owner": "Shan",
      "file": "other/dags_common_data_update.py",
      "layer": "ingest",
      "sources": [
        "Product PG (country/region/city, in-house entity)"
      ],
      "destinations": [
        "Redshift: country_related.*, in_house_entity"
      ],
      "flow": "[PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "daily_viewsonic_dataset_update",
      "schedule": "0 0 * * *",
      "owner": "Shan",
      "file": "other/dags_vs_dataset_update.py",
      "layer": "ingest",
      "sources": [
        "VS Account PG (viewsonic-account-prod): viewsonic_entity, viewsonic_account, viewsonic_account_entity"
      ],
      "destinations": [
        "Redshift: vs_account.viewsonic_entity, viewsonic_account, viewsonic_account_entity, savvy.savvy_demo_id, daco.daco_account_id"
      ],
      "flow": "[VS Account PG] --> [EC2 Python] --> [S3] --> [Redshift]",
      "source_resources": [
        "pg_product"
      ],
      "dest_resources": [
        "s3",
        "redshift"
      ]
    },
    {
      "id": "daily_stage_viewsonic_dataset_update",
      "schedule": "20 0 * * *",
      "owner": "Shan",
      "file": "other/dags_vs_stage_dataset_update.py",
      "layer": "ingest",
      "sources": [
        "VS Account Stage PG"
      ],
      "destinations": [
        "Redshift stage schema (stage_entity_account 系列)"
      ],
      "flow": "[VS Account Stage PG] --> [EC2 Python] --> [Redshift stage]",
      "source_resources": [
        "stage_savvy_pg"
      ],
      "dest_resources": [
        "redshift"
      ]
    },
    {
      "id": "lambda_vs_account_export",
      "schedule": null,
      "owner": "external (AWS Lambda)",
      "file": null,
      "layer": "external",
      "sources": [
        "Dumps viewsonic-account-prod PG snapshot to s3://vs-account-export/ (not an Airflow DAG)"
      ],
      "destinations": [],
      "flow": "external process (not an Airflow DAG)",
      "source_resources": [
        "pg_vs_account"
      ],
      "dest_resources": [
        "s3"
      ],
      "is_external": true
    }
  ],
  "edges": [
    {
      "source": "dbrix_appinsight_to_s3",
      "target": "emr_v2",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_dag_emr_v2 -> upstream_dag_dbrix_appinsight"
    },
    {
      "source": "appinsight_daily",
      "target": "entity_insight_prod_to_insight_event_log",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_insight_entity -> fetch_applicaiton_insight_completed"
    },
    {
      "source": "appinsight_daily",
      "target": "event_session_classroom_whiteboard",
      "dep_type": "ExternalTaskSensor",
      "external_task": "customEvents_mvbx -> fetch_app_completed"
    },
    {
      "source": "appinsight_daily",
      "target": "event_session_companion",
      "dep_type": "ExternalTaskSensor",
      "external_task": "customEvents_mvbx -> fetch_app_completed"
    },
    {
      "source": "appinsight_daily",
      "target": "event_session_instance",
      "dep_type": "ExternalTaskSensor",
      "external_task": "(DAG-level) -> fetch_app_completed"
    },
    {
      "source": "appinsight_daily",
      "target": "original_content",
      "dep_type": "ExternalTaskSensor",
      "external_task": "(DAG-level) -> fetch_app_completed"
    },
    {
      "source": "appinsight_daily",
      "target": "device_relation",
      "dep_type": "ExternalTaskSensor",
      "external_task": "(DAG-level) -> fetch_app_completed"
    },
    {
      "source": "appinsight_daily",
      "target": "myviewboard_com",
      "dep_type": "ExternalTaskSensor",
      "external_task": "customEvents_myviewboard.com -> upstream_fetch_mvb_com"
    },
    {
      "source": "appinsight_daily",
      "target": "myviewboard_com",
      "dep_type": "ExternalTaskSensor",
      "external_task": "customEvents_myviewboard.com-v2-prod -> upstream_fetch_mvb_com_2"
    },
    {
      "source": "emr_v2",
      "target": "event_session_instance",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_event_session_instance_mvba -> upstream_emr_v2_column_filter_mvba"
    },
    {
      "source": "emr_v2",
      "target": "event_session_instance",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_event_session_instance_mvbw -> upstream_emr_v2_column_filter_mvbw"
    },
    {
      "source": "emr_v2",
      "target": "event_session_instance_v3",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_event_session_instance_mvba_v3 -> upstream_emr_v2_column_filter_mvba_v3"
    },
    {
      "source": "emr_v2",
      "target": "event_session_instance_v3",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_event_session_instance_mvbw_v3 -> upstream_emr_v2_column_filter_mvbw_v3"
    },
    {
      "source": "emr_v2",
      "target": "event_session_instance_v3",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_event_session_instance_mvbf_v3 -> upstream_emr_v2_column_filter_mvbf_v3"
    },
    {
      "source": "emr_v2",
      "target": "original_content",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_original_content_mvba -> upstream_emr_v2_column_filter_mvba"
    },
    {
      "source": "emr_v2",
      "target": "original_content",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_original_content_mvbw -> upstream_emr_v2_column_filter_mvbw"
    },
    {
      "source": "emr_v2",
      "target": "teamwork",
      "dep_type": "ExternalTaskMarker",
      "external_task": "downstream_teamwork_prod_preprocess -> upstream_teamwork_prod_emr"
    },
    {
      "source": "instance_android_launcher_device_entity",
      "target": "instance_relation",
      "dep_type": "ExternalTaskMarker",
      "external_task": "instance_android_launcher_device_entity_complete -> depndency_instance_android_launcher_device_entity"
    },
    {
      "source": "instance_relation",
      "target": "dags_dbt_instance",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_instance_entity_account -> instance_entity_account_completed"
    },
    {
      "source": "instance_relation",
      "target": "dags_dbt_instance",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_instance_registered_fixed -> instance_registered_fixed_completed"
    },
    {
      "source": "event_session_instance",
      "target": "dags_dbt_instance",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_log_session_appinsight_v2 -> log_session_appinsight_v2_completed"
    },
    {
      "source": "event_session_instance_v3",
      "target": "dags_dbt_instance",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_log_session_appinsight_v3 -> log_session_appinsight_v3_completed"
    },
    {
      "source": "entity_account",
      "target": "dags_dbt_users",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_log_account_fixed -> log_account_fixed_completed"
    },
    {
      "source": "entity_account",
      "target": "dags_dbt_users",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_INSERT_RS_account_login_count -> INSERT_RS_account_login_count_completed"
    },
    {
      "source": "viewsonic_migration",
      "target": "dags_dbt_users",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_event_store_db -> event_store_db_completed"
    },
    {
      "source": "entity_insight_migration",
      "target": "email_alert_list",
      "dep_type": "ExternalTaskMarker",
      "external_task": "task_dependency_entity_insight_migration -> entity_insight_migration_completed"
    }
  ],
  "resources": [
    {
      "id": "azure_app_insights",
      "label": "Azure App Insights",
      "kind": "api",
      "note": "Continuous Export + REST API"
    },
    {
      "id": "pg_product",
      "label": "myViewBoard Product PG",
      "kind": "db",
      "note": "myviewboard-product (read replica)"
    },
    {
      "id": "pg_dm",
      "label": "Device Manager PG",
      "kind": "db",
      "note": "myviewboard-dm"
    },
    {
      "id": "pg_edla",
      "label": "EDLA RDS (dm-log)",
      "kind": "db",
      "note": "myviewboard-dm-log"
    },
    {
      "id": "pg_vs_account",
      "label": "VS Account PG",
      "kind": "db",
      "note": "viewsonic-account-prod (by Lambda export to S3)"
    },
    {
      "id": "pg_teamwork",
      "label": "Teamwork PG",
      "kind": "db",
      "note": "postgres_prod_teamwork"
    },
    {
      "id": "pg_email",
      "label": "Email Service PG",
      "kind": "db",
      "note": "email service"
    },
    {
      "id": "salesforce",
      "label": "Salesforce API",
      "kind": "api",
      "note": "外部 process 落 S3"
    },
    {
      "id": "oracle_ifp_src",
      "label": "Oracle IFP",
      "kind": "api",
      "note": "外部 process 落 S3"
    },
    {
      "id": "pbi_api",
      "label": "Power BI Admin API",
      "kind": "api",
      "note": "OAuth 2.0"
    },
    {
      "id": "bettermode",
      "label": "Bettermode GraphQL",
      "kind": "api",
      "note": "community API"
    },
    {
      "id": "gemini_api",
      "label": "Google Gemini API",
      "kind": "api",
      "note": "OC AI tagging"
    },
    {
      "id": "s3",
      "label": "AWS S3",
      "kind": "storage",
      "note": "data lake / dumps"
    },
    {
      "id": "redshift",
      "label": "AWS Redshift",
      "kind": "storage",
      "note": "single source of truth"
    },
    {
      "id": "dynamodb",
      "label": "AWS DynamoDB",
      "kind": "storage",
      "note": "OC recommend / email campaign"
    },
    {
      "id": "savvy_pg",
      "label": "Savvy PG (write endpoint)",
      "kind": "sink",
      "note": "myviewboard-product-orm-prod → NestJS Entity Insight API"
    },
    {
      "id": "stage_savvy_pg",
      "label": "Stage Savvy PG",
      "kind": "sink",
      "note": "myviewboard-product-orm-stage (可讀可寫)"
    },
    {
      "id": "email_output",
      "label": "Email 通知",
      "kind": "sink",
      "note": "notification only"
    }
  ]
};
