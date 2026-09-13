export function BillingClassicStyles() {
  return (
    <style>{`
      .tn-page {
        min-height: 100vh;
        background: #f3f3f3;
        color: #111;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
      }

      .tn-topbar {
        height: 42px;
        display: flex;
        align-items: center;
        gap: 0;
        background: #087ba6;
        border-bottom: 2px solid #075b7d;
        box-shadow: 0 1px 5px rgba(0,0,0,.25);
        color: #fff;
      }

      .tn-topbar a {
        color: #fff;
        text-decoration: none;
        padding: 13px 18px;
        font-size: 15px;
        line-height: 16px;
        height: 42px;
        display: flex;
        align-items: center;
      }

      .tn-topbar a.active,
      .tn-topbar a:hover {
        background: #056589;
      }

      .tn-logo {
        width: 56px;
        justify-content: center;
        padding: 0 !important;
        background: #fff !important;
        height: 54px !important;
        margin-left: 10px;
        margin-right: 6px;
        align-self: flex-start;
        box-shadow: 0 1px 4px rgba(0,0,0,.3);
      }

      .tn-logo-box {
        color: #087ba6;
        border: 1px solid #ddd;
        font-size: 8px;
        text-align: center;
        line-height: 10px;
      }

      .tn-topbar-spacer {
        flex: 1;
      }

      .tn-billing-wrap {
        padding: 14px 18px 40px;
      }

      .tn-page-title {
        color: #1e93cf;
        font-weight: 300;
        font-size: 22px;
        margin: 0 0 12px;
      }

      .tn-billing-tabs {
        display: flex;
        gap: 3px;
        border-bottom: 2px solid #1e9ad5;
        margin-bottom: 12px;
      }

      .tn-billing-tabs a {
        background: #737373;
        color: #fff;
        padding: 8px 12px;
        text-decoration: none;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        font-weight: 700;
        font-size: 12px;
      }

      .tn-billing-tabs a:hover {
        background: #1e9ad5;
      }

      .tn-panel {
        background: #fff;
        border: 1px solid #ddd;
        margin-bottom: 14px;
        padding: 14px;
        box-shadow: inset 0 1px #fff;
      }

      .tn-panel-header {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: center;
        margin-bottom: 10px;
      }

      .tn-panel h2 {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
      }

      .tn-panel h3 {
        font-size: 12px;
        margin: 0 0 8px;
        color: #555;
      }

      .tn-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
      }

      .tn-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 28px;
      }

      .tn-grid-4 {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
      }

      .tn-link-list {
        display: grid;
        gap: 8px;
      }

      .tn-link-list a {
        color: #0874bd;
        text-decoration: none;
      }

      .tn-link-list a:hover {
        text-decoration: underline;
      }

      .tn-count-badge {
        display: inline-flex;
        min-width: 18px;
        height: 18px;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        background: #c8c8c8;
        color: white;
        font-size: 11px;
        font-weight: 700;
        margin-left: 4px;
      }

      .tn-count-badge.blue {
        background: #1e9ad5;
      }

      .tn-form-grid {
        display: grid;
        grid-template-columns: 110px 220px 110px 220px;
        align-items: center;
        gap: 8px 12px;
        max-width: 760px;
      }

      .tn-form-grid.compact {
        grid-template-columns: 95px 220px 110px 220px;
      }

      .tn-form-grid label,
      .tn-stacked-form label {
        font-weight: 400;
      }

      .tn-input,
      .tn-select,
      .tn-textarea {
        border: 1px solid #cfcfcf;
        border-radius: 3px;
        background: white;
        min-height: 24px;
        padding: 3px 7px;
        font: inherit;
      }

      .tn-textarea {
        min-height: 62px;
        resize: vertical;
      }

      .tn-btn {
        border: 1px solid #168bc2;
        background: #1e9ad5;
        color: white;
        border-radius: 3px;
        padding: 5px 9px;
        font-weight: 700;
        font-size: 11px;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .tn-btn.green {
        background: #71bd00;
        border-color: #61a000;
      }

      .tn-btn.gray {
        background: #777;
        border-color: #666;
      }

      .tn-btn.light {
        color: #0874bd;
        background: #fff;
        border-color: #ddd;
      }

      .tn-btn-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-top: 10px;
      }

      .tn-report-options {
        display: grid;
        grid-template-columns: 150px 150px 150px;
        gap: 12px;
        margin-top: 8px;
      }

      .tn-radio-list,
      .tn-check-list {
        display: grid;
        gap: 4px;
      }

      .tn-table {
        width: 100%;
        border-collapse: collapse;
        background: #fff;
      }

      .tn-table th {
        background: #2299d2;
        color: white;
        padding: 7px 8px;
        text-align: left;
        font-weight: 700;
        border-right: 1px solid rgba(255,255,255,.28);
      }

      .tn-table td {
        padding: 7px 8px;
        border: 1px solid #ddd;
        border-top: 0;
        color: #333;
      }

      .tn-table tbody tr:nth-child(even) {
        background: #f7f7f7;
      }

      .tn-table .money,
      .money {
        text-align: right;
        color: #006ba6;
      }

      .tn-table .status-green {
        color: #198400;
        font-weight: 700;
      }

      .tn-table .status-red {
        color: #b30000;
        font-weight: 700;
      }

      .tn-table .muted {
        color: #777;
      }

      .tn-mini-actions {
        display: flex;
        justify-content: flex-end;
        gap: 14px;
        margin-bottom: 5px;
        color: #0874bd;
      }

      .tn-warning-box {
        background: #f7f7f7;
        border: 1px solid #ddd;
        padding: 12px;
        margin-top: 12px;
        color: #444;
      }

      .tn-warning-box strong {
        color: #c73d00;
      }

      .tn-stacked-form {
        display: grid;
        grid-template-columns: 135px 260px;
        align-items: center;
        gap: 8px 10px;
        max-width: 460px;
      }

      .tn-section-line {
        border-top: 1px solid #1e9ad5;
        margin: 12px 0;
      }

      .tn-payment-methods {
        display: flex;
        gap: 5px;
      }

      .tn-payment-methods button {
        border: 1px solid #777;
        background: white;
        border-radius: 4px;
        padding: 8px 24px;
        font-size: 14px;
      }

      .tn-payment-methods .selected {
        border-color: #1e9ad5;
        box-shadow: inset 0 0 0 1px #1e9ad5;
      }

      .tn-aging-highlight {
        background: #e5f6fd;
      }

      .tn-muted-note {
        color: #666;
        margin-top: 8px;
      }

      @media (max-width: 900px) {
        .tn-topbar {
          overflow-x: auto;
        }

        .tn-grid-2,
        .tn-grid-3,
        .tn-grid-4,
        .tn-report-options {
          grid-template-columns: 1fr;
        }

        .tn-form-grid,
        .tn-form-grid.compact,
        .tn-stacked-form {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  );
}
