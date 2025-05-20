package com.example.marvel_api.service;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class GridFsService {

    @Autowired
    private GridFsOperations gridFsOperations;

    @Autowired
    private GridFSBucket gridFSBucket;

    public String storeImage(MultipartFile file) throws IOException {
        ObjectId fileId = gridFsOperations.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        return fileId.toString();
    }

    public byte[] getImage(String id) throws IOException {
        GridFSFile gridFSFile = gridFsOperations.findOne(Query.query(Criteria.where("_id").is(new ObjectId(id))));
        if (gridFSFile == null) {
            throw new IllegalArgumentException("Image not found with id: " + id);
        }
        GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(gridFSFile.getObjectId());
        byte[] bytes = new byte[(int) gridFSFile.getLength()];
        downloadStream.read(bytes);
        downloadStream.close();
        return bytes;
    }

    public void deleteImage(String id) {
        gridFsOperations.delete(Query.query(Criteria.where("_id").is(new ObjectId(id))));
    }
}
