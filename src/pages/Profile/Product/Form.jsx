import React from "react";

export default function Form() {
  return (
    <>
      <div>
        <div class="row">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              Tên tranh
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="name"
              aria-label="name"
            />
          </div>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              Giá
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="$100"
              aria-label="price"
            />
          </div>
          <div class="col-md-6 pt-3">
            <label for="inputEmail4" class="form-label">
              Mô tả
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="..."
              aria-label="description"
            />
          </div>
          <div class="col-md-6 pt-3">
            <label for="inputEmail4" class="form-label">
              Ảnh
            </label>
            <input type="file" class="form-control" aria-label="file" />
          </div>
        </div>
        <div className="btn btn-success mt-5 mr-2">Thêm</div>
        <div className="btn btn-primary mt-5 mr-2">sửa</div>
        <div className="btn btn-danger mt-5 mr-2">xóa</div>
      </div>
    </>
  );
}
